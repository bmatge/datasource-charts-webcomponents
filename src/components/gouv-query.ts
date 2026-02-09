import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getByPath } from '../utils/json-path.js';
import { sendWidgetBeacon } from '../utils/beacon.js';
import {
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading,
  clearDataCache,
  subscribeToSource,
  getDataCache
} from '../utils/data-bridge.js';

/** ODS API maximum records per request */
const ODS_PAGE_SIZE = 100;

/** Maximum pages to fetch for ODS pagination (safety limit) */
const ODS_MAX_PAGES = 10;

/**
 * Types d'API supportés
 */
export type ApiType = 'generic' | 'opendatasoft' | 'tabular';

/**
 * Opérateurs de filtre supportés
 */
export type FilterOperator =
  | 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte'
  | 'contains' | 'notcontains' | 'in' | 'notin'
  | 'isnull' | 'isnotnull';

/**
 * Fonctions d'agrégation supportées
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
 * Structure d'une agrégation
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
 * <gouv-query> - Composant de requête avancée
 *
 * Permet de transformer, filtrer, agréger et trier des données
 * provenant d'une source existante ou directement depuis une API
 * (OpenDataSoft, Tabular API data.gouv.fr).
 *
 * @example Client-side (données d'une source existante)
 * <gouv-query
 *   id="stats"
 *   source="raw-data"
 *   group-by="region"
 *   aggregate="population:sum, count:count"
 *   order-by="population__sum:desc"
 *   limit="10">
 * </gouv-query>
 *
 * @example OpenDataSoft API (requête serveur)
 * <gouv-query
 *   id="ods-stats"
 *   api-type="opendatasoft"
 *   dataset="communes-france"
 *   base-url="https://data.opendatasoft.com"
 *   select="sum(population) as total_pop, region"
 *   where="population > 5000"
 *   group-by="region"
 *   order-by="total_pop:desc"
 *   limit="20">
 * </gouv-query>
 *
 * @example Tabular API (requête serveur)
 * <gouv-query
 *   id="tabular-stats"
 *   api-type="tabular"
 *   dataset="dataset-id"
 *   resource="resource-id"
 *   group-by="departement"
 *   aggregate="population:sum"
 *   filter="annee:eq:2024"
 *   order-by="population__sum:desc">
 * </gouv-query>
 */
@customElement('gouv-query')
export class GouvQuery extends LitElement {
  /**
   * Type d'API : generic (client-side), opendatasoft, tabular
   */
  @property({ type: String, attribute: 'api-type' })
  apiType: ApiType = 'generic';

  /**
   * ID de la source de données (pour mode generic)
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
   * Clause SELECT avec agrégations (syntaxe ODSQL pour opendatasoft)
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
   * Alias pour where (compatibilité)
   */
  @property({ type: String })
  filter = '';

  /**
   * Champs de regroupement (séparés par virgule)
   */
  @property({ type: String, attribute: 'group-by' })
  groupBy = '';

  /**
   * Agrégations pour mode generic/tabular
   * Format: "field:function, field2:function"
   * Ex: "population:sum, count:count"
   */
  @property({ type: String })
  aggregate = '';

  /**
   * Tri des résultats
   * Format: "field:direction" ou "field__function:direction"
   * Ex: "total_pop:desc" ou "population__sum:desc"
   */
  @property({ type: String, attribute: 'order-by' })
  orderBy = '';

  /**
   * Limite de résultats
   */
  @property({ type: Number })
  limit = 0;

  /**
   * Chemin vers les données dans la réponse API
   */
  @property({ type: String })
  transform = '';

