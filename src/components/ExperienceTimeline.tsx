import { SectionLabel } from '@/components/SectionLabel';
import { experience } from '@/data/site';

function experienceId(organization: string) {
  return organization.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function ExperienceTimeline() {
  return (
    <section className="experience-section site-frame" id="experience" aria-labelledby="experience-title">
      <div className="section-heading-row">
        <SectionLabel index="02">Experience</SectionLabel>
        <h2 id="experience-title">Work across product surfaces and system boundaries.</h2>
      </div>
      <ol className="experience-list">
        {experience.map((item) => (
          <li key={item.organization} data-testid={`experience-${experienceId(item.organization)}`}>
            <div className="experience-period">
              <span>{item.period}</span>
              <span>{item.location}</span>
            </div>
            <div className="experience-role">
              <h3>{item.organization}</h3>
              <strong>{item.title}</strong>
              {item.summary ? <p>{item.summary}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
