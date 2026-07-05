import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import ButtonLink from '@/components/ButtonLink';
import JsonLd from '@/components/JsonLd';
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

const featuredProjectSlugs = [
  'rls-doctor',
  'smritiflow',
  'cscosmos',
];

const philosophy = [
  {
    title: 'Boundaries first',
    body: 'Credentials, irreversible actions, and data ownership stay explicit.',
  },
  {
    title: 'Inspectable systems',
    body: 'Source, tests, deployment paths, and failure modes should be easy to review.',
  },
  {
    title: 'Visible tradeoffs',
    body: 'Good engineering explains the limits, not just the happy path.',
  },
];

export default function HomePage() {
  const featuredProjects = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const featuredPosts = blogPosts.slice(0, 2);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={softwareEngineerJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan blog posts', '/blog', blogPosts)} />

      <section id="home" className="hero" aria-labelledby="home-heading">
        <div className="hero__kicker">
          <span>Portfolio / 2026</span>
          <span>{siteConfig.availability}</span>
        </div>
        <div className="hero__grid">
          <div>
            <p className="eyebrow">Software engineering portfolio</p>
            <h1 id="home-heading">{siteConfig.headline}</h1>
          </div>
          <div className="hero__summary">
            <p className="hero__role">{siteConfig.role}</p>
            <p className="hero__lede">{profileSummary.short}</p>
            <div className="hero__actions">
              <ButtonLink href={siteConfig.links.email} variant="primary">Email me</ButtonLink>
              <ButtonLink href={siteConfig.resumePath} variant="secondary">Resume</ButtonLink>
              <ButtonLink href={siteConfig.links.github} external variant="secondary">GitHub</ButtonLink>
            </div>
          </div>
        </div>
        <dl className="hero__meta" aria-label="Portfolio highlights">
          <div>
            <dt>Published tools</dt>
            <dd>RLS Doctor, SmritiFlow</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Full-stack, AI workflows, developer tools</dd>
          </div>
          <div>
            <dt>Proof</dt>
            <dd>npm packages, CI, live apps, source</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{siteConfig.location}</dd>
          </div>
        </dl>
      </section>

      <section className="proof-strip" aria-label="Portfolio proof points">
        {proofPoints.map((point) => (
          <article key={point.label}>
            <h2>{point.label}</h2>
            <p>{point.value}</p>
          </article>
        ))}
      </section>

      <Section id="about" eyebrow="About" title="What I build">
        <div className="about-panel">
          <p>{profileSummary.long}</p>
          <ul className="evidence-list" aria-label="Profile highlights">
            <li>{siteConfig.availability}</li>
            <li>
              Core stack: Next.js, React, TypeScript, Node.js, PostgreSQL, Solidity, and AI APIs.
            </li>
          </ul>
        </div>
      </Section>

      <Section id="projects" eyebrow="Selected Work" title="Best proof first">
        <div className="case-study-list">
          {featuredProjects.map((project) => (
            <article className="work-entry" key={project.slug}>
              <div className="work-entry__meta">
                <span>{project.year}</span>
                <span>{project.status}</span>
              </div>
              <div className="work-entry__main">
                <header>
                  <p>{project.role}</p>
                  <h3>
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                </header>
                <p>{project.oneLine}</p>
                <p className="work-entry__proof">{project.proof[0]}</p>
              </div>
              <div className="work-entry__meta-points">
                <dl aria-label={`${project.title} metrics`}>
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.label}</dt>
                      <dd>{metric.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="work-entry__links">
                  <Link href={`/projects/${project.slug}`}>Case study</Link>
                  <a href={project.github} rel="noreferrer" target="_blank">Source</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link className="section-link" href="/projects">
          View all case studies
        </Link>
      </Section>

      <Section id="case-studies" eyebrow="Case Studies" title="Complete project archive">
        <div className="archive-summary">
          <p>
            {projects.length} detailed case studies with problem framing, architecture,
            tradeoffs, metrics, source links, and next steps.
          </p>
          <Link className="section-link" href="/projects">
            Browse case studies
          </Link>
        </div>
      </Section>

      <Section id="philosophy" eyebrow="Engineering Philosophy" title="How I make technical decisions">
        <div className="principle-list">
          {philosophy.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="writing" eyebrow="Writing" title="Engineering notes">
        <div className="article-list">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <Link className="section-link" href="/blog">
          View all writing
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
                <p>{item.summary.split('.')[0]}.</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="skills" eyebrow="Skills" title="Technical toolkit">
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
