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
const Goals: React.FC<{ t: number; t0: number; fill?: number; big?: number; bigCol?: string; dim?: number; top?: number; topCol?: string }> = ({ t, t0, fill = 0, big = 800000, bigCol = '#fff', dim = 0, top = 1000000, topCol = '#93A6FF' }) => {
  const c1 = eout(P(t, t0 + .1, t0 + .45)), c2 = eout(P(t, t0 + .3, t0 + .65)), c3 = eout(P(t, t0 + .5, t0 + .9));
  const done = fill >= 1;
  return <div style={{ position: 'absolute', inset: 0, background: '#000', fontFamily: SANS, color: '#fff' }}>
    <Back />
    <div style={{ position: 'absolute', right: 20, top: 70, height: 34, padding: '0 15px', borderRadius: 17, background: '#2a2a2a', display: 'grid', placeItems: 'center', fontSize: 15, fontWeight: 500 }}>Arxiv</div>
    <div style={{ position: 'absolute', left: 22, top: 130, fontSize: 31, fontWeight: 700, letterSpacing: -.3 }}>Maqsadlarim</div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 182, height: 168, borderRadius: 21, background: '#1c1c1e', opacity: c1, translate: `0 ${(1 - c1) * 24}px` }}>
      <div style={{ position: 'absolute', left: 16, top: 16, fontSize: 21, fontWeight: 600 }}>40 ta buyurtma</div>
      <div style={{ position: 'absolute', left: 16, top: 44, fontSize: 16, color: '#d8d8d8', lineHeight: 1.2, width: 150 }}>haftalik, 27-noyabr gacha</div>
      <div style={{ position: 'absolute', right: 14, top: 34, ...AMT(topCol, '#141832', 29) }}>+{fmt(Math.round(top / 1000) * 1000)} so‘m</div>
      <div style={{ position: 'absolute', left: 16, right: 16, top: 98, height: 5, borderRadius: 3, background: '#3a3a3c', overflow: 'hidden' }}><div style={{ width: `${fill * 100}%`, height: '100%', background: done ? '#3DDC84' : '#93A6FF' }} /></div>
      <div style={{ position: 'absolute', left: 16, top: 120, height: 29, padding: '0 11px', borderRadius: 15, border: `1.5px solid ${done ? '#3DDC84' : '#4a4a4c'}`, display: 'grid', placeItems: 'center', fontSize: 13, color: done ? '#3DDC84' : '#a8a8a8' }}>{done ? 'Maqsad bajarildi · 40/40' : 'Barcha talablar bajarildi'}</div>
    </div>
    <div style={{ position: 'absolute', left: 14, right: 14, top: 366, height: 135, borderRadius: 21, overflow: 'hidden', background: 'linear-gradient(90deg,#C6801A 0%,#9a6212 45%,#3a2a14 85%,#231d16 100%)', opacity: c2 * (1 - dim * .5), translate: `0 ${(1 - c2) * 24}px` }}>
      <div style={{ position: 'absolute', left: 16, top: 22, fontSize: 21, fontWeight: 600, whiteSpace: 'nowrap' }}>Maqsadni tanlang</div>
      <div style={{ position: 'absolute', left: 16, top: 48, fontSize: 16, whiteSpace: 'nowrap' }}>Brendlash talab etiladi</div>
      <div style={{ position: 'absolute', right: 14, top: 16, textAlign: 'right', ...AMT(bigCol, '#1a1208', 26) }}>{fmt(Math.round(big / 1000) * 1000)} so‘m<br />gacha</div>
      <div style={{ position: 'absolute', left: 12, right: 12, top: 77, height: 43, borderRadius: 12, background: '#fff', color: '#111', display: 'grid', placeItems: 'center', fontSize: 16, fontWeight: 500 }}>Batafsil</div>
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 690, textAlign: 'center', opacity: c3 }}>
      <svg width="96" height="96" viewBox="0 0 96 96"><g transform="rotate(-14 48 48)"><rect x="22" y="14" width="52" height="68" rx="8" fill="#7FD08A" stroke="#1d3b22" strokeWidth="4" /><path d="M22 40h52M48 14v68" stroke="#1d3b22" strokeWidth="3" opacity=".5" /><circle cx="48" cy="48" r="11" fill="#D9F5DD" stroke="#1d3b22" strokeWidth="3" /></g></svg>
      <div style={{ marginTop: 22, fontSize: 20.5, fontWeight: 600 }}>Buyurtmalar ko‘paysa, daromad oshadi</div>
      <div style={{ marginTop: 6, fontSize: 12.5, color: '#bdbdbd', lineHeight: 1.35, padding: '0 10px' }}>Liniyadagi daromadingizni oshiring – ko‘proq buyurtmalarni bajaring<br />va safar maqsadlarini o‘tkazib yubormang</div>
    </div>
  </div>;
};
const GoalDetail: React.FC<{ t: number; t0: number; amount?: number; done?: boolean }> = ({ t, t0, amount = 1000000, done = true }) => {
  const h = eback(P(t, t0 + .15, t0 + .6));
  return <div style={{ position: 'absolute', inset: 0, background: '#000', fontFamily: SANS, color: '#fff' }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 410, background: 'linear-gradient(180deg,#000 0%,#0d1033 22%,#3340a0 52%,#232a6e 72%,#0b0c18 100%)' }} />
    <Back />
    <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', rotate: '-4deg', scale: String(lerp(.6, 1, h)), opacity: clamp(h * 2) }}>
      <div style={{ ...AMT('#fff', '#10133a', 24), display: 'inline-block', translate: '-140px 12px' }}>MAQSAD</div>
      <div style={AMT('#fff', '#10133a', 52)}>{fmt(amount)} so‘m</div>
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 276, textAlign: 'center' }}>
      <div style={{ fontSize: 26, fontWeight: 500 }}>40 ta buyurtma uchun</div>
      <div style={{ fontSize: 14, marginTop: 4, color: '#e3e3ef' }}>27 noyabr gacha (shu kuni ham) · yana 1 kun</div>
    </div>
    <div style={{ position: 'absolute', left: 17, right: 17, top: 422, height: 73, borderRadius: 19, background: '#1c1c1e', padding: '15px 22px' }}>
      <div style={{ fontSize: 17, fontWeight: 500 }}>Maqsadni o‘zgartirishingiz mumkin</div>
      <div style={{ fontSize: 13.5, color: '#d0d0d0', marginTop: 3 }}>Birinchi safargacha</div>
      <svg width="16" height="16" viewBox="0 0 24 24" style={{ position: 'absolute', right: 26, top: 28 }}><path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" /></svg>
    </div>
    <div style={{ position: 'absolute', left: 17, right: 17, top: 510, height: 95, borderRadius: 19, background: '#1c1c1e', padding: '18px 18px' }}>
      <div style={{ fontSize: 22.5, fontWeight: 600, color: done ? '#3DDC84' : '#fff' }}>{done ? 'Maqsad bajarildi' : 'Hali boshlamadingiz'}</div>
      <div style={{ fontSize: 13.5, color: '#d0d0d0', marginTop: 3 }}>{done ? '40/40 bajarildi' : '0/40 bajarildi'}</div>
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16, height: 5, borderRadius: 3, background: '#3a3a3c' }}><div style={{ width: done ? '100%' : '0%', height: '100%', borderRadius: 3, background: '#3DDC84' }} /></div>
    </div>
    <div style={{ position: 'absolute', left: 17, right: 17, top: 621, height: 241, borderRadius: 19, background: '#1c1c1e', padding: '22px 18px' }}>
      <div style={{ fontSize: 16.5, fontWeight: 600 }}>Maqsadlar haqida</div>
      <div style={{ fontSize: 15.5, color: '#9a9a9e', marginTop: 20, lineHeight: 1.3 }}>Maqsad tanlandi. Uni birinchi buyurtmagacha o‘zgartirish mumkin.</div>
      <div style={{ fontSize: 15.5, color: '#9a9a9e', marginTop: 18, lineHeight: 1.3 }}>Amalga oshirilgan maqsad balansda va ish haqida 28-noyabr kuni ko‘rinadi.</div>
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 22, borderTop: '1px solid #333', paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 15.5 }}><span>Balansda ko‘rinadi</span><span>28-noyabr, 15:00 gacha</span></div>
    </div>
    <div style={{ position: 'absolute', left: 17, right: 17, top: 876, height: 200, borderRadius: 19, background: '#1c1c1e', padding: '20px 18px' }}>
      <div style={{ fontSize: 16.5, fontWeight: 600 }}>Talablar</div>
      <div style={{ marginTop: 22, marginLeft: 44, fontSize: 11, color: '#8e8e93' }}>Faol tariflar</div>
      <div style={{ marginLeft: 44, fontSize: 16, marginTop: 2 }}>Komfort+, Elektro</div>
    </div>
  </div>;
};

