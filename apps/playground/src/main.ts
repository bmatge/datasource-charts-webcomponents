/**
 * Playground app - main entry point
 */

import { loadFromStorage, saveToStorage, STORAGE_KEYS, toastWarning } from '@gouv-widgets/shared';
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

function loadExample(name: string): void {
  if (examples[name]) {
    editor.setValue(examples[name]);
    runCode();
  }
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
  editor = initEditor('code-editor');

  // Load first example
  loadExample('bar-chart');

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
