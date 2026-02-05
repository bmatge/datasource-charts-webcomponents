/**
 * JSON Path - Extraction de données via un chemin de propriétés
 * Permet d'accéder à des propriétés imbriquées dans un objet JSON
 */
/**
 * Extrait une valeur d'un objet en suivant un chemin de propriétés
 * @param obj - L'objet source
 * @param path - Le chemin (ex: "results.items", "data.users[0].name")
 * @returns La valeur trouvée ou undefined
 *
 * @example
 * getByPath({ a: { b: { c: 42 } } }, 'a.b.c') // => 42
 * getByPath({ items: [1, 2, 3] }, 'items[1]') // => 2
 * getByPath({ data: { results: [] } }, 'data.results') // => []
 */
export function getByPath(obj, path) {
    if (!path || path.trim() === '') {
        return obj;
    }
    // Normalise le chemin : convertit items[0] en items.0
    const normalizedPath = path.replace(/\[(\d+)\]/g, '.$1');
    const keys = normalizedPath.split('.');
    let current = obj;
    for (const key of keys) {
        if (current === null || current === undefined) {
            return undefined;
        }
        if (typeof current !== 'object') {
            return undefined;
        }
        current = current[key];
    }
    return current;
}
/**
 * Vérifie si un chemin existe dans un objet
 */
export function hasPath(obj, path) {
    return getByPath(obj, path) !== undefined;
}
/**
 * Extrait une valeur avec une valeur par défaut si non trouvée
 */
export function getByPathOrDefault(obj, path, defaultValue) {
    const result = getByPath(obj, path);
    return result !== undefined ? result : defaultValue;
}
