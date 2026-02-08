/**
 * Code generation functions.
 * Contains all code generation paths: local data, dynamic Grist,
 * dynamic API, and standard API-fetched data.
 */

import {
  escapeHtml,
  formatKPIValue,
  toNumber,
  isValidDeptCode,
  PALETTE_PRIMARY_COLOR,
  PALETTE_COLORS,
  toastWarning,
  toastError,
} from '@gouv-widgets/shared';
import { state, PROXY_BASE_URL } from '../state.js';
import { renderChart } from './chart-renderer.js';
import { updateAccessibleTable } from './accessible-table.js';

/**
 * Main orchestrator: reads form state, validates, routes to correct code gen path.
 */
export async function generateChart(): Promise<void> {
  // Get current values from form
  const labelField = document.getElementById('label-field') as HTMLSelectElement | null;
  const valueField = document.getElementById('value-field') as HTMLSelectElement | null;
  const valueField2 = document.getElementById('value-field-2') as HTMLSelectElement | null;
  const codeField = document.getElementById('code-field') as HTMLSelectElement | null;
  const aggregation = document.getElementById('aggregation') as HTMLSelectElement | null;
  const limitInput = document.getElementById('limit') as HTMLInputElement | null;
  const sortOrder = document.getElementById('sort-order') as HTMLSelectElement | null;

  if (labelField) state.labelField = labelField.value;
  if (valueField) state.valueField = valueField.value;
  state.valueField2 = valueField2?.value || '';
  state.codeField = codeField?.value || '';
  if (aggregation) state.aggregation = aggregation.value as typeof state.aggregation;
  state.limit = parseInt(limitInput?.value || '10') || 10;
  if (sortOrder) state.sortOrder = sortOrder.value as typeof state.sortOrder;

  const isKPI = state.chartType === 'kpi';
  const isGauge = state.chartType === 'gauge';
  const isSingleValue = isKPI || isGauge;

  // Validation: KPI/Gauge only need valueField, charts need both
  if (!isSingleValue && (!state.labelField || !state.valueField)) {
    toastWarning('Veuillez s\u00e9lectionner les champs pour les axes X et Y');
    return;
  }
  if (isSingleValue && !state.valueField && state.aggregation !== 'count') {
    toastWarning('Veuillez s\u00e9lectionner un champ pour la valeur');
    return;
  }

  // Check if using local data
  if (state.sourceType === 'saved' && state.localData && state.localData.length > 0) {
    generateChartFromLocalData();
    return;
  }

  // Build API URL with aggregation
  const valueExpression = state.aggregation === 'count'
    ? 'count(*) as value'
    : `${state.aggregation}(${state.valueField}) as value`;

  // Handle second series if defined
  const hasSecondSeries = state.valueField2 && ['bar', 'horizontalBar', 'line', 'radar'].includes(state.chartType);
  const valueExpression2 = hasSecondSeries
    ? `, ${state.aggregation}(${state.valueField2}) as value2`
    : '';

  let params: URLSearchParams;
  if (isSingleValue) {
    // KPI/Gauge: just get the single aggregated value, no group_by
    params = new URLSearchParams({
      select: valueExpression,
      limit: '1',
    });
  } else {
    // Chart: group by label field
    params = new URLSearchParams({
      select: `${state.labelField}, ${valueExpression}${valueExpression2}`,
      group_by: state.labelField,
      order_by: `value ${state.sortOrder}`,
      limit: state.limit.toString(),
    });
  }

  const apiUrl = `${state.apiUrl}?${params}`;

  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    state.data = json.results || [];

    // Update raw data view
    const rawDataEl = document.getElementById('raw-data');
    if (rawDataEl) rawDataEl.textContent = JSON.stringify(state.data, null, 2);

    // Render chart or KPI
    renderChart();

    // Generate code
    generateCode(apiUrl);

    // Update accessible table (only for charts)
    if (!isKPI) {
      updateAccessibleTable();
    }
  } catch (error) {
    console.error(error);
    toastError('Erreur lors du chargement des donn\u00e9es : ' + (error as Error).message);
  }
}

/**
 * Aggregate local data client-side, render, and generate code.
 */
