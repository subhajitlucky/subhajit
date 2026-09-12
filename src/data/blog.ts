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
    title: 'AI can plan a transaction. The wallet must approve it.',
    slug: 'intent-driven-blockchain-interfaces',
    description:
      'A transaction planner can generate intent, but execution stays behind an explicit wallet review boundary.',
    publishedAt: '2026-05-27',
    updatedAt: '2026-09-12',
    readingTime: '3 min read',
    tags: ['Blockchain', 'Security', 'UX'],
    keywords: [
      'transaction planning',
      'wallet approval boundary',
      'AI blockchain security',
    ],
    relatedProjectSlugs: ['intentpay'],
  },
  {
    title: 'Multi-agent systems need state, not prompt chains.',
    slug: 'multi-agent-ai-debate-platforms',
    description:
      'Reliable agent workflows need explicit state, provider boundaries, isolated credentials, and inspectable execution.',
    publishedAt: '2026-05-27',
    updatedAt: '2026-09-12',
    readingTime: '3 min read',
    tags: ['AI', 'Architecture', 'Node.js'],
    keywords: [
      'multi-agent workflow state',
      'AI provider boundaries',
      'agent architecture',
    ],
    relatedProjectSlugs: ['tarka-sabha'],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
