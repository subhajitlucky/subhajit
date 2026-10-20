import { getPostsByDateDesc } from '@/data/posts';
import { siteConfig } from '@/data/site';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const feedUrl = `${siteConfig.baseUrl}/writing/rss.xml`;
  const items = getPostsByDateDesc().map((post) => {
    const url = `${siteConfig.baseUrl}/writing/${post.slug}`;
    const lines = [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
      `      <description>${escapeXml(post.summary)}</description>`,
      ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      '    </item>',
    ];
    return lines.join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(`Writing | ${siteConfig.name}`)}</title>`,
    `    <link>${siteConfig.baseUrl}/writing</link>`,
    '    <description>Notes on database security, static analysis, protocol design, multi-agent systems, and developer tooling.</description>',
    '    <language>en</language>',
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
