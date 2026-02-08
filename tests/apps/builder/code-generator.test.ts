import { describe, it, expect, beforeEach, vi } from 'vitest';
import { generateChartFromLocalData, generateCodeForLocalData, generateGouvQueryCode } from '../../../apps/builder/src/ui/code-generator';
import { state } from '../../../apps/builder/src/state';

vi.mock('../../../apps/builder/src/ui/chart-renderer', () => ({
  renderChart: vi.fn(),
}));
vi.mock('../../../apps/builder/src/ui/accessible-table', () => ({
  updateAccessibleTable: vi.fn(),
}));

function resetState(): void {
  state.chartType = 'bar';
  state.labelField = '';
  state.valueField = '';
  state.valueField2 = '';
  state.codeField = '';
  state.aggregation = 'avg';
  state.limit = 10;
  state.sortOrder = 'desc';
  state.title = 'Mon graphique';
  state.subtitle = '';
  state.palette = 'default';
  state.color2 = '#E1000F';
  state.data = [];
  state.data2 = [];
  state.localData = null;
  state.savedSource = null;
  state.generationMode = 'embedded';
  state.advancedMode = false;
  state.queryFilter = '';
  state.queryGroupBy = '';
  state.queryAggregate = '';
  state.sourceType = 'saved';
  state.fields = [];
  state.chartInstance = null;
  state.refreshInterval = 0;
  state.apiUrl = '';
  state.datalistRecherche = true;
  state.datalistFiltres = false;
  state.datalistExportCsv = true;
  state.datalistColumns = [];
}

describe('generateGouvQueryCode', () => {
  beforeEach(() => {
    resetState();
  });

  it('should always generate a gouv-query element even when advancedMode is false', () => {
    state.advancedMode = false;
    state.aggregation = 'avg';
    state.sortOrder = 'desc';
    state.limit = 10;
    const result = generateGouvQueryCode('my-source', 'fields.region', 'fields.population');
    expect(result.queryElement).toContain('<gouv-query');
    expect(result.queryElement).toContain('source="my-source"');
    expect(result.queryElement).toContain('group-by="fields.region"');
    expect(result.queryElement).toContain('aggregate="fields.population:avg"');
  });

  it('should always return chartSource = "query-data"', () => {
    state.advancedMode = false;
    const result = generateGouvQueryCode('my-source', 'fields.region', 'fields.population');
    expect(result.chartSource).toBe('query-data');
  });

  it('should build gouv-query element with source, group-by, filter, aggregate, order-by, limit when advancedMode is true', () => {
    state.advancedMode = true;
    state.queryFilter = 'population>1000';
    state.queryGroupBy = 'region';
    state.queryAggregate = 'population:sum';
    state.sortOrder = 'desc';
    state.limit = 5;

    const result = generateGouvQueryCode('chart-data', 'fields.region', 'fields.value');

    expect(result.queryElement).toContain('<gouv-query');
    expect(result.queryElement).toContain('id="query-data"');
    expect(result.queryElement).toContain('source="chart-data"');
    expect(result.queryElement).toContain('group-by="region"');
    expect(result.queryElement).toContain('filter="population&gt;1000"');
    expect(result.queryElement).toContain('aggregate="population:sum"');
    expect(result.queryElement).toContain('order-by="population__sum:desc"');
    expect(result.queryElement).toContain('limit="5"');
  });

  it('should return chartSource = "query-data" when advancedMode is true', () => {
    state.advancedMode = true;
    state.sortOrder = 'desc';
    state.limit = 10;

    const result = generateGouvQueryCode('chart-data', 'fields.region', 'fields.value');
    expect(result.chartSource).toBe('query-data');
  });

  it('should use labelFieldPath as group-by when queryGroupBy is empty', () => {
    state.advancedMode = true;
    state.queryGroupBy = '';
    state.sortOrder = 'desc';
    state.limit = 10;

    const result = generateGouvQueryCode('chart-data', 'fields.commune', 'fields.value');
    expect(result.queryElement).toContain('group-by="fields.commune"');
  });

  it('should use valueFieldPath__aggregation for order-by when queryAggregate is empty', () => {
    state.advancedMode = true;
    state.queryAggregate = '';
    state.aggregation = 'sum';
    state.sortOrder = 'asc';
    state.limit = 10;

    const result = generateGouvQueryCode('chart-data', 'fields.region', 'fields.population');
    expect(result.queryElement).toContain('order-by="fields.population__sum:asc"');
  });

  it('should not include filter attribute when queryFilter is empty', () => {
    state.advancedMode = true;
    state.queryFilter = '';
    state.sortOrder = 'desc';
    state.limit = 5;

    const result = generateGouvQueryCode('chart-data', 'fields.region', 'fields.value');
    expect(result.queryElement).not.toContain('filter=');
  });

  it('should use default aggregate from form when queryAggregate is empty', () => {
    state.advancedMode = true;
    state.queryAggregate = '';
    state.aggregation = 'avg';
    state.sortOrder = 'desc';
    state.limit = 5;

    const result = generateGouvQueryCode('chart-data', 'fields.region', 'fields.population');
    expect(result.queryElement).toContain('aggregate="fields.population:avg"');
  });
});

