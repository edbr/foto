import mapboxgl from 'mapbox-gl';
import manifest from '../public/geo/population-arrangements/manifest.json';

export const populationArrangementCount = manifest.reduce((total, file) => total + file.count, 0);

export function showPopulationArrangements(map: mapboxgl.Map, visible: boolean) {
  const popup = new mapboxgl.Popup({ maxWidth: '280px' });
  const handlers: { id: string; click: (event: mapboxgl.MapLayerMouseEvent) => void }[] = [];
  const enter = () => { map.getCanvas().style.cursor = 'pointer'; };
  const leave = () => { map.getCanvas().style.cursor = ''; };
  for (const file of manifest) {
    const id = `arrangement-${file.state}`;
    if (!map.getSource(id) && visible) {
      map.addSource(id, { type: 'geojson', data: file.url, attribution: 'Population arrangements: supplied geobr CSV; population 2010' });
      map.addLayer({
        id, source: id, type: 'fill',
        paint: { 'fill-color': '#bb9350', 'fill-opacity': 0.22 },
      }, 'northeast-mask');
      map.addLayer({
        id: `${id}-outline`, source: id, type: 'line',
        paint: { 'line-color': '#8f692e', 'line-width': 1.5, 'line-opacity': 0.9 },
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
      heading.textContent = properties.name || 'Population arrangement';
      content.append(heading);
      for (const [label, value] of [['State', properties.state], ['Municipality code', properties.municipality], ['Municipality population (2010)', properties.population2010], ['Urban population (2010)', properties.urbanPopulation2010], ['Rural population (2010)', properties.ruralPopulation2010]]) {
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
