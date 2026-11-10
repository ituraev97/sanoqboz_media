import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, rnd } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art (generic airliner, no airline livery) ---------- */
const Plane: React.FC<{ w: number; id: string; flame?: number }> = ({ w, id, flame = 0 }) => (
  <svg width={w} height={w * .36} viewBox="0 0 500 180" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`pb${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#dfe5ee" /><stop offset="1" stopColor="#9aa3b2" /></linearGradient>
      <linearGradient id={`pw${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c7cedb" /><stop offset="1" stopColor="#7d8698" /></linearGradient>
    </defs>
    {/* tail */}
    <path d="M40 80 L10 10 L55 10 L110 78 Z" fill="#EC3A2C" />
    <path d="M30 92 L0 112 L60 104 Z" fill={`url(#pw${id})`} />
    {/* fuselage */}
    <path d="M30 78 Q30 66 60 64 L420 64 Q480 66 495 92 Q480 112 420 114 L60 114 Q30 112 30 100 Z" fill={`url(#pb${id})`} />
    <path d="M440 70 Q470 74 482 86 L452 86 Q446 76 440 70 Z" fill="#1d2433" />
    {Array.from({ length: 14 }).map((_, i) => <rect key={i} x={110 + i * 22} y="78" width="10" height="12" rx="4" fill="#3a4458" />)}
    <rect x="60" y="98" width="380" height="5" fill="#FFCF3A" opacity=".85" />
    {/* wing + engine */}
    <path d="M200 100 L300 100 L210 170 L170 170 Z" fill={`url(#pw${id})`} />
    <rect x="205" y="122" width="70" height="26" rx="13" fill="#5a6378" />
    <ellipse cx="275" cy="135" rx="6" ry="12" fill="#1a1e27" />
    {flame > 0 && <path d={`M205 128 L${205 - 40 * flame} 135 L205 142 Z`} fill="#9BE3FF" opacity={.6 * flame} />}
  </svg>
);

const Cube: React.FC<{ w: number; n: number; col: string; seed: number }> = ({ w, n, col, seed }) => {
  const r = rnd(seed);
  const pts = Array.from({ length: n }, () => [20 + r() * 160, 40 + r() * 140]);
  return <svg width={w} height={w} viewBox="0 0 220 220" style={{ display: 'block', overflow: 'visible' }}>
    <path d="M20 40 L60 10 L220 10 L180 40 Z" fill={col} opacity=".25" />
    <path d="M180 40 L220 10 L220 170 L180 200 Z" fill={col} opacity=".15" />
    <rect x="20" y="40" width="160" height="160" fill={col} opacity=".1" stroke={col} strokeWidth="3" />
    {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y + 10} r="5" fill={col} opacity=".9" />)}
  </svg>;
};

const Cloud: React.FC<{ w: number; dark?: boolean }> = ({ w, dark }) => (
  <svg width={w} height={w * .5} viewBox="0 0 200 100" style={{ display: 'block' }}>
    <path d="M30 90 Q0 90 8 66 Q14 46 40 52 Q46 20 80 24 Q100 0 128 20 Q160 14 164 46 Q196 48 192 72 Q190 90 166 90 Z" fill={dark ? '#4a5266' : '#e6ecf5'} opacity={dark ? .95 : .9} />
    {dark && <path d="M100 86 L88 112 L102 110 L92 136" stroke="#FFCF3A" strokeWidth="5" fill="none" />}
  </svg>
);

