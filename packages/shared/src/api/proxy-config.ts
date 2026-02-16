/**
 * Proxy configuration for CORS handling of external APIs
 * Supports dev (Vite proxy), production (external proxy), and Tauri modes
 */

export interface ProxyConfig {
  baseUrl: string;
  endpoints: {
    grist: string;
    gristGouv: string;
    albert: string;
    tabular: string;
  };
}

/** Default production proxy configuration */
export const DEFAULT_PROXY_CONFIG: ProxyConfig = {
  baseUrl: 'https://chartsbuilder.matge.com',
  endpoints: {
    grist: '/grist-proxy',
    gristGouv: '/grist-gouv-proxy',
    albert: '/albert-proxy',
    tabular: '/tabular-proxy',
  }
};

/** Detect if running in Vite dev server */
export function isViteDevMode(): boolean {
  if (typeof window === 'undefined') return false;
  const { hostname, port } = window.location;
  return (hostname === 'localhost' || hostname === '127.0.0.1')
    && !!port && port !== '80' && port !== '443';
}

/** Detect if running inside Tauri desktop app */
export function isTauriMode(): boolean {
  return typeof window !== 'undefined' && '__TAURI__' in window;
}

/**
 * Get the proxy configuration based on the current environment
 * - Dev mode: relative URLs (handled by Vite proxy)
 * - Tauri mode: full URLs to the production proxy
 * - Production web: configurable via VITE_PROXY_URL or defaults to production proxy
 */
export function getProxyConfig(): ProxyConfig {
  const endpoints = { ...DEFAULT_PROXY_CONFIG.endpoints };

  // Vite dev: relative URLs, proxy handled by vite.config.ts
  if (isViteDevMode()) {
    return { baseUrl: '', endpoints };
  }

  // Tauri: always use the remote proxy
  if (isTauriMode()) {
    return { baseUrl: DEFAULT_PROXY_CONFIG.baseUrl, endpoints };
  }

  // Production web: configurable via env variable
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = import.meta as any;
  const customProxyUrl: string | undefined = meta.env?.VITE_PROXY_URL;

  return {
    baseUrl: customProxyUrl || DEFAULT_PROXY_CONFIG.baseUrl,
    endpoints
  };
}
