import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import { absoluteUrl, faqs, machineReadableProfile, siteConfig } from '@/data/site';

describe('portfolio SEO content model', () => {
  it('uses the focused homepage H1 phrase and canonical domain', () => {
    expect(siteConfig.headline).toBe(
      'Subhajit Pradhan builds full-stack, AI, and blockchain products.',
    );
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

  it('gives every project visual and code inspection evidence', () => {
    for (const project of projects) {
      expect(project.visual.title.length).toBeGreaterThan(0);
      expect(project.visual.steps.length).toBeGreaterThanOrEqual(3);
      expect(project.inspectionLinks.length).toBeGreaterThanOrEqual(2);
      expect(project.inspectionLinks.every((link) => link.href.startsWith('https://'))).toBe(true);
    }
  });

  it('exposes a complete machine-readable profile for AI crawlers and assistive tech', () => {
    expect(machineReadableProfile.name).toBe('Subhajit Pradhan');
    expect(machineReadableProfile.role).toContain('Software Engineer');
    expect(machineReadableProfile.contact.email).toBe(siteConfig.email);
    expect(machineReadableProfile.contact.github).toBe(siteConfig.links.github);
    expect(machineReadableProfile.contact.linkedin).toBe(siteConfig.links.linkedin);
    expect(machineReadableProfile.skills.length).toBeGreaterThan(10);
    expect(machineReadableProfile.projects.length).toBeGreaterThanOrEqual(4);
    expect(machineReadableProfile.experience.length).toBeGreaterThanOrEqual(3);
  });
});
