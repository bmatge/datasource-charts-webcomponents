import { describe, it, expect } from 'vitest';
import { examples } from '../../../apps/playground/src/examples/examples-data';

describe('playground examples', () => {
  const directKeys = [
    'direct-bar', 'direct-line', 'direct-pie', 'direct-radar', 'direct-gauge',
    'direct-scatter', 'direct-barline', 'direct-map', 'direct-kpi', 'direct-datalist',
    'direct-worldmap'
  ];

  const serverPaginateKeys = [
    'server-paginate-datalist', 'server-paginate-display', 'paginate-kpi-global'
  ];

  const queryKeys = [
    'query-tabular-pie',
    'query-bar', 'query-line', 'query-pie', 'query-radar', 'query-gauge',
    'query-scatter', 'query-barline', 'query-map', 'query-kpi', 'query-datalist'
  ];

  const normalizeKeys = [
    'normalize-bar', 'normalize-pie', 'normalize-line', 'normalize-datalist'
  ];

  const displayKeys = [
    'direct-display', 'query-display', 'normalize-display'
  ];

  const facetsKeys = [
    'facets-datalist', 'facets-bar', 'facets-map'
  ];

  const searchClientKeys = [
    'search-facets-display', 'search-kpi-chart'
  ];

  const searchServerKeys = [
    'search-datalist', 'search-display'
  ];

  const searchKeys = [...searchClientKeys, ...searchServerKeys];

  const serverSideKeys = [
    'server-side-ods', 'server-side-tabular-tri'
  ];

  const serverFacetsKeys = [
    'server-facets-display'
  ];

  const allKeys = [...directKeys, ...serverPaginateKeys, ...queryKeys, ...normalizeKeys, ...displayKeys, ...facetsKeys, ...searchKeys, ...serverSideKeys, ...serverFacetsKeys];

  it('should have all expected example keys', () => {
    for (const key of allKeys) {
      expect(examples).toHaveProperty(key);
    }
  });

  it('should have 42 examples', () => {
    expect(Object.keys(examples)).toHaveLength(42);
  });

  it('should have non-empty code for all examples', () => {
    for (const [key, code] of Object.entries(examples)) {
      expect(code.trim().length, `Example "${key}" should not be empty`).toBeGreaterThan(0);
    }
  });

  it('should have HTML content in examples', () => {
    for (const [key, code] of Object.entries(examples)) {
      expect(code, `Example "${key}" should contain HTML`).toContain('<');
    }
  });

  it('direct examples should use gouv-source', () => {
    for (const key of directKeys) {
      const hasSource = examples[key].includes('gouv-source');
      expect(hasSource, `${key} should use gouv-source`).toBe(true);
      if (!['direct-kpi', 'direct-datalist', 'direct-display', 'direct-worldmap'].includes(key)) {
        expect(examples[key], `${key} should use gouv-dsfr-chart`).toContain('gouv-dsfr-chart');
      }
    }
  });

  it('display examples should use gouv-display', () => {
    for (const key of displayKeys) {
      expect(examples[key], `${key} should use gouv-source`).toContain('gouv-source');
      expect(examples[key], `${key} should use gouv-display`).toContain('gouv-display');
      expect(examples[key], `${key} should use template`).toContain('<template>');
    }
  });

  it('query examples should use gouv-source and gouv-query', () => {
    for (const key of queryKeys) {
      expect(examples[key], `${key} should use gouv-source`).toContain('gouv-source');
      expect(examples[key], `${key} should use gouv-query`).toContain('gouv-query');
    }
  });

  it('kpi examples should use gouv-kpi', () => {
    expect(examples['direct-kpi']).toContain('gouv-kpi');
    expect(examples['query-kpi']).toContain('gouv-kpi');
  });

  it('datalist examples should use gouv-datalist', () => {
    expect(examples['direct-datalist']).toContain('gouv-datalist');
    expect(examples['query-datalist']).toContain('gouv-datalist');
  });

  it('normalize examples should use gouv-source and gouv-normalize', () => {
    for (const key of normalizeKeys) {
      expect(examples[key], `${key} should use gouv-source`).toContain('gouv-source');
      expect(examples[key], `${key} should use gouv-normalize`).toContain('gouv-normalize');
    }
  });

  it('facets examples should use gouv-source, gouv-facets and gouv-normalize', () => {
    for (const key of facetsKeys) {
      expect(examples[key], `${key} should use gouv-source`).toContain('gouv-source');
      expect(examples[key], `${key} should use gouv-normalize`).toContain('gouv-normalize');
      expect(examples[key], `${key} should use gouv-facets`).toContain('gouv-facets');
    }
  });

  it('client-side search examples should use gouv-source and gouv-search', () => {
    for (const key of searchClientKeys) {
      expect(examples[key], `${key} should use gouv-source`).toContain('gouv-source');
      expect(examples[key], `${key} should use gouv-search`).toContain('gouv-search');
    }
  });

  it('server-side search examples should use gouv-source server-side and gouv-search server-search', () => {
    for (const key of searchServerKeys) {
      expect(examples[key], `${key} should use gouv-source`).toContain('gouv-source');
      expect(examples[key], `${key} should use server-side`).toContain('server-side');
      expect(examples[key], `${key} should use gouv-search`).toContain('gouv-search');
      expect(examples[key], `${key} should use server-search`).toContain('server-search');
    }
  });

  it('server-side examples should use gouv-source with server-side', () => {
    for (const key of serverSideKeys) {
      expect(examples[key], `${key} should use gouv-source`).toContain('gouv-source');
      expect(examples[key], `${key} should use server-side`).toContain('server-side');
    }
  });

  it('server-facets examples should use gouv-source server-side and gouv-facets server-facets', () => {
    for (const key of serverFacetsKeys) {
      expect(examples[key], `${key} should use gouv-source`).toContain('gouv-source');
      expect(examples[key], `${key} should use server-side`).toContain('server-side');
      expect(examples[key], `${key} should use gouv-facets`).toContain('gouv-facets');
      expect(examples[key], `${key} should use server-facets`).toContain('server-facets');
    }
  });
});
