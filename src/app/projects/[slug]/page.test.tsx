import { render, screen, within } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/data/projects';
import ProjectPage, { generateStaticParams } from './page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

describe('ProjectPage', () => {
  it('leads with what the project is and how to use it', async () => {
    const page = await ProjectPage({ params: Promise.resolve({ slug: 'codebase-doctor' }) });
    render(page);

    expect(screen.getByRole('heading', { level: 1, name: 'Codebase Doctor' })).toBeInTheDocument();

    const project = getProject('codebase-doctor');
    expect(project).toBeDefined();
    if (!project) {
      throw new Error('Expected codebase-doctor to be present in canonical project data');
    }

    expect(screen.getByText(project.whatItIs)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How to use it' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Proof' })).toBeInTheDocument();

    for (const step of project.usage) {
      expect(screen.getByText(step.text)).toBeInTheDocument();
      if (step.command) {
        expect(screen.getByText(step.command)).toBeInTheDocument();
      }
      if (step.link) {
        expect(screen.getByRole('link', { name: step.link.label })).toHaveAttribute(
          'href',
          step.link.href,
        );
      }
    }

    expect(screen.getAllByRole('button', { name: 'Copy' })).toHaveLength(
      project.usage.filter((step) => step.command).length,
    );
    expect(screen.getByText('Engineering notes')).toBeInTheDocument();

    for (const heading of [
      'Problem',
      'System',
      'Architecture',
      'Decisions',
      'Tradeoffs and limitations',
      'Full proof',
    ]) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }

    expect(screen.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      'https://github.com/subhajitlucky/codebase-doctor',
    );

    for (const link of project.links) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }

    const flow = screen.getByRole('list', { name: 'Architecture flow' });
    expect(within(flow).getAllByRole('listitem').map((item) => item.textContent)).toEqual(
      project.flow.map((step) => `${step.label}${step.detail}`),
    );
  });

  it('renders the upgraded Tarka Sabha decision-evidence positioning', async () => {
    const page = await ProjectPage({ params: Promise.resolve({ slug: 'tarka-sabha' }) });
    render(page);

    const project = getProject('tarka-sabha');
    expect(project).toBeDefined();
    if (!project) {
      throw new Error('Expected tarka-sabha to be present in canonical project data');
    }

    expect(screen.getByText('Decision evidence')).toBeInTheDocument();
    expect(screen.getByText('Live platform')).toBeInTheDocument();
    expect(screen.getByText(project.whatItIs)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Live application' })).toHaveAttribute(
      'href',
      'https://tarkasabha.vercel.app',
    );

    const sampleLinks = screen.getAllByRole('link', { name: 'Sample dossier' });
    expect(sampleLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of sampleLinks) {
      expect(link).toHaveAttribute('href', 'https://tarkasabha.vercel.app/diligence');
    }
  });

  it('keeps the engineering notes collapsed by default', async () => {
    const page = await ProjectPage({ params: Promise.resolve({ slug: 'codebase-doctor' }) });
    render(page);

    const summary = screen.getByText('Engineering notes');
    expect(summary.closest('details')).not.toHaveAttribute('open');
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
