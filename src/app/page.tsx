import { ContactPanel } from '@/components/ContactPanel';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { Hero } from '@/components/Hero';
import { Principles } from '@/components/Principles';
import { ProjectDossier } from '@/components/ProjectDossier';
import { ProofRail } from '@/components/ProofRail';
import { SectionLabel } from '@/components/SectionLabel';
import { featuredProjects } from '@/data/projects';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofRail />
      <section className="work-section site-frame" aria-labelledby="selected-work-title">
        <div className="section-heading-row">
          <SectionLabel index="01">Selected work</SectionLabel>
          <h2 id="selected-work-title">Systems designed to be inspected.</h2>
        </div>
        <div className="project-list">
          {featuredProjects.map((project) => (
            <ProjectDossier project={project} key={project.slug} />
          ))}
        </div>
      </section>
      <ExperienceTimeline />
      <Principles />
      <ContactPanel />
    </>
  );
}
