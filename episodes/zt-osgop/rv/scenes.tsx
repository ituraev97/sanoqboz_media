import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { loadFont } from '@remotion/fonts';
loadFont({ family: 'Nun', url: staticFile('nunito-latin-900-italic.woff2'), weight: '900', style: 'italic' });
import { CX, SL, SR, Y, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, Background, Reel, ZtEnd } from '../kit';

/* ================= realistic phone (drawn) ================= */
const PW = 470, PH = 1016; // screen size
const Phone: React.FC<{ x?: number; y: number; a: number; tilt?: number; children: React.ReactNode; s?: number }> = ({ x = CX, y, a, tilt = 0, children, s = 1 }) => {
  if (a <= 0) return null;
  const k = eout(clamp(a));
  const tl = Math.max(-16, Math.min(16, tilt)); const i0 = Math.floor(tl * 2), fr = tl * 2 - i0; const i1 = Math.min(32, i0 + 1);
  const src = (i: number) => staticFile(`ip/ip_${String(i + 40).padStart(3, '0')}.png`);
  const rot = `rotateY(${tl}deg)`;
  return <div style={{ position: 'absolute', left: x, top: y - 73 + (1 - k) * 140, width: 700, height: 1200, translate: '-50% 0', opacity: clamp(a * 1.6), perspective: 1800, scale: String(s) }}>
    <div style={{ position: 'absolute', left: 97, top: 74, width: 506, height: 1052, borderRadius: 80, background: '#000', transform: rot, boxShadow: '0 50px 120px rgba(0,0,0,.85), 0 0 70px rgba(63,169,184,.14)' }} />
    <div style={{ position: 'absolute', left: 115, top: 92, width: PW, height: PH, borderRadius: 40, overflow: 'hidden', background: '#000', transform: rot }}>
      {children}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 44px 0 52px', fontFamily: SANS, fontWeight: 700, fontSize: 21, color: '#fff' }}>
        <span>9:41</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="24" height="15" viewBox="0 0 26 16">{[0, 1, 2, 3].map((i) => <rect key={i} x={i * 7} y={12 - i * 4} width="5" height={4 + i * 4} rx="1" fill="#fff" />)}</svg>
          <svg width="32" height="16" viewBox="0 0 34 17"><rect x="1" y="1" width="28" height="15" rx="4" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" /><rect x="4" y="4" width="20" height="9" rx="2" fill="#fff" /><rect x="31" y="6" width="2" height="5" rx="1" fill="#fff" fillOpacity=".5" /></svg>
        </span>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 72%, rgba(255,255,255,.04) 100%)', pointerEvents: 'none' }} />
    </div>
    <Img src={src(i0)} style={{ position: 'absolute', inset: 0, width: 700, height: 1200 }} />
    {fr > .01 && <Img src={src(i1)} style={{ position: 'absolute', inset: 0, width: 700, height: 1200, opacity: fr }} />}
  </div>;
};
const AppBg: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  <div style={{ position: 'absolute', inset: 0, background: '#000', paddingTop: 80, fontFamily: SANS, color: '#fff' }}>{children}</div>;
const Tap: React.FC<{ t: number; t0: number; x: number; y: number }> = ({ t, t0, x, y }) => {
  const p = P(t, t0, t0 + .55); if (p <= 0 || p >= 1) return null;
  return <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', width: 40 + 90 * eout(p), height: 40 + 90 * eout(p), borderRadius: '50%', border: '4px solid #fff', background: `rgba(255,255,255,${.3 * (1 - p)})`, opacity: 1 - p }} />;
};

