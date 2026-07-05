import Link from 'next/link';
import ButtonLink from '@/components/ButtonLink';
import JsonLd from '@/components/JsonLd';
import Section from '@/components/Section';
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

const featuredProjectSlugs = [
  'rls-doctor',
  'smritiflow',
  'cscosmos',
];

export default function HomePage() {
  const featuredProjects = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={softwareEngineerJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan blog posts', '/blog', blogPosts)} />

      <section id="home" className="hero" aria-labelledby="home-heading">
        <div className="hero__grid">
          <div>
            <h1 id="home-heading">{siteConfig.headline}</h1>
            <p className="hero__role">{siteConfig.role}</p>
            <p className="hero__location">{siteConfig.location}</p>
          </div>
          <div className="hero__summary">
            <p className="hero__lede">
              I build developer tools and AI products with clean architecture,
              useful UX, and inspectable source.
            </p>
            <div className="hero__actions">
              <ButtonLink href={siteConfig.links.email} variant="primary">Email me</ButtonLink>
              <ButtonLink href={siteConfig.resumePath} variant="secondary">Resume</ButtonLink>
              <ButtonLink href={siteConfig.links.github} external variant="secondary">GitHub</ButtonLink>
            </div>
          </div>
        </div>
        <dl className="hero__meta" aria-label="Portfolio highlights">
          <div>
            <dt>Products shipped</dt>
            <dd>3+</dd>
          </div>
          <div>
            <dt>Case studies</dt>
            <dd>{projects.length}</dd>
          </div>
          <div>
            <dt>Proof</dt>
            <dd>Source, CI, demos</dd>
          </div>
        </dl>
      </section>

      <Section id="projects" eyebrow="Selected Work" title="Selected Work">
        <div className="work-table">
          {featuredProjects.map((project) => (
            <article className="work-entry" key={project.slug}>
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p>{project.oneLine}</p>
              <strong>{project.metrics[0]?.value}</strong>
              <div className="work-entry__links">
                <Link href={`/projects/${project.slug}`}>Case study</Link>
                <a href={project.github} rel="noreferrer" target="_blank">Source</a>
              </div>
            </article>
          ))}
        </div>
        <Link className="section-link" href="/projects">
          View all case studies
        </Link>
      </Section>

      <Section id="experience" eyebrow="Experience" title="Experience">
        <ol className="timeline">
          {experience.map((item) => (
            <li key={`${item.organization}-${item.period}`}>
              <time>{item.period}</time>
              <div>
                <h3>{item.organization}</h3>
                <p className="timeline__role">{item.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="skills" eyebrow="Skills" title="Technical toolkit">
        <div className="skills-grid skills-grid--compact">
          {skills.slice(0, 6).map((group) => (
            <article key={group.category} className="skill-group">
              <h3>{group.category}</h3>
              <ul>
                {group.items.slice(0, 5).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Contact">
        <div className="contact-panel">
          <div>
            <h3>Recruiters and engineering teams</h3>
            <p>
              Send me the role, product context, and what you want help shipping. Email is the
              fastest path.
            </p>
          </div>
          <div className="contact-panel__actions">
            <ButtonLink href={siteConfig.links.email} variant="primary">
              {siteConfig.email}
            </ButtonLink>
            <ButtonLink href={siteConfig.links.github} external variant="secondary">
              GitHub
            </ButtonLink>
          </div>
        </div>
      </Section>

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
