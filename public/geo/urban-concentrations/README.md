# Northeast urban concentrations

Extracted from `public/br_geobr_mapas_concentracao_urbana.csv`: 642 national records. The northeast extract contains 109 municipal records belonging to 37 distinct concentration IDs, split into nine state files.

Source geometries are repaired, clipped to the IBGE northeast boundary, simplified at 0.0005 degrees with topology preservation, then clipped again. Municipal polygons are kept separate so their population attributes remain correctly associated. Population fields explicitly refer to 2010; the CSV has no separate geometry publication date. Values are retained from each original municipal row, not recalculated for clipped areas or represented as concentration-wide totals.

The overlay uses slate blue fills and outlines. Click to see the concentration name, municipality code, and source population figures. GeoJSON files load only when the layer is first enabled; the original CSV is not fetched by the browser.

Regenerate:

```sh
uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-urban-concentrations.py
```
