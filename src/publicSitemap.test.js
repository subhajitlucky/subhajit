import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import projects from './data/projects';

const productionOrigin = 'https://subhajitxyz.vercel.app';

const sitemapXml = readFileSync(
  resolve(process.cwd(), 'public/sitemap.xml'),
  'utf8',
);

const sitemapDocument = new DOMParser().parseFromString(
  sitemapXml,
  'application/xml',
);

const sitemapLocs = Array.from(sitemapDocument.getElementsByTagName('loc')).map(
  (loc) => loc.textContent.trim(),
);

describe('public sitemap', () => {
  it('lists only the homepage and project detail routes', () => {
    const expectedLocs = [
      `${productionOrigin}/`,
      ...projects.map((project) => `${productionOrigin}/projects/${project.slug}`),
    ];

    expect(sitemapLocs).toEqual(expectedLocs);
    expect(sitemapLocs).not.toContain(`${productionOrigin}/projects`);
    expect(sitemapLocs).not.toContain(`${productionOrigin}/blog`);
  });
});
