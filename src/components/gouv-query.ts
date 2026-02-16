import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getByPath, setByPath } from '../utils/json-path.js';
import { sendWidgetBeacon } from '../utils/beacon.js';
import {
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading,
  dispatchSourceCommand,
  clearDataCache,
  clearDataMeta,
  subscribeToSource,
  getDataCache,
  subscribeToSourceCommands
} from '../utils/data-bridge.js';

/** @deprecated Use ProviderId from @gouv-widgets/shared instead */
type ApiType = string;

/**
 * Operateurs de filtre supportes
 */
export type FilterOperator =
  | 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte'
  | 'contains' | 'notcontains' | 'in' | 'notin'
  | 'isnull' | 'isnotnull';

/**
 * Fonctions d'agregation supportees
 */
export type AggregateFunction = 'count' | 'sum' | 'avg' | 'min' | 'max';

/**
 * Structure d'un filtre
 */
export interface QueryFilter {
  field: string;
  operator: FilterOperator;
  value?: string | number | boolean | (string | number)[];
}

/**
 * Structure d'une agregation
 */
export interface QueryAggregate {
  field: string;
  function: AggregateFunction;
  alias?: string;
}

/**
 * Structure du tri
 */
export interface QuerySort {
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * <gouv-query> - Composant de transformation de donnees
 *
 * Transforme, filtre, agrege et trie des donnees provenant d'une source
 * (gouv-source ou gouv-normalize).
 *
 * Ne fait aucun fetch HTTP : les donnees sont recues d'un composant amont
 * via le data-bridge. Si api-type est defini sans source, un gouv-source
 * interne est cree automatiquement (mode deprecie — backward compat).
 *
 * @example Source explicite (recommande)
 * <gouv-source id="src" api-type="opendatasoft"
 *   base-url="https://data.opendatasoft.com" dataset-id="communes-france"
 *   select="sum(population) as total_pop, region" group-by="region">
 * </gouv-source>
 * <gouv-query id="stats" source="src"
 *   order-by="total_pop:desc" limit="10">
 * </gouv-query>
 *
 * @example Client-side (donnees d'une source existante)
 * <gouv-query
 *   id="stats"
 *   source="raw-data"
 *   group-by="region"
 *   aggregate="population:sum, count:count"
 *   order-by="population__sum:desc"
 *   limit="10">
 * </gouv-query>
 *
 * @example Backward compat (deprecie — preferez source explicite)
 * <gouv-query
 *   id="ods-stats"
 *   api-type="opendatasoft"
 *   dataset-id="communes-france"
 *   base-url="https://data.opendatasoft.com"
 *   select="sum(population) as total_pop, region"
 *   group-by="region"
 *   order-by="total_pop:desc"
 *   limit="20">
 * </gouv-query>
 */
@customElement('gouv-query')
export class GouvQuery extends LitElement {
  /**
   * Type d'API : generic (client-side), opendatasoft, tabular, grist
   */
  @property({ type: String, attribute: 'api-type' })
  apiType: ApiType = 'generic';

  /**
   * ID de la source de donnees (pour mode generic)
   */
  @property({ type: String })
  source = '';

  /**
   * URL de base de l'API (pour opendatasoft/tabular)
   */
  @property({ type: String, attribute: 'base-url' })
  baseUrl = '';

  /**
   * ID du dataset (pour opendatasoft/tabular)
   */
  @property({ type: String, attribute: 'dataset-id' })
  datasetId = '';

  /**
   * ID de la ressource (pour tabular)
   */
  @property({ type: String })
  resource = '';

  /**
   * Clause SELECT avec agregations (syntaxe ODSQL pour opendatasoft)
   * Ex: "sum(population) as total, region"
   */
  @property({ type: String })
  select = '';

  /**
   * Clause WHERE / Filtres
   * - opendatasoft: syntaxe ODSQL "population > 5000 AND status = 'active'"
   * - tabular/generic: "field:operator:value, field2:operator:value2"
   */
  @property({ type: String })
  where = '';

  /**
   * Alias pour where (compatibilite)
   */
  @property({ type: String })
  filter = '';

  /**
   * Champs de regroupement (separes par virgule)
   */
  @property({ type: String, attribute: 'group-by' })
  groupBy = '';

  /**
   * Agregations pour mode generic/tabular
   * Format: "field:function, field2:function"
   * Ex: "population:sum, count:count"
   */
  @property({ type: String })
  aggregate = '';

  /**
   * Tri des resultats
   * Format: "field:direction" ou "field__function:direction"
   * Ex: "total_pop:desc" ou "population__sum:desc"
   */
  @property({ type: String, attribute: 'order-by' })
  orderBy = '';

  /**
   * Limite de resultats
   */
  @property({ type: Number })
  limit = 0;

  /**
   * Chemin vers les donnees dans la reponse API
   */
  @property({ type: String })
  transform = '';

  /**
   * Active le mode server-side pilotable.
   * En mode server-side, la source amont ne fetche qu'UNE page a la fois
   * et ecoute les commandes (page, where, orderBy) des composants en aval.
   */
  @property({ type: Boolean, attribute: 'server-side' })
  serverSide = false;

  /**
   * Taille de page pour le mode server-side (nombre de records par page)
   */
  @property({ type: Number, attribute: 'page-size' })
  pageSize = 20;

  /**
   * Headers HTTP en JSON (pour APIs privees/authentifiees)
   * Ex: '{"apikey":"abc123"}' ou '{"Authorization":"Bearer token"}'
   * Passe au gouv-source interne en mode compat (ignore en mode generic)
   */
  @property({ type: String })
  headers = '';

  /**
   * Intervalle de rafraichissement en secondes
   */
  @property({ type: Number })
  refresh = 0;

  @state()
  private _loading = false;

  @state()
  private _error: Error | null = null;

  @state()
  private _data: unknown[] = [];

  @state()
  private _rawData: unknown[] = [];

  private _refreshInterval: number | null = null;
  private _unsubscribe: (() => void) | null = null;
  private _unsubscribeCommands: (() => void) | null = null;

  /** Shadow gouv-source element for backward compatibility */
  private _shadowSource: HTMLElement | null = null;
  private _shadowSourceId = '';

  // Pas de rendu - composant invisible
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  render() {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-query', this.apiType);
    this._initialize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanup();
    if (this.id) {
      clearDataCache(this.id);
      clearDataMeta(this.id);
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    const queryProps = ['source', 'apiType', 'baseUrl', 'datasetId', 'resource',
                        'select', 'where', 'filter', 'groupBy', 'aggregate',
                        'orderBy', 'limit', 'transform', 'serverSide', 'pageSize'];

    if (queryProps.some(prop => changedProperties.has(prop))) {
      this._initialize();
    }

    if (changedProperties.has('refresh')) {
      this._setupRefresh();
    }
  }

  private _cleanup() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
      this._refreshInterval = null;
    }
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    if (this._unsubscribeCommands) {
      this._unsubscribeCommands();
      this._unsubscribeCommands = null;
    }
    this._destroyShadowSource();
  }

  private _setupRefresh() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
      this._refreshInterval = null;
    }

