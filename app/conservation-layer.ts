import mapboxgl from 'mapbox-gl';
import manifest from '../public/geo/conservation-areas/manifest.json';

export const conservationAreaCount = manifest.reduce((total, file) => total + file.count, 0);

export function showConservationAreas(map: mapboxgl.Map, visible: boolean, t: (text: string) => string = (text) => text) {
  // Retain the element: Mapbox clears getCanvas() when the map is removed.
  const canvas = map.getCanvas();
  const popup = new mapboxgl.Popup({ maxWidth: '280px' });
  const handlers: { id: string; click: (event: mapboxgl.MapLayerMouseEvent) => void }[] = [];
  const enter = () => { canvas.style.cursor = 'pointer'; };
  const leave = () => { canvas.style.cursor = ''; };
  for (const file of manifest) {
    const id = `conservation-${file.state}`;
    if (!map.getSource(id) && visible) {
      map.addSource(id, { type: 'geojson', data: file.url, attribution: 'Conservation areas: supplied geobr CSV' });
      map.addLayer({
        id, source: id, type: 'fill',
        paint: { 'fill-color': ['match', ['get', 'group'], 'PI', '#377e78', '#8db8a4'], 'fill-opacity': 0.35 },
      }, 'northeast-mask');
      map.addLayer({
        id: `${id}-outline`, source: id, type: 'line',
        paint: { 'line-color': '#306b65', 'line-width': 1.2, 'line-opacity': 0.9 },
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
      heading.textContent = properties.name || 'Conservation area';
      content.append(heading);
      for (const [label, value] of [['Category', properties.category], ['Group (source)', properties.group], ['Administration', properties.sphere], ['Authority', properties.authority], ['Created', properties.created], ['Source updated', properties.updated]]) {
        if (!value) continue;
        const line = document.createElement('p');
        line.textContent = `${t(label)}: ${t(label === 'Category' && value === 'Floresta' ? 'Forest' : value)}`;
        content.append(line);
      }
      popup.setLngLat(event.lngLat).setDOMContent(content).addTo(map);
      const close = popup.getElement()?.querySelector('button');
      close?.setAttribute('aria-label', t('Close popup'));
      close?.setAttribute('title', t('Close popup'));
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
    if (handlers.length) canvas.style.cursor = '';
  };
}
