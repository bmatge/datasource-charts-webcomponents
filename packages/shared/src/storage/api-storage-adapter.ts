/**
 * ApiStorageAdapter — stores data via the backend API with localStorage as cache/fallback.
 *
 * Strategy:
 * - load(): GET from API, fallback to localStorage if offline
 * - save(): save to localStorage immediately, then sync to API via SyncQueue
 * - remove(): remove from localStorage, then DELETE from API via SyncQueue
 *
 * This is a "local-first" adapter: localStorage is always written first for instant UI,
 * then synced to the server reliably via a retry queue.
 *
 * IMPORTANT: Sync never performs implicit DELETEs. If a remote item is absent from the
 * local array, it is NOT deleted. Deletions must be explicit (user-triggered).
 */

import type { StorageAdapter } from './storage-adapter.js';
import { loadFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from './local-storage.js';
import { syncItems, deleteItem, setSyncBaseUrl } from './sync-queue.js';

/** Maps STORAGE_KEYS to API endpoints */
const KEY_TO_ENDPOINT: Record<string, string> = {
  [STORAGE_KEYS.SOURCES]: '/api/sources',
  [STORAGE_KEYS.CONNECTIONS]: '/api/connections',
  [STORAGE_KEYS.FAVORITES]: '/api/favorites',
  [STORAGE_KEYS.DASHBOARDS]: '/api/dashboards',
};

export class ApiStorageAdapter implements StorageAdapter {
  private baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    setSyncBaseUrl(baseUrl);
  }

  async load<T>(key: string, defaultValue: T): Promise<T> {
    const endpoint = KEY_TO_ENDPOINT[key];

    // Keys without an API endpoint use localStorage directly
    if (!endpoint) {
      return loadFromStorage(key, defaultValue);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        // Fallback to localStorage on error
        return loadFromStorage(key, defaultValue);
      }

      const data = await response.json() as T;
      // Update localStorage cache
      saveToStorage(key, data);
      return data;
    } catch {
      // Network error: fallback to localStorage
      console.warn(`[ApiStorageAdapter] load(${key}): network error, using localStorage fallback`);
      return loadFromStorage(key, defaultValue);
    }
  }

  async save<T>(key: string, data: T): Promise<boolean> {
    // Always save to localStorage first (instant, offline-first)
    const localResult = saveToStorage(key, data);

    const endpoint = KEY_TO_ENDPOINT[key];
    if (!endpoint) {
      return localResult;
    }

    // Sync to API via SyncQueue (reliable, with retry)
    if (Array.isArray(data)) {
      syncItems(endpoint, data as { id?: string }[]).catch((err) => {
        console.warn(`[ApiStorageAdapter] save(${key}): sync failed`, err);
      });
    }

    return localResult;
  }

  async remove(key: string): Promise<void> {
    removeFromStorage(key);

    const endpoint = KEY_TO_ENDPOINT[key];
    if (!endpoint) return;

    // Note: bulk delete is not standard for our CRUD endpoints.
    // Individual item deletions are handled at the app level via deleteItemFromServer().
  }

  /**
   * Explicitly delete a single item from the server.
   * This is the ONLY way to trigger a server-side deletion — sync never deletes implicitly.
   */
  deleteItemFromServer(key: string, id: string): void {
    const endpoint = KEY_TO_ENDPOINT[key];
    if (!endpoint) return;
    deleteItem(endpoint, id);
  }
}
