/**
 * Centralized Date & Time Utility for Asia/Kolkata.
 * Strictly formats all user-facing timestamps to: dd MMM yyyy, hh:mm a
 * Example: 18 Sep 2026, 03:25 PM
 * Rejects raw ISO strings, UTC offsets, and "+00:00". Never appends "IST".
 */

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function formatToIndiaTime(dateInput: string | number | Date | null | undefined): string {
  if (!dateInput) return '—';

  try {
    const date = typeof dateInput === 'string' || typeof dateInput === 'number'
      ? new Date(dateInput)
      : dateInput;

    if (isNaN(date.getTime())) {
      return String(dateInput);
    }

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const parts = formatter.formatToParts(date);
    const day = parts.find(p => p.type === 'day')?.value || '';
    const monthNum = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
    const month = MONTH_NAMES[monthNum - 1] || '';
    const year = parts.find(p => p.type === 'year')?.value || '';
    const hour = parts.find(p => p.type === 'hour')?.value || '';
    const minute = parts.find(p => p.type === 'minute')?.value || '';
    const dayPeriod = (parts.find(p => p.type === 'dayPeriod')?.value || '').toUpperCase();

    return `${day} ${month} ${year}, ${hour}:${minute} ${dayPeriod}`;
  } catch (err) {
    console.error('Error formatting date to India Time:', err);
    return String(dateInput);
  }
}

export function formatDuration(minutes: number | null | undefined): string {
  if (minutes == null || minutes < 0) return '—';
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem > 0 ? `${hrs} hr ${rem} min` : `${hrs} hr`;
}
