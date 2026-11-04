import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, YL, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, Avatar, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

const SEA = '#2F7DF6', SEA2 = '#0E3B7A';

/* ---------- art ---------- */
const Waves: React.FC<{ t: number; w: number; h: number; id: string; amp?: number }> = ({ t, w, h, id, amp = 14 }) => (
  <svg width={w} height={h} style={{ display: 'block' }}>
    <defs><linearGradient id={`wv${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={SEA} /><stop offset="1" stopColor={SEA2} /></linearGradient></defs>
    {[0, 1, 2].map((k) => {
      const y0 = 20 + k * 26; let d = `M0 ${h} L0 ${y0}`;
      for (let x = 0; x <= w; x += 20) d += ` L${x} ${y0 + Math.sin(x / 60 + t * (1.6 + k * .4) + k) * amp * (1 - k * .25)}`;
      return <path key={k} d={d + ` L${w} ${h} Z`} fill={`url(#wv${id})`} opacity={.45 + k * .25} />;
    })}
  </svg>
);
const Umbrella: React.FC<{ w: number; col?: string }> = ({ w, col = RED }) => (
  <svg width={w} height={w} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>
    <path d="M8 40 Q50 -6 92 40 Q80 34 71 40 Q60 32 50 40 Q40 32 29 40 Q20 34 8 40 Z" fill={col} stroke="#00000055" strokeWidth="1.5" />
    <path d="M29 40 Q40 10 50 4 Q60 10 71 40" fill="none" stroke="#ffffff55" strokeWidth="2" />
    <line x1="50" y1="40" x2="54" y2="98" stroke="#e8e2d0" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);
