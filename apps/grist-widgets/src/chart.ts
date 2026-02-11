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

function showOptionsPanel() {
  const panel = document.getElementById('options-panel');
  const content = document.getElementById('widget-container');
  if (!panel || !content) return;

  panel.classList.add('visible');
  content.style.display = 'none';

  createOptionsPanel(panel, ALL_OPTIONS, currentOptions, () => {
    // Fermer le panneau apres sauvegarde
    panel.classList.remove('visible');
    content.style.display = 'block';
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
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
  if (panel) panel.classList.remove('visible');
});
