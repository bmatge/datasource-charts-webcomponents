var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { subscribeToSource, getDataCache } from '../utils/data-bridge.js';
import { getByPath } from '../utils/json-path.js';
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
/**
 * <gouv-chart> - Composant graphique connecté à une source de données
 *
 * Affiche un graphique Chart.js alimenté par les données d'un <gouv-source>.
 * Se met à jour automatiquement quand la source émet de nouvelles données.
 *
 * @example
 * <gouv-source
 *   id="grist-data"
 *   url="/grist-gouv-proxy/api/docs/DOC_ID/tables/TABLE/records"
 *   transform="records">
 * </gouv-source>
 *
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
let GouvChart = class GouvChart extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * ID de la source de données à écouter
         */
        this.source = '';
        /**
         * Type de graphique: bar, line, pie, doughnut, radar
         */
        this.type = 'bar';
        /**
         * Orientation de l'axe pour bar chart: x (vertical) ou y (horizontal)
         */
        this.indexAxis = 'x';
        /**
         * Chemin vers le champ à utiliser comme label (ex: "fields.Nom")
         */
        this.labelField = '';
        /**
         * Chemin vers le champ à utiliser comme valeur (ex: "fields.Valeur")
         */
        this.valueField = '';
        /**
         * Fonction d'agrégation: none, sum, avg, count, min, max
         */
        this.aggregation = 'none';
        /**
         * Nombre maximum d'éléments à afficher (0 = tous)
         */
        this.limit = 0;
        /**
         * Ordre de tri: none, asc, desc
         */
        this.sortOrder = 'desc';
        /**
         * Titre du graphique
         */
        this.title = '';
        /**
         * Sous-titre du graphique
         */
        this.subtitle = '';
        /**
         * Couleur principale (pour bar, line)
         */
        this.color = '#000091';
        /**
         * Hauteur du graphique en pixels
         */
        this.height = 350;
        this._loading = false;
        this._data = [];
        this._error = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._chartInstance = null;
        this._unsubscribe = null;
        this._canvasId = `gouv-chart-${Math.random().toString(36).substr(2, 9)}`;
    }
    // Light DOM pour les styles DSFR
    createRenderRoot() {
        return this;
    }
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
        this._destroyChart();
    }
    updated(changedProperties) {
        if (changedProperties.has('source')) {
            this._subscribeToSource();
        }
        // Re-render chart if config changed
        const chartConfigProps = ['type', 'indexAxis', 'labelField', 'valueField', 'aggregation', 'limit', 'sortOrder', 'title', 'subtitle', 'color', 'height'];
        const needsRerender = chartConfigProps.some(prop => changedProperties.has(prop));
        if (needsRerender && this._data.length > 0) {
            this._renderChart();
        }
    }
    _subscribeToSource() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
        if (!this.source) {
            return;
        }
        // Récupère les données en cache
        const cachedData = getDataCache(this.source);
        if (cachedData !== undefined && Array.isArray(cachedData)) {
            this._data = cachedData;
            this.updateComplete.then(() => this._renderChart());
        }
        this._unsubscribe = subscribeToSource(this.source, {
            onLoaded: (data) => {
                this._data = Array.isArray(data) ? data : [];
                this._loading = false;
                this._error = null;
                this.updateComplete.then(() => this._renderChart());
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
    _processData() {
        if (!this._data || !Array.isArray(this._data) || this._data.length === 0) {
            return { labels: [], values: [] };
        }
        // 1. Extraire les paires label/value
        let processed = this._data.map(record => ({
            label: String(getByPath(record, this.labelField) ?? 'N/A'),
            value: Number(getByPath(record, this.valueField)) || 0
        }));
        // 2. Appliquer l'agrégation si nécessaire
        if (this.aggregation !== 'none') {
            processed = this._aggregate(processed);
        }
        // 3. Trier
        if (this.sortOrder !== 'none') {
            processed.sort((a, b) => this.sortOrder === 'desc' ? b.value - a.value : a.value - b.value);
        }
        // 4. Limiter
        if (this.limit > 0) {
            processed = processed.slice(0, this.limit);
        }
        return {
            labels: processed.map(p => p.label),
            values: processed.map(p => Math.round(p.value * 100) / 100)
        };
    }
    _aggregate(data) {
        // Grouper par label
        const groups = new Map();
        for (const item of data) {
            const existing = groups.get(item.label) || [];
            existing.push(item.value);
            groups.set(item.label, existing);
        }
        // Appliquer la fonction d'agrégation
        const result = [];
        for (const [label, values] of groups) {
            let aggregatedValue;
            switch (this.aggregation) {
                case 'sum':
                    aggregatedValue = values.reduce((a, b) => a + b, 0);
                    break;
                case 'avg':
                    aggregatedValue = values.reduce((a, b) => a + b, 0) / values.length;
                    break;
                case 'count':
                    aggregatedValue = values.length;
                    break;
                case 'min':
                    aggregatedValue = Math.min(...values);
                    break;
                case 'max':
                    aggregatedValue = Math.max(...values);
                    break;
                default:
                    aggregatedValue = values[0] || 0;
            }
            result.push({ label, value: aggregatedValue });
        }
        return result;
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
        // Vérifier que Chart.js est disponible
        if (typeof Chart === 'undefined') {
            console.error('gouv-chart: Chart.js non chargé');
            return;
        }
        this._destroyChart();
        const { labels, values } = this._processData();
        if (labels.length === 0) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const isMultiColor = ['pie', 'doughnut', 'radar'].includes(this.type);
        const backgroundColor = isMultiColor
            ? labels.map((_, i) => DSFR_COLORS[i % DSFR_COLORS.length])
            : this.color;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chartConfig = {
            type: this.type === 'radar' ? 'radar' : this.type,
            data: {
                labels,
                datasets: [{
                        label: this.valueField.split('.').pop() || 'Valeur',
                        data: values,
                        backgroundColor,
                        borderColor: isMultiColor ? backgroundColor : this.color,
                        borderWidth: this.type === 'line' ? 2 : 1
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: this.type === 'bar' ? this.indexAxis : undefined,
                plugins: {
                    title: {
                        display: !!this.title,
                        text: this.title,
                        font: { size: 16, weight: 'bold' }
                    },
                    subtitle: {
                        display: !!this.subtitle,
                        text: this.subtitle,
                        font: { size: 12 }
                    },
                    legend: {
                        display: isMultiColor,
                        position: 'bottom'
                    }
                },
                scales: ['pie', 'doughnut', 'radar'].includes(this.type) ? undefined : {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        this._chartInstance = new Chart(ctx, chartConfig);
    }
    _getAccessibleTableHtml() {
        const { labels, values } = this._processData();
        if (labels.length === 0)
            return '';
        const rows = labels.map((label, i) => `<tr><td>${this._escapeHtml(label)}</td><td>${values[i]}</td></tr>`).join('');
        return `
      <table class="fr-table">
        <thead>
          <tr>
            <th>${this.labelField.split('.').pop() || 'Label'}</th>
            <th>${this.valueField.split('.').pop() || 'Valeur'}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    }
    _escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
    render() {
        return html `
      <div class="gouv-chart-container" style="height: ${this.height}px;">
        ${this._loading ? html `
          <div class="gouv-chart__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._error ? html `
          <div class="gouv-chart__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement: ${this._error.message}
          </div>
        ` : html `
          <canvas id="${this._canvasId}" role="img" aria-label="${this.title || 'Graphique'}"></canvas>
        `}
      </div>

      <!-- Tableau accessible (RGAA) -->
      <details class="fr-accordion fr-mt-2w">
        <summary class="fr-accordion__btn">Données du graphique (tableau accessible)</summary>
        <div class="fr-collapse" .innerHTML=${this._getAccessibleTableHtml()}></div>
      </details>

      <style>
        .gouv-chart-container {
          position: relative;
          width: 100%;
        }

        .gouv-chart__loading,
        .gouv-chart__error {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 100%;
          color: var(--text-mention-grey, #666);
          font-size: 0.875rem;
        }

        .gouv-chart__error {
          color: var(--text-default-error, #ce0500);
        }
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
], GouvChart.prototype, "_loading", void 0);
__decorate([
    state()
], GouvChart.prototype, "_data", void 0);
__decorate([
    state()
], GouvChart.prototype, "_error", void 0);
GouvChart = __decorate([
    customElement('gouv-chart')
], GouvChart);
export { GouvChart };
