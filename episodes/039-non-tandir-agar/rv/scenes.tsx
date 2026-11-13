import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, rnd } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art (generic tandir + non, no brands) ---------- */
const Non: React.FC<{ s: number; id: string; burnt?: number }> = ({ s, id, burnt = 0 }) => {
  const R = rnd(id.length * 7 + 3);
  const dots = Array.from({ length: 22 }, () => { const a = R() * 6.28, r = 18 + R() * 34; return [100 + Math.cos(a) * r, 100 + Math.sin(a) * r]; });
  return <svg width={s} height={s} viewBox="0 0 200 200" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <radialGradient id={`nr${id}`} cx=".45" cy=".4" r=".65"><stop offset="0" stopColor={burnt ? '#7a5a3a' : '#f2b765'} /><stop offset=".7" stopColor={burnt ? '#5a3e26' : '#c97a2e'} /><stop offset="1" stopColor={burnt ? '#3a2616' : '#8c4a17'} /></radialGradient>
      <radialGradient id={`nc${id}`} cx=".5" cy=".45" r=".6"><stop offset="0" stopColor={burnt ? '#8d7458' : '#f7d69a'} /><stop offset="1" stopColor={burnt ? '#6a5238' : '#dca763'} /></radialGradient>
    </defs>
    <circle cx="100" cy="104" r="96" fill="#000" opacity=".35" />
    <circle cx="100" cy="100" r="96" fill={`url(#nr${id})`} />
    <circle cx="100" cy="100" r="60" fill={`url(#nc${id})`} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <line key={i} x1={100 + Math.cos(i * .785) * 12} y1={100 + Math.sin(i * .785) * 12} x2={100 + Math.cos(i * .785) * 52} y2={100 + Math.sin(i * .785) * 52} stroke={burnt ? '#4e3a26' : '#b9823f'} strokeWidth="3" strokeDasharray="3 6" />)}
    {dots.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2.6" ry="1.5" fill="#fff6e0" opacity=".85" />)}
    <ellipse cx="70" cy="58" rx="30" ry="12" fill="#fff" opacity=".18" transform="rotate(-30 70 58)" />
  </svg>;
};

