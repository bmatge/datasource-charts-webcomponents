/**
 * Widget Grist : Carte departementale/regionale DSFR
 *
 * Affiche une carte choroplethe de France a partir des donnees Grist.
 * L'utilisateur mappe ses colonnes (Code departement/region, Valeur)
 * et configure le type de carte via le panneau d'options.
 *
 * Les composants gouv-* sont charges via script tag UMD (GouvWidgets global).
 */

import './styles/grist-widgets.css';
import { initGristBridge, onGristOptions } from './shared/grist-bridge.js';
import { createOptionsPanel, type OptionDef } from './shared/grist-options-panel.js';

const MAP_OPTIONS: OptionDef[] = [
  {
    key: 'mapType',
    label: 'Type de carte',
    type: 'select',
    defaultValue: 'map',
    options: [
      { value: 'map', label: 'Departements' },
      { value: 'map-reg', label: 'Regions' },
    ],
  },
  {
    key: 'palette',
    label: 'Palette de couleurs',
    type: 'select',
    defaultValue: 'sequentialAscending',
    options: [
      { value: 'sequentialAscending', label: 'Sequentielle asc.' },
      { value: 'sequentialDescending', label: 'Sequentielle desc.' },
      { value: 'divergentAscending', label: 'Divergente asc.' },
      { value: 'divergentDescending', label: 'Divergente desc.' },
    ],
  },
  {
    key: 'unitTooltip',
    label: 'Unite (tooltip)',
    type: 'text',
    defaultValue: '',
    hint: 'Ex: habitants, EUR/m2',
  },
];

let currentOptions: Record<string, unknown> = {};

function applyOptions(opts: Record<string, unknown>) {
  currentOptions = { ...currentOptions, ...opts };
  const chart = document.querySelector('gouv-dsfr-chart');
  if (!chart) return;

  if (opts.mapType) chart.setAttribute('type', String(opts.mapType));
  if (opts.palette) chart.setAttribute('selected-palette', String(opts.palette));
  if (opts.unitTooltip) chart.setAttribute('unit-tooltip', String(opts.unitTooltip));

  const empty = document.getElementById('empty-state');
  const container = document.getElementById('map-container');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
}

function showOptionsPanel() {
  const panel = document.getElementById('options-panel');
  const content = document.getElementById('map-container');
  if (!panel || !content) return;

  panel.classList.add('visible');
  content.style.display = 'none';

  createOptionsPanel(panel, MAP_OPTIONS, currentOptions, () => {
    // Fermer le panneau apres sauvegarde
    panel.classList.remove('visible');
    content.style.display = 'block';
  });
}

// Initialisation : 3 colonnes attendues
initGristBridge(
  [
    { name: 'Code', title: 'Code departement ou region (INSEE)', type: 'Text' },
    { name: 'Label', title: 'Nom (optionnel, pour tooltip)', type: 'Text', optional: true },
    { name: 'Value', title: 'Valeur numerique', type: 'Numeric' },
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
  const container = document.getElementById('map-container');
  const panel = document.getElementById('options-panel');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
  if (panel) panel.classList.remove('visible');
});
