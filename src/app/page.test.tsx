import { render, screen, within } from '@testing-library/react';
import { featuredProjects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import HomePage from './page';

describe('HomePage', () => {
  it('opens with the approved positioning, availability, and hiring actions', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        name: /i build developer tools and ai systems that make complex software easier to inspect, operate, and trust/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(siteConfig.availability)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /selected work/i })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute(
      'href',
      siteConfig.resumePath,
    );
    expect(screen.getByRole('link', { name: /github profile/i })).toHaveAttribute(
      'href',
      siteConfig.links.github,
    );
    expect(screen.getByRole('link', { name: /email subhajit/i })).toHaveAttribute(
      'href',
      siteConfig.links.email,
    );
  });

  it('renders exactly four featured projects in the approved order', () => {
    render(<HomePage />);

    const dossiers = screen.getAllByTestId('featured-project');
    expect(dossiers).toHaveLength(4);

    expect(
      dossiers.map((dossier) => within(dossier).getByRole('heading').textContent),
    ).toEqual(featuredProjects.map((project) => project.title));
  });

  it('keeps current employment minimal and includes education and direct contact', () => {
    render(<HomePage />);

    const giakaaEntry = screen.getByTestId('experience-giakaa-capital');
    expect(giakaaEntry).toHaveTextContent('Giakaa Capital');
    expect(giakaaEntry).toHaveTextContent('Full Stack Software Developer');
    expect(giakaaEntry).toHaveTextContent('May 2026-Present');
    expect(giakaaEntry).toHaveTextContent('Remote');
    expect(within(giakaaEntry).queryByRole('paragraph')).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
    expect(screen.getByText(/centurion university/i)).toBeInTheDocument();

    const contact = screen.getByRole('region', { name: /work with subhajit/i });
    expect(within(contact).getByRole('link', { name: siteConfig.email })).toHaveAttribute(
      'href',
      siteConfig.links.email,
    );
  });
});