describe('generateChartFromLocalData', () => {
  beforeEach(() => {
    resetState();
    document.body.innerHTML = `
      <div id="generated-code"></div>
      <div id="raw-data"></div>
      <select id="kpi-variant"><option value="">Default</option><option value="info">Info</option></select>
      <input id="kpi-unit" value="">
    `;
  });

  const sampleData = [
    { region: 'Bretagne', population: 10 },
    { region: 'Bretagne', population: 20 },
    { region: 'Normandie', population: 30 },
    { region: 'Normandie', population: 40 },
    { region: 'Occitanie', population: 50 },
  ];

  it('should aggregate local data with "avg" aggregation', () => {
    state.localData = sampleData;
    state.labelField = 'region';
    state.valueField = 'population';
    state.aggregation = 'avg';
    state.limit = 10;

    generateChartFromLocalData();

    const bretagne = state.data.find(d => d['region'] === 'Bretagne');
    const normandie = state.data.find(d => d['region'] === 'Normandie');
    const occitanie = state.data.find(d => d['region'] === 'Occitanie');

    expect(bretagne?.value).toBe(15); // (10 + 20) / 2
    expect(normandie?.value).toBe(35); // (30 + 40) / 2
    expect(occitanie?.value).toBe(50); // 50 / 1
  });

  it('should aggregate local data with "sum" aggregation', () => {
    state.localData = sampleData;
    state.labelField = 'region';
    state.valueField = 'population';
    state.aggregation = 'sum';
    state.limit = 10;

    generateChartFromLocalData();

    const bretagne = state.data.find(d => d['region'] === 'Bretagne');
    const normandie = state.data.find(d => d['region'] === 'Normandie');

    expect(bretagne?.value).toBe(30); // 10 + 20
    expect(normandie?.value).toBe(70); // 30 + 40
  });

  it('should aggregate local data with "count" aggregation', () => {
    state.localData = sampleData;
    state.labelField = 'region';
    state.valueField = 'population';
    state.aggregation = 'count';
    state.limit = 10;

    generateChartFromLocalData();

    const bretagne = state.data.find(d => d['region'] === 'Bretagne');
    const normandie = state.data.find(d => d['region'] === 'Normandie');
    const occitanie = state.data.find(d => d['region'] === 'Occitanie');

    expect(bretagne?.value).toBe(2);
    expect(normandie?.value).toBe(2);
    expect(occitanie?.value).toBe(1);
  });

  it('should aggregate local data with "min" aggregation', () => {
    state.localData = sampleData;
    state.labelField = 'region';
    state.valueField = 'population';
    state.aggregation = 'min';
    state.limit = 10;

    generateChartFromLocalData();

    const bretagne = state.data.find(d => d['region'] === 'Bretagne');
    const normandie = state.data.find(d => d['region'] === 'Normandie');

    expect(bretagne?.value).toBe(10);
    expect(normandie?.value).toBe(30);
  });

  it('should aggregate local data with "max" aggregation', () => {
    state.localData = sampleData;
    state.labelField = 'region';
    state.valueField = 'population';
    state.aggregation = 'max';
    state.limit = 10;

    generateChartFromLocalData();

    const bretagne = state.data.find(d => d['region'] === 'Bretagne');
    const normandie = state.data.find(d => d['region'] === 'Normandie');

    expect(bretagne?.value).toBe(20);
    expect(normandie?.value).toBe(40);
  });

  it('should sort results by value desc', () => {
    state.localData = sampleData;
    state.labelField = 'region';
    state.valueField = 'population';
    state.aggregation = 'sum';
    state.sortOrder = 'desc';
    state.limit = 10;

    generateChartFromLocalData();

    const values = state.data.map(d => d.value as number);
    for (let i = 0; i < values.length - 1; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i + 1]);
    }
  });

  it('should sort results by value asc', () => {
    state.localData = sampleData;
    state.labelField = 'region';
    state.valueField = 'population';
    state.aggregation = 'sum';
    state.sortOrder = 'asc';
    state.limit = 10;

    generateChartFromLocalData();

    const values = state.data.map(d => d.value as number);
    for (let i = 0; i < values.length - 1; i++) {
      expect(values[i]).toBeLessThanOrEqual(values[i + 1]);
    }
  });

  it('should limit results to state.limit', () => {
    state.localData = sampleData;
    state.labelField = 'region';
    state.valueField = 'population';
    state.aggregation = 'sum';
    state.limit = 2;

    generateChartFromLocalData();

    expect(state.data).toHaveLength(2);
  });

  it('should set state.data with aggregated results', () => {
    state.localData = [
      { city: 'Paris', score: 100 },
      { city: 'Lyon', score: 200 },
    ];
    state.labelField = 'city';
    state.valueField = 'score';
    state.aggregation = 'sum';
    state.limit = 10;

    generateChartFromLocalData();

    expect(state.data).toHaveLength(2);
    expect(state.data.every(d => 'value' in d)).toBe(true);
    expect(state.data.every(d => 'city' in d)).toBe(true);
  });

  it('should group by codeField instead of labelField for map chart type', () => {
    state.localData = [
      { region: 'Bretagne', dept_code: '35', population: 100 },
      { region: 'Bretagne', dept_code: '35', population: 200 },
      { region: 'Normandie', dept_code: '76', population: 150 },
    ];
    state.chartType = 'map';
    state.labelField = 'region';
    state.codeField = 'dept_code';
    state.valueField = 'population';
    state.aggregation = 'sum';
    state.limit = 10;

    generateChartFromLocalData();

    // Results should be keyed by codeField, not labelField
    const item35 = state.data.find(d => d['dept_code'] === '35');
    const item76 = state.data.find(d => d['dept_code'] === '76');

    expect(item35).toBeDefined();
    expect(item35?.value).toBe(300);
    expect(item76).toBeDefined();
    expect(item76?.value).toBe(150);

    // labelField should NOT be used as a key for map type
    const byRegion = state.data.find(d => 'region' in d);
    expect(byRegion).toBeUndefined();
  });

  it('should update raw-data element with JSON stringified results', () => {
    state.localData = [
      { city: 'Paris', score: 100 },
    ];
    state.labelField = 'city';
    state.valueField = 'score';
    state.aggregation = 'sum';
    state.limit = 10;

    generateChartFromLocalData();

    const rawDataEl = document.getElementById('raw-data');
    expect(rawDataEl?.textContent).toBe(JSON.stringify(state.data, null, 2));
  });

  it('should handle empty localData gracefully', () => {
    state.localData = [];
    state.labelField = 'city';
    state.valueField = 'score';
    state.aggregation = 'sum';
    state.limit = 10;

    generateChartFromLocalData();

    expect(state.data).toEqual([]);
  });

  it('should handle null localData gracefully', () => {
    state.localData = null;
    state.labelField = 'city';
    state.valueField = 'score';
    state.aggregation = 'sum';
    state.limit = 10;

    generateChartFromLocalData();

    expect(state.data).toEqual([]);
  });
});

