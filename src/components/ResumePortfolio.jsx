import React, { useState, useEffect } from 'react';
import projects from '../data/projects';
import blogTopics from '../data/blogTopics';
import SpaceBackground from './SpaceBackground';
import '../styles/ModernTheme.css';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const ExternalLinkIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
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
    { name: 'React', category: 'frontend' },
    { name: 'Ethereum', category: 'blockchain' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Docker', category: 'tools' },
  ];

  const resumePath = `${import.meta.env.BASE_URL}resume.pdf`.replace('//', '/');

  return (
    <div className="portfolio-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '24px 0' }}>
      {theme === 'space' && <SpaceBackground />}
      <div className="cosmic-overlay" />
      
      <button className="theme-switch" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>

      <main className="container" style={{ width: '100%' }}>
        <div className="bento-grid">
          {/* HERO PANEL (8 Cols) */}
          <div className="bento-item reveal" style={{ gridColumn: 'span 8' }}>
            <span className="hero-kicker">DESIGN SYSTEM V4 - BENTO</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: '12px 0' }}>Subhajit Pradhan</h1>
            <p className="hero-bio" style={{ fontSize: '1.2rem', marginBottom: '24px' }}>
              Full-Stack + Blockchain Engineer crafting <strong>AI-native</strong> products. 
              Building the intent-centric future of Web3.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-primary pulse" style={{ padding: '10px 20px' }}>
                Resume
              </a>
              <a href="https://github.com/subhajitlucky" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '10px' }}>
                <GithubIcon />
              </a>
              <a href="https://linkedin.com/in/subhajitlucky" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '10px' }}>
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* EXPERIENCE (4 Cols) */}
          <div className="bento-item reveal reveal-delay-1" style={{ gridColumn: 'span 4' }}>
            <h2 className="hero-kicker" style={{ marginBottom: '20px' }}>Career Journey</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>uElement</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Blockchain Intern · 2026</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>QuadB</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Blockchain Trainee · 2025</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Centurion University</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>BCA · CGPA 8.9</p>
              </div>
            </div>
          </div>

          {/* PROJECTS (7 Cols) */}
          <div className="bento-item reveal reveal-delay-2" style={{ gridColumn: 'span 7' }}>
            <h2 className="hero-kicker" style={{ marginBottom: '24px' }}>Selected Work</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {projects.slice(0, 4).map((project, i) => (
                <div key={project.title} className="project-card" style={{ padding: '16px', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {project.title} <a href={project.demo} target="_blank" rel="noreferrer"><ExternalLinkIcon /></a>
                  </h4>
                  <p style={{ fontSize: '0.8rem', margin: '4px 0 12px', color: 'var(--text-muted)' }}>{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TOOLKIT (3 Cols) */}
          <div className="bento-item reveal reveal-delay-3" style={{ gridColumn: 'span 3' }}>
            <h2 className="hero-kicker" style={{ marginBottom: '20px' }}>Toolkit</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map(skill => (
                <span key={skill.name} className="skill-tag" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* FOCUS AREAS (2 Cols) */}
          <div className="bento-item reveal reveal-delay-4" style={{ gridColumn: 'span 2' }}>
            <h2 className="hero-kicker" style={{ marginBottom: '20px' }}>Focus</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {blogTopics.slice(0, 5).map(topic => (
                <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{topic.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <footer style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Subhajit Pradhan. Dashboard Design V4.
        </footer>
      </main>
    </div>
  );
};

export default ResumePortfolio;
