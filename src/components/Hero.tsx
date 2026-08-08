import { ArrowLink } from '@/components/ArrowLink';
import { siteConfig } from '@/data/site';

export function Hero() {
  return (
    <section className="home-hero site-frame" aria-labelledby="hero-title">
      <div className="hero-meta reveal-1">
        <p>{siteConfig.role}</p>
        <p>{siteConfig.location}</p>
      </div>
      <div className="hero-copy">
        <p className="hero-eyebrow reveal-1">
          <span aria-hidden="true" />
          {siteConfig.availability}
        </p>
        <h1 id="hero-title" className="reveal-2">
          I build <em>developer tools</em> and AI systems that make complex software easier to
          inspect, operate, and trust.
        </h1>
        <div className="hero-support reveal-3">
          <p>
            Full-stack engineer working across TypeScript, Python, PostgreSQL, agent workflows,
            and the operational boundaries between them.
          </p>
          <div className="hero-actions">
            <ArrowLink href="/projects">Selected work</ArrowLink>
            <ArrowLink href={siteConfig.resumePath}>Download resume</ArrowLink>
            <ArrowLink href={siteConfig.links.github}>GitHub profile</ArrowLink>
            <ArrowLink href={siteConfig.links.email}>Email Subhajit</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
