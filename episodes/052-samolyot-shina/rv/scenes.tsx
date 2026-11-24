import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { W, H, FPS, Y, RED, GRN, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { ShareEnd } from '../kit';
import { Logo } from '../Art';
import { Studio, Rig, Shadow, Cam, V3, mixCam, project, TopPill, Callout, BigNum, BG, useGlb, orbit } from '../s3d';
import { CAPS } from './caps';
import { END, CH, T } from './ep';

/* 3D: "B737-800 Blank Livery" by someone353 (Sketchfab, CC BY 4.0) — untextured, painted here by position (shader).
   The big tyre (rubber, rim, nitrogen dots, thermal plug, retread sleeve) is our own schematic drawing. */
const INK = '#1c1e23', F = 'b738.glb';
const K = 4.4 / 39.5, Y0 = .55;
const BLU = '#2f7cf6', ORG = '#ff8a3c', CYN = '#00b8f0';
const CUTS = [4.8, 17.4, 22.9, 29.9, 34.8, 39.85];
const R = .5;

/* ---------- plane (hook only) ---------- */
type Prepped = { wrap: THREE.Group };
const CACHE: Record<string, Prepped> = {};
const prep = (src: THREE.Group, key: string): Prepped => {
  if (CACHE[key]) return CACHE[key];
  const o = src.clone(true);
  const wrap = new THREE.Group(); wrap.add(o);
  o.scale.setScalar(K); o.position.set(0, -1.5 * K, .175 * K);
  o.traverse((m: any) => {
    if (!m.isMesh) return;
    const nm = (m.material?.name ?? '') as string;
    if (/Roboto/.test(nm)) { m.visible = false; return; }
    if (/Transparent|DoNothing/.test(nm)) { m.material = new THREE.MeshStandardMaterial({ color: '#1d2430', metalness: .6, roughness: .15 }); return; }
    const mat = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: .25, roughness: .32, side: THREE.DoubleSide });
    mat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vO;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvO = position;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vO;')
        .replace('#include <color_fragment>', `#include <color_fragment>
vec3 c = vec3(.80, .83, .88);
c = mix(c, vec3(.78, .81, .86), 1.0 - smoothstep(3.1, 3.4, vO.z));
float eng = step(3.2, abs(vO.x)) * step(abs(vO.x), 7.2) * step(vO.z, 4.75) * step(vO.y, -1.5);
c = mix(c, vec3(.55, .58, .63), eng);
float fin = step(8.6, vO.z) * step(10.0, vO.y);
c = mix(c, vec3(.11, .30, .62), fin);
float gear = step(vO.z, 2.75) * step(abs(vO.x), 4.2) * step(vO.y, 1.0) * step(-1.0, vO.y) + step(vO.z, 2.75) * step(abs(vO.x), .8) * step(vO.y, -14.0);
c = mix(c, vec3(.16, .17, .19), clamp(gear, 0.0, 1.0) * 0.0);
diffuseColor.rgb = c;`);
    };
    mat.customProgramCacheKey = () => 'b738-v2';
    m.material = mat;
  });
  return (CACHE[key] = { wrap });
};
const Plane: React.FC<{ at?: V3; pitch?: number }> = ({ at = [0, 0, 0], pitch = 0 }) => {
  const src = useGlb(F);
  const pr = useMemo(() => (src ? prep(src, 'a') : null), [src]);
  if (!pr) return null;
  return <group position={at} rotation={[pitch, 0, 0]}><primitive object={pr.wrap} /></group>;
};

