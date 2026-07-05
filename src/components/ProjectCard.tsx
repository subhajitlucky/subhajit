import Link from 'next/link';
import type { Project } from '@/data/projects';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__topline">
        <span>{project.status}</span>
        <span>{project.year}</span>
      </div>
      <h3>
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>
      <p>{project.oneLine}</p>
      <dl className="project-card__metrics" aria-label={`${project.title} metrics`}>
        {project.metrics.slice(0, 2).map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      <ul className="evidence-list" aria-label={`${project.title} proof`}>
        {project.proof.slice(0, 2).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul className="tag-list" aria-label={`${project.title} stack`}>
        {project.stack.slice(0, 4).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="project-card__links">
        <Link href={`/projects/${project.slug}`}>
          Case study
        </Link>
        <a href={project.github} rel="noreferrer" target="_blank">
          Source
        </a>
      </div>
    </article>
  );
}
