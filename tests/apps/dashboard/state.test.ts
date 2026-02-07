import { describe, it, expect } from 'vitest';
import { createEmptyDashboard, state } from '../../../apps/dashboard/src/state';
import type { WidgetType, Widget, DashboardData, AppState } from '../../../apps/dashboard/src/state';

describe('dashboard/state', () => {
  describe('createEmptyDashboard', () => {
    it('should return a new dashboard with default values', () => {
      const dashboard = createEmptyDashboard();
      expect(dashboard.id).toBeNull();
      expect(dashboard.name).toBe('Mon tableau de bord');
      expect(dashboard.createdAt).toBeNull();
      expect(dashboard.updatedAt).toBeNull();
      expect(dashboard.layout).toEqual({ columns: 2, gap: 'fr-grid-row--gutters' });
      expect(dashboard.widgets).toEqual([]);
      expect(dashboard.sources).toEqual([]);
    });

    it('should return a new instance each time', () => {
      const a = createEmptyDashboard();
      const b = createEmptyDashboard();
      expect(a).not.toBe(b);
      expect(a.widgets).not.toBe(b.widgets);
    });
  });

  describe('state singleton', () => {
    it('should have a default dashboard', () => {
      expect(state.dashboard).toBeDefined();
      expect(state.dashboard.name).toBe('Mon tableau de bord');
    });

    it('should have empty collections', () => {
      expect(state.selectedWidget).toBeNull();
      expect(state.favorites).toEqual([]);
      expect(state.savedDashboards).toEqual([]);
    });
  });

  describe('types', () => {
    it('should accept valid WidgetType values', () => {
      const types: WidgetType[] = ['kpi', 'chart', 'table', 'text'];
      expect(types).toHaveLength(4);
    });

    it('should allow creating a Widget conforming to the interface', () => {
      const widget: Widget = {
        id: 'w-1',
        type: 'kpi',
        title: 'Test KPI',
        position: { row: 0, col: 0 },
        config: { valeur: '42' },
      };
      expect(widget.id).toBe('w-1');
      expect(widget.type).toBe('kpi');
    });
  });
});
