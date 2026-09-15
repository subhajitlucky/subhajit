import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

const project = projects[0];

describe('ProjectCard', () => {
  it('renders the project title, summary, and details link', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
    expect(screen.getByText(project.summary)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /details/i })).toHaveAttribute(
      'href',
      `/projects/${project.slug}`,
    );
  });

  it('renders source, package, and live links but not evidence links', () => {
    render(<ProjectCard project={project} />);
    for (const link of project.links) {
      const matches = screen.queryAllByRole('link', { name: link.label });
      if (link.kind === 'evidence') {
        expect(matches).toHaveLength(0);
      } else {
        expect(matches.length).toBeGreaterThan(0);
      }
    }
  });
});