/* --- withdrawal screen --- */
const Withdraw: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const tap = t0 + 1.0, done = t0 + 2.2;
  const prog = clamp((t - tap) / (done - tap));
  const ok = t >= done;
  const okK = eback(P(t, done, done + .4));
  return <AppBg>
    <div style={{ padding: '0 30px' }}>
      <div style={{ fontSize: 44, fontWeight: 800, marginTop: 30 }}>Pul yechish</div>
      <div style={{ marginTop: 24, borderRadius: 30, background: '#1f1f1f', padding: '24px 28px' }}>
        <div style={{ fontSize: 22, color: '#aaa' }}>Balans</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 56, whiteSpace: 'nowrap' }}>{fmt(ok ? 0 : 1250000)} so‘m</div>
      </div>
      <div style={{ marginTop: 16, borderRadius: 30, background: '#1f1f1f', padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 70, height: 46, borderRadius: 8, background: 'linear-gradient(135deg,#3FA9B8,#2C8290)' }} />
        <div><div style={{ fontSize: 24, fontWeight: 700, whiteSpace: 'nowrap' }}>Karta •••• 4417</div><div style={{ fontSize: 20, color: '#aaa' }}>komissiya 0 so‘m</div></div>
      </div>
      <div style={{ position: 'relative', marginTop: 26, height: 92, borderRadius: 26, background: Y, color: '#111', display: 'grid', placeItems: 'center', fontSize: 27, fontWeight: 800, overflow: 'hidden', whiteSpace: 'nowrap', scale: String(t > tap && t < tap + .2 ? .96 : 1) }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${prog * 100}%`, background: 'rgba(0,0,0,.12)' }} />
        <span style={{ position: 'relative' }}>{t < tap ? 'Yechish — 1 250 000 so‘m' : ok ? 'Bajarildi' : `Yuborilmoqda… ${Math.max(1, Math.ceil(5 - prog * 5))} s`}</span>
      </div>
      <Tap t={t} t0={tap} x={PW / 2} y={560} />
      {ok && <div style={{ position: 'absolute', left: 20, right: 20, top: 120, height: 470, borderRadius: 36, background: 'rgba(16,20,18,.97)', border: `2px solid ${GRN}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, scale: String(lerp(.6, 1, okK)), opacity: clamp(okK) }}>
        <div style={{ width: 150, height: 150, borderRadius: '50%', background: GRN, display: 'grid', placeItems: 'center', boxShadow: '0 0 50px rgba(61,220,132,.5)' }}>
          <svg width="90" height="90" viewBox="0 0 64 64"><path d="M14 33l12 12 24-26" fill="none" stroke="#06210f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ fontSize: 34, fontWeight: 800 }}>Pul kartaga tushdi</div>
        <div style={{ fontSize: 24, color: '#aaa' }}>5 soniyada · komissiyasiz</div>
      </div>}
    </div>
  </AppBg>;
};

