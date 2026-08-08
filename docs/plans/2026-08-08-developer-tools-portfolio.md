# Developer Tools and AI Systems Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fresh, production-ready Next.js portfolio that presents Subhajit Pradhan as a developer-tools and AI-systems engineer through inspectable project evidence.

**Architecture:** Use the Next.js App Router with Server Components and typed local content modules. Render the homepage, project index, and static project case studies from one canonical project model; keep motion in CSS and avoid runtime data or form dependencies. Verify content integrity, metadata, routing, accessibility, responsive layout, and the production build before handoff.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Vitest, Testing Library, ESLint, `next/font`, `next/image`, and `next/og`

---

## Execution Constraints

- Work in `/home/subhajit/project/subhajit`, as requested by the user.
- The current working tree already contains intentional deletions from the former portfolio. Do not restore the old site wholesale.
- Keep the approved design document and its commit.
- Do not push, deploy, change GitHub account settings, or modify repositories outside this portfolio.
- Use the project-scoped GitHub key only for read-only verification unless the user separately authorizes a push.
- Do not describe Hema AI or internal Giakaa work. Show only the approved company/title/date/location line.
- Treat public repository source and README files as evidence; do not infer adoption, performance, or production claims.
- Use `/home/subhajit/project/Subhajit_Resume.pdf` as the source resume asset.

## Task 1: Establish the Next.js Foundation

**Files:**

- Create: `package.json`
- Create: `package-lock.json` through `npm install`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `next-env.d.ts` through Next.js tooling if absent
- Create: `eslint.config.js`
- Create: `vitest.config.ts`
- Create: `src/__tests__/setupTests.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`

**Step 1: Write the package and tool configuration**

Create a minimal package manifest with these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --max-warnings=0",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Use current compatible Next 16 and React 19 releases. Do not add animation, icon, CMS, analytics, Tailwind, or component-library dependencies.

**Step 2: Install dependencies**

Run:

```bash
npm install
```

Expected: `package-lock.json` is generated and install exits successfully.

**Step 3: Create a minimal render smoke test**

Create `src/app/page.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('introduces Subhajit as a developer tools and AI systems engineer', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', {
        name: /developer tools and ai systems/i,
      }),
    ).toBeInTheDocument();
  });
});
```

**Step 4: Run the test to verify it fails**

Run:

```bash
npm test -- src/app/page.test.tsx
```

Expected: FAIL because the final homepage heading does not exist.

**Step 5: Create the minimal app shell**

Create a semantic root layout with optimized fonts, default metadata, a skip link, header placeholder, main content, and footer placeholder. Add the required heading to `page.tsx`.

**Step 6: Run foundation checks**

Run:

```bash
npm test -- src/app/page.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands PASS.

**Step 7: Commit**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json next-env.d.ts eslint.config.js vitest.config.ts src/__tests__/setupTests.ts src/app/layout.tsx src/app/page.tsx src/app/page.test.tsx src/app/globals.css
git commit -m "build(portfolio): establish nextjs foundation"
```

## Task 2: Add Canonical Profile and Project Data

**Files:**

- Create: `src/data/site.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/content.test.ts`
- Create: `src/lib/urls.ts`

**Step 1: Define the failing content-integrity tests**

The tests must assert:

- Role is `Developer Tools / AI Systems Engineer`.
- Availability is worldwide remote without relocation language.
- Current Giakaa entry has no descriptive bullets or Hema references.
- Featured slugs are exactly `codebase-doctor`, `rls-doctor`, `smritiflow`, and `tarka-sabha` in order.
- Secondary slugs are `cscosmos` and `sutra`.
- Every project has a source URL and at least one proof item.
- Optional actions render only from valid URLs.
- Runtime content contains no project creation dates or unsupported metrics.

Example:

```ts
expect(featuredProjects.map((project) => project.slug)).toEqual([
  'codebase-doctor',
  'rls-doctor',
  'smritiflow',
  'tarka-sabha',
]);
```

**Step 2: Run the tests to verify they fail**

Run:

```bash
npm test -- src/data/content.test.ts
```

Expected: FAIL because the data modules do not exist.

