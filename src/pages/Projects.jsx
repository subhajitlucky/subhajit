import '../styles/Projects.css';
import SpaceBackground from '../components/SpaceBackground';
import ScrollToTop from '../components/ScrollToTop';
import useSpaceTheme from '../hooks/useSpaceTheme';
import projects from '../data/projects';

function Projects() {
  const isSpaceTheme = useSpaceTheme();

  return (
    <div className="projects-page">
      {/* Complete Cosmic Elements - Only show in space theme */}
      {isSpaceTheme && <SpaceBackground />}

      <div className="container">
        <div className="projects-header">
          <h1>Things I've Built</h1>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <article key={index} className="project-item">
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}

export default Projects; 