    if (this.refresh > 0) {
      this._refreshInterval = window.setInterval(() => {
        this._initialize();
      }, this.refresh * 1000);
    }
  }

  private _initialize() {
    if (!this.id) {
      console.warn('gouv-query: attribut "id" requis pour identifier la requete');
      return;
    }

    // Unsubscribe from previous source
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    if (this._unsubscribeCommands) {
      this._unsubscribeCommands();
      this._unsubscribeCommands = null;
    }

    if (this.apiType !== 'generic' && !this.source) {
      // Backward compat: create shadow gouv-source
      console.warn(
        `gouv-query[${this.id}]: <gouv-query api-type="${this.apiType}"> sans source est deprecie. ` +
        `Utilisez <gouv-source api-type="${this.apiType}" ...> + <gouv-query source="...">.`
      );
      this._createShadowSource();
      this._subscribeToSourceData(this._shadowSourceId);
    } else if (this.source) {
      // Normal mode: subscribe to existing source
      this._destroyShadowSource();
      this._subscribeToSourceData(this.source);
    } else {
      console.warn('gouv-query: attribut "source" requis en mode generic');
      return;
    }

    // Forward commands from downstream to upstream source
    this._setupCommandForwarding();
  }

  // --- Shadow source management (backward compat) ---

  private _createShadowSource() {
    this._destroyShadowSource();

    this._shadowSourceId = `__gq_${this.id}_src`;

    const el = document.createElement('gouv-source');
    el.id = this._shadowSourceId;
    el.setAttribute('api-type', this.apiType);
    el.style.display = 'none';

    if (this.baseUrl) el.setAttribute('base-url', this.baseUrl);
    if (this.datasetId) el.setAttribute('dataset-id', this.datasetId);
    if (this.resource) el.setAttribute('resource', this.resource);
    if (this.select) el.setAttribute('select', this.select);
    if (this.where || this.filter) el.setAttribute('where', this.where || this.filter);
    if (this.groupBy) el.setAttribute('group-by', this.groupBy);
    if (this.aggregate) el.setAttribute('aggregate', this.aggregate);
    if (this.orderBy) el.setAttribute('order-by', this.orderBy);
    if (this.limit > 0) el.setAttribute('limit', String(this.limit));
    if (this.serverSide) el.setAttribute('server-side', '');
    if (this.pageSize !== 20) el.setAttribute('page-size', String(this.pageSize));
    if (this.headers) el.setAttribute('headers', this.headers);

    // Insert as sibling before gouv-query
    if (this.parentElement) {
      this.parentElement.insertBefore(el, this);
    } else {
      document.body.appendChild(el);
    }

    this._shadowSource = el;
  }

  private _destroyShadowSource() {
    if (this._shadowSource) {
      if (this._shadowSourceId) {
        clearDataCache(this._shadowSourceId);
        clearDataMeta(this._shadowSourceId);
      }
      this._shadowSource.remove();
      this._shadowSource = null;
      this._shadowSourceId = '';
    }
  }

  // --- Source subscription ---

  private _subscribeToSourceData(sourceId: string) {
    // Check cache first (avoids race condition if source already emitted)
    const cachedData = getDataCache(sourceId);
    if (cachedData !== undefined) {
      this._rawData = Array.isArray(cachedData) ? cachedData : [cachedData];
      this._handleSourceData();
    }

    this._unsubscribe = subscribeToSource(sourceId, {
      onLoaded: (data: unknown) => {
        this._rawData = Array.isArray(data) ? data : [data];
        this._handleSourceData();
      },
      onLoading: () => {
        this._loading = true;
        dispatchDataLoading(this.id);
      },
      onError: (error: Error) => {
        this._error = error;
        this._loading = false;
        dispatchDataError(this.id, error);
      }
    });
  }

  /**
   * Handle data received from upstream source.
   * In compat mode (shadow source), checks adapter capabilities to decide
   * whether client-side processing is needed.
   */
  private _handleSourceData() {
    try {
      dispatchDataLoading(this.id);
      this._loading = true;

      if (this._shadowSource && this._serverHandlesGroupBy()) {
        // Compat mode with server-side group-by (ODS): data is already processed.
        // Only apply safe post-processing (sort is idempotent, limit is safe).
        let result = [...this._rawData] as Record<string, unknown>[];
        if (this.orderBy) result = this._applySort(result);
        if (this.limit > 0) result = result.slice(0, this.limit);
        this._data = result;
        dispatchDataLoaded(this.id, this._data);
      } else {
        // Normal mode or compat without server group-by: full client-side processing
        this._processClientSide();
      }
    } catch (error) {
      this._error = error as Error;
      dispatchDataError(this.id, this._error);
      console.error(`gouv-query[${this.id}]: Erreur de traitement`, error);
    } finally {
      this._loading = false;
    }
  }

  /**
   * Check if the shadow source's adapter handles group-by server-side.
   * Used to avoid double-processing in backward compat mode.
   */
  private _serverHandlesGroupBy(): boolean {
    if (!this.groupBy) return false;
    const adapter = (this._shadowSource as any)?.getAdapter?.();
    return adapter?.capabilities?.serverGroupBy === true;
  }

  // --- Client-side processing ---

  /**
   * Traitement cote client des donnees
   */
  private _processClientSide() {
    let result = [...this._rawData] as Record<string, unknown>[];

    // 1. Appliquer les filtres
    const filterExpr = this.filter || this.where;
    if (filterExpr) {
      result = this._applyFilters(result, filterExpr);
    }

    // 2. Appliquer le groupement et les agregations
    if (this.groupBy) {
      result = this._applyGroupByAndAggregate(result);
    }

    // 3. Appliquer le tri
    if (this.orderBy) {
      result = this._applySort(result);
    }

    // 4. Appliquer la limite
    if (this.limit > 0) {
      result = result.slice(0, this.limit);
    }

    this._data = result;
    dispatchDataLoaded(this.id, this._data);
  }

  /**
   * Parse et applique les filtres (format: "field:operator:value")
   */
  private _applyFilters(data: Record<string, unknown>[], filterExpr: string): Record<string, unknown>[] {
    const filters = this._parseFilters(filterExpr);

    return data.filter(item => {
      return filters.every(filter => this._matchesFilter(item, filter));
    });
  }

  private _parseFilters(filterExpr: string): QueryFilter[] {
    const filters: QueryFilter[] = [];
    const parts = filterExpr.split(',').map(p => p.trim()).filter(Boolean);

    for (const part of parts) {
      const segments = part.split(':');
      if (segments.length >= 2) {
        const field = segments[0];
        const operator = segments[1] as FilterOperator;
        let value: string | number | boolean | (string | number)[] | undefined;

        if (segments.length > 2) {
          const rawValue = segments.slice(2).join(':');

          // Parse la valeur
          if (operator === 'in' || operator === 'notin') {
            value = rawValue.split('|').map(v => {
              const parsed = this._parseValue(v);
              // Pour in/notin, on ne garde que string/number
              return typeof parsed === 'boolean' ? String(parsed) : parsed;
            }) as (string | number)[];
          } else {
            value = this._parseValue(rawValue);
          }
        }

        filters.push({ field, operator, value });
      }
    }

    return filters;
  }

  private _parseValue(val: string): string | number | boolean {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (!isNaN(Number(val)) && val !== '') return Number(val);
    return val;
  }

  private _matchesFilter(item: Record<string, unknown>, filter: QueryFilter): boolean {
    const value = getByPath(item, filter.field);

    switch (filter.operator) {
      case 'eq':
        // eslint-disable-next-line eqeqeq
        return value == filter.value;
      case 'neq':
        // eslint-disable-next-line eqeqeq
        return value != filter.value;
      case 'gt':
        return Number(value) > Number(filter.value);
      case 'gte':
        return Number(value) >= Number(filter.value);
      case 'lt':
        return Number(value) < Number(filter.value);
      case 'lte':
        return Number(value) <= Number(filter.value);
      case 'contains':
        return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
      case 'notcontains':
        return !String(value).toLowerCase().includes(String(filter.value).toLowerCase());
      case 'in':
        return Array.isArray(filter.value) && filter.value.includes(value as string | number);
      case 'notin':
        return Array.isArray(filter.value) && !filter.value.includes(value as string | number);
      case 'isnull':
        return value === null || value === undefined;
      case 'isnotnull':
        return value !== null && value !== undefined;
      default:
        return true;
    }
  }

  /**
   * Applique le GROUP BY et les agregations
   */
  private _applyGroupByAndAggregate(data: Record<string, unknown>[]): Record<string, unknown>[] {
    const groupFields = this.groupBy.split(',').map(f => f.trim()).filter(Boolean);
    const aggregates = this._parseAggregates(this.aggregate);

    // Creer les groupes
    const groups = new Map<string, Record<string, unknown>[]>();

    for (const item of data) {
      const key = groupFields.map(f => String(getByPath(item, f) ?? '')).join('|||');
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(item);
    }

    // Calculer les agregations pour chaque groupe
    const result: Record<string, unknown>[] = [];

    for (const [key, items] of groups) {
      const row: Record<string, unknown> = {};

      // Ajouter les champs de regroupement (structure imbriquee preservee)
      const keyParts = key.split('|||');
      groupFields.forEach((field, i) => {
        setByPath(row, field, keyParts[i]);
      });

      // Calculer les agregations (structure imbriquee preservee)
      for (const agg of aggregates) {
        const fieldName = agg.alias || `${agg.field}__${agg.function}`;
        setByPath(row, fieldName, this._computeAggregate(items, agg));
      }

      result.push(row);
    }

    return result;
  }

  _parseAggregates(aggExpr: string): QueryAggregate[] {
    if (!aggExpr) return [];

    const aggregates: QueryAggregate[] = [];
    const parts = aggExpr.split(',').map(p => p.trim()).filter(Boolean);

    for (const part of parts) {
      // Format: "field:function" ou "field:function:alias"
      const segments = part.split(':');
      if (segments.length >= 2) {
        aggregates.push({
          field: segments[0],
          function: segments[1] as AggregateFunction,
          alias: segments[2]
        });
      }
    }

    return aggregates;
  }

  private _computeAggregate(items: Record<string, unknown>[], agg: QueryAggregate): number {
    const values = items
      .map(item => Number(getByPath(item, agg.field)))
      .filter(v => !isNaN(v));

    switch (agg.function) {
      case 'count':
        return items.length;
      case 'sum':
        return values.reduce((a, b) => a + b, 0);
      case 'avg':
        return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      case 'min':
        return values.length > 0 ? Math.min(...values) : 0;
      case 'max':
        return values.length > 0 ? Math.max(...values) : 0;
      default:
        return 0;
    }
  }

  /**
   * Applique le tri
   */
  private _applySort(data: Record<string, unknown>[]): Record<string, unknown>[] {
    const sortParts = this.orderBy.split(':');
    if (sortParts.length < 1) return data;

    const field = sortParts[0];
    const direction = (sortParts[1] || 'asc').toLowerCase();

    return [...data].sort((a, b) => {
      const valA = getByPath(a, field);
      const valB = getByPath(b, field);

      // Comparaison numerique si possible
      const numA = Number(valA);
      const numB = Number(valB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return direction === 'desc' ? numB - numA : numA - numB;
      }

      // Comparaison string
      const strA = String(valA ?? '');
      const strB = String(valB ?? '');
      return direction === 'desc'
        ? strB.localeCompare(strA)
        : strA.localeCompare(strB);
    });
  }

  // --- Command forwarding ---

  /**
   * Forward commands from downstream components to the upstream source.
   * In server-side mode, datalist/search/facets send commands to this query;
   * we forward them to the actual gouv-source.
   */
  private _setupCommandForwarding() {
    if (this._unsubscribeCommands) {
      this._unsubscribeCommands();
      this._unsubscribeCommands = null;
    }

    if (!this.id || !this.serverSide) return;

    const upstreamId = this._shadowSourceId || this.source;
    if (!upstreamId) return;

    this._unsubscribeCommands = subscribeToSourceCommands(this.id, (cmd) => {
      dispatchSourceCommand(upstreamId, cmd);
    });
  }

  // --- Public API ---

  /**
   * Retourne le where effectif complet (statique + dynamique).
   * Delegue a la source amont si disponible.
   */
  getEffectiveWhere(excludeKey?: string): string {
    const sourceId = this._shadowSourceId || this.source;
    if (sourceId) {
      const sourceEl = document.getElementById(sourceId);
      if (sourceEl && 'getEffectiveWhere' in sourceEl) {
        return (sourceEl as any).getEffectiveWhere(excludeKey);
      }
    }
    // Fallback: return static where
    return this.where || this.filter || '';
  }

  /**
   * Retourne l'adapter courant (delegue a la source amont)
   */
  public getAdapter(): any {
    const sourceId = this._shadowSourceId || this.source;
    if (sourceId) {
      const sourceEl = document.getElementById(sourceId);
      if (sourceEl && 'getAdapter' in sourceEl) {
        return (sourceEl as any).getAdapter();
      }
    }
    return null;
  }

  /**
   * Force le rechargement des donnees
   */
  public reload() {
    if (this._shadowSource) {
      (this._shadowSource as any).reload?.();
    } else if (this.source) {
      const cachedData = getDataCache(this.source);
      if (cachedData !== undefined) {
        this._rawData = Array.isArray(cachedData) ? cachedData : [cachedData];
        this._handleSourceData();
      }
    }
  }

  /**
   * Retourne les donnees actuelles
   */
  public getData(): unknown[] {
    return this._data;
  }

  /**
   * Retourne l'etat de chargement
   */
  public isLoading(): boolean {
    return this._loading;
  }

  /**
   * Retourne l'erreur eventuelle
   */
  public getError(): Error | null {
    return this._error;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-query': GouvQuery;
  }
}
