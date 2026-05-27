import EvidenceList from '../components/EvidenceList';
import ProjectBrief from '../components/ProjectBrief';
import Section from '../components/Section';
import StackGroup from '../components/StackGroup';
import { profile } from '../data/profile';
import projects from '../data/projects';

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero__copy">
          <p className="eyebrow">{profile.name}</p>
          <h1 id="home-heading">{profile.role}</h1>
          <p className="lede">{profile.summary}</p>
        </div>

        <dl className="home-hero__facts" aria-label="Profile facts">
          <div>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>AI product workflows, APIs, data, and deployment</dd>
          </div>
        </dl>
      </section>

      <Section
        className="proof-section"
        eyebrow="Proof snapshot"
        id="proof"
        title="Proof Snapshot"
      >
        <EvidenceList items={profile.proof} />
      </Section>

      <Section
        className="selected-work-section"
        eyebrow="Case-study-first portfolio"
        id="selected-work"
        title="Selected Work"
      >
        <div className="project-briefs">
          {projects.map((project) => (
            <ProjectBrief key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section
        className="engineering-range-section"
        eyebrow="Stack"
        id="engineering-range"
        title="Engineering Range"
      >
        <StackGroup stack={profile.stack} />
      </Section>

      <Section
        className="experience-section"
        eyebrow="Experience"
        id="experience"
        title="Experience and Education"
      >
        <ol className="experience-list">
          {profile.experience.map((item) => (
            <li key={`${item.organization}-${item.period}`}>
              <div>
                <h3>{item.organization}</h3>
                <p>{item.title}</p>
              </div>
              <span>{item.period}</span>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

export default Home;
