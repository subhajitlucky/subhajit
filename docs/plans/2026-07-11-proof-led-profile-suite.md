# Proof-Led Profile Suite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the portfolio, GitHub profile/repository presentation, and resume around one evidence-backed identity for developer tools, AI systems, and full-stack engineering.

**Architecture:** Keep the existing Next.js App Router and static content modules as the portfolio source of truth. Add a human-readable evidence matrix and integrity tests to prevent drift, generate a one-page searchable PDF from a reproducible ReportLab source, and prepare the GitHub profile plus selected repository READMEs in local sibling clones before publishing.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, ReportLab, Poppler, GitHub Markdown

**Design doc:** `docs/plans/2026-07-11-proof-led-profile-suite-design.md`

---

## Working rules

- Preserve the existing uncommitted portfolio edits; never reset or checkout them away.
- Stage only files belonging to the current task when committing.
- Treat repository README edits as external-repository work; verify the clone and branch before editing.
- Do not invent adoption, performance, usage, release, or employer metrics.
- Use ASCII hyphens in generated resume content.
- Keep historical planning documents intact, but remove stale project names from runtime/public content.

### Task 1: Record evidence and baseline drift

**Files:**
- Create: `docs/evidence-matrix.md`
- Create: `docs/github-profile-checklist.md`
- Modify: `src/data/seo.test.ts`
- Modify: `src/app/sitemap.test.ts`

**Step 1: Write the evidence matrix**

Create a table with one row per selected project and columns for:

- Claim
- Evidence type
- Public URL
- Portfolio route
- Resume treatment
- Status
- Last verified (`2026-07-11`)

Use these evidence anchors:

- RLS Doctor README, GitHub Actions, npm page, Agent Skill, and integration instructions.
- SmritiFlow README, CLI commands, generated artifacts, tests, publish workflow, and Agent Skill.
- Tarka Sabha README, source tree, live demo, multi-provider support, and encrypted key handling.
- CSCosmos README, topic data, live microsite URLs, and deployment notes.
- CampusHelper README and source links for auth, uploads, search, claims, and data boundaries.
- IntentPay README for the planning/review/execution safety boundary; label it `Prototype`.

Do not use the GitHub profile’s repository count, follower count, star count, or contribution graph as portfolio proof because those values change.

**Step 2: Record GitHub-only settings**

Create `docs/github-profile-checklist.md` with unchecked items for:

- Profile bio set to the new one-line role.
- Website set to `https://subhajitpradhan.vercel.app`.
- Location set to `Konark, Odisha, India` if still accurate.
- Pinned repositories ordered: `rls-doctor`, `smritiflow`, `tarkaSabha`, `cscosmos`, `campushelper`, `intentpay`.
- Public profile README renders without analytics clutter or stale project names.

**Step 3: Add failing integrity assertions**

Add tests that fail if:

- `blogPosts` contains `quantumticket` in `relatedProjectSlugs`.
- `public/llms.txt` contains `QuantumTicket` or `/projects/quantumticket`.
- the sitemap contains a QuantumTicket route.
- the canonical resume path is not `/assets/Subhajit_Resume.pdf` after the resume task lands.

Use `readFileSync` only for small static content checks and keep assertions scoped to runtime/public files.

**Step 4: Run the focused tests**

Run: `npm test -- --run src/data/seo.test.ts src/app/sitemap.test.ts`

Expected: FAIL on the known stale QuantumTicket and old resume-path references.

**Step 5: Commit the evidence documents and red tests**

```bash
git add docs/evidence-matrix.md docs/github-profile-checklist.md src/data/seo.test.ts src/app/sitemap.test.ts
git commit -m "docs(profile): add evidence ledger and integrity checks"
```

