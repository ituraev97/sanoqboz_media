import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { W, H, FPS, Y, RED, GRN, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env } from '../lib';
import { ShareEnd } from '../kit';
import { Logo } from '../Art';
import { Studio, Rig, GlbCar, Shadow, Cam, V3, mixCam, project, TopPill, Callout, BigNum, BG, PaintMap } from '../s3d';
import { CAPS } from './caps';
import { END, CH, T } from './ep';

const INK = '#1c1e23', F = 'ghost.glb';
/* Sketchfab Ghost (kurojishi, CC BY): textured; material names are used only where we override */
const PAINT: PaintMap = [];
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const CUTS = [5.2, 9.8, 14.8, 24.6, 28.7, 33.5];
/* door position on the model (front +x, camera side +z) — schematic cavity */
const DX = 0.45, DZ = 0.93, DY = 0.78;

/* schematic closed umbrella (carbon canopy, chrome handle), standing in the door; pop 0..1 pulls it out */
const Umbrella: React.FC<{ pop: number; wet?: number; side?: 1 | -1; a?: number }> = ({ pop, wet = 0, side = 1, a = 1 }) => {
  if (a <= 0) return null;
  const out = pop * .6, up = pop * .5;
  return <group position={[DX, DY + up, side * (DZ - .12 + out)]} rotation={[0, 0, pop * .35]} scale={a * .72}>
    <mesh position={[0, .08, 0]}><cylinderGeometry args={[.012, .012, .95, 12]} /><meshStandardMaterial color="#c9ccd1" metalness={1} roughness={.15} /></mesh>
    <mesh position={[0, -.28, 0]}><coneGeometry args={[.055, .5, 16]} /><meshPhysicalMaterial color={wet > .5 ? '#1b2a3a' : '#17181b'} metalness={.4} roughness={.3} clearcoat={1} /></mesh>
    <mesh position={[0, -.5, 0]}><sphereGeometry args={[.016, 8, 8]} /><meshStandardMaterial color="#d6b27a" metalness={1} roughness={.2} /></mesh>
    <mesh position={[0, .56, 0]}><sphereGeometry args={[.04, 16, 12]} /><meshStandardMaterial color="#c9ccd1" metalness={1} roughness={.12} /></mesh>
    <mesh position={[.045, .6, 0]} rotation={[0, 0, -Math.PI / 2]}><torusGeometry args={[.05, .014, 8, 16, Math.PI]} /><meshStandardMaterial color="#c9ccd1" metalness={1} roughness={.12} /></mesh>
  </group>;
};
/* door cavity outline + drain hole */
const Cavity: React.FC<{ a: number; side?: 1 | -1 }> = ({ a, side = 1 }) => {
  const geo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(.2, .86, .16)), []);
  if (a <= 0) return null;
  return <group position={[DX, DY, side * (DZ - .12)]}>
    <lineSegments geometry={geo}><lineBasicMaterial color={Y} transparent opacity={a} toneMapped={false} /></lineSegments>
    <mesh position={[0, -.44, 0]} rotation={[Math.PI / 2, 0, 0]}><ringGeometry args={[.035, .055, 20]} /><meshBasicMaterial color={Y} transparent opacity={a} toneMapped={false} side={THREE.DoubleSide} /></mesh>
  </group>;
};
/* rain streaks over the car (deterministic) */
const Rain: React.FC<{ t: number; a: number }> = ({ t, a }) => {
  const items = useMemo(() => Array.from({ length: 90 }, (_, i) => { const r = (n: number) => { const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x); }; return { x: (r(1) - .5) * 7, z: (r(2) - .5) * 4.2, ph: r(3), sp: 5 + r(4) * 2 }; }), []);
  if (a <= 0) return null;
  return <group>{items.map((d, i) => { const y = 4.2 - ((t * d.sp + d.ph * 4.2) % 4.2); return <mesh key={i} position={[d.x, y, d.z]}><boxGeometry args={[.012, .32, .012]} /><meshBasicMaterial color="#5a7fa8" transparent opacity={.55 * a} toneMapped={false} /></mesh>; })}</group>;
};
/* water drops falling down the cavity + warm air puffs */
const Drops: React.FC<{ t: number; a: number }> = ({ t, a }) => {
  if (a <= 0) return null;
  return <group>{Array.from({ length: 9 }, (_, i) => { const ph = (t * .9 + i * .113) % 1; return <mesh key={i} position={[DX + (i % 3 - 1) * .035, DY + .3 - ph * .72, DZ - .12 + (i % 2 ? .03 : -.03)]}><sphereGeometry args={[.022, 10, 8]} /><meshBasicMaterial color="#2F8CFF" transparent opacity={a * (1 - ph * .5)} toneMapped={false} /></mesh>; })}</group>;
};
const Warm: React.FC<{ t: number; a: number }> = ({ t, a }) => {
  if (a <= 0) return null;
  return <group>{Array.from({ length: 14 }, (_, i) => { const ph = (t * .55 + i * .071) % 1; return <mesh key={i} position={[DX + Math.sin(i * 2.1 + t * 2) * .07, DY - .38 + ph * .78, DZ - .12 + Math.cos(i * 1.7) * .05]}><sphereGeometry args={[.026 + ph * .02, 10, 8]} /><meshBasicMaterial color="#ff8a2a" transparent opacity={a * Math.sin(ph * Math.PI) * .9} toneMapped={false} /></mesh>; })}</group>;
};

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[]; blur?: number };
const door: V3 = [DX, DY + .4, DZ];

