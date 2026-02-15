/**
 * Code generation - produces embeddable HTML+JS code for each chart type
 */

import { escapeHtml, DSFR_COLORS, isValidDeptCode } from '@gouv-widgets/shared';
import { state } from '../state.js';
import type { ChartConfig, AggregatedResult } from '../state.js';

const PROXY_BASE_URL = 'https://chartsbuilder.matge.com';

/** Regex to parse an ODS v2.1 records URL into [baseUrl, datasetId] */
const ODS_URL_RE = /^(https?:\/\/[^/]+)\/api\/explore\/v2\.1\/catalog\/datasets\/([^/]+)\/records/;

/** Regex to parse a Tabular API URL into [baseUrl, resourceId] */
const TABULAR_URL_RE = /^(https?:\/\/[^/]+)\/api\/resources\/([^/]+)\/data\/?/;

/**
 * Build ODSQL select expression from aggregation config + group-by field.
 * Example: aggregation="sum", valueField="montant", groupBy="dept"
 * => "sum(montant) as montant__sum, dept"
 * This outputs the native ODS select param so the component doesn't need
 * to do aggregate-to-select conversion (works with any UMD version).
 */
function buildOdsSelect(aggregation: string, valueField: string, groupByField: string): { selectExpr: string; resultField: string } {
  const func = aggregation || 'sum';
  const odsFunc = func === 'count' ? 'count(*)' : `${func}(${valueField})`;
  const alias = func === 'count' ? 'count__count' : `${valueField}__${func}`;
  return {
    selectExpr: `${odsFunc} as ${alias}, ${groupByField}`,
    resultField: alias,
  };
}

/**
 * Auto-detect a geographic code field from the available fields.
 * Looks for common patterns: code_departement, code_dep, code_region, etc.
 */
function autoDetectCodeField(): string | undefined {
  const patterns = [
    /^code.?dep/i, /^dep.?code/i, /^code.?region/i, /^reg.?code/i,
    /^departement$/i, /^region$/i, /^code_geo/i, /^code_insee/i,
  ];
  for (const f of state.fields) {
    for (const p of patterns) {
      if (p.test(f.name)) return f.name;
    }
  }
  return undefined;
}

/**
 * Returns true if the current source has more records than we fetched locally
 * (e.g. ODS returned total_count > 100). This means generated code should use
 * gouv-query with pagination instead of raw fetch or embedded data.
 */
function needsPagination(): boolean {
  return !!(state.source?.recordCount
    && state.localData
    && state.source.recordCount > state.localData.length);
}

/**
 * Parse the current source URL as a Tabular API URL.
 * Returns baseUrl and resourceId, or null if not Tabular.
 */
function parseTabularUrl(): { baseUrl: string; resourceId: string } | null {
  if (!state.source?.apiUrl) return null;
  const match = state.source.apiUrl.match(TABULAR_URL_RE);
  return match ? { baseUrl: match[1], resourceId: match[2] } : null;
}

/**
 * Convert where filter syntax "field:op:value" to ODSQL WHERE clause.
 * Example: "code_departement:eq:48, prix:gte:100" -> "code_departement='48' AND prix>=100"
 */
