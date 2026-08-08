import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLink } from '@/components/ArrowLink';
import { SectionLabel } from '@/components/SectionLabel';
import { projects, secondaryProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Selected work | Subhajit Pradhan',
  description: 'Developer tools, AI systems, and full-stack product work by Subhajit Pradhan.',
};

export default function ProjectsPage() {
  return (
    <div className="projects-index site-frame">
      <header className="projects-index-header">
        <SectionLabel index="Index">Selected work</SectionLabel>
        <h1>Tools and systems built for evidence, not theater.</h1>
        <p>
          Six projects across developer tooling, database security, agent infrastructure,
          multi-agent products, learning systems, and coordination protocols.
        </p>
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
        {secondaryProjects.length} additional systems are included to show adjacent product and
        protocol range. Repository creation dates are intentionally not used as a quality signal.
      </p>
    </div>
  );
}
