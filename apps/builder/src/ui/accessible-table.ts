/**
 * Accessible data table (RGAA compliance).
 * Updates the accessibility preview below the chart preview.
 */

import { state } from '../state.js';

/**
 * Update the accessibility preview section.
 * Shows/hides based on a11yEnabled state and populates table + description.
 */
export function updateAccessibleTable(): void {
  const preview = document.getElementById('a11y-preview');
  if (!preview) return;

  // Show/hide entire section
  preview.style.display = state.a11yEnabled ? 'block' : 'none';
  if (!state.a11yEnabled) return;

  // Description
  const descEl = document.getElementById('a11y-preview-description');
  if (descEl) {
    descEl.style.display = state.a11yDescription ? 'block' : 'none';
    descEl.textContent = state.a11yDescription || '';
  }

  // Table
  const tableWrapper = document.getElementById('a11y-preview-table-wrapper');
  if (tableWrapper) {
    tableWrapper.style.display = state.a11yTable ? 'block' : 'none';
  }

  const tbody = document.querySelector('#accessible-table tbody');
  if (tbody && state.a11yTable) {
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

  // Download button
  const downloadBtn = document.getElementById('a11y-preview-download') as HTMLButtonElement | null;
  if (downloadBtn) {
    downloadBtn.style.display = state.a11yDownload ? 'inline-flex' : 'none';
    downloadBtn.disabled = state.data.length === 0;
  }
}
