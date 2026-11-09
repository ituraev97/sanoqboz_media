import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Car } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Card, Src, Num, Background, Reel, ZtEnd, fmt } from '../kit';
import { END, T } from './ep';

const SRC_YHQ = 'manba: Yo‘l harakati qoidalari (VM 172-son, 2022), 6-band — lex.uz';
const SRC_KUN = 'manba: kun.uz, 15.05.2026 — Toshkent yo‘l harakatini tashkil etish markazi';
const SRC_FINE = 'manba: gov.uz (advice) — «to‘xtash yoki to‘xtab turish qoidalarini buzish»';
const SRC_BHM = '2 × 440 000 — BHM 1.09.2026 dan (gov.uz, 23.06.2026)';
const SRC_EVAK = 'manba: kun.uz, 15.05.2026 · gov.uz (advice)';
const TAXI: [string, string] = ['#FFE09A', '#E0A82E'];
const BLUE = '#2F6FD6';

/* ---------- art ---------- */
/* sign 3.27 "to‘xtash taqiqlangan" */
const NoStop: React.FC<{ s: number; pole?: number; glow?: number }> = ({ s, pole = 0, glow = 0 }) =>
  <svg width={s} height={s + pole} viewBox={`0 0 100 ${100 + pole * 100 / s}`} style={{ display: 'block', overflow: 'visible' }}>
    {pole > 0 && <rect x="46" y="96" width="8" height={pole * 100 / s} fill="#8b94a8" />}
    {glow > 0 && <circle cx="50" cy="50" r={50 + 10 * glow} fill={RED} opacity={.25 * glow} />}
    <circle cx="50" cy="50" r="48" fill="#fff" />
    <circle cx="50" cy="50" r="44" fill={RED} />
    <circle cx="50" cy="50" r="33" fill={BLUE} />
    <path d="M27 27 L73 73 M73 27 L27 73" stroke={RED} strokeWidth="10" />
  </svg>;

const Walker: React.FC<{ s: number; t: number; col?: string }> = ({ s, t, col = WH }) => {
  const k = Math.sin(t * 8) * 10;
  return <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>
    <circle cx="50" cy="16" r="10" fill={col} />
    <path d="M50 28 L50 60" stroke={col} strokeWidth="10" strokeLinecap="round" />
    <path d={`M50 36 L${36 - k / 2} 52 M50 36 L${64 + k / 2} 50`} stroke={col} strokeWidth="8" strokeLinecap="round" />
    <path d={`M50 60 L${38 + k} 92 M50 60 L${62 - k} 92`} stroke={col} strokeWidth="9" strokeLinecap="round" />
  </svg>;
};

const Zebra: React.FC<{ s: number; t: number }> = ({ s, t }) =>
  <div style={{ position: 'relative', width: s, height: s }}>
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
      <rect x="0" y="40" width="100" height="56" rx="6" fill="#2a2f3a" />
      {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={6 + i * 16} y="46" width="9" height="44" rx="2" fill="#e9eef5" />)}
    </svg>
    <div style={{ position: 'absolute', left: s * (.25 + .2 * Math.sin(t * 1.2)), top: 0 }}><Walker s={s * .45} t={t} col={Y} /></div>
  </div>;

const BusStop: React.FC<{ s: number }> = ({ s }) =>
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <rect x="8" y="20" width="62" height="8" rx="3" fill="#8b94a8" />
    <rect x="12" y="28" width="4" height="62" fill="#5a6274" /><rect x="62" y="28" width="4" height="62" fill="#5a6274" />
    <rect x="16" y="32" width="46" height="34" fill={TEAL} opacity=".25" />
    <rect x="18" y="70" width="42" height="6" rx="2" fill="#c9d3e0" />
    <rect x="80" y="14" width="4" height="78" fill="#8b94a8" />
    <rect x="70" y="8" width="24" height="24" rx="3" fill={BLUE} stroke="#fff" strokeWidth="2" />
    <rect x="74" y="13" width="16" height="11" rx="2" fill="#fff" /><circle cx="77" cy="26" r="2.2" fill="#fff" /><circle cx="87" cy="26" r="2.2" fill="#fff" />
    <rect x="0" y="90" width="100" height="6" fill="#3a4256" />
  </svg>;

