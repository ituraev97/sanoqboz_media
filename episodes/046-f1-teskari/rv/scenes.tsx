import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { W, H, FPS, Y, RED, GRN, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env } from '../lib';
import { ShareEnd } from '../kit';
import { Logo } from '../Art';
import { Studio, Rig, Shadow, Cam, V3, mixCam, project, TopPill, Callout, BigNum, BG, useGlb } from '../s3d';
import { CAPS } from './caps';
import { END, CH, T } from './ep';

const INK = '#1c1e23', BLUE = '#2F8CFF';
/* "F1 2021/2022 Concept by FIA" — AFR.Official (Sketchfab, CC BY). The glb is one grey material split into arbitrary chunks,
   so it is painted per vertex by position (tyres, wings, floor = carbon; body = sanoqboz yellow). Source: rear at min z, front at +z. */
const F = 'f1_8705fdd833104a96b8215949d4bf146f.glb';
const LEN = 5.4;
const C_Y = new THREE.Color('#ffb400'), C_K = new THREE.Color('#141518'), C_RIM = new THREE.Color('#8d939c'), C_R = new THREE.Color('#e0262b');
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const CUTS = CH.slice(1).map((c) => c[0]);

const useF1 = () => {
  const src = useGlb(F);
  return useMemo(() => {
    if (!src) return null;
    const o = src.clone(true); o.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(o); const sz = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    const L = sz.z, z0 = box.min.z, k = LEN / L; const v = new THREE.Vector3();
    const mat = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: .36, metalness: .12, clearcoat: .8, clearcoatRoughness: .1 });
    o.traverse((m: any) => {
      if (!m.isMesh) return;
      const g = (m.geometry as THREE.BufferGeometry).clone(); const pos = g.attributes.position; const col = new Float32Array(pos.count * 3);
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
        const u = (v.z - z0) / L, x = Math.abs(v.x - c.x) / L, y = (v.y - box.min.y) / L;
        let C = C_Y; const uc = u < .4 ? .122 : .742, d = Math.hypot(u - uc, y - .0725);
        if (x > .108 && d < .086 && (u < .23 || (u > .63 && u < .85))) C = d < .04 ? C_RIM : C_K;
        else if (u > .82 && y < .1) C = C_K;
        else if (u < .07 && y > .11) C = y > .195 ? C_R : C_K;
        else if (y < .03) C = C_K;
        else if (x < .03 && y > .16 && u > .3 && u < .5) C = C_K;
        col[i * 3] = C.r; col[i * 3 + 1] = C.g; col[i * 3 + 2] = C.b;
      }
      g.setAttribute('color', new THREE.BufferAttribute(col, 3)); m.geometry = g; m.material = mat;
    });
    o.scale.setScalar(k); o.position.set(-c.x * k, -box.min.y * k, -c.z * k);
    return { o, h: sz.y * k };
  }, [src]);
};
/* the car: long axis x, front to +x. inv = 0..1 roll onto the ceiling at height ceil */
const F1: React.FC<{ x?: number; inv?: number; ceil?: number; lift?: number }> = ({ x = 0, inv = 0, ceil = 3.2, lift = 0 }) => {
  const r = useF1(); const inst = useMemo(() => (r ? r.o.clone(true) : null), [r]);
  if (!inst || !r) return null;
  const y = inv > 0 ? lerp(0, ceil, eio(inv)) : lift;
  return <group position={[x, y, 0]} rotation={[Math.PI * eio(inv), 0, 0]}><group rotation={[0, Math.PI / 2, 0]}><primitive object={inst} /></group></group>;
};
/* 3D arrow from p along dir (unit), length len */
const Arrow: React.FC<{ p: V3; dir?: V3; len: number; col: string; a: number; w?: number }> = ({ p, dir = [0, -1, 0], len, col, a, w = .07 }) => {
  if (a <= 0 || len <= .01) return null;
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...dir));
  const head = Math.min(.35, len * .45);
  return <group position={p} quaternion={q}>
    <mesh position={[0, (len - head) / 2, 0]}><cylinderGeometry args={[w, w, len - head, 20]} /><meshStandardMaterial color={col} emissive={col} emissiveIntensity={.35} transparent opacity={a} /></mesh>
    <mesh position={[0, len - head / 2, 0]}><coneGeometry args={[w * 2.6, head, 24]} /><meshStandardMaterial color={col} emissive={col} emissiveIntensity={.35} transparent opacity={a} /></mesh>
  </group>;
};
/* tunnel ceiling slab with lane dashes, scrolling with speed */
const Ceiling: React.FC<{ y: number; a: number; off: number }> = ({ y, a, off }) => a <= 0 ? null : <group position={[0, y, 0]}>
  <mesh position={[0, .15, 0]}><boxGeometry args={[60, .3, 5.2]} /><meshStandardMaterial color="#5d6168" roughness={.85} transparent opacity={a} /></mesh>
  {Array.from({ length: 16 }, (_, i) => { const x = ((i * 3.6 - off) % 57.6 + 57.6) % 57.6 - 28.8; return <mesh key={i} position={[x, -.005, 0]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[1.8, .14]} /><meshBasicMaterial color="#f2f2f2" transparent opacity={a} side={THREE.DoubleSide} /></mesh>; })}
  {[-2.6, 2.6].map((z) => <mesh key={z} position={[0, -.4, z]}><boxGeometry args={[60, .8, .12]} /><meshStandardMaterial color="#454950" transparent opacity={a} /></mesh>)}
  {Array.from({ length: 10 }, (_, i) => { const x = ((i * 6 - off) % 60 + 60) % 60 - 30; return <mesh key={'l' + i} position={[x, -.02, 2.3]}><boxGeometry args={[1.2, .04, .25]} /><meshBasicMaterial color="#fff6d8" transparent opacity={a} toneMapped={false} /></mesh>; })}
