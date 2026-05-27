import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';
import {
  blogPostingJsonLd,
  createMetadata,
  faqJsonLd,
  itemListJsonLd,
  personJsonLd,
  projectJsonLd,
} from '@/lib/metadata';

describe('metadata helpers', () => {
  it('creates canonical metadata with OpenGraph and Twitter cards', () => {
    const metadata = createMetadata({
      title: siteConfig.headline,
      description: siteConfig.description,
      path: '/projects/intentpay',
    });

    expect(metadata.alternates?.canonical).toBe(
      'https://subhajitpradhan.vercel.app/projects/intentpay',
    );
    expect(metadata.openGraph?.url).toBe(
      'https://subhajitpradhan.vercel.app/projects/intentpay',
    );
    expect(JSON.stringify(metadata.twitter)).toContain('summary_large_image');
  });

  it('generates Person and FAQ schema for search results', () => {
    const person = personJsonLd();
    const faq = faqJsonLd();

    expect(person['@type']).toBe('Person');
    expect(person.name).toBe('Subhajit Pradhan');
    expect(person.sameAs).toContain('https://github.com/subhajitlucky');
    expect(faq['@type']).toBe('FAQPage');
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(3);
  });

  it('generates item, project, and article schema', () => {
    const itemList = itemListJsonLd('Projects', '/projects', projects);
    const project = projectJsonLd(projects[0]);
    const article = blogPostingJsonLd(blogPosts[0]);

    expect(itemList.itemListElement).toHaveLength(projects.length);
    expect(project['@type']).toBe('SoftwareSourceCode');
    expect(project.codeRepository).toContain('github.com');
    expect(article['@type']).toBe('BlogPosting');
    expect(article.author.name).toBe(siteConfig.name);
  });
});