const Truck: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * .5} viewBox="0 0 200 100" style={{ display: 'block' }}>
    <rect x="4" y="14" width="124" height="62" rx="6" fill="#d9dee8" stroke="#8b94a8" strokeWidth="3" />
    <path d="M132 34 H168 L192 56 V76 H132 Z" fill={Y} stroke="#8a6a12" strokeWidth="3" />
    <rect x="146" y="40" width="22" height="16" rx="3" fill="#1b2130" />
    {[40, 100, 168].map((x) => <g key={x}><circle cx={x} cy="82" r="13" fill="#1a1d24" /><circle cx={x} cy="82" r="5" fill="#9aa3b5" /></g>)}
  </svg>
);
const Ship: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * .55} viewBox="0 0 200 110" style={{ display: 'block' }}>
    {[0, 1, 2, 3].map((i) => <rect key={i} x={40 + i * 30} y={30 - (i % 2) * 18} width="28" height={(i % 2) * 18 + 30} rx="2" fill={[RED, Y, BLUE, GRN][i]} stroke="#00000055" />)}
    <rect x="150" y="16" width="26" height="44" rx="3" fill="#e8ecf4" /><rect x="154" y="22" width="18" height="8" fill="#1b2130" />
    <path d="M6 60 H196 L176 100 H26 Z" fill="#2a2f3b" stroke="#c7cedb" strokeWidth="3" />
    <rect x="20" y="66" width="164" height="6" fill={RED} />
  </svg>
);
const Train: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * .3} viewBox="0 0 300 90" style={{ display: 'block' }}>
    <path d="M6 70 V30 Q6 12 30 12 H86 V70 Z" fill={Y} stroke="#8a6a12" strokeWidth="3" />
    <rect x="22" y="22" width="26" height="18" rx="3" fill="#1b2130" />
    {[96, 196].map((x) => <rect key={x} x={x} y="20" width="94" height="50" rx="5" fill="#d9dee8" stroke="#8b94a8" strokeWidth="3" />)}
    {[26, 66, 116, 170, 216, 270].map((x) => <circle key={x} cx={x} cy="76" r="9" fill="#1a1d24" />)}
  </svg>
);
/* stylised country outline (not a real map) */
const blob = (cx: number, cy: number, R: number, n = 160) => {
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; const r = R * (1 + .13 * Math.sin(3 * a + .6) + .07 * Math.sin(5 * a + 2) + .04 * Math.sin(9 * a));
    pts.push([cx + r * Math.cos(a) * 1.25, cy + r * Math.sin(a) * .78]); }
  return pts;
};
const BL = blob(CX, 960, 300);
const blobPath = (pts: [number, number][]) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L') + ' Z';

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.8, .2, .3);
  return <Layer a={a} z={logZ(P(t, -1, 3.8), 1, 1.06)}>
    <Glow x={CX + 120} y={760} r={300} a={1} />
    <div style={{ position: 'absolute', left: CX + 60, top: 700, width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle,#FFE9A8,#FFCF3A 60%,#F2A322)', boxShadow: '0 0 80px rgba(255,207,58,.6)' }} />
    <div style={{ ...abs(SL - 70, 960) }}><Waves t={t} w={1000} h={300} id="h1" amp={18} /></div>
    <div style={{ ...abs(SL - 70, 1240), width: 1000, height: 170, background: 'linear-gradient(180deg,#e9cf8f,#b98f4a)', borderRadius: '40% 40% 0 0 / 20% 20% 0 0' }} />
    <div style={{ ...abs(CX - 260, 1110) }}><Umbrella w={210} /></div>
    <div style={{ ...abs(CX + 120, 1150) }}><Umbrella w={170} col={Y} /></div>
    <Pill s="qancha plyaj?" x={CX} y={900} a={eout(P(t, T.dengizi, T.dengizi + .3))} size={30} />
    <Head t={t} t0={-1} t1={3.8} y={490} lines={[['agar o‘zbekistonda'], ['dengiz bo‘lsa?', 'y']]} size={68} />
  </Layer>;
};

const Rings: React.FC<{ t: number; t0: number; s: number; label: string; id: string }> = ({ t, t0, s, label, id }) => {
  const k1 = eback(P(t, t0, t0 + .5)), k2 = eback(P(t, t0 + .5, t0 + 1.0)), k3 = eback(P(t, t0 + 1.0, t0 + 1.5));
  return <svg width={600 * s} height={600 * s} viewBox="0 0 600 600" style={{ display: 'block', overflow: 'visible' }}>
    <defs><radialGradient id={`rs${id}`}><stop offset=".7" stopColor={SEA} /><stop offset="1" stopColor={SEA2} /></radialGradient></defs>
    <circle cx="300" cy="300" r={290 * clamp(k3, 0, 1.1)} fill={`url(#rs${id})`} opacity=".85" />
    <circle cx="300" cy="300" r={215 * clamp(k2, 0, 1.1)} fill="#4a5163" stroke="#7f8899" strokeWidth="3" />
    <circle cx="300" cy="300" r={120 * clamp(k1, 0, 1.1)} fill={Y} stroke="#8a6a12" strokeWidth="4" />
    <text x="300" y="312" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="40" fill="#1A1306" opacity={clamp(k1)}>{label}</text>
    <text x="300" y="148" textAnchor="middle" fontFamily="JBM, monospace" fontSize="24" fill={WH} opacity={clamp(k2)}>qo‘shnilar · dengiz yo‘q</text>
    <text x="300" y="45" textAnchor="middle" fontFamily="JBM, monospace" fontSize="24" fill={WH} opacity={clamp(k3)}>okean</text>
  </svg>;
};
const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 3.7, 10.9, .3, .3);
  const sh = eio(P(t, T.lixt - .4, T.lixt + .2));
  return <Layer a={a}>
    <Glow x={CX} y={960} r={520} a={.8} col="47,125,246" />
    <div style={{ ...abs(lerp(CX - 300, CX - 420, sh), lerp(680, 760, sh)), scale: String(lerp(1, .72, sh)), transformOrigin: '0 0' }}><Rings t={t} t0={T.dunyoda} s={1} label="UZ" id="a" /></div>
    {sh > 0 && <div style={{ ...abs(CX + 70, 820), opacity: sh }}><Rings t={t} t0={T.lixt - .4} s={.62} label="LI" id="b" /></div>}
    <Pill s="1-qavat" x={CX + 290} y={760} a={env(t, T.qavat - .1, T.lixt - .4, .2, .3)} size={26} col={WH} dark />
    <Pill s="2-qavat" x={CX + 330} y={1240} a={env(t, T.qavat + .2, T.lixt - .4, .2, .3)} size={26} col={SEA} dark />
    <Pill s="O‘zbekiston" x={CX - 200} y={1280} a={eout(P(t, T.lixt - .1, T.lixt + .3))} size={28} />
    <Pill s="Lixtenshteyn" x={CX + 260} y={1280} a={eout(P(t, T.lixt, T.lixt + .3))} size={28} />
    <Src s="Britannica · «doubly landlocked»" y={1360} a={eout(P(t, T.lixt, T.lixt + .4))} />
    <Head t={t} t0={3.7} t1={T.uzb2 - .2} y={490} lines={[['dunyoda'], ['faqat 2 davlat', 'y']]} size={68} from="slam" />
    <Head t={t} t0={T.uzb2 - .2} t1={10.9} y={490} lines={[['ikki qavat'], ['quruqlik ichida', 'y']]} size={62} />
  </Layer>;
};

