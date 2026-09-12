import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { blogPosts } from '@/data/blog';
import { siteConfig } from '@/data/site';
import { createMetadata, itemListJsonLd } from '@/lib/metadata';

export const metadata = createMetadata({
  title: `Writing – ${siteConfig.name}`,
  description:
    'Technical notes on safer AI workflows, transaction boundaries, developer tooling, and production engineering.',
  path: '/blog',
  keywords: ['Subhajit Pradhan writing', 'AI engineering', 'developer tools', 'software engineering'],
});

export default function BlogPage() {
  const [featured, ...notes] = blogPosts;

  return (
    <>
      <JsonLd data={itemListJsonLd('Subhajit Pradhan technical writing', '/blog', blogPosts)} />

      <section className="writing-intro" aria-labelledby="writing-heading">
        <div>
          <p className="eyebrow">Writing / 2026</p>
          <h1 id="writing-heading">Engineering notes, not content marketing.</h1>
        </div>
        <p>
          Short technical notes from the systems I build: explicit boundaries, stateful AI workflows,
          security decisions, and the tradeoffs behind production software.
        </p>
      </section>

      {featured ? (
        <section className="writing-feature" aria-labelledby="featured-note-heading">
          <div className="writing-feature__label">
            <span>Featured note</span>
            <span>{featured.readingTime}</span>
          </div>
          <div className="writing-feature__body">
            <p className="kicker">{featured.tags.join(' · ')}</p>
            <h2 id="featured-note-heading">
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p>{featured.description}</p>
            <div className="writing-feature__meta">
              <time dateTime={featured.publishedAt}>{featured.publishedAt}</time>
              <Link href={`/projects/${featured.relatedProjectSlugs[0]}`}>Related project →</Link>
              <Link href={`/blog/${featured.slug}`}>Read note →</Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="writing-index" aria-labelledby="notes-heading">
        <div className="writing-index__heading">
          <div>
            <p className="kicker">Archive</p>
            <h2 id="notes-heading">More notes</h2>
          </div>
          <span>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
        </div>
        <div className="writing-list">
          {notes.map((post, index) => (
            <article className="writing-row" key={post.slug}>
              <span className="writing-row__index">0{index + 2}</span>
              <div>
                <p className="writing-row__meta">{post.tags.join(' · ')} · {post.readingTime}</p>
                <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.description}</p>
              </div>
              <div className="writing-row__links">
                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                <Link href={`/blog/${post.slug}`}>Read →</Link>
              </div>
            </article>
          ))}
          {!notes.length ? <p className="writing-empty">More engineering notes will appear here as they ship.</p> : null}
        </div>
      </section>
    </>
  );
}
