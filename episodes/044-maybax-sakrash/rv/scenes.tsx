import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { W, H, FPS, Y, RED, GRN, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { ShareEnd } from '../kit';
import { Logo } from '../Art';
import { Studio, Rig, GlbCar, Shadow, Cam, V3, mixCam, project, TopPill, Callout, BigNum, BG, PaintMap } from '../s3d';
import { CAPS } from './caps';
import { END, CH, T } from './ep';

const INK = '#1c1e23', F = 'maybach_gls.glb';
/* the Sketchfab glb has no colours: paint by material name (two-tone Maybach: black upper, silver lower) */
const CC = { clearcoat: 1, clearcoatRoughness: .05 };
const PAINT: PaintMap = [
  [/^secondary/i, '#0e0f11', .6, .22, CC], [/^primary/i, '#b9bcc2', .9, .26, CC],
  [/^wheel\.0/i, '#d6d9dd', 1, .16], [/^wheel\.1/i, '#9e1b1b', .3, .4], [/^wheel\.2/i, '#151515', 0, .88], [/^wheel\.3/i, '#c3c6ca', 1, .2], [/^wheel\.4/i, '#e4e6e9', 1, .08, { _body: true }],
  [/^Body\.(4|5)/i, '#d2d5d9', 1, .1], [/^Body\.7/i, '#0b0b0c', 0, .9], [/^Body\.8/i, '#cbcdd0', 1, .2], [/^Body/i, '#0c0d0e', .2, .35],
  [/^glass/i, '#0a0c10', .2, .04, { transparent: true, opacity: .62, clearcoat: 1 }],
  [/taillight|RearLights/i, '#ff2a2a', 0, .3, { emissive: '#ff1a1a', emissiveIntensity: 1.6 }], [/light|led/i, '#ffffff', 0, .1, { emissive: '#ffffff', emissiveIntensity: 1.4 }],
  [/^Resh/i, '#dadde1', 1, .1], [/^Seats|^RearDoor|^Interior\.1[0-9]/i, '#7a4a2e', 0, .6], [/^Interior|^interior/i, '#1c1d20', 0, .6], [/./, '#1e1f22', .3, .5],
];
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const CUTS = [5.2, 8.35, 13.38, 21.65, 30.8, 33.75, 37.75];
/* body bounce on the active suspension: up/down at f Hz inside [a,b] */
const bounce = (t: number, a: number, b: number, amp = .16, f = 1.6) => t < a || t > b ? 0 : amp * Math.sin((t - a) * Math.PI * 2 * f) * Math.min(1, (t - a) / .25, (b - t) / .25);

/* sand bed with dunes around the stuck car (deterministic noise) */
const Sand: React.FC<{ a: number }> = ({ a }) => {
  const geo = useMemo(() => { const g = new THREE.PlaneGeometry(9, 6.5, 110, 80); g.rotateX(-Math.PI / 2); const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); const r = Math.hypot(x / 4.4, z / 3.1);
      p.setY(i, Math.max(0, (1 - r * r)) * .4 + (Math.sin(x * 2.3 + z * 1.1) * .06 + Math.sin(x * 5.3 - z * 4.1) * .03 + Math.sin(x * 11 + z * 7) * .012) * Math.min(1, r * 1.5) - .02); }
    g.computeVertexNormals(); return g; }, []);
  return <mesh geometry={geo} renderOrder={3}><meshStandardMaterial color="#9c6a2e" roughness={1} envMapIntensity={.25} flatShading transparent={a < 1} opacity={a} /></mesh>;
};
const Ring: React.FC<{ a: number; t: number }> = ({ a, t }) => <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, .01, 0]}>
  <ringGeometry args={[3.1, 3.3 + .08 * Math.sin(t * 8), 96]} /><meshBasicMaterial color="#ff2d2d" transparent opacity={a * (.65 + .3 * Math.sin(t * 8))} toneMapped={false} /></mesh>;

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[]; blur?: number };

