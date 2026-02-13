import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GouvNormalize } from '../src/components/gouv-normalize.js';
import { clearDataCache, dispatchDataLoaded, getDataCache } from '../src/utils/data-bridge.js';

describe('GouvNormalize', () => {
  let normalize: GouvNormalize;

  beforeEach(() => {
    clearDataCache('test-normalize');
    clearDataCache('test-source');
    normalize = new GouvNormalize();
  });

  afterEach(() => {
    if (normalize.isConnected) {
      normalize.disconnectedCallback();
    }
  });

  describe('Attribute parsing', () => {
    it('parses numeric fields from comma-separated string', () => {
      normalize.numeric = 'population, surface, budget';
      const fields = normalize._parseNumericFields();
      expect(fields).toEqual(new Set(['population', 'surface', 'budget']));
    });

    it('returns empty set for empty numeric attribute', () => {
      normalize.numeric = '';
      const fields = normalize._parseNumericFields();
      expect(fields.size).toBe(0);
    });

    it('parses pipe-separated rename map', () => {
      normalize.rename = 'pop_tot:Population totale | surf_ha:Surface (ha)';
      const map = normalize._parsePipeMap(normalize.rename);
      expect(map.get('pop_tot')).toBe('Population totale');
      expect(map.get('surf_ha')).toBe('Surface (ha)');
    });

    it('parses pipe-separated replace map', () => {
      normalize.replace = 'N/A: | n.d.: | -:0';
      const map = normalize._parsePipeMap(normalize.replace);
      expect(map.get('N/A')).toBe('');
      expect(map.get('n.d.')).toBe('');
      expect(map.get('-')).toBe('0');
    });

    it('handles empty pipe map attribute', () => {
      const map = normalize._parsePipeMap('');
      expect(map.size).toBe(0);
    });

    it('ignores entries without colon in pipe map', () => {
      const map = normalize._parsePipeMap('novalue | key:value');
      expect(map.size).toBe(1);
      expect(map.get('key')).toBe('value');
    });
  });

  describe('Numeric conversion', () => {
    it('converts string numbers to numeric values for specified fields', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.numeric = 'population';

      // Simulate source emitting data
      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { nom: 'Paris', population: '2200000' },
        { nom: 'Lyon', population: '500000' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result).toHaveLength(2);
      expect(result[0].population).toBe(2200000);
      expect(result[1].population).toBe(500000);
      expect(result[0].nom).toBe('Paris');
    });

    it('handles French decimal format (comma)', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.numeric = 'prix';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { nom: 'A', prix: '12,50' },
        { nom: 'B', prix: '1 234,56' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].prix).toBe(12.5);
      expect(result[1].prix).toBe(1234.56);
    });

    it('handles international decimal format (dot)', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.numeric = 'prix';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { nom: 'A', prix: '12.50' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].prix).toBe(12.5);
    });

    it('converts already numeric values through toNumber without issue', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.numeric = 'score';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [{ score: 42 }]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].score).toBe(42);
    });
  });

  describe('Automatic numeric detection', () => {
    it('auto-detects and converts numeric strings when numericAuto is true', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.numericAuto = true;

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { nom: 'Paris', population: '2200000', code: '75' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].population).toBe(2200000);
      expect(result[0].code).toBe(75);
      expect(result[0].nom).toBe('Paris');
    });

    it('does not convert non-numeric strings', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.numericAuto = true;

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { nom: 'Paris 10e', empty: '' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].nom).toBe('Paris 10e');
      expect(result[0].empty).toBe('');
    });
  });

  describe('Key renaming', () => {
    it('renames keys according to rename map', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.rename = 'pop_tot:Population totale | lib_dep:Departement';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { pop_tot: 50000, lib_dep: 'Lozere', code: '48' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]['Population totale']).toBe(50000);
      expect(result[0]['Departement']).toBe('Lozere');
      expect(result[0]['code']).toBe('48');
      expect(result[0]['pop_tot']).toBeUndefined();
      expect(result[0]['lib_dep']).toBeUndefined();
    });
  });

  describe('Trim', () => {
    it('trims whitespace from string values when trim is true', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.trim = true;

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { nom: '  Paris  ', region: ' IDF', score: 42 },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].nom).toBe('Paris');
      expect(result[0].region).toBe('IDF');
      expect(result[0].score).toBe(42);
    });

    it('does not trim when trim is false', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.trim = false;

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { nom: '  Paris  ' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].nom).toBe('  Paris  ');
    });

    it('trims keys with leading/trailing spaces when trim is true', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.trim = true;

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { ' DEP ': ' 01 ', ' LIB_DEP ': ' Ain ', ' pp_vacant_25 ': ' 19 805   ' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]).toHaveProperty('DEP');
      expect(result[0]).toHaveProperty('LIB_DEP');
      expect(result[0]).toHaveProperty('pp_vacant_25');
      expect(result[0]['DEP']).toBe('01');
      expect(result[0]['LIB_DEP']).toBe('Ain');
      expect(result[0]['pp_vacant_25']).toBe('19 805');
    });

    it('trim + numeric-auto handles LOVAC-style data (space thousands)', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.trim = true;
      normalize.numericAuto = true;

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { ' DEP ': ' 01 ', ' LIB_DEP ': ' Ain ', ' pp_vacant_25 ': ' 19 805   ', ' pp_total_24 ': ' 293 837   ' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]['DEP']).toBe(1);
      expect(result[0]['LIB_DEP']).toBe('Ain');
      expect(result[0]['pp_vacant_25']).toBe(19805);
      expect(result[0]['pp_total_24']).toBe(293837);
    });

    it('trim + rename works with spaced keys', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.trim = true;
      normalize.rename = 'LIB_DEP:Departement | DEP:Code';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { ' DEP ': ' 01 ', ' LIB_DEP ': ' Ain ' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]).toHaveProperty('Code');
      expect(result[0]).toHaveProperty('Departement');
      expect(result[0]['Code']).toBe('01');
      expect(result[0]['Departement']).toBe('Ain');
    });
  });

  describe('Strip HTML', () => {
    it('removes HTML tags from string values when stripHtml is true', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.stripHtml = true;

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { nom: '<strong>Paris</strong>', desc: '<a href="#">Lien</a> texte' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].nom).toBe('Paris');
      expect(result[0].desc).toBe('Lien texte');
    });
  });

  describe('Value replacement', () => {
    it('replaces exact matching values', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.replace = 'N/A: | n.d.: | -:0';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { a: 'N/A', b: 'n.d.', c: '-', d: 'valide' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].a).toBe('');
      expect(result[0].b).toBe('');
      expect(result[0].c).toBe('0');
      expect(result[0].d).toBe('valide');
    });

    it('does not replace partial matches', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.replace = 'N/A:';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { a: 'contient N/A dans le texte' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].a).toBe('contient N/A dans le texte');
    });
  });

  describe('Lowercase keys', () => {
    it('converts all keys to lowercase when lowercaseKeys is true', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.lowercaseKeys = true;

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { NOM: 'Paris', Region: 'IDF', 'Code Postal': '75000' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]['nom']).toBe('Paris');
      expect(result[0]['region']).toBe('IDF');
      expect(result[0]['code postal']).toBe('75000');
      expect(result[0]['NOM']).toBeUndefined();
    });
  });

  describe('Combined transformations', () => {
    it('applies all transformations in correct order', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.trim = true;
      normalize.replace = 'N/A:0';
      normalize.numeric = 'pop';
      normalize.rename = 'pop:Population | lib:Nom';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { pop: ' 50000 ', lib: '  Lozere  ' },
        { pop: 'N/A', lib: ' Paris ' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]['Population']).toBe(50000);
      expect(result[0]['Nom']).toBe('Lozere');
      expect(result[1]['Population']).toBe(0);
      expect(result[1]['Nom']).toBe('Paris');
    });
  });

  describe('Flatten', () => {
    it('flattens simple sub-object (Grist format)', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'fields';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { id: 1, fields: { Nom: 'A', Score: 42 } },
        { id: 2, fields: { Nom: 'B', Score: 87 } },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 1, Nom: 'A', Score: 42 });
      expect(result[1]).toEqual({ id: 2, Nom: 'B', Score: 87 });
    });

    it('overwrites parent key on collision (sub-object wins)', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'fields';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { id: 1, fields: { id: 'fiche-001', Nom: 'X' } },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].id).toBe('fiche-001');
    });

    it('supports dot notation for deep nesting', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'data.attributes';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { data: { attributes: { name: 'X', score: 42 } }, type: 'item' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]).toEqual({ type: 'item', name: 'X', score: 42 });
      expect(result[0].data).toBeUndefined();
    });

    it('passes through when sub-object is null', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'fields';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [{ id: 1, fields: null }]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]).toEqual({ id: 1, fields: null });
    });

    it('passes through when sub-object key is absent', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'fields';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [{ id: 1, other: 'value' }]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]).toEqual({ id: 1, other: 'value' });
    });

    it('passes through when sub-object is an array', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'fields';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [{ id: 1, fields: [1, 2, 3] }]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]).toEqual({ id: 1, fields: [1, 2, 3] });
    });

    it('handles mix of records with and without sub-object', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'fields';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { id: 1, fields: { Nom: 'A' } },
        { id: 2, Nom: 'B' },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]).toEqual({ id: 1, Nom: 'A' });
      expect(result[1]).toEqual({ id: 2, Nom: 'B' });
    });

    it('does nothing when flatten is empty', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = '';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [{ id: 1, fields: { Nom: 'A' } }]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].fields).toBeDefined();
    });

    it('chains with rename', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'fields';
      normalize.rename = 'nom_long:Ville';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [{ fields: { nom_long: 'Paris' } }]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]).toEqual({ Ville: 'Paris' });
    });

    it('chains with trim + numeric', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'fields';
      normalize.trim = true;
      normalize.numeric = 'Montant';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { fields: { Nom: '  X  ', Montant: '42000' } },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0].Nom).toBe('X');
      expect(result[0].Montant).toBe(42000);
    });

    it('handles deep dot notation where intermediate path is missing', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'a.b.c';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [{ id: 1, x: 'value' }]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result[0]).toEqual({ id: 1, x: 'value' });
    });

    it('handles 1000 records efficiently', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.flatten = 'fields';

      const input = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        fields: { name: `Item ${i}`, value: i * 10 },
      }));

      normalize.connectedCallback();
      const start = performance.now();
      dispatchDataLoaded('test-source', input);
      const duration = performance.now() - start;

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result).toHaveLength(1000);
      expect(result[0]).toEqual({ id: 0, name: 'Item 0', value: 0 });
      expect(result[999]).toEqual({ id: 999, name: 'Item 999', value: 9990 });
      expect(duration).toBeLessThan(100);
    });
  });

  describe('Passthrough (no transformation)', () => {
    it('passes data through unchanged when no attributes set', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';

      normalize.connectedCallback();
      const input = [{ nom: 'Paris', pop: '1000' }];
      dispatchDataLoaded('test-source', input);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe('Paris');
      expect(result[0].pop).toBe('1000');
    });
  });

  describe('Robustness', () => {
    it('handles empty array', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.numeric = 'pop';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', []);

      const result = getDataCache('test-normalize') as unknown[];
      expect(result).toHaveLength(0);
    });

    it('handles non-array input by wrapping in array', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', { nom: 'Paris' });

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe('Paris');
    });

    it('handles null/undefined values in rows gracefully', () => {
      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.trim = true;
      normalize.numeric = 'score';

      normalize.connectedCallback();
      dispatchDataLoaded('test-source', [
        { nom: null, score: undefined },
      ]);

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe(null);
      expect(result[0].score).toBe(0); // toNumber(undefined) returns 0
    });

    it('uses cached data on connect if source already emitted', () => {
      // Source emits before normalize connects
      dispatchDataLoaded('test-source', [{ nom: 'Lyon' }]);

      normalize.id = 'test-normalize';
      normalize.source = 'test-source';
      normalize.connectedCallback();

      const result = getDataCache('test-normalize') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe('Lyon');
    });
  });
});