describe('generateCodeForLocalData', () => {
  beforeEach(() => {
    resetState();
    document.body.innerHTML = `
      <div id="generated-code"></div>
      <div id="raw-data"></div>
      <select id="kpi-variant"><option value="">Default</option><option value="info">Info</option></select>
      <input id="kpi-unit" value="">
    `;
  });

  it('should generate KPI HTML code when chartType is "kpi"', () => {
    state.chartType = 'kpi';
    state.data = [{ value: 42 }];
    state.title = 'Total items';

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('kpi-card');
    expect(code).toContain('kpi-value');
    expect(code).toContain('kpi-label');
    expect(code).toContain('Total items');
    expect(code).toContain('KPI');
  });

  it('should apply KPI variant from select element', () => {
    state.chartType = 'kpi';
    state.data = [{ value: 100 }];
    state.title = 'Score';

    const variantSelect = document.getElementById('kpi-variant') as HTMLSelectElement;
    variantSelect.value = 'info';

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('kpi-card--info');
  });

  it('should generate gauge HTML code when chartType is "gauge"', () => {
    state.chartType = 'gauge';
    state.data = [{ value: 75.4 }];
    state.title = 'Completion';

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('gauge-chart');
    expect(code).toContain('percent="75"');
    expect(code).toContain('Completion');
    expect(code).toContain('Jauge');
  });

  it('should generate scatter HTML code when chartType is "scatter"', () => {
    state.chartType = 'scatter';
    state.labelField = 'age';
    state.valueField = 'salary';
    state.data = [
      { age: 25, value: 30000 },
      { age: 35, value: 45000 },
    ];
    state.title = 'Age vs Salary';

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('<scatter-chart');
    expect(code).toContain('Nuage de points');
    expect(code).toContain('DSFRChart');
  });

  it('should generate DSFR bar-chart element for bar type', () => {
    state.chartType = 'bar';
    state.labelField = 'region';
    state.valueField = 'population';
    state.data = [
      { region: 'Bretagne', value: 150 },
      { region: 'Normandie', value: 200 },
    ];
    state.title = 'Population par region';

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('<bar-chart');
    expect(code).toContain('DSFRChart');
    expect(code).toContain('Population par region');
    expect(code).toContain('Bretagne');
    expect(code).toContain('Normandie');
  });

  it('should do nothing when generated-code element is missing', () => {
    document.body.innerHTML = '';

    state.chartType = 'bar';
    state.data = [{ region: 'Test', value: 100 }];

    // Should not throw
    expect(() => generateCodeForLocalData()).not.toThrow();
  });

  it('should generate horizontalBar as bar-chart with horizontal attribute', () => {
    state.chartType = 'horizontalBar';
    state.labelField = 'region';
    state.valueField = 'count';
    state.data = [{ region: 'Bretagne', value: 100 }];

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('<bar-chart');
    expect(code).toContain('horizontal');
  });

  it('should generate map code for map chart type', () => {
    state.chartType = 'map';
    state.codeField = 'code_dept';
    state.data = [
      { code_dept: '35', value: 100 },
      { code_dept: '76', value: 200 },
    ];
    state.title = 'Carte departements';

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('map-chart');
    expect(code).toContain('Carte');
    expect(code).toContain('DSFRChart');
  });

  it('should include subtitle in generated code when set', () => {
    state.chartType = 'bar';
    state.labelField = 'region';
    state.valueField = 'population';
    state.subtitle = 'En milliers';
    state.data = [{ region: 'Bretagne', value: 100 }];

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('En milliers');
  });

  it('should embed data as x/y attributes in DSFR chart element', () => {
    state.chartType = 'line';
    state.labelField = 'year';
    state.valueField = 'gdp';
    state.data = [
      { year: '2020', value: 1000 },
      { year: '2021', value: 1100 },
    ];

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('<line-chart');
    expect(code).toContain("x='[[\"2020\",\"2021\"]]'");
    expect(code).toContain("y='[[1000,1100]]'");
  });

  it('should generate pie-chart with fill attribute for pie type', () => {
    state.chartType = 'pie';
    state.labelField = 'category';
    state.valueField = 'amount';
    state.data = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
    ];

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('<pie-chart');
    expect(code).toContain('fill');
  });

  it('should handle KPI with unit from kpi-unit input', () => {
    state.chartType = 'kpi';
    state.data = [{ value: 1500 }];
    state.title = 'Revenue';

    const unitInput = document.getElementById('kpi-unit') as HTMLInputElement;
    unitInput.value = '%';

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('kpi-value');
    // The formatted value should contain the percentage sign
    expect(code).toContain('%');
  });

  it('should generate datalist HTML code when chartType is "datalist"', () => {
    state.chartType = 'datalist';
    state.localData = [
      { region: 'Bretagne', population: 3300000 },
      { region: 'Normandie', population: 3300000 },
    ];
    state.fields = [
      { name: 'region', type: 'string', sample: 'Bretagne' },
      { name: 'population', type: 'number', sample: 3300000 },
    ];
    state.labelField = 'region';
    state.title = 'Donnees regionales';
    state.limit = 10;
    state.sortOrder = 'desc';

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('gouv-datalist');
    expect(code).toContain('colonnes=');
    expect(code).toContain('recherche');
    expect(code).toContain('pagination=');
    expect(code).toContain('export="csv"');
    expect(code).toContain('Donnees regionales');
    expect(code).toContain('onSourceData');
  });

  it('should generate datalist code with tri attribute when sortOrder is set', () => {
    state.chartType = 'datalist';
    state.localData = [{ region: 'Bretagne', population: 3300000 }];
    state.fields = [
      { name: 'region', type: 'string', sample: 'Bretagne' },
      { name: 'population', type: 'number', sample: 3300000 },
    ];
    state.labelField = 'region';
    state.sortOrder = 'desc';
    state.limit = 10;

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('tri="region:desc"');
  });

  it('should use custom datalist columns when configured', () => {
    state.chartType = 'datalist';
    state.localData = [{ region: 'Bretagne', population: 3300000, code: '35' }];
    state.fields = [
      { name: 'region', type: 'string', sample: 'Bretagne' },
      { name: 'population', type: 'number', sample: 3300000 },
      { name: 'code', type: 'string', sample: '35' },
    ];
    state.datalistColumns = [
      { field: 'region', label: 'Region', visible: true, filtrable: false },
      { field: 'population', label: 'Pop.', visible: true, filtrable: false },
      { field: 'code', label: 'Code', visible: false, filtrable: false },
    ];
    state.labelField = 'region';
    state.limit = 10;

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('colonnes="region:Region, population:Pop."');
    expect(code).not.toContain('code:Code');
  });

  it('should not include recherche attribute when datalistRecherche is false', () => {
    state.chartType = 'datalist';
    state.localData = [{ region: 'Bretagne' }];
    state.fields = [{ name: 'region', type: 'string', sample: 'Bretagne' }];
    state.labelField = 'region';
    state.limit = 10;
    state.datalistRecherche = false;
    state.datalistExportCsv = false;

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).not.toContain('recherche');
    expect(code).not.toContain('export="csv"');
  });

  it('should include filtres attribute when datalistFiltres is true', () => {
    state.chartType = 'datalist';
    state.localData = [{ region: 'Bretagne', code: '35' }];
    state.fields = [
      { name: 'region', type: 'string', sample: 'Bretagne' },
      { name: 'code', type: 'string', sample: '35' },
    ];
    state.datalistColumns = [
      { field: 'region', label: 'Region', visible: true, filtrable: true },
      { field: 'code', label: 'Code', visible: true, filtrable: false },
    ];
    state.datalistFiltres = true;
    state.labelField = 'region';
    state.limit = 10;

    generateCodeForLocalData();

    const code = document.getElementById('generated-code')!.textContent!;
    expect(code).toContain('filtres="region"');
  });
});