/* ---------- tyre ---------- */
const hash = (i: number, s = 1) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
const treadPts = () => {
  const half: [number, number][] = [[.27, .15], [.30, .185], [.38, .195], [.45, .17], [.49, .13], [.50, .10], [.50, .05], [.486, .045], [.486, .025], [.50, .02], [.50, 0]];
  const left = half.map(([r, y]) => new THREE.Vector2(r, -y));
  const right = half.slice(0, -1).reverse().map(([r, y]) => new THREE.Vector2(r, y));
  return [...left, ...right];
};
const NG = 170;
const Gas: React.FC<{ y: number; t: number; air: number; a: number }> = ({ y, t, air, a }) => {
  const im = useMemo(() => {
    const m = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), new THREE.MeshBasicMaterial({ toneMapped: false }), NG);
    const c = new THREE.Color();
    for (let i = 0; i < NG; i++) { const k = hash(i, 9); c.set(k < .62 ? BLU : k < .86 ? ORG : CYN); m.setColorAt(i, c); }
    return m;
  }, []);
  const ob = new THREE.Object3D();
  for (let i = 0; i < NG; i++) {
    const k = hash(i, 9), kind = k < .62 ? 0 : k < .86 ? 1 : 2;
    const ph = hash(i, 1) * 6.28 + t * (.5 + hash(i, 2)), rr = .3 + hash(i, 3) * .16, xx = (hash(i, 4) - .5) * .26;
    ob.position.set(xx + Math.sin(t * 2 + i) * .012, y + Math.cos(ph) * rr, Math.sin(ph) * rr);
    const base = kind === 2 ? .034 : .02;
    const sc = a * base * (kind === 0 ? 1 : air) * (1 + (kind === 0 ? (1 - air) * .35 : 0)) + .0001;
    ob.scale.setScalar(sc); ob.updateMatrix(); im.setMatrixAt(i, ob.matrix);
  }
  im.instanceMatrix.needsUpdate = true;
  return <primitive object={im} />;
};
const NJ = 36;
const Jet: React.FC<{ p: V3; t0: number; t: number; a: number }> = ({ p, t0, t, a }) => {
  const im = useMemo(() => new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false, transparent: true, opacity: .8 }), NJ), []);
  const ob = new THREE.Object3D();
  for (let i = 0; i < NJ; i++) {
    const u = (((t - t0) * 1.6 + hash(i, 5)) % 1 + 1) % 1, d = u * .9;
    ob.position.set(p[0] + d, p[1] + d * .55 + (hash(i, 6) - .5) * .06 * u, p[2] + (hash(i, 7) - .5) * .09 * u);
    ob.scale.setScalar(a * .018 * (1 - u * .5) + .0001); ob.updateMatrix(); im.setMatrixAt(i, ob.matrix);
  }
  im.instanceMatrix.needsUpdate = true;
  return <primitive object={im} />;
};
const NS = 22;
const Smoke: React.FC<{ t: number; t0: number; m: boolean }> = ({ t, t0 }) => {
  const im = useMemo(() => new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), new THREE.MeshBasicMaterial({ color: '#d9d9dc', transparent: true, opacity: .55, depthWrite: false }), NS), []);
  const ob = new THREE.Object3D(); const d = t - t0;
  for (let i = 0; i < NS; i++) {
    const age = d - hash(i, 3) * .5, u = clamp(age / 1.6);
    const on = age > 0 ? 1 : 0;
    ob.position.set((hash(i, 1) - .5) * .5, R * .1 + u * .35 * (.5 + hash(i, 4)), -.15 - u * 1.4 * (.4 + hash(i, 2)) + (hash(i, 5) - .5) * .3);
    ob.scale.setScalar(on * (.07 + u * .22) * (1 - u * .6) + .0001); ob.updateMatrix(); im.setMatrixAt(i, ob.matrix);
  }
  im.instanceMatrix.needsUpdate = true;
  return <primitive object={im} />;
};

