import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getByPath, setByPath } from '../utils/json-path.js';
import { sendWidgetBeacon } from '../utils/beacon.js';
import { getProxyConfig } from '@gouv-widgets/shared';
import {
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading,
  clearDataCache,
  clearDataMeta,
  setDataMeta,
  subscribeToSource,
  getDataCache,
  subscribeToSourceCommands
} from '../utils/data-bridge.js';

/** ODS API maximum records per request */
const ODS_PAGE_SIZE = 100;

/** Maximum pages to fetch for ODS pagination (safety limit) */
const ODS_MAX_PAGES = 10;

/** Tabular API maximum records per request */
const TABULAR_PAGE_SIZE = 100;

/** Maximum pages to fetch for Tabular pagination (safety limit: 50K records) */
const TABULAR_MAX_PAGES = 500;

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
   * Active le mode server-side pilotable.
   * En mode server-side, gouv-query ne fetche qu'UNE page a la fois
   * et ecoute les commandes (page, where, orderBy) des composants en aval.
   * Necessite api-type="opendatasoft" ou api-type="tabular".
   */
  @property({ type: Boolean, attribute: 'server-side' })
  serverSide = false;

  /**
   * Taille de page pour le mode server-side (nombre de records par page)
   */
  @property({ type: Number, attribute: 'page-size' })
  pageSize = 20;

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
  private _unsubscribeCommands: (() => void) | null = null;

  // Server-side overlay state (set by downstream components via gouv-source-command)
  private _serverPage = 1;
  private _serverWheres = new Map<string, string>();
  private _serverOrderBy = '';

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
    const queryProps = ['source', 'apiType', 'baseUrl', 'dataset', 'resource',
                        'select', 'where', 'filter', 'groupBy', 'aggregate',
                        'orderBy', 'limit', 'transform', 'serverSide', 'pageSize'];

    if (queryProps.some(prop => changedProperties.has(prop))) {
      // Reset server-side overlay when static config changes
      if (this.serverSide) {
        const staticProps = ['source', 'apiType', 'baseUrl', 'dataset', 'resource',
                             'select', 'where', 'filter', 'groupBy', 'aggregate',
                             'orderBy', 'limit', 'transform', 'pageSize'];
        if (staticProps.some(prop => changedProperties.has(prop))) {
          this._serverPage = 1;
          this._serverWheres.clear();
          this._serverOrderBy = '';
        }
      }
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
      console.warn('gouv-query: attribut "id" requis pour identifier la requête');
      return;
    }

    // Setup/teardown command listener for server-side mode
    this._setupServerSideListener();

    if (this.apiType === 'generic') {
      // Mode client-side: s'abonner à une source existante
      this._subscribeToSource();
    } else {
      // Mode API: faire une requête API
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

      // Ajouter les champs de regroupement (structure imbriquée préservée)
      const keyParts = key.split('|||');
      groupFields.forEach((field, i) => {
        setByPath(row, field, keyParts[i]);
      });

      // Calculer les agrégations (structure imbriquée préservée)
      for (const agg of aggregates) {
        const fieldName = agg.alias || `${agg.field}__${agg.function}`;
        setByPath(row, fieldName, this._computeAggregate(items, agg));
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
    if (this.apiType === 'opendatasoft' && !this.datasetId) {
      console.warn('gouv-query: attribut "dataset-id" requis pour les requêtes OpenDataSoft');
      return;
    }
    if (this.apiType === 'tabular' && !this.resource) {
      console.warn('gouv-query: attribut "resource" requis pour les requêtes Tabular');
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
      if (this.serverSide && (this.apiType === 'opendatasoft' || this.apiType === 'tabular')) {
        await this._fetchServerSide();
      } else if (this.apiType === 'opendatasoft') {
        await this._fetchFromOdsWithPagination();
      } else if (this.apiType === 'tabular') {
        await this._fetchFromTabularWithPagination();
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
   * Fetch from Tabular API with automatic pagination via links.next.
   * The Tabular API returns { data: [...], links: { next, prev }, meta: { page, page_size, total } }.
   *
   * - limit > 0: fetch that many records (across multiple pages if needed)
   * - limit = 0 (default): fetch ALL available records using meta.total
   */
  private async _fetchFromTabularWithPagination(): Promise<void> {
    const fetchAll = this.limit <= 0;
    const requestedLimit = fetchAll ? TABULAR_MAX_PAGES * TABULAR_PAGE_SIZE : this.limit;
    let allResults: unknown[] = [];
    let totalCount = -1;
    let currentPage = 1;

    for (let i = 0; i < TABULAR_MAX_PAGES; i++) {
      const remaining = requestedLimit - allResults.length;
      if (remaining <= 0) break;

      const url = this._buildTabularUrl(TABULAR_PAGE_SIZE, currentPage);

      const response = await fetch(url, {
        signal: this._abortController!.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      const pageResults = json.data || [];
      allResults = allResults.concat(pageResults);

      if (json.meta && typeof json.meta.total === 'number') {
        totalCount = json.meta.total;
      }

      // Determine next page from links.next
      let hasNext = false;
      if (json.links?.next) {
        try {
          const nextUrl = new URL(json.links.next, 'https://tabular-api.data.gouv.fr');
          const nextPage = Number(nextUrl.searchParams.get('page'));
          if (nextPage > 0) {
            currentPage = nextPage;
            hasNext = true;
          }
        } catch {
          // Invalid URL, stop pagination
        }
      }

      if (
        !hasNext ||
        (totalCount >= 0 && allResults.length >= totalCount) ||
        pageResults.length < TABULAR_PAGE_SIZE
      ) {
        break;
      }
    }

    // Trim to requested limit if specified
    if (!fetchAll && allResults.length > requestedLimit) {
      allResults = allResults.slice(0, requestedLimit);
    }

    // Verify: warn if pagination incomplete
    if (totalCount >= 0 && allResults.length < totalCount && allResults.length < requestedLimit) {
      console.warn(
        `gouv-query[${this.id}]: pagination incomplete - ${allResults.length}/${totalCount} resultats recuperes ` +
        `(limite de securite: ${TABULAR_MAX_PAGES} pages de ${TABULAR_PAGE_SIZE})`
      );
    }

    // Store raw data for client-side processing (group-by, aggregate, sort, limit)
    this._rawData = allResults as Record<string, unknown>[];
    this._processClientSide();
  }

  /**
   * Configure l'ecoute des commandes pour le mode server-side.
   * Les composants en aval (search, display, datalist) emettent des
   * gouv-source-command avec page/where/orderBy que query recoit ici.
   */
  private _setupServerSideListener() {
    // Clean up previous listener
    if (this._unsubscribeCommands) {
      this._unsubscribeCommands();
      this._unsubscribeCommands = null;
    }

    if (!this.serverSide || !this.id) return;

    this._unsubscribeCommands = subscribeToSourceCommands(this.id, (cmd) => {
      let needsFetch = false;

      if (cmd.page !== undefined && cmd.page !== this._serverPage) {
        this._serverPage = cmd.page;
        needsFetch = true;
      }

      if (cmd.where !== undefined) {
        const key = cmd.whereKey || '_default';
        const oldMerged = this._getMergedWhere();
        if (cmd.where) {
          this._serverWheres.set(key, cmd.where);
        } else {
          this._serverWheres.delete(key);
        }
        if (this._getMergedWhere() !== oldMerged) {
          // Reset page when search/filter changes
          if (cmd.page === undefined) {
            this._serverPage = 1;
          }
          needsFetch = true;
        }
      }

      if (cmd.orderBy !== undefined && cmd.orderBy !== this._serverOrderBy) {
        this._serverOrderBy = cmd.orderBy;
        // Reset page when sort changes
        if (cmd.page === undefined) {
          this._serverPage = 1;
        }
        needsFetch = true;
      }

      if (needsFetch) {
        this._fetchFromApi();
      }
    });
  }

  /**
   * Retourne le where dynamique fusionne de toutes les sources (search, facets, etc.)
   */
  private _getMergedWhere(): string {
    return [...this._serverWheres.values()].filter(Boolean).join(' AND ');
  }

  /**
   * Retourne le where effectif complet (statique + dynamique),
   * en excluant optionnellement une cle specifique.
   * Utilise par gouv-facets server-facets pour construire l'URL facets API
   * sans inclure ses propres filtres dans les compteurs.
   */
  getEffectiveWhere(excludeKey?: string): string {
    const parts: string[] = [];
    const staticWhere = this.where || this.filter;
    if (staticWhere) parts.push(staticWhere);
    for (const [key, w] of this._serverWheres) {
      if (excludeKey && key === excludeKey) continue;
      if (w) parts.push(w);
    }
    return parts.join(' AND ');
  }

  /**
   * Mode server-side: fetch UNE seule page avec les parametres overlays
   * (page, where, orderBy) provenant des composants en aval.
   */
  private async _fetchServerSide(): Promise<void> {
    const url = this.apiType === 'opendatasoft'
      ? this._buildServerSideOdsUrl()
      : this._buildServerSideTabularUrl();

    const response = await fetch(url, {
      signal: this._abortController!.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();

    // Extract data and total count per API type
    let data: unknown[];
    let totalCount = 0;

    if (this.apiType === 'opendatasoft') {
      data = json.results || [];
      totalCount = typeof json.total_count === 'number' ? json.total_count : 0;
    } else {
      // Tabular
      data = json.data || [];
      totalCount = json.meta?.total ?? 0;
    }

    // Apply transform if specified
    if (this.transform) {
      const transformed = getByPath(this.apiType === 'opendatasoft' ? json : data, this.transform);
      data = Array.isArray(transformed) ? transformed : [transformed];
    }

    // Store pagination meta for downstream display/datalist auto-detection
    setDataMeta(this.id, {
      page: this._serverPage,
      pageSize: this.pageSize,
      total: totalCount
    });

    this._data = data;
    dispatchDataLoaded(this.id, this._data);
  }

  /**
   * Construit l'URL ODS en mode server-side (une seule page).
   * Merge le where statique (attribut) avec le where dynamique (overlay search).
   */
  private _buildServerSideOdsUrl(): string {
    const base = this.baseUrl || 'https://data.opendatasoft.com';
    const url = new URL(`${base}/api/explore/v2.1/catalog/datasets/${this.datasetId}/records`);

    // SELECT
    if (this.select) {
      url.searchParams.set('select', this.select);
    } else if (this.aggregate && this.groupBy) {
      const aggregates = this._parseAggregates(this.aggregate);
      const selectParts: string[] = [];
      for (const agg of aggregates) {
        const odsFunc = agg.function === 'count' ? 'count(*)' : `${agg.function}(${agg.field})`;
        const alias = agg.alias || `${agg.field}__${agg.function}`;
        selectParts.push(`${odsFunc} as ${alias}`);
      }
      const groupFields = this.groupBy.split(',').map(f => f.trim()).filter(Boolean);
      for (const gf of groupFields) {
        selectParts.push(gf);
      }
      url.searchParams.set('select', selectParts.join(', '));
    }

    // WHERE: merge static (attribute) + dynamic (overlay from search/facets)
    const effectiveWhere = this.getEffectiveWhere();
    if (effectiveWhere) {
      url.searchParams.set('where', effectiveWhere);
    }

    // GROUP BY
    if (this.groupBy) {
      url.searchParams.set('group_by', this.groupBy);
    }

    // ORDER BY: overlay from datalist sort, fallback to static attribute
    const effectiveOrderBy = this._serverOrderBy || this.orderBy;
    if (effectiveOrderBy) {
      const sortExpr = effectiveOrderBy.replace(/:(\w+)$/, (_, dir) => ` ${dir.toUpperCase()}`);
      url.searchParams.set('order_by', sortExpr);
    }

    // PAGINATION: single page
    url.searchParams.set('limit', String(this.pageSize));
    const offset = (this._serverPage - 1) * this.pageSize;
    if (offset > 0) {
      url.searchParams.set('offset', String(offset));
    }

    return url.toString();
  }

  /**
   * Construit l'URL Tabular en mode server-side (une seule page).
   */
  private _buildServerSideTabularUrl(): string {
    let base: string;
    if (this.baseUrl) {
      base = this.baseUrl;
    } else {
      const config = getProxyConfig();
      base = `${config.baseUrl}${config.endpoints.tabular}`;
    }

    if (!this.resource) {
      throw new Error('gouv-query: attribut "resource" requis pour l\'API Tabular');
    }

    const origin = window.location.origin !== 'null' ? window.location.origin : undefined;
    const url = new URL(`${base}/api/resources/${this.resource}/data/`, origin);

    // Static filters
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

    // ORDER BY: overlay from datalist sort, fallback to static attribute
    const effectiveOrderBy = this._serverOrderBy || this.orderBy;
    if (effectiveOrderBy) {
      const parts = effectiveOrderBy.split(':');
      const field = parts[0];
      const direction = parts[1] || 'asc';
      url.searchParams.set(`${field}__sort`, direction);
    }

    // PAGINATION: single page
    url.searchParams.set('page_size', String(this.pageSize));
    url.searchParams.set('page', String(this._serverPage));

    return url.toString();
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
    } else if (this.aggregate && this.groupBy) {
      // Auto-convert aggregate="field:func" to ODS select syntax
      // e.g. aggregate="population:sum, count:count" + group-by="region"
      // => select="sum(population) as population__sum, count(*) as count__count, region"
      const aggregates = this._parseAggregates(this.aggregate);
      const selectParts: string[] = [];
      for (const agg of aggregates) {
        const odsFunc = agg.function === 'count' ? 'count(*)' : `${agg.function}(${agg.field})`;
        const alias = agg.alias || `${agg.field}__${agg.function}`;
        selectParts.push(`${odsFunc} as ${alias}`);
      }
      // Include group-by fields in select
      const groupFields = this.groupBy.split(',').map(f => f.trim()).filter(Boolean);
      for (const gf of groupFields) {
        selectParts.push(gf);
      }
      url.searchParams.set('select', selectParts.join(', '));
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
  private _buildTabularUrl(pageSizeOverride?: number, pageOverride?: number): string {
    let base: string;
    if (this.baseUrl) {
      base = this.baseUrl;
    } else {
      // Route through CORS proxy (dev: Vite proxy, prod/embedded: chartsbuilder.matge.com)
      const config = getProxyConfig();
      base = `${config.baseUrl}${config.endpoints.tabular}`;
    }

    // L'URL Tabular nécessite dataset_id et resource_id
    if (!this.resource) {
      throw new Error('gouv-query: attribut "resource" requis pour l\'API Tabular');
    }

    // In srcdoc iframes, window.location.origin is the string "null"
    const origin = window.location.origin !== 'null' ? window.location.origin : undefined;
    const url = new URL(`${base}/api/resources/${this.resource}/data/`, origin);

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

    // Pagination
    if (pageSizeOverride) {
      url.searchParams.set('page_size', String(pageSizeOverride));
    } else if (this.limit > 0) {
      url.searchParams.set('page_size', String(this.limit));
    }

    if (pageOverride) {
      url.searchParams.set('page', String(pageOverride));
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
