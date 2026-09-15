import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { featuredProjects } from '@/data/projects';
import { education, experience, siteConfig, skillGroups } from '@/data/site';
import { externalLinkProps } from '@/lib/urls';

function entryId(organization: string) {
  return organization.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function HomePage() {
  return (
    <div className="home-page site-container">
      <section className="intro" aria-labelledby="intro-title">
        <p className="availability-line">
          <span aria-hidden="true" />
          {siteConfig.availability}
        </p>
        <p className="intro-name">{siteConfig.name}</p>
        <h1 id="intro-title">{siteConfig.role}</h1>
        <p className="intro-summary">{siteConfig.summary}</p>
        <div className="intro-links" aria-label="Contact and profile links">
          <a href={siteConfig.links.email}>Email</a>
          <Link href={siteConfig.resumePath}>Resume</Link>
          <a href={siteConfig.links.github} {...externalLinkProps}>
            GitHub
          </a>
          <a href={siteConfig.links.linkedin} {...externalLinkProps}>
            LinkedIn
          </a>
        </div>
      </section>

      <section className="content-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <h2 id="projects-title">Projects</h2>
          <Link href="/projects">All projects</Link>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        <ol className="experience-rows">
          {experience.map((item) => (
            <li key={item.organization} data-testid={`experience-${entryId(item.organization)}`}>
              <div className="row-period">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <div className="row-content">
                <h3>{item.organization}</h3>
                <strong>{item.title}</strong>
                {item.summary ? <p>{item.summary}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="content-section" aria-labelledby="skills-title">
        <h2 id="skills-title">Skills</h2>
        <div className="skills-list">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3>{group.label}</h3>
              <p>{group.items.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <h3>{education.degree}</h3>
        <p>{education.organization}</p>
        <p>{education.location}</p>
        <p>
          {education.period} · {education.grade}
        </p>
      </section>

      <section className="contact-section" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">Get in touch</h2>
          <p>Email is the fastest way to reach me.</p>
        </div>
        <a href={siteConfig.links.email}>Send an email</a>
      </section>
    </div>
  );
}
