import { getProject, projects, supportingWork } from '@/data/projects';
import { experience, siteConfig } from '@/data/site';
import { isExternalUrl } from '@/lib/urls';

describe('portfolio content integrity', () => {
  it('uses the evidence-first product engineer positioning', () => {
    expect(siteConfig.role).toBe('Full-Stack Product Engineer');
    expect(siteConfig.summary).toBe(
      'I build systems that make software verifiable — static analysis, database security, and a language model trained from scratch.',
    );
    expect(siteConfig.availability).toBe('Open to full-stack product engineering roles');
    expect(siteConfig.description).toBe(
      'Full-Stack Product Engineer building systems that make software verifiable.',
    );
    expect(siteConfig.nav.map((item) => item.label)).toEqual([
      'Work',
      'KALIA',
      'Writing',
      'Resume',
    ]);
  });

  it('keeps the current Giakaa entry inside the approved disclosure boundary', () => {
    const currentRole = experience[0];

    expect(currentRole).toEqual({
      organization: 'Giakaa (Kailanchal Technologies Pvt Ltd)',
      title: 'Full Stack Software Developer',
      period: 'May 2026-Present',
      location: 'Remote',
      summary:
        'Owned backend delivery in the final phase: production APIs, authentication and RBAC, background jobs on GCP, and SQL and dashboard performance.',
    });
    expect(experience).toHaveLength(2);
    expect(JSON.stringify(currentRole).toLowerCase()).not.toContain('hema');
  });

  it('keeps four case studies and three supporting one-liners', () => {
    expect(projects.map((project) => project.slug)).toEqual([
      'kalia',
      'codebase-doctor',
      'rls-doctor',
      'tarka-sabha',
    ]);
    expect(supportingWork.map((item) => item.title)).toEqual([
      'CSCosmos',
      'SmritiFlow',
      'ChitraData',
    ]);
  });

  it('keeps summaries concise and linked to source', () => {
    for (const project of projects) {
      expect(project.summary.length).toBeLessThanOrEqual(180);
      expect(project.links.some((link) => link.kind === 'source')).toBe(true);
    }
  });

  it('gives every case study inspectable proof and valid links', () => {
    for (const project of projects) {
      expect(project.proof).toHaveLength(3);
      expect(project.decisions.length).toBeGreaterThan(0);
      expect(project.tradeoffs.length).toBeGreaterThan(0);
      expect(project.whatItIs.length).toBeGreaterThan(0);
      expect(project.whatItIs.length).toBeLessThanOrEqual(200);
      expect(project.links.some((link) => link.kind === 'source')).toBe(true);

      for (const link of project.links) {
        if (isExternalUrl(link.href)) {
          expect(link.href.startsWith('https://')).toBe(true);
        } else {
          expect(link.href.startsWith('/')).toBe(true);
        }
      }
    }
  });

  it('does not label live applications as production systems', () => {
    for (const project of projects) {
      expect(project.status).not.toBe('Production');
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
