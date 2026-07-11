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
    title: 'AI can draft a transaction. It should not execute one.',
    slug: 'intent-driven-blockchain-interfaces',
    description:
      'The product boundary I use in IntentPay: natural language can prepare a plan, but every wallet action needs visible review.',
    publishedAt: '2026-05-27',
    updatedAt: '2026-05-27',
    readingTime: '6 min read',
    tags: ['Blockchain', 'Product UX', 'Solidity'],
    keywords: [
      'Subhajit Pradhan blockchain developer',
      'intent driven blockchain UX',
      'full stack blockchain developer',
    ],
    relatedProjectSlugs: ['intentpay'],
  },
  {
    title: 'Multi-agent apps need workflow state, not just better prompts',
    slug: 'multi-agent-ai-debate-platforms',
    description:
      'What Tarka Sabha taught me about provider boundaries, credential handling, and making AI output inspectable.',
    publishedAt: '2026-05-27',
    updatedAt: '2026-05-27',
    readingTime: '5 min read',
    tags: ['AI', 'Node.js', 'Architecture'],
    keywords: [
      'Subhajit Pradhan developer',
      'multi agent AI app architecture',
      'Node.js AI orchestration',
    ],
    relatedProjectSlugs: ['tarka-sabha'],
  },
  {
    title: 'A portfolio should behave like a product review surface',
    slug: 'portfolio-seo-architecture',
    description:
      'How I changed this portfolio to reduce scan fatigue and put proof, tradeoffs, and source links before decoration.',
    publishedAt: '2026-05-27',
    updatedAt: '2026-05-27',
    readingTime: '5 min read',
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
