import { describe, expect, it } from 'vitest';
import { isExternalUrl } from './urls';

describe('isExternalUrl', () => {
  it('treats https URLs as external', () => {
    expect(isExternalUrl('https://github.com/subhajitlucky')).toBe(true);
  });

  it('treats http URLs as external', () => {
    expect(isExternalUrl('http://example.com')).toBe(true);
  });

  it('treats internal, mailto, and hash links as non-external', () => {
    expect(isExternalUrl('/projects/kalia')).toBe(false);
    expect(isExternalUrl('mailto:subhajitpradhan310@gmail.com')).toBe(false);
    expect(isExternalUrl('#model')).toBe(false);
  });
});
