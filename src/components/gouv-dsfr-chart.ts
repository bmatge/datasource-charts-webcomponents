import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { subscribeToSource, getDataCache } from '../utils/data-bridge.js';
import { getByPath } from '../utils/json-path.js';

// Note: DSFR Chart doit être chargé séparément via CDN pour éviter d'alourdir le bundle
// Ajouter dans votre HTML:
// <script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"></script>
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">

/**
 * Types de graphiques DSFR Chart supportés
 */
type DSFRChartType = 'line' | 'bar' | 'pie' | 'radar' | 'gauge' | 'scatter' | 'bar-line' | 'map' | 'map-reg';

/**
 * <gouv-dsfr-chart> - Wrapper pour les composants DSFR Chart connecté à gouv-source
 *
 * Ce composant utilise les graphiques officiels DSFR Chart et les connecte
 * au système de data-bridge pour une alimentation dynamique des données.
 *
 * @example
 * <gouv-source
 *   id="stats"
 *   url="/api/statistics"
 *   transform="data">
 * </gouv-source>
 *
 * <gouv-dsfr-chart
 *   source="stats"
 *   type="bar"
 *   label-field="categorie"
 *   value-field="valeur"
 *   unit-tooltip="%"
 *   selected-palette="categorical">
 * </gouv-dsfr-chart>
 */
@customElement('gouv-dsfr-chart')
export class GouvDsfrChart extends LitElement {
  /**
   * ID de la source de données à écouter
   */
  @property({ type: String })
  source = '';

  /**
   * Type de graphique DSFR: line, bar, pie, radar, gauge, scatter, bar-line, map, map-reg
   */
  @property({ type: String })
  type: DSFRChartType = 'bar';

  /**
   * Chemin vers le champ à utiliser comme label (ex: "nom", "fields.categorie")
   */
  @property({ type: String, attribute: 'label-field' })
  labelField = '';

  /**
   * Chemin vers le champ à utiliser comme valeur (ex: "valeur", "fields.score")
   */
  @property({ type: String, attribute: 'value-field' })
  valueField = '';

  /**
   * Chemin vers un second champ de valeur (pour bar-line: y-bar)
   */
  @property({ type: String, attribute: 'value-field-2' })
  valueField2 = '';

  /**
   * Noms des séries (ex: '["Série 1", "Série 2"]')
   */
  @property({ type: String })
  name = '';

  /**
   * Palette de couleurs: default, neutral, categorical, sequentialAscending, etc.
   */
  @property({ type: String, attribute: 'selected-palette' })
  selectedPalette = 'categorical';

  /**
   * Unité à afficher dans les tooltips
   */
  @property({ type: String, attribute: 'unit-tooltip' })
  unitTooltip = '';

  /**
   * Unité pour les barres (bar-line uniquement)
   */
  @property({ type: String, attribute: 'unit-tooltip-bar' })
  unitTooltipBar = '';

  /**
   * Affichage horizontal (bar chart uniquement)
   */
  @property({ type: Boolean })
  horizontal = false;

  /**
   * Barres empilées (bar chart uniquement)
   */
  @property({ type: Boolean })
  stacked = false;

  /**
   * Remplir le graphique (pie chart: true = plein, false = donut)
   */
  @property({ type: Boolean })
  fill = false;

  /**
   * Index des éléments à mettre en avant (ex: "[0, 2]")
   */
  @property({ type: String, attribute: 'highlight-index' })
  highlightIndex = '';

  /**
   * Valeur min axe X
   */
  @property({ type: String, attribute: 'x-min' })
  xMin = '';

  /**
   * Valeur max axe X
   */
  @property({ type: String, attribute: 'x-max' })
  xMax = '';

  /**
   * Valeur min axe Y
   */
  @property({ type: String, attribute: 'y-min' })
  yMin = '';

  /**
   * Valeur max axe Y
   */
  @property({ type: String, attribute: 'y-max' })
  yMax = '';

