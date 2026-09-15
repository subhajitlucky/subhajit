# Plain Professional Portfolio Design

**Date:** 2026-09-15

**Status:** Approved for implementation

## Goal

Replace the warm editorial portfolio with a plain, conventional one-page developer portfolio for remote full-stack product engineering roles. The site should look like a normal, well-built personal site — not a designed artifact — while keeping the evidence-led content that distinguishes it.

This is a full rework: structure, copy, and visual theme all change. Routes, the typed content model, discovery metadata, and the case-study depth are preserved.

## Content Structure

The homepage follows a standard recruiter reading order:

1. Header — name and direct links: Email, Resume, GitHub, LinkedIn
2. Hero — name, role, one plain sentence, availability ("Open to remote roles")
3. Projects — four featured projects as simple cards in a responsive grid, plus a link to the full index
4. Experience — role, company, dates, and at most one plain line per role
5. Skills — three grouped lists: Product engineering, Backend and data, AI and developer tools
6. Education — one compact block
7. Contact — short "Get in touch" section with an email action and profile links
8. Footer — name, location, availability

Supporting routes are unchanged:

- `/projects` — complete six-project index
- `/projects/[slug]` — case studies with the same seven sections (Problem, System, Proof, Architecture, Decisions, Tradeoffs and limitations, Technologies)
- `/resume.pdf`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`

## Copy Rules

- Short, plain sentences. No editorial framing, no numbered eyebrows, no marketing adjectives.
- Every factual claim, decision, and limitation in the current project data is preserved; nothing new is claimed.
- Current employment stays at company, title, date, and location level.
- No unsupported adoption, scale, or performance claims.

## Visual Direction

The direction is **Plain Professional**:

- Light only: white canvas `#ffffff`, near-black text `#111827`, muted gray `#6b7280`, hairline borders `#e5e7eb`, one blue accent `#2563eb` for links and focus rings
- One sans typeface: Geist, falling back to IBM Plex Sans and system sans; no serif, no monospace labels
- Centered container at 72rem, generous but simple vertical rhythm, one consistent spacing scale
- Project cards: 1px border, 8px radius, no shadows, no gradients, no decorative illustration
- Tech names as plain comma-separated text or minimal tags, not badge collections
- Motion limited to hover and focus feedback; no entrance animations

## Responsive and Accessible Behavior

- Single-column layout below 48rem; project grid collapses from two columns to one
- No horizontal scrolling at 320px
- Visible skip link, strong `:focus-visible` outline in the accent color
- Semantic heading order, descriptive link labels, 44px minimum touch targets for actions
- `prefers-reduced-motion` respected (no non-essential animation exists)
- Readable contrast for text, muted text, borders, and links

## Technical Approach

- Keep the Next.js App Router, typed content in `src/data`, metadata helpers, structured data, sitemap, robots, manifest, and generated OG image
- Rewrite `src/app/globals.css` around new design tokens; no UI framework, no animation dependency
- Simplify components: add `ProjectCard` and `TagList`; remove `SectionLabel`, `EvidenceLinks`, `ArchitectureFlow`, and `ProjectNavigation`, folding their content into plain page markup
- Rewrite page components and tests to the new structure and copy
- Work on `feat/plain-professional-portfolio`; `main` stays untouched until review

## Verification

The implementation must pass:

- Complete Vitest suite
- `tsc --noEmit`
- ESLint with zero warnings
- Next.js production build
- Rendered-HTML spot checks of the changed copy, metadata, and discovery assets

Local verification proves the repository state only; it does not prove deployment.
