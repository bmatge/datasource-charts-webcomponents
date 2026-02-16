import { describe, it, expect } from 'vitest';
import { GristAdapter } from '../../src/adapters/grist-adapter.js';
import type { AdapterParams, ServerSideOverlay } from '../../src/adapters/api-adapter.js';

const BASE_URL = 'https://proxy.example.com/grist-proxy/api/docs/docABC/tables/Table1/records';

function makeParams(overrides: Partial<AdapterParams> = {}): AdapterParams {
  return {
    baseUrl: BASE_URL,
    datasetId: '',
    resource: '',
    select: '',
    where: '',
    filter: '',
    groupBy: '',
    aggregate: '',
    orderBy: '',
    limit: 0,
    transform: '',
    pageSize: 0,
    ...overrides,
  };
}

describe('GristAdapter — Records mode conversions', () => {
  const adapter = new GristAdapter();

  // =========================================================================
  // _colonWhereToGristFilter
  // =========================================================================

  describe('_colonWhereToGristFilter', () => {
    it('converts eq to single-value array', () => {
      expect(adapter._colonWhereToGristFilter('region:eq:Bretagne'))
        .toEqual({ region: ['Bretagne'] });
    });

    it('converts in to multi-value array', () => {
      expect(adapter._colonWhereToGristFilter('region:in:Bretagne|Normandie'))
        .toEqual({ region: ['Bretagne', 'Normandie'] });
    });

    it('handles multiple fields', () => {
      expect(adapter._colonWhereToGristFilter('region:eq:Bretagne, annee:eq:2023'))
        .toEqual({ region: ['Bretagne'], annee: ['2023'] });
    });

    it('ignores unsupported operators', () => {
      expect(adapter._colonWhereToGristFilter('age:gt:18')).toBeNull();
    });

    it('handles values with colons', () => {
      expect(adapter._colonWhereToGristFilter('url:eq:https://example.com'))
        .toEqual({ url: ['https://example.com'] });
    });

    it('returns null for empty string', () => {
      expect(adapter._colonWhereToGristFilter('')).toBeNull();
    });
  });

  // =========================================================================
  // _orderByToGristSort
  // =========================================================================

  describe('_orderByToGristSort', () => {
    it('converts asc (implicit)', () => {
      expect(adapter._orderByToGristSort('nom')).toBe('nom');
    });

    it('converts asc (explicit)', () => {
      expect(adapter._orderByToGristSort('nom:asc')).toBe('nom');
    });

    it('converts desc with prefix dash', () => {
      expect(adapter._orderByToGristSort('population:desc')).toBe('-population');
    });

    it('converts multi-column', () => {
      expect(adapter._orderByToGristSort('region:asc, population:desc'))
        .toBe('region,-population');
    });
  });

  // =========================================================================
  // buildUrl
  // =========================================================================

  describe('buildUrl', () => {
    it('returns base URL when no params', () => {
      expect(adapter.buildUrl(makeParams())).toBe(BASE_URL);
    });

    it('adds filter for where eq', () => {
      const url = new URL(adapter.buildUrl(makeParams({ where: 'region:eq:Bretagne' })));
      expect(JSON.parse(url.searchParams.get('filter')!)).toEqual({ region: ['Bretagne'] });
    });

    it('adds sort for orderBy', () => {
      const url = new URL(adapter.buildUrl(makeParams({ orderBy: 'population:desc' })));
      expect(url.searchParams.get('sort')).toBe('-population');
    });

    it('adds limit', () => {
      const url = new URL(adapter.buildUrl(makeParams({ limit: 20 })));
      expect(url.searchParams.get('limit')).toBe('20');
    });

    it('combines filter + sort + limit', () => {
      const url = new URL(adapter.buildUrl(makeParams({
        where: 'region:eq:Bretagne',
        orderBy: 'population:desc',
        limit: 10,
      })));
      expect(JSON.parse(url.searchParams.get('filter')!)).toEqual({ region: ['Bretagne'] });
      expect(url.searchParams.get('sort')).toBe('-population');
      expect(url.searchParams.get('limit')).toBe('10');
    });

    it('ignores unsupported operators in filter (no filter param)', () => {
      const url = new URL(adapter.buildUrl(makeParams({ where: 'age:gt:18' })));
      expect(url.searchParams.get('filter')).toBeNull();
    });
  });

  // =========================================================================
  // buildServerSideUrl
  // =========================================================================

  describe('buildServerSideUrl', () => {
    it('adds pagination params (limit + offset)', () => {
      const overlay: ServerSideOverlay = { page: 3, effectiveWhere: '', orderBy: '' };
      const url = new URL(adapter.buildServerSideUrl(makeParams({ pageSize: 20 }), overlay));
      expect(url.searchParams.get('limit')).toBe('20');
      expect(url.searchParams.get('offset')).toBe('40');
    });

    it('page 1 has offset 0', () => {
      const overlay: ServerSideOverlay = { page: 1, effectiveWhere: '', orderBy: '' };
      const url = new URL(adapter.buildServerSideUrl(makeParams({ pageSize: 20 }), overlay));
      expect(url.searchParams.get('limit')).toBe('20');
      expect(url.searchParams.get('offset')).toBe('0');
    });

    it('uses overlay effectiveWhere over params where', () => {
      const overlay: ServerSideOverlay = { page: 1, effectiveWhere: 'region:eq:IDF', orderBy: '' };
      const url = new URL(adapter.buildServerSideUrl(makeParams({ pageSize: 20, where: 'region:eq:Bretagne' }), overlay));
      expect(JSON.parse(url.searchParams.get('filter')!)).toEqual({ region: ['IDF'] });
    });

    it('uses overlay orderBy over params orderBy', () => {
      const overlay: ServerSideOverlay = { page: 1, effectiveWhere: '', orderBy: 'nom:asc' };
      const url = new URL(adapter.buildServerSideUrl(makeParams({ pageSize: 20, orderBy: 'population:desc' }), overlay));
      expect(url.searchParams.get('sort')).toBe('nom');
    });
  });
});

