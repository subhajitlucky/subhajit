# Domain Migration Strategy

## Current Canonical

Use this as the only canonical site:

```text
https://subhajitpradhan.vercel.app
```

## Secondary Alias Handling

The secondary aliases `subhajitlucky.vercel.app` and `subhajitxyz.vercel.app` should not appear as canonical metadata, sitemap, robots host, schema URLs, README primary links, or social card URLs.

If the secondary Vercel deployments remain public:

1. Add permanent redirects from `subhajitlucky.vercel.app/*` and `subhajitxyz.vercel.app/*` to `subhajitpradhan.vercel.app/:path*` if Vercel project settings allow it.
2. Keep canonical tags pointing to `subhajitpradhan.vercel.app`.
3. Submit only the `subhajitpradhan.vercel.app` sitemap to Google Search Console.
4. Use `subhajitpradhan.vercel.app` as the primary link on GitHub, LinkedIn, resume, and project READMEs.

## Custom Domain Option

If buying a custom domain later, migrate from Vercel subdomain to the custom domain with:

- 301 redirects from `subhajitpradhan.vercel.app`.
- New canonical URLs.
- New sitemap submission.
- Updated social/profile links.
- Search Console change-of-address workflow if supported for the domain property.
