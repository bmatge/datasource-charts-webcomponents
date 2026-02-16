/**
 * Unified Source interface shared across all apps (sources, builder, builder-ia).
 *
 * Replaces the 3 independent Source definitions that existed before:
 * - apps/sources/src/state.ts (14 fields)
 * - apps/builder/src/state.ts  (10 fields)
 * - apps/builder-ia/src/state.ts (6 fields)
 */

import type { ProviderId } from '../providers/provider-config.js';
import { detectProvider, extractResourceIds } from '../providers/index.js';

export interface Source {
  id: string;
  name: string;

  // --- Type and provider ---
  /** High-level source type */
  type: 'grist' | 'api' | 'manual';
  /** Auto-detected provider (opendatasoft, tabular, grist, generic) */
  provider?: ProviderId;

  // --- Connection ---
  apiUrl?: string;
  method?: string;
  headers?: string | null;
  dataPath?: string | null;

  // --- Resource IDs (extracted from URL by provider) ---
  resourceIds?: Record<string, string>;

  // --- Grist specific ---
  documentId?: string;
  tableId?: string;
  apiKey?: string | null;
  isPublic?: boolean;

  // --- Loaded data ---
  data?: Record<string, unknown>[];
  rawRecords?: Array<{ fields: Record<string, unknown> }>;
  recordCount?: number;

  // --- Origin connection ---
  connectionId?: string;
}

/**
 * Migrate a legacy source (without provider field) to the unified format.
 * Called transparently when loading sources from localStorage.
 */
export function migrateSource(raw: Partial<Source>): Source {
  const source = { ...raw } as Source;

  // Auto-detect provider if missing
  if (!source.provider) {
    if (source.type === 'grist') {
      source.provider = 'grist';
    } else if (source.type === 'api' && source.apiUrl) {
      source.provider = detectProvider(source.apiUrl).id;
    } else {
      source.provider = 'generic';
    }
  }

  // Auto-extract resource IDs if missing
  if (!source.resourceIds && source.apiUrl && source.provider !== 'generic') {
    const ids = extractResourceIds(source.apiUrl);
    if (ids) source.resourceIds = ids;
  }

  return source;
}
