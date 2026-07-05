# Case Study Metrics Architecture Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add architecture diagrams and metrics to portfolio case-study pages so projects communicate system design and concrete proof faster.

**Architecture:** Extend the existing `Project` data model with optional `metrics` and `architectureDiagram` fields. Render those fields in the existing project detail route so every project can share one semantic, server-rendered case-study layout.

**Tech Stack:** Next.js App Router, React Server Components, TypeScript, CSS, Vitest.

---

### Task 1: Extend Project Data Model

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/data/seo.test.ts`

**Steps:**
1. Add `metrics` and `architectureDiagram` to the `Project` type.
2. Add strong metrics and architecture nodes for CSCosmos and IntentPay.
3. Add useful metrics and architecture nodes for the remaining projects.
4. Add tests that every project exposes at least three metrics and three architecture nodes.

**Verify:**
- Run `npm test -- src/data/seo.test.ts`.

### Task 2: Render Metrics And Architecture

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/globals.css`

**Steps:**
1. Render a metrics section after the hero metadata.
2. Render an architecture section after the existing workflow proof section.
3. Use semantic HTML: `section`, `dl`, `ol`, `li`.
4. Keep the layout responsive and avoid gradient/orb decoration.

**Verify:**
- Run `npm run typecheck`.
- Run `npm run build`.

### Task 3: Commit And Push

**Files:**
- Stage only the plan, project data, project page, CSS, and tests.

**Steps:**
1. Scan staged diff for sensitive/company terms.
2. Commit with `feat(portfolio): add case study metrics and diagrams`.
3. Push to GitHub.
