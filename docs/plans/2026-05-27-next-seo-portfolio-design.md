# Next SEO Portfolio Design

## Goal

Rebuild the deployed portfolio as a server-rendered, highly indexable Next.js portfolio for `https://subhajitpradhan.vercel.app`, while preserving the strongest parts of the current site: restrained dark branding, direct recruiter CTAs, credible project evidence, and a compact technical voice.

## Audit Findings

- The live deployment is a Vite SPA with an empty HTML body before JavaScript renders. Lighthouse scores are strong, but search engines and social crawlers get less durable content than they would from static/server-rendered routes.
- The live canonical URL, OpenGraph URL, sitemap, and robots sitemap still reference `subhajitxyz.vercel.app`, which splits authority away from the target domain.
- The current H1 does not contain the required phrase: `Subhajit Pradhan – Full Stack & Blockchain Developer`.
- The current page has useful content, but it lacks indexable sections for About, Blogs, Currently Building, Open Source Work, FAQ, and long-form personal-name SEO content.
- Project links in the live site include old URLs that were already corrected locally.

## Product Direction

The portfolio should feel like a premium technical dossier, not a flashy fresher template. The UI direction is restrained, high-contrast, editorial, and systems-oriented, taking cues from Vercel, Linear, Stripe, and Raycast without copying their surfaces. Motion should be subtle and isolated to small client components so the main SEO content remains static and fast.

The homepage should answer three recruiter questions quickly:

1. Who is Subhajit Pradhan?
2. What can he build?
3. Where is the proof?

## Architecture

- Use Next.js App Router with TypeScript and static-first pages.
- Keep portfolio data in typed modules under `src/data`.
- Use route-level `metadata`, `sitemap.ts`, and `robots.ts`.
- Use MDX for blog posts under `content/blog`.
- Render project and blog pages statically with `generateStaticParams`.
- Use `next/font` for font optimization and Tailwind CSS for styling.
- Use Framer Motion only in client islands for small reveal effects.

## SEO Structure

- Homepage canonical: `https://subhajitpradhan.vercel.app/`
- Required H1: `Subhajit Pradhan – Full Stack & Blockchain Developer`
- Indexable sections: About, Skills, Experience, Projects, Blogs, Currently Building, Contact, Open Source Work, FAQ.
- Structured data:
  - `Person`
  - `WebSite`
  - `FAQPage`
  - `ItemList` for projects and blog posts
  - `BlogPosting` on blog detail pages
  - `SoftwareSourceCode` for project detail pages
- Internal links:
  - Homepage to all projects and blog posts.
  - Blog index to blog posts.
  - Blog posts back to relevant projects where useful.

## Content Direction

Use `Subhajit Pradhan` naturally throughout long-form sections. Avoid keyword stuffing. Positioning should combine full-stack, blockchain, and AI experience without overclaiming. The strongest claim is practical product engineering: frontend UX, backend APIs, data, deployment, smart contracts, and AI orchestration.

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run test -- --run`
- `npm run build`
- Local Playwright smoke test for desktop and mobile.
- Local Lighthouse target: 95+ for Performance, Accessibility, Best Practices, and SEO.

