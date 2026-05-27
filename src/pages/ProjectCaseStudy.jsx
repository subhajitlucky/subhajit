import { Link, useParams } from 'react-router-dom';
import projects from '../data/projects';

function ProjectCaseStudy() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="case-study case-study--not-found" aria-labelledby="project-not-found-heading">
        <p className="eyebrow">Project</p>
        <h1 id="project-not-found-heading">Project not found</h1>
        <p className="lede">
          This case study is not published yet. Return home to browse the available work.
        </p>
        <Link className="case-study__text-link" to="/">
          Back to home
        </Link>
      </section>
    );
  }

  const hasSeparateDemo = project.demo && project.demo !== project.github;

  return (
    <article className="case-study">
      <section className="case-study__hero" aria-labelledby="case-study-heading">
        <div className="case-study__intro">
          <p className="eyebrow">{project.role}</p>
          <h1 id="case-study-heading">{project.title}</h1>
          <p className="lede">{project.oneLine}</p>
        </div>

        <div className="case-study__meta" aria-label={`${project.title} metadata`}>
          <div className="case-study__stack">
            <span className="case-study__meta-label">Stack</span>
            <ul>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <nav className="case-study__links" aria-label={`${project.title} project links`}>
            <a href={project.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {hasSeparateDemo ? (
              <a href={project.demo} target="_blank" rel="noreferrer">
                Demo
              </a>
            ) : null}
          </nav>
        </div>
      </section>

      <div className="case-study__sections">
        <section className="case-study__section" aria-labelledby="case-study-problem">
          <h2 id="case-study-problem">Problem</h2>
          <p>{project.problem}</p>
        </section>

        <section className="case-study__section" aria-labelledby="case-study-workflow">
          <h2 id="case-study-workflow">Product workflow</h2>
          <p>{project.workflow}</p>
        </section>

        <section className="case-study__section" aria-labelledby="case-study-architecture">
          <h2 id="case-study-architecture">Architecture</h2>
          <p>{project.architecture}</p>
        </section>

        <section className="case-study__section" aria-labelledby="case-study-decisions">
          <h2 id="case-study-decisions">Key engineering decisions</h2>
          <ul className="case-study__list">
            {project.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>

        <section className="case-study__section" aria-labelledby="case-study-tradeoffs">
          <h2 id="case-study-tradeoffs">Tradeoffs and limitations</h2>
          <ul className="case-study__list">
            {project.tradeoffs.map((tradeoff) => (
              <li key={tradeoff}>{tradeoff}</li>
            ))}
          </ul>
        </section>

        <section className="case-study__section" aria-labelledby="case-study-improvements">
          <h2 id="case-study-improvements">Next improvements</h2>
          <ul className="case-study__list">
            {project.nextImprovements.map((improvement) => (
              <li key={improvement}>{improvement}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

export default ProjectCaseStudy;
