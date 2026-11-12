import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, rnd } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, ShareEnd, Background, Reel, flashAt } from '../kit';
import { END, T } from './ep';

/* ---------- topic art (generic router, oven, wall — no brands) ---------- */
const Router: React.FC<{ w: number; id: string; t?: number }> = ({ w, id, t = 0 }) => (
  <svg width={w} height={w * .8} viewBox="0 0 250 200" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`rb${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a4254" /><stop offset="1" stopColor="#151922" /></linearGradient>
    </defs>
    <rect x="48" y="10" width="12" height="110" rx="6" fill="#2a303d" stroke="#59627a" strokeWidth="2" transform="rotate(-10 54 120)" />
    <rect x="190" y="10" width="12" height="110" rx="6" fill="#2a303d" stroke="#59627a" strokeWidth="2" transform="rotate(10 196 120)" />
    <path d="M20 120 Q20 104 40 104 L210 104 Q230 104 230 120 L236 168 Q236 182 220 182 L30 182 Q14 182 14 168 Z" fill={`url(#rb${id})`} stroke="#59627a" strokeWidth="2" />
    <path d="M30 110 L220 110" stroke="#ffffff" strokeOpacity=".18" strokeWidth="3" />
    {[0, 1, 2, 3, 4].map(i => <circle key={i} cx={70 + i * 28} cy="150" r="6" fill={i === 2 ? (Math.sin(t * 14) > 0 ? '#3DDC84' : '#1f5a3a') : '#3DDC84'} opacity=".95" />)}
  </svg>
);

/* expanding Wi-Fi rings from (x,y); rings fade after wall at wx by factor k */
const Rings: React.FC<{ t: number; x: number; y: number; maxR: number; a: number; col?: string; wx?: number; k?: number; id: string; n?: number }> = ({ t, x, y, maxR, a, col = ICE, wx = 99999, k = 1, id, n = 5 }) => {
  if (a <= 0) return null;
  return <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, opacity: a, overflow: 'visible' }}>
    <defs>
      <clipPath id={`cl${id}`}><rect x={0} y={0} width={wx} height={1920} /></clipPath>
      <clipPath id={`cr${id}`}><rect x={wx} y={0} width={2000} height={1920} /></clipPath>
    </defs>
    {Array.from({ length: n }).map((_, i) => {
      const p = ((t * .55 + i / n) % 1);
      const r = 30 + p * maxR, o = (1 - p) * .9;
      return <g key={i}>
        <circle cx={x} cy={y} r={r} fill="none" stroke={col} strokeWidth={7} opacity={o} clipPath={`url(#cl${id})`} />
        <circle cx={x} cy={y} r={r} fill="none" stroke={col} strokeWidth={7 * Math.max(k, .35)} opacity={o * k} clipPath={`url(#cr${id})`} />
      </g>;
    })}
  </svg>;
};

const Wall: React.FC<{ x: number; y: number; w: number; h: number; kind: 'brick' | 'concrete' | 'gips'; a?: number }> = ({ x, y, w, h, kind, a = 1 }) => {
  const rows = Math.floor(h / 34);
  return <div style={{ ...abs(x, y, w), height: h, opacity: a }}>
    <svg width={w} height={h} style={{ display: 'block' }}>
      {kind === 'brick' && <>
        <rect width={w} height={h} fill="#5a2a22" />
        {Array.from({ length: rows }).map((_, r) => Array.from({ length: 4 }).map((_, c) =>
          <rect key={`${r}-${c}`} x={(r % 2 ? -w / 4 : 0) + c * w / 2 + 3} y={r * 34 + 3} width={w / 2 - 6} height={28} rx="3" fill={(r + c) % 3 ? '#b4513c' : '#9c4434'} />))}
      </>}
      {kind === 'concrete' && <>
        <rect width={w} height={h} fill="#7c838f" />
        {Array.from({ length: 60 }).map((_, i) => { const r = rnd(i + 9); return <circle key={i} cx={r() * w} cy={r() * h} r={1.5 + r() * 3} fill="#5d636d" opacity=".8" />; })}
        <rect width={w} height={h} fill="none" stroke="#a7aeb9" strokeWidth="4" />
      </>}
      {kind === 'gips' && <><rect width={w} height={h} fill="#e3e1da" /><rect width={w} height={h} fill="none" stroke="#b8b5ab" strokeWidth="4" /></>}
    </svg>
  </div>;
};

