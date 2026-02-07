import { describe, it, expect, beforeEach, vi } from 'vitest';
import { state, createEmptyDashboard } from '../../../apps/dashboard/src/state';

// Mock @gouv-widgets/shared
vi.mock('@gouv-widgets/shared', () => ({
  escapeHtml: (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
  saveToStorage: vi.fn(),
  STORAGE_KEYS: { DASHBOARDS: 'gouv-widgets-dashboards' },
  toastWarning: vi.fn(),
  toastSuccess: vi.fn(),
  navigateTo: vi.fn(),
}));

import { saveDashboard, newDashboard, loadDashboard } from '../../../apps/dashboard/src/dashboards';
import { saveToStorage, toastWarning, toastSuccess } from '@gouv-widgets/shared';

describe('dashboard/dashboards', () => {
  beforeEach(() => {
    state.dashboard = createEmptyDashboard();
    state.savedDashboards = [];
    vi.clearAllMocks();

    // Set up minimal DOM
    document.body.innerHTML = `
      <input id="dashboard-title" value="" />
      <select id="grid-columns"><option value="2">2</option></select>
      <div id="dashboard-grid"></div>
      <div id="generated-code"></div>
      <div id="generated-json"></div>
    `;
  });

  describe('saveDashboard', () => {
    it('should warn when name is empty', () => {
      (document.getElementById('dashboard-title') as HTMLInputElement).value = '';
      saveDashboard();
      expect(toastWarning).toHaveBeenCalledWith('Veuillez donner un nom au tableau de bord');
      expect(saveToStorage).not.toHaveBeenCalled();
    });

    it('should save a new dashboard', () => {
      (document.getElementById('dashboard-title') as HTMLInputElement).value = 'Mon Dashboard';
      saveDashboard();
      expect(state.dashboard.name).toBe('Mon Dashboard');
      expect(state.dashboard.id).toBeTruthy();
      expect(state.dashboard.createdAt).toBeTruthy();
      expect(state.savedDashboards).toHaveLength(1);
      expect(saveToStorage).toHaveBeenCalled();
      expect(toastSuccess).toHaveBeenCalled();
    });

    it('should update an existing dashboard', () => {
      state.dashboard.id = 'existing-id';
      state.savedDashboards = [{ ...createEmptyDashboard(), id: 'existing-id', name: 'Old Name' }];
      (document.getElementById('dashboard-title') as HTMLInputElement).value = 'New Name';

      saveDashboard();
      expect(state.savedDashboards).toHaveLength(1);
      expect(state.savedDashboards[0].name).toBe('New Name');
    });
  });

  describe('newDashboard', () => {
    it('should reset to empty dashboard when no widgets', () => {
      state.dashboard.name = 'Custom Name';
      newDashboard();
      expect(state.dashboard.name).toBe('Mon tableau de bord');
      expect(state.dashboard.widgets).toEqual([]);
    });
  });

  describe('loadDashboard', () => {
    it('should load a saved dashboard by id', () => {
      const saved = {
        ...createEmptyDashboard(),
        id: 'dash-1',
        name: 'Saved Dashboard',
        widgets: [{ id: 'w-1', type: 'kpi' as const, title: 'KPI', position: { row: 0, col: 0 }, config: {} }],
      };
      state.savedDashboards = [saved];

      document.body.innerHTML += '<div id="dashboards-modal" class="active"></div>';

      loadDashboard('dash-1');
      expect(state.dashboard.name).toBe('Saved Dashboard');
      expect(state.dashboard.widgets).toHaveLength(1);
    });

    it('should do nothing for unknown id', () => {
      state.dashboard.name = 'Original';
      loadDashboard('nonexistent');
      expect(state.dashboard.name).toBe('Original');
    });
  });
});