/* --- Yandex Pro goals screens (redrawn from the real app) --- */
const AMT = (col: string, stroke: string, size: number): React.CSSProperties => ({ fontFamily: 'Nun', fontStyle: 'italic', fontWeight: 900, fontSize: size, color: col, WebkitTextStroke: `${size * .16}px ${stroke}`, paintOrder: 'stroke fill', letterSpacing: -size * .04, lineHeight: .95, whiteSpace: 'nowrap', textShadow: `0 ${size * .06}px 0 ${stroke}` });
const Back = () => <svg width="26" height="26" viewBox="0 0 24 24" style={{ position: 'absolute', left: 30, top: 74 }}><path d="M20 12H5M11 5l-7 7 7 7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Ring: React.FC<{ x: number; y: number; r: number; p: number; col: string; children?: React.ReactNode }> = ({ x, y, r, p, col, children }) => {
  const w = 24, C = 2 * Math.PI * r;
  return <div style={{ position: 'absolute', left: x - r - w, top: y - r - w, width: 2 * (r + w), height: 2 * (r + w) }}>
    <svg width={2 * (r + w)} height={2 * (r + w)} style={{ position: 'absolute' }}>
      <circle cx={r + w} cy={r + w} r={r} stroke="rgba(255,255,255,.1)" strokeWidth={w} fill="rgba(14,16,22,.92)" />
      <circle cx={r + w} cy={r + w} r={r} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform={`rotate(-90 ${r + w} ${r + w})`} style={{ filter: `drop-shadow(0 0 12px ${col})` }} />
    </svg>
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>{children}</div>
  </div>;
};

/* ================= Yandex Pro-like screens ================= */
const C1 = '#1c1c1e';
const Chk: React.FC<{ on?: boolean; lock?: boolean; s?: number }> = ({ on = true, lock = false, s = 26 }) => lock
  ? <svg width={s} height={s} viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2" fill="#8e8e93" /><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#8e8e93" strokeWidth="2.2" fill="none" /></svg>
  : <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill={on ? Y : '#3a3a3c'} /><path d="M7 12.5l3.2 3.2L17 9" stroke="#111" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Scr: React.FC<{ children: React.ReactNode }> = ({ children }) => <div style={{ position: 'absolute', inset: 0, background: '#000', fontFamily: SANS, color: '#fff' }}>{children}</div>;
