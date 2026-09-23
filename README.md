# subhajitpradhan.vercel.app

This is my portfolio. It is where I keep the work I can point at: shipped CLIs, live products, and a language model I trained from scratch on free GPUs.

I only publish claims I can back with a link — source code, an npm package, a live URL, or a case study that states its decisions, tradeoffs, and limitations.

## What is here

- `/` — who I am, featured work, experience, skills, education, contact
- `/projects` — all twelve projects, filterable by role
- `/projects/[slug]` — project case studies, statically generated
- `/writing` — long-form technical writing
- `/writing/kalia-build-log` — the two-day build log of training KALIA: micro-ablations, the optimizer I rejected, the plateau, and the quota wall
- `/kalia` — the dedicated KALIA page: a replayable console built from the real training logs, every decision (D1–D41), every incident (I1–I12), benchmarks, samples, and the full recipe
- `/resume.pdf`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image` — resume and discovery metadata

## Local development

Requires Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Where the content lives

- Profile, experience, skills, education, nav: `src/data/site.ts`
- Projects — claims, links, architecture, limitations: `src/data/projects.ts`
- Writing posts: `src/data/posts.ts`
- KALIA page: `src/app/kalia/data.ts`, with the training log generated into `src/app/kalia/train-log.ts` from the real logs served at `public/kalia/logs/`
- Metadata and structured data: `src/lib/metadata.ts`, `src/lib/structured-data.ts`

My current job is listed at company, title, date, and location level only. I do not publish project creation dates or adoption, scale, or performance claims I cannot support.

## Deployment

The canonical URL is [subhajitpradhan.vercel.app](https://subhajitpradhan.vercel.app). Pushes to `main` deploy through Vercel. The test suite proves the repository, not the deployment — those are separate checks.

## Contact

- Email: [subhajitpradhan310@gmail.com](mailto:subhajitpradhan310@gmail.com)
- GitHub: [subhajitlucky](https://github.com/subhajitlucky)
- LinkedIn: [subhajitlucky](https://www.linkedin.com/in/subhajitlucky)
