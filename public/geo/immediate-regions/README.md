# Northeast immediate regions

Derived from the supplied `public/br_geobr_mapas_regiao_imediata.csv` (510 national records). The extract keeps 154 records whose source state belongs to the northeast, partitioned into nine GeoJSON files.

Geometries are repaired, intersected with the IBGE northeast boundary, simplified at 0.0005 degrees with topology preservation, and clipped again. Neighboring-state records are excluded even if differences between boundary datasets produce tiny intersections. Simplification is suitable for regional display, not surveying.

The source provides region codes, state codes, and state abbreviations. It contains no region names or publication date; the UI does not invent them. The map uses subtle fills and dashed brown outlines, with source codes and state details in click popups. Files load only when enabled.

Regenerate from the project root:

```sh
uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-immediate-regions.py
```
