export type PostBlock =
  | { kind: 'p'; text: string }
  | { kind: 'code'; lang: string; code: string; caption?: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'h3'; text: string };

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
            text: 'Dynamic imports make this worse. import(\`./plugins/\${name}.js\`) is not a single edge; it is a pattern that may resolve to many files or none. The honest response is to record a dynamic boundary and say so, not to guess.',
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
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