function whereToOdsql(where: string): string {
  const parts = where.split(',').map(p => p.trim()).filter(Boolean);
  const clauses = parts.map(part => {
    const segments = part.split(':');
    if (segments.length < 2) return '';
    const field = segments[0];
    const op = segments[1];
    const value = segments.slice(2).join(':');
    const isNum = !isNaN(Number(value)) && value !== '';
    const quoted = isNum ? value : `'${value}'`;

    switch (op) {
      case 'eq': return `${field}=${quoted}`;
      case 'neq': return `${field}!=${quoted}`;
      case 'gt': return `${field}>${quoted}`;
      case 'gte': return `${field}>=${quoted}`;
      case 'lt': return `${field}<${quoted}`;
      case 'lte': return `${field}<=${quoted}`;
      case 'contains': return `${field} like '%${value}%'`;
      case 'in': return `${field} in (${value.split('|').map(v => isNaN(Number(v)) ? `'${v}'` : v).join(',')})`;
      default: return '';
    }
  }).filter(Boolean);
  return clauses.join(' AND ');
}

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

  // Handle map type (department or region)
  if (config.type === 'map' || config.type === 'map-reg') {
    codeEl.textContent = generateMapCode(config, data);
    return;
  }

  // Handle datalist type
  if (config.type === 'datalist') {
    codeEl.textContent = generateDatalistCode(config);
    return;
  }

  // Handle standard chart types (bar, line, pie, doughnut, radar, horizontalBar, bar-line)
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
  if (state.source?.type === 'api' && state.source?.apiUrl) {
    const valueExpr = config.aggregation === 'count'
      ? 'count(*) as value'
      : `${config.aggregation}(${config.valueField}) as value`;

    const params = new URLSearchParams({ select: valueExpr });
    if (config.where) {
      params.set('where', whereToOdsql(config.where));
    }
    const apiUrl = `${state.source.apiUrl}?${params}`;

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
  const gaugeValue = Math.round(data[0]?.value || 0);

  return `<!-- Jauge generee avec gouv-widgets Builder IA -->
<!-- Source : ${state.source?.name || 'Donnees locales'} -->

<!-- Dependances (DSFR Chart) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Jauge')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}
  <gauge-chart percent="${gaugeValue}" init="0" target="100"></gauge-chart>
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
  // Fallback: use labelField if codeField is missing (same as chart-renderer)
  const codeField = config.codeField || config.labelField || autoDetectCodeField();

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

  // API-dynamic variant using gouv-query + gouv-dsfr-chart (auto-pagination)
  if (state.source?.type === 'api' && state.source?.apiUrl) {
    const odsMatch = state.source.apiUrl.match(ODS_URL_RE);

    if (odsMatch && needsPagination()) {
      // ODS source: use gouv-query with api-type="opendatasoft" for automatic pagination
      const baseUrl = odsMatch[1];
      const datasetId = odsMatch[2];
      const { selectExpr, resultField } = buildOdsSelect(config.aggregation || 'sum', config.valueField, codeField!);
      const whereAttr = config.where
        ? `\n    where="${whereToOdsql(config.where)}"` : '';

      return `<!-- Carte generee avec gouv-widgets Builder IA -->
<!-- Source API dynamique avec pagination automatique -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Carte de France')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <gouv-query
    id="map-data"
    api-type="opendatasoft"
    base-url="${baseUrl}"
    dataset-id="${datasetId}"
    select="${selectExpr}"
    group-by="${codeField}"${whereAttr}>
  </gouv-query>

  <gouv-dsfr-chart
    source="map-data"
    type="${config.type}"
    code-field="${codeField}"
    value-field="${resultField}"
    name="${escapeHtml(config.title || 'Carte')}"
    selected-palette="${config.palette || 'sequentialAscending'}">
  </gouv-dsfr-chart>
</div>`;
    }

    // Tabular source with pagination needed: use gouv-query with api-type="tabular"
    const tabularMatch = parseTabularUrl();
    if (tabularMatch && needsPagination()) {
      const aggregateExpr = config.aggregation === 'count'
        ? `${codeField}:count`
        : `${config.valueField}:${config.aggregation || 'sum'}`;
      const resultField = config.aggregation === 'count'
        ? `${codeField}__count`
        : `${config.valueField}__${config.aggregation || 'sum'}`;
      const filterAttr = config.where
        ? `\n    filter="${config.where}"` : '';

      return `<!-- Carte generee avec gouv-widgets Builder IA -->
<!-- Source API Tabular avec pagination automatique -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Carte de France')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <gouv-query
    id="map-data"
    api-type="tabular"
    base-url="${tabularMatch.baseUrl}"
    resource="${tabularMatch.resourceId}"
    group-by="${codeField}"
    aggregate="${aggregateExpr}"${filterAttr}>
  </gouv-query>

  <gouv-dsfr-chart
    source="map-data"
    type="${config.type}"
    code-field="${codeField}"
    value-field="${resultField}"
    name="${escapeHtml(config.title || 'Carte')}"
    selected-palette="${config.palette || 'sequentialAscending'}">
  </gouv-dsfr-chart>
</div>`;
    }

    // Non-ODS/Tabular API: fall back to gouv-source + gouv-dsfr-chart
    let sourceUrl = state.source.apiUrl;
    if (config.where) {
      const url = new URL(sourceUrl);
      url.searchParams.set('where', whereToOdsql(config.where));
      sourceUrl = url.toString();
    }

    return `<!-- Carte generee avec gouv-widgets Builder IA -->
<!-- Source API dynamique -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Carte de France')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <gouv-source
    id="map-data"
    url="${sourceUrl}"
    transform="results">
  </gouv-source>

  <gouv-dsfr-chart
    source="map-data"
    type="${config.type}"
    code-field="${codeField}"
    value-field="${config.valueField}"
    name="${escapeHtml(config.title || 'Carte')}"
    selected-palette="${config.palette || 'sequentialAscending'}">
  </gouv-dsfr-chart>
</div>`;
  }

  // Embedded-data variant
  const mapTagEmbed = config.type === 'map-reg' ? 'map-chart-reg' : 'map-chart';
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
  <${mapTagEmbed}
    data='${JSON.stringify(mapData)}'
    name="${escapeHtml(config.title || 'Carte')}"
    selected-palette="${config.palette || 'sequentialAscending'}"
  ></${mapTagEmbed}>
</div>`;
}

