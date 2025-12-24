import React, { useState, useEffect } from 'react';
import '../styles/ResumePortfolio.css';
import projects from '../data/projects';
import SpaceBackground from './SpaceBackground';
import '../styles/SpaceTheme.css';

// Icons
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const FileTextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);

const ResumePortfolio = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute('data-theme', savedTheme);
    } else {
      setTheme('light');
      document.body.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'space' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolioTheme', newTheme);
  };

  const skills = [
    { name: "C", category: "core" },
    { name: "C++", category: "core" },
    { name: "Java", category: "core" },
    { name: "Python", category: "core" },
    { name: "Rust", category: "core" },
    { name: "Go", category: "core" },
    
    { name: "JavaScript", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "React.js", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "TailwindCSS", category: "frontend" },

    { name: "Node.js", category: "backend" },
    { name: "MySQL", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "MongoDB", category: "backend" },
    { name: "Prisma", category: "backend" },

    { name: "Solidity", category: "web3" },
    { name: "Ethers.js", category: "web3" },

    { name: "Git", category: "tool" },
  ];

  // Base URL logic for resume path (works for local and gh-pages)
  const resumePath = `${import.meta.env.BASE_URL}assets/Subhajit_Resume.pdf`.replace('//', '/');

  return (
    <>
      {theme === 'space' && <SpaceBackground />}
      
      <div className="resume-wrapper">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'light' ? "Switch to Cosmic Mode" : "Switch to Document Mode"}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>

        <div className="resume-container">
          {/* Header */}
          <header className="resume-header">
            <div className="header-content">
              <h1>Subhajit Pradhan</h1>
              <span className="title">Software Engineer & Developer</span>
              <p className="bio">
                Building decentralized applications and high-performance web systems. 
                Expertise in modern frontend frameworks, smart contracts, and scalable backend architecture.
              </p>
            </div>
            <div className="contact-info">
              <div className="location">
                <MapPinIcon />
                <span>Odisha, India</span>
              </div>
              <div className="social-icons">
                <a 
                  href="mailto:subhajitpradhan310@gmail.com" 
                  title="Send Email"
                  aria-label="Email"
                >
                  <MailIcon />
                </a>
                <a href="https://linkedin.com/in/subhajitlucky" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <LinkedinIcon />
                </a>
                <a href="https://github.com/subhajitlucky" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <GithubIcon />
                </a>
              </div>
              <a href={resumePath} target="_blank" rel="noopener noreferrer" className="resume-btn">
                <FileTextIcon /> <span>Resume</span>
              </a>
            </div>
          </header>

          {/* Skills */}
          <section className="section">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <span key={index} className={`skill-tag ${skill.category}`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* GitHub Contributions */}
          <section className="section">
            <h2 className="section-title">GitHub Contributions</h2>
            <div className="github-stats">
                <img 
                  src="https://ghchart.rshah.org/2b6cb0/subhajitlucky" 
                  alt="Subhajit's Github Chart" 
                  style={{ width: '100%', minHeight: '100px' }}
                />
            </div>
          </section>

          {/* Projects */}
          <section className="section">
            <h2 className="section-title">Proof of Work</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-title">
                      {project.title} <ExternalLinkIcon />
                    </a>
                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                          Source
                    </a>
                      )}
                    </div>
                  </div>
                  <p className="project-description">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          
          {/* Footer */}
          <footer style={{ marginTop: 'auto', paddingTop: '30px', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <p>© {new Date().getFullYear()} Subhajit Pradhan.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ResumePortfolio;