const Title: React.FC<{ s: string; badge?: React.ReactNode }> = ({ s, badge }) => <div style={{ position: 'absolute', left: 24, right: 24, top: 86, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><div style={{ fontSize: 31, fontWeight: 700 }}>{s}</div>{badge}</div>;

const MainScr: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const k = eout(P(t, t0 + .2, t0 + .7));
  const pulse = 1 + .03 * Math.sin((t - t0) * 6);
  return <Scr>
    <svg width={PW} height={560} style={{ position: 'absolute', left: 0, top: 0 }}>
      <rect width={PW} height={560} fill="#20232b" />
      {[[-40, 120, 520, 40], [-40, 300, 520, 260], [60, -20, 170, 600], [300, -20, 420, 600], [-40, 470, 520, 400]].map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#3a3f4c" strokeWidth={i % 2 ? 16 : 10} />)}
      <circle cx={235} cy={300} r={60} fill="rgba(63,169,184,.12)" />
      <path d="M235 270l22 52-22-12-22 12z" fill="#fff" />
    </svg>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 470, bottom: 0, background: '#000', borderRadius: '28px 28px 0 0', padding: '20px 16px', translate: `0 ${(1 - k) * 60}px` }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, background: C1, borderRadius: 18, padding: '14px 16px' }}><div style={{ fontSize: 14, color: '#aaa' }}>Ustuvorlik</div><div style={{ fontSize: 26, fontWeight: 700 }}>+52</div></div>
        <div style={{ flex: 1, background: C1, borderRadius: 18, padding: '14px 16px' }}><div style={{ fontSize: 14, color: '#aaa' }}>Bugungi daromad</div><div style={{ fontSize: 26, fontWeight: 700 }}>0 so‘m</div></div>
      </div>
      <div style={{ marginTop: 10, background: C1, borderRadius: 18, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontSize: 18, fontWeight: 600 }}>Shahardagi bonuslar</div><div style={{ fontSize: 13, color: '#aaa' }}>bugun · 08:00–22:00</div></div><div style={{ fontSize: 19, fontWeight: 700 }}>54 000 so‘m</div></div>
      <div style={{ marginTop: 10, background: C1, borderRadius: 18, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div style={{ fontSize: 18, fontWeight: 600 }}>Maqsadlarim</div><div style={{ fontSize: 15, color: '#aaa' }}>2 ta faol</div></div>
      <div style={{ marginTop: 18, height: 64, borderRadius: 20, background: Y, color: '#111', display: 'grid', placeItems: 'center', fontSize: 21, fontWeight: 700, scale: String(pulse) }}>Liniyaga chiqish</div>
    </div>
  </Scr>;
};

const PrioScr: React.FC<{ t: number; t0: number; tOn: number }> = ({ t, t0, tOn }) => {
  const on = eout(P(t, tOn, tOn + .35)); const v = Math.round(lerp(52, 56, eio(P(t, tOn + .2, tOn + .9))));
  const R = 70, Cc = 2 * Math.PI * R; const arc = v / 82;
  const rows = (k: number) => eout(P(t, t0 + .3 + k * .12, t0 + .65 + k * .12));
  const Row = ({ l, r, i, lock, hi }: { l: string; r: string; i: number; lock?: boolean; hi?: number }) =>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 14, background: hi ? `rgba(247,198,75,${.12 * hi})` : 'transparent', border: `2px solid rgba(247,198,75,${hi || 0})`, opacity: rows(i), translate: `0 ${(1 - rows(i)) * 16}px` }}>
      <Chk lock={lock} /><div style={{ flex: 1, fontSize: 17 }}>{l}</div><div style={{ fontSize: 18, fontWeight: 700, color: hi ? Y : '#fff' }}>{r}</div></div>;
  return <Scr>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', fontSize: 18, fontWeight: 600 }}>Ustuvorlik</div>
    <svg width="200" height="200" style={{ position: 'absolute', left: PW / 2 - 100, top: 112 }}>
      <circle cx="100" cy="100" r={R} stroke="#2c2c2e" strokeWidth="16" fill="none" />
      <circle cx="100" cy="100" r={R} stroke={Y} strokeWidth="16" fill="none" strokeLinecap="round" strokeDasharray={Cc} strokeDashoffset={Cc * (1 - arc)} transform="rotate(-90 100 100)" style={{ filter: `drop-shadow(0 0 ${8 * on}px ${Y})` }} />
    </svg>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 178, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, lineHeight: 1 }}>{v}</div>
    <div style={{ position: 'absolute', left: PW / 2 + 56, top: 118 - on * 14, fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: Y, opacity: on * (1 - eout(P(t, tOn + 1.6, tOn + 2))) }}>+4</div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 330, background: C1, borderRadius: 20, padding: '14px 8px' }}>
      <div style={{ fontSize: 18, fontWeight: 700, padding: '4px 12px 8px' }}>Darajangizni 82 ga oshiring</div>
      <Row l="Mashina brendingi" r="+18" i={0} lock />
      <Row l="OSGOP polisi" r="+4" i={1} lock={on < .5} hi={on} />
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 520, background: C1, borderRadius: 20, padding: '14px 8px' }}>
      <div style={{ fontSize: 18, fontWeight: 700, padding: '4px 12px 8px' }}>Olinganlar</div>
      <Row l="Qabul qilingan buyurtmalar" r="+28" i={2} />
      <Row l="Avtomobilning yili" r="+15" i={3} />
      <Row l="Reyting 4,95 dan yuqori" r="+9" i={4} />
    </div>
  </Scr>;
};

