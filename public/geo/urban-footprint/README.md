# Northeast urban footprint

Derived from `public/br_geobr_mapas_pegada_urbana.csv`: 13,712 national rows, with 2,023 polygon records intersecting the IBGE northeast boundary. The supplied CSV has no date field.

Geometries are repaired, clipped to the regional boundary, simplified with a topology-preserving tolerance of 0.00015 degrees, and clipped again. Nine GeoJSON files partition records by the state prefix of their municipality code. The browser fetches these files only when the layer is first enabled; it does not load the original CSV.

Properties retain municipality code, density, and area type. The source footprint ID is blank in some rows, so source row indexes provide feature IDs. Source area values are omitted because clipping changes area and the CSV does not specify units. Colors distinguish `Densa` from other density values, preserving original labels in popups.

Regenerate from the project root:

```sh
uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-urban-footprint.py
```
