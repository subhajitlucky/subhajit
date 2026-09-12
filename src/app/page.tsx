import Link from 'next/link';
import ButtonLink from '@/components/ButtonLink';
import JsonLd from '@/components/JsonLd';
import { blogPosts } from '@/data/blog';
import { projects, type Project } from '@/data/projects';
import { formatDisplayDate } from '@/lib/date-format';
import { experience, featuredProjectSlugs, machineReadableProfile, siteConfig } from '@/data/site';
import { itemListJsonLd, organizationJsonLd, personJsonLd, softwareEngineerJsonLd, websiteJsonLd } from '@/lib/metadata';

export const dynamic = 'force-static';

export const metadata = {
  title: `${siteConfig.name} — Software Engineer`,
  description: siteConfig.description,
};

function pickProjects(slugs: readonly string[]): Project[] {
  return slugs.reduce<Project[]>((selected, slug) => {
    const project = projects.find((candidate) => candidate.slug === slug);
    if (project) selected.push(project);
    return selected;
  }, []);
}

function WorkRow({ project }: { project: Project }) {
  const demo = project.demo && project.demo !== project.github ? project.demo : null;

  return (
    <article className="work-row">
      <div className="work-row__title">
        <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.status}</p>
      </div>
      <div className="work-row__thesis">
        <p>{project.oneLine}</p>
      </div>
      <div className="work-row__proof">
        <strong>{project.stack.slice(0, 4).join(' · ')}</strong>
      </div>
      <nav className="work-row__links" aria-label={`${project.title} links`}>
        <Link href={`/projects/${project.slug}`}>Case study</Link>
        <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
        {demo ? <a href={demo} target="_blank" rel="noreferrer">{demo.includes('npmjs.com') ? 'npm' : 'Demo'}</a> : null}
      </nav>
    </article>
  );
}

export default function HomePage() {
  const featuredProjects = pickProjects(featuredProjectSlugs);
  const recentWriting = blogPosts.slice(0, 2);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={softwareEngineerJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan blog posts', '/blog', blogPosts)} />
      <JsonLd data={machineReadableProfile} />

      <section id="home" className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero__identity">
          <p className="kicker">Software Engineer</p>
          <h1 id="home-heading">Subhajit Pradhan</h1>
          <p className="home-hero__role">Developer Tools · AI Systems · Full Stack</p>
          <p className="home-hero__location">Odisha, India · Open to work</p>
        </div>
        <div className="home-hero__pitch">
          <p>I build developer tools, AI systems, and production web applications.</p>
          <div className="home-hero__actions">
            <ButtonLink href={siteConfig.links.email} variant="primary">Email</ButtonLink>
            <ButtonLink href={siteConfig.resumePath} variant="secondary">Resume</ButtonLink>
            <ButtonLink href={siteConfig.links.github} external variant="secondary">GitHub</ButtonLink>
          </div>
        </div>
      </section>

      <section id="work" className="home-section" aria-labelledby="work-heading">
        <div className="home-section__heading">
          <p className="kicker">01 Work</p>
          <h2 id="work-heading">Selected work</h2>
        </div>
        <div className="work-list">
          {featuredProjects.map((project) => <WorkRow key={project.slug} project={project} />)}
          <Link className="text-link" href="/projects">View all work →</Link>
        </div>
      </section>

      <section id="experience" className="home-section" aria-labelledby="experience-heading">
        <div className="home-section__heading">
          <p className="kicker">02 Experience</p>
          <h2 id="experience-heading">Experience</h2>
        </div>
        <ol className="experience-list">
          {experience.slice(0, 3).map((item) => (
            <li key={`${item.organization}-${item.period}`}>
              <time>{item.period}</time>
              <div><h3>{item.organization}</h3><p>{item.summary}</p></div>
              <p>{item.title}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="writing" className="home-section" aria-labelledby="writing-heading">
        <div className="home-section__heading">
          <p className="kicker">03 Writing</p>
          <h2 id="writing-heading">Notes</h2>
        </div>
        <div className="work-list">
          {recentWriting.map((post) => (
            <article key={post.slug} className="work-row">
              <div><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{formatDisplayDate(post.publishedAt)}</p></div>
              <div className="work-row__thesis"><p>{post.description}</p></div>
              <div />
              <nav><Link href={`/blog/${post.slug}`}>Read →</Link></nav>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="home-section contact-cta" aria-labelledby="contact-heading">
        <div><p className="kicker">04 Contact</p><h2 id="contact-heading">Let’s work.</h2></div>
        <p>Looking for software engineering opportunities in developer tools, AI, and full-stack systems.</p>
        <div className="contact-cta__actions">
          <ButtonLink href={siteConfig.links.email} variant="primary">Email</ButtonLink>
          <ButtonLink href={siteConfig.links.linkedin} external variant="secondary">LinkedIn</ButtonLink>
        </div>
      </section>
    </>
  );
}
