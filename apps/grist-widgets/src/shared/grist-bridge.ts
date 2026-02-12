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
 */
export function detectGristApi(): void {
  Promise.all([
    grist.docApi.getAccessToken({ readOnly: true }).then(info => {
      gristApiBaseUrl = info.baseUrl;
    }),
    grist.selectedTable?.getTableId().then(id => {
      gristTableId = id;
    }),
  ]).catch(() => { /* API non disponible */ });
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
