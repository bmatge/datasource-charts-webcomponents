import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { subscribeToSource, getDataCache } from '../utils/data-bridge.js';

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
export class GouvDatalist extends LitElement {
  /**
   * ID de la source de données
   */
  @property({ type: String })
  source = '';

  /**
   * Définition des colonnes: "cle:Label, cle2:Label2"
   */
  @property({ type: String })
  colonnes = '';

  /**
   * Afficher un champ de recherche
   */
  @property({ type: Boolean })
  recherche = false;

  /**
   * Colonnes filtrables: "ministere,statut"
   */
  @property({ type: String })
  filtres = '';

  /**
   * Tri par défaut: "score:desc"
   */
  @property({ type: String })
  tri = '';

  /**
   * Nombre d'éléments par page (0 = pas de pagination)
   */
  @property({ type: Number })
  pagination = 0;

  /**
   * Formats d'export disponibles: "csv"
   */
  @property({ type: String })
  export = '';

  @state()
  private _loading = false;

  @state()
  private _data: Record<string, unknown>[] = [];

  @state()
  private _error: Error | null = null;

  @state()
  private _searchQuery = '';

  @state()
  private _activeFilters: Record<string, string> = {};

  @state()
  private _sort: SortState | null = null;

  @state()
  private _currentPage = 1;

