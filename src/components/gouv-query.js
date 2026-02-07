var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getByPath } from '../utils/json-path.js';
import { dispatchDataLoaded, dispatchDataError, dispatchDataLoading, clearDataCache, subscribeToSource } from '../utils/data-bridge.js';
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
let GouvQuery = class GouvQuery extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Type d'API : generic (client-side), opendatasoft, tabular
         */
        this.apiType = 'generic';
        /**
         * ID de la source de données (pour mode generic)
         */
        this.source = '';
        /**
         * URL de base de l'API (pour opendatasoft/tabular)
         */
        this.baseUrl = '';
        /**
         * ID du dataset (pour opendatasoft/tabular)
         */
        this.datasetId = '';
        /**
         * ID de la ressource (pour tabular)
         */
        this.resource = '';
        /**
         * Clause SELECT avec agrégations (syntaxe ODSQL pour opendatasoft)
         * Ex: "sum(population) as total, region"
         */
        this.select = '';
        /**
         * Clause WHERE / Filtres
         * - opendatasoft: syntaxe ODSQL "population > 5000 AND status = 'active'"
         * - tabular/generic: "field:operator:value, field2:operator:value2"
         */
        this.where = '';
        /**
         * Alias pour where (compatibilité)
         */
        this.filter = '';
        /**
         * Champs de regroupement (séparés par virgule)
         */
        this.groupBy = '';
        /**
         * Agrégations pour mode generic/tabular
         * Format: "field:function, field2:function"
         * Ex: "population:sum, count:count"
         */
        this.aggregate = '';
        /**
         * Tri des résultats
         * Format: "field:direction" ou "field__function:direction"
         * Ex: "total_pop:desc" ou "population__sum:desc"
         */
        this.orderBy = '';
        /**
         * Limite de résultats
         */
        this.limit = 0;
        /**
         * Chemin vers les données dans la réponse API
         */
        this.transform = '';
        /**
         * Intervalle de rafraîchissement en secondes
         */
        this.refresh = 0;
        this._loading = false;
        this._error = null;
        this._data = [];
        this._rawData = [];
        this._refreshInterval = null;
        this._abortController = null;
        this._unsubscribe = null;
    }
    // Pas de rendu - composant invisible
    createRenderRoot() {
        return this;
    }
    render() {
        return html ``;
    }
    connectedCallback() {
        super.connectedCallback();
        this._initialize();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._cleanup();
        if (this.id) {
            clearDataCache(this.id);
        }
    }
    updated(changedProperties) {
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
    _cleanup() {
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
    _setupRefresh() {
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
    _initialize() {
        if (!this.id) {
            console.warn('gouv-query: attribut "id" requis pour identifier la requête');
            return;
        }
        if (this.apiType === 'generic') {
            // Mode client-side: s'abonner à une source existante
            this._subscribeToSource();
        }
        else {
            // Mode server-side: faire une requête API
            this._fetchFromApi();
        }
    }
    /**
     * Mode generic: s'abonne à une source et traite les données côté client
     */
    _subscribeToSource() {
        if (!this.source) {
            console.warn('gouv-query: attribut "source" requis en mode generic');
            return;
        }
        // Se désabonner de l'ancienne source
        if (this._unsubscribe) {
            this._unsubscribe();
        }
        // S'abonner à la nouvelle source
        this._unsubscribe = subscribeToSource(this.source, {
            onLoaded: (data) => {
                this._rawData = Array.isArray(data) ? data : [data];
                this._processClientSide();
            }
        });
    }
    /**
     * Traitement côté client des données
     */
    _processClientSide() {
        try {
            dispatchDataLoading(this.id);
            this._loading = true;
            let result = [...this._rawData];
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
        }
        catch (error) {
            this._error = error;
            dispatchDataError(this.id, this._error);
            console.error(`gouv-query[${this.id}]: Erreur de traitement`, error);
        }
        finally {
            this._loading = false;
        }
    }
    /**
     * Parse et applique les filtres (format: "field:operator:value")
     */
    _applyFilters(data, filterExpr) {
        const filters = this._parseFilters(filterExpr);
        return data.filter(item => {
            return filters.every(filter => this._matchesFilter(item, filter));
        });
    }
    _parseFilters(filterExpr) {
        const filters = [];
        const parts = filterExpr.split(',').map(p => p.trim()).filter(Boolean);
        for (const part of parts) {
            const segments = part.split(':');
            if (segments.length >= 2) {
                const field = segments[0];
                const operator = segments[1];
                let value;
                if (segments.length > 2) {
                    const rawValue = segments.slice(2).join(':');
                    // Parse la valeur
                    if (operator === 'in' || operator === 'notin') {
                        value = rawValue.split('|').map(v => {
                            const parsed = this._parseValue(v);
                            // Pour in/notin, on ne garde que string/number
                            return typeof parsed === 'boolean' ? String(parsed) : parsed;
                        });
                    }
                    else {
                        value = this._parseValue(rawValue);
                    }
                }
                filters.push({ field, operator, value });
            }
        }
        return filters;
    }
    _parseValue(val) {
        if (val === 'true')
            return true;
        if (val === 'false')
            return false;
        if (!isNaN(Number(val)) && val !== '')
            return Number(val);
        return val;
    }
    _matchesFilter(item, filter) {
        const value = getByPath(item, filter.field);
        switch (filter.operator) {
            case 'eq':
                return value === filter.value;
            case 'neq':
                return value !== filter.value;
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
                return Array.isArray(filter.value) && filter.value.includes(value);
            case 'notin':
                return Array.isArray(filter.value) && !filter.value.includes(value);
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
    _applyGroupByAndAggregate(data) {
        const groupFields = this.groupBy.split(',').map(f => f.trim()).filter(Boolean);
        const aggregates = this._parseAggregates(this.aggregate);
        // Créer les groupes
        const groups = new Map();
        for (const item of data) {
            const key = groupFields.map(f => String(getByPath(item, f) ?? '')).join('|||');
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key).push(item);
        }
        // Calculer les agrégations pour chaque groupe
        const result = [];
        for (const [key, items] of groups) {
            const row = {};
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
    _parseAggregates(aggExpr) {
        if (!aggExpr)
            return [];
        const aggregates = [];
        const parts = aggExpr.split(',').map(p => p.trim()).filter(Boolean);
        for (const part of parts) {
            // Format: "field:function" ou "field:function:alias"
            const segments = part.split(':');
            if (segments.length >= 2) {
                aggregates.push({
                    field: segments[0],
                    function: segments[1],
                    alias: segments[2]
                });
            }
        }
        return aggregates;
    }
    _computeAggregate(items, agg) {
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
    _applySort(data) {
        const sortParts = this.orderBy.split(':');
        if (sortParts.length < 1)
            return data;
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
    async _fetchFromApi() {
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
            const url = this._buildApiUrl();
            const response = await fetch(url, {
                signal: this._abortController.signal
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const json = await response.json();
            // Appliquer la transformation si spécifiée
            let data = this.transform ? getByPath(json, this.transform) : json;
            // Normaliser en tableau
            if (!Array.isArray(data)) {
                // Pour OpenDataSoft, les résultats sont dans 'results'
                if (this.apiType === 'opendatasoft' && json.results) {
                    data = json.results;
                }
                else if (this.apiType === 'tabular' && json.data) {
                    data = json.data;
                }
                else {
                    data = [data];
                }
            }
            this._data = data;
            dispatchDataLoaded(this.id, this._data);
        }
        catch (error) {
            if (error.name === 'AbortError') {
                return;
            }
            this._error = error;
            dispatchDataError(this.id, this._error);
            console.error(`gouv-query[${this.id}]: Erreur de requête API`, error);
        }
        finally {
            this._loading = false;
        }
    }
    /**
     * Construit l'URL de requête selon le type d'API
     */
    _buildApiUrl() {
        if (this.apiType === 'opendatasoft') {
            return this._buildOpenDataSoftUrl();
        }
        else if (this.apiType === 'tabular') {
            return this._buildTabularUrl();
        }
        throw new Error(`Type d'API non supporté: ${this.apiType}`);
    }
    /**
     * Construit une URL OpenDataSoft
     */
    _buildOpenDataSoftUrl() {
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
        if (this.limit > 0) {
            url.searchParams.set('limit', String(this.limit));
        }
        return url.toString();
    }
    /**
     * Construit une URL Tabular API (data.gouv.fr)
     */
    _buildTabularUrl() {
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
    _mapOperatorToTabular(op) {
        const mapping = {
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
    reload() {
        this._initialize();
    }
    /**
     * Retourne les données actuelles
     */
    getData() {
        return this._data;
    }
    /**
     * Retourne l'état de chargement
     */
    isLoading() {
        return this._loading;
    }
    /**
     * Retourne l'erreur éventuelle
     */
    getError() {
        return this._error;
    }
};
__decorate([
    property({ type: String, attribute: 'api-type' })
], GouvQuery.prototype, "apiType", void 0);
__decorate([
    property({ type: String })
], GouvQuery.prototype, "source", void 0);
__decorate([
    property({ type: String, attribute: 'base-url' })
], GouvQuery.prototype, "baseUrl", void 0);
__decorate([
    property({ type: String, attribute: 'dataset-id' })
], GouvQuery.prototype, "datasetId", void 0);
__decorate([
    property({ type: String })
], GouvQuery.prototype, "resource", void 0);
__decorate([
    property({ type: String })
], GouvQuery.prototype, "select", void 0);
__decorate([
    property({ type: String })
], GouvQuery.prototype, "where", void 0);
__decorate([
    property({ type: String })
], GouvQuery.prototype, "filter", void 0);
__decorate([
    property({ type: String, attribute: 'group-by' })
], GouvQuery.prototype, "groupBy", void 0);
__decorate([
    property({ type: String })
], GouvQuery.prototype, "aggregate", void 0);
__decorate([
    property({ type: String, attribute: 'order-by' })
], GouvQuery.prototype, "orderBy", void 0);
__decorate([
    property({ type: Number })
], GouvQuery.prototype, "limit", void 0);
__decorate([
    property({ type: String })
], GouvQuery.prototype, "transform", void 0);
__decorate([
    property({ type: Number })
], GouvQuery.prototype, "refresh", void 0);
__decorate([
    state()
], GouvQuery.prototype, "_loading", void 0);
__decorate([
    state()
], GouvQuery.prototype, "_error", void 0);
__decorate([
    state()
], GouvQuery.prototype, "_data", void 0);
__decorate([
    state()
], GouvQuery.prototype, "_rawData", void 0);
GouvQuery = __decorate([
    customElement('gouv-query')
], GouvQuery);
export { GouvQuery };