</group>;
/* floor lane dashes for speed */
const Lanes: React.FC<{ off: number; a: number }> = ({ off, a }) => a <= 0 ? null : <>
  {Array.from({ length: 14 }, (_, i) => { const x = ((i * 3.6 - off) % 50.4 + 50.4) % 50.4 - 25.2; return [-2.2, 2.2].map((z) => <mesh key={i + '_' + z} position={[x, .006, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.6, .12]} /><meshBasicMaterial color="#ffffff" transparent opacity={a * .9} /></mesh>); })}
</>;
/* air streaks flowing over the car */
const Air: React.FC<{ t: number; a: number; y0?: number; flip?: boolean }> = ({ t, a, y0 = 0, flip }) => a <= 0 ? null : <>
  {Array.from({ length: 14 }, (_, i) => { const ph = ((t * 1.9 + i * .37) % 1); const x = lerp(5, -5, ph); const z = ((i * 7) % 13) / 13 * 2.4 - 1.2; const yy = .25 + ((i * 5) % 9) / 9 * 1.1;
    const dip = Math.exp(-Math.pow((x - 2.6) / .6, 2)) * .1 + Math.exp(-Math.pow((x + 2.4) / .5, 2)) * .14; const y = y0 + (flip ? -1 : 1) * (yy + dip);
    return <mesh key={i} position={[x, y, z]}><boxGeometry args={[.9, .025, .025]} /><meshBasicMaterial color="#2F8CFF" transparent opacity={a * Math.sin(ph * Math.PI) * .8} /></mesh>; })}
