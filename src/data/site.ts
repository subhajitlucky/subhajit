export const siteConfig = {
  name: 'Subhajit Pradhan',
  shortName: 'SP',
  role: 'Full Stack Software Developer',
  summary:
    'I build reliable web products, developer tools, and AI systems using TypeScript, Next.js, Python, and PostgreSQL.',
  location: 'Odisha, India',
  availability: 'Open to remote roles worldwide',
  email: 'subhajitpradhan310@gmail.com',
  baseUrl: 'https://subhajitpradhan.vercel.app',
  resumePath: '/resume.pdf',
  description:
    'Full stack software developer building reliable web products, developer tools, and AI systems.',
  links: {
    github: 'https://github.com/subhajitlucky',
    linkedin: 'https://www.linkedin.com/in/subhajitlucky',
    email: 'mailto:subhajitpradhan310@gmail.com',
  },
  nav: [
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
    organization: 'Giakaa Capital',
    title: 'Full Stack Software Developer',
    period: 'May 2026-Present',
    location: 'Remote',
  },
  {
    organization: 'uElement Technologies',
    title: 'Software Developer Intern',
    period: 'Jan 2026-May 2026',
    location: 'Remote',
    summary:
      'Built modular Next.js applications and blockchain-integrated workflows with clear frontend, backend, and transaction boundaries.',
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
    label: 'Core',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Go', 'Rust'],
  },
  {
    label: 'Product systems',
    items: ['React', 'Next.js', 'Node.js', 'REST APIs', 'PostgreSQL', 'Prisma'],
  },
  {
    label: 'Tools and delivery',
    items: ['CLI design', 'Vitest', 'GitHub Actions', 'Docker', 'Linux', 'Vercel'],
  },
  {
    label: 'AI systems',
    items: ['Agent workflows', 'Multi-provider routing', 'Structured outputs', 'Prompt systems'],
  },
] as const;

export const education = {
  organization: 'Centurion University of Technology and Management',
  location: 'Bhubaneswar, India',
  degree: 'Bachelor of Computer Applications',
  period: 'Oct 2022-Apr 2025',
  grade: 'CGPA 8.9',
} as const;
