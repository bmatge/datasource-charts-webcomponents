/**
 * Favorites app - main entry point
 */

import { escapeHtml, formatDateShort, openModal, closeModal, setupModalOverlayClose, toastInfo, appHref, navigateTo } from '@gouv-widgets/shared';
import { loadFavorites, saveFavorites, deleteFavorite, findFavorite } from './favorites-manager.js';
import { getPreviewHTML } from './preview.js';

// State
let favorites = loadFavorites();
let selectedId: string | null = null;
let deleteTargetId: string | null = null;

function renderSidebar(): void {
  const listEl = document.getElementById('favorites-list');
  const countEl = document.getElementById('favorites-count');
  if (!listEl || !countEl) return;

  countEl.textContent = String(favorites.length);

  if (favorites.length === 0) {
    listEl.innerHTML = `
      <div class="empty-sidebar">
        <i class="ri-star-line"></i>
        <p>Aucun favori enregistre</p>
        <p class="fr-text--sm">Creez un graphique dans le Builder ou Playground et sauvegardez-le en favori.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = favorites.map(fav => `
    <div class="favorite-item ${selectedId === fav.id ? 'active' : ''}"
         data-id="${fav.id}"
         onclick="selectFavorite('${fav.id}')">
      <div class="favorite-item-name">${escapeHtml(fav.name)}</div>
      <div class="favorite-item-meta">
        <span class="favorite-item-type">${fav.chartType || 'chart'}</span>
        <span>${formatDateShort(fav.createdAt)}</span>
        <span>${fav.source || 'builder'}</span>
      </div>
    </div>
  `).join('');
}

function renderContent(): void {
  const contentEl = document.getElementById('favorites-content');
  if (!contentEl) return;

  if (!selectedId) {
    contentEl.innerHTML = `
      <div class="empty-content">
        <i class="ri-bar-chart-box-line"></i>
        <h2>Selectionnez un favori</h2>
        <p>Choisissez un favori dans la liste de gauche pour voir son apercu et son code.</p>
        ${favorites.length === 0 ? `
          <a href="${appHref('builder')}" class="fr-btn fr-btn--icon-left fr-icon-add-line">
            Creer un graphique
          </a>
        ` : ''}
      </div>
    `;
    return;
  }

  const fav = findFavorite(favorites, selectedId);
  if (!fav) {
    selectedId = null;
    renderContent();
    return;
  }

  contentEl.innerHTML = `
    <div class="content-header">
      <h1>
        <i class="ri-star-fill" style="color: var(--text-action-high-blue-france);" aria-hidden="true"></i>
        ${escapeHtml(fav.name)}
      </h1>
      <div class="content-actions">
        <button class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--icon-left ri-file-code-line"
                onclick="openInPlayground('${fav.id}')">
          Playground
        </button>
        <button class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--icon-left ri-tools-line"
                onclick="openInBuilder('${fav.id}')">
          Builder
        </button>
        <button class="fr-btn fr-btn--sm fr-btn--icon-left ri-file-copy-line"
                onclick="copyCode('${fav.id}')">
          Copier le code
        </button>
        <button class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
                onclick="showDeleteModal('${fav.id}')"
                title="Supprimer">
          <i class="ri-delete-bin-line" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="content-body">
      <div class="preview-section">
        <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts allow-same-origin"></iframe>
      </div>
      <div class="code-section">
        <div class="code-header">
          <span>Code HTML/JS</span>
          <span class="fr-text--sm">${fav.source || 'builder'} - ${formatDateShort(fav.createdAt)}</span>
        </div>
        <pre id="code-display">${escapeHtml(fav.code)}</pre>
      </div>
    </div>
  `;

  // Load preview in iframe
  setTimeout(() => {
    const iframe = document.getElementById('preview-frame') as HTMLIFrameElement | null;
    if (iframe) {
      iframe.srcdoc = getPreviewHTML(fav.code);
    }
  }, 50);
}

function selectFavorite(id: string): void {
  selectedId = id;
  renderSidebar();
  renderContent();
}

function openInPlayground(id: string): void {
  const fav = findFavorite(favorites, id);
  if (fav) {
    sessionStorage.setItem('playground-code', fav.code);
    navigateTo('playground', { from: 'favorites' });
  }
}

function openInBuilder(id: string): void {
  const fav = findFavorite(favorites, id);
  if (fav) {
    if (fav.builderState) {
      sessionStorage.setItem('builder-state', JSON.stringify(fav.builderState));
      navigateTo('builder', { from: 'favorites' });
    } else {
      toastInfo('Ce favori a ete cree avant la mise a jour. Il sera ouvert dans le Playground.');
      sessionStorage.setItem('playground-code', fav.code);
      navigateTo('playground', { from: 'favorites' });
    }
  }
}

function copyCode(id: string): void {
  const fav = findFavorite(favorites, id);
  if (fav) {
    navigator.clipboard.writeText(fav.code).then(() => {
      const btn = document.querySelector(`[onclick="copyCode('${id}')"]`);
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="ri-check-line" aria-hidden="true"></i> Copie !';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
      }
    });
  }
}

function showDeleteModal(id: string): void {
  const fav = findFavorite(favorites, id);
  if (fav) {
    deleteTargetId = id;
    const nameEl = document.getElementById('delete-name');
    if (nameEl) nameEl.textContent = fav.name;
    openModal('delete-modal');
  }
}

function handleCloseDeleteModal(): void {
  deleteTargetId = null;
  closeModal('delete-modal');
}

function confirmDelete(): void {
  if (deleteTargetId) {
    favorites = deleteFavorite(favorites, deleteTargetId);
    saveFavorites(favorites);

    if (selectedId === deleteTargetId) {
      selectedId = favorites.length > 0 ? favorites[0].id : null;
    }

    handleCloseDeleteModal();
    renderSidebar();
    renderContent();
  }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  if (favorites.length > 0) {
    selectedId = favorites[0].id;
  }

  renderSidebar();
  renderContent();

  const deleteBtn = document.getElementById('confirm-delete-btn');
  if (deleteBtn) deleteBtn.addEventListener('click', confirmDelete);

  setupModalOverlayClose('delete-modal');
});

// Expose functions globally for onclick handlers in HTML
declare global {
  interface Window {
    selectFavorite: typeof selectFavorite;
    openInPlayground: typeof openInPlayground;
    openInBuilder: typeof openInBuilder;
    copyCode: typeof copyCode;
    showDeleteModal: typeof showDeleteModal;
    closeDeleteModal: typeof handleCloseDeleteModal;
  }
}

window.selectFavorite = selectFavorite;
window.openInPlayground = openInPlayground;
window.openInBuilder = openInBuilder;
window.copyCode = copyCode;
window.showDeleteModal = showDeleteModal;
window.closeDeleteModal = handleCloseDeleteModal;
