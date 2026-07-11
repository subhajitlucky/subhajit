# Engineering Journal Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the portfolio as a light engineering journal for peer engineers, with the locked project set (RLS Doctor, SmritiFlow, Tarka Sabha, CSCosmos featured; CampusHelper + IntentPay selected; skillscan footnote; QuantumTicket removed).

**Architecture:** Keep Next.js App Router, static data modules (`site.ts`, `projects.ts`), and existing metadata/JSON-LD helpers. Replace homepage and project list presentation with ruled journal rows; tighten CSS tokens to the approved design; remove QuantumTicket and add skillscan as non-case-study footnote data.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4 (via `globals.css` tokens), Vitest

**Design doc:** `docs/plans/2026-07-11-engineering-journal-portfolio-design.md`

---

### Task 1: Lock project data model and remove QuantumTicket

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/data/seo.test.ts`
- Test: `src/data/seo.test.ts`

**Step 1: Write failing / update tests for locked set**

In `src/data/seo.test.ts`, add/adjust:

```ts
it('uses the locked peer-focused project set', () => {
  const slugs = projects.map((p) => p.slug);
  expect(slugs).toEqual([
    'rls-doctor',
    'smritiflow',
    'tarka-sabha',
    'cscosmos',
    'campushelper',
    'intentpay',
  ]);
  expect(slugs).not.toContain('quantumticket');
});
```

Keep slug uniqueness and inspection evidence tests. Adjust the blockchain/full-stack tag test so it still passes with IntentPay (or CSCosmos tags) and CampusHelper — do not require QuantumTicket.

**Step 2: Run test to verify it fails (or fails on QuantumTicket still present)**

Run: `npm test -- --run src/data/seo.test.ts`

Expected: FAIL until QuantumTicket removed and order/set match.

**Step 3: Update projects data**

In `src/data/projects.ts`:

1. Delete the entire QuantumTicket object.
2. Reorder array to: `rls-doctor`, `smritiflow`, `tarka-sabha`, `cscosmos`, `campushelper`, `intentpay`.
3. Ensure IntentPay `status` is `Prototype` (or equivalent honest label).
4. Optionally add `tier?: 'featured' | 'selected'` if useful for UI; otherwise compute tiers by slug lists in pages.
5. Tighten any hype language in oneLines/descriptions while preserving architecture facts.

**Step 4: Run tests**

Run: `npm test -- --run src/data/seo.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add src/data/projects.ts src/data/seo.test.ts
git commit -m "feat(portfolio): lock peer project set and remove QuantumTicket"
```

---

### Task 2: Site config, skillscan footnote, peer-facing copy

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/data/seo.test.ts` (if profile assertions change)

**Step 1: Extend site data**

In `src/data/site.ts`:

1. Update `role` / `description` / `profileSummary` for peers: developer tools, multi-agent systems, production web — evidence-led, no recruiter spam keywords pile-on (trim blockchain SEO keyword spam if present).
2. Update `nav` to: Work (`/#projects` or `/projects`), Experience (`/#experience`), Writing (`/blog`), Contact (`/#contact`).
3. Add footnote export:

```ts
export const toolFootnotes = [
  {
    title: 'skillscan',
    oneLine:
      'Single-skill repo that inspects a project for agent-skills packaging signals.',
    github: 'https://github.com/subhajitlucky/skillscan',
  },
] as const;
```

4. Keep experience aligned with Resume V9 (Giakaa, uElement, QuadB, BCA 8.9).
5. Ensure `resumePath` remains `/assets/Subhajit_ResumeV9.pdf`.
6. Ensure `machineReadableProfile.projects` only includes remaining projects.

**Step 2: Assert no QuantumTicket and GitHub present**

```ts
it('exposes skillscan as footnote tooling, not a full project', () => {
  expect(toolFootnotes.some((t) => t.title === 'skillscan')).toBe(true);
  expect(projects.every((p) => p.slug !== 'skillscan')).toBe(true);
});
```

**Step 3: Run tests**

Run: `npm test -- --run src/data/seo.test.ts`

Expected: PASS

**Step 4: Commit**

```bash
git add src/data/site.ts src/data/seo.test.ts
git commit -m "feat(portfolio): peer-facing site config and skillscan footnote"
```

---

### Task 3: Journal CSS tokens and base layout

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Align design tokens**

Set:

```css
:root {
  color-scheme: light;
  --bg: #ffffff;
  --text: #111111;
  --muted: #666666;
  --line: #e5e5e5;
  --accent: #0b5e55;
  --accent-ink: #ffffff;
  --max: 1120px;
  --transition: 150ms ease;
}
```

**Step 2: Replace marketing patterns with journal patterns**

Implement/adjust classes used by pages:

- `.site-header` — sticky, solid white, 1px bottom border, no blur
- `.home-hero` — typography-led, not split dark marketing panels
- `.proof-row` — ruled fact cells
- `.work-list` / `.work-row` — full-width ruled project rows
- `.home-section` — numbered/kicker + heading spacing
- `.experience-list`, `.skill-list`, `.contact-cta`
- `.footnote-row` for skillscan
- Case study page classes already used under `src/app/projects/[slug]/page.tsx` — ensure they use tokens, not glow

Remove or neutralize unused glass/glow utilities if present.

**Step 3: Visual sanity**

Run: `npm run dev` and open `/` (or build if preferred).

Expected: white page, teal accent links, ruled rows, no dark hero.

**Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "style(portfolio): engineering journal tokens and layout"
```

---

### Task 4: Header and footer for journal chrome

**Files:**
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`

**Step 1: Header actions**

- Brand → home
- Nav from `siteConfig.nav`
- Actions: Resume + GitHub (Email can stay in contact section; design allows Resume · GitHub)

