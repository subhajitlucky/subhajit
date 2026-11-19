export type ProjectLink = {
  label: string;
  href: string;
  kind: 'source' | 'package' | 'live' | 'evidence';
};

export type UsageStep = {
  text: string;
  command: string;
};

export type FlowStep = {
  label: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  status: string;
  category: string;
  summary: string;
  whatItIs: string;
  problem: string;
  system: string;
  proof: string[];
  decisions: string[];
  tradeoffs: string[];
  stack: string[];
  flow?: FlowStep[];
  usage?: UsageStep[];
  links: ProjectLink[];
};

export type SupportingWork = {
  title: string;
  status: string;
  summary: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: 'kalia',
    title: 'KALIA',
    status: 'Open release',
    category: 'Language models',
    summary:
      'A 58M-parameter language model trained from scratch on free Kaggle GPUs, with every experiment pre-registered and every incident published.',
    whatItIs:
      'A 58M-parameter language model trained from scratch on free Kaggle GPUs. The weights, training logs, and pre-registered experiments are public.',
    problem:
      'Training a language model usually means renting GPUs or fine-tuning someone else\'s weights. I wanted an artifact where every weight, every byte of data, and every decision was mine, and a process that could be audited rather than taken on trust.',
    system:
      'A decoder-only transformer with a resumable DDP trainer that survives Kaggle\'s 8.5-hour session caps by syncing checkpoints to the HuggingFace Hub, plus a licence-filtered tokenization pipeline, a micro-ablation harness, and an evaluation suite covering held-out loss, bits-per-byte, and zero-shot benchmarks.',
    proof: [
      'Public release: weights, model card, 51 numbered decisions, 24 incidents, and hash-anchored pre-registrations.',
      'v0.2.0 reached 2.8248 held-out loss and 0.9244 bits-per-byte, 0.2285 nats better than v0.1.2 on the same rebuilt yardstick.',
      'A pre-registered architecture win inverted at two fresh seeds; the 58M seed spread is 0.2892 nats, and the negative result is published.',
    ],
    decisions: [
      'Screen every recipe change at 30M parameters before spending full-run quota on it.',
      'Enforce promotion thresholds even against our own best result: Muon+ won 7 of 7 checkpoints and still did not ship at 0.015 nats below the bar.',
    ],
    tradeoffs: [
      'A 58M storyteller, not an assistant: no instruction following, weak factual recall, and entity drift over long outputs.',
      'Training stopped at 73% of the cosine schedule when the weekly quota ran out; the plateau and the stop are documented rather than hidden.',
    ],
    stack: ['Python', 'PyTorch', 'Muon', 'tiktoken', 'Kaggle T4 x2', 'HuggingFace Hub'],
    flow: [
      { label: 'Corpus', detail: 'Licence-filtered tokenization into memory-mapped shards.' },
      { label: 'Pretrain', detail: 'Resumable DDP sessions with checkpoint sync and pre-registered stopping rules.' },
      { label: 'Evaluate', detail: 'Held-out loss, bits-per-byte, and zero-shot benchmarks on every candidate.' },
      { label: 'Release', detail: 'Weights and model card on HuggingFace; decisions and incidents in the repository.' },
    ],
    usage: [
      {
        text: 'Generate text from the downloaded checkpoint:',
        command:
          'python sample.py --ckpt <path-to-checkpoint> --prompt "Once upon a time"',
      },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/kalia', kind: 'source' },
      { label: 'KALIA console', href: '/kalia', kind: 'evidence' },
      {
        label: 'v0.1.2 weights and model card',
        href: 'https://huggingface.co/kalia-lm/kalia-v012',
        kind: 'live',
      },
      {
        label: 'Pre-registration ledger',
        href: 'https://github.com/subhajitlucky/kalia/blob/main/docs/preregistrations/LEDGER.md',
        kind: 'evidence',
      },
    ],
  },

  {
    slug: 'codebase-doctor',
    title: 'Codebase Doctor',
    status: 'Published CLI',
    category: 'Developer tooling',
    summary:
      'A CLI that audits a repository and reports deterministic findings as text, JSON, or SARIF. Works with or without a model in the loop.',
    whatItIs:
      'A CLI that scans a repository for leaked secrets, vulnerable dependencies, unsafe Postgres RLS, and broken CI. It prints a readable report or SARIF for GitHub code scanning.',
    problem:
      'Repository reviews often depend on opaque model judgment, scattered linters, and one-off commands. That makes coverage difficult to inspect and results difficult to reproduce.',
    system:
      'A TypeScript CLI inventories repositories, builds a bounded multi-language source graph, and scans secrets, dependencies, workflows, RLS, and accessibility. Coverage limits are reported per domain; validation and live database access require separate permission.',
    proof: [
      '17/17 seeded benchmark cases, 100% rule recall, zero medium+ false positives; 11/11 red-team mutants caught, 7/7 controls clean.',
      'A 100-repo field study found at least one high-severity finding in 23% of agent-configured repositories; 10% had a broken import target.',
      'Emits schema-versioned text, JSON, and SARIF with stable fingerprints, and reports coverage limits on every run.',
    ],
    decisions: [
      'Treat skipped or unsupported analysis as visible state instead of a clean result.',
      'Use stable fingerprints so baselines distinguish new, unchanged, and resolved findings.',
    ],
    tradeoffs: [
      'Built-in semantic coverage is intentionally narrower than the long-term product map.',
      'Approved child commands can execute repository-owned tooling, so permission remains explicit.',
    ],
    stack: ['TypeScript', 'Node.js', 'Vitest', 'PostgreSQL', 'SARIF', 'GitHub Actions'],
    usage: [
      { text: 'Run a sample audit on a disposable fixture:', command: 'npx -y codebase-doctor demo' },
      { text: 'Audit the current repository:', command: 'npx -y codebase-doctor audit .' },
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
  },

  {
    slug: 'rls-doctor',
    title: 'RLS Doctor',
    status: 'Published CLI',
    category: 'Database security',
    summary:
      'A read-only Postgres and Supabase RLS auditor. Reports policy, role, and grant risks from catalog metadata without touching data.',
    whatItIs:
      'A read-only Postgres and Supabase auditor. It finds RLS policies, roles, and grants that can expose rows across tenants without changing your database.',
    problem:
      'Small policy mistakes can expose rows through disabled RLS, broad roles, missing write checks, or overlooked privilege paths. Normal application tests rarely explain the catalog state behind those failures.',
    system:
      'The CLI reads PostgreSQL catalog metadata, models policies, roles, memberships, and grants together, and reports structural risks. A read-only probe impersonates app roles in a rolled-back transaction; shadow, prove, and fix add disposable-world verification and repair.',
    proof: [
      'A static audit of 60 open-source Supabase repos found at least one high or critical RLS pattern in 63%; median RLS Score 38/100.',
      'Probe mode impersonates application roles in rolled-back transactions to prove cross-tenant reads without changing data.',
      'Published on npm with install-free npx usage, stable JSON, and CI coverage.',
    ],
    decisions: [
      'Analyze policy composition and reachable roles instead of counting policies in isolation.',
      'Keep suggested remediation conservative because ownership and tenant models vary.',
    ],
    tradeoffs: [
      'Catalog inspection cannot prove application-level authorization behavior.',
      'Hosted platform settings, views, and functions require separate review.',
    ],
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Supabase RLS', 'Vitest', 'GitHub Actions'],
    usage: [
      { text: 'Prove a leak on a disposable Postgres instance:', command: 'npx rls-doctor demo' },
      { text: 'Audit the database in DATABASE_URL or SUPABASE_DB_URL:', command: 'npx rls-doctor check' },
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
  },

  {
    slug: 'tarka-sabha',
    title: 'Tarka Sabha',
    status: 'Live',
    category: 'Decision evidence',
    summary:
      'A decision evidence workspace for technical diligence: ingest a codebase, extract decisions, attach source-backed evidence, and publish a dossier.',
    whatItIs:
      'Tarka Sabha turns technical decisions into source-backed evidence and a diligence dossier. Teams ingest a repository, confirm decisions, record approvals, and share an expiring report with a buyer.',
    problem:
      'A frontier model can generate a plausible diligence summary. A buyer still needs a reproducible record of what was examined, which claims have source evidence, what contradicts them, and who approved the conclusion.',
    system:
      'A Next.js App Router application with PostgreSQL and Prisma. It ingests public GitHub sources into immutable snapshots, extracts candidate decisions for human confirmation, records evidence, approvals, and outcomes, and generates versioned dossiers with expiring share links. Tests cover workspace permissions, ingestion, evidence, approvals, dossiers, and share links.',
    proof: [
      'Live workspace with workspaces, roles, decisions, evidence, approvals, reports, sources, and dossiers.',
      'GitHub ingestion snapshots files, commits, pull requests, and issues with path, commit, and SHA-256 hashes; dossiers include evidence appendices and open questions.',
      'Append-only audit events, HMAC-signed dossier exports, and expiring or revocable share links.',
    ],
    decisions: [
      'Make the decision the primary object; the multi-agent council is an optional review room.',
      'Link every evidence item to an immutable source snapshot so path, commit, and hash cannot drift.',
    ],
    tradeoffs: [
      'Ingestion currently targets public GitHub repositories; private-repo and data-room workflows need more setup.',
      'The decision-debt score is a prioritization heuristic, not a validated risk rating.',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Tailwind CSS'],
    flow: [
      { label: 'Ingest', detail: 'Snapshot a public GitHub repository, its commits, pull requests, and issues.' },
      { label: 'Extract', detail: 'Propose candidate decisions from the source snapshots for human review.' },
      { label: 'Verify', detail: 'Confirm decisions, attach evidence, record approvals, and score decision debt.' },
      { label: 'Publish', detail: 'Generate a versioned dossier and share a redacted, expiring link.' },
    ],
    links: [
      { label: 'Live', href: 'https://tarkasabha.vercel.app', kind: 'live' },
      { label: 'Source', href: 'https://github.com/subhajitlucky/tarkaSabha', kind: 'source' },
    ],
  },
];

export const supportingWork: SupportingWork[] = [
  {
    title: 'CSCosmos',
    status: 'Live',
    summary:
      'A computer-science learning hub: 245 topics, 47 native visualizers, and 1,500+ static pages from one typed catalog.',
    links: [
      { label: 'Visit', href: 'https://cscosmos.vercel.app' },
      { label: 'Source', href: 'https://github.com/subhajitlucky/cscosmos' },
    ],
  },
  {
    title: 'SmritiFlow',
    status: 'Published CLI',
    summary:
      'Repository-memory CLI that generates project maps and handoff artifacts for coding agents.',
    links: [
      { label: 'npm package', href: 'https://www.npmjs.com/package/smritiflow' },
      { label: 'Source', href: 'https://github.com/subhajitlucky/smritiflow' },
    ],
  },
  {
    title: 'ChitraData',
    status: 'Live',
    summary:
      'Local-first chart studio and India map renderer with PNG and PDF export from HD to 8K.',
    links: [
      { label: 'Visit', href: 'https://chitradata.vercel.app' },
      { label: 'Source', href: 'https://github.com/subhajitlucky/chitraData' },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
