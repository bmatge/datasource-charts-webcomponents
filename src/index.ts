/**
 * gouv-widgets - Bibliothèque de Web Components de dataviz pour sites gouvernementaux
 *
 * Point d'entrée principal - enregistre tous les composants
 */

// Composants de données
export { GouvSource } from './components/gouv-source.js';
export { GouvKpi } from './components/gouv-kpi.js';
export { GouvDatalist } from './components/gouv-datalist.js';
export { GouvChart } from './components/gouv-chart.js';
export { GouvDsfrChart } from './components/gouv-dsfr-chart.js';

// Composants de layout
export { AppHeader, AppFooter, AppLayoutBuilder, AppLayoutDemo } from './components/layout/index.js';

// Utilitaires (pour usage avancé)
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