```tsx
<a href={siteConfig.links.github} rel="noreferrer" target="_blank">GitHub</a>
<Link href={siteConfig.resumePath}>Resume</Link>
```

**Step 2: Footer**

Name, short role line, email, GitHub, LinkedIn, Projects, Blog. No QuantumTicket references.

**Step 3: Commit**

```bash
git add src/components/SiteHeader.tsx src/components/SiteFooter.tsx
git commit -m "feat(portfolio): journal header and footer chrome"
```

---

### Task 5: Rebuild homepage for peer scan path

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Structure home per design**

1. Identity + pitch + Email / Resume / GitHub
2. Proof strip (2 CLIs, featured count, case study count)
3. Featured work rows for slugs: `rls-doctor`, `smritiflow`, `tarka-sabha`, `cscosmos`
4. Also built: `campushelper`, `intentpay`
5. Footnote: map `toolFootnotes`
6. Experience, skills, writing (≤3 posts), contact
7. Keep JSON-Ld components; ensure project list excludes QuantumTicket

**Step 2: Row markup pattern**

```tsx
<article className="work-row">
  <div>
    <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
    <p className="meta">{project.status} / {project.year}</p>
  </div>
  <p>{project.oneLine}</p>
  <strong>{project.metrics[0]?.value}</strong>
  <nav aria-label={`${project.title} links`}>
    <Link href={`/projects/${project.slug}`}>Case study</Link>
    <a href={project.github} rel="noreferrer" target="_blank">Source</a>
    {project.demo ? (
      <a href={project.demo} rel="noreferrer" target="_blank">Demo</a>
    ) : null}
  </nav>
</article>
```

**Step 3: Typecheck**

Run: `npm run typecheck`

Expected: PASS

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(portfolio): rebuild peer-focused journal homepage"
```

---

### Task 6: Projects index as ruled list

**Files:**
- Modify: `src/app/projects/page.tsx`
- Modify or retire usage: `src/components/ProjectCard.tsx` (prefer work-row list over cards)

**Step 1: Replace card grid with journal index**

- Intro copy: case studies with architecture and tradeoffs
- Map `projects` in locked order as work rows
- Append skillscan footnote section
- Update metadata description to peer-facing language

**Step 2: Typecheck + tests**

Run: `npm run typecheck && npm test -- --run`

Expected: PASS

**Step 3: Commit**

```bash
git add src/app/projects/page.tsx src/components/ProjectCard.tsx
git commit -m "feat(portfolio): journal projects index with skillscan footnote"
```

---

### Task 7: Case study pages — depth by tier

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`

**Step 1: Ensure generateStaticParams uses remaining projects only**

QuantumTicket slug must not be generated.

**Step 2: Featured vs selected presentation**

- Featured slugs: full sections (problem, architecture, decisions, tradeoffs, metrics, stack, inspection)
- Selected (`campushelper`, `intentpay`): shorter layout still using existing fields but fewer visual chrome blocks
- IntentPay must show Prototype status prominently

**Step 3: Remove any QuantumTicket-specific UI branches**

**Step 4: Typecheck**

Run: `npm run typecheck`

Expected: PASS

**Step 5: Commit**

```bash
git add src/app/projects/[slug]/page.tsx
git commit -m "feat(portfolio): tiered case study pages for locked set"
```

---

### Task 8: Blog list visual alignment + SEO/sitemap cleanup

**Files:**
- Modify: `src/app/blog/page.tsx` (list styling only if needed)
- Modify: `src/app/sitemap.ts` / `src/app/sitemap.test.ts` if project slugs are asserted
- Modify: `public/llms.txt` if it lists QuantumTicket
- Grep for `quantumticket` / `QuantumTicket` and clean leftovers

**Step 1: Grep**

Run: `rg -n "quantumticket|QuantumTicket" --glob '!docs/**' --glob '!output/**' --glob '!node_modules/**'`

Expected: no runtime/content hits outside historical docs (optional: leave plans as history).

**Step 2: Fix any remaining hits in src/public**

**Step 3: Align blog index rows to journal list if cards remain**

**Step 4: Tests**

Run: `npm test -- --run && npm run typecheck`

Expected: PASS

**Step 5: Commit**

```bash
git add src public
git commit -m "chore(portfolio): remove QuantumTicket leftovers and align blog list"
```

---

### Task 9: Full verification and polish

**Files:** any residual fixes

**Step 1: Production build**

Run: `npm run build`

Expected: success; routes for 6 projects only

**Step 2: Lint**

Run: `npm run lint`

Expected: 0 warnings/errors

**Step 3: Manual checklist**

- [ ] Home shows 4 featured + 2 selected + skillscan footnote
- [ ] No QuantumTicket anywhere on site
- [ ] Resume link opens V9 PDF
- [ ] GitHub links to `subhajitlucky`
- [ ] Case studies: RLS Doctor, SmritiFlow, Tarka Sabha, CSCosmos are deep
- [ ] IntentPay labeled Prototype
- [ ] Mobile: header and work rows readable

**Step 4: Final commit if polish needed**

```bash
git add -A
git commit -m "fix(portfolio): polish engineering journal rebuild"
```

---

## Out of scope (YAGNI)

- Dark mode
- New framework / CMS
- Full case study for skillscan
- Re-adding QuantumTicket
- Listing individual CSCosmos microsites as separate projects
- Recruiter-optimized keyword stuffing

## Execution handoff

After this plan is saved, choose:

1. **Subagent-Driven (this session)** — implement task-by-task with review between tasks  
2. **Parallel Session** — run executing-plans in a separate session  

Prefer subagent-driven if continuing here.
