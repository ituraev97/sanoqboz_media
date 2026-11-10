import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, YL, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone, Car } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Card, Src, Background, Reel, ZtEnd, Road } from '../kit';
import { END, T } from './ep';

const SRC_KB = 'manba: Yandex Pro bilimlar bazasi (Toshkent) — «qabul qilingan buyurtmalar uchun prioritet»';
const SRC_AND = 'manba: Yandex Pro bilimlar bazasi (O‘zbekiston) — «prioritet qanday ishlaydi», 03.03.2026';
const SRC_BAN = 'manba: Yandex Pro bilimlar bazasi (Toshkent) — «buyurtmalarga kirish qachon yo‘qoladi»';
const SRC_ZT = '+4 — Zero Taxi ma’lumoti; joriy qiymat Yandex Pro ilovasida';
const TAXI: [string, string] = ['#FFE09A', '#E0A82E'];

/* ---------- art ---------- */
/* order offer inside a phone. press: 0..1 skip-button press; acc: accept highlight */
const Offer: React.FC<{ press?: number; acc?: number; gone?: number }> = ({ press = 0, acc = 0, gone = 0 }) =>
  <div style={{ position: 'absolute', inset: 0, background: '#0d1016' }}>
    <svg width="100%" height="46%" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <rect width="300" height="260" fill="#151a23" />
      {[40, 100, 160, 220].map(y => <path key={y} d={`M0 ${y} L300 ${y + 20}`} stroke="#222a36" strokeWidth="10" />)}
      {[60, 150, 240].map(x => <path key={x} d={`M${x} 0 L${x - 30} 260`} stroke="#222a36" strokeWidth="10" />)}
      <path d="M70 200 C110 150 150 170 170 120 S230 70 240 60" stroke={TEAL} strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="200" r="11" fill={Y} /><circle cx="240" cy="60" r="11" fill={WH} />
    </svg>
    <div style={{ padding: '18px 20px', opacity: 1 - gone }}>
      <div style={{ fontFamily: MONO, fontSize: 15, color: GR }}>yangi buyurtma · misol</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, marginTop: 6 }}>3 daqiqa · 1,2 km</div>
      <div style={{ marginTop: 18, height: 64, borderRadius: 16, background: acc > .5 ? GRN : '#1f8f55', display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: '#06210f', scale: String(1 - .06 * acc) }}>Qabul qilish</div>
      <div style={{ marginTop: 12, height: 56, borderRadius: 16, background: press > .5 ? RED : '#2a303c', display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 24, color: WH, scale: String(1 - .06 * Math.sin(press * Math.PI)) }}>O‘tkazib yuborish</div>
    </div>
  </div>;

