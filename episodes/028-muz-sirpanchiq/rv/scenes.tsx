import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* slab of ice, seen slightly from above */
const IceSlab: React.FC<{ w: number; id: string; wet?: number }> = ({ w, id, wet = 0 }) => (
  <svg width={w} height={w * .42} viewBox="0 0 500 210" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`isT${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e9f8ff" /><stop offset=".5" stopColor="#9BE3FF" /><stop offset="1" stopColor="#5fb6dc" /></linearGradient>
      <linearGradient id={`isF${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6cc4ea" /><stop offset="1" stopColor="#2c6f93" /></linearGradient>
    </defs>
    <path d="M40 60 L 460 60 L 500 110 L 0 110 Z" fill={`url(#isT${id})`} />
    <path d="M0 110 L 500 110 L 500 190 L 0 190 Z" fill={`url(#isF${id})`} />
    <path d="M70 72 L 200 72" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
    <path d="M260 92 L 420 92" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".55" />
    <path d="M120 130 L 160 170 M 330 125 L 300 175" stroke="#d9f4ff" strokeWidth="3" opacity=".5" />
    {wet > 0 && <ellipse cx="250" cy="88" rx={150 * wet} ry={14 * wet} fill="#5B8CFF" opacity={.55 * wet} />}
  </svg>
);

/* winter boot (side view) */
const Boot: React.FC<{ w: number; id: string }> = ({ w, id }) => (
  <svg width={w} height={w * .9} viewBox="0 0 200 180" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`bt${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8a5a3a" /><stop offset="1" stopColor="#4a2c18" /></linearGradient></defs>
    <path d="M40 0 L 110 0 L 112 100 C 150 104 190 118 192 150 L 30 150 C 30 110 40 60 40 0 Z" fill={`url(#bt${id})`} />
    <rect x="36" y="0" width="80" height="22" rx="8" fill="#d8d2c8" />
    <rect x="24" y="148" width="172" height="22" rx="9" fill="#23262e" />
    <path d="M60 50 L 100 50 M 60 75 L 100 75" stroke="#2b190c" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

/* elephant balancing on a stiletto heel */
const Elephant: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * .9} viewBox="0 0 400 360" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id="elB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b7bfcc" /><stop offset="1" stopColor="#6c7586" /></linearGradient>
      <linearGradient id="elH" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9cc6" /><stop offset="1" stopColor="#d6337a" /></linearGradient>
    </defs>
    <ellipse cx="190" cy="140" rx="135" ry="95" fill="url(#elB)" />
    <rect x="100" y="190" width="42" height="80" rx="18" fill="#7d8697" />
    <rect x="230" y="190" width="42" height="80" rx="18" fill="#7d8697" />
    <circle cx="315" cy="110" r="62" fill="url(#elB)" />
    <ellipse cx="285" cy="112" rx="40" ry="55" fill="#9aa3b2" stroke="#6c7586" strokeWidth="4" />
    <path d="M360 120 C 395 160 380 220 350 236" stroke="#8d96a6" strokeWidth="26" fill="none" strokeLinecap="round" />
    <circle cx="330" cy="92" r="7" fill="#1a1d24" />
    <path d="M60 130 C 40 140 36 160 42 176" stroke="#7d8697" strokeWidth="8" fill="none" strokeLinecap="round" />
    {/* stiletto (pink party shoe) */}
    <path d="M86 268 L 150 268 C 200 280 250 318 330 330 C 340 332 342 350 330 352 L 220 352 C 190 340 160 312 136 300 L 108 300 Z" fill="url(#elH)" />
    <path d="M90 290 L 112 290 L 104 352 L 98 352 Z" fill="#a8144f" />
  </svg>
);

/* molecule lattice: brick-wall honeycomb, every inner molecule has 3 bonds, surface ones only 2 */
const COLS = 8, ROWS = 4, DX = 100, DY = 92;
const Lattice: React.FC<{ t: number; hi3: number; hi2: number; roll: number; x0: number; y0: number }> = ({ t, hi3, hi2, roll, x0, y0 }) => {
  const free = (i: number, j: number) => j === 0 && i % 2 === 0;
  const pos = (i: number, j: number): [number, number] => {
    const w = free(i, j) ? roll : 0;
    return [x0 + i * DX + Math.sin(t * 2.6 + i * 1.3) * 14 * w, y0 + j * DY - (18 + Math.abs(Math.sin(t * 3.4 + i)) * 12) * w];
  };
  const bonds: [number, number, number, number][] = [];
  for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
    if (i < COLS - 1) bonds.push([i, j, i + 1, j]);
    if (j < ROWS - 1 && (i + j) % 2 === 1) bonds.push([i, j, i, j + 1]);
  }
  const H3 = [3, 2] as const, H2 = [4, 0] as const;
  const isHi = (i: number, j: number, k: readonly number[]) => i === k[0] && j === k[1];
  const near = (a: [number, number, number, number], k: readonly number[]) => (a[0] === k[0] && a[1] === k[1]) || (a[2] === k[0] && a[3] === k[1]);
  
  return <svg width={1000} height={1500} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
    <defs>
      <radialGradient id="molG" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#ffffff" /><stop offset=".35" stopColor="#9BE3FF" /><stop offset="1" stopColor="#2c6f93" /></radialGradient>
      <radialGradient id="molT" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#ffffff" /><stop offset=".4" stopColor="#FFE48A" /><stop offset="1" stopColor="#c8901a" /></radialGradient>
    </defs>
    {bonds.map((b, k) => {
      const [x1, y1] = pos(b[0], b[1]), [x2, y2] = pos(b[2], b[3]);
      const top = free(b[0], b[1]) || free(b[2], b[3]);
      const h3 = near(b, H3) ? hi3 : 0, h2 = near(b, H2) ? hi2 : 0;
      const a = top ? 1 - .75 * roll : 1;
      return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={h3 > 0 ? Y : h2 > 0 ? Y : '#3d6b86'} strokeWidth={h3 > 0 || h2 > 0 ? 9 : 6} opacity={a} strokeDasharray={top && roll > .3 ? '8 10' : undefined} />;
    })}
    {Array.from({ length: ROWS }).map((_, j) => Array.from({ length: COLS }).map((__, i) => {
      const [x, y] = pos(i, j);
      const hi = (isHi(i, j, H3) && hi3 > 0) || (isHi(i, j, H2) && hi2 > 0);
      const r = free(i, j) ? 31 : 28;
      return <g key={`${i}-${j}`}>
        <circle cx={x} cy={y} r={r} fill={hi ? 'url(#molT)' : 'url(#molG)'} stroke={free(i, j) ? WH : '#5fb6dc'} strokeWidth="2" />
      </g>;
    }))}
  </svg>;
};

