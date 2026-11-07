import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, rnd } from '../lib';
import { Lockup, Phone, Car } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Src, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
const R1 = rnd(11);
const FLAKES = Array.from({ length: 34 }, () => ({ x: R1() * 1000, y: R1() * 1100, r: 3 + R1() * 6, sp: 60 + R1() * 90, ph: R1() * 6.28 }));
const Snow: React.FC<{ t: number; a: number; top?: number }> = ({ t, a, top = 470 }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: 0, top: 0, width: 1000, height: 1500, opacity: a }}>
    {FLAKES.map((f, i) => {
      const y = top + ((f.y + t * f.sp) % 1000); const x = f.x + Math.sin(t * 1.3 + f.ph) * 22;
      return <div key={i} style={{ position: 'absolute', left: x, top: y, width: f.r * 2, height: f.r * 2, borderRadius: '50%', background: '#e8f6ff', opacity: .55, boxShadow: '0 0 8px #9BE3FF' }} />;
    })}
  </div>;

/* battery icon used inside the phone screen */
const BatIcon: React.FC<{ w: number; p: number; col: string }> = ({ w, p, col }) => (
  <div style={{ position: 'relative', width: w, height: w * .5 }}>
    <div style={{ position: 'absolute', inset: 0, right: w * .08, border: `${w * .04}px solid ${WH}`, borderRadius: w * .09 }} />
    <div style={{ position: 'absolute', right: 0, top: w * .16, width: w * .07, height: w * .18, background: WH, borderRadius: 4 }} />
    <div style={{ position: 'absolute', left: w * .07, top: w * .07, height: w * .36, width: (w * .78) * clamp(p), background: col, borderRadius: w * .04 }} />
  </div>
);
const BatScreen: React.FC<{ p: number; off: number; warn?: number }> = ({ p, off, warn = 0 }) => {
  const col = p > .3 ? GRN : p > .12 ? Y : RED;
  return <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#1b2233,#0b0e15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
    <BatIcon w={170} p={p} col={col} />
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: col, lineHeight: 1 }}>{Math.round(p * 100)}%</div>
    {warn > 0 && <div style={{ opacity: warn, padding: '14px 18px', borderRadius: 18, background: 'rgba(40,44,56,.95)', fontFamily: SANS, fontWeight: 700, fontSize: 24, color: WH, textAlign: 'center', width: '80%' }}>Quvvat tugadi<div style={{ fontWeight: 500, fontSize: 18, color: GR, marginTop: 6 }}>telefon o‘chirilmoqda…</div></div>}
    <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: off }} />
  </div>;
};

