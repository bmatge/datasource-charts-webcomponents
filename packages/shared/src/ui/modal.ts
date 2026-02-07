/**
 * Simple modal state management helpers
 */

/**
 * Open a modal by adding the 'active' class
 */
export function openModal(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
  }
}

/**
 * Close a modal by removing the 'active' class
 */
export function closeModal(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('active');
  }
}

/**
 * Setup click-outside-to-close behavior on a modal overlay
 */
export function setupModalOverlayClose(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).id === id) {
        closeModal(id);
      }
    });
  }
}
