# CSCosmos Portfolio Proof Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve CSCosmos enough to be a credible portfolio project, then add it to the main portfolio as a case study.

**Architecture:** CSCosmos stays a Vite React SPA, but gains stronger static discovery files and clearer project proof. The portfolio continues using its existing data-driven project model, so adding CSCosmos updates the project index, case-study route, sitemap, JSON-LD, machine-readable profile, and `llms.txt` through existing flows.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Next.js App Router, static public assets, Vitest.

---

### Task 1: Improve CSCosmos AI/SEO Discovery

**Files:**
- Modify: `/home/subhajit/project/cscosmos/index.html`
- Create: `/home/subhajit/project/cscosmos/public/robots.txt`
- Create: `/home/subhajit/project/cscosmos/public/sitemap.xml`
- Create: `/home/subhajit/project/cscosmos/public/llms.txt`

**Steps:**
1. Add canonical, robots, OpenGraph, Twitter card, theme color, and JSON-LD metadata to `index.html`.
2. Add `robots.txt` that allows all crawlers and points to the sitemap.
3. Add `sitemap.xml` with homepage, topics, about, and the eight domain routes.
4. Add `llms.txt` summarizing CSCosmos, live topic count, repo, domains, and selected live microsites.

**Verify:**
- Run `npm ci` if dependencies are missing.
- Run `npm run build`.

### Task 2: Upgrade CSCosmos README Proof

**Files:**
- Modify: `/home/subhajit/project/cscosmos/README.md`

**Steps:**
1. Add proof metrics: 172 topics, 34 live microsites, eight domains.
2. Document architecture, data model, routing, and deployment behavior.
3. Add portfolio-friendly explanation of the product tradeoffs and roadmap.

**Verify:**
- Read the rendered markdown structure with `sed`.

### Task 3: Add CSCosmos To Portfolio Project Model

**Files:**
- Modify: `/home/subhajit/project/subhajit/src/data/projects.ts`
- Modify: `/home/subhajit/project/subhajit/public/llms.txt`

**Steps:**
1. Add CSCosmos as a project case study with problem, workflow, architecture, decisions, tradeoffs, inspection links, SEO keywords, and live demo.
2. Place it near the top because it is a strong platform-style project and the user likes it.
3. Add CSCosmos to `public/llms.txt`.

**Verify:**
- Run focused project/sitemap/SEO tests.
- Run `npm run build`.

### Task 4: Commit And Push Scoped Changes

**Files:**
- Stage only touched files in `/home/subhajit/project/cscosmos`.
- Stage only touched files in `/home/subhajit/project/subhajit`.

**Steps:**
1. Scan staged diffs for sensitive terms.
2. Commit CSCosmos changes in its repo.
3. Push CSCosmos.
4. Commit portfolio changes in the portfolio repo.
5. Push portfolio.

**Verify:**
- Confirm no unrelated dirty files were staged.
