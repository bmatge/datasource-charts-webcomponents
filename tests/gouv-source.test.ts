import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Tests for GouvSource component logic.
 *
 * Since JSDOM doesn't fully support custom elements, we test
 * the core logic (URL building, fetch options) by importing the class
 * and exercising its internal methods via a test instance.
 */

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

// We need to import after setting up fetch mock
import { GouvSource } from '../src/components/gouv-source.js';
import { getDataCache, clearDataCache, getDataMeta, clearDataMeta } from '../src/utils/data-bridge.js';

describe('GouvSource', () => {
  let source: GouvSource;

  beforeEach(() => {
    clearDataCache('test-source');
    mockFetch.mockReset();
    // Create instance manually (JSDOM won't upgrade custom elements)
    source = new GouvSource();
  });

  describe('URL building', () => {
    it('builds a URL from the url property', () => {
      source.url = 'https://api.example.com/data';
      source.method = 'GET';
      source.params = '';

      // Access private method via any cast for testing
      const url = (source as any)._buildUrl();
      expect(url).toBe('https://api.example.com/data');
    });

    it('appends query params for GET requests', () => {
      source.url = 'https://api.example.com/data';
      source.method = 'GET';
      source.params = '{"limit": "10", "offset": "0"}';

      const url = (source as any)._buildUrl();
      expect(url).toContain('limit=10');
      expect(url).toContain('offset=0');
    });

    it('does not append params to URL for POST requests', () => {
      source.url = 'https://api.example.com/data';
      source.method = 'POST';
      source.params = '{"query": "test"}';

      const url = (source as any)._buildUrl();
      expect(url).not.toContain('query');
    });

    it('warns on invalid JSON params', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      source.url = 'https://api.example.com/data';
      source.method = 'GET';
      source.params = 'not-json';

      (source as any)._buildUrl();
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe('fetch options building', () => {
    it('builds GET options by default', () => {
      source.method = 'GET';
      source.headers = '';
      source.params = '';

      const options = (source as any)._buildFetchOptions();
      expect(options.method).toBe('GET');
      expect(options.body).toBeUndefined();
    });

    it('builds POST options with body and content-type', () => {
      source.method = 'POST';
      source.headers = '';
      source.params = '{"key": "value"}';

      const options = (source as any)._buildFetchOptions();
      expect(options.method).toBe('POST');
      expect(options.body).toBe('{"key": "value"}');
      expect(options.headers['Content-Type']).toBe('application/json');
    });

    it('parses custom headers', () => {
      source.method = 'GET';
      source.headers = '{"Authorization": "Bearer token123"}';
      source.params = '';

      const options = (source as any)._buildFetchOptions();
      expect(options.headers.Authorization).toBe('Bearer token123');
    });

    it('merges custom headers with Content-Type for POST', () => {
      source.method = 'POST';
      source.headers = '{"X-Custom": "value"}';
      source.params = '{"data": true}';

      const options = (source as any)._buildFetchOptions();
      expect(options.headers['Content-Type']).toBe('application/json');
      expect(options.headers['X-Custom']).toBe('value');
    });

    it('warns on invalid JSON headers', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      source.method = 'GET';
      source.headers = 'not-json';
      source.params = '';

      (source as any)._buildFetchOptions();
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe('data fetching', () => {
    it('does not fetch when url is empty', async () => {
      source.url = '';
      source.id = 'test-source';
      await (source as any)._fetchData();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('warns when id is not set', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      source.url = 'https://api.example.com/data';
      // id is empty
      await (source as any)._fetchData();
      expect(warnSpy).toHaveBeenCalled();
      expect(mockFetch).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it('fetches data and dispatches loaded event', async () => {
      const testData = { results: [1, 2, 3] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(testData),
      });

      source.url = 'https://api.example.com/data';
      source.id = 'test-source';
      source.transform = '';

      await (source as any)._fetchData();

      expect(mockFetch).toHaveBeenCalled();
      expect(source.getData()).toEqual(testData);
      expect(getDataCache('test-source')).toEqual(testData);
    });

    it('applies transform path', async () => {
      const testData = { data: { items: [{ id: 1 }] } };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(testData),
      });

      source.url = 'https://api.example.com/data';
      source.id = 'test-source';
      source.transform = 'data.items';

      await (source as any)._fetchData();

      expect(source.getData()).toEqual([{ id: 1 }]);
    });

    it('handles HTTP errors', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      source.url = 'https://api.example.com/data';
      source.id = 'test-source';

      await (source as any)._fetchData();

      expect(source.getError()).toBeTruthy();
      expect(source.getError()?.message).toContain('404');
      errorSpy.mockRestore();
    });

    it('handles network errors', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error('Network failure'));

      source.url = 'https://api.example.com/data';
      source.id = 'test-source';

      await (source as any)._fetchData();

      expect(source.getError()?.message).toBe('Network failure');
      errorSpy.mockRestore();
    });

    it('ignores abort errors', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const abortError = new Error('Aborted');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValueOnce(abortError);

      source.url = 'https://api.example.com/data';
      source.id = 'test-source';

      await (source as any)._fetchData();

      // Should NOT set error state for abort
      expect(source.getError()).toBeNull();
      errorSpy.mockRestore();
    });
  });

  describe('server pagination', () => {
    beforeEach(() => {
      clearDataMeta('test-source');
    });

    it('injects page and page_size in URL when paginate=true', () => {
      source.url = 'https://tabular-api.data.gouv.fr/api/resources/abc/data/';
      source.paginate = true;
      source.pageSize = 20;
      source.method = 'GET';
      source.params = '';

      const url = (source as any)._buildUrl();
      expect(url).toContain('page=1');
      expect(url).toContain('page_size=20');
    });

    it('does not inject pagination params when paginate=false', () => {
      source.url = 'https://api.example.com/data';
      source.paginate = false;
      source.method = 'GET';
      source.params = '';

      const url = (source as any)._buildUrl();
      expect(url).not.toContain('page=');
      expect(url).not.toContain('page_size=');
    });

    it('stores pagination meta from API response', async () => {
      const testData = {
        data: [{ id: 1 }, { id: 2 }],
        meta: { page: 1, page_size: 20, total: 100 }
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(testData),
      });

      source.url = 'https://tabular-api.data.gouv.fr/api/resources/abc/data/';
      source.id = 'test-source';
      source.paginate = true;
      source.pageSize = 20;
      source.transform = '';

      await (source as any)._fetchData();

      const meta = getDataMeta('test-source');
      expect(meta).toBeDefined();
      expect(meta!.page).toBe(1);
      expect(meta!.pageSize).toBe(20);
      expect(meta!.total).toBe(100);
    });

    it('auto-extracts json.data when paginate=true and no transform', async () => {
      const testData = {
        data: [{ id: 1 }, { id: 2 }],
        meta: { page: 1, page_size: 20, total: 2 },
        links: {}
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(testData),
      });

      source.url = 'https://tabular-api.data.gouv.fr/api/resources/abc/data/';
      source.id = 'test-source';
      source.paginate = true;
      source.pageSize = 20;
      source.transform = '';

      await (source as any)._fetchData();

      // Should extract json.data, not the whole json
      expect(source.getData()).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('uses transform over auto-extract when both available', async () => {
      const testData = {
        data: [{ id: 1 }],
        results: [{ id: 99 }],
        meta: { page: 1, page_size: 20, total: 1 }
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(testData),
      });

      source.url = 'https://tabular-api.data.gouv.fr/api/resources/abc/data/';
      source.id = 'test-source';
      source.paginate = true;
      source.pageSize = 20;
      source.transform = 'results';

      await (source as any)._fetchData();

      expect(source.getData()).toEqual([{ id: 99 }]);
    });

    it('updates currentPage on page request', () => {
      source.url = 'https://tabular-api.data.gouv.fr/api/resources/abc/data/';
      source.paginate = true;
      source.pageSize = 20;
      source.method = 'GET';
      source.params = '';

      (source as any)._currentPage = 3;
      const url = (source as any)._buildUrl();
      expect(url).toContain('page=3');
    });
  });

  describe('public API', () => {
    it('getData() returns null initially', () => {
      expect(source.getData()).toBeNull();
    });

    it('isLoading() returns false initially', () => {
      expect(source.isLoading()).toBe(false);
    });

    it('getError() returns null initially', () => {
      expect(source.getError()).toBeNull();
    });
  });
});
