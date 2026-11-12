import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, YL, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone, Plate } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Card, Src, Stamp, Background, Reel, ZtEnd } from '../kit';
import { END, T } from './ep';

const SRC_BAN = 'manba: Yandex Pro bilimlar bazasi — «buyurtmalarga kirish cheklanishi», 19.12.2024';
const SRC_BAN2 = 'manba: Yandex Pro bilimlar bazasi, 19.12.2024';
const SRC_ZT = 'Zero Taxi ma’lumoti';
const SRC_ZT4 = '+4 — Zero Taxi ma’lumoti; joriy qiymat Yandex Pro ilovasida';

/* ---------- small art ---------- */
const Check: React.FC<{ s: number; col?: string }> = ({ s, col = GRN }) =>
  <svg width={s} height={s} viewBox="0 0 64 64" style={{ display: 'block' }}><path d="M12 34l14 14 26-30" stroke={col} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Cross: React.FC<{ s: number; col?: string }> = ({ s, col = RED }) =>
  <svg width={s} height={s} viewBox="0 0 64 64" style={{ display: 'block' }}><path d="M14 14l36 36M50 14 14 50" stroke={col} strokeWidth="9" strokeLinecap="round" /></svg>;

/* padlock; open 0..1 lifts the shackle; col = body colour */
const Lock: React.FC<{ s: number; open?: number; col?: [string, string]; id: string; mark?: string; markCol?: string }> = ({ s, open = 0, col = ['#ff7a6e', RED], id, mark, markCol = '#fff' }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 200 240" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`lkB${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col[0]} /><stop offset="1" stopColor={col[1]} /></linearGradient>
      <linearGradient id={`lkS${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#9aa3b2" /><stop offset=".5" stopColor="#e8ecf2" /><stop offset="1" stopColor="#8a93a2" /></linearGradient>
    </defs>
    <g transform={`translate(0 ${-38 * open}) rotate(${-18 * open} 150 110)`}>
      <path d="M52 112 V72 a48 48 0 0 1 96 0 V112" stroke={`url(#lkS${id})`} strokeWidth="24" fill="none" strokeLinecap="round" />
    </g>
    <rect x="18" y="100" width="164" height="132" rx="28" fill={`url(#lkB${id})`} stroke="rgba(0,0,0,.35)" strokeWidth="3" />
    <rect x="30" y="110" width="140" height="16" rx="8" fill="rgba(255,255,255,.25)" />
    {mark ? <text x="100" y="196" textAnchor="middle" fontFamily="Osw" fontWeight="700" fontSize="74" fill={markCol}>{mark}</text>
      : <g><circle cx="100" cy="158" r="17" fill="rgba(0,0,0,.55)" /><rect x="92" y="164" width="16" height="36" rx="6" fill="rgba(0,0,0,.55)" /></g>}
  </svg>;

const Person: React.FC<{ s: number; col?: string; scarf?: boolean; cap?: boolean; body?: string }> = ({ s, col = '#c49a7a', scarf, cap, body }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 100 120" style={{ display: 'block', overflow: 'visible' }}>
    {scarf && <path d="M22 34c0-22 56-22 56 0v14c-6-8-14-12-28-12s-22 4-28 12z" fill="#8a3b5a" />}
    <circle cx="50" cy="34" r="20" fill={col} />
    <path d="M10 120c2-34 18-50 40-50s38 16 40 50z" fill={body ?? (scarf ? '#6b3a50' : '#3a4a5c')} />
    {!scarf && !cap && <path d="M30 28c4-14 36-14 40 0" stroke="#2a2018" strokeWidth="10" fill="none" strokeLinecap="round" />}
    {cap && <path d="M28 26c0-16 44-16 44 0z M64 24 L84 26" stroke={TEAL} fill={TEAL} strokeWidth="6" strokeLinecap="round" />}
    {scarf && <path d="M28 30c2-14 42-14 44 0" stroke="#8a3b5a" strokeWidth="9" fill="none" strokeLinecap="round" />}
  </svg>;

const Bubble: React.FC<{ x: number; y: number; a: number; s: string; size?: number; col?: string; tail?: 'left' | 'right'; fg?: string }> = ({ x, y, a, s, size = 40, col = '#fff', tail = 'left', fg = '#111' }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: clamp(a), scale: String(lerp(.6, 1, eback(clamp(a)))), padding: '16px 26px', borderRadius: tail === 'left' ? '30px 30px 30px 6px' : '30px 30px 6px 30px', background: col, color: fg, fontFamily: SANS, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,.5)' }}>{s}</div>;

/* empty plate (the joke: no osh) */
const Dish: React.FC<{ w: number }> = ({ w }) =>
  <svg width={w} height={w * .42} viewBox="0 0 300 126" style={{ display: 'block' }}>
    <defs><linearGradient id="dshG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f6f8" /><stop offset="1" stopColor="#b9c2cc" /></linearGradient></defs>
    <ellipse cx="150" cy="70" rx="146" ry="52" fill="url(#dshG)" />
    <ellipse cx="150" cy="64" rx="100" ry="32" fill="#e3e8ee" />
    <path d="M70 64 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0" stroke="#2b72b8" strokeWidth="5" fill="none" opacity=".5" />
  </svg>;

const Ring: React.FC<{ s: number; p: number; col?: string; children?: React.ReactNode }> = ({ s, p, col = TEAL, children }) =>
  <div style={{ position: 'relative', width: s, height: s }}>
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, rotate: '-90deg' }}>
      <circle cx="50" cy="50" r="44" stroke="#1f2531" strokeWidth="8" fill="rgba(14,16,22,.9)" />
      <circle cx="50" cy="50" r="44" stroke={col} strokeWidth="8" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - clamp(p)} />
    </svg>
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>{children}</div>
  </div>;

const Shield: React.FC<{ s: number }> = ({ s }) =>
  <svg width={s} height={s * 1.15} viewBox="0 0 200 230" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="shdG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7fd3de" /><stop offset=".55" stopColor={TEAL} /><stop offset="1" stopColor="#1f6c78" /></linearGradient></defs>
    <path d="M100 6 L186 38 V110 C186 166 148 204 100 224 C52 204 14 166 14 110 V38 Z" fill="url(#shdG)" stroke="#bfeef4" strokeWidth="4" />
    <path d="M58 116 l28 28 56 -62" stroke="#fff" strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const Sub: React.FC<{ t: number; t0: number; t1: number; z?: [number, number]; children: React.ReactNode }> = ({ t, t0, t1, children, z = [1, 1.04] }) => {
  const a = env(t, t0, t1, .3, .3); if (a <= 0) return null;
  return <Layer a={a} z={logZ(P(t, t0, t1), z[0], z[1])}>{children}</Layer>;
};

/* ---------- scenes ---------- */
const SEVEN = ['reyting', 'prioritet', 'standart', 'dam olish', 'fotokontrol', 'janjal', 'hiyla'];
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.6, .2, .3);
  const close = 1 - eout(P(t, T.blok - .1, T.blok + .3));
  return <Layer a={a} z={logZ(P(t, 0, 5.6), 1, 1.05)}>
    <Glow x={CX} y={900} r={540} a={.9} col="236,58,44" />
    <div style={{ position: 'absolute', left: CX - 150, top: 650 }}><Lock s={300} open={close} id="l1" /></div>
    <div style={{ ...abs(SL - 10, 1060, SR - SL + 20), display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
      {SEVEN.map((s, i) => { const k = eout(P(t, T.yetti - .1 + i * .14, T.yetti + .2 + i * .14));
        const top = i === 0 || i === 1 || i === 3 || i === 4;
        const hl = t > T.eng ? (top ? 1 : .35) : 1;
        return <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 30, background: 'rgba(14,16,22,.94)', border: `3px solid ${top && t > T.eng ? Y : TEAL}`, opacity: k * hl, scale: String(lerp(.6, 1, eback(k))) }}>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: top && t > T.eng ? Y : TEAL }}>{i + 1}</span>
          <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH }}>{s}</span>
        </div>; })}
    </div>
    <Src s={SRC_BAN} y={1360} a={eout(P(t, T.yetti, T.yetti + .4))} />
    <Head t={t} t0={-1} t1={T.yetti - .1} y={490} lines={[['akkaunt nega'], ['bloklanadi?', 'y']]} size={84} />
    <Head t={t} t0={T.yetti - .1} t1={5.6} y={490} lines={[['yandex pro’da —'], ['7 ta sabab', 'y']]} size={84} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.45, 14.1, .3, .3);
  const fall = eio(P(t, T.reyting, T.past + .4));
  const rise = eio(P(t, T.n150, T.kotar));
  const v = rise > 0 ? lerp(4.40, 4.62, rise) : lerp(4.80, 4.40, fall);
  const bad = v < 4.5;
  const cnt = Math.round(eio(P(t, T.n150 - .2, T.kotar)) * 150);
  const BW = SR - SL - 120, x0 = SL + 60;
  const px = (r: number) => x0 + (r - 4) / 1 * BW;
  const lk = eback(P(t, T.yopil - .2, T.yopil + .2)) * (1 - eout(P(t, T.birinchi - .2, T.birinchi + .2)));
  const col = bad ? RED : GRN;
  return <Layer a={a} z={logZ(P(t, 5.45, 14.1), 1, 1.04)}>
    <Glow x={CX} y={980} r={540} a={.9} col={bad ? '236,58,44' : '61,220,132'} />
    <div style={{ ...abs(SL, 730, SR - SL), textAlign: 'center' }}>
      <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>reytingingiz · misol</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 190, lineHeight: 1.05, color: col, textShadow: `0 0 40px ${col}66` }}>★ {v.toFixed(2)}</div>
    </div>
    <div style={{ position: 'absolute', left: x0, top: 1010, width: BW, height: 26, borderRadius: 13, background: `linear-gradient(90deg, ${RED} 0 50%, ${GRN} 50% 100%)`, opacity: .85 }} />
    <div style={{ position: 'absolute', left: px(4.5) - 3, top: 985, width: 6, height: 76, background: WH }} />
    <div style={{ position: 'absolute', left: px(4.5), top: 1075, translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH }}>4.5 — chegara</div>
    <div style={{ position: 'absolute', left: x0 - 10, top: 1075, fontFamily: MONO, fontSize: 24, color: GR }}>4.0</div>
    <div style={{ position: 'absolute', left: x0 + BW - 40, top: 1075, fontFamily: MONO, fontSize: 24, color: GR }}>5.0</div>
    <div style={{ position: 'absolute', left: px(v), top: 1023, translate: '-50% -50%', width: 54, height: 54, borderRadius: '50%', background: col, border: '6px solid #0b0d12', boxShadow: `0 0 24px ${col}` }} />
    {lk > 0 && <div style={{ position: 'absolute', left: CX - 260, top: 1170, width: 520, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, opacity: clamp(lk), scale: String(lerp(.6, 1, clamp(lk))) }}>
      <Lock s={70} id="l2" /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: RED }}>buyurtmalar yopildi</span>
    </div>}
    {rise > 0 || t > T.n150 - .3 ? <div style={{ position: 'absolute', left: CX, top: 1225, translate: '-50% -50%', opacity: eout(P(t, T.n150 - .3, T.n150)), display: 'flex', alignItems: 'center', gap: 18, padding: '14px 30px', borderRadius: 30, background: 'rgba(14,16,22,.94)', border: `3px solid ${GRN}` }}>
      <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 60, color: GRN, minWidth: 110, textAlign: 'right' }}>{cnt}</span>
      <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: WH }}>/ 150 buyurtma</span>
    </div> : null}
    <Src s={SRC_BAN2} y={1345} a={eout(P(t, T.p45, T.p45 + .4))} />
    <Head t={t} t0={5.45} t1={T.birinchi - .15} y={490} lines={[['1. reyting —'], ['4.5 dan past', 'r']]} size={80} />
    <Head t={t} t0={T.birinchi - .15} t1={14.1} y={490} lines={[['birinchi marta —'], ['150 tagacha buyurtma', 'g']]} size={72} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 13.95, 22.9, .3, .3);
  const d1 = eio(P(t, T.otkaz + .2, T.otkaz + .7)), d2 = eio(P(t, T.bekor + .2, T.bekor + .7)), d3 = eio(P(t, T.kop, T.kop + .6));
  const lvl = 1 - .22 * d1 - .25 * d2 - .38 * d3;
  const lc = lvl > .6 ? GRN : lvl > .35 ? Y : RED;
  const none = eout(P(t, T.kelmay - .3, T.kelmay + .1));
  const ev: [string, number][] = [['o‘tkazib yubordingiz', T.otkaz], ['qoidasiz bekor qildingiz', T.bekor]];
  return <Layer a={a} z={logZ(P(t, 13.95, 22.9), 1, 1.04)}>
    <Glow x={CX} y={980} r={540} a={.9} col={none > .5 ? '236,58,44' : '63,169,184'} />
    <Card x={SL + 40} y={700} w={SR - SL - 80}>
      <div style={{ padding: '26px 34px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 24, color: GR }}><span>prioritet ballari</span><span>misol</span></div>
        <div style={{ marginTop: 18, height: 54, borderRadius: 27, background: '#1a1f29', overflow: 'hidden' }}>
          <div style={{ width: `${lvl * 100}%`, height: '100%', borderRadius: 27, background: `linear-gradient(90deg, ${TEAL}, ${lc})` }} />
        </div>
      </div>
    </Card>
    <div style={{ ...abs(SL + 40, 900, SR - SL - 80), display: 'flex', flexDirection: 'column', gap: 18 }}>
      {ev.map(([s, t0]) => { const k = eout(P(t, t0 - .25, t0 + .15));
        return <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', borderRadius: 22, background: 'rgba(14,16,22,.94)', border: `3px solid ${RED}`, opacity: k, translate: `${(1 - k) * 60}px 0` }}>
          <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: WH }}>{s}</span>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: RED }}>− ball</span>
        </div>; })}
    </div>
    {none > 0 && <div style={{ position: 'absolute', left: CX, top: 1225, translate: '-50% -50%', opacity: none, scale: String(lerp(1.4, 1, none)), display: 'flex', alignItems: 'center', gap: 16, padding: '16px 34px', borderRadius: 30, background: 'rgba(236,58,44,.16)', border: `3px solid ${RED}` }}>
      <Cross s={56} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: RED, whiteSpace: 'nowrap' }}>buyurtma kelmaydi</span>
    </div>}
    <Src s={SRC_BAN2} y={1345} a={eout(P(t, T.otkaz, T.otkaz + .4))} />
    <Head t={t} t0={13.95} t1={T.kop - .45} y={490} lines={[['2. prioritet'], ['ballar kamayadi', 'r']]} size={78} />
    <Head t={t} t0={T.kop - .45} t1={22.9} y={490} lines={[['ball ko‘p tushsa —'], ['buyurtma yo‘q', 'r']]} size={78} from="slam" />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 22.75, 28.7, .3, .3);
  const l = eout(P(t, T.r3 - .1, T.r3 + .3)), r = eout(P(t, T.surat + .3, T.surat + .7));
  const neq = eback(P(t, T.mos - .1, T.mos + .3));
  const lk = eback(P(t, T.vaqt - .2, T.vaqt + .2));
  const card = (k: number, title: string, plate: string, box: number, y: number) =>
    <div style={{ position: 'absolute', left: CX - 320, top: y, width: 640, padding: '20px 20px 26px', borderRadius: 26, background: 'linear-gradient(180deg, rgba(30,34,46,.96), rgba(14,16,22,.96))', border: '1.5px solid rgba(255,255,255,.12)', opacity: k, translate: `0 ${(1 - k) * 50}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <span style={{ fontFamily: MONO, fontSize: 24, color: GR }}>{title}</span>
      <Plate s={96} chars={plate} box={neq > .5 ? box : -1} />
    </div>;
  return <Layer a={a} z={logZ(P(t, 22.75, 28.7), 1, 1.04)}>
    <Glow x={CX} y={980} r={540} a={.9} col={lk > .5 ? '236,58,44' : '63,169,184'} />
    {card(l, 'suratda · misol', '01A777AA', 4, 690)}
    {card(r, 'ilovada · misol', '01A771AA', 4, 1000)}
    <div style={{ position: 'absolute', left: CX, top: 955, translate: '-50% -50%', fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: RED, opacity: clamp(neq) * (1 - clamp(lk)), scale: String(lerp(.4, 1, clamp(neq))), textShadow: '0 0 30px rgba(236,58,44,.6)' }}>≠</div>
    <div style={{ position: 'absolute', left: CX - 50, top: 895, opacity: clamp(lk), scale: String(lerp(.5, 1, clamp(lk))) }}><Lock s={100} id="l4" /></div>
    <Stamp s="VAQTINCHA YOPILDI" y={1285} t={t} t0={T.vaqt} t1={28.7} size={56} />
    <Src s={SRC_BAN2} y={1385} a={eout(P(t, T.surat, T.surat + .4))} />
    <Head t={t} t0={22.75} t1={T.mos - .3} y={490} lines={[['3. fotokontrol'], ['ma’lumot mos emasmi?', 'y']]} size={74} />
    <Head t={t} t0={T.mos - .3} t1={28.7} y={490} lines={[['mos kelmasa —'], ['vaqtincha yopiladi', 'r']]} size={74} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 28.55, 36.4, .3, .2);
  const ring = eio(P(t, T.r4, T.ilova));
  const note = eback(P(t, T.ilova - .1, T.ilova + .3));
  const say = eout(P(t, T.onang - .3, T.onang + .1));
  const dish = eback(P(t, T.osh - .2, T.osh + .2));
  return <Layer a={a}>
    <Sub t={t} t0={28.55} t1={34.0}>
      <Glow x={CX} y={980} r={540} a={.9} col="247,198,75" />
      <div style={{ position: 'absolute', left: CX, top: 870, translate: '-50% -50%', opacity: 1 - .4 * note }}>
        <Ring s={380} p={ring} col={ring > .85 ? RED : Y}>
          <div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: ring > .85 ? RED : WH, lineHeight: 1 }}>liniyada</div>
            <div style={{ fontFamily: MONO, fontSize: 24, color: GR, marginTop: 8 }}>tanaffussiz</div>
          </div>
        </Ring>
      </div>
      {note > 0 && <div style={{ position: 'absolute', left: SL + 40, top: 1110, width: SR - SL - 80, opacity: clamp(note), translate: `0 ${(1 - clamp(note)) * 60}px`, padding: '24px 30px', borderRadius: 26, background: 'rgba(20,24,32,.97)', border: `3px solid ${TEAL}`, boxShadow: '0 20px 50px rgba(0,0,0,.6)' }}>
        <div style={{ fontFamily: MONO, fontSize: 20, color: GR }}>Yandex Pro · bildirishnoma · misol</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 38, color: WH, marginTop: 8 }}>☕ Dam oling — keyin qayting</div>
      </div>}
      <Src s={SRC_BAN2} y={1395} a={eout(P(t, T.uzoq, T.uzoq + .4))} />
      <Head t={t} t0={28.55} t1={T.ilova - .2} y={490} lines={[['4. dam olmaslik'], ['uzoq tanaffussiz', 'y']]} size={78} />
      <Head t={t} t0={T.ilova - .2} t1={34.0} y={490} lines={[['ilova sizni —'], ['dam olishga yuboradi', 'y']]} size={72} />
    </Sub>
    <Sub t={t} t0={33.85} t1={36.4} z={[1, 1.05]}>
      <Glow x={CX} y={1000} r={540} a={.9} col="247,198,75" />
      <div style={{ position: 'absolute', left: 120, top: 860 }}><Person s={330} scarf col="#d2a585" /></div>
      <Bubble x={640} y={830} a={say} s="«Dam ol, bolam!»" size={42} />
      <div style={{ position: 'absolute', left: 520, top: 1110, opacity: clamp(dish), scale: String(lerp(.6, 1, clamp(dish))) }}>
        <Dish w={330} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 46, color: Y }}>osh yo‘q 🙂</div>
      </div>
      <Pill s="hazil" x={840} y={720} a={eout(P(t, 34.0, 34.3))} size={20} dark col={GR} />
      <Head t={t} t0={33.85} t1={36.4} y={490} lines={[['xuddi onangizdek —'], ['faqat osh bermaydi', 'y']]} size={72} />
    </Sub>
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 36.2, 38.0, .12, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} col="236,58,44" />
    <Head t={t} t0={36.2} t1={38.0} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 37.85, 51.7, .3, .3);
  const give = eio(P(t, T.boshqa, T.odam + .2));
  const ask = eout(P(t, T.ber - .5, T.ber - .1));
  const no = eback(P(t, T.bermang - .1, T.bermang + .25));
  const inf = eback(P(t, T.mudd - .1, T.mudd + .3));
  const promo = eout(P(t, T.promo - .3, T.promo + .1));
  const xp = eback(P(t, T.hiyla, T.hiyla + .3));
  const bub = eout(P(t, T.yolov, T.yolov + .4));
  const bar = eio(P(t, T.uzay - .2, T.uzay + .6));
  const inf2 = eback(P(t, T.mudd2 - .1, T.mudd2 + .3));
  const phx = lerp(250, 640, give) * (1 - no) + 250 * no;
  return <Layer a={a}>
    <Sub t={t} t0={37.85} t1={43.55}>
      <Glow x={CX} y={1000} r={540} a={.9} col="236,58,44" />
      <div style={{ position: 'absolute', left: 90, top: 950 }}><Person s={250} cap col="#c49a7a" /></div>
      <div style={{ position: 'absolute', left: 660, top: 990 }}><Person s={220} col="#d8b090" body="#4a5a3c" /></div>
      <div style={{ position: 'absolute', left: phx, top: 760, translate: '-50% 0', rotate: `${(give - no) * 12}deg` }}>
        <Phone w={150} id="p7" glow={.4}>
          <div style={{ position: 'absolute', inset: 0, background: '#0d1016', display: 'grid', placeItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', background: TEAL, margin: '0 auto' }} />
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 18, color: WH, marginTop: 10 }}>akkaunt</div>
            </div>
          </div>
        </Phone>
      </div>
      <Bubble x={720} y={880} a={ask} s="«Bir kunga ber!»" size={36} tail="right" />
      {no > 0 && <div style={{ position: 'absolute', left: CX - 75, top: 1280, opacity: clamp(no), scale: String(lerp(1.6, 1, clamp(no))) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, translate: '-60px 0' }}><Cross s={80} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: RED }}>bermang</span></div>
      </div>}
      <Head t={t} t0={37.85} t1={43.55} y={490} lines={[['eng xavflisi —'], ['akkauntni berish', 'r']]} size={80} />
    </Sub>
    <Sub t={t} t0={43.4} t1={45.4}>
      <Glow x={CX} y={980} r={560} a={1} col="236,58,44" />
      <div style={{ position: 'absolute', left: CX - 150, top: 720, scale: String(lerp(.6, 1, clamp(inf))) }}><Lock s={300} id="l7" mark="∞" /></div>
      <Stamp s="MUDDATSIZ" y={1200} t={t} t0={T.mudd + .1} t1={45.4} size={84} />
      <Src s={SRC_BAN2} y={1345} a={1} />
      <Head t={t} t0={43.4} t1={45.4} y={490} lines={[['buning uchun —'], ['muddatsiz cheklov', 'r']]} size={78} from="slam" />
    </Sub>
    <Sub t={t} t0={45.25} t1={47.25}>
      <Glow x={CX} y={980} r={540} a={.9} col="236,58,44" />
      <div style={{ position: 'absolute', left: CX, top: 930, translate: '-50% -50%', opacity: promo, rotate: '-6deg' }}>
        <div style={{ position: 'relative', padding: '40px 70px', borderRadius: 26, background: `linear-gradient(135deg, ${YL}, ${Y})`, boxShadow: '0 24px 60px rgba(0,0,0,.6)', border: '4px dashed #3a2a08' }}>
          <div style={{ fontFamily: MONO, fontSize: 26, color: '#3a2a08' }}>promokod</div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 110, lineHeight: 1, color: '#2a1d04' }}>PROMO-X</div>
          {xp > 0 && <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: clamp(xp), scale: String(lerp(1.5, 1, clamp(xp))) }}><Cross s={220} /></div>}
        </div>
      </div>
      <Pill s="hiyla = xuddi shunday" x={CX} y={1210} a={eout(P(t, T.hiyla, T.hiyla + .3))} size={34} col={RED} />
      <Head t={t} t0={45.25} t1={47.25} y={490} lines={[['promokod hiylasi —'], ['xuddi shunday', 'r']]} size={78} />
    </Sub>
    <Sub t={t} t0={47.1} t1={51.7}>
      <Glow x={CX} y={980} r={540} a={.9} col="236,58,44" />
      <div style={{ position: 'absolute', left: 80, top: 860 }}><Person s={300} cap col="#c49a7a" /></div>
      <div style={{ position: 'absolute', left: 640, top: 880 }}><Person s={280} col="#b88a6a" body="#5c3a3a" /></div>
      <Bubble x={300} y={780} a={bub} s="!!! #@?" size={52} col={RED} fg="#fff" />
      <Bubble x={760} y={800} a={eout(P(t, T.janjal, T.janjal + .3))} s="?!" size={52} tail="right" />
      <Card x={SL + 60} y={1250} w={SR - SL - 120} a={eout(P(t, T.uzay - .4, T.uzay))}>
        <div style={{ padding: '16px 26px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontFamily: MONO, fontSize: 22, color: GR, whiteSpace: 'nowrap' }}>cheklov</span>
          <div style={{ flex: 1, height: 26, borderRadius: 13, background: '#1a1f29', overflow: 'hidden' }}><div style={{ width: `${lerp(25, 100, bar)}%`, height: '100%', background: RED }} /></div>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1, color: RED, opacity: clamp(inf2), width: 60 }}>∞</span>
        </div>
      </Card>
      <Head t={t} t0={47.1} t1={T.uzay - .2} y={490} lines={[['janjalni siz'], ['boshlasangiz...', 'y']]} size={80} />
      <Head t={t} t0={T.uzay - .2} t1={51.7} y={490} lines={[['cheklov uzayadi —'], ['yoki muddatsiz', 'r']]} size={78} />
    </Sub>
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 51.55, 56.5, .3, .3);
  const cd = eio(P(t, T.vaqtin, T.ozi + .1));
  const open = eback(P(t, T.yechil - .1, T.yechil + .3));
  const comp = eout(P(t, T.shikoyat - .3, T.shikoyat + .1));
  const wrong = eback(P(t, T.notogri, T.notogri + .3));
  const chat = eout(P(t, T.qollab - .1, T.qollab + .3));
  return <Layer a={a}>
    <Sub t={t} t0={51.55} t1={53.75}>
      <Glow x={CX} y={980} r={540} a={.9} col={open > .5 ? '61,220,132' : '247,198,75'} />
      <div style={{ position: 'absolute', left: CX, top: 960, translate: '-50% -50%' }}>
        <Ring s={440} p={1 - cd} col={open > .5 ? GRN : Y}>
          <div style={{ marginTop: -10 }}><Lock s={170} open={clamp(open)} id="l8" col={open > .5 ? ['#7af0aa', '#1e9e55'] : [YL, '#c9962a']} /></div>
        </Ring>
      </div>
      <Pill s="vaqt tugadi — o‘zi ochiladi" x={CX} y={1250} a={clamp(open)} size={32} col={GRN} />
      <Src s={SRC_BAN2} y={1345} a={eout(P(t, T.vaqtin, T.vaqtin + .4))} />
      <Head t={t} t0={51.55} t1={53.75} y={490} lines={[['vaqtinchalik cheklov'], ['o‘zi yechiladi', 'g']]} size={70} />
    </Sub>
    <Sub t={t} t0={53.6} t1={56.5}>
      <Glow x={CX} y={980} r={540} a={.9} col="63,169,184" />
      <Card x={SL + 60} y={710} w={SR - SL - 120} a={comp}>
        <div style={{ padding: '24px 30px', position: 'relative' }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>yo‘lovchi shikoyati · misol</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: WH, marginTop: 8 }}>«Haydovchi kelmadi»</div>
          {wrong > 0 && <div style={{ position: 'absolute', right: 20, top: 30, opacity: clamp(wrong), rotate: '-8deg', scale: String(lerp(1.6, 1, clamp(wrong))), border: `4px solid ${Y}`, borderRadius: 12, padding: '2px 16px', fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: Y, background: 'rgba(8,9,13,.85)' }}>NOTO‘G‘RI</div>}
        </div>
      </Card>
      <Bubble x={CX + 30} y={1010} a={chat} s="Yordam, tekshirib bering 🙏" size={36} col={TEAL} fg="#fff" tail="right" />
      <Bubble x={CX - 40} y={1130} a={eout(P(t, T.yozing, T.yozing + .3))} s="Tekshiramiz ✓" size={36} col="#fff" />
      <Pill s="qo‘llab-quvvatlash tekshiradi" x={CX} y={1260} a={eout(P(t, T.yozing - .1, T.yozing + .2))} size={30} col={GRN} />
      <Src s={SRC_BAN2} y={1345} a={comp} />
      <Head t={t} t0={53.6} t1={56.5} y={490} lines={[['shikoyat noto‘g‘rimi?'], ['yordamga yozing', 'g']]} size={74} />
    </Sub>
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 56.35, 62.7, .3, .3);
  const pop = eback(P(t, T.kecha - .2, T.kecha + .3));
  const sh = eback(P(t, T.osgop - .2, T.osgop + .3));
  const free = eback(P(t, T.bepul - .1, T.bepul + .3));
  const p4 = eback(P(t, T.b4 - .2, T.b4 + .3));
  return <Layer a={a}>
    <Sub t={t} t0={56.35} t1={59.0}>
      <Glow x={CX} y={980} r={520} a={.9} col="63,169,184" />
      <div style={{ ...abs(SL, 720, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 56.4, 56.8)) }}><Lockup h={100} /></div>
      <div style={{ position: 'absolute', left: CX, top: 1060, translate: '-50% -50%', scale: String(lerp(.85, 1, clamp(pop))) }}>
        <Ring s={340} p={eio(P(t, T.yordam - .3, T.kecha + .3))}><div><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 124, lineHeight: 1, color: Y }}>24/7</div><div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>yordam</div></div></Ring>
      </div>
      <Src s={SRC_ZT} y={1280} a={eout(P(t, T.kecha, T.kecha + .3))} />
      <Head t={t} t0={56.35} t1={59.0} y={490} lines={[['zero taxi’da yordam'], ['kecha-kunduz', 'y']]} size={72} />
    </Sub>
    <Sub t={t} t0={58.85} t1={62.7}>
      <Glow x={CX} y={980} r={520} a={.9} col="63,169,184" />
      <div style={{ position: 'absolute', left: 140, top: 760, opacity: clamp(sh), scale: String(lerp(.6, 1, clamp(sh))) }}><Shield s={280} /></div>
      <div style={{ position: 'absolute', left: 175, top: 1110, width: 210, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: WH, opacity: clamp(sh) }}>OSGOP</div>
      <div style={{ position: 'absolute', left: 500, top: 780, display: 'flex', flexDirection: 'column', gap: 30 }}>
        <div style={{ padding: '14px 34px', borderRadius: 30, background: GRN, color: '#06210f', fontFamily: SANS, fontWeight: 800, fontSize: 52, opacity: clamp(free), scale: String(lerp(.6, 1, clamp(free))), textAlign: 'center' }}>bepul</div>
        <div style={{ textAlign: 'center', opacity: clamp(p4), scale: String(lerp(.5, 1, clamp(p4))) }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 170, lineHeight: 1, ...yel }}>+4</div>
          <div style={{ fontFamily: MONO, fontSize: 28, color: GR }}>prioritet ball</div>
        </div>
      </div>
      <Src s={SRC_ZT4} y={1300} a={eout(P(t, T.prior2, T.prior2 + .3))} />
      <Head t={t} t0={58.85} t1={62.7} y={490} lines={[['osgop bepul —'], ['+4 prioritet', 'y']]} size={80} />
    </Sub>
  </Layer>;
};

const S10: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 62.45, END + 1, .3, .1);
  return <Layer a={a}>
    <ZtEnd t={t} t0={T.ulaning} perks={['OSGOP bepul · +4 prioritet', '24/7 yordam', '5 soniyada yechish · 0% komissiya', '+10% balansga bonus']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.yopil, 8, 7], [T.kelmay, 8, 7], [T.endi, 20, 5], [T.mudd, 16, 6], [T.mudd2, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9, S10]} hits={HITS} />;

export const Cover: React.FC = () =>
  <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1120} r={600} a={1} col="236,58,44" />
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 32, color: GR }}>yandex go · haydovchilar uchun</div>
    <div style={{ ...abs(SL, 500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 124, lineHeight: 1.04, ...yel }}>AKKAUNT NEGA<br />BLOKLANADI?</div>
    <div style={{ position: 'absolute', left: CX - 150, top: 820 }}><Lock s={300} id="lc" /></div>
    <div style={{ ...abs(SL - 10, 1220, SR - SL + 20), display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
      {SEVEN.map((s, i) => <div key={s} style={{ padding: '8px 18px', borderRadius: 26, background: 'rgba(14,16,22,.94)', border: `3px solid ${TEAL}`, fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH }}><span style={{ color: TEAL, fontFamily: HEAD }}>{i + 1}</span> {s}</div>)}
    </div>
    <div style={{ ...abs(SL, 1480, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.1, color: GRN }}>7 SABAB —<br />VA QANDAY SAQLANISH</div>
  </AbsoluteFill>;
