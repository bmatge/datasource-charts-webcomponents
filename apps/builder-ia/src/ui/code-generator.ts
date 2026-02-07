/**
 * Code generation - produces embeddable HTML+JS code for each chart type
 */

import { escapeHtml, DSFR_COLORS, isValidDeptCode } from '@gouv-widgets/shared';
import { state } from '../state.js';
import type { ChartConfig, AggregatedResult } from '../state.js';

/**
 * Format a KPI value with optional unit (for generated code templates)
 */
function formatKPIValueLocal(value: number, unit?: string): string {
  const num = Math.round(value * 100) / 100;
  if (unit === '\u20AC' || unit === 'EUR') {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num);
  } else if (unit === '%') {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(num) + ' %';
  } else {
    const formatted = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(num);
    return unit ? `${formatted} ${unit}` : formatted;
  }
}

/**
 * Generate embeddable HTML+JS code for the given chart config and data.
 * Supports different templates for: KPI, gauge, scatter, map, standard charts.
 * For API sources, generates dynamic code; otherwise, embeds data.
 */
export function generateCode(config: ChartConfig, data: AggregatedResult[]): void {
  const codeEl = document.getElementById('generated-code') as HTMLPreElement;

  // Handle KPI type
  if (config.type === 'kpi') {
    codeEl.textContent = generateKPICode(config, data);
    return;
  }

  // Handle gauge type
  if (config.type === 'gauge') {
    codeEl.textContent = generateGaugeCode(config, data);
    return;
  }

  // Handle scatter type
  if (config.type === 'scatter') {
    codeEl.textContent = generateScatterCode(config, data);
    return;
  }

  // Handle map type
  if (config.type === 'map') {
    codeEl.textContent = generateMapCode(config, data);
    return;
  }

  // Handle standard chart types (bar, line, pie, doughnut, radar, horizontalBar)
  codeEl.textContent = generateStandardChartCode(config, data);
}

// ---------------------------------------------------------------------------
// KPI
// ---------------------------------------------------------------------------

function generateKPICode(config: ChartConfig, data: AggregatedResult[]): string {
  const kpiValue = data[0]?.value || 0;
  const variant = config.variant || '';
  const unit = config.unit || '';

  // API-dynamic variant
  if (state.source?.type === 'api' && state.source?.url) {
    const valueExpr = config.aggregation === 'count'
      ? 'count(*) as value'
      : `${config.aggregation}(${config.valueField}) as value`;

    const params = new URLSearchParams({ select: valueExpr });
    const apiUrl = `${state.source.url}?${params}`;

    return `<!-- KPI genere avec gouv-widgets Builder IA -->
<!-- Source API dynamique : les donnees se mettent a jour automatiquement -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<style>
.kpi-card {
  background: var(--background-default-grey);
  border-left: 4px solid var(--border-default-grey);
  padding: 1.5rem 2rem;
  text-align: center;
  border-radius: 4px;
}
.kpi-card--info { border-left-color: #0063CB; }
.kpi-card--success { border-left-color: #18753C; }
.kpi-card--warning { border-left-color: #D64D00; }
.kpi-card--error { border-left-color: #C9191E; }
.kpi-value { display: block; font-size: 2.5rem; font-weight: 700; color: var(--text-title-grey); }
.kpi-label { display: block; font-size: 0.875rem; color: var(--text-mention-grey); margin-top: 0.5rem; }
</style>

<div class="fr-container fr-my-4w">
  <div class="kpi-card${variant ? ' kpi-card--' + variant : ''}" id="kpi-container">
    <span class="kpi-value" id="kpi-value">\u2014</span>
    <span class="kpi-label">${escapeHtml(config.title || 'Indicateur')}</span>
  </div>
</div>

<script>
// URL de l'API avec agregation ODSQL
const API_URL = '${apiUrl}';

function formatKPIValue(value, unit) {
  const num = Math.round(value * 100) / 100;
  if (unit === '\u20AC' || unit === 'EUR') {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num);
  } else if (unit === '%') {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(num) + ' %';
  } else {
    const formatted = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(num);
    return unit ? formatted + ' ' + unit : formatted;
  }
}

async function loadKPI() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    const data = json.results || [];
    const value = data[0]?.value || 0;
    document.getElementById('kpi-value').textContent = formatKPIValue(value, '${unit}');
  } catch (error) {
    console.error('Erreur chargement KPI:', error);
    document.getElementById('kpi-value').textContent = 'Erreur';
  }
}

loadKPI();
<\/script>`;
  }

  // Embedded-data variant
  return `<!-- KPI genere avec gouv-widgets Builder IA -->
<!-- Source : ${state.source?.name || 'Donnees locales'} - valeur embarquee -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<style>
.kpi-card {
  background: var(--background-default-grey);
  border-left: 4px solid var(--border-default-grey);
  padding: 1.5rem 2rem;
  text-align: center;
  border-radius: 4px;
}
.kpi-card--info { border-left-color: #0063CB; }
.kpi-card--success { border-left-color: #18753C; }
.kpi-card--warning { border-left-color: #D64D00; }
.kpi-card--error { border-left-color: #C9191E; }
.kpi-value { display: block; font-size: 2.5rem; font-weight: 700; color: var(--text-title-grey); }
.kpi-label { display: block; font-size: 0.875rem; color: var(--text-mention-grey); margin-top: 0.5rem; }
</style>

<div class="fr-container fr-my-4w">
  <div class="kpi-card${variant ? ' kpi-card--' + variant : ''}">
    <span class="kpi-value">${formatKPIValueLocal(kpiValue, unit)}</span>
    <span class="kpi-label">${escapeHtml(config.title || 'Indicateur')}</span>
  </div>
</div>`;
}