const STOPS: [string, number][] = [['Toshkent', 0], ['Termiz', .26], ['Mozori Sharif', .36], ['Kobul', .55], ['Peshovar', .72], ['Karachi', 1]];
const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 10.8, 21.4, .3, .3);
  const x0 = SL + 140, y0 = 700, y1 = 1300;
  const pr = eio(P(t, T.tosh - .1, T.hafta + .2));
  const km = 2760 * eio(P(t, T.n2760 - .2, T.n2760 + 1.4));
  const sea = eout(P(t, T.okean - .2, T.karachi + .2));
  return <Layer a={a} z={logZ(P(t, 10.8, 21.4), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.8} col="47,125,246" />
    <div style={{ ...abs(SL - 40, y1 + 10), opacity: sea }}><Waves t={t} w={940} h={120} id="r" amp={8} /></div>
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
      <line x1={x0} y1={y0} x2={x0} y2={y1} stroke="#2a3040" strokeWidth="14" strokeLinecap="round" />
      <line x1={x0} y1={y0} x2={x0} y2={lerp(y0, y1, pr)} stroke={Y} strokeWidth="14" strokeLinecap="round" />
      {STOPS.map(([n, f], i) => { const on = pr >= f - .001; const y = lerp(y0, y1, f);
        return <g key={i} opacity={eout(P(t, 11 + i * .25, 11.4 + i * .25))}><circle cx={x0} cy={y} r={i === 0 || i === 5 ? 20 : 13} fill={on ? (i === 5 ? SEA : Y) : '#2a3040'} stroke="#06070a" strokeWidth="4" />
          <text x={x0 + 40} y={y + 11} fontFamily="Int, sans-serif" fontWeight="800" fontSize={i === 0 || i === 5 ? 36 : 28} fill={on ? WH : GR}>{n}</text></g>; })}
    </svg>
    <div style={{ ...abs(x0 - 60, lerp(y0, y1, pr) - 30), rotate: '90deg' }}><Truck w={120} /></div>
    <Card x={CX + 110} y={880} w={330} a={eout(P(t, T.n2760 - .3, T.n2760 + .1))}>
      <div style={{ padding: '18px 22px', textAlign: 'center' }}>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: Y, whiteSpace: 'nowrap' }}>{fmt(km)} km</div>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>yuk mashinasida</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: WH, marginTop: 8, opacity: eout(P(t, T.taxminan, T.hafta)) }}>≈ 7 kun</div>
      </div>
    </Card>
    <Src s="kun.uz · 2022 · Toshkent – Karachi yo‘nalishi" y={1190} a={eout(P(t, T.n2760, T.n2760 + .4))} />
    <Head t={t} t0={10.8} t1={T.eng - .1} y={490} lines={[['qo‘shnilarda ham'], ['dengiz yo‘q', 'r']]} size={62} />
    <Head t={t} t0={T.eng - .1} t1={21.4} y={490} lines={[['eng yaqin port —'], ['Karachi', 'y']]} size={64} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 21.3, 29.3, .3, .3);
  const b1 = eout(P(t, T.dengizga - .2, T.dengizga + .5)), b2 = eio(P(t, T.savdo - .2, T.n30 + .4));
  const bx = SL + 110, bw = 260, base = 1290;
  return <Layer a={a} z={logZ(P(t, 21.3, 29.3), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} col={b2 > .9 ? '236,58,44' : '246,185,59'} />
    <div style={{ ...abs(CX - 160, 690), opacity: env(t, 21.3, T.dengizga - .1, .3, .3) }}><Ship w={320} /></div>
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
      <rect x={bx} y={base - 400 * b1} width={bw} height={400 * b1} rx="12" fill={SEA} />
      <rect x={bx + 340} y={base - 520 * b2} width={bw} height={520 * b2} rx="12" fill={RED} />
      <line x1={SL} x2={SR} y1={base} y2={base} stroke="#c7cedb" strokeOpacity=".4" strokeWidth="3" />
    </svg>
    <div style={{ ...abs(bx, base + 14, bw), textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH, opacity: b1 }}>dengizi bor</div>
    <div style={{ ...abs(bx + 340, base + 14, bw), textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH, opacity: b2 > 0 ? 1 : 0 }}>dengizsiz</div>
    <div style={{ ...abs(bx, base - 400 * b1 + 20, bw), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: WH, opacity: b1 }}>100</div>
    <Num v={`+${Math.round(30 * b2)}%`} x={bx + 340 + bw / 2} y={base - 520 * b2 + 20} a={b2 > .05 ? 1 : 0} size={78} col={WH} />
    <Src s="BMT · dengizga chiqa olmaydigan rivojlanayotgan davlatlar · savdo xarajati" y={1360} a={eout(P(t, T.n30, T.n30 + .4))} />
    <Head t={t} t0={21.3} t1={T.bmt - .1} y={490} lines={[['tashish'], ['qimmat', 'r']]} size={84} from="slam" />
    <Head t={t} t0={T.bmt - .1} t1={29.3} y={490} lines={[['savdo xarajati'], ['+30%', 'r']]} size={66} />
  </Layer>;
};

