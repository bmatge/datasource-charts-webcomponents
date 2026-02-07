/**
 * Centralized inter-app navigation helpers.
 * Maps app identifiers to their root-level HTML file paths.
 */

type AppId = 'builder' | 'builder-ia' | 'playground' | 'sources' | 'favorites';

const APP_FILES: Record<AppId, string> = {
  'builder': 'builder.html',
  'builder-ia': 'builderIA.html',
  'playground': 'playground.html',
  'sources': 'sources.html',
  'favorites': 'favoris.html',
};

/**
 * Compute relative prefix from current page to root.
 * E.g. from /apps/builder/index.html → "../../"
 * E.g. from /builder.html → "./"
 */
function getRootPrefix(): string {
  const path = window.location.pathname;

  // If we're inside /apps/{name}/, we need ../../
  const appsMatch = path.match(/\/apps\/[^/]+\//);
  if (appsMatch) {
    return '../../';
  }

  return './';
}

/**
 * Build an href to another app.
 */
export function appHref(app: AppId, params?: Record<string, string>): string {
  const file = APP_FILES[app];
  if (!file) return '#';

  const prefix = getRootPrefix();
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return `${prefix}${file}${qs}`;
}

/**
 * Navigate to another app (JS redirect).
 */
export function navigateTo(app: AppId, params?: Record<string, string>): void {
  window.location.href = appHref(app, params);
}
