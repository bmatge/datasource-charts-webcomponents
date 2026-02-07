/**
 * Dashboard app - Dashboard CRUD operations
 */

import { escapeHtml, saveToStorage, STORAGE_KEYS, toastWarning, toastSuccess, navigateTo } from '@gouv-widgets/shared';
import { state, createEmptyDashboard } from './state.js';
import { resetGrid, rebuildGrid } from './grid.js';
import { updateGeneratedCode, generateHTMLCode } from './code-generator.js';

export function saveDashboard(): void {
  const name = (document.getElementById('dashboard-title') as HTMLInputElement)?.value.trim();
  if (!name) {
    toastWarning('Veuillez donner un nom au tableau de bord');
    return;
  }

  state.dashboard.name = name;
  state.dashboard.updatedAt = new Date().toISOString();

  if (!state.dashboard.id) {
    state.dashboard.id = `dashboard-${Date.now()}`;
    state.dashboard.createdAt = state.dashboard.updatedAt;
  }

  const index = state.savedDashboards.findIndex(d => d.id === state.dashboard.id);
  if (index > -1) {
    state.savedDashboards[index] = { ...state.dashboard };
  } else {
    state.savedDashboards.push({ ...state.dashboard });
  }

  saveToStorage(STORAGE_KEYS.DASHBOARDS, state.savedDashboards);
  toastSuccess('Tableau de bord sauvegarde !');
}

export function newDashboard(): void {
  if (state.dashboard.widgets.length > 0) {
    if (!confirm('Creer un nouveau tableau de bord ? Les modifications non sauvegardees seront perdues.')) {
      return;
    }
  }

  state.dashboard = createEmptyDashboard();
  const titleInput = document.getElementById('dashboard-title') as HTMLInputElement | null;
  if (titleInput) titleInput.value = state.dashboard.name;
  resetGrid();
  updateGeneratedCode();
}

export function openDashboardsList(): void {
  const modal = document.getElementById('dashboards-modal');
  const list = document.getElementById('dashboards-list');
  if (!modal || !list) return;

  if (state.savedDashboards.length === 0) {
    list.innerHTML = '<p class="favorites-empty">Aucun tableau de bord sauvegarde</p>';
  } else {
    list.innerHTML = state.savedDashboards.map(d => `
      <div class="favorite-item" style="cursor: pointer; margin-bottom: 0.5rem;" onclick="loadDashboard('${d.id}')">
        <i class="ri-dashboard-line"></i>
        <span>${escapeHtml(d.name)}</span>
        <small style="color: var(--text-mention-grey); margin-left: auto;">
          ${new Date(d.updatedAt || '').toLocaleDateString('fr-FR')}
        </small>
      </div>
    `).join('');
  }

  modal.classList.add('active');
}

export function loadDashboard(id: string): void {
  const dashboard = state.savedDashboards.find(d => d.id === id);
  if (!dashboard) return;

  state.dashboard = JSON.parse(JSON.stringify(dashboard));
  const titleInput = document.getElementById('dashboard-title') as HTMLInputElement | null;
  const columnsSelect = document.getElementById('grid-columns') as HTMLSelectElement | null;
  if (titleInput) titleInput.value = state.dashboard.name;
  if (columnsSelect) columnsSelect.value = String(state.dashboard.layout.columns || 2);

  rebuildGrid();
  document.getElementById('dashboards-modal')?.classList.remove('active');
  updateGeneratedCode();
}

export function exportHTML(): void {
  const code = generateHTMLCode();
  const blob = new Blob([code], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.dashboard.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export function navigateToSources(): void {
  navigateTo('sources');
}
