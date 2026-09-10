"""uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-disaster-risk.py"""
import csv
import json
import sys
from collections import defaultdict
from pathlib import Path
from shapely import wkt, make_valid
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

root = Path(__file__).resolve().parents[1]
out = root / 'public/geo/disaster-risk'
out.mkdir(parents=True, exist_ok=True)
boundary = json.loads((root / 'public/geo/northeast-boundary.geojson').read_text())
region = unary_union([shape(f['geometry']) for f in boundary['features']])
csv.field_size_limit(sys.maxsize)
groups = defaultdict(list)
with (root / 'public/br_geobr_mapas_area_risco_desastre.csv').open() as source:
    for index, row in enumerate(csv.DictReader(source)):
        if row['sigla_uf'] not in {'AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'}:
            continue
        geometry = make_valid(wkt.loads(row['geometria'])).intersection(region)
        if geometry.is_empty or geometry.area == 0:
            continue
        if geometry.geom_type == 'GeometryCollection':
            geometry = unary_union([g for g in geometry.geoms if g.geom_type in ['Polygon', 'MultiPolygon']])
        geometry = geometry.simplify(0.00005, preserve_topology=True).intersection(region)
        assert geometry.is_valid and not geometry.is_empty
        state = row['sigla_uf'] or 'unknown'
        groups[state].append({'type': 'Feature', 'properties': {
            'id': row['geocodigo_bater'], 'state': state,
            'municipality': row['id_municipio'], 'origin': row['origem'],
            'accuracy': row['acuracia'], 'notes': row['observacao'],
        }, 'geometry': mapping(geometry)})
manifest = []
for state, features in sorted(groups.items()):
    filename = f'{state.lower()}.geojson'
    content = json.dumps({'type': 'FeatureCollection', 'features': features}, ensure_ascii=False, separators=(',', ':'))
    (out / filename).write_text(content)
    manifest.append({'state': state, 'count': len(features), 'url': f'/geo/disaster-risk/{filename}'})
    print(state, len(features), 'features;', len(content.encode()), 'bytes')
(out / 'manifest.json').write_text(json.dumps(manifest, indent=2))
print('Total:', sum(x['count'] for x in manifest))
