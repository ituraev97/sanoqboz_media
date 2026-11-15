import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone, Donut } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, ShareEnd, Background, Reel } from '../kit';
import { T } from './ep';

/* ---------- topic art (generic, no real logos) ---------- */
// generic Central-Asian portal (pishtoq) with a turquoise dome and two minarets
const Portal: React.FC<{ w: number; id: string; lit?: number }> = ({ w, id, lit = 0 }) => (
  <svg width={w} height={w * 1.0} viewBox="0 0 320 320" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`pw${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0d6a2" /><stop offset="1" stopColor="#b98d52" /></linearGradient>
      <radialGradient id={`pd${id}`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#9BF0FF" /><stop offset=".55" stopColor="#1fa4c4" /><stop offset="1" stopColor="#0b5a72" /></radialGradient>
      <linearGradient id={`pa${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0c2a4a" /><stop offset="1" stopColor="#1a4f86" /></linearGradient>
    </defs>
    <ellipse cx="160" cy="92" rx="62" ry="66" fill={`url(#pd${id})`} />
    {[-40, -20, 0, 20, 40].map(d => <path key={d} d={`M${160 + d * .9} 30 Q${160 + d * 1.5} 90 ${160 + d * 1.2} 140`} stroke="#0b5a72" strokeWidth="2.5" fill="none" opacity=".6" />)}
    <rect x="152" y="14" width="16" height="20" rx="4" fill="#FFCF3A" />
    {[18, 274].map(x => <g key={x}>
      <rect x={x} y="70" width="28" height="240" rx="6" fill={`url(#pw${id})`} stroke="#7a5a2c" strokeWidth="3" />
      {[100, 150, 200, 250].map(y => <rect key={y} x={x} y={y} width="28" height="8" fill="#1fa4c4" />)}
      <path d={`M${x - 4} 70 L${x + 14} 44 L${x + 32} 70 Z`} fill="#1fa4c4" />
    </g>)}
    <rect x="60" y="120" width="200" height="190" fill={`url(#pw${id})`} stroke="#7a5a2c" strokeWidth="4" />
    <rect x="72" y="132" width="176" height="178" fill="none" stroke="#1fa4c4" strokeWidth="8" />
    <path d="M104 310 L104 206 Q104 160 160 146 Q216 160 216 206 L216 310 Z" fill={`url(#pa${id})`} stroke="#FFCF3A" strokeWidth="4" />
    {[0, 1, 2].map(r => [0, 1, 2, 3].map(c => <rect key={`${r}${c}`} x={118 + c * 22} y={210 + r * 28} width="14" height="18" rx="3" fill="#FFCF3A" opacity={.25 + .75 * clamp(lit * 3 - (r + c) * .3)} />))}
  </svg>
);

const Train: React.FC<{ w: number; id: string }> = ({ w, id }) => (
  <svg width={w} height={w * .26} viewBox="0 0 600 156" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`tr${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#b9c2d0" /></linearGradient></defs>
    <path d="M20 40 L420 40 Q560 44 590 120 L590 132 L20 132 Z" fill={`url(#tr${id})`} stroke="#5a6272" strokeWidth="4" />
    <path d="M20 96 L560 96 Q578 104 588 116 L20 116 Z" fill="#EC3A2C" />
    {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={40 + i * 62} y="56" width="44" height="28" rx="6" fill="#1b2638" />)}
    <path d="M440 52 Q520 56 556 92 L440 92 Z" fill="#1b2638" />
    {[60, 160, 300, 400, 520].map(x => <circle key={x} cx={x} cy="138" r="14" fill="#2a303c" stroke="#7F8792" strokeWidth="3" />)}
  </svg>
);

const Hotel: React.FC<{ w: number; id: string; floors: number; on?: number }> = ({ w, id, floors, on = 1 }) => {
  const h = floors * 34 + 30;
  return <svg width={w} height={w * h / 140} viewBox={`0 0 140 ${h}`} style={{ display: 'block' }}>
    <defs><linearGradient id={`ht${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3a4a66" /><stop offset="1" stopColor="#1e2738" /></linearGradient></defs>
    <rect x="4" y="4" width="132" height={h - 8} rx="8" fill={`url(#ht${id})`} stroke="#9BE3FF" strokeWidth="3" />
    {Array.from({ length: floors }).map((_, r) => [0, 1, 2].map(c => <rect key={`${r}${c}`} x={18 + c * 38} y={16 + r * 34} width="26" height="20" rx="3" fill={(r * 3 + c) % 4 === 1 ? '#3a4458' : '#FFCF3A'} opacity={clamp(on * 4 - (floors - r) * .25)} />))}
  </svg>;
};

const Person: React.FC<{ w: number; col: string }> = ({ w, col }) => (
  <svg width={w} height={w * 1.4} viewBox="0 0 100 140" style={{ display: 'block' }}>
    <circle cx="50" cy="32" r="24" fill={col} />
    <path d="M10 136 Q10 70 50 66 Q90 70 90 136 Z" fill={col} />
  </svg>
);

const Coin: React.FC<{ w: number; id: string }> = ({ w, id }) => (
  <svg width={w} height={w} viewBox="0 0 200 200" style={{ display: 'block' }}>
    <defs><radialGradient id={`cn${id}`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff2b0" /><stop offset=".5" stopColor="#FFCF3A" /><stop offset="1" stopColor="#b8860b" /></radialGradient></defs>
    <circle cx="100" cy="100" r="92" fill={`url(#cn${id})`} stroke="#8a6408" strokeWidth="6" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="#8a6408" strokeWidth="4" opacity=".6" />
    <text x="100" y="128" textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize="86" fill="#5a3f04">$</text>
  </svg>
);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.1, .2, .3);
  const m = eback(P(t, T.b12 - .2, T.b12 + .3));
  return <Layer a={a} z={logZ(P(t, -1, 3.1), 1, 1.05)}>
    <Glow x={CX} y={1080} r={560} a={.9} col="31,164,196" />
    <div style={{ ...abs(CX - 210, 790) }}><Portal w={420} id="p1" lit={P(t, 0, 2.5)} /></div>
    <div style={{ ...abs(SR - 330, 1170), opacity: clamp(m), scale: String(clamp(m, 0, 1.1)), rotate: '-8deg' }}>
      <Pill s="× 12 ?" x={120} y={30} a={1} size={64} col={Y} />
    </div>
    <Head t={t} t0={-1} t1={3.1} y={490} lines={[['samarqandga'], ['turist nega ×12?', 'y']]} size={92} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 3.0, 11.45, .3, .3);
  const base = 1230, k = 380 / 3000;
  const g1 = eout(P(t, T.k239 - .5, T.k239 + .3)), g2 = eout(P(t, T.m3 - .8, T.m3 + .3));
  const v1 = Math.round(239 * g1), v2 = 3 * g2;
  const st = eback(P(t, T.m3 + .2, T.m3 + .6));
  return <Layer a={a} z={logZ(P(t, 3.0, 11.45), 1, 1.03)}>
    <Glow x={CX} y={1000} r={560} a={.8} col="91,140,255" />
    <div style={{ ...abs(SL + 20, base, SR - SL - 40), height: 3, background: 'rgba(255,255,255,.3)' }} />
    {/* 2018 bar */}
    <div style={{ position: 'absolute', left: CX - 300, top: base - Math.max(4, 239 * k * g1), width: 220, height: Math.max(4, 239 * k * g1), borderRadius: '14px 14px 0 0', background: `linear-gradient(180deg, ${ICE}, ${ICE}55)`, opacity: eout(P(t, T.y2018 - .3, T.y2018)) }} />
    <div style={{ ...abs(CX - 350, base - 239 * k * g1 - 80, 320), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: ICE, opacity: clamp(g1 * 3) }}>{v1} ming</div>
    <Pill s="2018 · 10 oy" x={CX - 190} y={base + 40} a={eout(P(t, T.y2018 - .3, T.y2018))} size={30} col={WH} dark />
    {/* 2025 bar */}
    <div style={{ position: 'absolute', left: CX + 80, top: base - Math.max(4, 3000 * k * g2), width: 220, height: Math.max(4, 3000 * k * g2), borderRadius: '14px 14px 0 0', background: `linear-gradient(180deg, ${Y}, ${Y}55)`, opacity: eout(P(t, T.y2025 - .3, T.y2025)) }} />
    <div style={{ ...abs(CX + 30, base - 3000 * k * g2 - 80, 320), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: Y, opacity: clamp(g2 * 3) }}>{v2 >= 2.995 ? '3 mln+' : `${v2.toFixed(1).replace('.', ',')} mln`}</div>
    <Pill s="2025 · 11 oy" x={CX + 190} y={base + 40} a={eout(P(t, T.y2025 - .3, T.y2025))} size={30} col={WH} dark />
    <div style={{ ...abs(CX - 340, 900, 300), textAlign: 'center', opacity: clamp(st), scale: String(clamp(st, 0, 1.1)) }}>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: RED, lineHeight: 1 }}>×12</div>
      <div style={{ fontFamily: MONO, fontSize: 22, color: GR, marginTop: 6 }}>3 000 000 ÷ 239 000 ≈ 12,5</div>
    </div>
    <Src s="manba: O‘zR elchixonasi, 08.11.2018 · xs.uz, 06.01.2026" y={1330} a={eout(P(t, T.k239, T.k239 + .4))} />
    <Pill s="xorijiy turistlar · Samarqand" x={CX} y={1385} a={eout(P(t, T.k239, T.k239 + .4))} size={24} col={ICE} dark />
    <Head t={t} t0={3.0} t1={11.45} y={490} lines={[['xorijiy turistlar'], ['2018 → 2025', 'y']]} size={92} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 11.4, 18.6, .3, .3);
  const run = eio(P(t, T.toshkent, T.soat + .6));
  const sw = eio(P(t, T.qaynona - .3, T.qaynona + .2));
  const secs = 2 * 3600 + 20 * 60 + Math.max(0, (t - T.qaynona)) * 520;
  const hh = Math.floor(secs / 3600), mm = Math.floor(secs / 60) % 60, ss = Math.floor(secs) % 60;
  const over = eback(P(t, T.uzoq - .2, T.uzoq + .3));
  return <Layer a={a} z={logZ(P(t, 11.4, 18.6), 1, 1.03)}>
    <Glow x={CX} y={1000} r={540} a={.85} col="236,58,44" />
    <div style={{ opacity: 1 - sw }}>
      {/* route line */}
      <div style={{ ...abs(SL + 40, 1180, SR - SL - 80), height: 6, borderRadius: 3, background: 'rgba(255,255,255,.18)' }} />
      <div style={{ ...abs(SL + 40, 1180, (SR - SL - 80) * run), height: 6, borderRadius: 3, background: Y }} />
      <div style={{ ...abs(SL + 26, 1168), width: 30, height: 30, borderRadius: 15, background: WH }} />
      <div style={{ ...abs(SR - 56, 1168), width: 30, height: 30, borderRadius: 15, background: run > .98 ? Y : GR }} />
      <div style={{ ...abs(SL, 1215, 260), fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH }}>Toshkent</div>
      <div style={{ ...abs(SR - 260, 1215, 260), textAlign: 'right', fontFamily: SANS, fontWeight: 800, fontSize: 30, color: Y }}>Samarqand</div>
      <div style={{ ...abs(lerp(SL - 420, SR - 520, run), 1000) }}><Train w={520} id="t1" /></div>
      <Num v="≈ 2 soat 20 daq" y={800} a={eout(P(t, T.soat - .2, T.soat + .3))} size={96} col={Y} />
      <Src s="manba: spot.uz, 2025 · tezyurar poyezd jadvali 13:56 → 16:14" y={1320} a={eout(P(t, T.soat, T.soat + .4))} />
    </div>
    <div style={{ opacity: sw }}>
      <div style={{ ...abs(CX - 150, 700) }}><Phone w={300} id="p3">
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#14301f,#0b130e)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 90, boxSizing: 'border-box' }}>
          <div style={{ width: 96, height: 96, borderRadius: 48, background: 'linear-gradient(135deg,#ffcf3a,#ec3a2c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>👵</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, marginTop: 16 }}>Qaynona</div>
          <div style={{ fontFamily: MONO, fontSize: 30, color: GRN, marginTop: 10 }}>{hh}:{String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}</div>
          <div style={{ width: 70, height: 70, borderRadius: 35, background: RED, marginTop: 120 }} />
        </div>
      </Phone></div>
      <Stamp s="POYEZD TEZROQ!" x={CX} y={1330} t={t} t0={T.uzoq - .1} t1={18.7} col={GRN} size={54} rot={-4} />
      <Pill s="hazil 🙂" x={SR - 120} y={760} a={clamp(over)} size={26} col={GR} dark />
    </div>
    <Head t={t} t0={11.4} t1={T.qaynona - .2} y={490} lines={[['toshkentdan'], ['poyezdda 2 soat', 'y']]} size={92} />
    <Head t={t} t0={T.qaynona - .2} t1={18.6} y={490} lines={[['qaynona bilan'], ['suhbat uzoqroq', 'g']]} size={88} from="slam" />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 18.55, 26.2, .3, .25);
  const g = [eout(P(t, T.y2022 - .2, T.h165 + .3)), eout(P(t, T.h165 + .3, T.y2024)), eout(P(t, T.y2024, T.h361 + .2))];
  const vals = [165, 247, 361], yrs = ['2022', '2023', '2024'], fl = [4, 6, 9];
  const st = eback(P(t, T.h361 + .1, T.h361 + .5));
  return <Layer a={a} z={logZ(P(t, 18.55, 26.2), 1, 1.03)}>
    <Glow x={CX} y={1000} r={560} a={.85} col="155,227,255" />
    <div style={{ ...abs(SL + 20, 1220, SR - SL - 40), height: 3, background: 'rgba(255,255,255,.3)' }} />
    {vals.map((v, i) => {
      const x = CX - 300 + i * 220, w = 160, h = w * (fl[i] * 34 + 30) / 140;
      return <React.Fragment key={i}>
        <div style={{ ...abs(x, 1220 - h * g[i]), height: h * g[i], overflow: 'hidden', opacity: clamp(g[i] * 4) }}>
          <Hotel w={w} id={`h${i}`} floors={fl[i]} on={g[i]} />
        </div>
        <div style={{ ...abs(x - 40, 1220 - h * g[i] - 76, w + 80), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: i === 2 ? 66 : 52, color: i === 2 ? Y : ICE, opacity: clamp(g[i] * 3) }}>{Math.round(v * g[i])}</div>
        <Pill s={yrs[i]} x={x + w / 2} y={1262} a={clamp(g[i] * 3)} size={28} col={WH} dark />
      </React.Fragment>;
    })}
    <Stamp s="2 YILDA ×2,2" x={CX - 180} y={790} t={t} t0={T.h361 + .1} t1={26.3} col={GRN} size={48} rot={-5} />
    <Src s="manba: Samarqand viloyati statistika boshqarmasi, 2024" y={1330} a={eout(P(t, T.h165, T.h165 + .4))} />
    <Pill s="mehmonxona va shu kabi joylar soni" x={CX} y={1385} a={eout(P(t, T.h165, T.h165 + .4)) * (st > 0 ? 1 : 1)} size={24} col={ICE} dark />
    <Head t={t} t0={18.55} t1={26.2} y={490} lines={[['mehmonxonalar'], ['ham ko‘paydi', 'y']]} size={96} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.1, 27.75, .12, .25);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={26.1} t1={27.75} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 27.6, 33.95, .25, .3);
  const pop = (i: number) => eback(P(t, T.ozb + i * .2, T.ozb + .4 + i * .2));
  const hl = eout(P(t, T.tort, T.tort + .5));
  const rows: [string, string, number][] = [['Qirg‘iziston', '3,3 mln', T.qirg], ['Tojikiston', '2,7 mln', T.toj], ['Qozog‘iston', '2,7 mln', T.qoz]];
  return <Layer a={a} z={logZ(P(t, 27.6, 33.95), 1, 1.03)}>
    <Glow x={CX} y={980} r={560} a={.85} col="236,58,44" />
    {[0, 1, 2, 3].map(i => <div key={i} style={{ ...abs(CX - 330 + i * 170, 740), opacity: clamp(pop(i)), scale: String(clamp(pop(i), 0, 1.1)) }}>
      <Person w={130} col={i < 3 ? (hl > .5 ? Y : '#c9d0da') : '#5b6372'} />
    </div>)}
    <Pill s="4 turistdan 3 tasi" x={CX} y={960} a={hl} size={40} col={Y} />
    {rows.map(([n, v, t0], i) => {
      const r = eout(P(t, t0 - .3, t0 + .1));
      return <Card key={i} x={SL + 60} y={1030 + i * 90} w={SR - SL - 120} a={r} style={{ padding: '14px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34, color: WH }}>{n}</span>
        <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: Y }}>{v}</span>
      </Card>;
    })}
    <Src s="manba: Statistika agentligi / spot.uz · O‘zbekiston, 2025: 11,7 mln" y={1320} a={eout(P(t, T.qirg, T.qirg + .4))} />
    <Pill s="(3,3 + 2,7 + 2,7) ÷ 11,7 ≈ 74 %" x={CX} y={1380} a={eout(P(t, T.qoz, T.qoz + .4))} size={26} col={ICE} dark />
    <Head t={t} t0={27.6} t1={T.qoshni - .2} y={490} lines={[['o‘zbekistonga'], ['kim keladi?', 'y']]} size={96} />
    <Head t={t} t0={T.qoshni - .2} t1={33.95} y={490} lines={[['ko‘pchiligi —'], ['qo‘shnilar', 'r']]} size={96} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 33.85, 41.05, .25, .3);
  const c = eback(P(t, T.har - .1, T.har + .4));
  const v = Math.round(320 * eout(P(t, T.d320 - .5, T.d320 + .1)));
  const sw = eio(P(t, T.m3b - .3, T.m3b + .2));
  const big = eback(P(t, T.mlrd - .2, T.mlrd + .3));
  return <Layer a={a} z={logZ(P(t, 33.85, 41.05), 1, 1.03)}>
    <Glow x={CX} y={980} r={560} a={.9} col="61,220,132" />
    <div style={{ opacity: 1 - sw }}>
      <div style={{ ...abs(CX - 150, 700), opacity: clamp(c), scale: String(clamp(c, 0, 1.08)) }}><Coin w={300} id="c7" /></div>
      <Num v={v > 0 ? `$${v}` : '$?'} y={1030} a={eout(P(t, T.har, T.har + .3))} size={150} col={GRN} />
      <Pill s="1 xorijiy mehmon · o‘rtacha" x={CX} y={1230} a={eout(P(t, T.d320, T.d320 + .3))} size={30} col={WH} dark />
    </div>
    <div style={{ opacity: sw }}>
      <Card x={SL + 40} y={720} w={SR - SL - 80} a={sw} style={{ padding: 26, textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>taxminan · hisob</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: WH, marginTop: 6 }}>3 mln × $320</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: GR, marginTop: 4 }}>= $960 mln</div>
      </Card>
      <div style={{ ...abs(SL, 1010, SR - SL), textAlign: 'center', opacity: clamp(big), scale: String(clamp(big, 0, 1.1)) }}>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 150, color: Y, lineHeight: 1 }}>≈ $1 mlrd</div>
      </div>
    </div>
    <Src s="manba: Turizm qo‘mitasi / zamin.uz, 2025 · $320 o‘rtacha xarajat" y={1330} a={eout(P(t, T.d320, T.d320 + .4))} />
    <Head t={t} t0={33.85} t1={T.m3b - .2} y={490} lines={[['har bir mehmon'], ['qancha sarflaydi?', 'y']]} size={88} />
    <Head t={t} t0={T.m3b - .2} t1={41.05} y={490} lines={[['bir yilda'], ['≈ 1 milliard $', 'g']]} size={96} from="slam" />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['registonni ko‘rmagan'], ['do‘stga yuboring', 'y']]} />;

const HITS: [number, number, number][] = [[T.k239, 6, 7], [T.m3, 14, 6], [T.soat, 6, 7], [T.uzoq, 8, 7], [T.h361, 10, 6], [T.endi, 20, 5], [T.tort, 10, 6], [T.d320, 8, 7], [T.mlrd, 14, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1060} r={620} a={1} col="31,164,196" />
    <div style={{ ...abs(CX + 40 - 230, 760) }}><Portal w={460} id="cv" lit={1} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>nega? · samarqand turizmi</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 104, lineHeight: 1.04, whiteSpace: 'nowrap', ...yel }}>SAMARQANDGA TURIST<br />NEGA ×12?</div>
    <div style={{ ...abs(SL, 1440, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: GRN }}>239 MING → 3 MLN+<br /><span style={{ color: RED }}>MAMLAKATGA: 4 DAN 3 TASI QO‘SHNI</span></div>
    <div style={{ ...abs(SL, 1600, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>manba: xs.uz · spot.uz · 2025</div>
  </AbsoluteFill>;
};
