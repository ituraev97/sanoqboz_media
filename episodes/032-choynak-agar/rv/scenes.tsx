import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Gauge } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* generic electric kettle; boil 0..1 shows steam + blue light */
const Kettle: React.FC<{ w: number; t: number; boil?: number; id: string; col?: string }> = ({ w, t, boil = 0, id, col = '#d9dee8' }) => (
  <svg width={w} height={w * 1.1} viewBox="0 0 200 220" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`kt${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8b94a8" /><stop offset=".35" stopColor={col} /><stop offset=".7" stopColor="#aab2c2" /><stop offset="1" stopColor="#6c7586" /></linearGradient>
      <filter id={`ktB${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
    </defs>
    {boil > 0 && [0, 1, 2].map(i => { const ph = (t * .9 + i / 3) % 1; return <circle key={i} cx={58 + Math.sin(t * 3 + i) * 8} cy={40 - ph * 70} r={10 + ph * 16} fill="#e6ecf5" opacity={boil * (1 - ph) * .55} filter={`url(#ktB${id})`} />; })}
    <path d="M150 80 C 190 80 192 160 152 168" stroke="#2a2f3c" strokeWidth="16" fill="none" strokeLinecap="round" />
    <path d="M50 70 L 30 50 L 40 46 L 62 64 Z" fill="#9aa3b2" />
    <path d="M55 60 L 150 60 L 165 190 L 40 190 Z" fill={`url(#kt${id})`} stroke="#4a5266" strokeWidth="3" />
    <rect x="70" y="48" width="66" height="16" rx="6" fill="#2a2f3c" />
    <rect x="68" y="100" width="12" height="70" rx="5" fill="#0e1a2e" />
    <rect x="68" y={170 - 60 * Math.min(1, .3 + boil * .6)} width="12" height={60 * Math.min(1, .3 + boil * .6)} rx="5" fill={boil > 0 ? '#5B8CFF' : '#33507a'} opacity=".95" />
    <rect x="30" y="190" width="145" height="20" rx="8" fill="#1f232c" stroke="#4a5266" strokeWidth="3" />
    {boil > 0 && <circle cx="160" cy="200" r="4" fill="#5B8CFF" opacity={boil} />}
  </svg>
);

/* small house icon with lit window */
const House: React.FC<{ s: number; lit: number }> = ({ s, lit }) => (
  <svg width={s} height={s} viewBox="0 0 40 40" style={{ display: 'block' }}>
    <path d="M4 18 L20 5 L36 18 Z" fill="#c64b3c" />
    <rect x="8" y="17" width="24" height="19" fill="#d9cbb0" />
    <rect x="14" y="22" width="8" height="7" fill={lit > .5 ? '#FFCF3A' : '#3a4152'} />
    <rect x="25" y="25" width="5" height="11" fill="#6b4a2a" />
  </svg>
);

/* power pylon */
const Pylon: React.FC<{ h: number; spark?: number }> = ({ h, spark = 0 }) => (
  <svg width={h * .6} height={h} viewBox="0 0 120 200" style={{ display: 'block', overflow: 'visible' }}>
    <path d="M60 10 L30 195 M60 10 L90 195 M40 130 L80 130 M45 90 L75 90 M50 55 L70 55 M36 160 L84 160 M40 130 L75 90 M80 130 L45 90" stroke="#9aa3b2" strokeWidth="5" fill="none" />
    <path d="M10 55 L110 55 M18 90 L102 90" stroke="#9aa3b2" strokeWidth="6" />
    {spark > 0 && <path d="M100 40 L 112 60 L 104 60 L 116 84" stroke="#FFCF3A" strokeWidth="5" fill="none" opacity={spark} />}
  </svg>
);

/* horizontal comparison bar */
const Bar: React.FC<{ y: number; w: number; a: number; col: string; label: string; val: string; max?: number }> = ({ y, w, a, col, label, val, max = 860 }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: SL, top: y, opacity: clamp(a * 3) }}>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH, marginBottom: 8 }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: Math.max(6, w * a), maxWidth: max, height: 64, borderRadius: 12, background: col, boxShadow: `0 0 30px ${col}55` }} />
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 54, color: col, whiteSpace: 'nowrap' }}>{val}</div>
    </div>
  </div>;

