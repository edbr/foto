# Northeast Indigenous lands

Derived from the supplied `public/br_geobr_mapas_terra_indigena.csv` (615 national records). No date field is present; the data is displayed as an undated source snapshot, not a claim about current legal status.

81 records have a nonzero intersection with the IBGE northeast boundary. Geometries are repaired, clipped, simplified at 0.0005 degrees with topology preservation, and clipped again. Files are grouped by the source state abbreviation; `border.geojson` contains intersecting records whose source state is outside the northeast. These are partial regional geometries, not necessarily the full territories. Missing states mean no intersecting records in this extract, not an assertion that no Indigenous lands exist there.

The map fetches the small GeoJSON partitions when the Indigenous lands toggle is first enabled. The CSV is not loaded by the browser. Properties retain land name, peoples, municipality, state, and recorded status. Area values are omitted because clipping changes area and the source field does not specify units.

Regenerate:

```sh
uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-indigenous-lands.py
```
