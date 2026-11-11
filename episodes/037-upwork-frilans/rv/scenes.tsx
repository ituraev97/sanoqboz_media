import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, rnd } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art (generic, no real logos) ---------- */
const Laptop: React.FC<{ w: number; t: number; id: string; clock?: number }> = ({ w, t, id, clock = 1 }) => {
  const ang = t * 120;
  return <svg width={w} height={w * .72} viewBox="0 0 320 230" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`lp${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a3550" /><stop offset="1" stopColor="#11151f" /></linearGradient>
      <linearGradient id={`lb${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9aa3b2" /><stop offset="1" stopColor="#5a6272" /></linearGradient>
    </defs>
    <rect x="30" y="0" width="260" height="170" rx="12" fill="#1d2230" stroke="#4a5266" strokeWidth="4" />
    <rect x="40" y="10" width="240" height="150" rx="6" fill={`url(#lp${id})`} />
    {[0, 1, 2, 3].map(i => <rect key={i} x="58" y={30 + i * 22} width={[150, 110, 170, 90][i]} height="10" rx="5" fill={i === 0 ? '#5B8CFF' : '#3a4458'} />)}
    <rect x="58" y="122" width="80" height="24" rx="12" fill="#3DDC84" /><text x="98" y="139" textAnchor="middle" fontFamily="Int, sans-serif" fontWeight="800" fontSize="14" fill="#06210f">$ / soat</text>
    <path d="M0 176 L320 176 L300 200 L20 200 Z" fill={`url(#lb${id})`} /><rect x="135" y="176" width="50" height="6" rx="3" fill="#4a5266" />
    {clock > 0 && <g opacity={clock} transform="translate(250 40)">
      <circle r="38" fill="#FFCF3A" stroke="#1A1306" strokeWidth="4" /><circle r="30" fill="#FFF6D8" />
      <line x1="0" y1="0" x2="0" y2="-22" stroke="#1A1306" strokeWidth="5" strokeLinecap="round" transform={`rotate(${ang})`} />
      <line x1="0" y1="0" x2="14" y2="0" stroke="#EC3A2C" strokeWidth="5" strokeLinecap="round" transform={`rotate(${ang / 12})`} /><circle r="4" fill="#1A1306" />
    </g>}
  </svg>;
};
const Coin: React.FC<{ w: number; s?: string; col?: string }> = ({ w, s = '$', col = '#FFCF3A' }) => (
  <div style={{ width: w, height: w, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff6d0, ${col} 45%, #b8861a)`, border: '4px solid #8a6510', display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: w * .48, color: '#5a3d00', boxShadow: '0 10px 24px rgba(0,0,0,.5)' }}>{s}</div>
);
const Token: React.FC<{ w: number }> = ({ w }) => (
  <div style={{ width: w, height: w * .62, borderRadius: 18, background: 'linear-gradient(135deg,#5B8CFF,#2a4fb8)', border: '3px solid #9bb8ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 40px rgba(0,0,0,.55)', position: 'relative' }}>
    <div style={{ position: 'absolute', left: -14, top: '50%', width: 28, height: 28, borderRadius: 14, background: '#0b0d12', translate: '0 -50%' }} />
    <div style={{ position: 'absolute', right: -14, top: '50%', width: 28, height: 28, borderRadius: 14, background: '#0b0d12', translate: '0 -50%' }} />
    <div style={{ fontFamily: MONO, fontSize: w * .085, color: '#dbe5ff' }}>1 × CONNECT</div>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: w * .26, color: WH, lineHeight: 1 }}>$0.15</div>
  </div>
);
const Calc: React.FC<{ w: number; v: string }> = ({ w, v }) => (
  <div style={{ width: w, padding: w * .07, borderRadius: 22, background: 'linear-gradient(180deg,#2b3142,#151922)', border: '2px solid rgba(255,255,255,.18)', boxShadow: '0 20px 50px rgba(0,0,0,.6)' }}>
    <div style={{ borderRadius: 10, background: '#cfe8c4', padding: '10px 14px', textAlign: 'right', fontFamily: MONO, fontWeight: 700, fontSize: w * .12, color: '#1d2a17' }}>{v}</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 12 }}>
      {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '=', '+'].map((k, i) => <div key={i} style={{ height: w * .13, borderRadius: 8, background: i % 4 === 3 ? '#EC3A2C' : '#3a4458', display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: w * .07, color: WH }}>{k}</div>)}
    </div>
  </div>
);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 2.9, .2, .3);
  const q = eback(P(t, T.qancha - .3, T.qancha + .3));
  return <Layer a={a} z={logZ(P(t, -1, 2.9), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.9} />
    <div style={{ ...abs(CX - 270, 780) }}><Laptop w={540} t={t} id="a" /></div>
    <div style={{ ...abs(CX + 200, 1110), scale: String(clamp(q, 0, 1.2)), opacity: clamp(q), fontFamily: HEAD, fontWeight: 700, fontSize: 150, ...yel }}>?</div>
    <Pill s="frilans · soatbay ish" x={CX} y={1280} a={eout(P(t, T.frilanser - .2, T.frilanser + .2))} size={30} col={Y} />
    <Head t={t} t0={-1} t1={2.9} y={490} lines={[['upwork’da 1 soat'], ['qancha turadi?', 'y']]} size={84} />
  </Layer>;
};