const Sidewalk: React.FC<{ s: number; t: number }> = ({ s, t }) =>
  <div style={{ position: 'relative', width: s, height: s }}>
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
      <path d="M0 52 L100 52 L100 96 L0 96 Z" fill="#4a5162" />
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${i * 22} 52 L${i * 22} 96`} stroke="#3a4050" strokeWidth="2" />)}
      <path d="M0 74 L100 74" stroke="#3a4050" strokeWidth="2" />
      <rect x="0" y="48" width="100" height="6" fill="#9aa1af" />
    </svg>
    <div style={{ position: 'absolute', left: s * (.62 + .06 * Math.sin(t * 1.4)), top: s * .02 }}><Walker s={s * .4} t={t} /></div>
    <div style={{ position: 'absolute', left: -s * .05, top: s * .3 }}><Car w={s * .62} id="sw" col={TAXI} lights={0} /></div>
  </div>;

const Grass: React.FC<{ s: number; t: number }> = ({ s, t }) =>
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <rect x="0" y="58" width="100" height="38" rx="6" fill="#1f5a34" />
    {Array.from({ length: 12 }, (_, i) => { const x = 6 + i * 8; const sw = Math.sin(t * 2 + i) * 2;
      return <path key={i} d={`M${x} 62 Q${x + sw} ${48 - (i % 3) * 4} ${x + 3 + sw} ${40 - (i % 3) * 5}`} stroke={GRN} strokeWidth="3" fill="none" strokeLinecap="round" />; })}
    <circle cx="30" cy="40" r="5" fill={Y} /><circle cx="72" cy="36" r="5" fill="#ff8fb0" />
    <path d="M30 45 L30 60 M72 41 L72 60" stroke={GRN} strokeWidth="2.5" />
  </svg>;

const Person: React.FC<{ s: number; col?: string; scarf?: boolean; hand?: number }> = ({ s, col = '#c49a7a', scarf, hand = 0 }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 100 120" style={{ display: 'block', overflow: 'visible' }}>
    {hand > 0 && <path d={`M78 84 L${lerp(84, 98, hand)} ${lerp(70, 48, hand)}`} stroke={scarf ? '#6b3a50' : '#4a5264'} strokeWidth="12" strokeLinecap="round" />}
    {scarf && <path d="M22 34c0-22 56-22 56 0v14c-6-8-14-12-28-12s-22 4-28 12z" fill="#8a3b5a" />}
    <circle cx="50" cy="34" r="20" fill={col} />
    <path d="M10 120c2-34 18-50 40-50s38 16 40 50z" fill={scarf ? '#6b3a50' : '#4a5264'} />
    {!scarf && <path d="M30 28c4-14 36-14 40 0" stroke="#2a2018" strokeWidth="10" fill="none" strokeLinecap="round" />}
    {scarf && <path d="M28 30c2-14 42-14 44 0" stroke="#8a3b5a" strokeWidth="9" fill="none" strokeLinecap="round" />}
  </svg>;

const Stall: React.FC<{ s: number; hi: number }> = ({ s, hi }) =>
  <svg width={s} height={s * .8} viewBox="0 0 100 80" style={{ display: 'block', overflow: 'visible' }}>
    {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${i * 20} 6 L${i * 20 + 20} 6 L${i * 20 + 20} 20 Q${i * 20 + 10} 28 ${i * 20} 20 Z`} fill={i % 2 ? Y : TEAL} />)}
    <rect x="4" y="22" width="4" height="56" fill="#5a6274" /><rect x="92" y="22" width="4" height="56" fill="#5a6274" />
    <rect x="0" y="52" width="100" height="26" rx="3" fill="#6b4a2e" />
    {[14, 34, 54, 74].map((x, i) => <circle key={x} cx={x + 6} cy="46" r="9" fill={['#ff6b4a', '#ffcf3a', '#8fd16a', '#ff9a3a'][i]} />)}
    <g opacity={hi}><rect x="58" y="-24" width="42" height="20" rx="4" fill={Y} /><path d="M70 -4 L76 4 L82 -4 Z" fill={Y} /></g>
  </svg>;

