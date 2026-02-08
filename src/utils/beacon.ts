/**
 * Widget usage beacon - fire-and-forget tracking of widget deployments.
 * Sends a lightweight request to the proxy with component metadata.
 * Used by the monitoring dashboard to track where widgets are deployed.
 */

const BEACON_URL = 'https://chartsbuilder.matge.com/beacon';
const sent = new Set<string>();

/**
 * Send a beacon to track widget usage.
 * Deduplicated: only one beacon per component+type per page load.
 * Skipped in dev mode (localhost).
 */
export function sendWidgetBeacon(component: string, subtype?: string): void {
  const key = `${component}:${subtype || ''}`;
  if (sent.has(key)) return;
  sent.add(key);

  // Skip in dev mode and on the app itself (only track external deployments)
  if (typeof window === 'undefined') return;
  const host = window.location.hostname;
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === 'chartsbuilder.matge.com'
  ) {
    return;
  }

  const params = new URLSearchParams();
  params.set('c', component);
  if (subtype) params.set('t', subtype);

  const url = `${BEACON_URL}?${params.toString()}`;

  try {
    // Use fetch with no-cors instead of navigator.sendBeacon().
    // sendBeacon uses credentials:"include" which requires a specific
    // Access-Control-Allow-Origin (not "*"), causing NS_BINDING_ABORTED.
    // fetch with mode:"no-cors" skips CORS checks entirely.
    fetch(url, { method: 'GET', keepalive: true, mode: 'no-cors' }).catch(() => {});
  } catch {
    // Silently ignore beacon failures - never impact widget functionality
  }
}
