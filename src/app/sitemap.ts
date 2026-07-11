import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import { absoluteUrl } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-07-11');
  const staticRoutes = ['/', '/projects', '/blog', '/llms.txt'].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const homepageSectionRoutes = ['#projects', '#experience', '#skills', '#writing', '#contact'].map((hash) => ({
    url: absoluteUrl(`/${hash}`),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...homepageSectionRoutes, ...projectRoutes, ...blogRoutes];
}
