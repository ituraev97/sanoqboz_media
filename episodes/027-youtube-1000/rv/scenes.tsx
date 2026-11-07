import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, flight, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* generic video player (no platform branding) */
const Player: React.FC<{ w: number; views: number; t: number; id: string }> = ({ w, views, t, id }) => (
  <div style={{ position: 'relative', width: w, height: w * .78 }}>
    <svg width={w} height={w * .78} viewBox="0 0 400 312" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <defs>
        <linearGradient id={`plS${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a3550" /><stop offset="1" stopColor="#121826" /></linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="230" rx="22" fill={`url(#plS${id})`} stroke="#4a5266" strokeWidth="3" />
      <circle cx="200" cy="112" r="46" fill="rgba(255,255,255,.12)" stroke="#F3F5F8" strokeWidth="4" />
      <path d="M186 90 L 222 112 L 186 134 Z" fill="#F3F5F8" />
      <rect x="20" y="206" width="360" height="6" rx="3" fill="#3a4152" />
      <rect x="20" y="206" width={360 * ((t * .08) % 1)} height="6" rx="3" fill="#F3F5F8" />
      <rect x="0" y="246" width="300" height="20" rx="8" fill="#2a3040" />
      <rect x="0" y="278" width="200" height="16" rx="7" fill="#1f2430" />
    </svg>
    <div style={{ position: 'absolute', right: 0, top: w * .6, fontFamily: HEAD, fontWeight: 700, fontSize: w * .085, color: WH, whiteSpace: 'nowrap' }}>{fmt(views)} ko‘rish</div>
  </div>
);

const Coin: React.FC<{ s: number; label?: string }> = ({ s, label = '$' }) => (
  <div style={{ width: s, height: s, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #fff2b0, #FFCF3A 45%, #c8901a)', border: `${s * .06}px solid #a87412`, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: s * .5, color: '#6a4a08' }}>{label}</div>
);

/* split donut 55 / 45 */
const Split: React.FC<{ w: number; p: number }> = ({ w, p }) => {
  const r = 120, c = 2 * Math.PI * r;
  return <svg width={w} height={w} viewBox="0 0 300 300" style={{ display: 'block' }}>
    <circle cx="150" cy="150" r={r} fill="none" stroke="#1d2230" strokeWidth="40" />
    <circle cx="150" cy="150" r={r} fill="none" stroke={GR} strokeWidth="40" strokeDasharray={`${c * .45 * p} ${c}`} transform="rotate(108 150 150)" />
    <circle cx="150" cy="150" r={r} fill="none" stroke={GRN} strokeWidth="40" strokeDasharray={`${c * .55 * p} ${c}`} transform="rotate(-90 150 150)" />
  </svg>;
};

const HBar: React.FC<{ y: number; label: string; val: string; frac: number; col: string; a: number; tr?: number }> = ({ y, label, val, frac, col, a, tr = 0 }) => Math.max(a, tr) <= 0 ? null :
  <div style={{ position: 'absolute', left: SL + 20, top: y, width: SR - SL - 40, opacity: clamp(Math.max(a * 2, tr)) }}>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, marginBottom: 10 }}>{label}</div>
    <div style={{ position: 'relative', height: 92, borderRadius: 18, background: '#1d2230' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${(a > 0 ? Math.max(.03, frac * clamp(a)) : 0) * 100}%`, borderRadius: 18, background: `linear-gradient(90deg, ${col}aa, ${col})` }} />
      <div style={{ position: 'absolute', right: 20, top: 8, fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: col, lineHeight: 1.1, opacity: clamp(a * 3) }}>{val}</div>
    </div>
  </div>;

/* laptop with a faceless channel on screen */
const Laptop: React.FC<{ w: number; face: number }> = ({ w, face }) => (
  <svg width={w} height={w * .7} viewBox="0 0 400 280" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="lpS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a3550" /><stop offset="1" stopColor="#121826" /></linearGradient></defs>
    <rect x="40" y="10" width="320" height="210" rx="14" fill="#3a4152" />
    <rect x="52" y="22" width="296" height="186" rx="8" fill="url(#lpS)" />
    <rect x="80" y="44" width="240" height="120" rx="10" fill="#1a2234" stroke="#5a6274" strokeWidth="2" />
    <text x="200" y="118" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="44" fill="#FFCF3A">EN</text>
    <circle cx="96" cy="186" r="12" fill="#5a6274" />
    <path d="M96 176 a7 7 0 1 0 0.1 0" fill="#7F8792" opacity={1 - face} />
    <text x="96" y="192" textAnchor="middle" fontFamily="JBM, monospace" fontSize="16" fontWeight="700" fill="#F3F5F8" opacity={face}>?</text>
    <rect x="120" y="180" width="140" height="12" rx="6" fill="#3a4152" />
    <path d="M0 230 L 400 230 L 380 262 L 20 262 Z" fill="#5a6274" />
    <rect x="160" y="232" width="80" height="8" rx="4" fill="#3a4152" />
  </svg>
);

const Chip: React.FC<{ s: string; y: number; a: number; x?: number }> = ({ s, y, a, x = CX }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% 0', opacity: a, padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 23, color: WH, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.55, .2, .3);
  const v = 1000 * eio(P(t, -.5, T.tolay));
  const q = eout(P(t, T.tolay - .2, T.tolay + .3));
  return <Layer a={a} z={logZ(P(t, -1, 5.5), 1, 1.06)}>
    <Glow x={CX} y={960} r={520} a={.9} />
    <div style={{ ...abs(CX - 260, 690) }}><Player w={520} views={v} t={t} id="p1" /></div>
    {q > 0 && <div style={{ ...abs(CX - 70, 1120), scale: String(lerp(.5, 1, eback(q))), opacity: q }}><Coin s={140} label="?" /></div>}
    <Pill s="tomoshabin qayerda?" x={CX} y={1330} a={eout(P(t, T.tomosh - .1, T.tomosh + .2))} size={30} col={ICE} dark />
    <Head t={t} t0={-1} t1={5.55} y={490} lines={[['1 000 ko‘rish'], ['= necha pul?', 'y']]} size={80} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.5, 11.45, .3, .3);
  const p = eio(P(t, T.muall - .2, T.p55 + .3));
  return <Layer a={a} z={logZ(P(t, 5.5, 11.45), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} col="61,220,132" />
    <Pill s="reklama beruvchi" x={CX} y={735} a={eout(P(t, T.rekl - .2, T.rekl + .2))} size={30} col={Y} />
    {[0, 1, 2, 3, 4].map((i) => { const pp = P(t, T.rekl + .2 + i * .18, T.rekl + 1.1 + i * .18); if (pp <= 0 || pp >= 1) return null; const [x, y] = flight(pp, [CX, 770], [CX, 1000], 60); return <div key={i} style={{ ...abs(x - 30, y - 30) }}><Coin s={60} /></div>; })}
    <div style={{ ...abs(CX - 190, 790), opacity: eout(P(t, 5.7, 6.2)) }}>
      <div style={{ position: 'relative', width: 380, height: 380 }}>
        <div style={{ position: 'absolute', inset: 0 }}><Split w={380} p={p} /></div>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
          <div><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: GRN, lineHeight: 1 }}>{Math.round(55 * p)}%</div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH }}>muallifga</div></div>
        </div>
      </div>
    </div>
    <Pill s="45% — platformaga" x={SR - 120} y={1220} a={eout(P(t, T.p55, T.p55 + .3))} size={24} col={GR} dark />
    <Src s="uzun video: muallif reklama pulining 55% ini oladi · CNBC, 2022" y={1290} a={eout(P(t, T.p55, T.p55 + .4))} />
    <Head t={t} t0={5.5} t1={11.45} y={490} lines={[['pulni'], ['reklama to‘laydi', 'y']]} size={78} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 11.4, 19.65, .3, .3);
  const aU = eout(P(t, T.us - .2, T.d340 + .4)), aZ = eout(P(t, T.uz - .2, T.d120 + .4));
  return <Layer a={a} z={logZ(P(t, 11.4, 19.65), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <Chip s="ta’lim videosi · 1 000 ko‘rish" y={700} a={eout(P(t, T.talim - .2, T.talim + .2))} />
    <HBar y={800} label="Amerikadagi tomoshabin" val="$3,40" frac={1} col={GRN} a={aU} tr={eout(P(t, 11.6, 12.1))} />
    <HBar y={1000} label="O‘zbekistondagi tomoshabin" val="$1,20" frac={1.2 / 3.4} col={Y} a={aZ} tr={eout(P(t, 11.8, 12.3))} />
    <Src s="vidIQ hisoblagichi taxmini (o‘rtacha), 7.11.2026 · kafolat emas" y={1220} a={eout(P(t, T.vidiq, T.vidiq + .4))} />
    <Head t={t} t0={11.4} t1={19.65} y={490} lines={[['uzun video'], ['1 000 ko‘rish', 'y']]} size={78} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 19.6, 24.45, .3, .3);
  const aU = eout(P(t, T.us2 - .2, T.c12 + .4)), aZ = eout(P(t, T.uz2 - .2, T.c4 + .4));
  return <Layer a={a} z={logZ(P(t, 19.6, 24.45), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.8} col="236,58,44" />
    <HBar y={760} label="Shorts · Amerika" val="12 sent" frac={.12 / 3.4} col={GRN} a={aU} tr={eout(P(t, 19.8, 20.3))} />
    <HBar y={960} label="Shorts · O‘zbekiston" val="4 sent" frac={.04 / 3.4} col={Y} a={aZ} tr={eout(P(t, 20.0, 20.5))} />
    <Chip s="taqqoslang: uzun video — $3,40" y={1170} a={eout(P(t, T.kam - .2, T.kam + .2))} />
    <Src s="vidIQ taxmini · 1 000 ko‘rish, ta’lim · Shorts: mualliflarga 45%" y={1250} a={eout(P(t, T.c12, T.c12 + .4))} />
    <Head t={t} t0={19.6} t1={24.45} y={490} lines={[['shorts —'], ['ancha kam', 'r']]} size={84} from="slam" />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 24.4, 26.05, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={24.4} t1={26.05} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.0, 36.75, .3, .3);
  const face = eout(P(t, T.yuz - .2, T.yuz + .4));
  const arc = eio(P(t, T.amer - .4, T.tolov));
  const pts = Array.from({ length: 24 }, (_, i) => flight(i / 23 * arc, [SL + 160, 1070], [SR - 120, 1070], 230));
  const coin = P(t, T.tolov - .1, T.olasiz + .6);
  const [cx, cy] = flight(1 - coin, [SL + 160, 1070], [SR - 120, 1070], 230);
  return <Layer a={a} z={logZ(P(t, 26, 36.75), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="91,140,255" />
    <div style={{ ...abs(SL, 940), opacity: eout(P(t, T.kanal - .3, T.kanal + .2)) }}><Laptop w={320} face={face} /></div>
    <Pill s="kanal" x={SL + 160} y={1200} a={eout(P(t, T.kanal - .2, T.kanal + .2)) * (1 - eout(P(t, T.tosh - .2, T.tosh)))} size={28} col={WH} dark />
    <Pill s="Toshkent" x={SL + 160} y={1200} a={eout(P(t, T.tosh - .2, T.tosh + .2))} size={28} col={WH} dark />
    <svg width={1000} height={1500} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      {arc > 0 && <polyline points={pts.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke={ICE} strokeWidth="6" strokeDasharray="14 12" />}
    </svg>
    <div style={{ ...abs(SR - 200, 960), opacity: eout(P(t, T.tomosh2 - .3, T.tomosh2 + .2)) }}>
      <div style={{ width: 160, height: 160, borderRadius: '50%', background: '#1d2a44', border: `4px solid ${ICE}`, display: 'grid', placeItems: 'center' }}><svg width={90} height={90} viewBox="0 0 90 90"><circle cx="45" cy="30" r="20" fill="#9BE3FF" /><path d="M8 88 C 10 58 80 58 82 88 Z" fill="#9BE3FF" /></svg></div>
    </div>
    <Pill s="tomoshabin" x={SR - 120} y={1200} a={eout(P(t, T.tomosh2 - .2, T.tomosh2 + .2)) * (1 - eout(P(t, T.amer - .2, T.amer)))} size={26} col={ICE} dark />
    <Pill s="AQSh tomoshabini" x={SR - 120} y={1200} a={eout(P(t, T.amer - .2, T.amer + .2))} size={26} col={ICE} dark />
    {coin > 0 && coin < 1 && <div style={{ ...abs(cx - 40, cy - 40) }}><Coin s={80} /></div>}
    <Chip s="to‘lov = tomoshabin mamlakati bo‘yicha" y={760} a={eout(P(t, T.tomosh2 - .2, T.tomosh2 + .2)) * (1 - eout(P(t, T.tosh - .3, T.tosh)))} />
    <Pill s="yuzsiz kanal ham bo‘ladi" x={CX} y={1310} a={eout(P(t, T.kopincha - .1, T.kopincha + .3))} size={30} col={GRN} />
    <Head t={t} t0={26.0} t1={T.tosh - .1} y={490} lines={[['pul —'], ['tomoshabinga qarab', 'y']]} size={74} />
    <Head t={t} t0={T.tosh - .1} t1={36.75} y={490} lines={[['toshkentdan'], ['ingliz tilida', 'y']]} size={78} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 36.7, END + 1, .3, .1);
  const aA = env(t, 36.7, T.buni - .05, .3, .3);
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={520} a={.8} col="236,58,44" />
      <Card x={SL + 40} y={800} w={SR - SL - 80} a={eout(P(t, 36.9, 37.4))}>
        <div style={{ padding: '30px 20px', textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: WH, lineHeight: 1.2 }}>
          daromad =<br /><span style={{ color: Y }}>ko‘rishlar</span> × <span style={{ color: GRN }}>1 000 ko‘rish narxi</span>
        </div>
      </Card>
      <Stamp s="KAFOLAT YO‘Q" x={CX} y={1170} t={t} t0={T.kafolat} t1={T.buni} col={RED} size={60} rot={-5} />
      <Src s="raqamlar — taxmin; daromad kafolatlanmaydi" y={1290} a={eout(P(t, T.korish, T.korish + .4))} />
      <Head t={t} t0={36.7} t1={T.buni} y={490} lines={[['lekin'], ['kafolat emas', 'r']]} size={84} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['YouTube ochmoqchi'], ['do‘stga yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.tolay, 8, 7], [T.p55, 10, 6], [T.d340, 8, 7], [T.d120, 8, 7], [T.c4, 8, 7], [T.endi, 20, 5], [T.tolov, 10, 6], [T.kafolat, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1060} r={580} a={1} col="61,220,132" />
    <div style={{ ...abs(CX + 40 - 270, 780) }}><Player w={540} views={1000} t={3} id="pc" /></div>
    <div style={{ ...abs(CX + 40 + 150, 1080) }}><Coin s={150} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>youtube · 1 000 ko‘rish</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>NECHA PUL<br />TO‘LAYDI?</div>
    <div style={{ ...abs(SL, 1330, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: GRN }}>AQSh — $3,40<br /><span style={{ color: Y }}>O‘ZBEKISTON — $1,20</span></div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>vidIQ taxmini · ta’lim videosi</div>
  </AbsoluteFill>;
};