function shot(t: number): Shot {
  const hero = (o: Partial<React.ComponentProps<typeof GlbCar>> = {}) => (m: boolean) => <><GlbCar file={F} paint={PAINT} {...o} />{!m && <Shadow x={o.x ?? 0} a={.45} />}</>;
  /* A hook: it bounces already (0–5.2): "Bugun Maybaxda sakrashni o‘rganamiz! Bu Mercedes-Maybach GLS — 550 ot kuchi" */
  if (t < CUTS[0]) {
    const lift = bounce(t, 0, 2.1, .14, 1.8);
    const ang = lerp(.65, 1.05, ease(t, 0, CUTS[0]));
    return { cam: { pos: [Math.sin(ang) * 8.6, 2.0 - .3 * ease(t, 2.2, 5), Math.cos(ang) * 8.6], look: [0, .75, 0], fov: 32 },
      world: hero({ lift, pitch: lift * .08 }), marks: [{ p: [0, 2.0 + lift, 0], s: 'maybach gls', a: env(t, 2.3, CUTS[0] + .2, .3, .2), col: Y }] };
  }
  /* B the hidden skill: one big jump on "sakray" (5.2–8.35) */
  if (t < CUTS[1]) {
    const j = t > T.sakray - .1 ? .24 * Math.sin(P(t, T.sakray - .1, T.sakray + .55) * Math.PI) : 0;
    return { cam: mixCam({ pos: [-1.0, 1.1, 9.6], look: [0, .9, 0], fov: 32 }, { pos: [-3.4, 1.3, 8.4], look: [0, .9, 0], fov: 32 }, ease(t, CUTS[0], CUTS[1])),
      world: hero({ lift: j + bounce(t, T.sakray + .55, CUTS[1], .05, 2.4), pitch: j * .1 }), marks: [] };
  }
  /* C x-ray, the 48 V active suspension, each wheel on its own (8.35–13.38) */
  if (t < CUTS[2]) {
    const xr = ease(t, T.osma - .25, T.osma + .5); const k = Math.floor(P(t, T.gildirak, T.tushiradi + .6) * 4.999); const on = t > T.gildirak && t < T.tushiradi + .7;
    const ph = (t - T.gildirak) * Math.PI * 2 * 1.6;
    const pitch = on ? (k < 2 ? 1 : -1) * .05 * Math.max(0, Math.sin(ph)) : 0, roll = on ? (k % 2 ? 1 : -1) * .05 * Math.max(0, Math.sin(ph)) : 0;
    return { cam: mixCam({ pos: [2.6, 2.6, 8.2], look: [0, .7, 0], fov: 32 }, { pos: [4.6, 2.2, 6.6], look: [.2, .6, 0], fov: 32 }, ease(t, CUTS[1], CUTS[2])),
      world: hero({ xray: xr, springs: xr, pitch, roll, hotWheel: on ? k % 4 : -1 }),
      marks: [{ p: [1.5, .9, .8], s: 'aktiv osma', a: env(t, T.osma, CUTS[2] + .2, .3, .2), col: '#2F8CFF', up: 150 }, { p: [-1.5, .9, .8], s: '48 volt', a: env(t, T.v48, CUTS[2] + .2, .3, .2), col: Y, up: 110, side: -40 }] };
  }
  /* D stuck in sand -> rocking -> grip -> out (13.38–21.65) */
  if (t < CUTS[3]) {
    const sink = -.3 * (1 - ease(t, T.chiqib - .1, T.ketadi + .4)); const rock = bounce(t, T.kuzov, T.chiqib, .17, 1.7);
    const out = ease(t, T.chiqib - .1, CUTS[3]) * 3.2;
    const cm = mixCam({ pos: [3.4, 3.6, 8.4], look: [0, .4, 0], fov: 32 }, { pos: [4.4, 3.0, 8.2], look: [.6, .5, 0], fov: 32 }, ease(t, CUTS[2], T.chiqib)); cm.pos = [cm.pos[0] + out * .9, cm.pos[1], cm.pos[2]]; cm.look = [cm.look[0] + out * .9, cm.look[1], cm.look[2]];
    return { cam: cm,
      world: (m) => <><group position={[out, sink + out * .06, 0]}><GlbCar file={F} paint={PAINT} lift={rock} pitch={rock * .12} /></group>{!m && <Sand a={1} />}</>,
      marks: [{ p: [0, 1.9, 0], s: 'qum · qor', a: env(t, T.qumda, T.kuzov - .1, .3, .2), col: '#d6b27a', up: 90 }, { p: [1.4 + out, .3, .9], s: 'ilashdi', a: env(t, T.gildiraklar, CUTS[3] + .2, .3, .2), col: GRN, up: 120 }] };
  }
  /* E how to switch it on: UI over a blurred car (21.65–30.8) */
  if (t < CUTS[4]) {
    const ang = .9 + (t - CUTS[3]) * .05;
    return { cam: { pos: [Math.sin(ang) * 9, 2.2, Math.cos(ang) * 9], look: [0, .75, 0], fov: 32 }, world: hero({ lift: bounce(t, T.start + .2, T.soatiga + .5, .12, 1.8) }), marks: [], blur: env(t, CUTS[3] + .1, T.soatiga - .2, .4, .4) };
  }
  /* F safety ring (30.8–33.75) */
  if (t < CUTS[5]) {
    return { cam: { pos: [0.5, 5.4, 9.2], look: [0, .4, 0], fov: 34 }, world: (m) => <><GlbCar file={F} paint={PAINT} lift={bounce(t, CUTS[4], CUTS[5] + .3, .14, 1.8)} />{!m && <><Shadow a={.4} /><Ring a={ease(t, T.ehtiyot - .1, T.ehtiyot + .4)} t={t} /></>}</>,
      marks: [{ p: [0, .05, 3.2], s: 'yaqin turmang', a: env(t, T.yoniga - .3, CUTS[5] + .2, .3, .2), col: RED, up: 120 }] };
  }
  /* G Monaco traffic, police (33.75–37.75) */
  if (t < CUTS[6]) {
    return { cam: mixCam({ pos: [3.2, 2.4, 10.5], look: [0, .7, 0], fov: 34 }, { pos: [4.6, 2.0, 9.0], look: [0, .7, 0], fov: 34 }, ease(t, CUTS[5], CUTS[6])),
      world: (m) => <><GlbCar file={F} paint={PAINT} lift={bounce(t, CUTS[5], CUTS[6] + .3, .15, 1.9)} pitch={bounce(t, CUTS[5], CUTS[6], .01, 1.9)} />
        {!m && <Shadow a={.4} />}</>,
      marks: [{ p: [0, 2.1, 0], s: 'monako · 2023', a: env(t, T.monako, CUTS[6] + .2, .3, .2), col: Y }] };
  }
  /* H share */
  const ang = .8 + (t - CUTS[6]) * .3;
  return { cam: { pos: [Math.sin(ang) * 10, 2.4, Math.cos(ang) * 10], look: [0, .7, 0], fov: 32 }, world: hero({ lift: bounce(t, CUTS[6], END, .1, 1.8) }), marks: [] };
}

