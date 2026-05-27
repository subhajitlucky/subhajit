import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import { absoluteUrl, faqs, siteConfig } from '@/data/site';

describe('portfolio SEO content model', () => {
  it('uses the required homepage H1 phrase and canonical domain', () => {
    expect(siteConfig.headline).toBe('Subhajit Pradhan – Full Stack & Blockchain Developer');
    expect(siteConfig.baseUrl).toBe('https://subhajitpradhan.vercel.app');
    expect(absoluteUrl('/blog')).toBe('https://subhajitpradhan.vercel.app/blog');
  });

  it('does not leak the old deployment domain into canonical content', () => {
    const serialized = JSON.stringify({ siteConfig, projects, blogPosts });

    expect(serialized).not.toContain('subhajitxyz.vercel.app');
    expect(serialized).not.toContain('subhajit-pradhan-profile');
    expect(serialized).not.toContain('subhajitlucky/tarka-sabha');
  });

  it('has unique project and blog slugs for static routes', () => {
    const projectSlugs = projects.map((project) => project.slug);
    const blogSlugs = blogPosts.map((post) => post.slug);

    expect(new Set(projectSlugs).size).toBe(projectSlugs.length);
    expect(new Set(blogSlugs).size).toBe(blogSlugs.length);
  });

  it('includes blockchain, full-stack, blog, and FAQ ranking material', () => {
    expect(projects.some((project) => project.tags.includes('Blockchain'))).toBe(true);
    expect(projects.some((project) => project.tags.includes('Full Stack'))).toBe(true);
    expect(blogPosts).toHaveLength(3);
    expect(faqs.length).toBeGreaterThanOrEqual(3);
  });
});