// ---------------------------------------------------------------------------
// Datalist (table)
// ---------------------------------------------------------------------------

function generateDatalistCode(config: ChartConfig): string {
  // Build colonnes attribute: from config or auto-detect from fields
  let colonnes: string;
  if (config.colonnes) {
    colonnes = config.colonnes;
  } else {
    colonnes = state.fields.map(f => `${f.name}:${f.name}`).join(', ');
  }

  const triAttr = config.sortOrder && config.labelField
    ? `\n    tri="${config.labelField}:${config.sortOrder}"` : '';
  const pagination = config.pagination || 10;

  // API-dynamic variant
  if (state.source?.type === 'api' && state.source?.apiUrl) {
    const whereOds = config.where ? whereToOdsql(config.where) : '';

    // ODS with pagination: use gouv-query for auto-pagination
    const odsMatch = state.source.apiUrl.match(ODS_URL_RE);
    if (odsMatch && needsPagination()) {
      const whereAttr = whereOds ? `\n    where="${whereOds}"` : '';

      return `<!-- Tableau dynamique genere avec gouv-widgets Builder IA -->
<!-- Source API dynamique avec pagination automatique -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${config.title ? `<h2>${escapeHtml(config.title)}</h2>` : ''}
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <gouv-query
    id="table-data"
    api-type="opendatasoft"
    base-url="${odsMatch[1]}"
    dataset-id="${odsMatch[2]}"${whereAttr}>
  </gouv-query>

  <gouv-datalist
    source="table-data"
    colonnes="${colonnes}"
    recherche${triAttr}
    pagination="${pagination}"
    export="csv">
  </gouv-datalist>
</div>`;
    }

    // Tabular with pagination: use gouv-query for auto-pagination
    const tabularMatch = parseTabularUrl();
    if (tabularMatch && needsPagination()) {
      const filterAttr = config.where ? `\n    filter="${config.where}"` : '';

      return `<!-- Tableau dynamique genere avec gouv-widgets Builder IA -->
<!-- Source API Tabular avec pagination automatique -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${config.title ? `<h2>${escapeHtml(config.title)}</h2>` : ''}
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <gouv-query
    id="table-data"
    api-type="tabular"
    base-url="${tabularMatch.baseUrl}"
    resource="${tabularMatch.resourceId}"${filterAttr}>
  </gouv-query>

  <gouv-datalist
    source="table-data"
    colonnes="${colonnes}"
    recherche${triAttr}
    pagination="${pagination}"
    export="csv">
  </gouv-datalist>
</div>`;
    }

    // Standard API: use gouv-source
    let sourceUrl = state.source.apiUrl;
    if (whereOds) {
      const url = new URL(sourceUrl);
      url.searchParams.set('where', whereOds);
      sourceUrl = url.toString();
    }

    return `<!-- Tableau dynamique genere avec gouv-widgets Builder IA -->
<!-- Source API dynamique : les donnees se mettent a jour automatiquement -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${config.title ? `<h2>${escapeHtml(config.title)}</h2>` : ''}
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <gouv-source
    id="table-data"
    url="${sourceUrl}"
    transform="records">
  </gouv-source>

  <gouv-datalist
    source="table-data"
    colonnes="${colonnes}"
    recherche${triAttr}
    pagination="${pagination}"
    export="csv">
  </gouv-datalist>
</div>`;
  }

  // Embedded-data variant
  const rawData = state.localData || [];
  return `<!-- Tableau genere avec gouv-widgets Builder IA -->
<!-- Source : ${state.source?.name || 'Donnees locales'} - donnees embarquees -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${config.title ? `<h2>${escapeHtml(config.title)}</h2>` : ''}
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <gouv-datalist
    id="my-table"
    colonnes="${colonnes}"
    recherche${triAttr}
    pagination="${pagination}"
    export="csv">
  </gouv-datalist>
</div>

<script>
// Donnees integrees
const data = ${JSON.stringify(rawData.slice(0, 500), null, 2)};

// Injecter les donnees dans le composant
document.getElementById('my-table').onSourceData(data);
<\/script>`;
}

