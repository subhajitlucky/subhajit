import Link from 'next/link';
import ButtonLink from '@/components/ButtonLink';
import JsonLd from '@/components/JsonLd';
import { projects, type Project } from '@/data/projects';
import { experience, featuredProjectSlugs, machineReadableProfile, siteConfig } from '@/data/site';
import { itemListJsonLd, organizationJsonLd, personJsonLd, softwareEngineerJsonLd, websiteJsonLd } from '@/lib/metadata';

export const dynamic = 'force-static';

export const metadata = {
  title: `${siteConfig.name} — Software Engineer`,
  description: siteConfig.description,
};

function pickProjects(slugs: readonly string[]): Project[] {
  return slugs.flatMap((slug) => {
    const project = projects.find((candidate) => candidate.slug === slug);
    return project ? [project] : [];
  });
}

export default function HomePage() {
  const featuredProjects = pickProjects(featuredProjectSlugs);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={softwareEngineerJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={machineReadableProfile} />

      <section className="engineer-hero" aria-labelledby="hero-heading">
        <div>
          <p className="kicker">Software Engineer · Developer Tools · AI</p>
          <h1 id="hero-heading">I build tools that inspect software, not just demos.</h1>
          <p className="hero-copy">TypeScript, Node.js, PostgreSQL and AI systems. Focused on tooling, reliability, security, and systems people can inspect.</p>
          <div className="hero-actions">
            <ButtonLink href={siteConfig.resumePath} variant="primary">Resume</ButtonLink>
            <ButtonLink href={siteConfig.links.github} external variant="secondary">GitHub</ButtonLink>
            <ButtonLink href={siteConfig.links.email} variant="secondary">Email</ButtonLink>
          </div>
        </div>
        <div className="hero-aside">
          <p>Current focus</p>
          <strong>Developer infrastructure</strong>
          <span>Auditing · agent workflows · database security</span>
        </div>
      </section>

      <section className="engineer-section" aria-labelledby="featured-heading">
        <div className="section-index">01</div>
        <div>
          <div className="section-heading">
            <p className="kicker">Selected engineering</p>
            <h2 id="featured-heading">Projects I would defend in an interview.</h2>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <article className="engineer-card" key={project.slug}>
                <div className="card-meta">
                  <span>{project.year}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.oneLine}</p>
                <div className="proof-list">
                  {project.proof.slice(0, 3).map((proof) => <span key={proof}>{proof}</span>)}
                </div>
                <div className="card-links">
                  <Link href={`/projects/${project.slug}`}>Inspect case study →</Link>
                  <a href={project.github} target="_blank" rel="noreferrer">Source</a>
                </div>
              </article>
            ))}
          </div>
          <Link className="section-link" href="/projects">See all projects →</Link>
        </div>
      </section>

      <section className="engineer-section" aria-labelledby="experience-heading">
        <div className="section-index">02</div>
        <div>
          <div className="section-heading">
            <p className="kicker">Experience</p>
            <h2 id="experience-heading">Production work over portfolio decoration.</h2>
          </div>
          <div className="timeline">
            {experience.slice(0, 3).map((item) => (
              <article key={`${item.organization}-${item.period}`}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.organization}</h3>
                  <p className="timeline-role">{item.title}</p>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="engineer-section engineer-stack" aria-labelledby="stack-heading">
        <div className="section-index">03</div>
        <div>
          <div className="section-heading">
            <p className="kicker">Stack</p>
            <h2 id="stack-heading">What I use to ship.</h2>
          </div>
          <div className="stack-lines">
            <p><strong>Languages</strong> TypeScript · JavaScript · Python · SQL · Go · Rust</p>
            <p><strong>Systems</strong> Node.js · Next.js · PostgreSQL · Docker · GitHub Actions · Vercel</p>
            <p><strong>AI</strong> AI SDK · MCP · Agents · OpenAI · Anthropic · Gemini</p>
            <p><strong>Security</strong> RLS · auth boundaries · secrets · CI checks · deterministic auditing</p>
          </div>
        </div>
      </section>

      <section className="engineer-cta" aria-labelledby="contact-heading">
        <div>
          <p className="kicker">04 Contact</p>
          <h2 id="contact-heading">Looking for hard problems, not busywork.</h2>
        </div>
        <div className="hero-actions">
          <ButtonLink href={siteConfig.links.email} variant="primary">Email</ButtonLink>
          <ButtonLink href={siteConfig.links.linkedin} external variant="secondary">LinkedIn</ButtonLink>
        </div>
      </section>
    </>
  );
}