### Task 2: Normalize portfolio content to verified project facts

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/data/site.ts`
- Modify: `src/data/blog.ts`
- Modify: `src/data/seo.test.ts`

**Step 1: Preserve and verify the selected set**

Keep the exact order:

```ts
['rls-doctor', 'smritiflow', 'tarka-sabha', 'cscosmos', 'campushelper', 'intentpay']
```

Keep `skillscan` in `toolFootnotes` only. Remove any remaining QuantumTicket object or link from runtime data.

**Step 2: Normalize status and descriptions**

Use honest labels:

- RLS Doctor: `Published CLI`
- SmritiFlow: `Published CLI`
- Tarka Sabha: `Live platform`
- CSCosmos: `Live platform`
- CampusHelper: `Live platform`
- IntentPay: `Prototype`

Rewrite broad claims such as “enterprise-grade” and “production-ready” into specific implementation facts. Keep architecture, security boundaries, tests, and tradeoffs. Remove claims that cannot be traced to a public source.

**Step 3: Align site copy**

Set the site role and summary to:

```text
Software Engineer - Developer Tools, AI Systems, Full Stack
```

Use one short proof-led summary across metadata and visible identity copy. Keep the canonical domain, GitHub, LinkedIn, email, and new resume path consistent.

**Step 4: Remove stale blog relationships**

Change the IntentPay article’s `relatedProjectSlugs` to `['intentpay']` and ensure every related slug exists in `projects`.

**Step 5: Run tests and typecheck**

Run: `npm test -- --run src/data/seo.test.ts && npm run typecheck`

Expected: PASS for the content model and no missing related project slug.

**Step 6: Commit**

```bash
git add src/data/projects.ts src/data/site.ts src/data/blog.ts src/data/seo.test.ts
git commit -m "feat(profile): align portfolio content with verified evidence"
```

### Task 3: Build the proof-led portfolio home

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/components/ButtonLink.tsx` only if link semantics need correction

**Step 1: Add the opening proof rail**

Keep the identity block short and add a ruled proof rail with direct actions:

- `RLS Doctor` - npm/source
- `SmritiFlow` - npm/source
- `GitHub` - profile
- `Resume` - PDF

Do not show hardcoded GitHub stars, follower counts, or repository counts.

**Step 2: Rebuild work rows around `problem -> system -> proof`**

Each featured row should show:

- project title and status/year;
- one-line problem or product thesis;
- one architecture/proof phrase from the project data;
- primary inspectable action (`Case study`, `Source`, `npm`, or `Demo`).

Render the four featured projects first, then CampusHelper and IntentPay as compact selected work. IntentPay must show `Prototype` in the first scan.

**Step 3: Keep the page hierarchy intentional**

Use this order:

1. Identity and proof rail
2. Featured systems
3. Also built
4. Agent tooling footnote
5. Current experience
6. Skills
7. Writing
8. Contact

Give each section one heading and one responsibility. Remove repeated marketing summaries and unused machine-readable visual text.

**Step 4: Apply the visual system**

In `globals.css`:

- use white, near-black, muted gray, and deep teal tokens;
- keep the header sticky, solid, and bordered;
- use ruled rows and cardless sections;
- keep touch targets at least 44px;
- add two restrained reveal states and a reduced-motion fallback;
- remove remaining glow, blur, dark-hero, and unused glass utilities.

**Step 5: Run the app checks**

Run: `npm run lint && npm run typecheck`

Expected: PASS with no lint warnings and no type errors.

**Step 6: Commit**

```bash
git add src/app/page.tsx src/app/globals.css src/components/SiteHeader.tsx src/components/SiteFooter.tsx src/components/ButtonLink.tsx
git commit -m "feat(portfolio): add proof-led engineering homepage"
```

### Task 4: Refine projects index and case studies

**Files:**
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/components/ProjectCard.tsx` only if still referenced
- Modify: `src/app/globals.css`

**Step 1: Make the project index evidence-first**

Use the same order as the home page. Replace any remaining generic card treatment with ruled rows that include status, thesis, primary proof, and source links. Keep the `skillscan` footnote visually quieter than case studies.

**Step 2: Add tier-aware case-study presentation**

Featured projects show:

- problem;
- users/context;
- workflow proof;
- architecture diagram;
- engineering decisions;
- tradeoffs/limitations;
- next improvements;
- metrics only when directly supported;
- stack and inspection links.

Secondary projects show a shorter problem, what shipped, stack, proof, and links. Keep the same semantic headings and make IntentPay’s prototype status prominent.

**Step 3: Remove stale route branches**

Ensure `generateStaticParams()` uses only the six selected projects and no QuantumTicket-specific rendering remains.

**Step 4: Run focused checks**

Run: `npm run typecheck && npm test -- --run`

Expected: PASS and six project routes represented by the selected set.

**Step 5: Commit**

```bash
git add src/app/projects/page.tsx src/app/projects/[slug]/page.tsx src/components/ProjectCard.tsx src/app/globals.css
git commit -m "feat(portfolio): refine evidence-led project case studies"
```

### Task 5: Clean public machine-readable and SEO content

**Files:**
- Modify: `public/llms.txt`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/sitemap.test.ts`
- Modify: `src/app/opengraph-image.tsx`
- Modify: `src/app/manifest.ts`
- Modify: `src/data/seo.test.ts`
- Modify: `docs/indexing-strategy.md` and `docs/backlink-strategy.md` only for current runtime guidance

**Step 1: Rewrite `public/llms.txt`**

