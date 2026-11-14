import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone, Donut } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, ShareEnd, Background, Reel } from '../kit';
import { T } from './ep';

/* ---------- topic art (generic, no real logos) ---------- */
const Feed: React.FC<{ w: number; hl: number; views: string }> = ({ w, hl, views }) => (
  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#141a26,#0b0e15)', padding: w * .06, paddingTop: w * .2, boxSizing: 'border-box' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <div style={{ width: w * .14, height: w * .14, borderRadius: '50%', background: 'linear-gradient(135deg,#5B8CFF,#2a4fb8)' }} />
      <div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: w * .06, color: WH }}>Kanal</div><div style={{ fontFamily: SANS, fontSize: w * .042, color: GR }}>obunachilar</div></div>
    </div>
    {[0, 1, 2].map(i => <div key={i} style={{ borderRadius: 14, background: i === 1 ? 'rgba(255,207,58,.12)' : '#1c2330', border: i === 1 ? `2px solid rgba(255,207,58,${.3 + .7 * hl})` : '1px solid rgba(255,255,255,.06)', padding: 12, marginBottom: 12 }}>
      {i === 1 && <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 8, background: Y, fontFamily: SANS, fontWeight: 800, fontSize: w * .04, color: '#1A1306', marginBottom: 8 }}>REKLAMA</div>}
      <div style={{ height: 9, borderRadius: 5, background: '#3a4458', width: ['90%', '80%', '70%'][i], marginBottom: 7 }} />
      <div style={{ height: 9, borderRadius: 5, background: '#3a4458', width: ['60%', '95%', '50%'][i] }} />
      <div style={{ textAlign: 'right', fontFamily: SANS, fontSize: w * .038, color: GR, marginTop: 6 }}>👁 {i === 1 ? views : ['8.1K', '', '6.7K'][i]}</div>
    </div>)}
  </div>
);
const Mega: React.FC<{ w: number; id: string; pulse?: number }> = ({ w, id, pulse = 0 }) => (
  <svg width={w} height={w * .8} viewBox="0 0 250 200" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`mg${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff6a5c" /><stop offset="1" stopColor="#a8231a" /></linearGradient></defs>
    <path d="M40 80 L150 30 L150 170 L40 120 Z" fill={`url(#mg${id})`} stroke="#5a120c" strokeWidth="4" />
    <rect x="18" y="76" width="30" height="48" rx="8" fill="#e8ecf4" stroke="#5a6272" strokeWidth="3" />
    <rect x="58" y="118" width="22" height="58" rx="8" fill="#9aa3b2" />
    <ellipse cx="150" cy="100" rx="14" ry="70" fill="#ffd3cd" stroke="#5a120c" strokeWidth="4" />
    {[0, 1, 2].map(i => <path key={i} d={`M${180 + i * 22} ${60 - i * 10} Q${200 + i * 26} 100 ${180 + i * 22} ${140 + i * 10}`} fill="none" stroke="#FFCF3A" strokeWidth="7" strokeLinecap="round" opacity={clamp(pulse * 3 - i)} />)}
  </svg>
);
const Eye: React.FC<{ w: number; id: string }> = ({ w, id }) => (
  <svg width={w} height={w * .6} viewBox="0 0 300 180" style={{ display: 'block' }}>
    <defs><radialGradient id={`ey${id}`} cx=".4" cy=".4" r=".7"><stop offset="0" stopColor="#bfe9ff" /><stop offset=".5" stopColor="#5B8CFF" /><stop offset="1" stopColor="#1d3a8a" /></radialGradient></defs>
    <path d="M10 90 Q150 -30 290 90 Q150 210 10 90 Z" fill="#f3f5f8" stroke="#9BE3FF" strokeWidth="6" />
    <circle cx="150" cy="90" r="58" fill={`url(#ey${id})`} /><circle cx="150" cy="90" r="26" fill="#05070A" /><circle cx="136" cy="74" r="10" fill="#fff" />
  </svg>
);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 2.85, .2, .3);
  const m = eback(P(t, .3, .9));
  return <Layer a={a} z={logZ(P(t, -1, 2.85), 1, 1.05)}>
    <Glow x={CX} y={1050} r={540} a={.9} />
    <div style={{ ...abs(CX - 200, 760) }}><Phone w={310} id="p1"><Feed w={290} hl={.5 + .5 * Math.sin(t * 6)} views="12.4K" /></Phone></div>
    <div style={{ ...abs(CX + 70, 1100), opacity: clamp(m), scale: String(clamp(m, 0, 1.1)), rotate: '-12deg' }}><Mega w={260} id="m1" pulse={(t * 1.5) % 1} /></div>
    <Pill s="1 post · ? so‘m" x={CX} y={1385} a={eout(P(t, T.necha - .2, T.necha + .2))} size={32} col={Y} />
    <Head t={t} t0={-1} t1={2.85} y={490} lines={[['telegramda 1 post'], ['necha pul?', 'y']]} size={88} />
  </Layer>;
};

