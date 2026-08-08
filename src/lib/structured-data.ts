import { featuredProjects } from '@/data/projects';
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
    ...featuredProjects.map((project) => ({
      '@type': 'SoftwareSourceCode',
      '@id': `${siteConfig.baseUrl}/projects/${project.slug}#project`,
      name: project.title,
      description: project.summary,
      url: `${siteConfig.baseUrl}/projects/${project.slug}`,
      codeRepository: project.links.find((link) => link.kind === 'source')?.href,
      programmingLanguage: project.stack,
      author: { '@id': personId },
    })),
  ],
};
