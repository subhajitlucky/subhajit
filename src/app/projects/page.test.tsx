import { render, screen, within } from '@testing-library/react';
import { projects, supportingWork } from '@/data/projects';
import { siteConfig } from '@/data/site';
import ProjectsPage, { metadata } from './page';

describe('ProjectsPage', () => {
  it('uses one plain sentence for the work index introduction', () => {
    render(<ProjectsPage />);

    const intro = screen.getByRole('heading', { name: 'Selected work' }).nextElementSibling;

    expect(intro?.textContent?.trim()).toBe(
      'Four case studies across developer tools, AI systems, and full-stack products. Supporting work below.',
    );
  });

  it('renders the four case studies in order', () => {
    render(<ProjectsPage />);

    const entries = screen.getAllByTestId('project-index-item');
    expect(entries).toHaveLength(projects.length);
    expect(entries.map((entry) => within(entry).getByRole('heading').textContent)).toEqual(
      projects.map((project) => project.title),
    );

    entries.forEach((entry, index) => {
      const project = projects[index];
      expect(
        within(entry).getByRole('link', {
          name: new RegExp(`${project.title} details`, 'i'),
        }),
      ).toHaveAttribute('href', `/projects/${project.slug}`);
      expect(
        within(entry).getByRole('link', {
          name: new RegExp(`Source for ${project.title}`, 'i'),
        }),
      ).toHaveAttribute(
        'href',
        project.links.find((link) => link.kind === 'source')?.href,
      );
    });
  });

  it('renders supporting work as one-liners', () => {
    render(<ProjectsPage />);

    const entries = screen.getAllByTestId('more-work-item');
    expect(entries).toHaveLength(supportingWork.length);

    entries.forEach((entry, index) => {
      const item = supportingWork[index];
      expect(within(entry).getByRole('heading').textContent).toBe(item.title);
      expect(within(entry).getByText(item.summary)).toBeInTheDocument();

      for (const link of item.links) {
        expect(within(entry).getByRole('link', { name: link.label })).toHaveAttribute(
          'href',
          link.href,
        );
      }
    });
  });

  it('publishes route-local metadata for the work index', () => {
    expect(metadata.title).toBe('Selected work');
    expect(metadata.description).toBe(
      'Four case studies across developer tools, AI systems, and full-stack product work by Subhajit Pradhan.',
    );
    expect(metadata.alternates?.canonical).toBe('/projects');
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      url: '/projects',
      title: `Selected work | ${siteConfig.name}`,
      description: metadata.description,
      images: ['/opengraph-image'],
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: `Selected work | ${siteConfig.name}`,
      description: metadata.description,
      images: ['/opengraph-image'],
    });
  });
});
