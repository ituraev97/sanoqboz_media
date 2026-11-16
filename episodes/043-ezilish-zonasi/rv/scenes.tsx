import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { W, H, FPS, Y, WH, GR, RED, GRN, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, shake } from '../lib';
import { ShareEnd, flashAt } from '../kit';
import { Logo } from '../Art';
import { Studio, Rig, Car, Barrier, Shadow, Cam, V3, mixCam, project, TopPill, Callout, BigNum, Crush } from '../s3d';
import { CAPS } from './caps';
import { END, CH, T } from './ep';

const NEW = '#B3261E', OLD = '#7FCBBF', OLD_ROOF = '#F1EEE4';
const PL_NEW: [string, string] = ['01', 'A 777 AA'], PL_OLD: [string, string] = ['01', 'B 959 AA'];
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));

/* shot boundaries (whip-blur between them) */
const CUTS = [2.72, 4.62, 12.28, 20.38, 24.58, 30.95, 34.48, 38.42];

/* ---------- per-shot world + camera ---------- */
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: { p: V3; s: string; a: number; col?: string; up?: number; side?: number }[] };
const NOCR: Crush = { c: 0, mode: 'front' };

function shot(t: number): Shot {
  /* A — hook: hero car rams the barrier (0 – 2.72) */
  if (t < CUTS[0]) {
    const xc = t < 1.5 ? -1.2 : t < T.eziladi ? -1.2 + 1.6 * Math.pow(P(t, 1.5, T.eziladi), 2) : .4 - .08 * Math.sin(P(t, T.eziladi, T.eziladi + .5) * Math.PI);
    const c = .62 * eout(P(t, T.eziladi, T.eziladi + .22));
    const cam = mixCam({ pos: [6.4, 2.3, 10.5], look: [.5, .75, 0], fov: 34 }, { pos: [4.6, 1.7, 8.6], look: [1.1, .75, 0], fov: 34 }, ease(t, 0, 2.7));
    return { cam, world: (m) => <><Car paint={NEW} x={xc} spin={t > 1.5 ? (xc + 1.2) / .36 : 0} crush={{ c, mode: 'front' }} plate={PL_NEW} mirror={m} />{!m && <Shadow x={xc} />}<Barrier x={2.82} /></>,
      marks: [{ p: [xc, 1.55, 0], s: 'yangi mashina', a: env(t, .25, 1.6, .3, .2) }] };
  }
  /* B — the "iron" old car (2.72 – 4.62) */
  if (t < CUTS[1]) {
    const cam = mixCam({ pos: [-7.2, 2.0, 9.0], look: [0, .75, 0], fov: 34 }, { pos: [-5.0, 1.5, 8.2], look: [.3, .8, 0], fov: 34 }, ease(t, CUTS[0], CUTS[1]));
    return { cam, world: (m) => <><Car kind="old" paint={OLD} roofPaint={OLD_ROOF} plate={PL_OLD} mirror={m} />{!m && <Shadow len={6.4} />}</>,
      marks: [{ p: [-.4, 1.45, 0], s: '1959 · «temir»', a: env(t, T.eski - .05, CUTS[1] + .2, .3, .2), col: '#7FCBBF' }] };
  }
  /* C — the 2009 test: old vs new, 64 km/h offset head-on (4.62 – 12.28) */
  if (t < CUTS[2]) {
    const ap = ease(t, CUTS[1], T.toqnash - .45) * .35 + Math.pow(P(t, T.toqnash - .45, T.toqnash), 2) * .65;
    const hit = t >= T.toqnash; const k = eout(P(t, T.toqnash, T.toqnash + .3));
    const xo = lerp(-5.0, -2.58, ap) - (hit ? .35 * k : 0), xn = lerp(5.2, 2.6, ap) + (hit ? .25 * k : 0);
    const cOld: Crush = { c: hit ? .62 * k : 0, mode: 'cabin' }, cNew: Crush = { c: hit ? .55 * k : 0, mode: 'front' };
    const wide: Cam = { pos: [0, 6.4, 24], look: [0, .6, 0], fov: 38 }, near: Cam = { pos: [1.6, 2.4, 9.5], look: [0, .8, 0], fov: 36 };
    const cam = mixCam(mixCam(wide, { pos: [0, 5.0, 21], look: [0, .6, 0], fov: 38 }, ease(t, CUTS[1], T.toqnash)), near, ease(t, T.toqnash + .05, CUTS[2]));
    return { cam, world: (m) => <>
      <Car kind="old" paint={OLD} roofPaint={OLD_ROOF} plate={PL_OLD} x={xo} z={-.42} spin={(xo + 5.0) / .37} crush={cOld} mirror={m} />
      <Car paint={NEW} plate={PL_NEW} x={xn} z={.42} ry={Math.PI} spin={(5.2 - xn) / .36} crush={cNew} mirror={m} />
      {!m && <><Shadow x={xo} z={-.42} len={6.4} /><Shadow x={xn} z={.42} /></>}</>,
      marks: [{ p: [xo, 1.5, -.42], s: '1959', a: env(t, T.y50, T.toqnash - .3, .3, .2), col: '#7FCBBF' }, { p: [xn, 1.6, .42], s: '2009 · malibu', a: env(t, T.malibu - .05, T.toqnash - .3, .3, .2), col: RED }] };
  }
  /* D — result, x-ray: 62 cm vs 7 cm (12.28 – 20.38) */
  if (t < CUTS[3]) {
    const xo = -2.93, xn = 2.85; const cOld: Crush = { c: .62, mode: 'cabin' }, cNew: Crush = { c: .55, mode: 'front' };
    const over: Cam = { pos: [0, 7.5, 9.5], look: [0, .4, 0], fov: 38 };
    const oldC: Cam = { pos: [xo - .3, 2.6, 10.8], look: [xo + .1, .75, -.42], fov: 36 }, newC: Cam = { pos: [xn + .2, 2.6, 10.8], look: [xn - .2, .75, .42], fov: 36 };
    const cam = t < T.eski2 ? mixCam({ pos: [0, 6.2, 12], look: [0, .5, 0], fov: 38 }, over, ease(t, CUTS[2], T.eski2)) : t < T.malibu2 - .2 ? mixCam(over, oldC, ease(t, T.eski2 - .1, T.eski2 + .9)) : mixCam(oldC, newC, ease(t, T.malibu2 - .2, T.malibu2 + .6));
    const xrO = ease(t, T.eski2, T.eski2 + .6), xrN = ease(t, T.malibu2 - .1, T.malibu2 + .5);
    return { cam, world: (m) => <>
      <Car kind="old" paint={OLD} roofPaint={OLD_ROOF} plate={PL_OLD} x={xo} z={-.42} crush={cOld} xray={xrO} dummy={xrO} intr={eout(P(t, T.sm62 - .2, T.sm62 + .4))} mirror={m} />
      <Car paint={NEW} plate={PL_NEW} x={xn} z={.42} ry={Math.PI} crush={cNew} xray={xrN} dummy={xrN} intr={eout(P(t, T.sm7 - .2, T.sm7 + .4))} mirror={m} />
      {!m && <><Shadow x={xo} z={-.42} len={6.4} /><Shadow x={xn} z={.42} /></>}</>,
      marks: [] };
  }
  /* E — the secret: crumple zone (20.38 – 24.58) */
  if (t < CUTS[4]) {
    const sq = t > T.yumshoq - .05 ? .38 * Math.sin(P(t, T.yumshoq - .05, T.yumshoq + .9) * Math.PI) : 0;
    const cam = mixCam({ pos: [2.0, 2.3, 9.8], look: [.6, .75, 0], fov: 34 }, { pos: [4.6, 1.8, 7.6], look: [1.2, .7, 0], fov: 34 }, ease(t, CUTS[3], CUTS[4]));
    const z = ease(t, T.zona - .1, T.zona + .5);
    return { cam, world: (m) => <><Car paint={NEW} plate={PL_NEW} xray={ease(t, CUTS[3], CUTS[3] + .6)} dummy={1} zone={z} crush={{ c: sq, mode: 'front' }} mirror={m} />{!m && <Shadow />}</>,
      marks: [{ p: [1.9, 1.15, 0], s: 'ezilish zonasi', a: env(t, T.zona, CUTS[4] + .3, .3, .2), col: Y, up: 150 }, { p: [-.3, 1.5, 0], s: '1952 · patent', a: env(t, T.old, CUTS[4] + .3, .3, .2), col: '#9fb8ff', up: 110, side: -90 }] };
  }
  /* F1 — physics: 50 km/h into the wall, 60 cm crumple = 16x (24.58 – 30.95) */
  if (t < CUTS[5]) {
    const imp = T.sm60; const xc = t < imp ? lerp(-4.2, .4, Math.pow(P(t, CUTS[4], imp), 1.15)) : .4; const c = .6 * eout(P(t, imp, imp + .9));
    const cam = mixCam({ pos: [3.4, 2.0, 10.5], look: [.6, .75, 0], fov: 34 }, { pos: [4.2, 1.6, 7.4], look: [2.0, .7, 0], fov: 34 }, ease(t, CUTS[4], imp + 1.2));
    return { cam, world: (m) => <><Car paint={NEW} plate={PL_NEW} x={xc} spin={(xc + 4.2) / .36} crush={{ c, mode: 'front' }} zone={env(t, imp + .4, CUTS[5], .4, .2)} mirror={m} />{!m && <Shadow x={xc} />}<Barrier x={2.82} /></>,
      marks: [{ p: [2.3, 1.25, .2], s: '60 sm', a: env(t, imp + .5, T.g16 - .1, .3, .2), col: Y, up: 140 }] };
  }
  /* F2 — rigid old car: stops in 5 cm = ~200x (30.95 – 34.48) */
  if (t < CUTS[6]) {
    const imp = T.sm5 + .15; const xc = t < imp ? lerp(-2.6, .04, Math.pow(P(t, CUTS[5], imp), 1.5)) : .04 - .25 * Math.sin(P(t, imp, imp + .6) * Math.PI) * Math.exp(-(t - imp) * 2);
    const cam = mixCam({ pos: [4.6, 1.8, 8.2], look: [1.4, .75, 0], fov: 34 }, { pos: [3.8, 1.6, 7.0], look: [1.8, .75, 0], fov: 34 }, ease(t, CUTS[5], CUTS[6]));
    return { cam, world: (m) => <><Car kind="old" paint={OLD} roofPaint={OLD_ROOF} plate={PL_OLD} x={xc} spin={(xc + 2.6) / .37} crush={{ c: t > imp ? .05 : 0, mode: 'front' }} mirror={m} />{!m && <Shadow x={xc} len={6.4} />}<Barrier x={2.82} /></>,
      marks: [{ p: [2.6, .7, .3], s: '5 sm', a: env(t, imp + .1, CUTS[6] + .3, .25, .2), col: RED, up: 70, side: -120 }] };
  }
  /* G — conclusion: crumpled front sacrificed, cabin = capsule (34.48 – 38.42) */
  if (t < CUTS[7]) {
    const ang = lerp(.55, 1.15, ease(t, CUTS[6], CUTS[7]));
    const cam: Cam = { pos: [Math.sin(ang) * 9.6 + .4, 2.4, Math.cos(ang) * 9.6], look: [.4, .8, 0], fov: 34 };
    return { cam, world: (m) => <><Car paint={NEW} plate={PL_NEW} crush={{ c: .6, mode: 'front' }} xray={ease(t, CUTS[6], CUTS[6] + .5)} dummy={1} zone={ease(t, T.qurbon - .1, T.qurbon + .4)} capsule={ease(t, T.kapsula - .15, T.kapsula + .35)} mirror={m} />{!m && <Shadow />}</>,
      marks: [{ p: [1.8, 1.1, 0], s: 'qurbon', a: env(t, T.qurbon, CUTS[7] + .3, .3, .2), col: '#FFB020', up: 150, side: 40 }, { p: [-.3, 1.45, 0], s: 'kapsula', a: env(t, T.kapsula, CUTS[7] + .3, .3, .2), col: '#3D8BFF', up: 120, side: -70 }] };
  }
  /* H — share: pristine car on the turntable */
  const ang = .7 + (t - CUTS[7]) * .35;
  return { cam: { pos: [Math.sin(ang) * 11, 2.6, Math.cos(ang) * 11], look: [0, .7, 0], fov: 34 }, world: (m) => <><Car paint={NEW} plate={PL_NEW} mirror={m} />{!m && <Shadow />}</>, marks: [] };
}

