import mapboxgl from 'mapbox-gl';
import manifest from '../public/geo/immediate-regions/manifest.json';

export const immediateRegionCount = manifest.reduce((total, file) => total + file.count, 0);

export function showImmediateRegions(map: mapboxgl.Map, visible: boolean) {
  const popup = new mapboxgl.Popup({ maxWidth: '280px' });
  const handlers: { id: string; click: (event: mapboxgl.MapLayerMouseEvent) => void }[] = [];
  const enter = () => { map.getCanvas().style.cursor = 'pointer'; };
  const leave = () => { map.getCanvas().style.cursor = ''; };
  for (const file of manifest) {
    const id = `immediate-${file.state}`;
    if (!map.getSource(id) && visible) {
      map.addSource(id, { type: 'geojson', data: file.url, attribution: 'Immediate regions: supplied geobr CSV (date unspecified)' });
      map.addLayer({
        id, source: id, type: 'fill',
        paint: { 'fill-color': '#89745e', 'fill-opacity': 0.07 },
      }, 'northeast-mask');
      map.addLayer({
        id: `${id}-outline`, source: id, type: 'line',
        paint: { 'line-color': '#735e4b', 'line-width': 1.3, 'line-dasharray': [3, 2], 'line-opacity': 0.9 },
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
      heading.textContent = `Immediate region ${properties.id}`;
      content.append(heading);
      for (const [label, value] of [['Region code', properties.id], ['State', properties.state], ['State code', properties.stateCode]]) {
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
