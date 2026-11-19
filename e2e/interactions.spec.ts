import { expect, test } from '@playwright/test';

test.describe('interactions', () => {
  test('KALIA theme persists across reloads', async ({ page }) => {
    await page.goto('/kalia', { waitUntil: 'networkidle' });

    const toggle = page.getByRole('button', { name: /switch to (light|dark) mode/i });
    await toggle.click();
    const selected = await page.evaluate(() => document.documentElement.dataset.kaliaTheme);

    await page.reload({ waitUntil: 'networkidle' });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.kaliaTheme))
      .toBe(selected);
  });

  test('KALIA replay controls reach the end', async ({ page }) => {
    await page.goto('/kalia', { waitUntil: 'networkidle' });
    await page.locator('.kalia-console').scrollIntoViewIfNeeded();

    await page.getByRole('button', { name: 'end', exact: true }).click();
    await expect(page.getByRole('button', { name: 'replay', exact: true })).toBeVisible();
    await expect(page.getByText('deterministic eval 2.4366')).toBeVisible();
  });
});
