/**
 * CDN dependency versions and URLs.
 * Single source of truth — all code generators import from here.
 */

export const CDN_VERSIONS = {
  dsfr: '1.11.2',
  dsfrChart: '2.0.4',
  chartJs: '4.4.1',
} as const;

export const CDN_URLS = {
  dsfrCss: `https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@${CDN_VERSIONS.dsfr}/dist/dsfr.min.css`,
  dsfrUtilityCss: `https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@${CDN_VERSIONS.dsfr}/dist/utility/utility.min.css`,
  dsfrModuleJs: `https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@${CDN_VERSIONS.dsfr}/dist/dsfr.module.min.js`,
  dsfrChartCss: `https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@${CDN_VERSIONS.dsfrChart}/dist/DSFRChart/DSFRChart.css`,
  dsfrChartJs: `https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@${CDN_VERSIONS.dsfrChart}/dist/DSFRChart/DSFRChart.js`,
  chartJs: `https://cdn.jsdelivr.net/npm/chart.js@${CDN_VERSIONS.chartJs}/dist/chart.umd.min.js`,
} as const;
