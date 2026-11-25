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

const INK = '#1c1e23', F = 'cybertruck.glb';
const DEBUG = false;
const CC = { clearcoat: .3, clearcoatRoughness: .25 };
const STEEL = '#c4c8ce';
const PAINT: PaintMap = DEBUG ? [
  [/^car_paint/i, '#ff0000', .3, .5], [/^body/i, '#00cc00', .3, .5], [/^trunk/i, '#0000ff', .3, .5], [/^interior/i, '#ff00ff', .3, .5],
  [/^wheel/i, '#ffff00', .3, .5], [/^light_mat/i, '#00ffff', .3, .5], [/^glass_light/i, '#ff8800', .3, .5], [/^glass_windows/i, '#8800ff', .3, .5], [/./, '#888', .3, .5],
] : [
  [/^car_paint/i, STEEL, 1, .3, CC], [/^body/i, '#9ea3aa', 1, .38, CC], [/^trunk/i, '#b4b8bf', 1, .34, CC],
  [/^wheel/i, '#17181b', .2, .6], [/^glass_windows/i, '#0a0c10', .2, .04, { transparent: true, opacity: .7, clearcoat: 1 }],
  [/^glass_light/i, '#e9f4ff', 0, .1, { emissive: '#bfe3ff', emissiveIntensity: 1.2 }], [/^light/i, '#b83a3a', 0, .4, { emissive: '#ff2020', emissiveIntensity: .35 }],
  [/^interior/i, '#1d1e21', 0, .7], [/./, '#303338', .4, .5],
];
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const CUTS = [5.6, 9.2, 12.6, 19.4, 24.2, 29.5, 32.6, 39.3, 40.4];
const rot = (t: number, a0: number, sp: number) => a0 + t * sp;

const M = (c: string, m = 1, r = .3, extra: Record<string, unknown> = {}) => <meshPhysicalMaterial color={c} metalness={m} roughness={r} {...extra} />;
const Box: React.FC<{ p: V3; s: V3; c: string; m?: number; r?: number; e?: string; ei?: number; rz?: number; ry?: number }> = ({ p, s, c, m = 1, r = .3, e, ei = 1, rz = 0, ry = 0 }) =>
  <mesh position={p} rotation={[0, ry, rz]}><boxGeometry args={s} />{M(c, m, r, e ? { emissive: e, emissiveIntensity: ei, toneMapped: false } : {})}</mesh>;

