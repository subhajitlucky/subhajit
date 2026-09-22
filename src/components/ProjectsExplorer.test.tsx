import { fireEvent, render, screen, within } from '@testing-library/react';
import { ProjectsExplorer } from '@/components/ProjectsExplorer';
import { projects } from '@/data/projects';

function renderedTitles() {
  return screen
    .getAllByTestId('project-index-item')
    .map((item) => within(item).getByRole('heading').textContent);
}

describe('ProjectsExplorer', () => {
  it('renders every project in canonical order by default', () => {
    render(<ProjectsExplorer projects={projects} />);

    expect(renderedTitles()).toEqual(projects.map((project) => project.title));
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent(
      `Showing ${projects.length} of ${projects.length} projects`,
    );
  });

  it('filters to role-fit projects with the strongest fit first', () => {
    render(<ProjectsExplorer projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Backend' }));

    const expected = [...projects]
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
      `Showing ${expected.length} of ${projects.length} projects`,
    );
  });

  it('shows the web3 projects and restores all projects after', () => {
    render(<ProjectsExplorer projects={projects} />);

    fireEvent.click(screen.getByRole('button', { name: 'Web3' }));
    expect(renderedTitles()).toEqual(['IntentPay', 'QuantumTicket']);

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(renderedTitles()).toEqual(projects.map((project) => project.title));
  });
});