const Stopwatch: React.FC<{ s: number; p: number }> = ({ s, p }) =>
  <svg width={s} height={s * 1.12} viewBox="0 0 100 112" style={{ display: 'block' }}>
    <rect x="42" y="0" width="16" height="10" rx="3" fill="#cfd6e2" />
    <rect x="47" y="8" width="6" height="8" fill="#cfd6e2" />
    <circle cx="56" cy="64" r="46" fill="#cfd6e2" />
    <circle cx="56" cy="64" r="40" fill="#141821" />
    <path d={`M56 64 L56 24 A40 40 0 ${p > .5 ? 1 : 0} 1 ${56 + 40 * Math.sin(p * 6.283)} ${64 - 40 * Math.cos(p * 6.283)} Z`} fill={Y} opacity=".35" />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x="55" y="27" width="2" height="6" fill="#7F8792" transform={`rotate(${i * 30} 56 64)`} />)}
    <rect x="54.5" y="30" width="3" height="36" rx="1.5" fill={Y} transform={`rotate(${p * 360} 56 64)`} />
    <circle cx="56" cy="64" r="4" fill={Y} />
  </svg>;

const TowTruck: React.FC<{ w: number; lift: number }> = ({ w, lift }) =>
  <div style={{ position: 'relative', width: w, height: w * .5 }}>
    <svg width={w} height={w * .5} viewBox="0 0 400 200" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <ellipse cx="200" cy="190" rx="190" ry="10" fill="#000" opacity=".5" />
      <rect x="20" y="120" width="250" height="40" rx="6" fill="#d97a2b" />
      <path d="M270 160 L270 70 Q272 56 290 56 L340 56 Q360 56 372 84 L388 116 L388 160 Z" fill="#e8913a" stroke="#2a2f3a" strokeWidth="3" />
      <path d="M296 68 L338 68 Q350 68 358 88 L366 108 L296 108 Z" fill="#2a3a52" />
      <rect x="300" y="44" width="40" height="12" rx="4" fill={Y} opacity={.6 + .4 * Math.abs(Math.sin(lift * 20))} />
      <path d={`M60 120 L${lerp(150, 120, lift)} ${lerp(60, 20, lift)}`} stroke="#5a6274" strokeWidth="12" strokeLinecap="round" />
      <path d={`M${lerp(150, 120, lift)} ${lerp(60, 20, lift)} L${lerp(150, 120, lift) - 110} ${lerp(60, 20, lift) + 40}`} stroke="#8b94a8" strokeWidth="3" />
      {[80, 220, 340].map(x => <g key={x} transform={`translate(${x} 162)`}><circle r="28" fill="#0b0c10" /><circle r="18" fill="#6b7282" /><circle r="6" fill="#c9ced8" /></g>)}
    </svg>
    <div style={{ position: 'absolute', left: -w * .52, top: lerp(w * .2, w * -.02, lift), rotate: `${lerp(0, -14, lift)}deg`, transformOrigin: '100% 50%' }}><Car w={w * .62} id="tw" col={TAXI} lights={0} /></div>
  </div>;

const Steps: React.FC<{ s: number; t: number }> = ({ s, t }) =>
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>
    {[0, 1, 2, 3].map(i => { const a = clamp(((t * 2) % 4) - i + 1); const x = 18 + i * 20, y = i % 2 ? 30 : 56;
      return <g key={i} opacity={.25 + .75 * a} transform={`translate(${x} ${y}) rotate(80)`}><ellipse cx="0" cy="0" rx="7" ry="11" fill={GRN} /><circle cx="0" cy="-15" r="4" fill={GRN} /></g>; })}
  </svg>;

