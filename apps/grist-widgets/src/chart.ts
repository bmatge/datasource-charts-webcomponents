/**
 * Widget Grist : Graphique DSFR
 *
 * Supporte les types : bar, line, pie, radar, scatter, gauge, bar-line.
 * L'utilisateur mappe ses colonnes Grist (Label, Value) et configure
 * le type/palette via le panneau d'options.
 *
 * Les composants gouv-* sont charges via script tag UMD (GouvWidgets global).
 */

import './styles/grist-widgets.css';
import { initGristBridge, onGristOptions } from './shared/grist-bridge.js';
import { createOptionsPanel, type OptionDef } from './shared/grist-options-panel.js';

const CHART_OPTIONS: OptionDef[] = [
  {
    key: 'type',
    label: 'Type de graphique',
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
  },
  {
    key: 'stacked',
    label: 'Barres empilees',
    type: 'checkbox',
    defaultValue: false,
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

function applyOptions(opts: Record<string, unknown>) {
  currentOptions = { ...currentOptions, ...opts };
  const chart = document.querySelector('gouv-dsfr-chart');
  if (!chart) return;

  if (opts.type) chart.setAttribute('type', String(opts.type));
  if (opts.palette) chart.setAttribute('selected-palette', String(opts.palette));
  chart.setAttribute('horizontal', opts.horizontal === true ? '' : 'false');
  chart.setAttribute('stacked', opts.stacked === true ? '' : 'false');
  if (opts.unitTooltip) chart.setAttribute('unit-tooltip', String(opts.unitTooltip));

  const empty = document.getElementById('empty-state');
  const container = document.getElementById('chart-container');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
}

function showOptionsPanel() {
  const panel = document.getElementById('options-panel');
  const content = document.getElementById('chart-container');
  if (!panel || !content) return;

  panel.classList.add('visible');
  content.style.display = 'none';

  createOptionsPanel(panel, CHART_OPTIONS, currentOptions, () => {
    // Fermer le panneau apres sauvegarde
    panel.classList.remove('visible');
    content.style.display = 'block';
  });
}

// Initialisation
initGristBridge(
  [
    { name: 'Label', title: 'Etiquettes (axe X / categories)' },
    { name: 'Value', title: 'Valeurs (axe Y)', type: 'Numeric' },
    { name: 'Value2', title: 'Serie 2 (optionnel)', type: 'Numeric', optional: true },
  ],
  {
    onEditOptions: showOptionsPanel,
  }
);

onGristOptions((opts) => {
  applyOptions(opts);
});

document.addEventListener('gouv-data-loaded', () => {
  const empty = document.getElementById('empty-state');
  const container = document.getElementById('chart-container');
  const panel = document.getElementById('options-panel');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
  if (panel) panel.classList.remove('visible');
});
