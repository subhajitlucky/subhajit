import { render, screen, within } from '@testing-library/react';
import { featuredProjects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import HomePage from './page';

describe('HomePage', () => {
  it('opens with direct full-stack positioning and hiring links', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: siteConfig.role })).toBeInTheDocument();
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.summary)).toBeInTheDocument();

    expect(screen.getByText(siteConfig.availability)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      siteConfig.resumePath,
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      siteConfig.links.github,
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      siteConfig.links.linkedin,
    );
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      siteConfig.links.email,
    );
  });

  it('renders exactly four featured projects in the approved order', () => {
    render(<HomePage />);

    const projectRows = screen.getAllByTestId('featured-project');
    expect(projectRows).toHaveLength(4);

    expect(
      projectRows.map((project) => within(project).getByRole('heading').textContent),
    ).toEqual(featuredProjects.map((project) => project.title));
  });

  it('keeps all experience in sight and current employment minimal', () => {
    render(<HomePage />);

    for (const organization of ['Giakaa Capital', 'uElement Technologies', 'QuadB Technologies']) {
      expect(screen.getByText(organization)).toBeInTheDocument();
    }

    const giakaaEntry = screen.getByTestId('experience-giakaa-capital');
    expect(giakaaEntry).toHaveTextContent('Giakaa Capital');
    expect(giakaaEntry).toHaveTextContent('Full Stack Software Developer');
    expect(giakaaEntry).toHaveTextContent('May 2026-Present');
    expect(giakaaEntry).toHaveTextContent('Remote');
    expect(within(giakaaEntry).queryByRole('paragraph')).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Capabilities' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
    expect(screen.getByText(/centurion university/i)).toBeInTheDocument();

    const contact = screen.getByRole('region', { name: 'Start a conversation' });
    expect(within(contact).getByRole('link', { name: /send an email/i })).toHaveAttribute(
      'href',
      siteConfig.links.email,
    );
  });

  it('presents selected work before experience and capabilities', () => {
    render(<HomePage />);

    const selectedWork = screen.getByRole('heading', { name: 'Selected work' });
    const experience = screen.getByRole('heading', { name: 'Experience' });
    const capabilities = screen.getByRole('heading', { name: 'Capabilities' });

    expect(
      selectedWork.compareDocumentPosition(experience) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      experience.compareDocumentPosition(capabilities) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('does not render the former skills or contact headings', () => {
    render(<HomePage />);

    expect(screen.queryByRole('heading', { name: 'Skills' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Contact Subhajit' })).not.toBeInTheDocument();
  });

  it('does not render the former editorial marketing sections', () => {
    render(<HomePage />);

    expect(screen.queryByText(/evidence, not adjectives/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/how i engineer/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/let's build the tool that clarifies it/i)).not.toBeInTheDocument();
  });
});
