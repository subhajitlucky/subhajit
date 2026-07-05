import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import { absoluteUrl } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/projects', '/blog'].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date('2026-05-27'),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const homepageSectionRoutes = ['#projects', '#experience', '#about', '#contact'].map((hash) => ({
    url: absoluteUrl(`/${hash}`),
    lastModified: new Date('2026-05-27'),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date('2026-05-27'),
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
