import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art (generic, no brands) ---------- */
/* film clapperboard */
const Clapper: React.FC<{ w: number; open: number }> = ({ w, open }) => (
  <svg width={w} height={w * .9} viewBox="0 0 220 200" style={{ display: 'block', overflow: 'visible' }}>
    <rect x="10" y="70" width="200" height="125" rx="10" fill="#1f232c" stroke="#4a5266" strokeWidth="4" />
    <text x="110" y="148" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="34" fill="#F3F5F8">1 VIDEO</text>
    <g transform={`rotate(${-open * 22} 14 66)`}>
      <rect x="10" y="40" width="200" height="28" rx="5" fill="#F3F5F8" />
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${24 + i * 40} 40 L${46 + i * 40} 40 L${34 + i * 40} 68 L${12 + i * 40} 68 Z`} fill="#11131a" />)}
    </g>
  </svg>
);

/* dollar banknote stack */
const Cash: React.FC<{ w: number; n: number; col?: string }> = ({ w, n, col = '#3DDC84' }) => (
  <svg width={w} height={w * .2 + n * 14} viewBox={`0 0 200 ${40 + n * 14}`} style={{ display: 'block', overflow: 'visible' }}>
    {Array.from({ length: n }).map((_, i) => <g key={i} transform={`translate(${Math.sin(i * 2.1) * 6} ${(n - 1 - i) * 14})`}>
      <rect x="0" y="0" width="200" height="40" rx="5" fill={col} opacity=".9" stroke="#0c3a20" strokeWidth="2" />
      <circle cx="100" cy="20" r="12" fill="none" stroke="#0c3a20" strokeWidth="2.5" /><text x="100" y="27" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="18" fill="#0c3a20">$</text>
    </g>)}
  </svg>
);

/* locomotive heading into a giant pit; p 0..1 = how far it rolled */
const TrainPit: React.FC<{ w: number; p: number; t: number }> = ({ w, p, t }) => {
  const x = lerp(-40, 250, Math.min(p, .75) / .75), fall = clamp((p - .75) / .25);
  return <svg width={w} height={w * .7} viewBox="0 0 400 280" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="pitG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2a1a" /><stop offset="1" stopColor="#050506" /></linearGradient></defs>
    <rect x="0" y="150" width="240" height="20" fill="#5a4630" />
    <path d="M240 150 L400 150 L400 280 L260 280 Z" fill="url(#pitG)" />
    <rect x="0" y="146" width="240" height="5" fill="#9aa3b2" />
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={i * 30 + 4} y="150" width="16" height="8" fill="#6b4a2a" />)}
    <g transform={`translate(${x} ${fall * 90}) rotate(${fall * 35} 70 140)`}>
      <rect x="0" y="80" width="120" height="60" rx="6" fill="#EC3A2C" />
      <rect x="80" y="55" width="40" height="40" rx="4" fill="#b8281e" /><rect x="88" y="62" width="24" height="18" rx="3" fill="#9BE3FF" />
      <rect x="18" y="60" width="16" height="22" fill="#2a2f3c" />
      <circle cx="26" cy={48 - ((t * 2) % 1) * 20} r={8 + ((t * 2) % 1) * 8} fill="#c7cedb" opacity={.6 - ((t * 2) % 1) * .5} />
      {[24, 64, 100].map(c => <circle key={c} cx={c} cy="142" r="13" fill="#1f232c" stroke="#9aa3b2" strokeWidth="4" />)}
    </g>
  </svg>;
};

/* generic chocolate bar */
const Choco: React.FC<{ w: number; id: string }> = ({ w, id }) => (
  <svg width={w} height={w * .55} viewBox="0 0 300 165" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`ch${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7a4a2a" /><stop offset="1" stopColor="#3e2213" /></linearGradient></defs>
    <rect x="0" y="10" width="300" height="145" rx="12" fill={`url(#ch${id})`} />
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={14 + (i % 4) * 70} y={22 + Math.floor(i / 4) * 64} width="62" height="56" rx="6" fill="#5a331c" stroke="#8a5a36" strokeWidth="2" />)}
    <path d="M150 0 L300 0 L300 165 L190 165 Z" fill="#FFCF3A" />
    <text x="248" y="92" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="28" fill="#1A1306" transform="rotate(-62 248 88)">SHOKOLAD</text>
  </svg>
);

/* plate of osh */
const Osh: React.FC<{ w: number; t: number }> = ({ w, t }) => (
  <svg width={w} height={w * .6} viewBox="0 0 300 180" style={{ display: 'block', overflow: 'visible' }}>
    <ellipse cx="150" cy="120" rx="145" ry="50" fill="#e8ecf4" /><ellipse cx="150" cy="118" rx="130" ry="40" fill="#2f5fa8" />
    <ellipse cx="150" cy="116" rx="118" ry="34" fill="#f1e2bf" />
    <path d="M40 112 Q150 30 260 112 Z" fill="#e9c98a" />
    {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={70 + (i * 37) % 160} y={70 + (i * 13) % 40} width="18" height="5" rx="2" fill="#e8742a" transform={`rotate(${(i * 47) % 180} ${79 + (i * 37) % 160} ${72 + (i * 13) % 40})`} />)}
    <ellipse cx="150" cy="60" rx="22" ry="12" fill="#a0522d" />
    {[0, 1].map(i => <path key={i} d={`M${130 + i * 40} 40 q -10 -20 0 -40`} stroke="#e6ecf5" strokeWidth="5" fill="none" opacity={.4 + .3 * Math.sin(t * 3 + i)} />)}
  </svg>
);