const Bars: React.FC<{ v: number; w: number; col: string }> = ({ v, w, col }) => (
  <svg width={w} height={w * .8} viewBox="0 0 100 80" style={{ display: 'block' }}>
    {[0, 1, 2, 3].map(i => <rect key={i} x={6 + i * 24} y={60 - i * 18} width="16" height={18 + i * 18} rx="3" fill={v * 4 > i + .15 ? col : '#2a2f3a'} />)}
  </svg>
);

const Oven: React.FC<{ w: number; on: number; t: number; id: string }> = ({ w, on, t, id }) => (
  <svg width={w} height={w * .62} viewBox="0 0 400 248" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`ov${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9edf3" /><stop offset="1" stopColor="#9aa2b0" /></linearGradient>
      <radialGradient id={`ol${id}`} cx=".5" cy=".55" r=".6"><stop offset="0" stopColor="#FFCF3A" stopOpacity={.9 * on} /><stop offset="1" stopColor="#EC3A2C" stopOpacity={.25 * on} /></radialGradient>
    </defs>
    <rect x="4" y="4" width="392" height="236" rx="22" fill={`url(#ov${id})`} />
    <rect x="28" y="30" width="250" height="186" rx="14" fill="#141820" />
    <rect x="28" y="30" width="250" height="186" rx="14" fill={`url(#ol${id})`} />
    {Array.from({ length: 8 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => <circle key={`${r}${c}`} cx={44 + c * 20} cy={48 + r * 22} r="3" fill="#0b0d12" opacity=".55" />))}
    <ellipse cx="153" cy={176} rx="70" ry="14" fill="#3a3f4a" opacity=".9" />
    <g transform={`rotate(${t * 60 * on} 153 160)`}><rect x="118" y="146" width="70" height="28" rx="10" fill="#d9a55a" /></g>
    <rect x="296" y="30" width="80" height="46" rx="8" fill="#0b0d12" />
    <text x="336" y="62" textAnchor="middle" fontFamily="JBM, monospace" fontSize="24" fill="#3DDC84">{on > .5 ? '1:30' : '0:00'}</text>
    {[0, 1, 2].map(i => <circle key={i} cx="336" cy={112 + i * 40} r="13" fill="#5d6574" />)}
  </svg>
);

const TV: React.FC<{ w: number; t: number; frozen: number }> = ({ w, t, frozen }) => (
  <svg width={w} height={w * .7} viewBox="0 0 300 210" style={{ display: 'block', overflow: 'visible' }}>
    <rect x="4" y="4" width="292" height="176" rx="12" fill="#0d1017" stroke="#59627a" strokeWidth="4" />
    <rect x="16" y="16" width="268" height="152" rx="6" fill="#1f3550" />
    <circle cx="90" cy="110" r="34" fill="#e2b48a" /><rect x="60" y="140" width="60" height="28" rx="10" fill="#8a3a2f" />
    <circle cx="200" cy="104" r="30" fill="#c99872" /><rect x="172" y="132" width="56" height="36" rx="10" fill="#3a5a8a" />
    {frozen > 0 && <g opacity={frozen}>
      <rect x="16" y="16" width="268" height="152" rx="6" fill="#000" opacity=".55" />
      {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={150 + 26 * Math.cos(i * .785)} cy={92 + 26 * Math.sin(i * .785)} r="6" fill="#fff" opacity={((i - Math.floor(t * 10)) % 8 + 8) % 8 / 8} />)}
    </g>}
    <rect x="130" y="180" width="40" height="18" fill="#2a303d" /><rect x="96" y="196" width="108" height="10" rx="5" fill="#2a303d" />
  </svg>
);

