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

const INK = '#1c1e23', BLU = '#2F8CFF';
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const CUTS = [4.3, 9.2, 16.4, 22.3, 32.85, 38.0, 42.2];

/* ---------- real model: freight bogie Y25 (Sketchfab, Víctor Hernández, CC BY) fitted to length L along z ---------- */
const F = 'bogie_y25.glb';
const Bogie: React.FC<{ z?: number; L?: number; y?: number }> = ({ z = 0, L = 2.6, y = 0 }) => {
  const src = useGlb(F);
  const obj = useMemo(() => {
    if (!src) return null;
    const o = src.clone(true); o.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(o); const sz = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    const k = L / Math.max(sz.x, sz.z); const wrap = new THREE.Group(), inner = new THREE.Group(); wrap.add(inner); inner.add(o);
    o.position.set(-c.x * k, -box.min.y * k, -c.z * k); o.scale.setScalar(k);
    if (sz.x > sz.z) inner.rotation.y = Math.PI / 2;
    o.traverse((m: any) => { if (m.isMesh) { const mm = (m.material as THREE.MeshStandardMaterial).clone(); mm.envMapIntensity = 1.2; m.material = mm; } });
    return wrap;
  }, [src, L]);
  return obj ? <group position={[0, y, z]}><primitive object={obj} /></group> : null;
};

/* ---------- schematic wheelset + track (taper exaggerated for visibility; real 1:20) ---------- */
const R0 = .46, G0 = .72, RH = .17, TW = .10; // wheel radius at flange root, half distance between flange roots, rail height, tread width
const RX = G0 + TW / 2;                      // rail head centre
const profile = (c: number) => [
  new THREE.Vector2(.13, -.06), new THREE.Vector2(R0 + .05, -.06), new THREE.Vector2(R0 + .055, -.035), new THREE.Vector2(R0 + .012, -.004),
  new THREE.Vector2(R0, .004), new THREE.Vector2(R0 - c * TW, TW), new THREE.Vector2(R0 - c * TW - .015, TW + .01), new THREE.Vector2(.13, TW + .01)];
const STEEL = { color: '#a7adb5', metalness: .85, roughness: .32 };
const OneWheel: React.FC<{ side: 1 | -1; c: number; hot: number; glow: number; col?: string }> = ({ side, c, hot, glow, col }) => {
  const geo = useMemo(() => new THREE.LatheGeometry(profile(c), 96), [c]);
  return <group position={[side * G0, 0, 0]} rotation={[0, 0, -side * Math.PI / 2]}>
    <mesh geometry={geo}><meshStandardMaterial {...STEEL} color={col ?? STEEL.color} side={THREE.DoubleSide} emissive={col ?? '#000'} emissiveIntensity={hot * .35} /></mesh>
    <mesh position={[0, .02, 0]}><cylinderGeometry args={[R0 - .03, R0 - .03, .03, 64]} /><meshStandardMaterial color="#6f757d" metalness={.7} roughness={.45} /></mesh>
    <mesh position={[0, .05, 0]}><cylinderGeometry args={[.15, .15, .14, 32]} /><meshStandardMaterial color="#5c6168" metalness={.7} roughness={.4} /></mesh>
    {/* yellow paint mark on the wheel face — shows both wheels turn together */}
    <mesh position={[R0 * .62, .04 * side * 0 + .04, 0]}><boxGeometry args={[.2, .012, .06]} /><meshBasicMaterial color={Y} toneMapped={false} /></mesh>
    {glow > .01 && <mesh position={[0, -.045, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[R0 + .03, .028, 12, 96]} /><meshBasicMaterial color={Y} transparent opacity={glow} toneMapped={false} /></mesh>}
  </group>;
};
type WS = { s?: number; yaw?: number; spin?: number; c?: number; hotR?: number; hotL?: number; glow?: number; z?: number; only?: 1 | -1; colR?: string; colL?: string };
const cr = (c: number, u: number) => R0 - c * u; // rolling radius at local tread position u (from flange root)
const wsPose = ({ s = 0, c = 0 }: WS) => { const rR = cr(c, TW / 2 - s), rL = cr(c, TW / 2 + s); return { y: RH + (rR + rL) / 2, roll: (rR - rL) / (2 * RX), rR, rL }; };
const Wheelset: React.FC<WS> = (p) => {
  const { s = 0, yaw = 0, spin = 0, c = 0, hotR = 0, hotL = 0, glow = 0, z = 0, only } = p; const { y, roll } = wsPose(p);
  return <group position={[s, y, z]} rotation={[0, yaw, roll]}>
    <group rotation={[spin, 0, 0]}>
      {only !== -1 && <OneWheel side={1} c={c} hot={hotR} glow={glow} col={p.colR} />}
      {only !== 1 && <OneWheel side={-1} c={c} hot={hotL} glow={glow} col={p.colL} />}
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.085, .085, 2 * G0 + .5, 32]} /><meshStandardMaterial color="#8d939b" metalness={.9} roughness={.25} /></mesh>
    </group>
  </group>;
};
const Rail: React.FC<{ x: number; len?: number }> = ({ x, len = 40 }) => <group position={[x, 0, 0]}>
  <mesh position={[0, RH - .025, 0]}><boxGeometry args={[.075, .05, len]} /><meshStandardMaterial color="#c9cdd2" metalness={.95} roughness={.18} /></mesh>
  <mesh position={[0, RH / 2 - .01, 0]}><boxGeometry args={[.025, RH - .05, len]} /><meshStandardMaterial color="#5a5048" metalness={.5} roughness={.6} /></mesh>
  <mesh position={[0, .0125 + .02, 0]}><boxGeometry args={[.16, .025, len]} /><meshStandardMaterial color="#5a5048" metalness={.5} roughness={.6} /></mesh>
