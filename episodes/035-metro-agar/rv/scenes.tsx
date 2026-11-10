import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, rnd } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art (generic metro car, no operator branding) ---------- */
const Wagon: React.FC<{ w: number; id: string; full?: number }> = ({ w, id, full = 0 }) => (
  <svg width={w} height={w * .34} viewBox="0 0 500 170" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`wg${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5B8CFF" /><stop offset="1" stopColor="#2c4a9a" /></linearGradient></defs>
    <rect x="10" y="10" width="480" height="130" rx="22" fill={`url(#wg${id})`} />
    <rect x="10" y="96" width="480" height="10" fill="#e8ecf4" opacity=".85" />
    {[0, 1, 2, 3].map(i => <g key={i}>
      <rect x={34 + i * 118} y="30" width="88" height="54" rx="8" fill="#0f1420" />
      {Array.from({ length: Math.round(full * 5) }).map((_, j) => <circle key={j} cx={46 + i * 118 + j * 16} cy="60" r="7" fill="#FFCF3A" opacity=".9" />)}
    </g>)}
    {[90, 410].map(c => <circle key={c} cx={c} cy="150" r="14" fill="#1a1e27" stroke="#9aa3b2" strokeWidth="4" />)}
  </svg>
);
const Person: React.FC<{ s: number; col?: string }> = ({ s, col = '#F3F5F8' }) => (
  <svg width={s} height={s * 1.6} viewBox="0 0 20 32" style={{ display: 'block' }}>
    <circle cx="10" cy="6" r="5" fill={col} /><path d="M3 30 L3 18 Q3 12 10 12 Q17 12 17 18 L17 30 Z" fill={col} />
  </svg>
);
const Crowd: React.FC<{ n: number; cols: number; s: number; shown: number; col?: string; gap?: number }> = ({ n, cols, s, shown, col, gap = 6 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${s}px)`, gap }}>
    {Array.from({ length: n }).map((_, i) => <div key={i} style={{ opacity: i < shown * n ? 1 : .08 }}><Person s={s} col={col} /></div>)}
  </div>
);
const Bar: React.FC<{ y: number; w: number; a: number; col: string; label: string; val: string }> = ({ y, w, a, col, label, val }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: SL + 10, top: y, opacity: clamp(a * 3) }}>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH, marginBottom: 8 }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: Math.max(8, w * a), height: 56, borderRadius: 12, background: col, boxShadow: `0 0 30px ${col}55` }} />
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: col, whiteSpace: 'nowrap' }}>{val}</div>
    </div>
  </div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.95, .2, .3);
  const x = lerp(-560, CX - 270, eout(P(t, -1, 1.4)));
  return <Layer a={a} z={logZ(P(t, -1, 3.95), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.9} col="91,140,255" />
    <div style={{ ...abs(SL - 40, 1110, SR - SL + 80), height: 8, background: '#9aa3b2', opacity: .5 }} />
    <div style={{ ...abs(x, 930) }}><Wagon w={540} id="a" full={eout(P(t, T.metroga, T.boladi))} /></div>
    <Pill s="1 kun · 1 shahar · 1 metro" x={CX} y={1250} a={eout(P(t, T.metroga - .2, T.metroga + .2))} size={30} col={Y} />
    <Head t={t} t0={-1} t1={3.95} y={490} lines={[['agar butun toshkent'], ['metroga tushsa?', 'y']]} size={80} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 3.9, 12.65, .3, .3);
  const cnt = eio(P(t, T.aholi - .1, T.aholi + 1.4));
  const rec = eout(P(t, T.may - .3, T.may + .2));
  return <Layer a={a} z={logZ(P(t, 3.9, 12.65), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.8} />
    <div style={{ ...abs(CX - 250, 730), scale: String(lerp(1, .7, rec)), transformOrigin: '50% 0' }}><Crowd n={40} cols={10} s={40} shown={cnt} gap={10} /></div>
    <Num v={fmt(3178000 * cnt)} y={rec > 0 ? lerp(1030, 960, rec) : 1030} a={eout(P(t, T.aholi - .2, T.aholi))} size={rec > 0 ? lerp(120, 70, rec) : 120} />
    <Src s="Toshkent shahri doimiy aholisi · 1.01.2026 · Statistika agentligi" y={rec > 0 ? 1050 : 1170} a={eout(P(t, T.aholi, T.aholi + .4))} />
    <Card x={SL + 70} y={1110} w={SR - SL - 140} a={rec} style={{ padding: 22, textAlign: 'center', border: `2px solid ${BLUE}` }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: GR }}>metro rekordi · 8-may, 2026</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 86, color: ICE, opacity: eout(P(t, T.rek - .2, T.rek + .2)) }}>{fmt(1117061 * eio(P(t, T.rek - .3, T.rek + 1.2)))}</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: WH }}>yo‘lovchi bir kunda</div>
    </Card>
    <Src s="anhor.uz, 2026" y={1370} a={eout(P(t, T.rek, T.rek + .4))} />
    <Head t={t} t0={3.9} t1={12.65} y={490} lines={[['poytaxt'], ['va metro', 'y']]} size={96} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 12.6, 18.6, .3, .3);
  const n = eio(P(t, T.m63 - .4, T.m63 + .6));
  const days = eio(P(t, T.qariyb - .2, T.kun6 + .5));
  return <Layer a={a} z={logZ(P(t, 12.6, 18.6), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="236,58,44" />
    <div style={{ ...abs(SL + 40, 720, SR - SL - 80), display: 'flex', justifyContent: 'center', gap: 30, alignItems: 'center', opacity: eout(P(t, T.har - .2, T.borib)) }}>
      <Person s={60} col={Y} /><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 60, color: WH }}>→ 🚇 →</div><Person s={60} col={Y} />
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 60, color: Y }}>× 2</div>
    </div>
    <Num v={(n > .99 ? '≈ ' : '') + fmt(6300000 * n)} y={880} a={eout(P(t, T.m63 - .4, T.m63))} size={120} col={RED} />
    <div style={{ ...abs(CX - 30, 1010), fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH, opacity: eout(P(t, T.safar - .2, T.safar + .2)) }}>safar</div>
    <div style={{ ...abs(SL + 20, 1080, SR - SL - 40), display: 'flex', gap: 10 }}>
      {Array.from({ length: 6 }).map((_, i) => { const f = clamp(days * 5.69 - i); return <div key={i} style={{ flex: 1, height: 150, borderRadius: 14, border: `2px solid ${ICE}55`, background: 'rgba(14,16,22,.8)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: `${f * 100}%`, background: ICE, opacity: .85 }} />
        <div style={{ position: 'absolute', width: '100%', top: 54, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 36, color: f > .5 ? '#06121a' : GR }}>{i + 1}-kun</div>
      </div>; })}
    </div>
    <Pill s="≈ 5,7 kunlik rekord" x={CX} y={1300} a={eout(P(t, T.kun6 - .2, T.kun6 + .2))} size={34} col={Y} />
    <Src s="hisob: 3 178 100 × 2 = 6 356 200 · ÷ 1 117 061 ≈ 5,7" y={1360} a={eout(P(t, T.kun6, T.kun6 + .4))} />
    <Head t={t} t0={12.6} t1={18.6} y={490} lines={[['borib-qaytadi —'], ['ikki safar', 'y']]} size={88} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 18.55, 20.2, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={18.55} t1={20.2} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 20.15, 28.35, .3, .3);
  const st = eout(P(t, T.b50 - .3, T.b50 + .8));
  const cmp = eout(P(t, T.chinor - .3, T.chinor + .2));
  return <Layer a={a} z={logZ(P(t, 20.15, 28.35), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col={cmp > .5 ? '236,58,44' : '91,140,255'} />
    <div style={{ ...abs(CX - 300, 720), display: 'grid', gridTemplateColumns: 'repeat(10, 48px)', gap: 12, opacity: 1 - cmp * .75, scale: String(lerp(1, .8, cmp)), transformOrigin: '50% 0' }}>
      {Array.from({ length: 50 }).map((_, i) => <div key={i} style={{ width: 48, height: 48, borderRadius: 24, border: `4px solid ${BLUE}`, background: i < st * 50 ? 'rgba(91,140,255,.35)' : 'transparent', display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 22, color: WH }}>M</div>)}
    </div>
    <Pill s="50 ta bekat" x={CX} y={1060} a={eout(P(t, T.b50 - .2, T.b50 + .2)) * (1 - cmp)} size={34} col={Y} />
    <Bar y={1000} w={600} a={eio(P(t, T.k64 - .4, T.k64 + .4))} col={RED} label="har bekatga · taxminan" val="64 000" />
    <Bar y={1140} w={600 * 40 / 64} a={eio(P(t, T.k40 - .4, T.k40 + .4))} col={GRN} label="gavjum Chinor bekati · kuniga" val="35–40 ming" />
    <Src s="50 bekat, Chinor 35–40 ming/kun — uza.uz · hisob: 3 178 100 ÷ 50 ≈ 63 600" y={1300} a={eout(P(t, T.k64, T.k64 + .4))} />
    <Head t={t} t0={20.15} t1={28.35} y={490} lines={[['har bekatga —'], ['64 ming kishi', 'r']]} size={88} />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 28.3, 32.7, .3, .3);
  const q = eio(P(t, T.qayn - .2, T.kocha + .5));
  const R = rnd(9);
  const cols = ['#F3F5F8', '#FFCF3A', '#9BE3FF', '#ffb3c1', '#8be0b4'];
  return <Layer a={a} z={logZ(P(t, 28.3, 32.7), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    {/* station entrance */}
    <div style={{ ...abs(SR - 230, 760), width: 200, height: 260, borderRadius: '20px 20px 0 0', background: '#1d2230', border: `3px solid ${BLUE}`, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: BLUE }}>M</div>
    <div style={{ ...abs(SL, 1020, SR - SL), height: 6, background: '#9aa3b2', opacity: .4 }} />
    {Array.from({ length: 16 }).map((_, i) => { const x = SR - 280 - i * 42 + Math.sin(t * 6 + i) * 2; const show = clamp(q * 16 - i);
      return <div key={i} style={{ ...abs(x, 925 + R() * 8), opacity: show, scale: String(lerp(.6, 1, show)) }}><Person s={40} col={cols[i % 5]} /></div>; })}
    <Pill s="🛍 qaynona sumkalar bilan" x={CX - 140} y={1110} a={eout(P(t, T.qayn - .2, T.qayn + .2))} size={28} col={Y} dark />
    <Pill s="🤵 kuyov to‘yga shoshib" x={CX + 140} y={1200} a={eout(P(t, T.kuyov - .2, T.kuyov + .2))} size={28} col={ICE} dark />
    <Stamp s="NAVBAT KO‘CHAGACHA" x={CX} y={1320} t={t} t0={T.navbat} t1={32.7} col={RED} size={50} rot={-4} />
    <Head t={t} t0={28.3} t1={32.7} y={490} lines={[['eskalatorga'], ['navbat', 'y']]} size={96} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 32.65, 37.75, .3, .3);
  return <Layer a={a} z={logZ(P(t, 32.65, 37.75), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="236,58,44" />
    <Bar y={760} w={600 * 1.117 / 6.356} a={eio(P(t, 32.65, 33.4))} col={ICE} label="rekord · 2026" val="1,1 mln" />
    <Bar y={900} w={600 * 1.8 / 6.356} a={eio(P(t, T.m18 - .4, T.m18 + .4))} col={Y} label="reja · 2030-yil · kuniga" val="1,8 mln" />
    <Bar y={1040} w={600} a={eio(P(t, T.hali - .4, T.hali + .4))} col={RED} label="butun Toshkent · 1 kunda" val="6,3 mln" />
    <Stamp s="HALI HAM YETMAYDI" x={CX} y={1270} t={t} t0={T.yetm} t1={37.75} col={RED} size={52} rot={-4} />
    <Src s="2030 maqsadi 1,8 mln/kun — uza.uz" y={1360} a={eout(P(t, T.m18, T.m18 + .4))} />
    <Head t={t} t0={32.65} t1={37.75} y={490} lines={[['2030-yilgi'], ['reja', 'y']]} size={96} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['metroda yuradigan'], ['do‘stga yuboring', 'y']]} />;

const HITS: [number, number, number][] = [[T.aholi, 8, 7], [T.rek, 10, 6], [T.m63, 12, 6], [T.kun6, 8, 7], [T.endi, 20, 5], [T.k64, 10, 6], [T.navbat, 10, 6], [T.yetm, 12, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1050} r={600} a={1} col="91,140,255" />
    <div style={{ ...abs(CX + 40 - 300, 840) }}><Wagon w={600} id="cv" full={1} /></div>
    <div style={{ ...abs(CX + 40 - 330, 1090) }}><Crowd n={22} cols={11} s={44} shown={1} col={Y} gap={16} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>agar… · toshkent metrosi</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 106, lineHeight: 1.02, ...yel }}>BUTUN TOSHKENT<br />METROGA TUSHSA?</div>
    <div style={{ ...abs(SL, 1380, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: RED }}>≈ 6 KUNLIK REKORD<br /><span style={{ color: WH }}>BIR KUNDA</span></div>
    <div style={{ ...abs(SL, 1540, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>Statistika agentligi · anhor.uz · uza.uz · 2026</div>
  </AbsoluteFill>;
};
