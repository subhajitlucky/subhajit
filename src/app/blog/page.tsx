import BlogCard from '@/components/BlogCard';
import JsonLd from '@/components/JsonLd';
import { blogPosts } from '@/data/blog';
import { siteConfig } from '@/data/site';
import { createMetadata, itemListJsonLd } from '@/lib/metadata';

export const metadata = createMetadata({
  title: `Blog – ${siteConfig.name}`,
  description:
    'My technical writing on full-stack development, blockchain interfaces, AI workflows, portfolio SEO, and practical product engineering.',
  path: '/blog',
  keywords: ['Subhajit Pradhan blog', 'Subhajit Pradhan developer writing'],
});

export default function BlogPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd('Subhajit Pradhan technical blog', '/blog', blogPosts)} />
      <section className="page-hero page-hero--compact">
        <p className="eyebrow">Technical blog</p>
        <h1>Engineering notes</h1>
        <p>
          Short notes on full-stack product decisions, blockchain UX, AI orchestration, performance,
          and the engineering choices behind my projects.
        </p>
      </section>
      <section className="index-grid index-grid--blog" aria-label="Blog posts">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </section>
    </>
  );
}