type TyreP = { y?: number; spin?: number; xray?: number; heat?: number; melt?: number; t?: number; air?: number; gas?: number; sleeve?: number; rx?: number };
const Tyre: React.FC<TyreP> = ({ y = R, spin = 0, xray = 0, heat = 0, melt = 0, t = 0, air = 0, gas = 0, sleeve = 0, rx = 0 }) => {
  const geo = useMemo(() => new THREE.LatheGeometry(treadPts(), 120), []);
  const sleeveGeo = useMemo(() => new THREE.LatheGeometry([new THREE.Vector2(.499, -.105), new THREE.Vector2(.514, -.105), new THREE.Vector2(.514, .105), new THREE.Vector2(.499, .105)], 120), []);
  const marks = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);
  const hot = new THREE.Color('#ff3b1f').multiplyScalar(heat * .9);
  return <group position={[0, y, 0]} rotation={[rx, 0, 0]}>
    <mesh geometry={geo} rotation={[0, 0, Math.PI / 2]}>
      <meshStandardMaterial color="#2b2d32" roughness={.82} metalness={.05} side={THREE.DoubleSide} transparent={xray > 0} opacity={1 - .82 * xray} depthWrite={xray <= 0} />
    </mesh>
    {sleeve > 0 && <mesh geometry={sleeveGeo} rotation={[0, 0, Math.PI / 2]} position={[(1 - eio(sleeve)) * 1.4, 0, 0]}><meshStandardMaterial color="#ffb000" roughness={.5} side={THREE.DoubleSide} /></mesh>}
    <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.272, .272, .3, 48]} /><meshStandardMaterial color="#c3c8d0" metalness={.85} roughness={.25} emissive={hot} /></mesh>
    <group rotation={[spin, 0, 0]}>
      {marks.map((i) => { const th = i / 14 * 6.2832, big = i === 0; return [-1, 1].map((s) => <mesh key={i + '_' + s} position={[s * .198, Math.cos(th) * .365, Math.sin(th) * .365]} rotation={[th, 0, 0]}>
        <boxGeometry args={[.012, big ? .11 : .06, big ? .04 : .022]} /><meshStandardMaterial color={big ? '#ff3b30' : '#f4f1ea'} roughness={.7} /></mesh>); })}
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.09, .09, .34, 32]} /><meshStandardMaterial color="#8d939c" metalness={.9} roughness={.3} /></mesh>
      {Array.from({ length: 8 }, (_, i) => { const th = i / 8 * 6.2832; return <mesh key={i} position={[.172, Math.cos(th) * .16, Math.sin(th) * .16]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.015, .015, .05, 12]} /><meshStandardMaterial color="#5f656e" metalness={.9} roughness={.35} /></mesh>; })}
      {Array.from({ length: 5 }, (_, i) => { const th = i / 5 * 6.2832 + .3; return <mesh key={i} position={[.153, Math.cos(th) * .19, Math.sin(th) * .19]} rotation={[th, 0, 0]}><boxGeometry args={[.008, .12, .03]} /><meshStandardMaterial color="#6e747d" metalness={.8} roughness={.4} /></mesh>; })}
      <mesh position={[.168, .225, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1 - .75 * melt, 1, 1 - .75 * melt]}><cylinderGeometry args={[.034, .034, .05, 20]} />
        <meshStandardMaterial color={new THREE.Color('#ffd23a').lerp(new THREE.Color('#ff3b1f'), heat)} emissive={new THREE.Color('#ff2a10').multiplyScalar(heat * 1.2)} roughness={.4} metalness={.4} /></mesh>
    </group>
    {gas > 0 && <Gas y={0} t={t} air={air} a={gas} />}
  </group>;
};

/* ---------- motion of the tyre in the spin-up scene ---------- */
const WMAX = 15;
const omega = (t: number) => t < T.nol ? 0 : WMAX * (1 - Math.exp(-(t - T.nol) * 4.5)) * (1 - eio(P(t, 30.0, 31.3)));
const spinAt = (t: number) => { let a = 0; for (let s = 0; s < t; s += 1 / 60) a += omega(s) / 60; return a; };
const Dashes: React.FC<{ off: number; a: number }> = ({ off, a }) => a <= 0 ? null : <>{Array.from({ length: 12 }, (_, i) => {
  const z = ((((i * 1.3 - off) % 15.6) + 15.6) % 15.6) - 7.8;
  return <mesh key={i} position={[1.15, .006, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.1, .7]} /><meshBasicMaterial color="#8a7f6c" transparent opacity={.5 * a} /></mesh>; })}</>;
