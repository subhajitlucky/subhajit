import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.baseUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.baseUrl}/projects`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.baseUrl}/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.8 : 0.7,
    })),
  ];
}
