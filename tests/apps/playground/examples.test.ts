import { describe, it, expect } from 'vitest';
import { examples } from '../../../apps/playground/src/examples/examples-data';

describe('playground examples', () => {
  const expectedKeys = [
    'bar-chart', 'pie-chart', 'line-chart', 'kpi-dashboard',
    'dsfr-bar', 'dsfr-line', 'dsfr-pie', 'dsfr-gauge', 'dsfr-radar', 'dsfr-map',
    'gouv-source-chart', 'gouv-kpi', 'gouv-datalist', 'gouv-dashboard'
  ];

  it('should have all expected example keys', () => {
    for (const key of expectedKeys) {
      expect(examples).toHaveProperty(key);
    }
  });

  it('should have 14 examples', () => {
    expect(Object.keys(examples)).toHaveLength(14);
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

  it('bar-chart example should reference Chart.js', () => {
    expect(examples['bar-chart']).toContain('Chart');
  });

  it('dsfr examples should use dsfr-chart components', () => {
    expect(examples['dsfr-bar']).toContain('bar-chart');
    expect(examples['dsfr-line']).toContain('line-chart');
    expect(examples['dsfr-pie']).toContain('pie-chart');
    expect(examples['dsfr-gauge']).toContain('gauge-chart');
    expect(examples['dsfr-radar']).toContain('radar-chart');
    expect(examples['dsfr-map']).toContain('map-chart');
  });

  it('gouv-widgets examples should use gouv components', () => {
    expect(examples['gouv-source-chart']).toContain('gouv-source');
    expect(examples['gouv-kpi']).toContain('gouv-kpi');
    expect(examples['gouv-datalist']).toContain('gouv-datalist');
  });
});