const floorOff = (t: number) => { let a = 0; for (let s = 0; s < t; s += 1 / 60) a += omega(s) * R / 60; return a; };

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[] };
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const PLUG = (y = R): V3 => [.17, y + .225, 0];

function shot(t: number, cover = false): Shot {
  if (cover) return { cam: orbit(3.1, 1.05, .8, [0, .58, 0], 32), world: () => <><Tyre /><Shadow a={.35} len={3.4} /></>, marks: [] };
  /* A hook: plane lands, gear touches down */
  if (t < CUTS[0]) {
    const k = ease(t, 0, T.uriladi), after = clamp((t - T.uriladi) / 2);
    const z = lerp(-1.7, 0, k) + after * 1.1 * (1 - after * .5), h = .3 * Math.pow(1 - k, 2.2), pitch = -.05 * (1 - k) + .035 * eout(P(t, T.uriladi, T.uriladi + .5));
    return { cam: { pos: [4.6, .62, .35], look: [0, .72, .1], fov: 34 },
      world: (m) => <><Plane at={[0, h, z]} pitch={pitch} />{!m && <Shadow a={.3} len={5} z={z} />}{!m && t > T.uriladi && <group position={[0, 0, z]}><Smoke t={t} t0={T.uriladi} m={m} /></group>}</>, marks: [] };
  }
  /* B pressure */
  if (t < CUTS[1]) {
    const ang = lerp(1.0, 1.55, ease(t, CUTS[0], CUTS[1]));
    return { cam: orbit(3.15, ang, 1.0, [0, .6, 0], 32), world: (m) => <><Tyre />{!m && <Shadow a={.35} len={3.4} />}</>,
      marks: [{ p: PLUG(), s: 'quruq azot', a: 0, col: BLU }] };
  }
  /* C nitrogen */
  if (t < CUTS[2]) {
    const air = 1 - ease(t, T.azot - .15, T.azot + .5);
    return { cam: orbit(2.25, lerp(.85, 1.15, ease(t, CUTS[1], CUTS[2])), .8, [0, .56, 0], 34),
      world: (m) => <><Tyre xray={env(t, CUTS[1] + .1, CUTS[2] + .3, .4, .4)} t={t} air={t < T.ikkinchi ? 1 : air} gas={eout(P(t, CUTS[1], CUTS[1] + .5))} spin={.4} />{!m && <Shadow a={.35} len={3.4} />}</>,
      marks: [] };
  }
  /* D spin-up */
  if (t < CUTS[3]) {
    const fall = ease(t, CUTS[2] + .1, T.nol), yy = R + .55 * (1 - fall);
    return { cam: mixCam(orbit(3.3, 1.05, .9, [0, .6, 0], 34), orbit(2.9, 1.25, .75, [0, .55, 0], 34), ease(t, T.turgan, T.nol + .6)),
      world: (m) => <><Tyre y={yy} spin={spinAt(t)} t={t} />{!m && <Shadow a={.35} len={3.4} />}{!m && <Smoke t={t} t0={T.nol} m={m} />}{!m && <Dashes off={floorOff(t)} a={clamp((t - T.nol) * 3)} />}</>,
      marks: [] };
  }
  /* E thermal plug */
  if (t < CUTS[4]) {
    const heat = ease(t, T.tormoz, T.tiqin + .9) * (1 - ease(t, T.eriydi, T.eriydi + 1.2) * .6), melt = ease(t, T.eriydi - .1, T.eriydi + .5);
    return { cam: mixCam(orbit(3.0, 1.35, .9, [0, .7, 0], 32), orbit(3.3, 1.3, .9, [.1, .66, 0], 32), ease(t, CUTS[3], T.tiqin)),
      world: (m) => <><Tyre heat={heat} melt={melt} spin={0} />{!m && melt > .1 && <Jet p={PLUG()} t0={T.eriydi} t={t} a={melt} />}{!m && <Shadow a={.35} len={3.4} />}</>,
      marks: [{ p: PLUG(), s: 'eruvchan tiqin', a: env(t, T.tiqin - .1, T.eriydi + .5, .3, .3), col: Y, up: 190, side: -90 }] };
  }
  /* F lifespan + retread */
  if (t < CUTS[5]) {
    const sl = ease(t, T.qayta - .1, T.yetti - .1);
    return { cam: orbit(3.05, lerp(1.0, .55, ease(t, CUTS[4], CUTS[5])), 1.0, [0, .6, 0], 32), world: (m) => <><Tyre sleeve={sl} spin={t * 1.2} />{!m && <Shadow a={.35} len={3.4} />}</>, marks: [] };
  }
  return { cam: orbit(3.1, .6 + (t - CUTS[5]) * .12, 1.0, [0, .6, 0], 32), world: (m) => <><Tyre sleeve={1} spin={t * .8} />{!m && <Shadow a={.35} len={3.4} />}</>, marks: [] };
}

