/**
 * Application state for the Builder app.
 * Defines interfaces, types, and the singleton state object.
 */

// Chart.js loaded via CDN - use global reference
const Chart = (window as Record<string, unknown>).Chart as unknown;
export { Chart };

/** External proxy base URL for production usage */
export const PROXY_BASE_URL = 'https://chartsbuilder.matge.com';

/** Favorites localStorage key */
export const FAVORITES_KEY = 'gouv-widgets-favorites';

/** Supported chart types */
export type ChartType =
  | 'bar'
  | 'horizontalBar'
  | 'line'
  | 'pie'
  | 'doughnut'
  | 'radar'
  | 'scatter'
  | 'gauge'
  | 'kpi'
  | 'map';

/** Source types */
export type SourceType = 'saved';

/** Generation modes */
export type GenerationMode = 'embedded' | 'dynamic';

/** Aggregation functions */
export type AggregationType = 'avg' | 'sum' | 'count' | 'min' | 'max';

/** Sort orders */
export type SortOrder = 'asc' | 'desc';

/** A field descriptor extracted from data */
export interface Field {
  name: string;
  fullPath?: string;
  displayName?: string;
  type: string;
  sample: unknown;
}

/** A saved data source */
export interface Source {
  id: string;
  name: string;
  type: 'grist' | 'manual' | 'api';
  apiUrl?: string;
  documentId?: string;
  tableId?: string;
  isPublic?: boolean;
  data?: Record<string, unknown>[];
  rawRecords?: Array<{ fields: Record<string, unknown> }>;
  recordCount?: number;
  dataPath?: string;
}

/** A single data record (aggregated result) */
export interface DataRecord {
  [key: string]: unknown;
  value?: number;
  value2?: number;
}

/** A favorite entry */
export interface Favorite {
  id: string;
  name: string;
  code: string;
  chartType: ChartType;
  source: string;
  createdAt: string;
  builderState: Partial<BuilderState>;
}

/** The builder state object (serializable parts for favorites) */
export interface BuilderState {
  sourceType: SourceType;
  apiUrl: string;
  savedSource: Source | null;
  localData: Record<string, unknown>[] | null;
  fields: Field[];
  chartType: ChartType;
  labelField: string;
  valueField: string;
  valueField2: string;
  codeField: string;
  aggregation: AggregationType;
  limit: number;
  sortOrder: SortOrder;
  title: string;
  subtitle: string;
  palette: string;
  color2: string;
  data: DataRecord[];
  data2: DataRecord[];
  chartInstance: unknown;
  generationMode: GenerationMode;
  refreshInterval: number;
  advancedMode: boolean;
  queryFilter: string;
  queryGroupBy: string;
  queryAggregate: string;
}

/** The singleton application state */
export const state: BuilderState = {
  sourceType: 'saved',
  apiUrl: '',
  savedSource: null,
  localData: null,
  fields: [],
  chartType: 'bar',
  labelField: '',
  valueField: '',
  valueField2: '',
  codeField: '',
  aggregation: 'avg',
  limit: 10,
  sortOrder: 'desc',
  title: 'Mon graphique',
  subtitle: '',
  palette: 'default',
  color2: '#E1000F',
  data: [],
  data2: [],
  chartInstance: null,
  generationMode: 'embedded',
  refreshInterval: 0,
  advancedMode: false,
  queryFilter: '',
  queryGroupBy: '',
  queryAggregate: '',
};
