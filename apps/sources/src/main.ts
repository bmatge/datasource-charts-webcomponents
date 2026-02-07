/**
 * Sources app - main entry point.
 * Registers all DOM event listeners and performs initial rendering.
 */

import './styles/sources.css';
import { openModal, closeModal, saveToStorage, STORAGE_KEYS } from '@gouv-widgets/shared';

import {
  state,
  currentSourceMode,
  parsedJsonData,
  parsedCsvData,
  setCurrentSourceMode,
  setParsedJsonData,
  setParsedCsvData,
} from './state.js';

import {
  renderConnections,
  saveConnection,
  showExplorerEmpty,
  refreshCurrentView,
  renderSources,
  saveAsFavorite,
  previewSource,
  deleteSource,
  switchExplorerTab,
  switchSourceMode,
  openExportGristModal,
  loadExportDocuments,
  updateExportButton,
  exportToGrist,
} from './connections/connection-manager.js';

import { createGristTable, addColumnRow } from './connections/grist-explorer.js';

import { parseJsonInput } from './parsers/json-parser.js';
import { handleCsvFile, parseCsvText } from './parsers/csv-parser.js';
import {
  addTableRow,
  addTableColumn,
  removeTableRow,
  removeTableColumn,
  collectTableData,
  resetTableEditor,
} from './editors/table-editor.js';

// ============================================================
// Manual source save
// ============================================================

function saveManualSource(): void {
  const nameEl = document.getElementById('source-name') as HTMLInputElement | null;
  const name = nameEl?.value.trim();
  if (!name) {
    alert('Veuillez saisir un nom pour la source.');
    return;
  }

  let data: Record<string, unknown>[] | null = null;

  if (currentSourceMode === 'table') {
    data = collectTableData();
    if (!data || data.length === 0) {
      alert('Le tableau est vide.');
      return;
    }
  } else if (currentSourceMode === 'json') {
    data = parsedJsonData;
    if (!data || data.length === 0) {
      alert('Aucune donnee JSON valide.');
      return;
    }
  } else if (currentSourceMode === 'csv') {
    data = parsedCsvData;
    if (!data || data.length === 0) {
      alert('Aucune donnee CSV valide.');
      return;
    }
  }

  if (!data) return;

  const source = {
    id: `manual_${Date.now()}`,
    name,
    type: 'manual' as const,
    data,
    recordCount: data.length,
  };

  state.sources.push(source);
  saveToStorage(STORAGE_KEYS.SOURCES, state.sources);
  renderSources();
  closeModal('source-modal');
  resetManualSourceModal();
}

function resetManualSourceModal(): void {
  const nameEl = document.getElementById('source-name') as HTMLInputElement | null;
  if (nameEl) nameEl.value = '';

  resetTableEditor();
  switchSourceMode('table');
  setParsedJsonData(null);
  setParsedCsvData(null);

  // Reset JSON fields
  const jsonInput = document.getElementById('json-input') as HTMLTextAreaElement | null;
  const jsonPath = document.getElementById('json-data-path') as HTMLInputElement | null;
  const jsonPreview = document.getElementById('json-preview');
  if (jsonInput) jsonInput.value = '';
  if (jsonPath) jsonPath.value = '';
  if (jsonPreview) jsonPreview.style.display = 'none';

  // Reset CSV fields
  const csvFile = document.getElementById('csv-file') as HTMLInputElement | null;
  const csvPreview = document.getElementById('csv-preview');
  if (csvFile) csvFile.value = '';
  if (csvPreview) csvPreview.style.display = 'none';
}

function closeManualSourceModal(): void {
  closeModal('source-modal');
  resetManualSourceModal();
}

function openInBuilder(): void {
  // Source is already saved in localStorage
  window.location.href = 'builder.html';
}

// ============================================================
// Expose functions to window for inline onclick handlers
// ============================================================