export function generateChartFromLocalData(): void {
  // Aggregate local data
  const aggregated: Record<string, { values: number[]; count: number }> = {};

  // For maps, aggregate by codeField; for other charts, by labelField
  const isMap = state.chartType === 'map';
  const groupField = isMap ? state.codeField : state.labelField;

  if (state.localData) {
    state.localData.forEach(record => {
      const rawGroupKey = record[groupField] as string | number | null;
      // For maps, skip records with invalid codes
      if (isMap && (rawGroupKey === null || rawGroupKey === undefined || rawGroupKey === '')) {
        return; // Skip this record
      }
      const groupKey = String(rawGroupKey || 'N/A');
      const value = toNumber(record[state.valueField]);

      if (!aggregated[groupKey]) {
        aggregated[groupKey] = { values: [], count: 0 };
      }
      aggregated[groupKey].values.push(value);
      aggregated[groupKey].count++;
    });
  }

  // Apply aggregation function
  let results = Object.entries(aggregated).map(([groupKey, data]) => {
    let value: number;
    switch (state.aggregation) {
      case 'sum':
        value = data.values.reduce((a, b) => a + b, 0);
        break;
      case 'count':
        value = data.count;
        break;
      case 'min':
        value = Math.min(...data.values);
        break;
      case 'max':
        value = Math.max(...data.values);
        break;
      case 'avg':
      default:
        value = data.values.reduce((a, b) => a + b, 0) / data.values.length;
    }
    // For maps, include codeField; for others, include labelField
    if (isMap) {
      return { [state.codeField]: groupKey, value };
    }
    return { [state.labelField]: groupKey, value };
  });

  // Sort
  results.sort((a, b) => {
    return state.sortOrder === 'desc'
      ? (b.value as number) - (a.value as number)
      : (a.value as number) - (b.value as number);
  });

  // Limit
  results = results.slice(0, state.limit);

  state.data = results;

  // Update raw data view
  const rawDataEl = document.getElementById('raw-data');
  if (rawDataEl) rawDataEl.textContent = JSON.stringify(state.data, null, 2);

  // Render chart
  renderChart();

  // Generate code based on mode
  if (state.generationMode === 'dynamic') {
    if (state.savedSource?.type === 'grist') {
      generateDynamicCode();
    } else if (state.savedSource?.type === 'api') {
      generateDynamicCodeForApi();
    } else {
      generateCodeForLocalData();
    }
  } else {
    generateCodeForLocalData();
  }

  // Update accessible table
  updateAccessibleTable();
}

/**
 * Generate embedded HTML+JS code for local data.
 */
