export const siteConfig = {
  name: 'Subhajit Pradhan',
  shortName: 'SP',
  role: 'Full-Stack Product Engineer',
  summary:
    'I build web products and AI systems, from the interface to the infrastructure.',
  location: 'Odisha, India',
  availability: 'Open to remote roles',
  email: 'subhajitpradhan310@gmail.com',
  baseUrl: 'https://subhajitpradhan.vercel.app',
  resumePath: '/resume.pdf',
  description:
    'Full-Stack Product Engineer building web products and AI systems.',
  links: {
    github: 'https://github.com/subhajitlucky',
    linkedin: 'https://www.linkedin.com/in/subhajitlucky',
    email: 'mailto:subhajitpradhan310@gmail.com',
  },
  nav: [
    { label: 'KALIA', href: '/kalia' },
    { label: 'Writing', href: '/writing' },
    { label: 'Email', href: 'mailto:subhajitpradhan310@gmail.com' },
    { label: 'Resume', href: '/resume.pdf' },
    { label: 'GitHub', href: 'https://github.com/subhajitlucky' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/subhajitlucky' },
  ],
} as const;

export type Experience = {
  organization: string;
  title: string;
  period: string;
  location: string;
  summary?: string;
};

export const experience: Experience[] = [
  {
    organization: 'Giakaa (Kailanchal Technologies Pvt Ltd)',
    title: 'Full Stack Software Developer',
    period: 'May 2026-Nov 2026',
    location: 'Remote',
    summary:
      'Full-stack features in Next.js, TypeScript, PostgreSQL and ClickHouse; backend APIs and background processing on GCP.',
  },
  {
    organization: 'uElement Technologies',
    title: 'Associate Blockchain Developer',
    period: 'Jan 2026-May 2026',
    location: 'Remote',
    summary:
      'Built Next.js applications and blockchain-integrated workflows across frontend, backend, and transaction boundaries.',
  },
  {
    organization: 'QuadB Technologies',
    title: 'Software Engineering Trainee',
    period: 'Feb 2025-Mar 2025',
    location: 'Remote',
    summary:
      'Built canister-backed applications and smart-contract exercises on the Internet Computer using Motoko and Rust.',
  },
];

export const skillGroups = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Java', 'C++', 'Rust', 'Solidity'],
  },
  {
    label: 'Product engineering',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'REST APIs'],
  },
  {
    label: 'Backend and data',
    items: ['PostgreSQL', 'Supabase', 'Prisma', 'ClickHouse', 'MongoDB'],
  },
  {
    label: 'AI and developer tools',
    items: [
      'OpenAI / Anthropic / Gemini APIs',
      'AI SDK',
      'LLM tool-calling',
      'MCP',
      'Agent workflows',
      'CLI design',
      'Vitest',
    ],
  },
  {
    label: 'Cloud and DevOps',
    items: ['Docker', 'GCP', 'GitHub Actions', 'Linux', 'CI/CD', 'Vercel', 'Railway'],
  },
  {
    label: 'Blockchain',
    items: ['Ethereum', 'Solidity', 'Hardhat', 'Ethers.js', 'Internet Computer (Motoko)'],
  },
] as const;

export const education = {
  organization: 'Centurion University of Technology and Management',
  location: 'Bhubaneswar, India',
  degree: 'Bachelor of Computer Applications',
  period: '2022-2025',
  grade: 'CGPA 8.9',
} as const;
