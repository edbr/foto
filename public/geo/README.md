# Northeast biome overlay

`northeast-biomes.geojson` is extracted from the user-provided `public/br_geobr_mapas_bioma.csv`. It uses the complete 2004 terrestrial biome set. The CSV's 2019 Amazônia row has no geometry, so years are not mixed. This is a biome boundary map, not a current vegetation or drought map.

The polygons are intersected with the IBGE Northeast region boundary and simplified with a topology-preserving tolerance of 0.003 degrees for regional display. Small boundary differences can occur from simplification. Four biomes intersect the region: Caatinga, Cerrado, Mata Atlântica, and Amazônia.

`northeast-boundary.geojson` was downloaded from the IBGE mesh API on 2026-09-09:
https://servicodados.ibge.gov.br/api/v3/malhas/regioes/2?formato=application/vnd.geo+json&qualidade=minima

This generalized boundary is appropriate for the regional overview, not detailed coastal surveying. `northeast-mask.geojson` dims the area outside this boundary. Camera bounds also restrict panning to the regional vicinity.

Regenerate the derived files from the project root:

```sh
uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-biomes.py
```

The browser loads only the extracted GeoJSON, not the original CSV.
