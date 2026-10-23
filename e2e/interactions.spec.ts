import { expect, test } from '@playwright/test';

test.describe('interactions', () => {
  test('project command copy button writes the command to the clipboard', async ({
    context,
    page,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/projects/codebase-doctor', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'Copy' }).first().click();
    await expect(page.getByRole('button', { name: 'Copied' }).first()).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe('npx -y codebase-doctor demo');
  });

  test('project role filters update the list and status', async ({ page }) => {
    await page.goto('/projects', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'Full-stack', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Full-stack', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.getByRole('status')).toContainText('Showing 3 of 10 projects');
    await expect(page.getByTestId('project-index-item')).toHaveCount(3);
  });

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
