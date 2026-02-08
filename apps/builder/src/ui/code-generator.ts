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
  toastWarning,
  toastError,
} from '@gouv-widgets/shared';
import { state, PROXY_BASE_URL } from '../state.js';
import { renderChart } from './chart-renderer.js';
import { updateAccessibleTable } from './accessible-table.js';

const ODS_PAGE_SIZE = 100;
const ODS_MAX_PAGES = 10;

/**
 * Fetch all results from an ODS API URL, handling pagination automatically.
 * ODS APIs cap at 100 records per request. When the URL requests more,
 * this function uses offset-based pagination to accumulate all results.
 */
async function fetchOdsResults(baseUrl: string): Promise<Record<string, unknown>[]> {
  const url = new URL(baseUrl);
  const requestedLimit = parseInt(url.searchParams.get('limit') || '100', 10);

  if (requestedLimit <= ODS_PAGE_SIZE) {
    const response = await fetch(baseUrl);
    const json = await response.json();
    return json.results || [];
  }

  let allResults: Record<string, unknown>[] = [];
  let offset = 0;

  for (let page = 0; page < ODS_MAX_PAGES; page++) {
    const remaining = requestedLimit - allResults.length;
    if (remaining <= 0) break;

    const pageUrl = new URL(baseUrl);
    pageUrl.searchParams.set('limit', String(Math.min(ODS_PAGE_SIZE, remaining)));
    pageUrl.searchParams.set('offset', String(offset));

    const response = await fetch(pageUrl.toString());
    const json = await response.json();
    const pageResults = (json.results || []) as Record<string, unknown>[];
    allResults = allResults.concat(pageResults);

    if (pageResults.length < ODS_PAGE_SIZE) break;
    if (typeof json.total_count === 'number' && allResults.length >= json.total_count) break;
    offset += pageResults.length;
  }

  return allResults;
}

/** Maps builder chart types to DSFR Chart element tags */
const DSFR_TAG_MAP: Record<string, string> = {
  bar: 'bar-chart',
  horizontalBar: 'bar-chart',
  line: 'line-chart',
  pie: 'pie-chart',
  doughnut: 'pie-chart',
  radar: 'radar-chart',
  scatter: 'scatter-chart',
  gauge: 'gauge-chart',
  'bar-line': 'bar-line-chart',
  map: 'map-chart',
  'map-reg': 'map-chart-reg',
};

/** Build DSFR Chart specific attributes from builder state */
function dsfrChartAttrs(): string {
  const extra: string[] = [];
  if (state.chartType === 'horizontalBar') extra.push('horizontal');
  if (state.chartType === 'pie') extra.push('fill');
  if (state.chartType === 'doughnut') { /* no fill = donut */ }
  return extra.map(a => `\n    ${a}`).join('');
}

/**
 * Escape single quotes in a string for use inside single-quoted HTML attributes.
 * DSFR Chart x/y attributes contain JSON with French names that may include
 * apostrophes (e.g. "CÔTES-D'ARMOR", "VAL-D'OISE") which would prematurely
 * close the HTML attribute if unescaped.
 */