const Check: React.FC<{ s: number; col?: string }> = ({ s, col = GRN }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M12 34l14 14 26-30" stroke={col} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Cross: React.FC<{ s: number; col?: string }> = ({ s, col = RED }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M14 14l36 36M50 14 14 50" stroke={col} strokeWidth="9" strokeLinecap="round" /></svg>;
const Shield: React.FC<{ s: number; col?: string }> = ({ s, col = TEAL }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M32 4 9 13v17c0 15 10 24 23 30 13-6 23-15 23-30V13z" fill={col} /><path d="M21 32l8 8 15-16" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const Bubble: React.FC<{ x: number; y: number; a: number; s: string; size?: number; col?: string; tail?: 'left' | 'right' }> = ({ x, y, a, s, size = 40, col = '#fff', tail = 'left' }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: clamp(a), scale: String(lerp(.6, 1, eback(clamp(a)))), padding: '18px 28px', borderRadius: tail === 'left' ? '30px 30px 30px 6px' : '30px 30px 6px 30px', background: col, color: '#111', fontFamily: SANS, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,.5)' }}>{s}</div>;

/* curb line for side-view scenes */
const Curb: React.FC<{ y: number }> = ({ y }) =>
  <div style={{ position: 'absolute', left: 0, top: y, width: 1080, height: 70 }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 10, background: '#9aa1af', opacity: .7 }} />
    <div style={{ position: 'absolute', left: 0, right: 0, top: 10, height: 60, background: 'linear-gradient(180deg,#3a4050,rgba(20,22,30,0))' }} />
  </div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 8.45, .2, .3);
  const drive = eout(P(t, -0.2, T.toxtating + .3));
  const bub = eout(P(t, T.aka - .3, T.aka + .1));
  const bad = eout(P(t, T.katta - .2, T.katta + .2));
  return <Layer a={a} z={logZ(P(t, 0, 8.45), 1, 1.05)}>
    <Glow x={CX} y={1000} r={560} a={.9} col={bad > .5 ? '236,58,44' : '63,169,184'} />
    <Curb y={1218} />
    <div style={{ position: 'absolute', left: 640, top: 690 }}><NoStop s={210} pole={320} glow={bad * (.6 + .4 * Math.abs(Math.sin(t * 5)))} /></div>
    <div style={{ position: 'absolute', left: lerp(-620, 70, drive), top: 1000 }}><Car w={560} id="c1" col={TAXI} wheel={drive * 900} lights={.8} /></div>
    <Bubble x={330} y={880} a={bub * (1 - eout(P(t, T.yol2 - .3, T.yol2)))} s="«Aka, shu yerda to‘xtating!»" size={36} />
    <Pill s="yo‘lovchiga — 1 qadam" x={CX} y={1330} a={env(t, T.birq - .2, T.katta - .1, .2, .2)} size={34} col={GRN} />
    <Pill s="sizga — katta jarima" x={CX} y={1330} a={bad} size={34} col={RED} />
    <Head t={t} t0={-1} t1={T.yol2 - .1} y={490} lines={[['«aka, shu yerda'], ['to‘xtating»', 'y']]} size={80} />
    <Head t={t} t0={T.yol2 - .1} t1={8.45} y={490} lines={[['yo‘lovchiga — 1 qadam'], ['sizga — jarima', 'r']]} size={68} />
  </Layer>;
};

const Tile: React.FC<{ a: number; label: string; children: React.ReactNode }> = ({ a, label, children }) =>
  <div style={{ width: 262, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '22px 0 18px', borderRadius: 24, background: a > .5 ? 'rgba(236,58,44,.12)' : 'rgba(255,255,255,.03)', border: `3px solid ${a > .5 ? RED : '#2c3342'}`, opacity: lerp(.22, 1, clamp(a)), scale: String(lerp(.85, 1, eback(clamp(a)))) }}>
    <div style={{ width: 180, height: 180, display: 'grid', placeItems: 'center' }}>{children}</div>
    <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 36, color: a > .5 ? WH : GR, whiteSpace: 'nowrap' }}>{label}</span>
  </div>;
