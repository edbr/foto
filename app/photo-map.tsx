'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Photo } from './photo';
import mapboxgl from 'mapbox-gl';
import Slideshow from './slideshow';
import { applyMapTheme } from './map-theme';
import { getDrivingRoute, type RouteData } from './driving-route';
import { addBiomeLayers, biomes } from './biome-layer';
import { indigenousLandCount, showIndigenousLands } from './indigenous-layer';
import { urbanFootprintCount, showUrbanFootprint } from './urban-layer';
import { conservationAreaCount, showConservationAreas } from './conservation-layer';
import { urbanConcentrationCount, showUrbanConcentrations } from './urban-concentration-layer';
import { populationArrangementCount, showPopulationArrangements } from './population-arrangement-layer';
import { immediateRegionCount, showImmediateRegions } from './immediate-region-layer';
import { disasterRiskCount, showDisasterRisk } from './disaster-risk-layer';

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim();
const hasToken = !!token?.startsWith('pk.') && !token.includes('replace_with');

export default function PhotoMap({ photos }: { photos: Photo[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showRoute, setShowRoute] = useState(true);
  const [styleReady, setStyleReady] = useState(false);
  const [showBiomes, setShowBiomes] = useState(true);
  const [disasterRiskVisible, setDisasterRiskVisible] = useState(false);
  const [immediateRegionsVisible, setImmediateRegionsVisible] = useState(false);
  const [arrangementsVisible, setArrangementsVisible] = useState(false);
  const [concentrationsVisible, setConcentrationsVisible] = useState(true);
  const [conservationVisible, setConservationVisible] = useState(false);
  const [urbanVisible, setUrbanVisible] = useState(false);
  const [indigenousVisible, setIndigenousVisible] = useState(true);
  const [activeBiome, setActiveBiome] = useState<string | null>(null);
  const [routeStatus, setRouteStatus] = useState('');
  const [routeRetry, setRouteRetry] = useState(0);
  const routeCache = useRef(new Map<string, RouteData>());
  const tags = useMemo(() => [...new Set(photos.flatMap((photo) => photo.tags))].sort(), [photos]);
  const visiblePhotos = useMemo(() => photos.filter((photo) => !activeTag || photo.tags.includes(activeTag)), [photos, activeTag]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedIndex = visiblePhotos.findIndex((photo) => photo.id === selectedId);
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
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [-40.5, -9.5], zoom: 5,
        maxBounds: [[-49.5, -19.5], [-31.5, 0.5]],
        maxZoom: 15,
      });
    } catch {
      setStatus('The map could not start. Check browser WebGL support and reload.');
      return;
    }
    map.current = instance;
    instance.on('style.load', () => {
      applyMapTheme(instance);
      addBiomeLayers(instance);
      setStyleReady(true);
    });
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
      if (!visiblePhotos.some((photo) => photo.id === id)) {
        marker.getPopup()?.remove();
        marker.remove();
        markers.current.delete(id);
      }
    }
    for (const photo of visiblePhotos) {
      if (markers.current.has(photo.id)) continue;
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'photo-marker';
      pin.setAttribute('aria-label', `View ${photo.name}`);
      const thumbnail = document.createElement('img');
      thumbnail.src = photo.url;
      thumbnail.alt = '';
      pin.append(thumbnail);
      const badge = document.createElement('span');
      badge.className = 'marker-number';
      badge.textContent = String(photos.findIndex((item) => item.id === photo.id) + 1);
      pin.append(badge);
      pin.title = `${photo.tags.join(', ')} — ${photo.name}`;
      const marker = new mapboxgl.Marker({ element: pin })
        .setLngLat([photo.longitude, photo.latitude]).addTo(instance);
      pin.addEventListener('click', (event) => {
        event.stopPropagation();
        setSelectedId(photo.id);
      });
      markers.current.set(photo.id, marker);
    }
  }, [photos, visiblePhotos]);

  useEffect(() => {
    const instance = map.current;
    if (!instance || !styleReady) return;
    for (const layer of ['biome-fill', 'biome-edge']) {
      instance.setLayoutProperty(layer, 'visibility', showBiomes ? 'visible' : 'none');
      instance.setFilter(layer, activeBiome ? ['==', ['get', 'id'], activeBiome] : null);
    }
  }, [showBiomes, activeBiome, styleReady]);

  useEffect(() => {
    if (!map.current || !styleReady) return;
    return showIndigenousLands(map.current, indigenousVisible);
  }, [indigenousVisible, styleReady]);

  useEffect(() => {
    if (!map.current || !styleReady) return;
    return showUrbanFootprint(map.current, urbanVisible);
  }, [urbanVisible, styleReady]);

  useEffect(() => {
    if (!map.current || !styleReady) return;
    return showConservationAreas(map.current, conservationVisible);
  }, [conservationVisible, styleReady]);

  useEffect(() => {
    if (!map.current || !styleReady) return;
    return showUrbanConcentrations(map.current, concentrationsVisible);
  }, [concentrationsVisible, styleReady]);

  useEffect(() => {
    if (!map.current || !styleReady) return;
    return showPopulationArrangements(map.current, arrangementsVisible);
  }, [arrangementsVisible, styleReady]);

  useEffect(() => {
    if (!map.current || !styleReady) return;
    return showImmediateRegions(map.current, immediateRegionsVisible);
  }, [immediateRegionsVisible, styleReady]);

  useEffect(() => {
    if (!map.current || !styleReady) return;
    return showDisasterRisk(map.current, disasterRiskVisible);
  }, [disasterRiskVisible, styleReady]);

  useEffect(() => {
    const instance = map.current;
    if (!instance || !styleReady) return;
    const data: RouteData = { type: 'FeatureCollection', features: [] };
    const source = instance.getSource('photo-route') as mapboxgl.GeoJSONSource | undefined;
    if (source) source.setData(data);
    else {
      instance.addSource('photo-route', { type: 'geojson', data });
      const labels = instance.getStyle()?.layers.find((layer) => layer.type === 'symbol')?.id;
      instance.addLayer({
        id: 'photo-route', type: 'line', source: 'photo-route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#955636', 'line-width': 3, 'line-opacity': 0.85 },
      }, labels);
    }
    instance.setLayoutProperty('photo-route', 'visibility', showRoute ? 'visible' : 'none');
    setRouteStatus('');
    if (!showRoute || visiblePhotos.length < 2 || !token) return;
    const controller = new AbortController();
    const key = JSON.stringify(visiblePhotos.map((photo) => [photo.longitude, photo.latitude]));
    const cached = routeCache.current.get(key);
    if (cached) {
      (instance.getSource('photo-route') as mapboxgl.GeoJSONSource).setData(cached);
      return;
    }
    setRouteStatus('Finding roads…');
    void getDrivingRoute(visiblePhotos, token, controller.signal).then((route) => {
      if (controller.signal.aborted) return;
      if (routeCache.current.size >= 30) routeCache.current.clear();
      routeCache.current.set(key, route);
      (instance.getSource('photo-route') as mapboxgl.GeoJSONSource).setData(route);
      setRouteStatus('');
    }).catch((error) => {
      if (!controller.signal.aborted) setRouteStatus(error instanceof Error ? error.message : 'Driving route unavailable.');
    });
    return () => controller.abort();
  }, [visiblePhotos, showRoute, styleReady, routeRetry]);

  return <div id="app">
    <main id="map" aria-label="Photo map">
      <div ref={container} style={{ position: 'absolute', inset: 0 }} />
      <section className={`map-filters ${menuOpen ? 'is-open' : 'is-minimized'}`} aria-label="Map controls">
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="map-menu-content" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Minimize −' : 'Tags & layers +'}
        </button>
        <div id="map-menu-content" hidden={!menuOpen}>
      <section className="biome-legend" aria-label="Northeast biomes">
        <div className="biome-heading"><div><h2>Biomes <small>2004</small></h2></div>
          <button aria-pressed={showBiomes} onClick={() => setShowBiomes(!showBiomes)}>{showBiomes ? 'Hide biomes' : 'Show biomes'}</button>
        </div>
        {showBiomes && <div className="biome-options">
          {biomes.map((biome) => <button key={biome.id} aria-pressed={activeBiome === biome.id}
            onClick={() => setActiveBiome(activeBiome === biome.id ? null : biome.id)} title={biome.description}>
            <span className="biome-swatch" style={{ backgroundColor: biome.color }} />{biome.name}
          </button>)}
          {activeBiome && <button onClick={() => setActiveBiome(null)}>Show all</button>}
        </div>}

        <div className="layer-grid">
          {[
            { label: 'Indigenous lands', color: '#826383', count: indigenousLandCount, checked: indigenousVisible, toggle: setIndigenousVisible },
            { label: 'Urban footprint', color: '#ad614c', count: urbanFootprintCount, checked: urbanVisible, toggle: setUrbanVisible },
            { label: 'Conservation', color: '#377e78', count: conservationAreaCount, checked: conservationVisible, toggle: setConservationVisible },
            { label: 'Urban concentrations', color: '#657da4', count: urbanConcentrationCount, checked: concentrationsVisible, toggle: setConcentrationsVisible },
            { label: 'Population arrangements', color: '#bb9350', count: populationArrangementCount, checked: arrangementsVisible, toggle: setArrangementsVisible },
            { label: 'Disaster-risk areas', color: '#c3544b', count: disasterRiskCount, checked: disasterRiskVisible, toggle: setDisasterRiskVisible },
            { label: 'Immediate regions', color: '#89745e', count: immediateRegionCount, checked: immediateRegionsVisible, toggle: setImmediateRegionsVisible },
          ].map((layer) => <label className="layer-row" key={layer.label}>
            <span className="biome-swatch" style={{ backgroundColor: layer.color }} />
            <span className="layer-name">{layer.label} <small>{layer.count.toLocaleString('en-US')}</small></span>
            <input type="checkbox" role="switch" checked={layer.checked} onChange={(event) => layer.toggle(event.target.checked)} aria-label={layer.label} />
          </label>)}
        </div>
        <details className="layer-notes"><summary>About the layers</summary>
          <p>Click mapped areas for details. Biomes: 2004. Population figures: 2010. Other dates are shown where supplied; some source dates are unspecified. Counts refer to extracted records. Disaster-risk polygons are an undated source snapshot, not live alerts or a severity classification.</p>
        </details>
      </section>

        <div className="tag-list" aria-label="Filter by mock location">
          <button aria-pressed={!activeTag} onClick={() => setActiveTag(null)}>All photos · {photos.length}</button>
          {tags.map((tag) => <button key={tag} aria-pressed={activeTag === tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}>
            {tag} · {photos.filter((photo) => photo.tags.includes(tag)).length}
          </button>)}
        </div>
        <div className="route-controls">
          <button aria-pressed={showRoute} onClick={() => setShowRoute(!showRoute)}>{showRoute ? 'Routes on' : 'Routes off'}</button>
          <button disabled={!visiblePhotos.length || !styleReady} onClick={() => {
            const bounds = new mapboxgl.LngLatBounds();
            visiblePhotos.forEach((photo) => bounds.extend([photo.longitude, photo.latitude]));
            map.current?.fitBounds(bounds, { padding: 100, maxZoom: 12 });
          }}>Fit photos</button>
          <span>{visiblePhotos.length} photos · Mock locations</span>
          {routeStatus && <span role="status">{routeStatus}</span>}
          {routeStatus && routeStatus !== 'Finding roads…' && <button onClick={() => setRouteRetry((value) => value + 1)}>Retry route</button>}
        </div>
        </div>
      </section>
      {hasToken && status && <p className="map-status" role="status" aria-live="polite">{status}</p>}
      {!hasToken && <div id="setup"><h2>Connect your map</h2>
        <p>Add your public Mapbox token to <code>.env.local</code>:</p>
        <pre>NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.…</pre>
        <p>Then restart the development server.</p>
      </div>}
    </main>
    {selectedIndex >= 0 && <Slideshow photos={visiblePhotos} initialIndex={selectedIndex} onClose={() => setSelectedId(null)} />}
  </div>;
}