</group>;
const Track: React.FC<{ len?: number }> = ({ len = 40 }) => <>
  <Rail x={RX} len={len} /><Rail x={-RX} len={len} />
  {Array.from({ length: Math.floor(len / .65) }, (_, i) => <mesh key={i} position={[0, .01, -len / 2 + i * .65]}><boxGeometry args={[2.5, .02, .24]} /><meshStandardMaterial color="#7a5c43" roughness={.9} /></mesh>)}
</>;

/* top view of a curve: inner (blue) and outer (red) rail drawn progressively */
const Arc: React.FC<{ r: number; a: number; col: string; w?: number }> = ({ r, a, col, w = .06 }) => a <= .001 ? null :
  <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2 - a * 1.2]} position={[0, .03, 0]}><torusGeometry args={[r, w, 8, 128, a * 2.4]} /><meshBasicMaterial color={col} toneMapped={false} /></mesh>;
const Curve: React.FC<{ t: number }> = ({ t }) => {
  const draw = ease(t, CUTS[1] - .1, T.tashqi + .5); const hi = ease(t, T.tashqi - .1, T.tashqi + .4);
  const RC = 3.2;
  return <group scale={.5} rotation={[0, Math.PI / 2, 0]}><group position={[0, 0, RC]}>
    {Array.from({ length: 22 }, (_, i) => { const ang = -1.2 + i * (2.4 / 21); return i / 21 <= draw ? <mesh key={i} position={[Math.sin(ang) * RC, .01, -Math.cos(ang) * RC]} rotation={[0, -ang, 0]}><boxGeometry args={[.16, .02, 2.1]} /><meshStandardMaterial color="#7a5c43" roughness={.9} /></mesh> : null; })}
    <group rotation={[0, 0, 0]}>
      <Arc r={RC - RX} a={draw} col={hi > .5 ? BLU : '#8a9099'} w={.05} />
      <Arc r={RC + RX} a={draw} col={hi > .5 ? RED : '#8a9099'} w={hi > .5 ? .075 : .05} />
    </group>
  </group></group>;
};

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[]; blur?: number };
const C_EX = .55; // exaggerated taper for the drawing

