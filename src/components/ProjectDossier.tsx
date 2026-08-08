import Link from 'next/link';
import { ArrowLink } from '@/components/ArrowLink';
import type { Project } from '@/data/projects';

type ProjectDossierProps = {
  project: Project;
};

export function ProjectDossier({ project }: ProjectDossierProps) {
  return (
    <article className="project-dossier" data-testid="featured-project">
      <div className="project-number" aria-hidden="true">
        {project.index}
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="project-summary">{project.summary}</p>
        <dl className="project-sequence">
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>System</dt>
            <dd>{project.system}</dd>
          </div>
          <div>
            <dt>Proof</dt>
            <dd>{project.proof[0]}</dd>
          </div>
        </dl>
        <div className="project-actions">
          <ArrowLink href={`/projects/${project.slug}`}>Read case study</ArrowLink>
          {project.links.slice(0, 2).map((link) => (
            <ArrowLink href={link.href} key={link.href}>
              {link.label}
            </ArrowLink>
          ))}
        </div>
      </div>
    </article>
  );
}
