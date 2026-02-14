import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

import { TabularAdapter } from '../../src/adapters/tabular-adapter.js';
import type { AdapterParams, ServerSideOverlay } from '../../src/adapters/api-adapter.js';

function makeParams(overrides: Partial<AdapterParams> = {}): AdapterParams {
  return {
    baseUrl: 'https://tabular-api.data.gouv.fr',
    datasetId: 'dataset-123',
    resource: 'resource-456',
    select: '',
    where: '',
    filter: '',
    groupBy: '',
    aggregate: '',
    orderBy: '',
    limit: 0,
    transform: '',
    pageSize: 20,
    ...overrides,
  };
}

describe('TabularAdapter', () => {
  const adapter = new TabularAdapter();

  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('validate', () => {
    it('returns error when resource is missing', () => {
      expect(adapter.validate(makeParams({ resource: '' }))).toBe(
        'attribut "resource" requis pour les requetes Tabular'
      );
    });

    it('returns null when resource is present', () => {
      expect(adapter.validate(makeParams())).toBeNull();
    });
  });

  describe('URL building', () => {
    it('builds base URL correctly', () => {
      const url = adapter.buildUrl(makeParams());
      expect(url).toContain('https://tabular-api.data.gouv.fr/api/resources/resource-456/data/');
    });

    it('adds filter parameters with operator mapping', () => {
      const url = adapter.buildUrl(makeParams({ filter: 'statut:eq:actif' }));
      expect(url).toContain('statut__exact=actif');
    });

    it('maps gte operator correctly', () => {
      const url = adapter.buildUrl(makeParams({ filter: 'score:gte:80' }));
      expect(url).toContain('score__greater=80');
    });

    it('uses where as fallback for filter', () => {
      const url = adapter.buildUrl(makeParams({ where: 'score:gte:80' }));
      expect(url).toContain('score__greater=80');
    });

    it('adds groupby parameters', () => {
      const url = adapter.buildUrl(makeParams({ groupBy: 'region, departement' }));
      expect(url).toContain('region__groupby');
      expect(url).toContain('departement__groupby');
    });

    it('adds aggregation parameters', () => {
      const url = adapter.buildUrl(makeParams({ aggregate: 'population:sum, count:count' }));
      expect(url).toContain('population__sum');
      expect(url).toContain('count__count');
    });

    it('adds sort parameter', () => {
      const url = adapter.buildUrl(makeParams({ orderBy: 'population__sum:desc' }));
      expect(url).toContain('population__sum__sort=desc');
    });

    it('uses limit as page_size when no override', () => {
      const url = adapter.buildUrl(makeParams({ limit: 100 }));
      expect(url).toContain('page_size=100');
    });

    it('accepts pageSizeOverride and pageOverride', () => {
      const url = adapter.buildUrl(makeParams({ limit: 50 }), 100, 3);
      expect(url).toContain('page_size=100');
      expect(url).toContain('page=3');
    });

    it('handles filter values containing colons', () => {
      const url = adapter.buildUrl(makeParams({ filter: 'time:eq:12:30:00' }));
      expect(url).toContain('time__exact=12%3A30%3A00');
    });
  });

  describe('Operator mapping', () => {
    const cases: [string, string][] = [
      ['eq', 'exact'],
      ['neq', 'differs'],
      ['gt', 'strictly_greater'],
      ['gte', 'greater'],
      ['lt', 'strictly_less'],
      ['lte', 'less'],
      ['contains', 'contains'],
      ['notcontains', 'notcontains'],
      ['in', 'in'],
      ['notin', 'notin'],
      ['isnull', 'isnull'],
      ['isnotnull', 'isnotnull'],
    ];

    for (const [input, expected] of cases) {
      it(`maps ${input} to ${expected}`, () => {
        const url = adapter.buildUrl(makeParams({ filter: `field:${input}:val` }));
        expect(url).toContain(`field__${expected}=`);
      });
    }

    it('passes through unknown operators unchanged', () => {
      const url = adapter.buildUrl(makeParams({ filter: 'field:custom:val' }));
      expect(url).toContain('field__custom=');
    });
  });

  describe('Server-side URL building', () => {
    const overlay = (overrides: Partial<ServerSideOverlay> = {}): ServerSideOverlay => ({
      page: 1,
      effectiveWhere: '',
      orderBy: '',
      ...overrides,
    });

    it('builds URL with page and page_size', () => {
      const url = adapter.buildServerSideUrl(makeParams(), overlay({ page: 2 }));
      expect(url).toContain('page_size=20');
      expect(url).toContain('page=2');
    });

    it('uses overlay orderBy', () => {
      const url = adapter.buildServerSideUrl(
        makeParams({ orderBy: 'date:desc' }),
        overlay({ orderBy: 'nom:asc' })
      );
      expect(url).toContain('nom__sort=asc');
      expect(url).not.toContain('date');
    });

    it('includes static filters', () => {
      const url = adapter.buildServerSideUrl(
        makeParams({ filter: 'statut:eq:actif' }),
        overlay()
      );
      expect(url).toContain('statut__exact=actif');
    });
  });

  describe('Pagination (fetchAll)', () => {
    it('fetches multiple pages via links.next', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 100 }, (_, i) => ({ id: i })),
          links: { next: 'https://tabular-api.data.gouv.fr/api/resources/resource-456/data/?page=2&page_size=100' },
          meta: { page: 1, page_size: 100, total: 150 },
        }),
      });
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 50 }, (_, i) => ({ id: 100 + i })),
          links: {},
          meta: { page: 2, page_size: 100, total: 150 },
        }),
      });

      const result = await adapter.fetchAll(makeParams(), new AbortController().signal);

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result.data).toHaveLength(150);
      expect(result.needsClientProcessing).toBe(true);
    });

    it('stops when meta.total is reached', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 30 }, (_, i) => ({ id: i })),
          links: {},
          meta: { page: 1, page_size: 100, total: 30 },
        }),
      });

      const result = await adapter.fetchAll(makeParams(), new AbortController().signal);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result.data).toHaveLength(30);
    });

    it('trims to limit when limit > 0', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 100 }, (_, i) => ({ id: i })),
          links: {},
          meta: { page: 1, page_size: 100, total: 200 },
        }),
      });

      const result = await adapter.fetchAll(
        makeParams({ limit: 50 }),
        new AbortController().signal
      );

      expect(result.data).toHaveLength(50);
    });

    it('extracts page number from links.next URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 100 }, (_, i) => ({ id: i })),
          links: { next: 'https://tabular-api.data.gouv.fr/api/resources/resource-456/data/?page=2&page_size=100' },
          meta: { page: 1, page_size: 100, total: 200 },
        }),
      });
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 100 }, (_, i) => ({ id: 100 + i })),
          links: {},
          meta: { page: 2, page_size: 100, total: 200 },
        }),
      });

      await adapter.fetchAll(makeParams(), new AbortController().signal);

      const secondCallUrl = mockFetch.mock.calls[1][0] as string;
      expect(secondCallUrl).toContain('page=2');
    });

    it('returns needsClientProcessing=true', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: [{ id: 1 }],
          links: {},
          meta: { page: 1, page_size: 100, total: 1 },
        }),
      });

      const result = await adapter.fetchAll(makeParams(), new AbortController().signal);
      expect(result.needsClientProcessing).toBe(true);
    });
  });

  describe('Headers propagation', () => {
    it('passes headers to fetch in fetchAll', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: [{ id: 1 }],
          links: {},
          meta: { page: 1, page_size: 100, total: 1 },
        }),
      });

      await adapter.fetchAll(
        makeParams({ headers: { apikey: 'secret123' } }),
        new AbortController().signal
      );

      const fetchOpts = mockFetch.mock.calls[0][1] as RequestInit;
      expect(fetchOpts.headers).toEqual({ apikey: 'secret123' });
    });

    it('passes headers to fetch in fetchPage', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: [{ id: 1 }],
          meta: { page: 1, page_size: 20, total: 1 },
        }),
      });

      await adapter.fetchPage(
        makeParams({ headers: { Authorization: 'Bearer xyz' } }),
        { page: 1, effectiveWhere: '', orderBy: '' },
        new AbortController().signal
      );

      const fetchOpts = mockFetch.mock.calls[0][1] as RequestInit;
      expect(fetchOpts.headers).toEqual({ Authorization: 'Bearer xyz' });
    });

    it('does not set headers when empty', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: [],
          links: {},
          meta: { page: 1, page_size: 100, total: 0 },
        }),
      });

      await adapter.fetchAll(makeParams(), new AbortController().signal);

      const fetchOpts = mockFetch.mock.calls[0][1] as RequestInit;
      expect(fetchOpts.headers).toBeUndefined();
    });
  });

  describe('Server-side fetch (fetchPage)', () => {
    it('fetches one page and returns data with totalCount', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 20 }, (_, i) => ({ id: i })),
          meta: { page: 1, page_size: 20, total: 300 },
        }),
      });

      const result = await adapter.fetchPage(
        makeParams(),
        { page: 1, effectiveWhere: '', orderBy: '' },
        new AbortController().signal
      );

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result.data).toHaveLength(20);
      expect(result.totalCount).toBe(300);
      expect(result.needsClientProcessing).toBe(false);
      expect(result.rawJson).toBeDefined();
    });

    it('throws on HTTP error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(
        adapter.fetchPage(
          makeParams(),
          { page: 1, effectiveWhere: '', orderBy: '' },
          new AbortController().signal
        )
      ).rejects.toThrow('HTTP 500');
    });
  });
});
