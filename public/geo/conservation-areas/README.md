# Northeast conservation areas

Derived from the user-supplied `public/br_geobr_mapas_unidade_conservacao.csv`: 1,934 national rows, of which 415 have a nonzero intersection with the IBGE northeast regional boundary.

Geometries are repaired, clipped, simplified with topology preservation at 0.0005 degrees, then clipped again. Three smaller files group the records by their source administrative sphere: federal (179), state (218), and municipal (18). Cross-boundary areas are only represented by their northeast portion; marine areas outside the regional boundary are excluded.

The layer loads only when enabled. Popups preserve the source's name, category, group code, authority, administrative sphere, creation year, and last-update date. Those dates describe individual source records, not a verified current dataset edition. Different colors distinguish the source group code `PI` from other values.

Regenerate from the project root:

```sh
uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-conservation-areas.py
```
