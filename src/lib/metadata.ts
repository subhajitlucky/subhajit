import type { Metadata } from 'next';
import type { Project } from '@/data/projects';
import { siteConfig } from '@/data/site';

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.baseUrl }],
  creator: siteConfig.name,
  keywords: [
    'full-stack product engineer',
    'product engineer',
    'product engineering',
    'web product engineer',
    'AI systems',
    'developer tools',
    'TypeScript',
    'Next.js',
    'PostgreSQL',
    'open source',
  ],
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    url: siteConfig.baseUrl,
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    siteName: `${siteConfig.name} Portfolio`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${siteConfig.name} portfolio` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    images: ['/opengraph-image'],
  },
};

export function createProjectMetadata(project: Project): Metadata {
  const canonicalPath = `/projects/${project.slug}`;

  return {
    title: `${project.title} case study`,
    description: project.summary,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      title: `${project.title} case study | ${siteConfig.name}`,
      description: project.summary,
      images: ['/opengraph-image'],
    },
  };
}
