/**
 * IA configuration management (Albert API settings)
 */

import { toastSuccess } from '@gouv-widgets/shared';

/** IA config shape */
export interface IAConfig {
  apiUrl: string;
  model: string;
  token: string;
  systemPrompt: string;
}

const IA_CONFIG_KEY = 'gouv_widgets_ia_config';

/**
 * Toggle the IA config panel visibility
 */
export function toggleIAConfig(): void {
  const content = document.getElementById('ia-config-content') as HTMLElement;
  const arrow = document.getElementById('ia-config-arrow') as HTMLElement;
  content.classList.toggle('open');
  arrow.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : '';
}

/**
 * Load IA config from localStorage into the form fields
 */
export function loadIAConfig(): void {
  const raw = localStorage.getItem(IA_CONFIG_KEY);
  if (!raw) return;

  try {
    const config = JSON.parse(raw) as Partial<IAConfig>;
    if (config.apiUrl) {
      (document.getElementById('ia-api-url') as HTMLInputElement).value = config.apiUrl;
    }
    if (config.model) {
      (document.getElementById('ia-model') as HTMLSelectElement).value = config.model;
    }
    if (config.token) {
      (document.getElementById('ia-token') as HTMLInputElement).value = config.token;
    }
    if (config.systemPrompt) {
      (document.getElementById('ia-system-prompt') as HTMLTextAreaElement).value = config.systemPrompt;
    }
  } catch {
    // Ignore parse errors
  }
}

/**
 * Save IA config from form fields to localStorage
 */
export function saveIAConfig(): void {
  const config: IAConfig = {
    apiUrl: (document.getElementById('ia-api-url') as HTMLInputElement).value,
    model: (document.getElementById('ia-model') as HTMLSelectElement).value,
    token: (document.getElementById('ia-token') as HTMLInputElement).value,
    systemPrompt: (document.getElementById('ia-system-prompt') as HTMLTextAreaElement).value,
  };
  localStorage.setItem(IA_CONFIG_KEY, JSON.stringify(config));
  toastSuccess('Configuration sauvegardee !');
}

/**
 * Get current IA config from form fields (without saving)
 */
export function getIAConfig(): IAConfig {
  return {
    apiUrl: (document.getElementById('ia-api-url') as HTMLInputElement).value,
    model: (document.getElementById('ia-model') as HTMLSelectElement).value,
    token: (document.getElementById('ia-token') as HTMLInputElement).value,
    systemPrompt: (document.getElementById('ia-system-prompt') as HTMLTextAreaElement).value,
  };
}
