import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SourceSubscriberMixin } from '../utils/source-subscriber.js';

interface ColumnDef {
  key: string;
  label: string;
}

interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}

/**
 * <gouv-datalist> - Liste filtrable et cherchable
 *
 * Affiche un tableau de données avec recherche, filtres et pagination.
 *
 * @example
 * <gouv-datalist
 *   source="sites"
 *   colonnes="nom:Nom du site, ministere:Ministère, score_rgaa:RGAA"
 *   recherche="true"
 *   filtres="ministere,statut"
 *   tri="score_rgaa:desc"
 *   pagination="10">
 * </gouv-datalist>
 */
@customElement('gouv-datalist')
export class GouvDatalist extends SourceSubscriberMixin(LitElement) {
  @property({ type: String })
  source = '';

  /** Définition des colonnes: "cle:Label, cle2:Label2" */
  @property({ type: String })
  colonnes = '';

  /** Afficher un champ de recherche */
  @property({ type: Boolean })
  recherche = false;

  /** Colonnes filtrables: "ministere,statut" */
  @property({ type: String })
  filtres = '';

  /** Tri par défaut: "score:desc" */
  @property({ type: String })
  tri = '';

  /** Nombre d'éléments par page (0 = pas de pagination) */
  @property({ type: Number })
  pagination = 0;

  /** Formats d'export disponibles: "csv" */
  @property({ type: String })
  export = '';

  @state()
  private _data: Record<string, unknown>[] = [];

  @state()
  private _searchQuery = '';

  @state()
  private _activeFilters: Record<string, string> = {};

  @state()
  private _sort: SortState | null = null;

