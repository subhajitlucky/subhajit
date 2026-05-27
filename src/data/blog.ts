export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  tags: string[];
  keywords: string[];
  relatedProjectSlugs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: 'Designing intent-driven blockchain interfaces without hiding risk',
    slug: 'intent-driven-blockchain-interfaces',
    description:
      'How Subhajit Pradhan thinks about mapping natural-language intent to explicit wallet and smart contract workflows.',
    publishedAt: '2026-05-27',
    updatedAt: '2026-05-27',
    readingTime: '5 min read',
    tags: ['Blockchain', 'Product UX', 'Solidity'],
    keywords: [
      'Subhajit Pradhan blockchain developer',
      'intent driven blockchain UX',
      'full stack blockchain developer',
    ],
    relatedProjectSlugs: ['intentpay', 'quantumticket'],
  },
  {
    title: 'What a useful multi-agent AI project needs beyond prompts',
    slug: 'multi-agent-ai-debate-platforms',
    description:
      'A practical note from Subhajit Pradhan on provider boundaries, credential handling, and workflow state in AI applications.',
    publishedAt: '2026-05-27',
    updatedAt: '2026-05-27',
    readingTime: '4 min read',
    tags: ['AI', 'Node.js', 'Architecture'],
    keywords: [
      'Subhajit Pradhan developer',
      'multi agent AI app architecture',
      'Node.js AI orchestration',
    ],
    relatedProjectSlugs: ['tarka-sabha'],
  },
  {
    title: 'Building a portfolio that recruiters and search engines can read',
    slug: 'portfolio-seo-architecture',
    description:
      'Why Subhajit Pradhan structures a portfolio around indexable proof, project decisions, and fast server-rendered pages.',
    publishedAt: '2026-05-27',
    updatedAt: '2026-05-27',
    readingTime: '6 min read',
    tags: ['SEO', 'Next.js', 'Career'],
    keywords: [
      'Subhajit Pradhan full stack developer',
      'developer portfolio SEO',
      'Next.js portfolio architecture',
    ],
    relatedProjectSlugs: [],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
