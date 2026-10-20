import { expect, test } from '@playwright/test';

test('sitemap and internal links resolve', async ({ page, request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);

  const xml = await sitemap.text();
  const sitemapPaths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );

  for (const path of sitemapPaths) {
    const response = await request.get(path);
    expect(response.status(), `sitemap link ${path}`).toBeLessThan(400);
  }

  const routes = ['/', '/projects', '/kalia', '/writing', '/writing/tarka-sabha-council'];
  const internalLinks = new Set<string>();

  for (const route of routes) {
    await page.goto(route, { waitUntil: 'networkidle' });
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')).filter((href): href is string => Boolean(href)),
    );
    for (const href of hrefs) internalLinks.add(href.split('#')[0]);
  }

  for (const href of internalLinks) {
    const response = await request.get(href);
    expect(response.status(), `internal link ${href}`).toBeLessThan(400);
  }
});