const BASE = 1235;
const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 2.8, 14.4, .3, .3);
  const k = lerp(430 / 2.2, 400 / 23, eio(P(t, T.yangi, T.m23 + .2)));
  const g1 = eout(P(t, T.yuz, T.k500 + .3)), g2 = eout(P(t, T.m1 - .3, T.m2 + .3)), g3 = eout(P(t, T.m23 - .4, T.m23 + .5));
  const bars: [number, number, number, string, string, string, number][] = [
    [SL + 40, .3, .5, '300–500 ming', '≤ 100 ming obunachi', ICE, g1],
    [CX - 120, 1, 2, '1–2 mln', '≈ 500 minggacha', GRN, g2],
    [SR - 280, 23, 23, '23 mln', 'Kun.uz · 1,18 mln', Y, g3],
  ];
  return <Layer a={a} z={logZ(P(t, 2.8, 14.4), 1, 1.03)}>
    <Glow x={CX} y={1000} r={560} a={.8} col="91,140,255" />
    <div style={{ ...abs(SL + 20, BASE, SR - SL - 40), height: 3, background: 'rgba(255,255,255,.3)', opacity: eout(P(t, T.yuz - .3, T.yuz)) }} />
    {bars.map(([x, lo, hi, lab, sub, col, g], i) => {
      if (g <= 0) return null;
      const hH = Math.max(6, hi * k * g), hL = lo === hi ? 0 : lo * k * g;
      return <React.Fragment key={i}>
        <div style={{ position: 'absolute', left: x, top: BASE - hH, width: 240, height: hH - hL, borderRadius: '14px 14px 0 0', background: `linear-gradient(180deg, ${col}, ${col}66)`, opacity: clamp(g * 2) }} />
        {hL > 0 && lo !== hi && <div style={{ position: 'absolute', left: x, top: BASE - hL, width: 240, height: hL, background: `${col}22`, borderLeft: `2px dashed ${col}66`, borderRight: `2px dashed ${col}66` }} />}
        <div style={{ ...abs(x - 30, BASE - hH - 74, 300), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: i === 2 ? 64 : 46, color: col, whiteSpace: 'nowrap', opacity: clamp(g * 2 - .6) }}>{lab}</div>
        <div style={{ ...abs(x - 30, BASE + 14, 300), textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 25, color: WH, opacity: clamp(g * 2) }}>{sub}</div>
      </React.Fragment>;
    })}
    <Pill s="so‘m · 1 post" x={CX} y={1320} a={eout(P(t, T.k300, T.k300 + .3))} size={26} col={ICE} dark />
    <Src s="manba: spot.uz, 2025-yil yanvar · agentlik narxlari, QQSsiz" y={1380} a={eout(P(t, T.k300, T.k300 + .4))} />
    <Head t={t} t0={2.8} t1={T.eng - .1} y={490} lines={[['kanal kattaligiga'], ['qarab', 'y']]} size={92} />
    <Head t={t} t0={T.eng - .1} t1={14.4} y={490} lines={[['eng katta'], ['yangiliklar kanali', 'y']]} size={88} from="slam" />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 14.35, 18.6, .3, .25);
  const b = eback(P(t, T.men - .3, T.men + .2));
  return <Layer a={a} z={logZ(P(t, 14.35, 18.6), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <div style={{ ...abs(SL + 30, 760), fontSize: 120 }}>👩</div>
    <Card x={SL + 200} y={770} w={440} a={eout(P(t, T.telefon - .3, T.telefon + .2))} style={{ padding: 22, borderRadius: '26px 26px 26px 4px' }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: WH }}>Telefonni qo‘y! 😤</div>
    </Card>
    <Card x={SL + 100} y={1010} w={620} a={clamp(b)} style={{ padding: 22, borderRadius: '26px 26px 4px 26px', border: `2px solid ${GRN}`, scale: String(clamp(b, 0, 1.06)) }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: GRN, whiteSpace: 'nowrap' }}>Men bozorni o‘rganyapman 📈</div>
    </Card>
    <div style={{ ...abs(SR - 170, 1150), fontSize: 110, opacity: clamp(b) }}>😎</div>
    <Head t={t} t0={14.35} t1={18.6} y={490} lines={[['onangiz'], ['so‘rasa', 'y']]} size={96} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 18.45, 20.2, .12, .25);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={18.45} t1={20.2} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 20.1, 26.3, .25, .3);
  const gA = eout(P(t, T.k98 - .3, T.k98 + .5)), pA = eout(P(t, T.m10 - .3, T.m10 + .5));
  const gB = eout(P(t, T.k274 - .3, T.k274 + .5)), pB = eout(P(t, T.m6 - .3, T.m6 + .5));
  const H = 250, base = 1190;
  const col = (cx: number, subs: number, price: number, gs: number, gp: number, sl: string, pl: string, name: string) => <>
    <div style={{ position: 'absolute', left: cx - 125, top: base - H * subs * gs, width: 110, height: H * subs * gs, borderRadius: '12px 12px 0 0', background: `linear-gradient(180deg, ${ICE}, ${ICE}55)` }} />
    <div style={{ ...abs(cx - 170, base - H * subs * gs - 56, 200), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 42, color: ICE, opacity: gs }}>{sl}</div>
    <div style={{ position: 'absolute', left: cx + 15, top: base - H * price * gp, width: 110, height: H * price * gp, borderRadius: '12px 12px 0 0', background: `linear-gradient(180deg, ${Y}, ${Y}55)` }} />
    <div style={{ ...abs(cx - 30, base - H * price * gp - 56, 200), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 42, color: Y, opacity: gp }}>{pl}</div>
    <Pill s={name} x={cx} y={base + 40} a={gs} size={28} col={WH} dark />
  </>;
  const flip = eout(P(t, T.m6 - .1, T.m6 + .3));
  return <Layer a={a} z={logZ(P(t, 20.1, 26.3), 1, 1.03)}>
    <Glow x={CX} y={1000} r={560} a={.85} col="236,58,44" />
    <div style={{ ...abs(SL, 770, SR - SL), display: 'flex', justifyContent: 'center', gap: 36, fontFamily: SANS, fontWeight: 800, fontSize: 28, opacity: eout(P(t, T.k98 - .3, T.k98)) * (1 - flip) }}>
      <span style={{ color: ICE }}>■ obunachi</span><span style={{ color: Y }}>■ 1 post narxi</span>
    </div>
    <div style={{ ...abs(SL + 20, base, SR - SL - 40), height: 3, background: 'rgba(255,255,255,.3)' }} />
    {col(CX - 215, 98 / 274, 1, gA, pA, '98 ming', '10,3 mln', 'Troll.uz')}
    {col(CX + 215, 1, 6 / 10.3, gB, pB, '274 ming', '6 mln', 'Qalampir.uz')}
    <Stamp s="OBUNACHI ≠ NARX" x={CX} y={775} t={t} t0={T.m6 + .05} t1={26.3} col={RED} size={50} rot={-4} />
    <Src s="manba: spot.uz, 2025-yil yanvar · agentlik narxlari, so‘m" y={1300} a={eout(P(t, T.m10, T.m10 + .4))} />
    <Head t={t} t0={20.1} t1={T.m6 - .1} y={490} lines={[['obunachi'], ['va narx', 'y']]} size={96} />
    <Head t={t} t0={T.m6 - .1} t1={26.3} y={490} lines={[['kichik kanal —'], ['qimmatroq!', 'r']]} size={92} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.2, 30.4, .3, .3);
  const e = eback(P(t, 26.3, 26.8)), x1 = eout(P(t, T.obunachiga - .2, T.obunachiga + .2)), x2 = eout(P(t, T.ming - .2, T.ming + .2));
  return <Layer a={a} z={logZ(P(t, 26.2, 30.4), 1, 1.03)}>
    <Glow x={CX} y={960} r={540} a={.85} col="61,220,132" />
    <div style={{ ...abs(CX - 150, 740), opacity: clamp(e), scale: String(clamp(e, 0, 1.1)) }}><Eye w={300} id="e1" /></div>
    <div style={{ opacity: x1 }}>
      <Pill s="obunachi soni" x={CX} y={980} a={x1} size={34} col={RED} dark />
      <div style={{ ...abs(CX - 140, 978, 280), height: 5, background: RED, rotate: '-6deg', opacity: x1 }} />
    </div>
    <Pill s="✓ 1000 ko‘rish narxi (CPM)" x={CX} y={1070} a={x2} size={36} col={GRN} />
    <Card x={SL + 50} y={1140} w={SR - SL - 100} a={eout(P(t, T.narxiga - .2, T.narxiga + .2))} style={{ padding: '18px 24px', textAlign: 'center' }}>
      <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>hisob</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: WH, marginTop: 6 }}>post narxi ÷ ko‘rishlar × 1000</div>
    </Card>
    <Src s="mutaxassis tavsiyasi · spot.uz, 2025" y={1340} a={eout(P(t, T.ming, T.ming + .4))} />
    <Head t={t} t0={26.2} t1={30.4} y={490} lines={[['obunachiga emas'], ['ko‘rishga qarang', 'g']]} size={84} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 30.3, 38.3, .25, .3);
  const sw = eio(P(t, T.lekin - .3, T.lekin + .2));
  const p = .5 * eout(P(t, T.daromad - .2, T.yarmi + .3));
  const c1 = eback(P(t, T.atigi - .2, T.d124 + .1)), c2 = eback(P(t, T.d124 + .5, T.d124 + 1.0));
  return <Layer a={a} z={logZ(P(t, 30.3, 38.3), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col={sw < .5 ? '91,140,255' : '236,58,44'} />
    <div style={{ opacity: 1 - sw }}>
      <div style={{ ...abs(CX - 170, 740) }}><Donut w={340} p={p} col={GRN} id="d7" /></div>
      <Num v={p > .005 ? `${Math.round(p * 100)} %` : '?'} y={860} a={eout(P(t, 30.5, 30.9))} size={96} col={GRN} />
      <Pill s="kanal egasiga" x={CX} y={1135} a={eout(P(t, T.egasiga - .3, T.egasiga + .1))} size={34} col={GRN} />
      <Pill s="1000+ obunachili ochiq kanallar" x={CX} y={1210} a={eout(P(t, T.egasiga, T.egasiga + .3))} size={26} col={ICE} dark />
      <Src s="manba: Telegram blogi, 31.03.2024 · rasmiy reklama daromadi" y={1300} a={eout(P(t, T.yarmi, T.yarmi + .4))} />
    </div>
    <div style={{ opacity: sw }}>
      <Pill s="o‘sha 98 minglik kanal" x={CX} y={770} a={sw} size={30} col={ICE} dark />
      <Card x={SL + 20} y={840} w={400} a={clamp(c1)} style={{ padding: 22, textAlign: 'center', border: `2px solid ${RED}`, scale: String(clamp(c1, 0, 1.06)) }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>Telegram Ads · 1 yil</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 100, color: RED, lineHeight: 1.1 }}>$124</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: WH }}>23 TON</div>
      </Card>
      <Card x={SR - 420} y={840} w={400} a={clamp(c2)} style={{ padding: 22, textAlign: 'center', border: `2px solid ${GRN}`, scale: String(clamp(c2, 0, 1.06)) }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>to‘g‘ridan · 1 post</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 84, color: GRN, lineHeight: 1.25 }}>10,3 mln</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: WH }}>so‘m</div>
      </Card>
      <Pill s="yil  vs  bitta post" x={CX} y={1150} a={clamp(c2)} size={30} col={Y} />
      <Src s="manba: spot.uz, 2025 · 23 TON ≈ $124 bir yilda" y={1300} a={eout(P(t, T.d124, T.d124 + .4))} />
    </div>
    <Head t={t} t0={30.3} t1={T.lekin - .2} y={490} lines={[['telegramning'], ['o‘z reklamasi', 'y']]} size={92} />
    <Head t={t} t0={T.lekin - .2} t1={38.3} y={490} lines={[['bir yilda'], ['atigi $124', 'r']]} size={96} from="slam" />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 38.25, T.buni + .1, .3, .3);
  const s1 = eback(P(t, T.avval - .2, T.avval + .3)), s2 = eback(P(t, T.keyin - .2, T.keyin + .3));
  return <Layer a={a} z={logZ(P(t, 38.25, 41.9), 1, 1.03)}>
    <Glow x={CX} y={960} r={540} a={.85} />
    <Stamp s="DAROMAD KAFOLAT EMAS" x={CX} y={870} t={t} t0={T.daromad2 - .1} t1={T.buni + .1} col={RED} size={52} rot={-4} />
    <Card x={SL + 40} y={1040} w={360} a={clamp(s1)} style={{ padding: 24, textAlign: 'center', scale: String(clamp(s1, 0, 1.08)), border: `2px solid ${ICE}` }}>
      <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>1-qadam</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 58, color: ICE }}>KONTENT</div>
    </Card>
    <div style={{ ...abs(CX - 30, 1090), fontFamily: HEAD, fontWeight: 700, fontSize: 70, color: GR, opacity: clamp(s2) }}>→</div>
    <Card x={SR - 400} y={1040} w={360} a={clamp(s2)} style={{ padding: 24, textAlign: 'center', scale: String(clamp(s2, 0, 1.08)), border: `2px solid ${GRN}` }}>
      <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>2-qadam</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 58, color: GRN }}>REKLAMA</div>
    </Card>
    <Head t={t} t0={38.25} t1={T.buni + .1} y={490} lines={[['avval'], ['kontent', 'y']]} size={96} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['kanal ochmoqchi'], ['do‘stga yuboring', 'y']]} />;

const HITS: [number, number, number][] = [[T.k300, 6, 7], [T.m1, 6, 7], [T.m23, 14, 6], [T.men, 6, 7], [T.endi, 20, 5], [T.m10, 8, 7], [T.m6, 12, 6], [T.ming, 6, 7], [T.yarmi, 8, 7], [T.d124, 12, 6], [T.daromad2, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1040} r={600} a={1} />
    <div style={{ ...abs(CX + 40 - 175, 720) }}><Phone w={350} id="cv"><Feed w={330} hl={1} views="12.4K" /></Phone></div>
    <div style={{ ...abs(CX + 150, 1080), rotate: '-12deg' }}><Mega w={280} id="mc" pulse={.9} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>internetda pul · telegram</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>TELEGRAMDA 1 POST<br />NECHA PUL?</div>
    <div style={{ ...abs(SL, 1440, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: GRN }}>300 MINGDAN 23 MLN GACHA<br /><span style={{ color: RED }}>OBUNACHI ≠ NARX</span></div>
    <div style={{ ...abs(SL, 1600, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>manba: spot.uz · 2025</div>
  </AbsoluteFill>;
};
