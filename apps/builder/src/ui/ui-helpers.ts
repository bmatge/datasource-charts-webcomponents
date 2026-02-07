/**
 * Small UI helper functions.
 * Handles playground navigation, favorites, tabs, clipboard, and accordion behavior.
 */

import { state, FAVORITES_KEY } from '../state.js';
import { loadFromStorage, saveToStorage } from '@gouv-widgets/shared';
import type { Favorite } from '../state.js';

/**
 * Open the current generated code in the playground.
 */
export function openInPlayground(): void {
  const codeEl = document.getElementById('generated-code');
  const code = codeEl?.textContent || '';

  if (!code || code === '// Le code sera g\u00e9n\u00e9r\u00e9 ici...' || code.startsWith('//')) {
    alert('G\u00e9n\u00e9rez d\'abord un graphique avant de l\'ouvrir dans le Playground.');
    return;
  }

  // Store the code in sessionStorage
  sessionStorage.setItem('playground-code', code);
  // Redirect to the playground
  window.location.href = 'playground.html?from=builder';
}

/**
 * Save the current chart configuration as a favorite.
 */
export function saveFavorite(): void {
  const codeEl = document.getElementById('generated-code');
  const code = codeEl?.textContent || '';

  if (!code || code === '// Le code sera g\u00e9n\u00e9r\u00e9 ici...' || code.startsWith('//')) {
    alert('G\u00e9n\u00e9rez d\'abord un graphique avant de le sauvegarder en favori.');
    return;
  }

  const name = prompt('Nom du favori :', state.title || 'Mon graphique');
  if (!name) return;

  const favorites = loadFromStorage<Favorite[]>(FAVORITES_KEY, []);

  // Save complete state (without Chart instance)
  const stateToSave = {
    chartType: state.chartType,
    labelField: state.labelField,
    valueField: state.valueField,
    valueField2: state.valueField2,
    codeField: state.codeField,
    aggregation: state.aggregation,
    sortOrder: state.sortOrder,
    limit: state.limit,
    title: state.title,
    subtitle: state.subtitle,
    palette: state.palette,
    color2: state.color2,
    fields: state.fields,
    data: state.data,
    localData: state.localData,
    savedSource: state.savedSource,
    generationMode: state.generationMode,
    refreshInterval: state.refreshInterval,
    // Advanced mode (gouv-query)
    advancedMode: state.advancedMode,
    queryFilter: state.queryFilter,
    queryGroupBy: state.queryGroupBy,
    queryAggregate: state.queryAggregate,
  };

  const favorite: Favorite = {
    id: 'fav-' + Date.now(),
    name: name,
    code: code,
    chartType: state.chartType,
    source: 'builder',
    createdAt: new Date().toISOString(),
    builderState: stateToSave,
  };

  favorites.unshift(favorite);
  saveToStorage(FAVORITES_KEY, favorites);

  // Visual feedback
  const btn = document.querySelector('.preview-panel-save-btn') as HTMLButtonElement | null;
  if (btn) {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="ri-check-line" aria-hidden="true"></i> Sauvegard\u00e9 !';
    btn.style.background = 'var(--background-contrast-success)';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 2000);
  }
}

/**
 * Switch the active tab in the preview panel.
 */
export function switchTab(tabId: string): void {
  const previewPanel = document.querySelector('app-preview-panel') as any;
  if (previewPanel && previewPanel.setActiveTab) {
    previewPanel.setActiveTab(tabId);
  }
}

/**
 * Copy generated code to clipboard with visual feedback.
 */
export function copyCode(): void {
  const codeEl = document.getElementById('generated-code');
  const code = codeEl?.textContent || '';

  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('copy-code-btn');
    if (btn) {
      btn.innerHTML = '<i class="ri-check-line"></i> Copi\u00e9 !';
      setTimeout(() => {
        btn.innerHTML = '<i class="ri-file-copy-line"></i> Copier le code';
      }, 2000);
    }
  });
}

/**
 * Toggle a collapsible section (accordion behavior: closes others when opening one).
 */
export function toggleSection(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const isCurrentlyCollapsed = section.classList.contains('collapsed');

  // If opening a section, close all others
  if (isCurrentlyCollapsed) {
    document.querySelectorAll('.config-section:not(#' + sectionId + ')').forEach(s => {
      // Don't close the generate button section (no header)
      if (s.querySelector('.config-section-header')) {
        s.classList.add('collapsed');
      }
    });
  }

  section.classList.toggle('collapsed');
}
