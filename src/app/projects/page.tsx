import JsonLd from '@/components/JsonLd';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { createMetadata, itemListJsonLd } from '@/lib/metadata';

export const metadata = createMetadata({
  title: `Projects – ${siteConfig.name}`,
  description:
    'Case studies by Subhajit Pradhan covering full-stack products, blockchain applications, AI workflows, APIs, data, and deployment.',
  path: '/projects',
  keywords: ['Subhajit Pradhan projects', 'Subhajit Pradhan developer portfolio'],
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd('Subhajit Pradhan project case studies', '/projects', projects)} />
      <section className="page-hero page-hero--compact">
        <p className="eyebrow">Project index</p>
        <h1>Project case studies by Subhajit Pradhan</h1>
        <p>
          Full-stack, blockchain, and AI product work with problem framing, architecture,
          decisions, tradeoffs, source links, and live demos where available.
        </p>
      </section>
      <section className="index-grid" aria-label="Project case studies">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </>
  );
}
