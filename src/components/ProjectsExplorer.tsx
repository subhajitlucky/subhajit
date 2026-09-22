'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { roleFilters, roleLabels, type Project, type Role } from '@/data/projects';
import { externalLinkProps } from '@/lib/urls';

type RoleFilter = Role | 'all';

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [activeRole, setActiveRole] = useState<RoleFilter>('all');

  const visibleProjects = useMemo(() => {
    if (activeRole === 'all') {
      return projects;
    }

    return projects
      .filter((project) => project.roles.includes(activeRole))
      .sort((first, second) => first.roles.indexOf(activeRole) - second.roles.indexOf(activeRole));
  }, [activeRole, projects]);

  return (
    <div className="projects-explorer">
      <div className="role-filter" role="group" aria-label="Filter projects by role">
        {roleFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={activeRole === filter.value}
            onClick={() => setActiveRole(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <p className="role-filter-status" role="status">
        Showing {visibleProjects.length} of {projects.length} projects
      </p>
      <ol className="projects-index-list">
        {visibleProjects.map((project) => {
          const source = project.links.find((link) => link.kind === 'source');

          return (
            <li data-testid="project-index-item" key={project.slug}>
              <div className="index-project-copy">
                <p className="index-project-meta">
                  {project.category} · {project.status} · Best for{' '}
                  {project.roles.map((role) => roleLabels[role]).join(', ')}
                </p>
                <h2>
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                <p>{project.summary}</p>
              </div>
              <div className="index-project-actions">
                <Link href={`/projects/${project.slug}`}>Details</Link>
                {source ? (
                  <a href={source.href} {...externalLinkProps}>
                    {source.label}
                  </a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
