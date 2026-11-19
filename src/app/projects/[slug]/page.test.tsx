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
  it('leads with the problem, the build, and the evidence', async () => {
    const page = await ProjectPage({ params: Promise.resolve({ slug: 'codebase-doctor' }) });
    render(page);

    expect(screen.getByRole('heading', { level: 1, name: 'Codebase Doctor' })).toBeInTheDocument();

    const project = getProject('codebase-doctor');
    expect(project).toBeDefined();
    if (!project) {
      throw new Error('Expected codebase-doctor to be present in canonical project data');
    }

    expect(screen.getByText(project.whatItIs)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Try it' })).toBeInTheDocument();

    for (const step of project.usage ?? []) {
      expect(screen.getByText(step.text)).toBeInTheDocument();
      expect(screen.getByText(step.command)).toBeInTheDocument();
    }

    for (const heading of ['Problem', 'What I built', 'Decisions', 'Evidence', 'Limits']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }

    expect(screen.queryByRole('heading', { name: 'How to use it' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Full proof' })).not.toBeInTheDocument();
    expect(screen.queryByText('Engineering notes')).not.toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      'https://github.com/subhajitlucky/codebase-doctor',
    );

    for (const link of project.links) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
  });

  it('renders the Tarka Sabha live positioning without a usage block', async () => {
    const page = await ProjectPage({ params: Promise.resolve({ slug: 'tarka-sabha' }) });
    render(page);

    expect(screen.getByText(/Decision evidence/)).toBeInTheDocument();
    expect(screen.getByText(/Decision evidence · Live/)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Try it' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Architecture' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Live' })).toHaveAttribute(
      'href',
      'https://tarkasabha.vercel.app',
    );
  });

  it('links the KALIA console from the case study', async () => {
    const page = await ProjectPage({ params: Promise.resolve({ slug: 'kalia' }) });
    render(page);

    expect(screen.getByRole('link', { name: 'KALIA console' })).toHaveAttribute('href', '/kalia');
    expect(screen.getByRole('heading', { name: 'Architecture' })).toBeInTheDocument();

    const flow = screen.getByRole('list', { name: 'Architecture flow' });
    const project = getProject('kalia');
    expect(project?.flow).toBeDefined();
    if (!project?.flow) {
      throw new Error('Expected kalia flow to be present');
    }
    expect(within(flow).getAllByRole('listitem').map((item) => item.textContent)).toEqual(
      project.flow.map((step) => `${step.label}${step.detail}`),
    );
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
