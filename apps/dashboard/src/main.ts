/**
 * Dashboard app - Main entry point
 */

import { escapeHtml, loadFromStorage, STORAGE_KEYS } from '@gouv-widgets/shared';
import { state } from './state.js';
import { initDragAndDrop, handleFavoriteDragStart } from './drag-drop.js';
import { editWidget, deleteWidget } from './widgets.js';
import { closeConfigModal, applyConfig } from './widget-config.js';
import { addRow, resetGrid } from './grid.js';
import { updateGeneratedCode } from './code-generator.js';
import { saveDashboard, newDashboard, openDashboardsList, loadDashboard, exportHTML, navigateToSources } from './dashboards.js';

function loadFavorites(): void {
  state.favorites = loadFromStorage<any[]>(STORAGE_KEYS.FAVORITES, []);
  renderFavorites();
}

function loadSavedDashboards(): void {
  state.savedDashboards = loadFromStorage<any[]>(STORAGE_KEYS.DASHBOARDS, []);
}

function loadSources(): void {
  const sources = loadFromStorage<any[]>(STORAGE_KEYS.SOURCES, []);
  renderSources(sources);
}

function renderFavorites(): void {
  const container = document.getElementById('favorites-list');
  if (!container) return;

  if (state.favorites.length === 0) {
    container.innerHTML = '<p class="favorites-empty">Aucun favori. Creez des graphiques dans le Builder.</p>';
    return;
  }

  container.innerHTML = state.favorites.map(fav => `
    <div class="favorite-item" draggable="true" data-favorite-id="${fav.id}">
      <i class="ri-star-fill"></i>
      <span>${escapeHtml(fav.name)}</span>
    </div>
  `).join('');

  container.querySelectorAll('.favorite-item').forEach(item => {
    item.addEventListener('dragstart', handleFavoriteDragStart as EventListener);
    item.addEventListener('dragend', (e) => {
      (e.target as HTMLElement).classList.remove('dragging');
    });
  });
}

function renderSources(sources: any[]): void {
  const container = document.getElementById('sources-list');
  if (!container) return;

  if (!sources || sources.length === 0) {
    container.innerHTML = '<p class="favorites-empty">Aucune source disponible</p>';
    return;
  }

  container.innerHTML = sources.slice(0, 5).map(src => `
    <div class="favorite-item" style="cursor: default;">
      <i class="ri-database-2-line"></i>
      <span>${escapeHtml(src.name)}</span>
    </div>
  `).join('');
}

function initEventListeners(): void {
  document.getElementById('btn-new')?.addEventListener('click', newDashboard);
  document.getElementById('btn-load')?.addEventListener('click', openDashboardsList);
  document.getElementById('btn-save')?.addEventListener('click', saveDashboard);
  document.getElementById('btn-export')?.addEventListener('click', exportHTML);
  document.getElementById('add-row-btn')?.addEventListener('click', addRow);
  document.getElementById('close-modal')?.addEventListener('click', closeConfigModal);
  document.getElementById('cancel-config')?.addEventListener('click', closeConfigModal);
  document.getElementById('apply-config')?.addEventListener('click', applyConfig);

  document.getElementById('close-dashboards-modal')?.addEventListener('click', () => {
    document.getElementById('dashboards-modal')?.classList.remove('active');
  });

  document.querySelectorAll('.vde-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = (tab as HTMLElement).dataset.tab;

      document.querySelectorAll('.vde-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.vde-tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      if (tabName !== 'preview') {
        document.getElementById(`tab-${tabName}`)?.classList.add('active');
      }
    });
  });

  document.getElementById('grid-columns')?.addEventListener('change', (e) => {
    state.dashboard.layout.columns = parseInt((e.target as HTMLSelectElement).value);
    if (state.dashboard.widgets.length === 0) {
      resetGrid();
    }
  });

  document.getElementById('grid-gap')?.addEventListener('change', (e) => {
    state.dashboard.layout.gap = (e.target as HTMLSelectElement).value;
    updateGeneratedCode();
  });

  document.getElementById('dashboard-title')?.addEventListener('input', (e) => {
    state.dashboard.name = (e.target as HTMLInputElement).value;
    updateGeneratedCode();
  });

  document.getElementById('add-source-btn')?.addEventListener('click', navigateToSources);

  document.querySelectorAll('.config-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        (modal as HTMLElement).classList.remove('active');
      }
    });
  });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  loadFavorites();
  loadSavedDashboards();
  loadSources();
  initDragAndDrop();
  initEventListeners();
  updateGeneratedCode();
});

// Expose functions globally for onclick handlers
declare global {
  interface Window {
    editWidget: typeof editWidget;
    deleteWidget: typeof deleteWidget;
    loadDashboard: typeof loadDashboard;
  }
}

window.editWidget = editWidget;
window.deleteWidget = deleteWidget;
window.loadDashboard = loadDashboard;
