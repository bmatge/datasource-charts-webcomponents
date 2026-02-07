/**
 * Proxy URL helpers for Grist, Albert, and other external APIs
 */

import { getProxyConfig } from './proxy-config.js';

const EXTERNAL_PROXY = 'https://chartsbuilder.matge.com';

/**
 * Get proxied URL for a Grist API endpoint
 * Handles both docs.getgrist.com and grist.numerique.gouv.fr
 */
export function getProxyUrl(gristUrl: string, endpoint: string): string {
  const config = getProxyConfig();
  const url = new URL(gristUrl);

  if (url.hostname === 'docs.getgrist.com') {
    return `${config.baseUrl}${config.endpoints.grist}/api${endpoint}`;
  }

  if (url.hostname === 'grist.numerique.gouv.fr') {
    return `${config.baseUrl}${config.endpoints.gristGouv}/api${endpoint}`;
  }

  // Self-hosted instances with CORS configured
  return `${gristUrl}/api${endpoint}`;
}

/**
 * Get proxied URL for any external API URL
 * Handles known APIs (tabular, data.gouv.fr) and falls through for unknown ones
 */
export function getProxiedUrl(url: string): string {
  const isLocalDev = typeof window !== 'undefined'
    && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (!isLocalDev) return url;

  // Proxy for tabular-api.data.gouv.fr
  if (url.includes('tabular-api.data.gouv.fr')) {
    return url.replace('https://tabular-api.data.gouv.fr', '/tabular-proxy');
  }

  return url;
}

/**
 * Get the external proxy base URL
 */
export function getExternalProxyUrl(): string {
  return EXTERNAL_PROXY;
}