const Caps: React.FC<{ t: number }> = ({ t }) => {
  let cur: typeof CAPS[number] | null = null; for (const l of CAPS) if (t >= l[0].s - .05 && l.some((o) => o.w !== '—')) cur = l;
  if (!cur || t > cur[cur.length - 1].e + .45 || t > END - 2.2) return null;
  const a = eout(P(t, cur[0].s - .05, cur[0].s + .08)), txt = cur.map((o) => o.w).join(' ');
  const fs = Math.min(88, Math.floor(1700 / Math.max(8, txt.length)));
  return <div style={{ position: 'absolute', left: 40, width: W - 80, top: 1300, display: 'flex', justifyContent: 'center', gap: 18, opacity: a, scale: String(lerp(.86, 1, eback(P(t, cur[0].s - .05, cur[0].s + .18)))), fontFamily: SANS, fontWeight: 800, fontSize: fs, whiteSpace: 'nowrap' }}>
    {cur.map((o, i) => <span key={i} style={o.k ? { color: INK, background: Y, padding: '0 14px', borderRadius: 14 } : { color: INK, textShadow: '0 0 6px #f6f0e6, 0 0 14px #f6f0e6, 0 0 24px #f6f0e6, 0 0 36px #f6f0e6' }}>{o.w}</span>)}
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
  const s = t < CUTS[0] ? '3D: B737-800 — someone353 (Sketchfab, CC BY) · 130 mph ≈ 209 km/soat · Jalopnik' : t < CUTS[1] ? 'Manba: The Points Guy (Boeing 787 muhandisi), Jalopnik · shina sxematik'
    : t < CUTS[2] ? 'Manba: Code 7700, The Points Guy · molekulalar sxematik' : t < CUTS[3] ? 'Manba: The Points Guy: «noldan 1000+ ayl/min»' : t < CUTS[4] ? 'Manba: The Points Guy: thermal relief plugs'
    : t < CUTS[5] ? 'Manba: Jalopnik (Air Canada, Michelin)' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};
