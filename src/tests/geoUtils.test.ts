import { describe, it, expect } from 'vitest';
import { formatCoordinates, formatAccuracy, formatDistance, getGoogleMapsUrl } from '@/lib/geoUtils';

describe('Geo Utilities', () => {
  it('formats latitude and longitude into cardinal format', () => {
    const lat = 19.07609;
    const lng = 72.877426;
    const formatted = formatCoordinates(lat, lng);

    expect(formatted).toBe('19.076090° N, 72.877426° E');
  });

  it('handles negative coordinates correctly', () => {
    const formatted = formatCoordinates(-33.8688, 151.2093);
    expect(formatted).toBe('33.868800° S, 151.209300° E');
  });

  it('formats accuracy and distance properly', () => {
    expect(formatAccuracy(8.4)).toBe('±8.4 m');
    expect(formatAccuracy(null)).toBe('—');

    expect(formatDistance(45.3)).toBe('45 m');
    expect(formatDistance(1250)).toBe('1.25 km');
    expect(formatDistance(null)).toBe('—');
  });

  it('generates Google Maps query URLs', () => {
    const url = getGoogleMapsUrl(19.123, 73.456);
    expect(url).toBe('https://www.google.com/maps/search/?api=1&query=19.123,73.456');
    expect(getGoogleMapsUrl(null, null)).toBeNull();
  });
});
