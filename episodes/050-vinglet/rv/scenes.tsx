import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { W, H, FPS, Y, RED, GRN, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { ShareEnd } from '../kit';
import { Logo } from '../Art';
import { Studio, Rig, Shadow, Cam, V3, mixCam, project, TopPill, Callout, BigNum, BG, useGlb } from '../s3d';
import { CAPS } from './caps';
import { END, CH, T } from './ep';

/* 3D: "B737-800 Blank Livery" by someone353 (Sketchfab, CC BY 4.0) — untextured, painted here by position (shader).
   Model space (metres): x = span (tips ±17.9 with winglets), y = length (nose −19.5, tail +19.9), z = up (gear 1.5, fin 14.1).
   Winglet = |x| > 16.75 and z > WZ. Vortices, pressure labels, the winter hat are ours (schematic). */
const INK = '#1c1e23', F = 'b738.glb';
const K = 4.4 / 39.5, Y0 = .55, WZ = 5.95, WH_ = 2.25; // fit scale, flight height above the floor, winglet base / height (model z)
const BLU = '#2f7cf6', DEBUG = false;
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const CUTS = [3.85, 7.25, 14.45, 21.6, 25.6, 30.4, 34.7, 38.5];
/* model -> world */
const M = (x: number, y: number, z: number, o: V3 = [0, 0, 0]): V3 => [x * K + o[0], (z - 1.5) * K + Y0 + o[1], -(y - .175) * K + o[2]];

type U = { uGrow: { value: number }; uHi: { value: number }; uDbg: { value: number } };
type Prepped = { wrap: THREE.Group; U: U };
const CACHE: Record<string, Prepped> = {};
const UNI: U = { uGrow: { value: 1 }, uHi: { value: 0 }, uDbg: { value: DEBUG ? 1 : 0 } };
const prep = (src: THREE.Group, key: string): Prepped => {
  if (CACHE[key]) return CACHE[key];
  const o = src.clone(true);
  const wrap = new THREE.Group(); wrap.add(o);
  o.scale.setScalar(K); o.position.set(0, -1.5 * K, .175 * K);
  let mi = 0;
  o.traverse((m: any) => {
    if (!m.isMesh) return;
    const nm = (m.material?.name ?? '') as string;
    if (/Roboto/.test(nm)) { m.visible = false; return; }
    if (/Transparent|DoNothing/.test(nm)) { m.material = new THREE.MeshStandardMaterial({ color: '#1d2430', metalness: .6, roughness: .15 }); return; }
    const mat = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: .25, roughness: .32, side: THREE.DoubleSide });
    const idx = mi++;
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, UNI, { uIdx: { value: idx } });
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vO;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvO = position;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vO; uniform float uGrow, uHi, uDbg, uIdx;')
        .replace('#include <color_fragment>', `#include <color_fragment>
float wl = step(16.75, abs(vO.x)) * step(${WZ.toFixed(2)}, vO.z);
if (wl > .5 && vO.z > ${WZ.toFixed(2)} + uGrow * ${WH_.toFixed(2)} + .02) discard;
vec3 c = vec3(.95, .955, .965);
c = mix(c, vec3(.78, .81, .86), 1.0 - smoothstep(3.1, 3.4, vO.z));
float eng = step(3.2, abs(vO.x)) * step(abs(vO.x), 7.2) * step(vO.z, 4.75) * step(vO.y, -1.5);
c = mix(c, vec3(.55, .58, .63), eng);
float fin = step(8.6, vO.z) * step(10.0, vO.y);
c = mix(c, vec3(.11, .30, .62), fin);
c = mix(c, vec3(.11, .30, .62), wl * (1.0 - uHi));
c = mix(c, vec3(1.0, .78, .12), wl * uHi);
if (uDbg > .5) c = 0.5 + 0.5 * cos(6.28 * (uIdx / 13.0 + vec3(0., .33, .67)));
diffuseColor.rgb = c;`);
    };
    mat.customProgramCacheKey = () => 'b738-v1-' + idx;
    m.material = mat;
  });
  return (CACHE[key] = { wrap, U: UNI });
};

