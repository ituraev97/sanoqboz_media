import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, YL, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, rnd, clamp } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, flight, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* generic airliner, side view (no airline livery) */
const Plane: React.FC<{ w: number; id: string; rot?: number }> = ({ w, id, rot = 0 }) => (
  <svg width={w} height={w * .36} viewBox="0 0 500 180" style={{ display: 'block', overflow: 'visible', rotate: `${rot}deg` }}>
    <defs><linearGradient id={`pl${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#c9d1e0" /><stop offset="1" stopColor="#7d879b" /></linearGradient></defs>
    <path d="M70 70 L 30 10 L 70 10 L 130 70 Z" fill="#9aa6bd" />
    <path d="M40 72 C 40 60 60 56 90 56 L 400 56 C 450 56 488 80 488 96 C 488 110 460 118 420 118 L 80 118 C 56 118 40 100 40 72 Z" fill={`url(#pl${id})`} stroke="#4a5266" strokeWidth="3" />
    <path d="M200 104 L 300 104 L 230 172 L 190 172 Z" fill="#aab3c6" stroke="#4a5266" strokeWidth="3" />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={140 + i * 22} y={74} width={12} height={14} rx={4} fill="#2a3448" />)}
    <path d="M440 70 C 456 72 470 80 476 90 L 448 90 Z" fill="#2a3448" />
    <rect x="40" y="96" width="440" height="6" fill={RED} opacity=".85" />
  </svg>
);
/* simple house with lights */
const House: React.FC<{ w: number; t: number; lit: number }> = ({ w, t, lit }) => (
  <svg width={w} height={w * .9} viewBox="0 0 300 270" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="hsW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9dcc4" /><stop offset="1" stopColor="#b79f78" /></linearGradient></defs>
    <path d="M20 120 L 150 20 L 280 120 Z" fill="#a8432f" stroke="#5a2418" strokeWidth="4" />
    <rect x="40" y="118" width="220" height="150" fill="url(#hsW)" stroke="#6b5a3a" strokeWidth="4" />
    <rect x="70" y="150" width="60" height="54" rx="4" fill={lit > 0 ? '#FFCF3A' : '#2a3040'} opacity={.6 + .4 * lit} />
    <rect x="170" y="150" width="60" height="54" rx="4" fill={lit > 0 ? '#FFCF3A' : '#2a3040'} opacity={.6 + .4 * lit} />
    <rect x="128" y="200" width="44" height="68" rx="4" fill="#6b4a2a" />
    {lit > 0 && Array.from({ length: 11 }, (_, i) => <circle key={i} cx={30 + i * 24} cy={124 - Math.abs(5 - i) * 0} r="6" fill={['#FFCF3A', '#EC3A2C', '#3DDC84', '#5B8CFF'][(i + Math.floor(t * 4)) % 4]} opacity={lit} />)}
  </svg>
);
/* qozon with osh */
const Qozon: React.FC<{ w: number; t: number }> = ({ w, t }) => (
  <svg width={w} height={w * .7} viewBox="0 0 300 210" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="qzG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3a3f4b" /><stop offset=".5" stopColor="#6b7284" /><stop offset="1" stopColor="#2a2e38" /></linearGradient></defs>
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M${90 + i * 40} ${40 - ((t * 30 + i * 13) % 30)} C ${80 + i * 40} 20 ${104 + i * 40} 10 ${94 + i * 40} -14`} stroke="#fff" strokeOpacity=".3" strokeWidth="5" fill="none" strokeLinecap="round" />)}
    <ellipse cx="150" cy="70" rx="140" ry="30" fill="#e8b45a" stroke="#2a2e38" strokeWidth="6" />
    {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={30 + (i * 37) % 240} cy={62 + (i * 7) % 18} r="5" fill={i % 3 ? '#f6d7a0' : '#d8763a'} />)}
    <path d="M10 70 C 20 170 80 200 150 200 C 220 200 280 170 290 70" fill="url(#qzG)" stroke="#1a1d24" strokeWidth="6" />
    <path d="M0 80 L 22 80 M278 80 L 300 80" stroke="#1a1d24" strokeWidth="14" strokeLinecap="round" />
  </svg>
);
const Dots: React.FC<{ n: number; on: number; x: number; y: number; cols: number; gap: number; col: string; seed: number }> = ({ n, on, x, y, cols, gap, col, seed }) => {
  const R = rnd(seed);
  return <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
    {Array.from({ length: n }, (_, i) => { const d = R(); const lit = on * 1.2 - d > 0; const cx = x + (i % cols) * gap, cy = y + Math.floor(i / cols) * gap;
      return <g key={i} opacity={lit ? 1 : .35}><circle cx={cx} cy={cy - 9} r={6} fill={lit ? col : '#2a3040'} /><path d={`M${cx - 9} ${cy + 9} C ${cx - 9} ${cy - 2} ${cx + 9} ${cy - 2} ${cx + 9} ${cy + 9} Z`} fill={lit ? col : '#2a3040'} /></g>; })}
  </svg>;
};
const Chip: React.FC<{ s: string; y: number; a: number }> = ({ s, y, a }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: CX, top: y, translate: '-50% 0', opacity: a, padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 24, color: WH, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.0, .2, .3);
  const ps = [0, 1, 2, 3, 4].map((i) => P(t, -.5 + i * .5, 3.6 + i * .3));
  const ends: [number, number][] = [[140, 800], [800, 820], [140, 1250], [780, 1250], [330, 760]];
  return <Layer a={a} z={logZ(P(t, -1, 5), 1, 1.06)}>
    <Glow x={CX} y={1080} r={520} a={.9} />
    <div style={{ ...abs(CX - 160, 960) }}><House w={320} t={t} lit={eout(P(t, T.qaytsa - .2, T.qaytsa + .3))} /></div>
    {ps.map((p, i) => { const [x, y] = flight(p, ends[i], [CX, 1080], 30); const s = lerp(1, .35, eio(p)); return p < 1 && <div key={i} style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', scale: String(s), opacity: 1 - P(p, .85, 1) }}><div style={{ scale: ends[i][0] > CX ? '-1 1' : '1 1' }}><Plane w={220} id={`h${i}`} /></div></div>; })}
    <Pill s="bir kunda" x={CX} y={1310} a={eout(P(t, T.kunda - .1, T.kunda + .3))} size={34} dark />
    <Head t={t} t0={-1} t1={5.0} y={490} lines={[['hamma bir kunda'], ['uyga qaytsa?', 'y']]} size={72} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 4.85, 20.6, .3, .3);
  const aA = env(t, 4.85, T.bitta - .05, .3, .3), aB = env(t, T.bitta - .2, T.aero - .05, .3, .3), aC = env(t, T.aero - .2, 20.6, .3, .3);
  const cnt = eio(P(t, T.n12 - .2, T.n12 + 1.3));
  const rc = eio(P(t, T.n6667 - .1, T.reys + .2));
  const pp = (t * .55) % 1;
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 4.85, 8.6), 1, 1.05)}>
      <Glow x={CX} y={1000} r={540} a={.85} />
      <Num v={fmt(1200000 * cnt)} y={680} a={eout(P(t, T.n12 - .3, T.n12))} size={130} />
      <Dots n={120} on={cnt} x={CX - 312} y={900} cols={13} gap={52} col={Y} seed={5} />
      <Pill s="1 belgi = 10 000 kishi" x={CX} y={845} a={eout(P(t, T.n12 + .4, T.n12 + .8))} size={24} dark />
      <Pill s="40 ga yaqin davlat" x={CX} y={1365} a={eout(P(t, T.n40 - .1, T.n40 + .3))} size={30} />
      <Src s="Prezident yig‘ilishi · 20.04.2026" y={1405} a={eout(P(t, T.n12 + .3, T.n12 + .7))} />
      <Head t={t} t0={4.85} t1={T.bitta - .05} y={490} lines={[['xorijda'], ['ishlaydi', 'y']]} size={70} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.bitta, T.aero), 1, 1.05)}>
      <Glow x={CX} y={900} r={520} a={.85} col="155,227,255" />
      <div style={{ ...abs(CX - 260 + (t < T.bu ? 0 : (pp - .5) * 60), 680) }}><Plane w={520} id="p2" /></div>
      <Pill s="180 o‘rin · misol" x={CX} y={920} a={eout(P(t, T.n180 - .1, T.n180 + .3))} size={30} />
      <Num v={t < T.bu - .1 ? fmt(6667 * rc) : '4–5'} y={1000} a={eout(P(t, T.n6667 - .3, T.n6667))} size={120} />
      <div style={{ ...abs(SL, 1140, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 28, color: GR, opacity: eout(P(t, T.reys - .1, T.reys + .3)) }}>{t < T.bu - .1 ? 'reys' : 'samolyot har daqiqada · kun-u tun'}</div>
      <Chip s={t < T.bu - .1 ? '1 200 000 ÷ 180 = 6 667' : '6 667 ÷ 1 440 daqiqa ≈ 4,6'} y={1230} a={eout(P(t, T.n6667 + .3, T.n6667 + .7))} />
      <Head t={t} t0={T.bitta - .2} t1={T.bu - .1} y={490} lines={[['nechta'], ['reys kerak?', 'y']]} size={70} />
      <Head t={t} t0={T.bu - .1} t1={T.aero} y={490} lines={[['har daqiqada'], ['samolyot', 'y']]} size={68} />
    </Layer>
    <Layer a={aC}>
      <Glow x={CX} y={980} r={520} a={.85} />
      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
        <path d={`M${SL + 40} 1180 C 350 1000 600 1260 ${SR - 40} 820`} stroke="#2a3040" strokeWidth="60" fill="none" strokeLinecap="round" />
        {Array.from({ length: 60 }, (_, i) => { const u = i / 60 * eio(P(t, T.aero - .1, T.chorsu)); const x = (1 - u) ** 3 * (SL + 40) + 3 * (1 - u) ** 2 * u * 350 + 3 * (1 - u) * u * u * 600 + u ** 3 * (SR - 40); const y = (1 - u) ** 3 * 1180 + 3 * (1 - u) ** 2 * u * 1000 + 3 * (1 - u) * u * u * 1260 + u ** 3 * 820; return <circle key={i} cx={x} cy={y} r={9} fill={i % 3 ? Y : WH} />; })}
      </svg>
      <Pill s="aeroport" x={SL + 120} y={1260} a={eout(P(t, T.aero, T.aero + .3))} size={28} dark />
      <Pill s="CHORSU" x={SR - 120} y={740} a={eout(P(t, T.chorsu - .1, T.chorsu + .2))} size={34} />
      <Src s="hazil · navbat kutib oluvchilardan" y={1340} a={eout(P(t, T.chorsu, T.chorsu + .3))} />
      <Head t={t} t0={T.aero - .2} t1={20.6} y={490} lines={[['navbat —'], ['chorsugacha', 'y']]} size={70} />
    </Layer>
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 20.5, 25.95, .3, .3);
  const q = eout(P(t, T.qaynona - .2, T.qaynona + .4));
  return <Layer a={a} z={logZ(P(t, 20.5, 25.9), 1, 1.05)}>
    <Glow x={CX} y={980} r={540} a={.9} />
    <div style={{ ...abs(CX - 170 - q * 120, 720 - q * 20), scale: String(lerp(1, .8, q)) }}><House w={340} t={t} lit={1} /></div>
    <div style={{ ...abs(CX + 30, 900 + (1 - q) * 120), opacity: q }}><Qozon w={330} t={t} /></div>
    <Num v={`${Math.round(100 * eio(P(t, T.kilo - .2, T.kilo + .5)))} kg`} x={CX + 195} y={1160} a={eout(P(t, T.kilo - .3, T.kilo))} size={90} />
    <Pill s="onalar xursand" x={CX - 220} y={1080} a={eout(P(t, T.onalar - .1, T.onalar + .3))} size={28} col={GRN} />
    <Head t={t} t0={20.5} t1={T.qaynona - .1} y={490} lines={[['uyda —'], ['bayram', 'y']]} size={80} from="slam" />
    <Head t={t} t0={T.qaynona - .1} t1={25.95} y={490} lines={[['qaynona —'], ['100 kilo osh', 'y']]} size={66} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 25.8, 38.6, .3, .3);
  const n = eio(P(t, T.n189 - .2, T.n189 + 1));
  const day = eio(P(t, T.n52 - .4, T.n52 + .5));
  const stop = t > T.toxtay - .05;
  const flow = (k: number) => ((t * .8 + k / 8) % 1);
  return <Layer a={a} z={logZ(P(t, 25.8, 38.5), 1, 1.04)}>
    <Glow x={CX} y={980} r={540} a={.85} col={stop ? '236,58,44' : '61,220,132'} />
    <Num v={`${(18.9 * n).toFixed(1).replace('.', ',')} mlrd $`} y={640} a={eout(P(t, T.n189 - .4, T.n189))} size={120} col={GRN} />
    <div style={{ ...abs(SL, 780, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR, opacity: eout(P(t, T.n189, T.n189 + .4)) }}>2025-yil · xorijdan pul o‘tkazmalari</div>
    {/* money flow into the house */}
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, opacity: eout(P(t, T.y2025 - .2, T.y2025 + .3)) }}>
      <path d={`M${SL + 30} 1010 L ${SR - 230} 1010`} stroke="#1d2230" strokeWidth="56" strokeLinecap="round" />
      {!stop && Array.from({ length: 8 }, (_, k) => <text key={k} x={SL + 40 + flow(k) * (SR - SL - 300)} y={1022} fontFamily="Osw, sans-serif" fontWeight={700} fontSize="40" fill={GRN}>$</text>)}
      {stop && <rect x={CX - 40} y={970} width={30} height={80} rx="6" fill={RED} />}
    </svg>
    <div style={{ ...abs(SR - 210, 920) }}><House w={200} t={t} lit={stop ? 0 : 1} /></div>
    <Card x={CX - 260} y={1120} w={520} a={eout(P(t, T.n52 - .4, T.n52 - .1))}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 14, padding: '16px 0', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: MONO, fontSize: 22, color: GR }}>kuniga ≈</span>
        <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: Y }}>{Math.round(52 * day)} mln $</span>
      </div>
    </Card>
    <Chip s="18,9 mlrd ÷ 365 kun ≈ 51,8 mln $" y={1270} a={eout(P(t, T.n52, T.n52 + .4))} />
    <Src s="O‘zbekiston Markaziy banki · spot.uz, 19.03.2026" y={1360} a={eout(P(t, T.n189 + .3, T.n189 + .7))} />
    <Stamp s="TO‘XTAYDI" y={880} t={t} t0={T.toxtay} t1={38.6} size={60} rot={-6} />
    <Head t={t} t0={25.8} t1={T.y2025 - .1} y={490} lines={[['ertasi kuni —'], ['hisob', 'y']]} size={70} />
    <Head t={t} t0={T.y2025 - .1} t1={38.6} y={490} lines={[['pul'], ['o‘tkazmalari', 'y']]} size={66} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 38.4, 40.25, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={38.4} t1={40.25} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 40.1, 46.1, .3, .3);
  const pe = eio(P(t, T.ikki - .2, T.kam + .3)), mo = eio(P(t, T.tort - .3, T.oshdi + .3));
  const base = 1300, HH = 520;
  const hp = lerp(HH, HH / 2, pe), hm = lerp(HH / 4, HH, mo);
  const bar = (x: number, h: number, col: string, lab: string, val: string, aa: number) => aa <= 0 ? null : <div style={{ position: 'absolute', left: x, top: base - h, width: 300, opacity: aa }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: -84, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 66, color: col }}>{val}</div>
    <div style={{ height: h, borderRadius: '18px 18px 4px 4px', background: `linear-gradient(180deg, ${col}, ${col}77)`, boxShadow: `0 0 40px ${col}55` }} />
    <div style={{ marginTop: 12, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH }}>{lab}</div>
  </div>;
  return <Layer a={a} z={logZ(P(t, 40.1, 46.1), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} col={t > T.pul ? '61,220,132' : '246,185,59'} />
    {bar(SL + 40, hp, Y, 'ishlovchilar soni', t > T.ikki ? '×½' : '', eout(P(t, 40.1, 40.6)))}
    {bar(SR - 340, hm, GRN, 'pul o‘tkazmalari', t > T.tort ? '×4' : '', eout(P(t, T.pul - .2, T.pul + .2)))}
    <Src s="10 yilda · Prezident matbuot xizmati · spot.uz, 2.11.2026" y={1400} a={eout(P(t, T.kam, T.kam + .4))} />
    <Head t={t} t0={40.1} t1={T.pul - .1} y={490} lines={[['10 yilda odam'], ['2 baravar kam', 'r']]} size={64} />
    <Head t={t} t0={T.pul - .1} t1={46.1} y={490} lines={[['pul esa'], ['4 baravar ko‘p', 'g']]} size={66} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 46.0, 52.3, .3, .3);
  const c = eback(P(t, T.malaka - .2, T.malaka + .4));
  const back = eio(P(t, T.yangi - .1, T.uyda2 + .2));
  const bx = lerp(CX, SL + 230, back), by = 880;
  return <Layer a={a} z={logZ(P(t, 46, 52.3), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <Card x={CX - 220} y={700} w={440} a={clamp(c)} style={{ scale: String(lerp(.8, 1, clamp(c))), left: bx - 220, top: by - 180 }}>
      <div style={{ padding: '26px 30px', textAlign: 'center' }}>
        <div style={{ width: 120, height: 120, borderRadius: 60, margin: '0 auto', background: 'linear-gradient(180deg,#9fb8ff,#5B8CFF)', display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: '#0b0d12' }}>★</div>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR, marginTop: 14 }}>til · diplom · sertifikat</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 46, color: Y, marginTop: 6, lineHeight: 1.05 }}>MALAKALI<br />MUTAXASSIS</div>
      </div>
    </Card>
    <div style={{ ...abs(CX + 150, 800), opacity: eout(P(t, T.yangi - .2, T.yangi + .3)) }}><House w={240} t={t} lit={1} /></div>
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, opacity: eout(P(t, T.kasb, T.kasb + .4)) }}><path d={`M${SL + 470} 900 L ${CX + 130} 900`} stroke={GRN} strokeWidth="8" strokeLinecap="round" /><path d={`M${CX + 110} 880 L ${CX + 135} 900 L ${CX + 110} 920`} stroke={GRN} strokeWidth="8" fill="none" strokeLinecap="round" /></svg>
    <Pill s="uyda ham kerak" x={CX + 270} y={1100} a={eout(P(t, T.uyda2 - .1, T.uyda2 + .3))} size={30} col={GRN} />
    <Head t={t} t0={46.0} t1={T.yangi - .1} y={490} lines={[['sababi —'], ['kasb', 'y']]} size={76} from="slam" />
    <Head t={t} t0={T.yangi - .1} t1={52.3} y={490} lines={[['yangi kasb bilan'], ['qaytgan odam', 'y']]} size={60} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 52.2, 56.55, .3, .3);
  const r = (y: number, t0: number, n: number, ta: number, country: string, job: string, col: string) =>
    <Card x={SL + 20} y={y} w={SR - SL - 40} a={eout(P(t, t0 - .3, t0 + .1))} style={{ translate: `${(1 - eout(P(t, t0 - .3, t0 + .2))) * 60}px 0` }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '26px 30px', gap: 20 }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>{country}</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: WH, marginTop: 4 }}>{job}</div>
        </div>
        <div style={{ marginLeft: 'auto', fontFamily: HEAD, fontWeight: 700, fontSize: 76, color: col }}>{fmt(n * eio(P(t, ta - .2, ta + .7)))}</div>
      </div>
    </Card>;
  return <Layer a={a} z={logZ(P(t, 52.2, 56.5), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.85} col="91,140,255" />
    {r(700, T.germ, 40000, T.n40k, 'Germaniya', 'hamshira', Y)}
    {r(930, T.yapon, 15000, T.n15k, 'Yaponiya', 'qurilish, logistika, xizmat', ICE)}
    <Src s="xorijdan kelgan buyurtmalar · Prezident yig‘ilishi, 20.04.2026" y={1170} a={eout(P(t, T.n15k, T.n15k + .4))} />
    <Head t={t} t0={52.2} t1={56.55} y={490} lines={[['kimlar'], ['kerak?', 'y']]} size={80} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 56.4, END + 1, .3, .1);
  const aA = env(t, 56.4, T.buni - .05, .3, .3);
  const tilt = eio(P(t, T.kasbda - .3, T.kasbda + .4)) * 12;
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={520} a={.85} col="61,220,132" />
      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
        <rect x={CX - 8} y={820} width={16} height={380} fill="#5a6070" />
        <rect x={CX - 120} y={1190} width={240} height={24} rx="10" fill="#5a6070" />
        <g transform={`rotate(${tilt} ${CX} 830)`}>
          <rect x={CX - 330} y={822} width={660} height={14} rx="7" fill="#9aa3b5" />
          <line x1={CX - 300} y1={830} x2={CX - 300} y2={960} stroke="#9aa3b5" strokeWidth="4" />
          <line x1={CX + 300} y1={830} x2={CX + 300} y2={960} stroke="#9aa3b5" strokeWidth="4" />
          <path d={`M${CX - 400} 960 L ${CX - 200} 960 C ${CX - 220} 1010 ${CX - 380} 1010 ${CX - 400} 960 Z`} fill={Y} />
          <path d={`M${CX + 200} 960 L ${CX + 400} 960 C ${CX + 380} 1010 ${CX + 220} 1010 ${CX + 200} 960 Z`} fill={GRN} />
          <text x={CX - 300} y={940} textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight={700} fontSize="40" fill={WH}>SON</text>
          <text x={CX + 300} y={940} textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight={700} fontSize="40" fill={GRN}>KASB</text>
        </g>
      </svg>
      <Head t={t} t0={56.4} t1={T.kasbda - .1} y={490} lines={[['gap odamlar'], ['sonida emas', 'r']]} size={66} />
      <Head t={t} t0={T.kasbda - .1} t1={T.buni} y={490} lines={[['gap —'], ['kasbda', 'g']]} size={80} from="slam" />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['xorijdagi do‘stga'], ['yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.n12 + 1.3, 10, 6], [T.reys, 10, 6], [T.kilo, 8, 7], [T.n189 + 1, 12, 6], [T.toxtay, 12, 6], [T.endi, 20, 5], [T.oshdi, 10, 6], [T.malaka, 8, 7], [T.kasbda, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.5;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1160} r={580} a={1} />
    <div style={{ ...abs(CX - 160 + 40, 1060) }}><House w={320} t={t} lit={1} /></div>
    <div style={{ ...abs(SL, 860) }}><Plane w={300} id="cv1" rot={8} /></div>
    <div style={{ ...abs(SR - 250, 920), scale: '-1 1' }}><Plane w={260} id="cv2" rot={8} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>1 200 000 kishi · 1 kunda</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>HAMMA UYGA<br />QAYTSA-CHI?</div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.1, color: GRN }}>KUNIGA ~52 MLN $<br />TO‘XTAYDI</div>
  </AbsoluteFill>;
};