</>;
/* two generic fans (schematic of a fan car) */
const Fans: React.FC<{ t: number; a: number; y?: number }> = ({ t, a, y = 0 }) => a <= 0 ? null : <>
  {[-.75, .75].map((z) => <group key={z} position={[-.9, y, z]} rotation={[0, 0, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[.55, .66, 48]} /><meshBasicMaterial color="#2F8CFF" transparent opacity={a} side={THREE.DoubleSide} toneMapped={false} /></mesh>
    <group rotation={[0, t * 22, 0]}>{Array.from({ length: 7 }, (_, i) => <mesh key={i} rotation={[0, i * Math.PI * 2 / 7, .35]} position={[0, 0, 0]}><boxGeometry args={[1.05, .02, .16]} /><meshStandardMaterial color="#e9eef5" transparent opacity={a} /></mesh>)}</group>
  </group>)}
</>;
/* oil drops leaving the inverted engine (twist) */
const Drops: React.FC<{ t: number; t0: number; ceil: number; a: number }> = ({ t, t0, ceil, a }) => a <= 0 ? null : <>
  {Array.from({ length: 9 }, (_, i) => { const tt = t - t0 - i * .18; if (tt < 0) return null; const ph = tt % 1.3; const y = ceil - .8 - 2.6 * ph * ph; if (y < 0) return null;
    return <mesh key={i} position={[-.8 + (i % 3) * .3, y, ((i * 5) % 7) / 7 * .6 - .3]}><sphereGeometry args={[.07, 16, 12]} /><meshStandardMaterial color="#3a2a10" roughness={.15} metalness={.3} transparent opacity={a} /></mesh>; })}
</>;

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[]; blur?: number };
const CEIL = 3.3;

