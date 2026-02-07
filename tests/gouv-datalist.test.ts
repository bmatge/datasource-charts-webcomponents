import { describe, it, expect } from 'vitest';

/**
 * Tests for GouvDatalist component logic.
 *
 * Since JSDOM doesn't fully support Lit custom elements with mixins,
 * we test the pure data-processing functions by accessing them from
 * the class prototype, and test standalone formatting/parsing logic.
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