function escapeSingleQuotes(value: string): string {
  return value.replace(/'/g, '&#39;');
}

/**
 * Generate an inline <script> that re-applies DSFR Chart element attributes
 * after Vue mount. DSFR Chart Vue components overwrite certain attributes
 * (value, date) with defaults during mount.
 */
function dsfrDeferredScript(tagName: string): string {
  return `
<script>
(function(){var c=document.querySelector('${tagName}');if(!c)return;var s={};[].forEach.call(c.attributes,function(a){s[a.name]=a.value});customElements.whenDefined('${tagName}').then(function(){setTimeout(function(){Object.keys(s).forEach(function(k){c.setAttribute(k,s[k])})},500)})})();
<\/script>`;
}

/**
 * Convert gouv-query filter format (field:operator:value) to ODSQL where clause.
 */
function filterToOdsql(filterExpr: string): string {
  const opMap: Record<string, string> = {
    eq: '=', neq: '!=', gt: '>', gte: '>=', lt: '<', lte: '<=',
  };
  return filterExpr.split(',').map(p => p.trim()).filter(Boolean).map(part => {
    const segs = part.split(':');
    if (segs.length < 3) return '';
    const field = segs[0];
    const op = segs[1];
    const val = segs.slice(2).join(':');
    if (op === 'contains') return `${field} like "%${val}%"`;
    if (op === 'notcontains') return `NOT ${field} like "%${val}%"`;
    if (op === 'in') return `${field} in (${val.split('|').map(v => `"${v}"`).join(', ')})`;
    if (op === 'notin') return `NOT ${field} in (${val.split('|').map(v => `"${v}"`).join(', ')})`;
    if (op === 'isnull') return `${field} is null`;
    if (op === 'isnotnull') return `${field} is not null`;
    const sqlOp = opMap[op];
    if (!sqlOp) return '';
    return `${field} ${sqlOp} "${val}"`;
  }).filter(Boolean).join(' AND ');
}

/**
 * Apply gouv-query style filter (field:operator:value) to local data rows.
 */
function applyLocalFilter(data: Record<string, unknown>[], filterExpr: string): Record<string, unknown>[] {
  const filters = filterExpr.split(',').map(p => p.trim()).filter(Boolean).map(part => {
    const segs = part.split(':');
    if (segs.length < 2) return null;
    return { field: segs[0], op: segs[1], value: segs.slice(2).join(':') };
  }).filter(Boolean) as { field: string; op: string; value: string }[];

  return data.filter(row => filters.every(f => {
    const v = row[f.field];
    switch (f.op) {
      // eslint-disable-next-line eqeqeq
      case 'eq': return v == f.value;
      // eslint-disable-next-line eqeqeq
      case 'neq': return v != f.value;
      case 'gt': return Number(v) > Number(f.value);
      case 'gte': return Number(v) >= Number(f.value);
      case 'lt': return Number(v) < Number(f.value);
      case 'lte': return Number(v) <= Number(f.value);
      case 'contains': return String(v).toLowerCase().includes(f.value.toLowerCase());
      case 'notcontains': return !String(v).toLowerCase().includes(f.value.toLowerCase());
      case 'isnull': return v === null || v === undefined;
      case 'isnotnull': return v !== null && v !== undefined;
      default: return true;
    }
  }));
}

/**
 * Build the colonnes attribute for gouv-datalist.
 * Uses custom column config if available, otherwise auto-detects from fields.
 */
function buildColonnesAttr(): string {
  // Use custom columns if configured
  const visibleCols = state.datalistColumns.filter(c => c.visible);
  if (visibleCols.length > 0) {
    return visibleCols.map(c => `${c.field}:${c.label}`).join(', ');
  }
  // Fallback: auto-detect from fields or raw data
  const fields = state.fields.length > 0
    ? state.fields.map(f => f.name)
    : (state.localData && state.localData.length > 0 ? Object.keys(state.localData[0]) : []);
  return fields.map(f => `${f}:${f}`).join(', ');
}

/**
 * Build optional datalist attributes (recherche, filtres, export) from state.
 */
function buildDatalistAttrs(): string {
  let attrs = '';
  if (state.datalistRecherche) attrs += '\n    recherche';
  if (state.datalistExportCsv) attrs += '\n    export="csv"';
  const filtrables = state.datalistColumns.filter(c => c.visible && c.filtrable).map(c => c.field);
  if (state.datalistFiltres && filtrables.length > 0) {
    attrs += `\n    filtres="${filtrables.join(',')}"`;
  }
  return attrs;
}

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
  const sortOrder = document.getElementById('sort-order') as HTMLSelectElement | null;

  if (labelField) state.labelField = labelField.value;
  if (valueField) state.valueField = valueField.value;
  state.valueField2 = valueField2?.value || '';
  state.codeField = codeField?.value || '';
  if (aggregation) state.aggregation = aggregation.value as typeof state.aggregation;
  if (sortOrder) state.sortOrder = sortOrder.value as typeof state.sortOrder;

  const isKPI = state.chartType === 'kpi';
  const isGauge = state.chartType === 'gauge';
  const isDatalist = state.chartType === 'datalist';
  const isMap = state.chartType === 'map';
  const isSingleValue = isKPI || isGauge;

  // Validation: datalist only needs labelField, KPI/Gauge need valueField, charts need both
  if (isDatalist && !state.labelField) {
    toastWarning('Veuillez s\u00e9lectionner un champ pour les colonnes');
    return;
  }
  if (!isSingleValue && !isDatalist && (!state.labelField || !state.valueField)) {
    toastWarning('Veuillez s\u00e9lectionner les champs pour les axes X et Y');
    return;
  }
  if (isSingleValue && !state.valueField && state.aggregation !== 'count') {
    toastWarning('Veuillez s\u00e9lectionner un champ pour la valeur');
    return;
  }

  // Datalist: route to local data path (no aggregation needed)
  if (isDatalist) {
    if (state.sourceType === 'saved' && state.localData && state.localData.length > 0) {
      generateChartFromLocalData();
    } else {
      // For API sources, use raw data — limit=200 to fetch all records
      const params = new URLSearchParams({ limit: '200' });
      if (state.advancedMode && state.queryFilter) {
        const odsql = filterToOdsql(state.queryFilter);
        if (odsql) params.set('where', odsql);
      }
      const apiUrl = `${state.apiUrl}?${params}`;
      try {
        state.data = await fetchOdsResults(apiUrl);
        state.localData = state.data as Record<string, unknown>[];
        renderChart();
        generateCode(apiUrl);
      } catch (error) {
        toastError('Erreur lors du chargement des donn\u00e9es : ' + (error as Error).message);
      }
    }
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
  } else if (isMap) {
    // Map: group by code field — limit=200 to fetch all departments (API default is 10)
    params = new URLSearchParams({
      select: `${state.codeField}, ${valueExpression}`,
      group_by: state.codeField,
      limit: '200',
    });
  } else {
    // Chart: group by label field — limit=200 to fetch all categories
    params = new URLSearchParams({
      select: `${state.labelField}, ${valueExpression}${valueExpression2}`,
      group_by: state.labelField,
      order_by: `value ${state.sortOrder}`,
      limit: '200',
    });
  }

  // Apply advanced mode filter to API request
  if (state.advancedMode && state.queryFilter) {
    const odsql = filterToOdsql(state.queryFilter);
    if (odsql) params.set('where', odsql);
  }

  const apiUrl = `${state.apiUrl}?${params}`;

  try {
    state.data = await fetchOdsResults(apiUrl);

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
  // Datalist: skip aggregation, use raw data
  if (state.chartType === 'datalist') {
    let filteredLocal = state.localData || [];
    if (state.advancedMode && state.queryFilter) {
      filteredLocal = applyLocalFilter(filteredLocal as Record<string, unknown>[], state.queryFilter);
    }
    state.data = filteredLocal as any[];

    const rawDataEl = document.getElementById('raw-data');
    if (rawDataEl) rawDataEl.textContent = JSON.stringify(state.data, null, 2);

    renderChart();

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
    return;
  }

  // Aggregate local data
  const aggregated: Record<string, { values: number[]; count: number }> = {};

  // For maps, aggregate by codeField; for other charts, by labelField
  const isMap = state.chartType === 'map';
  const groupField = isMap ? state.codeField : state.labelField;

  // Apply advanced mode filter to local data
  let filteredLocal = state.localData || [];
  if (state.advancedMode && state.queryFilter) {
    filteredLocal = applyLocalFilter(filteredLocal as Record<string, unknown>[], state.queryFilter);
  }

  if (filteredLocal) {
    filteredLocal.forEach(record => {
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

  // Handle Datalist type (local data)
  if (state.chartType === 'datalist') {
    const colonnes = buildColonnesAttr();
    const triAttr = state.sortOrder !== 'none' && state.labelField
      ? `\n    tri="${state.labelField}:${state.sortOrder}"` : '';
    const code = `<!-- Tableau genere avec gouv-widgets Builder -->
<!-- Source : ${state.savedSource?.name || 'Donnees locales'} -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${state.title ? `<h2>${escapeHtml(state.title)}</h2>` : ''}
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <gouv-datalist
    id="my-table"
    colonnes="${colonnes}"${buildDatalistAttrs()}${triAttr}
    pagination="10">
  </gouv-datalist>
</div>

<script>
// Donnees integrees
const data = ${JSON.stringify(state.localData?.slice(0, 500) || [], null, 2)};

// Injecter les donnees dans le composant
const datalist = document.getElementById('my-table');
datalist.onSourceData(data);
<\/script>`;
    codeEl.textContent = code;
    return;
  }

  // Handle Scatter type (local data)
  if (state.chartType === 'scatter') {
    const xValues = state.data.map(d => (d[state.labelField] as number) || 0);
    const yValues = state.data.map(d => (d.value as number) || 0);
    const code = `<!-- Nuage de points genere avec gouv-widgets Builder -->
<!-- Source : ${state.savedSource?.name || 'Donnees locales'} -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>

  <scatter-chart
    x='${escapeSingleQuotes(JSON.stringify([xValues]))}'
    y='${escapeSingleQuotes(JSON.stringify([yValues]))}'
    name='${escapeSingleQuotes(JSON.stringify([`${state.labelField} vs ${state.valueField}`]))}'
    selected-palette="${state.palette}">
  </scatter-chart>
</div>${dsfrDeferredScript('scatter-chart')}`;
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
    value="${avgValue}"
    selected-palette="${mapPalette}"
  ></map-chart>
</div>${dsfrDeferredScript('map-chart')}`;
    codeEl.textContent = mapCode;
    return;
  }

  // Build DSFR Chart element for static embed
  const labels = state.data.map(d => (d[state.labelField] as string) || 'N/A');
  const values = state.data.map(d => Math.round(((d.value as number) || 0) * 100) / 100);

  const hasSecondSeries = state.valueField2 && ['bar', 'horizontalBar', 'line', 'radar'].includes(state.chartType);
  const values2 = hasSecondSeries
    ? state.data.map(d => Math.round(((d.value2 as number) || 0) * 100) / 100)
    : null;

  const dsfrTag = DSFR_TAG_MAP[state.chartType] || 'bar-chart';
  const x = JSON.stringify([labels]);
  const y = values2 ? JSON.stringify([values, values2]) : JSON.stringify([values]);
  const seriesNames = values2
    ? JSON.stringify([state.valueField, state.valueField2])
    : JSON.stringify([state.valueField]);

  // Build extra attributes
  const extraAttrs: string[] = [];
  if (state.chartType === 'horizontalBar') extraAttrs.push('horizontal');
  if (state.chartType === 'pie') extraAttrs.push('fill');
  const extraStr = extraAttrs.map(a => `\n    ${a}`).join('');

  const code = `<!-- Graphique genere avec gouv-widgets Builder -->
<!-- Source : ${state.savedSource?.name || 'Donnees locales'} -->

<!-- Dependances (DSFR + DSFR Chart) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <${dsfrTag}
    x='${escapeSingleQuotes(x)}'
    y='${escapeSingleQuotes(y)}'
    name='${escapeSingleQuotes(seriesNames)}'
    selected-palette="${state.palette}"${extraStr}>
  </${dsfrTag}>
</div>${dsfrDeferredScript(dsfrTag)}`;

  codeEl.textContent = code;
}

/**
 * Generate gouv-query HTML for dynamic mode.
 * Always generates a <gouv-query> to handle aggregation, sorting and filtering.
 * Returns { queryElement, chartSource, labelField, valueField }.
 */
export function generateGouvQueryCode(
  sourceId: string,
  labelFieldPath: string,
  valueFieldPath: string
): { queryElement: string; chartSource: string; labelField: string; valueField: string } {
  const attrs: string[] = [];
  attrs.push(`source="${sourceId}"`);

  // Group by: advanced custom field or default labelField
  const groupByField = state.advancedMode && state.queryGroupBy ? state.queryGroupBy : labelFieldPath;
  if (groupByField) {
    attrs.push(`group-by="${groupByField}"`);
  }

  // Filters (advanced mode only)
  if (state.advancedMode && state.queryFilter) {
    attrs.push(`filter="${escapeHtml(state.queryFilter)}"`);
  }

  // Aggregations: advanced custom or default from form
  let aggregateExpr: string;
  let sortField: string;
  let resultValueField: string;

  if (state.advancedMode && state.queryAggregate) {
    aggregateExpr = state.queryAggregate;
    const firstAgg = aggregateExpr.split(',')[0].trim();
    const parts = firstAgg.split(':');
    sortField = parts.length >= 2 ? `${parts[0]}__${parts[1]}` : groupByField;
    resultValueField = sortField;
  } else {
    aggregateExpr = `${valueFieldPath}:${state.aggregation}`;
    sortField = `${valueFieldPath}__${state.aggregation}`;
    resultValueField = sortField;
  }
  attrs.push(`aggregate="${escapeHtml(aggregateExpr)}"`);

  // Sort
  if (state.sortOrder && state.sortOrder !== 'none') {
    attrs.push(`order-by="${sortField}:${state.sortOrder}"`);
  }

  const comment = state.advancedMode
    ? '<!-- Requete avancee (filtrage et agregation) -->'
    : '<!-- Agregation et tri des donnees -->';

  const queryElement = `
  ${comment}
  <gouv-query
    id="query-data"
    ${attrs.join('\n    ')}>
  </gouv-query>`;

  return {
    queryElement,
    chartSource: 'query-data',
    labelField: groupByField,
    valueField: resultValueField,
  };
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

  // Handle KPI type (no DSFR Chart equivalent, fallback to embedded)
  if (state.chartType === 'kpi') {
    generateCodeForLocalData();
    return;
  }

  // Handle Datalist type (Grist dynamic)
  if (state.chartType === 'datalist') {
    const colonnes = buildColonnesAttr();
    const triAttr = state.sortOrder !== 'none' && state.labelField
      ? `\n    tri="${state.labelField}:${state.sortOrder}"` : '';
    const code = `<!-- Tableau dynamique genere avec gouv-widgets Builder -->
<!-- Source : ${escapeHtml(source.name)} (chargement dynamique depuis ${gristHost}) -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${state.title ? `<h2>${escapeHtml(state.title)}</h2>` : ''}
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <gouv-source
    id="table-data"
    url="${proxyUrl}"
    transform="records"${refreshAttr}>
  </gouv-source>

  <gouv-datalist
    source="table-data"
    colonnes="${colonnes}"${buildDatalistAttrs()}${triAttr}
    pagination="10">
  </gouv-datalist>
</div>`;
    codeEl.textContent = code;
    return;
  }

  // Generate gouv-query for aggregation, sorting, filtering
  const { queryElement, chartSource, labelField: queryLabelField, valueField: queryValueField } =
    generateGouvQueryCode('chart-data', labelFieldPath, valueFieldPath);

  // Map palette
  const isMap = state.chartType === 'map' || state.chartType === ('mapReg' as any);
  const palette = isMap
    ? (state.palette.includes('sequential') || state.palette.includes('divergent') ? state.palette : 'sequentialAscending')
    : state.palette;

  // Map-specific attributes
  const codeFieldAttr = isMap && state.codeField ? `\n    code-field="${state.codeField}"` : '';

  const code = `<!-- Graphique dynamique genere avec gouv-widgets Builder -->
<!-- Source : ${escapeHtml(source.name)} (chargement dynamique depuis ${gristHost}) -->
<!-- Les donnees sont chargees via le proxy ${PROXY_BASE_URL} -->
${state.advancedMode ? '<!-- Mode avance active : filtrage et agregation via gouv-query -->' : ''}

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

  <!-- Source de donnees (via proxy chartsbuilder.matge.com) -->
  <gouv-source
    id="chart-data"
    url="${proxyUrl}"
    transform="records"${refreshAttr}>
  </gouv-source>
${queryElement}
  <!-- Graphique DSFR (se met a jour automatiquement) -->
  <gouv-dsfr-chart
    source="${chartSource}"
    type="${state.chartType === 'horizontalBar' ? 'bar' : state.chartType === 'doughnut' ? 'pie' : state.chartType}"${dsfrChartAttrs()}${codeFieldAttr}
    label-field="${queryLabelField}"
    value-field="${queryValueField}"
    name="${escapeHtml(state.title || state.valueField)}"
    selected-palette="${palette}">
  </gouv-dsfr-chart>
</div>`;

  codeEl.textContent = code;
}

/**
 * Generate code using gouv-source + gouv-dsfr-chart for API sources.
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

  // Handle data path transform
  const transformAttr = source.dataPath ? `\n    transform="${source.dataPath}"` : '';

  // Handle KPI type (no DSFR Chart equivalent, fallback to embedded)
  if (state.chartType === 'kpi') {
    generateCodeForLocalData();
    return;
  }

  // Handle Datalist type (API dynamic)
  if (state.chartType === 'datalist') {
    const colonnes = buildColonnesAttr();
    const triAttr = state.sortOrder !== 'none' && state.labelField
      ? `\n    tri="${state.labelField}:${state.sortOrder}"` : '';
    const code = `<!-- Tableau dynamique genere avec gouv-widgets Builder -->
<!-- Source : ${escapeHtml(source.name)} (chargement dynamique) -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${state.title ? `<h2>${escapeHtml(state.title)}</h2>` : ''}
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <gouv-source
    id="table-data"
    url="${source.apiUrl}"${transformAttr}${refreshAttr}>
  </gouv-source>

  <gouv-datalist
    source="table-data"
    colonnes="${colonnes}"${buildDatalistAttrs()}${triAttr}
    pagination="10">
  </gouv-datalist>
</div>`;
    codeEl.textContent = code;
    return;
  }

  // Generate gouv-query for aggregation, sorting, filtering
  const { queryElement, chartSource, labelField: queryLabelField, valueField: queryValueField } =
    generateGouvQueryCode('chart-data', labelFieldPath, valueFieldPath);

  // Map palette
  const isMap = state.chartType === 'map' || state.chartType === ('mapReg' as any);
  const palette = isMap
    ? (state.palette.includes('sequential') || state.palette.includes('divergent') ? state.palette : 'sequentialAscending')
    : state.palette;

  // Map-specific attributes
  const codeFieldAttr = isMap && state.codeField ? `\n    code-field="${state.codeField}"` : '';

  const code = `<!-- Graphique dynamique genere avec gouv-widgets Builder -->
<!-- Source : ${escapeHtml(source.name)} (chargement dynamique) -->
${state.advancedMode ? '<!-- Mode avance active : filtrage et agregation via gouv-query -->' : ''}

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
    id="chart-data"
    url="${source.apiUrl}"${transformAttr}${refreshAttr}>
  </gouv-source>
${queryElement}
  <!-- Graphique DSFR (se met a jour automatiquement) -->
  <gouv-dsfr-chart
    source="${chartSource}"
    type="${state.chartType === 'horizontalBar' ? 'bar' : state.chartType === 'doughnut' ? 'pie' : state.chartType}"${dsfrChartAttrs()}${codeFieldAttr}
    label-field="${queryLabelField}"
    value-field="${queryValueField}"
    name="${escapeHtml(state.title || state.valueField)}"
    selected-palette="${palette}">
  </gouv-dsfr-chart>
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

  // Handle Datalist type (API fetch)
  if (state.chartType === 'datalist') {
    const colonnes = buildColonnesAttr();
    const triAttr = state.sortOrder !== 'none' && state.labelField
      ? `\n    tri="${state.labelField}:${state.sortOrder}"` : '';
    const code = `<!-- Tableau genere avec gouv-widgets Builder -->

<!-- Dependances CSS (DSFR) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">

<!-- Dependances JS -->
<script src="${PROXY_BASE_URL}/dist/gouv-widgets.umd.js"><\/script>

<div class="fr-container fr-my-4w">
  ${state.title ? `<h2>${escapeHtml(state.title)}</h2>` : ''}
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}

  <gouv-datalist
    id="my-table"
    colonnes="${colonnes}"${buildDatalistAttrs()}${triAttr}
    pagination="10">
  </gouv-datalist>
</div>

<script>
const API_URL = '${apiUrl}';

async function loadTable() {
  const response = await fetch(API_URL);
  const json = await response.json();
  const data = json.results || [];
  document.getElementById('my-table').onSourceData(data);
}

loadTable();
<\/script>`;
    codeEl.textContent = code;
    return;
  }

  // Handle Scatter type
  if (state.chartType === 'scatter') {
    const code = `<!-- Nuage de points genere avec gouv-widgets Builder -->

<!-- Dependances (DSFR + DSFR Chart) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}
  <div id="scatter-container"></div>
</div>

<script type="module">
const API_URL = '${apiUrl}';

async function loadChart() {
  const response = await fetch(API_URL);
  const json = await response.json();
  const data = json.results || [];

  const xValues = data.map(d => d['${state.labelField}'] || 0);
  const yValues = data.map(d => d.value || 0);

  var el = document.createElement('scatter-chart');
  el.setAttribute('x', JSON.stringify([xValues]));
  el.setAttribute('y', JSON.stringify([yValues]));
  el.setAttribute('name', ${JSON.stringify(JSON.stringify([`${state.labelField} vs ${state.valueField}`]))});
  el.setAttribute('selected-palette', '${state.palette}');
  document.getElementById('scatter-container').appendChild(el);
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

  var el = document.createElement('map-chart');
  el.setAttribute('data', JSON.stringify(mapData));
  el.setAttribute('name', '${escapeHtml(state.title)}');
  el.setAttribute('selected-palette', '${mapPalette}');
  // Compute national average
  var vals = Object.values(mapData);
  var avg = vals.length ? Math.round(vals.reduce(function(a,b){return a+b},0) / vals.length * 100) / 100 : 0;
  el.setAttribute('value', String(avg));
  el.setAttribute('date', new Date().toISOString().split('T')[0]);
  document.getElementById('map-container').appendChild(el);
}

loadMap();
<\/script>`;
    codeEl.textContent = code;
    return;
  }

  // Build DSFR Chart type and extra attributes
  const hasSecondSeries = state.valueField2 && ['bar', 'horizontalBar', 'line', 'radar'].includes(state.chartType);
  const dsfrTag = DSFR_TAG_MAP[state.chartType] || 'bar-chart';

  const extraAttrs: string[] = [];
  if (state.chartType === 'horizontalBar') extraAttrs.push('horizontal');
  if (state.chartType === 'pie') extraAttrs.push('fill');

  const seriesNames = hasSecondSeries
    ? JSON.stringify([state.valueField, state.valueField2])
    : JSON.stringify([state.valueField]);

  const code = `<!-- Graphique genere avec gouv-widgets Builder -->

<!-- Dependances (DSFR + DSFR Chart) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

<div class="fr-container fr-my-4w">
  <h2>${escapeHtml(state.title)}</h2>
  ${state.subtitle ? `<p class="fr-text--sm fr-text--light">${escapeHtml(state.subtitle)}</p>` : ''}
  <div id="chart-container"></div>
</div>

<script type="module">
// URL de l'API avec agregation
const API_URL = '${apiUrl}';

async function loadChart() {
  const response = await fetch(API_URL);
  const json = await response.json();
  const data = json.results || [];

  const labels = data.map(d => d['${state.labelField}'] || 'N/A');
  const values = data.map(d => Math.round((d.value || 0) * 100) / 100);${hasSecondSeries ? `
  const values2 = data.map(d => Math.round((d.value2 || 0) * 100) / 100);` : ''}

  const y = ${hasSecondSeries ? 'JSON.stringify([values, values2])' : 'JSON.stringify([values])'};

  var el = document.createElement('${dsfrTag}');
  el.setAttribute('x', JSON.stringify([labels]));
  el.setAttribute('y', y);
  el.setAttribute('name', '${escapeSingleQuotes(seriesNames)}');
  el.setAttribute('selected-palette', '${state.palette}');${state.chartType === 'horizontalBar' ? `
  el.setAttribute('horizontal', '');` : ''}${state.chartType === 'pie' ? `
  el.setAttribute('fill', '');` : ''}
  document.getElementById('chart-container').appendChild(el);
}

loadChart();
<\/script>`;

  codeEl.textContent = code;
}
