export type Project = {
  title: string;
  slug: string;
  role: string;
  year: string;
  status: string;
  oneLine: string;
  description: string;
  proof: string[];
  problem: string;
  usersOrContext: string;
  workflow: string;
  architecture: string;
  decisions: string[];
  tradeoffs: string[];
  nextImprovements: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  architectureDiagram: {
    label: string;
    detail: string;
  }[];
  stack: string[];
  tags: string[];
  github: string;
  demo?: string;
  visual: {
    title: string;
    caption: string;
    steps: string[];
  };
  inspectionLinks: {
    label: string;
    href: string;
  }[];
  seoKeywords: string[];
};

export const projects: Project[] = [
{
    title: 'RLS Doctor',
    slug: 'rls-doctor',
    role: 'Developer tools and database security engineer',
    year: '2026',
    status: 'Published CLI',
    oneLine:
      'npm-published Postgres and Supabase RLS auditor with an installable Agent Skill for AI-assisted database reviews.',
    description:
      'RLS Doctor is a TypeScript CLI and repo-hosted Agent Skill for auditing Postgres and Supabase Row Level Security posture from local development, CI, or AI-assisted review workflows.',
    proof: [
      'Published on npm as rls-doctor with npx install-free usage.',
      'Exposes an installable Agent Skill through npx skills add subhajitlucky/rls-doctor.',
      'Runs GitHub Actions across Node 20, Node 22, and a disposable Postgres integration database.',
      'Detects disabled RLS, broad public policies, missing WITH CHECK clauses, and FORCE RLS hardening gaps.',
    ],
    problem:
      'Supabase and Postgres applications can leak tenant or user data through small RLS mistakes: disabled row security, broad anon policies, write policies without WITH CHECK, or tables exposed before policies are reviewed.',
    usersOrContext:
      'Built for developers and teams using Supabase or Postgres who want a fast local and CI check before shipping database policy changes.',
    workflow:
      'A developer runs npx rls-doctor check with a read-only connection string, or installs the rls-doctor Agent Skill so an AI coding agent knows how to audit RLS safely without leaking credentials.',
    architecture:
      'A Node.js and TypeScript CLI reads Postgres catalog views through node-postgres, maps table and pg_policies metadata into a typed audit model, scores findings by severity, and renders text or JSON reports for local terminals and CI.',
    decisions: [
      'Kept the tool local-first and read-only so it does not require Supabase management API access or hosted-account permissions.',
      'Separated catalog loading, risk analysis, and reporters so the scoring logic can be tested without a database connection.',
      'Added a disposable Postgres integration test because catalog metadata can behave differently from mocked fixtures.',
      'Published as an npm CLI so developers can run it with npx instead of cloning the repository.',
      'Packaged the audit workflow as an Agent Skill so compatible AI agents can install the RLS review process from GitHub.',
    ],
    tradeoffs: [
      'Catalog inspection catches common configuration risks, but it cannot prove application-level authorization correctness.',
      'Suggested SQL is intentionally conservative because ownership columns and tenant models vary across projects.',
      'RLS and grants are separate layers in Supabase, so the tool focuses on RLS while documenting grant-review expectations.',
    ],
    nextImprovements: [
      'Add grant inspection for exposed schemas and client roles.',
      'Generate markdown reports for pull request comments.',
      'Add policy diffing between staging and production snapshots.',
    ],
    metrics: [
      { label: 'Distribution', value: 'npm CLI + Agent Skill' },
      { label: 'Install path', value: 'npx rls-doctor' },
      { label: 'Skill install', value: 'npx skills add' },
      { label: 'CI coverage', value: 'Node 20, Node 22, Postgres 16' },
    ],
    architectureDiagram: [
      {
        label: 'CLI command',
        detail: 'Developers run check or explain with a Postgres connection string.',
      },
      {
        label: 'Catalog loader',
        detail: 'node-postgres reads pg_class, pg_namespace, and pg_policies metadata.',
      },
      {
        label: 'Audit analyzer',
        detail: 'Typed rules score RLS-disabled tables, public policies, missing checks, and hardening gaps.',
      },
      {
        label: 'Reporters',
        detail: 'Text output helps humans, while JSON output supports CI and automation.',
      },
      {
        label: 'Integration tests',
        detail: 'Disposable Postgres fixtures verify real catalog behavior before release.',
      },
    ],
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Supabase RLS', 'GitHub Actions', 'npm'],
    tags: ['Developer Tools', 'PostgreSQL', 'Security'],
    github: 'https://github.com/subhajitlucky/rls-doctor',
    demo: 'https://www.npmjs.com/package/rls-doctor',
    visual: {
      title: 'RLS audit pipeline',
      caption:
        'The CLI turns Postgres catalog metadata into actionable security findings for local development and CI.',
      steps: ['Run npx command', 'Load catalog', 'Score RLS risks', 'Explain fixes'],
    },
    inspectionLinks: [
      {
        label: 'npm package',
        href: 'https://www.npmjs.com/package/rls-doctor',
      },
      {
        label: 'Analyzer rules',
        href: 'https://github.com/subhajitlucky/rls-doctor/blob/main/src/audit/analyzer.ts',
      },
      {
        label: 'Postgres integration test',
        href: 'https://github.com/subhajitlucky/rls-doctor/blob/main/scripts/run-integration.js',
      },
      {
        label: 'Agent Skill',
        href: 'https://github.com/subhajitlucky/rls-doctor/blob/main/.agents/skills/rls-doctor/SKILL.md',
      },
      {
        label: 'Supabase RLS guide',
        href: 'https://github.com/subhajitlucky/rls-doctor/blob/main/docs/guides/supabase-rls-patterns.md',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan developer tools engineer',
      'Postgres RLS security CLI',
      'Supabase Row Level Security auditor',
      'TypeScript npm CLI project',
    ],
  },
{
    title: 'SmritiFlow',
    slug: 'smritiflow',
    role: 'Developer tools and AI workflow engineer',
    year: '2026',
    status: 'Published CLI',
    oneLine:
      'CLI for maintaining living repository memory so coding agents can resume work with current project context.',
    description:
      'SmritiFlow is a CLI for maintaining living repository memory for coding agents. It scans a codebase, writes structured artifacts, and generates concise agent-facing docs so work can resume with current context instead of guesswork.',
    proof: [
      'Published as the smritiflow CLI with smritiflow and sf command aliases.',
      'Generates cache, project map, scan report, AGENTS.md, and AI handoff docs.',
      'Includes init, scan, refresh, status, and resume workflows for agent handoffs.',
      'Exposes a repo-hosted Agent Skill through npx skills add subhajitlucky/smritiflow.',
    ],
    problem:
      'Long-running codebase work often loses context between sessions. Agents and developers need a current, structured view of files, changes, active areas, and next actions instead of rebuilding context from scratch.',
    usersOrContext:
      'Built for developers using coding agents who need repeatable repository scans, freshness checks, and handoff summaries.',
    workflow:
      'A developer initializes SmritiFlow in a repo, runs scan or refresh after meaningful changes, checks status before resuming, and uses resume to get focused context for the next work session.',
    architecture:
      'A TypeScript monorepo ships a Node.js CLI, repo parser, git utilities, core workflow commands, artifact generators, and shared constants. Generated JSON artifacts feed concise docs and agent instructions.',
    decisions: [
      'Split parsing, git inspection, generators, and command workflows into packages so each layer can be tested independently.',
      'Generated both machine-readable JSON and human-readable docs because agents need structure while developers need quick summaries.',
      'Added a short sf alias for repeated terminal use without making the primary command ambiguous.',
      'Packaged a repo-hosted Agent Skill so compatible agents know the scan, status, refresh, and resume workflow.',
    ],
    tradeoffs: [
      'Generated summaries can become stale, so the CLI includes status and refresh commands instead of pretending context stays fresh forever.',
      'Repository scanning is useful for orientation, but it should complement direct code inspection rather than replace it.',
      'A CLI-first interface is efficient for developers, but future UI or PR-comment output could improve team adoption.',
    ],
    nextImprovements: [
      'Add richer stale-signal scoring across branches and uncommitted changes.',
      'Generate compact PR handoff summaries.',
      'Add more language-specific route and dependency extraction.',
    ],
    metrics: [
      { label: 'Distribution', value: 'npm CLI + Agent Skill' },
      { label: 'Commands', value: 'init, scan, refresh, status, resume' },
      { label: 'Artifacts', value: 'JSON + AGENTS + docs/ai' },
      { label: 'CLI aliases', value: 'smritiflow, sf' },
    ],
    architectureDiagram: [
      {
        label: 'CLI command',
        detail: 'Developers run init, scan, refresh, status, or resume from the target repository.',
      },
      {
        label: 'Repo parser',
        detail: 'The scanner detects project structure, routes, imports, and relevant files.',
      },
      {
        label: 'Git context',
        detail: 'Git utilities identify changed files and freshness signals.',
      },
      {
        label: 'Artifact generator',
        detail: 'Structured cache, project map, scan report, AGENTS.md, and docs/ai files are written.',
      },
      {
        label: 'Agent resume',
        detail: 'Agents read generated artifacts to resume with current context and next actions.',
      },
    ],
    stack: ['TypeScript', 'Node.js', 'pnpm', 'Vitest', 'Commander', 'Agent Skills'],
    tags: ['Developer Tools', 'AI Agents', 'TypeScript'],
    github: 'https://github.com/subhajitlucky/smritiflow',
    demo: 'https://www.npmjs.com/package/smritiflow',
    visual: {
      title: 'Repository memory loop',
      caption:
        'SmritiFlow turns repository scans into structured memory and concise agent handoff docs.',
      steps: ['Initialize', 'Scan repo', 'Refresh changes', 'Resume work'],
    },
    inspectionLinks: [
      {
        label: 'npm package',
        href: 'https://www.npmjs.com/package/smritiflow',
      },
      {
        label: 'CLI package',
        href: 'https://github.com/subhajitlucky/smritiflow/tree/main/apps/cli',
      },
      {
        label: 'Core workflows',
        href: 'https://github.com/subhajitlucky/smritiflow/tree/main/packages/core/src',
      },
      {
        label: 'Agent Skill',
        href: 'https://github.com/subhajitlucky/smritiflow/blob/main/.agents/skills/smritiflow/SKILL.md',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan developer tools engineer',
      'AI agent repository memory CLI',
      'SmritiFlow coding agent workflow',
      'TypeScript CLI project',
    ],
  },
{
    title: 'Tarka Sabha',
    slug: 'tarka-sabha',
    role: 'Full-stack engineer',
    year: '2026',
    status: 'Live platform',
    oneLine:
      'Multi-agent AI debate platform with provider routing, persona state, and encrypted credentials.',
    description:
      'Tarka Sabha is a multi-agent AI debate platform that coordinates configurable personas, multiple model providers, and inspectable debate workflows.',
    proof: [
      'Supports configurable personas and multiple model providers behind one debate flow.',
      'Uses sequential and mention-aware orchestration to control speaker turns.',
      'Encrypts provider API keys at rest with AES-256-GCM.',
    ],
    problem:
      'AI debate workflows need a structured way to coordinate multiple model providers, user prompts, and credentials without mixing product logic with provider-specific details.',
    usersOrContext:
      'Built for users who want to run and compare AI-assisted debate flows through a web interface.',
    workflow:
      'A user defines the debate context, configures model access, starts the debate flow, and reviews generated arguments from participating AI agents.',
    architecture:
      'A Next.js App Router application uses PostgreSQL and Prisma for auth-backed workflow records while a provider adapter coordinates model calls and encrypted credentials.',
    decisions: [
      'Separated provider orchestration from the interface so model integrations can change without reshaping the user flow.',
      'Kept credential handling behind backend boundaries instead of exposing provider keys to the browser.',
      'Structured the project around debate workflow state rather than scattered prompt experiments.',
    ],
    tradeoffs: [
      'Supporting multiple providers increases orchestration complexity compared with a single-model implementation.',
    ],
    nextImprovements: [
      'Add richer debate history views.',
      'Improve response comparison and citation displays.',
    ],
    metrics: [
      { label: 'Model boundary', value: 'Provider calls stay server-side' },
      { label: 'Core workflow', value: 'Topic, roles, turns, output' },
      { label: 'Primary design goal', value: 'Inspectable multi-agent state' },
      { label: 'Data layer', value: 'Prisma-backed workflow records' },
    ],
    architectureDiagram: [
      {
        label: 'Debate setup',
        detail: 'User defines the topic, debate context, and agent roles.',
      },
      {
        label: 'Workflow state',
        detail: 'Application state tracks agent turns and generated arguments.',
      },
      {
        label: 'Backend boundary',
        detail: 'Provider keys and model calls stay outside the browser.',
      },
      {
        label: 'AI providers',
        detail: 'Model-specific responses are coordinated behind the same product flow.',
      },
      {
        label: 'Review UI',
        detail: 'The interface presents generated arguments for comparison and inspection.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    tags: ['AI', 'Next.js', 'TypeScript'],
    github: 'https://github.com/subhajitlucky/tarkaSabha',
    demo: 'https://tarkasabha.vercel.app',
    visual: {
      title: 'Debate workflow state',
      caption: 'The product separates debate setup, agent turns, provider calls, and generated output.',
      steps: ['Topic setup', 'Agent roles', 'Provider boundary', 'Debate output'],
    },
    inspectionLinks: [
      {
        label: 'App source',
        href: 'https://github.com/subhajitlucky/tarkaSabha/tree/main/src',
      },
      {
        label: 'Data model',
        href: 'https://github.com/subhajitlucky/tarkaSabha/tree/main/prisma',
      },
      {
        label: 'README',
        href: 'https://github.com/subhajitlucky/tarkaSabha/blob/main/README.md',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan developer',
      'multi agent AI debate platform',
      'React Node AI project',
    ],
  },
{
    title: 'CSCosmos',
    slug: 'cscosmos',
    role: 'Product and frontend platform engineer',
    year: '2026',
    status: 'Live platform',
    oneLine:
      'Curated computer science learning hub organizing 172 visual microsite modules across eight engineering domains.',
    description:
      'CSCosmos is a React and TypeScript learning platform that maps 172 computer science topics, tracks 34 live microsites, and routes learners through domain pages, search, topic details, and live module launches.',
    proof: [
      'Models 172 topics across Full Stack, DSA, Web3, Security, AI, Core CS, DevOps, and Advanced Systems.',
      'Links 34 live microsites from a single searchable hub with active versus coming-soon states.',
      'Ships metadata, robots.txt, sitemap.xml, and llms.txt to make the platform easier to inspect.',
    ],
    problem:
      'Computer science visualizers are usually scattered across separate demos and articles, which makes it hard for learners to see relationships between fundamentals, system internals, Web3, AI, DevOps, and advanced engineering topics.',
    usersOrContext:
      'Built for self-directed developers who want a navigable map of computer science topics and direct links into focused visual learning modules.',
    workflow:
      'A learner searches or browses by domain, opens a topic detail page, checks whether the module is live, and launches the related microsite when available.',
    architecture:
      'A Vite React SPA uses React Router for domain and topic routes, TypeScript data modules for the topic catalog, Tailwind CSS for the UI, local storage for theme persistence, and Vercel rewrites for deep-link support.',
    decisions: [
      'Kept the topic catalog in TypeScript so counts, badges, routes, and launch links all derive from one source of truth.',
      'Separated domains from topics to support both high-level browsing and direct topic discovery.',
      'Used active and coming-soon states so the platform can honestly show live modules while preserving the broader roadmap.',
      'Added static discovery files around the SPA so reviewers and AI tools can understand the project even before client-side rendering.',
    ],
    tradeoffs: [
      'The Vite SPA keeps the hub fast to build and easy to deploy, but it does not produce rich per-route HTML before hydration.',
      'Separate microsite deployments isolate each topic, but they increase maintenance work across many small projects.',
      'A TypeScript data catalog is simple and reviewable now, but a larger platform may eventually need MDX, generated content, or a CMS.',
    ],
    nextImprovements: [
      'Migrate the hub to static or server-rendered routes so each domain and topic page ships crawlable HTML.',
      'Generate sitemap entries for every active topic and live microsite.',
      'Add screenshots, difficulty labels, prerequisites, and related-topic links for stronger learning paths.',
    ],
    metrics: [
      { label: 'Planned modules', value: '172' },
      { label: 'Live microsites', value: '34' },
      { label: 'Domains', value: '8' },
      { label: 'Core routes', value: 'Home, topics, about, domain, detail' },
    ],
    architectureDiagram: [
      {
        label: 'Topic catalog',
        detail: 'TypeScript data source for 172 modules, status, domains, slugs, and URLs.',
      },
      {
        label: 'Domain routes',
        detail: 'React Router groups modules into Full Stack, DSA, Web3, Security, AI, Core CS, DevOps, and Advanced Systems.',
      },
      {
        label: 'Search and filters',
        detail: 'Learners can find topics without knowing the domain hierarchy first.',
      },
      {
        label: 'Topic detail',
        detail: 'Each module exposes status, context, and a launch path when live.',
      },
      {
        label: 'Microsites',
        detail: 'Live modules run as focused deployments linked from the central hub.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'],
    tags: ['Full Stack', 'React', 'Learning Platform'],
    github: 'https://github.com/subhajitlucky/cscosmos',
    demo: 'https://cscosmos.vercel.app',
    visual: {
      title: 'Learning platform map',
      caption:
        'The hub turns a large topic catalog into searchable domains, topic detail routes, status badges, and launch paths for live microsites.',
      steps: ['Browse domain', 'Search topic', 'Inspect status', 'Launch microsite'],
    },
    inspectionLinks: [
      {
        label: 'Topic catalog',
        href: 'https://github.com/subhajitlucky/cscosmos/blob/main/src/data/topics.ts',
      },
      {
        label: 'Route tree',
        href: 'https://github.com/subhajitlucky/cscosmos/blob/main/src/App.tsx',
      },
      {
        label: 'README proof',
        href: 'https://github.com/subhajitlucky/cscosmos/blob/main/README.md',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan React developer',
      'computer science learning platform',
      'React TypeScript Vite portfolio project',
      'CSCosmos visual learning hub',
    ],
  },
{
    title: 'CampusHelper',
    slug: 'campushelper',
    role: 'Full-stack engineer',
    year: '2025',
    status: 'Live platform',
    oneLine:
      'Full-stack campus lost-and-found platform with authenticated reports, uploads, claims, and search.',
    description:
      'CampusHelper is a full-stack campus lost-and-found system with authenticated reporting, image uploads, searchable records, and a live deployment.',
    proof: [
      'README documents authentication, uploads, search, claims, moderation, and database access controls.',
      'Source exposes API routes, validation, storage, and Prisma/Supabase data boundaries.',
    ],
    problem:
      'Campus lost-and-found posts need a searchable, authenticated flow where users can report items, add images, and find relevant matches.',
    usersOrContext:
      'Built for campus communities that need a practical web flow for reporting and searching lost or found items.',
    workflow:
      'Users sign in, create item reports with details and uploads, search existing posts, and review relevant lost-and-found entries.',
    architecture:
      'A Next.js application uses authenticated API routes, Prisma, PostgreSQL/Supabase storage, and server-side validation for item reports and claims.',
    decisions: [
      'Used authenticated flows so item reports can be tied to accountable user actions.',
      'Included uploads and full-text search to make reports easier to identify and retrieve.',
      'Kept reporting, uploads, search, and claims in one product flow instead of splitting the experience across separate tools.',
    ],
    tradeoffs: [
      'Adding uploads and search increases backend surface area compared with a static listing board.',
    ],
    nextImprovements: [
      'Improve moderation and matching flows for duplicate or related item reports.',
    ],
    metrics: [
      { label: 'Core flows', value: 'Auth, report, upload, search' },
      { label: 'Data model', value: 'User-owned item reports' },
      { label: 'Storage surface', value: 'Images plus structured item fields' },
      { label: 'Primary UX goal', value: 'Find matching lost/found items faster' },
    ],
    architectureDiagram: [
      {
        label: 'Authenticated user',
        detail: 'Users sign in before creating or managing item reports.',
      },
      {
        label: 'Report form',
        detail: 'Item metadata and uploaded evidence are captured together.',
      },
      {
        label: 'Application API',
        detail: 'Backend routes validate requests and coordinate persistence.',
      },
      {
        label: 'Database',
        detail: 'Structured records support browsing, ownership, and search.',
      },
      {
        label: 'Search results',
        detail: 'Users review relevant lost-and-found entries from stored reports.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Supabase'],
    tags: ['Full Stack', 'Next.js', 'PostgreSQL'],
    github: 'https://github.com/subhajitlucky/campushelper',
    demo: 'https://campushelper.vercel.app',
    visual: {
      title: 'Lost-and-found product loop',
      caption: 'Reports move through authenticated creation, uploaded evidence, searchable records, and review.',
      steps: ['Sign in', 'Create report', 'Upload image', 'Search records'],
    },
    inspectionLinks: [
      {
        label: 'App source',
        href: 'https://github.com/subhajitlucky/campushelper/tree/main/src',
      },
      {
        label: 'Prisma schema',
        href: 'https://github.com/subhajitlucky/campushelper/tree/main/prisma',
      },
      {
        label: 'README',
        href: 'https://github.com/subhajitlucky/campushelper/blob/main/README.md',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan full stack developer',
      'React Node PostgreSQL project',
      'full stack lost and found app',
    ],
  },
{
    title: 'IntentPay',
    slug: 'intentpay',
    role: 'Full-stack and smart contract engineer',
    year: '2026',
    status: 'Prototype',
    oneLine:
      'AI-assisted Web3 transaction prototype that turns natural language into structured plans before wallet review.',
    description:
      'IntentPay is an AI-assisted Web3 transaction prototype that separates natural-language planning from wallet confirmation and irreversible execution.',
    proof: [
      'Separates AI interpretation from irreversible contract execution.',
      'Keeps wallet review visible before transaction confirmation.',
    ],
    problem:
      'On-chain transaction flows can force users to understand protocol actions, contract interactions, wallet steps, and irreversible execution before they can complete a payment or DeFi operation.',
    usersOrContext:
      'Built for crypto users and product teams exploring natural-language transaction intent as a safer interface layer for Web3 workflows.',
    workflow:
      'A user enters a transaction intent, the application interprets the requested action, prepares the related on-chain interaction, and routes the user through review and wallet execution.',
    architecture:
      'A React client connects to an Express API and LLM adapter, which prepares Ethers.js transaction plans behind a review boundary with encrypted wallet data and security events.',
    decisions: [
      'Modeled the interface around user intent first, then mapped interpreted actions to explicit blockchain transaction steps.',
      'Kept wallet execution visible so users can inspect the operation before confirming an on-chain action.',
      'Separated AI interpretation from contract execution because natural language output should never directly trigger irreversible transactions.',
    ],
    tradeoffs: [
      'Natural-language input improves accessibility but requires stronger validation before transaction preparation.',
      'Blockchain transparency adds trust, but it also requires clear UX around gas, wallet state, and failure cases.',
    ],
    nextImprovements: [
      'Add stricter intent validation and safer transaction previews.',
      'Document the contract boundaries and supported transaction types.',
    ],
    metrics: [
      { label: 'Safety boundary', value: 'AI drafts, wallet executes' },
      { label: 'Core layers', value: 'Intent, preview, contract, wallet' },
      { label: 'Primary risk handled', value: 'Irreversible on-chain actions' },
      { label: 'Review state', value: 'Before every wallet confirmation' },
    ],
    architectureDiagram: [
      {
        label: 'User intent',
        detail: 'Natural-language transaction request starts the flow.',
      },
      {
        label: 'AI planner',
        detail: 'Interprets the request and prepares a structured action plan.',
      },
      {
        label: 'Transaction preview',
        detail: 'Shows the action, wallet impact, and confirmation context.',
      },
      {
        label: 'Wallet execution',
        detail: 'User approval remains the boundary before on-chain execution.',
      },
      {
        label: 'Smart contract',
        detail: 'Solidity logic receives the confirmed transaction only after review.',
      },
    ],
    stack: ['Node.js', 'Express.js', 'React', 'Ethers.js', 'AI workflows'],
    tags: ['Blockchain', 'AI', 'Full Stack'],
    github: 'https://github.com/subhajitlucky/intentpay',
    demo: 'https://github.com/subhajitlucky/intentpay',
    visual: {
      title: 'Intent review boundary',
      caption: 'Natural language is converted into an inspectable transaction plan before any wallet action.',
      steps: ['Intent input', 'AI planning', 'Transaction preview', 'Wallet confirmation'],
    },
    inspectionLinks: [
      {
        label: 'AI planner',
        href: 'https://github.com/subhajitlucky/intentpay/blob/main/ai-agent.js',
      },
      {
        label: 'Wallet manager',
        href: 'https://github.com/subhajitlucky/intentpay/blob/main/wallet-manager.js',
      },
      {
        label: 'Frontend',
        href: 'https://github.com/subhajitlucky/intentpay/tree/main/frontend',
      },
    ],
    seoKeywords: [
      'Subhajit Pradhan blockchain developer',
      'intent driven blockchain interface',
      'Solidity full stack project',
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
