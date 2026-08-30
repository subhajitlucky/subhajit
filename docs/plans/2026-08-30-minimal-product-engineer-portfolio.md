# Minimal Product Engineer Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the portfolio into a globally competitive, extremely concise one-page presentation for remote full-stack product engineering roles.

**Architecture:** Preserve the existing Next.js App Router and typed content model, but change the homepage hierarchy, featured-project selection, public positioning, font system, shared shell, and global visual language. Keep the project index and case-study routes as secondary evidence and restyle them through the same CSS variables and components rather than creating a second design system.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Vitest, Testing Library, next/font

---

## Execution rules

- Use @frontend-design to implement the approved Quiet Product Engineer visual direction.
- Use @test-driven-development for every content or component behavior change.
- Use @react-doctor after all React changes.
- Use @verification-before-completion before making any completion claim.
- Work only in `/home/subhajit/project/subhajit-minimal-redesign` on `feat/minimal-product-engineer-portfolio`.
- Do not deploy, push, edit the GitHub profile, or replace `public/resume.pdf`.
- Keep homepage prose within the limits in `docs/plans/2026-08-30-minimal-product-engineer-portfolio-design.md`.

### Task 1: Lock the concise positioning and featured work

**Files:**
- Modify: `src/data/content.test.ts`
- Modify: `src/data/site.ts`
- Modify: `src/data/projects.ts`

**Step 1: Write the failing content expectations**

Update the positioning test to require:

```ts
expect(siteConfig.role).toBe('Full-Stack Product Engineer');
expect(siteConfig.summary).toBe(
  'I build reliable web products and AI-powered systems from interface to infrastructure.',
);
expect(siteConfig.availability).toBe('Open to remote roles');
expect(skillGroups.map((group) => group.label)).toEqual([
  'Product engineering',
  'Backend and data',
  'AI and developer tools',
]);
```

Update the project-order expectation to require:

```ts
expect(featuredProjects.map((project) => project.slug)).toEqual([
  'codebase-doctor',
  'rls-doctor',
  'tarka-sabha',
  'cscosmos',
]);
expect(secondaryProjects.map((project) => project.slug)).toEqual(['smritiflow', 'sutra']);
```

Add checks that every featured `summary` is at most 180 characters and every featured project exposes a source link.

**Step 2: Run the test to verify it fails**

Run: `npm test -- src/data/content.test.ts`

Expected: FAIL because the existing role, summary, availability, skill groups, and featured order are different.

**Step 3: Implement the minimal content changes**

In `src/data/site.ts`:

- Change the role, summary, availability, description, and three capability groups to match the approved design.
- Keep verified identity, location, contact, education, and employment facts unchanged.
- Keep the current Giakaa entry free of unsupported product or metric claims.

In `src/data/projects.ts`:

- Set `featured: true` for Codebase Doctor, RLS Doctor, Tarka Sabha, and CSCosmos.
- Set `featured: false` for SmritiFlow and SUTRA.
- Tighten homepage-visible summaries where needed without changing the longer problem, system, proof, decision, or tradeoff evidence.

**Step 4: Run the focused test to verify it passes**

Run: `npm test -- src/data/content.test.ts`

Expected: PASS.

**Step 5: Commit**

```bash
git add -- src/data/content.test.ts src/data/site.ts src/data/projects.ts
git commit -m "feat(portfolio): sharpen product engineer positioning"
```

### Task 2: Define and build the new one-page reading experience