function shot(t: number): Shot {
  /* A hook: real bogie rolling in on the track */
  if (t < CUTS[0]) {
    const ang = lerp(.75, 1.1, ease(t, 0, CUTS[0]));
    return { cam: { pos: [Math.sin(ang) * 6.2, 2.2, Math.cos(ang) * 6.2], look: [0, .5, 0], fov: 32 },
      world: (m) => <><Track /><Bogie z={lerp(-2.2, 0, eout(P(t, -.2, 2.2)))} y={RH} />{!m && <Shadow a={.35} len={3.4} />}</>,
      marks: [{ p: [RX, RH + .05, .95], s: 'g‘ildirak', a: env(t, T.sir, CUTS[0] + .2, .3, .2), col: Y, up: 140 }] };
  }
  /* B one steel axle, both wheels spin together */
  if (t < CUTS[1]) {
    const spin = -(t - CUTS[0]) * 2.4;
    return { cam: mixCam({ pos: [2.6, 1.8, 3.9], look: [0, .55, 0], fov: 32 }, { pos: [1.4, 1.3, 4.5], look: [0, .55, 0], fov: 32 }, ease(t, CUTS[0], CUTS[1])),
      world: (m) => <><Track /><Wheelset spin={spin} />{!m && <Shadow a={.3} len={2.6} />}</>,
      marks: [{ p: [0, wsPose({}).y, 0], s: 'po‘lat o‘q', a: env(t, T.polat - .1, CUTS[1] + .2, .3, .2), col: Y, up: 170 },
        { p: [G0 + .05, wsPose({}).y + R0, 0], s: 'birga aylanadi', a: env(t, T.birga - .1, CUTS[1] + .2, .3, .2), col: GRN, up: 90, side: -60 }] };
  }
  /* C a curve from above: the outer rail is longer; no differential */
  if (t < CUTS[2]) {
    return { cam: { pos: [.3, 6.4, .9], look: [.3, 0, 0], fov: 34 }, world: (m) => <>{!m && <Curve t={t} />}</>,
      marks: [{ p: [RX * .5, .05, 0], s: 'ichki', a: env(t, T.tashqi + .2, T.mashina - .1, .3, .2), col: BLU, up: -80 },
        { p: [-RX * .5, .05, 0], s: 'tashqi — uzunroq', a: env(t, T.tashqi, T.mashina - .1, .3, .2), col: RED, up: 120 }],
      blur: env(t, T.mashina - .2, CUTS[2] + .1, .3, .2) };
  }
  /* D the twist: the wheel is not a cylinder — it is a cone (single wheel close-up, front view) */
  if (t < CUTS[3]) {
    const c = C_EX * ease(t, T.konus - .35, T.konus + .35);
    return { cam: mixCam({ pos: [1.25, .75, 3.0], look: [.85, .8, 0], fov: 30 }, { pos: [.98, .62, 2.8], look: [.85, .8, 0], fov: 30 }, ease(t, CUTS[2], CUTS[3])),
      world: (m) => <><Rail x={RX} /><Wheelset c={c} only={1} hotR={env(t, T.konus, CUTS[3], .2, .3)} colR={t > T.konus ? '#c7a24a' : undefined} />{!m && <Shadow x={RX} a={.25} len={1.6} />}</>,
      marks: [{ p: [G0 + TW, RH + R0 - c * TW + .02, 0], s: t < T.konus ? 'silindr?' : 'konus!', a: env(t, T.silindr - .1, T.nishab - .1, .3, .2), col: t < T.konus ? '#8a9099' : RED, up: 160, side: 40 },
        { p: [G0 + .01, RH + R0 + .03, 0], s: 'yo‘g‘on', a: env(t, T.konus + .3, CUTS[3] + .2, .3, .2), col: Y, up: 230, side: -80 }] };
  }
  /* E on a curve the axle slides outwards: outer wheel rolls on its big part, inner on its small part -> it steers itself */
  if (t < CUTS[4]) {
    const s = .045 * ease(t, T.tashqariga - .1, T.tashqariga + .6); const yaw = -.22 * ease(t, T.buriladi - .2, T.buriladi + .6);
    const spin = t > T.aylan ? -(t - T.aylan) * 2.2 : 0;
    const hiR = env(t, T.tashqiG, CUTS[4], .3, .3), hiL = env(t, T.ichki, CUTS[4], .3, .3);
    const front: Cam = { pos: [0, .95, 4.6], look: [0, .45, 0], fov: 32 }, top: Cam = { pos: [2.4, 3.3, 3.4], look: [0, .4, -.2], fov: 32 };
    const p = wsPose({ s, c: C_EX });
    return { cam: mixCam(front, top, ease(t, T.aylan - .3, T.aylan + .9)),
      world: (m) => <><Track /><Wheelset s={s} c={C_EX} yaw={yaw} spin={spin} hotR={hiR} hotL={hiL} colR={hiR > .05 ? '#e05545' : undefined} colL={hiL > .05 ? '#4a86e8' : undefined} />{!m && <Shadow a={.3} len={2.6} />}</>,
      marks: [{ p: [RX, RH, 0], s: 'katta radius', a: env(t, T.yogon - .1, T.aylan - .2, .3, .2), col: RED, up: 330, side: 40 },
        { p: [-RX, RH, 0], s: 'kichik radius', a: env(t, T.ingichka - .1, T.aylan - .2, .3, .2), col: BLU, up: 250, side: -40 },
        { p: [RX + s, p.y + p.rR, 0], s: 'ko‘proq yo‘l', a: env(t, T.koproq - .1, CUTS[4] + .2, .3, .2), col: RED, up: 120 }] };
  }
  /* F on a straight the cones bring it back to the centre; the flange is only a backup */
  if (t < CUTS[5]) {
    const k = P(t, T.togri - .2, T.zaxira); const s = .05 * Math.exp(-k * 3.2) * Math.cos(k * Math.PI * 5);
    const glow = env(t, T.gardish - .15, CUTS[5] + .3, .25, .2) * (.7 + .3 * Math.sin(t * 9));
    return { cam: mixCam({ pos: [0, .95, 4.6], look: [0, .45, 0], fov: 32 }, { pos: [1.2, 1.0, 3.4], look: [.5, .45, 0], fov: 32 }, ease(t, T.gardish - .6, T.gardish + .4)),
      world: (m) => <><Track /><Wheelset s={s} c={C_EX} spin={-(t - CUTS[4]) * 2.2} glow={glow} />{!m && <Shadow a={.3} len={2.6} />}</>,
      marks: [{ p: [0, RH + .02, 0], s: 'o‘rtaga', a: env(t, T.ortaga - .1, T.gardish - .2, .3, .2), col: GRN, up: 380 },
        { p: [G0 - .04, RH + .03, 0], s: 'gardish — zaxira', a: env(t, T.gardish - .1, CUTS[5] + .2, .3, .2), col: Y, up: 260, side: -60 }] };
  }
  /* G + H real bogie again: the flange works rarely, but is always ready */
  const ang = .5 + (t - CUTS[5]) * .12;
  return { cam: { pos: [Math.sin(ang) * 5.6, 1.9, Math.cos(ang) * 5.6], look: [0, .5, 0], fov: 32 },
    world: (m) => <><Track /><Bogie y={RH} z={-(t - CUTS[5]) * .05} />{!m && <Shadow a={.35} len={3.4} />}</>,
    marks: t < CUTS[6] ? [{ p: [RX - .05, RH + .04, .95], s: 'gardish', a: env(t, T.qaynona, CUTS[6] + .2, .3, .2), col: Y, up: 140 }] : [] };
}