const Tandir: React.FC<{ w: number; id: string; fire?: number }> = ({ w, id, fire = 1 }) => (
  <svg width={w} height={w * .9} viewBox="0 0 400 360" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`tb${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7a4526" /><stop offset=".45" stopColor="#c98a55" /><stop offset="1" stopColor="#6a3a1e" /></linearGradient>
      <radialGradient id={`tf${id}`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffd36b" /><stop offset=".5" stopColor="#ff7a1f" /><stop offset="1" stopColor="#7a1d08" /></radialGradient>
      <filter id={`tg${id}`}><feGaussianBlur stdDeviation="10" /></filter>
    </defs>
    <rect x="60" y="300" width="280" height="40" rx="10" fill="#4a3324" />
    <path d="M70 300 Q50 150 130 80 L270 80 Q350 150 330 300 Z" fill={`url(#tb${id})`} />
    {[130, 180, 230].map(y => <path key={y} d={`M${88 - (y - 130) * .1} ${y} Q200 ${y + 14} ${312 + (y - 130) * .1} ${y}`} stroke="#5a301a" strokeWidth="3" fill="none" opacity=".35" />)}
    <ellipse cx="200" cy="80" rx="80" ry="22" fill="#3a2214" />
    <ellipse cx="200" cy="80" rx="66" ry="16" fill={`url(#tf${id})`} opacity={.4 + .6 * fire} />
    <ellipse cx="200" cy="60" rx="70" ry="40" fill="#ff8a2a" opacity={.35 * fire} filter={`url(#tg${id})`} />
    <path d="M110 120 Q100 180 104 250" stroke="#fff" strokeWidth="8" opacity=".12" fill="none" strokeLinecap="round" />
  </svg>
);

/* top view: tandir mouth with n loaves on the wall */
const TandirTop: React.FC<{ d: number; shown: number; id: string; glow?: number }> = ({ d, shown, id, glow = 1 }) => {
  const n = 16;
  return <div style={{ width: d, height: d, position: 'relative' }}>
    <svg width={d} height={d} viewBox="0 0 400 400" style={{ position: 'absolute', left: 0, top: 0 }}>
      <defs><radialGradient id={`tt${id}`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffb347" stopOpacity={glow} /><stop offset=".45" stopColor="#c2410c" stopOpacity={.8 * glow} /><stop offset="1" stopColor="#2a140a" /></radialGradient></defs>
      <circle cx="200" cy="200" r="198" fill="#8a5530" />
      <circle cx="200" cy="200" r="178" fill="#5c3218" />
      <circle cx="200" cy="200" r="172" fill={`url(#tt${id})`} />
    </svg>
    {Array.from({ length: n }).map((_, i) => {
      const s = clamp(shown * n - i); if (s <= 0) return null;
      const a = i / n * 6.283 - 1.57, r = d * .335, ns = d * .2;
      return <div key={i} style={{ position: 'absolute', left: d / 2 + Math.cos(a) * r - ns / 2, top: d / 2 + Math.sin(a) * r - ns / 2, scale: String(eback(s)), opacity: clamp(s * 2) }}><Non s={ns} id={`${id}${i}`} /></div>;
    })}
  </div>;
};

const Person: React.FC<{ s: number; col?: string }> = ({ s, col = '#F3F5F8' }) => (
  <svg width={s} height={s * 1.6} viewBox="0 0 20 32" style={{ display: 'block' }}>
    <circle cx="10" cy="6" r="5" fill={col} /><path d="M3 30 L3 18 Q3 12 10 12 Q17 12 17 18 L17 30 Z" fill={col} />
  </svg>
);

const Granny: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s * 1.25} viewBox="0 0 200 250" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="grd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EC3A2C" /><stop offset="1" stopColor="#9b1f15" /></linearGradient></defs>
    <path d="M20 250 Q20 150 100 145 Q180 150 180 250 Z" fill="url(#grd)" />
    {[60, 100, 140].map(x => <circle key={x} cx={x} cy={205} r="7" fill="#FFCF3A" opacity=".8" />)}
    <circle cx="100" cy="95" r="48" fill="#e9b98d" />
    <path d="M46 98 Q44 36 100 34 Q156 36 154 98 Q150 60 100 58 Q50 60 46 98 Z" fill="#F3F5F8" />
    <path d="M46 98 Q40 140 62 150 L70 120 Z M154 98 Q160 140 138 150 L130 120 Z" fill="#F3F5F8" />
    <path d="M80 92 Q86 86 92 92 M108 92 Q114 86 120 92" stroke="#3a2a20" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M84 116 Q100 128 116 116" stroke="#3a2a20" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="74" cy="108" r="8" fill="#e58b7a" opacity=".5" /><circle cx="126" cy="108" r="8" fill="#e58b7a" opacity=".5" />
  </svg>
);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.2, .2, .3);
  const fly = eout(P(t, T.non - .3, T.tandirda + .2));
  return <Layer a={a} z={logZ(P(t, -1, 5.2), 1, 1.05)}>
    <Glow x={CX} y={1030} r={540} a={.95} />
    <div style={{ ...abs(CX - 230, 920) }}><Tandir w={460} id="a" /></div>
    {/* loaves fly into the mouth */}
    {[0, 1, 2, 3, 4].map(i => { const p = clamp(fly * 1.6 - i * .15); const x = lerp(SL + 40 + i * 170, CX - 60, eio(p)), y = lerp(780 + (i % 2) * 40, 940, eio(p));
      return <div key={i} style={{ ...abs(x, y), opacity: 1 - P(p, .85, 1), scale: String(lerp(1, .5, p)) }}><Non s={120} id={`f${i}`} /></div>; })}
    <Pill s="38 mln non · 1 tandir · 1 kun" x={CX} y={1350} a={eout(P(t, T.qancha - .3, T.qancha + .1))} size={30} col={Y} />
    <Head t={t} t0={-1} t1={5.2} y={490} lines={[['barcha non'], ['bitta tandirda?', 'y']]} size={92} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.15, 10.6, .3, .3);
  const cnt = eio(P(t, T.m38 - .1, T.m38 + 1.2));
  const per = eout(P(t, T.har - .3, T.har + .2));
  return <Layer a={a} z={logZ(P(t, 5.15, 10.6), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.8} col="91,140,255" />
    <div style={{ ...abs(CX - 250, 725), scale: String(lerp(1, .72, per)), transformOrigin: '50% 0', display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gap: 10 }}>
      {Array.from({ length: 30 }).map((_, i) => <div key={i} style={{ opacity: i < cnt * 30 ? 1 : .08 }}><Person s={40} col={i % 7 === 3 ? Y : WH} /></div>)}
    </div>
    <Num v={fmt(38236704 * cnt)} y={lerp(960, 880, per)} a={eout(P(t, T.m38 - .2, T.m38))} size={lerp(120, 84, per)} />
    <Src s="O‘zbekiston aholisi · 1.01.2026 · Milliy statistika qo‘mitasi" y={lerp(1090, 975, per)} a={eout(P(t, T.m38, T.m38 + .4))} />
    <Card x={SL + 60} y={1040} w={SR - SL - 120} a={per} style={{ padding: 20, border: `2px solid ${Y}`, display: 'flex', alignItems: 'center', gap: 24 }}>
      <Person s={70} col={Y} />
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: WH }}>=</div>
      <div style={{ scale: String(eback(P(t, T.bitta - .2, T.bitta + .3))) }}><Non s={120} id="p" /></div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: Y, lineHeight: 1.1 }}>1 non<br /><span style={{ color: GR, fontSize: 30 }}>kuniga</span></div>
    </Card>
    <Src s="taxminan: 171 kg un/yil ÷ 365 ≈ 470 g = ~1 non (50 kg un → ~106 non)" y={1300} a={eout(P(t, T.taxminan, T.taxminan + .4))} />
    <Src s="cbu.uz (FAO) · kursiv.media" y={1345} a={eout(P(t, T.taxminan, T.taxminan + .4))} />
    <Head t={t} t0={5.15} t1={10.6} y={490} lines={[['38 million'], ['og‘iz', 'y']]} size={96} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 10.55, 15.05, .3, .3);
  const fill = eio(P(t, T.tandirga, T.n16 + .9));
  const clk = P(t, T.yopish, T.d15 + 1);
  return <Layer a={a} z={logZ(P(t, 10.55, 15.05), 1, 1.04)}>
    <Glow x={CX} y={960} r={560} a={.95} col="255,140,40" />
    <div style={{ ...abs(CX - 260, 690) }}><TandirTop d={520} shown={fill} id="s3" /></div>
    <div style={{ ...abs(CX - 80, 870), width: 160, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: WH, textShadow: '0 4px 20px rgba(0,0,0,.8)', opacity: eout(P(t, T.n16 - .2, T.n16 + .1)) }}>{Math.round(16 * fill)}</div>
    <div style={{ ...abs(SR - 170, 1180), width: 150, height: 150, borderRadius: 75, border: `6px solid ${ICE}`, background: 'rgba(14,16,22,.85)', opacity: eout(P(t, T.yopish - .3, T.yopish)) }}>
      <svg width="138" height="138" viewBox="0 0 138 138"><path d={`M69 69 L69 8 A61 61 0 ${clk > .5 ? 1 : 0} 1 ${69 + Math.sin(clk * 6.283) * 61} ${69 - Math.cos(clk * 6.283) * 61} Z`} fill={ICE} opacity=".5" /></svg>
    </div>
    <Pill s="15 daqiqa" x={SR - 95} y={1365} a={eout(P(t, T.d15 - .2, T.d15 + .1))} size={30} col={ICE} />
    <Pill s="tandir · ⌀ 1,2 m · 14–18 non" x={CX - 120} y={1270} a={eout(P(t, T.sigadi - .3, T.sigadi))} size={28} col={Y} dark />
    <Src s="kursiv.media 2025 · non.uz (10–15 daqiqa)" y={1340} a={eout(P(t, T.sigadi, T.sigadi + .4))} />
    <Head t={t} t0={10.55} t1={15.05} y={490} lines={[['bir yopishda'], ['16 ta non', 'y']]} size={96} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 15.0, 18.95, .3, .3);
  const n = eio(P(t, T.m24 - .4, T.m24 + 1.0));
  const R = rnd(5);
  return <Layer a={a} z={logZ(P(t, 15.0, 18.95), 1, 1.04)}>
    <Glow x={CX} y={980} r={540} a={.85} col="236,58,44" />
    <div style={{ ...abs(SL + 30, 775, SR - SL - 60), height: 210, position: 'relative' }}>
      {Array.from({ length: 36 }).map((_, i) => { const s = clamp(n * 36 - i); return <div key={i} style={{ position: 'absolute', left: (i % 12) * 66 + R() * 8, top: Math.floor(i / 12) * 70 + R() * 8, opacity: s, scale: String(eout(s)) }}><Non s={62} id={`g${i}`} /></div>; })}
    </div>
    <div style={{ ...abs(SL, 990, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: GR, opacity: eout(P(t, T.demak - .2, T.demak + .2)) }}>38 236 704 ÷ 16 =</div>
    <Num v={(n > .99 ? '≈ ' : '') + fmt(2389794 * n)} y={1060} a={eout(P(t, T.m24 - .4, T.m24))} size={124} col={RED} />
    <Stamp s="MARTA YOPISH" x={CX} y={1270} t={t} t0={T.marta} t1={18.95} col={Y} size={50} rot={-4} />
    <Src s="hisob: aholi ÷ 16 non ≈ 2,39 mln yopish" y={1370} a={eout(P(t, T.marta, T.marta + .4))} />
    <Head t={t} t0={15.0} t1={18.95} y={490} lines={[['demak —'], ['2,4 mln yopish', 'r']]} size={92} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 18.9, 20.5, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={18.9} t1={20.5} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 20.45, 28.5, .3, .3);
  const yrs = eio(P(t, T.y68 - .5, T.y68 + 1.2));
  const old = eout(P(t, T.birinchi - .2, T.nevara + .2));
  return <Layer a={a} z={logZ(P(t, 20.45, 28.5), 1, 1.03)}>
    <Glow x={CX} y={960} r={540} a={.9} col="255,140,40" />
    {/* calendar pages flipping */}
    <Card x={CX - 210} y={735} w={420} a={eout(P(t, 20.45, 21))} style={{ padding: 0, overflow: 'hidden', border: `2px solid ${RED}`, scale: String(lerp(1, .82, old)), transformOrigin: '50% 0' }}>
      <div style={{ background: RED, padding: '10px 0', textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: WH }}>to‘xtovsiz · 24/7</div>
      <div style={{ padding: '14px 0 8px', textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 150, color: Y, lineHeight: 1 }}>{Math.round(68 * yrs)}</div>
      <div style={{ paddingBottom: 18, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: WH }}>yil</div>
    </Card>
    <Src s="hisob: 2 389 794 × 15 daq = 35,8 mln daqiqa ≈ 68 yil" y={lerp(1060, 990, old)} a={eout(P(t, T.y68, T.y68 + .4))} />
    {/* first loaf: fresh -> stone */}
    <div style={{ ...abs(CX - 260, 1060), display: 'flex', alignItems: 'center', gap: 30, opacity: old }}>
      <div style={{ textAlign: 'center' }}><Non s={150} id="fr" /><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: GRN, marginTop: 6 }}>2026 · issiq</div></div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: WH }}>→</div>
      <div style={{ textAlign: 'center', filter: `grayscale(${eout(P(t, T.qotib - .2, T.qotib + .4))})` }}><Non s={150} id="old" burnt={1} /><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: RED, marginTop: 6 }}>2094 · nevaralarga</div></div>
    </div>
    <Stamp s="TOSH BO‘LDI" x={CX + 150} y={1290} t={t} t0={T.qotib} t1={28.5} col={RED} size={44} rot={-6} />
    <Head t={t} t0={20.45} t1={28.5} y={490} lines={[['bir kunlik non —'], ['68 yilda', 'r']]} size={92} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 28.45, 33.5, .3, .3);
  const grow = eio(P(t, T.tandir2 - .3, T.km2 + .4));
  const d = lerp(60, 580, grow);
  return <Layer a={a} z={logZ(P(t, 28.45, 33.5), 1, 1.03)}>
    <Glow x={CX} y={1000} r={lerp(300, 600, grow)} a={.95} col="255,140,40" />
    <div style={{ ...abs(CX - d / 2, 1010 - d / 2) }}>
      <svg width={d} height={d} viewBox="0 0 400 400"><defs><radialGradient id="gt7" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffb347" /><stop offset=".55" stopColor="#c2410c" /><stop offset="1" stopColor="#2a140a" /></radialGradient></defs>
        <circle cx="200" cy="200" r="198" fill="#8a5530" /><circle cx="200" cy="200" r="186" fill="url(#gt7)" />
        {Array.from({ length: 90 }).map((_, i) => { const ang = i * 2.39996, r = 20 + Math.sqrt(i / 90) * 160; return <circle key={i} cx={200 + Math.cos(ang) * r} cy={200 + Math.sin(ang) * r} r={7} fill="#e7a352" stroke="#8c4a17" strokeWidth="2" opacity={clamp(grow * 3 - .5)} />; })}
      </svg>
    </div>
    {/* ordinary tandir for scale */}
    <div style={{ ...abs(SL + 10, 1320), display: 'flex', alignItems: 'center', gap: 12, opacity: eout(P(t, T.tandir2 - .2, T.tandir2 + .2)) }}>
      <div style={{ width: 18, height: 18, borderRadius: 9, background: '#c98a55', border: '3px solid #ffb347' }} />
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: GR }}>oddiy tandir · 1,2 m</div>
    </div>
    <Num v={grow > .98 ? '≈ 1 855 m' : `${fmt(lerp(1.2, 1855, grow))} m`} y={960} a={eout(P(t, T.km2 - .5, T.km2 - .1))} size={110} col={WH} />
    <Pill s="15 daqiqada · hammasi birdan" x={CX} y={770} a={eout(P(t, T.d15b - .2, T.d15b + .2)) * (1 - clamp(grow * 4))} size={30} col={Y} dark />
    <Src s="hisob: 1,2 m × √2 389 794 ≈ 1 855 m (taxminan)" y={1375} a={eout(P(t, T.km2, T.km2 + .4))} />
    <Head t={t} t0={28.45} t1={33.5} y={490} lines={[['tandir eni'], ['qariyb 2 km', 'y']]} size={96} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 33.45, 36.65, .3, .3);
  const bub = eback(P(t, T.mening - .25, T.mening + .2));
  return <Layer a={a} z={logZ(P(t, 33.45, 36.65), 1, 1.04)}>
    <Glow x={CX} y={1050} r={520} a={.9} />
    <div style={{ ...abs(SL + 20, 980) }}><Granny s={260} /></div>
    <div style={{ ...abs(SL + 290, 1080) }}><Tandir w={280} id="q" /></div>
    <div style={{ ...abs(SL + 150, 730), width: 620, padding: '26px 30px', borderRadius: 30, background: WH, color: '#11141a', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.1, textAlign: 'center', scale: String(Math.max(0, bub)), transformOrigin: '20% 100%', boxShadow: '0 20px 50px rgba(0,0,0,.5)' }}>
      «Mening tandirim yaxshiroq!»
      <div style={{ position: 'absolute', left: 80, bottom: -28, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${WH}` }} />
    </div>
    <Stamp s="✓ 100%" x={SR - 120} y={1000} t={t} t0={T.yaxshiroq} t1={36.65} col={GRN} size={48} rot={8} />
    <Head t={t} t0={33.45} t1={36.65} y={490} lines={[['qaynona'], ['baribir aytadi', 'y']]} size={92} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['nonni yaxshi ko‘radigan'], ['do‘stga yuboring', 'y']]} />;

const HITS: [number, number, number][] = [[T.m38, 10, 6], [T.n16, 8, 7], [T.m24, 12, 6], [T.marta, 8, 7], [T.endi, 20, 5], [T.y68, 12, 6], [T.qotib, 10, 6], [T.km2, 14, 6], [T.yaxshiroq, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1080} r={620} a={1} col="255,140,40" />
    <div style={{ ...abs(CX + 40 - 260, 840) }}><TandirTop d={520} shown={1} id="cv" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>agar… · o‘zbek noni</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>BARCHA NON<br />BITTA TANDIRDA?</div>
    <div style={{ ...abs(SL, 1400, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, lineHeight: 1.15, color: RED }}>68 YIL<br /><span style={{ color: WH }}>YOKI 2 KM LIK TANDIR</span></div>
    <div style={{ ...abs(SL, 1570, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>Statistika qo‘mitasi · cbu.uz · kursiv.media · 2026</div>
  </AbsoluteFill>;
};
