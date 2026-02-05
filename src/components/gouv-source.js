var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getByPath } from '../utils/json-path.js';
import { dispatchDataLoaded, dispatchDataError, dispatchDataLoading, clearDataCache } from '../utils/data-bridge.js';
/**
 * <gouv-source> - Connecteur de données
 *
 * Composant invisible qui se connecte à une API REST, récupère les données,
 * les normalise et les diffuse via des événements custom.
 *
 * @example
 * <gouv-source
 *   id="sites"
 *   url="https://api.example.com/sites"
 *   transform="data.results"
 *   refresh="60">
 * </gouv-source>
 */
let GouvSource = class GouvSource extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * URL de l'API à appeler
         */
        this.url = '';
        /**
         * Méthode HTTP (GET ou POST)
         */
        this.method = 'GET';
        /**
         * Headers HTTP en JSON
         */
        this.headers = '';
        /**
         * Paramètres de requête en JSON
         */
        this.params = '';
        /**
         * Intervalle de rafraîchissement en secondes (0 = pas de refresh)
         */
        this.refresh = 0;
        /**
         * Chemin JSON vers les données dans la réponse
         */
        this.transform = '';
        this._loading = false;
        this._error = null;
        this._data = null;
        this._refreshInterval = null;
        this._abortController = null;
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
        this._fetchData();
        this._setupRefresh();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._cleanup();
        if (this.id) {
            clearDataCache(this.id);
        }
    }
    updated(changedProperties) {
        if (changedProperties.has('url') || changedProperties.has('params') || changedProperties.has('transform')) {
            this._fetchData();
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
    }
    _setupRefresh() {
        if (this._refreshInterval) {
            clearInterval(this._refreshInterval);
            this._refreshInterval = null;
        }
        if (this.refresh > 0) {
            this._refreshInterval = window.setInterval(() => {
                this._fetchData();
            }, this.refresh * 1000);
        }
    }
    async _fetchData() {
        if (!this.url) {
            return;
        }
        if (!this.id) {
            console.warn('gouv-source: attribut "id" requis pour identifier la source');
            return;
        }
        // Annule la requête précédente si elle est en cours
        if (this._abortController) {
            this._abortController.abort();
        }
        this._abortController = new AbortController();
        this._loading = true;
        this._error = null;
        dispatchDataLoading(this.id);
        try {
            const url = this._buildUrl();
            const options = this._buildFetchOptions();
            const response = await fetch(url, {
                ...options,
                signal: this._abortController.signal
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const json = await response.json();
            // Applique la transformation si spécifiée
            this._data = this.transform ? getByPath(json, this.transform) : json;
            dispatchDataLoaded(this.id, this._data);
        }
        catch (error) {
            if (error.name === 'AbortError') {
                return; // Requête annulée, on ignore
            }
            this._error = error;
            dispatchDataError(this.id, this._error);
            console.error(`gouv-source[${this.id}]: Erreur de chargement`, error);
        }
        finally {
            this._loading = false;
        }
    }
    _buildUrl() {
        const url = new URL(this.url, window.location.origin);
        if (this.params && this.method === 'GET') {
            try {
                const params = JSON.parse(this.params);
                Object.entries(params).forEach(([key, value]) => {
                    url.searchParams.set(key, String(value));
                });
            }
            catch (e) {
                console.warn('gouv-source: params invalides (JSON attendu)', e);
            }
        }
        return url.toString();
    }
    _buildFetchOptions() {
        const options = {
            method: this.method
        };
        // Headers
        if (this.headers) {
            try {
                options.headers = JSON.parse(this.headers);
            }
            catch (e) {
                console.warn('gouv-source: headers invalides (JSON attendu)', e);
            }
        }
        // Body pour POST
        if (this.method === 'POST' && this.params) {
            options.headers = {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            };
            options.body = this.params;
        }
        return options;
    }
    /**
     * Force le rechargement des données
     */
    reload() {
        this._fetchData();
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
    property({ type: String })
], GouvSource.prototype, "url", void 0);
__decorate([
    property({ type: String })
], GouvSource.prototype, "method", void 0);
__decorate([
    property({ type: String })
], GouvSource.prototype, "headers", void 0);
__decorate([
    property({ type: String })
], GouvSource.prototype, "params", void 0);
__decorate([
    property({ type: Number })
], GouvSource.prototype, "refresh", void 0);
__decorate([
    property({ type: String })
], GouvSource.prototype, "transform", void 0);
__decorate([
    state()
], GouvSource.prototype, "_loading", void 0);
__decorate([
    state()
], GouvSource.prototype, "_error", void 0);
__decorate([
    state()
], GouvSource.prototype, "_data", void 0);
GouvSource = __decorate([
    customElement('gouv-source')
], GouvSource);
export { GouvSource };
