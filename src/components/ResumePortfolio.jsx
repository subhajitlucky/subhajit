import { useState, useEffect } from 'react';
import projects from '../data/projects';

/* ── SVG icon helpers ──────────────────── */
const Sun = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
);
const Moon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);
const GH = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .3"/></svg>
);
const LI = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
);
const Mail = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const DL = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/></svg>
);
const Ext = ({ s = 12 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"/></svg>
);

/* ── Resume PDF path ───────────────────── */
const RESUME = '/assets/Subhajit_ResumeV6.pdf';

/* ── Skills ────────────────────────────── */
const skills = [
  'TypeScript', 'JavaScript', 'Go', 'Rust', 'Python', 'Solidity',
  'React', 'Next.js', 'Node.js', 'Express', 'NestJS',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Git',
  'Ethers.js', 'Hardhat', 'AWS', 'Linux',
];

export default function ResumePortfolio() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <>
      <div className="grain" aria-hidden />
      <div className="folio">
        {/* ─── Top Strip ────────────────── */}
        <header className="strip-top">
          <div className="strip-left">
            <span className="s-name">subhajit.dev</span>
            <span className="s-avail"><i /> Open to work</span>
          </div>
          <nav className="strip-right">
            <a className="pill" href={RESUME} target="_blank" rel="noopener noreferrer">
              <DL /> Resume
            </a>
            <a className="pill pill-fill" href="mailto:subhajitpradhan310@gmail.com">
              <Mail /> Email
            </a>
            <a className="ico" href="https://github.com/subhajitlucky" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GH s={13} />
            </a>
            <a className="ico" href="https://www.linkedin.com/in/subhajit-pradhan-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LI s={13} />
            </a>
            <button className="ico" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
              {dark ? <Sun /> : <Moon />}
            </button>
          </nav>
        </header>

        {/* ─── Main Content ────────────── */}
        <main className="split">
          {/* ── Left: Identity ────────── */}
          <section className="id-panel">
            <p className="id-role">Software Engineer</p>
            <h1 className="id-name">
              Subhajit<br /><em>Pradhan</em>
            </h1>
            <div className="id-line" />
            <p className="id-bio">
              Building reliable systems across the stack — from smart contracts
              to distributed backends. Focused on clarity, performance, and
              shipping production software.
            </p>
          </section>

          {/* ── Right: Content Grid ───── */}
          <div className="info-panel">
            {/* Cell 1 — Experience */}
            <div className="cell">
              <span className="cell-label">Experience</span>
              <div className="xp">
                <div className="xp-row">
                  <div className="xp-top">
                    <span className="xp-co">uElement</span>
                    <span className="xp-yr">2026</span>
                  </div>
                  <p className="xp-role">Software Engineer Intern</p>
                </div>
                <div className="xp-row">
                  <div className="xp-top">
                    <span className="xp-co">QuadB Technologies</span>
                    <span className="xp-yr">2025</span>
                  </div>
                  <p className="xp-role">Software Engineer Trainee</p>
                </div>
                <div className="xp-row">
                  <div className="xp-top">
                    <span className="xp-co">Centurion University</span>
                    <span className="xp-yr">2022 – 25</span>
                  </div>
                  <p className="xp-role">BCA · 8.9 CGPA</p>
                </div>
              </div>
            </div>

            {/* Cell 2 — Projects */}
            <div className="cell">
              <span className="cell-label">Projects</span>
              <div className="pj">
                {projects.map((p) => (
                  <div className="pj-row" key={p.title}>
                    <div>
                      <div className="pj-name">{p.title}</div>
                      <p className="pj-desc">{p.description}</p>
                      <div className="pj-tags">
                        {p.tags.map(t => <span className="pj-tag" key={t}>{t}</span>)}
                      </div>
                    </div>
                    <div className="pj-lnk">
                      <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source`}><GH s={13} /></a>
                      {p.demo && p.demo !== p.github && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} demo`}><Ext /></a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cell 3 — Skills */}
            <div className="cell">
              <span className="cell-label">Stack</span>
              <div className="sk-wrap">
                {skills.map(s => <span className="sk" key={s}>{s}</span>)}
              </div>
            </div>

            {/* Cell 4 — Contact */}
            <div className="cell">
              <span className="cell-label">Contact</span>
              <div className="ct">
                <a className="ct-row" href="mailto:subhajitpradhan310@gmail.com">
                  <Mail s={14} /> subhajitpradhan310@gmail.com
                </a>
                <a className="ct-row" href="https://github.com/subhajitlucky" target="_blank" rel="noopener noreferrer">
                  <GH s={14} /> github.com/subhajitlucky
                </a>
                <a className="ct-row" href="https://www.linkedin.com/in/subhajit-pradhan-profile" target="_blank" rel="noopener noreferrer">
                  <LI s={14} /> linkedin.com/in/subhajit-pradhan-profile
                </a>
                <a className="ct-row" href={RESUME} target="_blank" rel="noopener noreferrer">
                  <DL s={14} /> Download Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* ─── Bottom Strip ────────────── */}
        <footer className="strip-bottom">
          <span>© {new Date().getFullYear()} Subhajit Pradhan</span>
        </footer>
      </div>
    </>
  );
}