Use the same role line, resume URL, selected project order, statuses, and inspection links as the portfolio. Include RLS Doctor and SmritiFlow. Remove QuantumTicket, Rate Limiting Visualizer, old aliases, and unsupported project counts.

**Step 2: Fix sitemap semantics**

Keep only actual homepage section anchors: `#projects`, `#experience`, `#skills`, `#writing`, and `#contact`. Remove the stale `#about` entry unless a real About section is restored.

Ensure every project route comes from `projects` and no removed project appears.

**Step 3: Align metadata visuals**

Update Open Graph and manifest copy to the proof-led role and accent system. Remove the old neon accent if it conflicts with the teal visual tokens.

**Step 4: Remove runtime stale references**

Run:

```bash
rg -n "QuantumTicket|quantumticket|subhajitlucky\\.vercel\\.app|subhajitxyz\\.vercel\\.app|ratelimiting" src public README.md
```

Expected: no runtime/public matches. Historical plan documents may retain old decisions.

**Step 5: Run tests**

Run: `npm test -- --run src/data/seo.test.ts src/app/sitemap.test.ts`

Expected: PASS.

**Step 6: Commit**

```bash
git add public/llms.txt src/app/sitemap.ts src/app/sitemap.test.ts src/app/opengraph-image.tsx src/app/manifest.ts src/data/seo.test.ts docs/indexing-strategy.md docs/backlink-strategy.md
git commit -m "chore(portfolio): remove stale public profile references"
```

### Task 6: Create and render the one-page resume

**Files:**
- Create: `resume/resume.json`
- Create: `resume/build_resume.py`
- Create: `resume/README.md`
- Modify: `package.json`
- Create/replace: `public/assets/Subhajit_Resume.pdf`
- Modify: `src/data/site.ts`
- Modify: `public/llms.txt`

**Step 1: Write structured resume content**

Use a concise one-page structure:

- Header: Subhajit Pradhan, Software Engineer - Developer Tools, AI Systems, Full Stack.
- Summary: two lines focused on shipped tools, AI workflows, APIs, data, and source-inspectable systems.
- Experience: Giakaa Capital, uElement Technologies, QuadB Technologies.
- Selected engineering: RLS Doctor, SmritiFlow, Tarka Sabha, CSCosmos.
- Skills: TypeScript/JavaScript, Python/Go/Rust/SQL, React/Next.js, Node/Express, PostgreSQL/Prisma, AI integrations, Docker/GitHub Actions, Ethereum/ICP.
- Education: BCA, Centurion University, CGPA 8.9.

Use only facts supported by the resume or public repository evidence. Prefer “implemented”, “built”, “added”, and “designed” over unqualified adjectives.

**Step 2: Implement the PDF builder**

Use ReportLab with embedded standard fonts, searchable text, clickable URLs, consistent section rules, and a single US-letter page. Keep margins and type sizes readable when printed.

Add a package script:

```json
"build:resume": "python3 resume/build_resume.py"
```

The script must fail loudly if the generated content exceeds one page or if required fields are missing.

**Step 3: Generate the PDF**

Run: `npm run build:resume`

Expected: `public/assets/Subhajit_Resume.pdf` exists and has one page.

**Step 4: Render and inspect**

Run:

```bash
mkdir -p tmp/pdfs
pdftoppm -png -r 150 public/assets/Subhajit_Resume.pdf tmp/pdfs/resume
pdfinfo public/assets/Subhajit_Resume.pdf
pdftotext -layout public/assets/Subhajit_Resume.pdf -
```

Use `view_image` on the rendered page. Check for clipping, overlap, illegible links, excessive whitespace, and non-searchable text.

**Step 5: Point all surfaces to the new PDF**

Set `siteConfig.resumePath` to `/assets/Subhajit_Resume.pdf` and update `public/llms.txt`.

**Step 6: Commit**

```bash
git add resume package.json public/assets/Subhajit_Resume.pdf src/data/site.ts public/llms.txt
git commit -m "feat(resume): publish one-page evidence-led resume"
```

### Task 7: Rewrite the GitHub profile README

**Files:**
- External clone: `../subhajitlucky-profile/README.md`

**Step 1: Clone and inspect the profile repository**

Run:

```bash
git clone git@github.com:subhajitlucky/subhajitlucky.git ../subhajitlucky-profile
git -C ../subhajitlucky-profile status --short --branch
```

Expected: clean default branch. If the clone already exists, inspect its status and preserve any user changes.

**Step 2: Rewrite the README**

Use this structure:

