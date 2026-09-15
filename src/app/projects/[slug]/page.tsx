import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/data/projects';
import { createProjectMetadata } from '@/lib/metadata';
import { externalLinkProps } from '@/lib/urls';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return createProjectMetadata(project);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="case-study site-frame">
      <header className="case-study-header">
        <p className="case-study-meta">
          {project.category} · {project.status}
        </p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <ul className="case-study-links">
          {project.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} {...externalLinkProps}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <div className="case-study-body">
        <section aria-labelledby="problem-title">
          <h2 id="problem-title">Problem</h2>
          <p>{project.problem}</p>
        </section>

        <section aria-labelledby="system-title">
          <h2 id="system-title">System</h2>
          <p>{project.system}</p>
        </section>

        <section aria-labelledby="proof-title">
          <h2 id="proof-title">Proof</h2>
          <ul className="plain-list">
            {project.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="architecture-title">
          <h2 id="architecture-title">Architecture</h2>
          <ol className="flow-list" aria-label="Architecture flow">
            {project.flow.map((step) => (
              <li key={step.label}>
                <strong>{step.label}</strong>
                <span>{step.detail}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="decisions-title">
          <h2 id="decisions-title">Decisions</h2>
          <ul className="plain-list">
            {project.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tradeoffs-title">
          <h2 id="tradeoffs-title">Tradeoffs and limitations</h2>
          <ul className="plain-list">
            {project.tradeoffs.map((tradeoff) => (
              <li key={tradeoff}>{tradeoff}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="technologies-title">
          <h2 id="technologies-title">Technologies</h2>
          <ul className="plain-list plain-list-inline">
            {project.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
