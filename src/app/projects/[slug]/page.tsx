import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ButtonLink from '@/components/ButtonLink';
import JsonLd from '@/components/JsonLd';
import { getProject, projects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { createMetadata, projectJsonLd } from '@/lib/metadata';

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
    return createMetadata({
      title: `Project not found – ${siteConfig.name}`,
      description: siteConfig.description,
      path: `/projects/${slug}`,
    });
  }

  return createMetadata({
    title: `${project.title} case study – ${siteConfig.name}`,
    description: project.description,
    path: `/projects/${project.slug}`,
    keywords: project.seoKeywords,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const hasSeparateDemo = project.demo && project.demo !== project.github;

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <article className="case-study">
        <Link className="back-link" href="/projects">
          Projects
        </Link>
        <header className="case-study__hero">
          <div>
            <p className="eyebrow">{project.role}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>
          <aside aria-label={`${project.title} metadata`}>
            <dl>
              <div>
                <dt>Status</dt>
                <dd>{project.status}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{project.stack.join(', ')}</dd>
              </div>
            </dl>
            <div className="case-study__actions">
              <ButtonLink href={project.github} external variant="primary">
                GitHub
              </ButtonLink>
              {hasSeparateDemo && project.demo ? (
                <ButtonLink href={project.demo} external variant="secondary">
                  Live Demo
                </ButtonLink>
              ) : null}
            </div>
            <div className="inspection-links">
              <h2>Inspect the code</h2>
              <ul>
                {project.inspectionLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} rel="noreferrer" target="_blank">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </header>

        <section className="project-visual" aria-labelledby="project-visual-heading">
          <div>
            <p className="eyebrow">Workflow proof</p>
            <h2 id="project-visual-heading">{project.visual.title}</h2>
            <p>{project.visual.caption}</p>
          </div>
          <ol>
            {project.visual.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <div className="case-study__sections">
          <section>
            <h2>Proof</h2>
            <ul>
              {project.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>Users and context</h2>
            <p>{project.usersOrContext}</p>
          </section>
          <section>
            <h2>Product workflow</h2>
            <p>{project.workflow}</p>
          </section>
          <section>
            <h2>Architecture</h2>
            <p>{project.architecture}</p>
          </section>
          <section>
            <h2>Key engineering decisions</h2>
            <ul>
              {project.decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Tradeoffs and limitations</h2>
            <ul>
              {project.tradeoffs.map((tradeoff) => (
                <li key={tradeoff}>{tradeoff}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Next improvements</h2>
            <ul>
              {project.nextImprovements.map((improvement) => (
                <li key={improvement}>{improvement}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
