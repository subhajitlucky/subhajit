export const siteConfig = {
  name: 'Subhajit Pradhan',
  shortName: 'SP',
  role: 'Full-Stack Product Engineer',
  summary:
    'I build systems that make software verifiable — static analysis, database security, and a language model trained from scratch.',
  location: 'Odisha, India',
  availability: 'Open to full-stack product engineering roles',
  email: 'subhajitpradhan310@gmail.com',
  baseUrl: 'https://subhajitpradhan.vercel.app',
  resumePath: '/resume.pdf',
  description:
    'Full-Stack Product Engineer building systems that make software verifiable.',
  links: {
    github: 'https://github.com/subhajitlucky',
    linkedin: 'https://www.linkedin.com/in/subhajitlucky',
    email: 'mailto:subhajitpradhan310@gmail.com',
  },
  nav: [
    { label: 'Work', href: '/projects' },
    { label: 'KALIA', href: '/kalia' },
    { label: 'Writing', href: '/writing' },
    { label: 'Resume', href: '/resume.pdf' },
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
    period: 'May 2026-Present',
    location: 'Remote',
    summary:
      'Owned backend delivery in the final phase: production APIs, authentication and RBAC, background jobs on GCP, and SQL and dashboard performance.',
  },
  {
    organization: 'uElement Technologies',
    title: 'Associate Blockchain Developer',
    period: 'Jan 2026-May 2026',
    location: 'Remote',
    summary:
      'Built Next.js applications and integrated smart-contract interactions and transaction monitoring into production systems.',
  },
];