export function generateCodeForLocalData(): void {
  const codeEl = document.getElementById('generated-code');
  if (!codeEl) return;

  // Handle KPI type
  if (state.chartType === 'kpi') {
    const value = state.data[0]?.value || 0;
    const variantSelect = document.getElementById('kpi-variant') as HTMLSelectElement | null;
    const unitInput = document.getElementById('kpi-unit') as HTMLInputElement | null;
    const variant = variantSelect?.value || '';
    const unit = unitInput?.value || '';

    const code = `<!-- KPI g\u00e9n\u00e9r\u00e9 avec gouv-widgets Builder -->
<!-- Source : ${state.savedSource?.name || 'Donn\u00e9es locales'} -->

<!-- D\u00e9pendances CSS (DSFR) -->
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
    <span class="kpi-value">${formatKPIValue(value, unit)}</span>
    <span class="kpi-label">${escapeHtml(state.title)}</span>
  </div>
</div>`;
    codeEl.textContent = code;
    return;
  }

  // Handle Gauge type (local data)
  if (state.chartType === 'gauge') {
    const value = Math.round(state.data[0]?.value || 0);
    const code = `<!-- Jauge g\u00e9n\u00e9r\u00e9e avec gouv-widgets Builder -->
<!-- Source : ${state.savedSource?.name || 'Donn\u00e9es locales'} -->

<!-- D\u00e9pendances (DSFR Chart) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}
  <gauge-chart percent="${value}" init="0" target="100"></gauge-chart>
</div>`;
    codeEl.textContent = code;
    return;
  }

  // Handle Scatter type (local data)
  if (state.chartType === 'scatter') {
    const scatterColor = PALETTE_PRIMARY_COLOR[state.palette] || '#000091';
    const scatterData = state.data.map(d => ({
      x: (d[state.labelField] as number) || 0,
      y: (d.value as number) || 0,
    }));
    const code = `<!-- Nuage de points g\u00e9n\u00e9r\u00e9 avec gouv-widgets Builder -->
<!-- Source : ${state.savedSource?.name || 'Donn\u00e9es locales'} -->
<!-- Palette: ${state.palette} -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  <div style="height: 400px;"><canvas id="myChart"></canvas></div>
</div>

<script>
const data = ${JSON.stringify(scatterData, null, 2)};

new Chart(document.getElementById('myChart'), {
  type: 'scatter',
  data: {
    datasets: [{
      label: '${state.labelField} vs ${state.valueField}',
      data: data,
      backgroundColor: '${scatterColor}',
      pointRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: '${state.labelField}' } },
      y: { title: { display: true, text: '${state.valueField}' } }
    }
  }
});
<\/script>`;
    codeEl.textContent = code;
    return;
  }

  // Handle Map type (local data)
  if (state.chartType === 'map') {
    // For choropleth maps, use sequential or divergent palette for gradient
    const mapPalette = state.palette.includes('sequential') || state.palette.includes('divergent')
      ? state.palette
      : 'sequentialAscending';

    // Transform data to DSFR format: {"code": value, ...}
    const mapData: Record<string, number> = {};
    let totalValue = 0;
    let count = 0;

    state.data.forEach(d => {
      const rawCode = (d[state.codeField] ?? (d as any).code ?? '') as string | number;
      let code = String(rawCode).trim();
      if (/^\d+$/.test(code) && code.length < 3) {
        code = code.padStart(2, '0');
      }
      const value = (d.value as number) || 0;
      if (isValidDeptCode(code) && !isNaN(value)) {
        mapData[code] = Math.round(value * 100) / 100;
        totalValue += value;
        count++;
      }
    });

    const avgValue = count > 0 ? Math.round((totalValue / count) * 100) / 100 : 0;
    const today = new Date().toISOString().split('T')[0];

    const mapCode = `<!-- Carte g\u00e9n\u00e9r\u00e9e avec gouv-widgets Builder -->
<!-- Source : ${state.savedSource?.name || 'Donn\u00e9es locales'} -->
<!-- Palette: ${mapPalette} -->

<!-- D\u00e9pendances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}
  <map-chart
    data='${JSON.stringify(mapData)}'
    name="${escapeHtml(state.title || 'Donn\u00e9es')}"
    date="${today}"
    value-nat="${avgValue}"
    selected-palette="${mapPalette}"
  ></map-chart>
</div>`;
    codeEl.textContent = mapCode;
    return;
  }

  // Get palette colors for code generation
  const primaryColor = PALETTE_PRIMARY_COLOR[state.palette] || '#000091';
  const paletteColors = PALETTE_COLORS[state.palette] || PALETTE_COLORS['categorical'];

  // Check for multi-series support
  const hasSecondSeries = state.valueField2 && ['bar', 'horizontalBar', 'line', 'radar'].includes(state.chartType);
  const isMultiColor = ['pie', 'doughnut', 'radar'].includes(state.chartType);

  // Build datasets code
  let datasetsCode: string;
  if (hasSecondSeries) {
    datasetsCode = `[{
      label: '${state.valueField}',
      data: values,
      backgroundColor: '${primaryColor}',
      borderColor: '${primaryColor}',
      borderWidth: ${state.chartType === 'line' ? 2 : 1}
    }, {
      label: '${state.valueField2}',
      data: values2,
      backgroundColor: '${state.color2}',
      borderColor: '${state.color2}',
      borderWidth: ${state.chartType === 'line' ? 2 : 1}
    }]`;
  } else {
    datasetsCode = `[{
      label: '${state.valueField}',
      data: values,
      backgroundColor: ${JSON.stringify(isMultiColor ? paletteColors.slice(0, state.limit) : primaryColor)},
      borderColor: '${primaryColor}',
      borderWidth: ${state.chartType === 'line' ? 2 : 1}
    }]`;
  }

  const code = `<!-- Graphique g\u00e9n\u00e9r\u00e9 avec gouv-widgets Builder -->
<!-- Source : ${state.savedSource?.name || 'Donn\u00e9es locales'} -->

<!-- D\u00e9pendances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- D\u00e9pendances JS -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <div id="chart-container" style="height: 400px; position: relative;">
    <canvas id="myChart"></canvas>
  </div>
</div>

<script>
// Donn\u00e9es int\u00e9gr\u00e9es (depuis ${state.savedSource?.type === 'grist' ? 'Grist' : 'source manuelle'})
const data = ${JSON.stringify(state.data, null, 2)};

const labels = data.map(d => d['${state.labelField}'] || 'N/A');
const values = data.map(d => Math.round((d.value || 0) * 100) / 100);${hasSecondSeries ? `
const values2 = data.map(d => Math.round((d.value2 || 0) * 100) / 100);` : ''}

new Chart(document.getElementById('myChart'), {
  type: '${state.chartType === 'horizontalBar' ? 'bar' : state.chartType}',
  data: {
    labels: labels,
    datasets: ${datasetsCode}
  },
  options: {
    responsive: true,
    maintainAspectRatio: false${state.chartType === 'horizontalBar' ? ",\n    indexAxis: 'y'" : ''},
    plugins: { legend: { display: ${hasSecondSeries || isMultiColor} } }
  }
});
<\/script>`;

  codeEl.textContent = code;
}

