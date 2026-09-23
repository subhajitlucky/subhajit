import type { Metadata } from 'next';
import Link from 'next/link';
import { posts } from '@/data/posts';
import { siteConfig } from '@/data/site';

const description =
  'Notes on database security, static analysis, and developer tooling by Subhajit Pradhan.';

export const metadata: Metadata = {
  title: 'Writing',
  description,
  alternates: { canonical: '/writing' },
  openGraph: {
    type: 'website',
    url: '/writing',
    title: `Writing | ${siteConfig.name}`,
    description,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Writing | ${siteConfig.name}`,
    description,
    images: ['/opengraph-image'],
  },
};

export default function WritingPage() {
  const ordered = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="writing-index site-frame">
      <header className="writing-index-header">
        <h1>Writing</h1>
        <p>{description}</p>
      </header>
      <ol className="writing-list">
        {ordered.map((post) => (
          <li key={post.slug}>
            <article className="writing-list-item">
              <p className="writing-list-meta">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.readingMinutes} min</span>
              </p>
              <h2>
                <Link href={`/writing/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.summary}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
