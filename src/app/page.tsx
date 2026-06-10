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
  profileSummary,
  proofPoints,
  siteConfig,
} from '@/data/site';
import { itemListJsonLd, personJsonLd, websiteJsonLd } from '@/lib/metadata';

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan blog posts', '/blog', blogPosts)} />

      <section className="hero" aria-labelledby="home-heading">
        <div className="hero__content">
          <p className="eyebrow">Open to product engineering roles</p>
          <h1 id="home-heading">{siteConfig.headline}</h1>
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
    </>
  );
}
