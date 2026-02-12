/**
 * Widget Grist : Graphique / Carte / KPI DSFR (multi-types)
 *
 * Widget unique supportant :
 * - Graphiques : bar, line, pie, radar, scatter, gauge, bar-line
 * - Cartes : map (departements), map-reg (regions)
 * - KPI : indicateur cle de performance
 *
 * L'utilisateur choisit le type dans les options et mappe les colonnes necessaires.
 * Les composants gouv-* sont charges via script tag UMD (GouvWidgets global).
 */

import './styles/grist-widgets.css';
import { initGristBridge, onGristOptions } from './shared/grist-bridge.js';
import { createOptionsPanel, type OptionDef } from './shared/grist-options-panel.js';

const ALL_OPTIONS: OptionDef[] = [
  {
    key: 'type',
    label: 'Type de visualisation',
    type: 'select',
    defaultValue: 'bar',
    options: [
      { value: 'bar', label: 'Barres verticales' },
      { value: 'line', label: 'Lignes' },
      { value: 'pie', label: 'Camembert' },
      { value: 'radar', label: 'Radar' },
      { value: 'scatter', label: 'Nuage de points' },
      { value: 'gauge', label: 'Jauge' },
      { value: 'bar-line', label: 'Barres + Lignes' },
      { value: 'map', label: 'Carte departements' },
      { value: 'map-reg', label: 'Carte regions' },
      { value: 'kpi', label: 'KPI' },
    ],
  },
  {
    key: 'palette',
    label: 'Palette de couleurs',
    type: 'select',
    defaultValue: 'default',
    options: [
      { value: 'default', label: 'Bleu France' },
      { value: 'categorical', label: 'Categorielle' },
      { value: 'sequentialAscending', label: 'Sequentielle asc.' },
      { value: 'sequentialDescending', label: 'Sequentielle desc.' },
      { value: 'divergentAscending', label: 'Divergente asc.' },
      { value: 'divergentDescending', label: 'Divergente desc.' },
      { value: 'neutral', label: 'Neutre' },
    ],
  },
  {
    key: 'horizontal',
    label: 'Barres horizontales',
    type: 'checkbox',
    defaultValue: false,
    hint: 'Pour types bar/line uniquement',
  },
  {
    key: 'stacked',
    label: 'Barres empilees',
    type: 'checkbox',
    defaultValue: false,
    hint: 'Pour types bar/line uniquement',
  },
  {
    key: 'aggregation',
    label: 'Agregation',
    type: 'select',
    defaultValue: 'avg',
    hint: 'Pour type KPI uniquement',
    options: [
      { value: 'avg', label: 'Moyenne' },
      { value: 'sum', label: 'Somme' },
      { value: 'count', label: 'Comptage' },
      { value: 'min', label: 'Minimum' },
      { value: 'max', label: 'Maximum' },
    ],
  },
  {
    key: 'format',
    label: 'Format',
    type: 'select',
    defaultValue: 'nombre',
    hint: 'Pour type KPI uniquement',
    options: [
      { value: 'nombre', label: 'Nombre' },
      { value: 'pourcentage', label: 'Pourcentage' },
      { value: 'euro', label: 'Euro' },
      { value: 'decimal', label: 'Decimal' },
    ],
  },
  {
    key: 'label',
    label: 'Libelle KPI',
    type: 'text',
    defaultValue: 'Indicateur',
    hint: 'Texte affiche sous la valeur (KPI uniquement)',
  },
  {
    key: 'icone',
    label: 'Icone KPI',
    type: 'text',
    defaultValue: '',
    hint: 'Classe Remix Icon, ex: ri-line-chart-line (KPI uniquement)',
  },
  {
    key: 'couleur',
    label: 'Couleur KPI',
    type: 'select',
    defaultValue: '',
    hint: 'Pour type KPI uniquement',
    options: [
      { value: '', label: 'Automatique (seuils)' },
      { value: 'bleu', label: 'Bleu' },
      { value: 'vert', label: 'Vert' },
      { value: 'orange', label: 'Orange' },
      { value: 'rouge', label: 'Rouge' },
    ],
  },
  {
    key: 'unitTooltip',
    label: 'Unite (tooltip)',
    type: 'text',
    defaultValue: '',
    hint: 'Ex: EUR, %, habitants',
  },
];

