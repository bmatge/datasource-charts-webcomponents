/**
 * Grist Bridge - Pont entre l'API Grist et le data-bridge gouv-widgets
 *
 * Utilise le global GouvWidgets (UMD) pour dispatcher les evenements
 * compatibles avec le systeme gouv-data-loaded / gouv-data-error.
 */

export const GRIST_SOURCE_ID = 'grist';

let gristApiBaseUrl: string | null = null;
let gristTableId: string | null = null;
let gristColumnMappings: Record<string, string> | null = null;

/**
 * Detecte l'URL API Grist et le table ID (fire-and-forget).
 * Essaie getAccessToken puis fallback sur document.referrer.
 * Essaie selectedTable puis getTable() pour le table ID.
 */
export function detectGristApi(): void {
  console.log('[grist-bridge] detectGristApi() called');
  console.log('[grist-bridge] document.referrer =', document.referrer);
  console.log('[grist-bridge] typeof grist =', typeof grist);
  console.log('[grist-bridge] grist.docApi =', grist.docApi);
  console.log('[grist-bridge] typeof getAccessToken =', typeof grist.docApi?.getAccessToken);
  console.log('[grist-bridge] grist.selectedTable =', grist.selectedTable);

  // 1. Detect API base URL
  try {
    if (typeof grist.docApi?.getAccessToken === 'function') {
      console.log('[grist-bridge] Trying getAccessToken...');
      grist.docApi.getAccessToken({ readOnly: true })
        .then(info => {
          console.log('[grist-bridge] getAccessToken OK:', info);
          gristApiBaseUrl = info.baseUrl;
        })
        .catch((err) => {
          console.log('[grist-bridge] getAccessToken FAILED:', err);
          detectBaseUrlFromReferrer();
        });
    } else {
      console.log('[grist-bridge] getAccessToken not available, trying referrer');
      detectBaseUrlFromReferrer();
    }
  } catch (err) {
    console.log('[grist-bridge] getAccessToken exception:', err);
    detectBaseUrlFromReferrer();
  }

  // 2. Detect table ID
  try {
    console.log('[grist-bridge] Trying to get table...');
    let table;
    try {
      table = grist.selectedTable;
      console.log('[grist-bridge] grist.selectedTable =', table);
    } catch (e) {
      console.log('[grist-bridge] grist.selectedTable error:', e);
    }
    if (!table) {
      try {
        table = grist.getTable();
        console.log('[grist-bridge] grist.getTable() =', table);
      } catch (e) {
        console.log('[grist-bridge] grist.getTable() error:', e);
      }
    }
    if (table && typeof table.getTableId === 'function') {
      console.log('[grist-bridge] Trying getTableId...');
      table.getTableId()
        .then(id => {
          console.log('[grist-bridge] getTableId OK:', id);
          gristTableId = id;
        })
        .catch((err) => { console.log('[grist-bridge] getTableId FAILED:', err); });
    } else {
      console.log('[grist-bridge] No table object available');
    }
  } catch (err) {
    console.log('[grist-bridge] table detection exception:', err);
  }
}

/**
 * Fallback : parse l'URL API depuis document.referrer.
 * Page URL: https://HOST/o/ORG/DOC_ID/slug/p/N
 * API URL:  https://HOST/o/ORG/api/docs/DOC_ID
 */
function detectBaseUrlFromReferrer(): void {
  try {
    const referrer = document.referrer;
    console.log('[grist-bridge] detectBaseUrlFromReferrer, referrer =', referrer);
    if (!referrer) {
      console.log('[grist-bridge] No referrer available');
      return;
    }
    const url = new URL(referrer);
    console.log('[grist-bridge] Referrer pathname =', url.pathname);
    const match = url.pathname.match(/^(\/o\/[^/]+)\/([^/]+)/);
    console.log('[grist-bridge] Referrer regex match =', match);
    if (match) {
      gristApiBaseUrl = `${url.origin}${match[1]}/api/docs/${match[2]}`;
      console.log('[grist-bridge] Detected API base URL from referrer:', gristApiBaseUrl);
    } else {
      console.log('[grist-bridge] Referrer did not match expected pattern');
    }
  } catch (err) {
    console.log('[grist-bridge] detectBaseUrlFromReferrer error:', err);
  }
}

/**
 * Retourne les infos API Grist detectees (baseUrl, tableId, mappings colonnes).
 */
export function getGristApiInfo(): {
  apiBaseUrl: string | null;
  tableId: string | null;
  columnMappings: Record<string, string> | null;
} {
  return { apiBaseUrl: gristApiBaseUrl, tableId: gristTableId, columnMappings: gristColumnMappings };
}

/**
 * Initialise le pont Grist -> data-bridge.
 *
 * @param columns - Colonnes attendues (definies par le widget)
 * @param options - Options supplementaires pour grist.ready()
 */
export function initGristBridge(
  columns: GristColumnDef[],
  options?: {
    onEditOptions?: () => void;
  }
): void {
  grist.ready({
    columns,
    requiredAccess: 'read table',
    onEditOptions: options?.onEditOptions,
  });

  detectGristApi();
  GouvWidgets.dispatchDataLoading(GRIST_SOURCE_ID);

  grist.onRecords((records, mappings) => {
    if (mappings) {
      gristColumnMappings = mappings as Record<string, string>;
    }
    const mapped = grist.mapColumnNames(records, mappings);
    if (!mapped) {
      GouvWidgets.dispatchDataError(GRIST_SOURCE_ID, new Error(
        'Colonnes non mappees. Configurez le mapping dans les options du widget Grist.'
      ));
      return;
    }
    GouvWidgets.dispatchDataLoaded(GRIST_SOURCE_ID, mapped);
  });
}

/**
 * Charge les options sauvegardees et ecoute les changements.
 */
export function onGristOptions(
  callback: (options: Record<string, unknown>) => void
): void {
  grist.onOptions((opts) => {
    if (opts) {
      callback(opts);
    }
  });
}

/**
 * Sauvegarde une option dans le stockage Grist.
 */
export function saveGristOption(key: string, value: unknown): void {
  grist.setOption(key, value);
}

/**
 * Sauvegarde plusieurs options dans le stockage Grist.
 */
export function saveGristOptions(options: Record<string, unknown>): void {
  grist.setOptions(options);
}
