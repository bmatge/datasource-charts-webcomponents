/**
 * Adapter pour l'API Grist (grist.numerique.gouv.fr, docs.getgrist.com).
 *
 * Gere : fetch direct (pas de pagination serveur), parsing records[].fields,
 * aplatissement automatique de la structure imbriquee.
 *
 * Grist retourne { records: [{ id, fields: { col1, col2, ... } }, ...] }.
 * L'adapter extrait et aplatit automatiquement les champs pour que gouv-query
 * puisse les traiter en client-side (group-by, aggregate, sort, filter).
 *
 * Le base-url passe en attribut doit deja inclure le proxy si necessaire
 * (ex: https://chartsbuilder.matge.com/grist-gouv-proxy/api/docs/xxx/tables/yyy/records).
 */

import type {
  ApiAdapter, AdapterCapabilities, AdapterParams,
  FetchResult, ServerSideOverlay
} from './api-adapter.js';
import type { ProviderConfig } from '@gouv-widgets/shared';
import { GRIST_CONFIG } from '@gouv-widgets/shared';

/** Construit les options fetch avec headers optionnels */
function buildFetchOptions(params: Pick<AdapterParams, 'headers'>, signal?: AbortSignal): RequestInit {
  const opts: RequestInit = {};
  if (signal) opts.signal = signal;
  if (params.headers && Object.keys(params.headers).length > 0) {
    opts.headers = params.headers;
  }
  return opts;
}

export class GristAdapter implements ApiAdapter {
  readonly type = 'grist';

  readonly capabilities: AdapterCapabilities = {
    serverFetch: true,
    serverFacets: false,
    serverSearch: false,
    serverGroupBy: false,
    serverOrderBy: false,
    whereFormat: 'colon',
  };

  validate(params: AdapterParams): string | null {
    if (!params.baseUrl) {
      return 'attribut "base-url" requis pour les requetes Grist';
    }
    return null;
  }

  /**
   * Fetch toutes les donnees en une seule requete (Grist ne pagine pas).
   * Retourne needsClientProcessing=true car tout le traitement est client-side.
   */
  async fetchAll(params: AdapterParams, signal: AbortSignal): Promise<FetchResult> {
    const url = this.buildUrl(params);
    const response = await fetch(url, buildFetchOptions(params, signal));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const records: unknown[] = json.records || [];

    // Aplatir records[].fields en objets plats
    const data = records.map((r: unknown) => {
      const rec = r as Record<string, unknown>;
      const fields = rec.fields as Record<string, unknown> | undefined;
      return fields ? { ...fields } : rec;
    });

    return {
      data,
      totalCount: data.length,
      needsClientProcessing: true,
    };
  }

  /**
   * Fetch une seule page en mode server-side.
   * Grist ne supporte pas la pagination serveur, donc on retourne tout.
   */
  async fetchPage(params: AdapterParams, _overlay: ServerSideOverlay, signal: AbortSignal): Promise<FetchResult> {
    return this.fetchAll(params, signal);
  }

  /**
   * Construit l'URL Grist. Le base-url doit deja inclure le proxy si necessaire.
   */
  buildUrl(params: AdapterParams): string {
    return params.baseUrl;
  }

  buildServerSideUrl(params: AdapterParams, _overlay: ServerSideOverlay): string {
    return this.buildUrl(params);
  }

  getDefaultSearchTemplate(): null {
    return null;
  }

  getProviderConfig(): ProviderConfig {
    return GRIST_CONFIG;
  }

  buildFacetWhere(
    selections: Record<string, Set<string>>,
    excludeField?: string
  ): string {
    // Grist uses colon syntax (same as Tabular)
    const parts: string[] = [];
    for (const [field, values] of Object.entries(selections)) {
      if (field === excludeField || values.size === 0) continue;
      if (values.size === 1) {
        parts.push(`${field}:eq:${[...values][0]}`);
      } else {
        parts.push(`${field}:in:${[...values].join('|')}`);
      }
    }
    return parts.join(', ');
  }
}
