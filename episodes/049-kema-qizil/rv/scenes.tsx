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

/* 3D: "Cargo Ship 02" by gogiart (Sketchfab, CC BY 4.0). Below-waterline colour, fouling, copper plates and copper release are ours (shader + instanced meshes, schematic). */
const INK = '#1c1e23', F = 'cargo_ship.glb', L = 4.4, LIFT = .16, WL = .17; // WL = waterline as a fraction of the ship height (debug: DEBUG_WL)
const DEBUG_WL = false;
const COPPER = '#c46a3a', REDP = '#b8262a', BROWN = '#7a3a2a', BLU = '#2F8CFF';
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const CUTS = [4.0, 10.9, 16.9, 22.5, 27.45, 29.95, 38.45, 43.05];

/* ---------------- ship prep: fit, recolourable below-waterline shader, surface samples ---------------- */
type U = { uBot: { value: THREE.Color }; uMix: { value: number }; uPlate: { value: number }; uFoul: { value: number }; uWL: { value: number }; uDbg: { value: number } };
type Prepped = { wrap: THREE.Group; size: THREE.Vector3; U: U };
type Pt = { p: THREE.Vector3; n: THREE.Vector3; r: number; r2: number };
const CACHE: Record<string, Prepped> = {};
let SAMPLES: Pt[] | null = null;
const prep = (src: THREE.Group, key: string): Prepped => {
  if (CACHE[key]) return CACHE[key];
  const o = src.clone(true); o.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(o); const sz = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  const k = L / Math.max(sz.x, sz.z);
  const wrap = new THREE.Group(), inner = new THREE.Group(); wrap.add(inner); inner.add(o);
  o.position.set(-c.x * k, -box.min.y * k, -c.z * k); o.scale.setScalar(k);
  if (sz.z > sz.x) inner.rotation.y = Math.PI / 2;
  if (SHIP_FLIP) inner.rotation.y += Math.PI;
  wrap.updateMatrixWorld(true);
  const size = new THREE.Box3().setFromObject(wrap).getSize(new THREE.Vector3());
  const U: U = { uBot: { value: new THREE.Color(REDP) }, uMix: { value: 0 }, uPlate: { value: 0 }, uFoul: { value: 0 }, uWL: { value: WL * size.y }, uDbg: { value: DEBUG_WL ? 1 : 0 } };
  const meshes: THREE.Mesh[] = []; wrap.traverse((m: any) => { if (m.isMesh) meshes.push(m); });
  const tris: { a: THREE.Vector3; b: THREE.Vector3; c: THREE.Vector3; n: THREE.Vector3; area: number }[] = [];
  for (const m of meshes) {
    const mat = (m.material as THREE.MeshStandardMaterial).clone(); m.material = mat;
    const toShip = m.matrixWorld.clone();
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, U, { uToShip: { value: toShip } });
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nuniform mat4 uToShip; varying vec3 vShip;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvShip = (uToShip * vec4(transformed, 1.0)).xyz;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
uniform vec3 uBot; uniform float uMix, uPlate, uFoul, uWL, uDbg; varying vec3 vShip;
float hh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f); return mix(mix(hh(i), hh(i+vec2(1,0)), f.x), mix(hh(i+vec2(0,1)), hh(i+vec2(1,1)), f.x), f.y); }`)
        .replace('#include <map_fragment>', `#include <map_fragment>
