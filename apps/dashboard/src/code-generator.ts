/**
 * Dashboard app - Code generation
 */

import { escapeHtml } from '@gouv-widgets/shared';
import { state } from './state.js';
import type { Widget } from './state.js';

export function updateGeneratedCode(): void {
  const code = generateHTMLCode();
  const codeEl = document.getElementById('generated-code');
  const jsonEl = document.getElementById('generated-json');
  if (codeEl) codeEl.textContent = code;
  if (jsonEl) jsonEl.textContent = JSON.stringify(state.dashboard, null, 2);
}

export function generateHTMLCode(): string {
  const { dashboard } = state;
  const columns = dashboard.layout.columns || 2;
  const colSize = Math.floor(12 / columns);
  const colClass = colSize === 12 ? 'fr-col-12' : `fr-col-12 fr-col-md-${colSize}`;

  const widgetsByRow: Record<number, Widget[]> = {};
  dashboard.widgets.forEach(w => {
    if (!widgetsByRow[w.position.row]) {
      widgetsByRow[w.position.row] = [];
    }
    widgetsByRow[w.position.row].push(w);
  });

  let widgetsHTML = '';
  Object.keys(widgetsByRow).sort((a, b) => Number(a) - Number(b)).forEach(rowIdx => {
    const widgets = widgetsByRow[Number(rowIdx)];
    widgetsHTML += `    <div class="fr-grid-row ${dashboard.layout.gap}">\n`;

    widgets.forEach(widget => {
      widgetsHTML += `      <div class="${colClass}">\n`;
      widgetsHTML += generateWidgetHTML(widget);
      widgetsHTML += `      </div>\n`;
    });

    widgetsHTML += `    </div>\n`;
  });

  return `<!DOCTYPE html>
<html lang="fr" data-fr-theme>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(dashboard.name)} - gouv-widgets</title>

  <!-- DSFR -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/utility/utility.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css">

  <!-- DSFR Chart -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.css">
  <script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr-chart@2.0.4/dist/DSFRChart/DSFRChart.js"><\/script>

  <!-- gouv-widgets -->
  <script type="module" src="https://cdn.jsdelivr.net/gh/AubertMusic/datasource-charts-webcomponents@v0.2.0/dist/gouv-widgets.esm.js"><\/script>
</head>
<body>
  <div class="fr-container fr-my-4w">
    <h1>${escapeHtml(dashboard.name)}</h1>

${widgetsHTML}
  </div>

  <script type="module" src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.11.2/dist/dsfr.module.min.js"><\/script>
</body>
</html>`;
}

export function generateWidgetHTML(widget: Widget): string {
  const indent = '        ';

  switch (widget.type) {
    case 'kpi': {
      const iconeAttr = widget.config.icone ? ` icone="${widget.config.icone}"` : '';
      return `${indent}<gouv-kpi
${indent}  valeur="${escapeHtml(widget.config.valeur || '')}"
${indent}  label="${escapeHtml(widget.config.label || widget.title)}"
${indent}  format="${widget.config.format || 'nombre'}"${iconeAttr}>
${indent}</gouv-kpi>\n`;
    }

    case 'chart':
      if (widget.config.fromFavorite && widget.config.code) {
        return `${indent}<!-- Graphique: ${escapeHtml(widget.title)} -->\n${indent}${widget.config.code.split('\n').join('\n' + indent)}\n`;
      }
      return `${indent}<gouv-dsfr-chart
${indent}  type="${widget.config.chartType || 'bar'}"
${indent}  label-field="${escapeHtml(widget.config.labelField || '')}"
${indent}  value-field="${escapeHtml(widget.config.valueField || '')}"
${indent}  selected-palette="${widget.config.palette || 'categorical'}">
${indent}</gouv-dsfr-chart>\n`;

    case 'table': {
      const cols = widget.config.columns?.length ? ` columns='${JSON.stringify(widget.config.columns)}'` : '';
      const searchable = widget.config.searchable ? ' searchable' : '';
      const sortable = widget.config.sortable ? ' sortable' : '';
      return `${indent}<gouv-datalist${cols}${searchable}${sortable}>
${indent}</gouv-datalist>\n`;
    }

    case 'text':
      if (widget.config.style === 'callout') {
        return `${indent}<div class="fr-callout">
${indent}  <p class="fr-callout__text">${widget.config.content}</p>
${indent}</div>\n`;
      } else if (widget.config.style === 'title') {
        return `${indent}<h2>${widget.config.content}</h2>\n`;
      }
      return `${indent}<p>${widget.config.content}</p>\n`;

    default:
      return `${indent}<!-- Widget: ${escapeHtml(widget.title)} -->\n`;
  }
}
