/**
 * Application state for the Sources app.
 * Contains interfaces, types, and the mutable singleton state object.
 */

import { loadFromStorage, STORAGE_KEYS } from '@gouv-widgets/shared';

// ============================================================
// Types
// ============================================================

export interface GristConnection {
  id: string;
  type: 'grist';
  name: string;
  url: string;
  apiKey: string | null;
  isPublic: boolean;
  status: string;
  statusText: string;
}

export interface ApiConnection {
  id: string;
  type: 'api';
  name: string;
  apiUrl: string;
  method: string;
  headers: string | null;
  dataPath: string | null;
  status: string;
  statusText: string;
}

export type Connection = GristConnection | ApiConnection;

/** Legacy connections may lack a type field. */
export type StoredConnection = Connection & Record<string, unknown>;

export interface GristDocument {
  id: string;
  name: string;
  orgId: number;
  workspaceId: number;
  [key: string]: unknown;
}

export interface GristTable {
  id: string;
  [key: string]: unknown;
}

export interface GristRecord {
  id: number;
  fields: Record<string, unknown>;
}

export interface Source {
  id: string;
  name: string;
  type: 'grist' | 'api' | 'manual';
  data?: Record<string, unknown>[];
  rawRecords?: GristRecord[];
  recordCount: number;
  connectionId?: string;
  documentId?: string;
  tableId?: string;
  apiUrl?: string;
  apiKey?: string | null;
  isPublic?: boolean;
  method?: string;
  headers?: string | null;
  dataPath?: string | null;
}

export interface SourcesState {
  connections: StoredConnection[];
  sources: Source[];
  selectedConnection: number | null;
  selectedDocument: string | null;
  selectedTable: string | null;
  documents: GristDocument[];
  tables: GristTable[];
  tableData: GristRecord[] | Record<string, unknown>[];
  editingConnectionIndex: number | null;
  previewedSource: Source | null;
  /** Total record count reported by API (e.g. ODS total_count), -1 if unknown */
  apiTotalCount: number;
}

// ============================================================
// Constants
// ============================================================

/** External proxy URL for production / Tauri builds */
export const EXTERNAL_PROXY = 'https://chartsbuilder.matge.com';

// ============================================================
// Module-level mutable state singleton
// ============================================================

export function createInitialState(): SourcesState {
  return {
    connections: loadFromStorage<StoredConnection[]>(STORAGE_KEYS.CONNECTIONS, []),
    sources: loadFromStorage<Source[]>(STORAGE_KEYS.SOURCES, []),
    selectedConnection: null,
    selectedDocument: null,
    selectedTable: null,
    documents: [],
    tables: [],
    tableData: [],
    editingConnectionIndex: null,
    previewedSource: null,
    apiTotalCount: -1,
  };
}

/**
 * The mutable application state, shared across all modules.
 * Import this object and mutate it directly (matching the original approach).
 */
export const state: SourcesState = createInitialState();

// ============================================================
// Parsed data from manual source modal (JSON / CSV modes)
// ============================================================

/** Currently active source input mode in the manual-source modal */
export let currentSourceMode = 'table';
export function setCurrentSourceMode(mode: string): void {
  currentSourceMode = mode;
}

/** Parsed JSON data (set by json-parser) */
export let parsedJsonData: Record<string, unknown>[] | null = null;
export function setParsedJsonData(data: Record<string, unknown>[] | null): void {
  parsedJsonData = data;
}

/** Parsed CSV data (set by csv-parser) */
export let parsedCsvData: Record<string, unknown>[] | null = null;
export function setParsedCsvData(data: Record<string, unknown>[] | null): void {
  parsedCsvData = data;
}
