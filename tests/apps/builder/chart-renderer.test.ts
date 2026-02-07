import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { state } from '../../../apps/builder/src/state';

// Mock Chart.js constructor and instance
const mockChartInstance = { destroy: vi.fn() };
const MockChart = vi.fn(() => mockChartInstance);

describe('builder chart-renderer', () => {
  beforeEach(() => {
    // Set up Chart.js mock on window (read lazily via ChartJS function)
    (window as any).Chart = MockChart;
    MockChart.mockClear();
    mockChartInstance.destroy.mockClear();

    // Reset state to known defaults
    state.chartType = 'bar';
    state.chartInstance = null;
    state.data = [];
    state.labelField = 'region';
    state.valueField = 'population';
    state.valueField2 = '';
    state.codeField = '';
    state.title = 'Test Chart';
    state.palette = 'default';
    state.color2 = '#E1000F';

    // Set up minimal DOM structure expected by renderChart
    document.body.innerHTML = `
      <div class="chart-container">
        <canvas id="preview-canvas"></canvas>
        <div id="empty-state" style="display:block"></div>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete (window as any).Chart;
  });

  // Dynamic import to ensure module is loaded fresh with the mocked window.Chart
  async function loadRenderChart() {
    const mod = await import('../../../apps/builder/src/ui/chart-renderer');
    return mod.renderChart;
  }

  it('should do nothing when canvas is missing', async () => {
    const renderChart = await loadRenderChart();
    document.body.innerHTML = '<div class="chart-container"></div>';

    // Should not throw
    expect(() => renderChart()).not.toThrow();
    expect(MockChart).not.toHaveBeenCalled();
  });

  it('should do nothing when chart-container is missing', async () => {
    const renderChart = await loadRenderChart();
    document.body.innerHTML = '<canvas id="preview-canvas"></canvas>';

    expect(() => renderChart()).not.toThrow();
    expect(MockChart).not.toHaveBeenCalled();
  });

  it('should hide the empty-state element', async () => {
    const renderChart = await loadRenderChart();
    state.data = [{ region: 'IDF', value: 100 }];

    renderChart();

    const emptyState = document.getElementById('empty-state')!;
    expect(emptyState.style.display).toBe('none');
  });

  it('should destroy previous chart instance', async () => {
    const renderChart = await loadRenderChart();
    const oldInstance = { destroy: vi.fn() };
    state.chartInstance = oldInstance;
    state.data = [{ region: 'IDF', value: 100 }];

    renderChart();

    expect(oldInstance.destroy).toHaveBeenCalledOnce();
  });

  it('should remove existing KPI card before rendering', async () => {
    const renderChart = await loadRenderChart();
    const container = document.querySelector('.chart-container')!;
    const existingCard = document.createElement('div');
    existingCard.className = 'kpi-card';
    container.appendChild(existingCard);

    state.chartType = 'bar';
    state.data = [{ region: 'IDF', value: 100 }];
    renderChart();

    expect(container.querySelector('.kpi-card')).toBeNull();
  });

  it('should remove existing gauge card before rendering', async () => {
    const renderChart = await loadRenderChart();
    const container = document.querySelector('.chart-container')!;
    const existingCard = document.createElement('div');
    existingCard.className = 'gauge-card';
    container.appendChild(existingCard);

    state.chartType = 'bar';
    state.data = [{ region: 'IDF', value: 100 }];
    renderChart();

    expect(container.querySelector('.gauge-card')).toBeNull();
  });

  it('should remove existing map card before rendering', async () => {
    const renderChart = await loadRenderChart();
    const container = document.querySelector('.chart-container')!;
    const existingCard = document.createElement('div');
    existingCard.className = 'map-card';
    container.appendChild(existingCard);

    state.chartType = 'bar';
    state.data = [{ region: 'IDF', value: 100 }];
    renderChart();

    expect(container.querySelector('.map-card')).toBeNull();
  });

  describe('KPI rendering', () => {
    it('should create a kpi-card element and hide canvas', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'kpi';
      state.data = [{ value: 42000 }];
      state.title = 'Total Population';

      renderChart();

      const canvas = document.getElementById('preview-canvas') as HTMLCanvasElement;
      expect(canvas.style.display).toBe('none');

      const kpiCard = document.querySelector('.kpi-card');
      expect(kpiCard).not.toBeNull();
    });

    it('should display formatted value and title in KPI card', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'kpi';
      state.data = [{ value: 1234.56 }];
      state.title = 'Revenue';

      renderChart();

      const kpiCard = document.querySelector('.kpi-card')!;
      const valueEl = kpiCard.querySelector('.kpi-value');
      const labelEl = kpiCard.querySelector('.kpi-label');

      expect(valueEl).not.toBeNull();
      expect(labelEl).not.toBeNull();
      expect(labelEl!.textContent).toBe('Revenue');
      // formatKPIValue(1234.56) formats with fr-FR locale
      expect(valueEl!.textContent).toBeTruthy();
    });

    it('should not call Chart.js constructor for KPI type', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'kpi';
      state.data = [{ value: 100 }];

      renderChart();

      expect(MockChart).not.toHaveBeenCalled();
    });

    it('should use kpi-variant select value for card class', async () => {
      const renderChart = await loadRenderChart();

      // Add a kpi-variant select to the DOM
      const select = document.createElement('select');
      select.id = 'kpi-variant';
      const option = document.createElement('option');
      option.value = 'success';
      option.selected = true;
      select.appendChild(option);
      document.body.appendChild(select);

      state.chartType = 'kpi';
      state.data = [{ value: 50 }];

      renderChart();

      const kpiCard = document.querySelector('.kpi-card')!;
      expect(kpiCard.className).toBe('kpi-card kpi-card--success');
    });
  });

  describe('Gauge rendering', () => {
    it('should create a gauge-card element with SVG and hide canvas', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'gauge';
      state.data = [{ value: 75 }];
      state.title = 'Completion Rate';

      renderChart();

      const canvas = document.getElementById('preview-canvas') as HTMLCanvasElement;
      expect(canvas.style.display).toBe('none');

      const gaugeCard = document.querySelector('.gauge-card');
      expect(gaugeCard).not.toBeNull();

      const svg = gaugeCard!.querySelector('svg');
      expect(svg).not.toBeNull();
    });

    it('should display gauge value and label', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'gauge';
      state.data = [{ value: 65 }];
      state.title = 'Score';

      renderChart();

      const gaugeCard = document.querySelector('.gauge-card')!;
      const gaugeValue = gaugeCard.querySelector('.gauge-value');
      const gaugeLabel = gaugeCard.querySelector('.gauge-label');

      expect(gaugeValue).not.toBeNull();
      expect(gaugeLabel).not.toBeNull();
      // Default unit is '%'
      expect(gaugeValue!.textContent).toBe('65%');
      expect(gaugeLabel!.textContent).toBe('Score');
    });

    it('should clamp gauge value between 0 and 100', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'gauge';
      state.data = [{ value: 150 }];
      state.title = 'Over Max';

      renderChart();

      const gaugeValue = document.querySelector('.gauge-value');
      expect(gaugeValue!.textContent).toBe('100%');
    });

    it('should not call Chart.js constructor for gauge type', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'gauge';
      state.data = [{ value: 50 }];

      renderChart();

      expect(MockChart).not.toHaveBeenCalled();
    });

    it('should use palette color for gauge stroke', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'gauge';
      state.data = [{ value: 50 }];
      state.palette = 'default';

      renderChart();

      const gaugeFill = document.querySelector('.gauge-fill');
      expect(gaugeFill).not.toBeNull();
      // Default palette primary color is #000091
      expect(gaugeFill!.getAttribute('stroke')).toBe('#000091');
    });
  });

  describe('Map rendering', () => {
    it('should create a map-card element with map-chart custom element', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'map';
      state.codeField = 'dept';
      state.data = [
        { dept: '75', value: 100 },
        { dept: '13', value: 200 },
      ];
      state.title = 'Population par departement';

      renderChart();

      const canvas = document.getElementById('preview-canvas') as HTMLCanvasElement;
      expect(canvas.style.display).toBe('none');

      const mapCard = document.querySelector('.map-card');
      expect(mapCard).not.toBeNull();

      const mapChart = mapCard!.querySelector('map-chart');
      expect(mapChart).not.toBeNull();
    });

    it('should pass data as JSON attribute on map-chart', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'map';
      state.codeField = 'dept';
      state.data = [
        { dept: '75', value: 100 },
        { dept: '13', value: 200 },
      ];

      renderChart();

      const mapChart = document.querySelector('map-chart')!;
      const dataAttr = mapChart.getAttribute('data');
      expect(dataAttr).not.toBeNull();
      const parsed = JSON.parse(dataAttr!);
      expect(parsed['75']).toBe(100);
      expect(parsed['13']).toBe(200);
    });

    it('should normalize numeric department codes with zero-padding', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'map';
      state.codeField = 'dept';
      state.data = [
        { dept: '1', value: 50 },  // Should become "01"
        { dept: '34', value: 75 },
      ];

      renderChart();

      const mapChart = document.querySelector('map-chart')!;
      const parsed = JSON.parse(mapChart.getAttribute('data')!);
      expect(parsed['01']).toBe(50);
      expect(parsed['34']).toBe(75);
    });

    it('should exclude invalid department codes from map data', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'map';
      state.codeField = 'dept';
      state.data = [
        { dept: '75', value: 100 },
        { dept: 'INVALID', value: 999 },
        { dept: '00', value: 0 },
      ];

      renderChart();

      const mapChart = document.querySelector('map-chart')!;
      const parsed = JSON.parse(mapChart.getAttribute('data')!);
      expect(parsed['75']).toBe(100);
      expect(parsed['INVALID']).toBeUndefined();
      expect(parsed['00']).toBeUndefined();
    });

    it('should calculate national average for value-nat attribute', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'map';
      state.codeField = 'dept';
      state.data = [
        { dept: '75', value: 100 },
        { dept: '13', value: 200 },
      ];

      renderChart();

      const mapChart = document.querySelector('map-chart')!;
      const valueNat = mapChart.getAttribute('value-nat');
      // Average of 100 and 200 = 150
      expect(valueNat).toBe('150');
    });

    it('should not call Chart.js constructor for map type', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'map';
      state.codeField = 'dept';
      state.data = [{ dept: '75', value: 100 }];

      renderChart();

      expect(MockChart).not.toHaveBeenCalled();
    });

    it('should default to sequentialAscending palette for non-sequential palettes', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'map';
      state.codeField = 'dept';
      state.data = [{ dept: '75', value: 100 }];
      state.palette = 'categorical';

      renderChart();

      const mapChart = document.querySelector('map-chart')!;
      expect(mapChart.getAttribute('selected-palette')).toBe('sequentialAscending');
    });

    it('should use sequential palette when palette name includes sequential', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'map';
      state.codeField = 'dept';
      state.data = [{ dept: '75', value: 100 }];
      state.palette = 'sequentialAscending';

      renderChart();

      const mapChart = document.querySelector('map-chart')!;
      expect(mapChart.getAttribute('selected-palette')).toBe('sequentialAscending');
    });
  });

  describe('Standard chart rendering', () => {
    it('should call Chart constructor with correct type and data', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.data = [
        { region: 'IDF', value: 100 },
        { region: 'PACA', value: 200 },
      ];

      renderChart();

      expect(MockChart).toHaveBeenCalledOnce();
      const [canvas, config] = MockChart.mock.calls[0];
      expect(canvas).toBe(document.getElementById('preview-canvas'));
      expect(config.type).toBe('bar');
      expect(config.data.labels).toEqual(['IDF', 'PACA']);
      expect(config.data.datasets[0].data).toEqual([100, 200]);
    });

    it('should set canvas display to block for standard chart types', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.data = [{ region: 'IDF', value: 100 }];

      renderChart();

      const canvas = document.getElementById('preview-canvas') as HTMLCanvasElement;
      expect(canvas.style.display).toBe('block');
    });

    it('should store chart instance in state', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.data = [{ region: 'IDF', value: 100 }];

      renderChart();

      expect(state.chartInstance).toBe(mockChartInstance);
    });

    it('should use primary color for single-color charts', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.palette = 'default';
      state.data = [{ region: 'IDF', value: 100 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      // Default primary color is #000091
      expect(config.data.datasets[0].backgroundColor).toBe('#000091');
    });

    it('should use label N/A for missing label field values', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.data = [{ value: 100 }]; // no 'region' field

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.data.labels).toEqual(['N/A']);
    });

    it('should round values to 2 decimal places', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.data = [{ region: 'IDF', value: 123.456789 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.data.datasets[0].data).toEqual([123.46]);
    });

    it('should set responsive and maintainAspectRatio options', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.data = [{ region: 'IDF', value: 100 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.options.responsive).toBe(true);
      expect(config.options.maintainAspectRatio).toBe(false);
    });

    it('should set line chart with borderWidth 2 and no fill', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'line';
      state.data = [{ region: 'IDF', value: 100 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      const dataset = config.data.datasets[0];
      expect(dataset.borderWidth).toBe(2);
      expect(dataset.fill).toBe(false);
    });
  });

  describe('Horizontal bar', () => {
    it('should map horizontalBar to bar type with indexAxis y', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'horizontalBar';
      state.data = [{ region: 'IDF', value: 100 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.type).toBe('bar');
      expect(config.options.indexAxis).toBe('y');
    });

    it('should set beginAtZero on x axis for horizontal bar', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'horizontalBar';
      state.data = [{ region: 'IDF', value: 100 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.options.scales.x.beginAtZero).toBe(true);
    });
  });

  describe('Scatter chart', () => {
    it('should create scatter chart with x/y data format', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'scatter';
      state.labelField = 'age';
      state.valueField = 'income';
      state.data = [
        { age: 25, value: 30000 },
        { age: 35, value: 50000 },
      ];

      renderChart();

      expect(MockChart).toHaveBeenCalledOnce();
      const config = MockChart.mock.calls[0][1];
      expect(config.type).toBe('scatter');
      expect(config.data.datasets[0].data).toEqual([
        { x: 25, y: 30000 },
        { x: 35, y: 50000 },
      ]);
    });

    it('should set axis titles for scatter chart', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'scatter';
      state.labelField = 'age';
      state.valueField = 'income';
      state.data = [{ age: 25, value: 30000 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.options.scales.x.title.text).toBe('age');
      expect(config.options.scales.y.title.text).toBe('income');
    });

    it('should use primary color for scatter points', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'scatter';
      state.palette = 'default';
      state.data = [{ age: 25, value: 30000 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      const dataset = config.data.datasets[0];
      expect(dataset.backgroundColor).toBe('#000091');
      expect(dataset.borderColor).toBe('#000091');
    });

    it('should store chart instance in state for scatter chart', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'scatter';
      state.data = [{ age: 25, value: 30000 }];

      renderChart();

      expect(state.chartInstance).toBe(mockChartInstance);
    });
  });

  describe('Multi-series', () => {
    it('should add second dataset when valueField2 is set for bar type', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.valueField2 = 'density';
      state.data = [
        { region: 'IDF', value: 100, value2: 50 },
        { region: 'PACA', value: 200, value2: 75 },
      ];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.data.datasets).toHaveLength(2);
      expect(config.data.datasets[0].label).toBe('population');
      expect(config.data.datasets[0].data).toEqual([100, 200]);
      expect(config.data.datasets[1].label).toBe('density');
      expect(config.data.datasets[1].data).toEqual([50, 75]);
    });

    it('should use color2 for the second dataset', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.valueField2 = 'density';
      state.color2 = '#FF0000';
      state.data = [{ region: 'IDF', value: 100, value2: 50 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.data.datasets[1].backgroundColor).toBe('#FF0000');
      expect(config.data.datasets[1].borderColor).toBe('#FF0000');
    });

    it('should add second dataset for line type', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'line';
      state.valueField2 = 'density';
      state.data = [{ region: 'IDF', value: 100, value2: 50 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.data.datasets).toHaveLength(2);
      expect(config.data.datasets[1].fill).toBe(false);
    });

    it('should NOT add second dataset for pie type even if valueField2 is set', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'pie';
      state.valueField2 = 'density';
      state.data = [
        { region: 'IDF', value: 100, value2: 50 },
        { region: 'PACA', value: 200, value2: 75 },
      ];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.data.datasets).toHaveLength(1);
    });

    it('should show legend when multiple datasets are present', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.valueField2 = 'density';
      state.data = [{ region: 'IDF', value: 100, value2: 50 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.options.plugins.legend.display).toBe(true);
    });
  });

  describe('Pie/doughnut (multi-color palette)', () => {
    it('should use multi-color palette for pie chart', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'pie';
      state.palette = 'categorical';
      state.data = [
        { region: 'IDF', value: 100 },
        { region: 'PACA', value: 200 },
        { region: 'ARA', value: 150 },
      ];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      const colors = config.data.datasets[0].backgroundColor;
      expect(Array.isArray(colors)).toBe(true);
      expect(colors).toHaveLength(3);
    });

    it('should use multi-color palette for doughnut chart', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'doughnut';
      state.palette = 'categorical';
      state.data = [
        { region: 'IDF', value: 100 },
        { region: 'PACA', value: 200 },
      ];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      const colors = config.data.datasets[0].backgroundColor;
      expect(Array.isArray(colors)).toBe(true);
      expect(colors).toHaveLength(2);
    });

    it('should show legend for pie/doughnut charts', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'pie';
      state.data = [
        { region: 'IDF', value: 100 },
        { region: 'PACA', value: 200 },
      ];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.options.plugins.legend.display).toBe(true);
    });

    it('should not include scales for pie/doughnut charts', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'pie';
      state.data = [{ region: 'IDF', value: 100 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.options.scales).toEqual({});
    });

    it('should hide legend for single-series bar chart', async () => {
      const renderChart = await loadRenderChart();
      state.chartType = 'bar';
      state.valueField2 = '';
      state.data = [{ region: 'IDF', value: 100 }];

      renderChart();

      const config = MockChart.mock.calls[0][1];
      expect(config.options.plugins.legend.display).toBe(false);
    });
  });
});
