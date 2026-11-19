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

  const commands = project.usage ?? [];

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
              {isExternalUrl(link.href) ? (
                <a href={link.href} {...externalLinkProps}>
                  {link.label}
                </a>
              ) : (
                <Link href={link.href}>{link.label}</Link>
              )}
            </li>
          ))}
        </ul>
        <p className="case-study-stack">{project.stack.join(' · ')}</p>
      </header>

      {commands.length > 0 ? (
        <section className="case-study-try" aria-labelledby="try-title">
          <h2 id="try-title">Try it</h2>
          <ol className="usage-list">
            {commands.map((step) => (
              <li key={step.text}>
                <span>{step.text}</span>
                <code>{step.command}</code>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="case-study-body">
        <section aria-labelledby="problem-title">
          <h2 id="problem-title">Problem</h2>
          <p>{project.problem}</p>
        </section>

        <section aria-labelledby="system-title">
          <h2 id="system-title">What I built</h2>
          <p>{project.system}</p>
        </section>

        {project.flow ? (
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
        ) : null}

        <section aria-labelledby="decisions-title">
          <h2 id="decisions-title">Decisions</h2>
          <ul className="plain-list">
            {project.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="evidence-title">
          <h2 id="evidence-title">Evidence</h2>
          <ul className="plain-list">
            {project.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="limits-title">
          <h2 id="limits-title">Limits</h2>
          <ul className="plain-list">
            {project.tradeoffs.map((tradeoff) => (
              <li key={tradeoff}>{tradeoff}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
