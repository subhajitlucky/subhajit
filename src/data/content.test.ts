import {
  featuredProjects,
  getProject,
  listedProjects,
  projects,
  roleFilters,
  secondaryProjects,
} from '@/data/projects';
import { experience, siteConfig, skillGroups } from '@/data/site';
import { isExternalUrl } from '@/lib/urls';

describe('portfolio content integrity', () => {
  it('uses the approved plain product engineer positioning', () => {
    expect(siteConfig.role).toBe('Full-Stack Product Engineer');
    expect(siteConfig.summary).toBe(
      'I build web products and AI systems, from the interface to the infrastructure.',
    );
    expect(siteConfig.availability).toBe('Open to full-stack opportunities');
    expect(siteConfig.description).toBe(
      'Full-Stack Product Engineer building web products and AI systems.',
    );
    expect(skillGroups.map((group) => group.label)).toEqual([
      'Languages',
      'Product engineering',
      'Backend and data',
      'AI and developer tools',
      'Cloud and DevOps',
      'Blockchain',
    ]);
    expect(siteConfig.availability.toLowerCase()).not.toContain('relocation');
  });

  it('keeps the current Giakaa entry inside the approved disclosure boundary', () => {
    const currentRole = experience[0];

    expect(currentRole).toEqual({
      organization: 'Giakaa (Kailanchal Technologies Pvt Ltd)',
      title: 'Full Stack Software Developer',
      period: 'May 2026-Nov 2026',
      location: 'Remote',
      summary:
        'Full-stack features in Next.js, TypeScript, PostgreSQL and ClickHouse; backend APIs and background processing on GCP.',
    });
    expect(JSON.stringify(currentRole).toLowerCase()).not.toContain('hema');
  });

  it('preserves the approved featured and secondary project order', () => {
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      'kalia',
      'codebase-doctor',
      'rls-doctor',
      'tarka-sabha',
      'cscosmos',
      'campushelper',
    ]);
    expect(secondaryProjects.map((project) => project.slug)).toEqual([
      'chitradata',
      'smritiflow',
      'sutra',
      'astapraharicha',
    ]);
  });

  it('keeps featured summaries concise and linked to source', () => {
    for (const project of featuredProjects) {
      expect(project.summary.length).toBeLessThanOrEqual(180);
      expect(project.links.some((link) => link.kind === 'source')).toBe(true);
    }
  });

  it('gives every selected project inspectable proof and valid links', () => {
    expect(projects).toHaveLength(12);
    expect(listedProjects).toHaveLength(10);

    for (const project of projects) {
      expect(project.proof.length).toBeGreaterThan(0);
      expect(project.tldr).toHaveLength(3);
      expect(project.whatItIs.length).toBeGreaterThan(0);
      expect(project.whatItIs.length).toBeLessThanOrEqual(200);
      expect(project.usage.length).toBeGreaterThanOrEqual(3);
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

  it('assigns every project an ordered, duplicate-free role fit', () => {
    const validRoles = roleFilters
      .filter((filter) => filter.value !== 'all')
      .map((filter) => filter.value);

    expect(validRoles).toEqual(['swe', 'fullstack', 'frontend', 'backend']);

    for (const project of listedProjects) {
      expect(project.roles.length).toBeGreaterThan(0);
      expect(new Set(project.roles).size).toBe(project.roles.length);

      for (const role of project.roles) {
        expect(validRoles).toContain(role);
      }
    }
  });

  it('looks up projects by slug without manufacturing missing entries', () => {
    expect(getProject('rls-doctor')?.title).toBe('RLS Doctor');
    expect(getProject('missing-project')).toBeUndefined();
  });
});
