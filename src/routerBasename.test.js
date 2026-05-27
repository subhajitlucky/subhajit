import { describe, expect, it } from 'vitest';
import { getRouterBasename } from './routerBasename';

describe('getRouterBasename', () => {
  it('keeps root deployments on the default router basename', () => {
    expect(getRouterBasename('/')).toBeUndefined();
  });

  it('normalizes a GitHub Pages base path', () => {
    expect(getRouterBasename('/subhajit/')).toBe('/subhajit');
  });

  it('normalizes nested base paths', () => {
    expect(getRouterBasename('/nested/path/')).toBe('/nested/path');
  });
});
