# Next SEO Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the portfolio to a premium Next.js, TypeScript, Tailwind, App Router, MDX portfolio optimized for recruiter conversion and Google ranking.

**Architecture:** Replace the Vite SPA with a static-first Next.js App Router app. Typed data modules feed server-rendered homepage, project pages, and MDX blog pages with dynamic metadata and JSON-LD.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, MDX, Vitest, Testing Library, Vercel.

---

### Task 1: Framework Migration

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Modify: `eslint.config.js`
- Delete obsolete Vite entry files after replacement.

**Steps:**
1. Install Next.js, React 19, TypeScript, Tailwind CSS, Framer Motion, MDX, and test support.
2. Replace Vite scripts with Next scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test`.
3. Add Next config with MDX page extensions.
4. Run `npm run lint` and expect framework setup issues to be visible before app files are migrated.
5. Commit: `chore: migrate tooling to next`.

### Task 2: Typed Content Model

**Files:**
- Create: `src/data/site.ts`
- Create/Modify: `src/data/projects.ts`
- Create: `src/data/blog.ts`
- Create: `content/blog/*.mdx`
- Create tests for metadata and route data.

**Steps:**
1. Convert profile/project data to typed TypeScript.
2. Add blog metadata and three sample MDX articles.
3. Add tests for required H1 phrase, canonical domain, project slugs, blog slugs, and external links.
4. Run targeted tests.
5. Commit: `feat: add typed portfolio content`.

### Task 3: App Router Pages and SEO

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/lib/metadata.ts`
- Create: `src/components/JsonLd.tsx`

**Steps:**
1. Implement semantic homepage with all required sections.
2. Implement project and blog detail pages with `generateMetadata`.
3. Add canonical URLs, OpenGraph, Twitter cards, and JSON-LD.
4. Add sitemap and robots from route data.
5. Run tests and build.
6. Commit: `feat: add server-rendered seo routes`.

### Task 4: Premium UI and Motion

**Files:**
- Create: `src/app/globals.css`
- Create: `src/components/*.tsx`
- Create: `src/components/MotionReveal.tsx`

**Steps:**
1. Build a restrained dark UI with strong typography, clear hierarchy, and scan-friendly recruiter sections.
2. Add accessible CTAs, focus states, mobile navigation, and reduced-motion support.
3. Use Framer Motion only in client components.
4. Run Playwright desktop/mobile smoke checks.
5. Commit: `feat: polish portfolio interface`.

### Task 5: Docs, Verification, and Deployment Guidance

**Files:**
- Create: `docs/seo-checklist.md`
- Create: `docs/google-search-console.md`
- Create: `docs/backlink-strategy.md`
- Create: `docs/domain-migration-strategy.md`
- Create: `docs/indexing-strategy.md`
- Create: `docs/deployment-steps.md`
- Modify: `README.md`

**Steps:**
1. Document SEO checklist, GSC setup, backlink strategy, domain migration, indexing, and deployment.
2. Run final verification: lint, typecheck, tests, build, local browser smoke test, Lighthouse.
3. Request code review and fix issues.
4. Commit: `docs: add seo launch playbook`.

