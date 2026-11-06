import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, rnd, clamp } from '../lib';
import { Lockup, Donut } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
const R1 = rnd(11);
const FLAKES = Array.from({ length: 70 }, () => ({ x: R1() * W, y: R1() * H, r: 2 + R1() * 4, sp: 40 + R1() * 90, ph: R1() * 6.28 }));
/* falling snow over everything (except the ending) */
const SnowFx: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, T.buni, .2, .5) * .9; if (a <= 0) return null;
  return <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: -45, opacity: a }}>
    {FLAKES.map((f, i) => <circle key={i} cx={f.x + Math.sin(t * .8 + f.ph) * 18} cy={((f.y + t * f.sp) % H + H) % H} r={f.r} fill="#ffffff" opacity={.35 + .3 * Math.sin(f.ph)} />)}
  </svg>;
};
/* generic city skyline (no landmarks) with a snow layer of height `snow` px */
const BLD: [number, number, number][] = [[0, 70, 180], [74, 90, 300], [168, 60, 220], [232, 110, 420], [346, 70, 260], [420, 90, 340], [514, 64, 200], [582, 100, 380], [686, 74, 250], [764, 96, 310]];
const City: React.FC<{ w: number; snow: number; id: string }> = ({ w, snow, id }) => (
  <svg width={w} height={w * .56} viewBox="0 0 860 480" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`bd${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a4256" /><stop offset="1" stopColor="#1a1e2a" /></linearGradient>
      <linearGradient id={`sn${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#bfe6ff" /></linearGradient>
    </defs>
    {BLD.map(([x, bw, h], i) => <g key={i}>
      <rect x={x} y={480 - h} width={bw} height={h} fill={`url(#bd${id})`} stroke="#4a5266" strokeWidth="2" />
      {Array.from({ length: Math.floor(h / 40) }, (_, r) => Array.from({ length: Math.floor(bw / 26) }, (_, c) => <rect key={`${r}-${c}`} x={x + 8 + c * 26} y={480 - h + 14 + r * 40} width="12" height="16" fill={(r * 3 + c + i) % 4 === 0 ? '#FFD983' : '#2a3040'} opacity=".9" />))}
      <rect x={x - 2} y={480 - h - 8} width={bw + 4} height="10" rx="5" fill="#fff" />
    </g>)}
    <rect x="-20" y={480 - snow} width="900" height={snow} fill={`url(#sn${id})`} />
    <path d={`M-20 ${480 - snow} Q 100 ${470 - snow} 220 ${480 - snow} T 460 ${480 - snow} T 700 ${480 - snow} T 880 ${480 - snow}`} fill="#fff" />
  </svg>
);
/* isometric box: plan w×d, height h (px) */
const IsoBox: React.FC<{ s: number; h: number; top: string; side: string; front: string; label?: string }> = ({ s, h, top, side, front, label }) => {
  const dx = s * .866, dy = s * .5;
  return <svg width={2 * dx + 20} height={2 * dy + h + 20} viewBox={`${-dx - 10} ${-dy - 10} ${2 * dx + 20} ${2 * dy + h + 20}`} style={{ display: 'block', overflow: 'visible' }}>
    <path d={`M0 ${-dy} L ${dx} 0 L 0 ${dy} L ${-dx} 0 Z`} fill={top} stroke="#0b0d12" strokeWidth="2" transform={`translate(0 ${0})`} />
    <path d={`M${-dx} 0 L 0 ${dy} L 0 ${dy + h} L ${-dx} ${h} Z`} fill={front} stroke="#0b0d12" strokeWidth="2" />
    <path d={`M${dx} 0 L 0 ${dy} L 0 ${dy + h} L ${dx} ${h} Z`} fill={side} stroke="#0b0d12" strokeWidth="2" />
    {Boolean(label) && <text x="0" y="8" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight={700} fontSize={s * .22} fill="#1A1306">{label}</text>}
  </svg>;
};
/* generic dump truck (no make) */
const Truck: React.FC<{ w: number; load: number }> = ({ w, load }) => (
  <svg width={w} height={w * .5} viewBox="0 0 400 200" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="trG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFCF3A" /><stop offset="1" stopColor="#c99a1c" /></linearGradient></defs>
    <path d={`M20 ${110 - load * 50} Q 130 ${60 - load * 70} 250 ${110 - load * 50} L 250 110 L 20 110 Z`} fill="#fff" opacity={load > 0 ? 1 : 0} />
    <path d="M10 60 L 260 60 L 250 140 L 20 140 Z" fill="url(#trG)" stroke="#5a4510" strokeWidth="4" />
    <path d="M270 70 L 340 70 L 380 110 L 380 150 L 270 150 Z" fill="#e8ecf4" stroke="#4a5266" strokeWidth="4" />
    <path d="M290 80 L 335 80 L 362 108 L 290 108 Z" fill="#9BE3FF" />
    <rect x="10" y="140" width="370" height="16" rx="4" fill="#2a2f3b" />
    {[70, 200, 330].map((x) => <g key={x}><circle cx={x} cy={165} r={28} fill="#141822" /><circle cx={x} cy={165} r={12} fill="#7F8792" /></g>)}
  </svg>
);
const Chip: React.FC<{ s: string; y: number; a: number }> = ({ s, y, a }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: CX, top: y, translate: '-50% 0', opacity: a, padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 23, color: WH, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 8.0, .2, .3);
  const sn = lerp(18, 130, eio(P(t, -0.5, T.metr + .6)));
  return <Layer a={a} z={logZ(P(t, -1, 8), 1, 1.06)}>
    <Glow x={CX} y={1040} r={540} a={.9} col="155,227,255" />
    <div style={{ ...abs(SL, 840) }}><City w={SR - SL} snow={sn} id="c1" /></div>
    <div style={{ position: 'absolute', left: SR - 40, top: 1321 - 130, width: 8, height: 130, background: RED, opacity: eout(P(t, T.metr, T.metr + .3)) }} />
    <Pill s="1 metr" x={SR - 110} y={1321 - 160} a={eout(P(t, T.metr, T.metr + .3))} size={30} col={RED} />
    <Pill s="xayol · raqamlar haqiqiy" x={CX} y={760} a={eout(P(t, T.haqiqiy - .3, T.haqiqiy + .1))} size={28} col={GRN} />
    <Head t={t} t0={-1} t1={T.hisob - .1} y={490} lines={[['Toshkentga'], ['1 metr qor', 'y']]} size={80} />
    <Head t={t} t0={T.hisob - .1} t1={8.0} y={490} lines={[['qancha'], ['qor bo‘ladi?', 'y']]} size={80} from="slam" />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 7.9, 15.1, .3, .3);
  const plan = eback(P(t, 8.0, 8.6)), hgt = eio(P(t, T.metr2 - .2, T.metr2 + .7));
  const n = eio(P(t, T.n440 - .3, T.n440 + 1));
  return <Layer a={a} z={logZ(P(t, 7.9, 15.1), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} col="155,227,255" />
    <div style={{ position: 'absolute', left: CX, top: 740, translate: '-50% 0', scale: String(clamp(plan, 0, 1.2)) }}>
      <IsoBox s={240} h={lerp(4, 120, hgt)} top={hgt > .05 ? '#ffffff' : '#3a4256'} side="#9fd4f5" front="#cfeeff" label={hgt < .3 ? '43 800 ga' : ''} />
    </div>
    <Num v="43 800 gektar" y={1150} a={env(t, T.ga - .3, T.metr2 + .4, .2, .3)} size={74} col={WH} />
    <Pill s="× 1 metr" x={CX + 300} y={900} a={eout(P(t, T.metr2 - .1, T.metr2 + .3))} size={30} col={ICE} />
    <Num v={`≈ ${fmt(440 * n)} mln m³`} y={1150} a={eout(P(t, T.n440 - .4, T.n440 - .1))} size={84} />
    <Chip s="438,2 km² × 1 m ≈ 438 mln m³" y={1270} a={eout(P(t, T.qor - .3, T.qor + .1))} />
    <Src s="Toshkent hududi 43 822 ga · Bosh reja · afisha.uz" y={1350} a={eout(P(t, T.ga, T.ga + .4))} />
    <Head t={t} t0={7.9} t1={15.1} y={490} lines={[['Toshkent'], ['× 1 metr', 'y']]} size={80} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 15.0, 26.5, .3, .3);
  const aP = env(t, 15.0, T.bu + .1, .3, .3), aR = env(t, T.bu - .1, T.har - .05, .3, .3), aH = env(t, T.har - .2, 26.5, .3, .3);
  const n = eio(P(t, T.kub140 - .3, T.kub140 + .8));
  return <Layer a={a} z={logZ(P(t, 15, 26.5), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} col="155,227,255" />
    <Layer a={aP}>
      <div style={{ position: 'absolute', left: SL + 40, top: 700, width: SR - SL - 80, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
        {Array.from({ length: 30 }, (_, i) => { const ap = eout(P(t, T.mln3 - .3 + i * .02, T.mln3 + i * .02)); const me = i === 14;
          return <svg key={i} width="56" height="72" viewBox="0 0 100 130" style={{ opacity: ap * (t > T.kishi && !me ? .35 : 1), scale: String(me && t > T.kishi ? 1.35 : 1) }}><circle cx="50" cy="26" r="20" fill={me && t > T.kishi ? Y : '#9fb8ff'} /><rect x="24" y="50" width="52" height="70" rx="20" fill={me && t > T.kishi ? Y : '#9fb8ff'} /></svg>; })}
      </div>
      <Pill s="3 mln dan ortiq odam" x={CX} y={1040} a={eout(P(t, T.mln3, T.mln3 + .3))} size={30} col={WH} />
      <Num v={`≈ ${fmt(140 * n)} m³`} y={1110} a={eout(P(t, T.kub140 - .4, T.kub140 - .1))} size={110} />
      <Chip s="438 mln m³ ÷ 3 mln ≈ 146 m³ · taxminan" y={1250} a={eout(P(t, T.kub140 + .3, T.kub140 + .7))} />
      <Head t={t} t0={15.0} t1={T.bu + .1} y={490} lines={[['har bir'], ['toshkentlikka', 'y']]} size={80} />
    </Layer>
    <Layer a={aR}>
      <div style={{ position: 'absolute', left: CX - 360, top: 720, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {[0, 1, 2, 3].map((i) => { const f = eio(P(t, T.xona + i * .35, T.shift + .3 + i * .35));
          return <div key={i} style={{ position: 'relative', width: 340, height: 230, borderRadius: 14, border: '4px solid #5b6476', background: '#141822', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: `${f * 100}%`, background: 'linear-gradient(180deg,#fff,#cfeeff)' }} />
            <div style={{ position: 'absolute', left: 120, top: 70, width: 100, height: 80, border: '4px solid #5b6476', borderRadius: 6, opacity: 1 - f * .8 }} />
            <div style={{ position: 'absolute', left: 14, top: 10, fontFamily: MONO, fontSize: 20, color: f > .9 ? '#1A1306' : GR }}>xona {i + 1}</div>
          </div>; })}
      </div>
      <Src s="xona ≈ 4 × 3,5 × 2,7 m ≈ 38 m³ · misol" y={1250} a={eout(P(t, T.xona, T.xona + .4))} />
      <Head t={t} t0={T.bu - .1} t1={T.har} y={490} lines={[['4 ta xona'], ['shiftigacha', 'y']]} size={80} />
    </Layer>
    <Layer a={aH}>
      <svg width="760" height="420" viewBox="0 0 760 420" style={{ position: 'absolute', left: CX - 380, top: 760 }}>
        <defs><linearGradient id="mtG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#bfe6ff" /></linearGradient></defs>
        <rect x="0" y="360" width="760" height="60" fill="#2c3240" />
        <rect x="20" y="200" width="160" height="160" fill="#3a4256" stroke="#5b6476" strokeWidth="3" /><path d="M10 205 L 100 140 L 190 205 Z" fill="#fff" />
        <path d={`M240 360 L ${480} ${lerp(360, 90, eback(P(t, T.tog - .3, T.tog + .3)))} L 720 360 Z`} fill="url(#mtG)" stroke="#9fd4f5" strokeWidth="3" />
      </svg>
      <Pill s="hovlida — kichik tog‘" x={CX + 100} y={830} a={eout(P(t, T.tog, T.tog + .3))} size={30} col={ICE} />
      <Head t={t} t0={T.har - .2} t1={26.5} y={490} lines={[['har hovlida'], ['tog‘', 'y']]} size={80} from="slam" />
    </Layer>
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.4, 36.45, .3, .3);
  const aC = env(t, 26.4, T.lekin, .3, .3), aR = env(t, T.lekin - .2, 36.45, .3, .3);
  const snow = eio(P(t, T.m100 - .2, T.tom + .5)), clean = eio(P(t, T.tozalash - .2, T.tozalash + .9));
  return <Layer a={a} z={logZ(P(t, 26.4, 36.4), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} col="155,227,255" />
    <Layer a={aC}>
      <div style={{ position: 'absolute', left: CX, top: 720, translate: '-50% 0' }}><IsoBox s={230} h={200} top="#ffffff" side="#9fd4f5" front="#cfeeff" label="1 m³" /></div>
      <Num v="≈ 100 kg" y={1150} a={eout(P(t, T.kg100 - .4, T.kg100 - .1))} size={110} col={ICE} />
      <Pill s="yangi qor — yengil" x={CX} y={1100} a={env(t, T.yengil - .1, T.kg100 - .4, .2, .2)} size={30} col={ICE} />
      <Src s="yangi qor zichligi 30–300 kg/m³ · UBC (atmosfera fanlari)" y={1300} a={eout(P(t, T.kg100, T.kg100 + .4))} />
      <Head t={t} t0={26.4} t1={T.lekin} y={490} lines={[['1 kub qor'], ['qancha tortadi?', 'y']]} size={72} />
    </Layer>
    <Layer a={aR}>
      <svg width="760" height="460" viewBox="0 0 760 460" style={{ position: 'absolute', left: CX - 380, top: 720 }}>
        <rect x="140" y="230" width="480" height="230" fill="#3a4256" stroke="#5b6476" strokeWidth="4" />
        <rect x="330" y="320" width="100" height="140" fill="#1a1e2a" /><rect x="190" y="290" width="90" height="80" fill="#FFD983" opacity=".8" /><rect x="480" y="290" width="90" height="80" fill="#FFD983" opacity=".8" />
        <path d="M100 235 L 380 100 L 660 235 Z" fill="#7a4a3a" stroke="#4a2a20" strokeWidth="4" />
        <path d={`M100 235 L 380 100 L 660 235 L 660 ${235 - 70 * snow * (1 - clean)} L 380 ${100 - 70 * snow * (1 - clean)} L 100 ${235 - 70 * snow * (1 - clean)} Z`} fill="#ffffff" opacity={snow > 0 ? 1 : 0} />
      </svg>
      <Pill s="tom 100 m²" x={CX - 230} y={790} a={eout(P(t, T.m100, T.m100 + .3))} size={28} col={WH} dark />
      <Stamp s="≈ 10 TONNA" y={1240} t={t} t0={T.t10} t1={T.tozalash - .1} col={RED} size={64} rot={-5} />
      <Pill s="tomni vaqtida tozalang ✓" x={CX} y={1240} a={eout(P(t, T.tozalash - .1, T.tozalash + .3))} size={32} col={GRN} />
      <Src s="100 m² × 1 m × 100 kg/m³ ≈ 10 t · taxminan" y={1330} a={eout(P(t, T.t10, T.t10 + .4))} />
      <Head t={t} t0={T.lekin - .2} t1={36.45} y={490} lines={[['tom ustida'], ['10 tonna yuk', 'r']]} size={74} />
    </Layer>
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 36.3, 37.7, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={36.3} t1={37.7} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 37.6, 44.2, .3, .3);
  const melt = eio(P(t, T.erisa - .2, T.sm10 + .5));
  const aD = eout(P(t, T.chunki - .2, T.chunki + .3));
  const colH = 520, x = SL + 70;
  return <Layer a={a} z={logZ(P(t, 37.6, 44.2), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} col="91,140,255" />
    <div style={{ position: 'absolute', left: x, top: 1280 - colH, width: 200, height: colH, border: '3px solid #5b6476', borderRadius: '0 0 18px 18px' }} />
    <div style={{ position: 'absolute', left: x + 3, top: 1280 - colH * (1 - melt * .9), width: 194, height: colH * (1 - melt * .9) - 3, background: melt < .97 ? 'linear-gradient(180deg,#fff,#cfeeff)' : 'linear-gradient(180deg,#5B8CFF,#2c4f9e)', borderRadius: '0 0 16px 16px' }} />
    <div style={{ position: 'absolute', left: x + 3, top: 1280 - colH * .1, width: 194, height: colH * .1 - 3, background: 'linear-gradient(180deg,#5B8CFF,#2c4f9e)', opacity: melt, borderRadius: '0 0 16px 16px' }} />
    <div style={{ position: 'absolute', left: x + 220, top: 1280 - colH - 14, fontFamily: MONO, fontSize: 24, color: GR }}>1 m qor</div>
    <div style={{ position: 'absolute', left: x + 220, top: 1280 - colH * .1 - 20, fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: BLUE, opacity: melt }}>← 10 sm suv</div>
    {aD > 0 && <div style={{ position: 'absolute', left: CX + 80, top: 760, opacity: aD }}>
      <Donut w={300} p={.9 * eio(P(t, T.f90 - .2, T.f90 + .7))} col={ICE} id="d6" />
      <div style={{ position: 'absolute', left: 0, top: 110, width: 300, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: ICE }}>90 %</div>
      <div style={{ position: 'absolute', left: 0, top: 320, width: 300, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: WH, opacity: eout(P(t, T.havo - .2, T.havo + .2)) }}>HAVO</div>
    </div>}
    <Src s="yangi qorda suv 5–20 % · UBC · 10 % olindi, taxminan" y={1320} a={eout(P(t, T.sm10, T.sm10 + .4))} />
    <Head t={t} t0={37.6} t1={44.2} y={490} lines={[['1 metr qor'], ['= 10 sm suv', 'y']]} size={80} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 44.1, 52.4, .3, .3);
  const drive = eio(P(t, T.kub10, T.mln44 - .2));
  const n = eio(P(t, T.mln44 - .3, T.mln44 + .9));
  const aY = eout(P(t, T.kuniga - .2, T.kuniga + .3));
  return <Layer a={a} z={logZ(P(t, 44.1, 52.4), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} />
    <div style={{ position: 'absolute', left: lerp(CX - 330, CX - 130, drive), top: 720, opacity: 1 - aY * .7 }}><Truck w={440} load={eout(P(t, T.yuk, T.kub10 + .3))} /></div>
    <Pill s="1 reys = 10 m³ (misol)" x={CX} y={980} a={eout(P(t, T.kub10, T.kub10 + .3)) * (1 - aY)} size={28} col={WH} dark />
    <Num v={`${fmt(44 * n)} mln reys`} y={1040} a={eout(P(t, T.mln44 - .4, T.mln44 - .1)) * (1 - aY)} size={96} />
    <Card x={SL + 60} y={960} w={SR - SL - 120} a={aY}>
      <div style={{ padding: '22px 26px', textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>kuniga 1 000 reys</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 96, color: RED, lineHeight: 1.05 }}>100+ YIL</div>
      </div>
    </Card>
    <Chip s="438 mln ÷ 10 ≈ 43,8 mln reys ÷ 1 000 ≈ 120 yil" y={1250} a={eout(P(t, T.y100, T.y100 + .4))} />
    <Src s="hisob: sanoqboz · taxminan" y={1330} a={eout(P(t, T.mln44, T.mln44 + .4))} />
    <Head t={t} t0={44.1} t1={52.4} y={490} lines={[['tozalash uchun'], ['44 mln reys', 'y']]} size={72} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 52.3, END + 1, .3, .1);
  const aA = env(t, 52.3, T.buni - .05, .3, .3);
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={1000} r={540} a={.85} col="61,220,132" />
      <svg width="760" height="420" viewBox="0 0 760 420" style={{ position: 'absolute', left: CX - 380, top: 760 }}>
        <rect x="0" y="330" width="760" height="90" fill="#fff" />
        {[0, 1].map((i) => { const j = Math.abs(Math.sin(t * 6 + i * 1.7)) * 30; return <g key={i} transform={`translate(${90 + i * 140} ${-j})`}><circle cx="40" cy="200" r="24" fill="#9fb8ff" /><rect x="14" y="228" width="52" height="80" rx="20" fill="#9fb8ff" /><path d="M14 240 L -14 200 M66 240 L 94 200" stroke="#9fb8ff" strokeWidth="12" strokeLinecap="round" /></g>; })}
        <g transform={`translate(${lerp(560, 520, eout(P(t, T.qaynona, T.bozor)))} 0)`} opacity={eout(P(t, T.qaynona - .2, T.qaynona + .2))}>
          <circle cx="60" cy="190" r="28" fill="#ffb3c1" /><path d="M32 182 Q 60 140 88 182 L 92 196 L 28 196 Z" fill="#EC3A2C" />
          <path d="M60 220 L 100 330 L 20 330 Z" fill="#ffb3c1" />
          <rect x="96" y="250" width="44" height="50" rx="6" fill="#FFCF3A" /><path d="M104 252 Q 118 228 132 252" stroke="#FFCF3A" strokeWidth="5" fill="none" />
        </g>
      </svg>
      <Stamp s="MAKTAB YO‘Q" x={CX - 140} y={760} t={t} t0={T.yoq - .15} t1={T.buni} col={GRN} size={50} rot={-6} />
      <Pill s="qor — bahona emas" x={CX + 170} y={1240} a={eout(P(t, T.bahona - .3, T.bahona + .1))} size={30} />
      <Head t={t} t0={52.3} t1={T.qaynona - .1} y={490} lines={[['bolalar'], ['xursand', 'g']]} size={80} />
      <Head t={t} t0={T.qaynona - .1} t1={T.buni} y={490} lines={[['qaynona esa'], ['bozorga', 'y']]} size={80} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['qorni sog‘ingan do‘stga'], ['yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.metr, 10, 6], [T.n440, 8, 7], [T.kub140, 8, 7], [T.tog, 8, 7], [T.t10, 12, 6], [T.endi, 20, 5], [T.sm10, 10, 6], [T.mln44, 8, 7], [T.y100, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, SnowFx]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1150} r={600} a={1} col="155,227,255" />
    <div style={{ ...abs(SL + 40, 890) }}><City w={SR - SL} snow={150} id="cv" /></div>
    <div style={{ position: 'absolute', inset: 0, top: 45 }}><SnowFx t={3} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>agar Toshkentga</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 118, lineHeight: 1.02, ...yel }}>1 METR QOR<br />YOG‘SA?</div>
    <div style={{ ...abs(SL, 1460, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 62, lineHeight: 1.1, color: ICE }}>HAR KISHIGA ≈ 140 KUB</div>
  </AbsoluteFill>;
};
