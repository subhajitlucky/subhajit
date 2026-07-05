import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const appDir = join(process.cwd(), 'src', 'app');

describe('portfolio visual style guardrails', () => {
  it('does not use CSS gradients in app styles or pages', () => {
    const files = [
      'globals.css',
      'page.tsx',
      'blog/page.tsx',
      'blog/[slug]/page.tsx',
      'projects/page.tsx',
      'projects/[slug]/page.tsx',
    ];

    const combined = files
      .map((file) => readFileSync(join(appDir, file), 'utf8'))
      .join('\n');

    expect(combined).not.toMatch(/(?:linear|radial|conic)-gradient|gradient-title/i);
  });
});
