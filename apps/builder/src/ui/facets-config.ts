/**
 * Facets configuration: modal field picker, toggle, and input listeners.
 */

import { state, type FacetFieldConfig } from '../state.js';
import { openModal, closeModal, setupModalOverlayClose } from '@gouv-widgets/shared';

/**
 * Initialize facets fields from current state.fields (all inactive by default).
 * Preserves existing config if fields haven't changed.
 */
export function initFacetsFields(): void {
  if (state.fields.length === 0) return;

  const currentFieldNames = state.fields.map(f => f.name);
  const existingFieldNames = state.facetsConfig.fields.map(c => c.field);

  // Skip if already initialized with the same fields
  if (
    existingFieldNames.length > 0 &&
    existingFieldNames.length === currentFieldNames.length &&
    existingFieldNames.every((f, i) => f === currentFieldNames[i])
  ) {
    return;
  }

  state.facetsConfig.fields = state.fields.map(f => ({
    field: f.name,
    label: f.name,
    display: 'checkbox' as const,
    searchable: false,
    disjunctive: false,
  }));
}

/**
 * Open the facets field configuration modal.
 */
export function openFacetsModal(): void {
  if (state.facetsConfig.fields.length === 0) {
    initFacetsFields();
  }

  const listEl = document.getElementById('facets-fields-list');
  if (!listEl) return;

  // Find which fields are active (have been selected)
  const activeFieldNames = new Set(
    state.facetsConfig.fields.filter(f => f.field).map(f => f.field)
  );

  listEl.innerHTML = state.fields.map((field) => {
    const config = state.facetsConfig.fields.find(c => c.field === field.name);
    const isActive = config && activeFieldNames.has(field.name);
    const label = config?.label || field.name;
    const display = config?.display || 'checkbox';
    const searchable = config?.searchable || false;
    const disjunctive = config?.disjunctive || false;

    return `
    <div class="facets-field-row" data-field="${field.name}">
      <input type="checkbox" class="facets-field-active" ${isActive ? 'checked' : ''}>
      <span class="facets-field-name">${field.name}</span>
      <input type="text" class="fr-input fr-input--sm facets-field-label" value="${label}" placeholder="Label">
      <select class="fr-select fr-select--sm facets-field-display">
        <option value="checkbox" ${display === 'checkbox' ? 'selected' : ''}>Cases a cocher</option>
        <option value="select" ${display === 'select' ? 'selected' : ''}>Liste deroulante</option>
        <option value="multiselect" ${display === 'multiselect' ? 'selected' : ''}>Multi-selection</option>
      </select>
      <label class="facets-field-option"><input type="checkbox" class="facets-field-searchable" ${searchable ? 'checked' : ''}> Recherche</label>
      <label class="facets-field-option"><input type="checkbox" class="facets-field-disjunctive" ${disjunctive ? 'checked' : ''}> Multi (OU)</label>
    </div>`;
  }).join('');

  openModal('facets-fields-modal');
}

/**
 * Read modal inputs and save facet field config back to state.
 */
export function saveFacetsModal(): void {
  const rows = document.querySelectorAll('#facets-fields-list .facets-field-row');
  const fields: FacetFieldConfig[] = [];

  rows.forEach(row => {
    const fieldName = row.getAttribute('data-field') || '';
    const active = (row.querySelector('.facets-field-active') as HTMLInputElement)?.checked ?? false;

    if (!active) return; // Only keep active fields

    const label = (row.querySelector('.facets-field-label') as HTMLInputElement)?.value || fieldName;
    const display = (row.querySelector('.facets-field-display') as HTMLSelectElement)?.value as FacetFieldConfig['display'] || 'checkbox';
    const searchable = (row.querySelector('.facets-field-searchable') as HTMLInputElement)?.checked ?? false;
    const disjunctive = (row.querySelector('.facets-field-disjunctive') as HTMLInputElement)?.checked ?? false;

    fields.push({ field: fieldName, label, display, searchable, disjunctive });
  });

  state.facetsConfig.fields = fields;
  closeModal('facets-fields-modal');
  updateFacetsSummary();
}

/**
 * Update the summary text showing how many facets are configured.
 */
export function updateFacetsSummary(): void {
  const summaryEl = document.getElementById('facets-fields-summary');
  if (!summaryEl) return;

  const count = state.facetsConfig.fields.length;
  if (count === 0) {
    summaryEl.textContent = 'Aucun champ configure';
  } else if (count === 1) {
    summaryEl.textContent = `1 facette configuree (${state.facetsConfig.fields[0].field})`;
  } else {
    summaryEl.textContent = `${count} facettes configurees (${state.facetsConfig.fields.map(f => f.field).join(', ')})`;
  }
}

/**
 * Setup event listeners for facets config inputs.
 */
export function setupFacetsListeners(): void {
  const enabledToggle = document.getElementById('facets-enabled') as HTMLInputElement | null;
  const options = document.getElementById('facets-options');

  if (enabledToggle) {
    enabledToggle.addEventListener('change', () => {
      state.facetsConfig.enabled = enabledToggle.checked;
      if (options) options.style.display = enabledToggle.checked ? 'block' : 'none';
    });
  }

  const fieldsBtn = document.getElementById('facets-fields-btn');
  if (fieldsBtn) {
    fieldsBtn.addEventListener('click', openFacetsModal);
  }

  const saveBtn = document.getElementById('facets-fields-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveFacetsModal);
  }

  const closeBtn = document.getElementById('facets-fields-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal('facets-fields-modal'));
  }

  setupModalOverlayClose('facets-fields-modal');

  const maxValuesEl = document.getElementById('facets-max-values') as HTMLInputElement | null;
  if (maxValuesEl) {
    maxValuesEl.addEventListener('input', () => {
      state.facetsConfig.maxValues = parseInt(maxValuesEl.value, 10) || 6;
    });
  }

  const sortEl = document.getElementById('facets-sort') as HTMLSelectElement | null;
  if (sortEl) {
    sortEl.addEventListener('change', () => {
      state.facetsConfig.sort = sortEl.value;
    });
  }

  const hideEmptyEl = document.getElementById('facets-hide-empty') as HTMLInputElement | null;
  if (hideEmptyEl) {
    hideEmptyEl.addEventListener('change', () => {
      state.facetsConfig.hideEmpty = hideEmptyEl.checked;
    });
  }
}