// ===========================================================================
// SQL mode
// ===========================================================================

describe('GristAdapter — SQL mode utilities', () => {
  const adapter = new GristAdapter();

  // =========================================================================
  // _escapeIdentifier
  // =========================================================================

  describe('_escapeIdentifier', () => {
    it('wraps simple name in double quotes', () => {
      expect(adapter._escapeIdentifier('region')).toBe('"region"');
    });

    it('handles names with spaces', () => {
      expect(adapter._escapeIdentifier('Ma Colonne')).toBe('"Ma Colonne"');
    });

    it('handles names with accents', () => {
      expect(adapter._escapeIdentifier('Departement')).toBe('"Departement"');
    });

    it('double-escapes existing double quotes', () => {
      expect(adapter._escapeIdentifier('col"name')).toBe('"col""name"');
    });

    it('throws for empty name', () => {
      expect(() => adapter._escapeIdentifier('')).toThrow('Empty SQL identifier');
    });

    it('trims whitespace', () => {
      expect(adapter._escapeIdentifier('  region  ')).toBe('"region"');
    });
  });

  // =========================================================================
  // _colonWhereToSql
  // =========================================================================

  describe('_colonWhereToSql', () => {
    it('converts eq', () => {
      const args: (string | number)[] = [];
      expect(adapter._colonWhereToSql('region:eq:Bretagne', args)).toBe('"region" = ?');
      expect(args).toEqual(['Bretagne']);
    });

    it('converts neq', () => {
      const args: (string | number)[] = [];
      expect(adapter._colonWhereToSql('region:neq:Paris', args)).toBe('"region" != ?');
      expect(args).toEqual(['Paris']);
    });

    it('converts gt with numeric value', () => {
      const args: (string | number)[] = [];
      expect(adapter._colonWhereToSql('age:gt:18', args)).toBe('"age" > ?');
      expect(args).toEqual([18]);
    });

    it('converts gte', () => {
      const args: (string | number)[] = [];
      adapter._colonWhereToSql('score:gte:100', args);
      expect(args).toEqual([100]);
    });

    it('converts lt', () => {
      const args: (string | number)[] = [];
      adapter._colonWhereToSql('price:lt:50', args);
      expect(args).toEqual([50]);
    });

    it('converts lte', () => {
      const args: (string | number)[] = [];
      adapter._colonWhereToSql('price:lte:99.9', args);
      expect(args).toEqual([99.9]);
    });

    it('converts contains to LIKE', () => {
      const args: (string | number)[] = [];
      expect(adapter._colonWhereToSql('nom:contains:Paris', args)).toBe('"nom" LIKE ?');
      expect(args).toEqual(['%Paris%']);
    });

    it('converts notcontains to NOT LIKE', () => {
      const args: (string | number)[] = [];
      expect(adapter._colonWhereToSql('nom:notcontains:test', args)).toBe('"nom" NOT LIKE ?');
      expect(args).toEqual(['%test%']);
    });

    it('converts in to IN with multiple placeholders', () => {
      const args: (string | number)[] = [];
      expect(adapter._colonWhereToSql('region:in:IDF|OCC|BRE', args))
        .toBe('"region" IN (?,?,?)');
      expect(args).toEqual(['IDF', 'OCC', 'BRE']);
    });

    it('converts notin to NOT IN', () => {
      const args: (string | number)[] = [];
      expect(adapter._colonWhereToSql('region:notin:IDF|OCC', args))
        .toBe('"region" NOT IN (?,?)');
      expect(args).toEqual(['IDF', 'OCC']);
    });

    it('converts isnull', () => {
      const args: (string | number)[] = [];
      expect(adapter._colonWhereToSql('email:isnull:', args)).toBe('"email" IS NULL');
      expect(args).toEqual([]);
    });

    it('converts isnotnull', () => {
      const args: (string | number)[] = [];
      expect(adapter._colonWhereToSql('email:isnotnull:', args)).toBe('"email" IS NOT NULL');
      expect(args).toEqual([]);
    });

    it('joins multiple clauses with AND', () => {
      const args: (string | number)[] = [];
      const result = adapter._colonWhereToSql('region:eq:IDF, age:gt:18', args);
      expect(result).toBe('"region" = ? AND "age" > ?');
      expect(args).toEqual(['IDF', 18]);
    });

    it('handles value with colons', () => {
      const args: (string | number)[] = [];
      adapter._colonWhereToSql('url:eq:https://example.com', args);
      expect(args).toEqual(['https://example.com']);
    });
  });

  // =========================================================================
  // _sqlResultToObjects
  // =========================================================================

  describe('_sqlResultToObjects', () => {
    it('converts columns + records to objects', () => {
      const result = adapter._sqlResultToObjects({
        columns: ['region', 'total'],
        records: [['Bretagne', 100], ['Normandie', 200]],
      });
      expect(result).toEqual([
        { region: 'Bretagne', total: 100 },
        { region: 'Normandie', total: 200 },
      ]);
    });

    it('handles empty results', () => {
      expect(adapter._sqlResultToObjects({ columns: ['a'], records: [] })).toEqual([]);
    });

    it('handles missing fields gracefully', () => {
      expect(adapter._sqlResultToObjects({})).toEqual([]);
    });
  });

  // =========================================================================
  // _getSqlEndpointUrl
  // =========================================================================

  describe('_getSqlEndpointUrl', () => {
    it('derives /sql from /tables/.../records', () => {
      expect(adapter._getSqlEndpointUrl({ baseUrl: BASE_URL }))
        .toBe('https://proxy.example.com/grist-proxy/api/docs/docABC/sql');
    });

    it('throws for non-Grist URL', () => {
      expect(() => adapter._getSqlEndpointUrl({ baseUrl: 'https://example.com/data' }))
        .toThrow('Cannot derive SQL endpoint');
    });
  });

  // =========================================================================
  // _getTableId
  // =========================================================================

  describe('_getTableId', () => {
    it('extracts table ID from URL', () => {
      expect(adapter._getTableId({ baseUrl: BASE_URL })).toBe('Table1');
    });

    it('throws for URL without table', () => {
      expect(() => adapter._getTableId({ baseUrl: 'https://example.com/api/docs/x/sql' }))
        .toThrow('Cannot extract table ID');
    });
  });

  // =========================================================================
  // parseAggregates
  // =========================================================================

  describe('parseAggregates', () => {
    it('parses single aggregate', () => {
      const result = adapter.parseAggregates('population:sum:total');
      expect(result).toEqual([{ field: 'population', function: 'sum', alias: 'total' }]);
    });

    it('parses multiple aggregates', () => {
      const result = adapter.parseAggregates('population:sum:total, population:avg:moyenne');
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ field: 'population', function: 'sum', alias: 'total' });
      expect(result[1]).toEqual({ field: 'population', function: 'avg', alias: 'moyenne' });
    });

    it('generates default alias when missing', () => {
      const result = adapter.parseAggregates('population:sum');
      expect(result[0].alias).toBe('sum_population');
    });
  });
});

// ===========================================================================
// buildFacetWhere (unchanged from previous implementation)
// ===========================================================================

describe('GristAdapter — buildFacetWhere', () => {
  const adapter = new GristAdapter();

  it('builds colon syntax for single value', () => {
    expect(adapter.buildFacetWhere({ region: new Set(['Bretagne']) }))
      .toBe('region:eq:Bretagne');
  });

  it('builds colon syntax for multiple values', () => {
    expect(adapter.buildFacetWhere({ region: new Set(['Bretagne', 'Normandie']) }))
      .toBe('region:in:Bretagne|Normandie');
  });

  it('excludes specified field', () => {
    expect(adapter.buildFacetWhere(
      { region: new Set(['Bretagne']), ville: new Set(['Rennes']) },
      'region'
    )).toBe('ville:eq:Rennes');
  });

  it('returns empty string for empty selections', () => {
    expect(adapter.buildFacetWhere({})).toBe('');
  });
});
