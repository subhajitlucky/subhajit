import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/', '/projects', '/projects/kalia', '/writing/tarka-sabha-council', '/kalia'];

test.describe('accessibility', () => {
  for (const route of routes) {
    test(`${route} has no WCAG A/AA violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
