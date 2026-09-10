import type { Map } from 'mapbox-gl';

export const biomes = [
  { id: 'CAAT', name: 'Caatinga', color: '#d7be96', description: 'Dry woodland and thorn scrub' },
  { id: 'CER', name: 'Cerrado', color: '#b5b58b', description: 'Tropical savanna' },
  { id: 'MAT', name: 'Mata Atlântica', color: '#80a392', description: 'Atlantic forest' },
  { id: 'AMZ', name: 'Amazônia', color: '#648b79', description: 'Amazon forest' },
];

export function addBiomeLayers(map: Map) {
  map.addSource('northeast-biomes', {
    type: 'geojson', data: '/geo/northeast-biomes.geojson',
    attribution: 'Biomes: supplied geobr CSV (2004) · Region: IBGE',
  });
  // Keep water, terrain detail, roads, and labels above the biome colors.
  const before = map.getStyle()?.layers.find((layer) => {
    const source = 'source-layer' in layer ? layer['source-layer'] : '';
    return source === 'water' || layer.type === 'hillshade' || /hillshade/.test(layer.id);
  })?.id;
  map.addLayer({
    id: 'biome-fill', type: 'fill', source: 'northeast-biomes',
    paint: {
      'fill-color': ['match', ['get', 'id'], 'CAAT', '#d7be96', 'CER', '#b5b58b', 'MAT', '#80a392', 'AMZ', '#648b79', '#e7dfcf'],
      'fill-opacity': 0.72,
    },
  }, before);
  map.addLayer({
    id: 'biome-edge', type: 'line', source: 'northeast-biomes',
    paint: { 'line-color': '#756e54', 'line-width': 0.7, 'line-opacity': 0.3 },
  }, before);
  map.addSource('northeast-mask', { type: 'geojson', data: '/geo/northeast-mask.geojson' });
  map.addLayer({ id: 'northeast-mask', type: 'fill', source: 'northeast-mask', paint: { 'fill-color': '#eeeae0', 'fill-opacity': 0.96 } });
  map.addSource('northeast-boundary', { type: 'geojson', data: '/geo/northeast-boundary.geojson' });
  map.addLayer({ id: 'northeast-boundary', type: 'line', source: 'northeast-boundary', paint: { 'line-color': '#8d826b', 'line-width': 1.5, 'line-opacity': 0.65 } });
}
