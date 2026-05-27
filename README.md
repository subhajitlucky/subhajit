# Subhajit Pradhan Portfolio

Premium Next.js portfolio for [subhajitpradhan.vercel.app](https://subhajitpradhan.vercel.app), positioned for:

- `Subhajit Pradhan`
- `Subhajit Pradhan developer`
- `Subhajit Pradhan full stack developer`
- `Subhajit Pradhan blockchain developer`

The site is built as a server-rendered engineering dossier with project case studies, MDX blog posts, JSON-LD schema, canonical metadata, sitemap, robots, and recruiter-focused calls to action.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- MDX blog content
- Vitest
- Vercel Analytics

## Routes

- `/` - homepage with About, Skills, Experience, Projects, Blogs, Currently Building, Contact, Open Source Work, and FAQ.
- `/projects` - project index.
- `/projects/[slug]` - static project case studies.
- `/blog` - MDX blog index.
- `/blog/[slug]` - static blog articles.
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, `/twitter-image`.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

## Content

- Site/profile content: `src/data/site.ts`
- Project content: `src/data/projects.ts`
- Blog metadata: `src/data/blog.ts`
- MDX articles: `content/blog/*.mdx`
- Metadata/schema helpers: `src/lib/metadata.ts`

## SEO Docs

- [SEO checklist](docs/seo-checklist.md)
- [Google Search Console setup](docs/google-search-console.md)
- [Backlink strategy](docs/backlink-strategy.md)
- [Domain migration strategy](docs/domain-migration-strategy.md)
- [Indexing strategy](docs/indexing-strategy.md)
- [Deployment steps](docs/deployment-steps.md)

## Contact

- Email: [subhajitpradhan310@gmail.com](mailto:subhajitpradhan310@gmail.com)
- GitHub: [subhajitlucky](https://github.com/subhajitlucky)
- LinkedIn: [subhajitlucky](https://www.linkedin.com/in/subhajitlucky)
- Location: Odisha, India
