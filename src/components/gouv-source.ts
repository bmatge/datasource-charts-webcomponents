import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getByPath } from '../utils/json-path.js';
import { sendWidgetBeacon } from '../utils/beacon.js';
import { getProxiedUrl, isAuthenticated } from '@gouv-widgets/shared';
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
 * <gouv-source> - Connecteur de donnees
 *
 * Composant invisible qui se connecte a une API REST, recupere les donnees,
 * les normalise et les diffuse via des evenements custom.
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
  @property({ type: String })
  url = '';

  @property({ type: String })
  method: 'GET' | 'POST' = 'GET';

  @property({ type: String })
  headers = '';

  @property({ type: String })
  params = '';

  @property({ type: Number })
  refresh = 0;

  @property({ type: String })
  transform = '';

  @property({ type: Boolean })
  paginate = false;

  @property({ type: Number, attribute: 'page-size' })
  pageSize = 20;

  @property({ type: Number, attribute: 'cache-ttl' })
  cacheTtl = 3600;

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

  createRenderRoot() {
    return this;
  }

  render() {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-source');
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
    if (!this.url) return;

    if (!this.id) {
      console.warn('gouv-source: attribut "id" requis pour identifier la source');
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

      if (this.paginate && json.meta) {
        setDataMeta(this.id, {
          page: json.meta.page ?? this._currentPage,
          pageSize: json.meta.page_size ?? this.pageSize,
          total: json.meta.total ?? 0
        });
      }

      if (this.transform) {
        this._data = getByPath(json, this.transform);
      } else if (this.paginate && json.data && !this.transform) {
        this._data = json.data;
      } else {
        this._data = json;
      }

      dispatchDataLoaded(this.id, this._data);

      // Cache data server-side in DB mode (fire-and-forget)
      if (this.cacheTtl > 0 && isAuthenticated()) {
        this._putCache(this._data).catch(() => {});
      }
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return;
      }

      // Try server cache fallback in DB mode
      if (this.cacheTtl > 0 && isAuthenticated()) {
        const cached = await this._getCache();
        if (cached) {
          this._data = cached;
          dispatchDataLoaded(this.id, this._data);
          this.dispatchEvent(new CustomEvent('cache-fallback', { detail: { sourceId: this.id } }));
          return;
        }
      }

      this._error = error as Error;
      dispatchDataError(this.id, this._error);
      console.error(`gouv-source[${this.id}]: Erreur de chargement`, error);
    } finally {
      this._loading = false;
    }
  }

  private _buildUrl(): string {
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

    if (this.headers) {
      try {
        options.headers = JSON.parse(this.headers);
      } catch (e) {
        console.warn('gouv-source: headers invalides (JSON attendu)', e);
      }
    }

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

  private async _putCache(data: unknown): Promise<void> {
    const recordCount = Array.isArray(data) ? data.length : 1;
    await fetch(`/api/cache/${encodeURIComponent(this.id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ data, recordCount, ttlSeconds: this.cacheTtl }),
    });
  }

  private async _getCache(): Promise<unknown | null> {
    try {
      const res = await fetch(`/api/cache/${encodeURIComponent(this.id)}`, {
        credentials: 'include',
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data ?? null;
    } catch {
      return null;
    }
  }

  public reload() {
    this._fetchData();
  }

  public getData(): unknown {
    return this._data;
  }

  public isLoading(): boolean {
    return this._loading;
  }

  public getError(): Error | null {
    return this._error;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-source': GouvSource;
  }
}
