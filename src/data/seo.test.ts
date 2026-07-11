import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import {
  absoluteUrl,
  faqs,
  machineReadableProfile,
  profileSummary,
  siteConfig,
  toolFootnotes,
} from '@/data/site';

describe('portfolio SEO content model', () => {
  it('uses the focused homepage H1 phrase and canonical domain', () => {
    expect(siteConfig.headline).toBe('Subhajit Pradhan');
    expect(siteConfig.baseUrl).toBe('https://subhajitpradhan.vercel.app');
    expect(absoluteUrl('/blog')).toBe('https://subhajitpradhan.vercel.app/blog');
  });

  it('does not leak secondary Vercel aliases into canonical content', () => {
    const serialized = JSON.stringify({ siteConfig, projects, blogPosts });

    expect(serialized).not.toContain('subhajitxyz.vercel.app');
    expect(serialized).not.toContain('subhajitlucky.vercel.app');
    expect(serialized).not.toContain('subhajit-pradhan-profile');
    expect(serialized).not.toContain('subhajitlucky/tarka-sabha');
  });

  it('keeps removed QuantumTicket references out of runtime and public content', () => {
    const publicProfile = readFileSync(join(process.cwd(), 'public', 'llms.txt'), 'utf8');
    const runtimeContent = JSON.stringify({ siteConfig, projects, blogPosts, toolFootnotes });

    expect(runtimeContent).not.toMatch(/quantumticket/i);
    expect(publicProfile).not.toMatch(/quantumticket/i);
  });

  it('uses the canonical resume path in runtime and public content', () => {
    const publicProfile = readFileSync(join(process.cwd(), 'public', 'llms.txt'), 'utf8');

    expect(siteConfig.resumePath).toBe('/assets/Subhajit_Resume.pdf');
    expect(publicProfile).not.toContain('Subhajit_ResumeV9.pdf');
  });

  it('keeps the canonical resume and root alias byte-for-byte equal to the attached resume', () => {
    const publicRoot = join(process.cwd(), 'public');
    const attachedResume = readFileSync(join(publicRoot, 'assets', 'Subhajit_ResumeV9.pdf'));
    const canonicalResume = readFileSync(
      join(publicRoot, 'assets', 'Subhajit_Resume.pdf'),
    );
    const rootAlias = readFileSync(join(publicRoot, 'resume.pdf'));

    expect(canonicalResume.equals(attachedResume)).toBe(true);
    expect(rootAlias.equals(attachedResume)).toBe(true);
  });

  it('has unique project and blog slugs for static routes', () => {
    const projectSlugs = projects.map((project) => project.slug);
    const blogSlugs = blogPosts.map((post) => post.slug);

    expect(new Set(projectSlugs).size).toBe(projectSlugs.length);
    expect(new Set(blogSlugs).size).toBe(blogSlugs.length);
  });

  it('uses the locked peer-focused project set', () => {
    const slugs = projects.map((project) => project.slug);
    expect(slugs).toEqual([
      'rls-doctor',
      'smritiflow',
      'tarka-sabha',
      'cscosmos',
      'campushelper',
      'intentpay',
    ]);
    expect(slugs).not.toContain('quantumticket');
  });

  it('keeps verified statuses, role copy, and blog relationships aligned', () => {
    expect(projects.map(({ slug, status }) => [slug, status])).toEqual([
      ['rls-doctor', 'Published CLI'],
      ['smritiflow', 'Published CLI'],
      ['tarka-sabha', 'Live platform'],
      ['cscosmos', 'Live platform'],
      ['campushelper', 'Live platform'],
      ['intentpay', 'Prototype'],
    ]);
    expect(siteConfig.role).toBe('Software Engineer - Developer Tools, AI Systems, Full Stack');
    expect(siteConfig.description).toBe(profileSummary.short);

    const projectSlugs = new Set(projects.map((project) => project.slug));
    expect(
      blogPosts.every((post) =>
        post.relatedProjectSlugs.every((slug) => projectSlugs.has(slug)),
      ),
    ).toBe(true);
    expect(blogPosts[0]?.relatedProjectSlugs).toEqual(['intentpay']);
  });

  it('includes full-stack, AI/web3, blog, and FAQ ranking material', () => {
    expect(projects.some((project) => project.tags.includes('Full Stack'))).toBe(true);
    expect(projects.some((project) => project.slug === 'cscosmos')).toBe(true);
    expect(projects.some((project) => project.slug === 'intentpay')).toBe(true);
    expect(projects.find((project) => project.slug === 'intentpay')?.status).toBe('Prototype');
    expect(blogPosts).toHaveLength(3);
    expect(faqs.length).toBeGreaterThanOrEqual(3);
  });

  it('gives every project visual and code inspection evidence', () => {
    for (const project of projects) {
      expect(project.visual.title.length).toBeGreaterThan(0);
      expect(project.visual.steps.length).toBeGreaterThanOrEqual(3);
      expect(project.metrics.length).toBeGreaterThanOrEqual(3);
      expect(project.architectureDiagram.length).toBeGreaterThanOrEqual(3);
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
    expect(machineReadableProfile.projects.length).toBe(6);
    expect(machineReadableProfile.experience.length).toBeGreaterThanOrEqual(3);
  });

  it('exposes skillscan as footnote tooling, not a full project', () => {
    expect(toolFootnotes.some((tool) => tool.title === 'skillscan')).toBe(true);
    expect(projects.every((project) => project.slug !== 'skillscan')).toBe(true);
    expect(siteConfig.nav.map((item) => item.label)).toEqual([
      'Work',
      'Experience',
      'Writing',
      'Contact',
    ]);
  });
});