(window as Record<string, unknown>).removeTableColumn = removeTableColumn;
(window as Record<string, unknown>).removeTableRow = removeTableRow;
(window as Record<string, unknown>).addTableRow = addTableRow;
(window as Record<string, unknown>).addTableColumn = addTableColumn;
(window as Record<string, unknown>).closeManualSourceModal = closeManualSourceModal;
(window as Record<string, unknown>).switchSourceMode = switchSourceMode;
(window as Record<string, unknown>).closeModal = closeModal;

// ============================================================
// DOM initialization
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  renderConnections();
  renderSources();

  // ---- Button listeners ----
  document.getElementById('add-connection-btn')?.addEventListener('click', () => openModal('connection-modal'));
  document.getElementById('add-source-btn')?.addEventListener('click', () => openModal('source-modal'));
  document.getElementById('save-connection-btn')?.addEventListener('click', saveConnection);
  document.getElementById('save-source-btn')?.addEventListener('click', saveManualSource);
  document.getElementById('create-table-btn')?.addEventListener('click', () => openModal('create-table-modal'));
  document.getElementById('add-column-btn')?.addEventListener('click', addColumnRow);
  document.getElementById('create-table-confirm-btn')?.addEventListener('click', createGristTable);
  document.getElementById('refresh-btn')?.addEventListener('click', refreshCurrentView);
  document.getElementById('use-in-builder-btn')?.addEventListener('click', openInBuilder);
  document.getElementById('save-favorite-btn')?.addEventListener('click', saveAsFavorite);
  document.getElementById('export-grist-btn')?.addEventListener('click', openExportGristModal);
  document.getElementById('export-connection')?.addEventListener('change', loadExportDocuments);
  document.getElementById('export-document')?.addEventListener('change', updateExportButton);
  document.getElementById('export-table-name')?.addEventListener('input', updateExportButton);
  document.getElementById('export-grist-confirm-btn')?.addEventListener('click', exportToGrist);

  // ---- Explorer tab switching ----
  document.querySelectorAll('.explorer-tabs:not(#source-mode-tabs) .explorer-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      switchExplorerTab((tab as HTMLElement).dataset.tab ?? '');
    });
  });

  // ---- Connection type radio toggle ----
  const connPublic = document.getElementById('conn-public') as HTMLInputElement | null;
  connPublic?.addEventListener('change', () => {
    const apiKeyGroup = document.getElementById('conn-apikey-group');
    if (apiKeyGroup) {
      apiKeyGroup.style.display = connPublic.checked ? 'none' : 'block';
    }
  });

  document.querySelectorAll('input[name="conn-type"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const type = (radio as HTMLInputElement).value;
      const gristFields = document.getElementById('grist-fields');
      const apiFields = document.getElementById('api-fields');
      if (gristFields) gristFields.style.display = type === 'grist' ? 'block' : 'none';
      if (apiFields) apiFields.style.display = type === 'api' ? 'block' : 'none';
    });
  });

  // ---- Source mode tabs ----
  document.querySelectorAll('[data-source-mode]').forEach((tab) => {
    tab.addEventListener('click', () => {
      switchSourceMode((tab as HTMLElement).dataset.sourceMode ?? 'table');
    });
  });

  // ---- JSON input ----
  document.getElementById('json-input')?.addEventListener('input', parseJsonInput);
  document.getElementById('json-data-path')?.addEventListener('input', parseJsonInput);

  // ---- CSV input ----
  document.getElementById('csv-file')?.addEventListener('change', handleCsvFile);
  document.getElementById('csv-separator')?.addEventListener('change', () => {
    // Re-parse CSV with new separator (need to access stored text)
    const csvFile = document.getElementById('csv-file') as HTMLInputElement | null;
    if (csvFile?.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') parseCsvText(text);
      };
      reader.readAsText(csvFile.files[0]);
    }
  });

  // ---- Table editor buttons (add row / add column) ----
  document.getElementById('add-table-row-btn')?.addEventListener('click', addTableRow);
  document.getElementById('add-table-col-btn')?.addEventListener('click', addTableColumn);
});
