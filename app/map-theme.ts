import type { Map } from 'mapbox-gl';

// Sertão palette: sun-bleached earth, dry vegetation, clay, and dusty water.
export const mapColors = {
  sand: '#e7dfcf',
  earth: '#d4c8b2',
  scrub: '#c4bf8e',
  woodland: '#aaa77b',
  clay: '#b7805d',
  water: '#89aaa9',
  river: '#648e91',
  ink: '#594636',
  paper: '#f3eee3',
};

export function applyMapTheme(map: Map) {
  for (const layer of map.getStyle()?.layers ?? []) {
    const id = layer.id.toLowerCase();
    const source = 'source-layer' in layer ? layer['source-layer'] ?? '' : '';
    if (layer.type === 'background') {
      map.setPaintProperty(layer.id, 'background-color', mapColors.sand);
    } else if (layer.type === 'fill') {
      if (source === 'water' || id === 'water') {
        map.setPaintProperty(layer.id, 'fill-color', mapColors.water);
      } else if (source === 'landcover' || source === 'landuse' || /landcover|landuse|national-park/.test(id)) {
        map.setPaintProperty(layer.id, 'fill-color', [
          'match', ['get', 'class'],
          ['wood', 'forest'], mapColors.woodland,
          ['grass', 'scrub', 'park', 'national_park'], mapColors.scrub,
          ['sand', 'bare_rock'], mapColors.sand,
          mapColors.earth,
        ]);
      } else if (/hillshade/.test(id)) {
        map.setPaintProperty(layer.id, 'fill-color', id.includes('highlight') ? mapColors.paper : mapColors.clay);
      } else if (source === 'building') {
        map.setPaintProperty(layer.id, 'fill-color', '#c9ac88');
      }
    } else if (layer.type === 'line') {
      if (source === 'waterway' || /waterway/.test(id)) {
        map.setPaintProperty(layer.id, 'line-color', mapColors.river);
      } else if (source === 'contour' || /contour/.test(id)) {
        map.setPaintProperty(layer.id, 'line-color', mapColors.clay);
      } else if (source === 'road') {
        map.setPaintProperty(layer.id, 'line-color', /case|outline/.test(id) ? '#b99a77' : mapColors.paper);
      } else if (/admin|boundary/.test(id)) {
        map.setPaintProperty(layer.id, 'line-color', '#a68b73');
      }
    } else if (layer.type === 'symbol' && layer.layout?.['text-field']) {
      map.setPaintProperty(layer.id, 'text-color', /water|marine/.test(id) ? '#476d73' : mapColors.ink);
      map.setPaintProperty(layer.id, 'text-halo-color', mapColors.paper);
    } else if (layer.type === 'hillshade') {
      map.setPaintProperty(layer.id, 'hillshade-shadow-color', mapColors.clay);
      map.setPaintProperty(layer.id, 'hillshade-highlight-color', mapColors.paper);
      map.setPaintProperty(layer.id, 'hillshade-accent-color', '#977756');
    }
  }
}
