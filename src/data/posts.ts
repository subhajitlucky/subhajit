import { tarkaCouncilPost } from './tarka-post';

export type PostBlock =
  | { kind: 'p'; text: string }
  | { kind: 'code'; lang: string; code: string; caption?: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'h3'; text: string }
  | { kind: 'image'; src: string; alt: string; caption?: string }
  | { kind: 'link'; href: string; label: string; note?: string };

export type PostSection = {
  id: string;
  title: string;
  blocks: PostBlock[];
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  sections: PostSection[];
};

export const posts: Post[] = [
  tarkaCouncilPost,
  {
    slug: "five-postgres-rls-mistakes",
    title: "Five Postgres RLS mistakes that leak tenant rows",
    summary:
      "Row Level Security fails quietly. These five policy mistakes let application roles read or write other tenants' rows, and each one is easy to miss in review.",
    date: "2026-09-23",
    readingMinutes: 11,
    tags: ['PostgreSQL', 'Supabase', 'security', 'multi-tenant'],
    sections: [
      {
        id: 'opening',
        title: "The question",
        blocks: [
          {
            kind: 'p',
            text: "Teams adopt Postgres Row Level Security because it pushes tenant isolation into the database, where application bugs cannot forget it. That is the right instinct. The failure mode is worse than a missing WHERE clause: RLS can be present, policies can exist, every test can pass, and application roles can still read another tenant's rows.",
          },
          {
            kind: 'p',
            text: "This post walks five mistakes that produce exactly that outcome. Each one comes from a real policy shape. For each, you get the vulnerable SQL, what a behavioral probe shows, and the fixed policy.",
          },
        ],
      },
      {
        id: 'mistake-1',
        title: "1. RLS is disabled on a granted table",
        blocks: [
          {
            kind: 'p',
            text: "You enable RLS on the tables that \"matter\" and leave the rest alone. But if a table is granted to an application role and RLS is off, the grant is the only boundary — and it is an all-rows boundary.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `-- The grant says: this role may read orders.
grant select on rls_doctor_demo.orders to authenticated;

-- RLS was never turned on. No policy is even consulted.
-- authenticated can select every row in the table.`,
            caption: "A reachable table with RLS disabled is a full-table read.",
          },
          {
            kind: 'p',
            text: "A probe makes this concrete. Impersonating authenticated with two different owner_id subjects returns both users' rows:",
          },
          {
            kind: 'code',
            lang: "text",
            code: `rls_doctor_demo.orders
  authenticated@user-1   rows  sampled 2 row(s), 1 foreign row(s), 1 own row(s) by owner_id
  authenticated@user-2   rows  sampled 2 row(s), 1 foreign row(s), 1 own row(s) by owner_id

- [high] probe-cross-owner-read rls_doctor_demo.orders: Role authenticated
  reads rows across 2 distinct owner_id values`,
          },
          {
            kind: 'code',
            lang: "sql",
            code: `alter table rls_doctor_demo.orders enable row level security;

create policy "users read own orders"
  on rls_doctor_demo.orders
  for select
  to authenticated
  using (owner_id = (select auth.uid()));`,
            caption: "Enable RLS, then constrain every command the role can exercise.",
          },
          {
            kind: 'p',
            text: "Do this for every table an application role can reach, including join tables and audit logs. A single unguarded table is a tenant leak.",
          },
        ],
      },
      {
        id: 'mistake-2',
        title: "2. TO public with an unconditional USING (true)",
        blocks: [
          {
            kind: 'p',
            text: "This is the most common leak in Supabase projects. A policy exists, RLS is enabled, and the policy allows everyone to read everything.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `create policy "anyone can read profiles"
  on rls_doctor_demo.profiles
  for select
  to public
  using (true);`,
            caption: "A policy that never fails is not a policy. It is a grant.",
          },
          {
            kind: 'p',
            text: "Two separate problems stack here. First, to public reaches every role that can use the schema, including anon if it has USAGE. Second, using (true) places no row-level condition on the result set.",
          },
          {
            kind: 'p',
            text: "The fix is not \"add a policy.\" The fix is to name the audience and constrain the predicate:",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `alter policy "anyone can read profiles"
  on rls_doctor_demo.profiles
  to authenticated
  using ((select auth.uid()) = id);`,
            caption: "Name the role. Constrain the predicate. Prefer subselects so the planner can cache the policy.",
          },
          {
            kind: 'p',
            text: "Public content is a real category. If a row is genuinely public, scope the policy to the columns or a published flag — do not use an unconditional predicate on a multi-tenant table.",
          },
        ],
      },
      {
        id: 'mistake-3',
        title: "3. UPDATE without WITH CHECK",
        blocks: [
          {
            kind: 'p',
            text: "A USING clause decides which rows a command may see. It does not decide which rows a command may write. Without WITH CHECK, an updater can move a row into another tenant.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `create policy "anon can update profiles"
  on rls_doctor_demo.profiles
  for update
  to public
  using (true);   -- can update any row ...
                  -- ... and no WITH CHECK: can set owner_id to anyone`,
            caption: "USING alone on an UPDATE policy is a write-what-you-want hole.",
          },
          {
            kind: 'p',
            text: "The attack does not need a bug in the application. A normal profile-edit endpoint that accepts an owner_id field is enough. The row passes USING, the new values are never checked, and the tenant boundary moves.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `alter policy "anon can update profiles"
  on rls_doctor_demo.profiles
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);`,
            caption: "For UPDATE, set both USING and WITH CHECK. For INSERT, WITH CHECK is the only gate.",
          },
          {
            kind: 'p',
            text: "Audit rule: every INSERT and UPDATE policy needs an explicit WITH CHECK. If the write path cannot be described as a predicate over the new row, the policy is incomplete.",
          },
        ],
      },
      {
        id: 'mistake-4',
        title: "4. TRUNCATE reachable by application roles",
        blocks: [
          {
            kind: 'p',
            text: "RLS does not protect TRUNCATE. Not partially. At all. If an application role can truncate a table, it can empty another tenant's rows regardless of every policy on that table.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `grant select, update, truncate
  on rls_doctor_demo.profiles to authenticated;

-- Every policy on profiles is irrelevant for TRUNCATE.
truncate rls_doctor_demo.profiles;  -- succeeds, wipes every tenant`,
            caption: "TRUNCATE is a DDL-shaped command with no row-level gate.",
          },
          {
            kind: 'p',
            text: "Application roles should never hold TRUNCATE. Reserve it for a maintenance role that is not reachable from the app connection string:",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `revoke truncate on rls_doctor_demo.profiles from authenticated;
grant truncate on rls_doctor_demo.profiles to maintenance_role;`,
          },
          {
            kind: 'p',
            text: "The same class of problem applies to default privileges. If a default privilege grants INSERT to authenticated on a schema, every future table created in that schema starts with that grant — before anyone writes a policy.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `revoke all on tables in schema rls_doctor_demo from authenticated;
alter default privileges in schema rls_doctor_demo
  revoke all on tables from authenticated;`,
            caption: "Tighten both current grants and the defaults that create future ones.",
          },
        ],
      },
      {
        id: 'mistake-5',
        title: "5. FORCE RLS is off, so the owner bypasses every policy",
        blocks: [
          {
            kind: 'p',
            text: "By default, the table owner is exempt from RLS. If your application connects as the owner — the role that ran the migrations — every policy you wrote is decorative.",
          },
          {
            kind: 'p',
            text: "This is silent. Tests pass because the test connection is the owner. Production leaks because the production connection is also the owner. Superusers and BYPASSRLS roles bypass RLS in every case; FORCE RLS closes the owner path only.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `alter table rls_doctor_demo.profiles force row level security;`,
            caption: "Enable FORCE RLS after confirming owner-side maintenance workflows still need their access path.",
          },
          {
            kind: 'p',
            text: "Pair this with a separate application role. The app connects as authenticated, not as the migration owner. FORCE RLS is then the second lock, not the first.",
          },
        ],
      },
      {
        id: 'what-audit-cannot-prove',
        title: "What a catalog audit cannot prove",
        blocks: [
          {
            kind: 'p',
            text: "A catalog read — policies, grants, role memberships, defaults — catches all five mistakes. That is worth doing in CI. It is also bounded.",
          },
          {
            kind: 'list',
            items: [
              "Catalog inspection cannot see application-level authorization. A policy can be correct and the API can still return another tenant's rows through a join the policy never touches.",
              "Hosted platform settings, views, and SECURITY DEFINER functions need a separate review. Views especially: a security_barrier view can widen access beyond the base table's policies.",
              "Row counts in a probe depend on the fixture. A probe that sees zero cross-owner reads on empty tables proves nothing. Seed two owners before you trust a green result.",
            ],
          },
          {
            kind: 'p',
            text: "Use both layers. Catalog analysis answers \"are the policies shaped safely?\" Behavioral probing answers \"can this role actually read another tenant's rows right now?\"",
          },
        ],
      },
      {
        id: 'ci',
        title: "Put it in CI",
        blocks: [
          {
            kind: 'p',
            text: "The whole point of these mistakes is that they survive code review. A repeatable check is the only durable fix. Two commands cover the static and behavioral layers:",
          },
          {
            kind: 'code',
            lang: "bash",
            code: `# Static: catalog metadata only. Read-only. No data touched.
npx rls-doctor check --schema public --fail-on high

# Behavioral: impersonate app roles in a rolled-back transaction.
npx rls-doctor probe --app-roles authenticated --owner-columns owner_id`,
            caption: "Both commands are read-only against the target database. Probe rolls back.",
          },
          {
            kind: 'p',
            text: "Run check on every pull request that touches migrations or policies. Run probe against a seeded staging schema before release. Save a baseline so CI fails on new findings, not on known ones you have already decided to accept.",
          },
          {
            kind: 'p',
            text: "These two commands are what rls-doctor does. You can get the same result by querying pg_policies and pg_class by hand; the CLI exists so the check is one line and the output is the same every time.",
          },
        ],
      },
    ],
  },
  {
    slug: "what-breaks-if-i-change-this-file",
    title: "What breaks if I change this file?",
    summary:
      "Grep tells you where a name appears. It does not tell you what depends on this file. Here is how a multi-language source graph answers the question, and where it stops being honest.",
    date: "2026-09-23",
    readingMinutes: 12,
    tags: ['static analysis', 'developer tools', 'compilers', 'CI'],
    sections: [
      {
        id: 'opening',
        title: "The question",
        blocks: [
          {
            kind: 'p',
            text: "You are about to change a function signature. Before you do, you want to know what breaks. The instinctive move is to grep for the function name. That gives you occurrences, not dependencies. It misses re-exports, aliased imports, dynamic imports, and every consumer that imports the module rather than the symbol.",
          },
          {
            kind: 'p',
            text: "This post is about the structure that actually answers the question: a source graph. Not a full compiler — a bounded, honest model of \"this file references that file,\" good enough to scope a change and to tell you when it does not know.",
          },
        ],
      },
      {
        id: 'why-grep-fails',
        title: "Why grep is not enough",
        blocks: [
          {
            kind: 'p',
            text: "Consider a small TypeScript module with a barrel file:",
          },
          {
            kind: 'code',
            lang: "typescript",
            code: `// src/payments/index.ts
export { charge } from './charge.js';
export type { ChargeResult } from './types.js';

// src/api/checkout.ts
import { charge } from '../payments/index.js';`,
            caption: "checkout.ts never names charge.ts. It names the barrel.",
          },
          {
            kind: 'p',
            text: "A grep for charge finds both files and also every unrelated use of the word. It does not tell you that changing charge.ts breaks checkout.ts through the barrel. A source graph does, because it records edges between files after resolution — not between strings.",
          },
          {
            kind: 'p',
            text: 'Dynamic imports make this worse. import("./plugins/${name}.js") is not a single edge; it is a pattern that may resolve to many files or none. The honest response is to record a dynamic boundary and say so, not to guess.',
          },
        ],
      },
      {
        id: 'pipeline',
        title: "The pipeline",
        blocks: [
          {
            kind: 'p',
            text: "Building the graph is four bounded steps. Each step has a job and a limit.",
          },
          {
            kind: 'h3',
            text: "1. Inventory",
          },
          {
            kind: 'p',
            text: "Walk the repository under the ignore rules — .gitignore, .npmignore, default noise. Produce a file list with paths and kinds (source, config, test, asset). Nothing is analyzed yet. This step answers \"what exists,\" not \"what it means.\"",
          },
          {
            kind: 'h3',
            text: "2. Workspaces and project boundaries",
          },
          {
            kind: 'p',
            text: "A monorepo is not one project. package.json files, pnpm-workspace.yaml, go.work, Cargo.toml, and pyproject.toml mark ownership boundaries. Imports that cross a boundary are still edges, but they are labeled. A change that fans out across five packages is a different risk from one that stays inside a single package.",
          },
          {
            kind: 'h3',
            text: "3. Resolution",
          },
          {
            kind: 'p',
            text: "For each source file, extract its references and resolve each one to a concrete file — or record why it could not be resolved. This is the step that differs per language. It is also the step where most tools silently give up.",
          },
          {
            kind: 'h3',
            text: "4. Impact",
          },
          {
            kind: 'p',
            text: "Given a changed set, walk the graph to its reverse-reachable set. That set is the blast radius. Report it with the edges that got you there, so a human can check the walk.",
          },
          {
            kind: 'code',
            lang: "text",
            code: `Changed: src/payments/charge.ts
Blast radius (3 files, 2 boundaries):
  src/payments/index.ts          via  export { charge } from './charge.js'
  src/api/checkout.ts            via  import { charge } from '../payments/index.js'
  packages/billing/src/charge.ts via  cross-package: @app/payments
Unresolved: 1 dynamic boundary in src/plugins/loader.ts`,
            caption: "A useful impact report names the path, not just the file count.",
          },
        ],
      },
      {
        id: 'per-language',
        title: "What each language gets wrong",
        blocks: [
          {
            kind: 'p',
            text: "Resolution is not one algorithm. Each ecosystem has a rule that will bite you if you assume the others.",
          },
          {
            kind: 'list',
            items: [
              "TypeScript / JavaScript: path aliases in tsconfig, extension-less imports, .js suffixes pointing at .ts files, barrel index files, and export * from chains. CJS require and ESM import coexist in the same repo.",
              "Python: implicit namespace packages, src/ layout versus flat layout, importlib.import_module with a computed name, and relative imports whose meaning changes with the package root.",
              "Go: module paths that do not match directory layout, internal/ visibility rules, and build tags that include or exclude a file per GOOS.",
              "Java: package names decoupled from directories just enough to be surprising, wildcard imports that pull in a namespace without naming a class, and annotation processors that generate sources the graph never sees.",
              "Rust: mod declarations that are not file paths in the way you expect, cfg-gated modules, and crate-relative use statements.",
            ],
          },
          {
            kind: 'p',
            text: "A tool that claims \"multi-language\" and uses one regex for all five is not lying about the regex. It is lying about the answer.",
          },
        ],
      },
      {
        id: 'missing-targets',
        title: "Missing-target detection",
        blocks: [
          {
            kind: 'p',
            text: "The inverse of impact analysis is often more valuable. Every resolved reference implies a file should exist. When it does not, you have found a bug the type-checker might also find — or might not, if the file is generated, vendored, or conditionally loaded.",
          },
          {
            kind: 'code',
            lang: "text",
            code: `Finding: import target missing (source-integrity/missing-target)
  Location: src/api/checkout.ts:3:24
  Reference: ../payments/charge.js
  Resolved to: src/payments/charge.ts  — not present in the inventory
  Confidence: high`,
          },
          {
            kind: 'p',
            text: "This is the check you want after a merge that deleted files, after a rename, and after a partial revert. It is also the check that catches a broken barrel: the barrel exports from a path that no longer exists, and nothing else in the repo mentions that path.",
          },
        ],
      },
      {
        id: 'fingerprints',
        title: "Stable fingerprints and baselines",
        blocks: [
          {
            kind: 'p',
            text: "A graph that produces findings is only useful in CI if it can tell new problems from old ones. That requires a fingerprint that survives line-number drift but changes when the problem changes.",
          },
          {
            kind: 'p',
            text: "A workable fingerprint is a hash over the rule identity and the structural location — module, exported symbol, reference text — not over the line number. Then you store a baseline of accepted findings, and CI fails only on findings whose fingerprint is not in the baseline.",
          },
          {
            kind: 'code',
            lang: "bash",
            code: `# Accept today's known findings.
codebase-doctor audit . --json > baseline.json

# Later, after an external repair, verify.
codebase-doctor verify . --baseline baseline.json

# On every PR, fail only on new findings.
codebase-doctor audit . --changed --baseline baseline.json --fail-on high`,
          },
          {
            kind: 'p',
            text: "Without this, teams turn the check off the first week because it fails on forty known issues. With it, the check stays on and actually catches regressions.",
          },
        ],
      },
      {
        id: 'limits',
        title: "What the graph cannot see",
        blocks: [
          {
            kind: 'p',
            text: "The value of the tool is bounded by its honesty about limits. These are the ones that matter:",
          },
          {
            kind: 'list',
            items: [
              "Reflection and runtime wiring. A dependency-injection container that resolves a type by name is not a static edge. The graph should say \"dynamic boundary\" and stop.",
              "Generated sources. Code emitted at build time is not in the inventory unless you point the tool at the output directory. Migrations that generate ORM clients are a common blind spot.",
              "Cross-language edges. A TypeScript file that shells out to a Python script is not a source edge. Record the process boundary or accept the gap.",
              "Semantic impact. Knowing that A imports B does not mean a change to B is safe for A. A signature-preserving refactor and a behavior change look identical to the graph.",
            ],
          },
          {
            kind: 'p',
            text: "Any tool that reports a clean blast radius without listing its unresolved boundaries is reporting confidence it has not earned. Coverage has to be visible in the report — what was analyzed, what was skipped, and why.",
          },
        ],
      },
      {
        id: 'close',
        title: "Where this lives",
        blocks: [
          {
            kind: 'p',
            text: "This is the model behind codebase-doctor: a bounded inventory, per-language resolution, a reverse-reachable impact set, missing-target detection, and fingerprints that make the output usable in CI. The report carries its own coverage and limitations next to the findings.",
          },
          {
            kind: 'p',
            text: "If you want the same result without the tool, you can build a graph for one language in an afternoon and be wrong in exactly the ways listed above. The tool exists because the wrong answers are expensive and quiet.",
          },
          {
            kind: 'p',
            text: "codebase-doctor is open source, runs offline by default, and never writes to the repository it audits.",
          },
        ],
      },
    ],
  },
  {
    slug: 'kalia-build-log',
    title: 'Training a 58M language model from scratch on free GPUs',
    summary:
      'Zero dollars and a full public record: micro-ablations before full runs, an optimizer that won 7 of 7 checkpoints and was still not promoted, a validation plateau resolved by a deterministic evaluation, and the quota exhaustion that ended training at 73% of the schedule.',
    date: '2026-09-23',
    readingMinutes: 17,
    tags: ['language models', 'training', 'Muon', 'Kaggle', 'from scratch'],
    sections: [
      {
        id: 'goal',
        title: 'The goal and the constraint',
        blocks: [
          {
            kind: 'link',
            href: '/kalia',
            label: 'Dedicated page: KALIA 0.1.2',
            note: 'The full paper-style record — model specification, evaluation, a replayable training console, and every decision and incident.',
          },
          {
            kind: 'p',
            text: "I trained KALIA, a 58M-parameter language model, from random initialization to coherent story generation using only free-tier Kaggle GPUs. No pretrained weights, no distillation, no fine-tuning, and zero dollars of compute. It writes short stories, scores 61.4% on PIQA, and every weight in it exists nowhere else.",
          },
          {
            kind: 'p',
            text: "Two rules shaped the project. The first was from-scratch: fine-tuning forks someone else's brain, and I wanted an artifact where every byte was accountable — the corpus mixture, the tokenizer, the architecture, the optimizer, the exact run. The second rule was verifiability: every experiment is pre-registered with a SHA-256 hash before it runs, every decision is numbered, and every incident is published, including the ones that make me look bad.",
          },
          {
            kind: 'list',
            items: [
              'The constraint stack: 30 GPU-hours per week on 2x NVIDIA T4 (32GB total).',
              '8.5-hour maximum session length, so the trainer had to be resumable by design.',
              'API-triggered runs cannot read secrets, so real training sessions start from the browser.',
              'Total compute spent on the released model: about 20 GPU-hours.',
            ],
          },
        ],
      },
      {
        id: 'measure-first',
        title: 'Measure before you spend',
        blocks: [
          {
            kind: 'p',
            text: "When quota is the scarce resource, the worst thing you can do is discover a bad recipe with it. Every change is first screened at 30M parameters on 50M tokens, roughly 30 minutes per arm, with identical seed and token budget. Only winners are promoted to full runs.",
          },
          {
            kind: 'code',
            lang: 'bash',
            code: `# Screen three optimizers at 30M params, 500 steps each (~90 minutes total)
python ablate.py --arms micro-base,micro-muon,micro-muon-qk --steps 500`,
            caption: 'The micro-ablation ladder: one change per arm, same data and seed.',
          },
          {
            kind: 'list',
            items: [
              'AdamW: 3.8041 step-700 validation loss.',
              'Muon: 3.5937, a 0.21 improvement.',
              'Muon + QK-Norm + logit soft-capping: 3.5103, a 0.29 improvement.',
              'The ordering held at every evaluation checkpoint, so it was not noise.',
            ],
          },
          {
            kind: 'image',
            src: '/kalia/optimizer-ablation.svg',
            alt: 'Bar chart comparing step-700 validation loss for AdamW, Muon, and Muon with QK-Norm and logit soft-capping; lower is better, and the combined recipe wins.',
            caption: 'The optimizer ladder: each change screened at 30M params before spending full-run quota.',
          },
          {
            kind: 'p',
            text: "The full-scale run confirmed it: the new recipe reached the AdamW baseline's final loss with about 23% fewer tokens, and kept a persistent gap of roughly 0.15 nats at equal step counts.",
          },
        ],
      },
      {
        id: 'not-promoted',
        title: 'Muon+ validated, not promoted',
        blocks: [
          {
            kind: 'p',
            text: "Muon+ adds one post-polar normalization step to Muon, and the papers report gains from 60M parameters upward. In our ablation it beat plain Muon on 7 of 7 checkpoints. It was not promoted to the full-scale recipe.",
          },
          {
            kind: 'p',
            text: "The gain was 0.015 nats. The promotion threshold, fixed before the experiment ran, was 0.02. A threshold that is bent for a favored result is not a threshold, so the full-scale model kept plain Muon and the 0.015 result remains in the record as validated but below the bar.",
          },
        ],
      },
      {
        id: 'architecture',
        title: 'Architecture search: three negatives and one finding',
        blocks: [
          {
            kind: 'p',
            text: "With the optimizer settled, the next question was shape. Four arms, same data, same seed, 763 steps: the control design, a looped model that passes through the same weights twice for double effective depth, a thin-and-deep model, and grouped-query attention.",
          },
          {
            kind: 'list',
            items: [
              'Control (Muon + QK-Norm): 3.4924 step-700 validation loss.',
              'Looped depth: 3.5012 — quality-neutral.',
              'Thin and deep: 3.6969 — clearly worse.',
              'Grouped-query attention: 3.5031 — quality-neutral, with 4% fewer parameters.',
            ],
          },
          {
            kind: 'image',
            src: '/kalia/architecture-ablation.svg',
            alt: 'Bar chart comparing step-700 validation loss for the control architecture, looped depth, thin-and-deep, and grouped-query attention; the control arm is lowest.',
            caption: 'Nothing beat the control arm by the pre-set margin, so the negatives shipped with the results.',
          },
          {
            kind: 'p',
            text: "Nothing beat control by the pre-set margin, so the architecture stayed as it was and the negatives were published. One finding survived anyway: the looped model ran only 1.35x slower per step, not 2x, because the reused weights stay hot in cache between passes. Double effective depth for a third more compute is interesting economics — it just did not buy quality at this scale.",
          },
        ],
      },
      {
        id: 'the-run',
        title: 'The run: a plateau, a decay, and a quota wall',
        blocks: [
          {
            kind: 'p',
            text: "The released model trained across three sessions. For a thousand steps the validation loss refused to move while training loss kept falling — the classic shape of a noisy eval or a real plateau, and impossible to tell apart from a single point.",
          },
          {
            kind: 'list',
            items: [
              'Step 1500: 2.5270, then 1750: 2.5453, 2000: 2.6334, 2250: 2.6261, 2500: 2.5736 — flat inside a band of about 0.1.',
              'Step 2750: 2.4438, then 3000: 2.3986 as the cosine decay bit, then 3250: 2.5138 — the swings were the eval, not the model.',
              'The weekly GPU quota ran out at step 3478 of 4770, 73% of the schedule.',
            ],
          },
          {
            kind: 'image',
            src: '/kalia/val-loss-v012.svg',
            alt: 'Line chart of validation loss from step 250 to 3250: a steep descent from 4.0881 to 2.5270 by step 1500, then a plateau band between 2.40 and 2.63 for the remaining 1,750 steps, plus a separate deterministic evaluation point at step 3478 with loss 2.4366.',
            caption: 'The full curve: the descent finishes by step 1,500 and everything after it oscillates inside 0.23 nats. The first half was missing from the published log — a mid-run code change dropped it — and was rebuilt from the model repository commit history.',
          },
          {
            kind: 'p',
            text: "A deterministic evaluation settled the question the noisy training evals could not: 100 fixed-seed batches over 819,200 tokens returned 2.4366 loss and 0.8184 bits-per-byte, on the original corpus's held-out set. That set was later rebuilt for licence compliance and the rebuilt one is 0.62 nats harder for identical weights, so the figure is not comparable to anything measured afterwards — a lesson that arrived as decision D43.",
          },
        ],
      },
      {
        id: 'evaluation',
        title: 'Evaluation beyond loss',
        blocks: [
          {
            kind: 'list',
            items: [
              'Probe held-out loss on 20 fixed sentences: 3.2303, or 0.9415 bits-per-byte.',
              'Zero-shot benchmarks, 500 samples each: PIQA 61.4%, ARC-Easy 45.8%, HellaSwag 36.8% (normalized), WinoGrande 50.2%, LAMBADA 23.0% accuracy at perplexity 194.',
              'For scale context, leaderboard tables list OPT-125M — twice the parameters and roughly 160x the training tokens — at PIQA 63.0% and ARC-Easy 43.5%. Treat that as context, not a head-to-head: harness versions differ.',
            ],
          },
          {
            kind: 'image',
            src: '/kalia/benchmarks.svg',
            alt: 'Bar chart of zero-shot benchmark accuracy: PIQA 61.4, ARC-Easy 45.8, HellaSwag 36.8, WinoGrande 50.2, with dashed chance lines at 50 and 25 percent.',
            caption: 'Above chance on every task; genuinely competitive on PIQA and ARC-Easy for a 58M storyteller.',
          },
          {
            kind: 'p',
            text: "The metric I am most attached to is custom. Take held-out text, measure the model's loss on it forward, then measure its loss on the same text with the tokens reversed. Forward 3.23, reversed 9.29. The Abhimanyu gap is the difference: 6.06 nats. The model can enter fluent text but cannot exit it — the computational form of the warrior who entered the Chakravyuha formation and could not find his way out. Random guessing would be about 10.8, so reversed text is nearly as foreign to the model as noise.",
          },
          {
            kind: 'code',
            lang: 'bash',
            code: `# Reproduce the evaluation on the released checkpoint
python eval_probes.py --ckpt ckpt.pt --out out/eval/report.md
python eval_reversibility.py --ckpt ckpt.pt --out out/eval/reversibility.md
python eval_val.py --ckpt ckpt.pt --val-bin val.bin --batches 100`,
            caption: 'The evaluation suite runs on CPU; no GPU quota is spent.',
          },
        ],
      },
      {
        id: 'record',
        title: 'The record is the point',
        blocks: [
          {
            kind: 'p',
            text: "Any training run produces a loss curve. What makes this one auditable is everything around it: the numbered decisions, the published incidents, the hash-anchored pre-registrations and their registered amendments, and a dated journal. The incidents are the useful part.",
          },
          {
            kind: 'list',
            items: [
              'A resume race where both distributed workers wrote the same checkpoint file; fixed with a single downloader, an atomic swap, and a barrier.',
              'A silent success: a failed training subprocess was still marked complete, because shell-style commands do not fail notebook cells; fixed by asserting exit codes.',
              'A misreported duration: I described a 44-minute ablation as having run five hours, because I trusted my sense of time instead of the run-start timestamp. The correction is in the journal.',
              'A documentation error caught late: our own docs described the released model as Muon+ when the config proved it was plain Muon. Every public text was corrected, and the hashed v0.2.0 pre-registration received a registered amendment rather than a silent edit.',
            ],
          },
          {
            kind: 'p',
            text: "None of this is glamorous. All of it is why the numbers in this post can be checked by anyone with a browser, and why I trust them myself.",
          },
        ],
      },
      {
        id: 'release',
        title: 'What is public now',
        blocks: [
          {
            kind: 'list',
            items: [
              'Weights, model card, configs, and the full resumable checkpoint on HuggingFace (Apache-2.0).',
              'Source, tests, notebooks, journal, decisions, incidents, and the pre-registration ledger on GitHub (MIT).',
              'Training data is never redistributed; every source is attributed in the model card.',
              'The Kaggle notebooks that built and evaluated the model are private for now, and the self-contained ones will be published next.',
            ],
          },
          {
            kind: 'code',
            lang: 'python',
            code: `# Generate from the released checkpoint (CPU is fine; the model is ~230MB)
from huggingface_hub import hf_hub_download
path = hf_hub_download("kalia-lm/kalia-v012", "checkpoints/ckpt.pt")
# then, from a clone of the repository:
# python sample.py --ckpt <path> --prompt "Once upon a time"`,
            caption: 'The raw checkpoint loads with the project\u2019s own model code, no transformers required.',
          },
        ],
      },
      {
        id: 'reproduce',
        title: 'Reproduce it',
        blocks: [
          {
            kind: 'code',
            lang: 'bash',
            code: `git clone https://github.com/subhajitlucky/kalia && cd kalia
python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt
python -m pytest tests/ -v`,
            caption: 'The full test suite runs on CPU.',
          },
          {
            kind: 'p',
            text: "Data preparation, training, and evaluation all run on free Kaggle notebooks, and every one of them is in the repository. The pre-registration hashes are in the ledger, so anyone can verify that a prediction existed before its result did.",
          },
        ],
      },
      {
        id: 'next',
        title: 'What is next',
        blocks: [
          {
            kind: 'p',
            text: "The Abhimanyu gap was the thread I wanted to pull. The pre-registered experiment tested whether chunk-preserving reversal training — reversing the order of short chunks while keeping tokens inside each chunk readable — closes the gap without hurting forward loss. The prediction, threshold, and analysis plan were hashed before the run. It failed: the gap came out 0.14 nats worse than the control, on both seeds, on both metrics, and the transform was rejected by the rule that had already decided what would count as success.",
          },
          {
            kind: 'p',
            text: "Then came v0.2.0, now training: a compliance-clean corpus of 2.4B tokens, with only those changes that pass promotion rules hashed before any result existed. The reversal transform was not one of them. Its final evaluation — yardstick, thresholds, and the claims it is forbidden to make — was registered while it was still training.",
          },
        ],
      },
    ],
  },
  {
    slug: 'how-paninis-grammar-made-agent-messages-25x-cheaper',
    title: "How Panini's grammar made agent messages 25x cheaper",
    summary:
      'A JSON-RPC message averaged 72.5 tokens in a six-message agent deal. A compact wire format built from five compression devices in Panini\'s Ashtadhyayi carries the same deal in 2.8-7.5 tokens. Every encoding is decoder-verified, and two model families read and write the compact form at 12/12.',
    date: '2026-10-15',
    readingMinutes: 8,
    tags: ['protocols', 'tokenization', 'agents', 'Panini', 'compact encoding'],
    sections: [
      {
        id: 'the-bill',
        title: '72.5 tokens per message',
        blocks: [
          {
            kind: 'p',
            text: 'A six-message buyer/seller deal costs 435 tokens as JSON-RPC. That is 72.5 tokens per message. The simplest message in the deal, an ACCEPT, costs 54:',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `{"jsonrpc":"2.0","id":3,"method":"tools/call",
 "params":{"name":"sutra","arguments":{
   "primitive":"ACCEPT","args":{"id":"off-001"},
   "from":"buyer@home","to":"seller@store"}}}`,
            caption: '54 tokens for one ACCEPT. The six-message average is 72.5.',
          },
          {
            kind: 'p',
            text: 'A token is a chunk of text, roughly a short word. Every token costs money and time. Tokens are a taxi meter: every bracket, quote, key, and comma is a tick. Most agent protocols never look at the meter. They count model calls and ignore the format every call carries.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `encoding              tokens / message    vs JSON-RPC
readable SUTRA              22.3              3.2x
SUTRA-C                      7.5              9.7x
SUTRA-C meter                2.8             25.6x
JSON-RPC envelope           72.5              1.0x`,
            caption: 'One six-message deal, o200k_base. Lower is better.',
          },
          {
            kind: 'p',
            text: 'The short version: count the format, remove the syntax, and let position carry meaning.',
          },
        ],
      },
      {
        id: 'meter',
        title: 'Build the meter first',
        blocks: [
          {
            kind: 'p',
            text: "Before optimizing, make the number honest. I wrote 12 canonical messages for one buyer/seller negotiation. Every representation renders from the same structured object, so nothing can be silently dropped. Every count uses the production tokenizer. The readable SUTRA baseline is parsed by the project's own parser before it is counted.",
          },
          {
            kind: 'code',
            lang: 'text',
            code: `representation        tokens / 12 messages    per message
english                       263                21.9
readable SUTRA                330                27.5   <- mine
lean JSON                     514                42.8`,
            caption: 'The first measurement. My own format was 25% more expensive than English.',
          },
          {
            kind: 'p',
            text: 'That result was embarrassing, and useful. Tokenizers are trained on natural text. They read common English words as single tokens and charge extra for every bracket, quote, and equals sign. Syntax is not free. Punctuation is the enemy.',
          },
          {
            kind: 'p',
            text: 'So the target changed: keep the meaning, remove the syntax. Every change would be judged by one number, tokens per message. Every candidate also had to pass one test first: encode a message, decode it, and get the original back exactly. Lossless first, then cheap.',
          },
        ],
      },
      {
        id: 'where',
        title: 'Where the tokens went',
        blocks: [
          {
            kind: 'p',
            text: 'First, find where the tokens are. I counted the best candidate by region. One line item dominated:',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `routing (buyer@home>seller@store)   6.2 tokens/message   34% of all tokens
body (predicate + values + syntax)   ~8 tokens/message`,
            caption: 'Routing was a third of the bill, repeated on every message.',
          },
          {
            kind: 'p',
            text: 'The fix was not a shorter address. It was to stop sending the address. Fold the direction into the case of the primitive: lowercase means buyer to seller, uppercase means the reverse. Two bits of routing for zero tokens. A message that used to start with `buyer@home>seller@store` now starts with `q`.',
          },
          {
            kind: 'p',
            text: 'The second fix was positional slots. If the schema says an OFFER is `id, money, item, brand`, you do not need `id=`, `money=`, quotes, or braces. The position carries the meaning. Panini called this karaka. The tokenizer calls it fewer tokens.',
          },
          {
            kind: 'p',
            text: 'The third fix was a session dictionary. A value that repeats, like `SmartTV` or `off-001`, gets a one-letter handle once, then travels as that handle. The handshake is paid once; after that, the payload is mostly new information.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `message    readable tokens    SUTRA-C              compact tokens
QUERY            13           q availability a           3
ACCEPT            7           a o                        2
OFFER            39           o o 48000 a m              7`,
            caption: 'Same message, same meaning. The compact form drops labels, quotes, and braces.',
          },
        ],
      },
      {
        id: 'panini',
        title: 'Five tricks from a 2,500-year-old grammar',
        blocks: [
          {
            kind: 'p',
            text: "Panini's Ashtadhyayi is 3,981 rules built to describe Sanskrit in the fewest possible syllables. Kiparsky identifies five compression devices in it. I implemented all five on the wire:",
          },
          {
            kind: 'code',
            lang: 'text',
            code: `device       in Panini's grammar        on our wire
ordering     rule order carries info    message type implied by sequence
blocking     specific beats general     repeat-ellipsis precedence
pratyahara   list + marker names a set  bD = items b..d
anuvrtti     systematic dittoing        '.' repeats the last value
adhikara     heading governs a domain   session dictionary / template`,
            caption: "Panini's five devices, mapped one to one.",
          },
          {
            kind: 'p',
            text: 'Two more ideas came from the same tradition. Karaka slots let position carry the argument role. Chandas, fixed-width meter, lets the payload concatenate into one separator-free string. In template mode, `o48000am` is a complete OFFER: offer, 48,000, item a, brand m. `48000739676` is a COMMIT with the amount and deadline fused together.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `q availability a      3 tok    a QUERY ('a' = SmartTV)
a o                   2 tok    ACCEPT
o48000am              4 tok    a whole OFFER: id, money, item, brand
48000739676           4 tok    COMMIT amount + deadline`,
            caption: 'The frozen vocabulary after 384 + 162 measured encodings.',
          },
          {
            kind: 'p',
            text: 'Not every old idea won. I tested katapayadi (digits as consonants) and bhutasankhya (numbers as words). Both lost to plain digits: 83 vs 76 tokens on the corpus. The tokenizer already reads digit strings well. Cleverness it cannot see is just extra characters.',
          },
          {
            kind: 'p',
            text: 'Binary wires lost too. Base85 and base64 over packed bytes look efficient, but short messages pay extra setup cost, and the tokenizer handles unfamiliar characters poorly. Devanagari primitives were neutral. Tuned text won. Those negatives are published next to the wins.',
          },
          {
            kind: 'p',
            text: 'The design space was measured in stages: 384 encodings, then 162 configurations (40 unique), then the model round. Every stage used the same 12-message corpus and tokenizer:',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `stage                              tokens / 12 msgs   per message
readable SUTRA (start)                   330             27.5
384-encoding sweep                        80              6.7
162-config sweep                          75              6.25
after the model's 'sF' trick              73              6.1`,
            caption: 'Every stage is decoder-verified. The 384 and 162 rows are the winning configuration, not the whole sweep.',
          },
          {
            kind: 'p',
            text: 'The last drop came from a model, not from me. It wrote `sF` instead of `s F`, gluing the broadcast prefix into one token. I adopted it. 75 tokens became 73.',
          },
        ],
      },
      {
        id: 'models',
        title: 'Can a model actually read it?',
        blocks: [
          {
            kind: 'p',
            text: 'A cheap encoding is worthless if models cannot read or write it. I put the compact forms in front of two model families through local CLIs. Every prompt and raw output is logged.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `cell                gpt-6-luna        deepseek-v4.1-flash
compact read          12/12             12/12
compact write         12/12             12/12
meter read             2/6               6/6
meter write            4/6               5/6`,
            caption: 'Round 7. The third model family returned no usable array and is logged as blocked.',
          },
          {
            kind: 'p',
            text: 'Both models read and write the compact form at 12/12. The 2.8-token meter form depends on the model: deepseek reads 6/6, gpt-6-luna reads 2/6. Ultra-compactness trades against robustness, so the default is the 7.5 token form, not the 2.8 one.',
          },
          {
            kind: 'p',
            text: 'Round 5 repeated the tests three times per cell. The difference was not subtle:',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `cell                     runs                 mean
readable emit            0, 0, 11 / 12         0.31
compact emit             12, 10, 12 / 12       0.94
compact parse            9, 10, 12 / 12        0.86
readable parse           11, 11, 10 / 12       0.89`,
            caption: 'Round 5. Readable SUTRA emission failed on one character: the semicolon.',
          },
          {
            kind: 'p',
            text: 'Readable SUTRA requires a semicolon after every statement. In two of three runs, the model dropped it and all 12 messages were undecodable, 24 failures in total. SUTRA-C has no terminator: the message boundary is the statement boundary. That failure mode cannot exist.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `model wrote   INTENT buy(item="SmartTV", max_price=50000)
parser wants  INTENT buy(item="SmartTV", max_price=50000);`,
            caption: 'One missing character made every message in the run undecodable.',
          },
          {
            kind: 'p',
            text: 'The number that matters is not the raw encoding. It is the cost per correct message. Readable SUTRA spent about 39.5 output tokens per correct message. Compact spent 8.6, a 4.6x difference once you count the failures.',
          },
          {
            kind: 'list',
            items: [
              'Low reasoning effort: compact parse fell from 0.86 to 0.71, emit from 0.94 to 0.83, but calls ran 2-3x faster. Accuracy is a dial, not a constant.',
              'Novel values: 6/6 emitted and 5/6 parsed correctly. The dictionary fallback did not hallucinate aliases.',
              'The tests also caught two harness bugs. Both runs are archived and re-scored offline; no test was re-rolled.',
            ],
          },
        ],
      },
      {
        id: 'bill',
        title: 'The per-message bill',
        blocks: [
          {
            kind: 'p',
            text: 'Averages hide the shape. Here is the same six-message deal, message by message:',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `message     JSON-RPC   readable   SUTRA-C   meter
QUERY             60         13         3       1
FACT              70         12        11       3
OFFER             83         39         7       4
COUNTER           86         40         7       4
ACCEPT            62          7         2       1
COMMIT            74         23        15       4
total            435        134        45      17`,
            caption: 'o200k tokens. The compact form wins on average, not on every message.',
          },
          {
            kind: 'p',
            text: 'FACT is 11 tokens in compact form versus 12 readable. The readable rendering drops the reply id that the compact wire keeps, so that row is not perfectly fair. COMMIT is 15 versus 23. The long address and date are why. The meter form turns those into 3 and 4 because the template already knows the addresses, the order, and the reply. That is the real lesson: the biggest savings come from information both sides already have.',
          },
          {
            kind: 'p',
            text: 'At one million messages, 72.5 to 7.5 saves about 65 million tokens. 72.5 to 2.8 saves about 70 million. That is token count, not dollars; prices vary by provider. It is also not free: both sides have to keep the same session state.',
          },
          {
            kind: 'p',
            text: 'The six-message payloads are 25.6x cheaper (17 vs 435 tokens). The handshake is a separate one-time cost. At 500 messages it is about 24x, because the handshake is spread thin. The longer the session, the better the deal, as long as both sides stay in sync.',
          },
        ],
      },
      {
        id: 'shipped',
        title: 'What shipped',
        blocks: [
          {
            kind: 'p',
            text: 'SUTRA-C v0.7 is frozen: a spec, a codec, 17 codec tests, and an end-to-end deal demo. The project is now at v0.10. The compact form runs over HTTP, both sides can agree on a template, and the full suite is 42 tests.',
          },
          {
            kind: 'code',
            lang: 'python',
            code: `from sutra.compact import Session, encode, decode

session = Session()
session.register("SmartTV", "a")
wire = encode(message, session)   # 'q availability a'
back = decode(wire, session)      # == the original message`,
            caption: 'The whole API for the fast path.',
          },
          {
            kind: 'p',
            text: 'The oops button handles surprises. If a message falls outside the agreed template, prefix the full compact statement with `!`. The example `!Rp!price_too_low` is 7 tokens glued, or 8 with spaces. Then the session continues compact. One deviation does not reset the meter.',
          },
          {
            kind: 'code',
            lang: 'bash',
            code: `git clone https://github.com/subhajitlucky/sutra
cd sutra
pip install tiktoken
python examples/compact_deal.py
python examples/network_meter_demo.py`,
            caption: 'Both demos run on CPU. The meter demo uses real HTTP.',
          },
          {
            kind: 'link',
            href: 'https://github.com/subhajitlucky/sutra',
            label: 'SUTRA on GitHub',
            note: 'Source, the frozen wire spec, the token-cost lab, and every logged experiment, winners and losers.',
          },
        ],
      },
      {
        id: 'limits',
        title: 'What it costs',
        blocks: [
          {
            kind: 'list',
            items: [
              'Template mode remembers the session. Both sides must agree on the message sequence, and a surprise message pays the resync cost.',
              'The 2.8-token meter form depends on the model. The default is the 7.5 token form because two unrelated model families read and write it perfectly.',
              'The session dictionary holds at most 52 shortcuts. Beyond that, values travel quoted.',
              'The evidence is two model families, one 12-message corpus, and small runs per cell. The error bars are real but the sample sizes are small.',
              'More than 500 encodings were tested against that corpus. A larger corpus would move the margins, not the mechanisms.',
            ],
          },
          {
            kind: 'p',
            text: 'What I would measure next: a third model family, 50+ message sessions for drift and ellipsis state, and real traffic instead of a synthetic deal.',
          },
          {
            kind: 'p',
            text: 'What I learned, in four lines:',
          },
          {
            kind: 'list',
            items: [
              'Format is a cost center. Count it, not just model calls.',
              'Position is cheaper than labels. A schema can replace keys, quotes, and braces.',
              'An encoding only counts if the model can read and write it. Test both directions.',
              'The failures are the map: the semicolon, the meter read, the binary wire.',
            ],
          },
          {
            kind: 'link',
            href: 'https://github.com/subhajitlucky/sutra/blob/main/experiments/token-cost/README.md',
            label: 'The token-cost lab',
            note: 'Method, results, and every negative result, round by round.',
          },
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByDateDesc() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
