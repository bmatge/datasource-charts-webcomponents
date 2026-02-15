/**
 * Playground app - main entry point
 */

import { loadFromStorage, saveToStorage, STORAGE_KEYS, toastWarning, toastSuccess, appHref, confirmDialog } from '@gouv-widgets/shared';
import { initEditor } from './editor.js';
import type { CodeMirrorEditor } from './editor.js';
import { examples } from './examples/examples-data.js';
import { getPreviewHTML } from './preview.js';

let editor: CodeMirrorEditor;

/** Standard dependency block for external use */
const DEPS_BLOCK = `<!-- Dependances (DSFR + DSFR Chart + gouv-widgets) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>
<script src="https://chartsbuilder.matge.com/dist/gouv-widgets.umd.js"><\/script>

`;

/** Regex to detect dependency lines (CDN links for dsfr, chart.js, gouv-widgets) */
const DEPS_LINE_RE = /^[ \t]*(<link[^>]*(dsfr|DSFRChart)[^>]*>|<script[^>]*(dsfr|chart\.js|DSFRChart|gouv-widgets)[^>]*><\/script>)[ \t]*\n?/gm;
const DEPS_COMMENT_RE = /^[ \t]*<!--\s*Dependances[^>]*-->\s*\n?/gm;

function hasDeps(code: string): boolean {
  return DEPS_LINE_RE.test(code) || /gouv-widgets\.(umd|esm)\.js/.test(code);
}

function addDeps(code: string): string {
  return DEPS_BLOCK + code;
}

function removeDeps(code: string): string {
  let result = code;
  // Reset regex lastIndex (they have /g flag)
  DEPS_LINE_RE.lastIndex = 0;
  DEPS_COMMENT_RE.lastIndex = 0;
  result = result.replace(DEPS_LINE_RE, '');
  result = result.replace(DEPS_COMMENT_RE, '');
  // Clean up leading blank lines
  result = result.replace(/^\n+/, '');
  return result;
}

function updateDepsButton(hasDepsState: boolean): void {
  const btn = document.getElementById('deps-btn');
  if (!btn) return;
  if (hasDepsState) {
    btn.innerHTML = '<i class="ri-code-s-slash-line" aria-hidden="true"></i> - Deps';
    btn.title = 'Retirer les dependances CDN';
  } else {
    btn.innerHTML = '<i class="ri-code-s-slash-line" aria-hidden="true"></i> + Deps';
    btn.title = 'Ajouter les dependances CDN pour usage externe';
  }
}

function toggleDeps(): void {
  const code = editor.getValue();
  DEPS_LINE_RE.lastIndex = 0;
  if (hasDeps(code)) {
    editor.setValue(removeDeps(code));
    updateDepsButton(false);
  } else {
    editor.setValue(addDeps(code));
    updateDepsButton(true);
  }
  runCode();
}

function runCode(): void {
  const code = editor.getValue();
  const iframe = document.getElementById('preview-frame') as HTMLIFrameElement | null;
  if (iframe) {
    iframe.srcdoc = getPreviewHTML(code);
  }
}

async function loadExample(name: string, skipConfirm = false): Promise<void> {
  if (examples[name]) {
    if (!skipConfirm && editor.getValue().trim() && !await confirmDialog('Remplacer le code actuel par cet exemple ?')) return;
    editor.setValue(examples[name]);
    DEPS_LINE_RE.lastIndex = 0;
    updateDepsButton(hasDeps(examples[name]));
    runCode();
  }
}

function copyCode(): void {
  const code = editor.getValue();
  if (!code || code.trim() === '') return;

  navigator.clipboard.writeText(code).then(() => {
    toastSuccess('Code copie dans le presse-papiers');
  });
}

function saveFavorite(): void {
  const code = editor.getValue();

  if (!code || code.trim() === '') {
    toastWarning('Ecrivez du code avant de le sauvegarder en favori.');
    return;
  }

  const name = prompt('Nom du favori :', 'Mon code');
  if (!name) return;

  interface FavoriteEntry {
    id: string;
    name: string;
    code: string;
    chartType: string;
    source: string;
    createdAt: string;
  }

  const favorites = loadFromStorage<FavoriteEntry[]>(STORAGE_KEYS.FAVORITES, []);

  const favorite: FavoriteEntry = {
    id: 'fav-' + Date.now(),
    name,
    code,
    chartType: 'playground',
    source: 'playground',
    createdAt: new Date().toISOString()
  };

  favorites.unshift(favorite);
  saveToStorage(STORAGE_KEYS.FAVORITES, favorites);

  // Visual feedback
  const btn = document.getElementById('save-btn');
  if (btn) {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="ri-check-line" aria-hidden="true"></i> Sauvegarde !';
    btn.style.background = 'var(--background-contrast-success)';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 2000);
  }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Show back link if navigated from another app
  const fromApp = new URLSearchParams(window.location.search).get('from');
  if (fromApp) {
    const backBar = document.createElement('div');
    backBar.className = 'fr-mb-1w';
    backBar.innerHTML = `<a href="${appHref(fromApp as any)}" class="fr-link fr-icon-arrow-left-line fr-link--icon-left">Retour au ${fromApp === 'builder' ? 'Builder' : fromApp === 'builder-ia' ? 'Builder IA' : fromApp}</a>`;
    const main = document.querySelector('main .fr-container') || document.querySelector('main');
    if (main) main.prepend(backBar);
  }

  editor = initEditor('code-editor');

  // Load example from URL param, favorites, or default
  const exampleParam = new URLSearchParams(window.location.search).get('example');
  if (exampleParam && examples[exampleParam]) {
    // Select the matching option in the dropdown
    const select = document.getElementById('example-select') as HTMLSelectElement;
    if (select) select.value = exampleParam;
    loadExample(exampleParam, true);
  } else {
    loadExample('direct-bar', true);
  }

  // Event listeners
  document.getElementById('run-btn')?.addEventListener('click', runCode);
  document.getElementById('reset-btn')?.addEventListener('click', () => {
    const select = document.getElementById('example-select') as HTMLSelectElement;
    loadExample(select.value);
  });
  document.getElementById('example-select')?.addEventListener('change', (e) => {
    loadExample((e.target as HTMLSelectElement).value);
  });

  // Ctrl+Enter shortcut
  editor.on('keydown', (_cm: CodeMirrorEditor, event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      runCode();
    }
  });

  // Ctrl+S shortcut - save to favorites
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      const saveBtn = document.getElementById('save-btn');
      if (saveBtn) saveBtn.click();
    }
  });

  // Dependencies toggle
  document.getElementById('deps-btn')?.addEventListener('click', toggleDeps);

  // Copy code button
  document.getElementById('copy-btn')?.addEventListener('click', copyCode);

  // Save to favorites button
  document.getElementById('save-btn')?.addEventListener('click', saveFavorite);

  // Load code from sessionStorage if coming from another app
  const urlParams = new URLSearchParams(window.location.search);
  const from = urlParams.get('from');
  if (from === 'favorites' || from === 'builder' || from === 'builder-ia') {
    const savedCode = sessionStorage.getItem('playground-code');
    if (savedCode) {
      editor.setValue(savedCode);
      DEPS_LINE_RE.lastIndex = 0;
      updateDepsButton(hasDeps(savedCode));
      runCode();
      sessionStorage.removeItem('playground-code');
    }
  }
});
