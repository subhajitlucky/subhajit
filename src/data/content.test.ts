import {
  featuredProjects,
  getProject,
  projects,
  secondaryProjects,
} from '@/data/projects';
import { experience, siteConfig } from '@/data/site';
import { isExternalUrl } from '@/lib/urls';

describe('portfolio content integrity', () => {
  it('uses the approved role and worldwide remote availability', () => {
    expect(siteConfig.role).toBe('Full Stack Software Developer');
    expect(siteConfig.summary).toBe(
      'I build reliable web products, developer tools, and AI systems using TypeScript, Next.js, Python, and PostgreSQL.',
    );
    expect(siteConfig.availability).toBe('Open to remote roles worldwide');
    expect(siteConfig.availability.toLowerCase()).not.toContain('relocation');
  });

  it('keeps the current Giakaa entry inside the approved disclosure boundary', () => {
    const currentRole = experience[0];

    expect(currentRole).toEqual({
      organization: 'Giakaa Capital',
      title: 'Full Stack Software Developer',
      period: 'May 2026-Present',
      location: 'Remote',
    });
    expect(JSON.stringify(currentRole).toLowerCase()).not.toContain('hema');
  });

  it('preserves the approved featured and secondary project order', () => {
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      'codebase-doctor',
      'rls-doctor',
      'smritiflow',
      'tarka-sabha',
    ]);
    expect(secondaryProjects.map((project) => project.slug)).toEqual(['cscosmos', 'sutra']);
  });

  it('gives every selected project inspectable proof and valid links', () => {
    expect(projects).toHaveLength(6);

    for (const project of projects) {
      expect(project.proof.length).toBeGreaterThan(0);
      expect(project.links.some((link) => link.kind === 'source')).toBe(true);

      for (const link of project.links) {
        expect(isExternalUrl(link.href)).toBe(true);
      }
    }
  });

  it('does not encode repository creation dates or unsupported marketing metrics', () => {
    const serialized = JSON.stringify(projects).toLowerCase();

    expect(serialized).not.toContain('createdat');
    expect(serialized).not.toContain('creationdate');
    expect(serialized).not.toContain('enterprise-grade');
    expect(serialized).not.toContain('production-ready');
    expect(serialized).not.toContain('thousands of users');
  });

  it('looks up projects by slug without manufacturing missing entries', () => {
    expect(getProject('rls-doctor')?.title).toBe('RLS Doctor');
    expect(getProject('missing-project')).toBeUndefined();
  });
});
