import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { subscribeToSource, getDataCache } from '../utils/data-bridge.js';
import { formatValue, FormatType, getColorBySeuil } from '../utils/formatters.js';
import { computeAggregation } from '../utils/aggregations.js';

/**
 * <gouv-kpi> - Widget d'indicateur chiffré
 *
 * Affiche une valeur numérique mise en avant, style "chiffre clé".
 * Se connecte à une source de données via son ID.
 *
 * @example
 * <gouv-kpi
 *   source="sites"
 *   valeur="avg:score_rgaa"
 *   label="Score RGAA moyen"
 *   format="pourcentage"
 *   seuil-vert="80"
 *   seuil-orange="50">
 * </gouv-kpi>
 */
@customElement('gouv-kpi')
export class GouvKpi extends LitElement {
  /**
   * ID de la source de données à écouter
   */
  @property({ type: String })
  source = '';

  /**
   * Expression pour la valeur à afficher (ex: "total", "avg:score_rgaa", "count:statut:actif")
   */
  @property({ type: String })
  valeur = '';

  /**
   * Libellé affiché sous le chiffre
   */
  @property({ type: String })
  label = '';

  /**
   * Description détaillée pour l'accessibilité
   */
  @property({ type: String })
  description = '';

  /**
   * Classe d'icône (ex: ri-global-line)
   */
  @property({ type: String })
  icone = '';

  /**
   * Format d'affichage: nombre, pourcentage, euro, decimal
   */
  @property({ type: String })
  format: FormatType = 'nombre';

  /**
   * Expression pour la tendance (ex: "+3.2")
   */
  @property({ type: String })
  tendance = '';

  /**
   * Seuil au-dessus duquel la valeur est verte
   */
  @property({ type: Number, attribute: 'seuil-vert' })
  seuilVert?: number;

  /**
   * Seuil au-dessus duquel la valeur est orange
   */
  @property({ type: Number, attribute: 'seuil-orange' })
  seuilOrange?: number;

  /**
   * Couleur forcée: vert, orange, rouge, bleu
   */
  @property({ type: String })
  couleur: 'vert' | 'orange' | 'rouge' | 'bleu' | '' = '';

  @state()
  private _loading = false;

  @state()
  private _data: unknown = null;

  @state()
  private _error: Error | null = null;

  private _unsubscribe: (() => void) | null = null;

  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }

  static styles = css`
    /* Styles injectés via Light DOM, utilise les classes DSFR */
  `;

  connectedCallback() {
    super.connectedCallback();
    this._subscribeToSource();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('source')) {
      this._subscribeToSource();
    }
  }

  private _subscribeToSource() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }

    if (!this.source) {
      return;
    }

    // Récupère les données déjà en cache
    const cachedData = getDataCache(this.source);
    if (cachedData !== undefined) {
      this._data = cachedData;
    }

    this._unsubscribe = subscribeToSource(this.source, {
      onLoaded: (data) => {
        this._data = data;
        this._loading = false;
        this._error = null;
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

  private _computeValue(): number | string | null {
    if (!this._data || !this.valeur) {
      return null;
    }

    return computeAggregation(this._data, this.valeur);
  }

  private _getColor(): 'vert' | 'orange' | 'rouge' | 'bleu' {
    if (this.couleur) {
      return this.couleur;
    }

    const value = this._computeValue();
    if (typeof value !== 'number') {
      return 'bleu';
    }

    return getColorBySeuil(value, this.seuilVert, this.seuilOrange);
  }

  private _getTendanceInfo(): { value: number; direction: 'up' | 'down' | 'stable' } | null {
    if (!this.tendance || !this._data) {
      return null;
    }

    const tendanceValue = computeAggregation(this._data, this.tendance);
    if (typeof tendanceValue !== 'number') {
      return null;
    }

    return {
      value: tendanceValue,
      direction: tendanceValue > 0 ? 'up' : tendanceValue < 0 ? 'down' : 'stable'
    };
  }

  private _getColorClass(): string {
    const color = this._getColor();
    const colorClasses: Record<string, string> = {
      vert: 'gouv-kpi--success',
      orange: 'gouv-kpi--warning',
      rouge: 'gouv-kpi--error',
      bleu: 'gouv-kpi--info'
    };
    return colorClasses[color] || colorClasses.bleu;
  }

  private _getAriaLabel(): string {
    if (this.description) {
      return this.description;
    }

    const value = this._computeValue();
    const formattedValue = formatValue(value as number, this.format);
    return `${this.label}: ${formattedValue}`;
  }

  render() {
    const value = this._computeValue();
    const formattedValue = formatValue(value as number, this.format);
    const colorClass = this._getColorClass();
    const tendance = this._getTendanceInfo();

    return html`
      <div
        class="gouv-kpi ${colorClass}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._loading ? html`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._error ? html`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : html`
          <div class="gouv-kpi__content">
            ${this.icone ? html`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            ` : ''}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${formattedValue}</span>
              ${tendance ? html`
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${tendance.direction}" aria-label="${tendance.value > 0 ? 'en hausse' : tendance.value < 0 ? 'en baisse' : 'stable'}">
                  ${tendance.direction === 'up' ? '↑' : tendance.direction === 'down' ? '↓' : '→'}
                  ${Math.abs(tendance.value).toFixed(1)}%
                </span>
              ` : ''}
            </div>
            <span class="gouv-kpi__label">${this.label}</span>
          </div>
        `}
      </div>
      <style>
        .gouv-kpi {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          background: var(--background-default-grey);
          border-radius: 0.25rem;
          border-left: 4px solid var(--border-default-grey);
          min-height: 120px;
        }

        .gouv-kpi--success {
          border-left-color: var(--background-flat-success);
        }

        .gouv-kpi--warning {
          border-left-color: var(--background-flat-warning);
        }

        .gouv-kpi--error {
          border-left-color: var(--background-flat-error);
        }

        .gouv-kpi--info {
          border-left-color: var(--background-flat-info);
        }

        .gouv-kpi__content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .gouv-kpi__icon {
          font-size: 1.5rem;
          color: var(--text-mention-grey);
        }

        .gouv-kpi__value-wrapper {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .gouv-kpi__value {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          color: var(--text-title-grey);
        }

        .gouv-kpi__tendance {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .gouv-kpi__tendance--up {
          color: var(--text-default-success);
        }

        .gouv-kpi__tendance--down {
          color: var(--text-default-error);
        }

        .gouv-kpi__tendance--stable {
          color: var(--text-mention-grey);
        }

        .gouv-kpi__label {
          font-size: 0.875rem;
          color: var(--text-mention-grey);
        }

        .gouv-kpi__loading,
        .gouv-kpi__error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-mention-grey);
          font-size: 0.875rem;
        }

        .gouv-kpi__error {
          color: var(--text-default-error);
        }
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-kpi': GouvKpi;
  }
}
