import Link from 'next/link';
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

      <section className="compact-section" id="experience" aria-labelledby="experience-title">
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

      <section className="compact-section" aria-labelledby="work-title">
        <div className="section-title-row">
          <h2 id="work-title">Selected work</h2>
          <Link href="/projects">View all projects</Link>
        </div>
        <div className="project-rows">
          {featuredProjects.map((project) => (
            <article data-testid="featured-project" key={project.slug}>
              <div className="project-heading">
                <div>
                  <p>{project.category}</p>
                  <h3>
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                </div>
                <span>{project.status}</span>
              </div>
              <p className="project-description">{project.summary}</p>
              <p className="project-stack">{project.stack.slice(0, 5).join(' · ')}</p>
              <div className="project-links">
                {project.links.map((link) => (
                  <a href={link.href} key={link.href} {...externalLinkProps}>
                    {link.label}
                  </a>
                ))}
                <Link href={`/projects/${project.slug}`}>Details</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="details-grid">
        <section className="compact-section" aria-labelledby="skills-title">
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

        <section className="compact-section education" aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <h3>{education.degree}</h3>
          <p>{education.organization}</p>
          <p>{education.location}</p>
          <p>
            {education.period} · {education.grade}
          </p>
        </section>
      </div>

      <section className="contact-section" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">Contact Subhajit</h2>
          <p>Open to remote full-stack software opportunities worldwide.</p>
        </div>
        <a href={siteConfig.links.email}>Send an email</a>
      </section>
    </div>
  );
}
