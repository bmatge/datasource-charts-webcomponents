import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GouvDisplay } from '../src/components/gouv-display.js';
import { clearDataCache, dispatchDataLoaded, dispatchDataLoading, dispatchDataError } from '../src/utils/data-bridge.js';

describe('GouvDisplay', () => {
  let display: GouvDisplay;

  beforeEach(() => {
    clearDataCache('test-display-src');
    display = new GouvDisplay();
  });

  afterEach(() => {
    if (display.isConnected) {
      display.disconnectedCallback();
    }
  });

  describe('_resolveExpression', () => {
    const item = { nom: 'Test', score: 42, nested: { val: 'deep' } };

    it('resolves simple field', () => {
      expect((display as any)._resolveExpression(item, 'nom', 0)).toBe('Test');
    });

    it('resolves numeric field as string', () => {
      expect((display as any)._resolveExpression(item, 'score', 0)).toBe('42');
    });

    it('resolves nested field via dot notation', () => {
      expect((display as any)._resolveExpression(item, 'nested.val', 0)).toBe('deep');
    });

    it('resolves $index', () => {
      expect((display as any)._resolveExpression(item, '$index', 5)).toBe('5');
    });

    it('returns default when field is missing', () => {
      expect((display as any)._resolveExpression(item, 'missing|N/A', 0)).toBe('N/A');
    });

    it('returns empty string when field is missing and no default', () => {
      expect((display as any)._resolveExpression(item, 'missing', 0)).toBe('');
    });

    it('returns field value over default when field exists', () => {
      expect((display as any)._resolveExpression(item, 'nom|fallback', 0)).toBe('Test');
    });

    it('returns default when field is null', () => {
      const itemWithNull = { val: null };
      expect((display as any)._resolveExpression(itemWithNull, 'val|defaut', 0)).toBe('defaut');
    });
  });

  describe('_renderItem', () => {
    const item = { nom: 'Site A', score: 85 };

    it('returns empty string when no template', () => {
      expect((display as any)._renderItem(item, 0)).toBe('');
    });

    it('replaces double-brace placeholders with escaped values', () => {
      (display as any)._templateContent = '<p>{{nom}}: {{score}}</p>';
      const result = (display as any)._renderItem(item, 0);
      expect(result).toBe('<p>Site A: 85</p>');
    });

    it('escapes HTML in double-brace placeholders', () => {
      const dangerousItem = { nom: '<script>alert("xss")</script>' };
      (display as any)._templateContent = '<p>{{nom}}</p>';
      const result = (display as any)._renderItem(dangerousItem, 0);
      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;script&gt;');
    });

    it('does NOT escape HTML in triple-brace placeholders', () => {
      const htmlItem = { content: '<strong>bold</strong>' };
      (display as any)._templateContent = '<p>{{{content}}}</p>';
      const result = (display as any)._renderItem(htmlItem, 0);
      expect(result).toContain('<strong>bold</strong>');
    });

    it('replaces $index placeholder', () => {
      (display as any)._templateContent = '<p>#{{$index}}</p>';
      const result = (display as any)._renderItem(item, 3);
      expect(result).toBe('<p>#3</p>');
    });

    it('uses default value when field is missing', () => {
      (display as any)._templateContent = '<p>{{missing|N/A}}</p>';
      const result = (display as any)._renderItem(item, 0);
      expect(result).toBe('<p>N/A</p>');
    });
  });

  describe('onSourceData', () => {
    it('stores array data', () => {
      display.onSourceData([{ a: 1 }, { b: 2 }]);
      expect((display as any)._data).toEqual([{ a: 1 }, { b: 2 }]);
    });

    it('stores empty array for non-array data', () => {
      display.onSourceData({ a: 1 });
      expect((display as any)._data).toEqual([]);
    });

    it('resets page to 1', () => {
      (display as any)._currentPage = 3;
      display.onSourceData([{ a: 1 }]);
      expect((display as any)._currentPage).toBe(1);
    });
  });

  describe('pagination', () => {
    beforeEach(() => {
      const items = Array.from({ length: 25 }, (_, i) => ({ id: i }));
      display.onSourceData(items);
    });

    it('returns all data when pagination is 0', () => {
      display.pagination = 0;
      expect((display as any)._getPaginatedData()).toHaveLength(25);
    });

    it('returns first page with correct size', () => {
      display.pagination = 10;
      expect((display as any)._getPaginatedData()).toHaveLength(10);
      expect((display as any)._getPaginatedData()[0]).toEqual({ id: 0 });
    });

    it('returns second page', () => {
      display.pagination = 10;
      (display as any)._currentPage = 2;
      const page = (display as any)._getPaginatedData();
      expect(page).toHaveLength(10);
      expect(page[0]).toEqual({ id: 10 });
    });

    it('returns last page with remainder', () => {
      display.pagination = 10;
      (display as any)._currentPage = 3;
      const page = (display as any)._getPaginatedData();
      expect(page).toHaveLength(5);
      expect(page[0]).toEqual({ id: 20 });
    });

    it('computes total pages correctly', () => {
      display.pagination = 10;
      expect((display as any)._getTotalPages()).toBe(3);
    });

    it('returns 1 total page when pagination disabled', () => {
      display.pagination = 0;
      expect((display as any)._getTotalPages()).toBe(1);
    });
  });

  describe('_getColClass', () => {
    it('returns fr-col-12 for cols=1', () => {
      display.cols = 1;
      expect((display as any)._getColClass()).toBe('fr-col-12 fr-col-md-12');
    });

    it('returns fr-col-md-4 for cols=3', () => {
      display.cols = 3;
      expect((display as any)._getColClass()).toBe('fr-col-12 fr-col-md-4');
    });

    it('returns fr-col-md-2 for cols=6', () => {
      display.cols = 6;
      expect((display as any)._getColClass()).toBe('fr-col-12 fr-col-md-2');
    });

    it('clamps cols to 1 minimum', () => {
      display.cols = 0;
      expect((display as any)._getColClass()).toBe('fr-col-12 fr-col-md-12');
    });

    it('clamps cols to 6 maximum', () => {
      display.cols = 12;
      expect((display as any)._getColClass()).toBe('fr-col-12 fr-col-md-2');
    });
  });

  describe('Data integration via data-bridge', () => {
    it('receives data from source via subscription', () => {
      display.source = 'test-display-src';
      display.connectedCallback();

      dispatchDataLoaded('test-display-src', [{ nom: 'A' }, { nom: 'B' }]);

      expect((display as any)._sourceData).toEqual([{ nom: 'A' }, { nom: 'B' }]);
      expect((display as any)._data).toEqual([{ nom: 'A' }, { nom: 'B' }]);
    });

    it('picks up cached data on connect', () => {
      dispatchDataLoaded('test-display-src', [{ nom: 'cached' }]);

      display.source = 'test-display-src';
      display.connectedCallback();

      expect((display as any)._data).toEqual([{ nom: 'cached' }]);
    });

    it('tracks loading state', () => {
      display.source = 'test-display-src';
      display.connectedCallback();

      dispatchDataLoading('test-display-src');
      expect((display as any)._sourceLoading).toBe(true);

      dispatchDataLoaded('test-display-src', [{ nom: 'done' }]);
      expect((display as any)._sourceLoading).toBe(false);
    });

    it('tracks error state', () => {
      display.source = 'test-display-src';
      display.connectedCallback();

      const error = new Error('Network failure');
      dispatchDataError('test-display-src', error);
      expect((display as any)._sourceError).toEqual(error);
      expect((display as any)._sourceLoading).toBe(false);
    });
  });
});