let currentOptions: Record<string, unknown> = {};
let currentType: string = 'bar';

function renderWidget(type: string) {
  const container = document.getElementById('widget-container');
  if (!container) return;

  container.innerHTML = '';

  if (type === 'kpi') {
    const kpi = document.createElement('gouv-kpi');
    kpi.setAttribute('source', 'grist');
    kpi.setAttribute('valeur', 'avg:Value');
    kpi.setAttribute('label', 'Indicateur');
    kpi.setAttribute('format', 'nombre');
    container.appendChild(kpi);
  } else {
    const chart = document.createElement('gouv-dsfr-chart');
    chart.setAttribute('source', 'grist');
    chart.setAttribute('type', type);
    chart.setAttribute('label-field', 'Label');
    chart.setAttribute('value-field', 'Value');
    if (type === 'map' || type === 'map-reg') {
      chart.setAttribute('code-field', 'Code');
    }
    container.appendChild(chart);
  }
}

function applyOptions(opts: Record<string, unknown>) {
  currentOptions = { ...currentOptions, ...opts };
  const type = (opts.type || 'bar') as string;

  // Re-render si le type change
  if (type !== currentType) {
    currentType = type;
    renderWidget(type);
  }

  const empty = document.getElementById('empty-state');
  const container = document.getElementById('widget-container');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';

  // Appliquer les options selon le type
  if (type === 'kpi') {
    const kpi = document.querySelector('gouv-kpi');
    if (!kpi) return;

    const agg = (opts.aggregation || 'avg') as string;
    kpi.setAttribute('valeur', `${agg}:Value`);

    if (opts.format) kpi.setAttribute('format', String(opts.format));
    if (opts.label) kpi.setAttribute('label', String(opts.label));
    if (opts.icone) kpi.setAttribute('icone', String(opts.icone));
    if (opts.couleur) {
      kpi.setAttribute('couleur', String(opts.couleur));
    } else {
      kpi.removeAttribute('couleur');
    }
  } else {
    const chart = document.querySelector('gouv-dsfr-chart');
    if (!chart) return;

    chart.setAttribute('type', type);
    if (opts.palette) chart.setAttribute('selected-palette', String(opts.palette));
    if (opts.horizontal !== undefined) {
      chart.setAttribute('horizontal', opts.horizontal === true ? '' : 'false');
    }
    if (opts.stacked !== undefined) {
      chart.setAttribute('stacked', opts.stacked === true ? '' : 'false');
    }
    if (opts.unitTooltip) chart.setAttribute('unit-tooltip', String(opts.unitTooltip));
  }
}

// --- Export HTML ---

