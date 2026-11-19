import { posts } from '@/data/posts';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('includes the home page, work index, writing index, and every case study and post', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(siteConfig.baseUrl);
    expect(urls).toContain(`${siteConfig.baseUrl}/projects`);
    expect(urls).toContain(`${siteConfig.baseUrl}/writing`);
    for (const project of projects) {
      expect(urls).toContain(`${siteConfig.baseUrl}/projects/${project.slug}`);
    }
    for (const post of posts) {
      expect(urls).toContain(`${siteConfig.baseUrl}/writing/${post.slug}`);
    }
  });
});
