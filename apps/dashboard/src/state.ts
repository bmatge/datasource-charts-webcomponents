/**
 * Dashboard app - State management and types
 */

export type WidgetType = 'kpi' | 'chart' | 'table' | 'text';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  position: { row: number; col: number };
  config: Record<string, any>;
}

export interface DashboardData {
  id: string | null;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  layout: { columns: number; gap: string };
  widgets: Widget[];
  sources: any[];
}

export interface AppState {
  dashboard: DashboardData;
  selectedWidget: Widget | null;
  favorites: any[];
  savedDashboards: DashboardData[];
}

export function createEmptyDashboard(): DashboardData {
  return {
    id: null,
    name: 'Mon tableau de bord',
    createdAt: null,
    updatedAt: null,
    layout: {
      columns: 2,
      gap: 'fr-grid-row--gutters'
    },
    widgets: [],
    sources: []
  };
}

export const state: AppState = {
  dashboard: createEmptyDashboard(),
  selectedWidget: null,
  favorites: [],
  savedDashboards: []
};
