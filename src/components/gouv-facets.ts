import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sendWidgetBeacon } from '../utils/beacon.js';
import {
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading,
  clearDataCache,
  subscribeToSource,
  getDataCache
} from '../utils/data-bridge.js';

type FacetDisplayMode = 'checkbox' | 'select' | 'multiselect';

interface FacetValue {
  value: string;
  count: number;
}

interface FacetGroup {
  field: string;
  label: string;
  values: FacetValue[];
}

/**
 * <gouv-facets> - Filtres a facettes interactifs
 *
 * Composant visuel intermediaire qui affiche des controles de filtre
 * bases sur les valeurs categoriques des donnees. Se place entre une
 * source/normalize/query et les composants de visualisation.
 *
 * Les donnees filtrees sont redistribuees automatiquement aux composants en aval.
 *
 * @example
 * <gouv-source id="raw" url="https://api.example.com/data" transform="data"></gouv-source>
 * <gouv-normalize id="clean" source="raw" trim numeric-auto></gouv-normalize>
 * <gouv-facets id="filtered" source="clean" fields="region, type"></gouv-facets>
 * <gouv-dsfr-chart source="filtered" type="bar" label-field="region" value-field="population"></gouv-dsfr-chart>
 */
@customElement('gouv-facets')
export class GouvFacets extends LitElement {
  /** ID de la source de donnees a ecouter */
  @property({ type: String })
  source = '';

  /** Champs a exposer comme facettes (virgule-separes). Vide = auto-detection */
  @property({ type: String })
  fields = '';

  /** Labels custom : "field:Label | field2:Label 2" */
  @property({ type: String })
  labels = '';

  /** Nb de valeurs visibles par facette avant "Voir plus" */
  @property({ type: Number, attribute: 'max-values' })
  maxValues = 6;

  /** Champs en mode multi-selection OU (virgule-separes) */
  @property({ type: String })
  disjunctive = '';

  /** Tri des valeurs : count, -count, alpha, -alpha */
  @property({ type: String })
  sort = 'count';

  /** Champs avec barre de recherche (virgule-separes) */
  @property({ type: String })
  searchable = '';

  /** Masquer les facettes avec une seule valeur */
  @property({ type: Boolean, attribute: 'hide-empty' })
  hideEmpty = false;

  /** Mode d'affichage par facette : "field:select | field2:multiselect". Defaut = checkbox */
  @property({ type: String })
  display = '';

  @state()
  private _rawData: Record<string, unknown>[] = [];

  @state()
  private _facetGroups: FacetGroup[] = [];

  @state()
  private _activeSelections: Record<string, Set<string>> = {};

  @state()
  private _expandedFacets: Set<string> = new Set();

  @state()
  private _searchQueries: Record<string, string> = {};

  @state()
  private _openMultiselectField: string | null = null;

