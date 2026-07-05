# Editorial Portfolio Redesign Design

## Audit

The portfolio already has strong structured content: projects include problem framing, architecture, decisions, tradeoffs, metrics, stack, proof, and source links. The implementation is a Next.js app with shared components and route-level pages for home, projects, and writing.

The existing UI should be replaced because it mixes dark mode, glass-style navigation, glow variables, card grids, rounded panels, and layered CSS overrides. Those patterns conflict with the requested editorial, engineering-first identity.

## Remove

- Dark mode and color-scheme branching.
- Glassmorphism, backdrop blur, glow variables, hover lifts, and decorative motion.
- Floating rounded navigation.
- Project cards as the primary project pattern.
- Pill-like labels, tag-heavy presentation, and generic product-section layouts.
- Layered CSS overrides that make the visual system hard to reason about.

## Direction

Use an editorial engineering journal layout: white background, near-black text, restrained gray metadata, one accent color, strict ruled rows, and typography-led hierarchy. Projects should read like published case-study excerpts instead of cards.

## Wireframe

Desktop:

```text
Sticky Nav
Name                 About Work Case Studies Writing Experience Contact

Home
Status line
Subhajit Pradhan
Role and concise proof-led summary
Primary actions
Ruled facts row

About
01 About
Editorial copy + evidence list

Selected Work
02 Selected Work
Project article excerpts with problem, architecture, tradeoffs, metrics,
timeline, stack, and lessons

Case Studies
03 Case Studies
Compact index linking to all project pages

Engineering Philosophy
04 Engineering Philosophy
Short principles in ruled rows

Writing
05 Writing
Article rows

Experience
06 Experience
Ruled timeline rows

Skills
07 Skills
Compact grouped taxonomy

Contact
08 Contact
Recruiter-focused close
```

Mobile:

```text
Sticky compact header
Name
Scrollable/wrapped nav

Intro
Name, role, concise summary, actions
Stacked facts

Sections become numbered chapters.
Project excerpts become single-column case-study articles.
Touch targets remain at least 44px.
```

## Design System

- Background: `#FFFFFF`
- Text: `#111111`
- Secondary text: `#666666`
- Borders: `#E5E5E5`
- Accent: `#0B5E55`
- Radius: `0` to `4px`, used sparingly
- Typography: existing performant Next fonts, with typography and whitespace doing most of the visual work
- Grid: mobile-first, `1120px` max width, strict ruled rows on desktop
- Motion: fast color and border transitions only, disabled under `prefers-reduced-motion`

## UX Decisions

The first screen should communicate role, focus, availability, and proof without a marketing hero. Project sections prioritize engineering judgment: problem, architecture, tradeoffs, metrics, timeline, stack, and lessons. Navigation is sticky and plain so recruiters can move quickly. The design uses content hierarchy, alignment, and spacing as the premium signal.