**Step 3: Define the project model**

Use a typed model containing:

```ts
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
  links: { label: string; href: string; kind: 'source' | 'package' | 'live' | 'evidence' }[];
  featured: boolean;
};
```

Populate claims from the public repositories and the verified resume. Keep roadmap behavior out of shipped-proof arrays.

**Step 4: Add site data**

Include:

- Name, role, location, availability, email, GitHub, LinkedIn, and resume path
- Approved experience entries
- Engineering principles
- Concise skill groups grounded in the selected work
- Education

**Step 5: Run focused tests**

Run:

```bash
npm test -- src/data/content.test.ts
```

Expected: PASS.

**Step 6: Commit**

```bash
git add src/data/site.ts src/data/projects.ts src/data/content.test.ts src/lib/urls.ts
git commit -m "feat(portfolio): add verified profile and project data"
```

## Task 3: Build the Editorial Shell and Design System

**Files:**

- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/components/ArrowLink.tsx`
- Create: `src/components/SectionLabel.tsx`
- Create: `src/components/SiteShell.test.tsx`

**Step 1: Write shell accessibility tests**

Test that the shell exposes:

- Skip link to `#main-content`
- Navigation labelled `Primary navigation`
- Work, Experience, Resume, and Contact links
- A footer email link
- Safe external-link attributes

**Step 2: Run the shell test to verify it fails**

Run:

```bash
npm test -- src/components/SiteShell.test.tsx
```

Expected: FAIL because shell components do not exist.

**Step 3: Implement the global visual tokens**

Define variables for paper, ink, graphite, stone rules, signal orange, typography, content widths, spacing, and motion. Include:

- Border-box reset
- Strong focus-visible state
- Fluid type scales with `clamp()`
- Selection color
- Horizontal rule treatment
- 12-column desktop grid utilities
- Mobile breakpoints
- `prefers-reduced-motion` overrides

**Step 4: Implement the shell**

Use semantic navigation and text-forward actions. Keep mobile navigation visible and compact so no client-side menu state is required.

**Step 5: Run checks**

Run:

```bash
npm test -- src/components/SiteShell.test.tsx
npm run typecheck
npm run lint
```

Expected: PASS.

**Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/components/SiteHeader.tsx src/components/SiteFooter.tsx src/components/ArrowLink.tsx src/components/SectionLabel.tsx src/components/SiteShell.test.tsx
git commit -m "feat(portfolio): build editorial site shell"
```

## Task 4: Build the Hiring-Focused Homepage

**Files:**

- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/ProofRail.tsx`
- Create: `src/components/ProjectDossier.tsx`
- Create: `src/components/ExperienceTimeline.tsx`
- Create: `src/components/Principles.tsx`
- Create: `src/components/ContactPanel.tsx`

**Step 1: Expand the failing homepage test**

Assert that the homepage contains:

- The approved positioning sentence
- Worldwide remote availability
- Resume, GitHub, email, and selected-work actions
- Exactly four featured projects in the approved order
- The Giakaa title/date/location line without a company-work description
- Education and contact sections

**Step 2: Run the homepage test to verify it fails**

Run:

```bash
npm test -- src/app/page.test.tsx
```

Expected: FAIL on missing homepage sections.

**Step 3: Implement the hero and proof rail**

Create a visually dominant but fast-scanning opening. Use a compact availability marker and direct actions. The proof rail should describe evidence categories, not invent totals.

**Step 4: Implement project dossiers**

Each homepage project row contains:

- Oversized index
- Category and status
- Project title and concise summary
- `Problem -> System -> Proof` labels
- Source/package/live actions where available

**Step 5: Implement experience, principles, education, and contact**

Keep employment copy concise. Make the final contact section explicitly invite remote developer-tools and AI-systems opportunities.

**Step 6: Add restrained CSS motion**

Use CSS-only reveal timing, rule growth, and hover offsets. Confirm all transformations and transitions are disabled or simplified under reduced motion.

**Step 7: Run focused checks**

Run:

```bash
npm test -- src/app/page.test.tsx
npm run typecheck
npm run lint
```

Expected: PASS.

**Step 8: Commit**

