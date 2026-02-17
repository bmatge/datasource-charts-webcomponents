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
 * (gouv-source ou gouv-normalize) via le data-bridge.
 *
 * @example Source explicite
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
 */
@customElement('gouv-query')
export class GouvQuery extends LitElement {
  /**
   * ID de la source de donnees (gouv-source ou gouv-normalize)
   */
  @property({ type: String })
  source = '';

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

  // Pas de rendu - composant invisible
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  render() {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-query');
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
    const queryProps = ['source', 'where', 'filter', 'groupBy', 'aggregate',
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

    if (!this.source) {
      console.warn(`gouv-query[${this.id}]: attribut "source" requis`);
      return;
    }

    this._subscribeToSourceData(this.source);

    // Forward commands from downstream to upstream source
    this._setupCommandForwarding();
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
   */
  private _handleSourceData() {
    try {
      dispatchDataLoading(this.id);
      this._loading = true;
      this._processClientSide();
    } catch (error) {
      this._error = error as Error;
      dispatchDataError(this.id, this._error);
      console.error(`gouv-query[${this.id}]: Erreur de traitement`, error);
    } finally {
      this._loading = false;
    }
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

    if (!this.source) return;

    this._unsubscribeCommands = subscribeToSourceCommands(this.id, (cmd) => {
      dispatchSourceCommand(this.source, cmd);
    });
  }

  // --- Public API ---

  /**
   * Retourne le where effectif complet (statique + dynamique).
   * Delegue a la source amont si disponible.
   */
  getEffectiveWhere(excludeKey?: string): string {
    if (this.source) {
      const sourceEl = document.getElementById(this.source);
      if (sourceEl && 'getEffectiveWhere' in sourceEl) {
        return (sourceEl as any).getEffectiveWhere(excludeKey);
      }
    }
    return this.where || this.filter || '';
  }

  /**
   * Retourne l'adapter courant (delegue a la source amont)
   */
  public getAdapter(): any {
    if (this.source) {
      const sourceEl = document.getElementById(this.source);
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
    if (this.source) {
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
