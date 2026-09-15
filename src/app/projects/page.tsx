import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLink } from '@/components/ArrowLink';
import { SectionLabel } from '@/components/SectionLabel';
import { projects, secondaryProjects } from '@/data/projects';
import { siteConfig } from '@/data/site';

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
        <SectionLabel index="All">Projects</SectionLabel>
        <h1>Selected projects</h1>
        <p>Six public projects spanning developer tools, AI systems, and full-stack products.</p>
      </header>
      <ol className="projects-index-list">
        {projects.map((project) => (
          <li data-testid="project-index-item" key={project.slug}>
            <span className="index-number">{project.index}</span>
            <div className="index-project-copy">
              <p>
                {project.category} · {project.status}
              </p>
              <h2>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h2>
              <p>{project.summary}</p>
            </div>
            <div className="index-project-actions">
              <ArrowLink href={`/projects/${project.slug}`}>Case study</ArrowLink>
              {project.links[0] ? (
                <ArrowLink href={project.links[0].href}>{project.links[0].label}</ArrowLink>
              ) : null}
              <span>{project.featured ? 'Featured' : 'Additional work'}</span>
            </div>
          </li>
        ))}
      </ol>
      <p className="projects-index-note">
        {secondaryProjects.length} additional projects are included beyond the four featured on the
        homepage.
      </p>
    </div>
  );
}
