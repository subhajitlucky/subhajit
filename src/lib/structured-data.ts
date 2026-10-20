import type { Post } from '@/data/posts';
import type { Project } from '@/data/projects';
import { siteConfig } from '@/data/site';

const personId = `${siteConfig.baseUrl}/#person`;

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: siteConfig.name,
      url: siteConfig.baseUrl,
      jobTitle: siteConfig.role,
      email: siteConfig.email,
      homeLocation: {
        '@type': 'Place',
        name: siteConfig.location,
      },
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    },
  ],
};

export function postStructuredData(post: Post) {
  const url = `${siteConfig.baseUrl}/writing/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `${siteConfig.baseUrl}/opengraph-image`,
    author: { '@type': 'Person', '@id': personId, name: siteConfig.name, url: siteConfig.baseUrl },
    publisher: { '@type': 'Person', '@id': personId, name: siteConfig.name, url: siteConfig.baseUrl },
    keywords: post.tags.join(', '),
    timeRequired: `PT${post.readingMinutes}M`,
  };
}

export function projectStructuredData(project: Project) {
  const url = `${siteConfig.baseUrl}/projects/${project.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': `${url}#project`,
    name: project.title,
    description: project.summary,
    url,
    codeRepository: project.links.find((link) => link.kind === 'source')?.href,
    programmingLanguage: project.stack,
    keywords: project.stack.join(', '),
    author: { '@type': 'Person', '@id': personId, name: siteConfig.name, url: siteConfig.baseUrl },
  };
}