// ---------------------------------------------------------------------------
// Gauge
// ---------------------------------------------------------------------------

function generateGaugeCode(config: ChartConfig, data: AggregatedResult[]): string {
  const gaugeValue = data[0]?.value || 0;

  return `<!-- Jauge generee avec gouv-widgets Builder IA -->
<!-- Source : ${state.source?.name || 'Donnees locales'} -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<style>
.gauge-card {
  background: var(--background-default-grey);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  display: inline-block;
}
.gauge-container { position: relative; width: 200px; }
.gauge-svg { width: 100%; height: auto; }
.gauge-value {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-title-grey);
}
.gauge-label {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-mention-grey);
}
</style>

<div class="fr-container fr-my-4w">
  <div class="gauge-card">
    <div class="gauge-container">
      <svg viewBox="0 0 200 120" class="gauge-svg">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e0e0e0" stroke-width="20" stroke-linecap="round"/>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="${config.color || '#000091'}" stroke-width="20" stroke-linecap="round"
              stroke-dasharray="${(gaugeValue / 100) * 251.2} 251.2"/>
      </svg>
      <div class="gauge-value">${Math.round(gaugeValue)}%</div>
      <div class="gauge-label">${escapeHtml(config.title || 'Jauge')}</div>
    </div>
  </div>
</div>`;
}

// ---------------------------------------------------------------------------
// Scatter
// ---------------------------------------------------------------------------

function generateScatterCode(config: ChartConfig, data: AggregatedResult[]): string {
  const scatterData = data.map(d => ({ x: parseFloat(d.label) || 0, y: d.value }));

  return `<!-- Nuage de points genere avec gouv-widgets Builder IA -->
<!-- Source : ${state.source?.name || 'Donnees locales'} -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Nuage de points')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <div id="chart-container" style="height: 400px; position: relative;">
    <canvas id="myChart"></canvas>
  </div>
</div>

<script>
// Donnees embarquees
const scatterData = ${JSON.stringify(scatterData, null, 2)};

new Chart(document.getElementById('myChart'), {
  type: 'scatter',
  data: {
    datasets: [{
      label: '${config.valueField}',
      data: scatterData,
      backgroundColor: '${config.color || '#000091'}',
      borderColor: '${config.color || '#000091'}',
      pointRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
<\/script>`;
}

// ---------------------------------------------------------------------------
// Map
// ---------------------------------------------------------------------------