/* card: car vs train */
const Diff: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, T.mashina - .15, CUTS[2] + .05, .35, .25); if (a <= 0) return null;
  const row = (l: string, ok: boolean, t0: number) => { const b = eout(P(t, t0 - .1, t0 + .3)); return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 34px', borderRadius: 26, background: '#fff', marginTop: 22, opacity: b, translate: `0 ${(1 - b) * 40}px`, boxShadow: '0 16px 40px rgba(0,0,0,.12)' }}>
    <div><div style={{ fontFamily: MONO, fontSize: 24, color: '#7a7f88', letterSpacing: 2 }}>{l.toUpperCase()}</div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 52, color: INK }}>differensial</div></div>
    <div style={{ width: 96, height: 96, borderRadius: 48, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 60, color: '#fff', background: ok ? GRN : RED }}>{ok ? '✓' : '✕'}</div></div>; };
  return <div style={{ position: 'absolute', left: 90, width: W - 180, top: 600, opacity: a }}>{row('mashina', true, T.mashina)}{row('poyezd', false, T.poyezdda)}</div>;
};

/* 2D cut of the tread: bigger near the flange, smaller outside (schematic) */
const Cut: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, T.konus + .2, CUTS[3] + .05, .35, .25); if (a <= 0) return null; const d = eout(P(t, T.konus + .2, T.konus + 1.0));
  const yR = 120 + 70 * d;
  return <div style={{ position: 'absolute', left: 590, top: 780, width: 330, opacity: a, translate: `0 ${(1 - a) * 40}px`, background: '#fff', borderRadius: 26, padding: '18px 18px 10px', boxShadow: '0 16px 40px rgba(0,0,0,.12)' }}>
    <div style={{ fontFamily: MONO, fontSize: 20, color: '#7a7f88', letterSpacing: 2, textAlign: 'center' }}>KESIM · SXEMA</div>
    <svg width={294} height={300} viewBox="0 0 294 300">
      <polygon points={`20,300 20,40 52,40 70,110 70,120 274,${yR} 274,300`} fill="#c7a24a" />
      <line x1={70} y1={120} x2={274} y2={yR} stroke={RED} strokeWidth={8} strokeLinecap="round" />
      <line x1={0} y1={120} x2={294} y2={120} stroke="#7a7f88" strokeWidth={2} strokeDasharray="8 8" />
      <text x={78} y={104} fontFamily="Inter" fontWeight={800} fontSize={24} fill={INK}>yo‘g‘on</text>
      <text x={274} y={yR + 34} textAnchor="end" fontFamily="Inter" fontWeight={800} fontSize={24} fill={INK}>ingichka</text>
      <text x={24} y={30} fontFamily="Inter" fontWeight={700} fontSize={20} fill="#7a7f88">gardish</text>
    </svg>
  </div>;
};
const Caps: React.FC<{ t: number }> = ({ t }) => {
  let cur: typeof CAPS[number] | null = null; for (const l of CAPS) if (t >= l[0].s - .05 && l.some((o) => o.w !== '—')) cur = l;
  if (!cur || t > cur[cur.length - 1].e + .45 || t > END - 2.4) return null;
  const ws = cur.filter((o) => o.w !== '—'); const a = eout(P(t, cur[0].s - .05, cur[0].s + .08)), txt = ws.map((o) => o.w).join(' ');
  const fs = Math.min(88, Math.floor(1700 / Math.max(8, txt.length)));
  return <div style={{ position: 'absolute', left: 40, width: W - 80, top: 1300, display: 'flex', justifyContent: 'center', gap: 18, opacity: a, scale: String(lerp(.86, 1, eback(P(t, cur[0].s - .05, cur[0].s + .18)))), fontFamily: SANS, fontWeight: 800, fontSize: fs, whiteSpace: 'nowrap', textShadow: '0 0 22px #f6f1ea, 0 0 10px #f6f1ea, 0 0 4px #f6f1ea' }}>
    {ws.map((o, i) => <span key={i} style={o.k ? { color: INK, background: Y, padding: '0 14px', borderRadius: 14 } : { color: INK }}>{o.w}</span>)}
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
  const s = t > CUTS[0] && t < CUTS[2] ? 'Manba: Practical Engineering, RailwayNews' : t > CUTS[2] && t < CUTS[5] ? 'Sxema: nishab kattalashtirilgan · Manba: Practical Engineering, RailwayNews' : t < CUTS[0] || (t > CUTS[5] && t < CUTS[6]) ? '3D: Víctor Hernández (Sketchfab, CC BY)' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t);
  const cut = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const blur = Math.max(cut * 18, (sh.blur ?? 0) * 10);
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    {!cover && <AbsoluteFill style={{ background: BG.light }} />}
    <AbsoluteFill style={{ filter: blur > .3 ? `blur(${blur.toFixed(1)}px)` : undefined }}>
      <ThreeCanvas width={W} height={H} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <Rig cam={sh.cam} />
        <Studio theme="light">{(m) => sh.world(m)}</Studio>
      </ThreeCanvas>
      {!cover && sh.marks.map((k, i) => <Callout key={i} at={project(sh.cam, k.p)} s={k.s} a={k.a} col={k.col} up={k.up} side={k.side} ink="rgba(28,30,35,.55)" />)}
    </AbsoluteFill>
    {!cover && <>
      <Diff t={t} /><Cut t={t} />
      <BigNum subCol={INK} v="1/20" sub="nishab — ko‘zga deyarli ko‘rinmaydi" y={620} a={env(t, T.n20 - .1, CUTS[3] - .05, .25, .2)} col={INK} size={150} />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > CUTS[6] - .3 && <ShareEnd t={t} t0={T.dost - 1.0} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['poyezd ishqiboz'], ['do‘stingizga', 'y'], ['yuboring']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <div style={{ position: 'absolute', inset: 0, translate: '0 200px' }}><Frame t={20.6} cover /></div>
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 340, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 96, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Poyezd nega<br />relsdan<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>tushmaydi?</span>
  </div>
</AbsoluteFill>;
