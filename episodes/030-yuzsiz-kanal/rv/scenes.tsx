import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Logo } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* generic video player (no platform branding); kind: 'face' shows a hidden face avatar, 'tpl' a template thumbnail */
const Player: React.FC<{ w: number; t: number; id: string; kind?: 'faceless' | 'tpl'; hue?: number }> = ({ w, t, id, kind = 'faceless', hue = 0 }) => (
  <svg width={w} height={w * .62} viewBox="0 0 400 248" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`plS${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a3550" /><stop offset="1" stopColor="#121826" /></linearGradient>
    </defs>
    <rect x="0" y="0" width="400" height="230" rx="22" fill={`url(#plS${id})`} stroke="#4a5266" strokeWidth="3" />
    {kind === 'faceless' ? <g>
      {/* infographic content instead of a face */}
      <rect x="40" y="130" width="40" height="60" rx="6" fill="#5B8CFF" />
      <rect x="95" y="100" width="40" height="90" rx="6" fill="#FFCF3A" />
      <rect x="150" y="70" width="40" height="120" rx="6" fill="#3DDC84" />
      <circle cx="300" cy="105" r="62" fill="none" stroke="#1d2230" strokeWidth="22" />
      <circle cx="300" cy="105" r="62" fill="none" stroke="#EC3A2C" strokeWidth="22" strokeDasharray={`${250 * (0.4 + 0.3 * Math.sin(t * 1.5) ** 2)} 400`} transform="rotate(-90 300 105)" />
    </g> : <g>
      <rect x="20" y="20" width="360" height="190" rx="14" fill={`hsl(${210 + hue}, 30%, 26%)`} />
      <text x="200" y="110" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="46" fill="#F3F5F8">TOP 10 …</text>
      <text x="200" y="165" textAnchor="middle" fontFamily="JBM, monospace" fontSize="22" fill="#9aa3b2">#{1 + Math.round(hue)} qism</text>
    </g>}
    <rect x="20" y="214" width="360" height="6" rx="3" fill="#3a4152" />
    <rect x="20" y="214" width={360 * ((t * .08 + hue * .07) % 1)} height="6" rx="3" fill="#F3F5F8" />
  </svg>
);

/* faceless avatar: head silhouette with a question mark */
const NoFace: React.FC<{ s: number }> = ({ s }) => (
  <div style={{ width: s, height: s, borderRadius: '50%', background: '#1d2a44', border: `4px solid ${ICE}`, display: 'grid', placeItems: 'center', position: 'relative' }}>
    <svg width={s * .6} height={s * .6} viewBox="0 0 90 90"><circle cx="45" cy="30" r="20" fill="#3a4a6a" /><path d="M8 88 C 10 58 80 58 82 88 Z" fill="#3a4a6a" /></svg>
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: s * .45, color: Y }}>?</div>
  </div>
);

/* microphone */
const Mic: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s * 1.4} viewBox="0 0 100 140" style={{ display: 'block' }}>
    <rect x="30" y="5" width="40" height="70" rx="20" fill="#b7bfcc" stroke="#6c7586" strokeWidth="4" />
    <path d="M18 55 C 18 95 82 95 82 55" stroke="#9aa3b2" strokeWidth="7" fill="none" />
    <rect x="46" y="88" width="8" height="30" fill="#9aa3b2" /><rect x="28" y="116" width="44" height="10" rx="5" fill="#7d8697" />
  </svg>
);

