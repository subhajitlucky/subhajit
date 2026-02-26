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
    { name: 'TypeScript', cat: 'Core' },
    { name: 'Solidity', cat: 'Web3' },
    { name: 'Rust', cat: 'Web3' },
    { name: 'Go', cat: 'Backend' },
    { name: 'React', cat: 'Frontend' },
    { name: 'Next.js', cat: 'Frontend' },
    { name: 'Ethereum', cat: 'Chain' },
    { name: 'Node.js', cat: 'Backend' },
    { name: 'Docker', cat: 'Tools' },
  ];

  const resumePath = `${import.meta.env.BASE_URL}resume.pdf`.replace('//', '/');

  return (
    <div className="portfolio-root" style={{ minHeight: '100vh', padding: '40px 0', position: 'relative' }}>
      {theme === 'space' && <SpaceBackground />}
      
      <button className="theme-switch" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>

      <main className="bento-container">
        {/* Profile / Intro - Col 1-3, Row 1-2 */}
        <div className="bento-card col-span-3 row-span-2">
          <div className="badge">Available for Work</div>
          <h1>Subhajit<br />Pradhan</h1>
          <p className="text-muted" style={{ fontSize: '1.25rem', marginTop: '24px', maxWidth: '35ch' }}>
            Full-Stack + Blockchain Engineer crafting <strong>AI-native</strong> products. 
            Building the intent-centric future of Web3.
          </p>
          <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
            <a href={resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Download Resume
            </a>
            <a href="https://github.com/subhajitlucky" target="_blank" rel="noreferrer" className="btn btn-icon">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/subhajitlucky" target="_blank" rel="noreferrer" className="btn btn-icon">
              <LinkedinIcon />
            </a>
          </div>
          <div className="glow-blob" style={{ top: '-50px', right: '-50px' }} />
        </div>

        {/* Career Timeline - Col 4, Row 1-2 */}
        <div className="bento-card col-span-1 row-span-2">
          <h2>Timeline</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '12px' }}>
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              <div style={{ position: 'absolute', left: '0', top: '8px', width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', left: '3px', top: '20px', width: '2px', height: 'calc(100% + 12px)', background: 'var(--border)' }} />
              <h4 style={{ fontSize: '14px', fontWeight: 800 }}>uElement</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Blockchain Intern · 2026</p>
            </div>
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              <div style={{ position: 'absolute', left: '0', top: '8px', width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', left: '3px', top: '20px', width: '2px', height: 'calc(100% + 12px)', background: 'var(--border)' }} />
              <h4 style={{ fontSize: '14px', fontWeight: 800 }}>QuadB</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Blockchain Trainee · 2025</p>
            </div>
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              <div style={{ position: 'absolute', left: '0', top: '8px', width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '50%' }} />
              <h4 style={{ fontSize: '14px', fontWeight: 800 }}>BCA Graduate</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Centurion · CGPA 8.9</p>
            </div>
          </div>
        </div>

        {/* Selected Projects - Col 1-2, Row 3-4 */}
        <div className="bento-card col-span-2 row-span-2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>Selected Work</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border)' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {projects.slice(0, 3).map((project, i) => (
              <div key={project.title} className="skill-pill" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '15px' }}>{project.title}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{project.description.slice(0, 50)}...</p>
                </div>
                <a href={project.demo} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                  <ExternalLinkIcon size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Stack / Toolkit - Col 3-4, Row 3 */}
        <div className="bento-card col-span-2 row-span-1">
          <h2>Toolkit</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {skills.map(skill => (
              <span key={skill.name} className="skill-pill">
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Focus / Philosophy - Col 3, Row 4 */}
        <div className="bento-card col-span-1 row-span-1">
          <h2>Focus</h2>
          <div style={{ marginTop: 'auto' }}>
            {blogTopics.slice(0, 3).map(topic => (
              <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }} />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{topic.split(' ')[0]} Eng</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connect / Footer - Col 4, Row 4 */}
        <div className="bento-card col-span-1 row-span-1" style={{ background: 'var(--accent)', color: 'white', border: 'none' }}>
          <h2 style={{ color: 'white' }}>Connect</h2>
          <p style={{ fontSize: '13px', opacity: 0.8, marginTop: '8px' }}>Let's build something unique together.</p>
          <a href="mailto:subhajitpradhan310@gmail.com" style={{ marginTop: 'auto', fontWeight: 800, textDecoration: 'underline' }}>
            Say Hello →
          </a>
          <div className="glow-blob" style={{ bottom: '-50px', left: '-50px', background: 'white', opacity: 0.2 }} />
        </div>

      </main>

      <footer style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Subhajit Pradhan · Designed with Precision
      </footer>
    </div>
  );
};

export default ResumePortfolio;