const Plane: React.FC<{ m: boolean; id?: string; at?: V3; ry?: number; grow?: number; hi?: number; bank?: number }> = ({ m, id = 'a', at = [0, 0, 0], ry = 0, grow = 1, hi = 0, bank = 0 }) => {
  const src = useGlb(F);
  const pr = useMemo(() => (src ? prep(src, id + (m ? 'm' : '')) : null), [src, m, id]);
  if (!pr) return null;
  UNI.uGrow.value = grow; UNI.uHi.value = hi;
  return <group position={at} rotation={[0, ry, bank]}><group position={[0, Y0, 0]}><primitive object={pr.wrap} /></group></group>;
};

/* wingtip vortex: 4 strands of glowing beads spiralling back (−z) from the tip; s = strength (1 no winglet, ~.35 with) */
const NV = 640;
const Vortex: React.FC<{ side: 1 | -1; t: number; a: number; s: number; tipZ: number; o?: V3; len?: number }> = ({ side, t, a, s, tipZ, o = [0, 0, 0], len = 4.2 }) => {
  const im = useMemo(() => new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshBasicMaterial({ color: BLU, toneMapped: false, transparent: true, opacity: .85, depthWrite: false }), NV), []);
  if (a <= .01) return null;
  const tip = M(side * 17.6, 6.2, tipZ, o), ob = new THREE.Object3D();
  for (let i = 0; i < NV; i++) {
    const j = i % 4, u = ((Math.floor(i / 4) / (NV / 4)) + t * .35) % 1, d = u * len;
    const r = s * .3 * (.2 + .8 * (1 - Math.exp(-d * 2.2)));
    const th = j * Math.PI / 2 - d * 4.5 + t * 7 * side;
    ob.position.set(tip[0] - side * r * .25 + side * Math.cos(th) * r, tip[1] - r * .15 + Math.sin(th) * r, tip[2] - d);
    const sc = (.006 + .007 * s) * (1 - u * .5) * a; ob.scale.set(sc, sc, sc * 1.6); ob.updateMatrix(); im.setMatrixAt(i, ob.matrix);
  }
  im.instanceMatrix.needsUpdate = true; (im.material as THREE.MeshBasicMaterial).opacity = .85 * a;
  return <primitive object={im} />;
};
/* air sneaking from under the wing around the tip (short arcs of beads) */
const Curl: React.FC<{ t: number; a: number }> = ({ t, a }) => {
  const im = useMemo(() => new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshBasicMaterial({ color: '#ff5a3c', toneMapped: false, transparent: true, depthWrite: false }), 90), []);
  if (a <= .01) return null;
  const ob = new THREE.Object3D();
  for (let i = 0; i < 90; i++) {
    const lane = i % 6, u = ((Math.floor(i / 6) / 15) + t * .6) % 1, x = 13.5 + u * 5.2;
    const zz = x < 17.6 ? 4.6 - lane * .05 : 4.6 + (x - 17.6) * 0;
    const ang = x < 17.6 ? -Math.PI / 2 : -Math.PI / 2 + Math.min(Math.PI * 1.2, (x - 17.6) * 3.2);
    const R = .9, cx = 17.6, cz = 5.5;
    const p = x < 17.6 ? M(x, 1.2 + lane * .9, zz) : M(cx + Math.cos(ang) * R, 1.2 + lane * .9, cz + Math.sin(ang) * R);
    ob.position.set(...p); const sc = .011 * a; ob.scale.set(sc, sc, sc); ob.updateMatrix(); im.setMatrixAt(i, ob.matrix);
  }
  im.instanceMatrix.needsUpdate = true;
  return <primitive object={im} />;
};
/* knitted winter hat (generic) */
const Hat: React.FC<{ p: V3; s: number; a: number }> = ({ p, s, a }) => {
  const geo = useMemo(() => { const pts: THREE.Vector2[] = []; for (let i = 0; i <= 20; i++) { const u = i / 20 * Math.PI / 2; pts.push(new THREE.Vector2(Math.cos(u) * 1, Math.sin(u) * 1.15)); } return new THREE.LatheGeometry(pts, 40); }, []);
  if (a <= 0) return null;
  return <group position={p} scale={s * eback(a)} rotation={[.12, 0, -.15]}>
    <mesh geometry={geo}><meshStandardMaterial color="#d8312b" roughness={.9} /></mesh>
    {[.25, .55].map((h, i) => <mesh key={i} position={[0, h, 0]}><cylinderGeometry args={[Math.cos(Math.asin(h / 1.15)) * 1.012, Math.cos(Math.asin((h + .12) / 1.15)) * 1.012, .12, 40, 1, true]} /><meshStandardMaterial color="#f5f1e8" roughness={.9} side={THREE.DoubleSide} /></mesh>)}
    <mesh position={[0, .02, 0]}><torusGeometry args={[1.0, .16, 12, 40]} /><meshStandardMaterial color="#f5f1e8" roughness={.95} /></mesh>
    <mesh position={[0, 1.3, 0]}><sphereGeometry args={[.32, 20, 16]} /><meshStandardMaterial color="#f5f1e8" roughness={1} /></mesh>
  </group>;
};

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[] };
const TIP = (z = WZ + WH_): V3 => M(17.8, 6.0, z);

