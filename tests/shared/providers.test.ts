import { describe, it, expect } from 'vitest';
import {
  detectProvider,
  extractResourceIds,
  getProvider,
  getAllProviders,
  ODS_CONFIG,
  TABULAR_CONFIG,
  GRIST_CONFIG,
  GENERIC_CONFIG,
} from '../../packages/shared/src/providers/index.js';
import type { ProviderId, ProviderConfig } from '../../packages/shared/src/providers/index.js';
import { migrateSource } from '../../packages/shared/src/types/source.js';
import type { Source } from '../../packages/shared/src/types/source.js';

// =========================================================================
// Provider configs
// =========================================================================

describe('ProviderConfig definitions', () => {
  const ALL_CONFIGS = [ODS_CONFIG, TABULAR_CONFIG, GRIST_CONFIG, GENERIC_CONFIG];

  it('should have 4 registered providers', () => {
    expect(getAllProviders()).toHaveLength(4);
  });

  it('each config should have a unique id', () => {
    const ids = ALL_CONFIGS.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('each config should have required properties', () => {
    for (const config of ALL_CONFIGS) {
      expect(config.id).toBeTruthy();
      expect(config.displayName).toBeTruthy();
      expect(config.response).toBeDefined();
      expect(config.pagination).toBeDefined();
      expect(config.capabilities).toBeDefined();
      expect(config.query).toBeDefined();
      expect(config.facets).toBeDefined();
      expect(config.resource).toBeDefined();
      expect(config.codeGen).toBeDefined();
    }
  });

  it('generic should be the fallback (no urlPatterns)', () => {
    expect(GENERIC_CONFIG.urlPatterns).toHaveLength(0);
  });

  it('getProvider returns the correct config', () => {
    expect(getProvider('opendatasoft')).toBe(ODS_CONFIG);
    expect(getProvider('tabular')).toBe(TABULAR_CONFIG);
    expect(getProvider('grist')).toBe(GRIST_CONFIG);
    expect(getProvider('generic')).toBe(GENERIC_CONFIG);
  });

  it('getProvider returns generic for unknown id', () => {
    expect(getProvider('unknown' as ProviderId)).toBe(GENERIC_CONFIG);
  });
});

// =========================================================================
// ODS config specifics
// =========================================================================

describe('ODS config', () => {
  it('should have offset pagination', () => {
    expect(ODS_CONFIG.pagination.type).toBe('offset');
    expect(ODS_CONFIG.pagination.pageSize).toBe(100);
    expect(ODS_CONFIG.pagination.maxPages).toBe(10);
  });

  it('should support server-side operations', () => {
    expect(ODS_CONFIG.capabilities.serverFetch).toBe(true);
    expect(ODS_CONFIG.capabilities.serverFacets).toBe(true);
    expect(ODS_CONFIG.capabilities.serverSearch).toBe(true);
    expect(ODS_CONFIG.capabilities.serverGroupBy).toBe(true);
    expect(ODS_CONFIG.capabilities.serverOrderBy).toBe(true);
    expect(ODS_CONFIG.capabilities.serverAggregation).toBe(true);
  });

  it('should use ODSQL where format', () => {
    expect(ODS_CONFIG.query.whereFormat).toBe('odsql');
    expect(ODS_CONFIG.query.whereSeparator).toBe(' AND ');
  });

  it('should have server facets mode', () => {
    expect(ODS_CONFIG.facets.defaultMode).toBe('server');
  });

  it('should not use gouv-source in code gen', () => {
    expect(ODS_CONFIG.codeGen.usesGouvSource).toBe(false);
    expect(ODS_CONFIG.codeGen.usesGouvQuery).toBe(true);
    expect(ODS_CONFIG.codeGen.queryApiType).toBe('opendatasoft');
  });
});

// =========================================================================
// Tabular config specifics
// =========================================================================

describe('Tabular config', () => {
  it('should have page-based pagination', () => {
    expect(TABULAR_CONFIG.pagination.type).toBe('page');
    expect(TABULAR_CONFIG.pagination.maxPages).toBe(500);
    expect(TABULAR_CONFIG.pagination.maxRecords).toBe(50000);
  });

  it('should have server meta for pagination', () => {
    expect(TABULAR_CONFIG.pagination.serverMeta).toBeDefined();
    expect(TABULAR_CONFIG.pagination.serverMeta?.totalPath).toBe('meta.total');
  });

  it('should support server-side ordering but not aggregation', () => {
    expect(TABULAR_CONFIG.capabilities.serverOrderBy).toBe(true);
    expect(TABULAR_CONFIG.capabilities.serverAggregation).toBe(false);
    expect(TABULAR_CONFIG.capabilities.serverFacets).toBe(false);
  });

  it('should use colon where format', () => {
    expect(TABULAR_CONFIG.query.whereFormat).toBe('colon');
  });

  it('should have static facets mode', () => {
    expect(TABULAR_CONFIG.facets.defaultMode).toBe('static');
  });
});

// =========================================================================
// Grist config specifics
// =========================================================================

describe('Grist config', () => {
  it('should have no pagination', () => {
    expect(GRIST_CONFIG.pagination.type).toBe('none');
  });

  it('should require flatten', () => {
    expect(GRIST_CONFIG.response.requiresFlatten).toBe(true);
    expect(GRIST_CONFIG.response.nestedDataKey).toBe('fields');
  });

  it('should have known proxy hosts', () => {
    expect(GRIST_CONFIG.knownHosts).toHaveLength(2);
    expect(GRIST_CONFIG.knownHosts[0].hostname).toBe('grist.numerique.gouv.fr');
    expect(GRIST_CONFIG.knownHosts[1].hostname).toBe('docs.getgrist.com');
  });

  it('should use bearer auth', () => {
    expect(GRIST_CONFIG.defaultAuthType).toBe('bearer');
  });

  it('should use gouv-query api-type grist in code gen', () => {
    expect(GRIST_CONFIG.codeGen.usesGouvSource).toBe(false);
    expect(GRIST_CONFIG.codeGen.usesGouvNormalize).toBe(false);
    expect(GRIST_CONFIG.codeGen.queryApiType).toBe('grist');
    expect(GRIST_CONFIG.codeGen.fieldPrefix).toBe('');
  });

  it('should have client facets mode', () => {
    expect(GRIST_CONFIG.facets.defaultMode).toBe('client');
  });

  it('should extract documentId and tableId', () => {
    expect(GRIST_CONFIG.resource.idFields).toEqual(['documentId', 'tableId']);
  });
});

// =========================================================================
// detectProvider
// =========================================================================

describe('detectProvider', () => {
  // ODS URLs
  it('detects ODS from data.economie.gouv.fr URL', () => {
    const url = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=15';
    expect(detectProvider(url).id).toBe('opendatasoft');
  });

  it('detects ODS from any ODS domain', () => {
    const url = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite/records';
    expect(detectProvider(url).id).toBe('opendatasoft');
  });

  // Tabular URLs
  it('detects Tabular from tabular-api.data.gouv.fr URL', () => {
    const url = 'https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/';
    expect(detectProvider(url).id).toBe('tabular');
  });

  it('detects Tabular with query params', () => {
    const url = 'https://tabular-api.data.gouv.fr/api/resources/42a34c0a-7c97-4463-b00e-5913ea5f7077/data/?page_size=101';
    expect(detectProvider(url).id).toBe('tabular');
  });

  // Grist URLs
  it('detects Grist from grist.numerique.gouv.fr URL', () => {
    const url = 'https://grist.numerique.gouv.fr/api/docs/abc123/tables/Table1/records';
    expect(detectProvider(url).id).toBe('grist');
  });

  it('detects Grist from docs.getgrist.com URL', () => {
    const url = 'https://docs.getgrist.com/api/docs/xyz789/tables/Data/records';
    expect(detectProvider(url).id).toBe('grist');
  });

  it('detects Grist from any domain with /api/docs/ pattern', () => {
    const url = 'https://custom-grist.example.com/api/docs/doc1/tables/t1/records';
    expect(detectProvider(url).id).toBe('grist');
  });

  // Generic
  it('returns generic for unknown URLs', () => {
    expect(detectProvider('https://api.example.com/data').id).toBe('generic');
  });

  it('returns generic for empty string', () => {
    expect(detectProvider('').id).toBe('generic');
  });

  // All playground example URLs
  describe('playground URLs', () => {
    const PLAYGROUND_URLS = [
      { url: 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records?limit=15', expected: 'opendatasoft' },
      { url: 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/industrie-du-futur/records?limit=20', expected: 'opendatasoft' },
      { url: 'https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/', expected: 'tabular' },
      { url: 'https://tabular-api.data.gouv.fr/api/resources/42a34c0a-7c97-4463-b00e-5913ea5f7077/data/?page_size=101', expected: 'tabular' },
    ];

    for (const { url, expected } of PLAYGROUND_URLS) {
      it(`detects ${expected} from ${url.substring(0, 60)}...`, () => {
        expect(detectProvider(url).id).toBe(expected);
      });
    }
  });
});

// =========================================================================
// extractResourceIds
// =========================================================================

describe('extractResourceIds', () => {
  it('extracts datasetId from ODS URL', () => {
    const url = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/fiscalite-locale-des-particuliers/records';
    const ids = extractResourceIds(url);
    expect(ids).toEqual({ datasetId: 'fiscalite-locale-des-particuliers' });
  });

  it('extracts resourceId from Tabular URL', () => {
    const url = 'https://tabular-api.data.gouv.fr/api/resources/2876a346-d50c-4911-934e-19ee07b0e503/data/';
    const ids = extractResourceIds(url);
    expect(ids).toEqual({ resourceId: '2876a346-d50c-4911-934e-19ee07b0e503' });
  });

  it('extracts documentId and tableId from Grist URL', () => {
    const url = 'https://grist.numerique.gouv.fr/api/docs/abc123/tables/Table1/records';
    const ids = extractResourceIds(url);
    expect(ids).toEqual({ documentId: 'abc123', tableId: 'Table1' });
  });

  it('returns null for generic URLs', () => {
    expect(extractResourceIds('https://api.example.com/data')).toBeNull();
  });

  it('works with explicit provider', () => {
    const url = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/my-dataset/records';
    const ids = extractResourceIds(url, ODS_CONFIG);
    expect(ids).toEqual({ datasetId: 'my-dataset' });
  });
});

// =========================================================================
// migrateSource
// =========================================================================

describe('migrateSource', () => {
  it('adds provider=grist for grist sources', () => {
    const legacy = { id: '1', name: 'test', type: 'grist' as const };
    const migrated = migrateSource(legacy);
    expect(migrated.provider).toBe('grist');
  });

  it('auto-detects opendatasoft provider from apiUrl', () => {
    const legacy = {
      id: '2', name: 'ODS source', type: 'api' as const,
      apiUrl: 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/test/records',
    };
    const migrated = migrateSource(legacy);
    expect(migrated.provider).toBe('opendatasoft');
    expect(migrated.resourceIds).toEqual({ datasetId: 'test' });
  });

  it('auto-detects tabular provider from apiUrl', () => {
    const legacy = {
      id: '3', name: 'Tabular source', type: 'api' as const,
      apiUrl: 'https://tabular-api.data.gouv.fr/api/resources/abc-123/data/',
    };
    const migrated = migrateSource(legacy);
    expect(migrated.provider).toBe('tabular');
    expect(migrated.resourceIds).toEqual({ resourceId: 'abc-123' });
  });

  it('defaults to generic for manual sources', () => {
    const legacy = { id: '4', name: 'manual', type: 'manual' as const };
    const migrated = migrateSource(legacy);
    expect(migrated.provider).toBe('generic');
  });

  it('defaults to generic for api sources without URL', () => {
    const legacy = { id: '5', name: 'no url', type: 'api' as const };
    const migrated = migrateSource(legacy);
    expect(migrated.provider).toBe('generic');
  });

  it('preserves existing provider if already set', () => {
    const source: Partial<Source> = {
      id: '6', name: 'already migrated', type: 'api',
      provider: 'tabular',
      apiUrl: 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/x/records',
    };
    const migrated = migrateSource(source);
    // provider should NOT be overwritten even though URL matches ODS
    expect(migrated.provider).toBe('tabular');
  });

  it('preserves all existing fields', () => {
    const legacy: Partial<Source> = {
      id: '7', name: 'full', type: 'grist',
      documentId: 'doc1', tableId: 'T1',
      apiKey: 'key123', isPublic: false,
      recordCount: 42,
    };
    const migrated = migrateSource(legacy);
    expect(migrated.documentId).toBe('doc1');
    expect(migrated.tableId).toBe('T1');
    expect(migrated.apiKey).toBe('key123');
    expect(migrated.isPublic).toBe(false);
    expect(migrated.recordCount).toBe(42);
    expect(migrated.provider).toBe('grist');
  });

  it('extracts Grist resourceIds from apiUrl', () => {
    const legacy: Partial<Source> = {
      id: '8', name: 'grist with url', type: 'grist',
      apiUrl: 'https://grist.numerique.gouv.fr/api/docs/myDoc/tables/myTable/records',
    };
    const migrated = migrateSource(legacy);
    expect(migrated.provider).toBe('grist');
    expect(migrated.resourceIds).toEqual({ documentId: 'myDoc', tableId: 'myTable' });
  });
});

// =========================================================================
// ProviderConfig alignment (all configs have the same shape)
// =========================================================================

describe('ProviderConfig alignment', () => {
  const ALL_CONFIGS: ProviderConfig[] = [ODS_CONFIG, TABULAR_CONFIG, GRIST_CONFIG, GENERIC_CONFIG];

  it('all configs have valid whereFormat', () => {
    for (const config of ALL_CONFIGS) {
      expect(['odsql', 'colon']).toContain(config.query.whereFormat);
    }
  });

  it('all configs have valid pagination type', () => {
    for (const config of ALL_CONFIGS) {
      expect(['offset', 'page', 'cursor', 'none']).toContain(config.pagination.type);
    }
  });

  it('all configs have valid facets mode', () => {
    for (const config of ALL_CONFIGS) {
      expect(['server', 'static', 'client']).toContain(config.facets.defaultMode);
    }
  });

  it('all configs have valid aggregation syntax', () => {
    for (const config of ALL_CONFIGS) {
      expect(['odsql-select', 'colon-attr', 'client-only']).toContain(config.query.aggregationSyntax);
    }
  });

  it('all configs have valid auth type', () => {
    for (const config of ALL_CONFIGS) {
      expect(['bearer', 'apikey-header', 'query-param', 'none']).toContain(config.defaultAuthType);
    }
  });

  it('extractIds is a function for all configs', () => {
    for (const config of ALL_CONFIGS) {
      expect(typeof config.resource.extractIds).toBe('function');
    }
  });
});
