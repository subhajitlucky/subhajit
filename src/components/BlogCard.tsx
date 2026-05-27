import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost } from '@/data/blog';

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog-card">
      <div className="blog-card__meta">
        <span>{post.readingTime}</span>
        <span>{new Date(`${post.publishedAt}T00:00:00`).getFullYear()}</span>
      </div>
      <h3>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.description}</p>
      <ul className="tag-list" aria-label={`${post.title} tags`}>
        {post.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <Link className="text-link" href={`/blog/${post.slug}`}>
        Read article
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