/* cross-section of a Li-ion cell; ions move between electrodes. sp = speed factor, frost 0..1 */
const R2 = rnd(5);
const IONS = Array.from({ length: 12 }, () => ({ y: 40 + R2() * 220, ph: R2(), w: .7 + R2() * .6 }));
const Cell: React.FC<{ w: number; t: number; sp: number; frost: number; tok: number }> = ({ w, t, sp, frost, tok }) => {
  // integrate position with variable speed approximately: phase advance = t*sp (sp changes slowly enough)
  return <div style={{ position: 'relative', width: w, height: w * .5 }}>
    <svg width={w} height={w * .5} viewBox="0 0 760 380" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <defs>
        <linearGradient id="clCase" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a4152" /><stop offset="1" stopColor="#1a1e28" /></linearGradient>
        <linearGradient id="clAn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#5a6274" /><stop offset="1" stopColor="#8a93a6" /></linearGradient>
        <linearGradient id="clCa" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c84a3c" /><stop offset="1" stopColor="#EC3A2C" /></linearGradient>
        <filter id="clGl" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      <rect x="0" y="0" width="760" height="380" rx="30" fill="url(#clCase)" stroke="#5a6274" strokeWidth="4" />
      <rect x="30" y="30" width="110" height="320" rx="14" fill="url(#clAn)" />
      <rect x="620" y="30" width="110" height="320" rx="14" fill="url(#clCa)" />
      <rect x="370" y="30" width="20" height="320" fill="#7F8792" opacity=".35" />
      <text x="85" y="205" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="70" fill="#F3F5F8">−</text>
      <text x="675" y="210" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="70" fill="#F3F5F8">+</text>
      {IONS.map((o, i) => {
        const ph = (o.ph + t * sp * .45 * o.w) % 2; const k = ph < 1 ? ph : 2 - ph;
        const x = 160 + k * 440; const y = 40 + o.y + Math.sin(t * sp * 3 + i) * 8;
        return <g key={i}><circle cx={x} cy={y} r="16" fill="#FFCF3A" opacity=".55" filter="url(#clGl)" /><circle cx={x} cy={y} r="11" fill="#FFCF3A" /><text x={x} y={y + 5} textAnchor="middle" fontFamily="JBM, monospace" fontSize="13" fontWeight="700" fill="#1A1306">Li</text></g>;
      })}
      <rect x="0" y="0" width="760" height="380" rx="30" fill="#9BE3FF" opacity={frost * .28} />
      {frost > 0 && [[30, 30], [730, 30], [30, 350], [730, 350]].map(([x, y], i) =>
        <path key={i} d={`M${x} ${y} l ${x < 380 ? 70 : -70} 0 M${x} ${y} l 0 ${y < 190 ? 70 : -70} M${x} ${y} l ${x < 380 ? 50 : -50} ${y < 190 ? 50 : -50}`} stroke="#e8f6ff" strokeWidth="6" strokeLinecap="round" opacity={frost} />)}
    </svg>
    {tok > 0 && <div style={{ position: 'absolute', left: '50%', top: -84, translate: '-50% 0', opacity: tok, fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: Y, textShadow: '0 0 24px rgba(255,207,58,.7)', whiteSpace: 'nowrap' }}>⚡ tok</div>}
  </div>;
};

const Thermo: React.FC<{ h: number; v: number; label: string; col?: string }> = ({ h, v, label, col = ICE }) => (
  <div style={{ position: 'relative', width: h * .32, height: h }}>
    <svg width={h * .32} height={h} viewBox="0 0 80 250" style={{ position: 'absolute', inset: 0 }}>
      <rect x="26" y="8" width="28" height="190" rx="14" fill="#1d2230" stroke="#c3cad8" strokeWidth="4" />
      <rect x="33" y={20 + 170 * (1 - v)} width="14" height={180 - 170 * (1 - v)} rx="7" fill={col} />
      <circle cx="40" cy="215" r="28" fill={col} stroke="#c3cad8" strokeWidth="4" />
    </svg>
    <div style={{ position: 'absolute', left: '50%', top: h + 6, translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: col, whiteSpace: 'nowrap' }}>{label}</div>
  </div>
);

/* winter jacket, front, with an inner pocket */
const Jacket: React.FC<{ w: number; warm: number; ph: number }> = ({ w, warm, ph }) => (
  <div style={{ position: 'relative', width: w, height: w * .95 }}>
    <svg width={w} height={w * .95} viewBox="0 0 500 475" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <defs>
        <linearGradient id="jkL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3d5a8c" /><stop offset="1" stopColor="#1d2e4f" /></linearGradient>
        <linearGradient id="jkIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7a3a2c" /><stop offset="1" stopColor="#4a2018" /></linearGradient>
        <filter id="jkB" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26" /></filter>
      </defs>
      <path d="M60 60 L190 20 L250 70 L310 20 L440 60 L480 460 L20 460 Z" fill="url(#jkIn)" />
      <ellipse cx="300" cy="300" rx="120" ry="110" fill="#FFB24A" opacity={warm * .7} filter="url(#jkB)" />
      <path d="M60 60 L190 20 L240 120 L250 460 L20 460 Z" fill="url(#jkL)" stroke="#0d1526" strokeWidth="4" />
      <path d="M440 60 L310 20 L380 130 L420 460 L480 460 Z" fill="url(#jkL)" stroke="#0d1526" strokeWidth="4" />
      <rect x="250" y="250" width="130" height="150" rx="10" fill="#5a2a20" stroke="#2a120c" strokeWidth="4" />
      <g transform={`translate(270 ${150 + 85 * ph})`}>
        <rect x="0" y="0" width="90" height="170" rx="16" fill="#2a2e38" stroke="#5a6070" strokeWidth="4" />
        <rect x="8" y="10" width="74" height="150" rx="10" fill="#0b0e15" />
        <rect x="24" y="30" width="34" height="16" rx="3" fill="none" stroke="#3DDC84" strokeWidth="3" /><rect x="27" y="33" width="20" height="10" fill="#3DDC84" />
      </g>
      <rect x="250" y="300" width="130" height="110" rx="8" fill="#6a3226" stroke="#2a120c" strokeWidth="4" />
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={232 + i * 0} cy={140 + i * 64} r="9" fill="#c3cad8" />)}
    </svg>
  </div>
);

