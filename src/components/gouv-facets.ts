import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sendWidgetBeacon } from '../utils/beacon.js';
import {
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading,
  clearDataCache,
  subscribeToSource,
  getDataCache,
  dispatchSourceCommand
} from '../utils/data-bridge.js';
import type { ApiAdapter } from '../adapters/api-adapter.js';

type FacetDisplayMode = 'checkbox' | 'select' | 'multiselect' | 'radio';

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

  /** Active la lecture des parametres d'URL comme pre-selections de facettes */
  @property({ type: Boolean, attribute: 'url-params' })
  urlParams = false;

  /** Mapping URL param -> champ facette : "param:field | param2:field2". Si vide, correspondance directe */
  @property({ type: String, attribute: 'url-param-map' })
  urlParamMap = '';

  /** Synchronise l'URL quand l'utilisateur change les facettes (pushState) */
  @property({ type: Boolean, attribute: 'url-sync' })
  urlSync = false;

  /**
   * Active le mode facettes serveur ODS.
   * Fetch les valeurs de facettes depuis l'API ODS /facets au lieu de les calculer localement.
   * Requiert source pointant vers un gouv-query avec api-type="opendatasoft" et server-side.
   * En mode server-facets, l'attribut fields est obligatoire (pas d'auto-detection).
   */
  @property({ type: Boolean, attribute: 'server-facets' })
  serverFacets = false;

  /** Masquer les compteurs a cote de chaque valeur de facette */
  @property({ type: Boolean, attribute: 'hide-counts' })
  hideCounts = false;

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
  private _popstateHandler: (() => void) | null = null;
  private _urlParamsApplied = false;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-facets');
    this._initialize();
    document.addEventListener('click', this._onClickOutsideMultiselect);
    if (this.urlSync) {
      this._popstateHandler = () => {
        this._applyUrlParams();
        this._buildFacetGroups();
        this._applyFilters();
      };
      window.addEventListener('popstate', this._popstateHandler);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onClickOutsideMultiselect);
    if (this._popstateHandler) {
      window.removeEventListener('popstate', this._popstateHandler);
      this._popstateHandler = null;
    }
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

    if (changedProperties.has('serverFacets')) {
      this._initialize();
      return;
    }

    const facetAttrs = ['fields', 'labels', 'sort', 'hideEmpty', 'maxValues', 'disjunctive', 'searchable', 'display'];
    const hasFacetChange = facetAttrs.some(attr => changedProperties.has(attr));
    if (hasFacetChange && this._rawData.length > 0) {
      if (this.serverFacets) {
        this._fetchServerFacets();
      } else {
        this._buildFacetGroups();
        this._applyFilters();
      }
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
    if (this.urlParams && !this._urlParamsApplied) {
      this._applyUrlParams();
      this._urlParamsApplied = true;
      // In server mode, send initial URL-selected facets as command
      if (this.serverFacets && this._hasActiveSelections()) {
        this._dispatchFacetCommand();
        return; // command will trigger a new data load
      }
    }
    if (this.serverFacets) {
      this._fetchServerFacets();
      // Re-emit data as-is (no local filtering)
      if (this.id) dispatchDataLoaded(this.id, this._rawData);
    } else {
      this._buildFacetGroups();
      this._applyFilters();
    }
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

  // --- Server-facets ---

  /** Check if there are any active selections */
  private _hasActiveSelections(): boolean {
    return Object.keys(this._activeSelections).some(
      f => this._activeSelections[f].size > 0
    );
  }

  /** Fetch facet values from server API with cross-facet counts */
  private async _fetchServerFacets() {
    const sourceEl = document.getElementById(this.source);
    if (!sourceEl) return;

    // Get adapter from the source element (gouv-query)
    const adapter: ApiAdapter | undefined = (sourceEl as any).getAdapter?.();
    if (!adapter?.capabilities.serverFacets || !adapter.fetchFacets) {
      // Adapter does not support server facets — fallback to client-side
      this._buildFacetGroups();
      this._applyFilters();
      return;
    }

    const baseUrl = (sourceEl as any).baseUrl
      || sourceEl.getAttribute('base-url') || '';
    const datasetId = (sourceEl as any).datasetId
      || sourceEl.getAttribute('dataset-id') || '';
    if (!datasetId) return;

    const fields = _parseCSV(this.fields);
    if (fields.length === 0) return; // fields requis en mode server

    const labelMap = this._parseLabels();

    // Cross-facet: group fields by their effective where clause
    // Fields sharing the same where can be fetched in a single API call
    const whereToFields = new Map<string, string[]>();
    for (const field of fields) {
      const baseWhere = (sourceEl as any).getEffectiveWhere?.(this.id) || '';
      const otherFacetWhere = this._buildFacetWhereExcluding(field);
      const effectiveWhere = [baseWhere, otherFacetWhere].filter(Boolean).join(' AND ');
      if (!whereToFields.has(effectiveWhere)) whereToFields.set(effectiveWhere, []);
      whereToFields.get(effectiveWhere)!.push(field);
    }

    // Fetch each group via adapter
    const allGroups: FacetGroup[] = [];
    for (const [where, groupFields] of whereToFields) {
      try {
        const results = await adapter.fetchFacets(
          { baseUrl, datasetId },
          groupFields,
          where
        );
        for (const result of results) {
          allGroups.push({
            field: result.field,
            label: labelMap.get(result.field) ?? result.field,
            values: this._sortValues(result.values),
          });
        }
      } catch {
        // Ignore fetch errors — facets will simply not appear
      }
    }

    // Order groups to match the fields attribute order
    this._facetGroups = fields
      .map(f => allGroups.find(g => g.field === f))
      .filter((g): g is FacetGroup => !!g)
      .filter(g => !(this.hideEmpty && g.values.length <= 1));
  }

  /** Build ODSQL where clause for all active facet selections EXCEPT the given field */
  _buildFacetWhereExcluding(excludeField: string): string {
    const parts: string[] = [];
    for (const [field, values] of Object.entries(this._activeSelections)) {
      if (field === excludeField || values.size === 0) continue;
      if (values.size === 1) {
        const val = [...values][0].replace(/"/g, '\\"');
        parts.push(`${field} = "${val}"`);
      } else {
        const vals = [...values].map(v => `"${v.replace(/"/g, '\\"')}"`).join(', ');
        parts.push(`${field} IN (${vals})`);
      }
    }
    return parts.join(' AND ');
  }

  /** Build ODSQL where clause for ALL active facet selections */
  _buildFullFacetWhere(): string {
    return this._buildFacetWhereExcluding(''); // exclude nothing
  }

  /** Dispatch facet where command to upstream gouv-query */
  private _dispatchFacetCommand() {
    const facetWhere = this._buildFullFacetWhere();
    dispatchSourceCommand(this.source, { where: facetWhere, whereKey: this.id });
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
      if (key && (value === 'checkbox' || value === 'select' || value === 'multiselect' || value === 'radio')) {
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
    // select/radio = always exclusive, multiselect = always disjunctive, checkbox = check attribute
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
    this._afterSelectionChange();
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
    this._afterSelectionChange();
  }

  private _clearFieldSelections(field: string) {
    const selections = { ...this._activeSelections };
    delete selections[field];
    this._activeSelections = selections;
    this._afterSelectionChange();
  }

  private _selectAllValues(field: string) {
    const group = this._facetGroups.find(g => g.field === field);
    if (!group) return;
    const selections = { ...this._activeSelections };
    selections[field] = new Set(group.values.map(v => v.value));
    this._activeSelections = selections;
    this._afterSelectionChange();
  }

  private _toggleMultiselectDropdown(field: string) {
    if (this._openMultiselectField === field) {
      this._openMultiselectField = null;
    } else {
      this._openMultiselectField = field;
      this.updateComplete.then(() => {
        const panel = this.querySelector(`[data-multiselect="${field}"] .gouv-facets__multiselect-panel`);
        const firstFocusable = panel?.querySelector('button, input, select, [tabindex]') as HTMLElement;
        firstFocusable?.focus();
      });
    }
  }

  private _handleMultiselectKeydown(field: string, e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this._openMultiselectField = null;
      const trigger = this.querySelector(`[data-multiselect="${field}"] .gouv-facets__multiselect-trigger`) as HTMLElement;
      trigger?.focus();
    }
  }

  private _handleMultiselectFocusout(field: string) {
    if (this._openMultiselectField !== field) return;
    setTimeout(() => {
      const wrapper = this.querySelector(`[data-multiselect="${field}"]`);
      if (wrapper && !wrapper.contains(document.activeElement)) {
        this._openMultiselectField = null;
      }
    }, 0);
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
    this._afterSelectionChange();
  }

  /** Common logic after any selection change — routes to client or server mode */
  private _afterSelectionChange() {
    if (this.serverFacets) {
      this._dispatchFacetCommand();
    } else {
      this._buildFacetGroups();
      this._applyFilters();
    }
    if (this.urlSync) this._syncUrl();
  }

  // --- URL params ---

  /** Parse url-param-map attribute into a map of URL param name -> facet field name */
  _parseUrlParamMap(): Map<string, string> {
    const map = new Map<string, string>();
    if (!this.urlParamMap) return map;

    const pairs = this.urlParamMap.split('|');
    for (const pair of pairs) {
      const colonIndex = pair.indexOf(':');
      if (colonIndex === -1) continue;
      const paramName = pair.substring(0, colonIndex).trim();
      const fieldName = pair.substring(colonIndex + 1).trim();
      if (paramName && fieldName) {
        map.set(paramName, fieldName);
      }
    }
    return map;
  }

  /** Read URL search params and apply as facet pre-selections */
  _applyUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const paramMap = this._parseUrlParamMap();
    const selections: Record<string, Set<string>> = {};

    for (const [paramName, paramValue] of params.entries()) {
      // Determine the target field name
      const fieldName = paramMap.size > 0
        ? (paramMap.get(paramName) ?? null)
        : paramName;

      if (!fieldName) continue;

      // Support comma-separated values in a single param: ?region=IDF,PACA
      const values = paramValue.split(',').map(v => v.trim()).filter(Boolean);

      if (!selections[fieldName]) {
        selections[fieldName] = new Set();
      }
      for (const v of values) {
        selections[fieldName].add(v);
      }
    }

    if (Object.keys(selections).length > 0) {
      this._activeSelections = selections;
    }
  }

  /** Sync current facet selections back to URL (replaceState) */
  private _syncUrl() {
    const params = new URLSearchParams();
    const paramMap = this._parseUrlParamMap();
    // Build reverse map: field -> URL param name
    const reverseMap = new Map<string, string>();
    for (const [paramName, fieldName] of paramMap) {
      reverseMap.set(fieldName, paramName);
    }

    for (const [field, values] of Object.entries(this._activeSelections)) {
      if (values.size === 0) continue;
      const paramName = reverseMap.get(field) ?? field;
      params.set(paramName, [...values].join(','));
    }

    const search = params.toString();
    const newUrl = search
      ? `${window.location.pathname}?${search}${window.location.hash}`
      : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, '', newUrl);
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
        .gouv-facets__count { font-weight: 400; font-size: 0.75rem; color: var(--text-mention-grey, #666); margin-left: 0.25rem; }
        .gouv-facets__multiselect { position: relative; }
        .gouv-facets__multiselect-trigger { width: 100%; text-align: left; cursor: pointer; appearance: none; }
        .gouv-facets__multiselect-trigger[aria-expanded="true"]::after { transform: rotate(180deg); }
        .gouv-facets__multiselect-panel { position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; background: var(--background-default-grey, #fff); border: 1px solid var(--border-default-grey, #ddd); border-radius: 0 0 0.25rem 0.25rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); max-height: 320px; overflow-y: auto; padding: 0.75rem; }
        .gouv-facets__multiselect-panel .fr-search-bar { margin-bottom: 0.75rem; }
        .gouv-facets__dropdown-fieldset { margin: 0; padding: 0; border: none; }
        .gouv-facets__dropdown-fieldset .fr-fieldset__element { padding: 0; }
        .gouv-facets__multiselect-toggle { width: 100%; margin-bottom: 0.75rem; }
        @media (max-width: 576px) { .gouv-facets__groups { grid-template-columns: 1fr; } }
      </style>
      <div class="gouv-facets">
        ${hasActiveFilters ? html`
          <div class="gouv-facets__header">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line" type="button" @click="${this._clearAll}">
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
      case 'radio':
        return this._renderRadioGroup(group);
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
      <fieldset class="fr-fieldset gouv-facets__group" aria-labelledby="${uid}-legend">
        <legend class="fr-fieldset__legend fr-text--bold" id="${uid}-legend">${group.label}</legend>
        ${isSearchable ? html`
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[group.field] ?? ''}"
                @input="${(e: Event) => this._handleSearch(group.field, e)}"
                aria-label="Rechercher dans ${group.label}">
            </div>
          </div>
        ` : nothing}
        ${visibleValues.map(fv => {
          const checkId = `${uid}-${fv.value.replace(/[^a-zA-Z0-9]/g, '_')}`;
          const isChecked = selected.has(fv.value);
          return html`
            <div class="fr-fieldset__element">
              <div class="fr-checkbox-group fr-checkbox-group--sm">
                <input type="checkbox" id="${checkId}"
                  .checked="${isChecked}"
                  @change="${() => this._toggleValue(group.field, fv.value)}">
                <label class="fr-label" for="${checkId}">
                  ${fv.value}${this.hideCounts ? nothing : html` <span class="gouv-facets__count">${fv.count}</span>`}
                </label>
              </div>
            </div>
          `;
        })}
        ${hasMore ? html`
          <div class="fr-fieldset__element">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button"
              @click="${() => this._toggleExpand(group.field)}">
              ${isExpanded ? 'Voir moins' : `Voir plus (${displayValues.length - this.maxValues})`}
            </button>
          </div>
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
              ${this.hideCounts ? fv.value : `${fv.value} (${fv.count})`}
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
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${group.field}"
           data-field="${group.field}"
           @keydown="${(e: KeyboardEvent) => this._handleMultiselectKeydown(group.field, e)}"
           @focusout="${() => this._handleMultiselectFocusout(group.field)}">
        <label class="fr-label" id="${uid}-legend">${group.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${isOpen}"
          aria-controls="${uid}-panel"
          aria-labelledby="${uid}-legend"
          aria-haspopup="dialog"
          @click="${(e: Event) => { e.stopPropagation(); this._toggleMultiselectDropdown(group.field); }}">
          ${triggerLabel}
        </button>
        ${isOpen ? html`
          <div class="gouv-facets__multiselect-panel" id="${uid}-panel"
               role="dialog" aria-label="${group.label}"
               @click="${(e: Event) => e.stopPropagation()}">
            <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left ${selected.size > 0 ? 'fr-icon-close-circle-line' : 'fr-icon-check-line'} gouv-facets__multiselect-toggle"
              type="button"
              @click="${() => selected.size > 0 ? this._clearFieldSelections(group.field) : this._selectAllValues(group.field)}">
              ${selected.size > 0 ? 'Tout deselectionner' : 'Tout selectionner'}
            </button>
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${uid}-search">Rechercher dans ${group.label}</label>
              <input class="fr-input" type="search" id="${uid}-search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[group.field] ?? ''}"
                @input="${(e: Event) => this._handleSearch(group.field, e)}">
              <button class="fr-btn" type="button" title="Rechercher" aria-label="Rechercher">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${group.label}">
              ${displayValues.map(fv => {
                const checkId = `${uid}-${fv.value.replace(/[^a-zA-Z0-9]/g, '_')}`;
                const isChecked = selected.has(fv.value);
                return html`
                  <div class="fr-fieldset__element">
                    <div class="fr-checkbox-group fr-checkbox-group--sm">
                      <input type="checkbox" id="${checkId}"
                        .checked="${isChecked}"
                        @change="${() => this._toggleValue(group.field, fv.value)}">
                      <label class="fr-label" for="${checkId}">
                        ${fv.value}${this.hideCounts ? nothing : html` <span class="gouv-facets__count">${fv.count}</span>`}
                      </label>
                    </div>
                  </div>
                `;
              })}
            </fieldset>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderRadioGroup(group: FacetGroup) {
    const uid = `facet-${this.id}-${group.field}`;
    const selected = this._activeSelections[group.field] ?? new Set();
    const isOpen = this._openMultiselectField === group.field;
    const searchQuery = (this._searchQueries[group.field] ?? '').toLowerCase();

    let displayValues = group.values;
    if (searchQuery) {
      displayValues = displayValues.filter(v => v.value.toLowerCase().includes(searchQuery));
    }

    const selectedValue = selected.size > 0 ? [...selected][0] : null;
    const triggerLabel = selectedValue ?? 'Selectionnez une option';

    return html`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${group.field}"
           data-field="${group.field}"
           @keydown="${(e: KeyboardEvent) => this._handleMultiselectKeydown(group.field, e)}"
           @focusout="${() => this._handleMultiselectFocusout(group.field)}">
        <label class="fr-label" id="${uid}-legend">${group.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${isOpen}"
          aria-controls="${uid}-panel"
          aria-labelledby="${uid}-legend"
          aria-haspopup="dialog"
          @click="${(e: Event) => { e.stopPropagation(); this._toggleMultiselectDropdown(group.field); }}">
          ${triggerLabel}
        </button>
        ${isOpen ? html`
          <div class="gouv-facets__multiselect-panel" id="${uid}-panel"
               role="dialog" aria-label="${group.label}"
               @click="${(e: Event) => e.stopPropagation()}">
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${uid}-search">Rechercher dans ${group.label}</label>
              <input class="fr-input" type="search" id="${uid}-search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[group.field] ?? ''}"
                @input="${(e: Event) => this._handleSearch(group.field, e)}">
              <button class="fr-btn" type="button" title="Rechercher" aria-label="Rechercher">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${group.label}">
              ${displayValues.map(fv => {
                const radioId = `${uid}-${fv.value.replace(/[^a-zA-Z0-9]/g, '_')}`;
                const isChecked = selected.has(fv.value);
                return html`
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-group--sm">
                      <input type="radio" id="${radioId}" name="${uid}-radio"
                        .checked="${isChecked}"
                        @change="${() => this._toggleValue(group.field, fv.value)}">
                      <label class="fr-label" for="${radioId}">
                        ${fv.value}${this.hideCounts ? nothing : html` <span class="gouv-facets__count">${fv.count}</span>`}
                      </label>
                    </div>
                  </div>
                `;
              })}
            </fieldset>
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
