import { describe, expect, it } from 'vitest';
import { isAssetUrl, isExternalUrl } from './urls';

describe('isExternalUrl', () => {
  it('treats https URLs as external', () => {
    expect(isExternalUrl('https://github.com/subhajitlucky')).toBe(true);
  });

  it('treats http URLs as external', () => {
    expect(isExternalUrl('http://example.com')).toBe(true);
  });

  it('identifies static assets separately from page routes', () => {
    expect(isAssetUrl('/resume.pdf')).toBe(true);
    expect(isAssetUrl('/icon-192.png')).toBe(true);
    expect(isAssetUrl('/projects/kalia')).toBe(false);
    expect(isAssetUrl('/writing/tarka-sabha-council')).toBe(false);
  });

  it('treats internal, mailto, and hash links as non-external', () => {
    expect(isExternalUrl('/projects/kalia')).toBe(false);
    expect(isExternalUrl('mailto:subhajitpradhan310@gmail.com')).toBe(false);
    expect(isExternalUrl('#model')).toBe(false);
  });
});
