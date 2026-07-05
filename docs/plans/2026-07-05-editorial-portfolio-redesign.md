# Editorial Portfolio Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current portfolio UI with a white, editorial, engineering-first design system.

**Architecture:** Keep the Next.js content and route structure, but replace the shared presentation layer. Use semantic HTML, CSS variables, ruled article layouts, and minimal client-side behavior.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS import with custom global CSS, Vitest, ESLint.

---

### Task 1: Update Navigation Data

**Files:**
- Modify: `src/data/site.ts`

**Steps:**
1. Replace the primary nav items with section anchors for About, Work, Case Studies, Writing, Experience, and Contact.
2. Keep existing profile, experience, skills, and machine-readable data intact.

### Task 2: Replace Home Page Composition

**Files:**
- Modify: `src/app/page.tsx`

**Steps:**
1. Keep JSON-LD and data imports.
2. Replace the hero, proof strip, card grids, and panels with editorial sections.
3. Add the required Engineering Philosophy and Case Studies sections.
4. Render selected projects as case-study article excerpts with problem, architecture, tradeoffs, metrics, timeline, tech stack, and lessons.

### Task 3: Adjust Shared Components

**Files:**
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/BlogCard.tsx`
- Modify: `src/components/SiteFooter.tsx`

**Steps:**
1. Make the header a simple sticky publication header.
2. Convert project cards into article rows while preserving links and data.
3. Convert blog cards into article rows.
4. Keep footer minimal and ruled.

### Task 4: Replace Global CSS

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Steps:**
1. Replace layered old CSS with one clean light-only system.
2. Define the required color palette and one accent.
3. Style home, index, case-study, blog, and MDX pages consistently.
4. Add accessible focus states, skip link, reduced-motion support, and mobile-specific layout.
5. Update viewport theme metadata to light only.

### Task 5: Verify

**Commands:**
- `npm run lint`
- `npm run typecheck`
- `npm run test -- --run`
- `npm run build`

**Expected Result:** Commands complete with exit code 0. If a command fails, inspect the failure and fix before reporting status.
