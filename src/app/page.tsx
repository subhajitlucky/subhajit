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

      <section className="portfolio-hero" aria-labelledby="hero-heading">
        <div className="portfolio-hero__topline">
          <span>Subhajit Pradhan</span>
          <span>Software Engineer</span>
        </div>
        <div className="portfolio-hero__main">
          <div>
            <p className="kicker">Developer tools · AI systems · Full stack</p>
            <h1 id="hero-heading">I build software that works.</h1>
            <p className="hero-copy">Developer infrastructure, database security, agent workflows, and production web systems.</p>
            <div className="hero-actions">
              <ButtonLink href="/projects" variant="primary">View work</ButtonLink>
              <ButtonLink href={siteConfig.resumePath} variant="secondary">Resume</ButtonLink>
              <ButtonLink href={siteConfig.links.github} external variant="secondary">GitHub</ButtonLink>
            </div>
          </div>
          <div className="hero-note">
            <span>Based in</span>
            <strong>Odisha, India</strong>
            <span>Open to software engineering roles</span>
          </div>
        </div>
      </section>

      <section id="projects" className="portfolio-section" aria-labelledby="projects-heading">
        <div className="section-label">01 / Work</div>
        <div>
          <div className="section-heading">
            <p className="kicker">Selected projects</p>
            <h2 id="projects-heading">Things I actually built.</h2>
          </div>
          <div className="project-list">
            {featuredProjects.map((project, index) => (
              <article className="project-row" key={project.slug}>
                <span className="project-row__index">0{index + 1}</span>
                <div className="project-row__body">
                  <div className="project-row__meta">
                    <span>{project.year}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.oneLine}</p>
                  <div className="project-row__proof">
                    {project.proof.slice(0, 2).map((proof) => <span key={proof}>— {proof}</span>)}
                  </div>
                </div>
                <div className="project-row__links">
                  <Link href={`/projects/${project.slug}`}>Case study</Link>
                  <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                  {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer">Live</a> : null}
                </div>
              </article>
            ))}
          </div>
          <Link className="section-link" href="/projects">View all projects →</Link>
        </div>
      </section>

      <section id="experience" className="portfolio-section" aria-labelledby="experience-heading">
        <div className="section-label">02 / Experience</div>
        <div>
          <div className="section-heading">
            <p className="kicker">Production</p>
            <h2 id="experience-heading">Where I’ve worked.</h2>
          </div>
          <div className="experience-table-wrap">
            <table className="experience-table">
              <thead>
                <tr>
                  <th scope="col">Period</th>
                  <th scope="col">Company</th>
                  <th scope="col">Role</th>
                  <th scope="col">Scope</th>
                </tr>
              </thead>
              <tbody>
                {experience.slice(0, 3).map((item) => (
                  <tr key={`${item.organization}-${item.period}`}>
                    <td><time>{item.period}</time></td>
                    <td><strong>{item.organization}</strong></td>
                    <td>{item.title}</td>
                    <td>{item.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="stack" className="portfolio-section" aria-labelledby="stack-heading">
        <div className="section-label">03 / Stack</div>
        <div>
          <div className="section-heading">
            <p className="kicker">Tools</p>
            <h2 id="stack-heading">The stack I use to ship.</h2>
          </div>
          <div className="stack-grid">
            <div><span>Languages</span><strong>TypeScript · JavaScript · Python · SQL · Go · Rust</strong></div>
            <div><span>Runtime</span><strong>Node.js · Next.js · PostgreSQL · Docker · Vercel</strong></div>
            <div><span>AI</span><strong>AI SDK · MCP · Agents · OpenAI · Anthropic · Gemini</strong></div>
            <div><span>Engineering</span><strong>Git · GitHub Actions · Testing · CI/CD · RLS · Auditing</strong></div>
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio-cta" aria-labelledby="contact-heading">
        <div>
          <p className="kicker">04 / Contact</p>
          <h2 id="contact-heading">Have a hard problem? Let’s build it.</h2>
        </div>
        <ButtonLink href={siteConfig.links.email} variant="primary">Get in touch</ButtonLink>
      </section>
    </>
  );
}
