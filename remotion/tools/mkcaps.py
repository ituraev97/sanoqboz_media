"""mkcaps.py EP — EP/words.json (+ EP/meta.json "caps": {"merge":[[["bir","ming"],"1 000"]...], "kw":[words to box]}) -> EP/rv/caps.ts
Prints every caption word with its start time (copy the important ones into T in rv/ep.ts)."""
import json, re, sys, os
EP = sys.argv[1]; w = json.load(open(f'{EP}/words.json')); M = json.load(open(f'{EP}/meta.json')).get('caps', {})
MERGE = [(a, b) for a, b in M.get('merge', [])]; KW = set(M.get('kw', []))
out = []; i = 0
while i < len(w):
    m = None
    for seq, disp in MERGE:
        if [x[0] for x in w[i:i + len(seq)]] == seq: m = (len(seq), disp); break
    if m:
        n, d = m; out.append({'w': d, 's': round(w[i][1], 2), 'e': round(w[i + n - 1][2], 2), 'k': 1}); i += n; continue
    t = w[i][0]
    if t == '—':
        if out: out[-1]['w'] += ' —'
        i += 1; continue
    base = re.sub(r'[^\w‘’-]', '', t)
    out.append({'w': t, 's': round(w[i][1], 2), 'e': round(w[i][2], 2), 'k': 1 if (t in KW or base in KW) else 0}); i += 1
phr = []; cur = []
for j, o in enumerate(out):
    cur.append(o); nxt = out[j + 1]['s'] if j + 1 < len(out) else 999
    if re.search(r'[.?,:!—]$', o['w']) or len(cur) >= 4 or nxt - o['e'] > 0.35 or len(' '.join(x['w'] for x in cur)) > 20:
        phr.append(cur); cur = []
if cur: phr.append(cur)
os.makedirs(f'{EP}/rv', exist_ok=True)
open(f'{EP}/rv/caps.ts', 'w').write('export const CAPS:{w:string;s:number;e:number;k:number}[][]=' + json.dumps(phr, ensure_ascii=False) + ';\n')
print(len(phr), 'caption lines; last word ends', out[-1]['e'])
print(' | '.join(f"{o['w']} {o['s']}" for o in out))