**Files:**
- Modify: `src/app/page.test.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Write failing homepage structure tests**

Keep the direct-link and four-project assertions, then update/add expectations for:

```ts
expect(screen.getByRole('heading', { level: 1, name: siteConfig.role })).toBeInTheDocument();
expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
expect(screen.getByText(siteConfig.summary)).toBeInTheDocument();
expect(screen.getAllByTestId('featured-project')).toHaveLength(4);
expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
expect(screen.getByRole('heading', { name: 'Capabilities' })).toBeInTheDocument();
expect(screen.getByRole('region', { name: 'Start a conversation' })).toBeInTheDocument();
```

Check source order with `compareDocumentPosition`: Selected work must precede Experience, which must precede Capabilities. Assert that former headings `Skills` and `Contact Subhajit` are absent.

**Step 2: Run the test to verify it fails**

Run: `npm test -- src/app/page.test.tsx`

Expected: FAIL on the new section names, source order, and contact region.

**Step 3: Rebuild the homepage markup**

In `src/app/page.tsx`, implement these semantic sections:

1. `intro`: availability eyebrow, name, large role heading, one-sentence summary, and four direct links.
2. `selected-work`: four numbered project rows with category/status, title, short summary, compact stack, and only the most useful source/product links plus Details.
3. `experience`: three compact timeline rows.
4. `capabilities`: three terse capability groups.
5. `education-contact`: compact education facts beside a `Start a conversation` email call to action.

Use plain semantic React and existing `Link`/`externalLinkProps`; do not add client state, icons, card abstractions, or animation libraries.

**Step 4: Run the focused homepage tests**

Run: `npm test -- src/app/page.test.tsx`

Expected: PASS.

**Step 5: Commit**

```bash
git add -- src/app/page.test.tsx src/app/page.tsx
git commit -m "feat(portfolio): rebuild concise homepage narrative"
```

### Task 3: Redesign the shared shell and metadata

**Files:**
- Modify: `src/components/SiteShell.test.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/lib/metadata.test.ts`
- Modify: `src/lib/metadata.ts`

**Step 1: Write failing shell and metadata expectations**

Keep skip-navigation, external-link safety, and compact-footer checks. Update the metadata expectation to require `Full-Stack Product Engineer` in the default title and the approved site description.

Add a shell assertion that the wordmark exposes the short `SP` mark without removing the accessible full-name home label.

**Step 2: Run the focused tests to verify they fail**

Run: `npm test -- src/components/SiteShell.test.tsx src/lib/metadata.test.ts`

Expected: FAIL on the new wordmark and title positioning.

**Step 3: Implement the new shell**

- In `layout.tsx`, replace the current sans/mono pairing with `Newsreader` for display text and `Manrope` for interface/body text, exposing `--font-display` and `--font-sans`.
- In `SiteHeader.tsx`, use a compact `SP` visual mark, keep the full accessible home name, and retain Email, Resume, GitHub, and LinkedIn.
- In `SiteFooter.tsx`, keep only location/availability and the copyright line.
- In `metadata.ts`, update title and hiring keywords to the approved role while preserving canonical, Open Graph, Twitter, and project metadata behavior.

**Step 4: Run the focused tests to verify they pass**

Run: `npm test -- src/components/SiteShell.test.tsx src/lib/metadata.test.ts`

Expected: PASS.

**Step 5: Commit**

```bash
git add -- src/components/SiteShell.test.tsx src/components/SiteHeader.tsx src/components/SiteFooter.tsx src/app/layout.tsx src/lib/metadata.test.ts src/lib/metadata.ts
git commit -m "feat(portfolio): introduce distinctive minimal shell"
```

### Task 4: Implement the Quiet Product Engineer visual system

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Establish the visual tokens**

Replace the current white/blue system with a cohesive token set:

```css
:root {
  --canvas: #f2f0e9;
  --ink: #171815;
  --muted: #65675f;
  --line: #cbc9bf;
  --accent: #315c45;
  --accent-soft: #dce5dc;
  --content-width: 72rem;
  --reading-width: 46rem;
}
```

Use the approved font variables, high-contrast focus states, an ink-colored text selection, and restrained border/underline treatments.

**Step 2: Compose the desktop experience**

Implement:

- A calm sticky-or-static header with thin lower rule and compact navigation.
- A hero with oversized serif role typography, deliberate asymmetry, a narrow summary measure, and a small availability marker.
- Numbered project rows whose typography and rule movement provide interaction instead of cards or shadows.
- Compact timeline, capability columns, education/contact composition, and understated footer.
- A short staged CSS entrance for hero and primary sections.
- Matching project-index and case-study styles using the same canvas, type scale, rules, and green accent.

**Step 3: Implement responsive and motion behavior**

At approximately 760px and below:

- Collapse split rows into a single reading column.
- Allow header links to wrap without horizontal overflow.
- Keep the role heading within the viewport using `clamp()`.
- Keep project actions and all touch targets usable at 320px.

Add a `prefers-reduced-motion: reduce` block that disables entrance transitions and animated transforms.

**Step 4: Run static validation**

Run: `npm run typecheck && npm run lint`

Expected: both commands exit 0 with no warnings or errors.

**Step 5: Commit**

```bash
git add -- src/app/globals.css
git commit -m "feat(portfolio): craft quiet product engineer visual system"
```

### Task 5: Align secondary routes with the concise new presentation

**Files:**
- Modify: `src/app/projects/page.test.tsx`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/[slug]/page.test.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`

