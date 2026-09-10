import mapboxgl from 'mapbox-gl';
import manifest from '../public/geo/urban-footprint/manifest.json';

export const urbanFootprintCount = manifest.reduce((total, file) => total + file.count, 0);

export function showUrbanFootprint(map: mapboxgl.Map, visible: boolean) {
  const popup = new mapboxgl.Popup({ maxWidth: '280px' });
  const handlers: { id: string; click: (event: mapboxgl.MapLayerMouseEvent) => void }[] = [];
  const enter = () => { map.getCanvas().style.cursor = 'pointer'; };
  const leave = () => { map.getCanvas().style.cursor = ''; };
  for (const file of manifest) {
    const id = `urban-${file.state}`;
    if (!map.getSource(id) && visible) {
      map.addSource(id, { type: 'geojson', data: file.url, attribution: 'Urban footprint: supplied geobr CSV (date unspecified)' });
      map.addLayer({
        id, source: id, type: 'fill',
        paint: { 'fill-color': ['match', ['get', 'density'], 'Densa', '#ad614c', '#d99b76'], 'fill-opacity': 0.65 },
      }, 'northeast-mask');
      map.addLayer({
        id: `${id}-outline`, source: id, type: 'line',
        paint: { 'line-color': '#8e4d3b', 'line-width': 0.8, 'line-opacity': 0.9 },
      }, 'northeast-mask');
    }
    if (!map.getLayer(id)) continue;
    for (const layer of [id, `${id}-outline`]) map.setLayoutProperty(layer, 'visibility', visible ? 'visible' : 'none');
    if (!visible) continue;
    const click = (event: mapboxgl.MapLayerMouseEvent) => {
      const feature = event.features?.[0] as unknown as { properties?: Record<string, string> } | undefined;
      const properties = feature?.properties;
      if (!properties) return;
      const content = document.createElement('div');
      content.className = 'land-popup';
      const heading = document.createElement('strong');
      heading.textContent = properties.type || 'Urban footprint';
      content.append(heading);
      for (const [label, value] of [['Density', properties.density], ['State', properties.state], ['Municipality code', properties.municipality]]) {
        if (!value) continue;
        const line = document.createElement('p');
        line.textContent = `${label}: ${value}`;
        content.append(line);
      }
      popup.setLngLat(event.lngLat).setDOMContent(content).addTo(map);
    };
    map.on('click', id, click);
    map.on('mouseenter', id, enter);
    map.on('mouseleave', id, leave);
    handlers.push({ id, click });
  }
  return () => {
    popup.remove();
    for (const { id, click } of handlers) {
      map.off('click', id, click);
      map.off('mouseenter', id, enter);
      map.off('mouseleave', id, leave);
    }
    if (handlers.length) map.getCanvas().style.cursor = '';
  };
}