// ---------------------------------------------------------------------------
// Standard chart types (bar, line, pie, doughnut, radar, horizontalBar)
// ---------------------------------------------------------------------------

function generateStandardChartCode(config: ChartConfig, data: AggregatedResult[]): string {
  const isMultiColor = ['pie', 'doughnut', 'radar'].includes(config.type);
  const colorsArray = JSON.stringify(DSFR_COLORS.slice(0, data.length || 10));

  // ODS/Tabular with pagination needed: use gouv-query + gouv-dsfr-chart
  if (state.source?.type === 'api' && state.source?.apiUrl && needsPagination()) {
    const odsMatch = state.source.apiUrl.match(ODS_URL_RE);
    if (odsMatch) {
      return generateStandardChartCodeODS(config, odsMatch[1], odsMatch[2]);
    }
    const tabularMatch = parseTabularUrl();
    if (tabularMatch) {
      return generateStandardChartCodeTabular(config, tabularMatch.baseUrl, tabularMatch.resourceId);
    }
  }

  // API-dynamic variant (single-page fetch)
  if (state.source?.type === 'api' && state.source?.apiUrl) {
    return generateStandardChartCodeAPI(config, isMultiColor, colorsArray);
  }

  // Embedded-data variant
  return generateStandardChartCodeEmbedded(config, data, isMultiColor, colorsArray);
}

function generateStandardChartCodeODS(config: ChartConfig, baseUrl: string, datasetId: string): string {
  const { selectExpr, resultField } = buildOdsSelect(config.aggregation || 'sum', config.valueField, config.labelField!);
  const whereAttr = config.where
    ? `\n    where="${whereToOdsql(config.where)}"` : '';
  const orderAttr = config.sortOrder && config.labelField
    ? `\n    order-by="${config.labelField}:${config.sortOrder}"` : '';
  const chartType = config.type === 'horizontalBar' ? 'bar' : (config.type === 'bar-line' ? 'bar' : config.type);
  const horizontalAttr = config.type === 'horizontalBar' ? '\n    horizontal' : '';

  return `<!-- Graphique genere avec gouv-widgets Builder IA -->
<!-- Source API dynamique avec pagination automatique -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Mon graphique')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <gouv-query
    id="chart-data"
    api-type="opendatasoft"
    base-url="${baseUrl}"
    dataset-id="${datasetId}"
    select="${selectExpr}"
    group-by="${config.labelField}"${whereAttr}${orderAttr}>
  </gouv-query>

  <gouv-dsfr-chart
    source="chart-data"
    type="${chartType}"
    label-field="${config.labelField}"
    value-field="${resultField}"
    name="${escapeHtml(config.title || 'Mon graphique')}"${horizontalAttr}
    selected-palette="${config.palette || 'categorical'}">
  </gouv-dsfr-chart>
</div>`;
}