function generateMapCode(config: ChartConfig, data: AggregatedResult[]): string {
  // Transform data to DSFR format: {"code": value, ...}
  const mapData: Record<string, number> = {};
  data.forEach(d => {
    let code = String(d.code || d.label || '').trim();
    if (/^\d+$/.test(code) && code.length < 3) {
      code = code.padStart(2, '0');
    }
    const value = d.value || 0;
    if (isValidDeptCode(code)) {
      mapData[code] = Math.round(value * 100) / 100;
    }
  });

  // API-dynamic variant
  if (state.source?.type === 'api' && state.source?.url) {
    const valueExpr = config.aggregation === 'count'
      ? 'count(*) as value'
      : `${config.aggregation}(${config.valueField}) as value`;

    const params = new URLSearchParams({
      select: `${config.codeField}, ${valueExpr}`,
      group_by: config.codeField!,
      limit: '200',
    });

    const apiUrl = `${state.source.url}?${params}`;

    return `<!-- Carte generee avec gouv-widgets Builder IA -->
<!-- Source API dynamique : les donnees se mettent a jour automatiquement -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Carte de France')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}
  <div id="map-container"></div>
</div>

<script type="module">
const API_URL = '${apiUrl}';

// Valide un code de departement francais
function isValidDeptCode(code) {
  if (!code || typeof code !== 'string') return false;
  if (['N/A', 'null', 'undefined', '00', ''].includes(code)) return false;
  if (code === '2A' || code === '2B') return true;
  if (/^97[1-6]$/.test(code)) return true;
  if (/^(0[1-9]|[1-8]\\d|9[0-5])$/.test(code)) return true;
  return false;
}

async function loadMap() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    const records = json.results || [];

    // Transformer les donnees en format carte: {"code": valeur, ...}
    const mapData = {};
    records.forEach(d => {
      let code = String(d['${config.codeField}'] || '').trim();
      if (/^\\d+$/.test(code) && code.length < 3) {
        code = code.padStart(2, '0');
      }
      const value = d.value || 0;
      if (isValidDeptCode(code)) {
        mapData[code] = Math.round(value * 100) / 100;
      }
    });

    document.getElementById('map-container').innerHTML = \`
      <map-chart
        data='\${JSON.stringify(mapData)}'
        name="${escapeHtml(config.title || 'Carte')}"
        selected-palette="${config.palette || 'sequentialAscending'}"
      ></map-chart>
    \`;
  } catch (error) {
    console.error('Erreur chargement carte:', error);
    document.getElementById('map-container').innerHTML = '<p class="fr-text--error">Erreur de chargement</p>';
  }
}

loadMap();
<\/script>`;
  }

  // Embedded-data variant
  return `<!-- Carte generee avec gouv-widgets Builder IA -->
<!-- Source : ${state.source?.name || 'Donnees locales'} -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Carte de France')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}
  <map-chart
    data='${JSON.stringify(mapData)}'
    name="${escapeHtml(config.title || 'Carte')}"
    selected-palette="${config.palette || 'sequentialAscending'}"
  ></map-chart>
</div>`;
}

// ---------------------------------------------------------------------------
// Standard chart types (bar, line, pie, doughnut, radar, horizontalBar)
// ---------------------------------------------------------------------------

function generateStandardChartCode(config: ChartConfig, data: AggregatedResult[]): string {
  const isMultiColor = ['pie', 'doughnut', 'radar'].includes(config.type);
  const colorsArray = JSON.stringify(DSFR_COLORS.slice(0, config.limit || 10));

  // API-dynamic variant
  if (state.source?.type === 'api' && state.source?.url) {
    return generateStandardChartCodeAPI(config, isMultiColor, colorsArray);
  }

  // Embedded-data variant
  return generateStandardChartCodeEmbedded(config, data, isMultiColor, colorsArray);
}

