import { projects } from '@/data/projects';

export const siteConfig = {
  name: 'Subhajit Pradhan',
  headline: 'Subhajit Pradhan',
  role: 'Software Engineer · Developer Tools · AI Products',
  baseUrl: 'https://subhajitpradhan.vercel.app',
  location: 'Odisha, India',
  email: 'subhajitpradhan310@gmail.com',
  resumePath: '/assets/Subhajit_ResumeV9.pdf',
  availability: 'Open to software engineering, full-stack, and AI product engineering roles',
  description:
    'Software engineer building developer tools, AI workflows, and production web apps with clear architecture, tests, and shipped deployments.',
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
    { label: 'Skills', href: '/#skills' },
    { label: 'Writing', href: '/#writing' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

export const profileSummary = {
  short:
    'Software engineer building developer tools, AI workflows, and production web apps with clear architecture, tests, and shipped releases.',
  long:
    'I am a software engineer from Odisha, India building production-ready full-stack products, developer tools, AI workflows, and blockchain interfaces. My work emphasizes inspectable architecture, reliable backend boundaries, practical UX, tests, CI, and deployable systems.',
} as const;

export const proofPoints = [
  {
    label: 'Published tools',
    value: 'RLS Doctor and SmritiFlow are installable CLIs with agent-facing workflows.',
  },
  {
    label: 'Readable engineering',
    value: 'Case studies explain architecture, tradeoffs, limitations, tests, and next steps.',
  },
  {
    label: 'Production habits',
    value: 'I prioritize SSR, accessibility, CI, clean data boundaries, and reviewer-friendly proof.',
  },
] as const;

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
