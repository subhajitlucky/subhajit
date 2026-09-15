# Plain Professional Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the warm editorial portfolio with a plain, conventional one-page developer portfolio (white/blue, single sans, simple cards) while preserving factual project content, routes, and metadata.

**Architecture:** Keep the existing Next.js App Router and typed content model. Rebuild the homepage, projects index, and case-study pages from plain markup with two new small components (`ProjectCard`, `TagList`), remove four decorative components, and replace `globals.css` with a light token-based system. Rewrite copy to short plain sentences without changing any factual claim.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, plain CSS, Vitest + Testing Library, `next/font` (Geist).

**Design doc:** `docs/plans/2026-09-15-plain-professional-portfolio-design.md`

---

## Conventions

- Work on branch `feat/plain-professional-portfolio` in `/home/subhajit/project/subhajit`.
- Run the whole suite often: `npm test`. Individual file: `npx vitest run src/app/page.test.tsx`.
- Gate before finishing: `npm test && npm run typecheck && npm run lint && npm run build`.
- Commit after every task with the message shown. Do not commit secrets or generated output (`.next`, `tsconfig.tsbuildinfo` are ignored).

---

### Task 1: Plain copy in the data model

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/data/projects.ts`
- Modify: `src/data/content.test.ts`

**Step 1: Update `content.test.ts` first (failing tests)**

Replace the approved-positioning assertions with the plain positioning:

```ts
it('uses the approved plain product engineer positioning', () => {
  expect(siteConfig.role).toBe('Full-Stack Product Engineer');
  expect(siteConfig.summary).toBe(
    'I build web products and AI systems, from the interface to the infrastructure.',
  );
  expect(siteConfig.availability).toBe('Open to remote roles');
  expect(siteConfig.description).toBe(
    'Full-Stack Product Engineer building web products and AI systems.',
  );
  expect(skillGroups.map((group) => group.label)).toEqual([
    'Product engineering',
    'Backend and data',
    'AI and developer tools',
  ]);
});
```

Keep the existing tests for employment boundary, project order, source links, proof, and banned marketing phrases unchanged.

**Step 2: Run the test to verify it fails**

Run: `npx vitest run src/data/content.test.ts`
Expected: FAIL on the summary/description assertions.

**Step 3: Rewrite `site.ts` copy**

- `summary`: `'I build web products and AI systems, from the interface to the infrastructure.'`
- `description`: `'Full-Stack Product Engineer building web products and AI systems.'`
- UElement summary: `'Built Next.js applications and blockchain-integrated workflows across frontend, backend, and transaction boundaries.'`
- QuadB summary: `'Built canister-backed applications and smart-contract exercises on the Internet Computer with Motoko and Rust.'`
- Keep names, periods, locations, skill groups, and education as-is.

**Step 4: Rewrite `projects.ts` summaries to plain sentences**

Rules: 1–2 short sentences, no adjectives like "reliable/intentional/carefully", facts unchanged, length ≤ 180 characters (existing test). Examples:

- Codebase Doctor: `'A CLI that audits a repository and reports deterministic findings as text, JSON, or SARIF. Works with or without a model in the loop.'`
- RLS Doctor: `'A read-only Postgres and Supabase RLS auditor. Reports policy, role, and grant risks from catalog metadata without touching data.'`
- SmritiFlow: `'A CLI that keeps repository memory current so coding agents can resume work with accurate project context.'`
- Tarka Sabha: `'A multi-agent debate platform with configurable personas, provider routing, encrypted keys, and inspectable speaker state.'`
- CSCosmos: `'A searchable computer-science learning hub with interactive modules across web, systems, security, AI, and infrastructure.'`
- SUTRA: `'A small deterministic language for agent-to-agent intent, negotiation, and commitments with auditable state transitions.'`

Keep `problem`, `system`, `proof`, `decisions`, `tradeoffs`, `stack`, `flow`, and links unchanged for now.

**Step 5: Run the test to verify it passes**

Run: `npx vitest run src/data/content.test.ts`
Expected: PASS.

**Step 6: Commit**

```bash
git add src/data/site.ts src/data/projects.ts src/data/content.test.ts
git commit -m "refactor(portfolio): move content to plain professional copy"
```

---

### Task 2: `TagList` and `ProjectCard` components

**Files:**
- Create: `src/components/TagList.tsx`
- Create: `src/components/TagList.test.tsx`
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectCard.test.tsx`

**Step 1: Write failing tests**

