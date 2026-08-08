import { featuredProjects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { rootMetadata } from '@/lib/metadata';
import { structuredData } from '@/lib/structured-data';

describe('portfolio discovery metadata', () => {
  it('uses the canonical portfolio origin and hiring-focused root metadata', () => {
    expect(siteConfig.baseUrl).toBe('https://subhajitpradhan.vercel.app');
    expect(rootMetadata.metadataBase?.toString()).toBe(`${siteConfig.baseUrl}/`);
    expect(rootMetadata.title).toEqual(
      expect.objectContaining({ default: expect.stringMatching(/full stack software developer/i) }),
    );
    expect(rootMetadata.description).toMatch(/web products, developer tools, and ai systems/i);
    expect(rootMetadata.openGraph).toEqual(
      expect.objectContaining({ title: `${siteConfig.name} | Full Stack Software Developer` }),
    );
    expect(siteConfig.resumePath).toBe('/resume.pdf');
  });

  it('publishes a Person and one CreativeWork entry for every featured project', () => {
    expect(structuredData['@graph']).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'Person', name: siteConfig.name })]),
    );

    const creativeWorks = structuredData['@graph'].filter(
      (entry) => entry['@type'] === 'SoftwareSourceCode',
    );
    expect(creativeWorks).toHaveLength(featuredProjects.length);
    expect(creativeWorks.map((entry) => entry.name)).toEqual(
      featuredProjects.map((project) => project.title),
    );
  });
});
