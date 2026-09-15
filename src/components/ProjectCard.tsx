import Link from 'next/link';
import { TagList } from '@/components/TagList';
import type { Project } from '@/data/projects';
import { externalLinkProps, isExternalUrl } from '@/lib/urls';

const actionKinds = new Set(['source', 'package', 'live']);

export function ProjectCard({ project }: { project: Project }) {
  const actionLinks = project.links.filter((link) => actionKinds.has(link.kind));

  return (
    <article className="project-card" data-testid="project-card">
      <p className="project-card-meta">
        {project.category} · {project.status}
      </p>
      <h3>
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className="project-card-summary">{project.summary}</p>
      <TagList tags={project.stack.slice(0, 5)} />
      <div className="project-card-links">
        {actionLinks.map((link) =>
          isExternalUrl(link.href) ? (
            <a key={link.href} href={link.href} {...externalLinkProps}>
              {link.label}
            </a>
          ) : (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ),
        )}
        <Link href={`/projects/${project.slug}`}>Details</Link>
      </div>
    </article>
  );
}