/* neighbour window with curious eyes */
const Window: React.FC<{ w: number; t: number }> = ({ w, t }) => (
  <svg width={w} height={w} viewBox="0 0 200 200" style={{ display: 'block', overflow: 'visible' }}>
    <rect x="10" y="10" width="180" height="180" rx="10" fill="#2a2f3c" stroke="#c9b89c" strokeWidth="10" />
    <rect x="20" y="20" width="160" height="160" fill="#13203a" />
    <circle cx="100" cy="120" r="46" fill="#e8b98f" />
    <path d="M54 112 C 54 70 146 70 146 112 C 130 92 70 92 54 112 Z" fill="#3a2614" />
    <circle cx={84 + Math.sin(t * 2) * 5} cy="120" r="6" fill="#222" /><circle cx={116 + Math.sin(t * 2) * 5} cy="120" r="6" fill="#222" />
    <line x1="100" y1="20" x2="100" y2="180" stroke="#c9b89c" strokeWidth="6" />
    <line x1="20" y1="100" x2="180" y2="100" stroke="#c9b89c" strokeWidth="6" opacity=".6" />
  </svg>
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

const Chip: React.FC<{ s: string; y: number; a: number; x?: number; col?: string }> = ({ s, y, a, x = CX, col = WH }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% 0', opacity: a, scale: String(lerp(.8, 1, a)), padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 26, color: col, whiteSpace: 'nowrap' }}>{s}</div>;

/* requirement row */
const Req: React.FC<{ y: number; a: number; big: string; small: string; col: string }> = ({ y, a, big, small, col }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: SL + 30, top: y, width: SR - SL - 60, opacity: a, translate: `${(1 - a) * 60}px 0`, display: 'flex', alignItems: 'center', gap: 22, padding: '18px 26px', borderRadius: 20, background: 'rgba(20,24,34,.92)', border: `3px solid ${col}` }}>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 72, color: col, lineHeight: 1 }}>{big}</div>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH, lineHeight: 1.15, whiteSpace: 'pre-line' }}>{small}</div>
  </div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 6.85, .2, .3);
  const nf = eback(P(t, T.korin - .3, T.korin + .3));
  return <Layer a={a} z={logZ(P(t, -1, 6.8), 1, 1.05)}>
    <Glow x={CX} y={980} r={520} a={.9} col="91,140,255" />
    <div style={{ ...abs(CX - 280, 740) }}><Player w={560} t={t} id="p1" /></div>
    {nf > 0 && <div style={{ ...abs(SL + 10, 980), scale: String(nf) }}><NoFace s={150} /></div>}
    <Pill s="muallif kadrda yo‘q" x={SL + 240 + 60} y={1150} a={eout(P(t, T.korin, T.korin + .3))} size={26} col={ICE} dark />
    <div style={{ ...abs(SR - 150, 960), opacity: eout(P(t, T.ovoz - .2, T.ovoz + .2)) }}><Mic s={110} /></div>
    <Chip s="ovoz" x={CX - 250} y={1230} a={eout(P(t, T.ovoz - .1, T.ovoz + .25))} col={Y} />
    <Chip s="animatsiya" x={CX - 10} y={1230} a={eout(P(t, T.anim - .1, T.anim + .25))} col={GRN} />
    <Chip s="infografika" x={CX + 255} y={1230} a={eout(P(t, T.info - .1, T.info + .25))} col={BLUE} />
    <Head t={t} t0={-1} t1={6.85} y={490} lines={[['«yuzsiz»'], ['kanal nima?', 'y']]} size={92} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 6.8, 10.75, .3, .3);
  const lg = eback(P(t, T.xuddi - .1, T.video + .2));
  const win = eout(P(t, T.qosh - .2, T.qosh + .3));
  return <Layer a={a} z={logZ(P(t, 6.8, 10.75), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <div style={{ ...abs(CX - 110, 720), scale: String(lg), opacity: clamp(lg) * (1 - .6 * win) }}><Logo size={220} /></div>
    <Pill s="xuddi shu video kabi" x={CX} y={980} a={eout(P(t, T.video - .2, T.video + .2)) * (1 - win)} size={30} col={Y} />
    {win > 0 && <div style={{ ...abs(CX - 160, 960), opacity: win, translate: `0 ${(1 - win) * 60}px` }}><Window w={320} t={t} /></div>}
    <Pill s="qo‘shnilar bilmaydi" x={CX} y={1320} a={eout(P(t, T.bilm - .1, T.bilm + .3))} size={30} col={WH} dark />
    <Head t={t} t0={6.8} t1={10.75} y={490} lines={[['kanal'], ['sizniki?', 'y']]} size={92} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 10.7, 19.05, .3, .3);
  return <Layer a={a} z={logZ(P(t, 10.7, 19.05), 1, 1.03)}>
    <Glow x={CX} y={980} r={520} a={.85} col="61,220,132" />
    <Req y={700} a={eout(P(t, T.shart - .2, T.shart + .3))} big="1 000" small="obunachi" col={Y} />
    <Pill s="+" x={CX} y={862} a={eout(P(t, T.soat - .3, T.soat))} size={34} col={WH} dark />
    <Req y={900} a={eout(P(t, T.soat - .3, T.soat + .2))} big="4 000" small={'soat tomosha\n12 oyda'} col={Y} />
    <Pill s="YOKI" x={CX} y={1062} a={eout(P(t, T.yoki - .2, T.yoki + .2))} size={34} col={RED} />
    <Req y={1110} a={eout(P(t, T.m10 - .4, T.m10 + .2))} big="10 mln" small={'Shorts ko‘rish\n90 kunda'} col={GRN} />
    <Src s="YouTube hamkorlik dasturi shartlari · support.google.com" y={1300} a={eout(P(t, T.obun, T.obun + .4))} />
    <Head t={t} t0={10.7} t1={19.05} y={490} lines={[['pul topish'], ['shartlari', 'y']]} size={88} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 19.0, 22.55, .3, .3);
  const p = eio(P(t, T.rekl - .2, T.p55 + .3));
  return <Layer a={a} z={logZ(P(t, 19.0, 22.55), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} col="61,220,132" />
    <div style={{ ...abs(CX - 190, 730) }}>
      <div style={{ position: 'relative', width: 380, height: 380 }}>
        <div style={{ position: 'absolute', inset: 0 }}><Split w={380} p={p} /></div>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
          <div><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: GRN, lineHeight: 1 }}>{Math.round(55 * p)}%</div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH }}>sizga</div></div>
        </div>
      </div>
    </div>
    <Pill s="uzun video · reklama puli" x={CX} y={1160} a={eout(P(t, T.uzun - .2, T.uzun + .2))} size={28} col={WH} dark />
    <Src s="uzun videoda muallif ulushi 55% · CNBC, 2022" y={1250} a={eout(P(t, T.p55, T.p55 + .4))} />
    <Head t={t} t0={19.0} t1={22.55} y={490} lines={[['keyin'], ['reklama pulidan', 'y']]} size={84} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 22.5, 24.2, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={22.5} t1={24.2} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 24.1, 34.65, .3, .3);
  const nf = eout(P(t, T.yuzni - .2, T.yuzni + .3)) * (1 - eout(P(t, T.muammo2 - .3, T.muammo2)));
  const copies = P(t, T.muammo2 - .1, T.ommaviy);
  const red = eout(P(t, T.soxta - .1, T.soxta + .3));
  return <Layer a={a} z={logZ(P(t, 24.1, 34.65), 1, 1.03)}>
    <Glow x={CX} y={1000} r={540} a={.85} col={red > .5 ? '236,58,44' : '91,140,255'} />
    {nf > 0 && <div style={{ ...abs(CX - 100, 800), opacity: nf }}><NoFace s={200} /></div>}
    <Pill s="yuzsiz — muammo emas ✓" x={CX} y={1060} a={nf} size={30} col={GRN} />
    {Array.from({ length: 6 }).map((_, i) => {
      const p = clamp(copies * 6 - i);
      if (p <= 0) return null;
      const c = i % 2, r = Math.floor(i / 2);
      return <div key={i} style={{ ...abs(SL + 20 + c * 440, 720 + r * 190), opacity: p * (1 - .45 * red), scale: String(lerp(.7, 1, eout(p))), filter: red > .5 ? 'grayscale(.8)' : 'none' }}><Player w={400} t={t} id={`c${i}`} kind="tpl" hue={0} /></div>;
    })}
    <Chip s="2025-yil 15-iyuldan" x={CX} y={1370} a={eout(P(t, T.y2025 - .1, T.y2025 + .3)) * (1 - red)} col={Y} />
    <Stamp s="REKLAMA YO‘Q" x={CX} y={980} t={t} t0={T.soxta} t1={34.65} col={RED} size={66} rot={-6} />
    <Src s="YouTube: «inauthentic content» siyosati · Search Engine Journal, TechCrunch" y={1370} a={eout(P(t, T.soxta, T.soxta + .4))} />
    <Head t={t} t0={24.1} t1={T.muammo2 - .1} y={490} lines={[['yuzni ko‘rsatmaslik'], ['muammo emas', 'g']]} size={78} />
    <Head t={t} t0={T.muammo2 - .1} t1={T.soxta - .05} y={490} lines={[['muammo —'], ['bir xillik', 'r']]} size={88} from="slam" />
    <Head t={t} t0={T.soxta - .05} t1={34.65} y={490} lines={[['«soxta'], ['kontent»', 'r']]} size={92} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 34.6, END + 1, .3, .1);
  const aA = env(t, 34.6, T.buni - .05, .3, .3);
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={520} a={.8} col="61,220,132" />
      <Req y={780} a={eout(P(t, T.suniy - .2, T.mumkin))} big="AI" small="sun’iy intellekt — mumkin ✓" col={GRN} />
      <Req y={970} a={eout(P(t, T.fikr - .3, T.fikr + .2))} big="FIKR" small="o‘zingizniki — shart" col={Y} />
      <Stamp s="DAROMAD KAFOLAT EMAS" x={CX} y={1190} t={t} t0={T.kafolat} t1={T.buni} col={RED} size={50} rot={-4} />
      <Src s="daromad ko‘rishlar soniga bog‘liq; hech narsa kafolatlanmaydi" y={1300} a={eout(P(t, T.kafolat, T.kafolat + .4))} />
      <Head t={t} t0={34.6} t1={T.buni} y={490} lines={[['ai — mumkin,'], ['fikr — shart', 'y']]} size={84} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['kanal ochmoqchi'], ['do‘stga yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.korin, 8, 7], [T.xuddi, 8, 7], [T.obun, 8, 7], [T.m10, 8, 7], [T.p55, 10, 6], [T.endi, 20, 5], [T.xill, 10, 6], [T.soxta, 14, 6], [T.kafolat, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1060} r={600} a={1} col="91,140,255" />
    <div style={{ ...abs(CX + 40 - 290, 800) }}><Player w={580} t={3} id="pc" /></div>
    <div style={{ ...abs(SL + 10, 1080) }}><NoFace s={170} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>internetda pul · youtube</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>YUZSIZ KANAL<br />PUL TOPADIMI?</div>
    <div style={{ ...abs(SL, 1330, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: GRN }}>YUZ — SHART EMAS<br /><span style={{ color: RED }}>BIR XILLIK — REKLAMASIZ</span></div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>YouTube qoidalari · 2025</div>
  </AbsoluteFill>;
};