const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 8.3, 18.8, .3, .3);
  const on = (x: number) => eout(P(t, x - .3, x + .1));
  return <Layer a={a} z={logZ(P(t, 8.3, 18.8), 1, 1.04)}>
    <Glow x={CX} y={1000} r={560} a={.85} col="236,58,44" />
    <div style={{ ...abs(SL, 680, SR - SL), display: 'flex', justifyContent: 'space-between' }}>
      <Tile a={on(T.piyoda)} label="o‘tish joyi"><Zebra s={180} t={t} /></Tile>
      <Tile a={on(T.avtobus)} label="bekat"><BusStop s={180} /></Tile>
      <Tile a={on(T.trotuar)} label="trotuar"><Sidewalk s={180} t={t} /></Tile>
    </div>
    <div style={{ ...abs(SL, 990, SR - SL), display: 'flex', justifyContent: 'center', gap: 36 }}>
      <Tile a={on(T.maysa)} label="maysazor"><Grass s={180} t={t} /></Tile>
      <Tile a={on(T.belgi)} label="taqiq belgisi"><NoStop s={160} /></Tile>
    </div>
    <Src s={SRC_KUN} y={1335} a={eout(P(t, T.piyoda, T.piyoda + .4))} />
    <Head t={t} t0={8.3} t1={18.8} y={490} lines={[['toshkentda qayerda'], ['to‘xtash xavfli?', 'y']]} size={70} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 18.7, 24.4, .3, .3);
  const aA = env(t, 18.7, T.xuddi, .3, .3), aB = env(t, T.xuddi - .2, 24.4, .3, .3);
  const point = eout(P(t, T.shu - .3, T.shu + .2));
  const hi = eout(P(t, T.qimmat - .3, T.qimmat + .1));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 18.7, T.xuddi), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="63,169,184" />
      <div style={{ position: 'absolute', left: 110, top: 900 }}><Person s={300} hand={point} /></div>
      <div style={{ position: 'absolute', left: 500, top: 760 }}><BusStop s={400} /></div>
      <Bubble x={440} y={820} a={point} s="«Shu yerda!»" size={44} />
      <Pill s="bekat — to‘xtash mumkin emas" x={CX} y={1300} a={eout(P(t, T.soraydi - .2, T.soraydi + .2))} size={30} dark col={RED} />
      <Head t={t} t0={18.7} t1={T.xuddi} y={490} lines={[['yo‘lovchi aynan'], ['shu joyni so‘raydi', 'y']]} size={70} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.xuddi, 24.4), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="247,198,75" />
      <div style={{ position: 'absolute', left: 430, top: 820 }}><Stall s={420} hi={hi} /></div>
      <div style={{ position: 'absolute', left: 762, top: 761, opacity: hi, fontFamily: SANS, fontWeight: 800, fontSize: 24, color: '#111', translate: '-50% -50%', whiteSpace: 'nowrap' }}>eng qimmat</div>
      <div style={{ position: 'absolute', left: 100, top: 880 }}><Person s={320} scarf col="#d2a585" hand={hi} /></div>
      <Pill s="hazil" x={830} y={700} a={eout(P(t, T.xuddi, T.xuddi + .3))} size={20} dark col={GR} />
      <Head t={t} t0={T.xuddi - .2} t1={24.4} y={490} lines={[['xuddi qaynona —'], ['eng qimmat rastada', 'y']]} size={68} />
    </Layer>
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 24.3, 34.55, .3, .2);
  const aA = env(t, 24.3, T.lekin, .3, .3), aB = env(t, T.lekin - .2, 34.55, .3, .2);
  const sw = P(t, 24.5, 28.4);
  const secs = Math.floor(sw * 59);
  const r1 = eout(P(t, T.chiqar - .3, T.chiqar + .1)), r2 = eout(P(t, T.tushir - .3, T.tushir + .1));
  const eq = eback(P(t, T.toxtash2 - .1, T.toxtash2 + .3));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 24.3, T.lekin), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="247,198,75" />
      <div style={{ position: 'absolute', left: CX - 190, top: 690 }}><Stopwatch s={380} p={sw} /></div>
      <div style={{ ...abs(SL, 1150, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 96, color: WH }}>0:{String(secs).padStart(2, '0')}</div>
      <Pill s="«turib qolmadim-ku»" x={CX} y={1320} a={eout(P(t, T.men - .2, T.men + .2))} size={32} dark col={Y} />
      <Head t={t} t0={24.3} t1={T.lekin} y={490} lines={[['«1 daqiqaga'], ['to‘xtadim, xolos»', 'y']]} size={76} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.lekin, 34.55), 1, 1.03)}>
      <Glow x={CX} y={1000} r={540} a={.9} col={eq > .5 ? '236,58,44' : '63,169,184'} />
      <Card x={SL + 20} y={700} w={SR - SL - 40} style={{ background: 'linear-gradient(180deg,#f7f9fa,#dfe6e8)' }}>
        <div style={{ padding: '26px 34px' }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: '#5A6169' }}>Yo‘l harakati qoidalari · 6-band</div>
          <div style={{ marginTop: 8, fontFamily: HEAD, fontWeight: 700, fontSize: 72, lineHeight: 1, color: '#111' }}>TO‘XTASH</div>
          <div style={{ marginTop: 6, fontFamily: SANS, fontWeight: 600, fontSize: 26, color: '#3a4150' }}>harakatni 10 daqiqagacha to‘xtatish</div>
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['yo‘lovchini chiqarish', r1], ['yo‘lovchini tushirish', r2]].map(([s, v]) =>
              <div key={s as string} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: lerp(.2, 1, v as number), translate: `${(1 - (v as number)) * 40}px 0` }}>
                <Check s={44} col="#1f9d57" /><span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34, color: '#111' }}>{s as string}</span>
              </div>)}
          </div>
        </div>
      </Card>
      <div style={{ position: 'absolute', left: CX, top: 1205, translate: '-50% -50%', opacity: clamp(eq), scale: String(lerp(1.6, 1, clamp(eq))), padding: '10px 30px', borderRadius: 18, border: `5px solid ${RED}`, background: 'rgba(8,9,13,.85)', fontFamily: HEAD, fontWeight: 700, fontSize: 60, color: RED, rotate: '-4deg', whiteSpace: 'nowrap' }}>= TO‘XTASH</div>
      <Pill s="1 daqiqa bo‘lsa ham" x={CX} y={1310} a={eout(P(t, T.daq2 - .2, T.daq2 + .2))} size={32} col={Y} />
      <Src s={SRC_YHQ} y={1385} a={eout(P(t, T.lekin, T.lekin + .4))} />
      <Head t={t} t0={T.lekin - .2} t1={34.55} y={490} lines={[['yo‘lovchi tushirish'], ['ham — to‘xtash', 'r']]} size={70} />
    </Layer>
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 34.4, 36.0, .12, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} col="236,58,44" />
    <Head t={t} t0={34.4} t1={36.0} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 35.8, 48.7, .3, .3);
  const aA = env(t, 35.8, T.haydovchi, .3, .3), aB = env(t, T.haydovchi - .2, 48.7, .3, .3);
  const o1 = eout(P(t, T.ogoh - .3, T.ogoh + .1)), o2 = eout(P(t, T.bhm - .3, T.bhm + .1));
  const chip = eout(P(t, T.sent - .2, T.sent + .3));
  const cnt = eout(P(t, T.s880 - .2, T.s880 + .9));
  const lift = eio(P(t, T.evak - .3, T.maydon + .3));
  const drv = eout(P(t, T.yoq - .3, T.yoq + .1));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 35.8, T.haydovchi), 1, 1.04)}>
      <Glow x={CX} y={980} r={560} a={.9} col={cnt > .1 ? '247,198,75' : '236,58,44'} />
      <Card x={SL + 60} y={710} w={SR - SL - 120} style={{ background: 'linear-gradient(180deg,#f7f9fa,#dfe6e8)' }}>
        <div style={{ padding: '22px 30px' }}>
          <div style={{ fontFamily: MONO, fontSize: 21, color: '#5A6169' }}>MJtK 128⁶-modda · to‘xtash qoidasi</div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: lerp(.2, 1, o1) }}>
            <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: '#111' }}>ogohlantirish</span><span style={{ fontFamily: MONO, fontSize: 24, color: '#5A6169' }}>yoki</span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: lerp(.2, 1, o2) }}>
            <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: '#111' }}>jarima</span>
            <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, lineHeight: 1, color: RED }}>2 BHM</span>
          </div>
        </div>
      </Card>
      <Pill s="1 BHM = 440 000 so‘m (1-sentyabrdan)" x={CX} y={1040} a={chip} size={28} dark col={TEAL} />
      <Num v={fmt(880000 * cnt)} y={1090} a={cnt > 0 ? 1 : 0} size={150} col={Y} />
      <div style={{ ...abs(SL, 1240, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH, opacity: cnt, marginTop: 10 }}>SO‘M</div>
      <Src s={SRC_FINE} y={1305} a={eout(P(t, T.ogoh, T.ogoh + .4))} />
      <Src s={SRC_BHM} y={1380} a={chip} />
      <Head t={t} t0={35.8} t1={T.sent - .1} y={490} lines={[['ogohlantirish'], ['yoki 2 BHM', 'r']]} size={80} />
      <Head t={t} t0={T.sent - .1} t1={T.haydovchi} y={490} lines={[['1-sentyabrdan —'], ['880 000 so‘m', 'y']]} size={80} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.haydovchi, 48.7), 1, 1.03)}>
      <Glow x={CX} y={1000} r={560} a={.9} col="236,58,44" />
      <Curb y={1210} />
      <div style={{ position: 'absolute', left: 400, top: 950 }}><TowTruck w={520} lift={lift} /></div>
      <div style={{ position: 'absolute', left: 110, top: 700, opacity: drv }}>
        <div style={{ position: 'relative', width: 190, opacity: .55 }}><Person s={190} /></div>
        <div style={{ position: 'absolute', left: 15, top: 30 }}><Cross s={140} /></div>
      </div>
      <Pill s="haydovchi yo‘q" x={195} y={940} a={drv} size={28} dark col={RED} />
      <Pill s="xalaqit beradi" x={700} y={760} a={eout(P(t, T.xalaqit - .2, T.xalaqit + .2))} size={28} dark col={Y} />
      <Pill s="→ jarima maydonchasi" x={CX} y={1310} a={eout(P(t, T.maydon - .2, T.maydon + .2))} size={34} col={Y} />
      <Src s={SRC_EVAK} y={1385} a={eout(P(t, T.haydovchi, T.haydovchi + .4))} />
      <Head t={t} t0={T.haydovchi - .2} t1={48.7} y={490} lines={[['haydovchi yo‘q —'], ['evakuator', 'r']]} size={80} />
    </Layer>
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 48.6, 56.75, .3, .3);
  const aA = env(t, 48.6, T.necha, .3, .3), aB = env(t, T.necha - .2, 56.75, .3, .3);
  const bub = eout(P(t, T.sal - .3, T.sal + .1));
  const drive = eio(P(t, T.xavfsiz, T.tushiraman + .6));
  const lt = eout(P(t, T.s880b - .2, T.s880b + .3));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 48.6, T.necha), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col={bub > .5 ? '61,220,132' : '63,169,184'} />
      <Curb y={1218} />
      <div style={{ position: 'absolute', left: 60, top: 640 }}><NoStop s={150} pole={430} /></div>
      <div style={{ position: 'absolute', left: lerp(240, 400, drive), top: 1000 }}><Car w={500} id="c7" col={TAXI} wheel={drive * 400} lights={.6} /></div>
      <Bubble x={CX + 40} y={860} a={bub} s="«Sal oldinda, xavfsiz joyda tushiraman»" size={30} col="#dff7e8" tail="right" />
      <Pill s="xavfsiz joy ✓" x={790} y={1310} a={eout(P(t, T.tushiraman, T.tushiraman + .3))} size={30} col={GRN} />
      <Pill s="maslahat" x={830} y={700} a={eout(P(t, 48.7, 49))} size={20} dark col={GR} />
      <Head t={t} t0={48.6} t1={T.ayting - .2} y={490} lines={[['nima qilish'], ['kerak?', 'y']]} size={84} />
      <Head t={t} t0={T.ayting - .2} t1={T.necha} y={490} lines={[['xushmuomala'], ['ayting', 'g']]} size={84} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.necha, 56.75), 1, 1.03)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="61,220,132" />
      <div style={{ ...abs(SL, 720, SR - SL), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 330, height: 400, borderRadius: 26, border: `3px solid ${GRN}`, background: 'rgba(61,220,132,.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Steps s={220} t={t} />
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH }}>bir necha qadam</span>
        </div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 140, color: Y, opacity: lt, scale: String(lerp(.4, 1, eback(lt))) }}>&lt;</div>
        <div style={{ position: 'relative', width: 330, height: 400, borderRadius: 26, border: `3px solid ${RED}`, background: 'rgba(236,58,44,.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: eout(P(t, T.s880b - .4, T.s880b)) }}>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 76, color: RED, lineHeight: 1 }}>880 000</span>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH }}>so‘m jarima</span>
        </div>
      </div>
      <Pill s="arzon ✓" x={CX} y={1250} a={eout(P(t, T.arzon - .2, T.arzon + .2))} size={34} col={GRN} />
      <Head t={t} t0={T.necha - .2} t1={56.75} y={490} lines={[['bir necha qadam —'], ['880 000 dan arzon', 'g']]} size={68} />
    </Layer>
  </Layer>;
};

const Perk: React.FC<{ t: number; t0: number; t1: number; children: React.ReactNode }> = ({ t, t0, t1, children }) => {
  const a = env(t, t0, t1, .3, .25); if (a <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, opacity: a, translate: `${(1 - eout(P(t, t0, t0 + .4))) * 120}px 0` }}>{children}</div>;
};
const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 56.6, 63.9, .3, .3);
  const pop = eback(P(t, T.kecha - .2, T.kecha + .3));
  const bon = eout(P(t, T.p10 - .2, T.p10 + .5));
  return <Layer a={a}>
    <Glow x={CX} y={1000} r={520} a={.9} col="63,169,184" />
    <Perk t={t} t0={56.6} t1={T.osgop - .1}>
      <div style={{ ...abs(SL, 700, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 56.7, 57.1)) }}><Lockup h={100} /></div>
      <div style={{ position: 'absolute', left: CX, top: 1030, translate: '-50% -50%', width: 300, height: 300, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)', scale: String(lerp(.85, 1, pop)) }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 120, lineHeight: 1, color: Y }}>24/7</div><div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>yordam</div></div>
      </div>
      <Src s="Zero Taxi ma’lumoti" y={1250} a={1} />
      <Head t={t} t0={56.6} t1={T.osgop - .1} y={490} lines={[['savol tug‘ilsa —'], ['yordam 24/7', 'y']]} size={76} />
    </Perk>
    <Perk t={t} t0={T.osgop - .1} t1={T.balans - .1}>
      <Card x={SL + 70} y={820} w={SR - SL - 140} style={{ background: 'linear-gradient(180deg,#f7f9fa,#dfe6e8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px 30px' }}>
          <Shield s={100} />
          <div><div style={{ fontFamily: MONO, fontSize: 20, color: '#5A6169' }}>yo‘lovchi sug‘urtasi</div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 74, lineHeight: 1, color: '#111' }}>OSGOP</div></div>
          <div style={{ marginLeft: 'auto', padding: '8px 16px', borderRadius: 14, background: GRN, color: '#06210f', fontFamily: SANS, fontWeight: 800, fontSize: 26, opacity: eout(P(t, T.bepul - .2, T.bepul + .2)) }}>bepul</div>
        </div>
      </Card>
      <Src s="Zero Taxi ma’lumoti" y={1120} a={1} />
      <Head t={t} t0={T.osgop - .1} t1={T.balans - .1} y={490} lines={[['osgop polisi —'], ['bepul', 'g']]} size={80} />
    </Perk>
    <Perk t={t} t0={T.balans - .1} t1={63.9}>
      <Card x={SL + 70} y={760} w={SR - SL - 140}>
        <div style={{ padding: '26px 34px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontFamily: MONO, fontSize: 21, color: GR }}>balansni to‘ldirish · misol</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: WH }}><span>to‘ldirdingiz</span><span>100 000</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: GRN, opacity: bon }}><span>park bonusi</span><span>+{fmt(10000 * bon)}</span></div>
        </div>
      </Card>
      <Src s="Zero Taxi ma’lumoti" y={1120} a={1} />
      <Head t={t} t0={T.balans - .1} t1={63.9} y={490} lines={[['balansga'], ['+10%', 'y']]} size={84} from="slam" />
    </Perk>
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 63.6, END + 1, .3, .1);
  return <Layer a={a}>
    <ZtEnd t={t} t0={T.ulan} perks={['24/7 yordam', 'OSGOP bepul · +4 prioritet', '+10% balansga bonus', '5 soniyada yechish · 0% komissiya']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.katta, 8, 7], [T.belgi, 8, 7], [T.toxtash2, 10, 6], [T.endi, 20, 5], [T.s880, 12, 6], [T.evak, 8, 7], [T.p10, 6, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () =>
  <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1150} r={600} a={1} col="236,58,44" />
    <Curb y={1388} />
    <div style={{ position: 'absolute', left: 640, top: 900 }}><NoStop s={200} pole={290} glow={.7} /></div>
    <div style={{ position: 'absolute', left: 90, top: 1170 }}><Car w={540} id="cc" col={TAXI} lights={.8} /></div>
    <Bubble x={370} y={1080} a={1} s="«Aka, shu yerda!»" size={44} />
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 32, color: GR }}>yandex go · haydovchi · jarima</div>
    <div style={{ ...abs(SL, 500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 118, lineHeight: 1.04, ...yel }}>SHU YERDA<br />TO‘XTAYMI?</div>
    <div style={{ ...abs(SL, 1490, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.1, color: GRN }}>QAYERDA TO‘XTASH<br />MUMKIN EMAS</div>
  </AbsoluteFill>;
