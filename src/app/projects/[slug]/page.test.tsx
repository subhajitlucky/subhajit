import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/data/projects';
import ProjectPage, { generateStaticParams } from './page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

describe('ProjectPage', () => {
  it('builds a complete case study from canonical project data', async () => {
    const page = await ProjectPage({ params: Promise.resolve({ slug: 'codebase-doctor' }) });
    render(page);

    expect(screen.getByRole('heading', { level: 1, name: 'Codebase Doctor' })).toBeInTheDocument();

    for (const heading of [
      'Problem',
      'System',
      'Proof',
      'Architecture',
      'Decisions',
      'Tradeoffs and limitations',
      'Technologies',
    ]) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }

    expect(screen.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      'https://github.com/subhajitlucky/codebase-doctor',
    );

    const project = getProject('codebase-doctor');
    expect(project).toBeDefined();
    if (!project) {
      throw new Error('Expected codebase-doctor to be present in canonical project data');
    }

    for (const link of project.links) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
  });

  it('pre-renders every canonical project route', () => {
    expect(generateStaticParams()).toEqual(projects.map((project) => ({ slug: project.slug })));
  });

  it('returns not found for an unknown project', async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ slug: 'does-not-exist' }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });
});