const BAR_MAX = 120;
const Bar: React.FC<{ x: number; a: number; lo: number; hi: number; lab: string; col: string; plus?: boolean }> = ({ x, a, lo, hi, lab, col, plus }) => {
  const base = 1240, k = 3.3, g = eout(a);
  const hHi = hi * k * g, hLo = lo * k * g;
  return a <= 0 ? null : <>
    <div style={{ position: 'absolute', left: x, top: base - hHi, width: 200, height: hHi - hLo, borderRadius: '14px 14px 0 0', background: `linear-gradient(180deg, ${col}, ${col}55)`, opacity: clamp(a * 2) }} />
    <div style={{ position: 'absolute', left: x, top: base - hLo, width: 200, height: hLo, background: `${col}22`, borderLeft: `2px dashed ${col}55`, borderRight: `2px dashed ${col}55`, opacity: clamp(a * 2) }} />
    <div style={{ ...abs(x - 30, base - hHi - 78, 260), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: col, opacity: clamp(a * 2 - 1) }}>${lo}–{hi}{plus ? '+' : ''}</div>
    <div style={{ ...abs(x - 30, base + 14, 260), textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH, opacity: clamp(a * 2) }}>{lab}</div>
  </>;
};
const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 2.85, 14.0, .3, .3);
  return <Layer a={a} z={logZ(P(t, 2.85, 14.0), 1, 1.03)}>
    <Glow x={CX} y={1000} r={560} a={.8} col="91,140,255" />
    <div style={{ ...abs(SL + 30, 1240, SR - SL - 60), height: 3, background: 'rgba(255,255,255,.3)', opacity: eout(P(t, T.yangi - .3, T.yangi)) }} />
    {[SL + 50, CX - 100, SR - 250].map((x, i) => { const g = eout(P(t, T.upwork + i * .15, T.upwork + .4 + i * .15)); return <div key={i} style={{ position: 'absolute', left: x, top: 1240 - [25, 60, 120][i] * 3.3, width: 200, height: [25, 60, 120][i] * 3.3, border: '3px dashed rgba(255,255,255,.22)', borderBottom: 'none', borderRadius: '14px 14px 0 0', opacity: g * .9 * (1 - clamp(P(t, [T.r1, T.r2, T.r3][i] - .4, [T.r1, T.r2, T.r3][i] - .1))), display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 70, color: 'rgba(255,255,255,.25)' }}>?</div>; })}
    <Bar x={SL + 50} a={P(t, T.r1 - .3, T.r1 + .6)} lo={10} hi={25} lab="yangi" col={ICE} />
    <Bar x={CX - 100} a={P(t, T.r2 - .3, T.r2 + .6)} lo={25} hi={60} lab="o‘rta" col={GRN} />
    <Bar x={SR - 250} a={P(t, T.r3 - .3, T.r3 + .6)} lo={60} hi={BAR_MAX} lab="ekspert" col={Y} plus />
    <Pill s="$ / soat" x={CX} y={1345} a={eout(P(t, T.r1, T.r1 + .3))} size={28} col={ICE} dark />
    <Src s="manba: Upwork — «Upwork hourly rates» qo‘llanmasi, 2026" y={1395} a={eout(P(t, T.r1, T.r1 + .4))} />
    <Head t={t} t0={2.85} t1={14.0} y={490} lines={[['upwork’ning'], ['o‘z ma’lumoti', 'y']]} size={92} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 13.95, 17.75, .3, .3);
  const c = eback(P(t, T.d20 - .3, T.d20 + .2)), s = eio(P(t, T.s240 - .5, T.s240 + .5));
  return <Layer a={a} z={logZ(P(t, 13.95, 17.75), 1, 1.04)}>
    <Glow x={CX} y={980} r={540} a={.85} col="61,220,132" />
    <div style={{ ...abs(CX - 90, 720), scale: String(clamp(c, 0, 1.2)), opacity: clamp(c) }}><Coin w={180} /></div>
    <Num v="$20" y={930} a={clamp(c)} size={110} col={WH} />
    <Pill s="× 11 974 so‘m" x={CX} y={1090} a={eout(P(t, T.taxminan - .3, T.taxminan))} size={32} col={ICE} dark />
    <Num v={`≈ ${fmt(240000 * s)} so‘m`} y={1140} a={eout(P(t, T.s240 - .5, T.s240 - .2))} size={84} col={GRN} />
    <Pill s="bir soatga!" x={CX} y={1290} a={eout(P(t, T.soat - .2, T.soat + .2))} size={34} col={Y} />
    <Src s="1 $ = 11 974 so‘m (MB, 11.11.2026) · hisob, taxminan" y={1360} a={eout(P(t, T.s240, T.s240 + .4))} />
    <Head t={t} t0={13.95} t1={17.75} y={490} lines={[['$20 soatiga —'], ['so‘mda qancha?', 'y']]} size={88} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 17.7, 21.95, .3, .25);
  const b = eback(P(t, T.kalk - .3, T.kalk + .2));
  return <Layer a={a} z={logZ(P(t, 17.7, 21.95), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <div style={{ ...abs(SL + 40, 740), fontSize: 120 }}>👵</div>
    <Card x={SL + 210} y={750} w={460} a={eout(P(t, T.kun - .3, T.kun + .2))} style={{ padding: 22, borderRadius: '26px 26px 26px 4px' }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: WH }}>Kun bo‘yi kompyuterda o‘tirasan! 🤨</div>
    </Card>
    <div style={{ ...abs(CX - 150, 960), opacity: clamp(b), scale: String(clamp(b, 0, 1.1)), rotate: '-4deg' }}><Calc w={300} v="240 000" /></div>
    <div style={{ ...abs(SR - 160, 1150), fontSize: 110, opacity: clamp(b) }}>😎</div>
    <Head t={t} t0={17.7} t1={21.95} y={490} lines={[['qaynona'], ['so‘rasa', 'y']]} size={96} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 21.8, 23.6, .12, .25);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={21.8} t1={23.6} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 23.5, 32.55, .25, .3);
  const tk = eback(P(t, T.connects - .3, T.connects + .2));
  const sw = eio(P(t, T.platforma - .4, T.platforma + .1));
  const fee = eout(P(t, T.f15 - .3, T.f15 + .6));
  const R = rnd(7);
  return <Layer a={a} z={logZ(P(t, 23.5, 32.55), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="236,58,44" />
    {/* part 1: applying costs Connects */}
    <div style={{ opacity: 1 - sw }}>
      <Card x={SL + 60} y={750} w={SR - SL - 120} a={eout(P(t, T.ariza - .3, T.ariza + .2))} style={{ padding: '20px 28px' }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>ishga ariza · yuborish</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: WH, marginTop: 8 }}>Salom! Men bu ishni qila olaman…</div>
        <div style={{ marginTop: 14, display: 'inline-block', padding: '8px 18px', borderRadius: 12, background: RED, fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH }}>Connects kerak</div>
      </Card>
      <div style={{ ...abs(CX - 170, 1010), scale: String(clamp(tk, 0, 1.15)), opacity: clamp(tk), rotate: `${lerp(-12, -4, clamp(tk))}deg` }}><Token w={340} /></div>
      {Array.from({ length: 6 }).map((_, i) => { const d = clamp(P(t, T.c15 + i * .12, T.c15 + .5 + i * .12)); return d > 0 && d < 1 ? <div key={i} style={{ ...abs(SL + 80 + R() * 640, 1000 + d * 300), opacity: 1 - d }}><Coin w={60} s="¢" /></div> : null; })}
    </div>
    {/* part 2: platform fee 0–15% */}
    <div style={{ opacity: sw }}>
      <div style={{ ...abs(SL + 60, 780), fontFamily: MONO, fontSize: 24, color: GR, opacity: sw }}>misol: mijoz $100 to‘ladi</div>
      <div style={{ ...abs(SL + 60, 830, SR - SL - 120), height: 110, borderRadius: 18, overflow: 'hidden', display: 'flex', border: '2px solid rgba(255,255,255,.2)' }}>
        <div style={{ flex: `${100 - 15 * fee}`, background: 'linear-gradient(180deg,#3DDC84,#1f9a57)', display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 46, color: '#06210f' }}>sizga $85–100</div>
        <div style={{ flex: `${Math.max(.01, 15 * fee)}`, background: 'linear-gradient(180deg,#EC3A2C,#9a1f16)', display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: WH }}>{fee > .6 ? '$0–15' : ''}</div>
      </div>
      <Num v="0–15 %" y={1010} a={eout(P(t, T.f15 - .3, T.f15))} size={130} col={RED} />
      <Pill s="shartnomaga qarab o‘zgaradi" x={CX} y={1215} a={eout(P(t, T.ushlab - .3, T.ushlab + .1))} size={30} col={ICE} dark />
    </div>
    <Src s={sw < .5 ? 'Upwork: 1 Connect = $0.15 (+soliq) · har ishga soni har xil' : 'Upwork: frilanser xizmat haqi 0–15 % · misol hisob'} y={1330} a={eout(P(t, T.c15 - .2, T.c15 + .3))} />
    <Head t={t} t0={23.5} t1={T.platforma - .2} y={490} lines={[['ariza ham'], ['pullik', 'r']]} size={96} from="slam" />
    <Head t={t} t0={T.platforma - .2} t1={32.55} y={490} lines={[['platforma'], ['ulushi', 'r']]} size={96} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 32.5, 38.2, .3, .3);
  const b1 = eout(P(t, T.kim - .1, T.kim + .5)), b2 = eout(P(t, T.p36 - .4, T.p36 + .3));
  const base = 1230, h = 290;
  return <Layer a={a} z={logZ(P(t, 32.5, 38.2), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="61,220,132" />
    <div style={{ ...abs(SL + 40, base, SR - SL - 80), height: 3, background: 'rgba(255,255,255,.3)' }} />
    <div style={{ position: 'absolute', left: SL + 120, top: base - h * b1, width: 230, height: h * b1, borderRadius: '16px 16px 0 0', background: 'linear-gradient(180deg,#7F8792,#3a4458)' }} />
    <div style={{ ...abs(SL + 90, base - h * b1 - 70, 290), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: WH, opacity: b1 }}>100 %</div>
    <div style={{ ...abs(SL + 90, base + 16, 290), textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: GR, opacity: b1 }}>boshqa loyihalar</div>
    <div style={{ position: 'absolute', left: SR - 350, top: base - h * 1.36 * b2, width: 230, height: h * 1.36 * b2, borderRadius: '16px 16px 0 0', background: 'linear-gradient(180deg,#3DDC84,#1f9a57)' }} />
    <div style={{ ...abs(SR - 380, base - h * 1.36 * b2 - 80, 290), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: GRN, opacity: b2 }}>+36 %</div>
    <div style={{ ...abs(SR - 380, base + 16, 290), textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: GRN, opacity: b1 }}>AI loyihalari</div>
    <Pill s="soatbay stavka" x={CX} y={1335} a={b1} size={28} col={ICE} dark />
    <Src s="Upwork 2025 yillik hisoboti: AI loyihalarida soatiga 36 % ko‘proq" y={1385} a={eout(P(t, T.p36, T.p36 + .4))} />
    <Head t={t} t0={32.5} t1={38.2} y={490} lines={[['kim ko‘proq'], ['topadi?', 'g']]} size={96} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 38.15, T.buni + .1, .3, .3);
  const s1 = eback(P(t, T.avval - .2, T.avval + .3)), s2 = eback(P(t, T.keyin - .2, T.keyin + .3));
  return <Layer a={a} z={logZ(P(t, 38.15, 41.9), 1, 1.03)}>
    <Glow x={CX} y={960} r={540} a={.85} />
    <Stamp s="DAROMAD KAFOLAT EMAS" x={CX} y={870} t={t} t0={T.daromad2 - .1} t1={T.buni + .1} col={RED} size={52} rot={-4} />
    <Card x={SL + 40} y={1040} w={360} a={clamp(s1)} style={{ padding: 24, textAlign: 'center', scale: String(clamp(s1, 0, 1.08)), border: `2px solid ${ICE}` }}>
      <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>1-qadam</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 58, color: ICE }}>KO‘NIKMA</div>
    </Card>
    <div style={{ ...abs(CX - 30, 1090), fontFamily: HEAD, fontWeight: 700, fontSize: 70, color: GR, opacity: clamp(s2) }}>→</div>
    <Card x={SR - 400} y={1040} w={360} a={clamp(s2)} style={{ padding: 24, textAlign: 'center', scale: String(clamp(s2, 0, 1.08)), border: `2px solid ${GRN}` }}>
      <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>2-qadam</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 58, color: GRN }}>MIJOZ</div>
    </Card>
    <Head t={t} t0={38.15} t1={T.buni + .1} y={490} lines={[['avval'], ['ko‘nikma', 'y']]} size={96} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['frilans boshlovchi'], ['do‘stga yuboring', 'y']]} />;

const HITS: [number, number, number][] = [[T.r1, 6, 7], [T.r2, 6, 7], [T.r3, 8, 7], [T.d20, 8, 7], [T.s240, 10, 6], [T.kalk, 6, 7], [T.endi, 20, 5], [T.pullik, 10, 6], [T.c15, 8, 7], [T.f15, 12, 6], [T.p36, 10, 6], [T.daromad2, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1040} r={600} a={1} />
    <div style={{ ...abs(CX + 40 - 300, 830) }}><Laptop w={600} t={1.3} id="cv" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>internetda pul · frilans</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>UPWORK’DA<br />SOATIGA QANCHA?</div>
    <div style={{ ...abs(SL, 1330, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: GRN }}>$10 DAN $120 GACHA<br /><span style={{ color: RED }}>LEKIN ARIZA HAM PULLIK</span></div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>manba: Upwork · 2026</div>
  </AbsoluteFill>;
};