`TagList.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { TagList } from '@/components/TagList';

describe('TagList', () => {
  it('renders each tag as a list item', () => {
    render(<TagList tags={['TypeScript', 'Node.js', 'Vitest']} />);
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'TypeScript',
      'Node.js',
      'Vitest',
    ]);
  });

  it('renders nothing for an empty list', () => {
    const { container } = render(<TagList tags={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
```

`ProjectCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

const project = projects[0];

describe('ProjectCard', () => {
  it('renders the project title, summary, and details link', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
    expect(screen.getByText(project.summary)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /details/i })).toHaveAttribute(
      'href',
      `/projects/${project.slug}`,
    );
  });

  it('renders source, package, and live links but not evidence links', () => {
    render(<ProjectCard project={project} />);
    for (const link of project.links) {
      const matches = screen.queryAllByRole('link', { name: link.label });
      if (link.kind === 'evidence') {
        expect(matches).toHaveLength(0);
      } else {
        expect(matches.length).toBeGreaterThan(0);
      }
    }
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/TagList.test.tsx src/components/ProjectCard.test.tsx`
Expected: FAIL — modules not found.

**Step 3: Implement `TagList.tsx`**

```tsx
type TagListProps = {
  tags: readonly string[];
};

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
```

**Step 4: Implement `ProjectCard.tsx`**

```tsx
import Link from 'next/link';
import { TagList } from '@/components/TagList';
import type { Project } from '@/data/projects';
import { externalLinkProps, isExternalUrl } from '@/lib/urls';

const actionKinds = new Set(['source', 'package', 'live']);

export function ProjectCard({ project }: { project: Project }) {
  const actionLinks = project.links.filter((link) => actionKinds.has(link.kind));

  return (
    <article className="project-card">
      <p className="project-card-meta">
        {project.category} · {project.status}
      </p>
      <h3>
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className="project-card-summary">{project.summary}</p>
      <TagList tags={project.stack.slice(0, 5)} />
      <div className="project-card-links">
        {actionLinks.map((link) => (
          <a key={link.href} href={link.href} {...(isExternalUrl(link.href) ? externalLinkProps : {})}>
            {link.label}
          </a>
        ))}
        <Link href={`/projects/${project.slug}`}>Details</Link>
      </div>
    </article>
  );
}
```

**Step 5: Run tests to verify they pass**

Run: `npx vitest run src/components/TagList.test.tsx src/components/ProjectCard.test.tsx`
Expected: PASS.

**Step 6: Commit**

```bash
git add src/components/TagList.tsx src/components/TagList.test.tsx src/components/ProjectCard.tsx src/components/ProjectCard.test.tsx
git commit -m "feat(portfolio): add plain project card components"
```

---