const Chip: React.FC<{ s: string; y: number; a: number; x?: number }> = ({ s, y, a, x = CX }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% 0', opacity: a, padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 23, color: WH, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 6.05, .2, .3);
  const drop = eio(P(t, T.d10, T.qoldi));
  const p = lerp(.6, .0, drop);
  const off = eout(P(t, T.qoldi, T.qoldi + .3));
  return <Layer a={a} z={logZ(P(t, -1, 6), 1, 1.06)}>
    <Glow x={CX} y={980} r={520} a={.8} col="155,227,255" />
    <Snow t={t} a={1} />
    <div style={{ ...abs(CX - 155, 700) }}><Phone w={310} id="p1"><BatScreen p={p} off={off} /></Phone></div>
    <Pill s="❄ sovuqda 10 daqiqa" x={CX} y={1370} a={eout(P(t, T.sovuq - .1, T.sovuq + .2))} size={30} col={ICE} dark />
    <Stamp s="O‘CHDI" x={CX} y={980} t={t} t0={T.qoldi} t1={6.05} col={RED} size={64} rot={-8} />
    <Src s="misol" y={1410} a={eout(P(t, T.d10, T.d10 + .3))} />
    <Head t={t} t0={-1} t1={6.05} y={490} lines={[['60% edi —'], ['nega o‘chdi?', 'y']]} size={76} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.95, 11.55, .3, .3);
  return <Layer a={a} z={logZ(P(t, 5.95, 11.55), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.85} />
    <div style={{ ...abs(CX - 380, 790) }}><Cell w={760} t={t} sp={1} frost={0} tok={eout(P(t, T.tok - .2, T.tok + .2))} /></div>
    <Pill s="litiy ionlari" x={CX} y={1250} a={eout(P(t, T.ion - .2, T.ion + .2))} size={32} col={Y} />
    <Chip s="− → +  ionlar yuguradi = tok" y={1320} a={eout(P(t, T.yugur - .2, T.yugur + .2))} />
    <Head t={t} t0={5.95} t1={11.55} y={490} lines={[['batareya ichida —'], ['litiy ionlari', 'y']]} size={72} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 11.45, 16.15, .3, .3);
  const fr = eio(P(t, T.sovuq2 - .2, T.sekin + .6));
  // slow time for the ions: phase accumulates slower as frost grows
  const tt = 11.45 + (t - 11.45) * lerp(1, .12, fr);
  const aCar = eout(P(t, T.xuddi - .2, T.xuddi + .3));
  const jig = Math.sin(t * 40) * 3 * (t > T.damas && t < T.otol + .6 ? 1 : 0);
  return <Layer a={a} z={logZ(P(t, 11.45, 16.15), 1, 1.04)}>
    <Glow x={CX} y={900} r={520} a={.9} col="155,227,255" />
    <Snow t={t} a={fr * .8} />
    <div style={{ ...abs(CX - 330, 680), scale: '.87', transformOrigin: '50% 0' }}><Cell w={760} t={tt} sp={1} frost={fr} tok={0} /></div>
    <Pill s="❄ ionlar sekin" x={CX} y={1050} a={eout(P(t, T.sekin - .2, T.sekin + .2))} size={30} col={ICE} dark />
    {aCar > 0 && <div style={{ ...abs(CX - 190 + jig, 1110), opacity: aCar }}><Car w={380} id="dm" col={['#f3f5f8', '#9aa3b5']} lights={0} /></div>}
    <Pill s="Damas ham qishda qiyin o‘t oladi" x={CX} y={1340} a={eout(P(t, T.damas - .1, T.damas + .2))} size={26} col={WH} dark />
    <Head t={t} t0={11.45} t1={16.15} y={490} lines={[['sovuqda ionlar'], ['sekinlashadi', 'y']]} size={74} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 16.1, 19.95, .3, .3);
  const warn = eout(P(t, T.quvvat - .2, T.quvvat + .2));
  const off = eout(P(t, T.ochir, T.ochir + .35));
  const fl = Math.sin(t * 18) > 0 ? 1 : .55;
  return <Layer a={a} z={logZ(P(t, 16.1, 19.95), 1, 1.05)}>
    <Glow x={CX} y={980} r={520} a={.8 * fl} col="236,58,44" />
    <div style={{ ...abs(CX - 155, 715) }}><Phone w={310} id="p4"><BatScreen p={0} off={off} warn={warn} /></Phone></div>
    <Chip s="kuchlanish tushdi → «0%»" y={1370} a={eout(P(t, T.telefon, T.telefon + .3))} />
    <Head t={t} t0={16.1} t1={19.95} y={490} lines={[['telefon'], ['aldanadi', 'r']]} size={86} from="slam" />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 19.9, 21.55, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={19.9} t1={21.55} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 21.5, 30.2, .3, .3);
  const warm = eout(P(t, T.isisa - .3, T.isisa + .5));
  const p = .6 * eio(P(t, T.isisa, T.qaytib + .9));
  const aR = eout(P(t, T.apple - .2, T.apple + .3));
  const bx = SL + 30, bw = SR - SL - 60, lo = -20, hi = 45, X = (c: number) => bx + (c - lo) / (hi - lo) * bw;
  return <Layer a={a} z={logZ(P(t, 21.5, 30.2), 1, 1.04)}>
    <Glow x={CX} y={860} r={460} a={.5 + .5 * warm} col="255,178,74" />
    <div style={{ ...abs(CX - 130, 690), scale: String(lerp(1, .9, aR)), transformOrigin: '50% 0' }}><Phone w={260} id="p6" glow={warm}><BatScreen p={p} off={0} /></Phone></div>
    <Pill s="quvvat yo‘qolmagan ✓" x={CX} y={1250} a={eout(P(t, T.yoqol - .2, T.yoqol + .2)) * (1 - aR)} size={32} col={GRN} />
    {aR > 0 && <div style={{ position: 'absolute', left: 0, top: 0, opacity: aR }}>
      <div style={{ position: 'absolute', left: bx, top: 1215, width: bw, height: 56, borderRadius: 14, background: 'linear-gradient(90deg,#2b5f8f,#1d2230 30%)', overflow: 'hidden', border: '2px solid rgba(255,255,255,.15)' }}>
        <div style={{ position: 'absolute', left: X(0) - bx, width: (X(35) - X(0)) * eout(P(t, T.c0, T.c35 + .4)), top: 0, height: '100%', background: GRN }} />
      </div>
      {[[-20, '−20°'], [0, '0°'], [35, '35°'], [45, '45°']].map(([c, s]) => <div key={s as string} style={{ position: 'absolute', left: X(c as number) - 50, top: 1281, width: 100, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: c === 0 || c === 35 ? GRN : GR }}>{s}</div>)}
      <div style={{ position: 'absolute', left: X(17.5) - 150, top: 1225, width: 300, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: '#08240f', opacity: eout(P(t, T.c35, T.c35 + .4)) }}>yaxshi ishlaydi</div>
    </div>}
    <Src s="Apple Support: iPhone 0–35°C da yaxshi ishlaydi" y={1345} a={aR} />
    <Head t={t} t0={21.5} t1={30.2} y={490} lines={[['quvvat'], ['qaytib keladi', 'g']]} size={78} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 30.1, 35.7, .3, .3);
  const fill = eio(P(t, T.m20, T.yarm + .3));
  const aT = eout(P(t, T.m20 - .2, T.m20 + .3));
  return <Layer a={a} z={logZ(P(t, 30.1, 35.7), 1, 1.05)}>
    <Glow x={CX} y={960} r={520} a={.9} col="155,227,255" />
    <Snow t={t} a={.6} />
    {aT > 0 && <div style={{ ...abs(SL + 10, 760), opacity: aT }}><Thermo h={300} v={.12} label="−20°C" /></div>}
    <div style={{ ...abs(CX - 200, 690), opacity: eout(P(t, 30.1, 30.6)) }}>
      <div style={{ position: 'relative', width: 480, height: 480 }}>
        <div style={{ position: 'absolute', inset: 0 }}><DonutBig p={.5 * fill} /></div>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 120, color: Y, lineHeight: 1, textAlign: 'center' }}>≈{Math.round(50 * fill)}%<div style={{ fontFamily: MONO, fontWeight: 400, fontSize: 24, color: GR, marginTop: 8 }}>quvvat beradi</div></div>
        </div>
      </div>
    </div>
    <Src s="Battery University, BU-502: −20°C da ≈50% · vaqtinchalik" y={1260} a={eout(P(t, T.yarm - .3, T.yarm + .2))} />
    <Head t={t} t0={30.1} t1={35.7} y={490} lines={[['−20°C da'], ['taxminan yarmi', 'y']]} size={80} />
  </Layer>;
};
const DonutBig: React.FC<{ p: number }> = ({ p }) => {
  const r = 200, c = 2 * Math.PI * r;
  return <svg width={480} height={480} viewBox="0 0 480 480" style={{ display: 'block' }}>
    <circle cx="240" cy="240" r={r} fill="none" stroke="#1d2230" strokeWidth="44" />
    {p > .005 && <circle cx="240" cy="240" r={r} fill="none" stroke={ICE} strokeWidth="44" strokeLinecap="round" strokeDasharray={`${c * p} ${c}`} transform="rotate(-90 240 240)" />}
  </svg>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 35.65, END + 1, .3, .1);
  const aA = env(t, 35.65, T.buni - .05, .3, .3);
  const ph = eio(P(t, T.ichki - .3, T.chontak + .4));
  const warm = eout(P(t, T.tana - .2, T.isit + .3));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={960} r={520} a={.6 + .4 * warm} col="255,178,74" />
      <div style={{ ...abs(CX - 250, 720) }}><Jacket w={500} warm={warm} ph={ph} /></div>
      <Pill s="tana issiqligi ✓" x={CX} y={1250} a={eout(P(t, T.tana - .2, T.tana + .2))} size={32} col={GRN} />
      <Chip s="zaryad 60% → 60%" y={1310} a={eout(P(t, T.isit - .1, T.isit + .3))} />
      <Head t={t} t0={35.65} t1={T.buni} y={490} lines={[['ichki'], ['cho‘ntakda', 'g']]} size={84} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['sovuqda o‘chadigan'], ['do‘stga yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.qoldi, 12, 6], [T.ochir, 10, 6], [T.endi, 20, 5], [T.yoqol, 8, 7], [T.yarm, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1080} r={580} a={1} col="155,227,255" />
    <div style={{ position: 'absolute', left: 40, top: 0 }}><Snow t={3} a={.9} top={650} /></div>
    <div style={{ ...abs(CX + 40 - 175, 720) }}><Phone w={350} id="pc"><BatScreen p={0} off={0} warn={1} /></Phone></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>qishda telefon</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>NEGA TEZ<br />O‘CHADI?</div>
    <div style={{ ...abs(SL, 1470, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 56, lineHeight: 1.15, color: RED }}>QUVVAT YO‘QOLMAYDI —<br /><span style={{ color: GRN }}>U «MUZLAYDI»</span></div>
  </AbsoluteFill>;
};