const Person: React.FC<{ h: number }> = ({ h }) => (
  <svg width={h * .45} height={h} viewBox="0 0 90 200" style={{ display: 'block' }}>
    <circle cx="45" cy="28" r="24" fill="#c9cfd9" />
    <path d="M10 200 L14 90 Q14 60 45 60 Q76 60 76 90 L80 200 Z" fill="#c9cfd9" />
    <path d="M18 120 L72 120 L74 200 L16 200 Z" fill="#5B8CFF" opacity=".55" />
  </svg>
);

const Drop: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * 1.3} viewBox="0 0 60 78" style={{ display: 'block' }}>
    <path d="M30 4 Q52 36 52 50 A22 22 0 0 1 8 50 Q8 36 30 4 Z" fill="#5B8CFF" />
    <path d="M20 50 Q20 40 26 34" stroke="#fff" strokeWidth="4" fill="none" opacity=".6" />
  </svg>
);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.95, .2, .3);
  const beam = eout(P(t, T.yorug - .3, T.yorug + .2));
  return <Layer a={a} z={logZ(P(t, -1, 3.95), 1, 1.05)}>
    <Glow x={CX} y={1020} r={520} a={.85} col="91,140,255" />
    <Rings t={t} x={210} y={1080} maxR={680} a={1} wx={530} k={.6} id="h" />
    <Wall x={480} y={760} w={110} h={620} kind="brick" />
    <div style={{ ...abs(SL + 10, 1090) }}><Router w={240} id="a" t={t} /></div>
    <div style={{ ...abs(700, 920) }}><Phone w={190} id="p1"><div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}><Bars v={.75} w={110} col={GRN} /></div></Phone></div>
    {/* flashlight beam stops at the wall */}
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, opacity: beam }}>
      <path d={`M120 820 L${lerp(120, 480, beam)} 770 L${lerp(120, 480, beam)} 880 Z`} fill={Y} opacity=".5" />
      <rect x="70" y="805" width="60" height="30" rx="8" fill="#c7cedb" />
    </svg>
    <Pill s="yorug‘lik o‘tmaydi ✗" x={290} y={940} a={eout(P(t, T.otmay - .2, T.otmay + .2))} size={26} col={RED} dark />
    <Head t={t} t0={-1} t1={3.95} y={490} lines={[['wi-fi devordan'], ['qanday o‘tadi?', 'y']]} size={88} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 3.85, 12.8, .3, .3);
  const wv = eout(P(t, T.radio - .3, T.tolqin + .3));
  const ruler = eout(P(t, T.bitta - .2, T.bitta + .4));
  const wallA = eback(P(t, T.gisht - .3, T.gisht + .3));
  const loss = eio(P(t, T.devorda - .3, T.yoq + .3));
  const N = 200; const wx = 560;
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const x = SL + i * (SR - SL) / N;
    const amp = 90 * (x > wx && wallA > .5 ? lerp(1, .35, loss) : 1);
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${(1040 + Math.sin((x - t * 240) / 260 * 2 * Math.PI) * amp * wv).toFixed(1)}`;
  }).join(' ');
  return <Layer a={a} z={logZ(P(t, 3.85, 12.8), 1, 1.03)}>
    <Glow x={CX} y={1040} r={540} a={.8} col="155,227,255" />
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
      <path d={pts} stroke={ICE} strokeWidth="9" fill="none" strokeLinecap="round" />
    </svg>
    {/* one wavelength bracket */}
    <div style={{ ...abs(170, 860, 260), height: 30, borderLeft: `4px solid ${Y}`, borderRight: `4px solid ${Y}`, borderTop: `4px solid ${Y}`, opacity: ruler * (1 - wallA) }} />
    <Num v="≈12 sm" x={300} y={720} a={eout(P(t, T.sm12 - .2, T.sm12 + .2)) * (1 - wallA)} size={110} />
    <Pill s="300 000 km/s ÷ 2,4 GHz = 12,5 sm" x={CX} y={1250} a={eout(P(t, T.sm12, T.sm12 + .4)) * (1 - wallA)} size={30} col={Y} />
    <Src s="hisob: to‘lqin uzunligi = yorug‘lik tezligi ÷ chastota" y={1320} a={eout(P(t, T.sm12, T.sm12 + .4)) * (1 - wallA)} />
    <div style={{ ...abs(wx - 50, 830), opacity: clamp(wallA), transform: `scaleY(${clamp(wallA, 0, 1.1)})` }}><Wall x={0} y={0} w={100} h={420} kind="gips" /></div>
    <Pill s="gips · g‘isht — o‘tadi ✓" x={300} y={1300} a={eout(P(t, T.otib - .2, T.otib + .2))} size={28} col={GRN} dark />
    <Pill s="lekin kuchsizlanadi" x={760} y={1300} a={eout(P(t, T.yoq - .3, T.yoq + .1))} size={28} col={RED} dark />
    <Head t={t} t0={3.85} t1={12.8} y={490} lines={[['wi-fi —'], ['radio to‘lqin', 'y']]} size={96} />
  </Layer>;
};

const WallRow: React.FC<{ t: number; y: number; kind: 'brick' | 'concrete'; label: string; mult: string; v: number; a: number; at: number; id: string }> = ({ t, y, kind, label, mult, v, a, at, id }) => {
  if (a <= 0) return null;
  const drop = eio(P(t, at - .3, at + .5));
  return <div style={{ ...abs(SL, y, SR - SL), height: 270, opacity: a, borderRadius: 24, border: `2px solid rgba(255,255,255,.14)`, background: 'rgba(14,16,22,.6)', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: 30, top: 55 }}><Bars v={1} w={130} col={GRN} /></div>
    <div style={{ position: 'absolute', left: 30, top: 175, fontFamily: SANS, fontWeight: 800, fontSize: 24, color: GR }}>oldin · 100 %</div>
    <Wall x={260} y={0} w={110} h={270} kind={kind} />
    <div style={{ position: 'absolute', left: 594, top: 190, fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, opacity: drop }}>{label} devor</div>
    <div style={{ position: 'absolute', left: 410, top: 55 }}><Bars v={lerp(1, v, drop)} w={130} col={drop > .5 ? RED : GRN} /></div>
    <div style={{ position: 'absolute', left: 410, top: 175, fontFamily: SANS, fontWeight: 800, fontSize: 24, color: drop > .5 ? RED : GR }}>keyin · {Math.round(lerp(100, v * 100, drop))} %</div>
    <div style={{ position: 'absolute', left: 590, top: 70, fontFamily: HEAD, fontWeight: 700, fontSize: 120, lineHeight: 1, opacity: drop, ...yel }}>{mult}</div>
  </div>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 12.75, 18.15, .3, .3);
  return <Layer a={a} z={logZ(P(t, 12.75, 18.15), 1, 1.03)}>
    <Glow x={CX} y={1000} r={540} a={.8} />
    <WallRow t={t} y={745} kind="brick" label="g‘isht" mult="÷6" v={.16} a={eout(P(t, T.gisht2 - .4, T.gisht2))} at={T.x6} id="b" />
    <WallRow t={t} y={1065} kind="concrete" label="beton" mult="÷16" v={.06} a={eout(P(t, T.beton - .4, T.beton))} at={T.x16} id="c" />
    <Src s="networkacademy.io: g‘isht −8 dB, beton −12 dB · hisob, taxminan" y={1360} a={eout(P(t, T.x6, T.x6 + .4))} />
    <Head t={t} t0={12.75} t1={18.15} y={490} lines={[['har devor'], ['kuchni yeydi', 'r']]} size={92} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 18.1, 21.15, .3, .2);
  const pp = eback(P(t, T.odam - .3, T.odam + .3)), d = eback(P(t, T.suv - .3, T.suv + .2));
  return <Layer a={a} z={logZ(P(t, 18.1, 21.15), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.8} col="91,140,255" />
    <Rings t={t} x={180} y={1080} maxR={650} a={1} wx={510} k={1 - .6 * clamp(pp)} id="o" />
    <div style={{ ...abs(SL, 1110) }}><Router w={200} id="b" t={t} /></div>
    <div style={{ ...abs(420, 760 + (1 - clamp(pp)) * 80), opacity: clamp(pp) }}><Person h={560} /></div>
    <div style={{ ...abs(720, 930) }}><Phone w={170} id="p2"><div style={{ display: 'flex', justifyContent: 'center', paddingTop: 70 }}><Bars v={lerp(.9, .3, clamp(pp))} w={100} col={pp > .5 ? RED : GRN} /></div></Phone></div>
    <div style={{ ...abs(560, 830), opacity: clamp(d), scale: String(clamp(d, 0, 1.2)) }}><Drop w={90} /></div>
    <Pill s="tana ≈ suv · −6…−15 dB" x={CX} y={1300} a={eout(P(t, T.suv - .2, T.suv + .2))} size={30} col={BLUE} />
    <Src s="networkacademy.io · odam tanasi 6–15 dB" y={1360} a={eout(P(t, T.suv, T.suv + .3))} />
    <Head t={t} t0={18.1} t1={21.15} y={490} lines={[['hatto odam ham'], ['to‘sadi', 'r']]} size={92} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 21.1, 22.7, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={21.1} t1={22.7} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 22.65, 34.95, .3, .3);
  const ov = eback(P(t, T.mikro - .3, T.mikro + .3));
  const f1 = eout(P(t, T.f24 - .2, T.f24 + .2)), f2 = eout(P(t, T.f245 - .2, T.f245 + .2));
  const pw = P(t, T.w800 - 1.2, T.w800 - .7) > 0 ? 1 : 0;
  const b1 = eout(P(t, T.w800 - .2, T.w800 + .5)), b2 = eout(P(t, T.mw100 - .2, T.mw100 + .3));
  const fr = 1 - eio(P(t, T.w800 - 1.0, T.w800 - .4));
  return <Layer a={a} z={logZ(P(t, 22.65, 34.95), 1, 1.03)}>
    <Glow x={CX} y={980} r={560} a={.9} col={t > T.w800 ? '236,58,44' : '246,185,59'} />
    <div style={{ ...abs(CX - 260, 730 + (1 - clamp(ov)) * 60), opacity: clamp(ov) }}><Oven w={520} on={eout(P(t, T.mikro, T.mikro + .6))} t={t} id="a" /></div>
    {/* frequency comparison */}
    <div style={{ opacity: fr }}>
      <Card x={SL + 10} y={1110} w={400} a={f1}>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: ICE }}>Wi-Fi router</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 96, color: ICE, lineHeight: 1.05 }}>2,4 GHz</div>
      </Card>
      <Card x={SR - 410} y={1110} w={400} a={f2}>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: Y }}>mikroto‘lqinli pech</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 96, color: Y, lineHeight: 1.05 }}>2,45 GHz</div>
      </Card>
      <Src s="scienceabc.com · pech 2,45 GHz, Wi-Fi 2,4 / 5 GHz" y={1365} a={f2} />
    </div>
    {/* power bars */}
    <div style={{ opacity: pw }}>
      <div style={{ ...abs(SL + 20, 1100), fontFamily: SANS, fontWeight: 800, fontSize: 28, color: Y, opacity: b1 }}>pech · kamida 800 W</div>
      <div style={{ ...abs(SL + 20, 1145, (SR - SL - 40) * b1), height: 56, borderRadius: 12, background: `linear-gradient(90deg, ${Y}, ${RED})` }} />
      <div style={{ ...abs(SL + 20, 1225), fontFamily: SANS, fontWeight: 800, fontSize: 28, color: ICE, opacity: b2 }}>router · ko‘pi bilan 0,1 W (100 mW)</div>
      <div style={{ ...abs(SL + 20, 1270, 6 * b2), height: 56, borderRadius: 4, background: ICE }} />
      <Src s="ispreview.co.uk: 800 W+ · ETSI (Yevropa): 100 mW · hisob" y={1365} a={b2} />
    </div>
    <Stamp s="8 000 BAROBAR" x={CX} y={990} t={t} t0={T.x8000 - .05} t1={34.95} col={RED} size={60} rot={-5} />
    <Head t={t} t0={22.65} t1={T.w800 - .5} y={490} lines={[['pech ham'], ['shu to‘lqinda', 'y']]} size={92} />
    <Head t={t} t0={T.w800 - .5} t1={34.95} y={490} lines={[['lekin kuchi'], ['juda boshqa', 'r']]} size={92} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 34.9, 41.7, .3, .3);
  const lk = eout(P(t, T.ozgina - .3, T.chiqib + .3));
  const tv = eout(P(t, T.onangiz - .4, T.onangiz + .2)), fz = eout(P(t, T.serial - .1, T.qotib + .1));
  return <Layer a={a} z={logZ(P(t, 34.9, 41.7), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} />
    <div style={{ ...abs(SL, 720) }}><Oven w={400} on={1} t={t} id="b" /></div>
    <div style={{ ...abs(SL - 6, 714, 412), height: 260, borderRadius: 26, border: `6px solid ${GR}`, opacity: eout(P(t, T.temir - .2, T.temir + .3)) }} />
    <Pill s="temir quti ushlaydi ✓" x={270} y={1010} a={eout(P(t, T.ushlaydi - .3, T.ushlaydi + .2))} size={26} col={GRN} dark />
    <Rings t={t} x={470} y={850} maxR={420} a={lk * .6} col={Y} id="lk" n={3} />
    <div style={{ ...abs(560, 1080), opacity: tv }}><TV w={340} t={t} frozen={fz} /></div>
    <Pill s="serial qotdi…" x={730} y={1350} a={fz} size={28} col={RED} dark />
    <Card x={SL + 10} y={1120} w={430} a={eout(P(t, T.onangiz, T.onangiz + .4))}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: GRN }}>maslahat</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, lineHeight: 1.2 }}>5 GHz tarmoqqa o‘ting yoki routerni pechdan uzoqroq qo‘ying</div>
    </Card>
    <Src s="ispreview.co.uk · 5 GHz shovqindan qochadi" y={1380} a={eout(P(t, T.onangiz + .3, T.onangiz + .7))} />
    <Head t={t} t0={34.9} t1={41.7} y={490} lines={[['ozgina sizadi —'], ['serial qotadi', 'y']]} size={88} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['routerni yashirgan'], ['do‘stga yuboring', 'y']]} />;

const HITS: [number, number, number][] = [[T.otmay, 6, 7], [T.sm12, 8, 7], [T.x6, 10, 6], [T.x16, 12, 6], [T.odam, 6, 7], [T.endi, 20, 5], [T.f245, 8, 7], [T.w800, 8, 7], [T.x8000, 14, 6], [T.qotib, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1050} r={620} a={1} col="91,140,255" />
    <Rings t={.3} x={230} y={1130} maxR={700} a={1} wx={540} k={.5} id="cv" />
    <Wall x={500} y={820} w={120} h={540} kind="brick" />
    <div style={{ ...abs(SL + 20, 1120) }}><Router w={260} id="cv" t={0} /></div>
    <div style={{ ...abs(700, 900) }}><Phone w={200} id="pc"><div style={{ display: 'flex', justifyContent: 'center', paddingTop: 84 }}><Bars v={.5} w={110} col={Y} /></div></Phone></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>qanday? · fizika</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>WI-FI DEVORDAN<br />QANDAY O‘TADI?</div>
    <div style={{ ...abs(SL, 1420, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: RED }}>BETON DEVOR: 16 BAROBAR KUCHSIZ<br /><span style={{ color: Y }}>PECH BILAN BIR CHASTOTADA</span></div>
    <div style={{ ...abs(SL, 1580, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>networkacademy.io · scienceabc.com</div>
  </AbsoluteFill>;
};
