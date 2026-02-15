/**
 * ApiStorageAdapter — stores data via the backend API with localStorage as cache/fallback.
 *
 * Strategy:
 * - load(): GET from API, fallback to localStorage if offline
 * - save(): save to localStorage immediately, then POST/PUT to API in background
 * - remove(): remove from localStorage, then DELETE from API
 *
 * This is a "local-first" adapter: localStorage is always written first for instant UI,
 * then synced to the server asynchronously.
 */

import type { StorageAdapter } from './storage-adapter.js';
import { loadFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from './local-storage.js';

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

    // Sync to API in background (fire-and-forget)
    this.syncToApi(endpoint, data).catch((err) => {
      console.warn(`[ApiStorageAdapter] save(${key}): API sync failed`, err);
    });

    return localResult;
  }

  async remove(key: string): Promise<void> {
    removeFromStorage(key);

    const endpoint = KEY_TO_ENDPOINT[key];
    if (!endpoint) return;

    // Note: bulk delete is not standard for our CRUD endpoints.
    // Individual item deletions are handled at the app level.
  }

  /**
   * Sync data to the API. For array-type resources (sources, favorites, etc.),
   * this compares local and remote state and syncs individual items.
   */
  private async syncToApi<T>(endpoint: string, data: T): Promise<void> {
    if (!Array.isArray(data)) return;

    const items = data as { id?: string; [key: string]: unknown }[];

    // Get current remote items
    let remoteItems: { id: string }[] = [];
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        credentials: 'include',
      });
      if (response.ok) {
        remoteItems = await response.json();
      }
    } catch {
      return; // Can't sync if we can't reach the server
    }

    const remoteIds = new Set(remoteItems.map(r => r.id));
    const localIds = new Set(items.filter(i => i.id).map(i => i.id!));

    // Create or update local items
    for (const item of items) {
      if (!item.id) continue;

      const method = remoteIds.has(item.id) ? 'PUT' : 'POST';
      const url = method === 'PUT'
        ? `${this.baseUrl}${endpoint}/${item.id}`
        : `${this.baseUrl}${endpoint}`;

      try {
        await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(item),
        });
      } catch {
        // Ignore individual sync failures
      }
    }

    // Delete remote items not in local state (owned only)
    for (const remote of remoteItems) {
      if (!localIds.has(remote.id) && (remote as Record<string, unknown>)._owned !== false) {
        try {
          await fetch(`${this.baseUrl}${endpoint}/${remote.id}`, {
            method: 'DELETE',
            credentials: 'include',
          });
        } catch {
          // Ignore delete failures
        }
      }
    }
  }
}