const BalScr: React.FC<{ t: number; t0: number; tTop: number; tGift: number }> = ({ t, t0, tTop, tGift }) => {
  const top = eout(P(t, tTop, tTop + .35)), gift = eback(P(t, tGift, tGift + .45));
  const val = lerp(0, 100000, eio(P(t, tTop + .1, tTop + .8))) + lerp(0, 10000, eio(P(t, tGift + .2, tGift + .8)));
  const g = t > tGift + .2;
  return <Scr>
    <Title s="Balans" badge={<div style={{ padding: '5px 12px', borderRadius: 14, background: Y, color: '#111', fontSize: 15, fontWeight: 800, opacity: eout(P(t, t0 + .4, t0 + .7)) }}>+10%</div>} />
    <div style={{ position: 'absolute', left: 14, right: 14, top: 150, background: C1, borderRadius: 20, padding: '16px 18px', border: `2px solid ${g ? Y : 'transparent'}`, boxShadow: g ? '0 0 30px rgba(247,198,75,.3)' : 'none' }}>
      <div style={{ fontSize: 14, color: '#aaa' }}>Hisob balansi</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.1, color: g ? Y : '#fff', whiteSpace: 'nowrap' }}>{fmt(Math.round(val / 1000) * 1000)} <span style={{ fontSize: 26 }}>so‘m</span></div>
      <div style={{ fontSize: 13, color: '#8e8e93' }}>Taksopark · ZERO TAXI PLUS</div>
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 300, background: C1, borderRadius: 18, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, opacity: top, translate: `0 ${(1 - top) * 20}px` }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2c2c2e', display: 'grid', placeItems: 'center', fontSize: 26 }}>+</div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 18, fontWeight: 600 }}>Balansni to‘ldirish</div><div style={{ fontSize: 13, color: '#aaa' }}>siz to‘ldirdingiz</div></div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>+100 000</div>
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 392, background: Y, color: '#111', borderRadius: 18, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, opacity: clamp(gift), scale: String(lerp(.8, 1, gift)), boxShadow: '0 10px 40px rgba(247,198,75,.4)' }}>
      <svg width="36" height="36" viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" rx="2" fill="#111" /><rect x="2" y="6" width="20" height="4" rx="1" fill="#111" /><path d="M12 6v15" stroke={Y} strokeWidth="2" /><path d="M12 6c-2-4-6-3-5 0M12 6c2-4 6-3 5 0" stroke="#111" strokeWidth="2" fill="none" /></svg>
      <div style={{ flex: 1 }}><div style={{ fontSize: 18, fontWeight: 800 }}>Parkdan sovg‘a · +10%</div><div style={{ fontSize: 13 }}>ZERO TAXI PLUS</div></div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>+10 000</div>
    </div>
  </Scr>;
};

