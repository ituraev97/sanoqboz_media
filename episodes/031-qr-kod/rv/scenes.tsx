import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, rnd } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* illustrative QR-like matrix (not a real code): 25x25 modules, 3 finder squares */
const N = 25;
const R0 = rnd(31);
const BITS: number[] = Array.from({ length: N * N }, () => (R0() > .52 ? 1 : 0));
const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8);
const finderCell = (x: number, y: number) => {
  const fx = x >= N - 8 ? x - (N - 7) : x, fy = y >= N - 8 ? y - (N - 7) : y;
  if (fx < 0 || fy < 0 || fx > 6 || fy > 6) return 0;
  const r = Math.max(Math.abs(fx - 3), Math.abs(fy - 3));
  return r === 3 || r <= 1 ? 1 : 0;
};
/* fill: 0..1 how many data modules are drawn; fin: finder highlight; torn: 0..1 damage on the lower-right; bin: show 1/0 labels in a zoom window */
const QR: React.FC<{ s: number; fill?: number; fin?: number; torn?: number; id: string; dim?: number }> = ({ s, fill = 1, fin = 0, torn = 0, id, dim = 0 }) => {
  const m = 10, V = N * m + 40;
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const f = inFinder(x, y);
    const v = f ? finderCell(x, y) : BITS[y * N + x];
    if (!v) continue;
    if (!f && (y * N + x) / (N * N) > fill) continue;
    const col = f && fin > 0 ? `rgba(${Math.round(lerp(17, 236, fin))},${Math.round(lerp(19, 58, fin))},${Math.round(lerp(26, 44, fin))},1)` : '#11131a';
    cells.push(<rect key={x + '_' + y} x={20 + x * m} y={20 + y * m} width={m + .3} height={m + .3} fill={col} opacity={f ? 1 : 1 - dim} />);
  }
  return <svg width={s} height={s} viewBox={`0 0 ${V} ${V}`} style={{ display: 'block', overflow: 'visible' }}>
    <defs><filter id={`qrB${id}`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" /></filter></defs>
    <rect x="0" y="0" width={V} height={V} rx="14" fill="#F3F5F8" />
    {cells}
    {torn > 0 && <g opacity={torn}>
      <path d={`M ${V} ${V * .52} L ${V * .82} ${V * .58} L ${V * .7} ${V * .66} L ${V * .62} ${V * .8} L ${V * .52} ${V} L ${V} ${V} Z`} fill="#0b0d12" />
      <path d={`M ${V} ${V * .52} L ${V * .82} ${V * .58} L ${V * .7} ${V * .66} L ${V * .62} ${V * .8} L ${V * .52} ${V}`} stroke="#c9b89c" strokeWidth="5" fill="none" />
      <ellipse cx={V * .34} cy={V * .56} rx={V * .1} ry={V * .07} fill="#7a5a32" opacity=".75" filter={`url(#qrB${id})`} />
      <ellipse cx={V * .62} cy={V * .3} rx={V * .07} ry={V * .05} fill="#7a5a32" opacity=".7" filter={`url(#qrB${id})`} />
    </g>}
  </svg>;
};

/* scan line + corner frame for the camera */
const ScanFrame: React.FC<{ s: number; t: number; a: number; col?: string }> = ({ s, t, a, col = Y }) => a <= 0 ? null : (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, opacity: a, overflow: 'visible' }}>
    {[[0, 0, 1, 1], [100, 0, -1, 1], [0, 100, 1, -1], [100, 100, -1, -1]].map(([x, y, dx, dy], i) =>
      <path key={i} d={`M ${x} ${y + dy * 16} L ${x} ${y} L ${x + dx * 16} ${y}`} stroke={col} strokeWidth="2.6" fill="none" strokeLinecap="round" />)}
    <rect x="4" y={8 + ((t * 70) % 84)} width="92" height="1.6" fill={col} opacity=".9" />
  </svg>
);