/**
 * Generate gouv-query HTML when advanced mode is enabled.
 * Returns { queryElement, chartSource }.
 */
export function generateGouvQueryCode(
  sourceId: string,
  labelFieldPath: string
): { queryElement: string; chartSource: string } {
  if (!state.advancedMode) {
    return { queryElement: '', chartSource: sourceId };
  }

  const attrs: string[] = [];
  attrs.push(`source="${sourceId}"`);

  // Group by: use custom field or labelField
  const groupByField = state.queryGroupBy || labelFieldPath;
  if (groupByField) {
    attrs.push(`group-by="${groupByField}"`);
  }

  // Filters
  if (state.queryFilter) {
    attrs.push(`filter="${escapeHtml(state.queryFilter)}"`);
  }

  // Aggregations: use advanced ones or default
  if (state.queryAggregate) {
    attrs.push(`aggregate="${escapeHtml(state.queryAggregate)}"`);
  }

  // Sort and limit (use form values)
  if (state.sortOrder && state.sortOrder !== 'none') {
    // Build sort field based on aggregation
    let sortField = labelFieldPath;
    if (state.queryAggregate) {
      // If we have custom aggregations, use the first aggregated field
      const firstAgg = state.queryAggregate.split(',')[0].trim();
      const parts = firstAgg.split(':');
      if (parts.length >= 2) {
        sortField = `${parts[0]}__${parts[1]}`;
      }
    } else {
      // Otherwise use value__aggregation
      sortField = `value__${state.aggregation}`;
    }
    attrs.push(`order-by="${sortField}:${state.sortOrder}"`);
  }

  if (state.limit > 0) {
    attrs.push(`limit="${state.limit}"`);
  }

  const queryElement = `
  <!-- Requ\u00eate avanc\u00e9e (filtrage et agr\u00e9gation) -->
  <gouv-query
    id="query-data"
    ${attrs.join('\n    ')}>
  </gouv-query>`;

  return { queryElement, chartSource: 'query-data' };
}

/**
 * Generate code using gouv-source + gouv-chart for Grist sources.
 */