const WdScr: React.FC<{ t: number; t0: number; tTap: number }> = ({ t, t0, tTap }) => {
  const v = lerp(0, 5000000, eio(P(t, t0 + .4, t0 + 1.6)));
  const cd = P(t, tTap + .2, tTap + 2.1); const done = t > tTap + 2.1;
  const sec = Math.max(1, 5 - Math.floor(cd * 5)); const dk = eback(P(t, tTap + 2.1, tTap + 2.5));
  const R = 46, Cc = 2 * Math.PI * R;
  const row = (l: string, r: string, i: number) => { const k = eout(P(t, t0 + .6 + i * .15, t0 + .95 + i * .15)); return <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 4px', opacity: k }}><Chk /><div style={{ flex: 1, fontSize: 18 }}>{l}</div><div style={{ fontSize: 19, fontWeight: 700, color: Y }}>{r}</div></div>; };
  return <Scr>
    <Title s="Pul yechish" />
    <div style={{ position: 'absolute', left: 14, right: 14, top: 150, background: C1, borderRadius: 20, padding: '16px 18px' }}>
      <div style={{ fontSize: 14, color: '#aaa' }}>Bugungi daromad</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 56, lineHeight: 1.1, whiteSpace: 'nowrap' }}>{fmt(Math.round(v))} <span style={{ fontSize: 24 }}>so‘m</span></div>
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 282, background: C1, borderRadius: 20, padding: '6px 14px' }}>
      {row('Limit', 'yo‘q', 0)}{row('Komissiya', '0%', 1)}
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 420, height: 62, borderRadius: 20, background: Y, color: '#111', display: 'grid', placeItems: 'center', fontSize: 21, fontWeight: 700, scale: String(t > tTap && t < tTap + .18 ? .95 : 1) }}>{done ? 'Yechildi' : 'Kartaga yechish'}</div>
    <Tap t={t} t0={tTap} x={PW / 2} y={451} />
    {t > tTap + .2 && <div style={{ position: 'absolute', left: PW / 2 - 70, top: 520, width: 140, height: 140 }}>
      <svg width="140" height="140"><circle cx="70" cy="70" r={R} stroke="#2c2c2e" strokeWidth="9" fill="none" /><circle cx="70" cy="70" r={R} stroke={done ? GRN : Y} strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray={Cc} strokeDashoffset={Cc * (done ? 0 : 1 - cd)} transform="rotate(-90 70 70)" /></svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>{done
        ? <svg width="60" height="60" viewBox="0 0 24 24" style={{ scale: String(dk) }}><path d="M5 12.5l4.5 4.5L19 7.5" stroke={GRN} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: Y }}>{sec}</div>}</div>
    </div>}
    <div style={{ position: 'absolute', left: 0, right: 0, top: 672, textAlign: 'center', fontSize: 20, fontWeight: 700, color: done ? GRN : '#aaa' }}>{done ? 'Pul kartada!' : t > tTap + .2 ? 'soniya' : ''}</div>
  </Scr>;
};

const BonScr: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const c = eout(P(t, t0 + .2, t0 + .6)); const r1 = eout(P(t, t0 + .7, t0 + 1.0)); const r2 = eout(P(t, t0 + 1.0, t0 + 1.3));
  const z = eback(P(t, t0 + 1.4, t0 + 1.8));
  return <Scr>
    <Title s="Bonuslar" />
    <div style={{ position: 'absolute', left: 14, right: 14, top: 150, height: 150, borderRadius: 21, overflow: 'hidden', background: 'linear-gradient(90deg,#C6801A 0%,#9a6212 45%,#3a2a14 85%,#231d16 100%)', opacity: c, translate: `0 ${(1 - c) * 20}px` }}>
      <div style={{ position: 'absolute', left: 18, top: 22, fontSize: 21, fontWeight: 600 }}>Yandex bonusi</div>
      <div style={{ position: 'absolute', left: 18, top: 50, fontSize: 16 }}>120 ta buyurtma uchun</div>
      <div style={{ position: 'absolute', left: 18, bottom: 22, ...AMT('#fff', '#1a1208', 34) }}>+1 000 000 so‘m</div>
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 318, background: C1, borderRadius: 20, padding: '8px 18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #2c2c2e', opacity: r1 }}>
        <span style={{ fontSize: 18 }}>Park komissiyasi</span>
        <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: GRN, scale: String(lerp(1, 1.15, z * (1 - P(t, t0 + 2, t0 + 2.4)))) }}>0 so‘m</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', opacity: r2 }}>
        <span style={{ fontSize: 18 }}>Sizga tushadi</span>
        <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30 }}>1 000 000 so‘m</span>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 500, padding: '16px 18px', borderRadius: 18, border: `2px solid ${GRN}`, background: 'rgba(61,220,132,.08)', display: 'flex', gap: 14, alignItems: 'center', opacity: clamp(z), scale: String(lerp(.85, 1, z)) }}>
      <Chk />
      <div style={{ fontSize: 17, lineHeight: 1.3 }}>Zero Taxi Yandex bonuslaridan<br /><b>hech qanday foiz olmaydi</b></div>
    </div>
  </Scr>;
};

