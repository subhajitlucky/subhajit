# Developer Tools and AI Systems Portfolio Design

**Date:** 2026-08-08
**Status:** Approved for implementation
**Audience:** Hiring managers and engineering teams recruiting for remote developer-tools, AI-systems, and adjacent full-stack roles

## Goal

Build a fresh Next.js portfolio that positions Subhajit Pradhan as a developer-tools and AI-systems engineer with credible full-stack range.

The site should let a hiring manager answer four questions quickly:

1. What kind of engineer is Subhajit?
2. What are the strongest systems he has built?
3. Where can the work be inspected?
4. How can a recruiter contact him?

The portfolio will prefer inspectable evidence over broad claims. GitHub repositories, npm packages, live applications, tests, documented architecture, and explicit project status are the primary proof.

## Positioning

The opening statement is:

> I build developer tools and AI systems that make complex software easier to inspect, operate, and trust.

Supporting profile details:

- Role: Developer Tools / AI Systems Engineer
- Location: Odisha, India
- Availability: Open to remote roles worldwide
- Supporting capability: Full-stack product engineering

The site will not imply US work authorization, relocation availability, unsupported production scale, adoption, or performance results.

## Employment Boundaries

The current role will use only the approved minimal presentation:

> Giakaa Capital - Full Stack Software Developer
>
> May 2026-Present - Remote

The portfolio will not describe Hema AI, company architecture, customers, internal metrics, incidents, providers, roadmaps, screenshots, source code, or unreleased work.

Previous roles may use concise responsibilities supported by the resume:

- uElement Technologies - Software Developer Intern
- QuadB Technologies - Software Engineering Trainee

## Information Architecture

### `/`

The homepage contains:

1. A direct role statement and availability
2. Primary actions for selected work, resume, email, and GitHub
3. A compact proof rail linking to public repositories, packages, and live work
4. Four featured projects
5. A concise experience timeline
6. Engineering principles and technical strengths
7. Education
8. A direct hiring-focused contact section

### `/projects`

A complete selected-work index containing the featured projects plus secondary work. Projects are organized by relevance rather than repository creation date.

### `/projects/[slug]`

Each featured project receives a case study with:

1. Problem
2. System
3. Proof
4. Architecture or workflow
5. Important decisions
6. Tradeoffs and limitations
7. Technologies
8. Source, package, or live links

### `/resume.pdf`

A stable downloadable resume path. The canonical PDF will be copied from the user-provided resume after content verification.

## Project Selection

Featured homepage order:

1. Codebase Doctor
2. RLS Doctor
3. SmritiFlow
4. Tarka Sabha

Secondary project index:

5. CSCosmos
6. Sutra

Project creation dates will not be displayed. Each project will instead show an accurate status such as published CLI, open-source tool, or live application.

The content must distinguish shipped behavior from roadmap ideas. Missing demos will not produce dead live links. No project will use invented user counts, performance improvements, revenue, adoption, or download numbers.

## Visual Direction

The visual thesis is a refined engineering dossier: editorial enough to be memorable and technical enough to feel native to the work.

### Palette

- Paper: warm off-white
- Ink: near black
- Secondary text: warm graphite
- Rules: muted stone
- Accent: signal orange

The accent is used deliberately for active links, evidence markers, focus states, and selected diagram details.

### Typography

- Editorial serif for major headlines
- Precise sans serif for interface and body copy
- Monospace for labels, statuses, repository paths, and diagram annotations

Typography should create hierarchy without oversized decorative text that delays access to the work.

### Composition

- Twelve-column desktop grid
- Strong horizontal rules
- Oversized project numbers
- Margin notes and restrained asymmetry
- Generous negative space
- Compact layouts on mobile without removing evidence

The repeated case-study motif is `Problem -> System -> Proof`.

### Motion

- Restrained entrance sequence for the opening identity and proof rail
- Line-drawing or reveal motion for system flows
- Small border, offset, and color changes for interactive states
- No scroll hijacking or cursor replacement
- All nonessential motion disabled under `prefers-reduced-motion`

The site will not use glassmorphism, gradient blobs, badge walls, skill-percentage bars, fake terminal windows, or generic dashboard cards.

## Technical Architecture

- Next.js App Router
- TypeScript with strict checking
- Server Components by default
- Client Components only where navigation or motion requires browser state
- Local typed data modules for site, experience, and project content
- CSS variables for design tokens
- `next/font` for optimized typography
- `next/image` for any raster imagery

The content flow is:

```text
Verified resume and public repositories
                  |
        typed site/project data
         /          |          \
   homepage     project pages   metadata
         \          |          /
          tests and link checks
```

No database, CMS, analytics dependency, or contact-form backend is required for the first release.

## Components

The build will use a small component set:

- Site header and mobile navigation
- Hero and proof rail
- Project dossier row/card
- Experience timeline
- Engineering-principles section
- Contact panel
- Site footer
- Case-study header
- Problem/System/Proof sequence
- Architecture flow
- Evidence links
- Project navigation

Components should remain composable and content-driven. Decorative abstractions that are used once are unnecessary.

## Error Handling and Integrity

- Unknown project slugs return the custom 404 page.
- A project action renders only when its URL exists.
- External links use safe target and relationship attributes.
- Unsupported or unverified claims are removed rather than softened into ambiguous marketing copy.
- Empty optional sections are omitted cleanly.
- Contact actions use direct email and LinkedIn links, avoiding form-delivery failure states.

## Metadata and Discovery

The site includes:

- Route-specific titles and descriptions
- Canonical URLs
- Open Graph and social images
- Sitemap
- Robots metadata
- Web manifest and favicon
- Person and project structured data

Copy will be written for humans first while retaining clear developer-tools, AI-systems, TypeScript, Next.js, PostgreSQL, and open-source vocabulary.

## Accessibility and Responsive Behavior

- Semantic landmarks and heading order
- Visible keyboard focus
- Minimum 44px touch targets where practical
- Sufficient color contrast
- Skip link
- Keyboard-operable navigation
- Reduced-motion support
- Responsive layouts from small phones through wide screens
- No essential meaning conveyed by color or motion alone

## Verification

Implementation is complete only after fresh evidence from:

- ESLint
- TypeScript
- Focused unit tests for project data, metadata, links, and sitemap behavior
- Production build
- React diagnostics
- Browser checks on the homepage, project index, all case studies, resume, and 404 page
- Mobile and desktop viewport checks
- Keyboard navigation and visible-focus checks
- Reduced-motion check
- Broken-link and missing-action review

Local checks prove the source and build, not a deployed production outcome. Deployment and live-domain verification will be reported separately if performed.

## Success Criteria

- A hiring manager understands the target role and strongest proof in under 30 seconds.
- The first screen includes role, availability, selected-work access, resume, and contact.
- Every featured project has an inspectable public evidence path.
- Current employment details remain within the approved confidentiality boundary.
- The site feels deliberately designed rather than template-generated.
- Mobile, keyboard, reduced-motion, type, lint, test, and production-build checks pass.