  /**
   * Valeur pour la jauge (gauge chart uniquement)
   */
  @property({ type: Number, attribute: 'gauge-value' })
  gaugeValue: number | null = null;

  /**
   * ID du département/région à mettre en avant (map chart)
   */
  @property({ type: String, attribute: 'map-highlight' })
  mapHighlight = '';

  @state()
  private _loading = false;

  @state()
  private _data: unknown[] = [];

  @state()
  private _error: Error | null = null;

  private _unsubscribe: (() => void) | null = null;

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

    // Récupère les données en cache
    const cachedData = getDataCache(this.source);
    if (cachedData !== undefined && Array.isArray(cachedData)) {
      this._data = cachedData;
    }

    this._unsubscribe = subscribeToSource(this.source, {
      onLoaded: (data) => {
        this._data = Array.isArray(data) ? data : [];
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

  /**
   * Transforme les données en format DSFR Chart
   * Retourne { x: string, y: string } avec les données JSON stringifiées
   */
  private _processData(): { x: string; y: string; y2?: string } {
    if (!this._data || !Array.isArray(this._data) || this._data.length === 0) {
      return { x: '[[]]', y: '[[]]' };
    }

    const labels: (string | number)[] = [];
    const values: number[] = [];
    const values2: number[] = [];

    for (const record of this._data) {
      const label = getByPath(record, this.labelField);
      const value = getByPath(record, this.valueField);

      labels.push(String(label ?? 'N/A'));
      values.push(Number(value) || 0);

      if (this.valueField2) {
        const value2 = getByPath(record, this.valueField2);
        values2.push(Number(value2) || 0);
      }
    }

    // Format DSFR Chart: x et y sont des tableaux de tableaux pour permettre plusieurs séries
    // Pour une série simple: x="[['a', 'b', 'c']]" y="[[1, 2, 3]]"
    const x = JSON.stringify([labels]);
    const y = JSON.stringify([values]);
    const y2 = this.valueField2 ? JSON.stringify([values2]) : undefined;

    return { x, y, y2 };
  }

  /**
   * Génère les attributs communs pour tous les types de charts
   */
  private _getCommonAttributes(): Record<string, string> {
    const attrs: Record<string, string> = {};

    if (this.selectedPalette) {
      attrs['selected-palette'] = this.selectedPalette;
    }
    if (this.unitTooltip) {
      attrs['unit-tooltip'] = this.unitTooltip;
    }
    if (this.xMin) {
      attrs['x-min'] = this.xMin;
    }
    if (this.xMax) {
      attrs['x-max'] = this.xMax;
    }
    if (this.yMin) {
      attrs['y-min'] = this.yMin;
    }
    if (this.yMax) {
      attrs['y-max'] = this.yMax;
    }
    // Auto-génère le name depuis valueField si non spécifié
    if (this.name) {
      attrs['name'] = this.name;
    } else if (this.valueField) {
      // Génère automatiquement le name au format DSFR: '["Serie1", "Serie2"]'
      const names = this.valueField2
        ? [this.valueField, this.valueField2]
        : [this.valueField];
      attrs['name'] = JSON.stringify(names);
    }

    return attrs;
  }

  /**
   * Rend le composant DSFR Chart approprié selon le type
   */
  private _renderChart() {
    const { x, y, y2 } = this._processData();
    const commonAttrs = this._getCommonAttributes();

    // Créer le HTML dynamiquement avec les bons attributs
    switch (this.type) {
      case 'line':
        return this._createChartElement('line-chart', { x, y, ...commonAttrs });

      case 'bar':
        return this._createChartElement('bar-chart', {
          x,
          y,
          ...commonAttrs,
          ...(this.horizontal ? { horizontal: 'true' } : {}),
          ...(this.stacked ? { stacked: 'true' } : {}),
          ...(this.highlightIndex ? { 'highlight-index': this.highlightIndex } : {})
        });

      case 'pie':
        return this._createChartElement('pie-chart', {
          x,
          y,
          ...commonAttrs,
          ...(this.fill ? { fill: 'true' } : {})
        });

      case 'radar':
        return this._createChartElement('radar-chart', { x, y, ...commonAttrs });

      case 'scatter':
        return this._createChartElement('scatter-chart', { x, y, ...commonAttrs });

      case 'gauge':
        // Pour gauge, on utilise percent/init/target (pas value qui ne fonctionne pas dans DSFR Chart 2.0.4)
        const gaugeVal = this.gaugeValue ?? (this._data.length > 0 ? Number(getByPath(this._data[0], this.valueField)) || 0 : 0);
        return this._createChartElement('gauge-chart', {
          percent: String(Math.round(gaugeVal)),
          init: '0',
          target: '100',
          ...commonAttrs
        });

      case 'bar-line':
        return this._createChartElement('bar-line-chart', {
          x,
          'y-bar': y,
          'y-line': y2 || y,
          ...commonAttrs,
          ...(this.unitTooltipBar ? { 'unit-tooltip-bar': this.unitTooltipBar } : {})
        });

      case 'map':
        return this._createChartElement('map-chart', {
          x,
          y,
          ...commonAttrs,
          ...(this.mapHighlight ? { highlight: this.mapHighlight } : {})
        });

      case 'map-reg':
        return this._createChartElement('map-chart-reg', {
          x,
          y,
          ...commonAttrs,
          ...(this.mapHighlight ? { highlight: this.mapHighlight } : {})
        });

      default:
        return html`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    }
  }

  /**
   * Crée un élément DSFR Chart avec les attributs spécifiés
   */
  private _createChartElement(tagName: string, attributes: Record<string, string>) {
    const el = document.createElement(tagName);
    for (const [key, value] of Object.entries(attributes)) {
      if (value !== undefined && value !== '') {
        el.setAttribute(key, value);
      }
    }

    // Utiliser unsafeHTML ou une méthode DOM pour insérer l'élément
    // On retourne un template qui sera mis à jour lors du render
    const attrsStr = Object.entries(attributes)
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => `${k}='${v.replace(/'/g, "\\'")}'`)
      .join(' ');

    // On utilise innerHTML car les composants DSFR Chart sont des custom elements Vue
    // et doivent être insérés dans le DOM pour fonctionner
    return html`<div class="gouv-dsfr-chart__wrapper" .innerHTML="${`<${tagName} ${attrsStr}></${tagName}>`}"></div>`;
  }

  render() {
    if (this._loading) {
      return html`
        <div class="gouv-dsfr-chart__loading" aria-live="polite">
          <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
          Chargement du graphique...
        </div>
        <style>
          .gouv-dsfr-chart__loading {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 2rem;
            color: var(--text-mention-grey, #666);
            font-size: 0.875rem;
          }
        </style>
      `;
    }

    if (this._error) {
      return html`
        <div class="gouv-dsfr-chart__error" aria-live="assertive">
          <span class="fr-icon-error-line" aria-hidden="true"></span>
          Erreur de chargement: ${this._error.message}
        </div>
        <style>
          .gouv-dsfr-chart__error {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            color: var(--text-default-error, #ce0500);
            background: var(--background-alt-red-marianne, #ffe5e5);
            border-radius: 4px;
          }
        </style>
      `;
    }

    if (!this._data || this._data.length === 0) {
      return html`
        <div class="gouv-dsfr-chart__empty" aria-live="polite">
          <span class="fr-icon-information-line" aria-hidden="true"></span>
          Aucune donnée disponible
        </div>
        <style>
          .gouv-dsfr-chart__empty {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            color: var(--text-mention-grey, #666);
            background: var(--background-alt-grey, #f5f5f5);
            border-radius: 4px;
          }
        </style>
      `;
    }

    return this._renderChart();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gouv-dsfr-chart': GouvDsfrChart;
  }
}