/* ================= scenes ================= */
const PY = 650;
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.5, .3, .3);
  return <Layer a={a}>
    <Glow x={CX} y={1050} r={560} a={.9} col="63,169,184" />
    <Phone y={PY} a={P(t, .05, .5)} tilt={lerp(-12, -5, eout(P(t, 0, 3.5)))}><MainScr t={t} t0={.1} /></Phone>
    <Head t={t} t0={-1} t1={1.7} y={430} lines={[['yandex taxi’da'], ['ishlaysizmi?', 'y']]} size={70} />
    <Head t={t} t0={1.7} t1={3.5} y={430} lines={[['ko‘proq daromad'], ['xohlaysizmi?', 'y']]} size={70} />
  </Layer>;
};
const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 3.4, 8.2, .3, .3);
  return <Layer a={a}>
    <Glow x={CX} y={1050} r={560} a={.9} col={t > 6.2 ? '247,198,75' : '63,169,184'} />
    <Phone y={PY} a={P(t, 3.4, 3.9)} tilt={lerp(10, 4, eout(P(t, 3.4, 8.1)))}><PrioScr t={t} t0={3.5} tOn={6.2} /></Phone>
    <Head t={t} t0={3.4} t1={8.2} y={430} lines={[['bepul osgop polisi —'], ['+4 ustuvorlik', 'y']]} size={64} />
  </Layer>;
};
const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 8.1, 14.2, .3, .3);
  return <Layer a={a}>
    <Glow x={CX} y={1050} r={560} a={.9} col="247,198,75" />
    <Phone y={PY} a={P(t, 8.1, 8.6)} tilt={lerp(-10, -4, eout(P(t, 8.1, 14.1)))}><BalScr t={t} t0={8.2} tTop={9.6} tGift={12.5} /></Phone>
    <Head t={t} t0={8.1} t1={14.2} y={430} lines={[['balansni to‘ldirsangiz —'], ['+10% parkdan', 'y']]} size={62} />
  </Layer>;
};
const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 14.1, 20.3, .3, .3);
  return <Layer a={a}>
    <Glow x={CX} y={1050} r={560} a={.9} col={t > 19.7 ? '61,220,132' : '63,169,184'} />
    <Phone y={PY} a={P(t, 14.1, 14.6)} tilt={lerp(10, 4, eout(P(t, 14.1, 20.2)))}><WdScr t={t} t0={14.2} tTap={17.6} /></Phone>
    <Head t={t} t0={14.1} t1={20.3} y={430} lines={[['pul yechish —'], ['limitsiz va foizsiz', 'y']]} size={64} />
  </Layer>;
};
const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 20.2, 23.5, .3, .3);
  return <Layer a={a}>
    <Glow x={CX} y={1050} r={560} a={.9} col="61,220,132" />
    <Phone y={PY} a={P(t, 20.2, 20.7)} tilt={lerp(-10, -4, eout(P(t, 20.2, 23.4)))}><BonScr t={t} t0={20.3} /></Phone>
    <Head t={t} t0={20.2} t1={23.5} y={430} lines={[['yandex bonuslaridan —'], ['0% komissiya', 'g']]} size={64} />
  </Layer>;
};
const End: React.FC<{ t: number }> = ({ t }) => <ZtEnd t={t} t0={23.4}
  perks={['Bepul OSGOP · +4 ustuvorlik', '+10% balansga bonus', 'Pul yechish · limitsiz, 0%', 'Yandex bonuslaridan 0% komissiya']} />;

const HITS: [number, number, number][] = [[6.2, 9, 7], [12.5, 8, 7], [19.7, 8, 7], [21.7, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, End]} hits={HITS} />;

export const Cover: React.FC = () =>
  <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1250} r={620} a={1} col="247,198,75" />
    <Phone y={760} a={1} tilt={-8}><PrioScr t={9} t0={0} tOn={1} /></Phone>
    <div style={{ ...abs(SL, 230, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 380, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 96, lineHeight: 1.02, ...yel }}>OSGOP BEPUL</div>
    <div style={{ ...abs(SL, 500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 70, color: WH }}>+4 USTUVORLIK</div>
  </AbsoluteFill>;
