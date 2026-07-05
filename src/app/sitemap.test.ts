import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import sitemap from '@/app/sitemap';

describe('sitemap route data', () => {
  it('includes homepage, indexes, project routes, and blog routes on the target domain', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain('https://subhajitpradhan.vercel.app/');
    expect(urls).toContain('https://subhajitpradhan.vercel.app/projects');
    expect(urls).toContain('https://subhajitpradhan.vercel.app/blog');
    expect(urls).toContain('https://subhajitpradhan.vercel.app/llms.txt');

    for (const project of projects) {
      expect(urls).toContain(`https://subhajitpradhan.vercel.app/projects/${project.slug}`);
    }

    for (const post of blogPosts) {
      expect(urls).toContain(`https://subhajitpradhan.vercel.app/blog/${post.slug}`);
    }
  });

  it('includes homepage section anchors for crawler discovery', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain('https://subhajitpradhan.vercel.app/#projects');
    expect(urls).toContain('https://subhajitpradhan.vercel.app/#experience');
    expect(urls).toContain('https://subhajitpradhan.vercel.app/#about');
    expect(urls).toContain('https://subhajitpradhan.vercel.app/#contact');
  });
});
