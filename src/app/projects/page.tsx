import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { externalLinkProps } from '@/lib/urls';

const description = 'Developer tools, AI systems, and full-stack product work by Subhajit Pradhan.';

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
        <p>Six public projects across developer tools, AI systems, and full-stack products.</p>
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
