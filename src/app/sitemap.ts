import type { MetadataRoute } from 'next';
import { posts } from '@/data/posts';
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
    {
      url: `${siteConfig.baseUrl}/writing`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.baseUrl}/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.8 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.baseUrl}/writing/${post.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];
}
