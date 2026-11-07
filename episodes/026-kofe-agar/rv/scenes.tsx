import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* piyola with green tea (kind = 'tea') or a coffee cup with saucer (kind = 'coffee') */
const Cup: React.FC<{ w: number; kind: 'tea' | 'coffee'; id: string; t?: number }> = ({ w, kind, id, t = 0 }) => {
  const steam = [0, 1, 2].map((i) => { const ph = (t * .6 + i / 3) % 1; return <path key={i} d={`M${80 + i * 20} ${30 - ph * 40} C ${70 + i * 20} ${14 - ph * 40} ${92 + i * 20} ${8 - ph * 40} ${84 + i * 20} ${-8 - ph * 40}`} stroke="#fff" strokeOpacity={.45 * (1 - ph)} strokeWidth="5" fill="none" strokeLinecap="round" />; });
  if (kind === 'tea') return (
    <svg width={w} height={w * .7} viewBox="0 0 200 140" style={{ display: 'block', overflow: 'visible' }}>
      <defs><linearGradient id={`cuT${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c9d4ea" /><stop offset=".5" stopColor="#ffffff" /><stop offset="1" stopColor="#b7c2d8" /></linearGradient></defs>
      {steam}
      <path d="M20 40 L 180 40 C 176 96 140 124 100 124 C 60 124 24 96 20 40 Z" fill={`url(#cuT${id})`} stroke="#5a6272" strokeWidth="3" />
      <ellipse cx="100" cy="40" rx="80" ry="12" fill="#a8b84a" stroke="#5a6272" strokeWidth="3" />
      <path d="M40 70 C 70 84 130 84 160 70" stroke="#2a5fb0" strokeWidth="6" fill="none" />
      <path d="M60 90 C 80 98 120 98 140 90" stroke="#2a5fb0" strokeWidth="3" fill="none" />
      <rect x="76" y="122" width="48" height="10" rx="4" fill="#9aa3b5" />
    </svg>);
  return (
    <svg width={w} height={w * .7} viewBox="0 0 200 140" style={{ display: 'block', overflow: 'visible' }}>
      <defs><linearGradient id={`cuC${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d8d2c8" /><stop offset=".5" stopColor="#ffffff" /><stop offset="1" stopColor="#c4bcb0" /></linearGradient></defs>
      {steam}
      <ellipse cx="100" cy="128" rx="90" ry="12" fill="#cfc8bc" stroke="#5a6272" strokeWidth="3" />
      <path d="M150 50 C 196 50 196 104 146 100" stroke="#e6e0d6" strokeWidth="12" fill="none" />
      <path d="M40 30 L 160 30 L 150 108 C 148 120 52 120 50 108 Z" fill={`url(#cuC${id})`} stroke="#5a6272" strokeWidth="3" />
      <ellipse cx="100" cy="30" rx="60" ry="10" fill="#4a2a14" stroke="#5a6272" strokeWidth="3" />
      <ellipse cx="96" cy="29" rx="22" ry="4" fill="#c8915a" opacity=".7" />
    </svg>);
};

/* simple vertical bar with value */
const Bar: React.FC<{ x: number; base: number; h: number; w: number; col: string; label: string; val: string; a: number }> = ({ x, base, h, w, col, label, val, a }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: 0, opacity: clamp(a * 2) }}>
    <div style={{ position: 'absolute', left: 0, top: base - h * clamp(a), width: w, height: h * clamp(a), borderRadius: '16px 16px 4px 4px', background: `linear-gradient(180deg, ${col}, ${col}77)` }} />
    <div style={{ position: 'absolute', left: 0, top: base - h * clamp(a) - 86, width: w, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 66, color: col, lineHeight: 1, whiteSpace: 'nowrap' }}>{val}</div>
    <div style={{ position: 'absolute', left: 0, top: base + 12, width: w, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH }}>{label}</div>
  </div>;

/* water drop column: litres per cup */
const Drop: React.FC<{ w: number; fill: number; id: string }> = ({ w, fill, id }) => (
  <svg width={w} height={w * 1.3} viewBox="0 0 200 260" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <clipPath id={`dpC${id}`}><path d="M100 6 C 140 70 190 120 190 170 C 190 222 150 254 100 254 C 50 254 10 222 10 170 C 10 120 60 70 100 6 Z" /></clipPath>
      <linearGradient id={`dpG${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9BE3FF" /><stop offset="1" stopColor="#3a7bd5" /></linearGradient>
    </defs>
    <path d="M100 6 C 140 70 190 120 190 170 C 190 222 150 254 100 254 C 50 254 10 222 10 170 C 10 120 60 70 100 6 Z" fill="#141a26" stroke="#9BE3FF" strokeWidth="4" />
    <rect x="0" y={260 - 250 * fill} width="200" height="260" fill={`url(#dpG${id})`} clipPath={`url(#dpC${id})`} />
    <path d="M60 150 C 56 120 70 100 84 86" stroke="#fff" strokeOpacity=".5" strokeWidth="8" fill="none" strokeLinecap="round" />
  </svg>
);

/* tiny olympic pool icon */
const Pool: React.FC<{ w: number }> = ({ w }) => (
  <div style={{ width: w, height: w * .5, borderRadius: 3, background: 'linear-gradient(180deg,#5ab8f0,#2a6fc0)', border: '1.5px solid #cfe8ff', boxSizing: 'border-box' }} />
);

const Chip: React.FC<{ s: string; y: number; a: number; x?: number }> = ({ s, y, a, x = CX }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% 0', opacity: a, padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 23, color: WH, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.05, .2, .3);
  const sw = eio(P(t, T.kofe - .3, T.kofe + .4));
  return <Layer a={a} z={logZ(P(t, -1, 5), 1, 1.06)}>
    <Glow x={CX} y={1000} r={520} a={.9} col={sw > .5 ? '200,145,90' : '168,184,74'} />
    <div style={{ ...abs(CX - 210, 800), opacity: 1 - sw, translate: `${-sw * 300}px 0`, rotate: `${-sw * 20}deg` }}><Cup w={420} kind="tea" id="t1" t={t} /></div>
    <div style={{ ...abs(CX - 210, 780), opacity: sw, translate: `${(1 - sw) * 300}px 0` }}><Cup w={420} kind="coffee" id="c1" t={t} /></div>
    <Pill s="ko‘k choy ✕" x={CX - 200} y={1200} a={eout(P(t, T.choy - .1, T.choy + .2)) * (1 - sw)} size={30} col={GRN} dark />
    <Pill s="kofe ✓" x={CX} y={1200} a={sw} size={34} col={Y} />
    <Pill s="39,5 mln kishi" x={CX} y={1300} a={eout(P(t, T.uzb, T.uzb + .3))} size={28} col={WH} dark />
    <Head t={t} t0={-1} t1={5.05} y={490} lines={[['agar hamma'], ['kofega o‘tsa?', 'y']]} size={80} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.0, 12.35, .3, .3);
  const aT = eback(P(t, T.mg28 - .3, T.mg28 + .3)), aC = eback(P(t, T.mg96 - .3, T.mg96 + .3));
  const base = 1200;
  return <Layer a={a} z={logZ(P(t, 5, 12.35), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="200,145,90" />
    <div style={{ ...abs(SL + 110, 1225), opacity: aT > 0 ? 1 : 0 }}><Cup w={140} kind="tea" id="t2" t={t} /></div>
    <div style={{ ...abs(SR - 250, 1225), opacity: aC > 0 ? 1 : 0 }}><Cup w={140} kind="coffee" id="c2" t={t} /></div>
    <Bar x={SL + 80} base={base} h={28 * 3.6} w={200} col={GRN} label="" val="28 mg" a={aT} />
    <Bar x={SR - 280} base={base} h={96 * 3.6} w={200} col={Y} label="" val="96 mg" a={aC} />
    <Stamp s="×3,4" x={CX} y={1000} t={t} t0={T.uch} t1={12.35} col={RED} size={74} rot={-6} />
    <Src s="1 chashka (237 ml) · Mayo Clinic: kofe 96 mg, ko‘k choy 28 mg kofein" y={1380} a={eout(P(t, T.mg96, T.mg96 + .4))} />
    <Head t={t} t0={5.0} t1={12.35} y={490} lines={[['kofein'], ['bir chashkada', 'y']]} size={78} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 12.3, 23.05, .3, .3);
  const n = eio(P(t, T.kofe2, T.mg384 + .5));
  const aL = eout(P(t, T.kunlik - .2, T.kunlik + .3));
  const bx = SL + 30, bw = SR - SL - 60, sc = 450;
  const aQ = eout(P(t, T.qaynona - .2, T.qaynona + .3));
  return <Layer a={a} z={logZ(P(t, 12.3, 23.05), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.85} col="200,145,90" />
    <Layer a={1 - aQ}>
      {[0, 1, 2, 3].map((i) => <div key={i} style={{ ...abs(SL + 20 + i * 210, 700), opacity: eout(P(t, T.c4 - .2 + i * .12, T.c4 + .1 + i * .12)), scale: String(lerp(.6, 1, eback(P(t, T.c4 - .2 + i * .12, T.c4 + .2 + i * .12)))) }}><Cup w={190} kind="coffee" id={`c3${i}`} t={t + i} /></div>)}
    </Layer>
    {aQ > 0 && <div style={{ ...abs(CX - 160, 650), opacity: aQ }}><Moon w={320} t={t} /></div>}
    <div style={{ position: 'absolute', left: bx, top: 1020, width: bw, height: 76, borderRadius: 18, background: '#1d2230', overflow: 'hidden', opacity: eout(P(t, T.kofe2 - .3, T.kofe2)) }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${384 * n / sc * 100}%`, background: `linear-gradient(90deg, ${Y}, #f28a1c)` }} />
      <div style={{ position: 'absolute', left: 22, top: 12, fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: '#1A1306' }}>{fmt(384 * n)} mg</div>
    </div>
    {aL > 0 && <div style={{ position: 'absolute', left: bx + bw * 400 / sc - 3, top: 1000, width: 6, height: 116, background: RED, opacity: aL }} />}
    <Pill s="me’yor 400 mg" x={bx + bw * 400 / sc - 40} y={1160} a={aL} size={26} col={RED} />
    <Src s="4 × 96 = 384 mg · Mayo Clinic: kattalar uchun kuniga 400 mg gacha" y={1220} a={eout(P(t, T.l400, T.l400 + .4))} />
    <Pill s="qaynona tun bo‘yi uyg‘oq" x={CX} y={1310} a={aQ} size={30} col={ICE} dark />
    <Head t={t} t0={12.3} t1={T.qaynona - .1} y={490} lines={[['4 chashka'], ['= 384 mg', 'y']]} size={80} />
    <Head t={t} t0={T.qaynona - .1} t1={23.05} y={490} lines={[['qaynona'], ['uxlamaydi', 'y']]} size={80} />
  </Layer>;
};
const Moon: React.FC<{ w: number; t: number }> = ({ w, t }) => (
  <svg width={w} height={w} viewBox="0 0 300 300" style={{ display: 'block', overflow: 'visible' }}>
    <defs><filter id="mnB" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter></defs>
    <circle cx="150" cy="140" r="96" fill="#FFCF3A" opacity=".35" filter="url(#mnB)" />
    <path d="M190 50 A 96 96 0 1 0 230 200 A 78 78 0 1 1 190 50 Z" fill="#FFE08A" />
    {[[60, 60], [250, 90], [40, 210], [260, 250]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4 + 2 * Math.sin(t * 3 + i)} fill="#fff" opacity=".8" />)}
    <g transform="translate(118 120)"><circle cx="0" cy="0" r="14" fill="#fff" /><circle cx="44" cy="0" r="14" fill="#fff" /><circle cx="0" cy="0" r="7" fill="#141822" /><circle cx="44" cy="0" r="7" fill="#141822" /></g>
  </svg>
);

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 23.0, 24.65, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={23.0} t1={24.65} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 24.6, 30.75, .3, .3);
  const fT = eio(P(t, T.l34 - .4, T.l34 + .5)) * 34 / 140, fC = eio(P(t, T.l140 - .6, T.l140 + .5));
  return <Layer a={a} z={logZ(P(t, 24.6, 30.75), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="91,140,255" />
    <div style={{ ...abs(SL + 40, 760) }}><Drop w={300} fill={fT} id="d1" /></div>
    <div style={{ ...abs(SR - 340, 760) }}><Drop w={300} fill={fC} id="d2" /></div>
    <Num v={`${fmt(140 * fT)} l`} x={SL + 190} y={1170} a={eout(P(t, T.l34 - .3, T.l34))} size={84} col={ICE} />
    <Num v={`${fmt(140 * fC)} l`} x={SR - 190} y={1170} a={eout(P(t, T.l140 - .5, T.l140 - .2))} size={84} col={Y} />
    <Pill s="1 chashka choy" x={SL + 190} y={720} a={eout(P(t, T.choy2 - .2, T.choy2 + .2))} size={26} col={GRN} dark />
    <Pill s="1 chashka kofe" x={SR - 190} y={720} a={eout(P(t, T.kofe3 - .2, T.kofe3 + .2))} size={26} col={Y} dark />
    <Src s="«suv izi» · Chapagain & Hoekstra, Ecological Economics, 2007" y={1290} a={eout(P(t, T.l34, T.l34 + .4))} />
    <Head t={t} t0={24.6} t1={30.75} y={490} lines={[['dalada sarflangan'], ['suv', 'y']]} size={78} />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 30.7, END + 1, .3, .1);
  const aA = env(t, 30.7, T.buni - .05, .3, .3);
  const n = eio(P(t, T.mlrd4 - .5, T.mlrd4 + .8));
  const np = Math.round(1600 * eio(P(t, T.p1600 - .3, T.bass + .3)));
  const cols = 40, cw = (SR - SL - 40) / cols;
  const shown = Math.ceil(np / 4); // 1 icon = 4 pools
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={540} a={.85} col="91,140,255" />
      <Chip s="39,5 mln × (140 − 34) l = 4,19 mlrd l" y={690} a={eout(P(t, T.bittadan - .2, T.bittadan + .3))} />
      <Num v="39,5 mln kishi" y={800} a={eout(P(t, T.m395 - .3, T.m395)) * (1 - eout(P(t, T.mlrd4 - .6, T.mlrd4 - .3)))} size={96} col={WH} />
      <Num v={`${(4.19 * n).toFixed(2).replace('.', ',')} mlrd l`} y={760} a={eout(P(t, T.mlrd4 - .5, T.mlrd4 - .2))} size={104} col={Y} />
      <Pill s="har kuni" x={CX} y={890} a={eout(P(t, T.har - .1, T.har + .2))} size={30} col={ICE} dark />
      <div style={{ position: 'absolute', left: SL + 20, top: 950, width: SR - SL - 40, display: 'flex', flexWrap: 'wrap', gap: 2, opacity: eout(P(t, T.p1600 - .3, T.p1600)) }}>
        {Array.from({ length: shown }, (_, i) => <Pool key={i} w={cw - 2} />)}
      </div>
      <Num v={`${fmt(np)}+ basseyn`} y={1230} a={eout(P(t, T.p1600 - .2, T.p1600 + .1))} size={74} col={WH} />
      <Src s="olimpiya basseyni ≈ 2,5 mln l · aholi: 39 535 225 (1.10.2026) · taxminiy hisob" y={1330} a={eout(P(t, T.olimp - .2, T.olimp + .3))} />
      <Head t={t} t0={30.7} t1={T.buni} y={490} lines={[['butun o‘zbekiston'], ['bir kunda', 'y']]} size={72} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['choyxonadagi'], ['do‘stga yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.kofe, 8, 7], [T.mg96, 8, 7], [T.uch, 12, 6], [T.mg384, 8, 7], [T.endi, 20, 5], [T.l140, 12, 6], [T.mlrd4, 12, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1060} r={580} a={1} col="200,145,90" />
    <div style={{ ...abs(CX + 40 - 380, 860) }}><Cup w={330} kind="tea" id="tc" t={t} /></div>
    <div style={{ ...abs(CX + 40 + 40, 840) }}><Cup w={340} kind="coffee" id="cc" t={t} /></div>
    <div style={{ ...abs(CX + 40 - 60, 900), width: 120, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: RED }}>→</div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>agar hamma choy o‘rniga</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>KOFE<br />ICHSA?</div>
    <div style={{ ...abs(SL, 1300, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.15, color: WH }}>1 CHASHKA = <span style={{ color: Y }}>140 L SUV</span><br /><span style={{ color: RED }}>HAR KUNI 4 MLRD LITR</span></div>
  </AbsoluteFill>;
};