const Chip: React.FC<{ s: string; a: number; col: string; y: number }> = ({ s, a, col, y }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: W / 2, top: y, translate: '-50% -50%', opacity: a, scale: String(.8 + .2 * eback(a)), padding: '14px 34px', borderRadius: 24, background: col, color: '#fff', fontFamily: HEAD, fontWeight: 700, fontSize: 64, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap', boxShadow: '0 14px 40px rgba(0,0,0,.18)' }}>{s}</div>;
const Bars: React.FC<{ t: number }> = ({ t }) => {
  const a1 = env(t, T.yuz2 - .2, T.toshdek - .1, .3, .3), a2 = eout(P(t, T.corolla - .1, T.corolla + .4)), g = eout(P(t, T.yuz2 - .1, T.yuz2 + .7)), g2 = eout(P(t, T.corolla, T.corolla + .6));
  if (a1 <= 0) return null;
  const row = (label: string, v: string, w: number, col: string, o: number) => <div style={{ opacity: o, marginBottom: 14 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SANS, fontWeight: 800, fontSize: 30, color: INK, textTransform: 'uppercase', letterSpacing: 1 }}><span>{label}</span><span>{v}</span></div>
    <div style={{ height: 34, borderRadius: 17, background: 'rgba(28,30,35,.12)' }}><div style={{ height: 34, borderRadius: 17, width: `${w * 100}%`, background: col }} /></div></div>;
  return <div style={{ position: 'absolute', left: 90, width: W - 180, top: 470, opacity: a1 }}>
    {row('Samolyot shinasi', '≈ 200 psi', g, '#ff9f1c', 1)}{row('Corolla shinasi', '35 psi', g2 * 35 / 200, '#7b828c', a2)}
  </div>;
};

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t, !!cover);
  const cut = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const blur = cut * 18;
  const tint = env(t, T.endi - .1, T.endi + .9, .15, .5) * .22;
  const rpm = Math.round(clamp((t - T.nol) / (T.oshadi - T.nol)) * 1000);
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
      <BigNum subCol={INK} v="200 km/soat" sub="shina nega yorilmaydi?" y={590} a={env(t, 0, CUTS[0] - .05, .01, .3)} col="#e0561b" size={150} />
      <Bars t={t} />
      <BigNum subCol={INK} v="≈ 100 kg" sub="bitta shina · Boeing 787" y={590} a={env(t, T.kg - .3, CUTS[1] - .05, .3, .3)} col="#e0561b" size={170} />
      <Chip s="havo = namlik ✗" a={env(t, T.namlik - .1, CUTS[2] - .1, .2, .3)} col={RED} y={590} />
      <Chip s="quruq azot ✓" a={env(t, T.azot - .1, T.namlik - .1, .2, .2)} col={BLU} y={590} />
      <BigNum subCol={INK} v={rpm >= 1000 ? '1000+' : String(rpm)} sub="aylanish / minut" y={590} a={env(t, T.nol - .3, CUTS[3] - .05, .3, .3)} col="#e0561b" size={140} />
      <Chip s="portlamaydi ✓" a={env(t, T.eriydi + .6, CUTS[4] - .1, .3, .3)} col="#1a8f4e" y={590} />
      <BigNum subCol={INK} v="300–400" sub="qo‘nish · bitta shina" y={590} a={env(t, T.uch - .1, T.qayta - .25, .3, .3)} col="#e0561b" size={160} />
      <BigNum subCol={INK} v="× 7" sub="qayta qoplash mumkin" y={590} a={env(t, T.qayta - .1, CUTS[5] + .1, .3, .2)} col="#1a8f4e" size={190} />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > T.buni - .15 && <div style={{ position: 'absolute', left: 70, width: W - 140, top: 495, height: 220, borderRadius: 32, background: 'rgba(20,22,26,.72)', opacity: eout(P(t, T.buni - .15, T.buni + .15)) }} />}
      {t > CUTS[5] - .3 && <ShareEnd t={t} t0={T.buni} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['samolyot sevgan'], ['do‘stingizga yuboring', 'y']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <AbsoluteFill style={{ translate: '0 80px' }}><Frame t={2.6} cover /></AbsoluteFill>
  <div style={{ position: 'absolute', left: 0, width: W, top: 1520, textAlign: 'center' }}><span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 46, color: '#fff', background: '#e0561b', padding: '10px 28px', borderRadius: 18 }}>200 km/soat · 200 psi</span></div>
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 360, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 100, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Samolyot shinasi nega<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>yorilmaydi?</span>
  </div>
</AbsoluteFill>;
