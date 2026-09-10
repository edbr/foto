import type { Photo } from './photo';

type RouteGeometry = { type: 'LineString'; coordinates: number[][] };
export type RouteData = {
  type: 'FeatureCollection';
  features: { type: 'Feature'; properties: Record<string, never>; geometry: RouteGeometry }[];
};

export async function getDrivingRoute(photos: Pick<Photo, 'longitude' | 'latitude'>[], token: string, signal: AbortSignal): Promise<RouteData> {
  const features: RouteData['features'] = [];
  const request = async (stops: Pick<Photo, 'longitude' | 'latitude'>[]) => {
    const coordinates = stops.map((photo) => `${photo.longitude},${photo.latitude}`).join(';');
    const query = new URLSearchParams({ access_token: token, geometries: 'geojson', overview: 'full', steps: 'false' });
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?${query}`, { signal });
    const result = await response.json();
    if (response.status === 422 && /distance/i.test(result.message ?? '') && stops.length > 2) {
      for (let i = 0; i < stops.length - 1; i++) await request(stops.slice(i, i + 2));
      return;
    }
    if (!response.ok) throw new Error(response.status === 401 || response.status === 403
      ? 'Driving routes unavailable. Check your Mapbox token permissions.'
      : 'Driving route unavailable: Please try again.');
    const geometry = result.routes?.[0]?.geometry;
    if (result.code !== 'Ok' || geometry?.type !== 'LineString' || !Array.isArray(geometry.coordinates) || geometry.coordinates.length < 2) {
      throw new Error('No driving route found between these mock locations. Try another photo tag.');
    }
    features.push({ type: 'Feature', properties: {}, geometry });
  };
  // Up to 25 waypoints per request; consecutive batches share their endpoint.
  for (let i = 0; i < photos.length - 1; i += 24) await request(photos.slice(i, i + 25));
  return { type: 'FeatureCollection', features };
}
