import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
const DAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
/* week strip: f = how far the 3 days off are flipped green */
const Week: React.FC<{ w: number; f: number; off?: number }> = ({ w, f, off = 3 }) => {
  const cw = w / 7 - 10;
  return <div style={{ display: 'flex', gap: 10, width: w }}>
    {DAYS.map((d, i) => {
      const isOff = i >= 7 - off;
      const k = isOff ? clamp(f * 3 - (i - (7 - off))) : 0;
      const col = k > .5 ? GRN : (i === 6 ? GRN : BLUE);
      return <div key={d} style={{ width: cw, height: cw * 1.45, borderRadius: 16, background: '#151a24', border: `3px solid ${col}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', rotate: `${(k > 0 && k < 1 ? Math.sin(k * Math.PI) * 18 : 0)}deg`, boxShadow: k > .5 ? `0 0 26px ${GRN}66` : 'none' }}>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: cw * .42, color: WH }}>{d}</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: cw * .2, color: col, marginTop: 6 }}>{(k > .5 || i === 6) ? 'dam' : 'dars'}</div>
      </div>;
    })}
  </div>;
};

const School: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * .62} viewBox="0 0 400 250" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="scW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0e6d6" /><stop offset="1" stopColor="#c9b89c" /></linearGradient></defs>
    <path d="M200 10 L 270 55 L 130 55 Z" fill="#EC3A2C" />
    <rect x="130" y="55" width="140" height="190" fill="url(#scW)" />
    <rect x="20" y="95" width="110" height="150" fill="url(#scW)" />
    <rect x="270" y="95" width="110" height="150" fill="url(#scW)" />
    <rect x="10" y="85" width="130" height="14" fill="#a33" />
    <rect x="260" y="85" width="130" height="14" fill="#a33" />
    {[0, 1].map((r) => [0, 1, 2].map((c) => <rect key={`l${r}${c}`} x={32 + c * 32} y={115 + r * 55} width="22" height="34" rx="3" fill="#5B8CFF" opacity=".8" />))}
    {[0, 1].map((r) => [0, 1, 2].map((c) => <rect key={`r${r}${c}`} x={282 + c * 32} y={115 + r * 55} width="22" height="34" rx="3" fill="#5B8CFF" opacity=".8" />))}
    <rect x="178" y="170" width="44" height="75" rx="4" fill="#6a4a2a" />
    <circle cx="200" cy="105" r="22" fill="#fff" stroke="#3a4152" strokeWidth="4" />
    <path d="M200 92 L 200 105 L 210 112" stroke="#3a4152" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

/* kid head */
const Kid: React.FC<{ s: number; c: string; bob: number }> = ({ s, c, bob }) => (
  <svg width={s} height={s * 1.2} viewBox="0 0 50 60" style={{ display: 'block', translate: `0 ${bob}px` }}>
    <path d="M6 60 C 8 40 42 40 44 60 Z" fill={c} />
    <circle cx="25" cy="22" r="14" fill="#e8b98f" />
    <path d="M11 20 C 12 6 38 6 39 20 C 34 14 18 14 11 20 Z" fill="#3a2614" />
    <circle cx="20" cy="23" r="1.8" fill="#222" /><circle cx="30" cy="23" r="1.8" fill="#222" />
    <path d="M20 29 Q 25 33 30 29" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round" />
  </svg>
);

/* mum with headscarf, holding a ladle */
const Mum: React.FC<{ w: number; tired: number }> = ({ w, tired }) => (
  <svg width={w} height={w * 1.3} viewBox="0 0 200 260" style={{ display: 'block', overflow: 'visible' }}>
    <path d="M30 260 C 34 170 166 170 170 260 Z" fill="#c2416a" />
    <rect x="70" y="190" width="60" height="70" rx="10" fill="#f3f5f8" opacity=".9" />
    <circle cx="100" cy="105" r="48" fill="#e8b98f" />
    <path d="M48 110 C 40 40 160 40 152 110 C 150 70 50 70 48 110 Z" fill="#3a5bd0" />
    <path d="M52 100 C 60 130 50 160 40 175 L 60 175 C 70 150 68 125 62 100 Z" fill="#3a5bd0" />
    <circle cx="84" cy={108 + tired * 2} r="4" fill="#222" /><circle cx="116" cy={108 + tired * 2} r="4" fill="#222" />
    <path d={`M84 ${130 + tired * 2} Q 100 ${138 - tired * 14} 116 ${130 + tired * 2}`} stroke="#222" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M160 150 L 186 60" stroke="#9aa3b2" strokeWidth="8" strokeLinecap="round" />
    <ellipse cx="188" cy="52" rx="20" ry="13" fill="#9aa3b2" />
  </svg>
);

/* balance scale */
const Scale: React.FC<{ w: number; tilt: number }> = ({ w, tilt }) => {
  const a = tilt * 14, r = Math.PI * a / 180;
  const lx = 200 - 150 * Math.cos(r), ly = 70 - 150 * Math.sin(r), rx = 200 + 150 * Math.cos(r), ry = 70 + 150 * Math.sin(r);
  return <svg width={w} height={w * .72} viewBox="0 0 400 290" style={{ display: 'block', overflow: 'visible' }}>
    <rect x="190" y="70" width="20" height="190" fill="#7d8697" />
    <rect x="130" y="256" width="140" height="20" rx="8" fill="#5a6274" />
    <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#b7bfcc" strokeWidth="12" strokeLinecap="round" />
    <circle cx="200" cy="70" r="16" fill={Y} />
    {[[lx, ly, GRN], [rx, ry, RED]].map(([x, y, c], i) => <g key={i}>
      <line x1={x as number} y1={y as number} x2={(x as number) - 50} y2={(y as number) + 90} stroke="#7d8697" strokeWidth="3" />
      <line x1={x as number} y1={y as number} x2={(x as number) + 50} y2={(y as number) + 90} stroke="#7d8697" strokeWidth="3" />
      <path d={`M${(x as number) - 64} ${(y as number) + 90} L ${(x as number) + 64} ${(y as number) + 90} C ${(x as number) + 50} ${(y as number) + 122} ${(x as number) - 50} ${(y as number) + 122} ${(x as number) - 64} ${(y as number) + 90} Z`} fill={c as string} opacity=".85" />
    </g>)}
  </svg>;
};

const Clock: React.FC<{ s: number; t: number }> = ({ s, t }) => (
  <svg width={s} height={s} viewBox="0 0 200 200" style={{ display: 'block' }}>
    <circle cx="100" cy="100" r="90" fill="#151a24" stroke={Y} strokeWidth="10" />
    {Array.from({ length: 12 }).map((_, i) => { const r = i * Math.PI / 6; return <line key={i} x1={100 + 70 * Math.sin(r)} y1={100 - 70 * Math.cos(r)} x2={100 + 80 * Math.sin(r)} y2={100 - 80 * Math.cos(r)} stroke={WH} strokeWidth="5" />; })}
    <line x1="100" y1="100" x2={100 + 50 * Math.sin(t * .8)} y2={100 - 50 * Math.cos(t * .8)} stroke={WH} strokeWidth="9" strokeLinecap="round" />
    <line x1="100" y1="100" x2={100 + 68 * Math.sin(t * 6)} y2={100 - 68 * Math.cos(t * 6)} stroke={RED} strokeWidth="5" strokeLinecap="round" />
    <circle cx="100" cy="100" r="8" fill={Y} />
  </svg>
);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.55, .2, .3);
  const f = eio(P(t, T.uch - .1, T.dam + .5));
  return <Layer a={a} z={logZ(P(t, -1, 3.55), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.9} col="61,220,132" />
    <div style={{ ...abs(SL + 10, 880) }}><Week w={SR - SL - 20} f={f} /></div>
    <Pill s="4 kun dars · 3 kun dam" x={CX} y={1200} a={eout(P(t, T.dam, T.dam + .3))} size={32} col={GRN} />
    <Pill s="xayoliy savol" x={CX} y={1300} a={eout(P(t, .3, .7))} size={24} col={GR} dark />
    <Head t={t} t0={-1} t1={3.55} y={490} lines={[['agar haftada'], ['3 kun dam olish?', 'y']]} size={84} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 3.5, 9.45, .3, .3);
  const n1 = 11118 * eio(P(t, T.n11 - .2, T.maktab));
  const n2 = 6870000 * eio(P(t, T.n68 - .2, T.oquv));
  return <Layer a={a} z={logZ(P(t, 3.5, 9.45), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <div style={{ ...abs(CX - 200, 690), opacity: eout(P(t, 3.6, 4.1)) }}><School w={400} /></div>
    <Num v={fmt(n1)} x={CX} y={960} a={eout(P(t, T.n11 - .3, T.n11))} size={120} col={WH} />
    <Pill s="maktab" x={CX} y={1100} a={eout(P(t, T.maktab - .2, T.maktab + .2))} size={28} col={WH} dark />
    <Num v={fmt(n2)} x={CX} y={1150} a={eout(P(t, T.n68 - .3, T.n68))} size={120} col={Y} />
    <Pill s="o‘quvchi" x={CX} y={1290} a={eout(P(t, T.oquv - .2, T.oquv + .2))} size={28} col={Y} />
    <Src s="Milliy statistika qo‘mitasi · 2025/2026 o‘quv yili boshi" y={1370} a={eout(P(t, T.n11, T.n11 + .4))} />
    <Head t={t} t0={3.5} t1={9.45} y={490} lines={[['o‘zbekistonda'], ['maktablar', 'y']]} size={84} />
  </Layer>;
};

const KIDC = ['#5B8CFF', '#3DDC84', '#FFCF3A', '#EC3A2C', '#9BE3FF', '#c2416a'];
const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 9.4, 16.1, .3, .3);
  const k = eout(P(t, T.har - .1, T.uyda + .3));
  const tired = eout(P(t, T.emas - .2, T.smena));
  return <Layer a={a} z={logZ(P(t, 9.4, 16.1), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} col="236,58,44" />
    {/* house outline */}
    <svg width={1000} height={1500} style={{ position: 'absolute', left: 0, top: 0 }}>
      <path d={`M${SL + 30} 900 L ${CX} 700 L ${SR - 30} 900 L ${SR - 30} 1280 L ${SL + 30} 1280 Z`} fill="rgba(20,24,34,.85)" stroke="#4a5266" strokeWidth="6" />
    </svg>
    {Array.from({ length: 14 }).map((_, i) => {
      const p = clamp(k * 14 - i);
      if (p <= 0) return null;
      const col = i % 7, row = Math.floor(i / 7);
      return <div key={i} style={{ ...abs(SL + 50 + col * 66 + row * 33, 960 + row * 130), scale: String(eback(p)), opacity: p }}><Kid s={80} c={KIDC[i % 6]} bob={Math.sin(t * 9 + i) * 5} /></div>;
    })}
    <div style={{ ...abs(SR - 250, 960), opacity: eout(P(t, T.onalar - .3, T.onalar + .1)) }}><Mum w={200} tired={tired} /></div>
    <Pill s="har qo‘shimcha kun — millionlab bola uyda" x={CX} y={1330} a={eout(P(t, T.mill - .2, T.mill + .2))} size={24} col={WH} dark />
    <Stamp s="QO‘SHIMCHA SMENA" x={CX} y={820} t={t} t0={T.smena} t1={16.1} col={RED} size={52} rot={-5} />
    <Head t={t} t0={9.4} t1={T.onalar - .1} y={490} lines={[['bolalar'], ['uyda', 'y']]} size={92} />
    <Head t={t} t0={T.onalar - .1} t1={16.1} y={490} lines={[['onalar uchun —'], ['dam olish emas', 'r']]} size={80} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 16.05, 17.8, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={16.05} t1={17.8} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 17.7, 24.65, .3, .3);
  const lit = eio(P(t, T.s24 - .3, T.shtat + .3));
  const n = Math.max(1, 1600 * eio(P(t, T.n1600 - .35, T.tuman)));
  return <Layer a={a} z={logZ(P(t, 17.7, 24.65), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="91,140,255" />
    <div style={{ ...abs(SL + 70, 750), display: 'grid', gridTemplateColumns: 'repeat(10, 64px)', gap: 8 }}>
      {Array.from({ length: 50 }).map((_, i) => {
        const on = i < 24 && clamp(lit * 24 - i) > 0;
        return <div key={i} style={{ width: 64, height: 40, borderRadius: 8, background: on ? GRN : '#1d2230', boxShadow: on ? `0 0 14px ${GRN}66` : 'none' }} />;
      })}
    </div>
    <Pill s="AQSh: 24 / 50 shtat" x={CX} y={1050} a={eout(P(t, T.shtat - .2, T.shtat + .2))} size={28} col={GRN} />
    <Num v={`≈${fmt(n)}`} x={CX} y={1100} a={eout(P(t, T.n1600 - .3, T.n1600))} size={130} col={Y} />
    <Pill s="maktab tumani · haftada 4 kun" x={CX} y={1270} a={eout(P(t, T.tuman - .2, T.tuman + .2))} size={28} col={WH} dark />
    <Src s="Oregon State Univ. (Hallie E. Ford Center) · K-12 Dive, 2024" y={1360} a={eout(P(t, T.n1600, T.n1600 + .4))} />
    <Head t={t} t0={17.7} t1={24.65} y={490} lines={[['amerikada'], ['allaqachon bor', 'y']]} size={84} />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 24.6, 31.5, .3, .3);
  const sw = Math.sin(t * 2.2) * .35 * (1 - eout(P(t, T.natija, T.yomon + .3)));
  const second = eout(P(t, T.lekin - .2, T.lekin + .3));
  const drop = eio(P(t, T.bilim - .2, T.pas + .4));
  return <Layer a={a} z={logZ(P(t, 24.6, 31.5), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col={second > .5 ? '236,58,44' : '246,185,59'} />
    <div style={{ opacity: 1 - second }}>
      <div style={{ ...abs(CX - 230, 760) }}><Scale w={460} tilt={sw} /></div>
      <Pill s="yaxshi" x={CX - 150} y={1130} a={eout(P(t, T.yaxshi - .2, T.yaxshi + .2))} size={28} col={GRN} />
      <Pill s="yomon" x={CX + 150} y={1130} a={eout(P(t, T.yomon - .2, T.yomon + .2))} size={28} col={RED} />
      <Pill s="farq sezilmadi" x={CX} y={1230} a={eout(P(t, T.yomon, T.yomon + .3))} size={30} col={Y} />
    </div>
    {second > 0 && <div style={{ opacity: second }}>
      <Card x={SL + 40} y={760} w={SR - SL - 80}>
        <div style={{ padding: 28 }}>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, marginBottom: 18 }}>dars soatlari qisqarsa:</div>
          <svg width={720} height={300} viewBox="0 0 720 300">
            <line x1="20" y1="280" x2="700" y2="280" stroke="#4a5266" strokeWidth="4" />
            <polyline points={`40,80 260,90 ${260 + 200 * drop},${90 + 150 * drop} ${260 + 400 * drop},${90 + 170 * drop}`} fill="none" stroke={RED} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <text x="40" y="60" fontFamily="Int, sans-serif" fontWeight="800" fontSize="28" fill="#F3F5F8">bilim</text>
            {drop > .8 && <path d={`M${660} ${200} l 0 50 l -16 -18 m 16 18 l 16 -18`} stroke={RED} strokeWidth="6" fill="none" />}
          </svg>
        </div>
      </Card>
    </div>}
    <Src s="Missuri tadqiqoti (SAS Institute, 2024) · K-12 Dive" y={1360} a={eout(P(t, T.natija, T.natija + .4))} />
    <Head t={t} t0={24.6} t1={T.lekin - .1} y={490} lines={[['missurida'], ['farq yo‘q', 'y']]} size={86} />
    <Head t={t} t0={T.lekin - .1} t1={31.5} y={490} lines={[['soat kamaysa —'], ['bilim pasaydi', 'r']]} size={80} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 31.4, END + 1, .3, .1);
  const aA = env(t, 31.4, T.buni - .05, .3, .3);
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={1000} r={520} a={.85} />
      <div style={{ ...abs(CX - 180, 780), opacity: eout(P(t, 31.5, 32)) }}><Clock s={360} t={t} /></div>
      <Stamp s="SOATLAR MUHIM" x={CX} y={1230} t={t} t0={T.soatlar} t1={T.buni} col={GRN} size={58} rot={-4} />
      <Head t={t} t0={31.4} t1={T.buni} y={490} lines={[['sir kunlarda emas —'], ['soatlarda', 'y']]} size={80} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['dam olishni sevadigan'], ['do‘stga yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.dam, 8, 7], [T.n11, 6, 7], [T.n68, 8, 7], [T.smena, 12, 6], [T.endi, 20, 5], [T.n1600, 8, 7], [T.pas, 10, 6], [T.soatlar, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1080} r={600} a={1} col="61,220,132" />
    <div style={{ ...abs(SL + 40, 900) }}><Week w={SR - SL + 20} f={1} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>agar… · maktab</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>HAFTADA 3 KUN<br />DAM OLISH?</div>
    <div style={{ ...abs(SL, 1240, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: GRN }}>AQShDA 1 600 TUMAN<br /><span style={{ color: RED }}>ALLAQACHON SINALGAN</span></div>
    <div style={{ ...abs(SL, 1400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>6 870 000 o‘quvchi · 11 118 maktab</div>
  </AbsoluteFill>;
};