export function generateDynamicCode(): void {
  const source = state.savedSource;
  if (!source || source.type !== 'grist') return;

  const codeEl = document.getElementById('generated-code');
  if (!codeEl) return;

  // Build full proxy URL via chartsbuilder.matge.com
  let proxyUrl = '';
  let gristHost = '';

  if (source.apiUrl?.includes('grist.numerique.gouv.fr')) {
    proxyUrl = `${PROXY_BASE_URL}/grist-gouv-proxy/api/docs/${source.documentId}/tables/${source.tableId}/records`;
  } else if (source.apiUrl?.includes('docs.getgrist.com')) {
    proxyUrl = `${PROXY_BASE_URL}/grist-proxy/api/docs/${source.documentId}/tables/${source.tableId}/records`;
    gristHost = 'docs.getgrist.com';
  } else {
    // Self-hosted - use direct URL
    proxyUrl = source.apiUrl || '';
    gristHost = 'Grist';
  }

  // Get field info for labels
  const labelFieldInfo = state.fields.find(f => f.name === state.labelField);
  const valueFieldInfo = state.fields.find(f => f.name === state.valueField);

  // Use fullPath for dynamic mode (fields.X)
  const labelFieldPath = labelFieldInfo?.fullPath || `fields.${state.labelField}`;
  const valueFieldPath = valueFieldInfo?.fullPath || `fields.${state.valueField}`;

  const refreshAttr = state.refreshInterval > 0 ? `\n    refresh="${state.refreshInterval}"` : '';

  // Determine chart type for gouv-chart
  const chartType = state.chartType === 'horizontalBar' ? 'bar' : state.chartType;
  const indexAxisAttr = state.chartType === 'horizontalBar' ? '\n    index-axis="y"' : '';

  // Handle KPI type (not supported by gouv-chart yet, fallback to embedded)
  if (state.chartType === 'kpi') {
    generateCodeForLocalData();
    return;
  }

  // Generate gouv-query if advanced mode is enabled
  const { queryElement, chartSource } = generateGouvQueryCode('chart-data', labelFieldPath);

  // In advanced mode with gouv-query, the chart uses pre-processed data
  const chartAggregation = state.advancedMode ? 'none' : state.aggregation;
  const chartLimit = state.advancedMode ? 0 : state.limit;
  const chartSortOrder = state.advancedMode ? 'none' : state.sortOrder;

  const code = `<!-- Graphique dynamique g\u00e9n\u00e9r\u00e9 avec gouv-widgets Builder -->
<!-- Source : ${escapeHtml(source.name)} (chargement dynamique depuis ${gristHost}) -->
<!-- Les donn\u00e9es sont charg\u00e9es via le proxy ${PROXY_BASE_URL} -->
${state.advancedMode ? '<!-- Mode avanc\u00e9 activ\u00e9 : filtrage et agr\u00e9gation via gouv-query -->' : ''}

<!-- D\u00e9pendances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- D\u00e9pendances JS -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${state.title ? `<h2>${escapeHtml(state.title)}</h2>` : ''}
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <!-- Source de donn\u00e9es (via proxy chartsbuilder.matge.com) -->
  <gouv-source
    id="chart-data"
    url="${proxyUrl}"
    transform="records"${refreshAttr}>
  </gouv-source>
${queryElement}
  <!-- Graphique (se met \u00e0 jour automatiquement) -->
  <gouv-chart
    source="${chartSource}"
    type="${chartType}"${indexAxisAttr}
    label-field="${state.advancedMode ? state.queryGroupBy || labelFieldPath : labelFieldPath}"
    value-field="${state.advancedMode && state.queryAggregate ? state.queryAggregate.split(',')[0].trim().replace(':', '__') : valueFieldPath}"
    aggregation="${chartAggregation}"
    limit="${chartLimit}"
    sort-order="${chartSortOrder}"
    ${state.title ? `title="${escapeHtml(state.title)}"` : ''}
    ${state.subtitle ? `subtitle="${escapeHtml(state.subtitle)}"` : ''}
    selected-palette="${state.palette}"
    height="400">
  </gouv-chart>
</div>`;

  codeEl.textContent = code;
}

/**
 * Generate code using gouv-source + gouv-chart for API sources.
 */