const Thermo: React.FC<{ h: number; v: number }> = ({ h, v }) => (
  <svg width={h * .3} height={h} viewBox="0 0 60 200" style={{ display: 'block', overflow: 'visible' }}>
    <rect x="18" y="6" width="24" height="160" rx="12" fill="#1d2230" stroke="#9aa3b2" strokeWidth="3" />
    <rect x="24" y={20 + (1 - v) * 130} width="12" height={146 - (20 + (1 - v) * 130) + 20} fill="#9BE3FF" />
    <circle cx="30" cy="176" r="20" fill="#9BE3FF" stroke="#9aa3b2" strokeWidth="3" />
  </svg>
);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.0, .2, .3);
  const lift = eout(P(t, -1, 2.8));
  return <Layer a={a} z={logZ(P(t, -1, 3), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.9} col="91,140,255" />
    {/* altitude ruler */}
    <div style={{ ...abs(SR - 110, 760, 100) }}>
      {[12, 10, 8, 6, 4, 2, 0].map((k, i) => <div key={k} style={{ height: 88, borderTop: `2px solid ${k === 10 ? Y : 'rgba(255,255,255,.2)'}`, fontFamily: MONO, fontSize: 24, color: k === 10 ? Y : GR, textAlign: 'right' }}>{k} km</div>)}
    </div>
    <div style={{ ...abs(CX - 320, lerp(1290, 900, lift)), rotate: `${lerp(-12, 0, lift)}deg` }}><Plane w={560} id="a" flame={1} /></div>
    <Num v="10 km" x={CX - 60} y={1180} a={eout(P(t, T.km10 - .2, T.km10 + .3))} size={130} />
    <Head t={t} t0={-1} t1={3.0} y={490} lines={[['nega aynan'], ['10 km balandda?', 'y']]} size={84} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 2.95, 12.2, .3, .3);
  const c1 = eback(P(t, T.havoda - .3, T.havoda + .3)), c2 = eback(P(t, T.km10b - .3, T.km10b + .3));
  return <Layer a={a} z={logZ(P(t, 2.95, 12.2), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.8} col="155,227,255" />
    <div style={{ ...abs(SL + 40, 760), opacity: clamp(c2), scale: String(clamp(c2, 0, 1.2)) }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: ICE, textAlign: 'center', width: 300 }}>10 km balandlikda</div>
      <Cube w={300} n={10} col="#9BE3FF" seed={7} />
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 80, color: ICE, textAlign: 'center', width: 300, opacity: eout(P(t, T.g400 - .2, T.g400 + .2)) }}>0,4 kg</div>
    </div>
    <div style={{ ...abs(SR - 340, 760), opacity: clamp(c1), scale: String(clamp(c1, 0, 1.2)) }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: Y, textAlign: 'center', width: 300 }}>Yer yuzida · 1 m³</div>
      <Cube w={300} n={30} col="#FFCF3A" seed={3} />
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 80, color: Y, textAlign: 'center', width: 300, opacity: eout(P(t, T.kg12 - .2, T.kg12 + .2)) }}>1,2 kg</div>
    </div>
    <Pill s="3 barobar siyrak" x={CX} y={1290} a={eout(P(t, T.x3 - .2, T.x3 + .2))} size={40} col={Y} />
    <Src s="NASA Glenn atmosfera modeli · hisob: 1,227 → 0,414 kg/m³" y={1360} a={eout(P(t, T.kg12, T.kg12 + .4))} />
    <Head t={t} t0={2.95} t1={12.2} y={490} lines={[['gap'], ['havoda', 'y']]} size={96} />
  </Layer>;
};

