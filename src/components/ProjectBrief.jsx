/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';

function ProjectBrief({ project }) {
  const decisions = project.decisions.slice(0, 3);
  const hasSeparateDemo = project.demo && project.demo !== project.github;

  return (
    <article className="project-brief">
      <div className="project-brief__header">
        <div>
          <p className="project-brief__role">{project.role}</p>
          <h3>{project.title}</h3>
        </div>
        <p>{project.oneLine}</p>
      </div>

      <div className="project-brief__details">
        <div>
          <h4>Problem</h4>
          <p>{project.problem}</p>
        </div>

        <div>
          <h4>Engineering decisions</h4>
          <ul className="decision-list">
            {decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Stack</h4>
          <p>{project.stack.join(' · ')}</p>
        </div>
      </div>

      <div className="project-brief__links">
        <Link
          aria-label={`Read ${project.title} case study`}
          to={`/projects/${project.slug}`}
        >
          Read case study
        </Link>
        <a
          aria-label={`Open ${project.title} GitHub repository`}
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        {hasSeparateDemo ? (
          <a
            aria-label={`Open ${project.title} live demo`}
            href={project.demo}
            target="_blank"
            rel="noreferrer"
          >
            Demo
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default ProjectBrief;