/* --- support chat screen --- */
const Chat: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const msgs: [number, boolean, string, string][] = [[.3, false, 'Assalomu alaykum, kartaga pul yechsam bo‘ladimi?', '02:14'], [1.0, true, 'Va alaykum assalom! Albatta — 5 soniyada, komissiyasiz.', '02:14'], [1.8, false, 'Здравствуйте, как подключиться?', '02:15'], [2.5, true, 'Здравствуйте! 2 минуты, в офис ехать не нужно.', '02:15']];
  return <AppBg>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 26px 18px', borderBottom: '1px solid #222' }}>
      <div style={{ width: 62, height: 62, borderRadius: '50%', background: `linear-gradient(135deg,${TEAL},${Y})`, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontSize: 26, color: '#111' }}>ZT</div>
      <div><div style={{ fontSize: 28, fontWeight: 800 }}>Zero Taxi</div><div style={{ fontSize: 20, color: GRN }}>onlayn · 24/7</div></div>
    </div>
    <div style={{ padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {msgs.map(([d, me, s, tm], i) => { const k = eout(P(t, t0 + d, t0 + d + .3)); if (k <= 0) return null;
        return <div key={i} style={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: 360, opacity: k, translate: `0 ${(1 - k) * 20}px`, padding: '16px 20px', borderRadius: me ? '26px 26px 6px 26px' : '26px 26px 26px 6px', background: me ? TEAL : '#262626', color: me ? '#051b1e' : '#fff', fontSize: 25, fontWeight: 600, lineHeight: 1.3 }}>
          {s}<div style={{ fontSize: 16, opacity: .6, textAlign: 'right', marginTop: 4 }}>{tm}</div></div>; })}
    </div>
  </AppBg>;
};

