/**
 * Updates the gouv-chart-a11y preview in the builder.
 * Uses the actual library component instead of manual DOM manipulation.
 */

import { state } from '../state.js';
import { dispatchDataLoaded } from '../../../../src/utils/data-bridge.js';

const PREVIEW_SOURCE_ID = 'builder-preview';

/**
 * Update the gouv-chart-a11y preview component.
 * Shows/hides based on a11yEnabled, sets attributes from state,
 * and feeds data via the data bridge.
 */
export function updateAccessibleTable(): void {
  const el = document.getElementById('a11y-preview') as HTMLElement | null;
  if (!el) return;

  // Show/hide
  el.style.display = state.a11yEnabled ? '' : 'none';
  if (!state.a11yEnabled) return;

  // Sync boolean attributes
  if (state.a11yTable) {
    el.setAttribute('table', '');
  } else {
    el.removeAttribute('table');
  }

  if (state.a11yDownload) {
    el.setAttribute('download', '');
  } else {
    el.removeAttribute('download');
  }

  // Sync description attribute
  if (state.a11yDescription) {
    el.setAttribute('description', state.a11yDescription);
  } else {
    el.removeAttribute('description');
  }

  // Sync label-field for table column headers
  if (state.labelField) {
    el.setAttribute('label-field', state.labelField);
  } else {
    el.removeAttribute('label-field');
  }

  // Feed data to the component via data bridge
  dispatchDataLoaded(PREVIEW_SOURCE_ID, state.data);
}