function shot(t: number, cover = false): Shot {
  const one = (o: Partial<React.ComponentProps<typeof Plane>> = {}, extra?: (m: boolean) => React.ReactNode) => (m: boolean) => <><Plane m={m} {...o} />{!m && <Shadow a={.28} len={5.5} />}{extra?.(m)}</>;
  const vort = (s: number, a: number, grow: number) => (m: boolean) => m ? null : <>{([1, -1] as const).map((sd) => <Vortex key={sd} side={sd} t={t} a={a} s={s} tipZ={lerp(5.6, WZ + WH_, grow)} />)}</>;
  if (cover) return { cam: { pos: [2.7, 1.45, 1.3], look: [1.45, 1.0, -.7], fov: 32 }, world: (m) => <>{one({ hi: 1 })(m)}{vort(.38, 1, 1)(m)}</>, marks: [] };
  /* A hook: whole plane -> the winglet */
  if (t < CUTS[0]) {
    return { cam: mixCam({ pos: [2.9, 1.7, 3.3], look: [.2, .95, 0], fov: 34 }, { pos: [2.35, 1.4, .75], look: [1.75, 1.15, -.6], fov: 30 }, ease(t, .4, CUTS[0])),
      world: one({ hi: env(t, T.qayril - .3, CUTS[0] + .3, .3, .3) }), marks: [{ p: TIP(WZ + 1.6), s: 'vinglet', a: env(t, 1.0, CUTS[0] + .2, .3, .2), col: Y, up: 170, side: -160 }] };
  }
  /* B pressure: front view of the right wing */
  if (t < CUTS[1]) {
    return { cam: mixCam({ pos: [1.1, .95, 3.6], look: [1.15, .95, -.2], fov: 32 }, { pos: [1.25, .9, 3.3], look: [1.25, .92, -.2], fov: 32 }, ease(t, CUTS[0], CUTS[1])),
      world: one({}, (m) => m ? null : <Curl t={t} a={env(t, T.past - .2, CUTS[1] + .3, .3, .2) * 0} />),
      marks: [{ p: M(10, 2.0, 4.7), s: '+ yuqori bosim', a: env(t, T.ostida, CUTS[1] + .2, .3, .2), col: RED, up: -150, side: 0 },
        { p: M(10, 2.0, 5.3), s: '− past bosim', a: env(t, T.ustida - .1, CUTS[1] + .2, .3, .2), col: BLU, up: 170, side: 0 }] };
  }
  /* C no winglet: air curls round the tip -> vortex -> drag */
  if (t < CUTS[2]) {
    const pull = ease(t, T.orqaga - .6, CUTS[2]);
    return { cam: mixCam(mixCam({ pos: [3.4, 1.0, .9], look: [1.85, .95, -.5], fov: 30 }, { pos: [3.4, 1.35, -.6], look: [1.6, .95, -1.9], fov: 32 }, ease(t, T.tornado - .8, T.girdob + .6)),
      { pos: [2.6, 2.6, -4.6], look: [0, .9, -1.2], fov: 34 }, pull),
      world: (m) => <>{one({ grow: 0 })(m)}{!m && <Curl t={t} a={env(t, T.uchida - .2, T.tornado + .4, .3, .3)} />}{vort(1, ease(t, T.tornado - .5, T.girdob), 0)(m)}</>,
      marks: [{ p: M(17.6, 6.3, 5.0), s: 'pastdan tepaga', a: env(t, T.pastdan - .1, T.tornado - .1, .3, .2), col: RED, up: 200, side: -40 },
        { p: M(17.6, 14, 5.6), s: 'girdob', a: env(t, T.girdob - .2, T.orqaga - .1, .3, .2), col: BLU, up: 200, side: -60 },
        { p: M(0, 22, 9), s: '← qarshilik', a: env(t, T.orqaga, CUTS[2] + .2, .3, .2), col: RED, up: 150 }] };
  }
  /* D Whitcomb: the winglet grows, the vortex shrinks */
  if (t < CUTS[3]) {
    const g = ease(t, T.qanotcha - .5, T.qanotcha + .7);
    return { cam: mixCam({ pos: [3.5, 1.5, -.9], look: [1.6, 1.0, -1.4], fov: 32 }, { pos: [3.3, 1.35, .3], look: [1.75, 1.15, -.6], fov: 30 }, ease(t, CUTS[2], T.qanotcha)),
      world: (m) => <>{one({ grow: g, hi: g })(m)}{vort(lerp(1, .38, ease(t, T.qanotcha, T.kamay)), 1, g)(m)}</>,
      marks: [{ p: TIP(WZ + WH_ * .6 * g), s: '«qanotcha»', a: env(t, T.qanotcha, T.yigirma - .3, .3, .2), col: Y, up: 180, side: -60 }] };
  }
  /* E twist: orbit, winglet glows */
  if (t < CUTS[4]) {
    const ang = lerp(.5, 1.3, ease(t, CUTS[3], CUTS[4]));
    return { cam: { pos: [Math.sin(ang) * 4.2, 1.9, Math.cos(ang) * 4.2], look: [0, .95, 0], fov: 34 }, world: (m) => <>{one({ hi: .5 + .5 * Math.sin(t * 6) })(m)}{vort(.38, 1, 1)(m)}</>, marks: [] };
  }
  /* F Boeing 737: side orbit */
  if (t < CUTS[5]) {
    const ang = lerp(1.75, 2.3, ease(t, CUTS[4], CUTS[5]));
    return { cam: { pos: [Math.sin(ang) * 4.6, 1.5, Math.cos(ang) * 4.6], look: [0, 1.0, 0], fov: 34 }, world: (m) => <>{one({ hi: 1 })(m)}{vort(.38, 1, 1)(m)}</>, marks: [] };
  }
  /* G world: a formation of three */
  if (t < CUTS[6]) {
    const k = ease(t, CUTS[5], CUTS[6]);
    const pl: [V3, string][] = [[[0, .6, 1.6], 'a'], [[-3.0, .3, -2.6], 'b'], [[3.0, .3, -2.6], 'c']];
    return { cam: { pos: [lerp(3.2, 2.2, k), lerp(5.2, 4.8, k), lerp(6.0, 6.6, k)], look: [0, .6, -.8], fov: 38 },
      world: (m) => <>{pl.map(([o, id]) => <React.Fragment key={id}><Plane m={m} id={id} at={o} hi={1} />{!m && ([1, -1] as const).map((sd) => <Vortex key={sd} side={sd} t={t + o[0]} a={1} s={.38} tipZ={WZ + WH_} o={[o[0], o[1], o[2]]} len={3} />)}</React.Fragment>)}{!m && <Shadow a={.22} len={9} />}</>, marks: [] };
  }
  /* H winter hat on the winglet */
  if (t < CUTS[7]) {
    const tip = TIP(WZ + WH_ + .05);
    return { cam: mixCam({ pos: [3.2, 1.5, .9], look: [1.75, 1.2, -.62], fov: 30 }, { pos: [2.85, 1.38, .45], look: [1.8, 1.24, -.62], fov: 28 }, ease(t, CUTS[6], CUTS[7])),
      world: (m) => <>{one({ hi: 1 })(m)}<Hat p={[tip[0] + .015, tip[1] - .02, tip[2] - .02]} s={.075} a={ease(t, T.shapka - .35, T.shapka + .25)} /></>,
      marks: [{ p: [tip[0], tip[1] + .2, tip[2]], s: 'qishki shapka', a: env(t, T.shapka + .1, T.kichkina + .2, .3, .2), col: RED, up: 50, side: -230 },
        { p: [tip[0], tip[1] + .2, tip[2]], s: 'issiq qochmaydi', a: env(t, T.issiq - .1, CUTS[7] + .2, .3, .2), col: GRN, up: 50, side: -230 }] };
  }
  /* I share */
  const ang = .9 + (t - CUTS[7]) * .2;
  return { cam: { pos: [Math.sin(ang) * 4.8, 1.8, Math.cos(ang) * 4.8], look: [0, .9, 0], fov: 34 }, world: (m) => <>{one({ hi: 1 })(m)}{vort(.38, 1, 1)(m)}</>, marks: [] };
}

