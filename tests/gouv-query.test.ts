import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Tests for GouvQuery component logic.
 *
 * Tests the client-side filtering, grouping, and aggregation logic,
 * as well as source subscription, shadow source compat mode, and command forwarding.
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
  subscribeToSourceCommands
} from '../src/utils/data-bridge.js';

describe('GouvQuery', () => {
  let query: GouvQuery;

  beforeEach(() => {
    clearDataCache('test-query');
    clearDataCache('test-source');
    clearDataCache('__gq_test-query_src');
    mockFetch.mockReset();
    query = new GouvQuery();
  });

  afterEach(() => {
    // Always clean up listeners (even if query is not connected to DOM)
    (query as any)._cleanup?.();
    if (query.isConnected) {
      query.disconnectedCallback();
    }
    // Clean up any shadow sources
    const shadows = document.querySelectorAll('[id^="__gq_"]');
    shadows.forEach(el => el.remove());
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

  describe('Source subscription', () => {
    it('subscribes to source and processes data on event', () => {
      query.id = 'test-query';
      query.source = 'test-source';
      query.groupBy = 'region';
      query.aggregate = 'value:sum';

      (query as any)._subscribeToSourceData('test-source');

      // Simulate source emitting data
      dispatchDataLoaded('test-source', [
        { region: 'A', value: 10 },
        { region: 'B', value: 20 },
        { region: 'A', value: 30 },
      ]);

      const data = query.getData() as Record<string, unknown>[];
      expect(data).toHaveLength(2);
      const regionA = data.find(d => d.region === 'A');
      expect(regionA?.value__sum).toBe(40);
    });

    it('reads cached data on subscription', () => {
      query.id = 'test-query';
      query.source = 'test-source';
      query.orderBy = 'value:desc';

      // Pre-populate cache
      dispatchDataLoaded('test-source', [
        { name: 'A', value: 10 },
        { name: 'B', value: 30 },
      ]);

      (query as any)._subscribeToSourceData('test-source');

      const data = query.getData() as Record<string, unknown>[];
      expect(data).toHaveLength(2);
      expect(data[0].name).toBe('B'); // Sorted desc
    });
  });

  describe('Shadow source (backward compat mode)', () => {
    it('creates shadow source when api-type is set without source', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      query.id = 'test-query';
      query.apiType = 'opendatasoft';
      query.baseUrl = 'https://data.example.com';
      query.datasetId = 'test-dataset';

      (query as any)._initialize();

      expect((query as any)._shadowSource).not.toBeNull();
      expect((query as any)._shadowSourceId).toBe('__gq_test-query_src');

      // Should warn about deprecation
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('sans source est deprecie')
      );

      warnSpy.mockRestore();
    });

    it('shadow source gets all relevant attributes', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      query.id = 'test-query';
      query.apiType = 'tabular';
      query.baseUrl = 'https://tabular-api.data.gouv.fr';
      query.resource = 'resource-123';
      query.where = 'field:eq:value';
      query.groupBy = 'region';
      query.aggregate = 'pop:sum';
      query.orderBy = 'pop__sum:desc';
      query.limit = 10;
      query.serverSide = true;
      query.pageSize = 50;
      query.headers = '{"apikey":"test"}';

      (query as any)._initialize();

      const el = (query as any)._shadowSource as HTMLElement;
      expect(el.getAttribute('api-type')).toBe('tabular');
      expect(el.getAttribute('base-url')).toBe('https://tabular-api.data.gouv.fr');
      expect(el.getAttribute('resource')).toBe('resource-123');
      expect(el.getAttribute('where')).toBe('field:eq:value');
      expect(el.getAttribute('group-by')).toBe('region');
      expect(el.getAttribute('aggregate')).toBe('pop:sum');
      expect(el.getAttribute('order-by')).toBe('pop__sum:desc');
      expect(el.getAttribute('limit')).toBe('10');
      expect(el.hasAttribute('server-side')).toBe(true);
      expect(el.getAttribute('page-size')).toBe('50');
      expect(el.getAttribute('headers')).toBe('{"apikey":"test"}');

      warnSpy.mockRestore();
    });

    it('destroys shadow source when switching to source mode', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      query.id = 'test-query';
      query.apiType = 'opendatasoft';
      query.baseUrl = 'https://data.example.com';
      query.datasetId = 'test-dataset';

      (query as any)._initialize();
      expect((query as any)._shadowSource).not.toBeNull();

      // Switch to source mode
      query.source = 'external-source';
      (query as any)._initialize();
      expect((query as any)._shadowSource).toBeNull();

      warnSpy.mockRestore();
    });

    it('does not create shadow source in generic mode', () => {
      query.id = 'test-query';
      query.apiType = 'generic';
      query.source = 'test-source';

      (query as any)._initialize();
      expect((query as any)._shadowSource).toBeNull();
    });

    it('processes data from shadow source via data-bridge events', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      query.id = 'test-query';
      query.apiType = 'tabular';
      query.baseUrl = 'https://tabular-api.data.gouv.fr';
      query.resource = 'resource-123';
      query.groupBy = 'region';
      query.aggregate = 'value:sum';

      (query as any)._initialize();

      // Simulate shadow source emitting data
      dispatchDataLoaded('__gq_test-query_src', [
        { region: 'A', value: 10 },
        { region: 'B', value: 20 },
        { region: 'A', value: 30 },
      ]);

      const data = query.getData() as Record<string, unknown>[];
      expect(data).toHaveLength(2);
      const regionA = data.find(d => d.region === 'A');
      expect(regionA?.value__sum).toBe(40);

      warnSpy.mockRestore();
    });

    it('cleanup removes shadow source', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      query.id = 'test-query';
      query.apiType = 'opendatasoft';
      query.baseUrl = 'https://data.example.com';
      query.datasetId = 'test-dataset';

      (query as any)._initialize();
      expect((query as any)._shadowSource).not.toBeNull();

      (query as any)._cleanup();
      expect((query as any)._shadowSource).toBeNull();
      expect((query as any)._shadowSourceId).toBe('');

      warnSpy.mockRestore();
    });
  });

  describe('Command forwarding', () => {
    it('forwards commands to upstream source in server-side mode', () => {
      query.id = 'test-query';
      query.source = 'upstream-source';
      query.serverSide = true;

      const received: any[] = [];
      const unsub = subscribeToSourceCommands('upstream-source', (cmd) => {
        received.push(cmd);
      });

      (query as any)._setupCommandForwarding();

      dispatchSourceCommand('test-query', { page: 3 });
      expect(received).toHaveLength(1);
      expect(received[0].page).toBe(3);

      dispatchSourceCommand('test-query', { where: 'search("test")', whereKey: 'search-1' });
      expect(received).toHaveLength(2);
      expect(received[1].where).toBe('search("test")');
      expect(received[1].whereKey).toBe('search-1');

      unsub();
    });

    it('does not forward when server-side is false', () => {
      query.id = 'test-query';
      query.source = 'upstream-source';
      query.serverSide = false;

      (query as any)._setupCommandForwarding();
      expect((query as any)._unsubscribeCommands).toBeNull();
    });

    it('forwards to shadow source in compat mode', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      query.id = 'test-query';
      query.apiType = 'opendatasoft';
      query.baseUrl = 'https://data.example.com';
      query.datasetId = 'test-dataset';
      query.serverSide = true;

      (query as any)._initialize();

      const received: any[] = [];
      const unsub = subscribeToSourceCommands('__gq_test-query_src', (cmd) => {
        received.push(cmd);
      });

      dispatchSourceCommand('test-query', { page: 2 });
      expect(received).toHaveLength(1);
      expect(received[0].page).toBe(2);

      unsub();
      warnSpy.mockRestore();
    });

    it('cleans up command listener on cleanup', () => {
      query.id = 'test-query';
      query.source = 'upstream-source';
      query.serverSide = true;

      (query as any)._setupCommandForwarding();
      expect((query as any)._unsubscribeCommands).toBeTypeOf('function');

      (query as any)._cleanup();
      expect((query as any)._unsubscribeCommands).toBeNull();
    });
  });

  describe('getEffectiveWhere delegation', () => {
    it('delegates to source element when available', () => {
      // Create mock source element
      const mockSource = document.createElement('div');
      mockSource.id = 'mock-source';
      (mockSource as any).getEffectiveWhere = (excludeKey?: string) => {
        if (excludeKey === 'facets') return 'search("test")';
        return 'search("test") AND region = "IDF"';
      };
      document.body.appendChild(mockSource);

      query.source = 'mock-source';

      expect(query.getEffectiveWhere()).toBe('search("test") AND region = "IDF"');
      expect(query.getEffectiveWhere('facets')).toBe('search("test")');

      mockSource.remove();
    });

    it('returns static where as fallback', () => {
      query.where = 'status:eq:active';
      expect(query.getEffectiveWhere()).toBe('status:eq:active');
    });

    it('uses filter attribute as fallback', () => {
      query.filter = 'DEP:eq:75';
      expect(query.getEffectiveWhere()).toBe('DEP:eq:75');
    });

    it('returns empty string when nothing set', () => {
      expect(query.getEffectiveWhere()).toBe('');
    });
  });

  describe('getAdapter delegation', () => {
    it('delegates to source element when available', () => {
      const mockSource = document.createElement('div');
      mockSource.id = 'mock-source';
      (mockSource as any).getAdapter = () => ({
        type: 'opendatasoft',
        capabilities: { serverGroupBy: true, whereFormat: 'odsql' }
      });
      document.body.appendChild(mockSource);

      query.source = 'mock-source';

      const adapter = query.getAdapter();
      expect(adapter.type).toBe('opendatasoft');
      expect(adapter.capabilities.serverGroupBy).toBe(true);

      mockSource.remove();
    });

    it('returns null when no source element', () => {
      expect(query.getAdapter()).toBeNull();
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
