"""caps3d.py EP — words.json + meta.json caps -> EP/rv/caps.ts in the 3D style: 1-2 words per line (big, centred)."""
import json, re, sys
EP = sys.argv[1]; w = json.load(open(f'{EP}/words.json')); M = json.load(open(f'{EP}/meta.json'))['caps']
MERGE = M.get('merge', []); KW = set(M.get('kw', [])); NUM = re.compile(r'\d')
out = []; i = 0
while i < len(w):
    hit = next(((len(a), b) for a, b in MERGE if [x[0] for x in w[i:i + len(a)]] == a), None)
    if hit: n, d = hit; out.append({'w': d, 's': w[i][1], 'e': w[i + n - 1][2], 'k': 1}); i += n; continue
    t = w[i][0]; out.append({'w': t, 's': w[i][1], 'e': w[i][2], 'k': int(t in KW)}); i += 1
lines = []; cur = []
for j, o in enumerate(out):
    cur.append(o); nxt = out[j + 1] if j + 1 < len(out) else None
    txt = ' '.join(x['w'] for x in cur)
    if re.search(r'[.?,:!—]$', o['w']) or len(cur) >= 2 or (nxt and len(txt + nxt['w']) > 15) or (nxt and nxt['s'] - o['e'] > .3) or o['k'] and NUM.search(o['w']):
        lines.append(cur); cur = []
if cur: lines.append(cur)
open(f'{EP}/rv/caps.ts', 'w').write('export const CAPS:{w:string;s:number;e:number;k:number}[][]=' + json.dumps(lines, ensure_ascii=False) + ';\n')
print(len(lines), 'lines'); print(' / '.join(' '.join(x['w'] for x in l) + f" {l[0]['s']}" for l in lines))