const S56: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 29.2, 39.1, .15, .3);
  const aA = env(t, 29.2, T.tasavvur - .05, .1, .3), aB = env(t, T.tasavvur - .2, 39.1, .3, .3);
  const tr = eio(P(t, T.chegara - .2, T.n7090 + 1.2));
  const km = 7090 * tr;
  const cs = eio(P(t, T.n5 - .2, T.qirgoq + .4));
  const coast = BL.slice(118, 118 + Math.max(2, Math.round(160 * .05 * 1) + 1));
  const beach = eout(P(t, T.n350 - .2, T.n350 + .4));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} col="236,58,44" />
      <Head t={t} t0={29.2} t1={T.tasavvur - .05} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.tasavvur, 39.1), 1, 1.05)}>
      <Glow x={CX} y={960} r={540} a={.8} col={cs > .5 ? '47,125,246' : '246,185,59'} />
      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
        <defs><filter id="cg"><feGaussianBlur stdDeviation="10" /></filter></defs>
        <path d={blobPath(BL)} fill="#1a2030" opacity={.9} />
        <path d={blobPath(BL)} fill="none" stroke={Y} strokeWidth="8" strokeLinejoin="round" pathLength={1} strokeDasharray={`${tr} 1`} />
        {cs > 0 && <><path d={'M' + coast.map(([x, y]) => `${x} ${y}`).join(' L')} fill="none" stroke={SEA} strokeWidth="40" strokeLinecap="round" opacity={cs * .6} filter="url(#cg)" />
          <path d={'M' + coast.map(([x, y]) => `${x} ${y}`).join(' L')} fill="none" stroke={SEA} strokeWidth="18" strokeLinecap="round" pathLength={1} strokeDasharray={`${cs} 1`} /></>}
      </svg>
      <Num v={`${fmt(km)} km`} y={900} a={eout(P(t, T.chegara - .2, T.chegara + .2)) * (1 - cs)} size={110} />
      <Num v="350+ km" y={900} a={cs} size={110} col={ICE} />
      <div style={{ ...abs(CX - 130, 1040), opacity: beach, display: 'flex', gap: 20 }}><Umbrella w={110} /><Umbrella w={90} col={Y} /><Umbrella w={110} col={GRN} /></div>
      <Pill s="7 090 × 5% ≈ 354 km" x={CX} y={1240} a={eout(P(t, T.n350 - .1, T.n350 + .3))} size={28} dark />
      <Src s="chegara: gov.uz · shakl shartli · 5% — tasavvur" y={1340} a={eout(P(t, T.n7090, T.n7090 + .4))} />
      <Head t={t} t0={T.tasavvur - .2} t1={T.shundan - .1} y={490} lines={[['chegaramiz'], ['7 090 km', 'y']]} size={68} />
      <Head t={t} t0={T.shundan - .1} t1={39.1} y={490} lines={[['5% qirg‘oq ='], ['350 km plyaj!', 'y']]} size={64} from="slam" />
    </Layer>
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 39.0, 52.9, .3, .3);
  const aA = env(t, 39.0, T.yuk - .1, .3, .3), aB = env(t, T.yuk - .3, T.baliq - .1, .3, .3), aC = env(t, T.baliq - .3, 52.9, .3, .3);
  const n = 7600000 * eio(P(t, T.n76 - .2, T.n76 + 1.2));
  const home = eout(P(t, T.uyda - .3, T.uyda + .2));
  const sx = lerp(-260, CX - 160, eio(P(t, T.kema - .2, T.ombor + .4)));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 39, 44.8), 1, 1.04)}>
      <Glow x={CX} y={900} r={520} a={.85} />
      <Num v={fmt(n)} y={700} a={eout(P(t, T.n76 - .3, T.n76))} size={120} />
      <div style={{ ...abs(SL, 840, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR, opacity: eout(P(t, T.sayohat - .2, T.sayohat + .2)) }}>xorijga sayohat · 2025</div>
      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
        {Array.from({ length: 30 }, (_, i) => { const x = SL + 40 + (i % 10) * 82, y = 960 + Math.floor(i / 10) * 92; const st = i < 9 ? home : 0;
          return <g key={i} opacity={eout(P(t, T.n76 + i * .02, T.n76 + .3 + i * .02))} transform={`translate(${x} ${y})`}>
            <circle cx="0" cy="0" r="16" fill={st > .5 ? GRN : WH} /><path d="M-24 52 Q0 14 24 52 Z" fill={st > .5 ? GRN : WH} /></g>; })}
      </svg>
      <Pill s="bir qismi — uyda dam" x={CX - 80} y={1290} a={home} size={30} col={GRN} />
      <Src s="kun.uz · 2025 yil · chiquvchi turizm" y={1360} a={eout(P(t, T.n76, T.n76 + .4))} />
      <Head t={t} t0={39.0} t1={T.yuk - .1} y={490} lines={[['xorijga dam'], ['olish o‘rniga…', 'y']]} size={64} />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={1000} r={520} a={.8} col="47,125,246" />
      <div style={{ ...abs(SL - 70, 1130) }}><Waves t={t} w={1000} h={260} id="k" amp={12} /></div>
      <div style={{ ...abs(sx, 960) }}><Ship w={340} /></div>
      <div style={{ ...abs(CX + 200, 870), width: 220, height: 200, opacity: eout(P(t, T.ombor - .3, T.ombor + .2)) }}>
        <svg width="220" height="200" viewBox="0 0 220 200"><path d="M10 80 L110 20 L210 80 V190 H10 Z" fill="#3a4152" stroke="#c7cedb" strokeWidth="4" /><rect x="70" y="110" width="80" height="80" fill="#1a1d24" /><text x="110" y="74" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="26" fill={WH}>OMBOR</text></svg>
      </div>
      <Stamp s="1 hafta → 0" y={780} t={t} t0={T.haftalik} t1={T.baliq} col={GRN} size={56} />
      <Pill s="tasavvur" x={CX} y={1300} a={eout(P(t, T.yuk, T.yuk + .3))} size={26} col={GR} dark />
      <Head t={t} t0={T.yuk - .3} t1={T.baliq - .1} y={490} lines={[['kemadan —'], ['to‘g‘ri omborga', 'y']]} size={60} />
    </Layer>
    <Layer a={aC}>
      <Glow x={CX} y={980} r={520} a={.85} />
      <div style={{ ...abs(CX - 300, 720), opacity: eout(P(t, T.baliq - .2, T.baliq + .2)) }}>
        <svg width="240" height="130" viewBox="0 0 240 130"><path d="M20 65 Q90 0 170 50 L225 15 V115 L170 80 Q90 130 20 65 Z" fill="#9BE3FF" stroke="#2b6f8c" strokeWidth="4" /><circle cx="60" cy="56" r="8" fill="#0b1a24" /></svg>
      </div>
      <Pill s="baliq ↓ arzon" x={CX + 200} y={790} a={eout(P(t, T.baliq + .2, T.baliq + .5))} size={30} col={GRN} />
      <div style={{ ...abs(CX - 75, 950) }}><Avatar n="Qaynona" c="#ffb3c1" sel={eout(P(t, T.qaynona, T.qaynona + .3))} /></div>
      <Card x={CX - 330} y={1150} w={660} a={eout(P(t, T.dacha - .3, T.dacha + .1))}>
        <div style={{ padding: '20px 26px', textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 34, color: WH }}>«Dachaga emas, <span style={{ color: SEA }}>dengizga!</span>»</div>
      </Card>
      <Head t={t} t0={T.baliq - .3} t1={52.9} y={490} lines={[['hayot'], ['o‘zgarardi', 'y']]} size={70} />
    </Layer>
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 52.8, 61.1, .3, .3);
  const tx = lerp(-320, SR - 300, eio(P(t, T.trans - .3, T.reja + .5)));
  const b1 = eout(P(t, T.reja - .2, T.reja + .4)), b2 = eout(P(t, T.uch - .2, T.uch + .4));
  return <Layer a={a} z={logZ(P(t, 52.8, 61.1), 1, 1.04)}>
    <Glow x={CX} y={900} r={520} a={.85} col="61,220,132" />
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
      <line x1="0" y1="905" x2={W} y2="905" stroke="#7f8899" strokeWidth="6" />
      {Array.from({ length: 30 }, (_, i) => <rect key={i} x={i * 40 - ((t * 120) % 40)} y="898" width="12" height="20" fill="#5a6070" />)}
    </svg>
    <div style={{ ...abs(tx, 800) }}><Train w={340} /></div>
    <Card x={SL + 30} y={1000} w={SR - SL - 60} a={b1}>
      <div style={{ padding: '20px 28px' }}>
        {[['hozir', 35, RED, b1, '35 kun'], ['reja', 4, GRN, b2, '3–5 kun']].map(([k, v, c, b, lbl], i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: i ? 18 : 0 }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR, width: 80 }}>{k as string}</div>
          <div style={{ height: 40, borderRadius: 10, width: `${(v as number) / 35 * 520 * (b as number)}px`, background: c as string }} />
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: c as string, opacity: b as number, whiteSpace: 'nowrap' }}>{lbl as string}</div>
        </div>)}
      </div>
    </Card>
    <Src s="Trans-Afg‘on temir yo‘li · reja · timesca.com, astanatimes.com · 2025" y={1240} a={eout(P(t, T.reja, T.reja + .4))} />
    <Head t={t} t0={52.8} t1={T.reja - .1} y={490} lines={[['haqiqiy yo‘l —'], ['temir yo‘l', 'g']]} size={64} />
    <Head t={t} t0={T.reja - .1} t1={61.1} y={490} lines={[['Pokiston portlariga'], ['3–5 kunda', 'g']]} size={60} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => <Layer a={env(t, 61.0, END + 1, .3, .1)}><ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} /></Layer>;

