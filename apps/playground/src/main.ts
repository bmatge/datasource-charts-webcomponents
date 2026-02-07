/**
 * Playground app - main entry point
 */

import { loadFromStorage, saveToStorage, STORAGE_KEYS, toastWarning, toastSuccess, appHref } from '@gouv-widgets/shared';
import { initEditor } from './editor.js';
import type { CodeMirrorEditor } from './editor.js';
import { examples } from './examples/examples-data.js';
import { getPreviewHTML } from './preview.js';

let editor: CodeMirrorEditor;

function runCode(): void {
  const code = editor.getValue();
  const iframe = document.getElementById('preview-frame') as HTMLIFrameElement | null;
  if (iframe) {
    iframe.srcdoc = getPreviewHTML(code);
  }
}

function loadExample(name: string, skipConfirm = false): void {
  if (examples[name]) {
    if (!skipConfirm && editor.getValue().trim() && !confirm('Remplacer le code actuel par cet exemple ?')) return;
    editor.setValue(examples[name]);
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

  // Load first example (skip confirm since editor is empty)
  loadExample('bar-chart', true);

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

  // Copy code button
  document.getElementById('copy-btn')?.addEventListener('click', copyCode);

  // Save to favorites button
  document.getElementById('save-btn')?.addEventListener('click', saveFavorite);

  // Load code from favorites if coming from favorites page
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('from') === 'favorites') {
    const savedCode = sessionStorage.getItem('playground-code');
    if (savedCode) {
      editor.setValue(savedCode);
      runCode();
      sessionStorage.removeItem('playground-code');
    }
  }
});
