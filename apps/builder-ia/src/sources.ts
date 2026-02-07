/**
 * Data source loading, selection and field analysis
 */

import { loadFromStorage, STORAGE_KEYS } from '@gouv-widgets/shared';
import { state } from './state.js';
import type { Source, Field } from './state.js';
import { addMessage } from './chat/chat.js';

/**
 * Load saved sources from localStorage and populate the dropdown
 */
export function loadSavedSources(): void {
  const select = document.getElementById('saved-source') as HTMLSelectElement;
  select.innerHTML = '<option value="">-- Choisir --</option>';

  const sources = loadFromStorage<Source[]>(STORAGE_KEYS.SOURCES, []);
  const selectedSource = loadFromStorage<Source | null>(STORAGE_KEYS.SELECTED_SOURCE, null);

  sources.forEach(source => {
    const option = document.createElement('option');
    option.value = source.id;
    const badge = source.type === 'grist' ? '\uD83D\uDFE2' : source.type === 'manual' ? '\uD83D\uDFE3' : '\uD83D\uDD35';
    option.textContent = `${badge} ${source.name}`;
    option.dataset.source = JSON.stringify(source);
    select.appendChild(option);
  });

  // Check for recently selected source
  if (selectedSource && selectedSource.data) {
    let found = false;
    for (const opt of Array.from(select.options)) {
      if (opt.value === selectedSource.id) {
        opt.selected = true;
        found = true;
        break;
      }
    }
    if (!found) {
      const option = document.createElement('option');
      option.value = selectedSource.id;
      const badge = selectedSource.type === 'grist' ? '\uD83D\uDFE2' : '\uD83D\uDFE3';
      option.textContent = `${badge} ${selectedSource.name} (recent)`;
      option.dataset.source = JSON.stringify(selectedSource);
      option.selected = true;
      select.appendChild(option);
    }
    handleSourceChange();
  }
}

/**
 * Handle source dropdown change event
 */
export function handleSourceChange(): void {
  const select = document.getElementById('saved-source') as HTMLSelectElement;
  const selectedOption = select.options[select.selectedIndex];
  const infoEl = document.getElementById('saved-source-info') as HTMLElement;

  if (!selectedOption || !selectedOption.dataset.source) {
    state.source = null;
    state.localData = null;
    state.fields = [];
    infoEl.innerHTML = '';
    updateFieldsList();
    return;
  }

  const source: Source = JSON.parse(selectedOption.dataset.source);
  state.source = source;

  const badge = source.type === 'grist' ? 'source-badge-grist' : source.type === 'manual' ? 'source-badge-manual' : 'source-badge-api';
  const badgeText = source.type === 'grist' ? 'Grist' : source.type === 'manual' ? 'Manuel' : 'API';

  infoEl.innerHTML = `
    <span class="source-badge ${badge}">${badgeText}</span>
    ${source.recordCount || source.data?.length || '?'} enregistrements
  `;

  if (source.data && source.data.length > 0) {
    state.localData = source.data;
    analyzeFields();
    updateFieldsList();
    updateRawData();

    // Inform the chat
    addMessage('assistant', `Source "${source.name}" chargee (${source.data.length} lignes, ${state.fields.length} champs). Que voulez-vous visualiser ?`, [
      'Barres',
      'Camembert',
      'Courbe',
    ]);

    // Update status badge
    const statusEl = document.getElementById('fields-status');
    if (statusEl) {
      statusEl.innerHTML = '<span class="fr-badge fr-badge--success fr-badge--sm">Source chargee</span>';
    }
  }
}

/**
 * Button click handler to load saved source data
 */
export function loadSavedSourceData(): void {
  const select = document.getElementById('saved-source') as HTMLSelectElement;
  if (!select.value) {
    const statusEl = document.getElementById('fields-status');
    if (statusEl) {
      statusEl.innerHTML = '<span class="fr-badge fr-badge--warning fr-badge--sm">Selectionner</span>';
    }
    return;
  }
  handleSourceChange();
}

/**
 * Analyze fields from the first record, scanning for types
 */
export function analyzeFields(): void {
  if (!state.localData || state.localData.length === 0) return;

  const record = state.localData[0];
  state.fields = Object.keys(record).map(key => {
    let value = record[key];

    // If first record has null, scan other records to find actual type
    if (value === null && state.localData!.length > 1) {
      for (let i = 1; i < Math.min(state.localData!.length, 100); i++) {
        const val = state.localData![i][key];
        if (val !== null && val !== undefined) {
          value = val;
          break;
        }
      }
    }

    const type = typeof value;
    let fieldType: string;
    if (value === null) {
      fieldType = 'texte'; // Default to text for null-only fields
    } else if (type === 'number') {
      fieldType = 'numerique';
    } else if (type === 'string') {
      if (!isNaN(Date.parse(value as string))) {
        fieldType = 'date';
      } else {
        fieldType = 'texte';
      }
    } else {
      fieldType = 'texte';
    }

    return { name: key, type: fieldType, sample: value } as Field;
  });
}

/**
 * Render field tags in the DOM
 */
export function updateFieldsList(): void {
  const container = document.getElementById('field-list') as HTMLElement;
  if (state.fields.length === 0) {
    container.innerHTML = '<span style="color: var(--text-mention-grey); font-size: 0.8rem;">Selectionnez une source de donnees</span>';
    return;
  }

  container.innerHTML = state.fields.map(f => {
    const isNumeric = f.type === 'numerique';
    return `<span class="field-tag ${isNumeric ? 'numeric' : ''}">${f.name} <small>(${f.type})</small></span>`;
  }).join('');
}

/**
 * Show first 50 records as JSON in the raw data panel
 */
export function updateRawData(): void {
  const pre = document.getElementById('raw-data') as HTMLPreElement;
  if (state.localData) {
    pre.textContent = JSON.stringify(state.localData.slice(0, 50), null, 2);
  }
}
