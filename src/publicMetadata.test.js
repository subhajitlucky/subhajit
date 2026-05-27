import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const publicPath = (...segments) => resolve(process.cwd(), 'public', ...segments);

describe('public metadata assets', () => {
  it('uses a real JPEG image for social previews', () => {
    const ogImage = readFileSync(publicPath('assets/og-image.jpg'));
    const jpegMagicBytes = Array.from(ogImage.subarray(0, 3));

    expect(jpegMagicBytes).toEqual([0xff, 0xd8, 0xff]);
    expect(ogImage.toString('utf8')).not.toContain('Placeholder');
  });

  it('keeps the web manifest aligned with AI full-stack positioning', () => {
    const manifest = JSON.parse(readFileSync(publicPath('manifest.json'), 'utf8'));

    expect(manifest.description).toMatch(/AI full-stack/i);
    expect(manifest.description).not.toMatch(/blockchain/i);
  });

  it('uses the AI full-stack page title in the static 404 fallback', () => {
    const notFoundHtml = readFileSync(publicPath('404.html'), 'utf8');

    expect(notFoundHtml).toMatch(
      /<title>Subhajit Pradhan - AI Full-Stack Engineer<\/title>/,
    );
  });

  it('does not publish Windows zone identifier artifacts', () => {
    const assetNames = readdirSync(publicPath('assets'));

    expect(assetNames.filter((name) => name.includes('Zone.Identifier'))).toEqual([]);
  });
});
