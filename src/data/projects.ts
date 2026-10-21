export type Role = 'swe' | 'fullstack' | 'frontend' | 'backend' | 'web3';

export const roleLabels: Record<Role, string> = {
  swe: 'Software Engineering',
  fullstack: 'Full-stack',
  frontend: 'Frontend',
  backend: 'Backend',
  web3: 'Web3',
};

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
  roles: Role[];
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
  hidden?: boolean;
  tldr: string[];
};

export type ProjectIndexItem = Pick<
  Project,
  'slug' | 'title' | 'status' | 'category' | 'roles' | 'summary' | 'links'
>;

export const projects: Project[] = [

  {
    slug: 'kalia',
    title: 'KALIA',
    index: '01',
    status: 'Open model release',
    category: 'Language models',
    roles: ['swe', 'backend'],
    summary:
      'A 58M-parameter language model trained from scratch on free Kaggle GPUs, with every experiment pre-registered and every incident published.',
    problem:
      'Training a language model usually means renting GPUs or fine-tuning someone else\'s weights. I wanted an artifact where every weight, every byte of data, and every decision was mine, and a process that could be audited rather than taken on trust.',
    system:
      'A decoder-only transformer (10 layers, 512 dim, RoPE, RMSNorm, SwiGLU, QK-Norm, logit soft-capping) with a resumable DDP trainer that survives Kaggle\'s 8.5-hour session caps by syncing checkpoints to the HuggingFace Hub, a license-filtered tokenization pipeline, a micro-ablation harness, and an evaluation suite covering held-out loss, bits-per-byte, zero-shot benchmarks, and a custom entry-exit asymmetry metric.',
    proof: [
      'Public release: weights, model card, and the full engineering record (every numbered decision and incident, and hash-anchored pre-registrations).',
      'Two checkpoints on one rebuilt yardstick: v0.1.2 scores 3.0533 held-out loss / 0.9992 bits-per-byte; v0.2.0 scores 2.8248 / 0.9244, a 0.2285-nat improvement. v0.2.0 is an experiment: two benchmarks regressed beyond the pre-registered stability rule.',
      'Zero-shot v0.1.2: PIQA 61.4%, ARC-Easy 45.8%, HellaSwag 36.8%. The architecture line was closed after X20 inverted under replication; the 58M control seed spread is 0.2892 nats.',
      'Overtook the AdamW baseline\'s final loss with roughly 23% fewer tokens after micro-ablations selected Muon with QK-Norm and logit soft-capping.',
      'About 20 GPU-hours total on the free tier; a promising optimizer variant was rejected because it missed the promotion threshold set before the experiment ran.',
      'Post-release research continues in public: a replicated mixture-policy failure ("the dessert"), an entity-consistency decoder that triples character retention (+0.061, 95% CI), and the first test I know of Vedic recitation orders as replay schedules (four arms, ranked by structure depth on two independent instruments).',
    ],
    decisions: [
      'Screen every recipe change at 30M parameters before spending full-run quota on it.',
      'Enforce promotion thresholds even against our own best result: Muon+ won 7 of 7 checkpoints and still did not ship at 0.015 nats below the bar.',
      'Stop on a pre-registered rule when the curve flattens, and publish the plateau instead of smoothing it over.',
    ],
    tradeoffs: [
      'A 58M storyteller, not an assistant: no instruction following, weak factual recall, and entity drift over long outputs.',
      'Training stopped at 73% of the cosine schedule when the weekly quota ran out; the plateau and the stop are documented rather than hidden.',
    ],
    stack: ['Python', 'PyTorch', 'Muon', 'tiktoken', 'Kaggle T4 x2', 'HuggingFace Hub', 'pytest'],
    flow: [
      { label: 'Corpus', detail: 'License-filtered tokenization of TinyStories and FineWeb-Edu into memory-mapped shards.' },
      { label: 'Pretrain', detail: 'Resumable DDP sessions with checkpoint sync and pre-registered stopping rules.' },
      { label: 'Evaluate', detail: 'Probe suite, bits-per-byte, Abhimanyu gap, and zero-shot benchmarks on every candidate.' },
      { label: 'Release', detail: 'Weights and model card on HuggingFace; decisions, incidents, and pre-registrations in the repository.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/kalia', kind: 'source' },
      { label: 'v0.1.2 weights and model card', href: 'https://huggingface.co/kalia-lm/kalia-v012', kind: 'live' },
      { label: 'v0.2.0 experiment', href: 'https://huggingface.co/kalia-lm/kalia-v020', kind: 'evidence' },
      {
        label: 'Pre-registration ledger',
        href: 'https://github.com/subhajitlucky/kalia/blob/main/docs/preregistrations/LEDGER.md',
        kind: 'evidence',
      },
    ],
    tldr: [
      '58M-parameter decoder-only transformer trained from random initialization on free Kaggle GPUs.',
      'v0.1.2 released; every numbered decision, incident, and pre-registered experiment is public.',
      'v0.2.0 is released as a 0.2285-nat-better experiment, not promoted: ARC-Easy and LAMBADA regressed beyond the pre-registered rule.',
      'The largest architecture result inverted under replication; the 58M seed spread is 0.2892 nats.',
    ],
    featured: true,
  },

  {
    slug: 'codebase-doctor',
    title: 'Codebase Doctor',
    index: '02',
    status: 'Published CLI',
    category: 'Developer tooling',
    roles: ['swe', 'backend'],
    summary:
      'A CLI that audits a repository and reports deterministic findings as text, JSON, or SARIF. Works with or without a model in the loop.',
    problem:
      'Repository reviews often depend on opaque model judgment, scattered linters, and one-off commands. That makes coverage difficult to inspect and results difficult to reproduce.',
    system:
      'A TypeScript CLI inventories repositories, builds a bounded multi-language source graph, scans secrets, dependencies, workflows, RLS, and accessibility, and emits stable text, JSON, or SARIF. Coverage limits are reported per domain; validation and live database access require separate permission.',
    proof: [
      'Published as an npm CLI with clean-package installation checks.',
      '17/17 seeded benchmark cases, 100% rule recall, zero medium+ false positives; 11/11 red-team mutants caught, 7/7 controls clean.',
      'A 100-repo field study found at least one high-severity finding in 23% of agent-configured repositories; 10% had a broken import target.',
      'Emits schema-versioned text, JSON, and SARIF with stable finding fingerprints.',
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
    tldr: [
      'A single CLI that audits repositories and emits deterministic findings.',
      '17/17 benchmark cases, 0 medium+ false positives; a 100-repo field study found 23% with a high-severity finding.',
      'Text, JSON, and SARIF output with stable fingerprints and baselines for CI.',
      'Read-only discovery by default; validation and database access require explicit permission.',
    ],
    featured: true,
  },

  {
    slug: 'rls-doctor',
    title: 'RLS Doctor',
    index: '03',
    status: 'Published CLI',
    category: 'Database security',
    roles: ['backend', 'swe'],
    summary:
      'A read-only Postgres and Supabase RLS auditor. Reports policy, role, and grant risks from catalog metadata without touching data.',
    problem:
      'Small policy mistakes can expose rows through disabled RLS, broad roles, missing write checks, or overlooked privilege paths. Normal application tests rarely explain the catalog state behind those failures.',
    system:
      'The CLI reads PostgreSQL catalog metadata, models policies, roles, memberships, and grants together, and reports structural risks. A read-only probe impersonates app roles in a rolled-back transaction; shadow, prove, and fix add disposable-world verification and repair.',
    proof: [
      'Published on npm with install-free npx usage.',
      'A static audit of 60 open-source Supabase repos found at least one high or critical RLS pattern in 63%; median RLS Score 38/100.',
      'Runs read-only catalog analysis and sanitizes credentials from connection errors.',
      'Probe mode proves cross-tenant reads inside rolled-back transactions without changing data.',
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
    tldr: [
      'A read-only Postgres and Supabase RLS auditor that models policies, roles, and grants together.',
      'A 60-repo study found at least one high or critical pattern in 63%; median RLS Score 38/100.',
      'Probe mode proves cross-tenant reads inside rolled-back transactions without changing data.',
    ],
    featured: true,
  },

  {
    slug: 'tarka-sabha',
    title: 'Tarka Sabha',
    index: '04',
    status: 'Live application',
    category: 'Multi-agent systems',
    roles: ['fullstack', 'backend', 'frontend'],
    summary:
      'A multi-agent debate platform with configurable personas, provider routing, encrypted keys, and inspectable speaker state.',
    problem:
      'Multi-agent conversations need more structure than a loop of prompts: personas, providers, credentials, speaker selection, history, and failure states must remain separable.',
    system:
      'A Next.js application stores auth-backed debate state in PostgreSQL. A server-side adapter normalizes providers; an orchestrator selects sequential or mentioned speakers; a server-side runner claims due chats with FOR UPDATE SKIP LOCKED so debates continue after the tab closes.',
    proof: [
      'Runs as a public web application with a public source repository.',
      'Models providers, personas, chats, messages, and rate limits as separate persisted concepts.',
      'Encrypts provider keys at rest and keeps model calls server-side.',
      'Uses deterministic round-robin selection with mention-aware priority; turn telemetry records selection reason, tokens, latency, and tool calls.',
      'Synthesis generates several drafts and selects against a weighted rubric; a blind council-vs-single comparison is built in.',
      '15 test files and 193 tests cover the orchestrator, agent loop, synthesis rubric, head-to-head flow, and runner.',
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
    tldr: [
      'Server-side multi-agent debate runner that keeps sessions advancing after the tab closes.',
      'Deterministic speaker order, mention-aware turns, encrypted provider keys, and persisted history.',
      'Synthesis generates several drafts and selects against a weighted rubric; 15 test files / 193 tests cover the orchestration.',
    ],
    featured: true,
  },

  {
    slug: 'cscosmos',
    title: 'CSCosmos',
    index: '05',
    status: 'Live application',
    category: 'Learning systems',
    roles: ['frontend', 'fullstack'],
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
    tldr: [
      'A searchable computer-science learning hub built on a typed topic catalog.',
      'Native visualizers sit beside focused external microsites for each subject.',
      'Search, status, and topic routes are statically generated from the same data.',
    ],
    featured: true,
  },

  {
    slug: 'chitradata',
    title: 'ChitraData',
    index: '06',
    status: 'Live application',
    category: 'Data visualization',
    roles: ['frontend'],
    summary:
      'A local-first chart studio and India map maker with template, palette, and export workflows that run entirely in the browser.',
    problem:
      'Building presentable charts and regional maps usually means hosted tools, account gates, or uploads. Teams need readable, on-brand visuals without sending data to a server.',
    system:
      'A Vite and React single-page app renders charts with Chart.js and maps with D3 from bundled GeoJSON, persists work in localStorage, and exports PNG or PDF from HD to 8K through a client-side render pipeline.',
    proof: [
      'Runs fully client-side with no account, no backend, and chart state kept in the browser.',
      'Ships a template gallery, contrast-aware palette families, and five chart types.',
      'Renders a state-level India choropleth with a legend and random-data preview.',
      'Export flow verified from HD to 8K with social, presentation, and A4 presets.',
    ],
    decisions: [
      'Keep rendering and exports in the browser so user data never leaves the device.',
      'Guide choices with templates and contrast-checked palettes instead of raw styling controls.',
      'Map export options to real deliverables: slides, dashboards, social posts, and print.',
    ],
    tradeoffs: [
      'Browser-only storage means no cloud sync or multi-user collaboration.',
      'The chart catalog stays intentionally small compared with full BI suites.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Chart.js', 'D3'],
    flow: [
      { label: 'Compose', detail: 'Paste or edit data directly in the table editor.' },
      { label: 'Style', detail: 'Pick a template, chart type, and contrast-safe palette.' },
      { label: 'Preview', detail: 'Live preview renders every change instantly.' },
      { label: 'Export', detail: 'Download presentation-ready PNG or PDF from HD to 8K.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/chitraData', kind: 'source' },
      { label: 'Live application', href: 'https://chitradata.vercel.app', kind: 'live' },
      {
        label: 'Chart studio',
        href: 'https://github.com/subhajitlucky/chitraData/tree/main/src',
        kind: 'evidence',
      },
    ],
    tldr: [
      'A local-first chart studio and India map maker that runs entirely in the browser.',
      'No account, no backend, and no uploads; chart state stays on the device.',
      'Client-side PNG and PDF export from HD through 8K.',
    ],
    featured: false,
  },

  {
    slug: 'smritiflow',
    title: 'SmritiFlow',
    index: '07',
    status: 'Published CLI',
    category: 'Agent infrastructure',
    roles: ['swe', 'backend'],
    summary:
      'A CLI that keeps repository memory current so coding agents can resume work with accurate project context.',
    problem:
      'Long-running code work loses decisions and current state between sessions. Rebuilding that context wastes time and encourages agents to act on stale assumptions.',
    system:
      'A TypeScript monorepo scans repository structure and Git state, generates machine-readable memory artifacts, and writes concise agent-facing documents for scan, refresh, status, and resume workflows.',
    proof: [
      'Published with the smritiflow and sf command aliases.',
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
    tldr: [
      'A CLI that keeps repository memory current for coding agents.',
      'Scan, refresh, status, and resume workflows generate machine-readable and human-readable handoffs.',
      'The generated context is explicitly marked fresh or stale.',
    ],
    featured: false,
  },

  {
    slug: 'sutra',
    title: 'SUTRA',
    index: '08',
    status: 'Open-source language',
    category: 'Agent protocols',
    roles: ['swe', 'backend'],
    summary:
      'A deterministic agent protocol with a measured compact wire format: 2.8-7.5 tokens per message, up to 25x cheaper than deployed JSON-RPC protocols.',
    problem:
      'Natural language is expressive but ambiguous, while raw JSON carries structure without domain semantics. Agent coordination needs a compact layer between the two — and almost nobody measures what messages actually cost.',
    system:
      'A Python lexer, parser, AST, evaluator, and transaction state model implement nine semantic primitives. A measured compact wire format (SUTRA-C) encodes the same semantics in a fraction of the tokens, with a token-cost lab that verifies every encoding by decoder round-trip.',
    proof: [
      'SUTRA-C v0.7 is frozen; the project is now at v0.10 with compact HTTP transport, template negotiation, and 42 tests.',
      'A 384-encoding sweep and a 162-configuration round selected the wire format by measurement; every variant is decoder-verified lossless.',
      'SUTRA-C costs 7.5 tokens/message (2.8 in agreed-template mode) versus 72.5 for deployed JSON-RPC envelopes, counted with production tokenizers.',
      'Two model families read and write the compact form at 12/12 in comprehension tests; the densest template form reaches 6/6 reads on one.',
      '17 codec unit tests, a frozen specification, and an end-to-end deal demo that re-validates every decoded message with the parser.',
    ],
    decisions: [
      'Select encodings by measurement — token counts, decoder round-trips, model comprehension — not by taste.',
      'Make identical input and state produce identical output.',
      'Isolate mutations within message-level transactions.',
    ],
    tradeoffs: [
      'The densest template form depends on a negotiated message sequence and a shared dictionary; surprises pay a resync marker.',
      'The constrained grammar cannot represent every conversational workflow.',
    ],
    stack: ['Python', 'Compact wire codec', 'Lexer and parser', 'AST evaluation', 'HTTP transport'],
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
      {
        label: 'Compact wire format',
        href: 'https://github.com/subhajitlucky/sutra/blob/main/spec/SUTRA_C.md',
        kind: 'evidence',
      },
    ],
    tldr: [
      'A deterministic agent protocol with a measured compact wire format.',
      'SUTRA-C encodes the same semantics in 2.8–7.5 tokens per message, with decoder round-trip checks.',
      'The spec, tests, and an end-to-end deal demo are public.',
    ],
    featured: false,
  },

  {
    slug: 'campushelper',
    title: 'CampusHelper',
    index: '09',
    status: 'Live application',
    category: 'Full-stack product',
    roles: ['fullstack', 'frontend', 'backend'],
    summary:
      'A campus lost-and-found platform with authenticated reports, image uploads, searchable records, claims, and moderation workflows.',
    problem:
      'Campus lost-and-found is usually handled in scattered chat groups, so records disappear and ownership claims are difficult to verify or follow up.',
    system:
      'A Next.js App Router application with Google sign-in through NextAuth, PostgreSQL via Prisma on Supabase, image uploads to Vercel Blob, Zod-validated APIs, rate limiting, and row-level security, plus an admin moderation dashboard.',
    proof: [
      'Live platform with authenticated item reports, image uploads, search, claims, and comments.',
      'Server-side validation with Zod, CSRF protection, rate limiting, and database-level RLS.',
      'Admin dashboard backed by moderation and management workflows.',
    ],
    decisions: [
      'Keep authentication, uploads, and claims behind explicit server-side boundaries.',
      'Enforce access at the database with row-level security instead of relying only on application checks.',
      'Validate inputs server-side with shared Zod schemas.',
    ],
    tradeoffs: [
      'Managed Supabase storage and auth reduce operational work but tie the stack to one platform.',
      'Moderation tooling covers review basics without advanced automation.',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Supabase', 'NextAuth'],
    flow: [
      { label: 'Report', detail: 'A signed-in user posts a lost or found item with photos and details.' },
      { label: 'Discover', detail: 'Other users search and filter records by type, location, date, and keywords.' },
      { label: 'Claim', detail: 'Owners and finders coordinate through claims and comments.' },
      { label: 'Moderate', detail: 'Admins review reports and manage the listing lifecycle.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/campushelper', kind: 'source' },
      { label: 'Live application', href: 'https://campushelper.vercel.app', kind: 'live' },
    ],
    tldr: [
      'A campus lost-and-found platform with authenticated reports, image uploads, claims, and moderation.',
      'Next.js, NextAuth, Prisma/PostgreSQL, Vercel Blob, Zod validation, rate limits, and RLS.',
      'Admin workflows cover review and listing lifecycle.',
    ],
    featured: true,
  },

  {
    slug: 'intentpay',
    title: 'IntentPay',
    index: '10',
    status: 'Prototype',
    category: 'Web3 and AI',
    roles: ['web3', 'backend', 'fullstack'],
    summary:
      'An AI-assisted Web3 transaction prototype that turns natural-language intent into a structured plan the user reviews before wallet execution.',
    problem:
      'Wallets expose irreversible actions through low-level addresses, gas settings, and contract calls, which is difficult for non-technical users and risky for teams that need guardrails.',
    system:
      'A React client and Express API resolve payment intent through an LLM adapter into structured transaction plans, with encrypted wallet data, spending guardrails, and the wallet kept as the final execution boundary.',
    proof: [
      'Separates AI planning from irreversible on-chain execution; the wallet remains the approval step.',
      'Handles named recipients, split payments, transaction previews, gas estimation, and transaction history.',
      'Uses AES-256-GCM encrypted wallet data, bcrypt password hashing, and security event logging.',
    ],
    decisions: [
      'Never let the model silently execute transactions; plans require explicit wallet approval.',
      'Resolve contacts and handles server-side before building the transaction preview.',
      'Treat suspicious or failed actions as first-class security events.',
    ],
    tradeoffs: [
      'The review step adds friction in exchange for a clearer safety boundary.',
      'Prototype scope targets the Sepolia network and a limited set of transaction types.',
    ],
    stack: ['React', 'Express', 'Ethers.js', 'LLM adapter', 'Sepolia', 'AES-256-GCM'],
    flow: [
      { label: 'Describe', detail: 'The user states a payment intent in natural language.' },
      { label: 'Resolve', detail: 'The API resolves intent, contacts, balances, and guardrails.' },
      { label: 'Preview', detail: 'A structured transaction plan is shown for review.' },
      { label: 'Execute', detail: 'The wallet remains the final execution boundary.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/intentpay', kind: 'source' },
    ],
    tldr: [
      'An AI-assisted Web3 transaction prototype that turns natural language into a reviewed plan.',
      'The wallet remains the final execution boundary; the model never signs or sends.',
      'Prototype scope: Sepolia and a limited set of transaction types.',
    ],
    featured: false,
    hidden: true,
  },

  {
    slug: 'astapraharicha',
    title: 'Asta Praharicha',
    index: '11',
    status: 'Live application',
    category: 'Interactive storytelling',
    roles: ['frontend'],
    summary:
      'An interactive digital mandala for a village 24-hour chanting festival, with eight themed watches and a memory gallery.',
    problem:
      'Living cultural traditions are usually documented as static pages, which cannot convey a festival structured across eight watches of a full day and night.',
    system:
      'A Next.js application themes each of the eight watches with its own colors, copy, and atmosphere over an animated shader backdrop, with a slideshow gallery, moderated memory uploads, and a responsive watch selector.',
    proof: [
      'Runs as a public Next.js application with all eight watches playable and themed.',
      'Combines a shader-driven mandala backdrop, memory slideshow, and moderated upload flow.',
      'Responsive layout verified with a compact watch selector on mobile.',
    ],
    decisions: [
      'Keep the interface Odia-first to match the tradition it documents.',
      'Theme each watch separately so the passage of the day is felt, not just listed.',
      'Use a single immersive page instead of a multi-route information site.',
    ],
    tradeoffs: [
      'Animation-heavy pages cost more on low-end devices and warrant reduced-motion fallbacks.',
      'Odia-first labels limit reach for visitors who cannot read the script.',
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'GSAP', 'Three.js'],
    flow: [
      { label: 'Enter', detail: 'A gate screen introduces the village and the festival.' },
      { label: 'Watch', detail: 'Eight watches switch themes, copy, and atmosphere.' },
      { label: 'Remember', detail: 'The slideshow gallery surfaces festival memories.' },
      { label: 'Contribute', detail: 'Visitors upload memories through a moderated gallery flow.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/astapraharicha', kind: 'source' },
      { label: 'Live application', href: 'https://astapraharicha.vercel.app', kind: 'live' },
      {
        label: 'Watch system',
        href: 'https://github.com/subhajitlucky/astapraharicha/tree/main/src',
        kind: 'evidence',
      },
    ],
    tldr: [
      'An interactive digital mandala for a village 24-hour chanting festival.',
      'Eight themed watches, a shader-driven backdrop, a memory gallery, and moderated uploads.',
      'Odia-first, single-page, and built for the atmosphere of the festival.',
    ],
    featured: false,
  },

  {
    slug: 'quantumticket',
    title: 'QuantumTicket',
    index: '12',
    status: 'Live application',
    category: 'Blockchain ticketing',
    roles: ['web3'],
    summary:
      'An NFT event-ticketing dApp where organizers mint events, attendees buy on-chain, and scanners validate entry.',
    problem:
      'Conventional ticketing is prone to forgery, scalping, and opaque resale, and organizers lack verifiable ownership and entry control.',
    system:
      'A React and Vite client talks to Solidity contracts on Sepolia through wagmi and RainbowKit, with separate attendee, organizer, and scanner routes, plus NFT ticket views and organizer fund management.',
    proof: [
      'Reads live event listings and ticket state directly from deployed contracts.',
      'Supports MetaMask, Rainbow, Base, and WalletConnect with a wallet fallback dialog.',
      'Separates attendee, organizer, and scanner workflows with wallet-gated routes.',
    ],
    decisions: [
      'Keep the dApp serverless and read contract state directly from the client.',
      'Separate organizer, scanner, and attendee surfaces by route.',
      'Gate every write action behind explicit wallet connection.',
    ],
    tradeoffs: [
      'Wallet and testnet requirements limit casual exploration.',
      'Demo data lives on a testnet and needs periodic refresh.',
    ],
    stack: ['React', 'TypeScript', 'Solidity', 'wagmi', 'viem', 'RainbowKit'],
    flow: [
      { label: 'Create', detail: 'An organizer mints an event with dates, venue, and ticket supply.' },
      { label: 'Buy', detail: 'Attendees connect a wallet and purchase tickets on-chain.' },
      { label: 'Hold', detail: 'Tickets live as NFTs in the attendee wallet.' },
      { label: 'Validate', detail: 'Scanners verify ownership at the venue entrance.' },
    ],
    links: [
      { label: 'Source', href: 'https://github.com/subhajitlucky/quantumTicket', kind: 'source' },
      { label: 'Live application', href: 'https://quantumticket.vercel.app', kind: 'live' },
      {
        label: 'Contracts',
        href: 'https://github.com/subhajitlucky/quantumTicket/tree/main/blockchain',
        kind: 'evidence',
      },
    ],
    tldr: [
      'An NFT event-ticketing dApp with organizer, attendee, and scanner workflows.',
      'Solidity contracts on Sepolia, read directly from a React client.',
      'Tickets are NFTs; scanners validate entry at the venue.',
    ],
    featured: false,
    hidden: true,
  }
];

const featuredOrder = [
  'kalia',
  'codebase-doctor',
  'rls-doctor',
  'tarka-sabha',
  'cscosmos',
  'campushelper',
];

export const listedProjects = projects.filter((project) => !project.hidden);

const listedRoles = new Set(listedProjects.flatMap((project) => project.roles));

export const roleFilters: { value: Role | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  ...(Object.entries(roleLabels) as [Role, string][])
    .filter(([value]) => listedRoles.has(value))
    .map(([value, label]) => ({ value, label })),
];
export const featuredProjects = featuredOrder
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));
export const secondaryProjects = listedProjects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
