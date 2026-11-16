import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, rnd } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art (generic, no brands) ---------- */
/* horizontal battery, lvl 0..1 */
const Battery: React.FC<{ w: number; lvl: number; id: string; col?: string }> = ({ w, lvl, id, col }) => {
  const c = col || (lvl < .2 ? RED : lvl < .5 ? Y : GRN);
  return <svg width={w} height={w * .5} viewBox="0 0 400 200" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`bf${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <filter id={`bg${id}`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
    <rect x="22" y="30" width="330" height="140" rx="26" fill={c} opacity=".25" filter={`url(#bg${id})`} />
    <rect x="10" y="20" width="350" height="160" rx="30" fill="#0c0f15" stroke="#c9d0dc" strokeWidth="10" />
    <rect x="362" y="70" width="26" height="60" rx="8" fill="#c9d0dc" />
    <rect x="28" y="38" width={Math.max(0, 314 * clamp(lvl))} height="124" rx="16" fill={c} />
    <rect x="28" y="38" width={Math.max(0, 314 * clamp(lvl))} height="124" rx="16" fill={`url(#bf${id})`} />
  </svg>;
};

/* small vertical battery cell */
const Cell: React.FC<{ s: number; col?: string }> = ({ s, col = GRN }) => (
  <svg width={s * .6} height={s} viewBox="0 0 60 100" style={{ display: 'block' }}>
    <rect x="22" y="2" width="16" height="8" rx="3" fill="#c9d0dc" />
    <rect x="4" y="9" width="52" height="88" rx="10" fill="#0c0f15" stroke="#c9d0dc" strokeWidth="5" />
    <rect x="11" y="16" width="38" height="74" rx="5" fill={col} />
    <path d="M33 30 L22 56 L31 56 L27 76 L40 46 L31 46 Z" fill="#0c0f15" opacity=".55" />
  </svg>
);

/* qovun (melon), generic */
const Melon: React.FC<{ w: number; id: string }> = ({ w, id }) => (
  <svg width={w} height={w * .7} viewBox="0 0 300 210" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <radialGradient id={`ml${id}`} cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#ffe58a" /><stop offset=".6" stopColor="#e3b43c" /><stop offset="1" stopColor="#a8761c" /></radialGradient>
      <clipPath id={`mc${id}`}><ellipse cx="150" cy="105" rx="146" ry="100" /></clipPath>
    </defs>
    <ellipse cx="150" cy="200" rx="120" ry="10" fill="#000" opacity=".35" />
    <ellipse cx="150" cy="105" rx="146" ry="100" fill={`url(#ml${id})`} />
    <g clipPath={`url(#mc${id})`} stroke="#8a6116" strokeWidth="2.5" fill="none" opacity=".5">
      {Array.from({ length: 9 }, (_, i) => <path key={`a${i}`} d={`M${-40 + i * 45} 0 Q${i * 45} 105 ${-40 + i * 45} 210`} />)}
      {Array.from({ length: 9 }, (_, i) => <path key={`b${i}`} d={`M${i * 45} 0 Q${-30 + i * 45} 105 ${i * 45} 210`} />)}
    </g>
    <ellipse cx="100" cy="55" rx="50" ry="18" fill="#fff" opacity=".25" transform="rotate(-18 100 55)" />
    <path d="M292 100 q14 -6 18 -20" stroke="#6b4a12" strokeWidth="6" fill="none" strokeLinecap="round" />
  </svg>
);

/* a very thick "brick" phone in 3/4 view; th = thickness 0..1 */
const BrickPhone: React.FC<{ w: number; th: number; id: string; lvl?: number }> = ({ w, th, id, lvl = 1 }) => {
  const d = lerp(8, 120, th); // depth in viewBox units
  return <svg width={w} height={w * 1.9} viewBox="0 0 320 610" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`bpf${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5a6070" /><stop offset=".5" stopColor="#262a34" /><stop offset="1" stopColor="#444a58" /></linearGradient>
      <linearGradient id={`bps${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3a3f4b" /><stop offset="1" stopColor="#1a1d24" /></linearGradient>
    </defs>
    {/* side (thickness) */}
    <path d={`M${200} 20 L${200 + d} ${20 + d * .5} L${200 + d} ${560 + d * .5} L200 560 Z`} fill={`url(#bps${id})`} />
    <path d={`M20 560 L200 560 L${200 + d} ${560 + d * .5} L${20 + d} ${560 + d * .5} Z`} fill="#15181e" />
    {[0.25, 0.5, 0.75].map(k => <line key={k} x1={200 + d * k} y1={20 + d * k * .5 + 30} x2={200 + d * k} y2={560 + d * k * .5 - 30} stroke="#000" strokeOpacity=".25" strokeWidth="2" />)}
    {/* front */}
    <rect x="0" y="0" width="220" height="560" rx="34" fill={`url(#bpf${id})`} />
    <rect x="10" y="10" width="200" height="540" rx="28" fill="#0b0d12" />
    <rect x="80" y="24" width="60" height="14" rx="7" fill="#000" />
    {/* battery icon on screen */}
    <g transform="translate(40 230)">
      <rect x="0" y="0" width="128" height="62" rx="12" fill="none" stroke="#c9d0dc" strokeWidth="6" />
      <rect x="130" y="20" width="10" height="22" rx="3" fill="#c9d0dc" />
      <rect x="8" y="8" width={112 * clamp(lvl)} height="46" rx="6" fill={GRN} />
    </g>
    <text x="110" y="350" textAnchor="middle" fontFamily="Int, sans-serif" fontWeight="800" fontSize="34" fill={WH}>30 kun</text>
  </svg>;
};

/* kitchen scale with a plate; reading string */
const Scale: React.FC<{ w: number; read: string; id: string; col?: string }> = ({ w, read, id, col = Y }) => (
  <svg width={w} height={w * .5} viewBox="0 0 400 200" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`sc${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#dfe4ec" /><stop offset="1" stopColor="#8b94a8" /></linearGradient></defs>
    <rect x="20" y="40" width="360" height="22" rx="11" fill={`url(#sc${id})`} />
    <path d="M60 62 L340 62 L320 190 L80 190 Z" fill="#1f232d" stroke="#3a3f4b" strokeWidth="3" />
    <rect x="120" y="95" width="160" height="66" rx="10" fill="#0a1a12" stroke="#2c5a3e" strokeWidth="3" />
    <text x="200" y="143" textAnchor="middle" fontFamily="JBM, monospace" fontWeight="700" fontSize="40" fill={col}>{read}</text>
  </svg>
);

const Bolt: React.FC<{ s: number; id: string }> = ({ s, id }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`bo${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE27A" /><stop offset="1" stopColor="#F2A81D" /></linearGradient>
      <filter id={`bog${id}`}><feGaussianBlur stdDeviation="6" /></filter></defs>
    <path d="M58 4 L20 56 L46 56 L38 96 L80 38 L54 38 Z" fill="#FFCF3A" opacity=".5" filter={`url(#bog${id})`} />
    <path d="M58 4 L20 56 L46 56 L38 96 L80 38 L54 38 Z" fill={`url(#bo${id})`} stroke="#fff6c8" strokeWidth="2" />
  </svg>
);

const Coin: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <defs><radialGradient id="cn7" cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#fff1b8" /><stop offset=".6" stopColor="#f2c14b" /><stop offset="1" stopColor="#b5841c" /></radialGradient></defs>
    <circle cx="50" cy="52" r="46" fill="#000" opacity=".3" /><circle cx="50" cy="50" r="46" fill="url(#cn7)" /><circle cx="50" cy="50" r="36" fill="none" stroke="#a87a18" strokeWidth="3" />
    <text x="50" y="62" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="34" fill="#7a5410">so‘m</text>
  </svg>
);

const Mom: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s * 1.25} viewBox="0 0 200 250" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="mmd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5B8CFF" /><stop offset="1" stopColor="#2f4fa8" /></linearGradient></defs>
    <path d="M20 250 Q20 150 100 145 Q180 150 180 250 Z" fill="url(#mmd)" />
    {[60, 100, 140].map(x => <circle key={x} cx={x} cy={205} r="7" fill="#9BE3FF" opacity=".7" />)}
    <circle cx="100" cy="95" r="48" fill="#e9b98d" />
    <path d="M46 98 Q44 36 100 34 Q156 36 154 98 Q150 60 100 58 Q50 60 46 98 Z" fill="#EC3A2C" />
    <path d="M46 98 Q40 140 62 150 L70 120 Z M154 98 Q160 140 138 150 L130 120 Z" fill="#EC3A2C" />
    {[70, 100, 130].map(x => <circle key={x} cx={x} cy={48} r="4" fill="#FFCF3A" />)}
    <path d="M78 84 Q86 78 94 84 M106 84 Q114 78 122 84" stroke="#3a2a20" strokeWidth="4" strokeLinecap="round" />
    <circle cx="86" cy="97" r="4" fill="#3a2a20" /><circle cx="114" cy="97" r="4" fill="#3a2a20" />
    <path d="M86 116 Q100 128 114 116" stroke="#3a2a20" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.65, .2, .3);
  const drain = 1 - P(t, -1, T.zaryadsiz);            // battery drains, then
  const full = eout(P(t, T.zaryadsiz, T.qanday));     // ...stays full: "zaryadsiz"
  const lvl = t < T.zaryadsiz ? lerp(1, .12, 1 - drain) : lerp(.12, 1, full);
  const cal = eback(P(t, T.oy1 - .2, T.oy1 + .25));
  return <Layer a={a} z={logZ(P(t, -1, 3.65), 1, 1.05)}>
    <Glow x={CX} y={1000} r={540} a={.95} col="61,220,132" />
    <div style={{ ...abs(CX - 150, 720) }}>
      <Phone w={300} id="s1"><div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}><div style={{ width: 230 }}><Battery w={230} lvl={lvl} id="s1b" /></div></div></Phone>
    </div>
    <Card x={SR - 230} y={760} w={190} a={cal} style={{ padding: 0, overflow: 'hidden', border: `2px solid ${RED}`, rotate: '6deg' }}>
      <div style={{ background: RED, padding: '6px 0', textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 26, color: WH }}>zaryadsiz</div>
      <div style={{ textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 96, color: Y, lineHeight: 1.05 }}>30</div>
      <div style={{ textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: WH, paddingBottom: 8 }}>kun</div>
    </Card>
    <Pill s="1 zaryad = 1 oy?" x={CX} y={1385} a={eout(P(t, T.qanday - .3, T.qanday + .1))} size={32} col={Y} />
    <Head t={t} t0={-1} t1={3.65} y={490} lines={[['telefon'], ['1 oy zaryadsiz?', 'y']]} size={96} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 3.6, 9.35, .3, .3);
  const fill = eio(P(t, T.batareyasi - .2, T.mah + .8));
  const day = eout(P(t, T.kunlik - .2, T.kunlik + .2));
  return <Layer a={a} z={logZ(P(t, 3.6, 9.35), 1, 1.03)}>
    <Glow x={CX} y={930} r={540} a={.9} col="61,220,132" />
    <div style={{ ...abs(CX - 300, 700) }}><Battery w={600} lvl={fill} id="s2" /></div>
    <Num v={`${fmt(5000 * fill)} mAh`} y={1030} a={eout(P(t, T.taxminan - .2, T.taxminan + .1))} size={118} col={Y} />
    <Src s="o‘rtacha smartfon: 5 291 mAh · Counterpoint Research · 01.2026" y={1170} a={eout(P(t, T.mah, T.mah + .4))} />
    <Pill s="≈ 19 Wh  =  1 kunlik zaryad" x={CX} y={1265} a={day} size={34} col={GRN} />
    <Src s="hisob: 5 000 mAh × 3,85 V ≈ 19 Wh (taxminan, kuniga 1 zaryad)" y={1335} a={eout(P(t, T.zaryad, T.zaryad + .4))} />
    <Head t={t} t0={3.6} t1={9.35} y={490} lines={[['bugungi batareya'], ['1 kunga yetadi', 'y']]} size={92} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 9.3, 12.9, .3, .3);
  const n = eio(P(t, T.chidashi, T.b30 + .7));
  return <Layer a={a} z={logZ(P(t, 9.3, 12.9), 1, 1.04)}>
    <Glow x={CX} y={960} r={560} a={.9} col="61,220,132" />
    <div style={{ ...abs(CX - 330, 750), width: 660, display: 'grid', gridTemplateColumns: 'repeat(10, 60px)', gap: '14px 6px', justifyContent: 'center' }}>
      {Array.from({ length: 30 }).map((_, i) => { const s = clamp(n * 30 - i); return <div key={i} style={{ opacity: s, scale: String(lerp(.4, 1, eback(s))) }}><Cell s={92} col={i === 0 ? Y : GRN} /></div>; })}
    </div>
    <Num v={`× ${Math.max(1, Math.round(30 * n))}`} y={1080} a={eout(P(t, T.batareya - .2, T.batareya + .1))} size={140} col={Y} />
    <Src s="hisob: 30 kun × 19 Wh ≈ 578 Wh" y={1240} a={eout(P(t, T.katta, T.katta + .4))} />
    <Stamp s="30 BARAVAR" x={CX} y={1340} t={t} t0={T.katta} t1={12.9} col={RED} size={50} rot={-4} />
    <Head t={t} t0={9.3} t1={12.9} y={490} lines={[['1 oy uchun —'], ['30 baravar katta', 'y']]} size={92} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 12.85, 17.05, .3, .3);
  const drop = eout(P(t, T.telefon2, T.kg1 + .1));
  const wh = eio(P(t, T.wh200 - .5, T.wh200 + .5));
  return <Layer a={a} z={logZ(P(t, 12.85, 17.05), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} />
    <div style={{ ...abs(CX - 130, lerp(560, 780, drop)), opacity: drop }}>
      <div style={{ width: 260, height: 170, borderRadius: 22, background: 'linear-gradient(180deg,#3a3f4b,#1a1d24)', border: '4px solid #c9d0dc', display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, color: WH, boxShadow: '0 20px 50px rgba(0,0,0,.6)' }}>1 kg</div>
    </div>
    <div style={{ ...abs(CX - 220, 950) }}><Scale w={440} read={drop > .95 ? '1,000 kg' : '0,000 kg'} id="s4" /></div>
    <div style={{ ...abs(CX - 20, 1150) }} />
    <Num v={`${Math.round(200 * wh)} Wh`} y={1185} a={eout(P(t, T.wh200 - .3, T.wh200))} size={110} col={Y} />
    <Src s="telefon batareyasi (LCO): 150–200 Wh/kg · batteryuniversity.com" y={1320} a={eout(P(t, T.wh200 + .2, T.wh200 + .6))} />
    <Pill s="ko‘pi bilan" x={CX} y={1385} a={eout(P(t, 14.85 - .2, 14.85 + .1))} size={28} col={ICE} dark />
    <Head t={t} t0={12.85} t1={17.05} y={490} lines={[['1 kg batareya'], ['= 200 Wh', 'y']]} size={92} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 17.0, 18.7, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={17.0} t1={18.7} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 18.65, 24.75, .3, .3);
  const th = eio(P(t, T.bunday, T.kg3 + .3));
  const kg = eio(P(t, T.qariyb - .2, T.kg3 + .6));
  const mel = eback(P(t, T.kichkina - .1, T.qovun + .2));
  const bag = eout(P(t, T.torva - .3, T.torva + .2));
  const shift = eio(P(t, T.kichkina - .2, T.kichkina + .4));
  return <Layer a={a} z={logZ(P(t, 18.65, 24.75), 1, 1.03)}>
    <Glow x={CX} y={980} r={560} a={.9} col="236,58,44" />
    <div style={{ ...abs(lerp(CX - 150, SL + 30, shift), 650), scale: String(lerp(1, .8, shift)), transformOrigin: '0 0' }}><BrickPhone w={280} th={th} id="s6" /></div>
    <div style={{ ...abs(SR - 330, 820), opacity: clamp(mel * 1.5), scale: String(Math.max(0, mel)) }}>
      <Melon w={300} id="s6m" />
      <div style={{ textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: Y, marginTop: 8 }}>kichkina qovun</div>
    </div>
    <div style={{ ...abs(CX - 25, 860), fontFamily: HEAD, fontWeight: 700, fontSize: 90, color: WH, opacity: clamp(mel) }}>≈</div>
    <Num v={kg > .98 ? '≈ 2,9 kg' : `${(lerp(.1, 2.9, kg)).toFixed(1).replace('.', ',')} kg`} y={1150} a={eout(P(t, T.qariyb - .3, T.qariyb))} size={130} col={RED} />
    <Src s="hisob: 578 Wh ÷ 200 Wh/kg ≈ 2,9 kg (bugun ≈ 0,1 kg)" y={1300} a={eout(P(t, T.kg3 + .2, T.kg3 + .6))} />
    <Pill s="cho‘ntakka emas — to‘rvaga" x={CX} y={1375} a={bag} size={32} col={Y} />
    <Head t={t} t0={18.65} t1={24.75} y={490} lines={[['bunday telefon'], ['qariyb 3 kg', 'r']]} size={96} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 24.7, 31.35, .3, .3);
  const card = eout(P(t, T.bitta - .3, T.bitta + .2));
  const v = eio(P(t, T.som375 - .5, T.som375 + .6));
  return <Layer a={a} z={logZ(P(t, 24.7, 31.35), 1, 1.03)}>
    <Glow x={CX} y={960} r={540} a={.85} col="61,220,132" />
    <div style={{ ...abs(CX - 90, 730), scale: String(eback(P(t, T.xosh - .1, T.evaziga + .2))) }}><Coin s={180} /></div>
    <Card x={SL + 50} y={950} w={SR - SL - 100} a={card} style={{ padding: '22px 28px', border: `2px solid ${GRN}` }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: GR, textAlign: 'center' }}>1 telefon · 1 oy zaryad</div>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 36, color: WH, textAlign: 'center', marginTop: 12 }}>0,58 kVt·soat × 650 so‘m</div>
    </Card>
    <Num v={`${Math.round(375 * v)} so‘m`} y={1140} a={eout(P(t, T.som375 - .4, T.som375 - .1))} size={130} col={GRN} />
    <Src s="tarif: 650 so‘m/kVt·soat (oyiga 200 gacha) · 1.06.2026 · spot.uz" y={1290} a={eout(P(t, T.som375 + .3, T.som375 + .7))} />
    <Stamp s="ATIGI" x={SR - 150} y={1350} t={t} t0={T.turadi} t1={31.35} col={Y} size={46} rot={-6} />
    <Head t={t} t0={24.7} t1={31.35} y={490} lines={[['evaziga tejaymiz'], ['oyiga 375 so‘m', 'g']]} size={90} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 31.3, 37.8, .3, .3);
  const cnt = eio(P(t, T.mln33 - .2, T.mln33 + 1.0));
  const sw = eio(P(t, T.oyiga - .3, T.kwh19 + .2));
  const kw = eio(P(t, T.kwh19 - .3, T.kwh19 + 1.0));
  const R = rnd(11);
  return <Layer a={a} z={logZ(P(t, 31.3, 37.8), 1, 1.03)}>
    <Glow x={CX} y={960} r={560} a={.85} col="91,140,255" />
    <div style={{ ...abs(SL + 20, 720), width: SR - SL - 40, height: 300, position: 'relative', opacity: 1 - clamp(sw * 3) }}>
      {Array.from({ length: 48 }).map((_, i) => { const s = clamp(cnt * 48 - i); return <div key={i} style={{ position: 'absolute', left: (i % 12) * 68 + R() * 6, top: Math.floor(i / 12) * 74 + R() * 6, opacity: s, scale: String(eout(s)) }}>
        <div style={{ width: 34, height: 60, borderRadius: 8, border: `3px solid ${i % 9 === 4 ? Y : '#c9d0dc'}`, background: '#0b0d12' }} /></div>; })}
    </div>
    <Num v={`${(33.3 * cnt).toFixed(1).replace('.', ',')} mln`} y={lerp(1040, 700, sw)} a={eout(P(t, T.mln33 - .3, T.mln33)) * (1 - sw * .0)} size={lerp(130, 80, sw)} col={WH} />
    <Src s="mobil internet abonentlari · 1.01.2026 · stat.uz" y={lerp(1180, 795, sw)} a={eout(P(t, T.mln33 + .2, T.mln33 + .6))} />
    <div style={{ ...abs(CX - 90, 850), opacity: clamp(sw * 2 - 1), scale: String(lerp(.5, 1, eback(clamp(sw * 2 - 1)))) }}><Bolt s={180} id="s8" /></div>
    <Num v={`≈ ${Math.round(19 * kw)} mln`} y={1050} a={eout(P(t, T.kwh19 - .3, T.kwh19))} size={120} col={Y} />
    <div style={{ ...abs(SL, 1175, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: WH, opacity: eout(P(t, T.kwh19, T.kwh19 + .3)) }}>kVt·soat har oy</div>
    <Src s="hisob: 33,3 mln × 0,58 kVt·soat ≈ 19 mln (taxminan)" y={1270} a={eout(P(t, T.kwh19 + .4, T.kwh19 + .8))} />
    <Head t={t} t0={31.3} t1={37.8} y={490} lines={[['butun mamlakat'], ['oyiga 19 mln kVt·soat', 'y']]} size={78} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 37.75, 41.6, .3, .3);
  const bub = eback(P(t, T.telefonni - .25, T.telefonni + .2));
  return <Layer a={a} z={logZ(P(t, 37.75, 41.6), 1, 1.04)}>
    <Glow x={CX} y={1050} r={520} a={.9} />
    <div style={{ ...abs(SL + 20, 1000) }}><Mom s={260} /></div>
    <div style={{ ...abs(SR - 300, 1010), rotate: '-8deg' }}><BrickPhone w={170} th={1} id="s9" /></div>
    <div style={{ ...abs(SL + 110, 720), width: 660, padding: '26px 30px', borderRadius: 30, background: WH, color: '#11141a', fontFamily: HEAD, fontWeight: 700, fontSize: 54, lineHeight: 1.1, textAlign: 'center', scale: String(Math.max(0, bub)), transformOrigin: '20% 100%', boxShadow: '0 20px 50px rgba(0,0,0,.5)', position: 'absolute' }}>
      «Telefonni qo‘y, bolam, ko‘zing charchaydi!»
      <div style={{ position: 'absolute', left: 80, bottom: -28, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${WH}` }} />
    </div>
    <Stamp s="3 KG BO‘LSA HAM" x={CX + 60} y={1375} t={t} t0={T.charchaydi} t1={41.6} col={RED} size={40} rot={-4} />
    <Head t={t} t0={37.75} t1={41.6} y={490} lines={[['onam'], ['baribir aytadi', 'y']]} size={92} />
  </Layer>;
};

const S10: React.FC<{ t: number }> = ({ t }) => <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['zaryadi tugaydigan'], ['do‘stga yuboring', 'y']]} />;

const HITS: [number, number, number][] = [[T.oy1, 8, 7], [T.mah, 10, 6], [T.katta, 10, 6], [T.wh200, 8, 7], [T.endi, 20, 5], [T.kg3, 14, 6], [T.qovun, 8, 7], [T.som375, 10, 6], [T.kwh19, 12, 6], [T.charchaydi, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9, S10]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1080} r={620} a={1} col="236,58,44" />
    <div style={{ ...abs(SL + 80, 780) }}><BrickPhone w={260} th={1} id="cv" /></div>
    <div style={{ ...abs(SR - 300, 1000) }}><Melon w={320} id="cvm" /></div>
    <div style={{ ...abs(CX + 30, 1010), fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: WH }}>≈</div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>agar… · telefon zaryadi</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>1 OY ZARYADSIZ<br />TELEFON?</div>
    <div style={{ ...abs(SL, 1430, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, lineHeight: 1.15, color: RED }}>QARIYB 3 KG<br /><span style={{ color: GRN }}>375 SO‘M TEJASH UCHUN</span></div>
    <div style={{ ...abs(SL, 1600, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>Counterpoint · Battery University · stat.uz · 2026</div>
  </AbsoluteFill>;
};
