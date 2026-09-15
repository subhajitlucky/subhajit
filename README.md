# Subhajit Pradhan — Portfolio

A one-page hiring portfolio for remote full-stack product engineering roles, built with Next.js, TypeScript, and plain CSS. Every public claim is backed by a source repository, a published package, a live application, or a case study that documents decisions and limitations.

## Local development

Requirements: Node.js 20.9 or newer and npm.

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

## Routes

- `/` — positioning, projects, experience, skills, education, and contact
- `/projects` — complete six-project index
- `/projects/[slug]` — statically generated project case studies
- `/resume.pdf` — public resume download
- `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest` — discovery metadata
- `/opengraph-image` — generated social preview

## Content model

- Profile, experience, skills, and education: `src/data/site.ts`
- Canonical project claims, links, architecture, and limitations: `src/data/projects.ts`
- Route metadata and structured data: `src/lib/metadata.ts`, `src/lib/structured-data.ts`
- Resume served by the site: `public/resume.pdf`

Current employment is presented at company, title, date, and location level only. Project creation dates and unsupported adoption, scale, or performance claims are not used.

## Deployment boundary

The canonical URL is [subhajitpradhan.vercel.app](https://subhajitpradhan.vercel.app). Local tests and builds verify the repository, but do not prove that the current commit is deployed. Deployment, domain verification, live analytics, and authenticated GitHub profile changes require separate action.

## Contact

- Email: [subhajitpradhan310@gmail.com](mailto:subhajitpradhan310@gmail.com)
- GitHub: [subhajitlucky](https://github.com/subhajitlucky)
- LinkedIn: [subhajitlucky](https://www.linkedin.com/in/subhajitlucky)
