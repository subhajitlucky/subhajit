import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/projects',
  '/projects/kalia',
  '/projects/campushelper',
  '/writing',
  '/writing/tarka-sabha-council',
  '/kalia',
];

test.describe('public routes', () => {
  for (const route of routes) {
    test(`${route} renders one h1 without console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      page.on('pageerror', (error) => errors.push(error.message));

      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(errors).toEqual([]);
    });
  }

  test('unknown routes return 404', async ({ page }) => {
    const response = await page.goto('/missing-page');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
  });
});