/* plane pushing through air dots: dense (low) vs sparse (high) */
const AirLane: React.FC<{ t: number; y: number; n: number; col: string; label: string; a: number; seed: number }> = ({ t, y, n, col, label, a, seed }) => {
  if (a <= 0) return null;
  const r = rnd(seed); const D = Array.from({ length: n }, () => [r() * 860, r() * 200, .5 + r()]);
  return <div style={{ ...abs(SL, y, SR - SL), height: 240, opacity: a, borderRadius: 24, border: `2px solid ${col}55`, background: 'rgba(14,16,22,.6)', overflow: 'hidden' }}>
    <svg width={SR - SL} height={240} style={{ position: 'absolute', left: 0, top: 0 }}>
      {D.map(([x, yy, s], i) => <circle key={i} cx={((x - t * 260 * s) % 860 + 860) % 860} cy={yy + 20} r={4 * s} fill={col} opacity=".75" />)}
    </svg>
    <div style={{ position: 'absolute', left: 300, top: 60 }}><Plane w={330} id={`l${seed}`} flame={1} /></div>
    <div style={{ position: 'absolute', left: 18, top: 12, fontFamily: SANS, fontWeight: 800, fontSize: 26, color: col }}>{label}</div>
  </div>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 12.15, 21.9, .3, .3);
  const fuel = eout(P(t, T.yoq - .2, T.yoq + .3));
  return <Layer a={a} z={logZ(P(t, 12.15, 21.9), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.8} />
    <AirLane t={t} y={740} n={14} col={ICE} label="tepada: yo‘lak bo‘m-bo‘sh" a={eout(P(t, T.tepada - .4, T.tepada))} seed={11} />
    <AirLane t={t} y={1010} n={150} col={Y} label="pastda: to‘ydagi olomon" a={eout(P(t, T.siyrak2 - .3, T.siyrak2 + .2))} seed={5} />
    <Pill s="kam qarshilik → kam yoqilg‘i ✓" x={CX} y={1310} a={fuel} size={30} col={GRN} />
    <Head t={t} t0={12.15} t1={21.9} y={490} lines={[['siyrak havo —'], ['tejamkor yo‘l', 'g']]} size={88} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 21.85, 24.75, .3, .25);
  const cl = eout(P(t, T.bulut - .3, T.bulut + .3)), st = eout(P(t, T.boron - .2, T.boron + .3));
  return <Layer a={a} z={logZ(P(t, 21.85, 24.75), 1, 1.05)}>
    <Glow x={CX} y={900} r={520} a={.8} col="91,140,255" />
    <div style={{ ...abs(CX - 260, 760) }}><Plane w={520} id="c" flame={1} /></div>
    <div style={{ ...abs(SL, 990, SR - SL), borderTop: `3px dashed ${Y}`, opacity: cl }} />
    <div style={{ ...abs(SR - 260, 1000), fontFamily: MONO, fontSize: 24, color: Y, opacity: cl }}>~10 km</div>
    <div style={{ ...abs(SL + 10, 1060 + (1 - cl) * 60), opacity: cl }}><Cloud w={300} /></div>
    <div style={{ ...abs(CX - 60, 1110 + (1 - st) * 60), opacity: st }}><Cloud w={340} dark /></div>
    <Head t={t} t0={21.85} t1={24.75} y={490} lines={[['bulut va bo‘ron —'], ['pastda qoladi', 'y']]} size={84} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 24.7, 26.25, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={24.7} t1={26.25} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.2, 36.35, .3, .3);
  const up = eio(P(t, T.balandga - .3, T.havo3)) * (1 - eio(P(t, T.km1012 - .6, T.km1012 + .2)));
  const pY = lerp(1080, 800, up);
  const w1 = eout(P(t, T.qanot - .2, T.qanot + .3)), w2 = eout(P(t, T.kisl - .2, T.kisl + .3)), g = eout(P(t, T.km1012 - .2, T.km1012 + .3));
  return <Layer a={a} z={logZ(P(t, 26.2, 36.35), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col={g > .5 ? '61,220,132' : '236,58,44'} />
    {/* zones */}
    <div style={{ ...abs(SL, 720, SR - SL), height: 200, borderRadius: 20, background: 'rgba(236,58,44,.12)', border: `2px solid ${RED}66` }} />
    <div style={{ ...abs(SL + 20, 730), fontFamily: SANS, fontWeight: 800, fontSize: 26, color: RED }}>juda baland · havo juda siyrak</div>
    <div style={{ ...abs(SL, 1000, SR - SL), height: 200, borderRadius: 20, background: `rgba(61,220,132,${.06 + .12 * g})`, border: `2px solid ${GRN}${g > .5 ? 'cc' : '44'}` }} />
    <div style={{ ...abs(SL + 20, 1010), fontFamily: SANS, fontWeight: 800, fontSize: 26, color: GRN, opacity: .4 + .6 * g }}>10–12 km · oltin o‘rtalik</div>
    <div style={{ ...abs(CX - 200, pY), rotate: `${up * -8}deg` }}><Plane w={400} id="d" flame={1 - .7 * w2} /></div>
    <Pill s="qanot ko‘tarmaydi ✗" x={CX - 200} y={1270} a={w1 * (1 - g)} size={28} col={RED} dark />
    <Pill s="dvigatelga O₂ yetmaydi ✗" x={CX + 190} y={1340} a={w2 * (1 - g)} size={28} col={RED} dark />
    <Stamp s="OLTIN O‘RTALIK" x={CX} y={1300} t={t} t0={T.oltin - .1} t1={36.35} col={GRN} size={56} rot={-4} />
    <Head t={t} t0={26.2} t1={T.km1012 - .1} y={490} lines={[['nega undan'], ['balandroq emas?', 'r']]} size={88} />
    <Head t={t} t0={T.km1012 - .1} t1={36.35} y={490} lines={[['10–12 km —'], ['eng to‘g‘ri balandlik', 'g']]} size={80} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 36.3, 38.8, .3, .3);
  const v = eio(P(t, T.tash - .2, T.m50));
  return <Layer a={a} z={logZ(P(t, 36.3, 38.8), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.9} col="155,227,255" />
    <div style={{ ...abs(CX - 260, 760) }}><Thermo h={420} v={1 - v * .9} /></div>
    <Num v={`${Math.round(lerp(15, -50, v))} °C`.replace('-', '−')} x={CX + 120} y={880} a={1} size={150} col={ICE} />
    <Src s="NASA modeli: 10 km da −49,9 °C" y={1260} a={eout(P(t, T.m50, T.m50 + .3))} />
    <Head t={t} t0={36.3} t1={38.8} y={490} lines={[['tashqarida esa'], ['qahraton', 'y']]} size={90} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['deraza talashadigan'], ['do‘stga yuboring', 'y']]} />;

const HITS: [number, number, number][] = [[T.km10, 8, 7], [T.kg12, 8, 7], [T.g400, 8, 7], [T.x3, 10, 6], [T.olomon, 6, 7], [T.endi, 20, 5], [T.qanot, 8, 7], [T.kisl, 8, 7], [T.oltin, 12, 6], [T.m50, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1030} r={600} a={1} col="91,140,255" />
    <div style={{ ...abs(SL + 60, 1150) }}><Cloud w={300} /></div>
    <div style={{ ...abs(CX + 80, 1190) }}><Cloud w={280} dark /></div>
    <div style={{ ...abs(CX + 40 - 340, 860), rotate: '-6deg' }}><Plane w={680} id="cv" flame={1} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>nega? · fizika</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 116, lineHeight: 1.02, ...yel }}>NEGA AYNAN<br />10 KM?</div>
    <div style={{ ...abs(SL, 1400, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: GRN }}>HAVO 3 BAROBAR SIYRAK<br /><span style={{ color: ICE }}>TASHQARIDA −50 °C</span></div>
    <div style={{ ...abs(SL, 1560, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>NASA atmosfera modeli</div>
  </AbsoluteFill>;
};
