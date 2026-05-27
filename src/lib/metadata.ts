import type { Metadata } from 'next';
import { absoluteUrl, faqs, siteConfig } from '@/data/site';
import type { BlogPost } from '@/data/blog';
import type { Project } from '@/data/projects';

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

export function createMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl('/opengraph-image');

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.baseUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type,
      publishedTime,
      modifiedTime,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    email: siteConfig.email,
    jobTitle: siteConfig.role,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Odisha',
      addressCountry: 'IN',
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: [
      'Full stack development',
      'Blockchain development',
      'Solidity',
      'Next.js',
      'React',
      'Node.js',
      'PostgreSQL',
      'AI product workflows',
    ],
    description: siteConfig.description,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.name} Portfolio`,
    url: siteConfig.baseUrl,
    description: siteConfig.description,
    inLanguage: 'en',
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  };
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function itemListJsonLd<T extends { title: string; slug: string }>(
  name: string,
  pathPrefix: string,
  items: T[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: absoluteUrl(`${pathPrefix}/${item.slug}`),
    })),
  };
}

export function projectJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    codeRepository: project.github,
    url: absoluteUrl(`/projects/${project.slug}`),
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.baseUrl,
    },
    programmingLanguage: project.stack,
    keywords: project.seoKeywords.join(', '),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    keywords: post.keywords.join(', '),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}