/* horizontal priority scale 0..100 (v in 0..1) */
const Scale: React.FC<{ x: number; y: number; w: number; v: number; col?: string; label?: string; nums?: number }> = ({ x, y, w, v, col = TEAL, label, nums = 1 }) =>
  <div style={{ ...abs(x, y, w) }}>
    {label && <div style={{ fontFamily: MONO, fontSize: 22, color: GR, marginBottom: 10 }}>{label}</div>}
    <div style={{ position: 'relative', height: 64, borderRadius: 32, background: '#1a1f29', border: '3px solid #2c3342', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${clamp(v) * 100}%`, borderRadius: 32, background: `linear-gradient(90deg, ${col}, ${col === RED ? '#ff8a7a' : col === GRN ? '#9ff5c0' : YL})` }} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH, opacity: nums }}><span>0</span><span>100</span></div>
  </div>;

const Arrow: React.FC<{ s: number; up?: boolean; col?: string }> = ({ s, up, col }) =>
  <svg width={s * .7} height={s} viewBox="0 0 70 100" style={{ display: 'block', rotate: up ? '180deg' : '0deg' }}>
    <path d="M22 0 H48 V58 H68 L35 100 L2 58 H22 Z" fill={col ?? (up ? GRN : RED)} />
  </svg>;

const Person: React.FC<{ s: number; col?: string; scarf?: boolean; cap?: boolean }> = ({ s, col = '#c49a7a', scarf, cap }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 100 120" style={{ display: 'block', overflow: 'visible' }}>
    {scarf && <path d="M22 34c0-22 56-22 56 0v14c-6-8-14-12-28-12s-22 4-28 12z" fill="#8a3b5a" />}
    <circle cx="50" cy="34" r="20" fill={col} />
    <path d="M10 120c2-34 18-50 40-50s38 16 40 50z" fill={scarf ? '#6b3a50' : '#3a4a5c'} />
    {!scarf && !cap && <path d="M30 28c4-14 36-14 40 0" stroke="#2a2018" strokeWidth="10" fill="none" strokeLinecap="round" />}
    {cap && <path d="M28 26c0-16 44-16 44 0z M64 24 L84 26" stroke={TEAL} fill={TEAL} strokeWidth="6" strokeLinecap="round" />}
    {scarf && <path d="M28 30c2-14 42-14 44 0" stroke="#8a3b5a" strokeWidth="9" fill="none" strokeLinecap="round" />}
  </svg>;

const Plov: React.FC<{ w: number }> = ({ w }) =>
  <svg width={w} height={w * .6} viewBox="0 0 400 240">
    <defs><radialGradient id="plR8" cx=".5" cy=".3" r=".7"><stop offset="0" stopColor="#fff3cf" /><stop offset="1" stopColor="#e2b765" /></radialGradient></defs>
    <ellipse cx="200" cy="190" rx="190" ry="44" fill="#d9e2ea" /><ellipse cx="200" cy="182" rx="160" ry="32" fill="#2C8290" opacity=".35" />
    <path d="M60 180 C80 70 320 70 340 180 Z" fill="url(#plR8)" />
    {Array.from({ length: 28 }, (_, i) => <rect key={i} x={95 + (i * 37) % 210} y={110 + (i * 23) % 60} width="16" height="5" rx="2" fill="#f07a2b" transform={`rotate(${(i * 47) % 180} ${103 + (i * 37) % 210} ${112 + (i * 23) % 60})`} />)}
    <ellipse cx="200" cy="96" rx="34" ry="16" fill="#b7703a" />
  </svg>;

const Shield: React.FC<{ s: number; col?: string }> = ({ s, col = TEAL }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M32 4 9 13v17c0 15 10 24 23 30 13-6 23-15 23-30V13z" fill={col} /><path d="M21 32l8 8 15-16" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Check: React.FC<{ s: number; col?: string }> = ({ s, col = GRN }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M12 34l14 14 26-30" stroke={col} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Cross: React.FC<{ s: number; col?: string }> = ({ s, col = RED }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M14 14l36 36M50 14 14 50" stroke={col} strokeWidth="9" strokeLinecap="round" /></svg>;

const Bubble: React.FC<{ x: number; y: number; a: number; s: string; size?: number; col?: string; tail?: 'left' | 'right' }> = ({ x, y, a, s, size = 40, col = '#fff', tail = 'left' }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: clamp(a), scale: String(lerp(.6, 1, eback(clamp(a)))), padding: '18px 28px', borderRadius: tail === 'left' ? '30px 30px 30px 6px' : '30px 30px 6px 30px', background: col, color: '#111', fontFamily: SANS, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,.5)' }}>{s}</div>;

const Chip: React.FC<{ x: number; y: number; a: number; s: string; col: string }> = ({ x, y, a, s, col }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y - (1 - a) * 40, translate: '-50% -50%', opacity: clamp(a * 1.5), padding: '10px 24px', borderRadius: 20, background: col, color: col === Y || col === GRN ? '#111' : '#fff', fontFamily: HEAD, fontWeight: 700, fontSize: 46, whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,.5)' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.15, .2, .3);
  const press = clamp(P(t, T.otk - .1, T.otk + .25) * 2);
  const coin = eout(P(t, T.pul - .2, T.pul + .2));
  const ball = eout(P(t, T.ball1 - .2, T.ball1 + .3));
  return <Layer a={a} z={logZ(P(t, 0, 5.15), 1, 1.05)}>
    <Glow x={CX} y={1040} r={540} a={.9} col={ball > .5 ? '236,58,44' : '63,169,184'} />
    <div style={{ ...abs(CX - 170, 700) }}><Phone w={340} id="p1" glow={.5}><Offer press={press} /></Phone></div>
    {/* finger tap */}
    <div style={{ position: 'absolute', left: CX + 40, top: lerp(1420, 1290, eout(P(t, -0.2, T.otk))), opacity: 1 - P(t, T.otk + .6, T.otk + 1), width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,.35)', border: '4px solid #fff' }} />
    <div style={{ position: 'absolute', left: 120, top: 860, opacity: coin, scale: String(lerp(.5, 1, eback(coin))) }}>
      <div style={{ position: 'relative', width: 170, height: 170, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${YL}, ${Y} 60%, #c9962a)`, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: '#3a2a08' }}>
        so‘m
        <div style={{ position: 'absolute', left: 25, top: 25, opacity: coin * .9 }}><Cross s={120} /></div>
      </div>
    </div>
    <Chip x={800} y={950} a={ball} s="− ball" col={RED} />
    <Head t={t} t0={-1} t1={T.pul - .15} y={490} lines={[['o‘tkazib yuborish'], ['qanchaga tushadi?', 'y']]} size={74} />
    <Head t={t} t0={T.pul - .15} t1={5.15} y={490} lines={[['pul emas —'], ['ball bilan', 'r']]} size={84} from="slam" />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.0, 17.0, .3, .3);
  const aA = env(t, 5.0, 12.15, .3, .3), aB = env(t, 12.0, 17.0, .3, .3);
  const fill = eio(P(t, T.noldan - .2, T.noldan + 1.2));
  const pins = eout(P(t, T.avto - .3, T.avto + .3));
  const lineP = eio(P(t, T.tezroq - .4, T.tezroq + .4));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 5.0, 12.15), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.85} col="63,169,184" />
      {/* system distributing orders */}
      <div style={{ ...abs(SL, 680, SR - SL), display: 'flex', justifyContent: 'space-between', opacity: 1 - eout(P(t, T.har - .3, T.har + .2)) }}>
        {[0, 1, 2].map(i => { const p = eout(P(t, T.avto - .3 + i * .25, T.avto + .2 + i * .25));
          return <div key={i} style={{ width: 270, height: 380, borderRadius: 26, background: 'rgba(255,255,255,.04)', border: `3px solid ${p > .5 ? TEAL : '#2c3342'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Car w={240} id={`d${i}`} col={TAXI} lights={p} />
            <span style={{ fontFamily: MONO, fontSize: 26, color: p > .5 ? Y : GR, opacity: pins }}>{p > .5 ? 'buyurtma ✓' : '…'}</span>
          </div>; })}
      </div>
      <div style={{ ...abs(SL, 1130, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 30, color: GR, opacity: pins * (1 - eout(P(t, T.har - .3, T.har + .2))) }}>taqsimlash — avtomatik</div>
      <div style={{ opacity: eout(P(t, T.har - .2, T.har + .3)) }}>
        <div style={{ ...abs(SL, 700, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: WH }}>PRIORITET</div>
        <Scale x={SL + 40} y={820} w={SR - SL - 80} v={fill} />
        <div style={{ ...abs(SL, 1000, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 130, lineHeight: 1, ...yel, opacity: fill }}>{Math.round(100 * fill)}</div>
        <div style={{ ...abs(SL, 1140, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR, opacity: fill }}>maksimum — 100 ball · minimum — 0</div>
        <Src s={SRC_KB} y={1330} a={eout(P(t, T.noldan, T.noldan + .4))} />
      </div>
      <Head t={t} t0={5.0} t1={T.har - .1} y={490} lines={[['tizim buyurtmani'], ['o‘zi taqsimlaydi', 'y']]} size={72} />
      <Head t={t} t0={T.har - .1} t1={12.15} y={490} lines={[['har haydovchida —'], ['0–100 ball', 'y']]} size={76} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, 12.0, 17.0), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.85} col="61,220,132" />
      <Road t={t} y={1080} speed={0} />
      <div style={{ ...abs(90, 1118), opacity: 1 - .5 * lineP }}><Car w={330} id="cn" lights={.3} /></div>
      <div style={{ ...abs(570, 1118) }}><Car w={330} id="cy" col={TAXI} lights={lineP} /></div>
      <Pill s="prioritet past" x={255} y={1040} a={eout(P(t, T.yuqori - .2, T.yuqori + .2))} size={26} dark col={GR} />
      <Pill s="prioritet yuqori" x={735} y={1040} a={eout(P(t, T.yuqori - .2, T.yuqori + .2))} size={26} col={GRN} />
      {/* order pin a bit closer to the left car */}
      <div style={{ position: 'absolute', left: 300, top: 760, translate: '-50% -50%', width: 96, height: 96, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${YL}, ${Y} 60%, #d9a52c)`, display: 'grid', placeItems: 'center', boxShadow: '0 0 0 8px rgba(247,198,75,.18)' }}>
        <svg width="52" height="52" viewBox="0 0 64 64"><path d="M32 58s18-18 18-32a18 18 0 0 0-36 0c0 14 18 32 18 32z" fill="#111" /><circle cx="32" cy="26" r="7" fill={Y} /></svg>
      </div>
      <svg width="1080" height="1920" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <path d="M340 790 Q560 800 735 1020" stroke={Y} strokeWidth="8" fill="none" strokeDasharray="22 16" pathLength={1} strokeDashoffset={0} opacity={lineP} />
      </svg>
      <Pill s="sal uzoqroq — baribir sizga" x={CX} y={1310} a={eout(P(t, T.uzoq - .2, T.uzoq + .2))} size={30} col={Y} />
      <Src s={SRC_AND} y={1385} a={eout(P(t, T.prio2, T.prio2 + .4))} />
      <Head t={t} t0={12.0} t1={17.0} y={490} lines={[['prioritet yuqori —'], ['buyurtma tezroq', 'g']]} size={72} />
    </Layer>
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 16.85, 22.15, .3, .3);
  const up = eio(P(t, T.oshadi - .4, T.oshadi + .3)), dn = eio(P(t, T.tushadi - .4, T.tushadi + .3));
  const v = .6 + .12 * up - .2 * dn;
  return <Layer a={a} z={logZ(P(t, 16.85, 22.15), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} col={dn > .5 ? '236,58,44' : '61,220,132'} />
    <Scale x={SL + 40} y={720} w={SR - SL - 80} v={v} col={dn > .5 ? RED : GRN} label="sizning prioritetingiz · misol" />
    <div style={{ ...abs(SL, 940, SR - SL), display: 'flex', justifyContent: 'space-between', padding: '0 30px' }}>
      <div style={{ width: 340, height: 330, borderRadius: 26, border: `3px solid ${GRN}`, background: 'rgba(61,220,132,.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: lerp(.25, 1, eout(P(t, T.qabul - .2, T.qabul + .3))) }}>
        <div style={{ translate: `0 ${-20 * up}px` }}><Arrow s={130} up /></div>
        <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH }}>bajardingiz</span>
        <span style={{ fontFamily: MONO, fontSize: 24, color: GRN }}>ball oshadi</span>
      </div>
      <div style={{ width: 340, height: 330, borderRadius: 26, border: `3px solid ${RED}`, background: 'rgba(236,58,44,.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: lerp(.15, 1, eout(P(t, T.otk2 - .2, T.otk2 + .3))) }}>
        <div style={{ translate: `0 ${20 * dn}px` }}><Arrow s={130} /></div>
        <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH }}>o‘tkazdingiz</span>
        <span style={{ fontFamily: MONO, fontSize: 24, color: RED }}>ball tushadi</span>
      </div>
    </div>
    <Src s={SRC_KB} y={1330} a={eout(P(t, T.qabul, T.qabul + .4))} />
    <Head t={t} t0={16.85} t1={T.otk2 - .15} y={490} lines={[['bajarsangiz —'], ['ball oshadi', 'g']]} size={80} />
    <Head t={t} t0={T.otk2 - .15} t1={22.15} y={490} lines={[['o‘tkazsangiz —'], ['ball tushadi', 'r']]} size={80} from="slam" />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 22.0, 33.7, .3, .2);
  const aA = env(t, 22.0, T.lekin, .3, .3), aB = env(t, T.lekin - .2, T.xuddi - .05, .3, .3), aC = env(t, T.xuddi - .25, 33.7, .3, .2);
  const bub = eout(P(t, T.bitta - .3, T.bitta + .1));
  const nxt = eio(P(t, T.ertaga - .4, T.ertaga + .4));
  const rem = eout(P(t, T.eslab - .3, T.eslab + .2));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 22.0, T.lekin), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.85} col="247,198,75" />
      <div style={{ position: 'absolute', left: CX - 170, top: 980 }}><Person s={340} cap /></div>
      <Bubble x={CX} y={830} a={bub} s="«Bittasini o‘tkazdim-ku»" size={42} />
      <Pill s="nima bo‘pti?" x={CX} y={1430 - 40} a={eout(P(t, T.nima - .2, T.nima + .2))} size={32} dark col={Y} />
      <Head t={t} t0={22.0} t1={T.lekin} y={490} lines={[['ko‘p haydovchi'], ['shunday o‘ylaydi', 'y']]} size={76} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.lekin, T.xuddi), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.85} col="236,58,44" />
      {[['BUGUN', 0], ['ERTAGA', 1]].map(([d, i]) => {
        const k = i === 0 ? 1 : nxt;
        return <div key={d as string} style={{ position: 'absolute', left: i === 0 ? SL + 10 : 520, top: 700, width: 400, opacity: lerp(.2, 1, k), translate: `${(1 - k) * 60}px 0` }}>
          <div style={{ borderRadius: 26, overflow: 'hidden', border: '3px solid #2c3342', background: 'rgba(255,255,255,.04)' }}>
            <div style={{ background: i === 0 ? TEAL : Y, color: '#111', fontFamily: HEAD, fontWeight: 700, fontSize: 40, textAlign: 'center', padding: '8px 0' }}>{d as string}</div>
            <div style={{ padding: '26px 24px 30px' }}>
              <div style={{ fontFamily: MONO, fontSize: 20, color: GR }}>prioritet · misol</div>
              <div style={{ marginTop: 10, height: 40, borderRadius: 20, background: '#1a1f29', overflow: 'hidden' }}><div style={{ width: '40%', height: '100%', background: RED, borderRadius: 20 }} /></div>
              <div style={{ marginTop: 14, fontFamily: HEAD, fontWeight: 700, fontSize: 36, color: RED }}>o‘tkazildi ↓</div>
            </div>
          </div>
        </div>;
      })}
      <div style={{ ...abs(SL, 820, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 80, color: Y, opacity: nxt }}>→</div>
      <Pill s="kun almashsa ham — ball qaytmaydi" x={CX} y={1180} a={eout(P(t, T.qayta - .2, T.qayta + .3))} size={32} dark col={RED} />
      <Src s={SRC_KB} y={1290} a={eout(P(t, T.lekin, T.lekin + .4))} />
      <Head t={t} t0={T.lekin - .2} t1={T.xuddi} y={490} lines={[['bugungi xato —'], ['ertaga ham', 'r']]} size={80} />
    </Layer>
    <Layer a={aC} z={logZ(P(t, T.xuddi, 33.7), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="247,198,75" />
      <div style={{ position: 'absolute', left: 110, top: 880 }}><Person s={300} scarf col="#d2a585" /></div>
      <div style={{ position: 'absolute', left: 450, top: 1010, opacity: eout(P(t, T.osh - .3, T.osh + .1)) }}><Plov w={420} /></div>
      <Bubble x={300} y={800} a={rem} s="Eslab qoldim!" size={40} />
      <Pill s="hazil" x={830} y={700} a={eout(P(t, T.xuddi, T.xuddi + .3))} size={20} dark col={GR} />
      <Head t={t} t0={T.xuddi - .25} t1={33.7} y={490} lines={[['qaynonaning oshini'], ['rad etgandek', 'y']]} size={70} />
    </Layer>
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 33.6, 35.3, .12, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} col="236,58,44" />
    <Head t={t} t0={33.6} t1={35.3} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 35.25, 42.4, .3, .3);
  const aA = env(t, 35.25, T.yol - .15, .3, .2), aB = env(t, T.yol - .2, 42.4, .25, .3);
  const b1 = eout(P(t, T.otk3 - .3, T.otk3 + .4)), b2 = eout(P(t, T.bekor - .3, T.qimmat + .3));
  const ask = eout(P(t, T.bekor2 - .4, T.bekor2 + .1));
  const drop = eout(P(t, T.tushir - .3, T.tushir + .3));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 35.25, T.yol), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="236,58,44" />
      <div style={{ ...abs(SL + 40, 700, SR - SL - 80), display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH, height: 110, textAlign: 'center', lineHeight: 1.1 }}>o‘tkazib<br />yuborish</span>
          <div style={{ width: 200, height: 360, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <div style={{ width: 120, height: 130 * b1, borderRadius: '0 0 18px 18px', background: 'linear-gradient(180deg,#7a2a22,#EC3A2C)' }} />
          </div>
          <span style={{ fontFamily: MONO, fontSize: 24, color: RED, opacity: b1 }}>ball ↓</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH, height: 110, textAlign: 'center', lineHeight: 1.1 }}>qabul qilib,<br />bekor qilish</span>
          <div style={{ width: 200, height: 360, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <div style={{ width: 120, height: 340 * b2, borderRadius: '0 0 18px 18px', background: 'linear-gradient(180deg,#7a2a22,#EC3A2C)' }} />
          </div>
          <span style={{ fontFamily: MONO, fontSize: 24, color: RED, opacity: b2 }}>ball ↓↓↓</span>
        </div>
      </div>
      <Pill s="sxema · aniq ball soni ko‘rsatilmagan" x={CX} y={1290} a={eout(P(t, T.qimmat - .2, T.qimmat + .2))} size={22} dark col={GR} />
      <Src s={SRC_KB} y={1370} a={eout(P(t, T.bekor, T.bekor + .4))} />
      <Head t={t} t0={35.25} t1={T.yol - .2} y={490} lines={[['bekor qilish —'], ['o‘tkazishdan qimmat', 'r']]} size={72} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.yol, 42.4), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="236,58,44" />
      <div style={{ position: 'absolute', left: 90, top: 990 }}><Person s={280} cap /></div>
      <div style={{ position: 'absolute', left: 620, top: 990 }}><Person s={280} col="#d8b090" /></div>
      <Bubble x={420} y={860} a={ask} s="«Bekor qilib qo‘ying-chi»" size={36} />
      <div style={{ position: 'absolute', left: CX, top: 1150, translate: '-50% -50%', opacity: drop, scale: String(lerp(1.5, 1, drop)), padding: '10px 28px', borderRadius: 18, border: `5px solid ${RED}`, background: 'rgba(8,9,13,.88)', fontFamily: HEAD, fontWeight: 700, fontSize: 54, color: RED, rotate: '-4deg', whiteSpace: 'nowrap' }}>BALL ↓</div>
      <Src s={SRC_BAN} y={1385} a={eout(P(t, T.yol, T.yol + .4))} />
      <Head t={t} t0={T.yol - .2} t1={42.4} y={490} lines={[['«bekor qiling» deb'], ['so‘rash ham — ↓', 'r']]} size={72} />
    </Layer>
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 42.25, 49.9, .3, .3);
  const aA = env(t, 42.25, T.brend - .1, .3, .3), aB = env(t, T.brend - .3, 49.9, .3, .3);
  const z = eio(P(t, T.nol - .3, T.nol + .6));
  const empty = eout(P(t, T.kelmay - .3, T.kelmay + .1));
  const x1 = eout(P(t, 47.3, 47.7));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 42.25, T.brend), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="236,58,44" />
      <Scale x={SL + 40} y={680} w={SR - SL - 80} v={lerp(.25, 0, z)} col={RED} />
      <div style={{ ...abs(SL, 830, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 120, lineHeight: 1, color: RED }}>{Math.round(lerp(25, 0, z))}</div>
      <div style={{ position: 'absolute', left: CX - 280, top: 990, width: 560, padding: '30px 30px', borderRadius: 28, background: 'rgba(14,16,22,.94)', border: `3px solid ${empty > .5 ? RED : '#2c3342'}`, textAlign: 'center', opacity: lerp(.3, 1, empty) }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>Yandex Pro · misol</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: WH, marginTop: 10 }}>buyurtmalar vaqtincha<br />mavjud emas</div>
      </div>
      <Src s={SRC_KB} y={1330} a={eout(P(t, T.nol, T.nol + .4))} />
      <Head t={t} t0={42.25} t1={T.brend - .1} y={490} lines={[['ball 0 bo‘lsa —'], ['buyurtma kelmaydi', 'r']]} size={72} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.brend, 49.9), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="63,169,184" />
      <div style={{ ...abs(SL, 720, SR - SL), display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        {[['brending', T.brend], ['reyting', T.reyt]].map(([s, t0]) => {
          const k = eout(P(t, (t0 as number) - .3, (t0 as number) + .2));
          return <div key={s as string} style={{ position: 'relative', width: 360, height: 360, borderRadius: 28, border: `3px solid ${x1 > .5 ? RED : TEAL}`, background: 'rgba(255,255,255,.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: lerp(.2, 1, k) }}>
            <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 90, color: GRN, opacity: 1 - .6 * x1 }}>+ ball</span>
            <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 46, color: WH, opacity: 1 - .4 * x1 }}>{s as string}</span>
            <div style={{ position: 'absolute', left: 105, top: 30, opacity: x1, scale: String(lerp(1.4, 1, x1)) }}><Cross s={150} /></div>
          </div>;
        })}
      </div>
      <Pill s="ball 0 bo‘lsa — bular yordam bermaydi" x={CX} y={1170} a={x1} size={30} dark col={RED} />
      <Src s={SRC_KB} y={1290} a={eout(P(t, T.brend, T.brend + .4))} />
      <Head t={t} t0={T.brend - .3} t1={49.9} y={490} lines={[['boshqa ballar'], ['yordam bermaydi', 'r']]} size={78} />
    </Layer>
  </Layer>;
};