  @state()
  private _currentPage = 1;

  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }

  static styles = css``;

  connectedCallback() {
    super.connectedCallback();
    this._initSort();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('tri')) {
      this._initSort();
    }
  }

  onSourceData(data: unknown): void {
    this._data = Array.isArray(data) ? data as Record<string, unknown>[] : [];
    this._currentPage = 1;
  }

  // --- Parsing ---

  parseColumns(): ColumnDef[] {
    if (!this.colonnes) return [];
    return this.colonnes.split(',').map(col => {
      const [key, label] = col.trim().split(':');
      return { key: key.trim(), label: label?.trim() || key.trim() };
    });
  }

  private _getFilterableColumns(): string[] {
    if (!this.filtres) return [];
    return this.filtres.split(',').map(f => f.trim());
  }

  private _initSort() {
    if (this.tri) {
      const [key, direction] = this.tri.split(':');
      this._sort = { key, direction: (direction as 'asc' | 'desc') || 'asc' };
    }
  }

  // --- Data processing ---

  private _getUniqueValues(key: string): string[] {
    const values = new Set<string>();
    this._data.forEach(item => {
      const val = item[key];
      if (val !== undefined && val !== null) {
        values.add(String(val));
      }
    });
    return Array.from(values).sort();
  }

  getFilteredData(): Record<string, unknown>[] {
    let result = [...this._data];

    if (this._searchQuery) {
      const query = this._searchQuery.toLowerCase();
      result = result.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(query)
        )
      );
    }

    Object.entries(this._activeFilters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => String(item[key]) === value);
      }
    });

    if (this._sort) {
      const { key, direction } = this._sort;
      result.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        const comparison = typeof aVal === 'number' && typeof bVal === 'number'
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal), 'fr');

        return direction === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }

  private _getPaginatedData(): Record<string, unknown>[] {
    const filtered = this.getFilteredData();
    if (!this.pagination || this.pagination <= 0) return filtered;

    const start = (this._currentPage - 1) * this.pagination;
    return filtered.slice(start, start + this.pagination);
  }

  private _getTotalPages(): number {
    if (!this.pagination || this.pagination <= 0) return 1;
    return Math.ceil(this.getFilteredData().length / this.pagination);
  }

  // --- Event handlers ---

  private _handleSearch(e: Event) {
    this._searchQuery = (e.target as HTMLInputElement).value;
    this._currentPage = 1;
  }

  private _handleFilter(key: string, e: Event) {
    this._activeFilters = { ...this._activeFilters, [key]: (e.target as HTMLSelectElement).value };
    this._currentPage = 1;
  }

  private _handleSort(key: string) {
    if (this._sort?.key === key) {
      this._sort = { key, direction: this._sort.direction === 'asc' ? 'desc' : 'asc' };
    } else {
      this._sort = { key, direction: 'asc' };
    }
  }

  private _handlePageChange(page: number) {
    this._currentPage = page;
  }

  // --- Export ---

  private _exportCsv() {
    const columns = this.parseColumns();
    const data = this.getFilteredData();

    const header = columns.map(c => c.label).join(';');
    const rows = data.map(item =>
      columns.map(c => {
        const str = String(item[c.key] ?? '');
        return str.includes(';') || str.includes('"')
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      }).join(';')
    );

    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // --- Cell formatting ---

  formatCellValue(value: unknown): string {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
    return String(value);
  }

  // --- Render sub-templates ---

  private _renderFilters(columns: ColumnDef[], filterableColumns: string[]) {
    if (filterableColumns.length === 0) return '';

    return html`
      <div class="gouv-datalist__filters">
        ${filterableColumns.map(key => {
          const column = columns.find(c => c.key === key);
          const label = column?.label || key;
          const values = this._getUniqueValues(key);

          return html`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${key}">${label}</label>
              <select
                class="fr-select"
                id="filter-${key}"
                @change="${(e: Event) => this._handleFilter(key, e)}"
              >
                <option value="">Tous</option>
                ${values.map(val => html`
                  <option value="${val}" ?selected="${this._activeFilters[key] === val}">${val}</option>
                `)}
              </select>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderToolbar() {
    if (!this.recherche && !this.export?.includes('csv')) return '';

    return html`
      <div class="gouv-datalist__toolbar">
        ${this.recherche ? html`
          <div class="fr-search-bar" role="search">
            <label class="fr-label fr-sr-only" for="search-${this.source}">Rechercher</label>
            <input
              class="fr-input"
              type="search"
              id="search-${this.source}"
              placeholder="Rechercher..."
              .value="${this._searchQuery}"
              @input="${this._handleSearch}"
            />
            <button class="fr-btn" title="Rechercher" type="button">
              <span class="fr-icon-search-line" aria-hidden="true"></span>
            </button>
          </div>
        ` : html`<div></div>`}

        ${this.export?.includes('csv') ? html`
          <button
            class="fr-btn fr-btn--secondary fr-btn--sm"
            @click="${this._exportCsv}"
            type="button"
          >
            <span class="fr-icon-download-line fr-icon--sm" aria-hidden="true"></span>
            Exporter CSV
          </button>
        ` : ''}
      </div>
    `;
  }

  private _renderTable(columns: ColumnDef[], paginatedData: Record<string, unknown>[]) {
    return html`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${columns.map(col => html`
                <th scope="col">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(col.key)}"
                    aria-label="Trier par ${col.label}"
                    type="button"
                  >
                    ${col.label}
                    ${this._sort?.key === col.key ? html`
                      <span aria-hidden="true">${this._sort.direction === 'asc' ? '↑' : '↓'}</span>
                    ` : ''}
                  </button>
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${paginatedData.length === 0 ? html`
              <tr>
                <td colspan="${columns.length}" class="gouv-datalist__empty">
                  Aucune donnée à afficher
                </td>
              </tr>
            ` : paginatedData.map(item => html`
              <tr>
                ${columns.map(col => html`
                  <td>${this.formatCellValue(item[col.key])}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  private _renderPagination(totalPages: number) {
    if (this.pagination <= 0 || totalPages <= 1) return '';

    const pages: number[] = [];
    for (let i = Math.max(1, this._currentPage - 2); i <= Math.min(totalPages, this._currentPage + 2); i++) {
      pages.push(i);
    }

    return html`
      <nav class="fr-pagination" aria-label="Pagination">
        <ul class="fr-pagination__list">
          <li>
            <button class="fr-pagination__link fr-pagination__link--first"
              ?disabled="${this._currentPage === 1}"
              @click="${() => this._handlePageChange(1)}"
              aria-label="Première page" type="button">Première page</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--prev"
              ?disabled="${this._currentPage === 1}"
              @click="${() => this._handlePageChange(this._currentPage - 1)}"
              aria-label="Page précédente" type="button">Page précédente</button>
          </li>
          ${pages.map(page => html`
            <li>
              <button
                class="fr-pagination__link ${page === this._currentPage ? 'fr-pagination__link--active' : ''}"
                @click="${() => this._handlePageChange(page)}"
                aria-current="${page === this._currentPage ? 'page' : 'false'}"
                type="button"
              >${page}</button>
            </li>
          `)}
          <li>
            <button class="fr-pagination__link fr-pagination__link--next"
              ?disabled="${this._currentPage === totalPages}"
              @click="${() => this._handlePageChange(this._currentPage + 1)}"
              aria-label="Page suivante" type="button">Page suivante</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--last"
              ?disabled="${this._currentPage === totalPages}"
              @click="${() => this._handlePageChange(totalPages)}"
              aria-label="Dernière page" type="button">Dernière page</button>
          </li>
        </ul>
      </nav>
    `;
  }

  // --- Main render ---

  render() {
    const columns = this.parseColumns();
    const filterableColumns = this._getFilterableColumns();
    const paginatedData = this._getPaginatedData();
    const totalPages = this._getTotalPages();
    const totalFiltered = this.getFilteredData().length;

    return html`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        ${this._renderFilters(columns, filterableColumns)}
        ${this._renderToolbar()}

        ${this._sourceLoading ? html`
          <div class="gouv-datalist__loading" aria-live="polite">Chargement des données...</div>
        ` : this._sourceError ? html`
          <div class="gouv-datalist__error" aria-live="assertive">Erreur: ${this._sourceError.message}</div>
        ` : html`
          <p class="fr-text--sm" aria-live="polite">
            ${totalFiltered} résultat${totalFiltered > 1 ? 's' : ''}
            ${this._searchQuery || Object.values(this._activeFilters).some(v => v) ? ' (filtré)' : ''}
          </p>
          ${this._renderTable(columns, paginatedData)}
          ${this._renderPagination(totalPages)}
        `}
      </div>

      <style>
        .gouv-datalist__filters {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .gouv-datalist__filters .fr-select-group { margin-bottom: 0; }
        .gouv-datalist__toolbar {
          display: flex; flex-wrap: wrap; gap: 1rem;
          align-items: center; justify-content: space-between; margin-bottom: 1rem;
        }
        .gouv-datalist__toolbar .fr-search-bar { flex: 1; min-width: 200px; max-width: 400px; }
        @media (max-width: 576px) {
          .gouv-datalist__filters { grid-template-columns: 1fr; }
          .gouv-datalist__toolbar { flex-direction: column; align-items: stretch; }
          .gouv-datalist__toolbar .fr-search-bar { max-width: none; }
        }
        .gouv-datalist__sort-btn {
          background: none; border: none; cursor: pointer;
          font-weight: 700; font-size: inherit; font-family: inherit;
          display: flex; align-items: center; gap: 0.25rem;
        }
        .gouv-datalist__sort-btn:hover { text-decoration: underline; }
        .gouv-datalist__loading,
        .gouv-datalist__error { padding: 2rem; text-align: center; }
        .gouv-datalist__error { color: var(--text-default-error); }
        .gouv-datalist__empty { text-align: center; color: var(--text-mention-grey); padding: 2rem !important; }
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-datalist': GouvDatalist;
  }
}