/* infotainment mock (generic UI, not the real Mercedes screen) */
const Screen: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, CUTS[3] + .15, T.soatiga - .15, .35, .3); if (a <= 0) return null;
  const off = t > T.offroad, fda = t > T.free, start = t > T.start; const tap = (t0: number) => Math.exp(-Math.pow((t - t0) / .12, 2));
  const tile = (s: string, on: boolean, t0: number) => <div style={{ flex: 1, height: 120, borderRadius: 22, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 30,
    background: on ? '#2F8CFF' : 'rgba(255,255,255,.07)', color: '#fff', boxShadow: on ? '0 0 30px rgba(47,140,255,.6)' : 'none', scale: String(1 - .06 * tap(t0)) }}>{s}</div>;
  return <div style={{ position: 'absolute', left: 80, top: 560, width: 920, opacity: a, translate: `0 ${(1 - a) * 60}px`, borderRadius: 40, background: 'linear-gradient(180deg,#14161b,#0b0c10)', padding: 34, boxShadow: '0 30px 80px rgba(0,0,0,.35)', border: '2px solid #2a2d35' }}>
    <div style={{ fontFamily: MONO, fontSize: 22, color: '#8b93a3', letterSpacing: 2 }}>HAYDASH REJIMI</div>
    <div style={{ display: 'flex', gap: 16, marginTop: 18 }}>{tile('Comfort', false, 0)}{tile('Sport', false, 0)}{tile('Off-Road', off, T.offroad)}</div>
    <div style={{ marginTop: 30, opacity: off ? 1 : .25, fontFamily: MONO, fontSize: 22, color: '#8b93a3', letterSpacing: 2 }}>YORDAMCHI FUNKSIYALAR</div>
    <div style={{ display: 'flex', gap: 16, marginTop: 18, opacity: off ? 1 : .25 }}>{tile('Free Driving Assist', fda, T.free)}</div>
    <div style={{ marginTop: 26, height: 110, borderRadius: 60, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 40, color: start ? '#06210f' : '#fff', background: start ? GRN : 'rgba(255,255,255,.08)', opacity: fda ? 1 : .25, boxShadow: start ? '0 0 40px rgba(61,220,132,.6)' : 'none', scale: String(1 - .05 * tap(T.start)) }}>{start ? 'ISHLAYAPTI' : 'Start'}</div>
    {[T.offroad, T.free, T.start].map((t0, i) => { const k = tap(t0 + .02); return k > .02 && <div key={i} style={{ position: 'absolute', left: [760, 460, 460][i], top: [190, 400, 560][i], width: 80, height: 80, borderRadius: 40, border: `4px solid rgba(255,255,255,${k})`, scale: String(1 + (1 - k) * .8) }} />; })}
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
  const s = t > CUTS[1] && t < CUTS[3] ? 'Manba: Mercedes-Benz (E-Active Body Control), Motor1' : t > CUTS[3] && t < CUTS[4] ? 'Manba: SlashGear · ekran — sxematik' : t > CUTS[5] && t < CUTS[6] ? 'Manba: Carscoops, 2023' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t);
  const cut = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const blur = Math.max(cut * 18, (sh.blur ?? 0) * 10);
  const police = env(t, T.politsiya - .2, CUTS[6], .2, .3) * .55; const pr = Math.sin(t * 14) > 0;
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <AbsoluteFill style={{ background: BG.light }} />
    <AbsoluteFill style={{ filter: blur > .3 ? `blur(${blur.toFixed(1)}px)` : undefined }}>
      <ThreeCanvas width={W} height={H} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <Rig cam={sh.cam} />
        <Studio theme="light">{(m) => sh.world(m)}</Studio>
      </ThreeCanvas>
      {!cover && sh.marks.map((k, i) => <Callout key={i} at={project(sh.cam, k.p)} s={k.s} a={k.a} col={k.col} up={k.up} side={k.side} ink="rgba(28,30,35,.55)" />)}
    </AbsoluteFill>
    {police > 0 && <AbsoluteFill style={{ opacity: police, background: pr ? 'radial-gradient(circle at 0% 30%, rgba(255,40,40,.9) 0%, rgba(255,40,40,0) 45%)' : 'radial-gradient(circle at 100% 30%, rgba(40,110,255,.9) 0%, rgba(40,110,255,0) 45%)' }} />}
    {!cover && <>
      <BigNum subCol={INK} v={`${Math.round(550 * eout(P(t, T.hp - .1, T.hp + .7)))}`} sub="ot kuchi" y={650} a={env(t, T.hp - .1, CUTS[0] - .05, .25, .2)} col={INK} />
      <BigNum subCol={INK} v="48 V" sub="har g‘ildirak alohida" y={650} a={env(t, T.v48, T.gildirak - .2, .25, .2)} col="#2F8CFF" />
      <Screen t={t} />
      <BigNum subCol={INK} v={`${Math.round(15 * eout(P(t, T.km15 - .1, T.km15 + .5)))} km/soat`} sub={t > T.ochadi ? 'rejim o‘chadi' : 'dan tez'} y={600} a={env(t, T.km15 - .1, CUTS[4] - .05, .25, .2)} col={t > T.ochadi ? RED : INK} size={112} />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > CUTS[6] - .3 && <ShareEnd t={t} t0={T.dost - .9} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['maybaxi bor'], ['do‘stingizga', 'y'], ['yuboring']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <Frame t={1.15} cover />
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 330, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 100, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Maybaxda<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>sakrash</span><br />sirlari
  </div>
</AbsoluteFill>;