/* press: sheet drapes over a half-cylinder die; ram comes from above. hard=false: ordinary soft steel (works); hard=true: 30X (press jams, cracks) */
const Press: React.FC<{ prog: number; hard: boolean; jam: number; t: number }> = ({ prog, hard, jam, t }) => {
  const R = 1.25, Hh = .55;
  const top = (x: number) => Hh * Math.sqrt(Math.max(0, 1 - (x / R) * (x / R)));
  const geo = useMemo(() => { const g = new THREE.PlaneGeometry(2.7, 1.5, 54, 2); g.rotateX(-Math.PI / 2); const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i); const dome = Math.abs(x) < R ? top(x) : 0; p.setY(i, lerp(Hh + .35, dome + .035, prog)); }
    g.computeVertexNormals(); return g; }, [prog]);
  const ramY = lerp(Hh + .95, Hh + .55, prog) + (jam > 0 ? Math.sin(t * 90) * .018 * jam : 0);
  const shk = jam > 0 ? Math.sin(t * 83) * .02 * jam : 0;
  return <group position={[shk, 0, 0]}>
    <Box p={[0, -.2, 0]} s={[3.4, .4, 1.9]} c="#6f747c" m={.8} r={.5} />
    <mesh position={[0, 0, 0]} scale={[R, Hh, 1]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1, 1, 1.7, 48, 1, false, 0, Math.PI]} />{M(hard && jam > 0 ? '#8a3a36' : '#8b9099', .8, .45)}</mesh>
    <mesh geometry={geo}>{M(hard ? '#dfe3e8' : '#9fb6d8', 1, hard ? .18 : .3, { side: THREE.DoubleSide })}</mesh>
    <Box p={[0, ramY + .3, 0]} s={[1.2, .6, 1.3]} c="#555a62" m={.9} r={.4} />
    <Box p={[0, ramY + .85, 0]} s={[.5, .5, .5]} c="#3b3f46" m={.9} r={.4} />
    {jam > 0 && [-.6, .1, .7].map((x, i) => <Box key={i} p={[x, .5 - i * .08, .86]} s={[.5, .035, .03]} c="#ff2d2d" e="#ff1a1a" ei={2} rz={(i - 1) * .7} />)}
  </group>;
};
/* laser cuts a plate, then the plate is folded along a crease */
const Laser: React.FC<{ cut: number; fold: number }> = ({ cut, fold }) => {
  const x0 = -1.3, per = [[-1.3, -.8], [1.3, -.8], [1.3, .8], [-1.3, .8]] as [number, number][];
  const segs: [number, number, number, number][] = []; for (let i = 0; i < 3; i++) segs.push([...per[i], ...per[i + 1]] as any);
  const tot = segs.length; const k = cut * tot; const dot = (() => { const i = Math.min(tot - 1, Math.floor(k)), f = k - i; const s = segs[i]; return [lerp(s[0], s[2], f), lerp(s[1], s[3], f)]; })();
  return <group>
    <Box p={[0, -.05, 0]} s={[3.2, .1, 2]} c="#7a7f87" m={.6} r={.6} />
    <Box p={[-.65, .04, 0]} s={[1.3, .05, 1.6]} c="#d7dbe0" r={.2} />
    <group position={[0, .04, 0]} rotation={[0, 0, fold * 1.25]}><Box p={[.65, 0, 0]} s={[1.3, .05, 1.6]} c="#d7dbe0" r={.2} /></group>
    {segs.map((s, i) => { const f = Math.max(0, Math.min(1, k - i)); if (f <= 0) return null; const len = Math.hypot(s[2] - s[0], s[3] - s[1]) * f; const mx = s[0] + (s[2] - s[0]) * f / 2, mz = s[1] + (s[3] - s[1]) * f / 2; const horiz = Math.abs(s[2] - s[0]) > Math.abs(s[3] - s[1]);
      return <Box key={i} p={[mx, .075, mz]} s={horiz ? [len, .02, .045] : [.045, .02, len]} c="#ff3b2f" e="#ff2a1a" ei={2.2} />; })}
    {cut > .01 && cut < .99 && <><Box p={[dot[0], .9, dot[1]]} s={[.03, 1.7, .03]} c="#ff3b2f" e="#ff2a1a" ei={2.5} /><mesh position={[dot[0], .08, dot[1]]}><sphereGeometry args={[.09, 12, 12]} /><meshBasicMaterial color="#fff3b0" toneMapped={false} /></mesh></>}
    <Box p={[0, .045, .82]} s={[.02, .012, .06]} c="#444" m={0} />
  </group>;
};
const Rocket: React.FC<{ ry: number }> = ({ ry }) => <group rotation={[0, ry, 0]} position={[0, 0, 0]}>
  <mesh position={[0, 1.55, 0]}><cylinderGeometry args={[.42, .42, 3.1, 48]} />{M('#d9dde2', 1, .22)}</mesh>
  <mesh position={[0, 3.55, 0]}><coneGeometry args={[.42, 1.0, 48]} />{M('#d9dde2', 1, .22)}</mesh>
  {[0, 1, 2].map((i) => <mesh key={i} position={[Math.cos(i * 2.094) * .5, .35, Math.sin(i * 2.094) * .5]} rotation={[0, -i * 2.094, 0]}><boxGeometry args={[.45, .8, .04]} />{M('#9aa0a8', 1, .3)}</mesh>)}
  <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[.425, .425, .04, 48]} />{M('#8a8f97', 1, .3)}</mesh>
</group>;

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[]; blur?: number };

