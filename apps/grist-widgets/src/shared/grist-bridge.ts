/**
 * Grist Bridge - Pont entre l'API Grist et le data-bridge gouv-widgets
 *
 * Utilise le global GouvWidgets (UMD) pour dispatcher les evenements
 * compatibles avec le systeme gouv-data-loaded / gouv-data-error.
 */

export const GRIST_SOURCE_ID = 'grist';

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

  GouvWidgets.dispatchDataLoading(GRIST_SOURCE_ID);

  grist.onRecords((records, mappings) => {
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