const HITS: [number, number, number][] = [[T.dunyoda, 8, 7], [T.lixt, 10, 6], [T.karachi, 8, 7], [T.qimmat, 12, 6], [T.n30, 10, 6], [T.endi, 20, 5], [T.n350, 12, 6], [T.uyda, 6, 7], [T.haftalik, 10, 6], [T.uch, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S56, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.2;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1200} r={560} a={1} col="47,125,246" />
    <div style={{ position: 'absolute', left: CX + 200, top: 820, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle,#FFE9A8,#FFCF3A 60%,#F2A322)', boxShadow: '0 0 80px rgba(255,207,58,.6)' }} />
    <div style={{ ...abs(0, 1020) }}><Waves t={t} w={1080} h={320} id="cv" amp={20} /></div>
    <div style={{ ...abs(0, 1300), width: 1080, height: 140, background: 'linear-gradient(180deg,#e9cf8f,#b98f4a)' }} />
    <div style={{ ...abs(CX - 240, 1150) }}><Umbrella w={230} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>agar… · raqamlar bilan</div>
    <div style={{ ...abs(SL, 455, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 108, lineHeight: 1.02, ...yel }}>O‘ZBEKISTONDA<br />DENGIZ<br />BO‘LSA?</div>
    <div style={{ ...abs(SL, 1480, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.1, color: GRN }}>350 KM PLYAJ —<br /><span style={{ color: WH }}>VA YANA NIMA?</span></div>
  </AbsoluteFill>;
};
