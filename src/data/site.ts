import { projects } from '@/data/projects';

const profileDescription =
  'Software engineer building developer tools, multi-agent systems, and production web apps with inspectable architecture, tests, and shipped releases.';

export const siteConfig = {
  name: 'Subhajit Pradhan',
  headline: 'Subhajit Pradhan',
  role: 'Software Engineer - Developer Tools, AI Systems, Full Stack',
  baseUrl: 'https://subhajitpradhan.vercel.app',
  location: 'Odisha, India',
  email: 'subhajitpradhan310@gmail.com',
  resumePath: '/assets/Subhajit_Resume.pdf',
  availability:
    'Open to software engineering roles across developer tools, full-stack systems, and AI product engineering',
  description: profileDescription,
  keywords: [
    'Subhajit Pradhan',
    'Subhajit Pradhan software engineer',
    'developer tools engineer',
    'multi-agent systems',
    'Postgres RLS',
    'Next.js TypeScript',
    'full stack developer Odisha',
  ],
  links: {
    github: 'https://github.com/subhajitlucky',
    linkedin: 'https://www.linkedin.com/in/subhajitlucky',
    email: 'mailto:subhajitpradhan310@gmail.com',
  },
  nav: [
    { label: 'Work', href: '/#projects' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Writing', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

export const profileSummary = {
  short: profileDescription,
  long:
    'I am a software engineer from Odisha, India building developer tools, multi-agent workflows, and production full-stack systems. My work emphasizes inspectable architecture, honest tradeoffs, tests, CI, and code peers can review without ceremony.',
} as const;

export const toolFootnotes = [
  {
    title: 'skillscan',
    oneLine:
      'Single-skill repo that inspects a project for agent-skills packaging signals.',
    github: 'https://github.com/subhajitlucky/skillscan',
  },
] as const;

export const featuredProjectSlugs = [
  'rls-doctor',
  'smritiflow',
  'tarka-sabha',
  'cscosmos',
] as const;

export const selectedProjectSlugs = ['campushelper', 'intentpay'] as const;

export const experience = [
  {
    organization: 'Giakaa Capital',
    title: 'Full Stack Software Developer',
    period: 'May 2026 – Present',
    summary:
      'Designed and shipped production-ready full-stack features using Next.js, TypeScript, and PostgreSQL. Built scalable backend APIs and job processing systems to improve application throughput and reliability.',
  },
  {
    organization: 'uElement Technologies',
    title: 'Software Developer Intern',
    period: 'Jan 2026 – May 2026',
    summary:
      'Architected optimized Next.js applications with modular backend design. Developed secure blockchain-integrated systems with smart contract interactions.',
  },
  {
    organization: 'QuadB Technologies',
    title: 'Software Engineering Trainee',
    period: 'Feb 2025 – March 2025',
    summary:
      'Built and deployed smart contracts on Internet Computer Protocol (ICP) using Motoko and Rust, developing decentralized applications with canister-based backend logic.',
  },
  {
    organization: 'Centurion University',
    title: 'BCA · 8.9 CGPA',
    period: '2022 – 2025',
    summary:
      'Studied computer applications while building inspectable full-stack, AI, and systems projects with source and demos.',
  },
] as const;

export const faqs = [
  {
    question: 'Who am I?',
    answer:
      'I am Subhajit Pradhan, a software engineer from Odisha, India focused on developer tools, multi-agent systems, and production web apps.',
  },
  {
    question: 'What do I build?',
    answer:
      'I build CLIs and agent tooling, multi-agent product surfaces, full-stack web systems, and safer AI-assisted interfaces.',
  },
  {
    question: 'Am I open to roles?',
    answer:
      'Yes. I am open to software engineering conversations across developer tools, full-stack systems, and AI product engineering.',
  },
  {
    question: 'Where can you inspect my work?',
    answer:
      'Start with the featured case studies, GitHub repositories, npm packages, live demos, and short writing notes linked from this site.',
  },
] as const;

export const skills = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'SQL', 'Java', 'C++'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'AI & Integrations',
    items: ['OpenAI API', 'Anthropic API', 'Google Gemini API', 'AI SDK', 'LLM Integrations'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Docker', 'Git', 'GitHub Actions', 'Linux', 'Vercel', 'Railway', 'Postman'],
  },
  {
    category: 'Blockchain',
    items: ['Ethereum', 'ICP', 'Solidity', 'Hardhat', 'Ethers.js', 'Web3.js'],
  },
] as const;

export const machineReadableProfile = {
  name: siteConfig.name,
  role: siteConfig.role,
  location: siteConfig.location,
  availability: siteConfig.availability,
  summary: profileSummary.long,
  skills: skills.flatMap((group) => group.items),
  experience: experience.map((item) => ({
    organization: item.organization,
    title: item.title,
    period: item.period,
    summary: item.summary,
  })),
  projects: projects.map((project) => ({
    title: project.title,
    description: project.description,
    stack: project.stack,
    github: project.github,
    demo: project.demo,
  })),
  toolingFootnotes: toolFootnotes.map((item) => ({
    title: item.title,
    description: item.oneLine,
    github: item.github,
  })),
  contact: {
    email: siteConfig.email,
    github: siteConfig.links.github,
    linkedin: siteConfig.links.linkedin,
  },
} as const;

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.baseUrl}${normalizedPath}`;
}
