import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import ButtonLink from '@/components/ButtonLink';
import JsonLd from '@/components/JsonLd';
import ProjectCard from '@/components/ProjectCard';
import Section from '@/components/Section';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import {
  experience,
  machineReadableProfile,
  profileSummary,
  proofPoints,
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

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={softwareEngineerJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan blog posts', '/blog', blogPosts)} />

      <section className="hero" aria-labelledby="home-heading">
        <div className="hero__content">
          <p className="eyebrow">Open to product engineering roles</p>
          <h1 id="home-heading"><span className="gradient-title">{siteConfig.headline}</span></h1>
          <p className="hero__lede">{profileSummary.short}</p>
          <div className="hero__actions">
            <ButtonLink href={siteConfig.links.email} variant="primary">Email me</ButtonLink>
            <ButtonLink href="/#projects" variant="secondary">View work</ButtonLink>
            <ButtonLink href={siteConfig.resumePath} variant="secondary">Resume</ButtonLink>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Portfolio proof points">
        {proofPoints.map((point) => (
          <article key={point.label}>
            <h2>{point.label}</h2>
            <p>{point.value}</p>
          </article>
        ))}
      </section>

      <Section id="about" eyebrow="About" title="Software engineer building inspectable products">
        <div className="about-panel">
          <p>{profileSummary.long}</p>
          <ul className="evidence-list" aria-label="Profile highlights">
            <li>{siteConfig.availability}</li>
            <li>
              Core stack: Next.js, React, TypeScript, Node.js, PostgreSQL, Solidity, and AI APIs.
            </li>
            <li>
              Portfolio content is rendered as HTML with semantic sections, project proof, writing,
              and contact links.
            </li>
          </ul>
        </div>
      </Section>

      <Section id="projects" eyebrow="Selected work" title="Projects with proof">
        <div className="card-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
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
              <span>{item.period}</span>
              <div>
                <h3>{item.organization}</h3>
                <p>{item.title}</p>
                <p>{item.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="writing" eyebrow="Writing" title="Engineering notes">
        <div className="card-grid card-grid--three">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section id="skills" eyebrow="Skills & Stack" title="Technical Toolkit">
        <div className="skills-grid">
          {skills.map((group) => (
            <article key={group.category} className="skill-group">
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
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
