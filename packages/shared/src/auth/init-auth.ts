/**
 * initAuth() - One-call setup for auth + storage adapter.
 *
 * Each app calls `await initAuth()` once at startup (in DOMContentLoaded).
 * It detects whether a backend API is available, checks auth state,
 * and if authenticated, sets up the ApiStorageAdapter + hooks saveToStorage
 * so all existing sync writes also sync to the server in background.
 */

import { checkAuth } from './auth-service.js';
import { setSaveHook, STORAGE_KEYS } from '../storage/local-storage.js';
import { ApiStorageAdapter } from '../storage/api-storage-adapter.js';
import { setStorageAdapter, loadData } from '../storage/storage-provider.js';

/**
 * Initialize auth and storage adapter.
 * - Detects DB mode (backend available)
 * - If authenticated, switches to ApiStorageAdapter
 * - Hooks saveToStorage for background API sync
 * - Prefetches data from server to update localStorage cache
 */
export async function initAuth(): Promise<void> {
  const authState = await checkAuth();

  if (!authState.isAuthenticated) return;

  const adapter = new ApiStorageAdapter();
  setStorageAdapter(adapter);

  // Hook saveToStorage so existing sync writes also sync to API
  setSaveHook((key, data) => {
    adapter.save(key, data).catch(() => { /* ignore sync errors */ });
  });

  // Prefetch from server to update localStorage cache
  await Promise.allSettled([
    loadData(STORAGE_KEYS.SOURCES, []),
    loadData(STORAGE_KEYS.CONNECTIONS, []),
    loadData(STORAGE_KEYS.FAVORITES, []),
    loadData(STORAGE_KEYS.DASHBOARDS, []),
  ]);
}