  /**
   * Intervalle de rafraîchissement en secondes
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
  private _abortController: AbortController | null = null;
  private _unsubscribe: (() => void) | null = null;

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
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    const queryProps = ['source', 'apiType', 'baseUrl', 'dataset', 'resource',
                        'select', 'where', 'filter', 'groupBy', 'aggregate',
                        'orderBy', 'limit', 'transform'];

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
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
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
      console.warn('gouv-query: attribut "id" requis pour identifier la requête');
      return;
    }

    if (this.apiType === 'generic') {
      // Mode client-side: s'abonner à une source existante
      this._subscribeToSource();
    } else {
      // Mode server-side: faire une requête API
      this._fetchFromApi();
    }
  }

  /**
   * Mode generic: s'abonne à une source et traite les données côté client
   */
  private _subscribeToSource() {
    if (!this.source) {
      console.warn('gouv-query: attribut "source" requis en mode generic');
      return;
    }

    // Se désabonner de l'ancienne source
    if (this._unsubscribe) {
      this._unsubscribe();
    }

    // Vérifier le cache avant de s'abonner (évite une race condition
    // si la source a déjà émis ses données avant l'abonnement)
    const cachedData = getDataCache(this.source);
    if (cachedData !== undefined) {
      this._rawData = Array.isArray(cachedData) ? cachedData : [cachedData];
      this._processClientSide();
    }

    // S'abonner à la nouvelle source
    this._unsubscribe = subscribeToSource(this.source, {
      onLoaded: (data: unknown) => {
        this._rawData = Array.isArray(data) ? data : [data];
        this._processClientSide();
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
   * Traitement côté client des données
   */
  private _processClientSide() {
    try {
      dispatchDataLoading(this.id);
      this._loading = true;

      let result = [...this._rawData] as Record<string, unknown>[];

      // 1. Appliquer les filtres
      const filterExpr = this.filter || this.where;
      if (filterExpr) {
        result = this._applyFilters(result, filterExpr);
      }

      // 2. Appliquer le groupement et les agrégations
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
    } catch (error) {
      this._error = error as Error;
      dispatchDataError(this.id, this._error);
      console.error(`gouv-query[${this.id}]: Erreur de traitement`, error);
    } finally {
      this._loading = false;
    }
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
   * Applique le GROUP BY et les agrégations
   */
  private _applyGroupByAndAggregate(data: Record<string, unknown>[]): Record<string, unknown>[] {
    const groupFields = this.groupBy.split(',').map(f => f.trim()).filter(Boolean);
    const aggregates = this._parseAggregates(this.aggregate);

    // Créer les groupes
    const groups = new Map<string, Record<string, unknown>[]>();

    for (const item of data) {
      const key = groupFields.map(f => String(getByPath(item, f) ?? '')).join('|||');
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(item);
    }

    // Calculer les agrégations pour chaque groupe
    const result: Record<string, unknown>[] = [];

    for (const [key, items] of groups) {
      const row: Record<string, unknown> = {};

      // Ajouter les champs de regroupement
      const keyParts = key.split('|||');
      groupFields.forEach((field, i) => {
        row[field] = keyParts[i];
      });

      // Calculer les agrégations
      for (const agg of aggregates) {
        const fieldName = agg.alias || `${agg.field}__${agg.function}`;
        row[fieldName] = this._computeAggregate(items, agg);
      }

      result.push(row);
    }

    return result;
  }

  private _parseAggregates(aggExpr: string): QueryAggregate[] {
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

      // Comparaison numérique si possible
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

  /**
   * Mode API: fait une requête directe à l'API
   */
  private async _fetchFromApi() {
    if (!this.datasetId) {
      console.warn('gouv-query: attribut "dataset" requis pour les requêtes API');
      return;
    }

    if (this._abortController) {
      this._abortController.abort();
    }
    this._abortController = new AbortController();

    this._loading = true;
    this._error = null;
    dispatchDataLoading(this.id);

    try {
      if (this.apiType === 'opendatasoft') {
        await this._fetchFromOdsWithPagination();
      } else {
        await this._fetchSinglePage();
      }
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return;
      }

      this._error = error as Error;
      dispatchDataError(this.id, this._error);
      console.error(`gouv-query[${this.id}]: Erreur de requête API`, error);
    } finally {
      this._loading = false;
    }
  }

  /**
   * Fetch single page for tabular/generic API types
   */
  private async _fetchSinglePage(): Promise<void> {
    const url = this._buildApiUrl();

    const response = await fetch(url, {
      signal: this._abortController!.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();

    let data = this.transform ? getByPath(json, this.transform) : json;

    if (!Array.isArray(data)) {
      if (this.apiType === 'tabular' && json.data) {
        data = json.data;
      } else {
        data = [data];
      }
    }

    this._data = data;
    dispatchDataLoaded(this.id, this._data);
  }

  /**
   * Fetch from ODS API with automatic pagination via offset.
   * ODS APIs limit to 100 records per request.
   *
   * - limit > 0: fetch exactly that many records (paginated in chunks of 100)
   * - limit = 0 (default): fetch ALL available records using total_count
   *
   * After fetching, verifies that the number of results received matches
   * total_count from the API response to detect incomplete data.
   */
  private async _fetchFromOdsWithPagination(): Promise<void> {
    const fetchAll = this.limit <= 0;
    const requestedLimit = fetchAll ? ODS_MAX_PAGES * ODS_PAGE_SIZE : this.limit;
    const pageSize = ODS_PAGE_SIZE;
    let allResults: unknown[] = [];
    let offset = 0;
    let totalCount = -1;

    for (let page = 0; page < ODS_MAX_PAGES; page++) {
      const remaining = requestedLimit - allResults.length;
      if (remaining <= 0) break;

      const url = this._buildOpenDataSoftUrl(
        Math.min(pageSize, remaining),
        offset
      );

      const response = await fetch(url, {
        signal: this._abortController!.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      const pageResults = json.results || [];
      allResults = allResults.concat(pageResults);

      if (typeof json.total_count === 'number') {
        totalCount = json.total_count;
      }

      // Stop if we've fetched all available records or got fewer than page size
      if (
        (totalCount >= 0 && allResults.length >= totalCount) ||
        pageResults.length < pageSize
      ) {
        break;
      }

      offset += pageResults.length;
    }

    // Verify: warn if we received fewer results than total_count indicates
    if (totalCount >= 0 && allResults.length < totalCount && allResults.length < requestedLimit) {
      console.warn(
        `gouv-query[${this.id}]: pagination incomplete - ${allResults.length}/${totalCount} resultats recuperes ` +
        `(limite de securite: ${ODS_MAX_PAGES} pages de ${ODS_PAGE_SIZE})`
      );
    }

    // Apply transform if specified
    this._data = this.transform ? getByPath(allResults, this.transform) as unknown[] : allResults;
    dispatchDataLoaded(this.id, this._data);
  }

  /**
   * Construit l'URL de requête selon le type d'API
   */
  private _buildApiUrl(): string {
    if (this.apiType === 'opendatasoft') {
      return this._buildOpenDataSoftUrl();
    } else if (this.apiType === 'tabular') {
      return this._buildTabularUrl();
    }

    throw new Error(`Type d'API non supporté: ${this.apiType}`);
  }

  /**
   * Construit une URL OpenDataSoft.
   * When called from the pagination loop, limitOverride and offsetOverride
   * control the per-page limit and offset. When called without overrides
   * (e.g. from _buildApiUrl for non-paginated paths), caps limit at ODS_PAGE_SIZE.
   */
  private _buildOpenDataSoftUrl(limitOverride?: number, offsetOverride?: number): string {
    const base = this.baseUrl || 'https://data.opendatasoft.com';
    const url = new URL(`${base}/api/explore/v2.1/catalog/datasets/${this.datasetId}/records`);

    if (this.select) {
      url.searchParams.set('select', this.select);
    }

    const whereClause = this.where || this.filter;
    if (whereClause) {
      url.searchParams.set('where', whereClause);
    }

    if (this.groupBy) {
      url.searchParams.set('group_by', this.groupBy);
    }

    if (this.orderBy) {
      // Convertir "field:desc" en "field DESC"
      const sortExpr = this.orderBy.replace(/:(\w+)$/, (_, dir) => ` ${dir.toUpperCase()}`);
      url.searchParams.set('order_by', sortExpr);
    }

    if (limitOverride !== undefined) {
      url.searchParams.set('limit', String(limitOverride));
    } else if (this.limit > 0) {
      url.searchParams.set('limit', String(Math.min(this.limit, ODS_PAGE_SIZE)));
    }

    if (offsetOverride && offsetOverride > 0) {
      url.searchParams.set('offset', String(offsetOverride));
    }

    return url.toString();
  }

  /**
   * Construit une URL Tabular API (data.gouv.fr)
   */
  private _buildTabularUrl(): string {
    const base = this.baseUrl || 'https://tabular-api.data.gouv.fr';

    // L'URL Tabular nécessite dataset_id et resource_id
    if (!this.resource) {
      throw new Error('gouv-query: attribut "resource" requis pour l\'API Tabular');
    }

    const url = new URL(`${base}/api/resources/${this.resource}/data/`);

    // Filtres (format: "field:operator:value")
    const filterExpr = this.filter || this.where;
    if (filterExpr) {
      const filters = filterExpr.split(',').map(f => f.trim());
      for (const filter of filters) {
        const parts = filter.split(':');
        if (parts.length >= 3) {
          const field = parts[0];
          const op = this._mapOperatorToTabular(parts[1]);
          const value = parts.slice(2).join(':');
          url.searchParams.set(`${field}__${op}`, value);
        }
      }
    }

    // Group by
    if (this.groupBy) {
      const groupFields = this.groupBy.split(',').map(f => f.trim());
      for (const field of groupFields) {
        url.searchParams.append(`${field}__groupby`, '');
      }
    }

    // Agrégations
    if (this.aggregate) {
      const aggregates = this.aggregate.split(',').map(a => a.trim());
      for (const agg of aggregates) {
        const parts = agg.split(':');
        if (parts.length >= 2) {
          const field = parts[0];
          const func = parts[1];
          url.searchParams.append(`${field}__${func}`, '');
        }
      }
    }

    // Tri
    if (this.orderBy) {
      const parts = this.orderBy.split(':');
      const field = parts[0];
      const direction = parts[1] || 'asc';
      url.searchParams.set(`${field}__sort`, direction);
    }

    // Limite
    if (this.limit > 0) {
      url.searchParams.set('page_size', String(Math.min(this.limit, 50)));
    }

    return url.toString();
  }

  private _mapOperatorToTabular(op: string): string {
    const mapping: Record<string, string> = {
      'eq': 'exact',
      'neq': 'differs',
      'gt': 'strictly_greater',
      'gte': 'greater',
      'lt': 'strictly_less',
      'lte': 'less',
      'contains': 'contains',
      'notcontains': 'notcontains',
      'in': 'in',
      'notin': 'notin',
      'isnull': 'isnull',
      'isnotnull': 'isnotnull'
    };
    return mapping[op] || op;
  }

  /**
   * Force le rechargement des données
   */
  public reload() {
    this._initialize();
  }

  /**
   * Retourne les données actuelles
   */
  public getData(): unknown[] {
    return this._data;
  }

  /**
   * Retourne l'état de chargement
   */
  public isLoading(): boolean {
    return this._loading;
  }

  /**
   * Retourne l'erreur éventuelle
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
