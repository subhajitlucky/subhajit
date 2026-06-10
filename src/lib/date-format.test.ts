import { describe, expect, it } from 'vitest';
import { formatDisplayDate } from '@/lib/date-format';

describe('formatDisplayDate', () => {
  it('formats ISO dates as readable US English dates in UTC', () => {
    expect(formatDisplayDate('2026-05-27')).toBe('May 27, 2026');
  });
});
