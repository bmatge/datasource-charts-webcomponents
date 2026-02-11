import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GouvDatalist } from '../src/components/gouv-datalist.js';
import { clearDataCache, dispatchDataLoaded } from '../src/utils/data-bridge.js';

/**
 * Tests for GouvDatalist component logic.
 *
 * Tests both pure data-processing functions and component-level behavior
 * using the actual component class with data-bridge integration.
 */

// --- Extract and test pure logic independently ---

/** Replicates parseColumns logic from GouvDatalist */
function parseColumns(colonnes: string): { key: string; label: string }[] {
  if (!colonnes) return [];
  return colonnes.split(',').map(col => {
    const [key, label] = col.trim().split(':');
    return { key: key.trim(), label: label?.trim() || key.trim() };
  });
}

/** Replicates formatCellValue logic from GouvDatalist */
function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  return String(value);
}

/** Replicates getFilteredData sort logic */
function sortData(
  data: Record<string, unknown>[],
  sortKey: string,
  direction: 'asc' | 'desc',
): Record<string, unknown>[] {
  const result = [...data];
  result.sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    const comparison = typeof aVal === 'number' && typeof bVal === 'number'
      ? aVal - bVal
      : String(aVal).localeCompare(String(bVal), 'fr');

    return direction === 'desc' ? -comparison : comparison;
  });
  return result;
}

/** Replicates search filter logic */
function filterBySearch(data: Record<string, unknown>[], query: string): Record<string, unknown>[] {
  if (!query) return data;
  const q = query.toLowerCase();
  return data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(q)
    )
  );
}

/** Replicates active filter logic */
function filterByField(data: Record<string, unknown>[], key: string, value: string): Record<string, unknown>[] {
  if (!value) return data;
  return data.filter(item => String(item[key]) === value);
}

