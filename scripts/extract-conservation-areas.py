"""uv run --with 'shapely>=2.1.2' --with 'numpy>=2.4' python scripts/extract-conservation-areas.py"""
import csv
import json
import sys
from collections import defaultdict
from pathlib import Path
from shapely import wkt, make_valid
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

root = Path(__file__).resolve().parents[1]
out = root / 'public/geo/conservation-areas'
out.mkdir(parents=True, exist_ok=True)
boundary = json.loads((root / 'public/geo/northeast-boundary.geojson').read_text())
region = unary_union([shape(f['geometry']) for f in boundary['features']])
csv.field_size_limit(sys.maxsize)
groups = defaultdict(list)
with (root / 'public/br_geobr_mapas_unidade_conservacao.csv').open() as source:
    for index, row in enumerate(csv.DictReader(source)):
        geometry = make_valid(wkt.loads(row['geometria'])).intersection(region)
        if geometry.is_empty or geometry.area == 0:
            continue
        if geometry.geom_type == 'GeometryCollection':
            geometry = unary_union([g for g in geometry.geoms if g.geom_type in ['Polygon', 'MultiPolygon']])
        geometry = geometry.simplify(0.0005, preserve_topology=True).intersection(region)
        assert geometry.is_valid and not geometry.is_empty
        state = {'Federal': 'federal', 'Estadual': 'state', 'Municipal': 'municipal'}.get(row['esfera'], 'other')
        groups[state].append({'type': 'Feature', 'properties': {
            'id': row['id_unidade_conservacao'], 'name': row['unidade_conservacao'],
            'category': row['categoria'], 'group': row['sigla_grupo'],
            'authority': row['organizacao_orgao'], 'sphere': row['esfera'],
            'created': row['ano_criacao'], 'updated': row['data_ultima'],
        }, 'geometry': mapping(geometry)})
manifest = []
for state, features in sorted(groups.items()):
    filename = f'{state.lower()}.geojson'
    content = json.dumps({'type': 'FeatureCollection', 'features': features}, ensure_ascii=False, separators=(',', ':'))
    (out / filename).write_text(content)
    manifest.append({'state': state, 'count': len(features), 'url': f'/geo/conservation-areas/{filename}'})
    print(state, len(features), 'features;', len(content.encode()), 'bytes')
(out / 'manifest.json').write_text(json.dumps(manifest, indent=2))
print('Total:', sum(x['count'] for x in manifest))