const Chip: React.FC<{ s: string; y: number; a: number; x?: number; col?: string }> = ({ s, y, a, x = CX, col = WH }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% 0', opacity: a, scale: String(lerp(.8, 1, a)), padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 26, color: col, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 4.4, .2, .3);
  const boil = eout(P(t, T.choy - .3, T.choy + .5));
  const q = eout(P(t, T.svet - .1, T.svet + .3));
  return <Layer a={a} z={logZ(P(t, -1, 4.4), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.9} col="91,140,255" />
    <div style={{ ...abs(CX - 380, 880) }}><Kettle w={220} t={t} boil={boil} id="k1a" /></div>
    <div style={{ ...abs(CX - 170, 760) }}><Kettle w={340} t={t + .3} boil={boil} id="k1b" col="#f0e2c8" /></div>
    <div style={{ ...abs(CX + 160, 880) }}><Kettle w={220} t={t + .6} boil={boil} id="k1c" col="#c8d8f0" /></div>
    <Pill s="svet o‘chadimi? ⚡" x={CX} y={1290} a={q} size={34} col={Y} />
    <Head t={t} t0={-1} t1={4.4} y={490} lines={[['hamma birdan'], ['choynak qo‘ysa?', 'y']]} size={88} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 4.35, 11.0, .3, .3);
  const fill = eio(P(t, T.hisob - .3, T.oila + .2));
  const k = eback(P(t, T.oddiy - .2, T.choy2 + .2));
  return <Layer a={a} z={logZ(P(t, 4.35, 11.0), 1, 1.03)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <div style={{ ...abs(SL + 30, 700), width: SR - SL - 60, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10, opacity: 1 - .55 * clamp(k) }}>
      {Array.from({ length: 30 }).map((_, i) => { const p = clamp(fill * 30 - i); return <div key={i} style={{ opacity: p, scale: String(lerp(.5, 1, eout(p))) }}><House s={70} lit={p} /></div>; })}
    </div>
    <Num v="10,2 mln" y={950} a={eout(P(t, T.m10 - .3, T.m10))} size={130} />
    <Pill s="oila · 2025-yil 1-yanvar" x={CX} y={1120} a={eout(P(t, T.oila - .2, T.oila + .2)) * (1 - clamp(k))} size={28} col={WH} dark />
    {k > 0 && <div style={{ ...abs(CX + 140, 1060), scale: String(clamp(k, 0, 1.2)), opacity: clamp(k) }}><Kettle w={170} t={t} boil={1} id="k2" /></div>}
    <Chip s="choynak ≈ 2,2 kVt" x={CX - 120} y={1150} a={eout(P(t, T.kvt - .2, T.kvt + .2))} col={Y} />
    <Src s="Statistika qo‘mitasi: 10 244 241 oila · choynak 2,2–2,4 kVt (Morphy Richards)" y={1340} a={eout(P(t, T.kvt, T.kvt + .4))} />
    <Head t={t} t0={4.35} t1={11.0} y={490} lines={[['hisoblaymiz'], ['oila × choynak', 'y']]} size={88} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 10.95, 20.35, .3, .3);
  const b1 = eio(P(t, T.m10b, T.gvt22 + .4));
  const b2 = eio(P(t, T.rekord - .2, T.gvt13 + .4));
  return <Layer a={a} z={logZ(P(t, 10.95, 20.35), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="91,140,255" />
    <Chip s="10,24 mln × 2,2 kVt ≈ 22,5 GVt" y={700} a={eout(P(t, T.birga - .3, T.birga + .2))} col={ICE} />
    <Bar y={800} w={600} a={b1} col={RED} label="hamma choynak birga" val="22,5 GVt" />
    <Bar y={960} w={355} a={b2} col={GRN} label="tarmoq rekordi" val="13,3 GVt" />
    <Chip s="21-iyul 2025, soat 17:00" y={1130} a={eout(P(t, T.y2025 - .2, T.y2025 + .2))} col={Y} />
    <Pill s="konditsionerlar ishlaganda ❄" x={CX} y={1240} a={eout(P(t, T.kond - .2, T.kond + .2))} size={28} col={ICE} dark />
    <Src s="qalampir.uz: pik yuk 13,3 GVt · taxminiy hisob" y={1320} a={eout(P(t, T.gvt13, T.gvt13 + .4))} />
    <Head t={t} t0={10.95} t1={T.elektr - .05} y={490} lines={[['10 mln choynak'], ['22 gigavatt', 'r']]} size={88} />
    <Head t={t} t0={T.elektr - .05} t1={20.35} y={490} lines={[['tarmoq rekordi'], ['13 gigavatt', 'g']]} size={88} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 20.3, 25.15, .3, .3);
  const v = eio(P(t, T.yani, T.x15 + .3));
  const sp = eout(P(t, T.dosh - .2, T.dosh + .2));
  const dark = eout(P(t, T.berol, T.berol + .4));
  return <Layer a={a} z={logZ(P(t, 20.3, 25.15), 1, 1.04)}>
    <Glow x={CX} y={980} r={540} a={1 - dark * .6} col="236,58,44" />
    <div style={{ ...abs(CX - 200, 700), rotate: `${Math.sin(t * 40) * 1.5 * sp}deg` }}><Gauge w={400} v={lerp(.2, .99, v) + Math.sin(t * 30) * .01 * sp} red={.55} label="yuk" /></div>
    <div style={{ ...abs(SR - 160, 760) }}><Pylon h={200} spark={sp * (Math.sin(t * 25) > 0 ? 1 : .3)} /></div>
    <Num v="> ×1,5" x={CX} y={1110} a={eout(P(t, T.x15 - .2, T.x15 + .2))} size={110} col={RED} />
    <Stamp s="TARMOQ CHIDAMAYDI" x={CX} y={1300} t={t} t0={T.berol} t1={25.15} col={RED} size={52} rot={-5} />
    <Src s="22,5 ÷ 13,3 ≈ 1,7 barobar · taxminiy hisob" y={1385} a={eout(P(t, T.x15, T.x15 + .4))} />
    <Head t={t} t0={20.3} t1={25.15} y={490} lines={[['rekorddan'], ['1,5 barobar ko‘p', 'r']]} size={84} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 25.1, 26.75, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={25.1} t1={26.75} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.7, 35.65, .3, .3);
  const sl = eio(P(t, T.mln2 - .3, T.mln2 + .5));
  const big = eio(P(t, T.kunlik - .3, T.kunlik + .5));
  const timer = P(t, T.d5 - .2, T.d5 + 1.2);
  return <Layer a={a} z={logZ(P(t, 26.7, 35.65), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="61,220,132" />
    <div style={{ ...abs(SL + 20, 680), opacity: 1 - big * .6 }}><Kettle w={230} t={t} boil={1} id="k6" /></div>
    <Num v={`${Math.round(5 * timer)}:00`} x={CX + 200} y={720} a={eout(P(t, T.d5 - .3, T.d5)) * (1 - big)} size={120} col={ICE} />
    <Chip s="2,2 kVt × 5 daq × 10,24 mln ≈ 1,9 mln kVt·soat" y={950} a={eout(P(t, T.hamm - .2, T.hamm + .2)) * (1 - big * .3)} col={Y} />
    {/* daily consumption block vs tiny slice */}
    <div style={{ ...abs(SL + 20, 1030), width: SR - SL - 40, height: 120, borderRadius: 16, background: '#1d2230', border: '2px solid #3a4152', overflow: 'hidden', opacity: clamp(big * 2 + sl) }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${big * 100}%`, background: 'linear-gradient(90deg,#2a4d8f,#5B8CFF)' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6 * sl, background: Y, boxShadow: '0 0 20px #FFCF3A' }} />
    </div>
    <Pill s="kunlik iste’mol: 283 mln kVt·soat" x={CX} y={1200} a={big} size={26} col={BLUE} dark />
    <Num v="< 1%" x={CX} y={1250} a={eout(P(t, T.f1 - .2, T.f1 + .2))} size={100} col={GRN} />
    <Src s="spot.uz: kunlik rekord 283 mln kVt·soat (24.01.2026) · taxminiy hisob" y={1385} a={eout(P(t, T.kunlik, T.kunlik + .4))} />
    <Head t={t} t0={26.7} t1={35.65} y={490} lines={[['energiya esa'], ['juda oz', 'g']]} size={92} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 35.6, END + 1, .3, .1);
  const aA = env(t, 35.6, T.buni - .05, .3, .3);
  const ap = eout(P(t, T.muammo - .2, T.muammo + .3));
  const q1 = eout(P(t, T.qayn - .2, T.qayn + .3)), q2 = eout(P(t, T.kelin - .2, T.kelin + .3));
  const off2 = eio(P(t, T.qayn - .2, T.qayn + .2)) * (1 - q2);
  const sync = eout(P(t, T.emas - .1, T.vaqt + .3));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={520} a={.8} />
      {/* timeline */}
      <div style={{ ...abs(SL + 20, 1000), width: SR - SL - 40, height: 8, borderRadius: 4, background: '#3a4152', opacity: sync }} />
      <div style={{ ...abs(SL + 40, 760), opacity: ap, translate: `0 ${(1 - ap) * 40}px` }}><Kettle w={190} t={t} boil={1} id="k7a" col="#f0e2c8" /></div>
      <Pill s="1. qaynona" x={SL + 135} y={1060} a={q1} size={30} col={Y} />
      <div style={{ ...abs(SR - 230, 760), opacity: ap, translate: `0 ${(1 - ap) * 40}px` }}><Kettle w={190} t={t + .4} boil={1 - off2} id="k7b" col="#c8d8f0" /></div>
      <Pill s="bir vaqtda ✗" x={CX} y={920} a={ap * (1 - eout(P(t, T.shun - .2, T.shun + .2)))} size={30} col={RED} dark />
      <Pill s="2. kelin" x={SR - 135} y={1060} a={q2} size={30} col={ICE} />
      <Pill s="bir vaqtda emas — navbat bilan ✓" x={CX} y={1200} a={eout(P(t, T.shun - .2, T.shun + .3))} size={28} col={GRN} />
      <Head t={t} t0={35.6} t1={T.buni} y={490} lines={[['muammo —'], ['bir vaqtdalikda', 'y']]} size={84} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['choy ishqibozi'], ['do‘stga yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.svet, 8, 7], [T.m10, 10, 6], [T.gvt22, 12, 6], [T.gvt13, 8, 7], [T.x15, 12, 6], [T.berol, 16, 6], [T.endi, 20, 5], [T.f1, 10, 6], [T.vaqt, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1060} r={600} a={1} col="236,58,44" />
    <div style={{ ...abs(CX + 40 - 330, 880) }}><Kettle w={200} t={1} boil={1} id="kc1" /></div>
    <div style={{ ...abs(CX + 40 - 150, 790) }}><Kettle w={300} t={1.4} boil={1} id="kc2" col="#f0e2c8" /></div>
    <div style={{ ...abs(CX + 40 + 140, 880) }}><Kettle w={200} t={1.8} boil={1} id="kc3" col="#c8d8f0" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>agar… · elektr tarmog‘i</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 108, lineHeight: 1.02, ...yel }}>HAMMA BIRDAN<br />CHOYNAK QO‘YSA?</div>
    <div style={{ ...abs(SL, 1330, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: RED }}>22 GVT &gt; 13 GVT REKORD<br /><span style={{ color: GRN }}>ENERGIYA ESA — 1% DAN KAM</span></div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>taxminiy hisob · stat.uz, qalampir.uz</div>
  </AbsoluteFill>;
};
