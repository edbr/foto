'use client';

import { useEffect, useRef, useState } from 'react';
import type { Photo } from './photo';
import mapboxgl from 'mapbox-gl';
import Slideshow from './slideshow';

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim();
const hasToken = !!token?.startsWith('pk.') && !token.includes('replace_with');

export default function PhotoMap({ photos }: { photos: Photo[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedIndex = photos.findIndex((photo) => photo.id === selectedId);
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef(new Map<string, mapboxgl.Marker>());
  const [status, setStatus] = useState(hasToken ? 'Loading map…' : 'Add a Mapbox token to get started.');

  useEffect(() => {
    if (!hasToken || !container.current) return;
    if (!mapboxgl.supported()) {
      setStatus('This browser does not support the WebGL features needed for the map.');
      return;
    }
    let instance: mapboxgl.Map;
    try {
      instance = new mapboxgl.Map({
        container: container.current, accessToken: token,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-38.5, -7.5], zoom: 5,
      });
    } catch {
      setStatus('The map could not start. Check browser WebGL support and reload.');
      return;
    }
    map.current = instance;
    instance.addControl(new mapboxgl.NavigationControl(), 'top-right');
    instance.on('load', () => {
      setStatus('');
    });
    instance.on('error', () => setStatus('A map request failed. Check your connection and Mapbox token permissions.'));
    return () => {
      markers.current.forEach((marker) => marker.remove());
      markers.current.clear();
      instance.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    for (const [id, marker] of markers.current) {
      if (!photos.some((photo) => photo.id === id)) {
        marker.getPopup()?.remove();
        marker.remove();
        markers.current.delete(id);
      }
    }
    for (const photo of photos) {
      if (markers.current.has(photo.id)) continue;
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'photo-marker';
      pin.setAttribute('aria-label', `View ${photo.name}`);
      const thumbnail = document.createElement('img');
      thumbnail.src = photo.url;
      thumbnail.alt = '';
      pin.append(thumbnail);
      const marker = new mapboxgl.Marker({ element: pin })
        .setLngLat([photo.longitude, photo.latitude]).addTo(instance);
      pin.addEventListener('click', (event) => {
        event.stopPropagation();
        setSelectedId(photo.id);
      });
      markers.current.set(photo.id, marker);
    }
  }, [photos]);

  return <div id="app">
    <main id="map" aria-label="Photo map">
      <div ref={container} style={{ position: 'absolute', inset: 0 }} />
      {hasToken && status && <p className="map-status" role="status" aria-live="polite">{status}</p>}
      {!hasToken && <div id="setup"><h2>Connect your map</h2>
        <p>Add your public Mapbox token to <code>.env.local</code>:</p>
        <pre>NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.…</pre>
        <p>Then restart the development server.</p>
      </div>}
    </main>
    {selectedIndex >= 0 && <Slideshow photos={photos} initialIndex={selectedIndex} onClose={() => setSelectedId(null)} />}
  </div>;
}
