var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SourceSubscriberMixin } from '../utils/source-subscriber.js';
import { getByPath } from '../utils/json-path.js';
/** Maps chart type -> DSFR custom element tag name */
const CHART_TAG_MAP = {
    line: 'line-chart',
    bar: 'bar-chart',
    pie: 'pie-chart',
    radar: 'radar-chart',
    scatter: 'scatter-chart',
    gauge: 'gauge-chart',
    'bar-line': 'bar-line-chart',
    map: 'map-chart',
    'map-reg': 'map-chart-reg',
};
/**
 * <gouv-dsfr-chart> - Wrapper pour les composants DSFR Chart connecté à gouv-source
 *
 * Ce composant utilise les graphiques officiels DSFR Chart et les connecte
 * au système de data-bridge pour une alimentation dynamique des données.
 *
 * @example
 * <gouv-dsfr-chart
 *   source="stats"
 *   type="bar"
 *   label-field="categorie"
 *   value-field="valeur"
 *   unit-tooltip="%"
 *   selected-palette="categorical">
 * </gouv-dsfr-chart>
 */
let GouvDsfrChart = class GouvDsfrChart extends SourceSubscriberMixin(LitElement) {
    constructor() {
        super(...arguments);
        this.source = '';
        /** Type de graphique DSFR */
        this.type = 'bar';
        /** Chemin vers le champ label */
        this.labelField = '';
        /** Chemin vers le champ valeur */
        this.valueField = '';
        /** Chemin vers un second champ de valeur (pour bar-line: y-bar) */
        this.valueField2 = '';
        /** Noms des séries (ex: '["Série 1", "Série 2"]') */
        this.name = '';
        /** Palette de couleurs */
        this.selectedPalette = 'categorical';
        /** Unité à afficher dans les tooltips */
        this.unitTooltip = '';
        /** Unité pour les barres (bar-line uniquement) */
        this.unitTooltipBar = '';
        /** Affichage horizontal (bar chart uniquement) */
        this.horizontal = false;
        /** Barres empilées (bar chart uniquement) */
        this.stacked = false;
        /** Remplir le graphique (pie chart: true = plein, false = donut) */
        this.fill = false;
        /** Index des éléments à mettre en avant (ex: "[0, 2]") */
        this.highlightIndex = '';
        this.xMin = '';
        this.xMax = '';
        this.yMin = '';
        this.yMax = '';
        /** Valeur pour la jauge (gauge chart uniquement) */
        this.gaugeValue = null;
        /** ID du département/région à mettre en avant (map chart) */
        this.mapHighlight = '';
        this._data = [];
    }
    // Light DOM pour les styles DSFR
    createRenderRoot() {
        return this;
    }
    onSourceData(data) {
        this._data = Array.isArray(data) ? data : [];
    }
    // --- Data processing ---
    _processData() {
        if (!this._data || this._data.length === 0) {
            return { x: '[[]]', y: '[[]]' };
        }
        const labels = [];
        const values = [];
        const values2 = [];
        for (const record of this._data) {
            labels.push(String(getByPath(record, this.labelField) ?? 'N/A'));
            values.push(Number(getByPath(record, this.valueField)) || 0);
            if (this.valueField2) {
                values2.push(Number(getByPath(record, this.valueField2)) || 0);
            }
        }
        return {
            x: JSON.stringify([labels]),
            y: JSON.stringify([values]),
            y2: this.valueField2 ? JSON.stringify([values2]) : undefined,
        };
    }
    // --- Attribute builders ---
    _getCommonAttributes() {
        const attrs = {};
        if (this.selectedPalette)
            attrs['selected-palette'] = this.selectedPalette;
        if (this.unitTooltip)
            attrs['unit-tooltip'] = this.unitTooltip;
        if (this.xMin)
            attrs['x-min'] = this.xMin;
        if (this.xMax)
            attrs['x-max'] = this.xMax;
        if (this.yMin)
            attrs['y-min'] = this.yMin;
        if (this.yMax)
            attrs['y-max'] = this.yMax;
        if (this.name) {
            attrs['name'] = this.name;
        }
        else if (this.valueField) {
            const names = this.valueField2
                ? [this.valueField, this.valueField2]
                : [this.valueField];
            attrs['name'] = JSON.stringify(names);
        }
        return attrs;
    }
    _getTypeSpecificAttributes() {
        const { x, y, y2 } = this._processData();
        const attrs = {};
        switch (this.type) {
            case 'gauge': {
                const gaugeVal = this.gaugeValue ?? (this._data.length > 0 ? Number(getByPath(this._data[0], this.valueField)) || 0 : 0);
                attrs['percent'] = String(Math.round(gaugeVal));
                attrs['init'] = '0';
                attrs['target'] = '100';
                break;
            }
            case 'bar-line':
                attrs['x'] = x;
                attrs['y-bar'] = y;
                attrs['y-line'] = y2 || y;
                if (this.unitTooltipBar)
                    attrs['unit-tooltip-bar'] = this.unitTooltipBar;
                break;
            default:
                attrs['x'] = x;
                attrs['y'] = y;
                break;
        }
        if (this.type === 'bar') {
            if (this.horizontal)
                attrs['horizontal'] = 'true';
            if (this.stacked)
                attrs['stacked'] = 'true';
            if (this.highlightIndex)
                attrs['highlight-index'] = this.highlightIndex;
        }
        if (this.type === 'pie' && this.fill) {
            attrs['fill'] = 'true';
        }
        if ((this.type === 'map' || this.type === 'map-reg') && this.mapHighlight) {
            attrs['highlight'] = this.mapHighlight;
        }
        return attrs;
    }
    /**
     * Crée un élément DSFR Chart via DOM API (pas d'innerHTML)
     */
    _createChartElement(tagName, attributes) {
        const el = document.createElement(tagName);
        for (const [key, value] of Object.entries(attributes)) {
            if (value !== undefined && value !== '') {
                el.setAttribute(key, value);
            }
        }
        const wrapper = document.createElement('div');
        wrapper.className = 'gouv-dsfr-chart__wrapper';
        wrapper.appendChild(el);
        return wrapper;
    }
    _renderChart() {
        const tagName = CHART_TAG_MAP[this.type];
        if (!tagName) {
            return html `<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
        }
        const allAttrs = {
            ...this._getCommonAttributes(),
            ...this._getTypeSpecificAttributes(),
        };
        const wrapper = this._createChartElement(tagName, allAttrs);
        // Replace previous chart wrapper if any
        const container = this.querySelector('.gouv-dsfr-chart__wrapper');
        if (container)
            container.remove();
        return html `${wrapper}`;
    }
    render() {
        if (this._sourceLoading) {
            return html `
        <div class="gouv-dsfr-chart__loading" aria-live="polite">
          <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
          Chargement du graphique...
        </div>
        <style>
          .gouv-dsfr-chart__loading {
            display: flex; align-items: center; justify-content: center;
            gap: 0.5rem; padding: 2rem; color: var(--text-mention-grey, #666); font-size: 0.875rem;
          }
        </style>
      `;
        }
        if (this._sourceError) {
            return html `
        <div class="gouv-dsfr-chart__error" aria-live="assertive">
          <span class="fr-icon-error-line" aria-hidden="true"></span>
          Erreur de chargement: ${this._sourceError.message}
        </div>
        <style>
          .gouv-dsfr-chart__error {
            display: flex; align-items: center; gap: 0.5rem; padding: 1rem;
            color: var(--text-default-error, #ce0500);
            background: var(--background-alt-red-marianne, #ffe5e5); border-radius: 4px;
          }
        </style>
      `;
        }
        if (!this._data || this._data.length === 0) {
            return html `
        <div class="gouv-dsfr-chart__empty" aria-live="polite">
          <span class="fr-icon-information-line" aria-hidden="true"></span>
          Aucune donnée disponible
        </div>
        <style>
          .gouv-dsfr-chart__empty {
            display: flex; align-items: center; gap: 0.5rem; padding: 1rem;
            color: var(--text-mention-grey, #666);
            background: var(--background-alt-grey, #f5f5f5); border-radius: 4px;
          }
        </style>
      `;
        }
        return this._renderChart();
    }
};
__decorate([
    property({ type: String })
], GouvDsfrChart.prototype, "source", void 0);
__decorate([
    property({ type: String })
], GouvDsfrChart.prototype, "type", void 0);
__decorate([
    property({ type: String, attribute: 'label-field' })
], GouvDsfrChart.prototype, "labelField", void 0);
__decorate([
    property({ type: String, attribute: 'value-field' })
], GouvDsfrChart.prototype, "valueField", void 0);
__decorate([
    property({ type: String, attribute: 'value-field-2' })
], GouvDsfrChart.prototype, "valueField2", void 0);
__decorate([
    property({ type: String })
], GouvDsfrChart.prototype, "name", void 0);
__decorate([
    property({ type: String, attribute: 'selected-palette' })
], GouvDsfrChart.prototype, "selectedPalette", void 0);
__decorate([
    property({ type: String, attribute: 'unit-tooltip' })
], GouvDsfrChart.prototype, "unitTooltip", void 0);
__decorate([
    property({ type: String, attribute: 'unit-tooltip-bar' })
], GouvDsfrChart.prototype, "unitTooltipBar", void 0);
__decorate([
    property({ type: Boolean })
], GouvDsfrChart.prototype, "horizontal", void 0);
__decorate([
    property({ type: Boolean })
], GouvDsfrChart.prototype, "stacked", void 0);
__decorate([
    property({ type: Boolean })
], GouvDsfrChart.prototype, "fill", void 0);
__decorate([
    property({ type: String, attribute: 'highlight-index' })
], GouvDsfrChart.prototype, "highlightIndex", void 0);
__decorate([
    property({ type: String, attribute: 'x-min' })
], GouvDsfrChart.prototype, "xMin", void 0);
__decorate([
    property({ type: String, attribute: 'x-max' })
], GouvDsfrChart.prototype, "xMax", void 0);
__decorate([
    property({ type: String, attribute: 'y-min' })
], GouvDsfrChart.prototype, "yMin", void 0);
__decorate([
    property({ type: String, attribute: 'y-max' })
], GouvDsfrChart.prototype, "yMax", void 0);
__decorate([
    property({ type: Number, attribute: 'gauge-value' })
], GouvDsfrChart.prototype, "gaugeValue", void 0);
__decorate([
    property({ type: String, attribute: 'map-highlight' })
], GouvDsfrChart.prototype, "mapHighlight", void 0);
__decorate([
    state()
], GouvDsfrChart.prototype, "_data", void 0);
GouvDsfrChart = __decorate([
    customElement('gouv-dsfr-chart')
], GouvDsfrChart);
export { GouvDsfrChart };
