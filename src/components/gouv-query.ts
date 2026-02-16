import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getByPath, setByPath } from '../utils/json-path.js';
import { sendWidgetBeacon } from '../utils/beacon.js';
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
import { getAdapter } from '../adapters/api-adapter.js';
import type { ApiAdapter, AdapterParams, ServerSideOverlay } from '../adapters/api-adapter.js';

/**
 * Types d'API supportes
 */
export type ApiType = 'generic' | 'opendatasoft' | 'tabular';

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
 * <gouv-query> - Composant de requete avancee
 *
 * Permet de transformer, filtrer, agreger et trier des donnees
 * provenant d'une source existante ou directement depuis une API
 * (OpenDataSoft, Tabular API data.gouv.fr).
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
 * @example OpenDataSoft API (requete serveur)
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
 * @example Tabular API (requete serveur)
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
   * Headers HTTP en JSON (pour APIs privees/authentifiees)
   * Ex: '{"apikey":"abc123"}' ou '{"Authorization":"Bearer token"}'
   * Utilise uniquement en mode opendatasoft/tabular (ignore en mode generic)
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

  private _adapter: ApiAdapter = getAdapter('generic');
  private _refreshInterval: number | null = null;
  private _abortController: AbortController | null = null;
  private _unsubscribe: (() => void) | null = null;
  private _unsubscribeCommands: (() => void) | null = null;

  // Server-side overlay state (set by downstream components via gouv-source-command)
  private _serverPage = 1;
  private _serverWheres = new Map<string, string>();
  private _serverOrderBy = '';

  // True once the initial server-side fetch has been dispatched.
  // Commands received before this are accumulated but don't trigger a fetch,
  // because the deferred initial fetch will pick them up.
  private _initialFetchDone = false;

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
    this._adapter = getAdapter(this.apiType);
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
      // Update adapter when apiType changes
      if (changedProperties.has('apiType')) {
        this._adapter = getAdapter(this.apiType);
      }

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
      console.warn('gouv-query: attribut "id" requis pour identifier la requete');
      return;
    }

    // Setup/teardown command listener for server-side mode
    this._setupServerSideListener();

    if (this.apiType === 'generic') {
      // Mode client-side: s'abonner a une source existante
      this._subscribeToSource();
    } else if (this.serverSide) {
      // Server-side mode: defer first fetch by one microtask so downstream
      // components (gouv-search, gouv-facets, gouv-display) have time to
      // read URL params and send their initial commands (where, page, orderBy).
      // Commands received before the initial fetch are accumulated and picked
      // up when the deferred fetch fires.
      this._initialFetchDone = false;
      queueMicrotask(() => {
        this._initialFetchDone = true;
        this._fetchFromApi();
      });
    } else {
      // Non-server-side API mode: fetch immediately
      this._initialFetchDone = true;
      this._fetchFromApi();
    }
  }

  /**
   * Mode generic: s'abonne a une source et traite les donnees cote client
   */
  private _subscribeToSource() {
    if (!this.source) {
      console.warn('gouv-query: attribut "source" requis en mode generic');
      return;
    }

    // Se desabonner de l'ancienne source
    if (this._unsubscribe) {
      this._unsubscribe();
    }

    // Verifier le cache avant de s'abonner (evite une race condition
    // si la source a deja emis ses donnees avant l'abonnement)
    const cachedData = getDataCache(this.source);
    if (cachedData !== undefined) {
      this._rawData = Array.isArray(cachedData) ? cachedData : [cachedData];
      this._processClientSide();
    }

    // S'abonner a la nouvelle source
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
   * Traitement cote client des donnees
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

  // --- API fetch (delegue aux adapters) ---

  /**
   * Mode API: fait une requete directe a l'API via l'adapter
   */
  private async _fetchFromApi() {
    const params = this._getAdapterParams();
    const error = this._adapter.validate(params);
    if (error) {
      console.warn(`gouv-query: ${error}`);
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
      if (this.serverSide && this._adapter.capabilities.serverFetch) {
        await this._fetchServerSideDelegated();
      } else if (this._adapter.capabilities.serverFetch) {
        await this._fetchAllDelegated();
      } else {
        await this._fetchSinglePage();
      }
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return;
      }

      this._error = error as Error;
      dispatchDataError(this.id, this._error);
      console.error(`gouv-query[${this.id}]: Erreur de requete API`, error);
    } finally {
      this._loading = false;
    }
  }

  /**
   * Fetch toutes les donnees avec pagination automatique via l'adapter.
   */
  private async _fetchAllDelegated(): Promise<void> {
    const result = await this._adapter.fetchAll(
      this._getAdapterParams(),
      this._abortController!.signal
    );

    if (result.needsClientProcessing) {
      // Tabular: donnees brutes, traitement client-side (group-by, aggregate, sort, limit)
      this._rawData = result.data as Record<string, unknown>[];
      this._processClientSide();
    } else {
      // ODS: donnees deja traitees par le serveur
      this._data = this.transform
        ? getByPath(result.data, this.transform) as unknown[]
        : result.data;
      dispatchDataLoaded(this.id, this._data);
    }
  }

  /**
   * Fetch une seule page en mode server-side via l'adapter.
   */
  private async _fetchServerSideDelegated(): Promise<void> {
    const overlay: ServerSideOverlay = {
      page: this._serverPage,
      effectiveWhere: this.getEffectiveWhere(),
      orderBy: this._serverOrderBy || this.orderBy,
    };

    const result = await this._adapter.fetchPage(
      this._getAdapterParams(),
      overlay,
      this._abortController!.signal
    );

    let data = result.data;

    // Apply transform if specified
    if (this.transform) {
      // ODS: transform s'applique sur le json brut ; Tabular: sur data
      const transformRoot = result.rawJson || data;
      const transformed = getByPath(transformRoot, this.transform);
      data = Array.isArray(transformed) ? transformed : [transformed];
    }

    // Store pagination meta for downstream display/datalist auto-detection
    setDataMeta(this.id, {
      page: this._serverPage,
      pageSize: this.pageSize,
      total: result.totalCount
    });

    this._data = data;
    dispatchDataLoaded(this.id, this._data);
  }

  /**
   * Fetch single page fallback (mode non-pagine)
   */
  private async _fetchSinglePage(): Promise<void> {
    const params = this._getAdapterParams();
    const url = this._adapter.buildUrl(params);

    const fetchOpts: RequestInit = { signal: this._abortController!.signal };
    if (params.headers && Object.keys(params.headers).length > 0) {
      fetchOpts.headers = params.headers;
    }

    const response = await fetch(url, fetchOpts);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();

    let data = this.transform ? getByPath(json, this.transform) : json;

    if (!Array.isArray(data)) {
      if (this._adapter.type === 'tabular' && json.data) {
        data = json.data;
      } else {
        data = [data];
      }
    }

    this._data = data;
    dispatchDataLoaded(this.id, this._data);
  }

  /**
   * Parse le JSON de headers en objet.
   */
  private _parseHeaders(): Record<string, string> | undefined {
    if (!this.headers) return undefined;
    try {
      return JSON.parse(this.headers);
    } catch (e) {
      console.warn('gouv-query: headers invalides (JSON attendu)', e);
      return undefined;
    }
  }

  /**
   * Collecte les parametres pour l'adapter.
   */
  private _getAdapterParams(): AdapterParams {
    return {
      baseUrl: this.baseUrl,
      datasetId: this.datasetId,
      resource: this.resource,
      select: this.select,
      where: this.where,
      filter: this.filter,
      groupBy: this.groupBy,
      aggregate: this.aggregate,
      orderBy: this.orderBy,
      limit: this.limit,
      transform: this.transform,
      pageSize: this.pageSize,
      headers: this._parseHeaders(),
    };
  }

  // --- Server-side command handling ---

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
        // If the initial deferred fetch hasn't fired yet, just accumulate
        // the command — it will be picked up when the microtask fires.
        if (this._initialFetchDone) {
          this._fetchFromApi();
        }
      }
    });
  }

  /**
   * Retourne le separateur de clauses WHERE selon le format de l'adapter.
   * ODSQL: ' AND ', colon: ', '
   */
  private _getWhereSeparator(): string {
    return this._adapter.capabilities.whereFormat === 'colon' ? ', ' : ' AND ';
  }

  /**
   * Retourne le where dynamique fusionne de toutes les sources (search, facets, etc.)
   */
  private _getMergedWhere(): string {
    return [...this._serverWheres.values()].filter(Boolean).join(this._getWhereSeparator());
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
    return parts.join(this._getWhereSeparator());
  }

  // --- Public API ---

  /**
   * Retourne l'adapter courant (pour les composants en aval)
   */
  public getAdapter(): ApiAdapter {
    return this._adapter;
  }

  /**
   * Force le rechargement des donnees
   */
  public reload() {
    this._initialize();
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