### Task 3: Rebuild the homepage

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`

**Step 1: Update `page.test.tsx` for the new structure**

Replace the old assertions with:

- hero shows `siteConfig.role` as `h1`, `siteConfig.name`, `siteConfig.summary`, `siteConfig.availability`, and links Email, Resume, GitHub, LinkedIn
- exactly four `featured-project` cards in `featuredProjects` order, each containing a Details link and one link per non-evidence project link
- experience entries include the three organizations, current employment has no paragraph, other roles show a summary
- headings `Projects`, `Experience`, `Skills`, `Get in touch` exist (plain labels, no numbered rows)
- Skills groups render `skillGroups` labels and items
- Education shows degree, organization, and period

Use `data-testid="featured-project"` on each card so counts stay testable.

**Step 2: Run the test to verify it fails**

Run: `npx vitest run src/app/page.test.tsx`
Expected: FAIL on the new headings/structure.

**Step 3: Rebuild `page.tsx`**

Structure (plain semantic markup, no `SectionLabel`, no numbered spans, no `ArrowLink`):

```tsx
<div className="home-page site-container">
  <section className="intro">...</section>
  <section aria-labelledby="projects-title">
    <div className="section-heading">
      <h2 id="projects-title">Projects</h2>
      <Link href="/projects">All projects</Link>
    </div>
    <div className="project-grid">
      {featuredProjects.map((project) => (
        <div data-testid="featured-project" key={project.slug}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  </section>
  <section aria-labelledby="experience-title">...</section>
  <section aria-labelledby="skills-title">...</section>
  <section aria-labelledby="education-title">...</section>
  <section className="contact-section" aria-labelledby="contact-title">
    <h2 id="contact-title">Get in touch</h2>
    <p>Email is the fastest way to reach me.</p>
    <a href={siteConfig.links.email}>Send an email</a>
  </section>
</div>
```

Hero keeps `availability-line` (dot + text) and `intro-links`; keep `externalLinkProps` on GitHub/LinkedIn. Contact paragraph must not repeat "worldwide" (existing test).

**Step 4: Run tests to verify they pass**

Run: `npx vitest run src/app/page.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "feat(portfolio): rebuild homepage in plain professional layout"
```

---

### Task 4: Rebuild the projects index

**Files:**
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/page.test.tsx`

**Step 1: Update the test**

- intro sentence: `'Six public projects across developer tools, AI systems, and full-stack products.'` (plain, no em dash)
- all six projects render in order with title, summary, Details link, and Source link
- keep the route-local metadata test added in the previous pass (`title: 'Selected work'`, canonical `/projects`, OG/Twitter fields)

**Step 2: Run to verify it fails**

Run: `npx vitest run src/app/projects/page.test.tsx`
Expected: FAIL.

**Step 3: Rebuild `page.tsx`**

Plain list layout using a `projects-index-list` of `<li>` rows: title link, meta line (category · status), summary, and Source/Details links. Keep `secondaryProjects` note reworded plainly: `'Two more projects are on the homepage featured list.'` — if awkward, drop the note entirely and remove its assertion.

**Step 4: Run to verify it passes**

Run: `npx vitest run src/app/projects/page.test.tsx`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/app/projects/page.tsx src/app/projects/page.test.tsx
git commit -m "feat(portfolio): simplify project index"
```

---

### Task 5: Simplify case studies and delete obsolete components

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/projects/[slug]/page.test.tsx`
- Delete: `src/components/SectionLabel.tsx`, `src/components/EvidenceLinks.tsx`, `src/components/ArchitectureFlow.tsx`, `src/components/ProjectNavigation.tsx`

**Step 1: Update the test**

- keep headings Problem, System, Proof, Architecture, Decisions, Tradeoffs and limitations, Technologies
- keep the Source link and all project links assertions
- assert the architecture steps render as an ordered list with step labels
- remove any `ProjectNavigation`/`SectionLabel` expectations

**Step 2: Run to verify it fails**

Run: `npx vitest run src/app/projects/[slug]/page.test.tsx`
Expected: FAIL while the old components are still referenced.

**Step 3: Rebuild the case study page**

Header: title, summary, link row (`Source`, `npm package`, `Live application`, `Architecture` as plain `<a>`). Body: seven `<section>` blocks each with `<h2>`; architecture flow as:

```tsx
<ol className="flow-list">
  {project.flow.map((step) => (
    <li key={step.label}>
      <strong>{step.label}</strong>
      <span>{step.detail}</span>
    </li>
  ))}
</ol>
```

Remove `generateStaticParams`, metadata, and notFound logic changes — keep them working.

**Step 4: Delete obsolete components**

```bash
git rm src/components/SectionLabel.tsx src/components/EvidenceLinks.tsx src/components/ArchitectureFlow.tsx src/components/ProjectNavigation.tsx
```

**Step 5: Run tests to verify they pass**

Run: `npx vitest run src/app/projects`
Expected: PASS.

**Step 6: Commit**

```bash
git add -A src/app/projects src/components
git commit -m "feat(portfolio): flatten case study layout and drop decorative components"
```

---

### Task 6: Shell, fonts, and layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/components/SiteShell.test.tsx`

**Step 1: Switch fonts in `layout.tsx`**

```tsx
import { Geist } from 'next/font/google';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
```

Remove the Newsreader `display` font and the `--font-display` variable from `<html>`. If `Geist` is unavailable in the installed `next/font` version, fall back to `IBM_Plex_Sans` with the same options and note it in the commit message.

**Step 2: Simplify header and footer markup**

- Header: keep skip link, wordmark `siteConfig.shortName` with `aria-label`, and the four nav links. Remove nothing else; keep target/rel behavior.
- Footer: plain `<p>` lines: name and location, availability, email link. Keep the existing test's commitments (location, availability text, no headings).

**Step 3: Update `SiteShell.test.tsx` only if labels changed**

Run: `npx vitest run src/components/SiteShell.test.tsx`
Expected: PASS with no edits if labels are unchanged; adjust assertions and re-run if the footer copy changed.

**Step 4: Commit**

```bash
git add src/app/layout.tsx src/components/SiteHeader.tsx src/components/SiteFooter.tsx src/components/SiteShell.test.tsx
git commit -m "feat(portfolio): switch to single sans and plain shell"
```

---

### Task 7: Discovery assets to the new palette

**Files:**
- Modify: `src/app/opengraph-image.tsx`
- Modify: `src/app/manifest.ts`
- Modify: `public/favicon.svg`
- Modify: `src/lib/metadata.ts` (only if the `keywords` list mentions removed framing)

**Step 1: Update colors**

- OG image: background `#ffffff`, text `#111827`, border `#e5e7eb`, accent `#2563eb`; keep size 1200×630 and the current text hierarchy; footer line `'Web products · AI systems · Developer tools'`.
- Manifest: `background_color: '#ffffff'`, `theme_color: '#2563eb'`.
- Favicon: background `#111827`, letter fill `#ffffff`, accent `#2563eb`.

**Step 2: Verify metadata tests still pass**

Run: `npx vitest run src/lib/metadata.test.ts src/app/sitemap.test.ts`
Expected: PASS.

**Step 3: Commit**

```bash
git add src/app/opengraph-image.tsx src/app/manifest.ts public/favicon.svg src/lib/metadata.ts
git commit -m "chore(portfolio): align discovery assets with plain palette"
```

---

### Task 8: Replace `globals.css`

**Files:**
- Rewrite: `src/app/globals.css`

**Step 1: Replace the file with the new token system**

Top of file must be exactly these tokens:

```css
:root {
  --background: #ffffff;
  --surface: #f9fafb;
  --text: #111827;
  --muted: #6b7280;
  --line: #e5e7eb;
  --accent: #2563eb;
  --accent-dark: #1d4ed8;
  --content-width: 72rem;
}
```

Then implement, in order: reset and body typography; `a`/focus/selection; `.site-container`; `.skip-link`; header and `.direct-links`; `.intro`; `.availability-line`; `.section-heading`; `.project-grid` (2 columns ≥48rem, 1 column below) and `.project-card` (1px `--line` border, 8px radius, no shadow); `.tag-list`; `.experience-rows`; `.skills-list`; `.contact-section`; `.site-footer`; `.projects-index-*`; `.case-study-*` and `.flow-list`; `.not-found`; one `@media (max-width: 48rem)` block; a `@media (prefers-reduced-motion: reduce)` block that disables transitions.

Rules: no gradients, no shadows, no entrance animations, no serif or monospace families, no hardcoded colors outside `:root` and `.skip-link` black/white.

**Step 2: Check for dead selectors**

Run the repo's unused-class check (any selector not present in `src/**` is dead) and delete dead rules.

**Step 3: Run the build to verify CSS compiles**

Run: `npm run build`
Expected: PASS, 14 static pages.

**Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(portfolio): replace editorial theme with plain light system"
```

---

### Task 9: README and verification notes

**Files:**
- Modify: `README.md`
- Modify: `docs/portfolio-verification.md`

**Step 1: Update README**

- First paragraph: plain professional positioning, single sans theme, no editorial language.
- Routes section: homepage sections are now `positioning, projects, experience, skills, education, and contact`.
- Keep local development, validation, content model, deployment boundary, and contact sections.

**Step 2: Append a short verification note**

Add a dated follow-up section saying this pass replaces the editorial theme, lists the removed components, and records that the gate was rerun after the change.

**Step 3: Commit**

```bash
git add README.md docs/portfolio-verification.md
git commit -m "docs(portfolio): describe plain professional theme"
```

---

### Task 10: Final gate

**Step 1: Run the full gate**

```bash
npm test && npm run typecheck && npm run lint && npm run build
```

Expected: 7+ test files pass, `tsc` exit 0, ESLint exit 0 with zero warnings, build emits 14 static pages.

**Step 2: Rendered-HTML smoke check**

```bash
(npm run start -- --hostname 127.0.0.1 --port 44731 >/tmp/portfolio-plain.log 2>&1 &)
for i in $(seq 1 30); do curl -sf -o /dev/null http://127.0.0.1:44731/ && break; sleep 1; done
curl -s http://127.0.0.1:44731/ | grep -o "<title>[^<]*</title>"
curl -s http://127.0.0.1:44731/ | grep -c "worldwide"
curl -s http://127.0.0.1:44731/manifest.webmanifest
pkill -f next-server
```

Expected: title `Subhajit Pradhan | Full-Stack Product Engineer`, zero `worldwide`, manifest with white theme colors.

**Step 3: Report**

Summarize changed files, gate output, and note that `main` is untouched and nothing was pushed.
