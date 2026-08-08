# Portfolio Release Verification

**Date:** 2026-08-08

**Application commit verified:** `5729df8`

**Environment:** local Ubuntu workstation, Node.js production build, headless Chromium

## Automated evidence

The following commands were run against the application commit in the order shown:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Results:

- Vitest: 7 test files passed, 19 tests passed.
- TypeScript: `tsc --noEmit` exited successfully.
- ESLint: zero warnings and zero errors with `--max-warnings=0`.
- Next.js 16.3.0 production build: compiled successfully and generated 14 static pages.
- All six project slugs were emitted through static generation.

React Doctor was run after the straightforward one-page redesign and found no issues across 34 scanned files. Its optional score API timed out, so no numeric score is claimed for this run.

## Resume evidence

```bash
pdfinfo public/resume.pdf | rg '^(Pages|Encrypted)'
pdftotext public/resume.pdf - | rg -m1 'Subhajit Pradhan'
```

Results:

- 2 pages
- Not encrypted
- Candidate name extracted successfully
- Both pages were rendered to images and visually checked for blank content and clipping

The PDF is served unchanged from the user-provided source at `/home/subhajit/project/Subhajit_Resume.pdf`.

## Production-browser evidence

The successful production build was served with `npm run start` and checked in headless Chromium at:

- Desktop: 1440 × 1000
- Mobile minimum: 320 × 800

Routes checked at both viewports:

- `/`
- `/projects`
- `/projects/codebase-doctor`
- `/projects/rls-doctor`
- `/projects/smritiflow`
- `/projects/tarka-sabha`
- `/projects/cscosmos`
- `/projects/sutra`
- `/missing-page`

Browser results:

- Every real HTML route returned 200.
- The unknown route returned the custom 404 with HTTP 404.
- Each route had one main landmark, at least one semantic header, a footer, one `h1`, and no heading-level jumps.
- No horizontal overflow was present at 320px.
- The skip link was the first keyboard focus target, became visible when focused, and had a visible outline.
- The keyboard order began with the skip link, Subhajit's name, Email, Resume, GitHub, and LinkedIn.
- External links used a new tab with `noopener` protection.
- `/resume.pdf` returned 200, `application/pdf`, and a valid PDF signature.
- The homepage exposed the primary role, all three employers, four featured projects, skills, education, and contact without requiring a route change.
- No page animations were present.
- The former proof rail, principles, editorial slogans, and promotional footer copy were absent.
- No unexpected browser console or page errors were recorded.
- Full-page screenshots were captured for every HTML route at both viewports. The homepage, project index, and representative case study were visually inspected and matched the approved compact white, dark-text, and blue-accent design.

## Public-link checks

Public GitHub repositories, GitHub evidence paths, and live project applications returned 200 during the check. The SUTRA specification link initially returned 404; repository-tree evidence identified the correct `spec/SUTRA_SPEC.md` path, which was fixed and then returned 200.

The npm website returned automated-request protection responses (403) for package pages, and LinkedIn timed out during the command-line check. The portfolio URLs remain canonical, but those services were not independently proven available from this environment.

## Boundaries and remaining verification

- This is local repository and production-build evidence, not proof that commit `5729df8` is deployed.
- The canonical domain responded during link checking, but its content was not matched to this commit.
- No deployment, Vercel project mutation, DNS change, analytics setup, or live-domain release was performed.
- No authenticated GitHub profile changes were made.
- Automated and keyboard checks do not replace manual testing with multiple screen readers and operating systems.
- Temporary browser screenshots and the isolated Playwright environment were used for verification only and are not repository artifacts.
