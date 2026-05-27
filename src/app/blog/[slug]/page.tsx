import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { blogPosts, getBlogPost } from '@/data/blog';
import { getProject } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { BlogContent } from '@/lib/blog-content';
import { blogPostingJsonLd, createMetadata } from '@/lib/metadata';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return createMetadata({
      title: `Article not found – ${siteConfig.name}`,
      description: siteConfig.description,
      path: `/blog/${slug}`,
    });
  }

  return createMetadata({
    title: `${post.title} – ${siteConfig.name}`,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedProjects = post.relatedProjectSlugs
    .map((projectSlug) => getProject(projectSlug))
    .filter((project) => Boolean(project));

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      <article className="article-page">
        <Link className="back-link" href="/blog">
          Blog
        </Link>
        <header className="article-page__header">
          <p className="eyebrow">{post.tags.join(' / ')}</p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div>
            <span>{post.readingTime}</span>
            <span>{post.publishedAt}</span>
          </div>
        </header>
        <div className="mdx-content">
          <BlogContent slug={post.slug} />
        </div>
        {relatedProjects.length > 0 ? (
          <aside className="related-projects" aria-label="Related projects">
            <h2>Related project proof</h2>
            <ul>
              {relatedProjects.map((project) => (
                <li key={project!.slug}>
                  <Link href={`/projects/${project!.slug}`}>{project!.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </>
  );
}
