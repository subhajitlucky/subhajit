import { render, screen, within } from '@testing-library/react';
import { projects } from '@/data/projects';
import ProjectsPage from './page';

describe('ProjectsPage', () => {
  it('uses one concise sentence for the project index introduction', () => {
    render(<ProjectsPage />);

    const intro = screen.getByRole('heading', { name: 'Selected projects' }).nextElementSibling;

    expect(intro?.textContent?.trim()).toBe(
      'Six public projects spanning developer tools, AI systems, and full-stack products.',
    );
  });

  it('renders all selected projects in their approved order', () => {
    render(<ProjectsPage />);

    const entries = screen.getAllByTestId('project-index-item');
    expect(entries).toHaveLength(6);
    expect(entries.map((entry) => within(entry).getByRole('heading').textContent)).toEqual(
      projects.map((project) => project.title),
    );

    entries.forEach((entry, index) => {
      const project = projects[index];
      expect(within(entry).getByRole('link', { name: 'Case study' })).toHaveAttribute(
        'href',
        `/projects/${project.slug}`,
      );
      expect(within(entry).getByRole('link', { name: 'Source' })).toHaveAttribute(
        'href',
        project.links.find((link) => link.kind === 'source')?.href,
      );
    });
  });
});
