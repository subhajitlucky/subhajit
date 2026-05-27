# Deployment Steps

## Local Verification

Run:

```bash
npm install
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

## Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Install command: `npm install`.
5. Output directory: leave blank for Next.js.
6. Production domain: `subhajitpradhan.vercel.app`.

## Post-Deploy Checks

Open:

- `/`
- `/projects`
- `/projects/intentpay`
- `/blog`
- `/blog/portfolio-seo-architecture`
- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`

Then run Lighthouse against production and confirm 95+ targets for:

- Performance
- Accessibility
- Best Practices
- SEO

## Search Launch

After production checks pass:

1. Submit sitemap in Google Search Console.
2. Request indexing for priority URLs.
3. Update GitHub and LinkedIn profile links.
4. Update project README backlinks.
5. Recheck search visibility weekly.
