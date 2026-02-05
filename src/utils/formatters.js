/**
 * Formatters - Fonctions de formatage pour l'affichage des données
 */
/**
 * Formate un nombre selon le type spécifié
 */
export function formatValue(value, format = 'nombre') {
    if (value === null || value === undefined || value === '') {
        return '—';
    }
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) {
        return '—';
    }
    switch (format) {
        case 'nombre':
            return formatNumber(num);
        case 'pourcentage':
            return formatPercentage(num);
        case 'euro':
            return formatCurrency(num);
        case 'decimal':
            return formatDecimal(num);
        default:
            return formatNumber(num);
    }
}
/**
 * Formate un nombre avec séparateurs de milliers (format français)
 */
export function formatNumber(value) {
    return new Intl.NumberFormat('fr-FR', {
        maximumFractionDigits: 0
    }).format(Math.round(value));
}
/**
 * Formate un pourcentage
 */
export function formatPercentage(value) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
    }).format(value / 100);
}
/**
 * Formate une valeur monétaire en euros
 */
export function formatCurrency(value) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}
/**
 * Formate un nombre décimal
 */
export function formatDecimal(value) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2
    }).format(value);
}
/**
 * Formate une date en format français
 */
export function formatDate(value) {
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) {
        return '—';
    }
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}
/**
 * Détermine la couleur selon les seuils
 */
export function getColorBySeuil(value, seuilVert, seuilOrange) {
    if (seuilVert !== undefined && value >= seuilVert) {
        return 'vert';
    }
    if (seuilOrange !== undefined && value >= seuilOrange) {
        return 'orange';
    }
    if (seuilVert !== undefined || seuilOrange !== undefined) {
        return 'rouge';
    }
    return 'bleu';
}
/**
 * Retourne la classe CSS DSFR correspondant à une couleur
 */
export function getDsfrColorClass(color) {
    const colorMap = {
        vert: 'fr-badge--success',
        orange: 'fr-badge--warning',
        rouge: 'fr-badge--error',
        bleu: 'fr-badge--info'
    };
    return colorMap[color] || colorMap.bleu;
}
/**
 * Retourne la couleur CSS DSFR pour les KPI
 */
export function getDsfrKpiColor(color) {
    const colorMap = {
        vert: 'var(--background-contrast-success)',
        orange: 'var(--background-contrast-warning)',
        rouge: 'var(--background-contrast-error)',
        bleu: 'var(--background-contrast-info)'
    };
    return colorMap[color] || colorMap.bleu;
}
