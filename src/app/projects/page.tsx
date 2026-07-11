import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { projects, type Project } from '@/data/projects';
import {
  featuredProjectSlugs,
  selectedProjectSlugs,
  siteConfig,
  toolFootnotes,
} from '@/data/site';
import { createMetadata, itemListJsonLd } from '@/lib/metadata';

export const metadata = createMetadata({
  title: `Projects – ${siteConfig.name}`,
  description:
    'Case studies of developer tools, multi-agent systems, and production web apps with architecture, tradeoffs, metrics, and source links.',
  path: '/projects',
  keywords: [
    'Subhajit Pradhan projects',
    'developer tools case studies',
    'multi-agent systems portfolio',
  ],
});

function WorkRow({ project }: { project: Project }) {
  const hasSeparateDemo = project.demo && project.demo !== project.github;

  return (
    <article className="work-row">
      <div>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>
          {project.status} / {project.year}
        </p>
      </div>
      <p>{project.oneLine}</p>
      <strong>{project.metrics[0]?.value}</strong>
      <nav aria-label={`${project.title} links`}>
        <Link href={`/projects/${project.slug}`}>Case study</Link>
        <a href={project.github} rel="noreferrer" target="_blank">
          Source
        </a>
        {hasSeparateDemo && project.demo ? (
          <a href={project.demo} rel="noreferrer" target="_blank">
            {project.demo.includes('npmjs.com') ? 'npm' : 'Demo'}
          </a>
        ) : null}
      </nav>
    </article>
  );
}

function pick(slugs: readonly string[]) {
  return slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
}

export default function ProjectsPage() {
  const featured = pick(featuredProjectSlugs);
  const selected = pick(selectedProjectSlugs);

  return (
    <>
      <JsonLd data={itemListJsonLd('Subhajit Pradhan project case studies', '/projects', projects)} />
      <section className="page-hero page-hero--compact">
        <p className="eyebrow">Project index</p>
        <h1>Selected work</h1>
        <p>
          Featured systems first, then product case studies. Each entry links to architecture,
          tradeoffs, metrics, and source.
        </p>
      </section>

      <section className="home-section" aria-labelledby="featured-index-heading">
        <div className="home-section__heading">
          <p className="kicker">Featured</p>
          <h2 id="featured-index-heading">Systems and tools</h2>
        </div>
        <div className="work-list index-grid">
          {featured.map((project) => (
            <WorkRow key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="selected-index-heading">
        <div className="home-section__heading">
          <p className="kicker">Selected</p>
          <h2 id="selected-index-heading">Product work</h2>
        </div>
        <div className="work-list index-grid">
          {selected.map((project) => (
            <WorkRow key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="footnote-index-heading">
        <div className="home-section__heading">
          <p className="kicker">Footnote</p>
          <h2 id="footnote-index-heading">Agent tooling</h2>
        </div>
        <div className="work-list">
          {toolFootnotes.map((tool) => (
            <article key={tool.title} className="work-row work-row--footnote">
              <div>
                <h3>{tool.title}</h3>
                <p>GitHub only</p>
              </div>
              <p>{tool.oneLine}</p>
              <strong>Agent skill</strong>
              <nav aria-label={`${tool.title} links`}>
                <a href={tool.github} rel="noreferrer" target="_blank">
                  Source
                </a>
              </nav>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