const Toggle: React.FC<{ on: number }> = ({ on }) =>
  <div style={{ position: 'relative', width: 150, height: 80, borderRadius: 40, background: on > .5 ? Y : '#2a303c', transition: 'none' }}>
    <div style={{ position: 'absolute', top: 8, left: lerp(8, 78, on), width: 64, height: 64, borderRadius: '50%', background: '#fff' }} />
  </div>;
const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 49.75, 59.45, .3, .3);
  const aA = env(t, 49.75, T.ball2 - .1, .3, .3), aB = env(t, T.ball2 - .3, 59.45, .3, .3);
  const on = eio(P(t, T.band - .3, T.band + .2));
  const noOrd = eout(P(t, T.kelmaydi - .3, T.kelmaydi + .1));
  const keep = eout(P(t, T.tushmay - .3, T.tushmay + .1));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 49.75, T.ball2), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col={on > .5 ? '61,220,132' : '63,169,184'} />
      <Card x={SL + 60} y={700} w={SR - SL - 120}>
        <div style={{ padding: '30px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>status</div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 80, lineHeight: 1, color: on > .5 ? Y : GRN }}>{on > .5 ? 'BAND' : 'LINIYADA'}</div></div>
          <Toggle on={on} />
        </div>
      </Card>
      <div style={{ position: 'absolute', left: CX - 200, top: 900, opacity: lerp(1, .35, noOrd) }}><Car w={400} id="cb" col={TAXI} lights={0} /></div>
      <div style={{ position: 'absolute', left: CX + 150, top: 880, width: 90, height: 90, borderRadius: '50%', background: Y, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: on, scale: String(lerp(.5, 1, eback(on))) }}>
        <div style={{ width: 12, height: 40, background: '#111', borderRadius: 3 }} /><div style={{ width: 12, height: 40, background: '#111', borderRadius: 3 }} />
      </div>
      <div style={{ ...abs(SL + 60, 1110, SR - SL - 120), display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[['yangi buyurtmalar kelmaydi', noOrd, Y], ['prioritet tushmaydi', keep, GRN]].map(([s, k, c]) =>
          <div key={s as string} style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: k as number, translate: `${(1 - (k as number)) * 50}px 0` }}>
            <Check s={56} col={c as string} /><span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 38, color: WH }}>{s as string}</span>
          </div>)}
      </div>
      <Src s={SRC_AND} y={1330} a={eout(P(t, T.band, T.band + .4))} />
      <Pill s="maslahat" x={830} y={660} a={env(t, 49.8, T.ishlay - .2, .3, .2)} size={20} dark col={GR} />
      <Head t={t} t0={49.75} t1={T.ishlay - .15} y={490} lines={[['nima qilish'], ['kerak?', 'y']]} size={84} />
      <Head t={t} t0={T.ishlay - .15} t1={T.ball2} y={490} lines={[['ishlay olmasangiz —'], ['«band» statusi', 'g']]} size={72} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.ball2, 59.45), 1, 1.03)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="61,220,132" />
      <div style={{ ...abs(SL, 720, SR - SL), display: 'flex', justifyContent: 'center', gap: 22 }}>
        {[0, 1, 2, 3, 4].map(i => { const k = eback(P(t, T.ketma - .6 + i * .3, T.ketma - .3 + i * .3));
          return <div key={i} style={{ width: 140, height: 140, borderRadius: 26, background: 'rgba(61,220,132,.12)', border: `3px solid ${GRN}`, display: 'grid', placeItems: 'center', opacity: clamp(k), scale: String(lerp(.5, 1, k)) }}><Check s={90} /></div>; })}
      </div>
      <Scale x={SL + 40} y={960} w={SR - SL - 80} v={lerp(.25, .6, eio(P(t, T.ketma - .5, 59.2)))} col={GRN} label="prioritet tiklanadi · misol" />
      <Src s={SRC_AND} y={1250} a={eout(P(t, T.ball2, T.ball2 + .4))} />
      <Head t={t} t0={T.ball2 - .3} t1={59.45} y={490} lines={[['ketma-ket,'], ['o‘tkazmasdan', 'g']]} size={84} />
    </Layer>
  </Layer>;
};

