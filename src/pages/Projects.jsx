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
        <h1>Projects</h1>
        <p className="projects-intro">
          Here are my featured projects showcasing expertise in blockchain development,
          full-stack web applications, and modern JavaScript technologies. Each project demonstrates
          real-world problem solving and implementation of industry best practices.
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card ${project.featured ? 'featured' : ''}`}>
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-year">{project.year}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                <span className="tech-label">Tech:</span>
                <span className="tech-stack">{project.tech}</span>
              </div>

              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  🔗 GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link demo-link"
                  >
                    🚀 Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="more-projects">
          <p>
            View all my projects on{" "}
            <a
              href="https://github.com/subhajitlucky?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}

export default Projects; 