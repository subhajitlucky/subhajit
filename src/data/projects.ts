export type ProjectLink = {
  label: string;
  href: string;
  kind: 'source' | 'package' | 'live' | 'evidence';
};

export type Project = {
  slug: string;
  title: string;
  index: string;
  status: string;
  category: string;
  summary: string;
  problem: string;
  system: string;
  proof: string[];
  decisions: string[];
  tradeoffs: string[];
  stack: string[];
  flow: { label: string; detail: string }[];
  links: ProjectLink[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: 'codebase-doctor',
    title: 'Codebase Doctor',
    index: '01',
    status: 'Published CLI',
    category: 'Developer tooling',
    summary:
      'A CLI that audits a repository and reports deterministic findings as text, JSON, or SARIF. Works with or without a model in the loop.',
    problem:
      'Repository reviews often depend on opaque model judgment, scattered linters, and one-off commands. That makes coverage difficult to inspect and results difficult to reproduce.',
    system:
      'A TypeScript CLI inventories repositories, detects relevant ecosystems, plans validation commands, and produces stable text, JSON, and SARIF reports. Side-effecting checks and database access require separate permission.',
    proof: [
      'Published as an npm CLI with clean-package installation checks.',
      'Emits schema-versioned text, JSON, and SARIF reports with stable finding fingerprints.',
      'Separates read-only discovery from explicitly permitted validation and database access.',
      'Ships a provider-neutral Agent Skill and CI-focused exit semantics.',
    ],
    decisions: [
      'Keep one public command surface while reporting coverage and limitations per audit domain.',
      'Treat skipped or unsupported analysis as visible state instead of a clean result.',
      'Use stable fingerprints so baselines can distinguish new, unchanged, and resolved findings.',
    ],
    tradeoffs: [
      'Built-in semantic coverage is intentionally narrower than the long-term product map.',
      'Approved child commands can still execute repository-owned tooling, so permission remains explicit.',
    ],
    stack: ['TypeScript', 'Node.js', 'Vitest', 'PostgreSQL', 'SARIF', 'GitHub Actions'],
    flow: [
      { label: 'Discover', detail: 'Bounded inventory maps projects, workspaces, tools, and visible evidence.' },
      { label: 'Plan', detail: 'Applicable audits and optional checks are selected without executing them.' },
      { label: 'Inspect', detail: 'Built-in analyzers and approved checks emit structured findings.' },
      { label: 'Verify', detail: 'Stable reports and baselines make repair outcomes inspectable.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/codebase-doctor', kind: 'source' },
      { label: 'npm package', href: 'https://www.npmjs.com/package/codebase-doctor', kind: 'package' },
      {
        label: 'Architecture',
        href: 'https://github.com/subhajitlucky/codebase-doctor/blob/main/docs/architecture.md',
        kind: 'evidence',
      },
    ],
    featured: true,
  },
  {
    slug: 'rls-doctor',
    title: 'RLS Doctor',
    index: '02',
    status: 'Published CLI',
    category: 'Database security',
    summary:
      'A read-only Postgres and Supabase RLS auditor. Reports policy, role, and grant risks from catalog metadata without touching data.',
    problem:
      'Small policy mistakes can expose rows through disabled RLS, broad roles, missing write checks, or overlooked privilege paths. Normal application tests rarely explain the catalog state behind those failures.',
    system:
      'The CLI reads PostgreSQL catalog metadata, models policies, roles, memberships, and grants together, then reports specific risks with text or JSON output without mutating the target database.',
    proof: [
      'Published on npm with install-free npx usage.',
      'Runs read-only catalog analysis and sanitizes credentials from connection errors.',
      'Includes disposable PostgreSQL integration fixtures and CI coverage.',
      'Packages the review workflow as an installable Agent Skill.',
    ],
    decisions: [
      'Analyze policy composition and reachable roles instead of counting policies in isolation.',
      'Keep suggested remediation conservative because ownership and tenant models vary.',
      'Support human-readable output and stable JSON for automation.',
    ],
    tradeoffs: [
      'Catalog inspection cannot prove application-level authorization behavior.',
      'Hosted platform settings, views, and functions require separate review.',
    ],
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Supabase RLS', 'Vitest', 'GitHub Actions'],
    flow: [
      { label: 'Connect', detail: 'Use a read-only PostgreSQL connection for the selected schemas.' },
      { label: 'Model', detail: 'Load tables, policies, grants, roles, and membership paths.' },
      { label: 'Analyze', detail: 'Command-aware rules identify structural access risks.' },
      { label: 'Report', detail: 'Text and JSON outputs explain evidence and safer next steps.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/rls-doctor', kind: 'source' },
      { label: 'npm package', href: 'https://www.npmjs.com/package/rls-doctor', kind: 'package' },
      {
        label: 'Analyzer',
        href: 'https://github.com/subhajitlucky/rls-doctor/blob/main/src/audit/analyzer.ts',
        kind: 'evidence',
      },
    ],
    featured: true,
  },
  {
    slug: 'smritiflow',
    title: 'SmritiFlow',
    index: '03',
    status: 'Published CLI',
    category: 'Agent infrastructure',
    summary:
      'A CLI that keeps repository memory current so coding agents can resume work with accurate project context.',
    problem:
      'Long-running code work loses decisions and current state between sessions. Rebuilding that context wastes time and encourages agents to act on stale assumptions.',
    system:
      'A TypeScript monorepo scans repository structure and Git state, generates machine-readable memory artifacts, and writes concise agent-facing documents for scan, refresh, status, and resume workflows.',
    proof: [
      'Published with `smritiflow` and `sf` command aliases.',
      'Generates cache, project map, scan report, AGENTS.md, and focused handoff documents.',
      'Includes init, scan, refresh, status, and resume workflows.',
      'Covers parsers, generators, and end-to-end artifact generation with automated tests.',
    ],
    decisions: [
      'Generate both structured JSON and readable Markdown from the same scan.',
      'Expose freshness explicitly through status and refresh commands.',
      'Keep parsing, Git context, generation, and CLI orchestration independently testable.',
    ],
    tradeoffs: [
      'Generated summaries can become stale and must never replace direct source inspection.',
      'A CLI is efficient for developers but less approachable than a hosted interface.',
    ],
    stack: ['TypeScript', 'Node.js', 'pnpm', 'Vitest', 'Commander', 'Agent Skills'],
    flow: [
      { label: 'Initialize', detail: 'Create the repository-memory contract and ignored artifacts.' },
      { label: 'Scan', detail: 'Inspect project structure, routes, imports, and Git context.' },
      { label: 'Generate', detail: 'Write structured cache and concise agent-facing documents.' },
      { label: 'Resume', detail: 'Return with current context, freshness signals, and next actions.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/smritiflow', kind: 'source' },
      { label: 'npm package', href: 'https://www.npmjs.com/package/smritiflow', kind: 'package' },
      {
        label: 'Core workflows',
        href: 'https://github.com/subhajitlucky/smritiflow/tree/main/packages/core/src',
        kind: 'evidence',
      },
    ],
    featured: false,
  },
  {
    slug: 'tarka-sabha',
    title: 'Tarka Sabha',
    index: '04',
    status: 'Live application',
    category: 'Multi-agent systems',
    summary:
      'A multi-agent debate platform with configurable personas, provider routing, encrypted keys, and inspectable speaker state.',
    problem:
      'Multi-agent conversations need more structure than a loop of prompts: personas, providers, credentials, speaker selection, history, and failure states must remain separable.',
    system:
      'A Next.js application stores auth-backed debate state in PostgreSQL while a server-side adapter normalizes model providers and an orchestrator selects sequential or mentioned speakers.',
    proof: [
      'Runs as a public web application with a public source repository.',
      'Models providers, personas, chats, messages, and rate limits as separate persisted concepts.',
      'Encrypts provider keys at rest and keeps model calls server-side.',
      'Uses deterministic round-robin selection with mention-aware priority.',
    ],
    decisions: [
      'Separate provider APIs from the product workflow behind one adapter boundary.',
      'Favor deterministic speaker selection for debuggability.',
      'Persist conversation and rate-limit state instead of relying on browser memory.',
    ],
    tradeoffs: [
      'Supporting many providers increases validation and failure-mode complexity.',
      'Output quality still depends on persona design, topic framing, and context limits.',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'LLM APIs'],
    flow: [
      { label: 'Compose', detail: 'Define a topic and select persona participants.' },
      { label: 'Select', detail: 'Choose the next speaker from deterministic and mention-aware state.' },
      { label: 'Route', detail: 'Build a provider-specific request behind a shared server boundary.' },
      { label: 'Persist', detail: 'Store the response and advance inspectable debate state.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/tarkaSabha', kind: 'source' },
      { label: 'Live application', href: 'https://tarkasabha.vercel.app', kind: 'live' },
      {
        label: 'Data model',
        href: 'https://github.com/subhajitlucky/tarkaSabha/tree/main/prisma',
        kind: 'evidence',
      },
    ],
    featured: true,
  },
  {
    slug: 'cscosmos',
    title: 'CSCosmos',
    index: '05',
    status: 'Live application',
    category: 'Learning systems',
    summary:
      'A searchable computer-science learning hub with interactive modules across web, systems, security, AI, and infrastructure.',
    problem:
      'Interactive computer-science explanations are often isolated across small demos, making it difficult for learners to discover related concepts or understand what is available.',
    system:
      'A typed topic catalog drives domain routes, search, active and planned states, native visualizers, external microsite links, and statically generated topic pages.',
    proof: [
      'Runs as a public Next.js application with a public topic catalog.',
      'Uses shared typed data to drive navigation, status, search, and topic routes.',
      'Combines native visualizers with focused external microsites.',
    ],
    decisions: [
      'Keep the topic registry in TypeScript so route and status changes remain reviewable.',
      'Distinguish live modules from planned content instead of presenting placeholders as finished.',
    ],
    tradeoffs: [
      'Native integration improves continuity but increases the main repository surface.',
      'External microsites keep experiments isolated but distribute maintenance across deployments.',
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'Static generation', 'Vercel'],
    flow: [
      { label: 'Catalog', detail: 'Typed domain and topic data defines the learning map.' },
      { label: 'Discover', detail: 'Search and domain views surface relevant topics.' },
      { label: 'Resolve', detail: 'Status routes users to a native module or focused microsite.' },
      { label: 'Learn', detail: 'Interactive visual systems make abstract concepts observable.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/cscosmos', kind: 'source' },
      { label: 'Live application', href: 'https://cscosmos.vercel.app', kind: 'live' },
    ],
    featured: true,
  },
  {
    slug: 'sutra',
    title: 'SUTRA',
    index: '06',
    status: 'Open-source language',
    category: 'Agent protocols',
    summary:
      'A small deterministic language for agent-to-agent intent, negotiation, and commitments with auditable state transitions.',
    problem:
      'Natural language is expressive but ambiguous, while raw JSON carries structure without domain semantics. Agent coordination needs a compact layer between the two.',
    system:
      'A Python lexer, parser, AST, evaluator, and transaction state model implement eight semantic primitives, with local and HTTP-based agent communication paths.',
    proof: [
      'Defines a compact grammar and eight documented primitives.',
      'Includes parser, evaluator, runtime state, and network transport code.',
      'Provides local and networked buyer/seller demonstrations.',
    ],
    decisions: [
      'Keep the language declarative and intentionally non-general-purpose.',
      'Make identical input and state produce identical output.',
      'Isolate mutations within message-level transactions.',
    ],
    tradeoffs: [
      'A formal language reduces ambiguity but requires agents and developers to learn its vocabulary.',
      'The constrained grammar cannot represent every conversational workflow.',
    ],
    stack: ['Python', 'Lexer and parser', 'AST evaluation', 'HTTP transport'],
    flow: [
      { label: 'Express', detail: 'An agent writes intent using a small semantic vocabulary.' },
      { label: 'Parse', detail: 'The lexer and parser produce a structured syntax tree.' },
      { label: 'Evaluate', detail: 'Rules apply deterministically against current agent state.' },
      { label: 'Commit', detail: 'Accepted transitions update auditable transactional state.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/sutra', kind: 'source' },
      {
        label: 'Language specification',
        href: 'https://github.com/subhajitlucky/sutra/blob/main/spec/SUTRA_SPEC.md',
        kind: 'evidence',
      },
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const secondaryProjects = projects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