export function generateDynamicCodeForApi(): void {
  const source = state.savedSource;
  if (!source || source.type !== 'api') return;

  const codeEl = document.getElementById('generated-code');
  if (!codeEl) return;

  // Get field paths
  const labelFieldInfo = state.fields.find(f => f.name === state.labelField);
  const valueFieldInfo = state.fields.find(f => f.name === state.valueField);

  const labelFieldPath = labelFieldInfo?.fullPath || state.labelField;
  const valueFieldPath = valueFieldInfo?.fullPath || state.valueField;

  const refreshAttr = state.refreshInterval > 0 ? `\n    refresh="${state.refreshInterval}"` : '';

  // Determine chart type for gouv-chart
  const chartType = state.chartType === 'horizontalBar' ? 'bar' : state.chartType;
  const indexAxisAttr = state.chartType === 'horizontalBar' ? '\n    index-axis="y"' : '';

  // Handle data path transform
  const transformAttr = source.dataPath ? `\n    transform="${source.dataPath}"` : '';

  // Handle KPI type (not supported by gouv-chart yet, fallback to embedded)
  if (state.chartType === 'kpi') {
    generateCodeForLocalData();
    return;
  }

  // Handle map chart (needs gouv-dsfr-chart)
  const isMapChart = state.chartType === 'map' || state.chartType === ('mapReg' as any);

  if (isMapChart) {
    const mapPalette = state.palette.includes('sequential') || state.palette.includes('divergent')
      ? state.palette
      : 'sequentialAscending';

    const code = `<!-- Carte dynamique generee avec gouv-widgets Builder -->
<!-- Source : ${escapeHtml(source.name)} (chargement dynamique) -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">

<!-- Dependances JS -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${state.title ? `<h2>${escapeHtml(state.title)}</h2>` : ''}
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <!-- Source de donnees API -->
  <gouv-source
    id="map-data"
    url="${source.apiUrl}"${transformAttr}${refreshAttr}>
  </gouv-source>

  <!-- Carte (se met a jour automatiquement) -->
  <gouv-dsfr-chart
    source="map-data"
    type="${state.chartType === ('mapReg' as any) ? 'map-reg' : 'map'}"
    code-field="${state.codeField}"
    value-field="${valueFieldPath}"
    aggregation="${state.aggregation}"
    name="${state.title || 'Indicateur'}"
    selected-palette="${mapPalette}">
  </gouv-dsfr-chart>
</div>`;

    codeEl.textContent = code;
    return;
  }

  // Generate gouv-query if advanced mode is enabled
  const { queryElement, chartSource } = generateGouvQueryCode('chart-data', labelFieldPath);

  // In advanced mode with gouv-query, the chart uses pre-processed data
  const chartAggregation = state.advancedMode ? 'none' : state.aggregation;
  const chartLimit = state.advancedMode ? 0 : state.limit;
  const chartSortOrder = state.advancedMode ? 'none' : state.sortOrder;

  const code = `<!-- Graphique dynamique genere avec gouv-widgets Builder -->
<!-- Source : ${escapeHtml(source.name)} (chargement dynamique) -->
${state.advancedMode ? '<!-- Mode avance active : filtrage et agregation via gouv-query -->' : ''}

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${state.title ? `<h2>${escapeHtml(state.title)}</h2>` : ''}
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <!-- Source de donnees API -->
  <gouv-source
    id="chart-data"
    url="${source.apiUrl}"${transformAttr}${refreshAttr}>
  </gouv-source>
${queryElement}
  <!-- Graphique (se met a jour automatiquement) -->
  <gouv-chart
    source="${chartSource}"
    type="${chartType}"${indexAxisAttr}
    label-field="${state.advancedMode ? state.queryGroupBy || labelFieldPath : labelFieldPath}"
    value-field="${state.advancedMode && state.queryAggregate ? state.queryAggregate.split(',')[0].trim().replace(':', '__') : valueFieldPath}"
    aggregation="${chartAggregation}"
    limit="${chartLimit}"
    sort-order="${chartSortOrder}"
    ${state.title ? `title="${escapeHtml(state.title)}"` : ''}
    ${state.subtitle ? `subtitle="${escapeHtml(state.subtitle)}"` : ''}
    selected-palette="${state.palette}"
    height="400">
  </gouv-chart>
</div>`;

  codeEl.textContent = code;
}

/**
 * Generate HTML+JS code for API-fetched data.
 */
