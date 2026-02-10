/**
 * Widget Grist : Tableau DSFR
 *
 * Affiche les donnees Grist dans un tableau DSFR filtreable,
 * triable avec export CSV. Toutes les colonnes de la table sont
 * affichees automatiquement.
 *
 * Les composants gouv-* sont charges via script tag UMD (GouvWidgets global).
 */

import './styles/grist-widgets.css';
import { onGristOptions } from './shared/grist-bridge.js';
import { createOptionsPanel, type OptionDef } from './shared/grist-options-panel.js';

const GRIST_SOURCE_ID = 'grist';

const DATALIST_OPTIONS: OptionDef[] = [
  {
    key: 'pagination',
    label: 'Lignes par page',
    type: 'select',
    defaultValue: '20',
    options: [
      { value: '10', label: '10' },
      { value: '20', label: '20' },
      { value: '50', label: '50' },
      { value: '0', label: 'Tout afficher' },
    ],
  },
  {
    key: 'recherche',
    label: 'Barre de recherche',
    type: 'checkbox',
    defaultValue: true,
  },
  {
    key: 'export',
    label: 'Export CSV',
    type: 'checkbox',
    defaultValue: true,
  },
];

let currentOptions: Record<string, unknown> = {};
let columnsDetermined = false;

function applyOptions(opts: Record<string, unknown>) {
  currentOptions = { ...currentOptions, ...opts };
  const datalist = document.querySelector('gouv-datalist');
  if (!datalist) return;

  if (opts.pagination !== undefined) datalist.setAttribute('pagination', String(opts.pagination));

  if (opts.recherche === true) {
    datalist.setAttribute('recherche', '');
  } else if (opts.recherche === false) {
    datalist.removeAttribute('recherche');
  }

  if (opts.export === true) {
    datalist.setAttribute('export', 'csv');
  } else if (opts.export === false) {
    datalist.removeAttribute('export');
  }

  const empty = document.getElementById('empty-state');
  const container = document.getElementById('datalist-container');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
}

function showOptionsPanel() {
  const panel = document.getElementById('options-panel');
  const content = document.getElementById('datalist-container');
  if (!panel || !content) return;

  panel.classList.add('visible');
  content.style.display = 'none';

  createOptionsPanel(panel, DATALIST_OPTIONS, currentOptions, () => {
    // Fermer le panneau apres sauvegarde
    panel.classList.remove('visible');
    content.style.display = 'block';
  });
}

/**
 * Genere automatiquement le mapping colonnes a partir
 * des cles du premier record recu.
 */
function autoConfigureColumns(data: Record<string, unknown>[]) {
  if (columnsDetermined || data.length === 0) return;
  columnsDetermined = true;

  const first = data[0];
  const keys = Object.keys(first).filter(k => k !== 'id');
  const colonnes = keys.map(k => `${k}:${k}`).join(' | ');

  const datalist = document.querySelector('gouv-datalist');
  if (datalist) {
    datalist.setAttribute('colonnes', colonnes);
  }
}

// Initialisation : acces complet a la table (toutes les colonnes)
grist.ready({
  requiredAccess: 'read table',
  onEditOptions: showOptionsPanel,
});

GouvWidgets.dispatchDataLoading(GRIST_SOURCE_ID);

grist.onRecords((records) => {
  // Filtrer les metadonnees Grist (id, manualSort...)
  const cleaned = records.map(r => {
    const row: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(r)) {
      if (key === 'id' || key === 'manualSort') continue;
      row[key] = val;
    }
    return row;
  });

  autoConfigureColumns(cleaned);
  GouvWidgets.dispatchDataLoaded(GRIST_SOURCE_ID, cleaned);
});

onGristOptions((opts) => {
  applyOptions(opts);
});

document.addEventListener('gouv-data-loaded', () => {
  const empty = document.getElementById('empty-state');
  const container = document.getElementById('datalist-container');
  const panel = document.getElementById('options-panel');
  if (empty) empty.style.display = 'none';
  if (container) container.style.display = 'block';
  if (panel) panel.classList.remove('visible');
});
