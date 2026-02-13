import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sendWidgetBeacon } from '../utils/beacon.js';
import {
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading,
  clearDataCache,
  subscribeToSource,
  getDataCache
} from '../utils/data-bridge.js';

type SearchOperator = 'contains' | 'starts' | 'words';

/**
 * <gouv-search> - Recherche textuelle
 *
 * Composant visuel intermediaire qui affiche un champ de recherche DSFR et filtre
 * les donnees avant de les redistribuer aux composants en aval. Se place entre
 * une source/normalize et les facettes/visualisations.
 *
 * Position dans le pipeline :
 * gouv-source -> gouv-normalize -> gouv-search -> gouv-facets -> gouv-display
 *
 * La recherche reduit le jeu de donnees, les facettes affinent ensuite.
 *
 * @example
 * <gouv-search id="searched" source="clean"
 *   fields="Nom_de_l_entreprise, SIRET"
 *   placeholder="Rechercher une entreprise..."
 *   operator="words" count>
 * </gouv-search>
 */
@customElement('gouv-search')
export class GouvSearch extends LitElement {
  /** ID de la source de donnees a ecouter */
  @property({ type: String })
  source = '';

  /** Champs sur lesquels rechercher (virgule-separes). Vide = tous les champs */
  @property({ type: String })
  fields = '';

  /** Placeholder du champ de saisie */
  @property({ type: String })
  placeholder = 'Rechercher\u2026';

  /** Label du champ (accessible) */
  @property({ type: String })
  label = 'Rechercher';

  /** Delai en ms avant declenchement du filtre apres la derniere frappe */
  @property({ type: Number })
  debounce = 300;

  /** Nombre minimum de caracteres avant declenchement */
  @property({ type: Number, attribute: 'min-length' })
  minLength = 0;

  /** Ajoute un champ _highlight a chaque record avec les termes trouves marques en <mark> */
  @property({ type: Boolean })
  highlight = false;

  /** Mode de recherche : contains, starts, words */
  @property({ type: String })
  operator: SearchOperator = 'contains';

  /** Si true, le label est en sr-only (visuellement masque, accessible) */
  @property({ type: Boolean, attribute: 'sr-label' })
  srLabel = false;

  /** Affiche un compteur de resultats sous le champ */
  @property({ type: Boolean })
  count = false;

  @state()
  private _allData: Record<string, unknown>[] = [];

  @state()
  private _filteredData: Record<string, unknown>[] = [];

  @state()
  private _term = '';

  @state()
  private _resultCount = 0;