export function generateCode(apiUrl: string): void {
  const codeEl = document.getElementById('generated-code');
  if (!codeEl) return;

  // Handle KPI type
  if (state.chartType === 'kpi') {
    const variantSelect = document.getElementById('kpi-variant') as HTMLSelectElement | null;
    const unitInput = document.getElementById('kpi-unit') as HTMLInputElement | null;
    const variant = variantSelect?.value || '';
    const unit = unitInput?.value || '';

    const code = `<!-- KPI g\u00e9n\u00e9r\u00e9 avec gouv-widgets Builder -->

<!-- D\u00e9pendances CSS (DSFR) -->
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
    <span class="kpi-label">${escapeHtml(state.title)}</span>
  </div>
</div>

<script>
// URL de l'API avec agr\u00e9gation
const API_URL = '${apiUrl}';

function formatKPIValue(value, unit) {
  const num = Math.round(value * 100) / 100;
  if (unit === '\u20ac' || unit === 'EUR') {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num);
  } else if (unit === '%') {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(num) + ' %';
  } else {
    const formatted = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(num);
    return unit ? formatted + ' ' + unit : formatted;
  }
}

async function loadKPI() {
  const response = await fetch(API_URL);
  const json = await response.json();
  const data = json.results || [];
  const value = data[0]?.value || 0;
  document.getElementById('kpi-value').textContent = formatKPIValue(value, '${unit}');
}

loadKPI();
<\/script>`;
    codeEl.textContent = code;
    return;
  }

  // Handle Gauge type
  if (state.chartType === 'gauge') {
    const code = `<!-- Jauge g\u00e9n\u00e9r\u00e9e avec gouv-widgets Builder -->

<!-- D\u00e9pendances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}
  <div id="gauge-container"></div>
</div>

<script type="module">
const API_URL = '${apiUrl}';

async function loadGauge() {
  const response = await fetch(API_URL);
  const json = await response.json();
  const value = Math.round(json.results?.[0]?.value || 0);

  document.getElementById('gauge-container').innerHTML = \`
    <gauge-chart percent="\${value}" init="0" target="100"></gauge-chart>
  \`;
}

loadGauge();
<\/script>`;
    codeEl.textContent = code;
    return;
  }

  // Handle Scatter type
  if (state.chartType === 'scatter') {
    const scatterColor = PALETTE_PRIMARY_COLOR[state.palette] || '#000091';
    const code = `<!-- Nuage de points g\u00e9n\u00e9r\u00e9 avec gouv-widgets Builder -->
<!-- Palette: ${state.palette} -->

<!-- D\u00e9pendances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- D\u00e9pendances JS -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}
  <div style="height: 400px;"><canvas id="myChart"></canvas></div>
</div>

<script>
const API_URL = '${apiUrl}';

async function loadChart() {
  const response = await fetch(API_URL);
  const json = await response.json();
  const data = (json.results || []).map(d => ({
    x: d['${state.labelField}'] || 0,
    y: d.value || 0
  }));

  new Chart(document.getElementById('myChart'), {
    type: 'scatter',
    data: {
      datasets: [{
        label: '${state.labelField} vs ${state.valueField}',
        data: data,
        backgroundColor: '${scatterColor}',
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: '${state.labelField}' } },
        y: { title: { display: true, text: '${state.valueField}' } }
      }
    }
  });
}

loadChart();
<\/script>`;
    codeEl.textContent = code;
    return;
  }

  // Handle Map type
  if (state.chartType === 'map') {
    // For choropleth maps, use sequential or divergent palette for gradient
    const mapPalette = state.palette.includes('sequential') || state.palette.includes('divergent')
      ? state.palette
      : 'sequentialAscending';

    const code = `<!-- Carte g\u00e9n\u00e9r\u00e9e avec gouv-widgets Builder -->
<!-- Palette: ${mapPalette} -->

<!-- D\u00e9pendances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}
  <div id="map-container"></div>
</div>

<script type="module">
const API_URL = '${apiUrl}';

// Valide un code de d\u00e9partement fran\u00e7ais
function isValidDeptCode(code) {
  if (!code || typeof code !== 'string') return false;
  if (['N/A', 'null', 'undefined', '00', ''].includes(code)) return false;
  if (code === '2A' || code === '2B') return true;
  if (/^97[1-6]$/.test(code)) return true;
  if (/^(0[1-9]|[1-8]\\d|9[0-5])$/.test(code)) return true;
  return false;
}

async function loadMap() {
  const response = await fetch(API_URL);
  const json = await response.json();
  const records = json.results || [];

  // Transformer les donn\u00e9es en format carte: {"code": valeur, ...}
  const mapData = {};
  records.forEach(d => {
    let code = String(d['${state.codeField}'] || '').trim();
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
      name="${escapeHtml(state.title)}"
      selected-palette="${mapPalette}"
    ></map-chart>
  \`;
}

loadMap();
<\/script>`;
    codeEl.textContent = code;
    return;
  }

  // Get palette colors for code generation
  const primaryColor = PALETTE_PRIMARY_COLOR[state.palette] || '#000091';
  const paletteColors = PALETTE_COLORS[state.palette] || PALETTE_COLORS['categorical'];

  // Check if we have multiple series
  const hasSecondSeries = state.valueField2 && ['bar', 'horizontalBar', 'line', 'radar'].includes(state.chartType);
  const isMultiColor = ['pie', 'doughnut', 'radar'].includes(state.chartType);

  // Build datasets code
  let datasetsCode: string;
  if (hasSecondSeries) {
    datasetsCode = `[{
        label: '${state.valueField}',
        data: values,
        backgroundColor: '${primaryColor}',
        borderColor: '${primaryColor}',
        borderWidth: ${state.chartType === 'line' ? 2 : 1}
      }, {
        label: '${state.valueField2}',
        data: values2,
        backgroundColor: '${state.color2}',
        borderColor: '${state.color2}',
        borderWidth: ${state.chartType === 'line' ? 2 : 1}
      }]`;
  } else {
    datasetsCode = `[{
        label: '${state.valueField}',
        data: values,
        backgroundColor: ${JSON.stringify(isMultiColor ? paletteColors.slice(0, state.limit) : primaryColor)},
        borderColor: '${primaryColor}',
        borderWidth: ${state.chartType === 'line' ? 2 : 1}
      }]`;
  }

  const code = `<!-- Graphique g\u00e9n\u00e9r\u00e9 avec gouv-widgets Builder -->

<!-- D\u00e9pendances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- D\u00e9pendances JS -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <div id="chart-container" style="height: 400px; position: relative;">
    <canvas id="myChart"></canvas>
  </div>

  <!-- Alternative accessible (RGAA) -->
  <details class="fr-accordion fr-mt-2w">
    <summary class="fr-accordion__btn">Voir les donn\u00e9es en tableau</summary>
    <div class="fr-accordion__content">
      <table class="fr-table" id="data-table">
        <thead><tr><th>${escapeHtml(state.labelField)}</th><th>${state.valueField}${hasSecondSeries ? `</th><th>${state.valueField2}` : ''}</th></tr></thead>
        <tbody id="table-body"></tbody>
      </table>
    </div>
  </details>
</div>

<script>
// URL de l'API avec agr\u00e9gation
const API_URL = '${apiUrl}';

async function loadChart() {
  const response = await fetch(API_URL);
  const json = await response.json();
  const data = json.results || [];

  const labels = data.map(d => d['${state.labelField}'] || 'N/A');
  const values = data.map(d => Math.round((d.value || 0) * 100) / 100);${hasSecondSeries ? `
  const values2 = data.map(d => Math.round((d.value2 || 0) * 100) / 100);` : ''}

  new Chart(document.getElementById('myChart'), {
    type: '${state.chartType === 'horizontalBar' ? 'bar' : state.chartType}',
    data: {
      labels: labels,
      datasets: ${datasetsCode}
    },
    options: {
      responsive: true,
      maintainAspectRatio: false${state.chartType === 'horizontalBar' ? ",\n      indexAxis: 'y'" : ''},
      plugins: { legend: { display: ${hasSecondSeries || isMultiColor} } }
    }
  });

  // Remplir le tableau accessible
  const tbody = document.getElementById('table-body');
  data.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>' + (d['${state.labelField}'] || 'N/A') + '</td><td>' + (d.value?.toFixed(2) || '\u2014') + '</td>${hasSecondSeries ? `<td>' + (d.value2?.toFixed(2) || '\u2014') + '</td>` : ''}';
    tbody.appendChild(tr);
  });
}

loadChart();
<\/script>`;

  codeEl.textContent = code;
}
