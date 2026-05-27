import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import ButtonLink from '@/components/ButtonLink';
import ExternalLink from '@/components/ExternalLink';
import JsonLd from '@/components/JsonLd';
import ProjectCard from '@/components/ProjectCard';
import Section from '@/components/Section';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import {
  currentlyBuilding,
  experience,
  faqs,
  openSourceWork,
  profileSummary,
  proofPoints,
  siteConfig,
  skillGroups,
} from '@/data/site';
import { faqJsonLd, itemListJsonLd, personJsonLd, websiteJsonLd } from '@/lib/metadata';

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd()} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan blog posts', '/blog', blogPosts)} />

      <section className="hero" aria-labelledby="home-heading">
        <div className="hero__content">
          <p className="eyebrow">Available for product engineering teams</p>
          <h1 id="home-heading">{siteConfig.headline}</h1>
          <p className="hero__lede">{profileSummary.short}</p>
          <div className="hero__actions">
            <ButtonLink href={siteConfig.links.email} variant="primary">Email</ButtonLink>
            <ButtonLink href={siteConfig.resumePath} variant="secondary">Resume</ButtonLink>
            <ButtonLink href={siteConfig.links.github} external variant="ghost">GitHub</ButtonLink>
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

      <Section id="about" eyebrow="About" title="About">
        <div className="two-column-copy">
          {profileSummary.long.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="skills" eyebrow="Skills" title="Skills">
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article key={group.name} className="skill-group">
              <h3>{group.name}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
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

      <Section id="projects" eyebrow="Projects" title="Projects">
        <div className="card-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link className="section-link" href="/projects">
          View all projects
        </Link>
      </Section>

      <Section id="blogs" eyebrow="Writing" title="Writing">
        <div className="card-grid card-grid--three">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section id="currently-building" eyebrow="Currently building" title="Currently building">
        <div className="build-list">
          {currentlyBuilding.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="open-source" eyebrow="Open source" title="Open source">
        <div className="source-list">
          {openSourceWork.map((item) => (
            <article key={item.name}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <ExternalLink href={item.href}>Open source</ExternalLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="FAQ">
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Contact">
        <div className="contact-panel">
          <div>
            <h3>Recruiters and engineering teams</h3>
            <p>
              Send the role, product context, and the strongest reason you think Subhajit Pradhan
              is a fit. The fastest path is email.
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
