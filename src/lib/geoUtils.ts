/**
 * Centralized GPS & Location Utility
 */

export function formatCoordinates(lat: number | null | undefined, lng: number | null | undefined): string {
  if (lat == null || lng == null) return 'Coordinates not recorded';
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(6)}° ${latDir}, ${Math.abs(lng).toFixed(6)}° ${lngDir}`;
}

export function formatAccuracy(accuracyMeters: number | null | undefined): string {
  if (accuracyMeters == null) return '—';
  return `±${accuracyMeters.toFixed(1)} m`;
}

export function formatDistance(meters: number | null | undefined): string {
  if (meters == null) return '—';
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${Math.round(meters)} m`;
}

export function getGoogleMapsUrl(lat: number | null | undefined, lng: number | null | undefined): string | null {
  if (lat == null || lng == null) return null;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
