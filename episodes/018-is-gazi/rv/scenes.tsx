import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, YL, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, rnd, clamp } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, flight, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
const ORX = '#E2534A';
/* CO molecule (grey C + red O) or O2 (two red O) */
const Mol: React.FC<{ s: number; kind?: 'co' | 'o2'; rot?: number; id: string; glow?: number }> = ({ s, kind = 'co', rot = 0, id, glow = 0 }) => (
  <svg width={s * 1.7} height={s} viewBox="0 0 170 100" style={{ display: 'block', overflow: 'visible', rotate: `${rot}deg` }}>
    <defs>
      <radialGradient id={`mc${id}`} cx=".35" cy=".3" r=".7"><stop offset="0" stopColor="#d7dbe4" /><stop offset=".6" stopColor="#5a6070" /><stop offset="1" stopColor="#2a2e38" /></radialGradient>
      <radialGradient id={`mo${id}`} cx=".35" cy=".3" r=".7"><stop offset="0" stopColor="#ffb1a8" /><stop offset=".6" stopColor={ORX} /><stop offset="1" stopColor="#7a1d18" /></radialGradient>
      <filter id={`mg${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
    {glow > 0 && <ellipse cx="85" cy="50" rx="90" ry="55" fill={kind === 'co' ? '#9aa3b5' : ORX} opacity={glow * .5} filter={`url(#mg${id})`} />}
    <rect x="50" y="42" width="70" height="16" rx="8" fill="#c7cedb" />
    <circle cx="50" cy="50" r="42" fill={`url(#${kind === 'co' ? 'mc' : 'mo'}${id})`} />
    <circle cx="122" cy="50" r="38" fill={`url(#mo${id})`} />
    <text x="50" y="62" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight={700} fontSize="34" fill="#fff">{kind === 'co' ? 'C' : 'O'}</text>
    <text x="122" y="61" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight={700} fontSize="32" fill="#fff">O</text>
  </svg>
);
/* gas burner flame; warm 0 = clean blue, 1 = lazy orange (incomplete burning) */
const Flame: React.FC<{ w: number; t: number; warm: number; id: string }> = ({ w, t, warm, id }) => {
  const fl = (k: number) => Math.sin(t * 11 + k) * 6 + Math.sin(t * 7.3 + k * 2) * 4;
  const c1 = warm > .5 ? '#FFB23A' : '#7FB8FF', c2 = warm > .5 ? '#E85A1A' : '#2D5BFF';
  return <svg width={w} height={w * .9} viewBox="0 0 300 270" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`fg${id}`} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor={c2} /><stop offset=".7" stopColor={c1} /><stop offset="1" stopColor={c1} stopOpacity="0" /></linearGradient>
      <linearGradient id={`fb${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3a3f4b" /><stop offset=".5" stopColor="#9aa1af" /><stop offset="1" stopColor="#2a2e38" /></linearGradient>
      <filter id={`fx${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16" /></filter>
    </defs>
    <ellipse cx="150" cy="170" rx="140" ry="70" fill={c1} opacity=".35" filter={`url(#fx${id})`} />
    {Array.from({ length: 7 }, (_, k) => { const x = 60 + k * 30, h = lerp(70, 130, warm) + fl(k) * (1 + warm * 2);
      return <path key={k} d={`M${x - 14} 200 C ${x - 16} ${200 - h * .5} ${x - 4 + fl(k + 3) * warm} ${200 - h * .8} ${x + fl(k) * warm * .6} ${200 - h} C ${x + 6} ${200 - h * .7} ${x + 16} ${200 - h * .45} ${x + 14} 200 Z`} fill={`url(#fg${id})`} opacity=".92" />; })}
    <rect x="30" y="198" width="240" height="26" rx="13" fill={`url(#fb${id})`} />
    <rect x="70" y="224" width="160" height="34" rx="8" fill="#22262f" />
  </svg>;
};
/* red blood cell with 4 slots */
const Cell: React.FC<{ w: number; dark: number }> = ({ w, dark }) => (
  <svg width={w} height={w * .78} viewBox="0 0 400 312" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <radialGradient id="rbc" cx=".45" cy=".4" r=".65"><stop offset="0" stopColor={dark > .5 ? '#8a3a44' : '#ff6b6b'} /><stop offset=".55" stopColor={dark > .5 ? '#5a1f28' : '#d0313b'} /><stop offset="1" stopColor="#5a0f16" /></radialGradient>
      <radialGradient id="rbi" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#5a0f16" stopOpacity=".7" /><stop offset="1" stopColor="#5a0f16" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="200" cy="156" rx="196" ry="150" fill="url(#rbc)" />
    <ellipse cx="200" cy="156" rx="110" ry="80" fill="url(#rbi)" />
    <path d="M70 90 C 110 40 200 30 260 46" stroke="#fff" strokeOpacity=".35" strokeWidth="10" strokeLinecap="round" fill="none" />
  </svg>
);
/* sealed room with plastic window; children inside the room */
const Room: React.FC<{ w: number; h: number; children?: React.ReactNode }> = ({ w, h, children }) => (
  <div style={{ position: 'relative', width: w, height: h, borderRadius: 24, border: '6px solid #c7cedb', background: 'linear-gradient(180deg,#1a2030,#10141d)', boxShadow: '0 30px 70px rgba(0,0,0,.6), inset 0 0 60px rgba(0,0,0,.5)', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', right: 40, top: 40, width: 220, height: 260, borderRadius: 10, border: '14px solid #f2f4f8', background: 'linear-gradient(160deg,#2a4a70,#101826)' }}>
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 12, marginLeft: -6, background: '#f2f4f8' }} />
      <div style={{ position: 'absolute', left: 74, top: 110, width: 14, height: 40, borderRadius: 4, background: '#c7cedb' }} />
    </div>
    {children}
  </div>
);
const Bed: React.FC<{ w: number; t: number }> = ({ w, t }) => (
  <svg width={w} height={w * .5} viewBox="0 0 400 200" style={{ display: 'block', overflow: 'visible' }}>
    <rect x="20" y="40" width="26" height="150" rx="8" fill="#8a6a4a" /><rect x="354" y="90" width="26" height="100" rx="8" fill="#8a6a4a" />
    <rect x="30" y="120" width="340" height="40" rx="10" fill="#e8ecf4" /><rect x="30" y="150" width="340" height="18" rx="6" fill="#7a5a3a" />
    <ellipse cx="100" cy="110" rx="46" ry="22" fill="#ffffff" />
    <circle cx="108" cy="92" r="26" fill="#e9b892" />
    <path d="M130 112 C 200 84 300 92 352 118 L 352 128 L 130 128 Z" fill="#5B8CFF" />
    {[0, 1, 2].map((i) => { const k = ((t * .5 + i / 3) % 1); return <text key={i} x={140 + k * 60} y={70 - k * 60} fontFamily="Osw, sans-serif" fontWeight={700} fontSize={22 + k * 18} fill="#F3F5F8" opacity={1 - k}>z</text>; })}
  </svg>
);
const Detector: React.FC<{ w: number; on: number }> = ({ w, on }) => (
  <svg width={w} height={w} viewBox="0 0 200 200" style={{ display: 'block', overflow: 'visible' }}>
    <defs><radialGradient id="dtG" cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#b9c1cf" /></radialGradient></defs>
    <circle cx="100" cy="100" r="92" fill="url(#dtG)" stroke="#7F8792" strokeWidth="4" />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x="96" y="30" width="8" height="26" rx="4" fill="#9aa3b5" transform={`rotate(${i * 30} 100 100)`} />)}
    <circle cx="100" cy="100" r="30" fill="#e8ecf4" stroke="#9aa3b5" strokeWidth="3" />
    <text x="100" y="110" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight={700} fontSize="26" fill="#2a2f3a">CO</text>
    <circle cx="150" cy="60" r="10" fill={on > 0 ? '#3DDC84' : '#5a6070'} />
    {on > 0 && <circle cx="150" cy="60" r={10 + 18 * on} fill="none" stroke="#3DDC84" strokeWidth="3" opacity={1 - on} />}
  </svg>
);
const Head3: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w} viewBox="0 0 300 300" style={{ display: 'block' }}>
    <defs><linearGradient id="hdG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3a4255" /><stop offset="1" stopColor="#1a1f2b" /></linearGradient></defs>
    <path d="M150 30 C 80 30 50 85 55 140 C 58 175 70 190 80 205 L 80 270 L 200 270 L 200 235 L 230 235 C 240 235 245 228 244 218 L 240 190 L 258 178 C 264 174 262 168 258 164 L 240 140 C 245 80 210 30 150 30 Z" fill="url(#hdG)" stroke="#7F8792" strokeWidth="4" />
  </svg>
);
const Check: React.FC<{ on: number; col?: string }> = ({ on, col = GRN }) => (
  <svg width={52} height={52} viewBox="0 0 52 52" style={{ flex: 'none' }}>
    <circle cx="26" cy="26" r="24" fill={on > 0 ? col : 'none'} stroke={on > 0 ? col : '#3a4050'} strokeWidth="3" opacity={on > 0 ? lerp(.4, 1, on) : 1} />
    {on > 0 && <path d="M14 27 L 23 35 L 38 18" stroke="#06210f" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{ strokeDasharray: `${on} 1` }} />}
  </svg>
);
/* floating CO molecules inside a box */
const Drift: React.FC<{ t: number; n: number; x: number; y: number; w: number; h: number; s?: number; a: number; seed: number; id: string }> = ({ t, n, x, y, w, h, s = 46, a, seed, id }) => {
  if (a <= 0) return null; const R = rnd(seed);
  return <>{Array.from({ length: n }, (_, i) => { const px = R(), py = R(), vx = .05 + R() * .08, vy = .04 + R() * .07, ph = R() * 6;
    const tri = (v: number) => { const m = ((v % 2) + 2) % 2; return m < 1 ? m : 2 - m; };
    return <div key={i} style={{ position: 'absolute', left: x + tri(px * 2 + t * vx) * (w - s * 1.7), top: y + tri(py * 2 + t * vy) * (h - s), opacity: a * (.75 + .25 * Math.sin(t * 2 + ph)) }}><Mol s={s} id={`${id}${i}`} rot={Math.sin(t + ph) * 30} /></div>; })}</>;
};

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 7.55, .2, .3);
  const big = eout(P(t, T.bu - .1, T.bu + .4));
  return <Layer a={a} z={logZ(P(t, -1, 7.5), 1, 1.06)}>
    <Glow x={CX} y={930} r={520} a={.6 + .4 * big} col="154,163,181" />
    <Drift t={t} n={7} x={SL + 10} y={700} w={SR - SL - 20} h={520} s={38} a={.35 * (1 - big)} seed={11} id="d1" />
    <div style={{ position: 'absolute', left: CX, top: 930, translate: '-50% -50%', scale: String(lerp(1, 1.35, big)) }}><Mol s={190} id="h1" rot={Math.sin(t * .8) * 8} glow={.6 + .4 * Math.sin(t * 2)} /></div>
    {[['hid', T.hidi], ['rang', T.rangi], ['ovoz', T.ovozi]].map(([k, tt], i) => <Pill key={k as string} s={`${k}: yo‘q`} x={CX - 270 + i * 270} y={1250} a={env(t, (tt as number) - .1, T.bu, .25, .3)} size={30} dark col={RED} />)}
    <Head t={t} t0={-1} t1={T.qishda - .1} y={490} lines={[['ko‘rinmas'], ['xavf', 'r']]} size={84} />
    <Head t={t} t0={T.qishda - .1} t1={T.bu - .1} y={490} lines={[['har qishda'], ['uylarda', 'r']]} size={72} />
    <Head t={t} t0={T.bu - .1} t1={7.55} y={490} lines={[['is gazi', 'y']]} size={110} from="slam" />
    <Pill s="CO · uglerod monoksidi" x={CX} y={1250} a={env(t, T.isgaz, 7.55, .25, .3)} size={28} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 7.45, 14.05, .3, .3);
  const eat = eio(P(t, T.yeb - .3, T.yeb + .9));
  const R = rnd(4);
  const ox = Array.from({ length: 6 }, (_, i) => ({ y0: 760 + R() * 220, ph: R(), sd: i % 2 ? 1 : -1 }));
  const fl: [number, number] = [300, 1080];
  return <Layer a={a} z={logZ(P(t, 7.45, 14), 1, 1.04)}>
    <Glow x={fl[0]} y={fl[1]} r={420} a={.8} col="91,140,255" />
    <div style={{ ...abs(fl[0] - 160, fl[1] - 180) }}><Flame w={320} t={t} warm={0} id="f2" /></div>
    {ox.map((o, i) => { const k = ((t * .35 + o.ph) % 1); const sx = o.sd < 0 ? SL : 540; const x = lerp(sx, fl[0] - 40, eio(k)), y = lerp(o.y0, fl[1] - 60, eio(k));
      return <div key={i} style={{ ...abs(x, y), opacity: env(t, 7.6, 14, .3, .3) * (1 - k) }}><Mol s={44} kind="o2" id={`o2${i}`} /></div>; })}
    <Pill s="kislorod (O₂)" x={fl[0]} y={1330} a={eout(P(t, T.kislorod - .1, T.kislorod + .3))} size={26} dark col={ORX} />
    <Layer a={eout(P(t, T.fvv - .2, T.fvv + .3))}>
      <div style={{ position: 'absolute', left: 530, top: 800, display: 'grid', gridTemplateColumns: 'repeat(5, 72px)', gap: 12 }}>
        {Array.from({ length: 10 }, (_, i) => { const gone = clamp(eat * 11 - i); return <div key={i} style={{ width: 72, height: 72, borderRadius: 12, border: '2px solid rgba(155,227,255,.6)', background: `rgba(155,227,255,${.28 * (1 - gone) + .04})`, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 20, color: gone > .5 ? GR : ICE, scale: String(lerp(.6, 1, eback(P(t, T.kub10 - .3 + i * .04, T.kub10 + .1 + i * .04)))) }}>{gone > .5 ? '—' : 'O2'}</div>; })}
      </div>
      <Pill s="10 kub havo" x={730} y={1010} a={eout(P(t, T.kub10, T.kub10 + .3))} size={28} col={ICE} dark />
      <Pill s="1 kub gaz" x={fl[0]} y={850} a={eout(P(t, T.bir, T.bir + .3))} size={30} />
      <Src s="FVV · matbuot anjumani, 2024" y={1370} a={eout(P(t, T.fvv, T.fvv + .4))} />
    </Layer>
    <Head t={t} t0={7.45} t1={T.fvv - .1} y={490} lines={[['yonish uchun'], ['kislorod kerak', 'y']]} size={64} />
    <Head t={t} t0={T.fvv - .1} t1={14.05} y={490} lines={[['1 kub gaz ='], ['10 kub havo', 'y']]} size={64} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 13.95, 18.05, .3, .3);
  const warm = eio(P(t, T.yetmasa - .2, T.yonmay + .3));
  const out = P(t, T.yonmay, 18.0);
  return <Layer a={a} z={logZ(P(t, 14, 18), 1, 1.05)}>
    <Glow x={CX} y={1100} r={460} a={.9} col={warm > .5 ? '232,90,26' : '91,140,255'} />
    <div style={{ ...abs(CX - 170, 950) }}><Flame w={340} t={t} warm={warm} id="f3" /></div>
    {Array.from({ length: 6 }, (_, i) => { const k = clamp(out * 1.6 - i * .12); if (k <= 0) return null; const x = CX - 40 + Math.sin(i * 2.1 + t) * 200 * k, y = 980 - k * 190 - i * 14;
      return <div key={i} style={{ ...abs(x - 40, y), opacity: Math.min(1, k * 3) }}><Mol s={52} id={`c3${i}`} rot={i * 20 + t * 20} /></div>; })}
    <Pill s="chala yonish" x={CX} y={1330} a={eout(P(t, T.yonmay - .1, T.yonmay + .3))} size={28} col={ORX} dark />
    <Head t={t} t0={13.95} t1={T.chiq - .1} y={490} lines={[['kislorod'], ['yetmasa', 'r']]} size={72} />
    <Head t={t} t0={T.chiq - .1} t1={18.05} y={490} lines={[['is gazi', 'r'], ['chiqadi']]} size={72} from="slam" />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 17.95, 26.45, .3, .3);
  const dark = eio(P(t, T.tana - .2, T.tana + .6));
  const slots: [number, number][] = [[CX - 120, 860], [CX + 60, 830], [CX - 70, 1000], [CX + 100, 990]];
  const o2in = (i: number) => eout(P(t, T.qon + i * .2, T.qon + .6 + i * .2));
  const coin = (i: number) => P(t, T.gemo + i * .35, T.gemo + .5 + i * .35);
  return <Layer a={a} z={logZ(P(t, 18, 26.4), 1, 1.05)}>
    <Glow x={CX} y={920} r={500} a={.9} col={dark > .5 ? '90,30,40' : '226,83,74'} />
    <div style={{ ...abs(CX - 280, 700), scale: String(lerp(.8, 1, eback(P(t, 18, 18.6)))) }}><Cell w={560} dark={dark} /></div>
    {slots.map(([x, y], i) => { const c = coin(i); const o = o2in(i);
      const ox = x + (c > 0 ? 260 * eio(c) * (i % 2 ? 1 : -1) : (1 - o) * -300), oy = y - (c > 0 ? 200 * eio(c) : 0);
      const [cx, cy] = flight(c, [i % 2 ? 960 : 40, 700], [x, y], 80);
      return <React.Fragment key={i}>
        {o > 0 && c < 1 && <div style={{ ...abs(ox - 37, oy - 22), opacity: o * (1 - c) }}><Mol s={44} kind="o2" id={`q${i}`} /></div>}
        {c > 0 && <div style={{ ...abs(cx - 37, cy - 22) }}><Mol s={44} id={`k${i}`} glow={c >= 1 ? .5 : 0} /></div>}
      </React.Fragment>; })}
    <Num v="200×" y={1170} a={eout(P(t, T.m200 - .1, T.m200 + .3))} size={120} col={RED} />
    <Pill s="kisloroddan kuchliroq ushlaydi" x={CX} y={1325} a={eout(P(t, T.kuch, T.kuch + .3))} size={26} dark col={RED} />
    <Src s="tibbiy adabiyot: CO gemoglobinga O₂ dan ~200–250 marta kuchli bog‘lanadi" y={1385} a={eout(P(t, T.kuch, T.kuch + .4))} />
    <Pill s="qondagi hujayra" x={CX + 250} y={720} a={env(t, T.qon, T.m200, .25, .3)} size={24} dark />
    <Head t={t} t0={17.95} t1={T.gemo - .1} y={490} lines={[['qonga'], ['o‘tadi', 'y']]} size={72} />
    <Head t={t} t0={T.gemo - .1} t1={T.tana - .1} y={490} lines={[['gemoglobin'], ['ushlab qoladi', 'r']]} size={62} />
    <Head t={t} t0={T.tana - .1} t1={26.45} y={490} lines={[['tana'], ['kislorodsiz', 'r']]} size={72} from="slam" />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.4, 35.5, .3, .3);
  const aA = env(t, 26.4, T.uxlab - .05, .3, .3), aB = env(t, T.uxlab - .2, 35.5, .3, .3);
  const sy = [['bosh og‘rig‘i', T.bosh], ['bosh aylanishi', T.bosh2], ['ko‘ngil aynishi', T.kongil]] as [string, number][];
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 26.4, 32.5), 1, 1.05)}>
      <Glow x={CX - 120} y={920} r={460} a={.8} />
      <div style={{ ...abs(CX - 380, 720), rotate: `${Math.sin(t * 2.5) * 3 * P(t, T.bosh2, T.bosh2 + .3)}deg` }}><Head3 w={380} /></div>
      {sy.map(([s, tt], i) => <Pill key={s} s={s} x={CX + 230} y={790 + i * 110} a={eout(P(t, tt - .1, tt + .25))} size={30} dark col={i === 2 ? RED : Y} />)}
      <Pill s="≈ shamollashga o‘xshaydi" x={CX} y={1250} a={eout(P(t, T.shamol - .1, T.shamol + .3))} size={30} />
      <Src s="CDC · Carbon monoxide poisoning" y={1340} a={eout(P(t, T.bosh, T.bosh + .4))} />
      <Head t={t} t0={26.4} t1={T.uxlab - .05} y={490} lines={[['belgilari', 'y']]} size={100} />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={1000} r={480} a={.7} col="91,140,255" />
      <div style={{ ...abs(CX - 260, 820) }}><Bed w={520} t={t} /></div>
      <Drift t={t} n={5} x={SL + 20} y={700} w={SR - SL - 40} h={200} s={40} a={eout(P(t, T.uxlab, T.uxlab + .6))} seed={21} id="d5" />
      <Stamp s="SEZMAYDI" y={1230} t={t} t0={T.sez} t1={35.5} size={70} />
      <Head t={t} t0={T.uxlab - .2} t1={35.5} y={490} lines={[['uyquda —'], ['sezilmaydi', 'r']]} size={70} />
    </Layer>
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 35.45, 42.1, .15, .3);
  const aA = env(t, 35.45, T.plastik - .05, .1, .3), aB = env(t, T.plastik - .2, 42.1, .3, .3);
  const trap = eout(P(t, T.lekin - .1, T.lekin + .6));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} col="236,58,44" />
      <Head t={t} t0={35.45} t1={T.plastik - .05} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.plastik, 42.1), 1, 1.04)}>
      <Glow x={CX} y={950} r={520} a={.8} col={trap > .5 ? '236,58,44' : '246,185,59'} />
      <div style={{ ...abs(SL + 20, 690) }}>
        <Room w={SR - SL - 40} h={560}>
          {Array.from({ length: 4 }, (_, i) => { const k = (t * .4 + i / 4) % 1; return <svg key={i} width={200} height={300} style={{ position: 'absolute', left: 80 + i * 70, top: 420 - k * 260, opacity: (1 - k) * .8 }}><path d="M20 280 C 0 230 40 200 20 150 C 0 100 40 70 20 20" stroke="#FFB23A" strokeWidth="6" fill="none" strokeLinecap="round" /></svg>; })}
          <Drift t={t} n={9} x={20} y={20} w={SR - SL - 80} h={510} s={44} a={trap} seed={31} id="d6" />
          {trap > 0 && <div style={{ position: 'absolute', right: 40, top: 40, width: 220, height: 260, borderRadius: 10, border: `6px solid ${RED}`, opacity: trap * (.6 + .4 * Math.sin(t * 6)) }} />}
        </Room>
      </div>
      <Pill s="issiq saqlanadi ✓" x={CX - 180} y={1310} a={eout(P(t, T.issiq - .1, T.issiq + .3))} size={28} col={GRN} />
      <Pill s="is gazi ham ✕" x={CX + 220} y={1310} a={eout(P(t, T.lekin, T.lekin + .3))} size={28} col={RED} dark />
      <Head t={t} t0={T.plastik - .2} t1={T.lekin - .1} y={490} lines={[['plastik'], ['deraza', 'y']]} size={72} />
      <Head t={t} t0={T.lekin - .1} t1={42.1} y={490} lines={[['is gazi ham'], ['qamaladi', 'r']]} size={68} />
    </Layer>
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 42.05, 47.6, .3, .3);
  const cnt = eio(P(t, T.n122 - .3, T.n122 + .9));
  return <Layer a={a} z={logZ(P(t, 42, 47.6), 1, 1.04)}>
    <Glow x={CX} y={900} r={480} a={.7} col="236,58,44" />
    <Pill s="2022-yil · O‘zbekiston" x={CX} y={730} a={eout(P(t, T.y2022 - .1, T.y2022 + .3))} size={30} />
    <Num v={fmt(122 * cnt)} y={790} a={eout(P(t, T.n122 - .3, T.n122))} size={190} col={RED} />
    <div style={{ ...abs(CX - 200, 995, 400), textAlign: 'center', fontFamily: HEAD, fontWeight: 600, fontSize: 40, color: WH, opacity: eout(P(t, T.vafot - .1, T.vafot + .3)) }}>KISHI VAFOT ETGAN</div>
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
      {Array.from({ length: 122 }, (_, i) => { const on = i < 122 * cnt; return <circle key={i} cx={SL + 40 + (i % 20) * 41} cy={1100 + Math.floor(i / 20) * 34} r="9" fill={on ? RED : '#2a3040'} opacity={on ? .85 : .6} />; })}
    </svg>
    <Src s="FVV ma’lumoti · kun.uz, 8.11.2024" y={1330} a={eout(P(t, T.n122, T.n122 + .4))} />
    <Head t={t} t0={42.05} t1={47.6} y={490} lines={[['bir yilda'], ['is gazidan', 'r']]} size={68} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 47.55, 56.35, .3, .3);
  const rows: [string, number][] = [['Mo‘ri va ventilyatsiyani tozalang', T.mori], ['Xonani shamollating', T.xona], ['Pechkani yoqib qo‘yib uxlamang', T.pech], ['Yotoq yoniga is gazi datchigi', T.datch]];
  return <Layer a={a} z={logZ(P(t, 47.6, 56.3), 1, 1.03)}>
    <Glow x={CX} y={950} r={520} a={.8} col="61,220,132" />
    <Card x={SL + 10} y={660} w={SR - SL - 20} style={{ scale: String(lerp(.9, 1, eback(P(t, 47.6, 48.2)))) }}>
      <div style={{ padding: '18px 28px' }}>
        {rows.map(([s, tt], i) => { const on = eout(P(t, tt - .1, tt + .4)); return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px 0', borderTop: i ? '1px solid rgba(255,255,255,.08)' : 'none', opacity: lerp(.45, 1, on) }}>
          <Check on={on} /><span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 31, color: on > .5 ? WH : GR }}>{s}</span></div>; })}
      </div>
    </Card>
    <div style={{ ...abs(CX - 90, 1135), opacity: eout(P(t, T.datch - .2, T.datch + .3)), scale: String(lerp(.6, 1, eback(P(t, T.datch - .2, T.datch + .5)))) }}><Detector w={180} on={(t * 1.2) % 1} /></div>
    <Src s="FVV va CDC tavsiyalari" y={1345} a={eout(P(t, T.mori, T.mori + .4))} />
    <Head t={t} t0={47.55} t1={56.35} y={490} lines={[['himoya'], ['oddiy', 'g']]} size={76} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 56.3, END + 1, .3, .1);
  const aA = env(t, 56.3, T.buni - .05, .3, .3);
  const digits = '103'; const nd = t < T.n103 - .1 ? 0 : Math.min(3, 1 + Math.floor((t - T.n103 + .1) / .25));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={960} r={500} a={.85} col={t > T.n103 ? '61,220,132' : '155,227,255'} />
      <div style={{ ...abs(CX - 150, 680 + (1 - eout(P(t, 56.3, 56.9))) * 120) }}>
        <Phone w={300} glow={t > T.qong ? .7 : 0} id="p9">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#151b2a,#090c13)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginTop: 90, fontFamily: HEAD, fontWeight: 700, fontSize: 84, color: WH, letterSpacing: 6 }}>{digits.slice(0, nd) || ' '}</div>
            <div style={{ marginTop: 6, fontFamily: MONO, fontSize: 18, color: GR }}>tez tibbiy yordam</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: 14, marginTop: 30 }}>
              {'123456789'.split('').map((d) => <div key={d} style={{ width: 60, height: 60, borderRadius: 30, background: '#1d2230', display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 26, color: WH }}>{d}</div>)}
            </div>
            <div style={{ marginTop: 22, width: 76, height: 76, borderRadius: 38, background: GRN, display: 'grid', placeItems: 'center', scale: String(1 + .08 * Math.sin(t * 8) * (t > T.qong ? 1 : 0)), fontFamily: SANS, fontWeight: 800, fontSize: 30, color: '#06210f' }}>✆</div>
          </div>
        </Phone>
      </div>
      <Pill s="derazani oching" x={CX - 270} y={820} a={eout(P(t, T.toza - .3, T.toza + .1))} size={26} col={ICE} dark />
      <Pill s="toza havoga chiqing" x={CX + 280} y={900} a={eout(P(t, T.toza - .1, T.toza + .3))} size={26} col={GRN} />
      <Head t={t} t0={56.3} t1={T.n103 - .15} y={490} lines={[['darhol —'], ['toza havo', 'g']]} size={68} />
      <Head t={t} t0={T.n103 - .15} t1={T.buni} y={490} lines={[['qo‘ng‘iroq'], ['103', 'y']]} size={76} from="slam" />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.yaq} sentAt={T.yub} lines={[['yaqinlarga'], ['yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.bu, 12, 6], [T.kub10, 8, 7], [T.chiq, 10, 6], [T.m200, 12, 6], [T.tana, 8, 7], [T.sez, 12, 6], [T.endi, 20, 5], [T.lekin, 10, 6], [T.n122, 12, 6], [T.n103, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 2.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1150} r={560} a={1} col="154,163,181" />
    <div style={{ position: 'absolute', left: CX + 40, top: 1150, translate: '-50% -50%' }}><Mol s={230} id="cv" glow={1} /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>hidi yo‘q · rangi yo‘q</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 150, lineHeight: 1.0, ...yel }}>IS GAZI</div>
    <div style={{ ...abs(SL, 610, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 70, lineHeight: 1.05, color: RED }}>UYQUDA SEZILMAYDI</div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, lineHeight: 1.1, color: GRN }}>4 ODDIY HIMOYA</div>
  </AbsoluteFill>;
};
