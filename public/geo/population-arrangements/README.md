# Northeast population arrangements

Extracted from the supplied `public/br_geobr_mapas_arranjo_populacional.csv`: 953 national records. The regional extract contains 165 municipal records belonging to 52 distinct arrangement IDs, partitioned into ten files by source state.

Nine files cover northeast states; `to.geojson` contains three Tocantins municipal records with nonzero intersections with the supplied generalized northeast boundary. They retain their original state label and are clipped to the region. Small boundary intersections do not imply that those municipalities belong administratively to the northeast.

Geometries are repaired, clipped, simplified at 0.0005 degrees with topology preservation, then clipped again. Municipal polygons stay separate so population attributes remain attached to the correct source row. Population fields refer to 2010, not current population. They are not recalculated for clipped polygons and are not arrangement-wide totals. The CSV has no geometry publication date.

The layer uses ochre fills and outlines and loads only when enabled. Click an area for arrangement name, municipality code, and source population figures.

Regenerate:

```sh
uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-population-arrangements.py
```
