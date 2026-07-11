# Proof-Led Engineering Profile Suite Redesign

**Date:** 2026-07-11
**Status:** Approved for implementation
**Scope:** Portfolio, GitHub profile/repository presentation, and resume
**Audience:** Engineering peers, open-source users, and software engineering hiring teams

## Goal

Make the portfolio, GitHub presence, and resume tell one honest, inspectable story:

> Subhajit Pradhan builds developer tools, AI systems, and full-stack products that make complex workflows easier to inspect and safer to operate.

The three surfaces should share the same project order, role language, status labels, links, and evidence. No surface should claim more than the linked source, repository, npm package, live demo, or resume supports.

## Evidence audit

### Strong evidence to foreground

- **RLS Doctor:** public repository, CLI README, CI workflow, read-only Postgres catalog inspection, npm install path, integration-test workflow, and Agent Skill.
- **SmritiFlow:** public TypeScript monorepo, CLI commands, generated repository-memory artifacts, tests, GitHub Actions publishing workflow, and Agent Skill.
- **Tarka Sabha:** public Next.js repository with 77 commits, multi-provider orchestration, configurable personas, encrypted API-key storage, and a live demo.
- **CSCosmos:** public React/Vite hub with topic data, multiple domain routes, live microsite links, search, and explicit SPA/deployment tradeoffs.
- **CampusHelper:** public full-stack application with authentication, uploads, search, claims, moderation, database access control, and API structure.
- **IntentPay:** public prototype whose strongest proof is the boundary between LLM planning, transaction validation, wallet review, and irreversible execution.

### Drift and weaknesses to fix

- The latest engineering-journal plan covers the portfolio but not the GitHub profile or resume.
- The profile README and pinned repositories still surface older work before the newest developer tools.
- `public/llms.txt`, blog relationships, and SEO documentation contain stale QuantumTicket references.
- Resume V9 is visually clean but consumes a second page for a small skills/education tail and omits RLS Doctor and SmritiFlow.
- Existing copy uses broad phrases such as “production-ready” or “enterprise-grade” where a narrower implementation claim is more credible.
- CSCosmos counts and project metrics need one explicit source of truth so they do not silently drift.

## Information architecture

### Portfolio routes

Keep the current Next.js App Router and routes:

- `/` — proof-led home and current engineering identity
- `/projects` — selected work index
- `/projects/[slug]` — case studies for six selected projects
- `/blog` and `/blog/[slug]` — technical notes aligned to the same project vocabulary
- `/assets/Subhajit_Resume.pdf` — canonical one-page resume
- `/llms.txt` — machine-readable profile generated from the same selected project set

The locked project order remains:

1. RLS Doctor
2. SmritiFlow
3. Tarka Sabha
4. CSCosmos
5. CampusHelper
6. IntentPay

`skillscan` remains a small agent-tooling footnote. QuantumTicket and assignment-toned repositories do not appear in runtime content, sitemap, profile README, resume, or selected repo links.

### GitHub profile

Update the profile repository `subhajitlucky/subhajitlucky` with a concise README that mirrors the portfolio:

1. One-line role and focus
2. Three proof pillars: developer tools, AI systems, full-stack products
3. Six selected repositories with one-line descriptions and direct links
4. Current role and working principles
5. Portfolio, resume, LinkedIn, and email links

Remove analytics images, generic stack badges, “Learning” positioning, the old Rate Limiting Visualizer emphasis, and decorative filler. Profile bio, website, location, and pinned repository order are GitHub account settings and will be recorded as a manual completion checklist.

### Selected repository READMEs

Use one README pattern for the six selected repositories:

1. What the project does
2. Why it exists
3. Evidence / current status
4. Architecture diagram or workflow
5. Quick start
6. Testing and deployment
7. Tradeoffs and roadmap
8. Portfolio case study link

The README language stays specific to the repository. It must not invent usage, adoption, release, or performance numbers.

### Resume

Create a one-page, ATS-readable resume with a source file and reproducible PDF build:

1. Header with name, role, email, GitHub, LinkedIn, portfolio
2. Short two-line summary
3. Experience: Giakaa Capital, uElement Technologies, QuadB Technologies
4. Selected engineering: RLS Doctor, SmritiFlow, Tarka Sabha, CSCosmos
5. Compact technical skills grouped by actual use
6. Education with BCA and 8.9 CGPA

The resume uses plain text headings, normal hyphens, searchable text, consistent dates, and descriptive links. It does not use icon-only contact details, a generic objective, unsupported metrics, or an empty second page.