**Step 1: Add concise-route expectations**

Require the project index introduction to be a single short sentence and retain all six project rows. Require each detail page to keep its evidence links, Problem, System, Proof, Decisions, Tradeoffs, and Technologies so the redesign does not discard technical substantiation.

**Step 2: Run the focused tests**

Run: `npm test -- src/app/projects/page.test.tsx src/app/projects/[slug]/page.test.tsx`

Expected: the new concise index-copy expectation fails while evidence-preservation expectations pass.

**Step 3: Tighten route copy and markup**

- Shorten the project-index introduction without removing project counts or direct links.
- Adjust wrapper/class names only where needed for the new layout.
- Preserve detailed case-study evidence; do not turn the secondary routes into homepage-length marketing summaries.

**Step 4: Re-run the focused tests**

Run: `npm test -- src/app/projects/page.test.tsx src/app/projects/[slug]/page.test.tsx`

Expected: PASS.

**Step 5: Commit**

```bash
git add -- src/app/projects/page.test.tsx src/app/projects/page.tsx src/app/projects/[slug]/page.test.tsx src/app/projects/[slug]/page.tsx
git commit -m "feat(portfolio): align project routes with minimal design"
```

### Task 6: Verify the complete redesign

**Files:**
- Modify if needed: `docs/portfolio-verification.md`

**Step 1: Run the complete automated gate**

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npx -y react-doctor@latest . --verbose --diff
```

Expected: all tests pass, typecheck/lint/build exit 0, and React Doctor reports no unaddressed correctness errors.

**Step 2: Start the production server**

Run: `npm run start -- -H 127.0.0.1 -p 3100`

Expected: the built site becomes available at `http://127.0.0.1:3100`.

**Step 3: Inspect desktop and mobile in a real browser**

Use @playwright or @webapp-testing to inspect `/`, `/projects`, and one `/projects/[slug]` route at approximately 1440px desktop and 320px mobile widths.

Verify:

- no horizontal overflow;
- hero hierarchy and reading order are immediate;
- all content remains concise;
- project links and navigation work;
- keyboard focus is visible;
- reduced motion is respected;
- the new interface does not resemble the previous blue-on-white résumé layout.

Capture screenshots for final visual inspection and correct any concrete defects found.

**Step 4: Record fresh verification evidence**

Update `docs/portfolio-verification.md` only with commands and results actually observed in this worktree. State explicitly that local evidence is not deployment proof.

**Step 5: Re-run the complete gate after any visual fixes**

Run the same automated gate from Step 1.

Expected: every command still passes after final corrections.

**Step 6: Commit**

```bash
git add -- docs/portfolio-verification.md
git commit -m "test(portfolio): verify minimal product engineer redesign"
```

Do not push, deploy, or merge without a separate explicit decision.
