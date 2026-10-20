import type { Metadata } from 'next';
import { ProjectsExplorer } from '@/components/ProjectsExplorer';
import { listedProjects, type ProjectIndexItem } from '@/data/projects';
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
  const indexItems: ProjectIndexItem[] = listedProjects.map(
    ({ slug, title, status, category, roles, summary, links }) => ({
      slug,
      title,
      status,
      category,
      roles,
      summary,
      links,
    }),
  );

  return (
    <div className="projects-index site-frame">
      <header className="projects-index-header">
        <h1>Selected work</h1>
        <p>Ten selected projects across developer tools, AI systems, full-stack products, and data visualization.</p>
      </header>
      <ProjectsExplorer projects={indexItems} />
    </div>
  );
}