```bash
git add src/app/page.tsx src/app/page.test.tsx src/components/Hero.tsx src/components/ProofRail.tsx src/components/ProjectDossier.tsx src/components/ExperienceTimeline.tsx src/components/Principles.tsx src/components/ContactPanel.tsx src/app/globals.css
git commit -m "feat(portfolio): build hiring focused homepage"
```

## Task 5: Build the Project Index and Case Studies

**Files:**

- Create: `src/app/projects/page.tsx`
- Create: `src/app/projects/page.test.tsx`
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/app/projects/[slug]/page.test.tsx`
- Create: `src/components/ArchitectureFlow.tsx`
- Create: `src/components/EvidenceLinks.tsx`
- Create: `src/components/ProjectNavigation.tsx`

**Step 1: Write failing route tests**

Test that:

- `/projects` renders all six projects in the approved order.
- A known slug renders its title, problem, system, proof, architecture, decisions, tradeoffs, stack, and evidence links.
- `generateStaticParams()` returns all project slugs.
- Unknown slugs call `notFound()`.

**Step 2: Run the route tests to verify they fail**

Run:

```bash
npm test -- src/app/projects/page.test.tsx 'src/app/projects/[slug]/page.test.tsx'
```

Expected: FAIL because the routes do not exist.

**Step 3: Implement the project index**

Render the six selected projects with featured and secondary distinctions. Keep evidence actions available without reproducing the entire case study.

**Step 4: Implement static case studies**

Use awaited Next.js `params`, `generateStaticParams`, route metadata, and `notFound()` for invalid slugs. Build the page from canonical data only.

**Step 5: Implement the architecture flow**

Render a semantic ordered list that becomes an annotated horizontal flow on wide screens. Do not make the diagram dependent on JavaScript.

**Step 6: Implement adjacent-project navigation**

Calculate previous and next projects from canonical order.

**Step 7: Run focused checks**

Run:

```bash
npm test -- src/app/projects/page.test.tsx 'src/app/projects/[slug]/page.test.tsx'
npm run typecheck
npm run lint
```

Expected: PASS.

**Step 8: Commit**

```bash
git add src/app/projects src/components/ArchitectureFlow.tsx src/components/EvidenceLinks.tsx src/components/ProjectNavigation.tsx src/app/globals.css
git commit -m "feat(portfolio): add project index and case studies"
```

## Task 6: Add Resume, Metadata, and Route Integrity

**Files:**

- Create: `public/resume.pdf` from `/home/subhajit/project/Subhajit_Resume.pdf`
- Create: `public/favicon.svg`
- Create: `src/app/not-found.tsx`
- Create: `src/app/manifest.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/components/JsonLd.tsx`
- Create: `src/lib/metadata.ts`
- Create: `src/lib/metadata.test.ts`
- Create: `src/app/sitemap.test.ts`

**Step 1: Write failing metadata and sitemap tests**

Assert:

- Canonical base URL is `https://subhajitpradhan.vercel.app`.
- Root metadata targets developer-tools and AI-systems roles.
- Every selected project route appears in the sitemap.
- Resume path is `/resume.pdf`.
- Structured data includes Person and selected creative-work entries.

**Step 2: Run the tests to verify they fail**

Run:

```bash
npm test -- src/lib/metadata.test.ts src/app/sitemap.test.ts
```

Expected: FAIL because metadata helpers and sitemap do not exist.

**Step 3: Add the resume asset**

Copy the user-provided PDF to the stable public path. Verify it is readable and record its page count and extracted title/name text without editing the resume in this scope.

**Step 4: Implement metadata routes and structured data**

Add route metadata, project metadata, Open Graph image, robots, sitemap, manifest, favicon, Person JSON-LD, and project JSON-LD. Keep all claims aligned with canonical data.

**Step 5: Implement the custom 404 page**

Provide clear routes back to selected work and contact.

**Step 6: Run focused checks**

Run:

```bash
npm test -- src/lib/metadata.test.ts src/app/sitemap.test.ts
pdfinfo public/resume.pdf | rg '^(Pages|Encrypted)'
pdftotext public/resume.pdf - | rg -m1 'Subhajit Pradhan'
npm run typecheck
npm run lint
```

