# Subhajit Pradhan — portfolio

**Live: [subhajitpradhan.vercel.app](https://subhajitpradhan.vercel.app)**

I build systems that make software verifiable. This repository is the site itself: four project case studies, long-form technical writing, and one dedicated page for KALIA — a 58M-parameter language model I trained from scratch on free GPUs.

Start here:

- **[Work](https://subhajitpradhan.vercel.app/projects)** — four case studies plus selected supporting work, each with the problem, the build, the evidence, and the limits
- **[KALIA](https://subhajitpradhan.vercel.app/kalia)** — the dedicated model page: a replayable training console built from the real logs, every numbered decision, every incident, benchmarks, samples, and the recipe
- **[Build log](https://subhajitpradhan.vercel.app/writing/kalia-build-log)** — the training story: micro-ablations, the optimizer I rejected, the plateau, and the quota wall
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
npm test        # 70 unit tests
npm run typecheck
npm run lint
npm run build
npm run test:e2e  # browser checks; run after build
npm run test:lighthouse
```

Where the content lives:

- Profile, experience, nav: `src/data/site.ts`
- Projects — four case studies, supporting work, claims, links, architecture, limitations: `src/data/projects.ts`
- Writing posts: `src/data/posts.ts`
- KALIA page: `src/app/kalia/data.ts`, with the training log generated into `src/app/kalia/train-log.ts` from the real logs served at `public/kalia/logs/`
- Metadata and structured data: `src/lib/metadata.ts`, `src/lib/structured-data.ts`

Pushes to `main` deploy through Vercel. The test suite proves the repository, not the deployment — those are separate checks.

## Security notes

`npm audit --omit=dev` is clean. The production CSP allows inline scripts because static Next hydration injects them; no third-party scripts are loaded. The remaining audit advisories are dev-only glob/brace parsing issues in the ESLint toolchain with no patched upstream release.

## Contact

- Email: [subhajitpradhan310@gmail.com](mailto:subhajitpradhan310@gmail.com)
- GitHub: [subhajitlucky](https://github.com/subhajitlucky)
- LinkedIn: [subhajitlucky](https://www.linkedin.com/in/subhajitlucky)