describe('GouvDatalist logic', () => {
  describe('parseColumns', () => {
    it('returns empty array when colonnes is empty', () => {
      expect(parseColumns('')).toEqual([]);
    });

    it('parses single column definition', () => {
      expect(parseColumns('name:Nom')).toEqual([
        { key: 'name', label: 'Nom' },
      ]);
    });

    it('parses multiple column definitions', () => {
      const columns = parseColumns('name:Nom, score:Score RGAA, status:Statut');
      expect(columns).toHaveLength(3);
      expect(columns[0]).toEqual({ key: 'name', label: 'Nom' });
      expect(columns[1]).toEqual({ key: 'score', label: 'Score RGAA' });
      expect(columns[2]).toEqual({ key: 'status', label: 'Statut' });
    });

    it('uses key as label when label is missing', () => {
      expect(parseColumns('name')).toEqual([
        { key: 'name', label: 'name' },
      ]);
    });

    it('trims whitespace from keys and labels', () => {
      const columns = parseColumns('  name : Nom du site  ');
      expect(columns[0]).toEqual({ key: 'name', label: 'Nom du site' });
    });

    it('handles mixed defined and undefined labels', () => {
      const columns = parseColumns('id, name:Nom, score');
      expect(columns).toEqual([
        { key: 'id', label: 'id' },
        { key: 'name', label: 'Nom' },
        { key: 'score', label: 'score' },
      ]);
    });
  });

  describe('formatCellValue', () => {
    it('returns "—" for null', () => {
      expect(formatCellValue(null)).toBe('—');
    });

    it('returns "—" for undefined', () => {
      expect(formatCellValue(undefined)).toBe('—');
    });

    it('returns "Oui" for true', () => {
      expect(formatCellValue(true)).toBe('Oui');
    });

    it('returns "Non" for false', () => {
      expect(formatCellValue(false)).toBe('Non');
    });

    it('converts numbers to string', () => {
      expect(formatCellValue(42)).toBe('42');
    });

    it('passes strings through', () => {
      expect(formatCellValue('hello')).toBe('hello');
    });

    it('converts 0 to string', () => {
      expect(formatCellValue(0)).toBe('0');
    });

    it('converts empty string to string', () => {
      expect(formatCellValue('')).toBe('');
    });
  });

  describe('sortData', () => {
    const data = [
      { name: 'Charlie', score: 80 },
      { name: 'Alice', score: 95 },
      { name: 'Bob', score: 70 },
    ];

    it('sorts strings ascending (fr locale)', () => {
      const result = sortData(data, 'name', 'asc');
      expect(result.map(r => r.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('sorts strings descending', () => {
      const result = sortData(data, 'name', 'desc');
      expect(result.map(r => r.name)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('sorts numbers ascending', () => {
      const result = sortData(data, 'score', 'asc');
      expect(result.map(r => r.score)).toEqual([70, 80, 95]);
    });

    it('sorts numbers descending', () => {
      const result = sortData(data, 'score', 'desc');
      expect(result.map(r => r.score)).toEqual([95, 80, 70]);
    });

    it('pushes null/undefined values to the end', () => {
      const withNull = [
        { name: 'B', score: 10 },
        { name: null, score: null },
        { name: 'A', score: 20 },
      ];
      const result = sortData(withNull, 'name', 'asc');
      expect(result[2].name).toBeNull();
    });

    it('does not mutate the original array', () => {
      const original = [...data];
      sortData(data, 'score', 'asc');
      expect(data).toEqual(original);
    });
  });

  describe('filterBySearch', () => {
    const data = [
      { name: 'Site Alpha', ministere: 'Education' },
      { name: 'Site Beta', ministere: 'Santé' },
      { name: 'Site Gamma', ministere: 'Education' },
    ];

    it('returns all data when query is empty', () => {
      expect(filterBySearch(data, '')).toHaveLength(3);
    });

    it('filters across all fields', () => {
      expect(filterBySearch(data, 'Education')).toHaveLength(2);
    });

    it('is case insensitive', () => {
      expect(filterBySearch(data, 'alpha')).toHaveLength(1);
      expect(filterBySearch(data, 'ALPHA')).toHaveLength(1);
    });

    it('returns empty when no match', () => {
      expect(filterBySearch(data, 'xyz')).toHaveLength(0);
    });

    it('matches partial strings', () => {
      expect(filterBySearch(data, 'Site')).toHaveLength(3);
    });
  });

  describe('filterByField', () => {
    const data = [
      { name: 'A', status: 'actif' },
      { name: 'B', status: 'inactif' },
      { name: 'C', status: 'actif' },
    ];

    it('returns all data when value is empty', () => {
      expect(filterByField(data, 'status', '')).toHaveLength(3);
    });

    it('filters by exact field value', () => {
      expect(filterByField(data, 'status', 'actif')).toHaveLength(2);
    });

    it('returns empty when no match', () => {
      expect(filterByField(data, 'status', 'supprimé')).toHaveLength(0);
    });
  });

  describe('CSV export logic', () => {
    it('escapes semicolons in values', () => {
      const val = 'hello;world';
      const escaped = val.includes(';') || val.includes('"')
        ? `"${val.replace(/"/g, '""')}"`
        : val;
      expect(escaped).toBe('"hello;world"');
    });

    it('escapes double quotes in values', () => {
      const val = 'say "hello"';
      const escaped = val.includes(';') || val.includes('"')
        ? `"${val.replace(/"/g, '""')}"`
        : val;
      expect(escaped).toBe('"say ""hello"""');
    });

    it('does not escape plain values', () => {
      const val = 'simple value';
      const escaped = val.includes(';') || val.includes('"')
        ? `"${val.replace(/"/g, '""')}"`
        : val;
      expect(escaped).toBe('simple value');
    });
  });

  describe('HTML export logic', () => {
    it('escapes HTML special characters in values', () => {
      const val = '<script>alert("xss")</script>';
      const escaped = val
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      expect(escaped).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('escapes ampersands in values', () => {
      const val = 'A&B';
      const escaped = val
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      expect(escaped).toBe('A&amp;B');
    });

    it('produces valid table structure', () => {
      const columns = [{ key: 'name', label: 'Nom' }, { key: 'score', label: 'Score' }];
      const data = [{ name: 'Alice', score: 95 }];

      const headerCells = columns.map(c => `<th>${c.label}</th>`).join('');
      const bodyRows = data.map(item =>
        '<tr>' + columns.map(c => `<td>${item[c.key] ?? ''}</td>`).join('') + '</tr>'
      ).join('');

      const table = `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      expect(table).toContain('<th>Nom</th>');
      expect(table).toContain('<th>Score</th>');
      expect(table).toContain('<td>Alice</td>');
      expect(table).toContain('<td>95</td>');
    });
  });

  describe('Pagination logic', () => {
    it('calculates correct total pages', () => {
      const dataLength = 25;
      const pageSize = 10;
      const totalPages = Math.ceil(dataLength / pageSize);
      expect(totalPages).toBe(3);
    });

    it('returns 1 page when no pagination', () => {
      const pageSize = 0;
      const totalPages = !pageSize || pageSize <= 0 ? 1 : Math.ceil(10 / pageSize);
      expect(totalPages).toBe(1);
    });

    it('paginates data correctly', () => {
      const data = Array.from({ length: 25 }, (_, i) => ({ id: i }));
      const page = 3;
      const pageSize = 10;
      const start = (page - 1) * pageSize;
      const paginated = data.slice(start, start + pageSize);
      expect(paginated).toHaveLength(5);
      expect(paginated[0].id).toBe(20);
    });
  });
});

describe('GouvDatalist component', () => {
  let datalist: GouvDatalist;

  beforeEach(() => {
    clearDataCache('test-dl-src');
    datalist = new GouvDatalist();
  });

  afterEach(() => {
    if (datalist.isConnected) {
      datalist.disconnectedCallback();
    }
  });

  describe('parseColumns', () => {
    it('returns empty array when colonnes is empty', () => {
      datalist.colonnes = '';
      expect(datalist.parseColumns()).toEqual([]);
    });

    it('parses columns with labels', () => {
      datalist.colonnes = 'name:Nom, score:Score RGAA';
      const cols = datalist.parseColumns();
      expect(cols).toHaveLength(2);
      expect(cols[0]).toEqual({ key: 'name', label: 'Nom' });
      expect(cols[1]).toEqual({ key: 'score', label: 'Score RGAA' });
    });

    it('uses key as label when label is missing', () => {
      datalist.colonnes = 'id, name:Nom';
      const cols = datalist.parseColumns();
      expect(cols[0]).toEqual({ key: 'id', label: 'id' });
    });
  });

  describe('formatCellValue', () => {
    it('returns em-dash for null', () => {
      expect(datalist.formatCellValue(null)).toBe('\u2014');
    });

    it('returns em-dash for undefined', () => {
      expect(datalist.formatCellValue(undefined)).toBe('\u2014');
    });

    it('returns Oui for true', () => {
      expect(datalist.formatCellValue(true)).toBe('Oui');
    });

    it('returns Non for false', () => {
      expect(datalist.formatCellValue(false)).toBe('Non');
    });

    it('converts numbers to string', () => {
      expect(datalist.formatCellValue(42)).toBe('42');
    });
  });

  describe('onSourceData', () => {
    it('stores array data', () => {
      datalist.onSourceData([{ id: 1 }, { id: 2 }]);
      expect((datalist as any)._data).toHaveLength(2);
    });

    it('stores empty array for non-array', () => {
      datalist.onSourceData('not an array');
      expect((datalist as any)._data).toEqual([]);
    });

    it('resets current page on new data', () => {
      (datalist as any)._currentPage = 5;
      datalist.onSourceData([{ id: 1 }]);
      expect((datalist as any)._currentPage).toBe(1);
    });
  });

  describe('getFilteredData', () => {
    beforeEach(() => {
      datalist.onSourceData([
        { name: 'Site Alpha', ministere: 'Education', score: 80 },
        { name: 'Site Beta', ministere: 'Sante', score: 60 },
        { name: 'Site Gamma', ministere: 'Education', score: 95 },
      ]);
    });

    it('returns all data when no filters', () => {
      expect(datalist.getFilteredData()).toHaveLength(3);
    });

    it('filters by search query', () => {
      (datalist as any)._searchQuery = 'alpha';
      expect(datalist.getFilteredData()).toHaveLength(1);
    });

    it('filters by active filter', () => {
      (datalist as any)._activeFilters = { ministere: 'Education' };
      expect(datalist.getFilteredData()).toHaveLength(2);
    });

    it('sorts ascending by key', () => {
      (datalist as any)._sort = { key: 'score', direction: 'asc' };
      const result = datalist.getFilteredData();
      expect(result[0].score).toBe(60);
      expect(result[2].score).toBe(95);
    });

    it('sorts descending by key', () => {
      (datalist as any)._sort = { key: 'score', direction: 'desc' };
      const result = datalist.getFilteredData();
      expect(result[0].score).toBe(95);
      expect(result[2].score).toBe(60);
    });

    it('combines search and filter', () => {
      (datalist as any)._searchQuery = 'site';
      (datalist as any)._activeFilters = { ministere: 'Education' };
      expect(datalist.getFilteredData()).toHaveLength(2);
    });
  });

  describe('Data integration via data-bridge', () => {
    it('receives data from source', () => {
      datalist.source = 'test-dl-src';
      datalist.connectedCallback();

      dispatchDataLoaded('test-dl-src', [
        { name: 'A', score: 10 },
        { name: 'B', score: 20 },
      ]);

      expect((datalist as any)._data).toHaveLength(2);
    });

    it('picks up cached data on connect', () => {
      dispatchDataLoaded('test-dl-src', [{ name: 'cached' }]);

      datalist.source = 'test-dl-src';
      datalist.connectedCallback();

      expect((datalist as any)._data).toHaveLength(1);
    });

    it('initializes sort from tri attribute', () => {
      datalist.tri = 'score:desc';
      datalist.source = 'test-dl-src';
      datalist.connectedCallback();

      expect((datalist as any)._sort).toEqual({ key: 'score', direction: 'desc' });
    });

    it('defaults sort direction to asc', () => {
      datalist.tri = 'name';
      datalist.source = 'test-dl-src';
      datalist.connectedCallback();

      expect((datalist as any)._sort).toEqual({ key: 'name', direction: 'asc' });
    });
  });

  describe('Event handlers', () => {
    beforeEach(() => {
      datalist.onSourceData([
        { name: 'A', status: 'actif' },
        { name: 'B', status: 'inactif' },
        { name: 'C', status: 'actif' },
      ]);
    });

    it('_handleSort toggles direction on same key', () => {
      (datalist as any)._handleSort('name');
      expect((datalist as any)._sort).toEqual({ key: 'name', direction: 'asc' });

      (datalist as any)._handleSort('name');
      expect((datalist as any)._sort).toEqual({ key: 'name', direction: 'desc' });
    });

    it('_handleSort resets to asc on new key', () => {
      (datalist as any)._handleSort('name');
      (datalist as any)._handleSort('status');
      expect((datalist as any)._sort).toEqual({ key: 'status', direction: 'asc' });
    });

    it('_handlePageChange updates page', () => {
      (datalist as any)._handlePageChange(3);
      expect((datalist as any)._currentPage).toBe(3);
    });
  });
});