/* browser page that opens after the scan */
const Site: React.FC<{ a: number }> = ({ a }) => (
  <div style={{ position: 'absolute', inset: 0, background: '#0f131c', opacity: a, padding: 18, fontFamily: SANS }}>
    <div style={{ height: 36, borderRadius: 10, background: '#1d2230', color: GR, fontSize: 15, display: 'flex', alignItems: 'center', paddingLeft: 12 }}>menyu.choyxona.uz</div>
    <div style={{ marginTop: 18, fontWeight: 800, fontSize: 26, color: WH }}>Menyu</div>
    {['Osh', 'Somsa', 'Choy (choynak)', 'Lag‘mon'].map((s, i) =>
      <div key={i} style={{ marginTop: 12, height: 50, borderRadius: 12, background: '#1a1f2b', color: WH, fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', paddingLeft: 14 }}>{s}</div>)}
  </div>
);

/* cardboard box for car parts */
const Box: React.FC<{ w: number; id: string; children?: React.ReactNode }> = ({ w, id, children }) => (
  <div style={{ position: 'relative', width: w, height: w * .8 }}>
    <svg width={w} height={w * .8} viewBox="0 0 300 240" style={{ position: 'absolute', inset: 0 }}>
      <defs><linearGradient id={`bx${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c99a5b" /><stop offset="1" stopColor="#8a6233" /></linearGradient></defs>
      <path d="M20 60 L150 20 L280 60 L150 100 Z" fill="#dcb174" />
      <path d="M20 60 L150 100 L150 230 L20 190 Z" fill={`url(#bx${id})`} />
      <path d="M280 60 L150 100 L150 230 L280 190 Z" fill="#a87a43" />
      <path d="M85 40 L215 80" stroke="#b38a52" strokeWidth="10" />
    </svg>
    {children}
  </div>
);

/* simple gear (car part) */
const Gear: React.FC<{ s: number; rot: number }> = ({ s, rot }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block', rotate: `${rot}deg` }}>
    {Array.from({ length: 10 }, (_, i) => <rect key={i} x="45" y="2" width="10" height="18" rx="2" fill="#9aa3b2" transform={`rotate(${i * 36} 50 50)`} />)}
    <circle cx="50" cy="50" r="34" fill="#b7bfcc" stroke="#6c7586" strokeWidth="4" /><circle cx="50" cy="50" r="12" fill="#1a1d24" />
  </svg>
);

/* messy room icon for the mom joke */
const Room: React.FC<{ w: number; t: number }> = ({ w, t }) => (
  <svg width={w} height={w * .7} viewBox="0 0 300 210" style={{ display: 'block', overflow: 'visible' }}>
    <rect x="0" y="0" width="300" height="210" rx="18" fill="#1a2030" stroke="#3a4152" strokeWidth="3" />
    <rect x="20" y="150" width="260" height="10" rx="4" fill="#3a4152" />
    <rect x="30" y="110" width="80" height="40" rx="8" fill="#5B8CFF" transform="rotate(-8 70 130)" />
    <rect x="150" y="125" width="40" height="25" rx="4" fill="#EC3A2C" transform="rotate(14 170 137)" />
    <circle cx="230" cy="135" r="15" fill="#FFCF3A" />
    <path d="M60 60 q20 -30 40 0 t40 0" stroke="#9aa3b2" strokeWidth="6" fill="none" transform={`rotate(${Math.sin(t * 3) * 4} 100 60)`} />
    <rect x="200" y="40" width="60" height="40" rx="6" fill="#3DDC84" opacity=".8" transform="rotate(-20 230 60)" />
  </svg>
);

const Chip: React.FC<{ s: string; y: number; a: number; x?: number; col?: string }> = ({ s, y, a, x = CX, col = WH }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% 0', opacity: a, scale: String(lerp(.8, 1, a)), padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 26, color: col, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.25, .2, .3);
  const ph = eout(P(t, T.tel - .4, T.tel + .3));
  const open = eout(P(t, T.sayt - .3, T.sayt + .2));
  return <Layer a={a} z={logZ(P(t, -1, 5.2), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.9} />
    <div style={{ ...abs(CX - 210 - ph * 170, 770 + ph * 40), scale: String(lerp(1, .78, ph)), transformOrigin: '0 0' }}>
      <div style={{ position: 'relative', width: 420, height: 420 }}><QR s={420} id="q1" /><ScanFrame s={420} t={t} a={ph * (1 - open)} /></div>
    </div>
    {ph > 0 && <div style={{ ...abs(CX + 70, 640 + (1 - ph) * 300), opacity: ph }}>
      <Phone w={300} id="p1"><div style={{ position: 'absolute', inset: 0, background: '#0a0c10' }}>
        <div style={{ position: 'absolute', left: 50, top: 170, width: 176, height: 176 }}><QR s={176} id="q1s" /><ScanFrame s={176} t={t} a={1 - open} col={GRN} /></div>
        <Site a={open} />
      </div></Phone>
    </div>}
    <Pill s="1 soniya ✓" x={CX + 220} y={1330} a={eout(P(t, T.ochil - .1, T.ochil + .25))} size={30} col={GRN} />
    <Head t={t} t0={-1} t1={5.25} y={490} lines={[['qr-kod ichida'], ['nima bor?', 'y']]} size={92} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.2, 11.85, .3, .3);
  const bx = eback(P(t, T.zavod - .2, T.zavod + .3));
  const tag = eout(P(t, T.kuzat - .2, T.kuzat + .3));
  return <Layer a={a} z={logZ(P(t, 5.2, 11.85), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="236,58,44" />
    <Num v="1994" y={700} a={eout(P(t, T.y1994 - .2, T.y1994 + .3)) * (1 - .55 * bx)} size={200} />
    <Chip s="Yaponiya · Denso zavodi" y={930} a={eout(P(t, T.yapon - .2, T.yapon + .2)) * (1 - bx)} col={ICE} />
    {bx > 0 && <div style={{ ...abs(CX - 210, 900), scale: String(clamp(bx, 0, 1.2)), opacity: clamp(bx) }}>
      <Box w={420} id="b1"><div style={{ position: 'absolute', left: 30, top: 140, transform: 'skewY(18deg)' }}><div style={{ opacity: tag, scale: String(lerp(.6, 1, tag)) }}><QR s={95} id="q2" /></div></div></Box>
    </div>}
    {bx > 0 && <div style={{ ...abs(CX + 150, 880), opacity: clamp(bx) }}><Gear s={120} rot={t * 40} /></div>}
    <Pill s="avtomobil detallarini kuzatish uchun" x={CX} y={1300} a={eout(P(t, T.detal - .1, T.detal + .3))} size={28} col={WH} dark />
    <Src s="Masahiro Hara jamoasi, Denso Wave · 1994" y={1370} a={eout(P(t, T.kuzat, T.kuzat + .4))} />
    <Head t={t} t0={5.2} t1={11.85} y={490} lines={[['1994-yil,'], ['yaponiya', 'y']]} size={92} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 11.8, 19.25, .3, .3);
  const fin = eout(P(t, T.uchta - .1, T.kvadrat));
  const rot = eio(P(t, T.teskari - .3, T.teskari + .5)) * 180;
  const ok = eout(P(t, T.ham - .1, T.ham + .25));
  const cam = eout(P(t, T.kamera - .2, T.kamera + .3));
  return <Layer a={a} z={logZ(P(t, 11.8, 19.25), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="236,58,44" />
    <div style={{ ...abs(CX - 230, 720), rotate: `${rot}deg` }}>
      <div style={{ position: 'relative', width: 460, height: 460 }}><QR s={460} id="q3" fin={fin} /><ScanFrame s={460} t={t} a={cam} col={GRN} /></div>
    </div>
    <Pill s="1" x={CX - 230 + 58} y={720 + 58} a={fin * (1 - P(t, T.teskari - .3, T.teskari)) * eout(P(t, T.uchta, T.uchta + .2))} size={30} col={Y} />
    <Pill s="2" x={CX + 230 - 58} y={720 + 58} a={fin * (1 - P(t, T.teskari - .3, T.teskari)) * eout(P(t, T.uchta + .2, T.uchta + .4))} size={30} col={Y} />
    <Pill s="3" x={CX - 230 + 58} y={720 + 402} a={fin * (1 - P(t, T.teskari - .3, T.teskari)) * eout(P(t, T.uchta + .4, T.uchta + .6))} size={30} col={Y} />
    <Pill s="kamera yo‘nalishni topadi" x={CX} y={1270} a={cam * (1 - ok)} size={28} col={ICE} dark />
    <Pill s="teskari ham o‘qiladi ✓" x={CX} y={1270} a={ok} size={30} col={GRN} />
    <Head t={t} t0={11.8} t1={19.25} y={490} lines={[['uchta kvadrat —'], ['mayoq', 'y']]} size={92} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 19.2, 26.25, .3, .3);
  const zoom = eio(P(t, T.katak - .4, T.bitlar + .2));
  const cap = eout(P(t, T.eng - .2, T.k7000));
  return <Layer a={a} z={logZ(P(t, 19.2, 26.25), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="91,140,255" />
    <div style={{ ...abs(CX - 200, 700), opacity: (1 - cap * .85) * (1 - zoom * .75), scale: String(lerp(1, .8, cap)) }}><QR s={400} id="q4" /></div>
    {/* magnifier showing 4x3 cells with bits */}
    {zoom > 0 && <Card x={CX - 260} y={780 + (1 - zoom) * 80} w={520} a={zoom * (1 - cap)} style={{ padding: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {[1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1].map((b, i) => {
          const on = eout(P(t, T.qora - .3 + i * .06, T.qora + i * .06));
          const hiB = b ? eout(P(t, T.bir1 - .1, T.bir1 + .2)) : eout(P(t, T.nol - .1, T.nol + .2));
          return <div key={i} style={{ height: 76, borderRadius: 10, background: b ? '#11131a' : '#F3F5F8', border: `3px solid ${hiB > .5 ? (b ? Y : BLUE) : '#3a4152'}`, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: b ? Y : '#1f3a7a', opacity: lerp(.4, 1, on) }}>{on > .1 ? b : ''}</div>;
        })}
      </div>
    </Card>}
    <Num v="7 089" y={760} a={cap} size={190} />
    <Pill s="raqamgacha sig‘adi" x={CX} y={1010} a={eout(P(t, T.raqam - .2, T.raqam + .2))} size={32} col={WH} dark />
    <Chip s="eng katta kod: 177 × 177 katak" y={1080} a={eout(P(t, T.sig - .2, T.sig + .2))} col={ICE} />
    <Src s="QR-kod standarti, 40-versiya · qrplanet.com" y={1170} a={eout(P(t, T.raqam, T.raqam + .4))} />
    <Head t={t} t0={19.2} t1={T.eng - .1} y={490} lines={[['qora = 1'], ['oq = 0', 'y']]} size={96} />
    <Head t={t} t0={T.eng - .1} t1={26.25} y={490} lines={[['eng katta'], ['kodga', 'y']]} size={96} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.2, 27.95, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={26.2} t1={27.95} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 27.9, 34.9, .3, .3);
  const torn = eout(P(t, T.yirt - .2, T.kir + .3));
  const ok = eout(P(t, T.oqil - .1, T.oqil + .25));
  const pct = eio(P(t, T.p30 - .2, T.p30 + .6));
  return <Layer a={a} z={logZ(P(t, 27.9, 34.9), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col={ok > .5 ? '61,220,132' : '236,58,44'} />
    <div style={{ ...abs(CX - 230, 700) }}>
      <div style={{ position: 'relative', width: 460, height: 460 }}><QR s={460} id="q6" torn={torn} /><ScanFrame s={460} t={t} a={ok} col={GRN} /></div>
    </div>
    <Num v={`${Math.round(30 * pct)}%`} x={CX + 150} y={1010} a={pct * torn} size={84} col={RED} />
    <Stamp s="O‘QILADI ✓" x={CX} y={1240} t={t} t0={T.oqil} t1={34.9} col={GRN} size={64} rot={-5} />
    <Chip s="ma’lumot zaxira bilan yoziladi" y={1320} a={eout(P(t, T.zaxira - .2, T.zaxira + .3))} col={Y} />
    <Src s="Reed–Solomon xatoni tuzatish: H darajasi ~30%" y={1395} a={eout(P(t, T.zaxira, T.zaxira + .4))} />
    <Head t={t} t0={27.9} t1={34.9} y={490} lines={[['30% yirtilsa ham'], ['ishlaydi', 'g']]} size={84} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 34.85, END + 1, .3, .1);
  const aA = env(t, 34.85, T.buni - .05, .3, .3);
  const rm = eout(P(t, T.uyning - .3, T.uyning + .3));
  const ok = eout(P(t, T.darrov - .1, T.darrov + .3));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={520} a={.8} col="61,220,132" />
      <div style={{ ...abs(CX - 230, 760), opacity: rm, scale: String(lerp(.8, 1, rm)) }}><Room w={460} t={t} /></div>
      <Pill s="yarmi tartibsiz" x={CX} y={1120} a={eout(P(t, T.tartib - .1, T.tartib + .3)) * (1 - ok)} size={30} col={RED} dark />
      <Pill s="hammasini tushundi ✓" x={CX} y={1120} a={ok} size={30} col={GRN} />
      <Head t={t} t0={34.85} t1={T.buni} y={490} lines={[['xuddi'], ['onamiz kabi', 'y']]} size={92} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['skaner ishqibozi'], ['do‘stga yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.ochil, 8, 7], [T.y1994, 10, 6], [T.mayoq, 8, 7], [T.teskari + .4, 8, 7], [T.k7000, 10, 6], [T.endi, 20, 5], [T.yirt, 10, 6], [T.oqil, 14, 6], [T.darrov, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1060} r={600} a={1} col="236,58,44" />
    <div style={{ ...abs(CX + 40 - 250, 760) }}><div style={{ position: 'relative', width: 500, height: 500 }}><QR s={500} id="qc" fin={1} torn={1} /><ScanFrame s={500} t={.4} a={1} col={GRN} /></div></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>nega / qanday · texnika</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 118, lineHeight: 1.02, ...yel }}>QR-KOD ICHIDA<br />NIMA BOR?</div>
    <div style={{ ...abs(SL, 1330, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: GRN }}>30% YIRTILSA HAM<br /><span style={{ color: WH }}>O‘QILADI</span></div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>Denso Wave · 1994</div>
  </AbsoluteFill>;
};
