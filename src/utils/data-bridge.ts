/**
 * Data Bridge - Système de communication inter-composants
 * Permet aux composants gouv-* de partager des données via un système d'événements
 */

export interface DataLoadedEvent {
  sourceId: string;
  data: unknown;
}

export interface DataErrorEvent {
  sourceId: string;
  error: Error;
}

export interface DataLoadingEvent {
  sourceId: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
}

export interface PageRequestEvent {
  sourceId: string;
  page: number;
}

// Noms des événements custom
export const DATA_EVENTS = {
  LOADED: 'gouv-data-loaded',
  ERROR: 'gouv-data-error',
  LOADING: 'gouv-data-loading',
  PAGE_REQUEST: 'gouv-page-request'
} as const;

// Cache global des données par sourceId
const dataCache = new Map<string, unknown>();

// Cache des métadonnées de pagination par sourceId
const metaCache = new Map<string, PaginationMeta>();

/**
 * Enregistre des données dans le cache global
 */
export function setDataCache(sourceId: string, data: unknown): void {
  dataCache.set(sourceId, data);
}

/**
 * Récupère des données depuis le cache global
 */
export function getDataCache(sourceId: string): unknown | undefined {
  return dataCache.get(sourceId);
}

/**
 * Supprime des données du cache
 */
export function clearDataCache(sourceId: string): void {
  dataCache.delete(sourceId);
}

/**
 * Enregistre des métadonnées de pagination
 */
export function setDataMeta(sourceId: string, meta: PaginationMeta): void {
  metaCache.set(sourceId, meta);
}

/**
 * Récupère les métadonnées de pagination
 */
export function getDataMeta(sourceId: string): PaginationMeta | undefined {
  return metaCache.get(sourceId);
}

/**
 * Supprime les métadonnées de pagination
 */
export function clearDataMeta(sourceId: string): void {
  metaCache.delete(sourceId);
}

/**
 * Dispatch un événement de données chargées
 */
export function dispatchDataLoaded(sourceId: string, data: unknown): void {
  setDataCache(sourceId, data);

  const event = new CustomEvent<DataLoadedEvent>(DATA_EVENTS.LOADED, {
    bubbles: true,
    composed: true,
    detail: { sourceId, data }
  });

  document.dispatchEvent(event);
}

/**
 * Dispatch un événement d'erreur
 */
export function dispatchDataError(sourceId: string, error: Error): void {
  const event = new CustomEvent<DataErrorEvent>(DATA_EVENTS.ERROR, {
    bubbles: true,
    composed: true,
    detail: { sourceId, error }
  });

  document.dispatchEvent(event);
}

/**
 * Dispatch un événement de chargement en cours
 */
export function dispatchDataLoading(sourceId: string): void {
  const event = new CustomEvent<DataLoadingEvent>(DATA_EVENTS.LOADING, {
    bubbles: true,
    composed: true,
    detail: { sourceId }
  });

  document.dispatchEvent(event);
}

/**
 * Dispatch un événement de demande de page
 */
export function dispatchPageRequest(sourceId: string, page: number): void {
  const event = new CustomEvent<PageRequestEvent>(DATA_EVENTS.PAGE_REQUEST, {
    bubbles: true,
    composed: true,
    detail: { sourceId, page }
  });

  document.dispatchEvent(event);
}

/**
 * S'abonne aux demandes de changement de page pour une source
 */
export function subscribeToPageRequests(
  sourceId: string,
  callback: (page: number) => void
): () => void {
  const handler = (e: Event) => {
    const event = e as CustomEvent<PageRequestEvent>;
    if (event.detail.sourceId === sourceId) {
      callback(event.detail.page);
    }
  };
  document.addEventListener(DATA_EVENTS.PAGE_REQUEST, handler);
  return () => document.removeEventListener(DATA_EVENTS.PAGE_REQUEST, handler);
}

/**
 * S'abonne aux événements d'une source de données
 */
export function subscribeToSource(
  sourceId: string,
  callbacks: {
    onLoaded?: (data: unknown) => void;
    onError?: (error: Error) => void;
    onLoading?: () => void;
  }
): () => void {
  const handleLoaded = (e: Event) => {
    const event = e as CustomEvent<DataLoadedEvent>;
    if (event.detail.sourceId === sourceId && callbacks.onLoaded) {
      callbacks.onLoaded(event.detail.data);
    }
  };

  const handleError = (e: Event) => {
    const event = e as CustomEvent<DataErrorEvent>;
    if (event.detail.sourceId === sourceId && callbacks.onError) {
      callbacks.onError(event.detail.error);
    }
  };

  const handleLoading = (e: Event) => {
    const event = e as CustomEvent<DataLoadingEvent>;
    if (event.detail.sourceId === sourceId && callbacks.onLoading) {
      callbacks.onLoading();
    }
  };

  document.addEventListener(DATA_EVENTS.LOADED, handleLoaded);
  document.addEventListener(DATA_EVENTS.ERROR, handleError);
  document.addEventListener(DATA_EVENTS.LOADING, handleLoading);

  // Retourne une fonction de cleanup
  return () => {
    document.removeEventListener(DATA_EVENTS.LOADED, handleLoaded);
    document.removeEventListener(DATA_EVENTS.ERROR, handleError);
    document.removeEventListener(DATA_EVENTS.LOADING, handleLoading);
  };
}