function shot(t: number): Shot {
  const hero = (o: Partial<React.ComponentProps<typeof GlbCar>> = {}) => (m: boolean) => <><GlbCar file={F} L={3.9} paint={PAINT} {...o} />{!m && <Shadow a={.45} />}</>;
  /* A hook 0–5.6 */
  if (t < CUTS[0]) {
    const ang = lerp(.5, 1.2, ease(t, 0, CUTS[0]));
    return { cam: { pos: [Math.sin(ang) * 8.4, 1.7, Math.cos(ang) * 8.4], look: [0, .8, 0], fov: 32 }, world: hero({ ry: 0 }),
      marks: [] };
  }
  /* B 30X steel 5.6–9.2 */
  if (t < CUTS[1]) {
    const ang = 1.2 + (t - CUTS[0]) * .35;
    return { cam: { pos: [Math.sin(ang) * 7.4, 1.4, Math.cos(ang) * 7.4], look: [0, .8, 0], fov: 32 }, world: hero(),
      marks: [{ p: [0, 1.3, 1.0], s: 'zanglamas po‘lat', a: env(t, 6.3, 7.3, .3, .2), col: '#2F8CFF', up: 160 }] };
  }
  /* C Starship 9.2–12.6 */
  if (t < CUTS[2]) {
    return { cam: mixCam({ pos: [0, 2.4, 10], look: [0, 1.9, 0], fov: 32 }, { pos: [2.5, 1.8, 8.6], look: [0, 2.1, 0], fov: 32 }, ease(t, CUTS[1], CUTS[2])),
      world: (m) => <><group scale={[1, 1, 1]}><Rocket ry={rot(t, 0, .6)} /></group>{!m && <Shadow len={2.4} a={.4} />}</>,
      marks: [{ p: [.5, 3.4, 0], s: 'starship · 30X', a: env(t, 9.6, CUTS[2] + .1, .3, .2), col: Y, up: 130 }] };
  }
  /* D press 12.6–19.4: soft steel works, 30X jams */
  if (t < CUTS[3]) {
    const soft = t < T.bu - .3; const prog = soft ? ease(t, 13.4, 15.2) : ease(t, T.bu + 1.0, T.bu + 1.9) * .08;
    const jam = !soft ? Math.max(0, Math.min(1, P(t, T.bu + 1.7, T.press + .2))) * (1 - ease(t, T.ketadi + .6, T.ketadi + .9)) : 0;
    return { cam: { pos: [3.6, 2.0, 7.6], look: [0, .95, 0], fov: 32 }, world: (m) => <><Press prog={prog} hard={!soft} jam={jam} t={t} />{!m && <Shadow len={4.5} a={.3} />}</>,
      marks: [soft ? { p: [1.0, .15, .9], s: 'oddiy po‘lat · shakl oladi', a: env(t, 13.3, T.bu - .2, .3, .2), col: '#2F8CFF', up: 60, side: 40 } : { p: [.6, .5, .86], s: 'press yorildi', a: env(t, T.press, CUTS[3] + .1, .3, .2), col: RED, up: 100, side: 80 }] };
  }
  /* E 1.8 mm 19.4–24.2: car + door callout */
  if (t < CUTS[4]) {
    return { cam: mixCam({ pos: [4.8, 1.6, 6.0], look: [.5, .8, 0], fov: 32 }, { pos: [5.5, 1.5, 5.0], look: [.5, .85, 0], fov: 32 }, ease(t, CUTS[3], CUTS[4])), world: hero({ ry: 0 }),
      marks: [{ p: [-.2, .9, 1.0], s: 'eshik', a: env(t, T.eshigi - .2, CUTS[4] + .1, .3, .2), col: Y, up: 70, side: 120 }], blur: env(t, T.mm - .3, CUTS[4] - .2, .4, .4) * .35 };
  }
  /* F laser + bend 24.2–29.5 */
  if (t < CUTS[5]) {
    const cut = ease(t, T.lazer - .3, T.kesadi + .3); const fold = ease(t, T.buklaydi - .1, T.buklaydi + .9);
    return { cam: mixCam({ pos: [2.2, 3.4, 6.6], look: [0, 0, 0], fov: 32 }, { pos: [3.0, 2.2, 5.8], look: [0, .2, 0], fov: 32 }, ease(t, CUTS[4], CUTS[5])),
      world: (m) => <><Laser cut={cut} fold={fold} />{!m && <Shadow len={4} a={.3} />}</>,
      marks: [{ p: [1.3, .1, -.8], s: 'lazer', a: env(t, T.lazer - .1, T.kesadi + .6, .3, .2), col: RED, up: 150 }, { p: [0, .3, 0.2], s: 'bukish', a: env(t, T.buklaydi, CUTS[5] + .1, .3, .2), col: Y, up: 190 }] };
  }
  /* G flat panels 29.5–32.6 */
  if (t < CUTS[6]) {
    return { cam: mixCam({ pos: [-3.5, 1.4, 8.6], look: [.3, .8, 0], fov: 32 }, { pos: [3.5, 1.4, 8.6], look: [.3, .8, 0], fov: 32 }, ease(t, CUTS[5], CUTS[6])), world: hero(),
      marks: [{ p: [0, 1.25, 1.0], s: 'tekis panellar', a: env(t, T.egri - .3, CUTS[6] + .1, .3, .2), col: GRN, up: 170 }] };
  }
  /* H Munro 32.6–39.3 */
  if (t < CUTS[7]) {
    const ang = .9 + (t - CUTS[6]) * .22;
    return { cam: { pos: [Math.sin(ang) * 8.4, 2.0, Math.cos(ang) * 8.4], look: [0, .8, 0], fov: 32 }, world: hero(), marks: [], blur: .3 };
  }
  const ang = 1.5 + (t - CUTS[7]) * .3;
  return { cam: { pos: [Math.sin(ang) * 9, 2.0, Math.cos(ang) * 9], look: [0, .8, 0], fov: 32 }, world: hero(), marks: [] };
}

