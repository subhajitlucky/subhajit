import type { Metadata } from 'next';
import { ProjectsExplorer } from '@/components/ProjectsExplorer';
import { projects } from '@/data/projects';
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
        <h1>Selected work</h1>
        <p>Eleven public projects across developer tools, AI systems, data visualization, and Web3.</p>
      </header>
      <ProjectsExplorer projects={projects} />
    </div>
  );
}
