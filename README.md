# Subhajit Pradhan — portfolio

**Live: [subhajitpradhan.vercel.app](https://subhajitpradhan.vercel.app)**

I build web products and AI systems, from the interface to the infrastructure. This repository is the site itself: project case studies, long-form technical writing, and one dedicated page for KALIA — a 58M-parameter language model I trained from scratch on free GPUs.

Start here:

- **[Projects](https://subhajitpradhan.vercel.app/projects)** — twelve case studies, each stating its decisions, tradeoffs, and limitations
- **[KALIA](https://subhajitpradhan.vercel.app/kalia)** — the dedicated model page: a replayable training console built from the real logs, every decision (D1–D41), every incident (I1–I12), benchmarks, samples, and the recipe
- **[Build log](https://subhajitpradhan.vercel.app/writing/kalia-build-log)** — the two-day story: micro-ablations, the optimizer I rejected, the plateau, and the quota wall
- **[Writing](https://subhajitpradhan.vercel.app/writing)** — long-form technical posts
- **[Resume](https://subhajitpradhan.vercel.app/resume.pdf)** — one page, PDF

Every public claim links to something you can check: source code, a published package, a live application, or a case study.

## Working on the code

Next.js (App Router), TypeScript, plain CSS. Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

```bash
npm test        # 48 tests
npm run typecheck
npm run lint
npm run build
```

Where the content lives:

- Profile, experience, skills, education, nav: `src/data/site.ts`
- Projects — claims, links, architecture, limitations: `src/data/projects.ts`
- Writing posts: `src/data/posts.ts`
- KALIA page: `src/app/kalia/data.ts`, with the training log generated into `src/app/kalia/train-log.ts` from the real logs served at `public/kalia/logs/`
- Metadata and structured data: `src/lib/metadata.ts`, `src/lib/structured-data.ts`

Pushes to `main` deploy through Vercel. The test suite proves the repository, not the deployment — those are separate checks.

## Contact

- Email: [subhajitpradhan310@gmail.com](mailto:subhajitpradhan310@gmail.com)
- GitHub: [subhajitlucky](https://github.com/subhajitlucky)
- LinkedIn: [subhajitlucky](https://www.linkedin.com/in/subhajitlucky)
