import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { posts } from '@/data/posts';
import { projects } from '@/data/projects';
import { experience, siteConfig } from '@/data/site';
import { externalLinkProps } from '@/lib/urls';

const homeWritingSlugs = [
  'five-postgres-rls-mistakes',
  'what-breaks-if-i-change-this-file',
  'kalia-build-log',
];

function entryId(organization: string) {
  return organization.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function HomePage() {
  const homePosts = posts.filter((post) => homeWritingSlugs.includes(post.slug));

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
          <a href={siteConfig.resumePath}>Resume</a>
          <a href={siteConfig.links.github} {...externalLinkProps}>
            GitHub
          </a>
          <a href={siteConfig.links.linkedin} {...externalLinkProps}>
            LinkedIn
          </a>
        </div>
      </section>

      <section className="content-section" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">Selected work</h2>
          <Link href="/projects">All work</Link>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
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

      <section className="content-section" aria-labelledby="writing-title">
        <div className="section-heading">
          <h2 id="writing-title">Writing</h2>
          <Link href="/writing">All writing</Link>
        </div>
        <ol className="home-writing-list">
          {homePosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`}>{post.title}</Link>
              <span>{post.readingMinutes} min</span>
            </li>
          ))}
        </ol>
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
