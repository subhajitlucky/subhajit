import { ImageResponse } from 'next/og';

import { ArticleOgImage } from '@/components/ArticleOgImage';
import { getPost, posts } from '@/data/posts';
import { siteConfig } from '@/data/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? 'Writing';
  const description = post?.summary ?? siteConfig.summary;
  const meta = post ? `${post.date} · ${post.readingMinutes} min read` : 'Writing';

  return new ImageResponse(
    (
      <ArticleOgImage eyebrow="Writing" meta={meta} title={title} description={description} />
    ),
    size,
  );
}