  private _unsubscribe: (() => void) | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-facets');
    this._initialize();
    document.addEventListener('click', this._onClickOutsideMultiselect);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onClickOutsideMultiselect);
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    if (this.id) {
      clearDataCache(this.id);
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('source')) {
      this._initialize();
      return;
    }

    const facetAttrs = ['fields', 'labels', 'sort', 'hideEmpty', 'maxValues', 'disjunctive', 'searchable', 'display'];
    const hasFacetChange = facetAttrs.some(attr => changedProperties.has(attr));
    if (hasFacetChange && this._rawData.length > 0) {
      this._buildFacetGroups();
      this._applyFilters();
    }
  }

  private _initialize() {
    if (!this.id) {
      console.warn('gouv-facets: attribut "id" requis pour identifier la sortie');
      return;
    }

    if (!this.source) {
      console.warn('gouv-facets: attribut "source" requis');
      return;
    }

    if (this._unsubscribe) {
      this._unsubscribe();
    }

    this._activeSelections = {};
    this._expandedFacets = new Set();
    this._searchQueries = {};

    const cachedData = getDataCache(this.source);
    if (cachedData !== undefined) {
      this._onData(cachedData);
    }

    this._unsubscribe = subscribeToSource(this.source, {
      onLoaded: (data: unknown) => {
        this._onData(data);
      },
      onLoading: () => {
        dispatchDataLoading(this.id);
      },
      onError: (error: Error) => {
        dispatchDataError(this.id, error);
      }
    });
  }

  private _onData(data: unknown) {
    this._rawData = Array.isArray(data) ? data : [];
    this._buildFacetGroups();
    this._applyFilters();
  }

  // --- Facet index building ---

  _buildFacetGroups() {
    const fields = this._getFields();
    const labelMap = this._parseLabels();

    this._facetGroups = fields
      .map(field => {
        const values = this._computeFacetValues(field);
        return {
          field,
          label: labelMap.get(field) ?? field,
          values,
        };
      })
      .filter(group => {
        if (this.hideEmpty && group.values.length <= 1) return false;
        return group.values.length > 0;
      });
  }

  /** Get fields to use as facets — explicit or auto-detected */
  private _getFields(): string[] {
    if (this.fields) {
      return _parseCSV(this.fields);
    }
    return this._autoDetectFields();
  }

  /** Auto-detect categorical fields: string type, 2-50 unique values, not all unique (ID-like) */
  _autoDetectFields(): string[] {
    if (this._rawData.length === 0) return [];

    const candidates: string[] = [];
    const sampleRow = this._rawData[0];

    for (const key of Object.keys(sampleRow)) {
      const uniqueValues = new Set<string>();
      let allStrings = true;

      for (const row of this._rawData) {
        const val = row[key];
        if (val === null || val === undefined || val === '') continue;
        if (typeof val !== 'string') {
          allStrings = false;
          break;
        }
        uniqueValues.add(val);
        if (uniqueValues.size > 50) break;
      }

      if (!allStrings) continue;
      if (uniqueValues.size <= 1 || uniqueValues.size > 50) continue;
      // Exclude ID-like fields (all values unique)
      if (uniqueValues.size === this._rawData.length) continue;

      candidates.push(key);
    }

    return candidates;
  }

  /** Compute facet values with counts, applying cross-facet filtering for dynamic counts */
  _computeFacetValues(field: string): FacetValue[] {
    // For dynamic counts: filter data by all OTHER active facets (not this one)
    const dataForCounting = this._getDataFilteredExcluding(field);

    const counts = new Map<string, number>();
    for (const row of dataForCounting) {
      const val = row[field];
      if (val === null || val === undefined || val === '') continue;
      const strVal = String(val);
      counts.set(strVal, (counts.get(strVal) ?? 0) + 1);
    }

    const values: FacetValue[] = [];
    for (const [value, count] of counts) {
      values.push({ value, count });
    }

    return this._sortValues(values);
  }

  /** Filter data by all active selections EXCEPT the given field */
  private _getDataFilteredExcluding(excludeField: string): Record<string, unknown>[] {
    const activeFields = Object.keys(this._activeSelections).filter(
      f => f !== excludeField && this._activeSelections[f].size > 0
    );

    if (activeFields.length === 0) return this._rawData;

    return this._rawData.filter(row => {
      return activeFields.every(field => {
        const selected = this._activeSelections[field];
        const val = row[field];
        if (val === null || val === undefined) return false;
        return selected.has(String(val));
      });
    });
  }

  _sortValues(values: FacetValue[]): FacetValue[] {
    const sorted = [...values];
    switch (this.sort) {
      case 'count':
        sorted.sort((a, b) => b.count - a.count);
        break;
      case '-count':
        sorted.sort((a, b) => a.count - b.count);
        break;
      case 'alpha':
        sorted.sort((a, b) => a.value.localeCompare(b.value, 'fr'));
        break;
      case '-alpha':
        sorted.sort((a, b) => b.value.localeCompare(a.value, 'fr'));
        break;
      default:
        sorted.sort((a, b) => b.count - a.count);
    }
    return sorted;
  }

  // --- Filtering ---

  _applyFilters() {
    const activeFields = Object.keys(this._activeSelections).filter(
      f => this._activeSelections[f].size > 0
    );

    let filtered: Record<string, unknown>[];
    if (activeFields.length === 0) {
      filtered = this._rawData;
    } else {
      filtered = this._rawData.filter(row => {
        return activeFields.every(field => {
          const selected = this._activeSelections[field];
          const val = row[field];
          if (val === null || val === undefined) return false;
          return selected.has(String(val));
        });
      });
    }

    dispatchDataLoaded(this.id, filtered);
  }

  // --- Parsing helpers ---

  _parseLabels(): Map<string, string> {
    const map = new Map<string, string>();
    if (!this.labels) return map;

    const pairs = this.labels.split('|');
    for (const pair of pairs) {
      const colonIndex = pair.indexOf(':');
      if (colonIndex === -1) continue;
      const key = pair.substring(0, colonIndex).trim();
      const value = pair.substring(colonIndex + 1).trim();
      if (key) {
        map.set(key, value);
      }
    }
    return map;
  }

  /** Parse display attribute into per-field mode map */
  _parseDisplayModes(): Map<string, FacetDisplayMode> {
    const map = new Map<string, FacetDisplayMode>();
    if (!this.display) return map;

    const pairs = this.display.split('|');
    for (const pair of pairs) {
      const colonIndex = pair.indexOf(':');
      if (colonIndex === -1) continue;
      const key = pair.substring(0, colonIndex).trim();
      const value = pair.substring(colonIndex + 1).trim();
      if (key && (value === 'checkbox' || value === 'select' || value === 'multiselect')) {
        map.set(key, value);
      }
    }
    return map;
  }

  /** Get the display mode for a specific field */
  _getDisplayMode(field: string): FacetDisplayMode {
    return this._parseDisplayModes().get(field) ?? 'checkbox';
  }

  // --- User interaction ---

  private _toggleValue(field: string, value: string) {
    const selections = { ...this._activeSelections };
    const fieldSet = new Set(selections[field] ?? []);

    const displayMode = this._getDisplayMode(field);
    const disjunctiveFields = _parseCSV(this.disjunctive);
    // select = always exclusive, multiselect = always disjunctive, checkbox = check attribute
    const isDisjunctive = displayMode === 'multiselect'
      || (displayMode === 'checkbox' && disjunctiveFields.includes(field));

    if (fieldSet.has(value)) {
      fieldSet.delete(value);
    } else {
      if (!isDisjunctive) {
        fieldSet.clear();
      }
      fieldSet.add(value);
    }

    if (fieldSet.size === 0) {
      delete selections[field];
    } else {
      selections[field] = fieldSet;
    }

    this._activeSelections = selections;
    this._buildFacetGroups();
    this._applyFilters();
  }

  private _handleSelectChange(field: string, e: Event) {
    const select = e.target as HTMLSelectElement;
    const value = select.value;
    const selections = { ...this._activeSelections };

    if (!value) {
      delete selections[field];
    } else {
      selections[field] = new Set([value]);
    }

    this._activeSelections = selections;
    this._buildFacetGroups();
    this._applyFilters();
  }

  private _clearFieldSelections(field: string) {
    const selections = { ...this._activeSelections };
    delete selections[field];
    this._activeSelections = selections;
    this._buildFacetGroups();
    this._applyFilters();
  }

  private _toggleMultiselectDropdown(field: string) {
    this._openMultiselectField = this._openMultiselectField === field ? null : field;
  }

  private _onClickOutsideMultiselect = (e: MouseEvent) => {
    if (!this._openMultiselectField) return;
    const target = e.target as HTMLElement;
    const panel = this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);
    if (panel && !panel.contains(target)) {
      this._openMultiselectField = null;
    }
  };

  private _toggleExpand(field: string) {
    const expanded = new Set(this._expandedFacets);
    if (expanded.has(field)) {
      expanded.delete(field);
    } else {
      expanded.add(field);
    }
    this._expandedFacets = expanded;
  }

  private _handleSearch(field: string, e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchQueries = { ...this._searchQueries, [field]: input.value };
  }

  private _clearAll() {
    this._activeSelections = {};
    this._searchQueries = {};
    this._buildFacetGroups();
    this._applyFilters();
  }

  // --- Rendering ---

  render() {
    if (this._rawData.length === 0 || this._facetGroups.length === 0) {
      return nothing;
    }

    const hasActiveFilters = Object.keys(this._activeSelections).some(
      f => this._activeSelections[f].size > 0
    );

    return html`
      <style>
        .gouv-facets { margin-bottom: 1.5rem; }
        .gouv-facets__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .gouv-facets__groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
        .gouv-facets__group { min-width: 0; }
        .gouv-facets__legend { font-weight: 700; font-size: 0.875rem; margin-bottom: 0.5rem; display: block; }
        .gouv-facets__search { margin-bottom: 0.5rem; }
        .gouv-facets__search input { width: 100%; padding: 0.375rem 0.5rem; font-size: 0.8125rem; }
        .gouv-facets__values { list-style: none; padding: 0; margin: 0; }
        .gouv-facets__value { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; cursor: pointer; font-size: 0.875rem; }
        .gouv-facets__value:hover { background: var(--background-alt-grey, #f6f6f6); }
        .gouv-facets__value input[type="checkbox"] { flex-shrink: 0; }
        .gouv-facets__value-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .gouv-facets__value-count { flex-shrink: 0; font-size: 0.75rem; color: var(--text-mention-grey, #666); }
        .gouv-facets__more { background: none; border: none; color: var(--text-action-high-blue-france, #000091); cursor: pointer; font-size: 0.8125rem; padding: 0.25rem 0; margin-top: 0.25rem; }
        .gouv-facets__more:hover { text-decoration: underline; }
        .gouv-facets__multiselect { position: relative; }
        .gouv-facets__multiselect-trigger { width: 100%; display: flex; justify-content: space-between; align-items: center; text-align: left; font-weight: 400; }
        .gouv-facets__multiselect-panel { position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; background: var(--background-default-grey, #fff); border: 1px solid var(--border-default-grey, #ddd); border-radius: 0 0 0.25rem 0.25rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); max-height: 320px; overflow-y: auto; padding: 0.5rem; }
        .gouv-facets__multiselect-clear { width: 100%; text-align: left; margin-bottom: 0.5rem; }
        @media (max-width: 576px) { .gouv-facets__groups { grid-template-columns: 1fr; } }
      </style>
      <div class="gouv-facets">
        ${hasActiveFilters ? html`
          <div class="gouv-facets__header">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button" @click="${this._clearAll}">
              Reinitialiser les filtres
            </button>
          </div>
        ` : nothing}
        <div class="gouv-facets__groups">
          ${this._facetGroups.map(group => this._renderFacetGroup(group))}
        </div>
      </div>
    `;
  }

  private _renderFacetGroup(group: FacetGroup) {
    const mode = this._getDisplayMode(group.field);
    switch (mode) {
      case 'select':
        return this._renderSelectGroup(group);
      case 'multiselect':
        return this._renderMultiselectGroup(group);
      default:
        return this._renderCheckboxGroup(group);
    }
  }

  private _renderCheckboxGroup(group: FacetGroup) {
    const searchableFields = _parseCSV(this.searchable);
    const isSearchable = searchableFields.includes(group.field);
    const searchQuery = (this._searchQueries[group.field] ?? '').toLowerCase();
    const isExpanded = this._expandedFacets.has(group.field);
    const selected = this._activeSelections[group.field] ?? new Set();

    let displayValues = group.values;
    if (isSearchable && searchQuery) {
      displayValues = displayValues.filter(v => v.value.toLowerCase().includes(searchQuery));
    }

    const visibleValues = isExpanded ? displayValues : displayValues.slice(0, this.maxValues);
    const hasMore = displayValues.length > this.maxValues;
    const uid = `facet-${this.id}-${group.field}`;

    return html`
      <fieldset class="gouv-facets__group fr-fieldset" aria-labelledby="${uid}-legend">
        <legend class="gouv-facets__legend" id="${uid}-legend">${group.label}</legend>
        ${isSearchable ? html`
          <div class="gouv-facets__search">
            <input class="fr-input fr-input--sm" type="search"
              placeholder="Rechercher..."
              .value="${this._searchQueries[group.field] ?? ''}"
              @input="${(e: Event) => this._handleSearch(group.field, e)}"
              aria-label="Rechercher dans ${group.label}">
          </div>
        ` : nothing}
        <ul class="gouv-facets__values" role="group">
          ${visibleValues.map(fv => {
            const checkId = `${uid}-${fv.value.replace(/[^a-zA-Z0-9]/g, '_')}`;
            const isChecked = selected.has(fv.value);
            return html`
              <li class="gouv-facets__value">
                <input type="checkbox" id="${checkId}"
                  .checked="${isChecked}"
                  @change="${() => this._toggleValue(group.field, fv.value)}">
                <label class="gouv-facets__value-label" for="${checkId}">${fv.value}</label>
                <span class="gouv-facets__value-count">${fv.count}</span>
              </li>
            `;
          })}
        </ul>
        ${hasMore ? html`
          <button class="gouv-facets__more" type="button"
            @click="${() => this._toggleExpand(group.field)}">
            ${isExpanded ? 'Voir moins' : `Voir plus (${displayValues.length - this.maxValues})`}
          </button>
        ` : nothing}
      </fieldset>
    `;
  }

  private _renderSelectGroup(group: FacetGroup) {
    const uid = `facet-${this.id}-${group.field}`;
    const selected = this._activeSelections[group.field];
    const selectedValue = selected ? [...selected][0] ?? '' : '';

    return html`
      <div class="gouv-facets__group fr-select-group" data-field="${group.field}">
        <label class="fr-label" for="${uid}-select">${group.label}</label>
        <select class="fr-select" id="${uid}-select"
          @change="${(e: Event) => this._handleSelectChange(group.field, e)}">
          <option value="" ?selected="${!selectedValue}">Tous</option>
          ${group.values.map(fv => html`
            <option value="${fv.value}" ?selected="${fv.value === selectedValue}">
              ${fv.value} (${fv.count})
            </option>
          `)}
        </select>
      </div>
    `;
  }

  private _renderMultiselectGroup(group: FacetGroup) {
    const uid = `facet-${this.id}-${group.field}`;
    const selected = this._activeSelections[group.field] ?? new Set();
    const isOpen = this._openMultiselectField === group.field;
    const searchQuery = (this._searchQueries[group.field] ?? '').toLowerCase();

    let displayValues = group.values;
    if (searchQuery) {
      displayValues = displayValues.filter(v => v.value.toLowerCase().includes(searchQuery));
    }

    const triggerLabel = selected.size > 0
      ? `${selected.size} option${selected.size > 1 ? 's' : ''} selectionnee${selected.size > 1 ? 's' : ''}`
      : 'Selectionnez des options';

    return html`
      <div class="gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${group.field}"
           data-field="${group.field}">
        <label class="gouv-facets__legend" id="${uid}-legend">${group.label}</label>
        <button class="fr-btn fr-btn--secondary fr-btn--sm gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${isOpen}"
          aria-controls="${uid}-panel"
          @click="${(e: Event) => { e.stopPropagation(); this._toggleMultiselectDropdown(group.field); }}">
          ${triggerLabel}
          <span class="fr-icon-arrow-${isOpen ? 'up' : 'down'}-s-line" aria-hidden="true"></span>
        </button>
        ${isOpen ? html`
          <div class="gouv-facets__multiselect-panel" id="${uid}-panel"
               @click="${(e: Event) => e.stopPropagation()}">
            ${selected.size > 0 ? html`
              <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm gouv-facets__multiselect-clear"
                type="button"
                @click="${() => this._clearFieldSelections(group.field)}">
                Tout deselectionner
              </button>
            ` : nothing}
            <div class="gouv-facets__search">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[group.field] ?? ''}"
                @input="${(e: Event) => this._handleSearch(group.field, e)}"
                aria-label="Rechercher dans ${group.label}">
            </div>
            <ul class="gouv-facets__values" role="group">
              ${displayValues.map(fv => {
                const checkId = `${uid}-${fv.value.replace(/[^a-zA-Z0-9]/g, '_')}`;
                const isChecked = selected.has(fv.value);
                return html`
                  <li class="gouv-facets__value">
                    <input type="checkbox" id="${checkId}"
                      .checked="${isChecked}"
                      @change="${() => this._toggleValue(group.field, fv.value)}">
                    <label class="gouv-facets__value-label" for="${checkId}">${fv.value}</label>
                    <span class="gouv-facets__value-count">${fv.count}</span>
                  </li>
                `;
              })}
            </ul>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

/** Parse a comma-separated string into trimmed non-empty tokens */
export function _parseCSV(value: string): string[] {
  if (!value) return [];
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-facets': GouvFacets;
  }
}
