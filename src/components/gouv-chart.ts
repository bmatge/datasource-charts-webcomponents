import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SourceSubscriberMixin } from '../utils/source-subscriber.js';
import { processChartData, ChartAggregation } from '../utils/chart-data.js';

// Déclaration pour Chart.js (chargé globalement via CDN)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Chart: any;

// Couleurs DSFR pour les graphiques multi-couleurs
const DSFR_COLORS = [
  '#000091', // Bleu France
  '#009081', // Emeraude
  '#A558A0', // Glycine
  '#C9191E', // Marianne
  '#E4794A', // Tuile
  '#FFD1A1', // Mandarine
  '#68A532', // Bourgeon
  '#5770BE', // Archipel
];

const MULTI_COLOR_TYPES = new Set(['pie', 'doughnut', 'radar']);

/**
 * <gouv-chart> - Composant graphique connecté à une source de données
 *
 * Affiche un graphique Chart.js alimenté par les données d'un <gouv-source>.
 * Se met à jour automatiquement quand la source émet de nouvelles données.
 *
 * @example
 * <gouv-chart
 *   source="grist-data"
 *   type="bar"
 *   label-field="fields.Nom"
 *   value-field="fields.Valeur"
 *   aggregation="sum"
 *   limit="10"
 *   title="Mon graphique">
 * </gouv-chart>
 */
@customElement('gouv-chart')
export class GouvChart extends SourceSubscriberMixin(LitElement) {
  @property({ type: String })
  source = '';

  /** Type de graphique: bar, line, pie, doughnut, radar */
  @property({ type: String })
  type: 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' = 'bar';

  /** Orientation de l'axe pour bar chart: x (vertical) ou y (horizontal) */
  @property({ type: String, attribute: 'index-axis' })
  indexAxis: 'x' | 'y' = 'x';

  /** Chemin vers le champ à utiliser comme label (ex: "fields.Nom") */
  @property({ type: String, attribute: 'label-field' })
  labelField = '';

  /** Chemin vers le champ à utiliser comme valeur (ex: "fields.Valeur") */
  @property({ type: String, attribute: 'value-field' })
  valueField = '';

  /** Fonction d'agrégation: none, sum, avg, count, min, max */
  @property({ type: String })
  aggregation: ChartAggregation = 'none';

  /** Nombre maximum d'éléments à afficher (0 = tous) */
  @property({ type: Number })
  limit = 0;

  /** Ordre de tri: none, asc, desc */
  @property({ type: String, attribute: 'sort-order' })
  sortOrder: 'none' | 'asc' | 'desc' = 'desc';

  /** Titre du graphique */
  @property({ type: String })
  title = '';

  /** Sous-titre du graphique */
  @property({ type: String })
  subtitle = '';

  /** Couleur principale (pour bar, line) */
  @property({ type: String })
  color = '#000091';

  /** Hauteur du graphique en pixels */
  @property({ type: Number })
  height = 350;

  @state()
  private _data: unknown[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _chartInstance: any = null;
  private _canvasId = `gouv-chart-${Math.random().toString(36).substr(2, 9)}`;

  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._destroyChart();
  }

  onSourceData(data: unknown): void {
    this._data = Array.isArray(data) ? data : [];
    this.updateComplete.then(() => this._renderChart());
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    const chartConfigProps = ['type', 'indexAxis', 'labelField', 'valueField', 'aggregation', 'limit', 'sortOrder', 'title', 'subtitle', 'color', 'height'];
    const needsRerender = chartConfigProps.some(prop => changedProperties.has(prop));

    if (needsRerender && this._data.length > 0) {
      this._renderChart();
    }
  }

  private _processData(): { labels: string[]; values: number[] } {
    return processChartData(
      this._data,
      this.labelField,
      this.valueField,
      this.aggregation,
      this.sortOrder,
      this.limit,
    );
  }

  private _destroyChart() {
    if (this._chartInstance) {
      this._chartInstance.destroy();
      this._chartInstance = null;
    }
  }

  private _renderChart() {
    const canvas = this.querySelector(`#${this._canvasId}`) as HTMLCanvasElement;
    if (!canvas) return;

    if (typeof Chart === 'undefined') {
      console.error('gouv-chart: Chart.js non chargé');
      return;
    }

    this._destroyChart();

    const { labels, values } = this._processData();
    if (labels.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMultiColor = MULTI_COLOR_TYPES.has(this.type);
    const backgroundColor = isMultiColor
      ? labels.map((_, i) => DSFR_COLORS[i % DSFR_COLORS.length])
      : this.color;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartConfig: any = {
      type: this.type,
      data: {
        labels,
        datasets: [{
          label: this.valueField.split('.').pop() || 'Valeur',
          data: values,
          backgroundColor,
          borderColor: isMultiColor ? backgroundColor : this.color,
          borderWidth: this.type === 'line' ? 2 : 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: this.type === 'bar' ? this.indexAxis : undefined,
        plugins: {
          title: {
            display: !!this.title,
            text: this.title,
            font: { size: 16, weight: 'bold' },
          },
          subtitle: {
            display: !!this.subtitle,
            text: this.subtitle,
            font: { size: 12 },
          },
          legend: {
            display: isMultiColor,
            position: 'bottom',
          },
        },
        scales: MULTI_COLOR_TYPES.has(this.type) ? undefined : {
          y: { beginAtZero: true },
        },
      },
    };

    this._chartInstance = new Chart(ctx, chartConfig);
  }

  private _renderAccessibleTable() {
    const { labels, values } = this._processData();
    if (labels.length === 0) return html``;

    const labelHeader = this.labelField.split('.').pop() || 'Label';
    const valueHeader = this.valueField.split('.').pop() || 'Valeur';

    return html`
      <table class="fr-table">
        <thead>
          <tr>
            <th>${labelHeader}</th>
            <th>${valueHeader}</th>
          </tr>
        </thead>
        <tbody>
          ${labels.map((label, i) => html`
            <tr><td>${label}</td><td>${values[i]}</td></tr>
          `)}
        </tbody>
      </table>
    `;
  }

  render() {
    return html`
      <div class="gouv-chart-container" style="height: ${this.height}px;">
        ${this._sourceLoading ? html`
          <div class="gouv-chart__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? html`
          <div class="gouv-chart__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement: ${this._sourceError.message}
          </div>
        ` : html`
          <canvas id="${this._canvasId}" role="img" aria-label="${this.title || 'Graphique'}"></canvas>
        `}
      </div>

      <!-- Tableau accessible (RGAA) -->
      <details class="fr-accordion fr-mt-2w">
        <summary class="fr-accordion__btn">Données du graphique (tableau accessible)</summary>
        <div class="fr-collapse">${this._renderAccessibleTable()}</div>
      </details>

      <style>
        .gouv-chart-container { position: relative; width: 100%; }
        .gouv-chart__loading,
        .gouv-chart__error {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; height: 100%; color: var(--text-mention-grey, #666); font-size: 0.875rem;
        }
        .gouv-chart__error { color: var(--text-default-error, #ce0500); }
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-chart': GouvChart;
  }
}
