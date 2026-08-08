# Straightforward One-Page Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the editorial dossier with a short, direct one-page hiring portfolio while preserving detailed project routes as optional supporting evidence.

**Architecture:** Keep the existing Next.js App Router and canonical typed data. Simplify the homepage into five visible sections, simplify the shared header and footer, and replace the editorial CSS with a compact sans-serif system. Preserve metadata, structured data, sitemap, resume, and static project routes.

**Tech Stack:** Next.js 16 App Router, React 19 Server Components, TypeScript, CSS, Vitest, Testing Library

---

### Task 1: Lock the Direct Hiring Content Contract

**Files:**

- Modify: `src/data/site.ts`
- Modify: `src/app/page.test.tsx`
- Modify: `src/components/SiteShell.test.tsx`
- Test: `src/data/content.test.ts`

**Step 1: Write the failing tests**

Update homepage assertions to require:

- `Full Stack Software Developer` as the primary heading
- The approved one-sentence summary
- Remote availability
- Email, resume, GitHub, and LinkedIn links
- All three experience entries on the same page
- Exactly four featured project rows in canonical order
- A visible skills section and education section
- Absence of `Evidence, not adjectives`, engineering principles, and the old promotional footer language

Update shell assertions to require only direct profile and contact routes in the header.

**Step 2: Run the tests to verify they fail**

Run:

```bash
npm test -- src/app/page.test.tsx src/components/SiteShell.test.tsx src/data/content.test.ts
```

Expected: FAIL because the current page and shell still use the editorial structure.

**Step 3: Update canonical positioning**

Change `siteConfig.role` to `Full Stack Software Developer` and add the approved summary:

```ts
summary:
  'I build reliable web products, developer tools, and AI systems using TypeScript, Next.js, Python, and PostgreSQL.'
```

Keep current Giakaa data unchanged and without a summary.

**Step 4: Run the data test**

Run:

```bash
npm test -- src/data/content.test.ts
```

Expected: PASS.

**Step 5: Commit**

```bash
git add src/data/site.ts src/app/page.test.tsx src/components/SiteShell.test.tsx src/data/content.test.ts
git commit -m "test(portfolio): define direct one-page content"
```

### Task 2: Replace the Homepage and Shared Shell

**Files:**

- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Delete: `src/components/ContactPanel.tsx`
- Delete: `src/components/ExperienceTimeline.tsx`
- Delete: `src/components/Hero.tsx`
- Delete: `src/components/Principles.tsx`
- Delete: `src/components/ProjectDossier.tsx`
- Delete: `src/components/ProofRail.tsx`

**Step 1: Implement the compact header**

Render Subhajit's name at the left and direct Email, Resume, GitHub, and LinkedIn links at the right. Preserve the skip link and safe external-link attributes. Do not add a mobile menu.

**Step 2: Implement the one-page hiring sheet**

Build these sections directly from typed data:

1. Introduction: role, summary, availability, direct actions
2. Experience: all roles visible; Giakaa remains minimal
3. Selected work: four compact rows with summary, stack, and direct evidence links
4. Skills and education: compact and visible
5. Contact: one short sentence and email link

Project names may link to existing case studies, but the page must already contain enough information to evaluate each project.

**Step 3: Implement the compact footer**

Render one small line containing location, remote availability, and the current year. Remove the promotional heading and duplicate email block.

**Step 4: Replace the global stylesheet**

Use:

- `#ffffff` background
- `#15171a` primary text
- `#5b6470` secondary text
- `#155eef` restrained blue accent
- `#dfe3e8` dividers
- Manrope sans-serif with IBM Plex Mono only for small metadata
- Approximately 1000px content width
- Headline maximum around 64px desktop and 42px mobile
- No gradients, textures, giant numerals, entrance animations, dark promotional panels, or serif typography

Retain simple styling for project index, case-study pages, 404, focus states, and 320px layouts.

**Step 5: Remove unused editorial components**

Use `rg` to confirm the six homepage components have no remaining imports, then delete them explicitly.

**Step 6: Run focused checks**

Run:

```bash
npm test -- src/app/page.test.tsx src/components/SiteShell.test.tsx
npm run typecheck
npm run lint
```

Expected: PASS.

**Step 7: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx src/app/globals.css src/components/SiteHeader.tsx src/components/SiteFooter.tsx
git add -u src/components
git commit -m "feat(portfolio): build straightforward one-page portfolio"
```

### Task 3: Align Metadata and Supporting Routes

**Files:**

- Modify: `src/lib/metadata.ts`
- Modify: `src/lib/metadata.test.ts`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/opengraph-image.tsx`

**Step 1: Write the failing metadata assertion**

Require the root title and social metadata to lead with `Full Stack Software Developer` while retaining developer-tools and AI-systems vocabulary in the description and keywords.

**Step 2: Run the metadata test to verify it fails**

Run:

```bash
npm test -- src/lib/metadata.test.ts
```

Expected: FAIL on the old primary title.

**Step 3: Simplify supporting copy**

- Update root metadata and social image to the broader full-stack positioning.
- Shorten project-index introduction copy.
- Keep detailed project content and evidence intact.
- Replace the stylized 404 sentence with a direct `Page not found` message.

**Step 4: Run route and metadata tests**

Run:

```bash
npm test -- src/lib/metadata.test.ts src/app/projects/page.test.tsx 'src/app/projects/[slug]/page.test.tsx'
npm run typecheck
npm run lint
```

Expected: PASS.

**Step 5: Commit**

```bash
git add src/lib/metadata.ts src/lib/metadata.test.ts src/app/projects/page.tsx 'src/app/projects/[slug]/page.tsx' src/app/not-found.tsx src/app/opengraph-image.tsx
git commit -m "feat(portfolio): align supporting routes with direct positioning"
```

### Task 4: Verify the Final Redesign

**Files:**

- Modify: `docs/portfolio-verification.md`

**Step 1: Run the complete automated suite**

Run sequentially:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit 0.

**Step 2: Run React Doctor**

Run:

```bash
npx -y react-doctor@latest . --verbose --scope changed
```

Expected: no unresolved high-confidence findings.

**Step 3: Run production-browser verification**

Serve the production build and check `/`, `/projects`, all project routes, `/resume.pdf`, and an unknown route at 1440px and 320px.

Verify:

- No horizontal overflow
- One `h1` and sequential headings
- Skip link and visible focus
- Direct header links
- All important homepage content visible without route changes
- No unexpected console errors
- No old editorial slogans

Capture and visually inspect the homepage at desktop and mobile widths.

**Step 4: Update verification evidence**

Record the new commands, browser checks, and screenshot review in `docs/portfolio-verification.md`. Preserve the deployment boundary.

**Step 5: Commit**

```bash
git add docs/portfolio-verification.md
git commit -m "test(portfolio): verify straightforward redesign"
```

**Step 6: Complete the Git audit**

Run:

```bash
git status --short --branch
git diff --check origin/main..HEAD
rg --files -g '!node_modules' -g '!.next' | sort
```

Expected: clean working tree and no unexplained files.