```markdown
# Subhajit Pradhan

Software engineer building developer tools, AI systems, and full-stack products.

## Selected work

| Project | What it proves | Links |
| --- | --- | --- |
| RLS Doctor | Postgres/Supabase RLS auditing CLI | source / npm / case study |
| SmritiFlow | Repository-memory CLI for coding agents | source / npm / case study |
| Tarka Sabha | Multi-provider AI workflow state | source / live / case study |
| CSCosmos | Data-driven CS learning hub | source / live / case study |
| CampusHelper | Authenticated full-stack product flow | source / live / case study |
| IntentPay | AI planning with explicit wallet review | source / case study |
```

Add short current-work and engineering-principles sections. Do not add badge walls, contribution graphs, or claims not found in the evidence matrix.

**Step 3: Validate the Markdown**

Check all URLs manually with `curl -I` or a Markdown link checker. Search for stale names:

```bash
rg -n "QuantumTicket|quantumticket|ratelimiting|Learning|while \\(alive\\)" ../subhajitlucky-profile/README.md
```

Expected: no matches.

**Step 4: Commit the profile README in its own repository**

```bash
git -C ../subhajitlucky-profile add README.md
git -C ../subhajitlucky-profile commit -m "docs(profile): rewrite GitHub profile around shipped systems"
```

Push only after confirming the remote, branch, and diff are correct.

### Task 8: Refresh selected repository READMEs

**Files:**
- External clones under `../github-projects/`: `rls-doctor/README.md`, `smritiflow/README.md`, `tarkaSabha/README.md`, `cscosmos/README.md`, `campushelper/README.md`, `intentpay/README.md`

**Step 1: Clone or update repositories**

Clone each public repository into `../github-projects/` or inspect an existing clean clone. Never edit a dirty clone without preserving the user’s changes.

**Step 2: Apply the shared README pattern**

Keep project-specific commands and architecture. Add:

- a portfolio case-study link;
- current status;
- a concise proof section;
- tradeoffs and roadmap where absent;
- a short “Inspect the implementation” section.

For CampusHelper, remove “enterprise-grade” wording and the placeholder `your-username` clone URL. For IntentPay, state `Prototype` and keep the safety boundary. For RLS Doctor and SmritiFlow, keep the real CLI commands, tests, and Agent Skill install paths.

**Step 3: Validate and commit per repository**

For each repository:

```bash
git -C ../github-projects/<repo> diff --check
git -C ../github-projects/<repo> add README.md
git -C ../github-projects/<repo> commit -m "docs(readme): clarify project proof and inspection paths"
```

Do not change application code, dependencies, workflows, or secrets in this task.

### Task 9: Verify the complete profile suite

**Files:**
- Modify any residual files identified by verification only

**Step 1: Run portfolio verification**

```bash
npm run lint
npm run typecheck
npm test -- --run
npm run build
```

Expected: all commands exit 0.

**Step 2: Run stale-reference checks**

```bash
rg -n "QuantumTicket|quantumticket|ratelimiting|subhajitlucky\\.vercel\\.app|subhajitxyz\\.vercel\\.app" src public README.md
```

Expected: no runtime/public matches.

**Step 3: Run browser checks**

Start the production server with `npm run start` after building and inspect:

- `/`
- `/projects`
- `/projects/rls-doctor`
- `/projects/smritiflow`
- `/projects/tarka-sabha`
- `/projects/cscosmos`
- `/projects/campushelper`
- `/projects/intentpay`
- `/blog`
- `/assets/Subhajit_Resume.pdf`

Check desktop and mobile widths, keyboard focus, visible link labels, no horizontal overflow, no broken images, and reduced-motion behavior.

**Step 4: Run resume verification**

```bash
pdfinfo public/assets/Subhajit_Resume.pdf | rg "Pages:.*1"
pdftotext public/assets/Subhajit_Resume.pdf - | rg "RLS Doctor|SmritiFlow|Tarka Sabha|Software Engineer"
```

Expected: one page and all required resume anchors present.

**Step 5: Verify GitHub public surfaces**

Open the public profile and selected repositories. Confirm:

- profile README renders correctly;
- profile website points to the canonical portfolio;
- pins use the selected order;
- selected READMEs link back to the portfolio;
- stale project names are absent.

**Step 6: Commit residual polish only after fresh verification**

```bash
git status --short
git diff --check
git commit -m "fix(profile): polish cross-surface consistency"
```

Only create this final commit if residual fixes are needed.

## Execution handoff

The plan is intended for in-session execution with review checkpoints after Tasks 2, 6, and 9. External GitHub pushes are separate from local verification: commit each external repository first, inspect the diff, then push the intended branch.
