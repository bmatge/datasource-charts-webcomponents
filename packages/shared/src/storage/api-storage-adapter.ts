/**
 * ApiStorageAdapter — stores data via the backend API with localStorage as cache/fallback.
 *
 * Strategy:
 * - load(): GET from API, merge with local data, fallback to localStorage if offline
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
import type { Source } from '../types/source.js';
import { serializeSourceForServer } from '../types/source.js';

// ---- Merge helpers (repair incomplete server data from pre-serialization-fix) ----

/**
 * Check if a server item has complete config_json data.
 * Items saved before the serialization fix have config_json: null.
 */
function hasCompleteServerConfig(item: Record<string, unknown>): boolean {
  const configJson = item.config_json ?? item.configJson;
  return configJson != null
    && typeof configJson === 'object'
    && Object.keys(configJson as object).length > 0;
}

/**
 * Check if a local item has connection/source config data (flat fields).
 * Local items store config as top-level fields (apiUrl, url, documentId, etc.).
 */
function hasLocalConfig(item: Record<string, unknown>, key: string): boolean {
  if (key === STORAGE_KEYS.SOURCES) {
    if (item.type === 'manual') return true;
    return !!(item.apiUrl || item.documentId);
  }
  if (key === STORAGE_KEYS.CONNECTIONS) {
    return !!(item.url || item.apiUrl);
  }
  return false;
}

/**
 * Merge server data with local data for sources/connections.
 *
 * Pre-serialization-fix data on the server has config_json: null because flat client
 * fields weren't packed into the JSON blob. When local has complete data for such items,
 * prefer the local version. The repaired data will be re-synced to the server via the
 * saveToStorage hook (which triggers save → syncItems with correct serialization).
 */
function mergeServerWithLocal(
  serverItems: Record<string, unknown>[],
  localItems: Record<string, unknown>[],
  key: string,
): Record<string, unknown>[] {
  if (localItems.length === 0) return serverItems;

  const localById = new Map<string, Record<string, unknown>>();
  for (const item of localItems) {
    if (item.id) localById.set(item.id as string, item);
  }

  return serverItems.map(serverItem => {
    const id = serverItem.id as string;
    if (!id) return serverItem;

    // Server item already has complete config → use as-is
    if (hasCompleteServerConfig(serverItem)) return serverItem;

    // Server item is incomplete — check if local has better data
    const localItem = localById.get(id);
    if (localItem && hasLocalConfig(localItem, key)) {
      console.info(`[ApiStorageAdapter] Repaired ${key} item ${id} from local data`);
      return localItem;
    }

    return serverItem;
  });
}

/** Server columns for connections: name, type, config_json, api_key_encrypted, status */
const CONNECTION_TOP_LEVEL = new Set(['id', 'name', 'type', 'status']);

/** Pack flat connection fields into configJson for the server */
function serializeConnectionForServer(conn: Record<string, unknown>): Record<string, unknown> {
  const configJson: Record<string, unknown> = {};
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(conn)) {
    if (CONNECTION_TOP_LEVEL.has(key)) {
      result[key] = value;
    } else if (!key.startsWith('_')) {
      configJson[key] = value;
    }
  }
  result.configJson = configJson;
  return result;
}

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

      let data = await response.json() as T;

      // For sources/connections: merge server data with local to repair
      // items that have config_json: null (saved before serialization fix).
      // The save hook will re-sync repaired items to the server.
      if (Array.isArray(data) && (key === STORAGE_KEYS.SOURCES || key === STORAGE_KEYS.CONNECTIONS)) {
        const localData = loadFromStorage<Record<string, unknown>[]>(key, []);
        data = mergeServerWithLocal(
          data as Record<string, unknown>[],
          localData,
          key,
        ) as T;
      }

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
      // Transform to server format (pack flat fields into config_json/data_json)
      let items: { id?: string; [k: string]: unknown }[];
      if (key === STORAGE_KEYS.SOURCES) {
        items = (data as Source[]).map(serializeSourceForServer);
      } else if (key === STORAGE_KEYS.CONNECTIONS) {
        items = (data as Record<string, unknown>[]).map(serializeConnectionForServer);
      } else {
        items = data as { id?: string }[];
      }
      syncItems(endpoint, items).catch((err) => {
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
