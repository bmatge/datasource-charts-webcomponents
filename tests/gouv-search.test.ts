import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GouvSearch } from '../src/components/gouv-search.js';
import {
  clearDataCache,
  clearDataMeta,
  dispatchDataLoaded,
  getDataCache,
  getDataMeta,
  setDataMeta,
  subscribeToSourceCommands
} from '../src/utils/data-bridge.js';

const SAMPLE_DATA = [
  { Nom: 'NetCommerce', Region: 'PACA', SIRET: '12345678901234' },
  { Nom: 'Campus Online', Region: 'Grand Est', SIRET: '98765432109876' },
  { Nom: 'NetPoint', Region: 'IDF', SIRET: '11111111111111' },
  { Nom: 'SuperCommerce', Region: 'PACA', SIRET: '22222222222222' },
  { Nom: 'Internet Plus', Region: 'Bretagne', SIRET: '33333333333333' },
];

/** Helper: set URL search params in jsdom */
function setUrlParams(search: string) {
  window.history.replaceState({}, '', search ? `?${search}` : window.location.pathname);
}

describe('GouvSearch', () => {
  let search: GouvSearch;

  beforeEach(() => {
    clearDataCache('test-search');
    clearDataCache('test-source');
    clearDataMeta('test-search');
    clearDataMeta('test-source');
    search = new GouvSearch();
    setUrlParams('');
  });

  afterEach(() => {
    if (search.isConnected) {
      search.disconnectedCallback();
    }
    setUrlParams('');
  });

  // --- Normalize ---

  describe('_normalize', () => {
    it('lowercases text', () => {
      expect(search._normalize('HELLO')).toBe('hello');
    });

    it('removes accents', () => {
      expect(search._normalize('epicerie')).toBe('epicerie');
      expect(search._normalize('\u00c9picerie')).toBe('epicerie');
      expect(search._normalize('\u00e0 la cr\u00e8me')).toBe('a la creme');
    });

    it('trims whitespace', () => {
      expect(search._normalize('  hello  ')).toBe('hello');
    });

    it('handles null-like values', () => {
      expect(search._normalize('')).toBe('');
    });
  });

  // --- Field parsing ---

  describe('_getFields', () => {
    it('parses comma-separated fields', () => {
      search.fields = 'Nom, Region, SIRET';
      expect(search._getFields()).toEqual(['Nom', 'Region', 'SIRET']);
    });

    it('trims whitespace', () => {
      search.fields = '  Nom , Region  ';
      expect(search._getFields()).toEqual(['Nom', 'Region']);
    });

    it('returns empty array for empty string', () => {
      search.fields = '';
      expect(search._getFields()).toEqual([]);
    });

    it('filters empty entries', () => {
      search.fields = 'Nom,,Region,';
      expect(search._getFields()).toEqual(['Nom', 'Region']);
    });
  });

  // --- contains mode ---

  describe('contains mode', () => {
    it('filters by substring match', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.operator = 'contains';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'net';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(3);
      expect(result.map(r => r.Nom)).toContain('NetCommerce');
      expect(result.map(r => r.Nom)).toContain('NetPoint');
      expect(result.map(r => r.Nom)).toContain('Internet Plus');
    });

    it('is case-insensitive', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.connectedCallback();
      dispatchDataLoaded('test-source', [
        { Nom: 'NETCOMMERCE' },
        { Nom: 'campus' },
      ]);

      search._term = 'Campus';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].Nom).toBe('campus');
    });

    it('is accent-insensitive', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.connectedCallback();
      dispatchDataLoaded('test-source', [
        { Nom: '\u00c9picerie Fine' },
        { Nom: 'Boulangerie' },
      ]);

      search._term = 'epicerie';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].Nom).toBe('\u00c9picerie Fine');
    });
  });

  // --- starts mode ---

  describe('starts mode', () => {
    it('matches words starting with the term', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.operator = 'starts';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'net';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(2);
      expect(result.map(r => r.Nom)).toContain('NetCommerce');
      expect(result.map(r => r.Nom)).toContain('NetPoint');
      // Internet Plus should NOT match because "net" is not at word start
    });
  });

  // --- words mode ---

  describe('words mode', () => {
    it('requires all words to be present', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.operator = 'words';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'commerce paca';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(2);
      expect(result.map(r => r.Nom)).toContain('NetCommerce');
      expect(result.map(r => r.Nom)).toContain('SuperCommerce');
    });

    it('matches words across different fields', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom, Region';
      search.operator = 'words';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'net idf';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].Nom).toBe('NetPoint');
    });
  });

  // --- Edge cases ---

  describe('edge cases', () => {
    beforeEach(() => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.connectedCallback();
    });

    it('empty term returns all data', () => {
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = '';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(SAMPLE_DATA.length);
    });

    it('min-length not reached returns all data', () => {
      search.minLength = 3;
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'ne';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(SAMPLE_DATA.length);
    });

    it('full-text (no fields) searches all fields', () => {
      search.fields = '';
      dispatchDataLoaded('test-source', [
        { Nom: 'A', Region: 'PACA', Code: '13' },
      ]);

      search._term = 'paca';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
    });

    it('numeric values match as strings', () => {
      dispatchDataLoaded('test-source', [
        { SIRET: 12345678901234, Nom: 'Test' },
      ]);

      search._term = '1234';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
    });

    it('null and undefined values are handled gracefully', () => {
      dispatchDataLoaded('test-source', [
        { Nom: null, Region: undefined, Code: 'ABC' },
      ]);

      search._term = 'abc';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
    });

    it('special regex characters are escaped', () => {
      dispatchDataLoaded('test-source', [
        { Nom: 'Test (2024)' },
        { Nom: 'Other' },
      ]);

      search._term = '(2024)';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].Nom).toBe('Test (2024)');
    });

    it('fields pointing to nonexistent fields are ignored', () => {
      search.fields = 'NonExistent, Nom';
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'net';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(3); // NetCommerce, NetPoint, Internet Plus
    });

    it('fields starting with _ are excluded from full-text search', () => {
      dispatchDataLoaded('test-source', [
        { Nom: 'Test', _internal: 'secret' },
        { Nom: 'Other', _internal: 'visible' },
      ]);

      search._term = 'secret';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(0);
    });
  });

  // --- Highlight ---

  describe('highlight', () => {
    it('adds _highlight field with <mark> tags', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.highlight = true;
      search.connectedCallback();
      dispatchDataLoaded('test-source', [
        { Nom: 'NetCommerce', Desc: 'Vente en ligne' },
      ]);

      search._term = 'Net';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0]._highlight).toContain('<mark>Net</mark>');
    });

    it('does not add _highlight when highlight is false', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.highlight = false;
      search.connectedCallback();
      dispatchDataLoaded('test-source', [
        { Nom: 'NetCommerce' },
      ]);

      search._term = 'Net';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result[0]._highlight).toBeUndefined();
    });

    it('does not highlight when term is empty', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.highlight = true;
      search.connectedCallback();
      dispatchDataLoaded('test-source', [
        { Nom: 'NetCommerce' },
      ]);

      search._term = '';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result[0]._highlight).toBeUndefined();
    });

    it('highlight ignores non-string fields', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = '';
      search.highlight = true;
      search.connectedCallback();
      dispatchDataLoaded('test-source', [
        { Nom: 'Test 42', Count: 42 },
      ]);

      search._term = '42';
      search._applyFilter();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      // Only string fields get highlighted
      expect(result[0]._highlight).toContain('<mark>42</mark>');
    });
  });

  // --- Data bridge integration ---

  describe('data bridge integration', () => {
    it('receives data from cache if source already emitted', () => {
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search.id = 'test-search';
      search.source = 'test-source';
      search.connectedCallback();

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(SAMPLE_DATA.length);
    });

    it('clears cache on disconnect', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      expect(getDataCache('test-search')).toBeDefined();

      search.disconnectedCallback();
      expect(getDataCache('test-search')).toBeUndefined();
    });

    it('handles non-array data gracefully', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.connectedCallback();
      dispatchDataLoaded('test-source', 'not an array');

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toEqual([]);
    });

    it('re-applies filter when new data arrives', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.connectedCallback();

      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'net';
      search._applyFilter();
      let result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(3);

      // New data arrives — filter should be re-applied
      dispatchDataLoaded('test-source', [
        { Nom: 'NetCommerce', Region: 'PACA' },
        { Nom: 'Other', Region: 'IDF' },
      ]);

      result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].Nom).toBe('NetCommerce');
    });

    it('dispatches gouv-search-change event', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      let eventDetail: { sourceId: string; term: string; count: number } | null = null;
      const handler = (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      };
      document.addEventListener('gouv-search-change', handler);

      search._term = 'net';
      search._applyFilter();

      document.removeEventListener('gouv-search-change', handler);

      expect(eventDetail).not.toBeNull();
      expect(eventDetail!.sourceId).toBe('test-search');
      expect(eventDetail!.term).toBe('net');
      expect(eventDetail!.count).toBe(3);
    });
  });

  // --- Public methods ---

  describe('public methods', () => {
    beforeEach(() => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);
    });

    it('clear() restores all data', () => {
      search._term = 'net';
      search._applyFilter();
      let result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(3);

      search.clear();
      result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(SAMPLE_DATA.length);
    });

    it('search() triggers filtering programmatically', () => {
      search.search('campus');
      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].Nom).toBe('Campus Online');
    });

    it('getData() returns current filtered data', () => {
      search.search('net');
      const data = search.getData();
      expect(data).toHaveLength(3);
    });

    it('setData() replaces source data', () => {
      search.setData([{ Nom: 'Custom' }]);
      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].Nom).toBe('Custom');
    });
  });

  // --- Performance ---

  describe('performance', () => {
    it('filters 5000 records in < 50ms', () => {
      search.id = 'test-search';
      search.source = 'test-source';
      search.operator = 'words';
      search.connectedCallback();

      const data = Array.from({ length: 5000 }, (_, i) => ({
        Nom: `Entreprise ${i}`,
        Region: i % 2 ? 'PACA' : 'IDF',
      }));
      dispatchDataLoaded('test-source', data);

      const start = performance.now();
      search._term = 'entreprise 42';
      search._applyFilter();
      const elapsed = performance.now() - start;

      expect(elapsed).toBeLessThan(50);
    });
  });

  // --- URL search param ---

  describe('url-search-param', () => {
    it('reads search term from URL param on first data arrival', () => {
      setUrlParams('q=net');

      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.urlSearchParam = 'q';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(3); // NetCommerce, NetPoint, Internet Plus
    });

    it('uses custom param name', () => {
      setUrlParams('recherche=campus');

      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.urlSearchParam = 'recherche';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(1);
      expect(result[0].Nom).toBe('Campus Online');
    });

    it('does nothing when param is not in URL', () => {
      setUrlParams('other=value');

      search.id = 'test-search';
      search.source = 'test-source';
      search.urlSearchParam = 'q';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(SAMPLE_DATA.length);
    });

    it('does nothing when url-search-param attribute is empty', () => {
      setUrlParams('q=net');

      search.id = 'test-search';
      search.source = 'test-source';
      search.urlSearchParam = '';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(SAMPLE_DATA.length);
    });

    it('applies URL param only once (not on every data update)', () => {
      setUrlParams('q=net');

      search.id = 'test-search';
      search.source = 'test-source';
      search.fields = 'Nom';
      search.urlSearchParam = 'q';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      let result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(3);

      // User clears the search
      search.clear();
      result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(SAMPLE_DATA.length);

      // New data arrives — should NOT re-apply URL param
      dispatchDataLoaded('test-source', SAMPLE_DATA);
      result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(SAMPLE_DATA.length);
    });

    it('_applyUrlSearchParam sets _term from URL', () => {
      setUrlParams('q=hello');
      search.urlSearchParam = 'q';
      search._applyUrlSearchParam();
      expect(search._term).toBe('hello');
    });

    it('_applyUrlSearchParam does nothing without urlSearchParam', () => {
      setUrlParams('q=hello');
      search.urlSearchParam = '';
      search._applyUrlSearchParam();
      expect(search._term).toBe('');
    });
  });

  // --- Server-search mode ---

  describe('server-search', () => {
    let mockSource: HTMLElement;

    beforeEach(() => {
      // Create mock source element with ODS-like adapter
      mockSource = document.createElement('div');
      mockSource.id = 'test-source';
      (mockSource as any).getAdapter = () => ({
        getDefaultSearchTemplate: () => 'search("{q}")',
      });
      document.body.appendChild(mockSource);

      search.id = 'test-search';
      search.source = 'test-source';
      search.serverSearch = true;
      clearDataMeta('test-source');
    });

    afterEach(() => {
      clearDataMeta('test-source');
      mockSource.remove();
    });

    it('dispatches source command with where on search', () => {
      let receivedCmd: any = null;
      const unsub = subscribeToSourceCommands('test-source', (cmd) => {
        receivedCmd = cmd;
      });

      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'hello';
      search._applyFilter();

      expect(receivedCmd).not.toBeNull();
      expect(receivedCmd.where).toBe('search("hello")');

      unsub();
    });

    it('dispatches empty where when search term is empty', () => {
      let receivedCmd: any = null;
      const unsub = subscribeToSourceCommands('test-source', (cmd) => {
        receivedCmd = cmd;
      });

      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = '';
      search._applyFilter();

      expect(receivedCmd).not.toBeNull();
      expect(receivedCmd.where).toBe('');

      unsub();
    });

    it('uses custom search template', () => {
      search.searchTemplate = '{q} IN nom';
      let receivedCmd: any = null;
      const unsub = subscribeToSourceCommands('test-source', (cmd) => {
        receivedCmd = cmd;
      });

      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'hello';
      search._applyFilter();

      expect(receivedCmd.where).toBe('hello IN nom');

      unsub();
    });

    it('escapes double quotes in search term', () => {
      let receivedCmd: any = null;
      const unsub = subscribeToSourceCommands('test-source', (cmd) => {
        receivedCmd = cmd;
      });

      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      search._term = 'test "quoted"';
      search._applyFilter();

      expect(receivedCmd.where).toBe('search("test \\"quoted\\"")');

      unsub();
    });

    it('does not filter locally in server-search mode', () => {
      search.fields = 'Nom';
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      // In server-search, data is passed through as-is
      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toHaveLength(SAMPLE_DATA.length);
    });

    it('uses meta.total for result count when available', () => {
      search.count = true;
      search.connectedCallback();

      // Set meta before data arrives
      setDataMeta('test-source', { page: 1, pageSize: 20, total: 500 });
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      expect(search._resultCount).toBe(500);
    });

    it('falls back to data length when no meta', () => {
      search.count = true;
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      expect(search._resultCount).toBe(SAMPLE_DATA.length);
    });

    it('re-emits data under its own ID in server-search mode', () => {
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      const result = getDataCache('test-search') as Record<string, unknown>[];
      expect(result).toEqual(SAMPLE_DATA);
    });

    it('forwards pagination metadata from upstream source', () => {
      search.connectedCallback();

      setDataMeta('test-source', { page: 3, pageSize: 20, total: 1500 });
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      const meta = getDataMeta('test-search');
      expect(meta).toBeDefined();
      expect(meta!.total).toBe(1500);
      expect(meta!.page).toBe(3);
      expect(meta!.pageSize).toBe(20);
    });

    it('does not forward metadata when no upstream meta exists', () => {
      search.connectedCallback();
      dispatchDataLoaded('test-source', SAMPLE_DATA);

      const meta = getDataMeta('test-search');
      expect(meta).toBeUndefined();
    });

    it('reads search template from adapter when not set explicitly', () => {
      // searchTemplate defaults to '' — should be read from adapter in _initialize
      expect(search.searchTemplate).toBe('');
      search.connectedCallback();
      // After init, template should be set from mock adapter
      expect(search.searchTemplate).toBe('search("{q}")');
    });

    it('does not override explicit search template', () => {
      search.searchTemplate = '{q} IN nom';
      search.connectedCallback();
      expect(search.searchTemplate).toBe('{q} IN nom');
    });

    it('keeps empty template when adapter returns null', () => {
      // Replace mock adapter with one that returns null
      (mockSource as any).getAdapter = () => ({
        getDefaultSearchTemplate: () => null,
      });

      search.connectedCallback();
      expect(search.searchTemplate).toBe('');
    });
  });
});