float bm = 1.0 - smoothstep(uWL - 0.004, uWL + 0.004, vShip.y);
if (uDbg > .5) diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.1, 0.9, 0.3), bm);
diffuseColor.rgb = mix(diffuseColor.rgb, uBot, bm * uMix);
vec2 pc = vec2(vShip.x * 9.0, (vShip.y + vShip.z) * 9.0); vec2 fp = fract(pc);
float seam = smoothstep(0.0, 0.05, fp.x) * smoothstep(1.0, 0.95, fp.x) * smoothstep(0.0, 0.07, fp.y) * smoothstep(1.0, 0.93, fp.y);
vec3 cop = vec3(0.77, 0.42, 0.23) * (0.82 + 0.3 * hh(floor(pc))) * mix(0.45, 1.0, seam);
diffuseColor.rgb = mix(diffuseColor.rgb, cop, bm * uPlate);
float nz = vn(vShip.xz * 14.0 + vShip.y * 9.0) * 0.6 + vn(vShip.xy * 41.0) * 0.4;
vec3 grime = mix(vec3(0.24, 0.27, 0.17), vec3(0.42, 0.40, 0.30), nz);
diffuseColor.rgb = mix(diffuseColor.rgb, grime, bm * uFoul * smoothstep(0.25, 0.55, nz + uFoul * 0.4));`)
        .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor = mix(metalnessFactor, 0.85, bm * uPlate);')
        .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.32, bm * uPlate); roughnessFactor = mix(roughnessFactor, 0.95, bm * uFoul);');
    };
    mat.customProgramCacheKey = () => 'ship-bottom-v1';
    if (!SAMPLES) { // triangles below the waterline (ship space) for barnacles / particles
      const g = m.geometry, pos = g.attributes.position as THREE.BufferAttribute, idx = g.index; const n = idx ? idx.count : pos.count;
      const A = new THREE.Vector3(), B = new THREE.Vector3(), C = new THREE.Vector3();
      for (let i = 0; i < n; i += 3) {
        const ia = idx ? idx.getX(i) : i, ib = idx ? idx.getX(i + 1) : i + 1, ic = idx ? idx.getX(i + 2) : i + 2;
        A.fromBufferAttribute(pos, ia).applyMatrix4(toShip); B.fromBufferAttribute(pos, ib).applyMatrix4(toShip); C.fromBufferAttribute(pos, ic).applyMatrix4(toShip);
        if (Math.min(A.y, B.y, C.y) > WL * size.y * .97) continue;
        const cr = B.clone().sub(A).cross(C.clone().sub(A)); const area = cr.length() / 2; if (area < 1e-7) continue;
        const nn = cr.normalize(); if (nn.y > .6) continue; // skip upward faces (inside / decks)
        tris.push({ a: A.clone(), b: B.clone(), c: C.clone(), n: nn, area });
      }
    }
  }
  if (!SAMPLES) {
    const cum: number[] = []; let tot = 0; for (const tr of tris) { tot += tr.area; cum.push(tot); }
    let s = 11; const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const out: Pt[] = [];
    for (let i = 0, tries = 0; out.length < 2400 && tris.length && tries < 200000; tries++) {
      const x = r() * tot; let lo = 0, hi = cum.length - 1; while (lo < hi) { const md = (lo + hi) >> 1; if (cum[md] < x) lo = md + 1; else hi = md; }
      const tr = tris[lo]; let u = r(), v = r(); if (u + v > 1) { u = 1 - u; v = 1 - v; }
      const p = tr.a.clone().add(tr.b.clone().sub(tr.a).multiplyScalar(u)).add(tr.c.clone().sub(tr.a).multiplyScalar(v));
      if (p.y > WL * size.y * .97) continue;
      const nrm = tr.n.clone(); if (nrm.x * p.x * 0 + nrm.z * p.z < 0 && Math.abs(p.z) > .05) nrm.negate(); // face outwards
      out.push({ p, n: nrm, r: r(), r2: r() });
    }
    SAMPLES = out;
  }
  return (CACHE[key] = { wrap, size, U });
};
const SHIP_FLIP = true;

const BARN = 1500, WEED = 260, PART = 420;
const Ship: React.FC<{ m: boolean; mix?: number; col?: string; plate?: number; foul?: number; out?: number; larva?: number; t: number }> = ({ m, mix = 0, col = REDP, plate = 0, foul = 0, out = 0, larva = 0, t }) => {
  const src = useGlb(F);
  const pr = useMemo(() => (src ? prep(src, m ? 'mirror' : 'main') : null), [src, m]);
  const barn = useMemo(() => new THREE.InstancedMesh(new THREE.CylinderGeometry(.4, 1, .7, 9, 1), new THREE.MeshStandardMaterial({ color: '#d9d2bf', roughness: .85 }), BARN), []);
  const weed = useMemo(() => new THREE.InstancedMesh(new THREE.BoxGeometry(.005, .07, .022), new THREE.MeshStandardMaterial({ color: '#3f7a3a', roughness: .8 }), WEED), []);
  const part = useMemo(() => new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshBasicMaterial({ color: '#ff8a3d', toneMapped: false, transparent: true, opacity: .9 }), PART), []);
  const lar = useMemo(() => new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshStandardMaterial({ color: '#efe6c8', roughness: .6 }), 160), []);
  if (!pr || !SAMPLES) return null;
  pr.U.uMix.value = mix; pr.U.uBot.value.set(col); pr.U.uPlate.value = plate; pr.U.uFoul.value = foul;
  const o = new THREE.Object3D(), up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < BARN; i++) { const s = SAMPLES[i % SAMPLES.length]; const g = clamp((foul * 1.25 - s.r) / .25); const sc = g * (.02 + .028 * s.r2);
    o.position.copy(s.p); o.quaternion.setFromUnitVectors(up, s.n); o.scale.set(sc, sc, sc); o.updateMatrix(); barn.setMatrixAt(i, o.matrix); }
  barn.instanceMatrix.needsUpdate = true; barn.count = foul > 0 ? BARN : 0;
  for (let i = 0; i < WEED; i++) { const s = SAMPLES[(i * 7 + 3) % SAMPLES.length]; const g = clamp((foul * 1.3 - .25 - s.r * .7) / .3);
    o.position.copy(s.p).addScaledVector(s.n, .005); o.quaternion.setFromUnitVectors(up, new THREE.Vector3(s.n.x * .4, -1, s.n.z * .4).normalize());
    o.rotateZ(.4 * Math.sin(t * 2.3 + i)); o.scale.set(1, g * (.6 + s.r2), 1); o.translateY(.035 * g * (.6 + s.r2)); o.updateMatrix(); weed.setMatrixAt(i, o.matrix); }
  weed.instanceMatrix.needsUpdate = true; weed.count = foul > .2 ? WEED : 0;
  for (let i = 0; i < PART; i++) { const s = SAMPLES[(i * 5 + 1) % SAMPLES.length]; const ph = (t * .45 + s.r) % 1;
    o.position.copy(s.p).addScaledVector(s.n, .01 + ph * .35); o.position.y -= ph * .05; const sc = out * .011 * (1 - ph * .7); o.scale.set(sc, sc, sc); o.quaternion.identity(); o.updateMatrix(); part.setMatrixAt(i, o.matrix); }
  part.instanceMatrix.needsUpdate = true; part.count = out > .01 ? PART : 0;
  for (let i = 0; i < 160; i++) { const s = SAMPLES[(i * 13 + 5) % SAMPLES.length]; const ph = (t * .5 + s.r2) % 1; // larva comes in, bounces off
    const d = ph < .55 ? lerp(.5, .03, eout(ph / .55)) : lerp(.03, .6, eio((ph - .55) / .45)); o.position.copy(s.p).addScaledVector(s.n, d); o.position.x += .15 * Math.sin(i + t);
    const sc = larva * .014; o.scale.set(sc, sc * .8, sc); o.quaternion.identity(); o.updateMatrix(); lar.setMatrixAt(i, o.matrix); }
  lar.instanceMatrix.needsUpdate = true; lar.count = larva > .01 ? 160 : 0;
  return <group position={[0, LIFT, 0]}>
    <primitive object={pr.wrap} />
    <primitive object={barn} /><primitive object={weed} />{!m && <primitive object={part} />}{!m && <primitive object={lar} />}
  </group>;
};
/* ship-space -> world point for callouts */
const S = (x: number, y: number, z: number): V3 => [x, y + LIFT, z];

/* flow streaks along the hull side (water): slow + wobbly when fouled */
const Flow: React.FC<{ t: number; a: number; drag: number; z: number }> = ({ t, a, drag, z }) => {
  if (a <= 0) return null;
  return <>{Array.from({ length: 16 }, (_, i) => { const sp = lerp(2.6, .9, drag); const x = 3.6 - ((t * sp + i * .53) % 7.2); const y = LIFT + .05 + (i % 5) * .07 + drag * .05 * Math.sin(t * 9 + i * 2);
    return <mesh key={i} position={[x, y, z + (i % 3) * .06]} rotation={[0, 0, drag * .3 * Math.sin(t * 7 + i)]}><boxGeometry args={[lerp(.9, .35, drag), .012, .012]} /><meshBasicMaterial color={BLU} transparent opacity={a * .75} toneMapped={false} /></mesh>; })}</>;
};
/* grandma's qozon (generic cast-iron cauldron) */
const Qozon: React.FC<{ x: number; z: number; s: number; a: number; shiny?: boolean }> = ({ x, z, s, a, shiny }) => {
  const geo = useMemo(() => { const pts: THREE.Vector2[] = []; for (let i = 0; i <= 24; i++) { const u = i / 24 * Math.PI / 2; pts.push(new THREE.Vector2(Math.sin(u) * 1, 1 - Math.cos(u) * .9)); } pts.push(new THREE.Vector2(1.08, 1.0), new THREE.Vector2(1.08, 1.06), new THREE.Vector2(.96, 1.06));
    return new THREE.LatheGeometry(pts, 48); }, []);
  if (a <= 0) return null;
  return <group position={[x, 0, z]} scale={s * a}>
    <mesh geometry={geo} position={[0, .0, 0]}><meshStandardMaterial color={shiny ? '#d9dde3' : '#1d1d1f'} metalness={shiny ? 1 : .55} roughness={shiny ? .12 : .55} side={THREE.DoubleSide} /></mesh>
    {[-1, 1].map((k) => <mesh key={k} position={[k * 1.12, .98, 0]} rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[.13, .035, 8, 20, Math.PI]} /><meshStandardMaterial color={shiny ? '#d9dde3' : '#1d1d1f'} metalness={.6} roughness={.4} /></mesh>)}
  </group>;
};

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[] };
const PAL = ['#2f6fd6', '#1f8a5a', '#1b1d21', '#7a4fd6', '#2f6fd6'];

function shot(t: number): Shot {
  const ship = (o: Partial<React.ComponentProps<typeof Ship>> = {}, extra?: (m: boolean) => React.ReactNode) => (m: boolean) => <><Ship m={m} t={t} {...o} />{!m && <Shadow a={.4} len={7.2} />}{extra?.(m)}</>;
  const hz = .5; // approx half beam (set after debug)
  /* A hook (0–4.0) */
  if (t < CUTS[0]) {
    const ang = lerp(.95, 1.2, ease(t, -.5, CUTS[0]));
    return { cam: mixCam({ pos: [Math.sin(ang) * 6.6, 1.3, Math.cos(ang) * 6.6], look: [.6, .55, 0], fov: 32 }, { pos: [Math.sin(ang) * 5.4 + .6, .7, Math.cos(ang) * 5.4], look: [.9, .4, 0], fov: 30 }, ease(t, .3, CUTS[0])),
      world: ship({ mix: 1 }), marks: [{ p: S(2.0, .12, hz), s: 'qizil tag', a: env(t, T.qizil - .2, CUTS[0] + .2, .3, .2), col: RED, up: 170, side: -40 }] };
  }
  /* B fouling grows (4.0–10.9) */
  if (t < CUTS[1]) {
    const foul = ease(t, T.chig - .3, T.yopish + .6);
    return { cam: mixCam({ pos: [1.5, .12, 2.1], look: [.6, .42, 0], fov: 32 }, { pos: [-.2, .16, 3.0], look: [.1, .5, 0], fov: 32 }, ease(t, T.moyna - .4, T.tormoz)),
      world: ship({ foul }, (m) => m ? null : <Flow t={t} a={env(t, T.tormoz - .4, CUTS[1] + .2, .3, .2)} drag={ease(t, T.tormoz - .2, T.tormoz + .6)} z={hz + .12} />),
      marks: [{ p: S(1.0, .12, hz), s: 'chig‘anoqlar', a: env(t, T.chig, T.moyna, .3, .2), col: Y, up: 330, side: -80 },
        { p: S(.3, .05, hz), s: 'suvo‘tlar', a: env(t, T.suvo, T.moyna, .3, .2), col: GRN, up: 330, side: 60 },
        { p: S(-.5, .1, hz), s: 'qurtlar', a: env(t, T.qurt, T.moyna, .3, .2), col: '#ff8a3d', up: 160, side: -40 },
        { p: S(.2, .15, hz), s: 'tormoz', a: env(t, T.tormoz - .1, CUTS[1] + .2, .3, .2), col: RED, up: 260 }] };
  }
  /* C +47 % (10.9–16.9) */
  if (t < CUTS[2]) {
    const ang = lerp(1.9, 2.15, ease(t, CUTS[1], CUTS[2]));
    return { cam: { pos: [Math.sin(ang) * 6.4, 1.6, Math.cos(ang) * 6.4], look: [-.5, 1.05, 0], fov: 32 }, world: ship({ foul: 1 }, (m) => m ? null : <Flow t={t} a={1} drag={1} z={hz + .12} />),
      marks: [{ p: S(-2.9, .1, 0), s: 'vint', a: env(t, T.kuch - .3, CUTS[2] + .2, .3, .2), col: Y, up: 140 }] };
  }
  /* D copper sheathing (16.9–22.5) */
  if (t < CUTS[3]) {
    const plate = Math.min(ease(t, T.mis - .3, T.listlar + .4), 1 - ease(t, T.boyoq - .1, T.qosh + .2));
    const mix = ease(t, T.boyoq - .1, T.qosh + .2);
    return { cam: mixCam({ pos: [2.4, .14, 2.8], look: [.9, .45, 0], fov: 30 }, { pos: [1.7, .12, 2.3], look: [.6, .42, 0], fov: 30 }, ease(t, CUTS[2], CUTS[3])), world: ship({ plate, mix, col: BROWN }),
      marks: [{ p: S(1.4, .1, hz), s: 'mis listlar', a: env(t, T.mis - .1, T.keyin, .3, .2), col: COPPER, up: 230 }, { p: S(1.4, .1, hz), s: 'bo‘yoq + mis', a: env(t, T.boyoq, CUTS[3] + .2, .3, .2), col: COPPER, up: 230 }] };
  }
  /* E paint releases copper, larvae bounce off (22.5–27.45) */
  if (t < CUTS[4]) {
    return { cam: mixCam({ pos: [1.4, .1, 1.8], look: [.6, .36, 0], fov: 30 }, { pos: [.9, .1, 1.6], look: [.4, .34, 0], fov: 30 }, ease(t, CUTS[3], CUTS[4])),
      world: ship({ mix: 1, col: BROWN, out: ease(t, T.mis2 - .3, T.suvga + .3), larva: ease(t, T.jon - .3, T.jon + .2) }),
      marks: [{ p: S(.9, .2, hz), s: 'asta yemiriladi', a: env(t, T.asta, T.mis2, .3, .2), col: Y, up: 200 }, { p: S(.9, .2, hz), s: 'mis suvga', a: env(t, T.mis2, T.jon, .3, .2), col: COPPER, up: 200 },
        { p: S(.5, .12, hz), s: 'yopisha olmaydi', a: env(t, T.yopisha - .1, CUTS[4] + .2, .3, .2), col: GRN, up: 300, side: 40 }] };
  }
  /* F copper oxide = red (27.45–29.95) */
  if (t < CUTS[5]) {
    const k = ease(t, T.qizil2 - .15, T.qizil2 + .15);
    const c = new THREE.Color(BROWN).lerp(new THREE.Color(REDP), k).getStyle();
    return { cam: mixCam({ pos: [3.4, 1.5, 4.6], look: [.3, 1.0, 0], fov: 32 }, { pos: [3.0, 1.3, 4.2], look: [.3, .95, 0], fov: 32 }, ease(t, CUTS[4], CUTS[5])), world: ship({ mix: 1, col: c }), marks: [] };
  }
  /* G twist: any colour… still red (29.95–38.45) */
  if (t < CUTS[6]) {
    const ang = lerp(.6, -.35, ease(t, CUTS[5], CUTS[6]));
    let col = REDP; if (t > T.istalgan - .1 && t < T.baribir) { const i = Math.floor((t - T.istalgan + .1) / .55); col = PAL[i % PAL.length]; }
    return { cam: { pos: [Math.sin(ang) * 7.8, 1.6, Math.cos(ang) * 7.8], look: [.1, .9, 0], fov: 32 }, world: ship({ mix: 1, col }), marks: [] };
  }
  /* H grandma's qozon (38.45–43.05) */
  if (t < CUTS[7]) {
    const shiny = env(t, T.almash - .1, T.kim + .1, .3, .3);
    return { cam: mixCam({ pos: [2.4, 1.3, 5.0], look: [-.05, .55, 1.4], fov: 32 }, { pos: [2.1, 1.15, 4.6], look: [-.05, .5, 1.4], fov: 32 }, ease(t, CUTS[6], CUTS[7])),
      world: ship({ mix: 1 }, (m) => <><Qozon x={-.1} z={1.9} s={.34} a={ease(t, T.xuddi - .2, T.buvi + .2)} />{shiny > 0 && <Qozon x={.85} z={2.3} s={.26} a={shiny} shiny />}</>),
      marks: [{ p: [-.1, .4, 1.9], s: 'buvining qozoni', a: env(t, T.qozon - .2, CUTS[7] + .2, .3, .2), col: Y, up: 200 }, { p: [.85, .3, 2.3], s: 'yangisi?', a: env(t, T.almash, T.kim, .3, .2), col: '#9aa3ad', up: 140 }] };
  }
  /* I share */
  const ang = .9 + (t - CUTS[7]) * .2;
  return { cam: { pos: [Math.sin(ang) * 7.2, 1.6, Math.cos(ang) * 7.2], look: [0, .6, 0], fov: 32 }, world: ship({ mix: 1 }), marks: [] };
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
  const s = t > CUTS[1] && t < CUTS[2] ? 'Manba: Schultz va boshq., Biofouling (2011) · DDG-51, 30 uzel' : t > CUTS[2] && t < CUTS[5] ? 'Manba: Wikipedia «Anti-fouling paint», SlashGear · sxematik' : t > CUTS[5] && t < CUTS[6] ? 'Manba: Mental Floss, SlashGear, Wikipedia' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};
const Chip: React.FC<{ s: string; a: number; col: string; y: number }> = ({ s, a, col, y }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: W / 2, top: y, translate: '-50% -50%', opacity: a, scale: String(.8 + .2 * eback(a)), padding: '14px 34px', borderRadius: 24, background: col, color: '#fff', fontFamily: HEAD, fontWeight: 700, fontSize: 64, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap', boxShadow: '0 14px 40px rgba(0,0,0,.18)' }}>{s}</div>;

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t);
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
    {tint > 0 && <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(236,58,44,0) 30%, rgba(236,58,44,${tint * 3}) 100%)` }} />}
    {!cover && <>
      <Chip s="chiroy uchun ✗" a={env(t, T.chiroy - .05, CUTS[0] - .05, .2, .2)} col={RED} y={640} />
      <BigNum subCol={INK} v="+47 %" sub="dvigatel kuchi" y={600} a={env(t, T.qirq - .1, CUTS[2] - .1, .3, .3)} col={RED} size={200} />
      <Chip s="og‘ir qoplam" a={env(t, T.ogir - .1, T.qirq - .1, .2, .2)} col="#5a6b3a" y={640} />
      <Chip s="XVIII asr" a={env(t, T.yelkan - .1, T.mis - .1, .2, .2)} col={COPPER} y={640} />
      <BigNum subCol={INK} v="Cu₂O" sub="mis oksidi" y={600} a={env(t, T.oksid - .1, CUTS[5] - .05, .3, .3)} col={REDP} size={190} />
      <Chip s="istalgan rang ✓" a={env(t, T.istalgan - .1, T.lekin, .2, .2)} col={GRN} y={640} />
      <Chip s="baribir qizil" a={env(t, T.baribir - .1, T.ikki - .1, .2, .2)} col={REDP} y={640} />
      <BigNum subCol={INK} v="200+ yil" sub="an’ana" y={600} a={env(t, T.ikki - .1, CUTS[6] - .05, .3, .3)} col={REDP} size={170} />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > T.dost - 1.5 && <div style={{ position: 'absolute', left: 70, width: W - 140, top: 495, height: 220, borderRadius: 32, background: 'rgba(20,22,26,.72)', opacity: eout(P(t, T.dost - 1.5, T.dost - 1.0)) }} />}
      {t > CUTS[7] - .3 && <ShareEnd t={t} t0={T.dost - 1.3} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['dengizni sevadigan'], ['do‘stingizga', 'y'], ['yuboring']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <AbsoluteFill style={{ translate: '0 420px' }}><Frame t={2.0} cover /></AbsoluteFill>
  <div style={{ position: 'absolute', left: 0, width: W, top: 1520, textAlign: 'center' }}><span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 48, color: '#fff', background: '#1a8f4e', padding: '10px 28px', borderRadius: 18 }}>chiroy uchun emas!</span></div>
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 360, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 104, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Nega kemalarning<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>tagi qizil?</span>
  </div>
</AbsoluteFill>;
