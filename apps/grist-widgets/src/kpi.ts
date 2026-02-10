/**
 * Widget Grist : KPI DSFR
 *
 * Affiche un indicateur cle de performance a partir des donnees Grist.
 * L'utilisateur mappe une colonne Value et configure l'agregation,
 * le format et les seuils via le panneau d'options.
 *
 * Les composants gouv-* sont charges via script tag UMD (GouvWidgets global).
 */

import './styles/grist-widgets.css';
import { initGristBridge, onGristOptions } from './shared/grist-bridge.js';
import { createOptionsPanel, type OptionDef } from './shared/grist-options-panel.js';

const KPI_OPTIONS: OptionDef[] = [
  {
    key: 'aggregation',
    label: 'Agregation',
    type: 'select',
    defaultValue: 'avg',
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
    options: [
      { value: 'nombre', label: 'Nombre' },
      { value: 'pourcentage', label: 'Pourcentage' },
      { value: 'euro', label: 'Euro' },
      { value: 'decimal', label: 'Decimal' },
    ],
  },
  {
    key: 'label',
    label: 'Libelle',
    type: 'text',
    defaultValue: 'Indicateur',
    hint: 'Texte affiche sous la valeur',
  },
  {
    key: 'icone',
    label: 'Icone',
    type: 'text',
    defaultValue: '',
    hint: 'Classe Remix Icon (ex: ri-line-chart-line)',
  },
  {
    key: 'couleur',
    label: 'Couleur',
    type: 'select',
    defaultValue: '',
    options: [
      { value: '', label: 'Automatique (seuils)' },
      { value: 'bleu', label: 'Bleu' },
      { value: 'vert', label: 'Vert' },
      { value: 'orange', label: 'Orange' },
      { value: 'rouge', label: 'Rouge' },
    ],
  },
];

let currentOptions: Record<string, unknown> = {};

function applyOptions(opts: Record<string, unknown>) {
  currentOptions = { ...currentOptions, ...opts };
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

  const empty = document.getElementById('empty-state');
  const container = document.getElementById('kpi-container');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
}

function showOptionsPanel() {
  const panel = document.getElementById('options-panel');
  const content = document.getElementById('kpi-container');
  if (!panel || !content) return;

  panel.classList.add('visible');
  content.style.display = 'none';

  createOptionsPanel(panel, KPI_OPTIONS, currentOptions);
}

// Initialisation
initGristBridge(
  [
    { name: 'Value', title: 'Valeur numerique a agreger', type: 'Numeric' },
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
  const container = document.getElementById('kpi-container');
  const panel = document.getElementById('options-panel');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
  if (panel) panel.classList.remove('visible');
});
