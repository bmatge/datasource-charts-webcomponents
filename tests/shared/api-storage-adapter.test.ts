import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ApiStorageAdapter } from '../../packages/shared/src/storage/api-storage-adapter';
import { STORAGE_KEYS } from '../../packages/shared/src/storage/local-storage';

describe('ApiStorageAdapter', () => {
  let adapter: ApiStorageAdapter;
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    localStorage.clear();
    adapter = new ApiStorageAdapter('');
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('load', () => {
    it('fetches from API and caches to localStorage', async () => {
      const apiData = [{ id: 'src-1', name: 'Source A' }];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(apiData),
      });

      const result = await adapter.load(STORAGE_KEYS.SOURCES, []);

      expect(result).toEqual(apiData);
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/sources', { credentials: 'include' });

      // Verify localStorage cache was updated
      const cached = JSON.parse(localStorage.getItem(STORAGE_KEYS.SOURCES)!);
      expect(cached).toEqual(apiData);
    });

    it('falls back to localStorage on network error', async () => {
      localStorage.setItem(STORAGE_KEYS.SOURCES, JSON.stringify([{ id: 'cached' }]));

      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const result = await adapter.load(STORAGE_KEYS.SOURCES, []);

      expect(result).toEqual([{ id: 'cached' }]);
    });

    it('falls back to localStorage on non-ok response', async () => {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([{ id: 'fav-1' }]));

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      const result = await adapter.load(STORAGE_KEYS.FAVORITES, []);

      expect(result).toEqual([{ id: 'fav-1' }]);
    });

    it('returns default when no API and no localStorage', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('offline'));

      const result = await adapter.load(STORAGE_KEYS.SOURCES, []);

      expect(result).toEqual([]);
    });

    it('uses localStorage directly for keys without API endpoint', async () => {
      localStorage.setItem(STORAGE_KEYS.SELECTED_SOURCE, JSON.stringify({ id: 'sel-1' }));

      globalThis.fetch = vi.fn();

      const result = await adapter.load(STORAGE_KEYS.SELECTED_SOURCE, null);

      expect(result).toEqual({ id: 'sel-1' });
      // Should NOT call fetch for non-API keys
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });
  });

  describe('save', () => {
    it('saves to localStorage immediately', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      });

      const data = [{ id: 'src-1', name: 'New' }];
      const result = await adapter.save(STORAGE_KEYS.SOURCES, data);

      expect(result).toBe(true);

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.SOURCES)!);
      expect(stored).toEqual(data);
    });

    it('saves non-API keys to localStorage only', async () => {
      globalThis.fetch = vi.fn();

      await adapter.save(STORAGE_KEYS.SELECTED_SOURCE, { id: 'x' });

      expect(globalThis.fetch).not.toHaveBeenCalled();
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED_SOURCE)!);
      expect(stored).toEqual({ id: 'x' });
    });

    it('does not fail if API sync fails', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('API down'));

      const data = [{ id: 'src-1' }];
      const result = await adapter.save(STORAGE_KEYS.SOURCES, data);

      // localStorage save still succeeds
      expect(result).toBe(true);
    });
  });

  describe('remove', () => {
    it('removes from localStorage', async () => {
      localStorage.setItem(STORAGE_KEYS.SOURCES, '"data"');

      await adapter.remove(STORAGE_KEYS.SOURCES);

      expect(localStorage.getItem(STORAGE_KEYS.SOURCES)).toBeNull();
    });
  });
});
