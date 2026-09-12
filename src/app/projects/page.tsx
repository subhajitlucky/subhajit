import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { projects, type Project } from '@/data/projects';
import { featuredProjectSlugs, selectedProjectSlugs, siteConfig, toolFootnotes } from '@/data/site';
import { createMetadata, itemListJsonLd } from '@/lib/metadata';

export const metadata = createMetadata({
  title: `Projects – ${siteConfig.name}`,
  description: 'Selected software projects with source, architecture, and engineering proof.',
  path: '/projects',
  keywords: ['Subhajit Pradhan projects', 'developer tools', 'software engineering portfolio'],
});

function WorkRow({ project, featured = false }: { project: Project; featured?: boolean }) {
  const hasSeparateDemo = project.demo && project.demo !== project.github;

  return (
    <article className={`work-row${featured ? ' work-row--featured' : ''}`}>
      <div className="work-row__identity">
        <div className="work-row__meta">{project.status} · {project.year}</div>
        <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.tags.join(' · ')}</p>
      </div>
      <p className="work-row__summary">{project.oneLine}</p>
      <div className="work-row__proof">
        {project.proof.slice(0, 2).map((item) => <span key={item}>{item}</span>)}
      </div>
      <nav className="work-row__links" aria-label={`${project.title} links`}>
        <Link href={`/projects/${project.slug}`}>Case study</Link>
        <a href={project.github} rel="noreferrer" target="_blank">GitHub</a>
        {hasSeparateDemo && project.demo ? <a href={project.demo} rel="noreferrer" target="_blank">{project.demo.includes('npmjs.com') ? 'npm' : 'Live'}</a> : null}
      </nav>
    </article>
  );
}

function pick(slugs: readonly string[]) {
  return slugs.map((slug) => projects.find((project) => project.slug === slug)).filter((project): project is Project => Boolean(project));
}

export default function ProjectsPage() {
  const featured = pick(featuredProjectSlugs);
  const selected = pick(selectedProjectSlugs);

  return (
    <>
      <JsonLd data={itemListJsonLd('Subhajit Pradhan project case studies', '/projects', projects)} />
      <section className="projects-intro" aria-labelledby="projects-title">
        <div>
          <p className="eyebrow">Projects / 2026</p>
          <h1 id="projects-title">Software I built and shipped.</h1>
        </div>
        <p>Developer tools, AI systems, security tooling, and full-stack products. Source and case studies are linked for inspection.</p>
      </section>

      <section className="projects-section" aria-labelledby="featured-heading">
        <div className="projects-section__heading">
          <p className="kicker">01 / Featured</p>
          <h2 id="featured-heading">Developer tools first.</h2>
          <p>The projects I would show an engineering interviewer first.</p>
        </div>
        <div className="work-list">{featured.map((project) => <WorkRow key={project.slug} project={project} featured />)}</div>
      </section>

      <section className="projects-section" aria-labelledby="selected-heading">
        <div className="projects-section__heading">
          <p className="kicker">02 / Selected</p>
          <h2 id="selected-heading">Product work.</h2>
          <p>Full-stack systems that show product delivery beyond tooling.</p>
        </div>
        <div className="work-list">{selected.map((project) => <WorkRow key={project.slug} project={project} />)}</div>
      </section>

      <section className="projects-footnote" aria-labelledby="footnote-heading">
        <div>
          <p className="kicker">03 / Other tooling</p>
          <h2 id="footnote-heading">Small repos, useful ideas.</h2>
        </div>
        <div className="tool-footnotes">
          {toolFootnotes.map((tool) => (
            <article key={tool.title}>
              <strong>{tool.title}</strong>
              <p>{tool.oneLine}</p>
              <a href={tool.github} rel="noreferrer" target="_blank">GitHub →</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
