import React, { useState, useEffect } from 'react';
import '../styles/ResumePortfolio.css';
import projects from '../data/projects';
import SpaceBackground from './SpaceBackground';
import '../styles/SpaceTheme.css';

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
    const nextTheme = savedTheme || 'light';
    setTheme(nextTheme);
    document.body.setAttribute('data-theme', nextTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'space' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolioTheme', newTheme);
  };

  const skills = [
    { name: 'TypeScript', category: 'core' },
    { name: 'JavaScript', category: 'core' },
    { name: 'Solidity', category: 'core' },
    { name: 'Rust', category: 'core' },
    { name: 'Go', category: 'core' },
    { name: 'Python', category: 'core' },
    { name: 'C++', category: 'core' },
    { name: 'Java', category: 'core' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'React.js', category: 'frontend' },
    { name: 'Express.js', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'REST', category: 'frontend' },
    { name: 'GraphQL', category: 'frontend' },
    { name: 'Ethereum', category: 'backend' },
    { name: 'ICP', category: 'backend' },
    { name: 'Solana', category: 'backend' },
    { name: 'NFT', category: 'backend' },
    { name: 'Hardhat', category: 'backend' },
    { name: 'Ethers.js', category: 'backend' },
    { name: 'Web3.js', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    { name: 'MongoDB', category: 'backend' },
    { name: 'MySQL', category: 'backend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Prisma', category: 'backend' },
    { name: 'Git', category: 'tool' },
    { name: 'Docker', category: 'tool' },
    { name: 'GitHub Actions', category: 'tool' },
    { name: 'Postman', category: 'tool' },
  ];

  const skillGroups = {
    Core: skills.filter((skill) => skill.category === 'core'),
    Frontend: skills.filter((skill) => skill.category === 'frontend'),
    Blockchain: skills.filter((skill) => skill.category === 'backend').slice(0, 7),
    Platform: skills.filter((skill) => skill.category === 'backend').slice(7).concat(skills.filter((skill) => skill.category === 'tool')),
  };

  const resumePath = `${import.meta.env.BASE_URL}resume.pdf`.replace('//', '/');

  return (
    <>
      {theme === 'space' && <SpaceBackground />}
      <div className="resume-wrapper">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'light' ? 'Switch to Cosmic Mode' : 'Switch to Document Mode'}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>

        <main className="resume-container">
          <section className="hero-grid">
            <div className="hero-panel">
              <span className="kicker">DESIGN SYSTEM V3</span>
              <h1>Subhajit Pradhan</h1>
              <p className="headline">Full-Stack + Blockchain Engineer crafting AI-native products.</p>
              <p className="bio">
                Building production systems where modern frontend engineering, secure backend logic, and Web3 interactions meet.
                I focus on fast UX, clear architecture, and deployable outcomes.
              </p>
              <div className="action-row">
                <a href={resumePath} target="_blank" rel="noopener noreferrer" className="resume-btn">
                  <FileTextIcon /> <span>Open Resume</span>
                </a>
                <div className="location-chip">
                  <MapPinIcon /> Odisha, India
                </div>
              </div>
            </div>

            <aside className="meta-rail">
              <div className="meta-block">
                <h3>Contact</h3>
                <a href="mailto:subhajitpradhan310@gmail.com" className="meta-link"><MailIcon /> Email</a>
                <a href="https://linkedin.com/in/subhajitlucky" target="_blank" rel="noopener noreferrer" className="meta-link"><LinkedinIcon /> LinkedIn</a>
                <a href="https://github.com/subhajitlucky" target="_blank" rel="noopener noreferrer" className="meta-link"><GithubIcon /> GitHub</a>
              </div>
              <div className="meta-block metrics">
                <div><strong>4+</strong><span>Flagship Builds</span></div>
                <div><strong>AI + Web3</strong><span>Primary Domain</span></div>
                <div><strong>Remote</strong><span>Team Ready</span></div>
              </div>
            </aside>
          </section>

          <section className="experience-strip">
            <article><strong>2026</strong><span>Associate Blockchain Developer Intern · uElement</span></article>
            <article><strong>2025</strong><span>Blockchain Developer Trainee · QuadB</span></article>
            <article><strong>BCA</strong><span>Centurion University · CGPA 8.9</span></article>
          </section>

          <section className="section skills-section">
            <h2 className="section-title">Skill Matrix</h2>
            <div className="skill-columns">
              {Object.entries(skillGroups).map(([groupName, list]) => (
                <article key={groupName} className="skill-group">
                  <h3>{groupName}</h3>
                  <div className="skills-grid">
                    {list.map((skill) => (
                      <span key={`${groupName}-${skill.name}`} className={`skill-tag ${skill.category}`}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section github-shell">
            <h2 className="section-title">Contribution Pulse</h2>
            <div className="github-stats">
              <img
                src="https://ghchart.rshah.org/2b6cb0/subhajitlucky"
                alt="Subhajit's Github Chart"
                style={{ width: '100%', minHeight: '120px' }}
              />
            </div>
          </section>

          <section className="section projects-shell">
            <h2 className="section-title">Selected Work</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article key={project.title} className="project-card">
                  <span className="project-step">{String(index + 1).padStart(2, '0')}</span>
                  <div className="project-body">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-title">
                      {project.title} <ExternalLinkIcon />
                    </a>
                    <p className="project-description">{project.description}</p>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        View source
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className="portfolio-footer">
            <p>© {new Date().getFullYear()} Subhajit Pradhan</p>
          </footer>
        </main>
      </div>
    </>
  );
};

export default ResumePortfolio;
