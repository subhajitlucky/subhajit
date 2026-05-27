import { describe, expect, it } from 'vitest';
import { getPublicAssetUrl } from './publicAssetUrl';

describe('getPublicAssetUrl', () => {
  it('keeps root deployments root-relative', () => {
    expect(getPublicAssetUrl('/assets/resume.pdf', '/')).toBe('/assets/resume.pdf');
  });

  it('resolves leading-slash asset paths against a GitHub Pages base path', () => {
    expect(getPublicAssetUrl('/assets/resume.pdf', '/subhajit/')).toBe(
      '/subhajit/assets/resume.pdf',
    );
  });

  it('resolves relative asset paths against a GitHub Pages base path', () => {
    expect(getPublicAssetUrl('assets/resume.pdf', '/subhajit/')).toBe(
      '/subhajit/assets/resume.pdf',
    );
  });
});