## Visual direction

### Portfolio thesis

An open-source engineering notebook: white paper, near-black type, a single deep-teal accent, strict ruled rows, and source links treated as part of the content rather than decoration.

The current engineering-journal direction remains the base, with three improvements:

- A visible **proof rail** near the opening that links to npm, GitHub, live systems, and the resume.
- Project rows use a consistent `problem → system → proof` rhythm instead of only title, summary, and metric.
- Case studies include one concrete workflow or architecture visual, such as the RLS Doctor terminal preview or a text-based system flow.

### Motion and interaction

- Entrance: restrained identity and proof-rail reveal.
- Scroll: project rows reveal their evidence links and architecture labels as they enter the viewport.
- Interaction: link and row states use color/border transitions, with reduced-motion support.

No dark mode, glassmorphism, gradient blobs, fake dashboards, badge walls, or decorative analytics widgets.

### Shared tokens

- Background: `#FFFFFF`
- Text: `#111111`
- Muted text: `#666666`
- Rules: `#E5E5E5`
- Accent: `#0B5E55`
- Max content width: `1120px`
- Touch targets: at least `44px`
- Motion: short color/border transitions; disable nonessential motion for reduced-motion users

## Content model and data flow

Keep the existing `site.ts` and `projects.ts` modules as the canonical portfolio content model. Add only the smallest supporting structures needed for consistency:

- A human-readable evidence matrix in `docs/evidence-matrix.md` listing claim, source, link, status, and last verification date.
- A typed `surface`/`status` distinction where the UI needs to distinguish published CLI, live platform, and prototype.
- Tests that assert the selected project set, source links, resume path, canonical URLs, stale-name removal, and profile/resume alignment.
- Keep CSCosmos counts and other project-specific numbers tied to the repository README or data model; if a number cannot be re-verified, rewrite it as a qualitative claim.

The flow is:

```text
Evidence ledger + public repositories + resume facts
                |
      site.ts / projects.ts
        /        |        \
  Portfolio   llms.txt   tests
       |                     |
 GitHub README        stale-claim checks
       |
    Resume source -> one-page PDF -> visual inspection
```

## Error handling and honesty rules

- A missing demo is rendered as “Source” only; never show a dead “Live” action.
- Prototype projects display `Prototype` prominently.
- An unverified metric is removed or rewritten as a capability description.
- Broken or stale project links fail the integrity check before release.
- Historical planning documents may mention removed projects, but runtime, public machine-readable content, profile README, resume, and selected repository READMEs may not.
- External GitHub account settings that cannot be changed from repository files are reported as manual steps, not silently assumed complete.

## Implementation boundaries

### In the portfolio repository

- Rewrite the current homepage, projects index, case-study presentation, blog list styling, metadata, sitemap, `llms.txt`, and stale project relationships.
- Add the evidence matrix and integrity tests.
- Add a reproducible resume source and generated PDF under `public/assets/`.
- Preserve existing user edits in the working tree; do not reset or overwrite unrelated files.

### In the GitHub profile/repository surfaces

- Clone or edit the profile repository locally before pushing.
- Rewrite the profile README.
- Update selected repository READMEs using the shared pattern.
- Prepare account-setting changes (bio, website, pins) as a checklist; only report them complete after verification on the public profile.

## Verification plan

Portfolio:

- `npm run lint`
- `npm run typecheck`
- `npm test -- --run`
- `npm run build`
- Browser check for `/`, `/projects`, all six case studies, `/blog`, and `/assets/Subhajit_Resume.pdf`
- Mobile layout, keyboard focus, external-link targets, and reduced-motion checks

GitHub:

- Markdown/link validation for profile and selected repository READMEs
- Public profile check for bio, website, pinned order, and README rendering
- No stale project names or unsupported claims in selected profile content

Resume:

- Extract text with `pdftotext`
- Render every page with `pdftoppm`
- Visually inspect margins, line breaks, link labels, page count, and whitespace
- Confirm the PDF has one page and searchable text

## Success criteria

- A peer can identify the focus, best proof, and source links in under 30 seconds.
- The same six projects and role language appear across portfolio, GitHub, and resume.
- Every major claim has a direct inspection path.
- The resume fits one page without sacrificing readability.
- Runtime content contains no stale QuantumTicket references.
- No unsupported adoption, performance, or production claims remain.
- All required checks pass with fresh verification evidence.
