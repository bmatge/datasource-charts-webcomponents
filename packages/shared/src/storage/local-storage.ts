/**
 * Type-safe localStorage helpers with error handling
 */

/** Well-known storage keys used across apps */
export const STORAGE_KEYS = {
  FAVORITES: 'gouv-widgets-favorites',
  DASHBOARDS: 'gouv-widgets-dashboards',
  CONNECTIONS: 'gouv_widgets_connections',
  SOURCES: 'gouv_widgets_sources',
  SELECTED_SOURCE: 'gouv_widgets_selected_source',
} as const;

/**
 * Load a JSON value from localStorage
 * Returns the parsed value or the provided default on error
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Save a JSON value to localStorage.
 * Shows a toast if quota is exceeded.
 */
export function saveToStorage<T>(key: string, data: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.code === 22)) {
      import('../ui/toast.js').then(({ toastError }) => {
        toastError('Espace de stockage plein. Supprimez des elements pour continuer.');
      });
    } else {
      console.error(`Error saving to localStorage key "${key}":`, e);
    }
    return false;
  }
}

/**
 * Remove a value from localStorage
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing localStorage key "${key}":`, e);
  }
}
