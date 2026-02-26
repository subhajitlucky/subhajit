import React, { useState, useEffect } from 'react';
import projects from '../data/projects';
import blogTopics from '../data/blogTopics';
import SpaceBackground from './SpaceBackground';
import '../styles/ModernTheme.css';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const ExternalLinkIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
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
    { name: 'Solidity', category: 'core' },
    { name: 'Rust', category: 'core' },
    { name: 'Go', category: 'core' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'React', category: 'frontend' },
    { name: 'Tailwind', category: 'frontend' },
    { name: 'Ethereum', category: 'blockchain' },
    { name: 'Solana', category: 'blockchain' },
    { name: 'Node.js', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    { name: 'Docker', category: 'tools' },
  ];

  const resumePath = `${import.meta.env.BASE_URL}resume.pdf`.replace('//', '/');

  return (
    <div className="portfolio-root">
      {theme === 'space' && <SpaceBackground />}
      <div className="cosmic-overlay" />
      
      <button className="theme-switch" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>

      <main>
        {/* HERO SECTION */}
        <section className="hero section-padding">
          <div className="container">
            <span className="hero-kicker reveal">DESIGN SYSTEM V4</span>
            <h1 className="reveal reveal-delay-1">Subhajit<br />Pradhan</h1>
            <p className="hero-bio reveal reveal-delay-2">
              Full-Stack + Blockchain Engineer crafting <strong>AI-native</strong> products. 
              Building the intent-centric future of Web3.
            </p>
            <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href={resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-primary pulse">
                View Resume
              </a>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://github.com/subhajitlucky" target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label="GitHub">
                  <GithubIcon />
                </a>
                <a href="https://linkedin.com/in/subhajitlucky" target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE STRIP */}
        <section className="section-padding" style={{ background: 'var(--surface-muted)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
              <div className="reveal">
                <span className="hero-kicker">CURRENT</span>
                <h3>uElement</h3>
                <p style={{ color: 'var(--text-muted)' }}>Blockchain Intern · 2026</p>
              </div>
              <div className="reveal reveal-delay-1">
                <span className="hero-kicker">PREVIOUS</span>
                <h3>QuadB</h3>
                <p style={{ color: 'var(--text-muted)' }}>Blockchain Trainee · 2025</p>
              </div>
              <div className="reveal reveal-delay-2">
                <span className="hero-kicker">EDUCATION</span>
                <h3>Centurion University</h3>
                <p style={{ color: 'var(--text-muted)' }}>BCA · CGPA 8.9</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section-padding">
          <div className="container">
            <h2 className="reveal" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '48px' }}>Selected Work</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {projects.map((project, i) => (
                <article key={project.title} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="project-card">
                    <span className="project-tag">0{i + 1}</span>
                    <h3>{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-footer">
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: 'var(--accent)' }}>
                          Live Demo <ExternalLinkIcon />
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: 'var(--text-muted)' }}>
                          Source <GithubIcon size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section-padding" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
              <div className="reveal">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Toolkit</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                  A specialized stack for high-performance blockchain applications and AI-driven interfaces.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}>
                  {skills.map(skill => (
                    <span key={skill.name} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="reveal reveal-delay-2">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Focus Areas</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
                  Core domains where I apply my engineering efforts.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {blogTopics.map(topic => (
                    <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                      <span style={{ fontWeight: 500 }}>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="section-padding" style={{ borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <div className="container">
            <p style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Subhajit Pradhan. Built for the Decentralized Web.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ResumePortfolio;