const Caps: React.FC<{ t: number }> = ({ t }) => {
  let cur: typeof CAPS[number] | null = null; for (const l of CAPS) if (t >= l[0].s - .05 && l.some((o) => o.w !== '—')) cur = l;
  if (!cur || t > cur[cur.length - 1].e + .45 || t > END - 2.2) return null;
  const a = eout(P(t, cur[0].s - .05, cur[0].s + .08)), txt = cur.map((o) => o.w).join(' ');
  const fs = Math.min(88, Math.floor(1700 / Math.max(8, txt.length)));
  return <div style={{ position: 'absolute', left: 40, width: W - 80, top: 1300, display: 'flex', justifyContent: 'center', gap: 18, opacity: a, scale: String(lerp(.86, 1, eback(P(t, cur[0].s - .05, cur[0].s + .18)))), fontFamily: SANS, fontWeight: 800, fontSize: fs, whiteSpace: 'nowrap' }}>
    {cur.map((o, i) => <span key={i} style={o.k ? { color: INK, background: Y, padding: '0 14px', borderRadius: 14 } : { color: INK }}>{o.w}</span>)}
  </div>;
};
const Brand: React.FC<{ t: number }> = ({ t }) => {
  let ci = 0; CH.forEach(([s], i) => { if (t >= s) ci = i; });
  return <>
    <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
    {t < END - 4 && <TopPill s={CH[ci][1]} a={eout(P(t, CH[ci][0], CH[ci][0] + .3))} y={372} />}
  </>;
};
const Src: React.FC<{ t: number }> = ({ t }) => {
  const s = t < CUTS[0] ? '3D: B737-800 — someone353 (Sketchfab, CC BY)' : t < CUTS[2] ? 'Manba: Smithsonian Air & Space «How Things Work: Winglets» · sxematik'
    : t < CUTS[3] ? 'Manba: NASA Spinoff 2010, Smithsonian Air & Space' : t < CUTS[5] ? 'Manba: NASA Spinoff 2010 (737-700: ~100 000 gallon/yil)'
    : t < CUTS[6] ? 'Ishlab chiqaruvchi hisobi: Aviation Partners Boeing, 2018 — 9 mlrd gallon ≈ 34 mlrd L' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};
