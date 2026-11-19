import type { Metadata } from 'next';
import Link from 'next/link';
import { projects, supportingWork } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { externalLinkProps } from '@/lib/urls';

const description =
  'Four case studies across developer tools, AI systems, and full-stack product work by Subhajit Pradhan.';

export const metadata: Metadata = {
  title: 'Selected work',
  description,
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: `Selected work | ${siteConfig.name}`,
    description,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Selected work | ${siteConfig.name}`,
    description,
    images: ['/opengraph-image'],
  },
};

export default function ProjectsPage() {
  return (
    <div className="projects-index site-frame">
      <header className="projects-index-header">
        <h1>Selected work</h1>
        <p>Four case studies across developer tools, AI systems, and full-stack products. Supporting work below.</p>
      </header>

      <ol className="projects-index-list">
        {projects.map((project) => {
          const source = project.links.find((link) => link.kind === 'source');

          return (
            <li data-testid="project-index-item" key={project.slug}>
              <div className="index-project-copy">
                <p className="index-project-meta">
                  {project.category} · {project.status}
                </p>
                <h2>
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                <p>{project.summary}</p>
              </div>
              <div className="index-project-actions">
                <Link href={`/projects/${project.slug}`} aria-label={`${project.title} details`}>
                  Details
                </Link>
                {source ? (
                  <a
                    href={source.href}
                    aria-label={`${source.label} for ${project.title}`}
                    {...externalLinkProps}
                  >
                    {source.label}
                  </a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <section className="more-work" aria-labelledby="more-work-title">
        <h2 id="more-work-title">More work</h2>
        <ul className="more-work-list">
          {supportingWork.map((item) => (
            <li key={item.title} data-testid="more-work-item">
              <div className="more-work-copy">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <p className="more-work-status">{item.status}</p>
              <div className="more-work-links">
                {item.links.map((link) => (
                  <a key={link.href} href={link.href} {...externalLinkProps}>
                    {link.label}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