const Bar: React.FC<{ y: number; w: number; a: number; col: string; label: string; val: string }> = ({ y, w, a, col, label, val }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: SL + 10, top: y, opacity: clamp(a * 3) }}>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH, marginBottom: 8 }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: Math.max(8, w * a), height: 60, borderRadius: 12, background: col, boxShadow: `0 0 30px ${col}55` }} />
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: col, whiteSpace: 'nowrap' }}>{val}</div>
    </div>
  </div>;

const Chip: React.FC<{ s: string; y: number; a: number; x?: number; col?: string }> = ({ s, y, a, x = CX, col = WH }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% 0', opacity: a, scale: String(lerp(.8, 1, a)), padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 26, color: col, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 7.9, .2, .3);
  const cl = Math.abs(Math.sin(t * 2.2)) * (1 - P(t, T.sarf, T.sarf + .3)) + (t > T.sarf ? 0 : 0);
  const cash = eout(P(t, T.m34 - .4, T.m34 + .2));
  return <Layer a={a} z={logZ(P(t, -1, 7.9), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.9} col="61,220,132" />
    <div style={{ ...abs(CX - 170, 720 - cash * 40), scale: String(lerp(1, .8, cash)) }}><Clapper w={340} open={cl} /></div>
    {cash > 0 && <div style={{ ...abs(CX - 160, 1100 - (1 - cash) * 60), opacity: cash }}><Cash w={320} n={6} /></div>}
    <Num v="$3–4 mln" y={970} a={cash} size={130} />
    <Pill s="asosiy kanal · o‘rtacha video" x={CX} y={1310} a={eout(P(t, T.ortacha - .2, T.ortacha + .2))} size={28} col={WH} dark />
    <Src s="Bloomberg (Fortune orqali), 2025 · kompaniya moliyasidan xabardor manbalar" y={1380} a={eout(P(t, T.m34, T.m34 + .4))} />
    <Head t={t} t0={-1} t1={7.9} y={490} lines={[['mrbeast bitta video'], ['qancha turadi?', 'y']]} size={84} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 7.85, 17.45, .3, .3);
  const tr = P(t, T.poyezd - .2, T.video + .3);
  const bars = eout(P(t, T.birinchi - .2, T.birinchi + .3));
  const b1 = eio(P(t, T.birinchi - .2, T.birinchi + .5)), b2 = eio(P(t, T.k167 - .3, T.k167 + .4));
  const n3 = eout(P(t, T.m3 - .2, T.m3 + .2)) * (1 - bars);
  return <Layer a={a} z={logZ(P(t, 7.85, 17.45), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="236,58,44" />
    <div style={{ ...abs(CX - 330, 700), opacity: 1 - bars * .8, scale: String(lerp(1, .7, bars)), transformOrigin: '50% 0' }}><TrainPit w={660} p={tr} t={t} /></div>
    <Num v="$3 mln" x={CX} y={1200} a={n3} size={120} col={RED} />
    <Bar y={960} w={820} a={b1} col={RED} label="xarajat" val="" />
    <Num v="$3 mln" x={CX} y={1040} a={b1} size={64} col={WH} />
    <Bar y={1120} w={820 * 0.0557} a={b2} col={GRN} label="reklamadan — birinchi hafta" val="$167 000" />
    <Pill s="< 6%" x={CX + 260} y={1180} a={eout(P(t, T.f6 - .2, T.f6 + .2))} size={40} col={Y} />
    <Src s="MrBeast X obunachilariga aytgan · Creator Handbook, LADbible, 2023" y={1290} a={eout(P(t, T.k167, T.k167 + .4))} />
    <Head t={t} t0={7.85} t1={17.45} y={490} lines={[['poyezd va'], ['ulkan chuqur', 'y']]} size={92} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 17.4, 19.05, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={17.4} t1={19.05} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 19.0, 30.2, .3, .3);
  const med = eout(P(t, T.y2024 - .3, T.y2024 + .3));
  const n80 = eout(P(t, T.m80 - .2, T.m80 + .2));
  const ch = eback(P(t, T.shok - .3, T.shok + .3));
  const tilt = eout(P(t, T.pulni - .2, T.pulni + .3));
  return <Layer a={a} z={logZ(P(t, 19.0, 30.2), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col={ch > .5 ? '61,220,132' : '236,58,44'} />
    {/* media card */}
    <Card x={SL + 10} y={740 + tilt * 0} w={400} a={med} style={{ padding: 22, opacity: med * lerp(1, .55, tilt) }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: Y }}>2024-yil · media biznes</div>
      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, color: GR, marginTop: 4 }}>YouTube + shou</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 70, color: RED, marginTop: 10, opacity: n80 }}>−$80 mln</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: RED, opacity: eout(P(t, T.zarar - .2, T.zarar + .2)) }}>zarar</div>
    </Card>
    {/* chocolate card */}
    <Card x={SR - 410} y={740} w={400} a={clamp(ch)} style={{ padding: 22, border: `2px solid ${GRN}` }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: GR }}>shokolad biznesi</div>
      <div style={{ margin: '10px 0' }}><Choco w={250} id="c4" /></div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: WH, opacity: eout(P(t, T.m250 - .2, T.m250 + .2)) }}>$250 mln <span style={{ fontSize: 26, fontFamily: SANS, color: GR }}>sotuv</span></div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: GRN, opacity: eout(P(t, T.m20 - .2, T.m20 + .2)) }}>+$20 mln <span style={{ fontSize: 26, fontFamily: SANS, color: GRN }}>foyda</span></div>
    </Card>
    <Src s="Bloomberg/Fortune: investorlar hujjatlari, 2024 (IV chorak — prognoz)" y={1300} a={eout(P(t, T.m80, T.m80 + .4))} />
    <Head t={t} t0={19.0} t1={T.pulni - .05} y={490} lines={[['video —'], ['zarar', 'r']]} size={96} />
    <Head t={t} t0={T.pulni - .05} t1={30.2} y={490} lines={[['pulni'], ['shokolad topadi', 'g']]} size={92} from="slam" />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 30.15, 34.35, .3, .3);
  const o = eback(P(t, T.osh - .4, T.osh + .2));
  return <Layer a={a} z={logZ(P(t, 30.15, 34.35), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <div style={{ ...abs(CX - 230, 760), scale: String(clamp(o, 0, 1.2)), opacity: clamp(o) }}><Osh w={460} t={t} /></div>
    <Pill s="pul keltirmaydi ✗" x={CX} y={1100} a={eout(P(t, T.keltirm - .1, T.keltirm + .3))} size={30} col={RED} dark />
    <Pill s="hamma eslab qoladi ✓" x={CX} y={1190} a={eout(P(t, T.eslab - .1, T.eslab + .3))} size={30} col={GRN} />
    <Head t={t} t0={30.15} t1={34.35} y={490} lines={[['xuddi to‘ydagi'], ['osh', 'y']]} size={92} />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 34.3, END + 1, .3, .1);
  const aA = env(t, 34.3, T.buni - .05, .3, .3);
  const s1 = eout(P(t, T.kichik - .2, T.kichik + .3)), s2 = eout(P(t, T.mahs - .2, T.mahs + .3)), ar = eout(P(t, T.taklif - .3, T.taklif + .2));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={520} a={.8} col="61,220,132" />
      <Card x={SL + 20} y={760} w={330} a={s1} style={{ padding: 22, textAlign: 'center' }}>
        <div style={{ fontSize: 70 }}>👀</div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH }}>tomoshabin</div>
      </Card>
      <div style={{ ...abs(CX - 60, 820), opacity: ar, fontFamily: HEAD, fontWeight: 700, fontSize: 80, color: Y }}>→</div>
      <Card x={SR - 350} y={760} w={330} a={s2} style={{ padding: 22, textAlign: 'center', border: `2px solid ${GRN}` }}>
        <div style={{ fontSize: 70 }}>📦</div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: GRN }}>o‘z mahsulotingiz</div>
      </Card>
      <Stamp s="DAROMAD KAFOLAT EMAS" x={CX} y={1130} t={t} t0={T.kafolat} t1={T.buni} col={RED} size={50} rot={-4} />
      <Src s="bu umumiy saboq, natija har kimda turlicha" y={1230} a={eout(P(t, T.kafolat, T.kafolat + .4))} />
      <Head t={t} t0={34.3} t1={T.buni} y={490} lines={[['kichik kanal'], ['uchun saboq', 'y']]} size={92} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['youtube boshlovchi'], ['do‘stga yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.m34, 10, 6], [T.m3, 10, 6], [T.k167, 8, 7], [T.f6, 8, 7], [T.endi, 20, 5], [T.m80, 12, 6], [T.shok, 10, 6], [T.m20, 8, 7], [T.osh, 8, 7], [T.kafolat, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1060} r={600} a={1} col="61,220,132" />
    <div style={{ ...abs(CX + 40 - 250, 760) }}><TrainPit w={500} p={.85} t={1} /></div>
    <div style={{ ...abs(CX + 40 - 150, 1080), rotate: '-8deg' }}><Choco w={300} id="cc" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>internetda pul · youtube</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>$3 MLN VIDEO<br />QANCHA TOPADI?</div>
    <div style={{ ...abs(SL, 1330, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: RED }}>REKLAMADAN — $167 000<br /><span style={{ color: GRN }}>PUL SHOKOLADDAN</span></div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>MrBeast · Bloomberg, 2023–2024</div>
  </AbsoluteFill>;
};