/* ================= scenes ================= */
const PY = 650;

const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 4.6, .2, .25);
  const cut = eio(P(t, 2.5, 3.2));
  const v = lerp(1000000, 970000, eout(P(t, 2.9, 3.6)));
  return <Layer a={a}>
    <Glow x={CX} y={1050} r={560} a={.9} col={t > 2.9 ? '236,58,44' : '247,198,75'} />
    <Phone y={PY} a={P(t, 0, .6)} tilt={lerp(-14, -6, eout(P(t, 0, 4.5)))}><Goals t={t} t0={.1} fill={.15} top={v} topCol={t > 2.9 ? '#FF8A80' : '#93A6FF'} /></Phone>
    {cut > 0 && cut < 1 && <div style={{ position: 'absolute', left: lerp(CX + 150, SR - 30, cut), top: lerp(840, 900, cut) - Math.sin(cut * Math.PI) * 60, translate: '-50% -50%', rotate: `${cut * 20}deg`, padding: '12px 24px', borderRadius: 16, background: RED, color: '#fff', fontFamily: HEAD, fontWeight: 700, fontSize: 56, boxShadow: '0 12px 40px rgba(236,58,44,.5)' }}>−3%</div>}
    <Pill s="parkka" x={SR - 30} y={980} a={eout(P(t, 3.1, 3.4))} size={28} col={RED} />
    <Pill s="misol" x={SL + 50} y={980} a={eout(P(t, 3.1, 3.4))} size={22} dark col={GR} />
    <Head t={t} t0={-1} t1={2.4} y={385} lines={[['yandex haftasiga'], ['1 000 000 so‘m', 'y'], ['bonus beradi']]} size={64} />
    <Head t={t} t0={2.4} t1={4.6} y={470} lines={[['parkka foiz berib'], ['charchadingizmi?', 'r']]} size={64} from="slam" />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 4.5, 8.6, .08, .3);
  return <Layer a={a} z={logZ(P(t, 4.5, 8.6), 1, 1.05)}>
    <Glow x={CX} y={980} r={640} a={1} col="61,220,132" />
    <Num v="0%" y={720} a={eout(P(t, 4.5, 4.7))} size={360} col={GRN} />
    <div style={{ ...abs(SL, 1110, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 50, color: WH, opacity: eout(P(t, 5.1, 5.5)) }}>YANDEX BONUSLARIDAN</div>
    <Stamp s="DOIMIY" y={1260} t={t} t0={6.6} t1={8.6} col={GRN} size={70} />
    <Head t={t} t0={4.5} t1={8.6} y={470} lines={[['zero taxi’da'], ['hech narsa ushlamaymiz', 'g']]} size={60} from="slam" />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 8.5, 13.6, .3, .3);
  const fill = eio(P(t, 9.4, 10.8));
  const coin = eout(P(t, 11.6, 12.1));
  return <Layer a={a}>
    <Glow x={CX} y={1050} r={560} a={.9} col="61,220,132" />
    <Phone y={PY} a={P(t, 8.5, 9)} tilt={lerp(10, 4, eout(P(t, 8.5, 13.5)))}>{t < 11.45 ? <Goals t={t} t0={8.6} fill={fill} topCol={t > 10.8 ? '#7CF0A8' : '#93A6FF'} /> : <GoalDetail t={t} t0={11.45} />}<Tap t={t} t0={11.05} x={330} y={240} /></Phone>
    <Pill s="zero taxi hech narsa ushlamaydi" x={CX} y={1310} a={coin} size={26} col={GRN} />
    <Head t={t} t0={8.5} t1={13.6} y={470} lines={[['yandex qancha bersa —'], ['hammasi sizniki', 'y']]} size={62} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 13.5, 17.6, .3, .3);
  return <Layer a={a}>
    <Glow x={CX} y={1050} r={560} a={.9} col="63,169,184" />
    <Phone y={PY} a={P(t, 13.5, 14)} tilt={lerp(-10, -4, eout(P(t, 13.5, 17.5)))}><Withdraw t={t} t0={13.6} /></Phone>
    <Head t={t} t0={13.5} t1={17.6} y={470} lines={[['pul yechish'], ['bepul · 5 soniya · 24/7', 'y']]} size={60} />
  </Layer>;
};