const Perk: React.FC<{ t: number; t0: number; t1: number; children: React.ReactNode }> = ({ t, t0, t1, children }) => {
  const a = env(t, t0, t1, .3, .25); if (a <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, opacity: a, translate: `${(1 - eout(P(t, t0, t0 + .4))) * 120}px 0` }}>{children}</div>;
};
const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 59.3, 66.6, .3, .3);
  const p4 = eback(P(t, T.p4 - .2, T.p4 + .3));
  const pop = eback(P(t, T.kecha - .2, T.kecha + .3));
  return <Layer a={a}>
    <Glow x={CX} y={1000} r={520} a={.9} col="63,169,184" />
    <Perk t={t} t0={59.3} t1={T.savol - .1}>
      <div style={{ ...abs(SL, 680, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 59.4, 59.8)) }}><Lockup h={96} /></div>
      <Card x={SL + 70} y={830} w={SR - SL - 140} style={{ background: 'linear-gradient(180deg,#f7f9fa,#dfe6e8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px 30px' }}>
          <Shield s={100} />
          <div><div style={{ fontFamily: MONO, fontSize: 20, color: '#5A6169' }}>yo‘lovchi sug‘urtasi</div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 74, lineHeight: 1, color: '#111' }}>OSGOP</div></div>
          <div style={{ marginLeft: 'auto', padding: '8px 16px', borderRadius: 14, background: GRN, color: '#06210f', fontFamily: SANS, fontWeight: 800, fontSize: 26, opacity: eout(P(t, T.bepul - .2, T.bepul + .2)) }}>bepul</div>
        </div>
      </Card>
      <div style={{ ...abs(SL, 1070, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 130, lineHeight: 1, ...yel, opacity: clamp(p4), scale: String(lerp(.5, 1, p4)) }}>+4 <span style={{ fontSize: 60 }}>prioritet</span></div>
      <Src s={SRC_ZT} y={1260} a={eout(P(t, T.p4, T.p4 + .3))} />
      <Head t={t} t0={59.3} t1={T.savol - .1} y={490} lines={[['osgop bepul —'], ['+4 prioritet', 'y']]} size={80} />
    </Perk>
    <Perk t={t} t0={T.savol - .1} t1={66.6}>
      <div style={{ position: 'absolute', left: CX, top: 960, translate: '-50% -50%', width: 320, height: 320, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)', scale: String(lerp(.85, 1, pop)) }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 124, lineHeight: 1, color: Y }}>24/7</div><div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>yordam</div></div>
      </div>
      <Src s="Zero Taxi ma’lumoti" y={1200} a={1} />
      <Head t={t} t0={T.savol - .1} t1={66.6} y={490} lines={[['savol tug‘ilsa —'], ['yordam 24/7', 'y']]} size={80} />
    </Perk>
  </Layer>;
};

const S10: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 66.2, END + 1, .3, .1);
  return <Layer a={a}>
    <ZtEnd t={t} t0={T.ulan} perks={['OSGOP bepul · +4 prioritet', '24/7 yordam', '+10% balansga bonus', '5 soniyada yechish · 0% komissiya']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.ball1, 8, 7], [T.tushadi, 8, 7], [T.endi, 20, 5], [T.qimmat, 10, 6], [T.tushir, 8, 7], [T.kelmay, 12, 6], [T.bermay, 8, 7], [T.p4, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9, S10]} hits={HITS} />;

export const Cover: React.FC = () =>
  <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1150} r={600} a={1} col="236,58,44" />
    <div style={{ ...abs(CX - 160, 820) }}><Phone w={320} id="pc" glow={.6}><Offer press={1} /></Phone></div>
    <div style={{ position: 'absolute', left: 770, top: 1060, translate: '-50% -50%', padding: '10px 24px', borderRadius: 20, background: RED, color: '#fff', fontFamily: HEAD, fontWeight: 700, fontSize: 56, rotate: '6deg' }}>− ball</div>
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 32, color: GR }}>yandex go · haydovchi · prioritet</div>
    <div style={{ ...abs(SL, 500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 118, lineHeight: 1.04, ...yel }}>BUYURTMANI<br />O‘TKAZAYMI?</div>
    <div style={{ ...abs(SL, 1500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.1, color: GRN }}>«BAND» STATUSI —<br />BALLNI ASRAYDI</div>
  </AbsoluteFill>;
