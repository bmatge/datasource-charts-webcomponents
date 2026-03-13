/**
 * gouv-widgets/core - Composants de dataviz sans la carte du monde
 *
 * Bundle allege sans d3-geo ni topojson (~50% plus leger).
 * Pour ajouter gouv-world-map, charger aussi gouv-widgets.world-map.esm.js
 */

// Composants de donnees
export { GouvSource } from './components/gouv-source.js';
export { GouvQuery } from './components/gouv-query.js';
export { GouvNormalize } from './components/gouv-normalize.js';
export { GouvFacets } from './components/gouv-facets.js';
export { GouvSearch } from './components/gouv-search.js';
export { GouvKpi } from './components/gouv-kpi.js';
export { GouvKpiGroup } from './components/gouv-kpi-group.js';
export { GouvDatalist } from './components/gouv-datalist.js';
export { GouvDisplay } from './components/gouv-display.js';
export { GouvDsfrChart } from './components/gouv-dsfr-chart.js';
export { GouvChartA11y } from './components/gouv-chart-a11y.js';

// Composants de layout
export { AppHeader, AppFooter, AppLayoutBuilder, AppLayoutDemo } from './components/layout/index.js';

// Utilitaires
export {
  DATA_EVENTS,
  subscribeToSource,
  getDataCache,
  dispatchDataLoaded,
  dispatchDataError,
  dispatchDataLoading
} from './utils/data-bridge.js';

export { getByPath, hasPath, getByPathOrDefault } from './utils/json-path.js';
export { formatValue, formatNumber, formatPercentage, formatCurrency, formatDate } from './utils/formatters.js';
export { computeAggregation, parseExpression } from './utils/aggregations.js';
export { processChartData, extractLabelValues, aggregateByLabel, sortByValue } from './utils/chart-data.js';
export { SourceSubscriberMixin } from './utils/source-subscriber.js';

// Adapters
export type {
  ApiAdapter, AdapterCapabilities, AdapterParams,
  FetchResult, FacetResult, ServerSideOverlay
} from './adapters/api-adapter.js';
export { getAdapter, registerAdapter } from './adapters/api-adapter.js';