function generateStandardChartCodeTabular(config: ChartConfig, baseUrl: string, resourceId: string): string {
  const aggregateExpr = config.aggregation === 'count'
    ? `${config.labelField}:count`
    : `${config.valueField}:${config.aggregation || 'sum'}`;
  const resultField = config.aggregation === 'count'
    ? `${config.labelField}__count`
    : `${config.valueField}__${config.aggregation || 'sum'}`;
  const filterAttr = config.where
    ? `\n    filter="${config.where}"` : '';
  const orderAttr = config.sortOrder && config.labelField
    ? `\n    order-by="${resultField}:${config.sortOrder}"` : '';
  const chartType = config.type === 'horizontalBar' ? 'bar' : (config.type === 'bar-line' ? 'bar' : config.type);
  const horizontalAttr = config.type === 'horizontalBar' ? '\n    horizontal' : '';

  return `<!-- Graphique genere avec gouv-widgets Builder IA -->
<!-- Source API Tabular avec pagination automatique -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(config.title || 'Mon graphique')}</h2>
  ${config.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(config.subtitle)}</p>` : ''}

  <gouv-query
    id="chart-data"
    api-type="tabular"
    base-url="${baseUrl}"
    resource="${resourceId}"
    group-by="${config.labelField}"
    aggregate="${aggregateExpr}"${filterAttr}${orderAttr}>
  </gouv-query>

  <gouv-dsfr-chart
    source="chart-data"
    type="${chartType}"
    label-field="${config.labelField}"
    value-field="${resultField}"
    name="${escapeHtml(config.title || 'Mon graphique')}"${horizontalAttr}
    selected-palette="${config.palette || 'categorical'}">
  </gouv-dsfr-chart>
</div>`;
}

function generateStandardChartCodeAPI(config: ChartConfig, isMultiColor: boolean, colorsArray: string): string {
  const valueExpr = config.aggregation === 'count'
    ? 'count(*) as value'
    : `${config.aggregation}(${config.valueField}) as value`;

  const params = new URLSearchParams({
    select: `${config.labelField}, ${valueExpr}`,
    group_by: config.labelField!,
    order_by: `value ${config.sortOrder || 'desc'}`,
  });
  if (config.where) {
    params.set('where', whereToOdsql(config.where));
  }

  const apiUrl = `${state.source!.apiUrl}?${params}`;

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
      type: '${config.type === 'horizontalBar' || config.type === 'bar-line' ? 'bar' : config.type}',
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
  const isBarLine = config.type === 'bar-line';

  // Build datasets code
  let datasetsCode = `[{
      label: '${config.valueField}',
      data: values,
      backgroundColor: ${isMultiColor ? 'DSFR_COLORS.slice(0, data.length)' : `'${config.color || '#000091'}'`},
      borderColor: '${config.color || '#000091'}',
      borderWidth: ${config.type === 'line' ? 2 : 1}${isBarLine ? ",\n      type: 'bar'" : ''}
    }`;

  if (hasSecondSeries) {
    datasetsCode += `, {
      label: '${config.valueField2}',
      data: values2,
      backgroundColor: '${isBarLine ? 'transparent' : (config.color2 || '#E1000F')}',
      borderColor: '${config.color2 || '#E1000F'}',
      borderWidth: 2${isBarLine ? ",\n      type: 'line'" : ''}
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
  type: '${config.type === 'horizontalBar' || config.type === 'bar-line' ? 'bar' : config.type}',
  data: {
    labels: labels,
    datasets: ${datasetsCode}
  },
  options: {
    responsive: true,
    maintainAspectRatio: false${config.type === 'horizontalBar' ? ",\n    indexAxis: 'y'" : ''},
    plugins: { legend: { display: ${hasSecondSeries || isMultiColor || isBarLine} } }
  }
});
<\/script>`;
}