function shot(t: number): Shot {
  const speed = (t: number) => t * 14;
  /* A hook: already on the tunnel ceiling, camera low looking up */
  if (t < CUTS[0]) {
    const ang = lerp(.55, .95, ease(t, 0, CUTS[0]));
    return { cam: { pos: [Math.sin(ang) * 8.6, 1.1, Math.cos(ang) * 8.6], look: [0, 2.0, 0], fov: 36 },
      world: (m) => <>{!m && <Ceiling y={CEIL} a={1} off={speed(t)} />}{!m && <F1 inv={1} ceil={CEIL} />}{!m && <Air t={t} a={1} y0={CEIL} flip />}</>,
      marks: [{ p: [0, CEIL - 1.3, 0], s: 'tunnel shifti', a: env(t, .8, CUTS[0] + .2, .3, .2), col: Y, up: 90 }] };
  }
  /* B wings: like an aircraft wing, but upside down — arrows push DOWN */
  if (t < CUTS[1]) {
    const k = ease(t, T.bosadi - .2, T.bosadi + .5);
    return { cam: mixCam({ pos: [5.2, 2.4, 6.2], look: [0, .5, 0], fov: 32 }, { pos: [3.4, 2.8, 6.8], look: [.2, .5, 0], fov: 32 }, ease(t, CUTS[0], CUTS[1])),
      world: (m) => <><F1 />{!m && <><Shadow a={.4} len={5.8} /><Air t={t} a={env(t, CUTS[0] + .2, CUTS[1] + .3)} /><Arrow p={[2.75, 1.5, 0]} len={1.1 * k} col={RED} a={k} /><Arrow p={[-2.55, 2.2, 0]} len={1.2 * k} col={RED} a={k} /></>}</>,
      marks: [{ p: [2.75, .25, .8], s: 'old qanot', a: env(t, T.qanot, CUTS[1] + .2, .3, .2), col: Y, up: 140, side: -170 }, { p: [-2.55, 1.15, 0], s: 'orqa qanot', a: env(t, T.qanot + .4, CUTS[1] + .2, .3, .2), col: Y, up: 120, side: 150 }] };
  }
  /* C downforce = weight at ~200 km/h: weight arrow vs downforce arrow */
  if (t < CUTS[2]) {
    const k = ease(t, T.ikkiyuz - .2, T.vazn + .3);
    return { cam: mixCam({ pos: [.4, 2.0, 8.2], look: [0, .9, 0], fov: 32 }, { pos: [-1.0, 2.2, 8.0], look: [0, .9, 0], fov: 32 }, ease(t, CUTS[1], CUTS[2])),
      world: (m) => <><F1 />{!m && <><Shadow a={.4} len={5.8} /><Lanes off={speed(t)} a={1} /><Arrow p={[-.6, 2.1, .2]} len={.9} col={INK} a={env(t, CUTS[1] + .3, CUTS[2] + .3)} /><Arrow p={[.6, 1.2 + .9 * k, .2]} len={.9 * k} col={RED} a={k} /></>}</>,
      marks: [] };
  }
  /* D speed x2 -> force x4 */
  if (t < CUTS[3]) {
    const k2 = ease(t, T.tort - .2, T.tort + .5);
    return { cam: mixCam({ pos: [4.2, 3.0, 7.4], look: [0, .6, 0], fov: 32 }, { pos: [5.0, 2.6, 6.4], look: [0, .6, 0], fov: 32 }, ease(t, CUTS[2], CUTS[3])),
      world: (m) => <><F1 />{!m && <><Shadow a={.4} len={5.8} /><Lanes off={speed(t) * (1 + ease(t, T.ikki - .2, T.ikki + .4))} a={1} />
        {[-1.6, -.55, .55, 1.6].map((x, i) => <Arrow key={i} p={[x, 2.0, 0]} len={i === 0 ? .8 : .8 * k2} col={RED} a={i === 0 ? 1 : k2} />)}</>}</>,
      marks: [] };
  }
  /* E so at speed it sticks to the ceiling: the car rolls up */
  if (t < CUTS[4]) {
    const inv = ease(t, T.demak + .2, T.shift + .4);
    return { cam: mixCam({ pos: [6.2, 1.6, 5.6], look: [0, 1.3, 0], fov: 36 }, { pos: [6.6, .8, 5.4], look: [0, 2.2, 0], fov: 36 }, ease(t, CUTS[3], CUTS[4])),
      world: (m) => <>{!m && <Ceiling y={CEIL} a={ease(t, CUTS[3], CUTS[3] + .5)} off={speed(t)} />}{m ? (inv < .02 && <F1 />) : <F1 inv={inv} ceil={CEIL} />}{!m && <><Air t={t} a={1} y0={inv > .5 ? CEIL : 0} flip={inv > .5} /><Arrow p={[0, CEIL - 1.8, 0]} dir={[0, 1, 0]} len={1.2 * ease(t, T.shift, T.shift + .4)} col={RED} a={ease(t, T.shift, T.shift + .4)} /></>}</>,
      marks: [] };
  }
  /* F twist: no real F1 has done it — oil and fuel flow the wrong way, engine stops */
  if (t < CUTS[5]) {
    const stop = ease(t, T.motor - .2, T.motor + .6);
    return { cam: mixCam({ pos: [-4.6, 1.2, 6.4], look: [0, 2.2, 0], fov: 34 }, { pos: [-3.8, 1.6, 5.4], look: [-.4, 2.4, 0], fov: 34 }, ease(t, CUTS[4], CUTS[5])),
      world: (m) => <>{!m && <Ceiling y={CEIL} a={1} off={speed(T.motor) + (t - T.motor) * 14 * (1 - stop)} />}{!m && <F1 inv={1} ceil={CEIL} />}{!m && <Drops t={t} t0={T.moy - .1} ceil={CEIL} a={env(t, T.moy - .2, CUTS[5] + .3)} />}</>,
      marks: [{ p: [-.6, CEIL - .6, .4], s: 'moy · yoqilg‘i', a: env(t, T.moy, CUTS[5] + .2, .3, .2), col: '#a8742a', up: -150, side: -90 }],
      blur: 0 };
  }
  /* G McMurtry Spéirling 2025: fans (schematic), works even standing still */
  if (t < CUTS[6]) {
    const ang = .4 + (t - CUTS[5]) * .12;
    return { cam: { pos: [Math.sin(ang) * 7.4, 1.0, Math.cos(ang) * 7.4], look: [0, 2.2, 0], fov: 36 },
      world: (m) => <>{!m && <><Ceiling y={CEIL} a={1} off={0} /><F1 inv={1} ceil={CEIL} /><Fans t={t} a={ease(t, T.ventil - .3, T.ventil + .3)} y={CEIL - .12} />
        <Arrow p={[-.9, CEIL - 2.1, 0]} dir={[0, 1, 0]} len={1.6 * ease(t, T.tonna - .2, T.tonna + .4)} col={BLUE} a={ease(t, T.tonna - .2, T.tonna + .4)} w={.1} /></>}</>,
      marks: [{ p: [-.9, CEIL - .2, .75], s: '2 ventilyator', a: env(t, T.ventil, T.tonna + .1, .3, .2), col: BLUE, up: -140, side: 60 }] };
  }
  /* H joke: driver, lunch later */
  if (t < CUTS[7]) {
    const ang = 1.25 + (t - CUTS[6]) * .1;
    return { cam: { pos: [Math.sin(ang) * 9.6, .9, Math.cos(ang) * 9.6], look: [0, 1.9, 0], fov: 36 }, world: (m) => <>{!m && <><Ceiling y={CEIL} a={1} off={speed(t)} /><F1 inv={1} ceil={CEIL} /><Air t={t} a={1} y0={CEIL} flip /></>}</>, marks: [] };
  }
  /* I share: back on the floor, slow orbit */
  const ang = .8 + (t - CUTS[7]) * .3;
  return { cam: { pos: [Math.sin(ang) * 8.4, 2.4, Math.cos(ang) * 8.4], look: [0, .5, 0], fov: 32 }, world: (m) => <><F1 />{!m && <Shadow a={.4} len={5.8} />}</>, marks: [] };
}

