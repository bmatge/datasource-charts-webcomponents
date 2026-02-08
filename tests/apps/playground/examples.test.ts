import { describe, it, expect } from 'vitest';
import { examples } from '../../../apps/playground/src/examples/examples-data';

describe('playground examples', () => {
  const directKeys = [
    'direct-bar', 'direct-line', 'direct-pie', 'direct-radar', 'direct-gauge',
    'direct-scatter', 'direct-barline', 'direct-map', 'direct-kpi', 'direct-datalist'
  ];

  const queryKeys = [
    'query-bar', 'query-line', 'query-pie', 'query-radar', 'query-gauge',
    'query-scatter', 'query-barline', 'query-map', 'query-kpi', 'query-datalist'
  ];

  const allKeys = [...directKeys, ...queryKeys];

  it('should have all expected example keys', () => {
    for (const key of allKeys) {
      expect(examples).toHaveProperty(key);
    }
  });

  it('should have 20 examples', () => {
    expect(Object.keys(examples)).toHaveLength(20);
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

  it('direct examples should use gouv-source without gouv-query', () => {
    for (const key of directKeys) {
      expect(examples[key], `${key} should use gouv-source`).toContain('gouv-source');
      if (!['direct-kpi', 'direct-datalist'].includes(key)) {
        expect(examples[key], `${key} should use gouv-dsfr-chart`).toContain('gouv-dsfr-chart');
      }
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
});
