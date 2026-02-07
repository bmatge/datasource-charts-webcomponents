/**
 * Accessible data table (RGAA compliance).
 * Updates the accessible table below the chart preview.
 */

import { state } from '../state.js';

/**
 * Update the RGAA-compliant accessible data table.
 */
export function updateAccessibleTable(): void {
  const tbody = document.querySelector('#accessible-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  state.data.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${(d[state.labelField] as string) || 'N/A'}</td>
      <td>${((d.value as number) || 0).toLocaleString('fr-FR', { maximumFractionDigits: 2 })}</td>
    `;
    tbody.appendChild(tr);
  });
}
