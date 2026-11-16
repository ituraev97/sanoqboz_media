# sanoqboz 3D style (owner rule 2026-11-17 — the standard way from now on)

Reference episodes: `episodes/044-maybax-sakrash/` (real Sketchfab model, light studio — **copy this one**), `episodes/043-ezilish-zonasi/` (procedural cars, dark studio).
Kit: `remotion/src/s3d.tsx` (three.js through @remotion/three). Everything is a pure function of t (no useFrame).

## Look
- Real 3D model of the hero object (car, plane, phone, building…) in a studio: `Studio theme="light"` (warm cream, owner: "фон приятный")
  + glossy floor reflection (mirrored copy) + soft `Shadow`. Background CSS `BG.light`. Dark grey theme only on purpose.
- Big 1-2 word captions at y≈1300, dark ink `#1c1e23`, keywords on a yellow pill. Chapter pill at top (y 372), logo + @sanoqboz at y 262.
- Dot callouts on 3D points (`Callout` with `project(cam, p)`), big counters (`BigNum`), x-ray mode (`xray`, `springs`) for "how it works inside".
- Camera: `Rig cam={{pos, look, fov}}`; every camera is pushed back by `DIST` (1.7) along its view line. Whip-blur at shot cuts.
- Sources line at y 1440 (mono, small). No brand logos drawn by us; a real product's own model is fine when the topic is that product.

## Models (Sketchfab API, token is in the scheduled-task prompt — never commit or print it)
```bash
curl -G https://api.sketchfab.com/v3/search --data-urlencode type=models --data-urlencode q="maybach gls" --data-urlencode downloadable=true
# pick: license CC Attribution / CC0 (NEVER NonCommercial), glb size < 30 MB, faceCount < 600k
curl -H "Authorization: Token $SKETCHFAB_TOKEN" https://api.sketchfab.com/v3/models/<uid>/download   # -> .glb.url (short-lived)
```
Save to `remotion/public/models/<name>.glb` (git-ignored). Credit CC-BY authors in the post caption: `3D: <author> (Sketchfab, CC BY)`.
Many Sketchfab glb exports have **no colours** (all white): paint by material name with `paint={PAINT}` (see 044). Find which material is
which with a debug still that colours each material group (044 history), then map real colours.
`GlbCar` splits wheels (material/node names wheel|tire|rim|brake…) from the body so the body can `lift/pitch/roll` (bounce) and shows coil springs.
Other free CC0 sources reachable: Poly Haven (api.polyhaven.com), Smithsonian 3D (3d-api.si.edu), Kenney (kenney.nl), Khronos samples on GitHub.

## Voice — Edge TTS (free, no ElevenLabs credits)
`python3 pipeline/tts_edge.py EP [voice] [rate]` — default `uz-UZ-SardorNeural`, `+12%`; script.txt → raw.mp3, nar_f.wav (pauses capped 0.42 s), words.json
(word timings from the service). Numbers as words in script.txt; `meta.json caps.merge` turns them into digits; `python3 pipeline/caps3d.py EP` → rv/caps.ts.

## Render
`GL=swangle` is required on CPU-only containers: `GL=swangle bash remotion/tools/stills.sh …`, `GL=swangle bash remotion/tools/render.sh EP`
(~35 min for 40 s). glTF loading: `useGlb` holds delayRender until the model is drawn.
