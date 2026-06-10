export const siteConfig = {
  name: 'Subhajit Pradhan',
  headline: 'Subhajit Pradhan builds full-stack, AI, and blockchain products.',
  role: 'Full Stack & Blockchain Developer',
  baseUrl: 'https://subhajitpradhan.vercel.app',
  location: 'Odisha, India',
  email: 'subhajitpradhan310@gmail.com',
  resumePath: '/assets/Subhajit_ResumeV8.pdf',
  availability: 'Open to full-stack, blockchain, and AI product engineering roles',
  description:
    'Full-stack developer building practical web apps, AI workflows, and blockchain interfaces with clear UX, maintainable backends, and shipped deployments.',
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
    { label: 'Work', href: '/#projects' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Writing', href: '/#writing' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

export const profileSummary = {
  short:
    'I focus on product UX, backend boundaries, data flows, deployment, and safer wallet-driven interfaces.',
} as const;

export const proofPoints = [
  {
    label: 'Built beyond tutorials',
    value: 'Auth, uploads, search, data models, deployment, and product flows that can be inspected.',
  },
  {
    label: 'Explains tradeoffs',
    value: 'Case studies cover problem framing, architecture choices, limitations, and next steps.',
  },
  {
    label: 'Keeps UX practical',
    value: 'Interfaces prioritize clear states, safe actions, readable code, and reviewer-friendly proof.',
  },
] as const;

export const experience = [
  {
    organization: 'uElement',
    title: 'Software Engineer Intern',
    period: '2026',
    summary:
      'Contributed to product engineering tasks with focus on readable implementation, debugging, and maintainable handoff.',
  },
  {
    organization: 'QuadB Technologies',
    title: 'Software Engineer Trainee',
    period: '2025',
    summary:
      'Practiced full-stack delivery habits across implementation, issue investigation, Git workflows, and team review cycles.',
  },
  {
    organization: 'Centurion University',
    title: 'BCA · 8.9 CGPA',
    period: '2022-2025',
    summary:
      'Studied computer applications while building inspectable full-stack, AI, and blockchain projects with source and demos.',
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
