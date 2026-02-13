import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Tests for GouvQuery component logic.
 *
 * Tests the client-side filtering, grouping, and aggregation logic.
 */

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

// We need to import after setting up fetch mock
import { GouvQuery } from '../src/components/gouv-query.js';
import {
  clearDataCache,
  clearDataMeta,
  dispatchDataLoaded,
  dispatchSourceCommand,
  getDataMeta,
  subscribeToSourceCommands
} from '../src/utils/data-bridge.js';

describe('GouvQuery', () => {
  let query: GouvQuery;

  beforeEach(() => {
    clearDataCache('test-query');
    clearDataCache('test-source');
    mockFetch.mockReset();
    query = new GouvQuery();
  });

  afterEach(() => {
    if (query.isConnected) {
      query.disconnectedCallback();
    }
  });

  describe('Filter parsing', () => {
    it('parses simple equality filter', () => {
      const filters = (query as any)._parseFilters('status:eq:active');
      expect(filters).toHaveLength(1);
      expect(filters[0]).toEqual({
        field: 'status',
        operator: 'eq',
        value: 'active'
      });
    });

    it('parses numeric filter values', () => {
      const filters = (query as any)._parseFilters('score:gte:80');
      expect(filters[0].value).toBe(80);
    });

    it('parses boolean filter values', () => {
      const filters = (query as any)._parseFilters('isActive:eq:true');
      expect(filters[0].value).toBe(true);
    });

    it('parses multiple filters', () => {
      const filters = (query as any)._parseFilters('status:eq:active, score:gte:80');
      expect(filters).toHaveLength(2);
      expect(filters[0].field).toBe('status');
      expect(filters[1].field).toBe('score');
    });

    it('parses in operator with multiple values', () => {
      const filters = (query as any)._parseFilters('region:in:IDF|PACA|ARA');
      expect(filters[0].operator).toBe('in');
      expect(filters[0].value).toEqual(['IDF', 'PACA', 'ARA']);
    });

    it('handles values containing colons', () => {
      const filters = (query as any)._parseFilters('time:eq:12:30:00');
      expect(filters[0].value).toBe('12:30:00');
    });
  });

  describe('Filter matching', () => {
    const testItem = {
      name: 'Paris',
      population: 2200000,
      region: 'IDF',
      isCapital: true,
      description: 'Capitale de la France'
    };

    it('matches equality filter', () => {
      const filter = { field: 'region', operator: 'eq' as const, value: 'IDF' };
      expect((query as any)._matchesFilter(testItem, filter)).toBe(true);
    });

    it('matches inequality filter', () => {
      const filter = { field: 'region', operator: 'neq' as const, value: 'PACA' };
      expect((query as any)._matchesFilter(testItem, filter)).toBe(true);
    });

    it('matches greater than filter', () => {
      const filter = { field: 'population', operator: 'gt' as const, value: 1000000 };
      expect((query as any)._matchesFilter(testItem, filter)).toBe(true);
    });

    it('matches less than or equal filter', () => {
      const filter = { field: 'population', operator: 'lte' as const, value: 2200000 };
      expect((query as any)._matchesFilter(testItem, filter)).toBe(true);
    });

    it('matches contains filter (case insensitive)', () => {
      const filter = { field: 'description', operator: 'contains' as const, value: 'capitale' };
      expect((query as any)._matchesFilter(testItem, filter)).toBe(true);
    });

    it('matches in filter', () => {
      const filter = { field: 'region', operator: 'in' as const, value: ['IDF', 'PACA'] };
      expect((query as any)._matchesFilter(testItem, filter)).toBe(true);
    });

    it('matches isnotnull filter', () => {
      const filter = { field: 'name', operator: 'isnotnull' as const };
      expect((query as any)._matchesFilter(testItem, filter)).toBe(true);
    });

    it('eq matches with type coercion (string "84" == number 84)', () => {
      const item = { code_region: '84', name: 'Auvergne-Rhone-Alpes' };
      const filter = { field: 'code_region', operator: 'eq' as const, value: 84 };
      expect((query as any)._matchesFilter(item, filter)).toBe(true);
    });

    it('eq matches with type coercion (number 84 == string "84")', () => {
      const item = { code_region: 84, name: 'Auvergne-Rhone-Alpes' };
      const filter = { field: 'code_region', operator: 'eq' as const, value: '84' };
      expect((query as any)._matchesFilter(item, filter)).toBe(true);
    });

    it('neq rejects with type coercion (string "84" == number 84)', () => {
      const item = { code_region: '84', name: 'Auvergne-Rhone-Alpes' };
      const filter = { field: 'code_region', operator: 'neq' as const, value: 84 };
      expect((query as any)._matchesFilter(item, filter)).toBe(false);
    });
  });

  describe('Aggregation parsing', () => {
    it('parses single aggregation', () => {
      const aggregates = (query as any)._parseAggregates('population:sum');
      expect(aggregates).toHaveLength(1);
      expect(aggregates[0]).toEqual({
        field: 'population',
        function: 'sum',
        alias: undefined
      });
    });

    it('parses aggregation with alias', () => {
      const aggregates = (query as any)._parseAggregates('population:sum:total_pop');
      expect(aggregates[0].alias).toBe('total_pop');
    });

    it('parses multiple aggregations', () => {
      const aggregates = (query as any)._parseAggregates('population:sum, score:avg, count:count');
      expect(aggregates).toHaveLength(3);
      expect(aggregates[0].function).toBe('sum');
      expect(aggregates[1].function).toBe('avg');
      expect(aggregates[2].function).toBe('count');
    });
  });

  describe('Aggregation computation', () => {
    const testItems = [
      { region: 'IDF', population: 1000, score: 80 },
      { region: 'IDF', population: 2000, score: 90 },
      { region: 'PACA', population: 500, score: 70 }
    ];

    it('computes sum aggregation', () => {
      const agg = { field: 'population', function: 'sum' as const };
      const result = (query as any)._computeAggregate(testItems, agg);
      expect(result).toBe(3500);
    });

    it('computes avg aggregation', () => {
      const agg = { field: 'score', function: 'avg' as const };
      const result = (query as any)._computeAggregate(testItems, agg);
      expect(result).toBe(80);
    });

    it('computes count aggregation', () => {
      const agg = { field: 'population', function: 'count' as const };
      const result = (query as any)._computeAggregate(testItems, agg);
      expect(result).toBe(3);
    });

    it('computes min aggregation', () => {
      const agg = { field: 'population', function: 'min' as const };
      const result = (query as any)._computeAggregate(testItems, agg);
      expect(result).toBe(500);
    });

    it('computes max aggregation', () => {
      const agg = { field: 'population', function: 'max' as const };
      const result = (query as any)._computeAggregate(testItems, agg);
      expect(result).toBe(2000);
    });
  });

  describe('Group by and aggregate', () => {
    beforeEach(() => {
      query.groupBy = 'region';
      query.aggregate = 'population:sum';
      (query as any)._rawData = [
        { region: 'IDF', population: 1000 },
        { region: 'IDF', population: 2000 },
        { region: 'PACA', population: 500 },
        { region: 'PACA', population: 300 }
      ];
    });

    it('groups data by field', () => {
      const result = (query as any)._applyGroupByAndAggregate((query as any)._rawData);
      expect(result).toHaveLength(2);
      expect(result.find((r: any) => r.region === 'IDF')).toBeDefined();
      expect(result.find((r: any) => r.region === 'PACA')).toBeDefined();
    });

    it('computes aggregation per group', () => {
      const result = (query as any)._applyGroupByAndAggregate((query as any)._rawData);
      const idf = result.find((r: any) => r.region === 'IDF');
      const paca = result.find((r: any) => r.region === 'PACA');

      expect(idf['population__sum']).toBe(3000);
      expect(paca['population__sum']).toBe(800);
    });

    it('handles multiple group by fields', () => {
      query.groupBy = 'region, year';
      (query as any)._rawData = [
        { region: 'IDF', year: 2023, population: 1000 },
        { region: 'IDF', year: 2024, population: 1100 },
        { region: 'PACA', year: 2023, population: 500 }
      ];

      const result = (query as any)._applyGroupByAndAggregate((query as any)._rawData);
      expect(result).toHaveLength(3);
    });
  });

  describe('Sorting', () => {
    const testData = [
      { name: 'Paris', value: 100 },
      { name: 'Lyon', value: 300 },
      { name: 'Marseille', value: 200 }
    ];

    it('sorts ascending by numeric field', () => {
      query.orderBy = 'value:asc';
      const result = (query as any)._applySort(testData);
      expect(result[0].name).toBe('Paris');
      expect(result[2].name).toBe('Lyon');
    });

    it('sorts descending by numeric field', () => {
      query.orderBy = 'value:desc';
      const result = (query as any)._applySort(testData);
      expect(result[0].name).toBe('Lyon');
      expect(result[2].name).toBe('Paris');
    });

    it('sorts by string field', () => {
      query.orderBy = 'name:asc';
      const result = (query as any)._applySort(testData);
      expect(result[0].name).toBe('Lyon');
      expect(result[2].name).toBe('Paris');
    });
  });

  describe('Full processing pipeline', () => {
    beforeEach(() => {
      query.id = 'test-query';
      query.source = 'test-source';
      query.filter = 'population:gte:500';
      query.groupBy = 'region';
      query.aggregate = 'population:sum';
      query.orderBy = 'population__sum:desc';
      query.limit = 5;

      (query as any)._rawData = [
        { region: 'IDF', population: 1000 },
        { region: 'IDF', population: 2000 },
        { region: 'PACA', population: 500 },
        { region: 'ARA', population: 100 }, // Should be filtered out
        { region: 'PACA', population: 800 }
      ];
    });

    it('applies filter -> group -> aggregate -> sort -> limit', () => {
      (query as any)._processClientSide();

      const result = query.getData() as any[];
      expect(result).toHaveLength(2); // IDF and PACA (ARA filtered out)
      expect(result[0].region).toBe('IDF'); // Highest sum
      expect(result[0]['population__sum']).toBe(3000);
      expect(result[1].region).toBe('PACA');
      expect(result[1]['population__sum']).toBe(1300);
    });
  });

  describe('OpenDataSoft URL building', () => {
    beforeEach(() => {
      query.apiType = 'opendatasoft';
      query.datasetId = 'communes-france';
      query.baseUrl = 'https://data.example.com';
    });

    it('builds base URL correctly', () => {
      const url = (query as any)._buildOpenDataSoftUrl();
      expect(url).toContain('https://data.example.com/api/explore/v2.1/catalog/datasets/communes-france/records');
    });

    it('adds select clause', () => {
      query.select = 'sum(population) as total, region';
      const url = (query as any)._buildOpenDataSoftUrl();
      // URL encodes parentheses, so check for the encoded form
      expect(url).toContain('select=');
      expect(url).toContain('population');
    });

    it('adds where clause', () => {
      query.where = 'population > 5000';
      const url = (query as any)._buildOpenDataSoftUrl();
      expect(url).toContain('where=population');
    });

    it('adds group_by clause', () => {
      query.groupBy = 'region';
      const url = (query as any)._buildOpenDataSoftUrl();
      expect(url).toContain('group_by=region');
    });

    it('adds order_by clause', () => {
      query.orderBy = 'total:desc';
      const url = (query as any)._buildOpenDataSoftUrl();
      expect(url).toContain('order_by=total');
      expect(url).toContain('DESC');
    });

    it('adds limit', () => {
      query.limit = 20;
      const url = (query as any)._buildOpenDataSoftUrl();
      expect(url).toContain('limit=20');
    });

    it('caps limit at 100 (ODS max) when no override', () => {
      query.limit = 200;
      const url = (query as any)._buildOpenDataSoftUrl();
      expect(url).toContain('limit=100');
      expect(url).not.toContain('limit=200');
    });

    it('uses limitOverride when provided', () => {
      query.limit = 200;
      const url = (query as any)._buildOpenDataSoftUrl(8);
      expect(url).toContain('limit=8');
    });

    it('adds offset when provided and > 0', () => {
      const url = (query as any)._buildOpenDataSoftUrl(100, 100);
      expect(url).toContain('offset=100');
    });

    it('does not add offset when 0', () => {
      const url = (query as any)._buildOpenDataSoftUrl(100, 0);
      expect(url).not.toContain('offset');
    });
  });

  describe('OpenDataSoft pagination', () => {
    beforeEach(() => {
      query.apiType = 'opendatasoft';
      query.datasetId = 'fiscalite-locale';
      query.baseUrl = 'https://data.example.com';
      query.id = 'ods-test';
      query.groupBy = 'dep';
      query.select = 'dep, avg(taux) as value';
    });

    it('fetches single page when limit <= 100', async () => {
      query.limit = 50;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 50 }, (_, i) => ({ dep: String(i), value: i })),
          total_count: 50
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromOdsWithPagination();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(query.getData()).toHaveLength(50);
    });

    it('fetches multiple pages when limit > 100 (department map case)', async () => {
      query.limit = 108;

      // Page 1: 100 results
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 100 }, (_, i) => ({ dep: String(i).padStart(2, '0'), value: i })),
          total_count: 108
        })
      });
      // Page 2: 8 results
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 8 }, (_, i) => ({ dep: String(100 + i), value: 100 + i })),
          total_count: 108
        })
      });

      // Need an AbortController for the fetch
      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromOdsWithPagination();

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(query.getData()).toHaveLength(108);
    });

    it('stops when page returns fewer results than page size', async () => {
      query.limit = 200;

      // Single page returns only 75 results (dataset has fewer records)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 75 }, (_, i) => ({ dep: String(i), value: i })),
          total_count: 75
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromOdsWithPagination();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(query.getData()).toHaveLength(75);
    });

    it('sends correct offset in second page URL', async () => {
      query.limit = 110;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 100 }, (_, i) => ({ dep: String(i), value: i })),
          total_count: 110
        })
      });
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 10 }, (_, i) => ({ dep: String(100 + i), value: 100 + i })),
          total_count: 110
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromOdsWithPagination();

      // Check second call URL contains offset=100
      const secondCallUrl = mockFetch.mock.calls[1][0] as string;
      expect(secondCallUrl).toContain('offset=100');
      expect(secondCallUrl).toContain('limit=10');
    });

    it('fetches all records when limit=0 (default), using total_count', async () => {
      query.limit = 0; // No explicit limit = fetch all

      // Page 1: 100 results, total_count=108
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 100 }, (_, i) => ({ dep: String(i), value: i })),
          total_count: 108
        })
      });
      // Page 2: 8 results
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 8 }, (_, i) => ({ dep: String(100 + i), value: 100 + i })),
          total_count: 108
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromOdsWithPagination();

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(query.getData()).toHaveLength(108);
      // Verify first page URL has limit=100 (not 200 or anything > 100)
      const firstCallUrl = mockFetch.mock.calls[0][0] as string;
      expect(firstCallUrl).toContain('limit=100');
      expect(firstCallUrl).not.toContain('limit=200');
    });

    it('warns on incomplete pagination', async () => {
      query.limit = 50;
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // API says 80 results exist but we only asked for 50
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 50 }, (_, i) => ({ dep: String(i), value: i })),
          total_count: 80
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromOdsWithPagination();

      // Should NOT warn: we got what we asked for (50), even though total_count is 80
      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe('Tabular API URL building', () => {
    beforeEach(() => {
      query.apiType = 'tabular';
      query.datasetId = 'dataset-123';
      query.resource = 'resource-456';
      query.baseUrl = 'https://tabular-api.data.gouv.fr';
    });

    it('builds base URL correctly', () => {
      const url = (query as any)._buildTabularUrl();
      expect(url).toContain('https://tabular-api.data.gouv.fr/api/resources/resource-456/data/');
    });

    it('adds filter parameters', () => {
      query.filter = 'statut:eq:actif';
      const url = (query as any)._buildTabularUrl();
      expect(url).toContain('statut__exact=actif');
    });

    it('maps filter operators correctly', () => {
      query.filter = 'score:gte:80';
      const url = (query as any)._buildTabularUrl();
      expect(url).toContain('score__greater=80');
    });

    it('adds groupby parameters', () => {
      query.groupBy = 'region, departement';
      const url = (query as any)._buildTabularUrl();
      expect(url).toContain('region__groupby');
      expect(url).toContain('departement__groupby');
    });

    it('adds aggregation parameters', () => {
      query.aggregate = 'population:sum, count:count';
      const url = (query as any)._buildTabularUrl();
      expect(url).toContain('population__sum');
      expect(url).toContain('count__count');
    });

    it('adds sort parameter', () => {
      query.orderBy = 'population__sum:desc';
      const url = (query as any)._buildTabularUrl();
      expect(url).toContain('population__sum__sort=desc');
    });

    it('uses limit as page_size when no override', () => {
      query.limit = 100;
      const url = (query as any)._buildTabularUrl();
      expect(url).toContain('page_size=100');
    });

    it('accepts pageSizeOverride and pageOverride', () => {
      query.limit = 50;
      const url = (query as any)._buildTabularUrl(100, 3);
      expect(url).toContain('page_size=100');
      expect(url).toContain('page=3');
    });
  });

  describe('Tabular API multi-page pagination', () => {
    beforeEach(() => {
      query.id = 'test-query';
      query.apiType = 'tabular';
      query.resource = 'resource-456';
      query.baseUrl = 'https://tabular-api.data.gouv.fr';
      query.limit = 0; // fetch all
    });

    it('fetches multiple pages via links.next', async () => {
      // Page 1: 100 results, has next
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 100 }, (_, i) => ({ id: i })),
          links: { next: 'https://tabular-api.data.gouv.fr/api/resources/resource-456/data/?page=2&page_size=100' },
          meta: { page: 1, page_size: 100, total: 150 }
        })
      });
      // Page 2: 50 results, no next
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 50 }, (_, i) => ({ id: 100 + i })),
          links: {},
          meta: { page: 2, page_size: 100, total: 150 }
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromTabularWithPagination();

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(query.getData()).toHaveLength(150);
    });

    it('stops when meta.total is reached', async () => {
      // Single page with all data
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 30 }, (_, i) => ({ id: i })),
          links: {},
          meta: { page: 1, page_size: 100, total: 30 }
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromTabularWithPagination();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(query.getData()).toHaveLength(30);
    });

    it('trims to limit when limit > 0', async () => {
      query.limit = 50;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 100 }, (_, i) => ({ id: i })),
          links: {},
          meta: { page: 1, page_size: 100, total: 200 }
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromTabularWithPagination();

      // _processClientSide applies limit, so result should be 50
      expect(query.getData()).toHaveLength(50);
    });

    it('applies group-by and aggregate after multi-page fetch', async () => {
      query.groupBy = 'region';
      query.aggregate = 'value:sum:Total';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: [
            { region: 'A', value: 10 },
            { region: 'B', value: 20 },
            { region: 'A', value: 30 },
          ],
          links: {},
          meta: { page: 1, page_size: 100, total: 3 }
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromTabularWithPagination();

      const data = query.getData() as Record<string, unknown>[];
      expect(data).toHaveLength(2);
      const regionA = data.find(d => d.region === 'A');
      expect(regionA?.Total).toBe(40);
    });

    it('extracts page number from links.next URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 100 }, (_, i) => ({ id: i })),
          links: { next: 'https://tabular-api.data.gouv.fr/api/resources/resource-456/data/?page=2&page_size=100' },
          meta: { page: 1, page_size: 100, total: 200 }
        })
      });
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 100 }, (_, i) => ({ id: 100 + i })),
          links: {},
          meta: { page: 2, page_size: 100, total: 200 }
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchFromTabularWithPagination();

      // Second call should use page=2
      const secondCallUrl = mockFetch.mock.calls[1][0] as string;
      expect(secondCallUrl).toContain('page=2');
    });
  });

  describe('Public API', () => {
    it('getData returns current data', () => {
      (query as any)._data = [{ test: 1 }];
      expect(query.getData()).toEqual([{ test: 1 }]);
    });

    it('isLoading returns loading state', () => {
      (query as any)._loading = true;
      expect(query.isLoading()).toBe(true);
    });

    it('getError returns error state', () => {
      const error = new Error('Test error');
      (query as any)._error = error;
      expect(query.getError()).toBe(error);
    });
  });

  describe('Server-side mode: ODS URL building', () => {
    beforeEach(() => {
      query.apiType = 'opendatasoft';
      query.datasetId = 'rappelconso';
      query.baseUrl = 'https://data.example.com';
      query.serverSide = true;
      query.pageSize = 20;
    });

    it('builds URL with limit=pageSize and offset for current page', () => {
      (query as any)._serverPage = 3;
      const url = (query as any)._buildServerSideOdsUrl();
      expect(url).toContain('limit=20');
      expect(url).toContain('offset=40');
    });

    it('does not include offset for page 1', () => {
      (query as any)._serverPage = 1;
      const url = (query as any)._buildServerSideOdsUrl();
      expect(url).toContain('limit=20');
      expect(url).not.toContain('offset');
    });

    it('merges static where with dynamic server where via AND', () => {
      query.where = 'status="active"';
      (query as any)._serverWhere = 'search("test")';
      const url = (query as any)._buildServerSideOdsUrl();
      const params = new URL(url).searchParams;
      expect(params.get('where')).toBe('status="active" AND search("test")');
    });

    it('uses only static where when server where is empty', () => {
      query.where = 'status="active"';
      (query as any)._serverWhere = '';
      const url = (query as any)._buildServerSideOdsUrl();
      const params = new URL(url).searchParams;
      expect(params.get('where')).toBe('status="active"');
    });

    it('uses only dynamic where when static where is empty', () => {
      query.where = '';
      (query as any)._serverWhere = 'search("hello")';
      const url = (query as any)._buildServerSideOdsUrl();
      const params = new URL(url).searchParams;
      expect(params.get('where')).toBe('search("hello")');
    });

    it('uses server orderBy overlay over static orderBy', () => {
      query.orderBy = 'date:desc';
      (query as any)._serverOrderBy = 'nom:asc';
      const url = (query as any)._buildServerSideOdsUrl();
      expect(url).toContain('order_by=nom');
      expect(url).toContain('ASC');
      expect(url).not.toContain('date');
    });

    it('falls back to static orderBy when server orderBy is empty', () => {
      query.orderBy = 'date:desc';
      (query as any)._serverOrderBy = '';
      const url = (query as any)._buildServerSideOdsUrl();
      expect(url).toContain('order_by=date');
      expect(url).toContain('DESC');
    });

    it('includes select when specified', () => {
      query.select = 'nom, date, categorie';
      const url = (query as any)._buildServerSideOdsUrl();
      const params = new URL(url).searchParams;
      expect(params.get('select')).toBe('nom, date, categorie');
    });

    it('includes group_by when specified', () => {
      query.groupBy = 'categorie';
      const url = (query as any)._buildServerSideOdsUrl();
      expect(url).toContain('group_by=categorie');
    });
  });

  describe('Server-side mode: Tabular URL building', () => {
    beforeEach(() => {
      query.apiType = 'tabular';
      query.resource = 'resource-789';
      query.baseUrl = 'https://tabular-api.data.gouv.fr';
      query.serverSide = true;
      query.pageSize = 20;
    });

    it('builds URL with page and page_size', () => {
      (query as any)._serverPage = 2;
      const url = (query as any)._buildServerSideTabularUrl();
      expect(url).toContain('page_size=20');
      expect(url).toContain('page=2');
    });

    it('uses server orderBy overlay over static orderBy', () => {
      query.orderBy = 'date:desc';
      (query as any)._serverOrderBy = 'nom:asc';
      const url = (query as any)._buildServerSideTabularUrl();
      expect(url).toContain('nom__sort=asc');
      expect(url).not.toContain('date');
    });

    it('includes static filters', () => {
      query.filter = 'statut:eq:actif';
      const url = (query as any)._buildServerSideTabularUrl();
      expect(url).toContain('statut__exact=actif');
    });
  });

  describe('Server-side mode: fetch', () => {
    beforeEach(() => {
      query.id = 'test-query';
      query.serverSide = true;
      query.pageSize = 20;
      clearDataMeta('test-query');
    });

    afterEach(() => {
      clearDataMeta('test-query');
    });

    it('fetches one ODS page and stores pagination meta', async () => {
      query.apiType = 'opendatasoft';
      query.datasetId = 'rappelconso';
      query.baseUrl = 'https://data.example.com';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: Array.from({ length: 20 }, (_, i) => ({ id: i, nom: `item-${i}` })),
          total_count: 500
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchServerSide();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(query.getData()).toHaveLength(20);

      const meta = getDataMeta('test-query');
      expect(meta).toBeDefined();
      expect(meta!.page).toBe(1);
      expect(meta!.pageSize).toBe(20);
      expect(meta!.total).toBe(500);
    });

    it('fetches one Tabular page and stores pagination meta', async () => {
      query.apiType = 'tabular';
      query.resource = 'resource-456';
      query.baseUrl = 'https://tabular-api.data.gouv.fr';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          data: Array.from({ length: 20 }, (_, i) => ({ id: i })),
          meta: { page: 1, page_size: 20, total: 300 }
        })
      });

      (query as any)._abortController = new AbortController();
      await (query as any)._fetchServerSide();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(query.getData()).toHaveLength(20);

      const meta = getDataMeta('test-query');
      expect(meta).toBeDefined();
      expect(meta!.total).toBe(300);
    });
  });

  describe('Server-side mode: command handling', () => {
    beforeEach(() => {
      query.id = 'test-query';
      query.apiType = 'opendatasoft';
      query.datasetId = 'rappelconso';
      query.baseUrl = 'https://data.example.com';
      query.serverSide = true;
      query.pageSize = 20;
      clearDataMeta('test-query');
    });

    afterEach(() => {
      clearDataMeta('test-query');
    });

    it('listens for source commands when server-side is enabled', () => {
      (query as any)._setupServerSideListener();
      expect((query as any)._unsubscribeCommands).toBeTypeOf('function');
    });

    it('does not listen when server-side is disabled', () => {
      query.serverSide = false;
      (query as any)._setupServerSideListener();
      expect((query as any)._unsubscribeCommands).toBeNull();
    });

    it('updates _serverPage on page command', () => {
      (query as any)._setupServerSideListener();

      // Mock _fetchFromApi to avoid actual fetch
      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { page: 3 });

      expect((query as any)._serverPage).toBe(3);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      fetchSpy.mockRestore();
    });

    it('updates _serverWhere on where command and resets page', () => {
      (query as any)._setupServerSideListener();
      (query as any)._serverPage = 5;

      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { where: 'search("test")' });

      expect((query as any)._serverWhere).toBe('search("test")');
      expect((query as any)._serverPage).toBe(1); // Reset on search change
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      fetchSpy.mockRestore();
    });

    it('updates _serverOrderBy on orderBy command and resets page', () => {
      (query as any)._setupServerSideListener();
      (query as any)._serverPage = 3;

      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { orderBy: 'nom:asc' });

      expect((query as any)._serverOrderBy).toBe('nom:asc');
      expect((query as any)._serverPage).toBe(1); // Reset on sort change
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      fetchSpy.mockRestore();
    });

    it('does not re-fetch when command has same values', () => {
      (query as any)._setupServerSideListener();
      (query as any)._serverPage = 3;
      (query as any)._serverWhere = 'search("test")';

      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { page: 3 });
      expect(fetchSpy).not.toHaveBeenCalled();

      dispatchSourceCommand('test-query', { where: 'search("test")' });
      expect(fetchSpy).not.toHaveBeenCalled();

      fetchSpy.mockRestore();
    });

    it('ignores commands for other sources', () => {
      (query as any)._setupServerSideListener();

      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('other-query', { page: 5 });

      expect((query as any)._serverPage).toBe(1);
      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });

    it('handles combined page + where command', () => {
      (query as any)._setupServerSideListener();

      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { page: 2, where: 'search("hello")' });

      expect((query as any)._serverPage).toBe(2);
      expect((query as any)._serverWhere).toBe('search("hello")');
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      fetchSpy.mockRestore();
    });

    it('cleans up listener on cleanup', () => {
      (query as any)._setupServerSideListener();
      expect((query as any)._unsubscribeCommands).toBeTypeOf('function');

      (query as any)._cleanup();
      expect((query as any)._unsubscribeCommands).toBeNull();
    });
  });
});
