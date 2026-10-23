import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CopyCommand } from '@/components/CopyCommand';
import { JsonLd } from '@/components/JsonLd';
import { getProject, projects } from '@/data/projects';
import { createProjectMetadata } from '@/lib/metadata';
import { projectStructuredData } from '@/lib/structured-data';
import { externalLinkProps, isExternalUrl } from '@/lib/urls';

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

  const primaryLink =
    project.links.find((link) => link.kind === 'live') ??
    project.links.find((link) => link.kind === 'package') ??
    project.links.find((link) => link.kind === 'source') ??
    project.links[0];
  const secondaryLinks = project.links.filter(
    (link) => link !== primaryLink && link.kind !== 'evidence',
  );
  const evidenceLinks = project.links.filter((link) => link.kind === 'evidence');

  return (
    <article className="case-study site-frame">
      <JsonLd data={projectStructuredData(project)} />
      <header className="case-study-header">
        <p className="case-study-meta">
          <span className="case-study-category">{project.category}</span>
          <span className="case-study-status">{project.status}</span>
        </p>
        <h1>{project.title}</h1>
        <p className="case-study-what">{project.whatItIs}</p>
        <div className="case-study-actions">
          {primaryLink ? (
            <a
              className="button button-primary"
              href={primaryLink.href}
              {...(isExternalUrl(primaryLink.href) ? externalLinkProps : {})}
            >
              {primaryLink.label}
              {isExternalUrl(primaryLink.href) ? <span aria-hidden="true">↗</span> : null}
            </a>
          ) : null}
          {secondaryLinks.map((link) => (
            <a
              className="button button-secondary"
              key={link.href}
              href={link.href}
              {...(isExternalUrl(link.href) ? externalLinkProps : {})}
            >
              {link.label}
              {isExternalUrl(link.href) ? <span aria-hidden="true">↗</span> : null}
            </a>
          ))}
        </div>
        {evidenceLinks.length > 0 ? (
          <ul className="case-study-evidence-links" aria-label="More evidence">
            {evidenceLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} {...externalLinkProps}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="stack-list" aria-label="Technologies">
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </header>

      <div className="case-study-quick">
        <section className="quick-panel" aria-labelledby="usage-title">
          <h2 id="usage-title">How to use it</h2>
          <ol className="usage-list">
            {project.usage.map((step) => (
              <li key={step.text}>
                <div className="usage-step">
                  <span>{step.text}</span>
                  {step.link ? (
                    isExternalUrl(step.link.href) ? (
                      <a className="usage-link" href={step.link.href} {...externalLinkProps}>
                        {step.link.label}
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <Link className="usage-link" href={step.link.href}>
                        {step.link.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    )
                  ) : null}
                  {step.command ? <CopyCommand command={step.command} /> : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="quick-panel" aria-labelledby="proof-title">
          <h2 id="proof-title">Proof</h2>
          <ul className="proof-list">
            {project.tldr.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <details className="case-study-notes">
        <summary>
          <span className="notes-label">
            <span className="notes-title">Engineering notes</span>
            <span className="notes-hint">Problem, architecture, decisions, tradeoffs, and full proof</span>
          </span>
          <svg className="notes-icon" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M4 6l4 4 4-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </summary>
        <div className="case-study-body">
          <section aria-labelledby="problem-title">
            <h2 id="problem-title">Problem</h2>
            <p>{project.problem}</p>
          </section>

          <section aria-labelledby="system-title">
            <h2 id="system-title">System</h2>
            <p>{project.system}</p>
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

          <section aria-labelledby="full-proof-title">
            <h2 id="full-proof-title">Full proof</h2>
            <ul className="plain-list">
              {project.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </details>
    </article>
  );
}
