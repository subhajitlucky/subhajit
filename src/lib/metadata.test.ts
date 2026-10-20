import { posts } from '@/data/posts';
import { featuredProjects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { createProjectMetadata, rootMetadata } from '@/lib/metadata';
import { postStructuredData, structuredData } from '@/lib/structured-data';

describe('portfolio discovery metadata', () => {
  it('uses the canonical portfolio origin and hiring-focused root metadata', () => {
    expect(siteConfig.baseUrl).toBe('https://subhajitpradhan.vercel.app');
    expect(rootMetadata.metadataBase?.toString()).toBe(`${siteConfig.baseUrl}/`);
    expect(rootMetadata.title).toEqual(
      expect.objectContaining({ default: `${siteConfig.name} | ${siteConfig.role}` }),
    );
    expect(rootMetadata.description).toBe(siteConfig.description);
    expect(rootMetadata.openGraph).toEqual(
      expect.objectContaining({ title: `${siteConfig.name} | ${siteConfig.role}` }),
    );
    expect(rootMetadata.twitter).toEqual(
      expect.objectContaining({ title: `${siteConfig.name} | ${siteConfig.role}` }),
    );
    expect(siteConfig.resumePath).toBe('/resume.pdf');
  });

  it('gives project case studies their own Twitter card metadata', () => {
    const project = featuredProjects[0];
    const metadata = createProjectMetadata(project);

    expect(metadata.twitter).toEqual(
      expect.objectContaining({
        card: 'summary_large_image',
        title: `${project.title} case study | ${siteConfig.name}`,
        description: project.summary,
      }),
    );
  });

  it('publishes BlogPosting structured data for writing posts', () => {
    const post = posts[0];
    const data = postStructuredData(post);

    expect(data).toEqual(
      expect.objectContaining({
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.date,
        url: `${siteConfig.baseUrl}/writing/${post.slug}`,
      }),
    );
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
