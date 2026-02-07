import { test, expect } from '@playwright/test';

test.describe('Smoke tests', () => {
  test('Hub (index.html) loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Charts builder|gouv-widgets/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Builder app loads', async ({ page }) => {
    await page.goto('/builder.html');
    await expect(page.locator('#source-panel-saved')).toBeVisible();
  });

  test('Playground app loads', async ({ page }) => {
    await page.goto('/playground.html');
    await expect(page.locator('.CodeMirror')).toBeVisible();
  });

  test('Sources app loads', async ({ page }) => {
    await page.goto('/sources.html');
    await expect(page.locator('#connections-list')).toBeVisible();
  });

  test('Favorites app loads', async ({ page }) => {
    await page.goto('/favoris.html');
    await expect(page.locator('#favorites-list')).toBeVisible();
  });

  test('No native alert() dialogs are triggered on load', async ({ page }) => {
    let alertFired = false;
    page.on('dialog', (dialog) => {
      alertFired = true;
      dialog.dismiss();
    });

    for (const path of ['/', '/builder.html', '/playground.html', '/sources.html', '/favoris.html']) {
      await page.goto(path);
      await page.waitForTimeout(500);
    }

    expect(alertFired).toBe(false);
  });
});
