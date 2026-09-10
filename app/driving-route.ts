import type { Photo } from './photo';

type RouteGeometry = { type: 'LineString'; coordinates: number[][] };
export type RouteData = {
  type: 'FeatureCollection';
  features: { type: 'Feature'; properties: Record<string, never>; geometry: RouteGeometry }[];
};

export async function getDrivingRoute(photos: Photo[], token: string, signal: AbortSignal): Promise<RouteData> {
  const features: RouteData['features'] = [];
  // Separate legs avoid the total-distance limit for widely scattered photos.
  for (let start = 0; start < photos.length - 1; start += 1) {
    const coordinates = photos.slice(start, start + 2).map((photo) => `${photo.longitude},${photo.latitude}`).join(';');
    const query = new URLSearchParams({ access_token: token, geometries: 'geojson', overview: 'full', steps: 'false' });
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?${query}`, { signal });
    const result = await response.json();
    if (!response.ok) throw new Error(response.status === 401 || response.status === 403
      ? 'Driving routes unavailable. Check your Mapbox token permissions.'
      : `Driving route unavailable: ${result.message ?? 'Please try again.'}`);
    const geometry = result.routes?.[0]?.geometry;
    if (result.code !== 'Ok' || geometry?.type !== 'LineString' || !Array.isArray(geometry.coordinates) || geometry.coordinates.length < 2) {
      throw new Error('No driving route found between these mock locations. Try another photo tag.');
    }
    features.push({ type: 'Feature', properties: {}, geometry });
  }
  return { type: 'FeatureCollection', features };
}
