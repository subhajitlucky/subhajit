# Engineering Journal Portfolio Redesign

**Date:** 2026-07-11  
**Status:** Approved  
**Audience:** Engineering peers / open source  
**Visual approach:** Engineering journal (light editorial, ruled rows, one accent)

## Goals

Rebuild the portfolio so peer engineers can answer in under 30 seconds:

1. What Subhajit builds (developer tools, multi-agent systems, production web)
2. Where the strongest proof is (CLIs, live systems, source)
3. How to inspect architecture and tradeoffs

Evidence sources only: Resume V9 (`public/assets/Subhajit_ResumeV9.pdf`) and public GitHub (`https://github.com/subhajitlucky`). No weak or assignment-toned projects without explicit owner approval.

## Locked project set

| Tier | Projects | Treatment |
|------|----------|-----------|
| Featured case studies | RLS Doctor, SmritiFlow, Tarka Sabha, CSCosmos | Full case study pages |
| Selected work | CampusHelper, IntentPay | Shorter case study pages |
| Footnote | skillscan | Home + projects index only; no full case study |
| Removed | QuantumTicket | Delete from data, routes, sitemap, and links |

### Why this set

- **RLS Doctor** — npm-published Postgres/Supabase RLS CLI, CI, tests, Agent Skill
- **SmritiFlow** — living repository memory CLI for coding agents, monorepo, tests, Agent Skill
- **Tarka Sabha** — multi-agent debate platform, live, provider routing, encrypted credentials
- **CSCosmos** — CS education hub; owns the microsite constellation (do not list individual viz repos as portfolio projects)
- **CampusHelper** — full-stack lost-and-found on resume; auth, uploads, Postgres
- **IntentPay** — AI intent planning vs wallet execution boundary; label as Prototype
- **skillscan** — small agent-skills inspector; footnote under agent tooling

### Explicitly excluded

Assignment/task repos (`rls_guard_dog`, `factual`, `lead_score_asgmnt`), hype or incomplete product shells, cultural non-SE sites, MERN learning projects, and standalone `*viz` / `*cosmos` microsites (folded into CSCosmos).

## Information architecture

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Peer-facing home |
| `/projects` | Index of selected work + skillscan footnote |
| `/projects/[slug]` | Case studies for featured + selected only |
| `/blog`, `/blog/[slug]` | Existing notes; journal-row list styling |
| Resume | `/assets/Subhajit_ResumeV9.pdf` |

### Home chapter order

1. Identity — name, role, one honest sentence
2. Proof strip — published CLIs, featured systems, live demos with source
3. Featured work (4 article rows) — RLS Doctor → SmritiFlow → Tarka Sabha → CSCosmos
4. Also built (2 compact rows) — CampusHelper · IntentPay
5. Agent tooling footnote — skillscan
6. Experience — Giakaa → uElement → QuadB → BCA (resume-aligned)
7. Skills — compact taxonomy from resume
8. Writing — up to 3 recent notes
9. Contact — email, GitHub, LinkedIn, resume

### Navigation

`Work` · `Experience` · `Writing` · `Contact` plus actions `Resume` · `GitHub`.

Sticky solid white header with 1px bottom border. No floating glass nav.

## Visual system

### Principles

- Typography and whitespace carry hierarchy
- One accent for links, primary actions, and focus
- Ruled rows instead of card grids and glow
- No dark mode, glassmorphism, or marketing mega-hero for v1

### Tokens

| Token | Value |
|-------|--------|
| Background | `#FFFFFF` |
| Text | `#111111` |
| Muted | `#666666` |
| Border | `#E5E5E5` |
| Accent | `#0B5E55` |
| Max width | `1120px` |
| Radius | `0–4px` (buttons/inputs only) |
| Motion | ~150ms color/border; respect `prefers-reduced-motion` |

### Layout patterns

- **Work row:** title · status/year · one-line thesis · primary metric · Case study / Source / Demo
- **Proof strip:** horizontal facts on desktop; stacked on mobile
- **Experience:** period · organization · title
- **Case study:** title block → problem → architecture → decisions/tradeoffs → metrics → stack → inspection links

### Mobile

Single column, ≥16px padding, touch targets ≥44px, work rows stack cleanly.

## Content rules

1. Claims must map to resume and/or public GitHub (or verified npm/live URLs).
2. No hype language or emoji marketing banners.
3. Honest status labels (`Published CLI`, `Live platform`, `Prototype`).
4. Featured case studies include tradeoffs.
5. QuantumTicket removed everywhere.
6. skillscan is footnote-only.
7. CSCosmos is the sole home for the microsite constellation.

## Page specs

### Home `/`

Identity, pitch, Email/Resume/GitHub, proof strip, featured rows, also-built rows, skillscan footnote, experience, skills, writing, contact.

### Projects `/projects`

Same tier order as home. Full index with links. skillscan muted at bottom.

### Case study `/projects/[slug]`

**Featured (full):** problem, users, architecture, decisions, tradeoffs, next, metrics, stack, inspection links.

**Secondary (shorter):** CampusHelper and IntentPay — problem, what shipped, stack, proof, links. IntentPay labeled Prototype.

Reuse and tighten existing `projects.ts` content; remove QuantumTicket.

### Blog

Keep MDX engine; align list UI to journal rows.

### SEO / machine-readable

Update `site.ts` description and keywords toward developer tools and systems (less generic SEO spam). Keep JSON-LD helpers; project lists must match the locked set. Sitemap excludes QuantumTicket.

## Success criteria

- Peer can identify best proof and source links in under 30 seconds
- Every featured project has source + honest status
- Visual system is light, ruled, single accent
- Site never contradicts resume or GitHub
- No weak/assignment projects appear without explicit approval

## Implementation notes (for plan)

- Keep Next.js App Router, Vitest, existing metadata helpers
- Primary touchpoints: `src/data/site.ts`, `src/data/projects.ts`, `src/app/page.tsx`, `src/app/projects/**`, `src/components/*`, `src/app/globals.css`
- Rewrite UI to journal system; do not introduce a new framework
- Update tests that assert project counts, slugs, or SEO strings
- Commit frequently with conventional messages

## Decisions log

| Decision | Choice |
|----------|--------|
| Audience | Engineering peers (B) |
| Visual approach | Engineering journal (1) |
| Featured | RLS Doctor, SmritiFlow, Tarka Sabha, CSCosmos |
| Selected | CampusHelper, IntentPay |
| Footnote | skillscan |
| Removed | QuantumTicket |
| Accent | `#0B5E55` |
| Theme | Light only for v1 |
