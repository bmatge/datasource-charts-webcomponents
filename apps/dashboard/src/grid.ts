/**
 * Dashboard app - Grid management
 */

import { state } from './state.js';
import { initDropZones } from './drag-drop.js';
import { renderWidget } from './widgets.js';

export function addRow(): void {
  const grid = document.getElementById('dashboard-grid');
  if (!grid) return;

  const rowIndex = grid.querySelectorAll('.dashboard-row').length;
  const columns = parseInt((document.getElementById('grid-columns') as HTMLSelectElement)?.value || '2');
  const colSize = Math.floor(12 / columns);

  const row = document.createElement('div');
  row.className = `fr-grid-row ${state.dashboard.layout.gap} dashboard-row`;
  row.dataset.row = String(rowIndex);

  for (let i = 0; i < columns; i++) {
    const colClass = colSize === 12 ? 'fr-col-12' : `fr-col-12 fr-col-md-${colSize}`;
    row.innerHTML += `
      <div class="${colClass}">
        <div class="drop-cell empty" data-row="${rowIndex}" data-col="${i}" data-colspan="${colSize}">
          <div class="drop-cell-placeholder">
            <i class="ri-add-circle-line"></i>
            <span>Glisser un widget ici</span>
          </div>
        </div>
      </div>
    `;
  }

  grid.appendChild(row);
  initDropZones();
}

export function resetGrid(): void {
  const grid = document.getElementById('dashboard-grid');
  if (!grid) return;

  const columns = parseInt((document.getElementById('grid-columns') as HTMLSelectElement)?.value || '2');
  const colSize = Math.floor(12 / columns);
  const colClass = colSize === 12 ? 'fr-col-12' : `fr-col-12 fr-col-md-${colSize}`;

  grid.innerHTML = `
    <div class="fr-grid-row ${state.dashboard.layout.gap} dashboard-row" data-row="0">
      ${Array(columns).fill(0).map((_, i) => `
        <div class="${colClass}">
          <div class="drop-cell empty" data-row="0" data-col="${i}" data-colspan="${colSize}">
            <div class="drop-cell-placeholder">
              <i class="ri-add-circle-line"></i>
              <span>Glisser un widget ici</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  initDropZones();
}

export function rebuildGrid(): void {
  const grid = document.getElementById('dashboard-grid');
  if (!grid) return;

  const columns = state.dashboard.layout.columns || 2;
  const colSize = Math.floor(12 / columns);
  const colClass = colSize === 12 ? 'fr-col-12' : `fr-col-12 fr-col-md-${colSize}`;

  const maxRow = state.dashboard.widgets.reduce((max, w) => Math.max(max, w.position.row), 0);

  grid.innerHTML = '';

  for (let rowIdx = 0; rowIdx <= maxRow; rowIdx++) {
    const row = document.createElement('div');
    row.className = `fr-grid-row ${state.dashboard.layout.gap} dashboard-row`;
    row.dataset.row = String(rowIdx);

    for (let colIdx = 0; colIdx < columns; colIdx++) {
      const widget = state.dashboard.widgets.find(w => w.position.row === rowIdx && w.position.col === colIdx);
      const colDiv = document.createElement('div');
      colDiv.className = colClass;

      const cell = document.createElement('div');
      cell.className = 'drop-cell';
      cell.dataset.row = String(rowIdx);
      cell.dataset.col = String(colIdx);
      cell.dataset.colspan = String(colSize);

      if (widget) {
        renderWidget(widget, cell);
      } else {
        cell.classList.add('empty');
        cell.innerHTML = `
          <div class="drop-cell-placeholder">
            <i class="ri-add-circle-line"></i>
            <span>Glisser un widget ici</span>
          </div>
        `;
      }

      colDiv.appendChild(cell);
      row.appendChild(colDiv);
    }

    grid.appendChild(row);
  }

  if (state.dashboard.widgets.length === 0 || state.dashboard.widgets.every(w => w.position.row <= maxRow)) {
    addRow();
  }

  initDropZones();
}
