import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GouvRawData } from '../src/components/gouv-raw-data.js';
import {
  clearDataCache,
  dispatchDataLoaded,
  dispatchDataLoading,
  dispatchDataError,
} from '../src/utils/data-bridge.js';

const SOURCE_ID = 'test-raw-src';

describe('GouvRawData', () => {
  let comp: GouvRawData;

  beforeEach(() => {
    clearDataCache(SOURCE_ID);
    comp = new GouvRawData();
  });

  afterEach(() => {
    if (comp.isConnected) {
      comp.disconnectedCallback();
    }
    // Clean up any DOM elements created for ARIA tests
    document.querySelectorAll('[data-test-target]').forEach(el => el.remove());
  });

  // =========================================================================
  // Default properties
  // =========================================================================

  describe('default properties', () => {
    it('source defaults to empty string', () => {
      expect(comp.source).toBe('');
    });

    it('for defaults to empty string', () => {
      expect(comp.for).toBe('');
    });

    it('filename defaults to donnees.csv', () => {
      expect(comp.filename).toBe('donnees.csv');
    });

    it('label defaults to Telecharger les donnees (CSV)', () => {
      expect(comp.label).toBe('Telecharger les donnees (CSV)');
    });

    it('buttonLabel defaults to empty string', () => {
      expect(comp.buttonLabel).toBe('');
    });

    it('noAutoAria defaults to false', () => {
      expect(comp.noAutoAria).toBe(false);
    });
  });

  // =========================================================================
  // Auto-ARIA (for attribute)
  // =========================================================================

  describe('auto-ARIA', () => {
    let target: HTMLDivElement;

    beforeEach(() => {
      target = document.createElement('div');
      target.id = 'chart1';
      target.setAttribute('data-test-target', '');
      document.body.appendChild(target);
    });

    afterEach(() => {
      target.remove();
    });

    it('sets aria-describedby on target in connectedCallback', () => {
      comp.for = 'chart1';
      comp.connectedCallback();

      expect(target.getAttribute('aria-describedby')).toContain(comp.id);
    });

    it('generates auto id if component has no id', () => {
      comp.id = '';
      comp.for = 'chart1';
      comp.connectedCallback();

      expect(comp.id).toMatch(/^gouv-raw-data-\d+$/);
      expect(target.getAttribute('aria-describedby')).toBe(comp.id);
    });

    it('removes aria-describedby on disconnectedCallback', () => {
      comp.for = 'chart1';
      comp.connectedCallback();
      expect(target.getAttribute('aria-describedby')).toContain(comp.id);

      comp.disconnectedCallback();
      expect(target.hasAttribute('aria-describedby')).toBe(false);
    });

    it('does not set aria-describedby when no-auto-aria is set', () => {
      comp.for = 'chart1';
      comp.noAutoAria = true;
      comp.connectedCallback();

      expect(target.hasAttribute('aria-describedby')).toBe(false);
    });

    it('does not crash when target does not exist', () => {
      comp.for = 'nonexistent-target';
      expect(() => comp.connectedCallback()).not.toThrow();
    });

    it('does not set aria-describedby when for is empty', () => {
      comp.for = '';
      comp.connectedCallback();
      expect(target.hasAttribute('aria-describedby')).toBe(false);
    });

    it('preserves existing aria-describedby values', () => {
      target.setAttribute('aria-describedby', 'existing-id');
      comp.for = 'chart1';
      comp.connectedCallback();

      const value = target.getAttribute('aria-describedby')!;
      expect(value).toContain('existing-id');
      expect(value).toContain(comp.id);
    });

    it('does not duplicate id in aria-describedby', () => {
      comp.id = 'dl-data';
      comp.for = 'chart1';
      target.setAttribute('aria-describedby', 'dl-data');
      comp.connectedCallback();

      expect(target.getAttribute('aria-describedby')).toBe('dl-data');
    });

    it('cleans up only its own id from aria-describedby on disconnect', () => {
      target.setAttribute('aria-describedby', 'other-id');
      comp.for = 'chart1';
      comp.connectedCallback();

      const before = target.getAttribute('aria-describedby')!;
      expect(before).toContain('other-id');
      expect(before).toContain(comp.id);

      comp.disconnectedCallback();
      expect(target.getAttribute('aria-describedby')).toBe('other-id');
    });

    it('re-applies ARIA when for attribute changes', () => {
      const target2 = document.createElement('div');
      target2.id = 'chart2';
      target2.setAttribute('data-test-target', '');
      document.body.appendChild(target2);

      comp.for = 'chart1';
      comp.connectedCallback();
      expect(target.getAttribute('aria-describedby')).toContain(comp.id);

      // Simulate attribute change
      const changedProps = new Map([['for', 'chart1']]);
      comp.for = 'chart2';
      comp.updated(changedProps);

      // Old target cleaned
      expect(target.hasAttribute('aria-describedby')).toBe(false);
      // New target linked
      expect(target2.getAttribute('aria-describedby')).toContain(comp.id);

      target2.remove();
    });

    it('removes ARIA when noAutoAria changes to true', () => {
      comp.for = 'chart1';
      comp.connectedCallback();
      expect(target.getAttribute('aria-describedby')).toContain(comp.id);

      const changedProps = new Map([['noAutoAria', false]]);
      comp.noAutoAria = true;
      comp.updated(changedProps);

      expect(target.hasAttribute('aria-describedby')).toBe(false);
    });
  });

  // =========================================================================
  // CSV generation
  // =========================================================================

  describe('CSV generation', () => {
    it('generates correct CSV with semicolon separator', () => {
      const data = [
        { nom: 'Paris', pop: 2000000 },
        { nom: 'Lyon', pop: 500000 },
      ];
      const csv = comp._buildCsv(data);
      expect(csv).toBe('nom;pop\nParis;2000000\nLyon;500000');
    });

    it('escapes quotes in values', () => {
      const data = [{ nom: 'Ville "Test"', pop: 100 }];
      const csv = comp._buildCsv(data);
      expect(csv).toBe('nom;pop\n"Ville ""Test""";100');
    });

    it('escapes semicolons in values', () => {
      const data = [{ desc: 'a;b', val: 1 }];
      const csv = comp._buildCsv(data);
      expect(csv).toBe('desc;val\n"a;b";1');
    });

    it('handles null and undefined values', () => {
      const data = [{ a: null, b: undefined, c: 'ok' }];
      const csv = comp._buildCsv(data as Record<string, unknown>[]);
      expect(csv).toBe('a;b;c\n;;ok');
    });

    it('generates header-only for single-row empty data', () => {
      const data = [{ col1: '', col2: '' }];
      const csv = comp._buildCsv(data);
      expect(csv).toBe('col1;col2\n;');
    });

    it('handles numeric values correctly', () => {
      const data = [{ x: 3.14, y: -42 }];
      const csv = comp._buildCsv(data);
      expect(csv).toBe('x;y\n3.14;-42');
    });

    it('handles boolean values', () => {
      const data = [{ flag: true, active: false }];
      const csv = comp._buildCsv(data);
      expect(csv).toBe('flag;active\ntrue;false');
    });
  });

  // =========================================================================
  // Download trigger
  // =========================================================================

  describe('download', () => {
    it('does nothing when no source data', () => {
      const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
      (comp as any)._handleDownload();
      expect(clickSpy).not.toHaveBeenCalled();
      clickSpy.mockRestore();
    });

    it('does nothing when source data is not an array', () => {
      const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
      (comp as any)._sourceData = { not: 'an array' };
      (comp as any)._handleDownload();
      expect(clickSpy).not.toHaveBeenCalled();
      clickSpy.mockRestore();
    });

    it('does nothing when source data is empty array', () => {
      const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
      (comp as any)._sourceData = [];
      (comp as any)._handleDownload();
      expect(clickSpy).not.toHaveBeenCalled();
      clickSpy.mockRestore();
    });

    it('triggers download with correct filename', () => {
      const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
      // jsdom doesn't have URL.createObjectURL, so we mock it on globalThis
      const origCreate = globalThis.URL.createObjectURL;
      const origRevoke = globalThis.URL.revokeObjectURL;
      globalThis.URL.createObjectURL = vi.fn().mockReturnValue('blob:test');
      globalThis.URL.revokeObjectURL = vi.fn();

      (comp as any)._sourceData = [{ a: 1 }];
      comp.filename = 'export.csv';
      (comp as any)._handleDownload();

      expect(clickSpy).toHaveBeenCalled();
      expect(globalThis.URL.createObjectURL).toHaveBeenCalled();
      expect(globalThis.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');

      clickSpy.mockRestore();
      globalThis.URL.createObjectURL = origCreate;
      globalThis.URL.revokeObjectURL = origRevoke;
    });
  });

  // =========================================================================
  // Data bridge subscription
  // =========================================================================

  describe('data bridge subscription', () => {
    it('receives data via dispatchDataLoaded', () => {
      comp.source = SOURCE_ID;
      comp.connectedCallback();

      dispatchDataLoaded(SOURCE_ID, [{ region: 'Bretagne', pop: 3000000 }]);

      expect((comp as any)._sourceData).toEqual([{ region: 'Bretagne', pop: 3000000 }]);
    });

    it('updates when data changes', () => {
      comp.source = SOURCE_ID;
      comp.connectedCallback();

      dispatchDataLoaded(SOURCE_ID, [{ a: 1 }]);
      expect((comp as any)._sourceData).toEqual([{ a: 1 }]);

      dispatchDataLoaded(SOURCE_ID, [{ a: 2 }, { a: 3 }]);
      expect((comp as any)._sourceData).toEqual([{ a: 2 }, { a: 3 }]);
    });

    it('handles loading state', () => {
      comp.source = SOURCE_ID;
      comp.connectedCallback();

      dispatchDataLoading(SOURCE_ID);
      expect((comp as any)._sourceLoading).toBe(true);
    });

    it('handles error state', () => {
      comp.source = SOURCE_ID;
      comp.connectedCallback();

      dispatchDataError(SOURCE_ID, new Error('test error'));
      expect((comp as any)._sourceError).toBeInstanceOf(Error);
    });
  });

  // =========================================================================
  // Render
  // =========================================================================

  describe('render', () => {
    it('renders a button', () => {
      const result = comp.render();
      expect(result).toBeDefined();
    });

    it('uses light DOM', () => {
      expect(comp.createRenderRoot()).toBe(comp);
    });
  });
});