/* 2D: thin 1.8 mm slab */
const Slab: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, T.eshigi + .3, CUTS[4] - .1, .35, .3); if (a <= 0) return null;
  return <div style={{ position: 'absolute', left: 120, width: W - 240, top: 790, opacity: a, translate: `0 ${(1 - a) * 40}px` }}>
    <div style={{ height: 16, borderRadius: 3, background: 'linear-gradient(180deg,#f3f5f8,#8c929b)', boxShadow: '0 6px 18px rgba(0,0,0,.25)' }} />
  </div>;
};
const Hook: React.FC<{ t: number }> = ({ t }) => { const a = env(t, 0, CUTS[0] - .05, .01, .3); if (a <= 0) return null;
  return <div style={{ position: 'absolute', left: 60, width: W - 120, top: 470, textAlign: 'center', opacity: a, fontFamily: HEAD, fontWeight: 700, fontSize: 104, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Cybertruck<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>nega burchakli?</span></div>; };
const Payoff: React.FC<{ t: number }> = ({ t }) => { const a = env(t, T.dizayn - .1, CUTS[8] + .05, .2, .15); if (a <= 0) return null;
  const s = .8 + .2 * eback(P(t, T.dizayn - .1, T.dizayn + .25));
  return <div style={{ position: 'absolute', left: 0, width: W, top: 470, textAlign: 'center', opacity: a, scale: String(s), fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.1, color: INK, textTransform: 'uppercase' }}>
    <div>dizayn emas</div><div><span style={{ background: Y, padding: '0 24px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>fizika</span></div></div>; };
const Caps: React.FC<{ t: number }> = ({ t }) => {
  let cur: typeof CAPS[number] | null = null; for (const l of CAPS) if (t >= l[0].s - .05) cur = l;
  if (!cur || t > cur[cur.length - 1].e + .45 || t > END - 2.2 || (t > T.dizayn - .2 && t < CUTS[8])) return null;
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
  const s = t > CUTS[0] && t < CUTS[2] ? 'Manba: Electrek, Equipment World (2019)' : t > CUTS[2] && t < CUTS[3] ? 'Sxematik chizma · Manba: Electrek (Mask, 2019)' : t > CUTS[3] && t < CUTS[4] ? 'Manba: The Autopian, 2023' : t > CUTS[4] && t < CUTS[5] ? 'Sxematik chizma · Manba: The Autopian' : t > CUTS[6] && t < CUTS[7] ? 'Manba: World Auto Steel (S. Munro hisobi, taxminiy)' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t);
  const cut = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const blur = Math.max(cut * 18, (sh.blur ?? 0) * 10);
  const flash = env(t, T.press - .05, T.press + .5, .06, .4) * .35;
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <AbsoluteFill style={{ background: BG.light }} />
    <AbsoluteFill style={{ filter: blur > .3 ? `blur(${blur.toFixed(1)}px)` : undefined }}>
      <ThreeCanvas width={W} height={H} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <Rig cam={sh.cam} />
        <Studio theme="light">{(m) => sh.world(m)}</Studio>
      </ThreeCanvas>
      {!cover && sh.marks.map((k, i) => <Callout key={i} at={project(sh.cam, k.p)} s={k.s} a={k.a} col={k.col} up={k.up} side={k.side} ink="rgba(28,30,35,.55)" />)}
    </AbsoluteFill>
    {flash > 0 && <AbsoluteFill style={{ opacity: flash, background: 'radial-gradient(circle at 50% 55%, rgba(255,50,40,.9) 0%, rgba(255,50,40,0) 60%)' }} />}
    {!cover && <>
      <BigNum subCol={INK} v="30X" sub="ultra-qattiq zanglamas po‘lat" y={640} a={env(t, T.ottiz - .1, CUTS[1] - .05, .25, .2)} col={INK} size={190} />
      <BigNum subCol={INK} v="1,8 mm" sub="eshik qalinligi" y={600} a={env(t, T.eshigi + .2, CUTS[4] - .05, .25, .2)} col={INK} size={170} />
      <Slab t={t} />
      <BigNum subCol={INK} v={`${Math.round(60 * eout(P(t, T.oltmish - .1, T.oltmish + .8)))} mln $`} sub="tejash · taxminiy hisob" y={620} a={env(t, T.oltmish - .1, CUTS[7] - .05, .25, .2)} col={INK} size={150} />
      <BigNum subCol={INK} v="50 000" sub="mashina / yil" y={620} a={env(t, T.ellik - .1, T.oltmish - .3, .25, .2)} col="#2F8CFF" size={130} />
      <Brand t={t} /><Src t={t} /><Caps t={t} /><Hook t={t} /><Payoff t={t} />
      {t > CUTS[8] - .3 && <ShareEnd t={t} t0={CUTS[8]} pick={T.dost + .3} sentAt={T.yub + .5} lines={[['buni'], ['do‘stingizga', 'y'], ['yuboring']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <Frame t={1.6} cover />
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 330, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 100, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Cybertruck<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>nega burchakli?</span>
  </div>
</AbsoluteFill>;
