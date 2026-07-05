import Link from 'next/link';
import ButtonLink from '@/components/ButtonLink';
import JsonLd from '@/components/JsonLd';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import {
  experience,
  machineReadableProfile,
  siteConfig,
  skills,
} from '@/data/site';
import {
  createMetadata,
  itemListJsonLd,
  organizationJsonLd,
  personJsonLd,
  softwareEngineerJsonLd,
  websiteJsonLd,
} from '@/lib/metadata';

export const dynamic = 'force-static';

export const metadata = createMetadata({
  title: `${siteConfig.name} - Software Engineer Portfolio`,
  description: siteConfig.description,
  keywords: ['Subhajit Pradhan portfolio', 'Software Engineer portfolio', 'AI products'],
});

const featuredProjectSlugs = ['rls-doctor', 'smritiflow', 'cscosmos'];

export default function HomePage() {
  const featuredProjects = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  const primarySkills = skills
    .filter((group) => ['Languages', 'Frontend', 'Backend & APIs', 'AI & Integrations', 'Databases', 'DevOps & Cloud'].includes(group.category))
    .map((group) => ({ ...group, items: group.items.slice(0, 5) }));

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={softwareEngineerJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan blog posts', '/blog', blogPosts)} />

      <section id="home" className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero__identity">
          <p className="kicker">Software Engineer</p>
          <h1 id="home-heading">{siteConfig.name}</h1>
          <p className="home-hero__role">{siteConfig.role}</p>
          <p className="home-hero__location">{siteConfig.location}</p>
        </div>

        <div className="home-hero__pitch">
          <p>
            I build developer tools, AI workflows, and production web apps with clear
            architecture, tests, and shipped releases.
          </p>
          <div className="home-hero__actions">
            <ButtonLink href={siteConfig.links.email} variant="primary">Email</ButtonLink>
            <ButtonLink href={siteConfig.resumePath} variant="secondary">Resume</ButtonLink>
            <ButtonLink href={siteConfig.links.github} external variant="secondary">GitHub</ButtonLink>
          </div>
        </div>
      </section>

      <section className="proof-row" aria-label="Portfolio proof">
        <div>
          <strong>2</strong>
          <span>Published CLIs</span>
        </div>
        <div>
          <strong>{projects.length}</strong>
          <span>Case studies</span>
        </div>
        <div>
          <strong>3</strong>
          <span>Featured systems</span>
        </div>
      </section>

      <section id="projects" className="home-section" aria-labelledby="work-heading">
        <div className="home-section__heading">
          <p className="kicker">Selected Work</p>
          <h2 id="work-heading">Best proof</h2>
        </div>
        <div className="work-list">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="work-row">
              <div>
                <h3>
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
                <p>{project.status} / {project.year}</p>
              </div>
              <p>{project.oneLine}</p>
              <strong>{project.metrics[0]?.value}</strong>
              <nav aria-label={`${project.title} links`}>
                <Link href={`/projects/${project.slug}`}>Case study</Link>
                <a href={project.github} rel="noreferrer" target="_blank">Source</a>
              </nav>
            </article>
          ))}
          <Link className="text-link" href="/projects">View all case studies</Link>
        </div>
      </section>

      <section id="experience" className="home-section" aria-labelledby="experience-heading">
        <div className="home-section__heading">
          <p className="kicker">Experience</p>
          <h2 id="experience-heading">Recent roles</h2>
        </div>
        <ol className="experience-list">
          {experience.map((item) => (
            <li key={`${item.organization}-${item.period}`}>
              <time>{item.period}</time>
              <h3>{item.organization}</h3>
              <p>{item.title}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="home-section" aria-labelledby="skills-heading">
        <div className="home-section__heading">
          <p className="kicker">Skills</p>
          <h2 id="skills-heading">Toolkit</h2>
        </div>
        <div className="skill-list">
          {primarySkills.map((group) => (
            <article key={group.category}>
              <h3>{group.category}</h3>
              <p>{group.items.join(' / ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="home-section contact-cta" aria-labelledby="contact-heading">
        <div>
          <p className="kicker">Contact</p>
          <h2 id="contact-heading">Let’s build something useful.</h2>
        </div>
        <div className="contact-cta__actions">
          <ButtonLink href={siteConfig.links.email} variant="primary">{siteConfig.email}</ButtonLink>
          <ButtonLink href={siteConfig.links.github} external variant="secondary">GitHub</ButtonLink>
        </div>
      </section>

      <section
        id="machine-readable-profile"
        className="sr-only"
        aria-labelledby="machine-readable-profile-heading"
      >
        <h2 id="machine-readable-profile-heading">Machine-readable profile</h2>
        <p>Name: {machineReadableProfile.name}</p>
        <p>Role: {machineReadableProfile.role}</p>
        <p>Location: {machineReadableProfile.location}</p>
        <p>Availability: {machineReadableProfile.availability}</p>
        <p>Summary: {machineReadableProfile.summary}</p>
        <h3>Skills</h3>
        <ul>
          {machineReadableProfile.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <h3>Experience</h3>
        <ul>
          {machineReadableProfile.experience.map((item) => (
            <li key={`${item.organization}-${item.period}`}>
              {item.title} at {item.organization}, {item.period}. {item.summary}
            </li>
          ))}
        </ul>
        <h3>Projects</h3>
        <ul>
          {machineReadableProfile.projects.map((project) => (
            <li key={project.title}>
              {project.title}: {project.description} Stack: {project.stack.join(', ')}. Source:{' '}
              {project.github}
              {project.demo ? `. Demo: ${project.demo}` : ''}
            </li>
          ))}
        </ul>
        <h3>Contact</h3>
        <p>Email: {machineReadableProfile.contact.email}</p>
        <p>GitHub: {machineReadableProfile.contact.github}</p>
        <p>LinkedIn: {machineReadableProfile.contact.linkedin}</p>
      </section>
    </>
  );
}
