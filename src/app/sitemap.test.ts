import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('includes the home page, work index, and every project case study', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(siteConfig.baseUrl);
    expect(urls).toContain(`${siteConfig.baseUrl}/projects`);
    for (const project of projects) {
      expect(urls).toContain(`${siteConfig.baseUrl}/projects/${project.slug}`);
    }
  });
});
