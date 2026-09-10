# Northeast disaster-risk areas

Derived from the supplied `public/br_geobr_mapas_area_risco_desastre.csv` (8,309 national rows). The extract contains 1,720 polygon records from northeast states, split into nine files.

Geometries are repaired, clipped to the IBGE regional boundary, simplified with topology preservation at 0.00005 degrees, and clipped again. The smaller tolerance preserves detail in these relatively small areas. This regional visualization is not suitable for determining parcel-level boundaries.

Source properties retain the BATER geocode, municipality code, state, origin, accuracy, and notes. Blank fields are omitted from popups. The CSV has no date, hazard type, or severity field, so no current alerts or severity categories are inferred. A single red style identifies mapped areas only. Notes referring to the 2010 census do not establish a geometry publication date.

The layer starts disabled and loads only when enabled. The browser does not load the original CSV.

Regenerate:

```sh
uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-disaster-risk.py
```
