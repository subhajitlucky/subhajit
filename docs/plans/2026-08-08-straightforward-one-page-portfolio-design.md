# Straightforward One-Page Portfolio Design

**Date:** 2026-08-08

**Status:** Approved for implementation

## Goal

Replace the current editorial engineering-dossier presentation with a short, direct hiring page. A recruiter should see Subhajit's role, contact routes, employment, strongest work, skills, and education without navigating through marketing sections or long case studies.

The site should feel like a well-designed engineering resume on the web: honest, compact, readable, and easy to scan.

## Positioning

The primary role is:

> Full Stack Software Developer

The supporting sentence is:

> I build reliable web products, developer tools, and AI systems using TypeScript, Next.js, Python, and PostgreSQL.

Developer tooling and AI systems remain differentiators, but the page does not narrow Subhajit out of broader full-stack roles.

## One-Page Structure

The homepage contains only:

1. Name, role, supporting sentence, availability, and direct links
2. Complete employment history
3. Four strongest projects
4. Compact technical skills
5. Education
6. One concise closing contact line

The four homepage projects remain:

1. Codebase Doctor
2. RLS Doctor
3. SmritiFlow
4. Tarka Sabha

Each project uses one short description, a compact technology line, and direct source, package, or live links. Recruiters should not need to open a case study to understand the project.

Detailed project routes may remain available for search engines and deeper inspection, but the primary experience does not push visitors toward them.

## Removed Homepage Material

The redesign removes:

- The proof rail
- Engineering principles
- Problem, system, and proof summaries on every project row
- Architecture diagrams from the main experience
- Repeated contact invitations
- The large promotional footer
- Oversized project numerals
- Dramatic entrance sequencing
- Editorial slogans and abstract marketing language

## Visual Direction

- White or nearly white background
- Near-black text
- One restrained blue accent
- Sans-serif typography throughout
- Content width around 1000px
- Normal, readable headline sizes
- Light gray dividers
- Compact but comfortable vertical spacing
- No gradients, textures, large decorative shapes, or card walls
- Minimal hover and focus treatments
- No JavaScript-driven visual effects

The composition is closer to a carefully typeset resume than a creative-agency landing page.

## Header and Navigation

The header contains Subhajit's name and direct links for email, resume, GitHub, and LinkedIn. A complex navigation system is unnecessary because the core content is on one page.

The availability line remains visible near the introduction:

> Open to remote roles worldwide

## Experience Boundaries

Giakaa remains limited to:

> Giakaa Capital — Full Stack Software Developer
>
> May 2026-Present · Remote

No current-employer product, architecture, customer, metric, or internal-work description appears on the site.

Earlier roles keep their concise resume-supported summaries.

## Responsive and Accessible Behavior

- The page remains readable at 320px without horizontal scrolling.
- Links keep visible keyboard focus.
- A skip link remains available.
- Touch targets remain at least 44px where practical.
- Heading levels remain sequential.
- Links do not depend on color alone.
- Motion is limited to simple hover-state changes.

## Technical Scope

The existing Next.js App Router, typed content data, metadata, sitemap, resume asset, structured data, project routes, and tests remain. The redesign primarily simplifies homepage components, the shared shell, and global CSS.

Unused homepage components will be removed after reference checks. Project case-study routes retain readable styling but are visually simplified to match the new site.

## Verification

The implementation must pass:

- Homepage content tests
- Complete Vitest suite
- TypeScript checking
- ESLint
- Next.js production build
- React Doctor
- Desktop and 320px production-browser checks
- Visual screenshot inspection

Local verification will not be reported as deployment proof.