  private _debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private _unsubscribe: (() => void) | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-search');
    this._initialize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._debounceTimer !== null) {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = null;
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

    const filterAttrs = ['fields', 'operator', 'minLength', 'highlight'];
    const hasFilterChange = filterAttrs.some(attr => changedProperties.has(attr));
    if (hasFilterChange && this._allData.length > 0) {
      this._applyFilter();
    }
  }

  // --- Public methods ---

  /** Efface le champ et restaure toutes les donnees */
  clear() {
    this._term = '';
    const input = this.querySelector('input');
    if (input) input.value = '';
    this._applyFilter();
  }

  /** Declenche une recherche programmatique */
  search(term: string) {
    this._term = term;
    const input = this.querySelector('input');
    if (input) input.value = term;
    this._applyFilter();
  }

  /** Retourne les donnees actuellement filtrees */
  getData(): Record<string, unknown>[] {
    return this._filteredData;
  }

  /** Remplace le jeu de donnees source */
  setData(data: Record<string, unknown>[]) {
    this._allData = Array.isArray(data) ? data : [];
    this._applyFilter();
  }

  // --- Private implementation ---

  private _initialize() {
    if (!this.id) {
      console.warn('gouv-search: attribut "id" requis');
      return;
    }

    if (!this.source) {
      console.warn('gouv-search: attribut "source" requis');
      return;
    }

    if (this._unsubscribe) {
      this._unsubscribe();
    }

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
    this._allData = Array.isArray(data) ? data : [];
    this._applyFilter();
  }

  _applyFilter() {
    const term = this._term;

    if (!term || term.length < this.minLength) {
      this._filteredData = [...this._allData];
    } else {
      const fields = this._getFields();
      const op = this.operator || 'contains';
      const normTerm = this._normalize(term);

      this._filteredData = this._allData.filter(record =>
        this._matchRecord(record, normTerm, fields, op)
      );
    }

    if (this.highlight && term && term.length >= this.minLength) {
      this._filteredData = this._filteredData.map(r =>
        this._addHighlight(r, term)
      );
    }

    this._resultCount = this._filteredData.length;
    this._dispatch();
  }

  _matchRecord(
    record: Record<string, unknown>,
    normTerm: string,
    fields: string[],
    operator: SearchOperator
  ): boolean {
    const searchFields = fields.length > 0
      ? fields
      : Object.keys(record).filter(k => !k.startsWith('_'));

    switch (operator) {
      case 'starts':
        return searchFields.some(f => {
          const words = this._normalize(String(record[f] ?? '')).split(/\s+/);
          return words.some(w => w.startsWith(normTerm));
        });

      case 'words': {
        const queryWords = normTerm.split(/\s+/).filter(Boolean);
        return queryWords.every(qw =>
          searchFields.some(f =>
            this._normalize(String(record[f] ?? '')).includes(qw)
          )
        );
      }

      case 'contains':
      default:
        return searchFields.some(f =>
          this._normalize(String(record[f] ?? '')).includes(normTerm)
        );
    }
  }

  _normalize(str: string): string {
    return String(str)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  _getFields(): string[] {
    if (!this.fields) return [];
    return this.fields.split(',').map(f => f.trim()).filter(Boolean);
  }

  _addHighlight(record: Record<string, unknown>, term: string): Record<string, unknown> {
    const clone = { ...record };
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(' + escaped + ')', 'gi');
    const fields = this._getFields();
    const searchIn = fields.length > 0
      ? fields
      : Object.keys(record).filter(k => typeof record[k] === 'string');

    const highlights: string[] = [];
    searchIn.forEach(f => {
      if (typeof record[f] === 'string') {
        highlights.push((record[f] as string).replace(regex, '<mark>$1</mark>'));
      }
    });
    clone._highlight = highlights.join(' \u2026 ');
    return clone;
  }

  private _onInput(value: string) {
    this._term = value;
    if (this._debounceTimer !== null) {
      clearTimeout(this._debounceTimer);
    }
    this._debounceTimer = setTimeout(() => {
      this._debounceTimer = null;
      this._applyFilter();
    }, this.debounce);
  }

  private _onSubmit() {
    if (this._debounceTimer !== null) {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = null;
    }
    this._applyFilter();
  }

  private _dispatch() {
    if (!this.id) return;

    dispatchDataLoaded(this.id, this._filteredData);

    document.dispatchEvent(new CustomEvent('gouv-search-change', {
      bubbles: true,
      composed: true,
      detail: {
        sourceId: this.id,
        term: this._term,
        count: this._filteredData.length
      }
    }));
  }

  render() {
    const id = this.id || 'search';
    const labelClass = this.srLabel ? 'fr-label sr-only' : 'fr-label';

    return html`
      <div class="fr-search-bar" role="search" aria-label="${this.label}">
        <label class="${labelClass}" for="gouv-search-${id}">${this.label}</label>
        <input class="fr-input"
          type="search"
          id="gouv-search-${id}"
          placeholder="${this.placeholder}"
          autocomplete="off"
          .value="${this._term}"
          @input="${(e: Event) => this._onInput((e.target as HTMLInputElement).value)}"
          @search="${(e: Event) => { this._term = (e.target as HTMLInputElement).value; this._onSubmit(); }}"
          @keydown="${(e: KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); this._onSubmit(); } }}">
        <button class="fr-btn" title="Rechercher" type="button"
          @click="${(e: Event) => { e.preventDefault(); this._onSubmit(); }}">
          Rechercher
        </button>
      </div>
      ${this.count ? html`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount !== 1 ? 's' : ''}
        </p>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-search': GouvSearch;
  }
}
