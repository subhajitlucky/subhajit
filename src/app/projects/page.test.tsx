import { render, screen, within } from '@testing-library/react';
import { projects } from '@/data/projects';
import ProjectsPage from './page';

describe('ProjectsPage', () => {
  it('renders all selected projects in their approved order', () => {
    render(<ProjectsPage />);

    const entries = screen.getAllByTestId('project-index-item');
    expect(entries).toHaveLength(6);
    expect(entries.map((entry) => within(entry).getByRole('heading').textContent)).toEqual(
      projects.map((project) => project.title),
    );
  });
});
