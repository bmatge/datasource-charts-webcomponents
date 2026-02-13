import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getByPath } from '../utils/json-path.js';
import { sendWidgetBeacon } from '../utils/beacon.js';
import { getProxiedUrl } from '@gouv-widgets/shared';
import {
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading,
  clearDataCache,
  setDataMeta,
  clearDataMeta,
  subscribeToSourceCommands
} from '../utils/data-bridge.js';

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
@customElement('gouv-source')
export class GouvSource extends LitElement {
  /**
   * URL de l'API à appeler
   */
  @property({ type: String })
  url = '';

  /**
   * Méthode HTTP (GET ou POST)
   */
  @property({ type: String })
  method: 'GET' | 'POST' = 'GET';

  /**
   * Headers HTTP en JSON
   */
  @property({ type: String })
  headers = '';

  /**
   * Paramètres de requête en JSON
   */
  @property({ type: String })
  params = '';

  /**
   * Intervalle de rafraîchissement en secondes (0 = pas de refresh)
   */
  @property({ type: Number })
  refresh = 0;

  /**
   * Chemin JSON vers les données dans la réponse
   */
  @property({ type: String })
  transform = '';

  /**
   * Active la pagination serveur.
   * Quand true, injecte page/page_size dans l'URL et stocke la meta de pagination.
   */
  @property({ type: Boolean })
  paginate = false;

  /**
   * Taille de page pour la pagination serveur (nombre de records par page)
   */
  @property({ type: Number, attribute: 'page-size' })
  pageSize = 20;

  @state()
  private _loading = false;

  @state()
  private _error: Error | null = null;

  @state()
  private _data: unknown = null;

  private _currentPage = 1;
  private _refreshInterval: number | null = null;
  private _abortController: AbortController | null = null;
  private _unsubscribePageRequests: (() => void) | null = null;

  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }

  render() {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-source');
    // _fetchData() is called by updated() on the first Lit render cycle
    // when url/params/transform change from defaults. Calling it here too
    // caused a double-fetch where the first was immediately aborted
    // (NS_BINDING_ABORTED in Firefox).
    this._setupRefresh();
    this._setupPageRequestListener();
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
    if (changedProperties.has('url') || changedProperties.has('params') || changedProperties.has('transform')) {
      // Reset to page 1 when the URL or params change
      if (this.paginate && (changedProperties.has('url') || changedProperties.has('params'))) {
        this._currentPage = 1;
      }
      this._fetchData();
    }
    if (changedProperties.has('refresh')) {
      this._setupRefresh();
    }
    if (changedProperties.has('paginate') || changedProperties.has('pageSize')) {
      this._setupPageRequestListener();
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
    if (this._unsubscribePageRequests) {
      this._unsubscribePageRequests();
      this._unsubscribePageRequests = null;
    }
  }

  private _setupRefresh() {
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

  private async _fetchData() {
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
      const url = getProxiedUrl(this._buildUrl());
      const options = this._buildFetchOptions();

      const response = await fetch(url, {
        ...options,
        signal: this._abortController.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();

      // En mode pagination serveur, stocker la meta et auto-extraire les données
      if (this.paginate && json.meta) {
        setDataMeta(this.id, {
          page: json.meta.page ?? this._currentPage,
          pageSize: json.meta.page_size ?? this.pageSize,
          total: json.meta.total ?? 0
        });
      }

      // Applique la transformation si spécifiée
      if (this.transform) {
        this._data = getByPath(json, this.transform);
      } else if (this.paginate && json.data && !this.transform) {
        // En mode paginate sans transform explicite, auto-extraire json.data
        this._data = json.data;
      } else {
        this._data = json;
      }

      dispatchDataLoaded(this.id, this._data);
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return; // Requête annulée, on ignore
      }

      this._error = error as Error;
      dispatchDataError(this.id, this._error);
      console.error(`gouv-source[${this.id}]: Erreur de chargement`, error);
    } finally {
      this._loading = false;
    }
  }

  private _buildUrl(): string {
    // In srcdoc iframes, window.location.origin is the string "null"
    const base = window.location.origin !== 'null' ? window.location.origin : undefined;
    const url = new URL(this.url, base);

    if (this.params && this.method === 'GET') {
      try {
        const params = JSON.parse(this.params);
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.set(key, String(value));
        });
      } catch (e) {
        console.warn('gouv-source: params invalides (JSON attendu)', e);
      }
    }

    // Injecter les paramètres de pagination serveur
    if (this.paginate) {
      url.searchParams.set('page', String(this._currentPage));
      url.searchParams.set('page_size', String(this.pageSize));
    }

    return url.toString();
  }

  private _buildFetchOptions(): RequestInit {
    const options: RequestInit = {
      method: this.method
    };

    // Headers
    if (this.headers) {
      try {
        options.headers = JSON.parse(this.headers);
      } catch (e) {
        console.warn('gouv-source: headers invalides (JSON attendu)', e);
      }
    }

    // Body pour POST
    if (this.method === 'POST' && this.params) {
      options.headers = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {})
      };
      options.body = this.params;
    }

    return options;
  }

  private _setupPageRequestListener() {
    // Clean up previous listener
    if (this._unsubscribePageRequests) {
      this._unsubscribePageRequests();
      this._unsubscribePageRequests = null;
    }

    if (this.paginate && this.id) {
      this._unsubscribePageRequests = subscribeToSourceCommands(this.id, (cmd) => {
        if (cmd.page !== undefined && cmd.page !== this._currentPage) {
          this._currentPage = cmd.page;
          this._fetchData();
        }
      });
    }
  }

  /**
   * Force le rechargement des données
   */
  public reload() {
    this._fetchData();
  }

  /**
   * Retourne les données actuelles
   */
  public getData(): unknown {
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
    'gouv-source': GouvSource;
  }
}