function generateStandardChartCodeAPI(config: ChartConfig, isMultiColor: boolean, colorsArray: string): string {
  const valueExpr = config.aggregation === 'count'
    ? 'count(*) as value'
    : `${config.aggregation}(${config.valueField}) as value`;

  const params = new URLSearchParams({
    select: `${config.labelField}, ${valueExpr}`,
    group_by: config.labelField!,
    order_by: `value ${config.sortOrder || 'desc'}`,
    limit: (config.limit || 10).toString(),
  });

  const apiUrl = `${state.source!.url}?${params}`;

  return `<!-- Graphique genere avec gouv-widgets Builder IA -->
<!-- Source API dynamique : les donnees se mettent a jour automatiquement -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Mon graphique')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <div id="chart-container" style="height: 400px; position: relative;">
    <canvas id="myChart"></canvas>
  </div>

  <!-- Alternative accessible (RGAA) -->
  <details class="fr-accordion fr-mt-2w">
    <summary class="fr-accordion__btn">Voir les donnees en tableau</summary>
    <div class="fr-accordion__content">
      <table class="fr-table" id="data-table">
        <thead><tr><th>${escapeHtml(config.labelField || '')}</th><th>Valeur</th></tr></thead>
        <tbody id="table-body"></tbody>
      </table>
    </div>
  </details>
</div>

<script>
// URL de l'API avec agregation ODSQL
const API_URL = '${apiUrl}';

// Palette DSFR
const DSFR_COLORS = ${colorsArray};

async function loadChart() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    const data = json.results || [];

    const labels = data.map(d => d['${config.labelField}'] || 'N/A');
    const values = data.map(d => Math.round((d.value || 0) * 100) / 100);

    new Chart(document.getElementById('myChart'), {
      type: '${config.type === 'horizontalBar' ? 'bar' : config.type}',
      data: {
        labels: labels,
        datasets: [{
          label: '${config.valueField}',
          data: values,
          backgroundColor: ${isMultiColor ? 'DSFR_COLORS.slice(0, data.length)' : `'${config.color || '#000091'}'`},
          borderColor: '${config.color || '#000091'}',
          borderWidth: ${config.type === 'line' ? 2 : 1}
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false${config.type === 'horizontalBar' ? ",\n        indexAxis: 'y'" : ''},
        plugins: { legend: { display: ${isMultiColor} } }
      }
    });

    // Remplir le tableau accessible
    const tbody = document.getElementById('table-body');
    data.forEach(d => {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td>' + (d['${config.labelField}'] || 'N/A') + '</td><td>' + (d.value?.toFixed(2) || '\u2014') + '</td>';
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erreur chargement donnees:', error);
    document.getElementById('chart-container').innerHTML = '<p class="fr-text--error">Erreur de chargement des donnees</p>';
  }
}

loadChart();
<\/script>`;
}

function generateStandardChartCodeEmbedded(config: ChartConfig, data: AggregatedResult[], isMultiColor: boolean, colorsArray: string): string {
  const sourceName = state.source?.name || 'Donnees locales';
  const sourceType = state.source?.type === 'grist' ? 'Grist' : 'source manuelle';
  const hasSecondSeries = !!(config.valueField2 && config.data2 && config.data2.length > 0);

  // Build datasets code
  let datasetsCode = `[{
      label: '${config.valueField}',
      data: values,
      backgroundColor: ${isMultiColor ? 'DSFR_COLORS.slice(0, data.length)' : `'${config.color || '#000091'}'`},
      borderColor: '${config.color || '#000091'}',
      borderWidth: ${config.type === 'line' ? 2 : 1}
    }`;

  if (hasSecondSeries) {
    datasetsCode += `, {
      label: '${config.valueField2}',
      data: values2,
      backgroundColor: '${config.color2 || '#E1000F'}',
      borderColor: '${config.color2 || '#E1000F'}',
      borderWidth: ${config.type === 'line' ? 2 : 1}
    }`;
  }
  datasetsCode += ']';

  return `<!-- Graphique genere avec gouv-widgets Builder IA -->
<!-- Source : ${sourceName} (${sourceType}) - donnees embarquees -->
${hasSecondSeries ? '<!-- Note: Graphique multi-series -->' : ''}

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Mon graphique')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <div id="chart-container" style="height: 400px; position: relative;">
    <canvas id="myChart"></canvas>
  </div>
</div>

<script>
// Donnees embarquees (depuis ${sourceType})
const data = ${JSON.stringify(data, null, 2)};
${hasSecondSeries ? `const data2 = ${JSON.stringify(config.data2, null, 2)};` : ''}

// Palette DSFR
const DSFR_COLORS = ${colorsArray};

const labels = data.map(d => d.label);
const values = data.map(d => Math.round(d.value * 100) / 100);
${hasSecondSeries ? 'const values2 = data2.map(d => Math.round(d.value * 100) / 100);' : ''}

new Chart(document.getElementById('myChart'), {
  type: '${config.type === 'horizontalBar' ? 'bar' : config.type}',
  data: {
    labels: labels,
    datasets: ${datasetsCode}
  },
  options: {
    responsive: true,
    maintainAspectRatio: false${config.type === 'horizontalBar' ? ",\n    indexAxis: 'y'" : ''},
    plugins: { legend: { display: ${hasSecondSeries || isMultiColor} } }
  }
});
<\/script>`;
}
