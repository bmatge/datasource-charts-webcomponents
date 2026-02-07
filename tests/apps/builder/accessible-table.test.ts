import { describe, it, expect, beforeEach } from 'vitest';
import { updateAccessibleTable } from '../../../apps/builder/src/ui/accessible-table';
import { state } from '../../../apps/builder/src/state';

describe('updateAccessibleTable', () => {
  beforeEach(() => {
    state.data = [];
    state.labelField = '';
    document.body.innerHTML = '<table id="accessible-table"><tbody></tbody></table>';
  });

  it('should do nothing when tbody is missing', () => {
    document.body.innerHTML = '';
    state.data = [{ name: 'Test', value: 10 }];
    state.labelField = 'name';

    expect(() => updateAccessibleTable()).not.toThrow();
  });

  it('should clear existing rows', () => {
    const tbody = document.querySelector('#accessible-table tbody')!;
    tbody.innerHTML = '<tr><td>Old</td><td>999</td></tr><tr><td>Stale</td><td>0</td></tr>';
    expect(tbody.querySelectorAll('tr')).toHaveLength(2);

    state.data = [{ label: 'New', value: 42 }];
    state.labelField = 'label';
    updateAccessibleTable();

    expect(tbody.querySelectorAll('tr')).toHaveLength(1);
    expect(tbody.textContent).not.toContain('Old');
    expect(tbody.textContent).not.toContain('Stale');
  });

  it('should create rows from state.data using state.labelField', () => {
    state.labelField = 'region';
    state.data = [
      { region: 'Bretagne', value: 100 },
      { region: 'Normandie', value: 200 },
      { region: 'Occitanie', value: 300 },
    ];

    updateAccessibleTable();

    const tbody = document.querySelector('#accessible-table tbody')!;
    const rows = tbody.querySelectorAll('tr');
    expect(rows).toHaveLength(3);

    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toBe('Bretagne');

    const secondRowCells = rows[1].querySelectorAll('td');
    expect(secondRowCells[0].textContent).toBe('Normandie');

    const thirdRowCells = rows[2].querySelectorAll('td');
    expect(thirdRowCells[0].textContent).toBe('Occitanie');
  });

  it('should show "N/A" for missing label values', () => {
    state.labelField = 'region';
    state.data = [
      { region: '', value: 50 },
      { value: 75 },
    ];

    updateAccessibleTable();

    const tbody = document.querySelector('#accessible-table tbody')!;
    const rows = tbody.querySelectorAll('tr');

    expect(rows[0].querySelectorAll('td')[0].textContent).toBe('N/A');
    expect(rows[1].querySelectorAll('td')[0].textContent).toBe('N/A');
  });

  it('should show 0 for missing value', () => {
    state.labelField = 'name';
    state.data = [
      { name: 'NoValue' },
      { name: 'NullValue', value: undefined },
    ];

    updateAccessibleTable();

    const tbody = document.querySelector('#accessible-table tbody')!;
    const rows = tbody.querySelectorAll('tr');

    expect(rows[0].querySelectorAll('td')[1].textContent).toBe('0');
    expect(rows[1].querySelectorAll('td')[1].textContent).toBe('0');
  });

  it('should format numbers with fr-FR locale', () => {
    state.labelField = 'name';
    state.data = [
      { name: 'Big', value: 1234567.891 },
    ];

    updateAccessibleTable();

    const tbody = document.querySelector('#accessible-table tbody')!;
    const cell = tbody.querySelector('tr td:nth-child(2)')!;
    const formatted = (1234567.891).toLocaleString('fr-FR', { maximumFractionDigits: 2 });
    expect(cell.textContent).toBe(formatted);
  });

  it('should handle empty data array', () => {
    state.data = [];
    state.labelField = 'name';

    updateAccessibleTable();

    const tbody = document.querySelector('#accessible-table tbody')!;
    expect(tbody.querySelectorAll('tr')).toHaveLength(0);
    expect(tbody.innerHTML).toBe('');
  });
});
