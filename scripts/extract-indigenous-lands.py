"""uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-indigenous-lands.py"""
import csv
import json
import sys
from collections import defaultdict
from pathlib import Path
from shapely import wkt, make_valid
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

root = Path(__file__).resolve().parents[1]
out = root / 'public/geo/indigenous-lands'
out.mkdir(parents=True, exist_ok=True)
boundary = json.loads((root / 'public/geo/northeast-boundary.geojson').read_text())
region = unary_union([shape(f['geometry']) for f in boundary['features']])
states = {'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA'}
csv.field_size_limit(sys.maxsize)
groups = defaultdict(list)
with (root / 'public/br_geobr_mapas_terra_indigena.csv').open() as source:
    for row in csv.DictReader(source):
        geometry = make_valid(wkt.loads(row['geometria'])).intersection(region)
        if geometry.is_empty or geometry.area == 0:
            continue
        if geometry.geom_type == 'GeometryCollection':
            geometry = unary_union([g for g in geometry.geoms if g.geom_type in ['Polygon', 'MultiPolygon']])
        geometry = geometry.simplify(0.0005, preserve_topology=True).intersection(region)
        assert geometry.is_valid and not geometry.is_empty
        state = next((uf for uf in row['sigla_uf'].split(',') if uf in states), 'border')
        groups[state].append({'type': 'Feature', 'properties': {
            'id': row['id_geografico'], 'name': row['terra_indigena'],
            'people': row['etnia'], 'state': row['sigla_uf'],
            'municipality': row['nome_municipio'], 'phase': row['fase'],
        }, 'geometry': mapping(geometry)})
manifest = []
for state, features in sorted(groups.items()):
    filename = f'{state.lower()}.geojson'
    content = json.dumps({'type': 'FeatureCollection', 'features': features}, ensure_ascii=False, separators=(',', ':'))
    (out / filename).write_text(content)
    manifest.append({'state': state, 'count': len(features), 'url': f'/geo/indigenous-lands/{filename}'})
    print(state, len(features), 'features;', len(content.encode()), 'bytes')
(out / 'manifest.json').write_text(json.dumps(manifest, indent=2))
print('Total:', sum(x['count'] for x in manifest))
