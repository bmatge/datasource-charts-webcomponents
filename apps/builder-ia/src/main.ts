/**
 * Builder IA - Entry point
 * Registers all event listeners and initializes the application
 */

import './styles/builder-ia.css';

import { loadSavedSources, handleSourceChange, loadSavedSourceData } from './sources.js';
import { toggleIAConfig, loadIAConfig, saveIAConfig } from './ia/ia-config.js';
import { addMessage, sendMessage } from './chat/chat.js';
import { switchTab, toggleSection, copyCode, openInPlayground, saveFavorite } from './ui/ui-helpers.js';

// Expose functions that are called from inline onclick attributes in HTML
(window as unknown as Record<string, unknown>).toggleSection = toggleSection;
(window as unknown as Record<string, unknown>).toggleIAConfig = toggleIAConfig;
(window as unknown as Record<string, unknown>).saveIAConfig = saveIAConfig;
(window as unknown as Record<string, unknown>).loadSavedSourceData = loadSavedSourceData;
(window as unknown as Record<string, unknown>).sendMessage = sendMessage;
(window as unknown as Record<string, unknown>).copyCode = copyCode;
(window as unknown as Record<string, unknown>).switchTab = switchTab;

document.addEventListener('DOMContentLoaded', () => {
  // Source selection
  const savedSourceEl = document.getElementById('saved-source');
  if (savedSourceEl) {
    savedSourceEl.addEventListener('change', handleSourceChange);
  }

  // Chat input - Enter to send
  const chatInput = document.getElementById('chat-input') as HTMLTextAreaElement | null;
  if (chatInput) {
    chatInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', () => {
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    });
  }

  // Load sources and IA config
  loadSavedSources();
  loadIAConfig();

  // Welcome message
  addMessage('assistant', 'Bonjour ! Selectionnez une source de donnees, puis decrivez le graphique souhaite.', [
    'Aide',
    'Suggestion',
  ]);

  // Listen for save-favorite and open-playground events from preview panel
  const previewPanel = document.querySelector('app-preview-panel');
  if (previewPanel) {
    previewPanel.addEventListener('save-favorite', saveFavorite);
    previewPanel.addEventListener('open-playground', openInPlayground);
  }
});