const Row: React.FC<{ t: number; t0: number; y: number; l: string; r: string; sub?: string }> = ({ t, t0, y, l, r, sub }) => {
  const k = eout(P(t, t0, t0 + .35));
  return <Card x={SL + 30} y={y} w={SR - SL - 60} a={k} style={{ translate: `${(1 - k) * -90}px 0` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '26px 30px' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', flex: 'none', background: `radial-gradient(circle at 35% 30%, #FFE09A, ${Y} 60%, #c9962a)`, boxShadow: '0 6px 18px rgba(0,0,0,.5)' }} />
      <div style={{ flex: 1 }}><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34, color: WH }}>{l}</div>{sub && <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, color: GR, marginTop: 4 }}>{sub}</div>}</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 62, color: Y }}>{r}</div>
    </div>
  </Card>;
};
const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 17.5, 21.6, .3, .3);
  return <Layer a={a} z={logZ(P(t, 17.5, 21.5), 1, 1.04)}>
    <Glow x={CX} y={980} r={560} a={.9} />
    <Row t={t} t0={18.4} y={800} l="10 ta buyurtma" sub="birinchi 2 kunda" r="+20 000" />
    <div style={{ ...abs(SL, 1100, SR - SL), textAlign: 'center', opacity: eout(P(t, 19.7, 20.1)), scale: String(lerp(.7, 1, eback(P(t, 19.7, 20.2)))) }}>
      <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>Zero Taxi’dan sovg‘a</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 120, lineHeight: 1, color: GRN, textShadow: '0 0 34px rgba(61,220,132,.5)' }}>+20 000 so‘m</div>
    </div>
    <Head t={t} t0={17.5} t1={21.6} y={470} lines={[['yangi haydovchiga'], ['bonus', 'y']]} size={68} />
  </Layer>;
};

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
const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 21.5, 25.1, .3, .3);
  const p = eio(P(t, 21.9, 23));
  return <Layer a={a} z={logZ(P(t, 21.5, 25), 1, 1.04)}>
    <Glow x={CX} y={960} r={540} a={.9} col={p >= 1 ? '61,220,132' : '63,169,184'} />
    <Ring x={CX} y={920} r={185} p={p} col={p >= 1 ? GRN : TEAL}>
      <div>
        <svg width="130" height="130" viewBox="0 0 64 64"><path d="M32 4 9 13v17c0 15 10 24 23 30 13-6 23-15 23-30V13z" fill={p >= 1 ? GRN : TEAL} /><path d="M21 32l8 8 15-16" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 46, color: WH }}>{Math.round(p * 30)} / 30</div>
      </div>
    </Ring>
    <Stamp s="3 OY BEPUL" y={1250} t={t} t0={23.1} t1={25.1} col={GRN} size={64} />
    <Head t={t} t0={21.5} t1={25.1} y={470} lines={[['30 ta buyurtma —'], ['osgop 3 oyga bepul', 'g']]} size={62} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 25, 28.6, .3, .3);
  const p = eio(P(t, 25.4, 26.6)); const off = eout(P(t, 26.8, 27.1));
  return <Layer a={a} z={logZ(P(t, 25, 28.5), 1, 1.04)}>
    <Glow x={CX} y={960} r={540} a={.9} col="63,169,184" />
    <Ring x={CX} y={900} r={170} p={p} col={Y}>
      <div><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 140, lineHeight: 1, color: Y }}>{Math.round(p * 2)}</div><div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>daqiqa</div></div>
    </Ring>
    <div style={{ ...abs(SL, 1180, SR - SL), display: 'flex', justifyContent: 'center', opacity: off, scale: String(lerp(.7, 1, eback(off))) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '16px 30px', borderRadius: 22, background: 'rgba(14,16,22,.95)', border: `2px solid ${RED}` }}>
        <svg width="56" height="56" viewBox="0 0 64 64"><path d="M10 56V14l22-8 22 8v42z M22 22h6 M36 22h6 M22 34h6 M36 34h6 M28 56V44h8v12" fill="none" stroke={WH} strokeWidth="4" strokeLinejoin="round" /><path d="M6 6l52 52" stroke={RED} strokeWidth="6" strokeLinecap="round" /></svg>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34, color: WH }}>ofisga borish shart emas</div>
      </div>
    </div>
    <Head t={t} t0={25} t1={28.6} y={470} lines={[['ulanish'], ['2 daqiqa', 'y']]} size={72} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 28.5, 32.8, .3, .3);
  return <Layer a={a}>
    <Glow x={CX} y={1050} r={560} a={.9} col="63,169,184" />
    <Phone y={PY} a={P(t, 28.5, 29)} tilt={lerp(10, 4, eout(P(t, 28.5, 32.7)))}><Chat t={t} t0={28.6} /></Phone>
    <Head t={t} t0={28.5} t1={32.8} y={470} lines={[['yordam 24/7'], ['o‘zbek va rus tilida', 'y']]} size={62} />
  </Layer>;
};

const End: React.FC<{ t: number }> = ({ t }) => <ZtEnd t={t} t0={32.8}
  perks={['Yandex bonusidan 0% — doimiy', 'Pul yechish bepul · 5 soniya', '+20 000 so‘m · OSGOP 3 oy bepul', 'Ulanish 2 daqiqa · yordam 24/7']} />;

const HITS: [number, number, number][] = [[2.95, 9, 7], [4.5, 18, 5], [6.6, 8, 7], [11.6, 7, 7], [15.8, 7, 7], [19.7, 7, 7], [23.1, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, End]} hits={HITS} />;

export const Cover: React.FC = () =>
  <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1250} r={620} a={1} col="61,220,132" />
    <Phone y={760} a={1} tilt={-8}><Goals t={5} t0={0} fill={1} topCol="#7CF0A8" /></Phone>
    <div style={{ ...abs(SL, 230, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 380, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 96, lineHeight: 1.02, ...yel }}>YANDEX BONUSI<br />HAMMASI SIZGA</div>
    <div style={{ ...abs(SL, 590, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: GRN }}>PARKKA 0%</div>
  </AbsoluteFill>;
