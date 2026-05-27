export const siteConfig = {
  name: 'Subhajit Pradhan',
  headline: 'Subhajit Pradhan – Full Stack & Blockchain Developer',
  role: 'Full Stack & Blockchain Developer',
  baseUrl: 'https://subhajitpradhan.vercel.app',
  location: 'Odisha, India',
  email: 'subhajitpradhan310@gmail.com',
  resumePath: '/assets/Subhajit_ResumeV8.pdf',
  availability: 'Open to full-stack, blockchain, and AI product engineering roles',
  description:
    'I am a full stack and blockchain developer building AI-assisted products, backend APIs, smart contract workflows, and production-ready web applications.',
  keywords: [
    'Subhajit Pradhan',
    'Subhajit Pradhan developer',
    'Subhajit Pradhan full stack developer',
    'Subhajit Pradhan blockchain developer',
    'full stack developer Odisha',
    'blockchain developer India',
    'React developer',
    'Next.js developer',
    'Solidity developer',
  ],
  links: {
    github: 'https://github.com/subhajitlucky',
    linkedin: 'https://www.linkedin.com/in/subhajitlucky',
    email: 'mailto:subhajitpradhan310@gmail.com',
  },
  nav: [
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

export const profileSummary = {
  short:
    'I build practical software across product UX, backend systems, data, deployment, and blockchain workflows.',
  long: [
    'I am Subhajit Pradhan, a full stack and blockchain developer from Odisha, India. I care about useful products, clear interfaces, maintainable code, and systems that can be explained after they ship.',
    'My work spans React and Next.js interfaces, Node.js APIs, PostgreSQL-backed workflows, Solidity contracts, AI orchestration, and Vercel deployments. This site is intentionally short: scan the projects, inspect the code, read the tradeoffs, and email me if the work fits your team.',
  ],
} as const;

export const proofPoints = [
  {
    label: 'Full-stack delivery',
    value: 'Product UX, API design, auth, search, uploads, data models, and deployment.',
  },
  {
    label: 'Blockchain systems',
    value: 'Solidity, Ethers.js, wallet workflows, NFT ticketing, and intent-driven transaction UX.',
  },
  {
    label: 'AI product workflows',
    value: 'Multi-provider orchestration, prompt flows, credential boundaries, and agentic interfaces.',
  },
] as const;

export const skillGroups = [
  {
    name: 'Frontend',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Accessibility', 'Responsive UI'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'Auth flows', 'File uploads'],
  },
  {
    name: 'Data',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Search', 'Schema design'],
  },
  {
    name: 'Blockchain',
    skills: ['Solidity', 'Ethers.js', 'Hardhat', 'Wallet UX', 'NFT contracts'],
  },
  {
    name: 'AI',
    skills: ['LLM orchestration', 'Prompt workflows', 'Agent systems', 'Provider APIs'],
  },
  {
    name: 'Infrastructure',
    skills: ['Vercel', 'Docker', 'Linux', 'Git', 'AWS basics'],
  },
] as const;

export const experience = [
  {
    organization: 'uElement',
    title: 'Software Engineer Intern',
    period: '2026',
    summary:
      'Worked across product engineering tasks with an emphasis on maintainable implementation and shipping discipline.',
  },
  {
    organization: 'QuadB Technologies',
    title: 'Software Engineer Trainee',
    period: '2025',
    summary:
      'Built practical software engineering habits around full-stack delivery, debugging, and team workflows.',
  },
  {
    organization: 'Centurion University',
    title: 'BCA · 8.9 CGPA',
    period: '2022-2025',
    summary:
      'Studied computer applications while building independent full-stack, AI, and blockchain projects.',
  },
] as const;

export const currentlyBuilding = [
  {
    title: 'IntentPay',
    summary:
      'A natural-language intent layer for blockchain payments and DeFi transaction preparation.',
  },
  {
    title: 'Tarka Sabha',
    summary:
      'A multi-agent AI debate platform with clean provider boundaries and secure credential handling.',
  },
  {
    title: 'Technical writing system',
    summary:
      'A long-form blog architecture for documenting engineering decisions, tradeoffs, and project learnings.',
  },
] as const;

export const openSourceWork = [
  {
    name: 'GitHub profile',
    href: siteConfig.links.github,
    summary: 'Source code for full-stack, blockchain, AI, and portfolio projects.',
  },
  {
    name: 'IntentPay',
    href: 'https://github.com/subhajitlucky/intentpay',
    summary: 'Open project exploring intent-first blockchain transaction UX.',
  },
  {
    name: 'QuantumTicket',
    href: 'https://github.com/subhajitlucky/quantumTicket',
    summary: 'Smart contract ticketing project using NFT-based event tickets.',
  },
] as const;

export const faqs = [
  {
    question: 'Who am I?',
    answer:
      'I am Subhajit Pradhan, a full stack and blockchain developer from Odisha, India.',
  },
  {
    question: 'What do I build?',
    answer:
      'I build web applications, APIs, data-backed workflows, smart contract interfaces, and AI-assisted products.',
  },
  {
    question: 'Am I open to roles?',
    answer:
      'Yes. I am open to full-stack engineering, blockchain, and AI product engineering conversations.',
  },
  {
    question: 'Where can you inspect my work?',
    answer:
      'Start with the selected projects, GitHub repositories, live demos, and short writing notes linked from this site.',
  },
] as const;

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.baseUrl}${normalizedPath}`;
}