/* thermometer */
const Thermo: React.FC<{ h: number; v: number }> = ({ h, v }) => {
  const f = clamp((v + 50) / 70); // -50 .. +20
  return <svg width={h * .3} height={h} viewBox="0 0 90 300" style={{ display: 'block', overflow: 'visible' }}>
    <rect x="30" y="10" width="30" height="230" rx="15" fill="#1d2230" stroke="#4a5266" strokeWidth="4" />
    <rect x="37" y={20 + 210 * (1 - f)} width="16" height={210 * f + 20} rx="8" fill={ICE} />
    <circle cx="45" cy="262" r="32" fill={ICE} stroke="#4a5266" strokeWidth="4" />
    {[0, 1, 2, 3, 4, 5, 6].map((k) => <line key={k} x1="62" x2="74" y1={20 + k * 35} y2={20 + k * 35} stroke="#7F8792" strokeWidth="3" />)}
  </svg>;
};

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.85, .2, .3);
  const slide = eio(P(t, -.5, 1.5));
  const wet = eout(P(t, T.erit - .1, T.suv + .4));
  return <Layer a={a} z={logZ(P(t, -1, 5.8), 1, 1.06)}>
    <Glow x={CX} y={1000} r={520} a={.9} col="155,227,255" />
    <div style={{ ...abs(CX - 300, 1000) }}><IceSlab w={600} id="s1" wet={wet} /></div>
    <div style={{ ...abs(CX - 260 + 240 * slide, 870), rotate: `${lerp(0, -12, slide)}deg`, transformOrigin: '50% 100%' }}><Boot w={240} id="b1" /></div>
    <Pill s="eski javob: og‘irlik muzni eritadi?" x={CX} y={1330} a={eout(P(t, T.kop - .1, T.kop + .3))} size={28} col={WH} dark />
    <Pill s="suv qatlami" x={CX} y={1250} a={wet} size={26} col={BLUE} />
    <Head t={t} t0={-1} t1={5.85} y={490} lines={[['nega muz'], ['sirpanchiq?', 'y']]} size={92} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.8, 11.35, .3, .3);
  const el = eback(P(t, T.bonn - .2, T.bonn + .4));
  return <Layer a={a} z={logZ(P(t, 5.8, 11.35), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="236,58,44" />
    <Pill s="fizik Mischa Bonn" x={CX} y={770} a={eout(P(t, T.bonn - .3, T.bonn + .1))} size={30} col={ICE} dark />
    {el > 0 && <div style={{ ...abs(CX - 220, 920), scale: String(el), transformOrigin: '50% 100%' }}><Elephant w={380} /></div>}
    <div style={{ ...abs(CX - 300, 1190) }}><IceSlab w={600} id="s2" /></div>
    <Stamp s="BU HAM YETMAYDI" x={CX} y={880} t={t} t0={T.kamlik} t1={11.35} col={RED} size={52} rot={-6} />
    <Src s="«fil poshnali tuflida tursa ham» — M. Bonn · LiveScience, 2018" y={1340} a={eout(P(t, T.posh, T.posh + .4))} />
    <Head t={t} t0={5.8} t1={11.35} y={490} lines={[['bosim'], ['eritmaydi', 'r']]} size={88} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 11.3, 16.3, .3, .3);
  const fl = eout(P(t, T.issiq - .2, T.issiq + .3));
  const cross = eout(P(t, T.tush, T.tush + .3));
  const wob = Math.sin(t * 7) * 4 * eout(P(t, T.joyida, T.joyida + .3));
  return <Layer a={a} z={logZ(P(t, 11.3, 16.3), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} />
    <div style={{ ...abs(SL + 20, 760), opacity: fl }}>
      <svg width={200} height={240} viewBox="0 0 100 120"><path d="M50 4 C 70 40 92 56 88 84 C 84 108 64 118 50 118 C 32 118 12 106 12 80 C 12 58 34 46 38 24 C 46 36 48 44 50 4 Z" fill="#ff8a3a" /><path d="M50 52 C 60 70 70 78 66 96 C 62 108 38 108 34 94 C 32 82 46 74 50 52 Z" fill={Y} />
        {cross > 0 && <path d={`M10 10 L ${10 + 80 * cross} ${10 + 100 * cross}`} stroke={RED} strokeWidth="10" strokeLinecap="round" />}</svg>
    </div>
    <Pill s="ishqalanish issig‘i" x={SL + 120} y={1030} a={fl} size={26} col={Y} dark />
    <div style={{ ...abs(CX + 20, 900), rotate: `${wob}deg`, transformOrigin: '50% 100%' }}><Boot w={240} id="b3" /></div>
    <div style={{ ...abs(CX - 300, 1040) }}><IceSlab w={600} id="s3" /></div>
    <Pill s="turib tursangiz ham sirpanchiq" x={CX} y={1310} a={eout(P(t, T.joyida - .1, T.joyida + .3))} size={30} col={ICE} />
    <Head t={t} t0={11.3} t1={16.3} y={490} lines={[['ishqalanish ham'], ['tushuntirmaydi', 'r']]} size={78} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 16.25, 17.75, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={16.25} t1={17.75} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 17.7, 28.45, .3, .3);
  const lat = eout(P(t, 17.7, 18.4));
  const hi3 = P(t, T.uchta - .1, T.uchta + .2) * (1 - P(t, T.sirt - .2, T.sirt));
  const hi2 = P(t, T.ikki - .1, T.ikki + .2) * (1 - P(t, T.bosh - .2, T.bosh));
  const roll = eio(P(t, T.bosh - .2, T.dumal));
  const shoe = eio(P(t, T.biz - .2, T.yuram + .6));
  return <Layer a={a} z={logZ(P(t, 17.7, 28.45), 1, 1.03)}>
    <Glow x={CX} y={1050} r={540} a={.8} col="155,227,255" />
    <div style={{ position: 'absolute', inset: 0, opacity: lat }}><Lattice t={t} hi3={hi3} hi2={hi2} roll={roll} x0={150} y0={940} /></div>
    <Pill s="ichkarida: 3 ta bog‘" x={CX} y={1330} a={hi3 > 0 ? eout(clamp(hi3 * 3)) : 0} size={30} col={Y} />
    <Pill s="sirtda: faqat 2 ta bog‘" x={CX} y={1330} a={hi2 > 0 ? eout(clamp(hi2 * 3)) : 0} size={30} col={Y} />
    <Pill s="sharchalardek dumalaydi" x={CX} y={1330} a={eout(P(t, T.dumal - .3, T.dumal)) * (1 - eout(P(t, T.biz - .3, T.biz)))} size={30} col={ICE} />
    {shoe > 0 && <div style={{ ...abs(lerp(SL - 40, SR - 230, shoe), 718), opacity: eout(clamp(shoe * 4)) }}><Boot w={210} id="b5" /></div>}
    <Src s="Weber va boshq., J. Phys. Chem. Lett., 2018 · UvA / AMOLF" y={1390} a={eout(P(t, T.uchta, T.uchta + .4))} />
    <Head t={t} t0={17.7} t1={T.biz - .1} y={490} lines={[['muz ichida'], ['molekulalar', 'y']]} size={84} />
    <Head t={t} t0={T.biz - .1} t1={28.45} y={490} lines={[['biz sharchalar'], ['ustida yuramiz', 'y']]} size={78} />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 28.4, 36.95, .3, .3);
  const v = t < T.m40 - .2 ? lerp(5, -7, eio(P(t, T.eng, T.m7 + .2))) : lerp(-7, -40, eio(P(t, T.m40 - .2, T.m40 + .6)));
  const cold = eout(P(t, T.m40 - .2, T.m40 + .4));
  return <Layer a={a} z={logZ(P(t, 28.4, 36.95), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col={cold > .5 ? '91,140,255' : '61,220,132'} />
    <div style={{ ...abs(SL + 40, 720) }}><Thermo h={560} v={v} /></div>
    <Num v={`${v < 0 ? '−' : ''}${Math.abs(Math.round(v))} °C`} x={CX + 140} y={780} a={1} size={150} col={cold > .5 ? ICE : GRN} />
    <Pill s="eng sirpanchiq" x={CX + 140} y={1000} a={eout(P(t, T.m7, T.m7 + .3)) * (1 - cold)} size={30} col={GRN} />
    <Pill s="konkida maydonlari shu haroratda" x={CX + 100} y={1090} a={eout(P(t, T.konki - .1, T.konki + .3)) * (1 - cold)} size={24} col={WH} dark />
    <Pill s="qor — qum qog‘ozdek" x={CX + 140} y={1000} a={eout(P(t, T.qum - .3, T.qum + .1))} size={30} col={ICE} />
    <Src s="−7 °C: UvA/AMOLF, 2018 · −40 °C: M. Truffer, LiveScience" y={1360} a={eout(P(t, T.m7, T.m7 + .4))} />
    <Head t={t} t0={28.4} t1={T.m40 - .1} y={490} lines={[['eng sirpanchiq'], ['−7 °C', 'g']]} size={86} />
    <Head t={t} t0={T.m40 - .1} t1={36.95} y={490} lines={[['−40 °C da esa'], ['qum qog‘oz', 'y']]} size={84} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 36.9, END + 1, .3, .1);
  const aA = env(t, 36.9, T.buni - .05, .3, .3);
  const fall = eio(P(t, T.yiq - .2, T.yiq + .5));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={1000} r={520} a={.8} col="155,227,255" />
      <div style={{ ...abs(CX - 300, 1080) }}><IceSlab w={600} id="s7" /></div>
      <div style={{ ...abs(CX - 120 + 120 * fall, 940 + 30 * fall), rotate: `${-70 * fall}deg`, transformOrigin: '80% 100%' }}><Boot w={240} id="b7" /></div>
      <Stamp s="SHARCHALAR AYBDOR" x={CX} y={820} t={t} t0={T.ayb} t1={T.buni} col={RED} size={56} rot={-5} />
      <Pill s="siz emas 🙂" x={CX} y={1320} a={eout(P(t, T.siz - .1, T.siz + .2))} size={32} col={GRN} />
      <Head t={t} t0={36.9} t1={T.buni} y={490} lines={[['yiqilsangiz —'], ['siz aybdor emas', 'g']]} size={80} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['qishda yiqilgan'], ['do‘stga yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.erit, 8, 7], [T.kamlik, 12, 6], [T.tush, 8, 7], [T.endi, 20, 5], [T.ikki, 8, 7], [T.m7, 10, 6], [T.m40, 10, 6], [T.ayb, 12, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1080} r={600} a={1} col="155,227,255" />
    <div style={{ ...abs(CX + 40 - 320, 1080) }}><IceSlab w={640} id="cv" /></div>
    <div style={{ ...abs(CX - 50, 905), rotate: '-18deg' }}><Boot w={220} id="bc" /></div>
    {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ ...abs(CX - 170 + i * 110, 1104), width: 56, height: 56, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #fff, #9BE3FF 40%, #2c6f93)' }} />)}
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>fizika · qish</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 120, lineHeight: 1.02, ...yel }}>NEGA MUZ<br />SIRPANCHIQ?</div>
    <div style={{ ...abs(SL, 1360, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.15, color: RED }}>SUV EMAS!<br /><span style={{ color: GRN }}>ENG SIRPANCHIQ: −7 °C</span></div>
  </AbsoluteFill>;
};
