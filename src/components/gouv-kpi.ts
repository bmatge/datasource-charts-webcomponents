import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SourceSubscriberMixin } from '../utils/source-subscriber.js';
import { formatValue, FormatType, getColorBySeuil } from '../utils/formatters.js';
import { computeAggregation } from '../utils/aggregations.js';
import { sendWidgetBeacon } from '../utils/beacon.js';

type KpiColor = 'vert' | 'orange' | 'rouge' | 'bleu';

const COLOR_CLASSES: Record<KpiColor, string> = {
  vert: 'gouv-kpi--success',
  orange: 'gouv-kpi--warning',
  rouge: 'gouv-kpi--error',
  bleu: 'gouv-kpi--info',
};

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
export class GouvKpi extends SourceSubscriberMixin(LitElement) {
  @property({ type: String })
  source = '';

  /** Expression pour la valeur à afficher (ex: "total", "avg:score_rgaa") */
  @property({ type: String })
  valeur = '';

  /** Libellé affiché sous le chiffre */
  @property({ type: String })
  label = '';

  /** Description détaillée pour l'accessibilité */
  @property({ type: String })
  description = '';

  /** Classe d'icône (ex: ri-global-line) */
  @property({ type: String })
  icone = '';

  /** Format d'affichage: nombre, pourcentage, euro, decimal */
  @property({ type: String })
  format: FormatType = 'nombre';

  /** Expression pour la tendance (ex: "+3.2") */
  @property({ type: String })
  tendance = '';

  /** Seuil au-dessus duquel la valeur est verte */
  @property({ type: Number, attribute: 'seuil-vert' })
  seuilVert?: number;

  /** Seuil au-dessus duquel la valeur est orange */
  @property({ type: Number, attribute: 'seuil-orange' })
  seuilOrange?: number;

  /** Couleur forcée: vert, orange, rouge, bleu */
  @property({ type: String })
  couleur: KpiColor | '' = '';

  /** Largeur en colonnes DSFR (1-12). Significatif uniquement dans un <gouv-kpi-group>. */
  @property({ type: Number, reflect: true })
  col?: number;

  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-kpi');
  }

  static styles = css``;

  private _computeValue(): number | string | null {
    if (!this._sourceData || !this.valeur) return null;
    return computeAggregation(this._sourceData, this.valeur);
  }

  private _getColor(): KpiColor {
    if (this.couleur) return this.couleur;

    const value = this._computeValue();
    if (typeof value !== 'number') return 'bleu';

    return getColorBySeuil(value, this.seuilVert, this.seuilOrange);
  }

  private _getTendanceInfo(): { value: number; direction: 'up' | 'down' | 'stable' } | null {
    if (!this.tendance || !this._sourceData) return null;

    const tendanceValue = computeAggregation(this._sourceData, this.tendance);
    if (typeof tendanceValue !== 'number') return null;

    return {
      value: tendanceValue,
      direction: tendanceValue > 0 ? 'up' : tendanceValue < 0 ? 'down' : 'stable',
    };
  }

  private _getAriaLabel(): string {
    if (this.description) return this.description;

    const value = this._computeValue();
    const formattedValue = formatValue(value as number, this.format);
    let label = `${this.label}: ${formattedValue}`;

    if (typeof value === 'number' && (this.seuilVert !== undefined || this.seuilOrange !== undefined)) {
      const color = this._getColor();
      const stateMap: Record<string, string> = { vert: 'bon', orange: 'attention', rouge: 'critique', bleu: '' };
      const state = stateMap[color];
      if (state) label += `, etat ${state}`;
    }

    return label;
  }

  render() {
    const value = this._computeValue();
    const formattedValue = formatValue(value as number, this.format);
    const colorClass = COLOR_CLASSES[this._getColor()] || COLOR_CLASSES.bleu;
    const tendance = this._getTendanceInfo();

    return html`
      <div
        class="gouv-kpi ${colorClass}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading ? html`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? html`
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
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${tendance.direction}" role="img" aria-label="${tendance.value > 0 ? `en hausse de ${Math.abs(tendance.value).toFixed(1)}%` : tendance.value < 0 ? `en baisse de ${Math.abs(tendance.value).toFixed(1)}%` : 'stable'}">
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
          justify-content: center;
          padding: 1.5rem;
          background: var(--background-default-grey);
          border-radius: 0.25rem;
          border-left: 4px solid var(--border-default-grey);
          min-height: 140px;
          height: 100%;
          box-sizing: border-box;
        }
        .gouv-kpi--success { border-left-color: var(--background-flat-success); }
        .gouv-kpi--warning { border-left-color: var(--background-flat-warning); }
        .gouv-kpi--error { border-left-color: var(--background-flat-error); }
        .gouv-kpi--info { border-left-color: var(--background-flat-info); }
        .gouv-kpi__content { display: flex; flex-direction: column; gap: 0.5rem; }
        .gouv-kpi__icon { font-size: 1.5rem; color: var(--text-mention-grey); }
        .gouv-kpi__value-wrapper { display: flex; align-items: baseline; gap: 0.5rem; }
        .gouv-kpi__value { font-size: 2.5rem; font-weight: 700; line-height: 1; color: var(--text-title-grey); }
        .gouv-kpi__tendance { font-size: 0.875rem; font-weight: 500; }
        .gouv-kpi__tendance--up { color: var(--text-default-success); }
        .gouv-kpi__tendance--down { color: var(--text-default-error); }
        .gouv-kpi__tendance--stable { color: var(--text-mention-grey); }
        .gouv-kpi__label { font-size: 0.875rem; color: var(--text-mention-grey); }
        .gouv-kpi__loading,
        .gouv-kpi__error { display: flex; align-items: center; gap: 0.5rem; color: var(--text-mention-grey); font-size: 0.875rem; }
        .gouv-kpi__error { color: var(--text-default-error); }
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-kpi': GouvKpi;
  }
}
