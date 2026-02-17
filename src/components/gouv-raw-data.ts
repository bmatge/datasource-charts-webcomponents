import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SourceSubscriberMixin } from '../utils/source-subscriber.js';
import { sendWidgetBeacon } from '../utils/beacon.js';

let autoIdCounter = 0;

/**
 * <gouv-raw-data> - Composant d'accessibilite pour telechargement CSV
 *
 * Propose un bouton de telechargement des donnees brutes (CSV) associees
 * a un composant de visualisation (graphique, tableau, KPI...).
 *
 * Via l'attribut `for`, il pose automatiquement `aria-describedby` sur
 * l'element cible, permettant aux lecteurs d'ecran d'indiquer qu'un
 * lien de telechargement est disponible.
 *
 * @example
 * <gouv-dsfr-chart id="mon-graph" source="data" type="bar"
 *   label-field="region" value-field="total">
 * </gouv-dsfr-chart>
 * <gouv-raw-data for="mon-graph" source="data"></gouv-raw-data>
 */
@customElement('gouv-raw-data')
export class GouvRawData extends SourceSubscriberMixin(LitElement) {

  @property({ type: String })
  source = '';

  @property({ type: String, attribute: 'for' })
  for = '';

  @property({ type: String })
  filename = 'donnees.csv';

  @property({ type: String })
  label = 'Telecharger les donnees (CSV)';

  @property({ type: String, attribute: 'button-label' })
  buttonLabel = '';

  @property({ type: Boolean, attribute: 'no-auto-aria' })
  noAutoAria = false;

  private _previousForTarget: Element | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    sendWidgetBeacon('gouv-raw-data');
    this._ensureId();
    this._applyAria();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeAria();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('for') || changedProperties.has('noAutoAria')) {
      this._removeAria();
      this._applyAria();
    }
  }

  private _ensureId() {
    if (!this.id) {
      this.id = `gouv-raw-data-${++autoIdCounter}`;
    }
  }

  private _applyAria() {
    if (this.noAutoAria || !this.for) return;
    const target = document.getElementById(this.for);
    if (!target) return;

    this._previousForTarget = target;

    const existing = target.getAttribute('aria-describedby') || '';
    if (!existing.split(/\s+/).includes(this.id)) {
      const value = existing ? `${existing} ${this.id}` : this.id;
      target.setAttribute('aria-describedby', value);
    }
  }

  private _removeAria() {
    if (!this._previousForTarget) return;
    const target = this._previousForTarget;
    const existing = target.getAttribute('aria-describedby') || '';
    const ids = existing.split(/\s+/).filter(id => id !== this.id);
    if (ids.length > 0) {
      target.setAttribute('aria-describedby', ids.join(' '));
    } else {
      target.removeAttribute('aria-describedby');
    }
    this._previousForTarget = null;
  }

  private _handleDownload() {
    const data = this._sourceData;
    if (!data || !Array.isArray(data) || data.length === 0) return;
    const csv = this._buildCsv(data as Record<string, unknown>[]);
    this._triggerDownload(csv);
  }

  _buildCsv(data: Record<string, unknown>[]): string {
    const keys = Object.keys(data[0]);
    const header = keys.join(';');
    const rows = data.map(item =>
      keys.map(key => {
        const str = String(item[key] ?? '');
        return str.includes(';') || str.includes('"')
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      }).join(';')
    );
    return [header, ...rows].join('\n');
  }

  private _triggerDownload(csv: string) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  render() {
    const hasData = Array.isArray(this._sourceData) && this._sourceData.length > 0;
    const isLoading = this._sourceLoading;

    const btnClass = this.buttonLabel
      ? 'fr-btn fr-btn--secondary fr-btn--sm fr-btn--icon-left fr-icon-download-line'
      : 'fr-btn fr-btn--secondary fr-btn--sm fr-icon-download-line';

    return html`
      <div class="gouv-raw-data" role="complementary"
           aria-label="${this.label}">
        <button
          class="${btnClass}"
          @click="${this._handleDownload}"
          ?disabled="${!hasData || isLoading}"
          title="${this.label}"
        >
          ${this.buttonLabel || this.label}
        </button>
      </div>
      <style>
        .gouv-raw-data {
          margin-top: 0.5rem;
        }
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-raw-data': GouvRawData;
  }
}
