import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* generic electronic electricity meter (no brand) */
const Meter: React.FC<{ w: number; val: string; led: number; id: string }> = ({ w, val, led, id }) => (
  <div style={{ position: 'relative', width: w, height: w * 1.25 }}>
    <svg width={w} height={w * 1.25} viewBox="0 0 320 400" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <defs>
        <linearGradient id={`mb${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#eef1f6" /><stop offset=".6" stopColor="#c3cad8" /><stop offset="1" stopColor="#9aa3b5" /></linearGradient>
        <filter id={`ml${id}`} x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect x="0" y="0" width="320" height="400" rx="26" fill={`url(#mb${id})`} stroke="#4a5266" strokeWidth="4" />
      <rect x="28" y="40" width="264" height="96" rx="10" fill="#0e1a12" stroke="#2a3040" strokeWidth="4" />
      <circle cx="250" cy="190" r="22" fill="#EC3A2C" opacity={led * .9} filter={`url(#ml${id})`} />
      <circle cx="250" cy="190" r="11" fill={led > .5 ? '#ff6a5c' : '#5a1a16'} stroke="#2a3040" strokeWidth="3" />
      <text x="250" y="232" textAnchor="middle" fontFamily="JBM, monospace" fontSize="14" fill="#4a5266">imp</text>
      <text x="40" y="196" fontFamily="JBM, monospace" fontSize="17" fill="#4a5266">kVt·soat</text>
      <text x="40" y="222" fontFamily="JBM, monospace" fontSize="14" fill="#6a7286">220 V · 50 Hz</text>
      <rect x="28" y="260" width="264" height="56" rx="8" fill="#aeb6c6" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={46 + i * 42} y="274" width="24" height="28" rx="4" fill="#5a6274" />)}
      <rect x="60" y="340" width="200" height="40" rx="8" fill="#8a93a6" />
    </svg>
    <div style={{ position: 'absolute', left: w * .1, top: w * .125, width: w * .8, height: w * .3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: w * .12, color: '#9BE37A', textShadow: '0 0 12px #9BE37A88', whiteSpace: 'nowrap' }}>{val}</div>
  </div>
);
const Kettle: React.FC<{ w: number; t: number; boil: number }> = ({ w, t, boil }) => (
  <svg width={w} height={w} viewBox="0 0 300 300" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="ktG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#9aa3b5" /><stop offset=".45" stopColor="#f3f5f8" /><stop offset="1" stopColor="#7a8396" /></linearGradient></defs>
    {[0, 1, 2].map((i) => { const ph = (t * .8 + i / 3) % 1; return <path key={i} d={`M${170 + i * 18} ${70 - ph * 90} q 14 -16 0 -32 q -14 -16 0 -32`} stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" opacity={boil * (1 - ph) * .7} />; })}
    <path d="M70 90 L 230 90 L 250 250 L 50 250 Z" fill="url(#ktG)" stroke="#4a5266" strokeWidth="4" />
    <path d="M230 120 Q 290 130 270 210 L 246 200 Q 262 140 232 140 Z" fill="#2a2f3b" />
    <path d="M70 100 L 30 80 L 40 70 L 80 90 Z" fill="#9aa3b5" stroke="#4a5266" strokeWidth="3" />
    <rect x="100" y="70" width="100" height="22" rx="10" fill="#2a2f3b" />
    <rect x="40" y="250" width="220" height="26" rx="8" fill="#2a2f3b" />
    <circle cx="150" cy="263" r="6" fill={boil > .5 ? '#5B8CFF' : '#333'} />
  </svg>
);
/* generic oil radiator heater */
const Heater: React.FC<{ w: number; heat: number }> = ({ w, heat }) => (
  <svg width={w} height={w * .8} viewBox="0 0 400 320" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id="htG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c3cad8" /><stop offset=".5" stopColor="#f3f5f8" /><stop offset="1" stopColor="#9aa3b5" /></linearGradient>
      <filter id="htB" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22" /></filter>
    </defs>
    <rect x="30" y="40" width="340" height="220" rx="30" fill="#EC3A2C" opacity={heat * .55} filter="url(#htB)" />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={40 + i * 42} y="30" width="34" height="240" rx="16" fill="url(#htG)" stroke="#4a5266" strokeWidth="3" />)}
    <rect x="30" y="270" width="340" height="14" rx="6" fill="#4a5266" />
    {[60, 340].map((x) => <circle key={x} cx={x} cy="296" r="14" fill="#2a2f3b" />)}
    <rect x="330" y="60" width="40" height="40" rx="8" fill="#2a2f3b" /><circle cx="350" cy="80" r="8" fill={heat > .3 ? '#FFCF3A' : '#555'} />
  </svg>
);
const Chip: React.FC<{ s: string; y: number; a: number }> = ({ s, y, a }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: CX, top: y, translate: '-50% 0', opacity: a, padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 23, color: WH, whiteSpace: 'nowrap' }}>{s}</div>;
const blink = (t: number, hz: number) => (Math.sin(t * hz * Math.PI * 2) > .55 ? 1 : 0);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 6.0, .2, .3);
  const v = 1714.2 + Math.max(0, t + 1) * .05;
  return <Layer a={a} z={logZ(P(t, -1, 6), 1, 1.06)}>
    <Glow x={CX} y={980} r={520} a={.9} />
    <div style={{ ...abs(CX - 200, 690) }}><Meter w={400} val={v.toFixed(1).padStart(7, '0')} led={blink(t, 1.2)} id="m1" /></div>
    <Pill s="vatt ✕" x={CX - 190} y={1260} a={eout(P(t, T.vatt - .1, T.vatt + .2)) * (1 - eout(P(t, T.ikkala - .2, T.ikkala + .1)))} size={32} col={RED} dark />
    <Pill s="soat ✕" x={CX + 190} y={1260} a={eout(P(t, T.soat - .1, T.soat + .2)) * (1 - eout(P(t, T.ikkala - .2, T.ikkala + .1)))} size={32} col={RED} dark />
    <Pill s="vatt × soat ✓" x={CX} y={1260} a={eout(P(t, T.ikkala - .1, T.ikkala + .3))} size={36} col={GRN} />
    <Head t={t} t0={-1} t1={T.ikkala - .1} y={490} lines={[['hisoblagich'], ['nimani sanaydi?', 'y']]} size={74} />
    <Head t={t} t0={T.ikkala - .1} t1={6.0} y={490} lines={[['ikkalasini'], ['birga', 'g']]} size={80} from="slam" />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.9, 14.5, .3, .3);
  const aK = eback(P(t, T.kvt1 - .2, T.kvt1 + .3)), aS = eback(P(t, T.soat1 - .2, T.soat1 + .3)), aE = eback(P(t, T.kvts - .2, T.kvts + .3));
  const box = (x: number, ap: number, top: string, sub: string, col: string) => ap <= 0 ? null :
    <div style={{ position: 'absolute', left: x, top: 760, width: 300, scale: String(clamp(ap, 0, 1.2)), opacity: clamp(ap * 2) }}>
      <Card x={0} y={0} w={300}><div style={{ padding: '30px 10px', textAlign: 'center' }}>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 80, color: col, lineHeight: 1 }}>{top}</div>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR, marginTop: 10 }}>{sub}</div></div></Card></div>;
  return <Layer a={a} z={logZ(P(t, 5.9, 14.5), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="91,140,255" />
    {box(SL + 20, aK, '1 kVt', 'quvvat', ICE)}
    <div style={{ position: 'absolute', left: CX - 20, top: 820, fontFamily: HEAD, fontWeight: 700, fontSize: 80, color: GR, opacity: clamp(aS) }}>×</div>
    {box(SR - 320, aS, '1 soat', 'vaqt', ICE)}
    {aE > 0 && <div style={{ position: 'absolute', left: CX, top: 1040, translate: '-50% 0', scale: String(clamp(aE, 0, 1.2)), padding: '20px 40px', borderRadius: 24, background: `linear-gradient(90deg, ${Y}, #f2a91c)`, fontFamily: HEAD, fontWeight: 700, fontSize: 84, color: '#1A1306', whiteSpace: 'nowrap' }}>= 1 kVt·soat</div>}
    <Chip s="to‘lov = kVt·soat × narx" y={1220} a={eout(P(t, T.pul - .2, T.pul + .2))} />
    <Head t={t} t0={5.9} t1={T.hisob - .1} y={490} lines={[['quvvat × vaqt'], ['= energiya', 'y']]} size={72} />
    <Head t={t} t0={T.hisob - .1} t1={14.5} y={490} lines={[['hisoblagich'], ['shuni sanaydi', 'y']]} size={72} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 14.4, 23.4, .3, .3);
  const fast = P(t, T.masalan, T.n3200 + .4);
  const hz = lerp(1.5, 9, fast);
  const cnt = eio(P(t, T.n3200 - .2, T.kvts2));
  return <Layer a={a} z={logZ(P(t, 14.4, 23.4), 1, 1.08)} origin={[CX + 50, 860]}>
    <Glow x={CX + 50} y={880} r={360} a={.6 + .4 * blink(t, hz)} col="236,58,44" />
    <div style={{ ...abs(CX - 200, 680) }}><Meter w={400} val={(1714.3 + cnt).toFixed(1).padStart(7, '0')} led={t > T.chiroq - .2 ? blink(t, hz) : 0} id="m3" /></div>
    <Pill s="chiroq" x={CX + 250} y={790} a={eout(P(t, T.chiroq - .1, T.chiroq + .2))} size={30} col={RED} />
    <Num v={`${fmt(3200 * cnt)} imp`} y={1210} a={eout(P(t, T.n3200 - .3, T.n3200))} size={84} />
    <Pill s="= 1 kVt·soat" x={CX} y={1340} a={eout(P(t, T.kvts2 - .1, T.kvts2 + .3))} size={34} col={GRN} />
    <Src s="3 200 imp/kVt·soat — misol (hisoblagich yorlig‘ida yoziladi)" y={1390} a={eout(P(t, T.n3200, T.n3200 + .4)) * (1 - eout(P(t, T.kvts2 - .2, T.kvts2)))} />
    <Head t={t} t0={14.4} t1={23.4} y={490} lines={[['har miltillash'], ['= kichik ulush', 'y']]} size={72} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 23.3, 29.6, .3, .3);
  const boil = eout(P(t, T.qayna - .3, T.qayna + .5));
  const n = eio(P(t, T.s130 - .3, T.s130 + .6));
  return <Layer a={a} z={logZ(P(t, 23.3, 29.6), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.85} col="91,140,255" />
    <div style={{ ...abs(CX - 160, 680) }}><Kettle w={320} t={t} boil={boil} /></div>
    <Pill s="2 kVt" x={CX - 230} y={760} a={eout(P(t, T.kvt2 - .1, T.kvt2 + .2))} size={30} col={ICE} />
    <Pill s="6 daqiqa" x={CX + 240} y={760} a={eout(P(t, T.d6 - .1, T.d6 + .2))} size={30} col={ICE} />
    <Chip s="2 kVt × 0,1 soat = 0,2 kVt·soat" y={1040} a={eout(P(t, T.n02 - .2, T.n02 + .2))} />
    <Num v={`${fmt(130 * n)} so‘m`} y={1120} a={eout(P(t, T.yani - .1, T.yani + .2))} size={110} />
    <Src s="0,2 × 650 so‘m · tarif 1.06.2026 dan · gov.uz (Energetika vazirligi)" y={1270} a={eout(P(t, T.s130, T.s130 + .4))} />
    <Head t={t} t0={23.3} t1={29.6} y={490} lines={[['choynak'], ['bir qaynash', 'y']]} size={80} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 29.5, 31.2, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={29.5} t1={31.2} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const STEPS: [number, string, string, string][] = [[T.s650, '650', '0–200', GRN], [T.s900, '900', '201–500', Y], [T.s1100, '1 100', '501–1 000', RED]];
const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 31.1, 41.1, .3, .3);
  return <Layer a={a} z={logZ(P(t, 31.1, 41.1), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} />
    {STEPS.map(([t0, pr, rng, col], i) => {
      const ta = i === 0 ? 31.5 : t0 - 1.4; const ap = eback(P(t, ta, ta + .5)); if (ap <= 0) return null;
      const h = 200 + i * 170, x = SL + 20 + i * 280;
      return <div key={i} style={{ position: 'absolute', left: x, top: 1330 - h * clamp(ap, 0, 1.1), width: 260, height: h * clamp(ap, 0, 1.1), borderRadius: '18px 18px 0 0', background: `linear-gradient(180deg, ${col}, ${col}88)`, overflow: 'hidden' }}>
        <div style={{ padding: '16px 0', textAlign: 'center' }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: '#0b0d12', lineHeight: 1, opacity: eout(P(t, t0 - .1, t0 + .2)) }}>{pr}</div>
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#0b0d12', opacity: eout(P(t, t0 - .1, t0 + .2)) }}>so‘m / kVt·soat</div>
        </div>
      </div>;
    })}
    {STEPS.map(([t0, , rng], i) => <div key={i} style={{ position: 'absolute', left: SL + 20 + i * 280, top: 1345, width: 260, textAlign: 'center', fontFamily: MONO, fontSize: 22, color: GR, opacity: eout(P(t, i === 0 ? 31.5 : t0 - 1.4, (i === 0 ? 31.5 : t0 - 1.4) + .5)) }}>{rng} kVt·soat</div>)}
    <Src s="aholi tarifi 1.06.2026 dan · gov.uz, 15.05.2026" y={1395} a={eout(P(t, T.s650, T.s650 + .4))} />
    <Head t={t} t0={31.1} t1={41.1} y={490} lines={[['narx —'], ['zinapoya', 'y']]} size={84} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 41.0, 52.8, .3, .3);
  const heat = eout(P(t, T.isit - .3, T.isit + .5));
  const fill = eio(P(t, T.oyiga2 - .2, T.k480 + .6));
  const v = 480 * fill, sc = 500, bx = SL + 20, bwid = SR - SL - 40;
  const n = eio(P(t, T.s382 - .3, T.s382 + .8));
  return <Layer a={a} z={logZ(P(t, 41, 52.8), 1, 1.04)}>
    <Glow x={CX} y={900} r={520} a={.6 + .3 * heat} col="236,58,44" />
    <div style={{ ...abs(CX - 200, 650) }}><Heater w={400} heat={heat} /></div>
    <Chip s="2 kVt × 8 soat × 30 kun = 480 kVt·soat" y={990} a={eout(P(t, T.h8, T.h8 + .4))} />
    <div style={{ position: 'absolute', left: bx, top: 1080, width: bwid, height: 70, borderRadius: 16, background: '#1d2230', overflow: 'hidden', opacity: eout(P(t, T.oyiga2 - .3, T.oyiga2)) }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(v, 200) / sc * 100}%`, background: GRN }} />
      <div style={{ position: 'absolute', left: `${200 / sc * 100}%`, top: 0, height: '100%', width: `${Math.max(0, v - 200) / sc * 100}%`, background: Y }} />
      <div style={{ position: 'absolute', left: `${200 / sc * 100}%`, top: 0, width: 4, height: '100%', background: WH }} />
      <div style={{ position: 'absolute', right: 16, top: 14, fontFamily: HEAD, fontWeight: 700, fontSize: 36, color: WH }}>{fmt(v)} kVt·soat</div>
    </div>
    <div style={{ position: 'absolute', left: bx + bwid * 200 / sc - 60, top: 1160, width: 120, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: GR, opacity: eout(P(t, T.oyiga2, T.oyiga2 + .3)) }}>200</div>
    <Stamp s="2-ZINA" x={CX + 220} y={1220} t={t} t0={T.zina2} t1={T.faqat - .1} col={Y} size={50} rot={-6} />
    <Num v={`${fmt(382000 * n)} so‘m`} y={1200} a={eout(P(t, T.faqat - .1, T.faqat + .2))} size={84} col={RED} />
    <Src s="200 × 650 + 280 × 900 = 382 000 · quvvat — misol" y={1310} a={eout(P(t, T.s382, T.s382 + .4))} />
    <Head t={t} t0={41.0} t1={T.faqat - .1} y={490} lines={[['qaynonaning'], ['isitgichi', 'y']]} size={80} />
    <Head t={t} t0={T.faqat - .1} t1={52.8} y={490} lines={[['faqat isitgich —'], ['oyiga', 'r']]} size={76} />
  </Layer>;
};

const Shot: React.FC<{ day: string; val: string; a: number; x: number; y: number; rot: number }> = ({ day, val, a, x, y, rot }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, width: 340, rotate: `${rot}deg`, opacity: clamp(a), scale: String(lerp(.7, 1, eback(clamp(a)))), padding: 14, background: '#f3f5f8', borderRadius: 10, boxShadow: '0 16px 40px rgba(0,0,0,.6)' }}>
    <div style={{ height: 150, borderRadius: 6, background: '#0e1a12', display: 'grid', placeItems: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 48, color: '#9BE37A' }}>{val}</div>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: '#141822', marginTop: 10, textAlign: 'center' }}>{day}</div>
  </div>;
const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 52.7, END + 1, .3, .1);
  const aA = env(t, 52.7, T.buni - .05, .3, .3);
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={520} a={.85} col="61,220,132" />
      <Shot day="oy boshi" val="01234" a={eout(P(t, T.boshida - .2, T.boshida + .3))} x={SL + 10} y={700} rot={-5} />
      <Shot day="oy oxiri" val="01714" a={eout(P(t, T.oxirida - .2, T.oxirida + .3))} x={SR - 350} y={760} rot={5} />
      <Num v="farq = 480 kVt·soat" y={1060} a={eout(P(t, T.farq - .2, T.farq + .2))} size={64} />
      <Pill s="ilovadagi hisob bilan solishtiring ✓" x={CX} y={1210} a={eout(P(t, T.ilova - .1, T.ilova + .3))} size={28} col={GRN} />
      <Src s="raqamlar — misol" y={1280} a={eout(P(t, T.farq, T.farq + .4))} />
      <Head t={t} t0={52.7} t1={T.buni} y={490} lines={[['hisoblagichni'], ['rasmga oling', 'g']]} size={76} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['isitgichli do‘stga'], ['yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.ikkala, 10, 6], [T.kvts, 8, 7], [T.kvts2, 8, 7], [T.s130, 8, 7], [T.endi, 20, 5], [T.s1100, 10, 6], [T.zina2, 10, 6], [T.s382, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1130} r={580} a={1} col="236,58,44" />
    <div style={{ ...abs(CX + 40 - 210, 820) }}><Meter w={420} val="01714.2" led={1} id="mc" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>elektr hisoblagich</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>NIMANI<br />SANAYDI?</div>
    <div style={{ ...abs(SL, 1400, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 56, lineHeight: 1.15, color: RED }}>200 KVT·SOATDAN KEYIN<br /><span style={{ color: Y }}>650 EMAS — 900 SO‘M</span></div>
  </AbsoluteFill>;
};
