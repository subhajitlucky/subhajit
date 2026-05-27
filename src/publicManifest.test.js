import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const manifest = JSON.parse(
  readFileSync(resolve(process.cwd(), 'public/manifest.json'), 'utf8'),
);

const isRootAbsoluteUrl = (url) =>
  typeof url === 'string' && url.startsWith('/') && !url.startsWith('//');

describe('public web manifest', () => {
  it('keeps navigation and icon URLs relative to the deployed base path', () => {
    const rootAbsoluteUrls = [
      ['start_url', manifest.start_url],
      ...manifest.icons.map((icon, index) => [`icons[${index}].src`, icon.src]),
    ].filter(([, url]) => isRootAbsoluteUrl(url));

    expect(rootAbsoluteUrls).toEqual([]);
  });
});
