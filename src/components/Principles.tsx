import { SectionLabel } from '@/components/SectionLabel';
import { education, engineeringPrinciples, skillGroups } from '@/data/site';

export function Principles() {
  return (
    <section className="principles-section">
      <div className="site-frame principles-inner">
        <div className="section-heading-row section-heading-row-dark">
          <SectionLabel index="03">How I engineer</SectionLabel>
          <h2>Software should explain what it knows—and what it does not.</h2>
        </div>
        <ol className="principles-list">
          {engineeringPrinciples.map((principle) => (
            <li key={principle.index}>
              <span>{principle.index}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </li>
          ))}
        </ol>
        <div className="capabilities-grid">
          <div>
            <p className="capabilities-title">Technical range</p>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="education-block">
            <h2>Education</h2>
            <p>{education.degree}</p>
            <strong>{education.organization}</strong>
            <span>{education.location}</span>
            <span>
              {education.period} · {education.grade}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