const Chip: React.FC<{ s: string; a: number; col: string; y: number }> = ({ s, a, col, y }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: W / 2, top: y, translate: '-50% -50%', opacity: a, scale: String(.8 + .2 * eback(a)), padding: '14px 34px', borderRadius: 24, background: col, color: '#fff', fontFamily: HEAD, fontWeight: 700, fontSize: 64, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap', boxShadow: '0 14px 40px rgba(0,0,0,.18)' }}>{s}</div>;

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t, !!cover);
  const cut = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const blur = cut * 18;
  const tint = env(t, T.endi - .1, T.qiziq + .9, .15, .5) * .22;
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <AbsoluteFill style={{ background: BG.light }} />
    <AbsoluteFill style={{ filter: blur > .3 ? `blur(${blur.toFixed(1)}px)` : undefined }}>
      <ThreeCanvas width={W} height={H} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <Rig cam={sh.cam} />
        <Studio theme="light">{(m) => sh.world(m)}</Studio>
      </ThreeCanvas>
      {!cover && sh.marks.map((k, i) => <Callout key={i} at={project(sh.cam, k.p)} s={k.s} a={k.a} col={k.col} up={k.up} side={k.side} ink="rgba(28,30,35,.55)" />)}
    </AbsoluteFill>
    {tint > 0 && <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(255,207,58,0) 30%, rgba(255,207,58,${tint * 3}) 100%)` }} />}
    {!cover && <>
      <Chip s="bezak ✗" a={env(t, T.bezak - .05, CUTS[0] - .05, .2, .2)} col={RED} y={1130} />
      <Chip s="NASA · 1976" a={env(t, T.nasa - .1, T.qanotcha - .2, .2, .2)} col={BLU} y={640} />
      <BigNum subCol={INK} v="−20 %" sub="girdob qarshiligi" y={600} a={env(t, T.yigirma - .1, CUTS[3] - .05, .3, .3)} col={GRN} size={190} />
      <BigNum subCol={INK} v="4–6 %" sub="yoqilg‘i tejaladi" y={600} a={env(t, T.tort - .1, CUTS[4] - .05, .3, .3)} col={GRN} size={200} />
      <BigNum subCol={INK} v="380 000 L" sub="bitta 737 · yiliga · taxminan" y={600} a={env(t, T.uch - .1, CUTS[5] - .05, .3, .3)} col={GRN} size={150} />
      <BigNum subCol={INK} v="30+ mlrd L" sub="dunyo bo‘yicha · taxminan" y={600} a={env(t, T.ottiz - .1, CUTS[6] - .05, .3, .3)} col={GRN} size={150} />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > T.dost - 1.5 && <div style={{ position: 'absolute', left: 70, width: W - 140, top: 495, height: 220, borderRadius: 32, background: 'rgba(20,22,26,.72)', opacity: eout(P(t, T.dost - 1.5, T.dost - 1.0)) }} />}
      {t > CUTS[7] - .3 && <ShareEnd t={t} t0={T.dost - 1.3} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['uchuvchi bo‘lmoqchi'], ['do‘stingizga', 'y'], ['yuboring']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <AbsoluteFill style={{ translate: '0 60px' }}><Frame t={2.6} cover /></AbsoluteFill>
  <div style={{ position: 'absolute', left: 0, width: W, top: 1520, textAlign: 'center' }}><span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 48, color: '#fff', background: '#1a8f4e', padding: '10px 28px', borderRadius: 18 }}>bezak emas — yoqilg‘i!</span></div>
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 360, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 100, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Qanot uchi nega<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>qayrilgan?</span>
  </div>
</AbsoluteFill>;
