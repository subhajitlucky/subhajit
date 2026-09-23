import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, posts, type PostBlock } from '@/data/posts';
import { siteConfig } from '@/data/site';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  const canonicalPath = `/writing/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      title: `${post.title} | ${siteConfig.name}`,
      description: post.summary,
      images: ['/opengraph-image'],
    },
  };
}

function Block({ block }: { block: PostBlock }) {
  if (block.kind === 'p') {
    return <p>{block.text}</p>;
  }

  if (block.kind === 'h3') {
    return <h3>{block.text}</h3>;
  }

  if (block.kind === 'list') {
    return (
      <ul className="plain-list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <figure className="code-block">
      <pre tabIndex={0}>
        <code data-lang={block.lang}>{block.code}</code>
      </pre>
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  );
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="post site-frame">
      <header className="post-header">
        <p className="post-meta">
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.readingMinutes} min read</span>
          <span>{post.tags.join(' · ')}</span>
        </p>
        <h1>{post.title}</h1>
        <p>{post.summary}</p>
      </header>

      <div className="post-body">
        {post.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            <div className="post-section-blocks">
              {section.blocks.map((block, index) => (
                <Block key={`${section.id}-${index}`} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="post-footer">
        <Link href="/writing">All writing</Link>
      </footer>
    </article>
  );
}