function shot(t: number): Shot {
  const car = (o: Partial<React.ComponentProps<typeof GlbCar>> = {}) => <GlbCar file={F} paint={PAINT} {...o} />;
  /* A hook (0–5.2): car turns, x-ray reveals the umbrella in the door, 700 $ */
  if (t < CUTS[0]) {
    const xr = ease(t, .9, 1.7) * .8;
    const ang = lerp(.5, 1.25, ease(t, 0, CUTS[0]));
    return { cam: { pos: [Math.sin(ang) * 7.6, 1.8, Math.cos(ang) * 7.6], look: [0, .95, 0], fov: 32 },
      world: (m) => <>{car({ xray: xr })}<Umbrella pop={0} a={ease(t, .9, 1.5)} /><Cavity a={ease(t, 1.4, 2.0)} />{!m && <Shadow a={.45} />}</>,
      marks: [{ p: door, s: 'soyabon', a: env(t, T.sob + .3, T.narx - .2, .3, .2), col: Y, up: 120 }] };
  }
  /* B the cavity (5.2–9.8): close on the door, umbrella slides out on "chiqadi" */
  if (t < CUTS[1]) {
    const pop = ease(t, T.chiqadi - .15, T.chiqadi + .6);
    return { cam: mixCam({ pos: [DX + 1.3, 1.3, 4.6], look: [DX, DY - .3, 0.5], fov: 32 }, { pos: [DX + 2.0, 1.5, 4.2], look: [DX + .2, DY - .28, 0.6], fov: 32 }, ease(t, CUTS[0], CUTS[1])),
      world: (m) => <>{car({ xray: .85 })}<Umbrella pop={pop} /><Cavity a={1 - pop} />{!m && <Shadow a={.4} />}</>,
      marks: [{ p: [DX, DY - .35, DZ], s: 'alohida uyacha', a: env(t, T.uyacha - .2, T.chiqadi - .3, .3, .2), col: Y, up: 100, side: 90 }] };
  }
  /* C rain: pull the wet umbrella out, then put it back (9.8–14.8) */
  if (t < CUTS[2]) {
    const pop = ease(t, CUTS[1] + .1, CUTS[1] + .7) * (1 - ease(t, T.qaytar, T.qaytar + .9)) + 0;
    const pop2 = t < CUTS[1] + .1 ? 1 : pop;
    return { cam: mixCam({ pos: [DX + 1.6, 1.6, 4.9], look: [DX, DY - .25, .6], fov: 32 }, { pos: [DX + 1.3, 1.4, 4.6], look: [DX, DY - .25, .6], fov: 32 }, ease(t, CUTS[1], CUTS[2])),
      world: (m) => <>{car({ xray: t > T.qaytar + .5 ? ease(t, T.qaytar + .5, T.qaytar + 1) * .8 : 0 })}<Umbrella pop={t < CUTS[1] + .1 ? 1 : pop2} wet={t < T.qaytar ? 1 : 0} />{<Rain t={t} a={1 - ease(t, T.qaytar + .6, T.qaytar + 1.2)} />}{!m && <Shadow a={.4} />}</>,
      marks: [{ p: [DX + .3, DY + .5, DZ + .5], s: 'ho‘l soyabon', a: env(t, T.hol, T.qaytar - .1, .3, .2), col: '#2F8CFF', up: 120 }] };
  }
  /* D drainage + warm air (14.8–24.6) */
  if (t < CUTS[3]) {
    return { cam: mixCam({ pos: [DX + 1.7, 1.5, 4.7], look: [DX, DY - .3, .6], fov: 32 }, { pos: [DX + 1.2, 1.2, 4.3], look: [DX, DY - .3, .7], fov: 32 }, ease(t, CUTS[2], CUTS[3])),
      world: (m) => <>{car({ xray: .85 })}<Umbrella pop={0} /><Cavity a={1} /><Drops t={t} a={ease(t, T.drenaj - .1, T.drenaj + .5)} /><Warm t={t} a={ease(t, T.issiq - .1, T.issiq + .5)} />{!m && <Shadow a={.4} />}</>,
      marks: [{ p: [DX, DY - .55, DZ - .1], s: 'drenaj kanali', a: env(t, T.drenaj, T.issiq - .2, .3, .2), col: '#2F8CFF', up: 100, side: -90 },
        { p: [DX, DY + .1, DZ - .1], s: 'issiq havo', a: env(t, T.issiq, CUTS[3] + .1, .3, .2), col: '#ff8a2a', up: 110, side: 100 }] };
  }
  /* E carbon fibre, two umbrellas (24.6–28.7): 3/4 view, both doors */
  if (t < CUTS[4]) {
    const ang = lerp(.95, 1.6, ease(t, CUTS[3], CUTS[4]));
    return { cam: { pos: [DX + Math.sin(ang) * 6.4, 2.0, Math.cos(ang) * 6.4], look: [0, .75, 0], fov: 32 },
      world: (m) => <>{car({ xray: .85 })}<Umbrella pop={0} /><Umbrella pop={0} side={-1} a={ease(t, T.ikki - .6, T.ikki - .1)} />{!m && <Shadow a={.4} />}</>,
      marks: [{ p: [DX, DY + .5, DZ], s: 'uglerod tola', a: env(t, T.uglerod, T.ikki - .2, .3, .2), col: Y, up: 150 }] };
  }
  /* F price (28.7–33.5) */
  if (t < CUTS[5]) {
    const ang = lerp(.6, 1.0, ease(t, CUTS[4], CUTS[5]));
    return { cam: { pos: [Math.sin(ang) * 8.4, 2.0, Math.cos(ang) * 8.4], look: [0, .75, 0], fov: 32 },
      world: (m) => <>{car()}{!m && <Shadow a={.45} />}</>, marks: [] };
  }
  const ang = 1.0 + (t - CUTS[5]) * .25;
  return { cam: { pos: [Math.sin(ang) * 9.6, 2.2, Math.cos(ang) * 9.6], look: [0, .75, 0], fov: 32 }, world: (m) => <>{car()}{!m && <Shadow a={.45} />}</>, marks: [] };
}

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
  const s = t > CUTS[1] && t < CUTS[4] ? 'Manba: Jalopnik, Robb Report, Motor1 · sxema' : t > CUTS[4] && t < CUTS[5] ? 'Narx: Jalopnik, Robb Report (2017) · hisob: 2 × 700 $' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t);
  const cut = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const blur = Math.max(cut * 18, (sh.blur ?? 0) * 10);
  const hook = env(t, 0, 2.7, .1, .3);
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
      {hook > 0 && <div style={{ position: 'absolute', left: 40, width: W - 80, top: 470, textAlign: 'center', opacity: hook, fontFamily: HEAD, fontWeight: 700, fontSize: 96, lineHeight: 1.05, color: INK, textTransform: 'uppercase' }}>Eshikda <span style={{ background: Y, padding: '0 18px', borderRadius: 16 }}>soyabon?!</span></div>}
      <BigNum subCol={INK} v="700 $" sub="bitta soyabon · taxminan" y={600} a={env(t, T.narx - .1, CUTS[0] - .05, .25, .2)} col={INK} />
      <BigNum subCol={INK} v="1 400 $" sub={t > T.dollar - .8 ? 'juftlik · 2 × 700 $' : 'juftlik'} y={650} a={env(t, T.ming - .25, CUTS[5] - .1, .25, .25)} col="#c0392b" size={150} />
      <BigNum subCol={INK} v={`${Math.round(2 * eout(P(t, T.ikki - .1, T.ikki + .5)))} ta`} sub="har mashinada" y={650} a={env(t, T.ikki - .1, CUTS[4] - .05, .25, .2)} col={INK} size={150} />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > CUTS[5] - .3 && <ShareEnd t={t} t0={T.dost - .9} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['rolls-royce'], ['orzusidagi', 'y'], ['do‘stingizga']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <Frame t={1.9} cover />
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 330, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 100, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Rolls-Royce<br />eshigida <span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>soyabon</span><br />700 $
  </div>
</AbsoluteFill>;
