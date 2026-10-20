import { fireEvent, render, screen, within } from '@testing-library/react';
import { ProjectsExplorer } from '@/components/ProjectsExplorer';
import { listedProjects } from '@/data/projects';

function renderedTitles() {
  return screen
    .getAllByTestId('project-index-item')
    .map((item) => within(item).getByRole('heading').textContent);
}

describe('ProjectsExplorer', () => {
  it('renders every listed project in canonical order by default', () => {
    render(<ProjectsExplorer projects={listedProjects} />);

    expect(renderedTitles()).toEqual(listedProjects.map((project) => project.title));
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent(
      `Showing ${listedProjects.length} of ${listedProjects.length} projects`,
    );
  });

  it('filters to role-fit projects with the strongest fit first', () => {
    render(<ProjectsExplorer projects={listedProjects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Backend' }));

    const expected = [...listedProjects]
      .filter((project) => project.roles.includes('backend'))
      .sort(
        (first, second) =>
          first.roles.indexOf('backend') - second.roles.indexOf('backend'),
      )
      .map((project) => project.title);

    expect(screen.getByRole('button', { name: 'Backend' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(renderedTitles()).toEqual(expected);
    expect(renderedTitles()[0]).toBe('RLS Doctor');
    expect(screen.getByRole('status')).toHaveTextContent(
      `Showing ${expected.length} of ${listedProjects.length} projects`,
    );
  });

  it('does not offer a filter with no listed projects', () => {
    render(<ProjectsExplorer projects={listedProjects} />);

    expect(screen.queryByRole('button', { name: 'Web3' })).not.toBeInTheDocument();
  });
});
