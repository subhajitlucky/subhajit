import { getPostsByDateDesc } from '@/data/posts';
import { siteConfig } from '@/data/site';
import { GET } from './route';

describe('writing RSS feed', () => {
  it('serves a valid RSS document with every post, most recent first', async () => {
    const response = GET();

    expect(response.headers.get('Content-Type')).toContain('application/rss+xml');

    const xml = await response.text();
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss version="2.0"');

    const ordered = getPostsByDateDesc();
    expect((xml.match(/<item>/g) ?? [])).toHaveLength(ordered.length);

    const positions = ordered.map((post) => xml.indexOf(`/writing/${post.slug}<`));
    for (const position of positions) {
      expect(position).toBeGreaterThan(-1);
    }
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it('links back to itself and formats dates as RFC 822', async () => {
    const xml = await GET().text();

    expect(xml).toContain(
      `<atom:link href="${siteConfig.baseUrl}/writing/rss.xml" rel="self" type="application/rss+xml" />`,
    );
    expect(xml).toMatch(
      /<pubDate>[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT<\/pubDate>/,
    );
  });

  it('escapes XML-sensitive characters in every field', async () => {
    const xml = await GET().text();
    const elements = xml.matchAll(/<(title|description|category)>([^<]*)<\/\1>/g);

    for (const [, , value] of elements) {
      expect(value).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;)/);
    }
  });
});
