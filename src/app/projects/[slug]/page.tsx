import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArchitectureFlow } from '@/components/ArchitectureFlow';
import { EvidenceLinks } from '@/components/EvidenceLinks';
import { ProjectNavigation } from '@/components/ProjectNavigation';
import { SectionLabel } from '@/components/SectionLabel';
import { getProject, projects } from '@/data/projects';
import { siteConfig } from '@/data/site';

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
    return { title: 'Project not found' };
  }

  return {
    title: `${project.title} case study | ${siteConfig.name}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="case-study">
      <header className="case-study-header site-frame">
        <div className="case-study-labels">
          <SectionLabel index={project.index}>{project.category}</SectionLabel>
          <span>{project.status}</span>
        </div>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <EvidenceLinks links={project.links} />
      </header>

      <div className="case-study-body site-frame">
        <section className="case-study-block" aria-labelledby="problem-title">
          <SectionLabel index="01">Context</SectionLabel>
          <div>
            <h2 id="problem-title">Problem</h2>
            <p className="case-study-lede">{project.problem}</p>
          </div>
        </section>

        <section className="case-study-block" aria-labelledby="system-title">
          <SectionLabel index="02">Approach</SectionLabel>
          <div>
            <h2 id="system-title">System</h2>
            <p className="case-study-lede">{project.system}</p>
          </div>
        </section>

        <section className="case-study-block" aria-labelledby="proof-title">
          <SectionLabel index="03">Evidence</SectionLabel>
          <div>
            <h2 id="proof-title">Proof</h2>
            <ul className="case-study-list">
              {project.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-study-block architecture-block" aria-labelledby="architecture-title">
          <SectionLabel index="04">Workflow</SectionLabel>
          <div>
            <h2 id="architecture-title">Architecture</h2>
            <ArchitectureFlow steps={project.flow} />
          </div>
        </section>

        <section className="case-study-block" aria-labelledby="decisions-title">
          <SectionLabel index="05">Judgment</SectionLabel>
          <div>
            <h2 id="decisions-title">Decisions</h2>
            <ul className="case-study-list">
              {project.decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-study-block" aria-labelledby="tradeoffs-title">
          <SectionLabel index="06">Boundaries</SectionLabel>
          <div>
            <h2 id="tradeoffs-title">Tradeoffs and limitations</h2>
            <ul className="case-study-list">
              {project.tradeoffs.map((tradeoff) => (
                <li key={tradeoff}>{tradeoff}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-study-block technologies-block" aria-labelledby="technologies-title">
          <SectionLabel index="07">Stack</SectionLabel>
          <div>
            <h2 id="technologies-title">Technologies</h2>
            <ul>
              {project.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="site-frame">
        <ProjectNavigation slug={project.slug} />
      </div>
    </article>
  );
}