  private _unsubscribe: (() => void) | null = null;

  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }

  static styles = css``;

  connectedCallback() {
    super.connectedCallback();
    this._initSort();
    this._subscribeToSource();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('source')) {
      this._subscribeToSource();
    }
    if (changedProperties.has('tri')) {
      this._initSort();
    }
  }

  private _initSort() {
    if (this.tri) {
      const [key, direction] = this.tri.split(':');
      this._sort = { key, direction: (direction as 'asc' | 'desc') || 'asc' };
    }
  }

  private _subscribeToSource() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }

    if (!this.source) return;

    const cachedData = getDataCache(this.source);
    if (Array.isArray(cachedData)) {
      this._data = cachedData as Record<string, unknown>[];
    }

    this._unsubscribe = subscribeToSource(this.source, {
      onLoaded: (data) => {
        this._data = Array.isArray(data) ? data as Record<string, unknown>[] : [];
        this._loading = false;
        this._error = null;
        this._currentPage = 1;
      },
      onLoading: () => {
        this._loading = true;
      },
      onError: (error) => {
        this._error = error;
        this._loading = false;
      }
    });
  }

  private _parseColumns(): ColumnDef[] {
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

  private _getFilteredData(): Record<string, unknown>[] {
    let result = [...this._data];

    // Recherche textuelle
    if (this._searchQuery) {
      const query = this._searchQuery.toLowerCase();
      result = result.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(query)
        )
      );
    }

    // Filtres actifs
    Object.entries(this._activeFilters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => String(item[key]) === value);
      }
    });

    // Tri
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
    const filtered = this._getFilteredData();

    if (!this.pagination || this.pagination <= 0) {
      return filtered;
    }

    const start = (this._currentPage - 1) * this.pagination;
    return filtered.slice(start, start + this.pagination);
  }

  private _getTotalPages(): number {
    if (!this.pagination || this.pagination <= 0) return 1;
    return Math.ceil(this._getFilteredData().length / this.pagination);
  }

  private _handleSearch(e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchQuery = input.value;
    this._currentPage = 1;
  }

  private _handleFilter(key: string, e: Event) {
    const select = e.target as HTMLSelectElement;
    this._activeFilters = { ...this._activeFilters, [key]: select.value };
    this._currentPage = 1;
  }

  private _handleSort(key: string) {
    if (this._sort?.key === key) {
      this._sort = {
        key,
        direction: this._sort.direction === 'asc' ? 'desc' : 'asc'
      };
    } else {
      this._sort = { key, direction: 'asc' };
    }
  }

  private _handlePageChange(page: number) {
    this._currentPage = page;
  }

  private _exportCsv() {
    const columns = this._parseColumns();
    const data = this._getFilteredData();

    const header = columns.map(c => c.label).join(';');
    const rows = data.map(item =>
      columns.map(c => {
        const val = item[c.key];
        const str = String(val ?? '');
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

  private _formatCellValue(value: unknown): string {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
    return String(value);
  }

  render() {
    const columns = this._parseColumns();
    const filterableColumns = this._getFilterableColumns();
    const paginatedData = this._getPaginatedData();
    const totalPages = this._getTotalPages();
    const totalFiltered = this._getFilteredData().length;

    return html`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        <!-- Barre de recherche et filtres -->
        <div class="gouv-datalist__controls">
          ${this.recherche ? html`
            <div class="fr-search-bar" role="search">
              <label class="fr-label" for="search-${this.source}">Rechercher</label>
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
          ` : ''}

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

        <!-- État de chargement -->
        ${this._loading ? html`
          <div class="gouv-datalist__loading" aria-live="polite">
            Chargement des données...
          </div>
        ` : this._error ? html`
          <div class="gouv-datalist__error" aria-live="assertive">
            Erreur: ${this._error.message}
          </div>
        ` : html`
          <!-- Compteur de résultats -->
          <p class="fr-text--sm" aria-live="polite">
            ${totalFiltered} résultat${totalFiltered > 1 ? 's' : ''}
            ${this._searchQuery || Object.values(this._activeFilters).some(v => v) ? ' (filtré)' : ''}
          </p>

          <!-- Tableau -->
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
                      <td>${this._formatCellValue(item[col.key])}</td>
                    `)}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          ${this.pagination > 0 && totalPages > 1 ? html`
            <nav class="fr-pagination" aria-label="Pagination">
              <ul class="fr-pagination__list">
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--first"
                    ?disabled="${this._currentPage === 1}"
                    @click="${() => this._handlePageChange(1)}"
                    aria-label="Première page"
                    type="button"
                  >
                    Première page
                  </button>
                </li>
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--prev"
                    ?disabled="${this._currentPage === 1}"
                    @click="${() => this._handlePageChange(this._currentPage - 1)}"
                    aria-label="Page précédente"
                    type="button"
                  >
                    Page précédente
                  </button>
                </li>
                ${this._renderPageNumbers(totalPages)}
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--next"
                    ?disabled="${this._currentPage === totalPages}"
                    @click="${() => this._handlePageChange(this._currentPage + 1)}"
                    aria-label="Page suivante"
                    type="button"
                  >
                    Page suivante
                  </button>
                </li>
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--last"
                    ?disabled="${this._currentPage === totalPages}"
                    @click="${() => this._handlePageChange(totalPages)}"
                    aria-label="Dernière page"
                    type="button"
                  >
                    Dernière page
                  </button>
                </li>
              </ul>
            </nav>
          ` : ''}
        `}
      </div>

      <style>
        .gouv-datalist__controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: flex-end;
          margin-bottom: 1rem;
        }

        .gouv-datalist__controls .fr-search-bar {
          flex: 1;
          min-width: 200px;
        }

        .gouv-datalist__controls .fr-select-group {
          min-width: 150px;
        }

        .gouv-datalist__sort-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: inherit;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .gouv-datalist__sort-btn:hover {
          text-decoration: underline;
        }

        .gouv-datalist__loading,
        .gouv-datalist__error {
          padding: 2rem;
          text-align: center;
        }

        .gouv-datalist__error {
          color: var(--text-default-error);
        }

        .gouv-datalist__empty {
          text-align: center;
          color: var(--text-mention-grey);
          padding: 2rem !important;
        }
      </style>
    `;
  }

  private _renderPageNumbers(totalPages: number) {
    const pages: number[] = [];
    const current = this._currentPage;

    // Affiche au max 5 numéros de page autour de la page courante
    for (let i = Math.max(1, current - 2); i <= Math.min(totalPages, current + 2); i++) {
      pages.push(i);
    }

    return pages.map(page => html`
      <li>
        <button
          class="fr-pagination__link ${page === current ? 'fr-pagination__link--active' : ''}"
          @click="${() => this._handlePageChange(page)}"
          aria-current="${page === current ? 'page' : 'false'}"
          type="button"
        >
          ${page}
        </button>
      </li>
    `);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-datalist': GouvDatalist;
  }
}
