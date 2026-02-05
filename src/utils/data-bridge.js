/**
 * Data Bridge - Système de communication inter-composants
 * Permet aux composants gouv-* de partager des données via un système d'événements
 */
// Noms des événements custom
export const DATA_EVENTS = {
    LOADED: 'gouv-data-loaded',
    ERROR: 'gouv-data-error',
    LOADING: 'gouv-data-loading'
};
// Cache global des données par sourceId
const dataCache = new Map();
/**
 * Enregistre des données dans le cache global
 */
export function setDataCache(sourceId, data) {
    dataCache.set(sourceId, data);
}
/**
 * Récupère des données depuis le cache global
 */
export function getDataCache(sourceId) {
    return dataCache.get(sourceId);
}
/**
 * Supprime des données du cache
 */
export function clearDataCache(sourceId) {
    dataCache.delete(sourceId);
}
/**
 * Dispatch un événement de données chargées
 */
export function dispatchDataLoaded(sourceId, data) {
    setDataCache(sourceId, data);
    const event = new CustomEvent(DATA_EVENTS.LOADED, {
        bubbles: true,
        composed: true,
        detail: { sourceId, data }
    });
    document.dispatchEvent(event);
}
/**
 * Dispatch un événement d'erreur
 */
export function dispatchDataError(sourceId, error) {
    const event = new CustomEvent(DATA_EVENTS.ERROR, {
        bubbles: true,
        composed: true,
        detail: { sourceId, error }
    });
    document.dispatchEvent(event);
}
/**
 * Dispatch un événement de chargement en cours
 */
export function dispatchDataLoading(sourceId) {
    const event = new CustomEvent(DATA_EVENTS.LOADING, {
        bubbles: true,
        composed: true,
        detail: { sourceId }
    });
    document.dispatchEvent(event);
}
/**
 * S'abonne aux événements d'une source de données
 */
export function subscribeToSource(sourceId, callbacks) {
    const handleLoaded = (e) => {
        const event = e;
        if (event.detail.sourceId === sourceId && callbacks.onLoaded) {
            callbacks.onLoaded(event.detail.data);
        }
    };
    const handleError = (e) => {
        const event = e;
        if (event.detail.sourceId === sourceId && callbacks.onError) {
            callbacks.onError(event.detail.error);
        }
    };
    const handleLoading = (e) => {
        const event = e;
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
