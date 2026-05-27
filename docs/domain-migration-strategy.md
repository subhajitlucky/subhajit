# Domain Migration Strategy

## Current Canonical

Use this as the only canonical site:

```text
https://subhajitpradhan.vercel.app
```

## Old Domain Handling

The old deployment domain `subhajitxyz.vercel.app` should not appear in metadata, sitemap, robots, schema, README, or social cards.

If the old Vercel deployment remains public:

1. Add a permanent redirect from `subhajitxyz.vercel.app/*` to `subhajitpradhan.vercel.app/:path*`.
2. Keep the new site canonical tags pointing to `subhajitpradhan.vercel.app`.
3. Submit only the new sitemap to Google Search Console.
4. Update GitHub, LinkedIn, resume, and project README links to the new domain.

## Custom Domain Option

If buying a custom domain later, migrate from Vercel subdomain to the custom domain with:

- 301 redirects from `subhajitpradhan.vercel.app`.
- New canonical URLs.
- New sitemap submission.
- Updated social/profile links.
- Search Console change-of-address workflow if supported for the domain property.