Expected: tests PASS; PDF is readable and contains the candidate name.

**Step 7: Commit**

```bash
git add public/resume.pdf public/favicon.svg src/app/not-found.tsx src/app/manifest.ts src/app/robots.ts src/app/sitemap.ts src/app/opengraph-image.tsx src/components/JsonLd.tsx src/lib/metadata.ts src/lib/metadata.test.ts src/app/sitemap.test.ts src/app/layout.tsx 'src/app/projects/[slug]/page.tsx'
git commit -m "feat(portfolio): add resume and discovery metadata"
```

## Task 7: Remove Obsolete Portfolio Surfaces

**Files:**

- Delete or preserve as deleted: `content/blog/**`
- Delete or preserve as deleted: `src/app/blog/**`
- Delete or preserve as deleted: obsolete blog and MDX components/data
- Delete or preserve as deleted: obsolete resume generator and duplicate PDFs
- Delete or preserve as deleted: superseded SEO and deployment documents
- Modify: `README.md`
- Review: every remaining deletion in `git status`

**Step 1: Inventory deletions against the approved scope**

Run:

```bash
git status --short
git diff --name-status HEAD^
```

Classify every deleted file as obsolete portfolio content or unrelated user work. Do not stage an unexplained deletion.

**Step 2: Write the new README**

Document local setup, validation commands, routes, content source, resume path, and deployment boundary.

**Step 3: Run repository searches**

Run:

```bash
rg -n -i 'QuantumTicket|Hema AI|production-ready|enterprise-grade|while \(alive\)|Learning' src public README.md package.json
```

Expected: no stale or prohibited runtime/profile copy.

**Step 4: Stage only explained cleanup**

Use explicit `git add -- <paths>` and `git add -u -- <paths>`. Never use `git add -A` while unexplained changes remain.

**Step 5: Commit**

```bash
git commit -m "chore(portfolio): remove obsolete site surfaces"
```

## Task 8: Complete Automated and Browser Verification

**Files:**

- Modify only if verification reveals an actual defect
- Create: `docs/portfolio-verification.md`

**Step 1: Run the complete automated suite**

Run sequentially:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: every command exits 0.

**Step 2: Run React diagnostics**

Run the repository through React Doctor after the React implementation is complete.

Expected: no unresolved high-confidence defects.

**Step 3: Start the production server**

Run:

```bash
npm run start
```

Expected: production server listens locally using the successful build.

**Step 4: Verify routes in a real browser**

Check:

- `/`
- `/projects`
- All six `/projects/[slug]` routes
- `/resume.pdf`
- An unknown route

Check at desktop and mobile widths. Capture screenshots for visual inspection.

**Step 5: Verify interaction and accessibility**

Check:

- Skip link
- Keyboard tab order
- Visible focus
- External links
- Resume download/open behavior
- Reduced-motion rendering
- No horizontal overflow at 320px
- Heading order and landmark names

**Step 6: Record fresh evidence**

Write exact commands, outcomes, browser routes, viewport sizes, and remaining limitations to `docs/portfolio-verification.md`. State clearly that local evidence is not deployment proof.

**Step 7: Commit verification-only changes**

```bash
git add docs/portfolio-verification.md
git commit -m "test(portfolio): record release verification"
```

## Task 9: Final Scope and Git Audit

**Step 1: Review all committed paths**

Run:

```bash
git status --short --branch
git log --oneline --decorate --stat HEAD~10..HEAD
git diff --check origin/main..HEAD
```

Expected: no unexplained working-tree changes and no whitespace errors in the implemented diff.

**Step 2: Verify the final source tree**

Run:

```bash
rg --files -g '!node_modules' -g '!.next' | sort
```

Expected: only the fresh portfolio, approved plans, public asset, tests, and required configuration remain.

**Step 3: Report completion boundaries**

Report:

- Implemented routes and content
- Automated evidence
- Browser evidence
- Exact commits
- Remaining unverified deployment/live-domain behavior
- GitHub profile changes still requiring authenticated account access

Do not push or deploy unless the user gives separate authorization.
