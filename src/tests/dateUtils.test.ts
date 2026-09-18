import { describe, it, expect } from 'vitest';
import { formatToIndiaTime, formatDuration } from '@/lib/dateUtils';

describe('Date Utilities (Asia/Kolkata)', () => {
  it('formats ISO timestamps to dd MMM yyyy, hh:mm a in IST', () => {
    // 2026-09-18T04:30:00Z is 10:00 AM IST
    const isoUtc = '2026-09-18T04:30:00Z';
    const formatted = formatToIndiaTime(isoUtc);

    expect(formatted).toBe('18 Sep 2026, 10:00 AM');
    expect(formatted).not.toContain('IST');
    expect(formatted).not.toContain('Z');
    expect(formatted).not.toContain('+');
  });

  it('handles afternoon timestamps with PM indicator', () => {
    // 2026-09-18T09:55:00Z is 03:25 PM IST
    const isoUtc = '2026-09-18T09:55:00Z';
    const formatted = formatToIndiaTime(isoUtc);

    expect(formatted).toBe('18 Sep 2026, 03:25 PM');
  });

  it('returns placeholder for null or undefined timestamps', () => {
    expect(formatToIndiaTime(null)).toBe('—');
    expect(formatToIndiaTime(undefined)).toBe('—');
    expect(formatToIndiaTime('')).toBe('—');
  });

  it('formats duration in minutes accurately', () => {
    expect(formatDuration(45)).toBe('45 min');
    expect(formatDuration(60)).toBe('1 hr');
    expect(formatDuration(105)).toBe('1 hr 45 min');
    expect(formatDuration(0)).toBe('0 min');
    expect(formatDuration(null)).toBe('—');
  });
});
