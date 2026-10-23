import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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

  return (
    <article className="case-study site-frame">
      <JsonLd data={projectStructuredData(project)} />
      <header className="case-study-header">
        <p className="case-study-meta">
          {project.category} · {project.status}
        </p>
        <h1>{project.title}</h1>
        <p className="case-study-what">{project.whatItIs}</p>
        <ul className="case-study-links">
          {project.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} {...externalLinkProps}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="case-study-stack">{project.stack.join(' · ')}</p>
      </header>

      <div className="case-study-quick">
        <section aria-labelledby="usage-title">
          <h2 id="usage-title">How to use it</h2>
          <ol className="usage-list">
            {project.usage.map((step) => (
              <li key={step.text}>
                <span>{step.text}</span>
                {step.link ? (
                  isExternalUrl(step.link.href) ? (
                    <a href={step.link.href} {...externalLinkProps}>
                      {step.link.label}
                    </a>
                  ) : (
                    <Link href={step.link.href}>{step.link.label}</Link>
                  )
                ) : null}
                {step.command ? <code>{step.command}</code> : null}
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="proof-title">
          <h2 id="proof-title">Proof</h2>
          <ul className="plain-list">
            {project.tldr.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <details className="case-study-notes">
        <summary>Engineering notes</summary>
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