/* aircraft wing vs F1 wing (2D section) */
const Airfoils: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, T.qanot - .1, T.prijim - .1, .35, .3); if (a <= 0) return null;
  const b = eout(P(t, T.teskari - .2, T.teskari + .4));
  const foil = 'M0,40 C30,0 150,-6 260,30 C170,48 60,52 0,40 Z';
  const one = (flip: boolean, label: string, col: string, k: number) => <div style={{ width: 400, textAlign: 'center', opacity: k }}>
    <svg width={400} height={230} viewBox="-70 -110 400 230">
      <g transform={flip ? 'translate(0,80) scale(1,-1)' : ''}><path d={foil} fill={flip ? INK : '#c9ced6'} stroke={INK} strokeWidth={3} /></g>
      <line x1={130} y1={flip ? 55 : 10} x2={130} y2={flip ? 115 : -60} stroke={col} strokeWidth={10} />
      <polygon points={flip ? '110,100 150,100 130,122' : '110,-50 150,-50 130,-74'} fill={col} />
    </svg>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: INK, textTransform: 'uppercase' }}>{label}</div>
  </div>;
  return <div style={{ position: 'absolute', left: 60, width: W - 120, top: 470, display: 'flex', justifyContent: 'space-between', opacity: a, padding: '24px 0', borderRadius: 36, background: 'rgba(255,255,255,.78)', boxShadow: '0 20px 60px rgba(0,0,0,.12)' }}>
    {one(false, 'samolyot: ko‘taradi', GRN, 1)}{one(true, 'bolid: bosadi', RED, b)}
  </div>;
};

