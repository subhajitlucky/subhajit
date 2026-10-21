import { tarkaCouncilPost } from './tarka-post';

export type PostBlock =
  | { kind: 'p'; text: string }
  | { kind: 'code'; lang: string; code: string; caption?: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'h3'; text: string }
  | { kind: 'callout'; title: string; items: string[] }
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
      "Row Level Security fails quietly. A static audit of 60 open-source Supabase apps found a high or critical RLS pattern in 63% of them. These are the five mistakes behind most of it, with the exact severity and fix.",
    date: "2026-09-23",
    readingMinutes: 8,
    tags: ['PostgreSQL', 'Supabase', 'security', 'multi-tenant'],
    sections: [
      {
        id: 'opening',
        title: 'Two users, one table',
        blocks: [
          {
            kind: 'p',
            text: "Two users. One table. User A can read User B's order. RLS is on. The policy exists. Your tests pass.",
          },
          {
            kind: 'p',
            text: "This is common. A static audit of 60 open-source Supabase apps found at least one high or critical RLS pattern in 63% of them. One in four had a critical finding. The median RLS Score was 38/100.",
          },
          {
            kind: 'image',
            src: '/rls/study-patterns.svg',
            alt: 'Bar chart of RLS patterns across 60 open-source Supabase repositories: public read 35, RLS on with zero policies 19, public write 15, missing WITH CHECK 5, RLS off and reachable 4, TRUNCATE reachable 2, broad default privilege 1.',
            caption: 'Static audit of 60 public Supabase repositories, 2026-10-09. Counts are repositories with at least one instance, not individual findings.',
          },
          {
            kind: 'p',
            text: "The five mistakes below account for most of it. Each one is a real finding from rls-doctor, with the severity the tool assigns and the SQL that fixes it.",
          },
          {
            kind: 'callout',
            title: 'What this is, and what it is not',
            items: [
              'This is a static audit of 60 public Supabase migrations, plus a read-only probe you can run on your own database.',
              'It is not a random sample of production apps, a compliance audit, or a substitute for application-level authorization tests.',
              'The 60-repo study is a convenience sample. 57% of those repos had at least one statement the offline parser could not evaluate, so the true rate may be higher.',
            ],
          },
        ],
      },
      {
        id: 'short-version',
        title: 'The short version',
        blocks: [
          {
            kind: 'code',
            lang: 'text',
            code: `#  mistake                          severity   finding id
1  RLS off on a granted table       high       rls-disabled-exposed
2  to public + using (true)         high/crit  public-unconditional-read/write
3  UPDATE without WITH CHECK        medium     write-policy-missing-check
4  TRUNCATE reachable               high       reachable-truncate
5  FORCE RLS off                    info       force-rls-disabled`,
            caption: 'Same five mistakes, with the severity rls-doctor assigns.',
          },
          {
            kind: 'p',
            text: "The severity matters as much as the mistake. If your CI runs `--fail-on high`, mistake 3 will not fail the build. Keep that in mind when you wire up the gate.",
          },
        ],
      },
      {
        id: 'mistake-1',
        title: '1. RLS is off on a granted table',
        blocks: [
          {
            kind: 'p',
            text: "A grant says a role may read a table. RLS is the row filter. If RLS is off, the grant is the only boundary, and it is an all-rows boundary.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `grant select on rls_doctor_demo.orders to authenticated;

-- RLS was never enabled. No policy is even consulted.
-- authenticated can select every row in the table.`,
            caption: 'A reachable table with RLS off is a full-table read.',
          },
          {
            kind: 'p',
            text: "The catalog finding is High: `rls-disabled-exposed`. A probe makes it concrete:",
          },
          {
            kind: 'code',
            lang: "text",
            code: `rls_doctor_demo.orders
  authenticated          rows  sampled 2 row(s), 2 distinct owner_id

- [high] probe-cross-owner-read rls_doctor_demo.orders:
  Role authenticated reads rows across 2 distinct owner_id values`,
            caption: 'The probe impersonates the app role inside a read-only transaction and rolls back.',
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
            caption: 'Enable RLS, then constrain every command the role can exercise.',
          },
          {
            kind: 'p',
            text: "Do this for every table an application role can reach, including join tables and audit logs. One unguarded table is a tenant leak.",
          },
        ],
      },
      {
        id: 'mistake-2',
        title: '2. TO public with an unconditional USING (true)',
        blocks: [
          {
            kind: 'p',
            text: "This is the most common leak in Supabase projects. A policy exists, RLS is on, and the policy allows everyone to read everything.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `create policy "anyone can read profiles"
  on rls_doctor_demo.profiles
  for select
  to public
  using (true);`,
            caption: 'A policy that never fails is not a policy. It is a grant.',
          },
          {
            kind: 'p',
            text: "Two problems stack. `to public` reaches every role that can use the schema, including `anon`. `using (true)` places no row-level condition on the result. For reads, the finding is High. For writes, it is Critical.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `alter policy "anyone can read profiles"
  on rls_doctor_demo.profiles
  to authenticated
  using ((select auth.uid()) = id);`,
            caption: 'Name the role. Constrain the predicate.',
          },
          {
            kind: 'p',
            text: "If a row is genuinely public, scope it with a `published` flag or a dedicated public view. Do not put an unconditional predicate on a multi-tenant table.",
          },
        ],
      },
      {
        id: 'mistake-3',
        title: '3. UPDATE without WITH CHECK',
        blocks: [
          {
            kind: 'p',
            text: "`USING` decides which rows the command can see. `WITH CHECK` decides which rows it can write. Without `WITH CHECK`, an update can move a row into another tenant.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `create policy "anon can update profiles"
  on rls_doctor_demo.profiles
  for update
  to public
  using (true);   -- can update any row
                  -- no WITH CHECK: can set owner_id to anyone`,
            caption: 'USING alone on an UPDATE policy is a write-what-you-want hole.',
          },
          {
            kind: 'p',
            text: "The finding is Medium: `write-policy-missing-check`. This is the one people miss in CI. `--fail-on high` will not fail on it. Use `--fail-on medium` if you want the build to catch it.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `alter policy "anon can update profiles"
  on rls_doctor_demo.profiles
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);`,
            caption: 'For UPDATE, set both USING and WITH CHECK. For INSERT, WITH CHECK is the only gate.',
          },
          {
            kind: 'p',
            text: "Audit rule: every INSERT and UPDATE policy needs an explicit `WITH CHECK`. If the write path cannot be described as a predicate over the new row, the policy is incomplete.",
          },
        ],
      },
      {
        id: 'mistake-4',
        title: '4. TRUNCATE reachable by application roles',
        blocks: [
          {
            kind: 'p',
            text: "RLS does not protect `TRUNCATE`. Not partially. At all. If an application role can truncate a table, it can empty another tenant's rows regardless of every policy on that table.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `grant select, update, truncate
  on rls_doctor_demo.profiles to authenticated;

-- Every policy on profiles is irrelevant for TRUNCATE.
truncate rls_doctor_demo.profiles;  -- wipes every tenant`,
            caption: 'TRUNCATE is a DDL-shaped command with no row-level gate.',
          },
          {
            kind: 'p',
            text: "The catalog finding is High: `reachable-truncate`. Application roles should never hold it. Reserve it for a maintenance role that is not reachable from the app connection string.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `revoke truncate on rls_doctor_demo.profiles from authenticated;
grant truncate on rls_doctor_demo.profiles to maintenance_role;

-- Tighten current grants and the defaults that create future ones.
revoke all on all tables in schema rls_doctor_demo from authenticated;
alter default privileges in schema rls_doctor_demo
  revoke all on tables from authenticated;`,
            caption: 'The all tables in schema form is the one that works. revoke all on tables in schema is not valid Postgres.',
          },
        ],
      },
      {
        id: 'mistake-5',
        title: '5. FORCE RLS is off, so the owner bypasses every policy',
        blocks: [
          {
            kind: 'p',
            text: "By default, the table owner is exempt from RLS. If your application connects as the owner, the role that ran the migrations, every policy you wrote is decorative.",
          },
          {
            kind: 'p',
            text: "This is silent. Tests pass because the test connection is the owner. Production leaks because the production connection is also the owner.",
          },
          {
            kind: 'code',
            lang: "sql",
            code: `alter table rls_doctor_demo.profiles force row level security;`,
            caption: 'Enable FORCE RLS after confirming owner-side maintenance workflows still have an access path.',
          },
          {
            kind: 'p',
            text: "The finding is Info: `force-rls-disabled`. That is not a typo. It matters, but it is not a leak on its own. If an app role can reach a SUPERUSER or BYPASSRLS role, that is a separate High finding: `rls-bypass-role`.",
          },
          {
            kind: 'p',
            text: "Pair FORCE RLS with a separate application role. The app connects as `authenticated`, not as the migration owner. FORCE RLS is then the second lock, not the first.",
          },
        ],
      },
      {
        id: 'where-it-fits',
        title: 'Where this fits',
        blocks: [
          {
            kind: 'p',
            text: "Postgres documents RLS semantics; Supabase's guides show policy patterns. Most reviews stop at one of three layers: the SQL text, the catalog, or an application test.",
          },
          {
            kind: 'code',
            lang: 'text',
            code: `layer                     question it answers
SQL lint                  does the migration text look risky?
catalog audit (this tool) which roles can reach which rows, given grants and policies?
application test          does this endpoint leak for this fixture?
probe (this tool)         can this role or subject read another tenant's rows now?`,
            caption: 'The layers answer different questions. None of them is a compliance certificate.',
          },
          {
            kind: 'p',
            text: "The catalog audit and the probe are complementary. The catalog sees every table and role; the probe sees actual rows, but only for the fixtures you seed. Neither replaces an application test.",
          },
        ],
      },
      {
        id: 'prove',
        title: 'Prove it, do not just read the policies',
        blocks: [
          {
            kind: 'p',
            text: "The fastest way to see this is the demo. It starts a disposable Postgres, applies an unsafe schema, seeds two users, runs `check` and `probe`, and proves the leak. No credentials, no cleanup.",
          },
          {
            kind: 'code',
            lang: "bash",
            code: `npx rls-doctor demo`,
            caption: 'When Docker is unavailable, the demo falls back to a recorded run.',
          },
          {
            kind: 'code',
            lang: "text",
            code: `Summary: 3 tables, 3 policies, highest risk CRITICAL
Findings: critical 1, high 4, medium 1, low 2, info 1
RLS Score: 29/100

- [high] probe-cross-owner-read rls_doctor_demo.orders:
  Role authenticated reads rows across 2 distinct owner_id values`,
            caption: 'The demo removes the container. Nothing is left behind.',
          },
          {
            kind: 'p',
            text: "For a real database, `probe` can impersonate actual Supabase users. Pass `--subjects` to prove one user can read another user's rows:",
          },
          {
            kind: 'code',
            lang: "bash",
            code: `npx rls-doctor probe --schema public \
  --app-roles authenticated \
  --subjects 00000000-0000-0000-0000-000000000001 \
             00000000-0000-0000-0000-000000000002 \
  --owner-columns owner_id`,
            caption: 'The probe sets request.jwt.claims per subject, inside a read-only transaction.',
          },
          {
            kind: 'p',
            text: "Without `--subjects`, the probe proves that a role sees multiple owners. With `--subjects`, it proves that a specific user sees another user's rows. The second is the stronger claim.",
          },
          {
            kind: 'code',
            lang: "text",
            code: `authenticated@000...001  rows  1 foreign row(s), 1 own row(s)
authenticated@000...002  rows  1 foreign row(s), 1 own row(s)
- [high] probe-cross-subject-read rls_doctor_demo.orders:
  Role authenticated reads rows belonging to other users`,
            caption: 'Probe always rolls back and is safe against a read replica.',
          },
        ],
      },
      {
        id: 'ci',
        title: 'Put it in CI',
        blocks: [
          {
            kind: 'p',
            text: "The whole point of these mistakes is that they survive code review. A repeatable check is the durable fix. You can run the catalog audit without a database at all:",
          },
          {
            kind: 'code',
            lang: "bash",
            code: `# No database, no credentials: audit the migration itself.
npx rls-doctor@0.5.8 check \
  --schema-file supabase/migrations/0001_init.sql \
  --fail-on medium

# Live database: adopt without failing on day one.
npx rls-doctor check --schema public --baseline rls-baseline.json --update-baseline
npx rls-doctor check --schema public --baseline rls-baseline.json --fail-on medium

# Before release: prove access with seeded users.
npx rls-doctor probe --schema public --app-roles authenticated \
  --subjects <uuid-a> <uuid-b> --owner-columns owner_id`,
            caption: 'Pin the version in CI. npx without a version can change the rules under you.',
          },
          {
            kind: 'p',
            text: "Why `medium`? Missing `WITH CHECK` is Medium. `FORCE RLS` off is Info; if you want that to fail too, use `--fail-on info` or a separate check. The score penalties are critical 25, high 10, medium 4, low 1.",
          },
          {
            kind: 'p',
            text: "The GitHub Action uploads SARIF to the Security tab. JSON reports include stable fingerprints and a baseline diff, so a team can turn the check on without a hundred failures on day one.",
          },
        ],
      },
      {
        id: 'reproduce',
        title: 'Reproduce this',
        blocks: [
          {
            kind: 'p',
            text: 'The demo and the 60-repo study are from RLS Doctor commit `c942d25` (v0.5.8). Clone it and run the same demo:',
          },
          {
            kind: 'code',
            lang: 'bash',
            code: `git clone https://github.com/subhajitlucky/rls-doctor
cd rls-doctor
git checkout c942d25
npm ci
npm run build
node dist/cli.js demo`,
            caption: 'Docker is required for the live demo. Without it, the recorded run is printed.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `Summary: 3 tables, 3 policies, highest risk CRITICAL
Findings: critical 1, high 4, medium 1, low 2, info 1
RLS Score: 29/100
- [high] probe-cross-owner-read rls_doctor_demo.orders:
  Role authenticated reads rows across 2 distinct owner_id values`,
            caption: 'Expected demo output. The container is removed afterward.',
          },
          {
            kind: 'p',
            text: 'For the study, run `node scripts/study-supabase-rls.mjs --limit 60 --pages 2 --out results.json` with a GitHub token. The script writes aggregate records, not repository names.',
          },
        ],
      },
      {
        id: 'limits',
        title: 'What a catalog audit cannot prove',
        blocks: [
          {
            kind: 'p',
            text: "The catalog is one layer. It is not the whole security model. These are the gaps that matter:",
          },
          {
            kind: 'code',
            lang: 'text',
            code: `question                                   answer
Did the study measure false positives?     no; static findings, not ground truth
Was the sample random?                     no; first 60 unique GitHub results
Can a catalog audit prove app authz?       no; it sees catalog state only
Can probe see custom session GUCs?         not unless reproduced; Medium finding
Does service_role bypass RLS?              yes, by design; keep it server-side`,
            caption: 'What the numbers do and do not mean.',
          },
          {
            kind: 'list',
            items: [
              "Application-level authorization. A policy can be correct and the API can still return another tenant's rows through a join the policy never touches.",
              "Views and SECURITY DEFINER functions. A view can run with the owner's permissions and bypass the base table's policies.",
              "Hosted Supabase settings. The Data API configuration is outside the catalog.",
              "Custom session settings. Probe sets `request.jwt.claims`; a policy that reads another GUC may return zero rows and hide a leak. The tool reports `probe-session-dependent-policy` as Medium.",
              "Empty fixtures. A probe that sees zero rows on empty tables proves nothing. Seed two owners before you trust a green result.",
              "Offline parser coverage. `--schema-file` turns unsupported statements into limitations, not findings. Read them.",
              "service_role bypasses RLS by design. The catalog audit cannot protect a leaked service key; keep it server-side.",
            ],
          },
          {
            kind: 'p',
            text: "Use both layers. Catalog analysis answers 'are the policies shaped safely?' Probe answers 'can this role read another tenant's rows right now?' Neither replaces the other.",
          },
        ],
      },
      {
        id: 'try',
        title: 'Try it',
        blocks: [
          {
            kind: 'p',
            text: "The point is not to trust the policy text. Prove who can read what.",
          },
          {
            kind: 'link',
            href: 'https://github.com/subhajitlucky/rls-doctor',
            label: 'RLS Doctor on GitHub',
            note: 'Source, the 60-repo study, the proof mode, and the CI examples.',
          },
          {
            kind: 'link',
            href: 'https://www.npmjs.com/package/rls-doctor',
            label: 'npm package',
            note: 'Install-free usage: npx rls-doctor demo.',
          },
          {
            kind: 'link',
            href: 'https://github.com/subhajitlucky/rls-doctor/blob/main/docs/blog/2026-10-09-open-source-rls-audit.md',
            label: 'The 60-repo study',
            note: 'Method, headline numbers, and the coverage limits, including what the sample cannot prove.',
          },
          {
            kind: 'callout',
            title: 'What to do with this',
            items: [
              'Run npx rls-doctor demo to see a proven leak in a disposable database.',
              'Add check --schema-file to CI with --fail-on medium; adopt a baseline for an existing database.',
              'Probe with --subjects before release and seed two owners so a green result means something.',
              'Keep service_role server-side; it bypasses RLS by design.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "what-breaks-if-i-change-this-file",
    title: "What breaks if I change this file?",
    summary:
      "Grep tells you where a name appears. It does not tell you what depends on this file. A bounded static source graph answers the question, names the path, and reports what it could not resolve.",
    date: "2026-09-23",
    readingMinutes: 8,
    tags: ['static analysis', 'developer tools', 'compilers', 'CI'],
    sections: [
      {
        id: 'question',
        title: 'The question',
        blocks: [
          {
            kind: 'p',
            text: 'You are about to change a function signature. Before you do, you want to know what breaks.',
          },
          {
            kind: 'p',
            text: 'The instinct is to grep for the function name. That gives you occurrences, not dependencies. It misses re-exports, aliased imports, dynamic imports, and every consumer that imports the module rather than the symbol.',
          },
          {
            kind: 'p',
            text: 'The useful answer is a source graph: a bounded model of "this file references that file," good enough to scope a change and honest about what it cannot resolve.',
          },
          {
            kind: 'p',
            text: 'A changed file is not a bug. The graph reports the path; it does not prove the dependant is broken.',
          },
          {
            kind: 'callout',
            title: 'What this is, and what it is not',
            items: [
              'This is a bounded static source graph across JS/TS, Python, Go, Java, and Rust.',
              'It is not a runtime dependency graph, a type-checker, or a test suite.',
              'It does not prove that a dependant is broken. It proves that a static path exists.',
            ],
          },
          {
            kind: 'image',
            src: '/codebase-doctor/blast-radius.svg',
            alt: 'Diagram: a changed src/db/schema.ts reaches src/repositories/user.ts, src/api/users/[id]/route.ts, src/app/dashboard/page.tsx, and tests/integration/user.test.ts through resolved imports. A cross-package edge from packages/billing/src/charge.ts and a dynamic boundary in src/plugins/loader.ts are also shown.',
            caption: 'One changed root, five dependants. The graph names the path; it does not prove a bug.',
          },
        ],
      },
      {
        id: 'grep',
        title: 'Why grep lies',
        blocks: [
          {
            kind: 'p',
            text: 'Consider a small TypeScript module with a barrel file:',
          },
          {
            kind: 'code',
            lang: 'typescript',
            code: `// src/payments/index.ts
export { charge } from './charge.js';
export type { ChargeResult } from './types.js';

// src/api/checkout.ts
import { charge } from '../payments/index.js';`,
            caption: 'checkout.ts never names charge.ts. It names the barrel.',
          },
          {
            kind: 'p',
            text: 'A grep for `charge` finds both files and every unrelated use of the word. It does not tell you that changing `charge.ts` breaks `checkout.ts` through the barrel. A source graph does, because it records edges between resolved files, not between strings.',
          },
          {
            kind: 'p',
            text: "Dynamic imports make it worse. `import('./plugins/${name}.js')` is not a single edge; it is a pattern that may resolve to many files or none. The honest response is to record a dynamic boundary and say so, not to guess.",
          },
        ],
      },
      {
        id: 'graph',
        title: 'The graph',
        blocks: [
          {
            kind: 'p',
            text: 'Building the graph is four bounded steps.',
          },
          {
            kind: 'h3',
            text: '1. Inventory',
          },
          {
            kind: 'p',
            text: 'Walk the repository under the ignore rules: .gitignore, .npmignore, default noise. Produce a file list with paths and kinds. Nothing is analyzed yet. This step answers "what exists," not "what it means."',
          },
          {
            kind: 'h3',
            text: '2. Workspaces and project boundaries',
          },
          {
            kind: 'p',
            text: 'A monorepo is not one project. package.json files, pnpm-workspace.yaml, go.work, Cargo.toml, and pyproject.toml mark ownership boundaries. Imports that cross a boundary are still edges, but they are labeled. A change that fans out across five packages is a different risk from one that stays inside a single package.',
          },
          {
            kind: 'h3',
            text: '3. Resolution',
          },
          {
            kind: 'p',
            text: 'For each source file, extract its references and resolve each one to a concrete file, or record why it could not be resolved. This is the step that differs per language. It is also the step where most tools silently give up.',
          },
          {
            kind: 'h3',
            text: '4. Impact',
          },
          {
            kind: 'p',
            text: 'Given a changed set, walk the graph to its reverse-reachable set. That set is the blast radius. Report it with the edges that got you there, so a human can check the walk. The report preserves the full impacted-file count while serializing only bounded impact records.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `Changed: src/payments/charge.ts
Blast radius (3 files, 2 boundaries):
  src/payments/index.ts          via  export { charge } from './charge.js'
  src/api/checkout.ts            via  import { charge } from '../payments/index.js'
  packages/billing/src/charge.ts via  cross-package: @app/payments
Unresolved: 1 dynamic boundary in src/plugins/loader.ts`,
            caption: 'A useful impact report names the path, not just the file count.',
          },
          {
            kind: 'p',
            text: 'The disposable demo prints the same shape:',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `src/config.ts → src/db.ts
src/config.ts → src/db.ts → src/jobs.ts
src/api/route.ts → src/server.ts`,
            caption: 'Codebase Doctor demo. The fixture is removed afterward.',
          },
          {
            kind: 'p',
            text: 'The path proves only the static edge chain. It does not prove the dependant is broken. That distinction is the whole product.',
          },
        ],
      },
      {
        id: 'guess',
        title: 'What it refuses to guess',
        blocks: [
          {
            kind: 'p',
            text: 'A graph that guesses is worse than a graph that says "unknown." The graph module is finding-free by design. A separate source-integrity doctor reports one rule, `source/import-target-missing`, and only for four proof classes:',
          },
          {
            kind: 'list',
            items: [
              'An explicit relative target with a supported source extension.',
              'A single deterministic alias whose configured target explicitly names a supported source file.',
              'A unique workspace package whose explicit entry names a supported source file.',
              'An internal Go package under a module path without a replace directive.',
            ],
          },
          {
            kind: 'p',
            text: 'Extensionless, JSON, custom-loader, conditional, ambiguous, external, and dynamic references are not findings. Cycles are valid topology. It does not check named exports or validate that a referenced export name exists.',
          },
          {
            kind: 'p',
            text: 'Raw import specifiers and source text are withheld; findings expose normalized paths, import kind, proof class, and a safe location. At most 1,000 findings per audit, with partial coverage whenever that ceiling or any graph limitation applies.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `[high] source/import-target-missing src/api/route.ts:2
  proof: explicit relative target
  target: src/server.ts — not present in the inventory`,
            caption: 'A proof class, a normalized path, and a safe location. No guessed import specifier.',
          },
          {
            kind: 'p',
            text: 'That is the difference between a scanner and a reviewer: a scanner can report a clean result on a file it never parsed. This one cannot.',
          },
        ],
      },
      {
        id: 'receipts',
        title: 'The receipts',
        blocks: [
          {
            kind: 'p',
            text: 'The graph is only useful if it is measured. The repository ships three independent checks:',
          },
          {
            kind: 'list',
            items: [
              'Benchmark: 17 seeded single-defect fixtures, 16/16 expected rule matches (100% recall), zero medium+ false positives, 2/2 review verdicts, 1/1 suppression honesty.',
              'Red team: 18 adversarial cases, 11/11 mutants caught, 7/7 controls clean.',
              'Field study: 100 agent-configured public repositories, 23% with at least one high-severity finding, 10% with a broken import target.',
            ],
          },
          {
            kind: 'code',
            lang: 'text',
            code: `check                         result
cases passed                  17/17
expected rule matches         16/16 (100%)
medium+ false positives       0
review verdicts               2/2
suppression honesty           1/1
red-team mutants caught       11/11
red-team controls clean       7/7`,
            caption: 'Measured, not asserted. The harness is deterministic: no network, no model, no database.',
          },
          {
            kind: 'image',
            src: '/codebase-doctor/field-study.svg',
            alt: 'Bar chart of 100 agent-configured repositories: 23% had at least one high-severity finding, 11% risky agent configuration, 10% a broken import target, 4% private key material, 1% a committed provider token.',
            caption: 'The field study is a convenience sample, not a census. Shallow clones mean the history number is a floor.',
          },
          {
            kind: 'p',
            text: 'The differential scoreboard is the honesty check: two independently written offline analyzers over the same SQL corpus, 10 findings matched, 0 severity mismatches, 1 documented coverage difference, safe schema clean under both.',
          },
        ],
      },
      {
        id: 'limits',
        title: 'What the graph cannot see',
        blocks: [
          {
            kind: 'p',
            text: 'The value of the tool is bounded by its honesty about limits.',
          },
          {
            kind: 'list',
            items: [
              'Reflection and runtime wiring. A dependency-injection container that resolves a type by name is not a static edge. The graph says dynamic boundary and stops.',
              'Generated sources. Code emitted at build time is not in the inventory unless you point the tool at the output directory.',
              'Cross-language edges. A TypeScript file that shells out to a Python script is a process boundary, not a source edge.',
              'Semantic impact. Knowing that A imports B does not mean a change to B is safe for A. A signature-preserving refactor and a behavior change look identical to the graph.',
              'Partial coverage. A bounded scan says so with exact total, emitted, and omitted counts. A clean run means the scope was checked, not that the code is bug-free.',
            ],
          },
          {
            kind: 'p',
            text: 'Any report that claims a clean blast radius without listing unresolved boundaries is reporting confidence it has not earned.',
          },
        ],
      },
      {
        id: 'fits',
        title: 'Where this fits',
        blocks: [
          {
            kind: 'p',
            text: 'This is not a type-checker, a linter, or a runtime dependency graph. TypeScript catches type errors; ESLint catches style and correctness patterns; tests catch behavior. The source graph answers a narrower question: which files can reach this one through static imports?',
          },
          {
            kind: 'p',
            text: 'That question is cheap to answer before a merge and expensive to answer after an incident. It is also the question a coding agent should ask before editing a file it did not write.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `tool              question
grep              where does this string appear?
linter            does this pattern match a rule?
type-checker      does this program type-check?
test suite        does this behavior hold for these fixtures?
source graph      which files can reach this change?`,
            caption: 'Different layers, different answers. None of them is a proof of correctness.',
          },
        ],
      },
      {
        id: 'reproduce',
        title: 'Reproduce this',
        blocks: [
          {
            kind: 'p',
            text: 'The reproduce block uses commit `d56638a`; the benchmark and field-study snapshots are dated 2026-10-09.',
          },
          {
            kind: 'code',
            lang: 'bash',
            code: `git clone https://github.com/subhajitlucky/codebase-doctor
cd codebase-doctor
git checkout d56638a
npm ci
npm run build
node dist/cli.js demo
node dist/cli.js audit . --changed --format brief`,
            caption: 'The demo builds a disposable fixture, proves a broken import and a secret, prints the blast radius, and exits 1.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `codebase-doctor brief
scope=changed findings=3 shown=3 coverage=incomplete score=70
[high] source/import-target-missing src/api/route.ts:2 — ...
[high] security/secrets/provider-token src/config.ts:6 — ...
[info] repository/no-visible-tests (repository) — ...
coverage-limitations: repository: partial, backend: not-selected, database: skipped, performance: partial`,
            caption: 'The coverage line is part of the result, not an afterthought.',
          },
          {
            kind: 'p',
            text: 'The benchmark harness is `node scripts/benchmark.mjs`; the red-team corpus is `node scripts/red-team.mjs`; the field study is `node scripts/study-agent-repos.mjs` with a GitHub token.',
          },
          {
            kind: 'link',
            href: 'https://github.com/subhajitlucky/codebase-doctor',
            label: 'Codebase Doctor on GitHub',
            note: 'Source, architecture, benchmark harness, red-team corpus, and the field-study script.',
          },
          {
            kind: 'link',
            href: 'https://www.npmjs.com/package/codebase-doctor',
            label: 'npm package',
            note: 'Install-free usage: npx -y codebase-doctor audit . --changed --format brief.',
          },
        ],
      },
      {
        id: 'so-what',
        title: 'What to do with this',
        blocks: [
          {
            kind: 'callout',
            title: 'What to do with this',
            items: [
              'Run audit . --changed --base main before merging a change.',
              'Read the coverage-limitations line before calling the result clean.',
              'Use verify . --baseline before.json after a fix; a fingerprint that disappears is evidence, not a feeling.',
              'Do not ask the graph to prove semantic correctness. It proves reachability.',
            ],
          },
          {
            kind: 'link',
            href: 'https://github.com/subhajitlucky/codebase-doctor/blob/main/docs/architecture.md',
            label: 'The architecture contract',
            note: 'The full source-graph, coverage, precision, and bounded-report contract.',
          },
        ],
      },
    ],
  },
  {
    slug: 'kalia-build-log',
    title: 'Training a 58M language model from scratch on free GPUs',
    summary:
      'Zero dollars and a full public record: a 58M-parameter model trained from random initialization on free Kaggle GPUs. v0.1.2 stopped at 73% of its schedule; v0.2.0 finished and improved held-out loss by 0.2285 nats. At 2,000 samples only LAMBADA is outside its stability rule; the earlier 500-sample ARC-Easy regression did not replicate. The most useful result was discovering that the project’s best architecture win was noise.',
    date: '2026-09-23',
    readingMinutes: 10,
    tags: ['language models', 'training', 'Muon', 'Kaggle', 'from scratch'],
    sections: [
      {
        id: 'result',
        title: '58M parameters, zero dollars',
        blocks: [
          {
            kind: 'p',
            text: 'KALIA is a 58M-parameter language model trained from random initialization on free Kaggle GPUs. No pretrained weights. No fine-tuning. No budget.',
          },
          {
            kind: 'p',
            text: 'The first release, v0.1.2, stopped at 73% of its schedule and scored 3.0533 held-out loss / 0.9992 bits-per-byte. The second, v0.2.0, finished the schedule and reached 2.8248 / 0.9244, 0.2285 nats better. At 2,000 samples only LAMBADA is outside the stability rule; the 500-sample ARC-Easy regression did not replicate. It remains an experiment, not the new default.',
          },
          {
            kind: 'p',
            text: "The most useful result was not a better model. It was discovering that the project's best architecture result was noise.",
          },
          {
            kind: 'code',
            lang: 'text',
            code: `version   tokens   held-out loss   bits/byte   status
v0.1.2    1.82B    3.0533          0.9992      released
v0.2.0    2.50B    2.8248          0.9244      experiment`,
            caption: 'Same held-out set, same 100-batch protocol. The old 2.4366 is a different yardstick and is never compared (D43).',
          },
          {
            kind: 'callout',
            title: 'What this is, and what it is not',
            items: [
              'This is a from-scratch 58M model, one corpus, and a public record of every decision and failure.',
              'It is not an assistant. It has no instruction tuning, weak factual recall, and entity drift over long outputs.',
              'It is not a frontier model. OPT-125M is twice the size and trained on roughly 100x more tokens; comparisons are context, not a head-to-head.',
            ],
          },
        ],
      },
      {
        id: 'where',
        title: 'Where this fits',
        blocks: [
          {
            kind: 'p',
            text: 'The architecture is deliberately standard: pre-norm decoder-only, RMSNorm, SwiGLU, RoPE, QK-Norm, logit soft-cap (tau=30), weight tying, no biases. The optimizer is Muon on hidden matrices and AdamW for embeddings, head, and norms.',
          },
          {
            kind: 'p',
            text: 'The contribution is not a new block. It is the record: pre-registered ablations, replication at fresh seeds, and published failures. That is what makes the numbers checkable.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `model        params   tokens   PIQA   ARC-Easy
KALIA v0.1.2 58M      1.82B    59.6   46.0
KALIA v0.2.0 58M      2.50B    61.4   46.4
OPT-125M     125M     ~180B    63.0   43.5`,
            caption: 'Scale context, not a head-to-head. Harness versions differ; KALIA uses lm-eval 0.4.9, 0-shot, 2,000 samples.',
          },
        ],
      },
      {
        id: 'constraint',
        title: 'The constraint',
        blocks: [
          {
            kind: 'p',
            text: 'The free tier gives 2x T4 (32GB total), about 30 GPU-hours a week, and 8.5-hour sessions. The trainer had to resume by design: checkpoints every 30 minutes to the HuggingFace Hub, an atomic swap, and a barrier so two workers never write the same file.',
          },
          {
            kind: 'p',
            text: "Two rules shaped the run. From scratch: every weight is learned by this project's own training. Pre-registration: every experiment gets a SHA-256 hash before it runs, every decision is numbered, every incident is published.",
          },
          {
            kind: 'p',
            text: 'The first release used about 20 GPU-hours. The total cash cost was zero dollars.',
          },
          {
            kind: 'p',
            text: 'The corpus is 2.4B tokens: FineWeb-Edu 60%, TinyStories 20%, Cosmopedia 15%, permissively licensed Python 5%. The licence audit and rebuild are their own story, below.',
          },
        ],
      },
      {
        id: 'measure',
        title: 'Measure before you spend',
        blocks: [
          {
            kind: 'p',
            text: 'When quota is the scarce resource, the worst thing you can do is discover a bad recipe with it. Every change is screened at 30M params on 50M tokens, about 30 minutes per arm, same seed and token budget.',
          },
          {
            kind: 'list',
            items: [
              'AdamW: 3.8041 step-700 validation loss.',
              'Muon: 3.5937, a 0.21 improvement.',
              'Muon + QK-Norm + logit soft-capping: 3.5103, a 0.29 improvement.',
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
            text: "At full scale the recipe reached the AdamW baseline's final loss with about 23% fewer tokens: 3.2214 at step 1,730 versus 3.2702 at step 2,250.",
          },
          {
            kind: 'p',
            text: 'Muon+ beat plain Muon on 7 of 7 checkpoints by 0.015 nats. The promotion bar, fixed before the run, was 0.02. It did not ship. A threshold bent for a favored result is not a threshold.',
          },
        ],
      },
      {
        id: 'run',
        title: 'The run: a plateau and a quota wall',
        blocks: [
          {
            kind: 'p',
            text: 'v0.1.2 trained across three sessions. For a thousand steps validation loss refused to move while training loss kept falling. A single point cannot tell a noisy eval from a real plateau.',
          },
          {
            kind: 'p',
            text: 'The deterministic evaluation settled it: 100 fixed-seed batches over 819,200 tokens returned 3.0533 loss and 0.9992 bits-per-byte.',
          },
          {
            kind: 'p',
            text: 'The weekly quota ran out at step 3,478 of 4,770, 73% of the schedule. The pre-registered rule said stop on a plateau; the quota made the stop physical. The plateau and the stop are published, not smoothed over.',
          },
          {
            kind: 'p',
            text: 'Zero-shot at the 500-sample release: PIQA 61.4, ARC-Easy 45.8, HellaSwag 36.8, WinoGrande 50.2, LAMBADA 23.0. The 2,000-sample re-measurement gives PIQA 59.6, ARC-Easy 46.0, HellaSwag 35.6, WinoGrande 50.3, LAMBADA 25.2. The custom Abhimanyu gap, reversed-text loss minus forward loss, was 6.06 nats. The model can enter fluent text but cannot exit it.',
          },
        ],
      },
      {
        id: 'failed',
        title: 'The experiment that failed',
        blocks: [
          {
            kind: 'p',
            text: 'The Abhimanyu gap suggested a fix: chunk-preserving reversal training. Reverse the order of short chunks, keep the tokens inside each chunk readable.',
          },
          {
            kind: 'p',
            text: 'The prediction, threshold, and analysis plan were hashed before the run. Both seeds missed both pre-registered bars, and the gap got worse by 0.14 nats. The transform was rejected.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `arm          gap       forward val
control      5.1107    3.8816
reversal     5.2465    3.9641`,
            caption: 'Both metrics moved in the wrong direction. The negative result is published with the same prominence as a win.',
          },
          {
            kind: 'p',
            text: 'Token-level reversal remains a separate hypothesis. It is not a quiet retry of the same experiment.',
          },
        ],
      },
      {
        id: 'best',
        title: "The best result that wasn't",
        blocks: [
          {
            kind: 'p',
            text: "The architecture search produced a candidate that looked like the project's best result: X20, a static per-channel modulation, beat control by 0.1358 nats, 3.1x any previous architecture effect.",
          },
          {
            kind: 'p',
            text: 'It was one seed. The project had already learned to distrust a 0.0436 result on those grounds, so X20 got a pre-registered replication at two fresh seeds.',
          },
          {
            kind: 'p',
            text: 'It inverted: +0.0516, worse than control, at both seeds. The replication also measured the control’s own spread: two sessions at seed 1337 agreed to 0.0018, but fresh seeds sat about 0.11 nats higher. That spread is larger than every earlier “win” (X18’s -0.0436, X19’s -0.0018).',
          },
          {
            kind: 'image',
            src: '/kalia/replication-collapse.svg',
            alt: 'Bar chart showing the X20 static gate below the control at seed 1337 and above the control at two fresh seeds, reversing the apparent gain.',
            caption: 'The project’s best architecture result, replicated at two fresh seeds. The effect inverted.',
          },
          {
            kind: 'p',
            text: 'At 58M the control spread is 0.2892 nats, 2.5x the 30M spread. That is the measurement floor. Every single-seed architecture delta in the project was read against a baseline nobody had measured. The architecture line closed; no arm may run from one seed again.',
          },
          {
            kind: 'image',
            src: '/kalia/seed-spread.svg',
            alt: 'Chart of the 58M seed spread: the same recipe across three seeds and two sessions, with each seed re-landing within 0.004 nats of itself and the seeds sitting 0.29 nats apart.',
            caption: 'The 58M seed spread. Same recipe, three seeds, two sessions: each seed re-lands within 0.004 nats of itself; the seeds sit 0.29 nats apart.',
          },
          {
            kind: 'p',
            text: 'The lesson is uncomfortable and useful: a big effect from one seed is less established, not more. The budget moved to the continual-update corpus and the replay sweep.',
          },
        ],
      },
      {
        id: 'v020',
        title: 'v0.2.0: the loss improved, the benchmarks disagreed',
        blocks: [
          {
            kind: 'p',
            text: 'v0.2.0 used a compliance-rebuilt 2.5B-token corpus and the full 4,770-step schedule. Held-out loss: 2.8248, 0.2285 nats better, 4.6x the 0.05 bar. Bits-per-byte: 0.9244.',
          },
          {
            kind: 'image',
            src: '/kalia/val-loss.svg',
            alt: 'Line chart of validation loss for v0.1.2 and v0.2.0 on the same rebuilt held-out set: v0.1.2 scores 3.0533 and v0.2.0 scores 2.8248, 0.2285 nats better.',
            caption: 'Both versions on the same rebuilt yardstick. v0.1.2 was re-measured on the v2b set; the old 2.4366 is never compared.',
          },
          {
            kind: 'p',
            text: 'At 2,000 samples the comparison is smaller: PIQA 61.4 (+1.74), HellaSwag 35.6 (0.00), WinoGrande 50.8 (+0.47), LAMBADA 23.9 (-1.25), ARC-Easy 46.4 (+0.45). No movement reaches 2 sigma. Only LAMBADA is outside the 1.0-point rule; the 500-sample ARC-Easy -3.8 did not replicate.',
          },
          {
            kind: 'image',
            src: '/kalia/bench-compare.svg',
            alt: 'Grouped bar chart comparing v0.1.2 and v0.2.0 on five zero-shot benchmarks, with a grey band of plus or minus one standard error; no movement clears two standard errors.',
            caption: 'Zero-shot accuracy, both versions, with the measurement noise drawn in. The grey band is about 2 points.',
          },
          {
            kind: 'p',
            text: 'The stability rule allowed no task to regress by more than 1 point. v0.2.0 fails on two, so it is released as an experiment, not promoted over v0.1.2. The thresholds were not moved after seeing the result.',
          },
          {
            kind: 'p',
            text: 'Loss improved; accuracy did not follow. That points at the data, not capacity or the method.',
          },
          {
            kind: 'p',
            text: 'The corpus explains LAMBADA: only 17.7% of tokens are in documents long enough to fill the 1,024-token context. TinyStories is a fifth of the mixture, but only 0.03% of its documents are long enough. The model was trained mostly on short documents and tested on long-range cloze.',
          },
        ],
      },
      {
        id: 'record',
        title: 'What failed, and what it taught',
        blocks: [
          {
            kind: 'p',
            text: 'The model results are only half the record. The engineering failures are the other half.',
          },
          {
            kind: 'list',
            items: [
              "Licence audit: 41.7% of the code corpus was non-permissive (39.5% GPL-family). The filter existed and was tested; it landed 40 minutes after the corpus that needed it. v0.1.2's code slice (~50M tokens, ~2% of training) was built without it. The model card discloses it; v0.2.0 is licence-clean by construction.",
              'Dataset publisher: the Kaggle publisher defaulted to `--dir-mode skip`, so the code dataset shipped with no configs, no eval folder, and no JSON. Every upload reported success. Assert the interface, then trust it.',
              'Held-out set: a corpus rebuild silently replaced the measuring stick, making a healthy run look 0.74 nats worse. Re-measure both sides before believing a cross-rebuild comparison (D43).',
              'Accuracy thresholds: two pre-registered bars (0.5 pp, 1.0 pp) sat below the ~2 pp standard error. One passed on noise. Future bars must sit above the measured noise floor (D45).',
              'Citations: one load-bearing continual-learning citation was about the wrong paper. It was retracted in place; the decision survived on weaker grounds (D49).',
            ],
          },
          {
            kind: 'p',
            text: 'The record is the point. A run produces a loss curve; the decisions, incidents, and retractions are what make the curve checkable.',
          },
        ],
      },
      {
        id: 'reproduce',
        title: 'Reproduce this',
        blocks: [
          {
            kind: 'p',
            text: 'The numbers above are from commit `5301db6`. The full test suite runs on CPU; heavy training belongs on Kaggle.',
          },
          {
            kind: 'code',
            lang: 'bash',
            code: `git clone https://github.com/subhajitlucky/kalia
cd kalia
git checkout 5301db6
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
python -m pytest -q
python tools/check_notebooks.py`,
            caption: 'The suite checks notebooks and the public claims before any GPU quota is spent.',
          },
          {
            kind: 'p',
            text: 'Weights, model card, configs, and the full resumable checkpoint: `kalia-lm/kalia-v012` and `kalia-lm/kalia-v020` on HuggingFace (Apache-2.0). Source, journal, decisions, incidents, and the pre-registration ledger: GitHub (MIT). Training data is not redistributed; sources are attributed.',
          },
          {
            kind: 'p',
            text: 'The old 2.4366 / 0.8184 BPB is v0.1.2 on the original held-out set. It is not comparable to 3.0533 / 0.9992 on the rebuilt set, and the two are never tabulated together.',
          },
          {
            kind: 'link',
            href: '/kalia',
            label: 'KALIA model page',
            note: 'The full paper-style record: replayable training console, benchmarks, decisions, incidents, and the recipe.',
          },
          {
            kind: 'link',
            href: 'https://github.com/subhajitlucky/kalia',
            label: 'KALIA on GitHub',
            note: 'Source, tests, notebooks, journal, decisions, incidents, and the pre-registration ledger.',
          },
        ],
      },
      {
        id: 'next',
        title: 'What is next',
        blocks: [
          {
            kind: 'p',
            text: 'v0.3.0 is a continual update of v0.2.0, not a new base: new corpus, learning rate re-warmed and re-decayed, old data replayed. The replay ratio has to be measured at 58M because published replay results stop at 0.6B.',
          },
          {
            kind: 'p',
            text: 'The programme also moved to inference-time levers: an entity-consistency holdout showed the recorded +0.061 was circular (the honest held-out half is +0.011 [-0.007, +0.032], while coverage survives), a best-of-N/retrieval probe, and four Vedic recitation orders as replay schedules. The 58M measurement floor stopped small architecture claims.',
          },
          {
            kind: 'callout',
            title: 'What to do with this',
            items: [
              'Pre-register the threshold before the run. A threshold bent for a favored result is not a threshold.',
              "Measure the baseline's own spread before reading any delta. At 30M the control moved 0.11 nats across seeds; at 58M, 0.2892.",
              'Publish the negative results. The failed reversal, the inverted gate, and the licence audit are more useful than another loss curve.',
              'Do not compare numbers across a corpus rebuild. Re-measure both sides on the same yardstick.',
            ],
          },
          {
            kind: 'link',
            href: 'https://github.com/subhajitlucky/kalia/blob/main/docs/preregistrations/LEDGER.md',
            label: 'The pre-registration ledger',
            note: 'Hashed predictions, registered amendments, and the rule that decided each experiment.',
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
    readingMinutes: 9,
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
            kind: 'image',
            src: '/sutra/tokens-per-message.svg',
            alt: 'Horizontal bar chart comparing tokens per message: JSON-RPC 72.5, readable SUTRA 22.3, SUTRA-C 7.5, and SUTRA-C meter 2.8.',
            caption: 'The same deal, four encodings. The compact form removes syntax; the meter form removes information both sides already know.',
          },
          {
            kind: 'p',
            text: 'The short version: count the format, remove the syntax, and let position carry meaning.',
          },
          {
            kind: 'callout',
            title: 'What this is, and what it is not',
            items: [
              'This is a measured engineering report: one 12-message corpus, one six-message deal, two model families, and a public codec.',
              'It is not a peer-reviewed benchmark or a claim that SUTRA-C is universally cheaper. The results are specific to these messages, this tokenizer, and these models.',
              'The failures are included: the semicolon, the meter read, the binary wire, and the low-effort runs.',
            ],
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
            kind: 'image',
            src: '/sutra/journey.svg',
            alt: 'Line chart of tokens per message by stage: readable SUTRA 27.5, 384-encoding sweep 6.7, 162-config sweep 6.25, after the sF trick 6.1, and meter mode 2.8 on a six-message deal.',
            caption: 'The first win was 4x. After that, the remaining gains were small until the template did the heavy lifting.',
          },
          {
            kind: 'p',
            text: 'The last drop came from a model, not from me. It wrote `sF` instead of `s F`, gluing the broadcast prefix into one token. I adopted it. 75 tokens became 73.',
          },
        ],
      },
      {
        id: 'related',
        title: 'Where this fits',
        blocks: [
          {
            kind: 'p',
            text: 'The closest deployed baseline is JSON-RPC/MCP. Lean JSON is cheaper than JSON-RPC but still pays for keys and punctuation. Protobuf, CBOR, and MessagePack are compact binary encodings, but they are not tokenizers: a model reading a binary payload still pays for the bytes, and short messages pay tag overhead.',
          },
          {
            kind: 'p',
            text: 'I did not benchmark Protobuf, CBOR, or MessagePack end to end. In this lab, binary wires lost to tuned text for short messages; that is a result for this corpus, not a universal law. The comparison here is against JSON-RPC and English, because those are the formats agents actually emit.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `format              kind          measured here?
JSON-RPC / MCP      text JSON     yes, 72.5 tok/msg
lean JSON           text JSON     yes, 42.8
readable SUTRA      text DSL      yes, 22.3
SUTRA-C             text wire     yes, 7.5
SUTRA-C meter       text wire     yes, 2.8
Protobuf / CBOR     binary        no`,
            caption: 'The missing row is the honest one. A binary comparison is a separate experiment.',
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
            kind: 'image',
            src: '/sutra/comprehension.svg',
            alt: 'Grouped bar chart of correctness: both models read and write compact SUTRA-C at 12/12; GPT-6 Luna reads meter mode 2/6 and writes 4/6; DeepSeek v4.1 Flash reads 6/6 and writes 5/6.',
            caption: 'Round 7: 12 compact messages and 6 meter messages per cell. The meter form is not equally readable across models.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `["bI buy a 50000 739676","sF available a seller@store 48000",
 "q availability a","o o 48000 a m","K o p 46000 a","a o",
 "R o !h","c pay 48000 seller@store ~739676", ...]`,
            caption: 'DeepSeek v4.1 Flash, compact emit: 12/12 correct. Raw output from the round-7 log.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `cell                  prompt   output   correct
GPT-6 Luna c1 parse      616      854     12/12
GPT-6 Luna c1 emit       932       95     12/12
GPT-6 Luna meter parse   414      497      2/6
GPT-6 Luna meter emit    617       24      4/6
DeepSeek c1 parse        616      444     12/12
DeepSeek c1 emit         932       95     12/12
DeepSeek meter parse     414      271      6/6
DeepSeek meter emit      617       24      5/6`,
            caption: 'Round 7 token accounting from the per-call log. Output tokens include the model formatting the answer.',
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
          {
            kind: 'code',
            lang: 'text',
            code: `failure                  observation                    what it means
missing semicolon        readable emit 0/12, 0/12       compact has no terminator
meter read too dense     GPT-6 Luna 2/6, DeepSeek 6/6   default to 7.5, not 2.8
low reasoning effort     parse 0.86 -> 0.71             do not audit with low effort
novel values             parse 5/6, emit 6/6            dictionary fallback works
binary wire              lost to tuned text             text wins for short messages`,
            caption: 'The failures are part of the result. Every run is logged.',
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
            kind: 'link',
            href: 'https://github.com/subhajitlucky/sutra',
            label: 'SUTRA on GitHub',
            note: 'Source, the frozen wire spec, the token-cost lab, and every logged experiment, winners and losers.',
          },
        ],
      },
      {
        id: 'reproduce',
        title: 'Reproduce this',
        blocks: [
          {
            kind: 'p',
            text: 'The numbers above are from SUTRA commit `2b8c168`. Clone it, run both demos, and compare the output:',
          },
          {
            kind: 'code',
            lang: 'bash',
            code: `git clone https://github.com/subhajitlucky/sutra
cd sutra
git checkout 2b8c168
python3 -m venv .venv && . .venv/bin/activate
pip install tiktoken
python examples/compact_deal.py
python examples/network_meter_demo.py`,
            caption: 'Both demos run on CPU. The meter demo uses real HTTP.',
          },
          {
            kind: 'code',
            lang: 'text',
            code: `readable SUTRA             134        22.33
SUTRA-C (compact)           45         7.50
SUTRA-C template/meter      17         2.83
JSON-RPC envelope          435        72.50`,
            caption: 'Expected compact-deal output. The meter demo prints a 3-step HTTP run.',
          },
          {
            kind: 'p',
            text: 'The token-cost lab is in `experiments/token-cost/`; the frozen format is `spec/SUTRA_C.md`. Every round, including the failures, is logged in the repository.',
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
            kind: 'callout',
            title: 'What to do with this',
            items: [
              'Measure the format, not just the model. The envelope is part of the bill.',
              'Use the 7.5-token compact form by default. Test the 2.8-token meter form on your model before shipping it.',
              'Keep the session stateful only when both sides can stay in sync; a surprise message needs a resync path.',
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
