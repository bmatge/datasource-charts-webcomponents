/**
 * chart-data - Utilitaires partagés de traitement de données pour les graphiques
 *
 * Factorise la logique d'extraction label/value et d'agrégation
 * commune à gouv-chart et gouv-dsfr-chart.
 */
import { getByPath } from './json-path.js';
/**
 * Extrait les paires label/valeur depuis les données brutes
 */
export function extractLabelValues(data, labelField, valueField) {
    return data.map(record => ({
        label: String(getByPath(record, labelField) ?? 'N/A'),
        value: Number(getByPath(record, valueField)) || 0,
    }));
}
/**
 * Agrège les données par label
 */
export function aggregateByLabel(data, aggregation) {
    if (aggregation === 'none')
        return data;
    const groups = new Map();
    for (const item of data) {
        const existing = groups.get(item.label) || [];
        existing.push(item.value);
        groups.set(item.label, existing);
    }
    const result = [];
    for (const [label, values] of groups) {
        result.push({ label, value: computeGroupValue(values, aggregation) });
    }
    return result;
}
function computeGroupValue(values, aggregation) {
    switch (aggregation) {
        case 'sum':
            return values.reduce((a, b) => a + b, 0);
        case 'avg':
            return values.reduce((a, b) => a + b, 0) / values.length;
        case 'count':
            return values.length;
        case 'min':
            return Math.min(...values);
        case 'max':
            return Math.max(...values);
        default:
            return values[0] || 0;
    }
}
/**
 * Trie les données par valeur
 */
export function sortByValue(data, order) {
    if (order === 'none')
        return data;
    return [...data].sort((a, b) => order === 'desc' ? b.value - a.value : a.value - b.value);
}
/**
 * Pipeline complet: extract -> aggregate -> sort -> limit
 */
export function processChartData(rawData, labelField, valueField, aggregation = 'none', sortOrder = 'none', limit = 0) {
    if (!rawData || rawData.length === 0) {
        return { labels: [], values: [] };
    }
    let processed = extractLabelValues(rawData, labelField, valueField);
    processed = aggregateByLabel(processed, aggregation);
    processed = sortByValue(processed, sortOrder);
    if (limit > 0) {
        processed = processed.slice(0, limit);
    }
    return {
        labels: processed.map(p => p.label),
        values: processed.map(p => Math.round(p.value * 100) / 100),
    };
}
