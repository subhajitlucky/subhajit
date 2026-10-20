import { render, screen, within } from '@testing-library/react';
import { listedProjects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import ProjectsPage, { metadata } from './page';

describe('ProjectsPage', () => {
  it('uses one plain sentence for the project index introduction', () => {
    render(<ProjectsPage />);

    const intro = screen.getByRole('heading', { name: 'Selected work' }).nextElementSibling;

    expect(intro?.textContent?.trim()).toBe(
      'Ten selected projects across developer tools, AI systems, full-stack products, and data visualization.',
    );
  });

  it('renders all selected projects in their approved order', () => {
    render(<ProjectsPage />);

    const entries = screen.getAllByTestId('project-index-item');
    expect(entries).toHaveLength(10);
    expect(entries.map((entry) => within(entry).getByRole('heading').textContent)).toEqual(
      listedProjects.map((project) => project.title),
    );

    entries.forEach((entry, index) => {
      const project = listedProjects[index];
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

  it('publishes route-local metadata for the project index', () => {
    expect(metadata.title).toBe('Selected work');
    expect(metadata.description).toBe(
      'Developer tools, AI systems, and full-stack product work by Subhajit Pradhan.',
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