const Caps: React.FC<{ t: number }> = ({ t }) => {
  let cur: typeof CAPS[number] | null = null; for (const l of CAPS) if (t >= l[0].s - .05) cur = l;
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
  const s = t > CUTS[1] && t < CUTS[3] ? 'Manba: PlanetF1 (taxminiy hisob) · The Drive' : t > CUTS[4] && t < CUTS[5] ? 'Manba: PlanetF1 · hech qachon sinalmagan' : t > CUTS[5] && t < CUTS[6] ? 'Manba: Top Gear, McMurtry (2025) · ventilyatorlar sxematik' : t < CUTS[0] ? '3D: AFR.Official (Sketchfab, CC BY) · sxema' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t);
  const cut = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const blur = Math.max(cut * 18, (sh.blur ?? 0) * 10);
  const stopA = env(t, T.motor - .1, CUTS[5], .2, .3);
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <AbsoluteFill style={{ background: BG.light }} />
    <AbsoluteFill style={{ filter: blur > .3 ? `blur(${blur.toFixed(1)}px)` : undefined }}>
      <ThreeCanvas width={W} height={H} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <Rig cam={sh.cam} />
        <Studio theme="light">{(m) => sh.world(m)}</Studio>
      </ThreeCanvas>
      {!cover && sh.marks.map((k, i) => <Callout key={i} at={project(sh.cam, k.p)} s={k.s} a={k.a} col={k.col} up={k.up} side={k.side} ink="rgba(28,30,35,.55)" />)}
    </AbsoluteFill>
    {!cover && <>
      <Airfoils t={t} />
      <BigNum subCol={INK} v="ha!" sub="fizika bo‘yicha" y={640} a={env(t, T.ha - .1, CUTS[0] - .05, .2, .2)} col={GRN} size={190} />
      <BigNum subCol={INK} v={`≈${Math.round(200 * eout(P(t, T.ikkiyuz - .1, T.ikkiyuz + .6)))} km/soat`} sub={t > T.vazn ? 'qizil prijim = qora vazn' : 'tezlikda'} y={540} a={env(t, T.ikkiyuz - .1, CUTS[2] - .05, .25, .2)} col={INK} size={120} />
      <div style={{ position: 'absolute', left: 0, width: W, top: 470, display: 'flex', justifyContent: 'center', gap: 40, fontFamily: HEAD, fontWeight: 700, fontSize: 120, color: INK, opacity: env(t, T.ikki - .1, CUTS[3] - .05, .25, .2) }}>
        <div style={{ textAlign: 'center' }}>×2<div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 800 }}>TEZLIK</div></div>
        <div style={{ alignSelf: 'center', fontSize: 80, opacity: .5 }}>→</div>
        <div style={{ textAlign: 'center', color: RED, opacity: eout(P(t, T.tort - .1, T.tort + .3)), scale: String(lerp(.6, 1, eback(P(t, T.tort - .1, T.tort + .35)))) }}>×4<div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 800 }}>PRIJIM</div></div>
      </div>
      <BigNum subCol={INK} v="hali yo‘q" sub="haqiqiy F1 sinalmagan" y={600} a={env(t, T.haqiqiy - .1, T.moy - .1, .25, .2)} col={RED} size={130} />
      {stopA > 0 && <div style={{ position: 'absolute', left: W / 2, top: 620, translate: '-50% -50%', opacity: stopA, scale: String(lerp(1.4, 1, eout(P(t, T.motor - .1, T.motor + .25)))), padding: '16px 40px', border: `8px solid ${RED}`, borderRadius: 24, color: RED, fontFamily: HEAD, fontWeight: 700, fontSize: 96, rotate: '-6deg', background: 'rgba(255,255,255,.7)' }}>MOTOR STOP</div>}
      <BigNum subCol={INK} v="2025" sub="McMurtry Spéirling" y={590} a={env(t, T.yil - .1, T.ventil - .1, .25, .2)} col={INK} size={150} />
      <BigNum subCol={INK} v={`${(2 * eout(P(t, T.tonna - .1, T.tonna + .5))).toFixed(1).replace('.0', '')} tonna`} sub={t > T.joyida - .1 ? 'joyida turganda ham' : 'bosim'} y={600} a={env(t, T.tonna - .1, CUTS[6] - .05, .25, .2)} col={BLUE} size={130} />
      <BigNum subCol={INK} v="keyinroq!" sub="tushlik" y={1120} a={env(t, T.tushlik - .2, CUTS[7] - .05, .25, .2)} col={Y} size={110} />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > CUTS[7] - .3 && <ShareEnd t={t} t0={T.dost - .9} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['poyga ishqiboz'], ['do‘stingizga', 'y'], ['yuboring']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <Frame t={1.2} cover />
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 1180, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 104, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    F1 shiftda<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>teskari</span> yuradimi?
  </div>
</AbsoluteFill>;