function generateExportHtml(): string {
  const data = GouvWidgets.getDataCache('grist') as Record<string, unknown>[] | undefined;
  if (!data || data.length === 0) return '';

  const type = currentType;
  const opts = currentOptions;
  const jsonData = JSON.stringify(data);

  if (type === 'kpi') {
    const agg = (opts.aggregation || 'avg') as string;
    const format = (opts.format || 'nombre') as string;
    const label = (opts.label || 'Indicateur') as string;
    const icone = opts.icone ? ` icone="${opts.icone}"` : '';
    const couleur = opts.couleur ? ` couleur="${opts.couleur}"` : '';

    return `<!DOCTYPE html>
<html lang="fr" data-fr-theme>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Export KPI - gouv-widgets</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css">
<script src="https://cdn.jsdelivr.net/gh/bmatge/gouv-widgets@main/dist/gouv-widgets.umd.js"><\/script>
</head>
<body>
<gouv-kpi source="export" valeur="${agg}:Value" format="${format}" label="${label}"${icone}${couleur}></gouv-kpi>
<script>
  customElements.whenDefined('gouv-kpi').then(function() {
    GouvWidgets.dispatchDataLoaded('export', ${jsonData});
  });
<\/script>
</body>
</html>`;
  }

  // Chart types: bar, line, pie, radar, scatter, gauge, bar-line, map, map-reg
  const palette = opts.palette ? ` selected-palette="${opts.palette}"` : '';
  const horizontal = opts.horizontal === true ? ' horizontal' : '';
  const stacked = opts.stacked === true ? ' stacked' : '';
  const unitTooltip = opts.unitTooltip ? ` unit-tooltip="${opts.unitTooltip}"` : '';
  const codeField = (type === 'map' || type === 'map-reg') ? ' code-field="Code"' : '';
  const hasValue2 = data.length > 0 && 'Value2' in data[0];
  const valueField2 = hasValue2 ? ' value-field-2="Value2"' : '';

  return `<!DOCTYPE html>
<html lang="fr" data-fr-theme>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Export graphique - gouv-widgets</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
<script src="https://cdn.jsdelivr.net/gh/bmatge/gouv-widgets@main/dist/gouv-widgets.umd.js"><\/script>
</head>
<body>
<gouv-dsfr-chart source="export" type="${type}" label-field="Label" value-field="Value"${codeField}${palette}${horizontal}${stacked}${unitTooltip}${valueField2}></gouv-dsfr-chart>
<script>
  customElements.whenDefined('gouv-dsfr-chart').then(function() {
    GouvWidgets.dispatchDataLoaded('export', ${jsonData});
  });
<\/script>
</body>
</html>`;
}

function downloadHtml() {
  const htmlContent = generateExportHtml();
  if (!htmlContent) return;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = currentType === 'kpi' ? 'export-kpi.html' : 'export-chart.html';
  a.click();
  URL.revokeObjectURL(url);
}

function showOptionsPanel() {
  const panel = document.getElementById('options-panel');
  const content = document.getElementById('widget-container');
  const toolbar = document.getElementById('chart-toolbar');
  if (!panel || !content) return;

  panel.classList.add('visible');
  content.style.display = 'none';
  if (toolbar) toolbar.style.display = 'none';

  createOptionsPanel(panel, ALL_OPTIONS, currentOptions, () => {
    // Fermer le panneau apres sauvegarde
    panel.classList.remove('visible');
    content.style.display = 'block';
    // Re-afficher la toolbar si des donnees sont presentes
    if (toolbar && GouvWidgets.getDataCache('grist')) toolbar.style.display = 'flex';
  });
}

// Initialisation : toutes les colonnes possibles (flexibilite maximale)
initGristBridge(
  [
    { name: 'Label', title: 'Etiquettes (graphiques) ou Nom (cartes)', optional: true },
    { name: 'Value', title: 'Valeur numerique', type: 'Numeric' },
    { name: 'Value2', title: 'Serie 2 (graphiques multi-series)', type: 'Numeric', optional: true },
    { name: 'Code', title: 'Code geo INSEE (cartes uniquement)', type: 'Text', optional: true },
  ],
  {
    onEditOptions: showOptionsPanel,
  }
);

onGristOptions((opts) => {
  applyOptions(opts);
});

// Render initial
renderWidget(currentType);

document.addEventListener('gouv-data-loaded', () => {
  const empty = document.getElementById('empty-state');
  const container = document.getElementById('widget-container');
  const panel = document.getElementById('options-panel');
  const toolbar = document.getElementById('chart-toolbar');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
  if (toolbar) toolbar.style.display = 'flex';
  if (panel) panel.classList.remove('visible');
});

// Bind export button
document.getElementById('btn-export-html')?.addEventListener('click', downloadHtml);
