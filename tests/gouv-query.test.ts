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
import { getAdapter } from '../src/adapters/api-adapter.js';
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

  describe('Adapter delegation', () => {
    it('uses opendatasoft adapter when apiType is opendatasoft', () => {
      query.apiType = 'opendatasoft';
      (query as any)._adapter = getAdapter('opendatasoft');
      expect(query.getAdapter().type).toBe('opendatasoft');
    });

    it('uses tabular adapter when apiType is tabular', () => {
      query.apiType = 'tabular';
      (query as any)._adapter = getAdapter('tabular');
      expect(query.getAdapter().type).toBe('tabular');
    });

    it('uses generic adapter by default', () => {
      expect(query.getAdapter().type).toBe('generic');
    });

    it('exposes adapter capabilities', () => {
      (query as any)._adapter = getAdapter('opendatasoft');
      const caps = query.getAdapter().capabilities;
      expect(caps.serverFacets).toBe(true);
      expect(caps.serverSearch).toBe(true);
      expect(caps.whereFormat).toBe('odsql');
    });

    it('delegates ODS fetchAll to adapter', async () => {
      query.id = 'ods-delegation-test';
      query.apiType = 'opendatasoft';
      query.datasetId = 'test-dataset';
      query.baseUrl = 'https://data.example.com';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          results: [{ dep: '01', value: 10 }, { dep: '02', value: 20 }],
          total_count: 2,
        }),
      });

      (query as any)._adapter = getAdapter('opendatasoft');
      (query as any)._abortController = new AbortController();
      await (query as any)._fetchAllDelegated();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(query.getData()).toHaveLength(2);
    });

    it('delegates Tabular fetchAll with client processing', async () => {
      query.id = 'tab-delegation-test';
      query.apiType = 'tabular';
      query.resource = 'resource-456';
      query.baseUrl = 'https://tabular-api.data.gouv.fr';
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
          meta: { page: 1, page_size: 100, total: 3 },
        }),
      });

      (query as any)._adapter = getAdapter('tabular');
      (query as any)._abortController = new AbortController();
      await (query as any)._fetchAllDelegated();

      const data = query.getData() as Record<string, unknown>[];
      expect(data).toHaveLength(2);
      const regionA = data.find(d => d.region === 'A');
      expect(regionA?.Total).toBe(40);
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

  describe('Server-side mode: where merging for URL', () => {
    beforeEach(() => {
      query.apiType = 'opendatasoft';
      query.datasetId = 'rappelconso';
      query.baseUrl = 'https://data.example.com';
      query.serverSide = true;
      query.pageSize = 20;
    });

    it('merges static where with dynamic server where via AND', () => {
      query.where = 'status="active"';
      (query as any)._serverWheres.set('_default', 'search("test")');
      expect(query.getEffectiveWhere()).toBe('status="active" AND search("test")');
    });

    it('uses only static where when server where is empty', () => {
      query.where = 'status="active"';
      expect(query.getEffectiveWhere()).toBe('status="active"');
    });

    it('uses only dynamic where when static where is empty', () => {
      query.where = '';
      (query as any)._serverWheres.set('_default', 'search("hello")');
      expect(query.getEffectiveWhere()).toBe('search("hello")');
    });

    it('falls back to static orderBy when server orderBy is empty', () => {
      query.orderBy = 'date:desc';
      (query as any)._serverOrderBy = '';
      // effectiveOrderBy should be the static one
      expect((query as any)._serverOrderBy || query.orderBy).toBe('date:desc');
    });
  });

  describe('Server-side mode: fetch via adapter', () => {
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
          total_count: 500,
        }),
      });

      (query as any)._adapter = getAdapter('opendatasoft');
      (query as any)._abortController = new AbortController();
      await (query as any)._fetchServerSideDelegated();

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
          meta: { page: 1, page_size: 20, total: 300 },
        }),
      });

      (query as any)._adapter = getAdapter('tabular');
      (query as any)._abortController = new AbortController();
      await (query as any)._fetchServerSideDelegated();

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

    it('updates _serverWheres on where command and resets page', () => {
      (query as any)._setupServerSideListener();
      (query as any)._serverPage = 5;

      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { where: 'search("test")' });

      expect((query as any)._serverWheres.get('_default')).toBe('search("test")');
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
      (query as any)._serverWheres.set('_default', 'search("test")');

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
      expect((query as any)._serverWheres.get('_default')).toBe('search("hello")');
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

  describe('Server-side mode: whereKey support', () => {
    beforeEach(() => {
      query.id = 'test-query';
      query.apiType = 'opendatasoft';
      query.datasetId = 'rappelconso';
      query.baseUrl = 'https://data.example.com';
      query.serverSide = true;
      query.pageSize = 20;
    });

    it('stores where clauses by whereKey', () => {
      (query as any)._setupServerSideListener();
      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { where: 'search("jouet")', whereKey: 'search-1' });

      expect((query as any)._serverWheres.get('search-1')).toBe('search("jouet")');
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      fetchSpy.mockRestore();
    });

    it('merges multiple where clauses from different whereKeys', () => {
      (query as any)._setupServerSideListener();
      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { where: 'search("jouet")', whereKey: 'search-1' });
      dispatchSourceCommand('test-query', { where: 'region = "IDF"', whereKey: 'facets-1' });

      expect((query as any)._getMergedWhere()).toBe('search("jouet") AND region = "IDF"');
      expect(fetchSpy).toHaveBeenCalledTimes(2);
      fetchSpy.mockRestore();
    });

    it('resets page when merged where changes', () => {
      (query as any)._setupServerSideListener();
      (query as any)._serverPage = 5;
      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { where: 'region = "IDF"', whereKey: 'facets-1' });

      expect((query as any)._serverPage).toBe(1);
      fetchSpy.mockRestore();
    });

    it('does not re-fetch when same whereKey sends same value', () => {
      (query as any)._setupServerSideListener();
      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { where: 'search("jouet")', whereKey: 'search-1' });
      expect(fetchSpy).toHaveBeenCalledTimes(1);

      dispatchSourceCommand('test-query', { where: 'search("jouet")', whereKey: 'search-1' });
      expect(fetchSpy).toHaveBeenCalledTimes(1); // No new fetch

      fetchSpy.mockRestore();
    });

    it('removes whereKey when where is empty string', () => {
      (query as any)._setupServerSideListener();
      const fetchSpy = vi.spyOn(query as any, '_fetchFromApi').mockImplementation(() => {});

      dispatchSourceCommand('test-query', { where: 'search("jouet")', whereKey: 'search-1' });
      dispatchSourceCommand('test-query', { where: '', whereKey: 'search-1' });

      expect((query as any)._serverWheres.has('search-1')).toBe(false);
      expect((query as any)._getMergedWhere()).toBe('');
      fetchSpy.mockRestore();
    });

    it('getEffectiveWhere returns static + dynamic wheres', () => {
      query.where = 'status = "active"';
      (query as any)._serverWheres.set('search-1', 'search("jouet")');
      (query as any)._serverWheres.set('facets-1', 'region = "IDF"');

      expect(query.getEffectiveWhere()).toBe('status = "active" AND search("jouet") AND region = "IDF"');
    });

    it('getEffectiveWhere excludes given key', () => {
      query.where = 'status = "active"';
      (query as any)._serverWheres.set('search-1', 'search("jouet")');
      (query as any)._serverWheres.set('facets-1', 'region = "IDF"');

      expect(query.getEffectiveWhere('facets-1')).toBe('status = "active" AND search("jouet")');
    });

    it('getEffectiveWhere returns empty string when nothing set', () => {
      expect(query.getEffectiveWhere()).toBe('');
    });

    it('getEffectiveWhere uses filter attribute as fallback for static where', () => {
      query.filter = 'DEP:eq:75';
      (query as any)._serverWheres.set('s', 'search("x")');

      expect(query.getEffectiveWhere()).toBe('DEP:eq:75 AND search("x")');
    });
  });
});
