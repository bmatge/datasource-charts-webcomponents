/**
 * Dashboard app - Widget management
 */

import { escapeHtml, appHref } from '@gouv-widgets/shared';
import { state } from './state.js';
import { openConfigModal } from './widget-config.js';
import { updateGeneratedCode } from './code-generator.js';
import type { Widget, WidgetType } from './state.js';

export function addWidget(type: WidgetType, row: number, col: number, cell: HTMLElement): void {
  const widget: Widget = {
    id: `widget-${Date.now()}`,
    type,
    title: getDefaultTitle(type),
    position: { row, col },
    config: getDefaultConfig(type)
  };

  state.dashboard.widgets.push(widget);
  renderWidget(widget, cell);
  openConfigModal(widget);
  updateGeneratedCode();
}

export function addWidgetFromFavorite(favorite: any, row: number, col: number, cell: HTMLElement): void {
  const widget: Widget = {
    id: `widget-${Date.now()}`,
    type: 'chart',
    title: favorite.name,
    position: { row, col },
    config: {
      fromFavorite: true,
      favoriteId: favorite.id,
      code: favorite.code,
      builderState: favorite.builderState
    }
  };

  state.dashboard.widgets.push(widget);
  renderWidget(widget, cell);
  updateGeneratedCode();
}

export function getDefaultTitle(type: WidgetType): string {
  const titles: Record<WidgetType, string> = {
    kpi: 'Indicateur',
    chart: 'Graphique',
    table: 'Tableau de donnees',
    text: 'Texte'
  };
  return titles[type] || 'Widget';
}

export function getDefaultConfig(type: WidgetType): Record<string, any> {
  switch (type) {
    case 'kpi':
      return { valeur: '', format: 'nombre', icone: '', label: 'Mon KPI' };
    case 'chart':
      return { chartType: 'bar', labelField: '', valueField: '', palette: 'categorical' };
    case 'table':
      return { columns: [], searchable: true, sortable: true };
    case 'text':
      return { content: '<p>Votre texte ici...</p>', style: 'paragraph' };
    default:
      return {};
  }
}

export function renderWidget(widget: Widget, cell: HTMLElement): void {
  cell.classList.remove('empty');
  cell.innerHTML = `
    <div class="dashboard-widget" data-widget-id="${widget.id}">
      <div class="widget-header">
        <h4 class="widget-title">
          <i class="${getWidgetIcon(widget.type)}"></i>
          ${escapeHtml(widget.title)}
        </h4>
        <div class="widget-actions">
          <button class="widget-action-btn" onclick="duplicateWidget('${widget.id}')" title="Dupliquer"><i class="ri-file-copy-line"></i></button>
          ${widget.config.fromFavorite ? `<button class="widget-action-btn" onclick="openInBuilder('${widget.id}')" title="Editer dans le Builder"><i class="ri-edit-line"></i></button>` : ''}
          <button class="widget-action-btn" onclick="editWidget('${widget.id}')" title="Configurer">
            <i class="ri-settings-3-line"></i>
          </button>
          <button class="widget-action-btn" onclick="deleteWidget('${widget.id}')" title="Supprimer">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
      <div class="widget-content">
        ${renderWidgetContent(widget)}
      </div>
    </div>
  `;
}

export function getWidgetIcon(type: WidgetType): string {
  const icons: Record<WidgetType, string> = {
    kpi: 'ri-number-1',
    chart: 'ri-bar-chart-box-line',
    table: 'ri-table-line',
    text: 'ri-text'
  };
  return icons[type] || 'ri-question-line';
}

function renderWidgetContent(widget: Widget): string {
  switch (widget.type) {
    case 'kpi':
      return `
        <div style="text-align: center; padding: 1rem;">
          <div style="font-size: 2rem; font-weight: 700; color: var(--text-action-high-blue-france);">
            ${widget.config.valeur || '\u2014'}
          </div>
          <div style="font-size: 0.875rem; color: var(--text-mention-grey);">
            ${escapeHtml(widget.config.label || '')}
          </div>
        </div>
      `;
    case 'chart':
      if (widget.config.fromFavorite) {
        return `<div style="padding: 1rem; text-align: center; color: var(--text-mention-grey);">
          <i class="ri-bar-chart-box-line" style="font-size: 2rem;"></i>
          <p style="margin: 0.5rem 0 0;">Graphique depuis favoris</p>
        </div>`;
      }
      return `<div style="padding: 1rem; text-align: center; color: var(--text-mention-grey);">
        <i class="ri-bar-chart-box-line" style="font-size: 2rem;"></i>
        <p style="margin: 0.5rem 0 0;">Configurez le graphique</p>
      </div>`;
    case 'table':
      return `<div style="padding: 1rem; text-align: center; color: var(--text-mention-grey);">
        <i class="ri-table-line" style="font-size: 2rem;"></i>
        <p style="margin: 0.5rem 0 0;">Tableau de donnees</p>
      </div>`;
    case 'text':
      return `<div style="padding: 0.5rem;">${widget.config.content || ''}</div>`;
    default:
      return '<div>Widget</div>';
  }
}

export function editWidget(widgetId: string): void {
  const widget = state.dashboard.widgets.find(w => w.id === widgetId);
  if (widget) {
    openConfigModal(widget);
  }
}

export function deleteWidget(widgetId: string): void {
  if (!confirm('Supprimer ce widget ?')) return;

  const index = state.dashboard.widgets.findIndex(w => w.id === widgetId);
  if (index > -1) {
    const widget = state.dashboard.widgets[index];
    state.dashboard.widgets.splice(index, 1);

    const cell = document.querySelector(`.drop-cell[data-row="${widget.position.row}"][data-col="${widget.position.col}"]`) as HTMLElement | null;
    if (cell) {
      cell.classList.add('empty');
      cell.innerHTML = `
        <div class="drop-cell-placeholder">
          <i class="ri-add-circle-line"></i>
          <span>Glisser un widget ici</span>
        </div>
      `;
    }

    updateGeneratedCode();
  }
}

export function openInBuilder(widgetId: string): void {
  const widget = state.dashboard.widgets.find(w => w.id === widgetId);
  if (!widget?.config.builderState) return;
  sessionStorage.setItem('builder-state', JSON.stringify(widget.config.builderState));
  window.location.href = appHref('builder', { from: 'dashboard' });
}

export function duplicateWidget(widgetId: string): void {
  const widget = state.dashboard.widgets.find(w => w.id === widgetId);
  if (!widget) return;

  // Find next empty cell
  const grid = document.getElementById('dashboard-grid');
  const emptyCell = grid?.querySelector('.drop-cell.empty') as HTMLElement | null;
  if (!emptyCell) {
    return;
  }

  const newWidget: Widget = {
    id: `widget-${Date.now()}`,
    type: widget.type,
    title: widget.title + ' (copie)',
    position: {
      row: parseInt(emptyCell.dataset.row || '0'),
      col: parseInt(emptyCell.dataset.col || '0'),
    },
    config: JSON.parse(JSON.stringify(widget.config)),
  };

  state.dashboard.widgets.push(newWidget);
  renderWidget(newWidget, emptyCell);
  updateGeneratedCode();
}
