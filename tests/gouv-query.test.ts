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
import { clearDataCache, dispatchDataLoaded } from '../src/utils/data-bridge.js';

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

    it('respects max page_size of 50', () => {
      query.limit = 100;
      const url = (query as any)._buildTabularUrl();
      expect(url).toContain('page_size=50');
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
});
