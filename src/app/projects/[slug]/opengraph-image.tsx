import { ImageResponse } from 'next/og';

import { ArticleOgImage } from '@/components/ArticleOgImage';
import { getProject, projects } from '@/data/projects';
import { siteConfig } from '@/data/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? 'Project case study';
  const description = project?.summary ?? siteConfig.summary;
  const category = project ? `${project.category} · ${project.status}` : 'Case study';

  return new ImageResponse(
    (
      <ArticleOgImage
        eyebrow="Case study"
        meta={category}
        title={title}
        description={description}
      />
    ),
    size,
  );
}
