import { expect, test } from '@playwright/test';

const routes = ['/', '/projects', '/writing/tarka-sabha-council', '/kalia'];

test.describe('320px layout', () => {
  test.use({ viewport: { width: 320, height: 800 } });

  for (const route of routes) {
    test(`${route} has no horizontal page overflow`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });

      const overflow = await page.evaluate(() => ({
        body: document.body.scrollWidth,
        document: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));

      expect(overflow.body).toBeLessThanOrEqual(overflow.viewport + 1);
      expect(overflow.document).toBeLessThanOrEqual(overflow.viewport + 1);
    });
  }

  test('KALIA figures and decision rows fit', async ({ page }) => {
    await page.goto('/kalia', { waitUntil: 'networkidle' });
    await page.locator('.kalia-figure').first().scrollIntoViewIfNeeded();

    const widths = await page.evaluate(() => ({
      viewport: window.innerWidth,
      figures: [...document.querySelectorAll('.kalia-figure, .kalia-figure img')].map((element) =>
        Math.round(element.getBoundingClientRect().right),
      ),
      decisions: [...document.querySelectorAll('.kalia-decision')].slice(0, 3).map((element) =>
        Math.round(element.getBoundingClientRect().right),
      ),
    }));

    for (const right of [...widths.figures, ...widths.decisions]) {
      expect(right).toBeLessThanOrEqual(widths.viewport + 1);
    }
  });
});