/* ---------- captions: 1-2 big words, keyword yellow ---------- */
const Caps: React.FC<{ t: number }> = ({ t }) => {
  let cur: typeof CAPS[number] | null = null; for (const l of CAPS) if (t >= l[0].s - .05) cur = l;
  if (!cur || t > cur[cur.length - 1].e + .45 || t > END - 2.2) return null;
  const a = eout(P(t, cur[0].s - .05, cur[0].s + .08)), txt = cur.map((o) => o.w).join(' ');
  const fs = Math.min(92, Math.floor(1700 / Math.max(8, txt.length)));
  return <div style={{ position: 'absolute', left: 40, width: W - 80, top: 1290, display: 'flex', justifyContent: 'center', gap: 22, opacity: a, scale: String(lerp(.86, 1, eback(P(t, cur[0].s - .05, cur[0].s + .18)))), fontFamily: SANS, fontWeight: 800, fontSize: fs, whiteSpace: 'nowrap' }}>
    {cur.map((o, i) => <span key={i} style={{ color: o.k ? Y : WH, textShadow: '0 4px 18px rgba(0,0,0,.65), 0 0 2px rgba(0,0,0,.6)' }}>{o.w}</span>)}
  </div>;
};
const Brand: React.FC<{ t: number }> = ({ t }) => {
  let ci = 0; CH.forEach(([s], i) => { if (t >= s) ci = i; });
  const ca = eout(P(t, CH[ci][0], CH[ci][0] + .3));
  return <>
    <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}>
      <Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,.4)' }}>@sanoqboz</span>
    </div>
    {t < END - 4 && <TopPill s={CH[ci][1]} a={ca} y={372} />}
  </>;
};
const Src: React.FC<{ t: number }> = ({ t }) => {
  const s = t < CUTS[3] && t > CUTS[1] ? 'Manba: IIHS, 2009 · 64 km/soat ofset sinov' : t > CUTS[4] && t < CUTS[6] ? 'Hisob: a = v² / 2s · taxminiy' : t > CUTS[3] && t < CUTS[4] ? 'Manba: Mercedes-Benz patenti DE 854157 (1952)' : '';
  if (!s) return null;
  return <div style={{ position: 'absolute', left: 0, width: W, top: 1430, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(255,255,255,.62)' }}>{s}</div>;
};

/* the 3D layer + overlays for time t (also used by the cover) */
export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t);
  let sx = 0, sy = 0; for (const [h, a] of [[T.eziladi, 26], [T.toqnash, 34], [T.sm60, 22], [T.sm5 + .15, 40]] as [number, number][]) { const [x, y] = shake(t, h, a, 6); sx += x; sy += y; }
  const blur = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const fl = Math.max(flashAt(t, T.toqnash) * .85, flashAt(t, T.eziladi) * .5, flashAt(t, T.sm5 + .15) * .6, flashAt(t, T.sm60) * .4);
  const red = env(t, T.sm5 + .1, CUTS[6], .1, .4) * .35;
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 38%, #6a7079 0%, #474c54 38%, #2a2d33 70%, #1b1d21 100%)' }} />
    <AbsoluteFill style={{ translate: `${sx}px ${sy}px`, filter: blur > .02 ? `blur(${(blur * 18).toFixed(1)}px) brightness(${1 + blur * .25})` : undefined }}>
      <ThreeCanvas width={W} height={H} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <Rig cam={sh.cam} />
        <Studio>{(m) => sh.world(m)}</Studio>
      </ThreeCanvas>
      {!cover && sh.marks.map((k, i) => <Callout key={i} at={project(sh.cam, k.p)} s={k.s} a={k.a} col={k.col} up={k.up} side={k.side} />)}
    </AbsoluteFill>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,.45) 100%)' }} />
    <AbsoluteFill style={{ background: '#ff1e1e', opacity: red, mixBlendMode: 'multiply' }} />
    <AbsoluteFill style={{ background: '#fff', opacity: fl }} />
    {!cover && <>
      <BigNum v={`${Math.round(64 * eout(P(t, T.km64 + .3, T.km64 + .9)))}`} sub="km/soat" y={640} a={env(t, T.km64 + .3, T.toqnash - .2, .25, .2)} col={WH} />
      <BigNum v={`${Math.round(62 * eout(P(t, T.sm62, T.sm62 + .6)))} sm`} sub="salonga kirdi · 1959" y={640} a={env(t, T.sm62, T.malibu2 - .15, .25, .2)} col="#FF4B3E" />
      <BigNum v={`${Math.round(7 * eout(P(t, T.sm7, T.sm7 + .4)))} sm`} sub="salonga kirdi · 2009" y={640} a={env(t, T.sm7, CUTS[3] + .1, .25, .2)} col={GRN} />
      <BigNum v="50" sub="km/soat" y={640} a={env(t, T.km50, T.sm60 - .1, .25, .2)} col={WH} />
      <BigNum v={`${Math.round(16 * eout(P(t, T.g16, T.g16 + .6)))}×`} sub="og‘irligingiz" y={640} a={env(t, T.g16, CUTS[5] - .05, .25, .2)} />
      <BigNum v={`≈${Math.round(200 * eout(P(t, T.g200, T.g200 + .5)))}×`} sub="og‘irligingiz" y={640} a={env(t, T.g200, CUTS[6] - .05, .25, .2)} col="#FF4B3E" />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > CUTS[7] - .3 && <ShareEnd t={t} t0={T.dost - .9} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['eski mashina'], ['muxlisiga', 'y'], ['yuboring']]} />}
    </>}
  </AbsoluteFill>;
};

export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: '#4b5058' }} />
  <div style={{ position: 'absolute', inset: 0, translate: '0 170px' }}><Frame t={2.5} cover /></div><AbsoluteFill style={{ background: 'linear-gradient(180deg, #4b5058 0%, rgba(75,80,88,0) 34%)' }} />
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: '#fff' }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 380, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 104, lineHeight: 1.0, color: '#fff', textTransform: 'uppercase', textShadow: '0 6px 30px rgba(0,0,0,.5)' }}>
    Nega yangi<br />mashina<br /><span style={{ color: Y }}>qog‘ozdek</span><br />eziladi?
  </div>
  <div style={{ position: 'absolute', left: 0, width: W, top: 1380, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 42, color: '#fff', textShadow: '0 3px 14px rgba(0,0,0,.6)' }}>1959 vs 2009 · <span style={{ color: Y }}>64 km/soat</span></div>
</AbsoluteFill>;
