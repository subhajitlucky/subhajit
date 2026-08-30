# Minimal Product Engineer Portfolio Design

**Date:** 2026-08-30

**Status:** Approved for implementation

## Goal

Create an entirely new, memorable portfolio for remote full-stack product engineering roles. The page must feel globally competitive and carefully designed while remaining exceptionally short, direct, and easy to scan.

## Positioning

The primary role is:

> Full-Stack Product Engineer

The supporting sentence is:

> I build reliable web products and AI-powered systems from interface to infrastructure.

Availability is expressed simply as:

> Open to remote roles

Developer tooling, AI systems, backend engineering, and security remain differentiators rather than competing job titles.

## Experience Structure

The homepage follows a recruiter-first reading order:

1. A concise hero with name, role, one-sentence value proposition, availability, and direct contact links
2. Four selected projects with short outcome-led descriptions, compact technology labels, and proof links
3. A minimal employment timeline
4. Three focused capability groups
5. Compact education and contact details

The selected homepage projects are:

1. Codebase Doctor
2. RLS Doctor
3. Tarka Sabha
4. CSCosmos

Project case-study routes remain available as secondary technical evidence. The homepage must communicate enough value without requiring navigation.

## Content Rules

- Hero copy is limited to one supporting sentence.
- Each project receives no more than two short descriptive lines.
- Each role is summarized in no more than one line when a public description is supportable.
- Skills are grouped under Product Engineering, Backend and Data, and AI and Developer Tools.
- Avoid essays, architecture diagrams, testimonials, counters, repeated calls to action, and ornamental filler.
- Use only claims supported by the repository, public packages, live applications, the existing resume, or public GitHub data.

## Visual Direction

The direction is **Quiet Product Engineer**: warm, precise, restrained, and unmistakably crafted.

- Warm off-white canvas with near-black text and one muted green accent
- A characterful serif for high-impact display text paired with a clear sans-serif for interface and body copy
- Generous negative space, thin rules, and strong typographic proportion
- A mostly left-aligned composition with an intentionally narrow reading measure
- Project rows rather than a generic card grid
- Small CSS-led entrance and hover transitions that respect reduced-motion preferences
- No gradients, glass panels, oversized badge collections, stock illustrations, or decorative technology logos

The site should be memorable because of its restraint, composition, typography, and interaction details—not because it contains more material.

## Responsive and Accessible Behavior

- Preserve a visible skip link and strong keyboard focus states.
- Use semantic heading order and descriptive link labels.
- Maintain comfortable touch targets without visually inflating the interface.
- Avoid horizontal scrolling at 320px.
- Recompose project and experience rows cleanly for narrow screens.
- Respect `prefers-reduced-motion`.
- Preserve readable contrast for text, muted text, rules, and the green accent.

## Technical Approach

- Keep the existing Next.js App Router, typed content model, project routes, metadata, sitemap, structured data, resume asset, and tests.
- Rebuild the homepage and shared header/footer presentation.
- Rewrite public site copy and featured-project selection around the approved positioning.
- Implement the new visual system in CSS without adding a UI framework or animation dependency.
- Preserve resilient external links and server-rendered content.
- Do not deploy, edit the GitHub profile, or rewrite the resume as part of this redesign.

## Verification

The implementation must pass:

- Focused content and component tests
- Complete Vitest suite
- TypeScript checking
- ESLint with zero warnings
- Next.js production build
- React Doctor
- Desktop and 320px browser checks
- Keyboard and reduced-motion inspection
- Final screenshot review for hierarchy, spacing, overflow, and unintended visual regressions

Local verification proves the repository state only; it does not prove deployment.
