"""Run: uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-biomes.py"""
import csv
import json
import sys
from pathlib import Path
from shapely import wkt, make_valid
from shapely.geometry import shape, mapping, box
from shapely.ops import unary_union

root = Path(__file__).resolve().parents[1]
out = root / 'public/geo'
boundary = json.loads((out / 'northeast-boundary.geojson').read_text())
region = unary_union([shape(f['geometry']) for f in boundary['features']])
csv.field_size_limit(sys.maxsize)
features = []
with (root / 'public/br_geobr_mapas_bioma.csv').open() as source:
    for row in csv.DictReader(source):
        if row['ano'] != '2004' or row['id_bioma'] not in ['AMZ', 'CAAT', 'CER', 'MAT']:
            continue
        clipped = make_valid(wkt.loads(row['geometria'])).intersection(region)
        if clipped.is_empty:
            continue
        simplified = clipped.simplify(0.003, preserve_topology=True)
        assert simplified.is_valid
        features.append({'type': 'Feature', 'properties': {
            'name': row['nome_bioma'], 'year': 2004, 'id': row['id_bioma'],
        }, 'geometry': mapping(simplified)})
result = {'type': 'FeatureCollection', 'features': features}
(out / 'northeast-biomes.geojson').write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')))
mask = box(-180, -85, 180, 85).difference(region)
(out / 'northeast-mask.geojson').write_text(json.dumps({'type': 'Feature', 'properties': {}, 'geometry': mapping(mask)}, separators=(',', ':')))
print('Biomes:', [f['properties']['name'] for f in features])
print('Region bounds:', region.bounds)
print('Overlay bytes:', (out / 'northeast-biomes.geojson').stat().st_size)
