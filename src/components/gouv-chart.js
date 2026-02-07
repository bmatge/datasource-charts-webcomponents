var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SourceSubscriberMixin } from '../utils/source-subscriber.js';
import { processChartData } from '../utils/chart-data.js';
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
let GouvChart = class GouvChart extends SourceSubscriberMixin(LitElement) {
    constructor() {
        super(...arguments);
        this.source = '';
        /** Type de graphique: bar, line, pie, doughnut, radar */
        this.type = 'bar';
        /** Orientation de l'axe pour bar chart: x (vertical) ou y (horizontal) */
        this.indexAxis = 'x';
        /** Chemin vers le champ à utiliser comme label (ex: "fields.Nom") */
        this.labelField = '';
        /** Chemin vers le champ à utiliser comme valeur (ex: "fields.Valeur") */
        this.valueField = '';
        /** Fonction d'agrégation: none, sum, avg, count, min, max */
        this.aggregation = 'none';
        /** Nombre maximum d'éléments à afficher (0 = tous) */
        this.limit = 0;
        /** Ordre de tri: none, asc, desc */
        this.sortOrder = 'desc';
        /** Titre du graphique */
        this.title = '';
        /** Sous-titre du graphique */
        this.subtitle = '';
        /** Couleur principale (pour bar, line) */
        this.color = '#000091';
        /** Hauteur du graphique en pixels */
        this.height = 350;
        this._data = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._chartInstance = null;
        this._canvasId = `gouv-chart-${Math.random().toString(36).substr(2, 9)}`;
    }
    // Light DOM pour les styles DSFR
    createRenderRoot() {
        return this;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._destroyChart();
    }
    onSourceData(data) {
        this._data = Array.isArray(data) ? data : [];
        this.updateComplete.then(() => this._renderChart());
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        const chartConfigProps = ['type', 'indexAxis', 'labelField', 'valueField', 'aggregation', 'limit', 'sortOrder', 'title', 'subtitle', 'color', 'height'];
        const needsRerender = chartConfigProps.some(prop => changedProperties.has(prop));
        if (needsRerender && this._data.length > 0) {
            this._renderChart();
        }
    }
    _processData() {
        return processChartData(this._data, this.labelField, this.valueField, this.aggregation, this.sortOrder, this.limit);
    }
    _destroyChart() {
        if (this._chartInstance) {
            this._chartInstance.destroy();
            this._chartInstance = null;
        }
    }
    _renderChart() {
        const canvas = this.querySelector(`#${this._canvasId}`);
        if (!canvas)
            return;
        if (typeof Chart === 'undefined') {
            console.error('gouv-chart: Chart.js non chargé');
            return;
        }
        this._destroyChart();
        const { labels, values } = this._processData();
        if (labels.length === 0)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const isMultiColor = MULTI_COLOR_TYPES.has(this.type);
        const backgroundColor = isMultiColor
            ? labels.map((_, i) => DSFR_COLORS[i % DSFR_COLORS.length])
            : this.color;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chartConfig = {
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
    _renderAccessibleTable() {
        const { labels, values } = this._processData();
        if (labels.length === 0)
            return html ``;
        const labelHeader = this.labelField.split('.').pop() || 'Label';
        const valueHeader = this.valueField.split('.').pop() || 'Valeur';
        return html `
      <table class="fr-table">
        <thead>
          <tr>
            <th>${labelHeader}</th>
            <th>${valueHeader}</th>
          </tr>
        </thead>
        <tbody>
          ${labels.map((label, i) => html `
            <tr><td>${label}</td><td>${values[i]}</td></tr>
          `)}
        </tbody>
      </table>
    `;
    }
    render() {
        return html `
      <div class="gouv-chart-container" style="height: ${this.height}px;">
        ${this._sourceLoading ? html `
          <div class="gouv-chart__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? html `
          <div class="gouv-chart__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement: ${this._sourceError.message}
          </div>
        ` : html `
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
};
__decorate([
    property({ type: String })
], GouvChart.prototype, "source", void 0);
__decorate([
    property({ type: String })
], GouvChart.prototype, "type", void 0);
__decorate([
    property({ type: String, attribute: 'index-axis' })
], GouvChart.prototype, "indexAxis", void 0);
__decorate([
    property({ type: String, attribute: 'label-field' })
], GouvChart.prototype, "labelField", void 0);
__decorate([
    property({ type: String, attribute: 'value-field' })
], GouvChart.prototype, "valueField", void 0);
__decorate([
    property({ type: String })
], GouvChart.prototype, "aggregation", void 0);
__decorate([
    property({ type: Number })
], GouvChart.prototype, "limit", void 0);
__decorate([
    property({ type: String, attribute: 'sort-order' })
], GouvChart.prototype, "sortOrder", void 0);
__decorate([
    property({ type: String })
], GouvChart.prototype, "title", void 0);
__decorate([
    property({ type: String })
], GouvChart.prototype, "subtitle", void 0);
__decorate([
    property({ type: String })
], GouvChart.prototype, "color", void 0);
__decorate([
    property({ type: Number })
], GouvChart.prototype, "height", void 0);
__decorate([
    state()
], GouvChart.prototype, "_data", void 0);
GouvChart = __decorate([
    customElement('gouv-chart')
], GouvChart);
export { GouvChart };
