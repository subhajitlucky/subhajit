import Link from 'next/link';
import ButtonLink from '@/components/ButtonLink';
import JsonLd from '@/components/JsonLd';
import { blogPosts } from '@/data/blog';
import { projects, type Project } from '@/data/projects';
import { formatDisplayDate } from '@/lib/date-format';
import {
  experience,
  featuredProjectSlugs,
  machineReadableProfile,
  selectedProjectSlugs,
  siteConfig,
  skills,
  toolFootnotes,
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
  keywords: [
    'Subhajit Pradhan portfolio',
    'developer tools engineer',
    'multi-agent systems',
  ],
});

function pickProjects(slugs: readonly string[]): Project[] {
  return slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
}

function WorkRow({ project }: { project: Project }) {
  const hasSeparateDemo = project.demo && project.demo !== project.github;

  return (
    <article className="work-row">
      <div className="work-row__title">
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>
          {project.status} / {project.year}
        </p>
      </div>
      <div className="work-row__thesis">
        <span>Thesis</span>
        <p>{project.oneLine}</p>
      </div>
      <div className="work-row__proof">
        <span>System / proof</span>
        <strong>{project.visual.title}</strong>
        <p>{project.metrics[0]?.value}</p>
      </div>
      <nav className="work-row__links" aria-label={`${project.title} links`}>
        <Link href={`/projects/${project.slug}`}>Case study</Link>
        <a href={project.github} rel="noreferrer" target="_blank">
          Source
        </a>
        {hasSeparateDemo && project.demo ? (
          <a href={project.demo} rel="noreferrer" target="_blank">
            {project.demo.includes('npmjs.com') ? 'npm' : 'Demo'}
          </a>
        ) : null}
      </nav>
    </article>
  );
}

export default function HomePage() {
  const featuredProjects = pickProjects(featuredProjectSlugs);
  const selectedProjects = pickProjects(selectedProjectSlugs);
  const primarySkills = skills
    .filter((group) =>
      [
        'Languages',
        'Frontend',
        'Backend & APIs',
        'AI & Integrations',
        'Databases',
        'DevOps & Cloud',
      ].includes(group.category),
    )
    .map((group) => ({ ...group, items: group.items.slice(0, 5) }));
  const recentWriting = blogPosts.slice(0, 3);
  const publishedCliCount = projects.filter((project) => project.status === 'Published CLI').length;
  const sourceBackedCount = projects.filter((project) => project.github).length;

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={softwareEngineerJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan blog posts', '/blog', blogPosts)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(machineReadableProfile) }}
      />

      <section id="home" className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero__identity">
          <p className="kicker">Software Engineer</p>
          <h1 id="home-heading">{siteConfig.name}</h1>
          <p className="home-hero__role">{siteConfig.role}</p>
          <p className="home-hero__location">{siteConfig.location}</p>
        </div>

        <div className="home-hero__pitch">
          <p>{profilePitch}</p>
          <div className="home-hero__actions">
            <ButtonLink href={siteConfig.links.email} variant="primary">
              Email
            </ButtonLink>
            <ButtonLink href={siteConfig.resumePath} variant="secondary">
              Resume
            </ButtonLink>
            <ButtonLink href={siteConfig.links.github} external variant="secondary">
              GitHub
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="proof-row" aria-label="Portfolio proof">
        <a href="https://www.npmjs.com/package/rls-doctor" rel="noreferrer" target="_blank">
          <strong>{publishedCliCount}</strong>
          <span>Published CLIs</span>
          <small>RLS Doctor / SmritiFlow</small>
        </a>
        <Link href="/projects">
          <strong>{featuredProjects.length}</strong>
          <span>Featured systems</span>
          <small>Case studies with source</small>
        </Link>
        <a href={siteConfig.links.github} rel="noreferrer" target="_blank">
          <strong>{sourceBackedCount}</strong>
          <span>Open projects</span>
          <small>GitHub evidence</small>
        </a>
      </section>

      <section id="projects" className="home-section" aria-labelledby="work-heading">
        <div className="home-section__heading">
          <p className="kicker">01 Work</p>
          <h2 id="work-heading">Featured systems</h2>
        </div>
        <div className="work-list">
          {featuredProjects.map((project) => (
            <WorkRow key={project.slug} project={project} />
          ))}
          <Link className="text-link" href="/projects">
            View all case studies
          </Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="also-heading">
        <div className="home-section__heading">
          <p className="kicker">Also built</p>
          <h2 id="also-heading">Selected product work</h2>
        </div>
        <div className="work-list">
          {selectedProjects.map((project) => (
            <WorkRow key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="footnote-heading">
        <div className="home-section__heading">
          <p className="kicker">Agent tooling</p>
          <h2 id="footnote-heading">Footnote</h2>
        </div>
        <div className="work-list">
          {toolFootnotes.map((tool) => (
            <article key={tool.title} className="work-row work-row--footnote">
              <div>
                <h3>{tool.title}</h3>
                <p>GitHub only</p>
              </div>
              <p>{tool.oneLine}</p>
              <strong>Agent skill</strong>
              <nav aria-label={`${tool.title} links`}>
                <a href={tool.github} rel="noreferrer" target="_blank">
                  Source
                </a>
              </nav>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="home-section" aria-labelledby="experience-heading">
        <div className="home-section__heading">
          <p className="kicker">02 Experience</p>
          <h2 id="experience-heading">Recent roles</h2>
        </div>
        <ol className="experience-list">
          {experience.map((item) => (
            <li key={`${item.organization}-${item.period}`}>
              <time>{item.period}</time>
              <div>
                <h3>{item.organization}</h3>
                <p>{item.summary}</p>
              </div>
              <p>{item.title}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="home-section" aria-labelledby="skills-heading">
        <div className="home-section__heading">
          <p className="kicker">03 Skills</p>
          <h2 id="skills-heading">Toolkit</h2>
        </div>
        <div className="skill-list">
          {primarySkills.map((group) => (
            <article key={group.category}>
              <h3>{group.category}</h3>
              <p>{group.items.join(' / ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="writing" className="home-section" aria-labelledby="writing-heading">
        <div className="home-section__heading">
          <p className="kicker">04 Writing</p>
          <h2 id="writing-heading">Notes</h2>
        </div>
        <div className="work-list">
          {recentWriting.map((post) => (
            <article key={post.slug} className="work-row">
              <div>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{formatDisplayDate(post.publishedAt)}</p>
              </div>
              <p>{post.description}</p>
              <strong>Note</strong>
              <nav aria-label={`${post.title} links`}>
                <Link href={`/blog/${post.slug}`}>Read</Link>
              </nav>
            </article>
          ))}
          <Link className="text-link" href="/blog">
            All writing
          </Link>
        </div>
      </section>

      <section id="contact" className="home-section contact-cta" aria-labelledby="contact-heading">
        <div>
          <p className="kicker">05 Contact</p>
          <h2 id="contact-heading">Contact</h2>
        </div>
        <p>
          Send the problem space, stack constraints, and what you want help shipping. Email is
          fastest; GitHub is for inspecting the work.
        </p>
        <div className="contact-cta__actions">
          <ButtonLink href={siteConfig.links.email} variant="primary">
            Email
          </ButtonLink>
          <ButtonLink href={siteConfig.links.github} external variant="secondary">
            GitHub
          </ButtonLink>
          <ButtonLink href={siteConfig.resumePath} variant="secondary">
            Resume
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

const profilePitch =
  'I build developer tools, AI systems, and full-stack products with inspectable architecture, honest tradeoffs, and source you can open.';
