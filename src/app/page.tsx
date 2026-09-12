import Link from 'next/link';
import ButtonLink from '@/components/ButtonLink';
import JsonLd from '@/components/JsonLd';
import { blogPosts } from '@/data/blog';
import { projects, type Project } from '@/data/projects';
import { formatDisplayDate } from '@/lib/date-format';
import { experience, featuredProjectSlugs, machineReadableProfile, siteConfig } from '@/data/site';
import { itemListJsonLd, organizationJsonLd, personJsonLd, softwareEngineerJsonLd, websiteJsonLd } from '@/lib/metadata';

export const dynamic = 'force-static';
export const metadata = { title: `${siteConfig.name} — Software Engineer`, description: siteConfig.description };

function pickProjects(slugs: readonly string[]): Project[] {
  return slugs.flatMap((slug) => { const project = projects.find((candidate) => candidate.slug === slug); return project ? [project] : []; });
}

export default function HomePage() {
  const featuredProjects = pickProjects(featuredProjectSlugs);
  const recentWriting = blogPosts.slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10">
      <JsonLd data={personJsonLd()} /><JsonLd data={softwareEngineerJsonLd()} /><JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} /><JsonLd data={itemListJsonLd('Subhajit Pradhan projects', '/projects', projects)} />
      <JsonLd data={itemListJsonLd('Subhajit Pradhan blog posts', '/blog', blogPosts)} /><JsonLd data={machineReadableProfile} />

      <section id="home" className="border-b border-black/10 py-24 md:py-32" aria-labelledby="home-heading">
        <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black/45">Software Engineer · Odisha, India</p>
        <h1 id="home-heading" className="max-w-5xl text-[clamp(3.5rem,10vw,8rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-black">Subhajit Pradhan</h1>
        <p className="mt-8 max-w-2xl text-xl font-medium leading-8 text-black md:text-2xl">Developer tools, AI systems & full-stack products.</p>
        <p className="mt-4 max-w-xl text-base leading-7 text-black/55">I build software that is useful, inspectable, and ready to ship.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={siteConfig.links.email} variant="primary">Email</ButtonLink>
          <ButtonLink href={siteConfig.resumePath} variant="secondary">Resume</ButtonLink>
          <ButtonLink href={siteConfig.links.github} external variant="secondary">GitHub</ButtonLink>
        </div>
      </section>

      <section id="work" className="border-b border-black/10 py-16 md:py-20" aria-labelledby="work-heading">
        <div className="mb-10 flex items-end justify-between gap-6"><div><p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black/40">01</p><h2 id="work-heading" className="text-3xl font-semibold tracking-tight md:text-4xl">Selected work</h2></div><Link className="hidden text-sm font-semibold text-black/50 hover:text-black md:block" href="/projects">All projects →</Link></div>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {featuredProjects.map((project, index) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group grid gap-5 py-7 transition-colors md:grid-cols-[48px_minmax(0,1fr)_260px_70px] md:items-center">
              <span className="font-mono text-xs text-black/30">0{index + 1}</span>
              <div><h3 className="text-xl font-semibold tracking-tight group-hover:text-black">{project.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-black/50">{project.oneLine}</p></div>
              <span className="text-xs leading-5 text-black/40">{project.stack.slice(0, 4).join(' · ')}</span>
              <span className="text-right text-sm font-semibold text-black/40 group-hover:text-black">View →</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="experience" className="border-b border-black/10 py-16 md:py-20" aria-labelledby="experience-heading">
        <div className="mb-10"><p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black/40">02</p><h2 id="experience-heading" className="text-3xl font-semibold tracking-tight md:text-4xl">Experience</h2></div>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {experience.slice(0, 3).map((item) => <article key={`${item.organization}-${item.period}`} className="grid gap-4 py-7 md:grid-cols-[180px_220px_1fr] md:gap-8"><time className="font-mono text-xs text-black/35">{item.period}</time><div><h3 className="font-semibold">{item.organization}</h3><p className="mt-1 text-sm text-black/45">{item.title}</p></div><p className="max-w-2xl text-sm leading-6 text-black/55">{item.summary}</p></article>)}
        </div>
      </section>

      <section id="writing" className="border-b border-black/10 py-16 md:py-20" aria-labelledby="writing-heading">
        <div className="mb-10"><p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black/40">03</p><h2 id="writing-heading" className="text-3xl font-semibold tracking-tight md:text-4xl">Writing</h2></div>
        <div className="divide-y divide-black/10 border-y border-black/10">{recentWriting.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group grid gap-3 py-6 md:grid-cols-[150px_1fr_80px] md:items-center"><span className="font-mono text-xs text-black/35">{formatDisplayDate(post.publishedAt)}</span><strong className="text-lg font-medium group-hover:text-black">{post.title}</strong><span className="text-sm text-black/35 group-hover:text-black">Read →</span></Link>)}</div>
      </section>

      <section id="contact" className="py-20 md:py-28" aria-labelledby="contact-heading">
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black/40">04</p>
        <h2 id="contact-heading" className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">Let’s build something useful.</h2>
        <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href={siteConfig.links.email} variant="primary">Get in touch</ButtonLink><ButtonLink href={siteConfig.links.linkedin} external variant="secondary">LinkedIn</ButtonLink></div>
      </section>
    </div>
  );
}
