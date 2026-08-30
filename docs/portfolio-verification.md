# Portfolio release verification

**Date:** 2026-08-30

**Application commit verified:** `3f6f4cd8c4a8ed4786c6fe3987f9fccc28566b2d`

**Branch:** `feat/minimal-product-engineer-portfolio`

**Environment:** local Ubuntu workstation, local production build, and headless Chromium via Playwright CLI only

## Repository state

Before verification, the worktree was clean on the branch and application commit recorded above. No deployment, push, merge, or external service mutation was performed.

## Automated gate

The following commands were run freshly, in this order, against the application commit:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npx -y react-doctor@latest . --verbose --diff
```

Results:

- `npm test`: Vitest reported 7 test files passed and 24 tests passed.
- `npm run typecheck`: `tsc --noEmit` exited 0 with no diagnostics.
- `npm run lint`: ESLint exited 0 with zero warnings or errors under `--max-warnings=0`.
- `npm run build`: Next.js 16.3.0 compiled successfully, finished TypeScript, generated 14 static pages, and emitted all six project paths through static generation.
- React Doctor scanned 14 files and reported **100 / 100**, `Great`, with **no issues found**. The command reported that `--diff` is deprecated in favor of `--scope changed`; the requested command still completed successfully.

## Local production-browser verification

The production build was served locally with `next start` on the free loopback port `36345`:

```text
http://127.0.0.1:36345
```

Real Chromium was driven through the Playwright CLI wrapper. Full-page screenshots were captured outside the repository for every route at both required viewports. The screenshot set contains 18 PNGs under a temporary `/tmp/portfolio-verification.djXXcf` directory and is not tracked.

### Route matrix

| Route | 1440 × 1000 | 320 × 800 | Structural result |
| --- | ---: | ---: | --- |
| `/` | 200 | 200 | 1 main, 1 h1, no heading jumps |
| `/projects` | 200 | 200 | 1 main, 1 h1, no heading jumps |
| `/projects/codebase-doctor` | 200 | 200 | 1 main, 1 h1, no heading jumps |
| `/projects/rls-doctor` | 200 | 200 | 1 main, 1 h1, no heading jumps |
| `/projects/smritiflow` | 200 | 200 | 1 main, 1 h1, no heading jumps |
| `/projects/tarka-sabha` | 200 | 200 | 1 main, 1 h1, no heading jumps |
| `/projects/cscosmos` | 200 | 200 | 1 main, 1 h1, no heading jumps |
| `/projects/sutra` | 200 | 200 | 1 main, 1 h1, no heading jumps |
| `/missing-page` | 404 | 404 | 1 main, 1 h1, no heading jumps |

All 18 route/viewport checks reported no horizontal overflow. At 1440px, both document and body scroll widths were 1440px; at 320px, both were 320px.

### Interaction and accessibility checks

- The first keyboard focus target was the skip link, `Skip to main content`, with `#main-content`; after the focus transition it was visible with a `2px solid rgb(49, 92, 69)` outline.
- Header links appeared in this order on every route and viewport: Email, Resume, GitHub, LinkedIn. GitHub and LinkedIn used `target="_blank"` with `rel="noreferrer noopener"`; Resume remained local at `/resume.pdf` and Email remained a `mailto:` link.
- The homepage exposed `Full-Stack Product Engineer`, four featured projects, three employers, Capabilities, Education, and Start a conversation without a route change. The intentional Giakaa employment entry retains its historical title; no obsolete availability phrase was rendered.
- The checked action links had computed heights of at least 44px at both viewports. The 320px navigation remained visible and legible without overflow.
- Homepage keyboard order was: skip link, SP, Email, Resume, GitHub, LinkedIn.
- With `prefers-reduced-motion: reduce`, the media query matched, `scroll-behavior` was `auto`, and no animations, transitions, or non-identity transforms were observed. The resting off-canvas skip-link position remains a focus affordance.

### Browser errors and links

- No Playwright `pageerror` events or failed requests occurred.
- No unexpected console messages occurred. Chromium emitted three expected 404 console entries while the known `/missing-page` route was requested; these correspond to the intentional missing-route response, not application errors.
- Across the nine routes, 123 rendered anchors were checked: 52 local URLs returned 200, 12 mailto links matched the expected form, 9 hash links resolved to existing targets, and 50 external HTTPS links had valid URL syntax and safe new-tab protections. No link-check issues were reported. External availability was not claimed or tested.

### Static assets

- `/resume.pdf`: HTTP 200, `application/pdf`, 127004 bytes, and the first five bytes were `%PDF-`.
- `/opengraph-image`: HTTP 200, `image/png`, 43245 bytes, valid PNG signature, and valid dimensions of 1200 × 630.

### Visual inspection

The full-page homepage, projects index, Codebase Doctor case study, and 320px homepage screenshots were inspected. They showed the approved warm editorial layout, dark ink typography, green accents, compact responsive rows, and no visible clipping in those representative views.

## Content and visual-token sanity

The source/public scan found no `Open to remote roles worldwide` string. The only `Full Stack Software Developer` matches were the intentional Giakaa employment title in `src/data/site.ts` and its related test assertions in `src/data/content.test.ts` and `src/app/page.test.tsx`.

The current visual tokens are warm editorial and green rather than the former blue treatment:

- canvas `#f2f0e9`
- ink `#171815`
- muted `#65675f`
- line `#cbc9bf`
- accent `#315c45`
- accent-soft `#dce5dc`
- accent-ink `#254735`
- display/sans families: Newsreader and Manrope

No `blue` token or blue color declaration was found in the checked application source. The reduced-motion override remains explicit in `src/app/globals.css`.

## Boundaries and limitations

- This document records local production-build evidence for application commit `3f6f4cd8c4a8ed4786c6fe3987f9fccc28566b2d`; it is not proof that the commit is deployed.
- No Vercel project mutation, DNS change, deployment, push, merge, analytics setup, or public-domain verification was performed.
- External GitHub, npm, LinkedIn, and live-application URLs were syntax/target checked only; their public availability is not claimed here.
- The browser matrix covers real Chromium at 1440 × 1000 and 320 × 800. It does not replace testing with other browser engines, operating systems, screen readers, or physical touch devices.
- Temporary screenshots and Playwright session artifacts were used for evidence only and are not repository artifacts.
