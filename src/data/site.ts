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
    label: 'Product engineering',
    items: ['TypeScript', 'React', 'Next.js', 'Node.js'],
  },
  {
    label: 'Backend and data',
    items: ['Python', 'PostgreSQL', 'SQL', 'Prisma'],
  },
  {
    label: 'AI and developer tools',
    items: ['Agent workflows', 'CLI design', 'Vitest', 'GitHub Actions'],
  },
] as const;

export const education = {
  organization: 'Centurion University of Technology and Management',
  location: 'Bhubaneswar, India',
  degree: 'Bachelor of Computer Applications',
  period: 'Oct 2022-Apr 2025',
  grade: 'CGPA 8.9',
} as const;
