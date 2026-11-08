import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, YL, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone, Car } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Card, Src, Num, Background, Reel, ZtEnd } from '../kit';
import { END, T } from './ep';

const KB_SURGE = 'manba: Yandex Pro bilimlar bazasi (O‘zbekiston) — «Что такое повышенный спрос»';
const KB_RIDE = 'manba: Yandex Pro bilimlar bazasi (O‘zbekiston) — «Как распределяются заказы»';
const PUR = '#9B6BFF';
const PURRGB = '155,107,255';
const TAXI: [string, string] = ['#FFE09A', '#E0A82E'];

/* ---------- art ---------- */
const Person: React.FC<{ s: number; col?: string; scarf?: boolean; hand?: number }> = ({ s, col = '#c49a7a', scarf, hand = 0 }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 100 120" style={{ display: 'block', overflow: 'visible' }}>
    {hand > 0 && <path d={`M78 84 L${lerp(84, 92, hand)} ${lerp(70, 40, hand)}`} stroke={scarf ? '#6b3a50' : '#4a5264'} strokeWidth="12" strokeLinecap="round" />}
    {scarf && <path d="M22 34c0-22 56-22 56 0v14c-6-8-14-12-28-12s-22 4-28 12z" fill="#8a3b5a" />}
    <circle cx="50" cy="34" r="20" fill={col} />
    <path d="M10 120c2-34 18-50 40-50s38 16 40 50z" fill={scarf ? '#6b3a50' : '#4a5264'} />
    {!scarf && <path d="M30 28c4-14 36-14 40 0" stroke="#2a2018" strokeWidth="10" fill="none" strokeLinecap="round" />}
    {scarf && <path d="M28 30c2-14 42-14 44 0" stroke="#8a3b5a" strokeWidth="9" fill="none" strokeLinecap="round" />}
  </svg>;

/* car seen from above */
const TopCar: React.FC<{ s: number; col?: string; rot?: number }> = ({ s, col = '#d8dde6', rot = 0 }) =>
  <svg width={s} height={s * 1.7} viewBox="0 0 40 68" style={{ display: 'block', rotate: `${rot}deg`, overflow: 'visible' }}>
    <rect x="2" y="2" width="36" height="64" rx="11" fill={col} stroke="#0b0d12" strokeWidth="2.5" />
    <path d="M7 18 Q20 12 33 18 L31 27 Q20 24 9 27 Z" fill="#1d2a3c" />
    <path d="M9 50 Q20 53 31 50 L32 57 Q20 60 8 57 Z" fill="#1d2a3c" />
    <rect x="8" y="30" width="24" height="17" rx="4" fill="#000" opacity=".12" />
  </svg>;

const Cloud: React.FC<{ s: number; t: number; rain?: number }> = ({ s, t, rain = 1 }) =>
  <svg width={s} height={s * .95} viewBox="0 0 100 95" style={{ display: 'block', overflow: 'visible' }}>
    {rain > 0 && Array.from({ length: 9 }, (_, i) => { const ph = ((t * 1.6 + i * .37) % 1); const x = 18 + (i * 9) % 66;
      return <line key={i} x1={x} y1={46 + ph * 46} x2={x - 4} y2={56 + ph * 46} stroke={TEAL} strokeWidth="3" strokeLinecap="round" opacity={rain * (1 - ph) * .9} />; })}
    <path d="M24 48a16 16 0 0 1 4-31 22 22 0 0 1 41 4 14 14 0 0 1 9 27z" fill="#c9d3e0" />
    <path d="M24 48a16 16 0 0 1 4-31 22 22 0 0 1 41 4 14 14 0 0 1 9 27z" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="2" />
  </svg>;

const Jam: React.FC<{ s: number; t: number }> = ({ s, t }) =>
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <rect x="70" y="8" width="22" height="56" rx="7" fill="#1a1e27" stroke="#3a4256" strokeWidth="2" />
    <circle cx="81" cy="22" r="7" fill={RED} opacity={.6 + .4 * Math.abs(Math.sin(t * 3))} /><circle cx="81" cy="38" r="7" fill="#4a3a14" /><circle cx="81" cy="54" r="7" fill="#143a24" />
    <rect x="79" y="64" width="4" height="30" fill="#3a4256" />
    {[0, 1, 2].map(i => <g key={i} transform={`translate(${6 + i * 20} ${18 + i * 22})`}><rect width="44" height="20" rx="6" fill={i === 1 ? '#E0A82E' : '#8b94a8'} /><rect x="30" y="4" width="10" height="12" rx="2" fill="#1d2a3c" /><circle cx="2" cy="10" r="3" fill={RED} /></g>)}
  </svg>;

const Stage: React.FC<{ s: number; t: number }> = ({ s, t }) =>
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <path d={`M20 10 L${34 + Math.sin(t * 2) * 6} 70 L${6 + Math.sin(t * 2) * 6} 70 Z`} fill={Y} opacity=".25" />
    <path d={`M80 10 L${94 - Math.sin(t * 2) * 6} 70 L${66 - Math.sin(t * 2) * 6} 70 Z`} fill={TEAL} opacity=".25" />
    <rect x="8" y="66" width="84" height="12" rx="3" fill="#3a4256" />
    {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={12 + i * 9.5} cy={86 + (i % 2) * 3} r="5" fill="#5a6274" />)}
    <path d="M50 26l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill={Y} />
  </svg>;

const Headset: React.FC<{ s: number }> = ({ s }) =>
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <circle cx="50" cy="42" r="20" fill="#c49a7a" /><path d="M14 100c2-26 16-36 36-36s34 10 36 36z" fill="#4a5264" />
    <path d="M26 42a24 24 0 0 1 48 0" stroke="#cfd6e2" strokeWidth="6" fill="none" /><rect x="20" y="38" width="10" height="16" rx="4" fill="#cfd6e2" /><rect x="70" y="38" width="10" height="16" rx="4" fill="#cfd6e2" />
    <path d="M75 54 Q72 64 58 64" stroke="#cfd6e2" strokeWidth="4" fill="none" />
  </svg>;

const Chip: React.FC<{ s: number; t: number }> = ({ s, t }) =>
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>
    {Array.from({ length: 5 }, (_, i) => <g key={i}><rect x={22 + i * 13} y="4" width="5" height="14" fill={TEAL} /><rect x={22 + i * 13} y="82" width="5" height="14" fill={TEAL} /><rect x="4" y={22 + i * 13} width="14" height="5" fill={TEAL} /><rect x="82" y={22 + i * 13} width="14" height="5" fill={TEAL} /></g>)}
    <rect x="16" y="16" width="68" height="68" rx="10" fill="#14323a" stroke={TEAL} strokeWidth="4" />
    <g transform={`rotate(${t * 60} 50 50)`}><circle cx="50" cy="50" r="16" fill="none" stroke={Y} strokeWidth="7" strokeDasharray="8 5" /></g>
    <circle cx="50" cy="50" r="6" fill={Y} />
  </svg>;

const Check: React.FC<{ s: number; col?: string }> = ({ s, col = GRN }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M12 34l14 14 26-30" stroke={col} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Cross: React.FC<{ s: number; col?: string }> = ({ s, col = RED }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M14 14l36 36M50 14 14 50" stroke={col} strokeWidth="9" strokeLinecap="round" /></svg>;
const Shield: React.FC<{ s: number; col?: string }> = ({ s, col = TEAL }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M32 4 9 13v17c0 15 10 24 23 30 13-6 23-15 23-30V13z" fill={col} /><path d="M21 32l8 8 15-16" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Eye: React.FC<{ s: number }> = ({ s }) =>
  <svg width={s} height={s * .6} viewBox="0 0 100 60"><path d="M4 30 Q50 -14 96 30 Q50 74 4 30z" fill="#e9eef5" /><circle cx="50" cy="30" r="17" fill={TEAL} /><circle cx="50" cy="30" r="8" fill="#0b0d12" /><circle cx="44" cy="24" r="4" fill="#fff" /></svg>;

/* stylised city map; children positioned in map units (760 x 640) via MapAt */
const MW = 760, MH = 640;
const MapView: React.FC<{ w: number; t: number; zone: number; id: string; zr?: number; children?: React.ReactNode }> = ({ w, t, zone, id, zr = 1, children }) => {
  const k = w / MW;
  const pulse = 1 + Math.sin(t * 4) * .03;
  return <div style={{ position: 'relative', width: w, height: MH * k, borderRadius: 28 * k + 6, overflow: 'hidden', border: '2px solid rgba(255,255,255,.12)', boxShadow: '0 20px 60px rgba(0,0,0,.6)' }}>
    <svg width={w} height={MH * k} viewBox={`0 0 ${MW} ${MH}`} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <radialGradient id={`zg${id}`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor={PUR} stopOpacity=".55" /><stop offset=".75" stopColor={PUR} stopOpacity=".35" /><stop offset="1" stopColor={PUR} stopOpacity=".05" /></radialGradient>
      </defs>
      <rect width={MW} height={MH} fill="#121722" />
      {[[0, 0, 100, 90], [140, 0, 150, 90], [330, 0, 120, 90], [490, 0, 130, 90], [660, 0, 100, 90],
        [0, 130, 100, 150], [140, 130, 150, 150], [330, 130, 120, 150], [490, 130, 130, 150], [660, 130, 100, 150],
        [0, 320, 100, 130], [140, 320, 150, 130], [330, 320, 120, 130], [490, 320, 130, 130], [660, 320, 100, 130],
        [0, 490, 100, 150], [140, 490, 150, 150], [330, 490, 120, 150], [490, 490, 130, 150], [660, 490, 100, 150]].map(([x, y, bw, bh], i) =>
        <rect key={i} x={x + 6} y={y + 6} width={bw - 12} height={bh - 12} rx="8" fill={i % 7 === 3 ? '#16302a' : '#1a202d'} />)}
      <path d="M0 600 L760 60" stroke="#2a3142" strokeWidth="16" opacity=".7" />
      <path d="M560 0 Q600 300 760 380" stroke="#1d4b5a" strokeWidth="22" fill="none" opacity=".8" />
      {zone > 0 && <g opacity={zone}>
        <path d={`M ${380 - 220 * zr * pulse} 330 C ${380 - 230 * zr} ${150} ${380 + 120 * zr} ${110} ${380 + 215 * zr * pulse} 300 C ${380 + 240 * zr} ${460} ${380 - 60 * zr} ${560} ${380 - 220 * zr * pulse} 330 Z`} fill={`url(#zg${id})`} stroke={PUR} strokeWidth="5" strokeDasharray="14 8" />
      </g>}
    </svg>
    <div style={{ position: 'absolute', inset: 0, scale: String(k), transformOrigin: '0 0', width: MW, height: MH }}>{children}</div>
  </div>;
};
const MapAt: React.FC<{ x: number; y: number; a?: number; children: React.ReactNode; s?: number }> = ({ x, y, a = 1, children, s = 1 }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: a, scale: String(s) }}>{children}</div>;
const Pin: React.FC<{ s?: number }> = ({ s = 70 }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 64 76" style={{ display: 'block', overflow: 'visible', translate: `0 ${-s * .45}px` }}>
    <path d="M32 74s24-24 24-42a24 24 0 0 0-48 0c0 18 24 42 24 42z" fill={Y} stroke="#111" strokeWidth="3" /><circle cx="32" cy="31" r="9" fill="#111" />
  </svg>;

/* order card inside a phone */
const OrderCard: React.FC<{ w: number; t: number; plus: number }> = ({ w, plus }) =>
  <div style={{ width: w, borderRadius: 22, background: 'linear-gradient(180deg,#1f2533,#121620)', border: '1.5px solid rgba(255,255,255,.12)', padding: 18 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 19, color: GR }}><span>Yangi buyurtma</span><span>18:40</span></div>
    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: SANS, fontWeight: 700, fontSize: 24, color: WH }}><div style={{ width: 14, height: 14, borderRadius: 7, background: TEAL }} />Chorsu</div>
      <div style={{ marginLeft: 5, width: 2, height: 14, background: '#3a4256' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: SANS, fontWeight: 700, fontSize: 24, color: WH }}><div style={{ width: 14, height: 14, borderRadius: 3, background: Y }} />Sergeli</div>
    </div>
    <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 46, color: WH, lineHeight: 1 }}>{plus > .5 ? '31 000' : '26 000'}<span style={{ fontSize: 20, color: GR }}> so‘m</span></div>
    </div>
    <div style={{ marginTop: 14, display: 'inline-block', padding: '8px 16px', borderRadius: 14, background: `rgba(${PURRGB},.25)`, border: `2px solid ${PUR}`, fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH, opacity: plus, scale: String(lerp(1.6, 1, eout(clamp(plus)))), transformOrigin: 'left center' }}>+5 000</div>
  </div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.4, .2, .3);
  const up = eout(P(t, T.oshib - .3, T.oshib + .2));
  return <Layer a={a} z={logZ(P(t, 0, 3.4), 1, 1.05)}>
    <Glow x={CX} y={1050} r={540} a={.9} col="63,169,184" />
    <div style={{ position: 'absolute', left: CX - 210, top: 650 }}><Cloud s={420} t={t} /></div>
    <div style={{ position: 'absolute', left: CX - 280, top: 1050 }}><Car w={560} id="c1" col={TAXI} lights={.8} /></div>
    <div style={{ position: 'absolute', left: CX, top: 1320, translate: '-50% -50%', display: 'flex', alignItems: 'center', gap: 14, padding: '12px 26px', borderRadius: 22, background: 'rgba(14,16,22,.94)', border: `3px solid ${up > .5 ? Y : '#3a4356'}`, fontFamily: HEAD, fontWeight: 700, fontSize: 50, color: up > .5 ? Y : WH }}>
      {up > .5 ? '31 000' : '26 000'} so‘m
      <svg width="44" height="44" viewBox="0 0 64 64" style={{ opacity: up, translate: `0 ${(1 - up) * 20}px` }}><path d="M32 8 56 36H40v20H24V36H8z" fill={Y} /></svg>
    </div>
    <Pill s="misol" x={790} y={1250} a={eout(P(t, .3, .6))} size={20} dark col={GR} />
    <Head t={t} t0={-1} t1={3.4} y={490} lines={[['yomg‘ir yog‘sa —'], ['narx nega oshadi?', 'y']]} size={70} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 3.25, 13.1, .3, .3);
  const aA = env(t, 3.25, T.buni, .3, .3), aB = env(t, T.buni - .2, 13.1, .3, .3);
  const nP = Math.floor(lerp(0, 9.4, P(t, T.yuqori, T.bosh)));
  const gt = eout(P(t, T.kop - .2, T.kop + .2));
  const up = eout(P(t, T.narx - .1, T.narx + .3));
  const x1 = eback(P(t, T.disp - .2, T.disp + .3)), ok = eback(P(t, T.avto - .2, T.avto + .3));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 3.25, T.buni), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col={up > .5 ? '247,198,75' : PURRGB} />
      <Card x={SL + 10} y={700} w={SR - SL - 20} a={eout(P(t, 3.3, 3.8))}>
        <div style={{ display: 'flex', alignItems: 'stretch', padding: '26px 20px', gap: 10 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: MONO, fontSize: 21, color: GR }}>chaqirayotganlar</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: 8 }}>
              {Array.from({ length: 9 }, (_, i) => <div key={i} style={{ opacity: i < nP ? 1 : .12 }}><Person s={80} hand={i < nP ? 1 : 0} col={['#c49a7a', '#d2a585', '#b58866'][i % 3]} /></div>)}
            </div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: Y, lineHeight: 1 }}>{nP}</div>
          </div>
          <div style={{ width: 90, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 120, color: Y, opacity: gt, scale: String(lerp(.4, 1, gt)) }}>&gt;</div>
          <div style={{ flex: .8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: MONO, fontSize: 21, color: GR }}>bo‘sh mashinalar</div>
            <div style={{ display: 'flex', gap: 14, height: 312, alignItems: 'center', opacity: eout(P(t, T.bosh - .2, T.bosh + .2)) }}>
              {[0, 1, 2].map(i => <TopCar key={i} s={58} col={i === 1 ? '#FFE09A' : '#d8dde6'} />)}
            </div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: TEAL, lineHeight: 1, opacity: eout(P(t, T.bosh - .2, T.bosh + .2)) }}>3</div>
          </div>
        </div>
      </Card>
      <div style={{ position: 'absolute', left: CX, top: 1300, translate: '-50% -50%', opacity: up, scale: String(lerp(.6, 1, eback(up))), display: 'flex', alignItems: 'center', gap: 16, padding: '14px 30px', borderRadius: 22, background: Y, color: '#111', fontFamily: HEAD, fontWeight: 700, fontSize: 52 }}>
        <svg width="48" height="48" viewBox="0 0 64 64"><path d="M32 8 56 36H40v20H24V36H8z" fill="#111" /></svg>NARX OSHADI
      </div>
      <Pill s="misol" x={830} y={690} a={eout(P(t, 3.5, 3.8))} size={20} dark col={GR} />
      <Head t={t} t0={3.25} t1={T.bir - .1} y={490} lines={[['bu —'], ['yuqori talab', 'y']]} size={84} from="slam" />
      <Head t={t} t0={T.bir - .1} t1={T.buni} y={490} lines={[['chaqiruvchi ko‘p,'], ['mashina kam', 'y']]} size={72} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.buni, 13.1), 1, 1.04)}>
      <Glow x={CX} y={1000} r={520} a={.9} col={ok > .5 ? '61,220,132' : '63,169,184'} />
      <div style={{ position: 'absolute', left: 120, top: 760 }}>
        <div style={{ position: 'relative', width: 300, height: 300, opacity: 1 - .5 * clamp(x1) }}><Headset s={300} /></div>
        <div style={{ position: 'absolute', left: 30, top: 30, opacity: clamp(x1), scale: String(lerp(1.5, 1, clamp(x1))) }}><Cross s={240} /></div>
        <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR, marginTop: 14 }}>dispetcher</div>
      </div>
      <div style={{ position: 'absolute', left: 560, top: 760, opacity: eout(P(t, T.tizim - .3, T.tizim + .1)), scale: String(lerp(.7, 1, eback(P(t, T.tizim - .3, T.tizim + .3)))) }}>
        <Chip s={300} t={t} />
        <div style={{ textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR, marginTop: 14 }}>tizim</div>
        <div style={{ position: 'absolute', left: 220, top: -30, opacity: clamp(ok), scale: String(lerp(.4, 1, clamp(ok))) }}><Check s={110} /></div>
      </div>
      <Pill s="avtomatik" x={CX} y={1240} a={clamp(ok)} size={38} col={GRN} />
      <Src s={KB_SURGE} y={1370} a={eout(P(t, T.buni, T.buni + .4))} />
      <Head t={t} t0={T.buni - .2} t1={13.1} y={490} lines={[['dispetcher emas —'], ['tizimning o‘zi', 'g']]} size={70} />
    </Layer>
  </Layer>;
};

const Reason: React.FC<{ a: number; label: string; children: React.ReactNode }> = ({ a, label, children }) =>
  <div style={{ width: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '26px 0', borderRadius: 24, background: a > .5 ? 'rgba(63,169,184,.14)' : 'rgba(255,255,255,.03)', border: `3px solid ${a > .5 ? TEAL : '#2c3342'}`, opacity: lerp(.25, 1, clamp(a)), scale: String(lerp(.85, 1, eback(clamp(a)))) }}>
    {children}
    <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 42, color: a > .5 ? WH : GR }}>{label}</span>
  </div>;
const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 13.0, 23.95, .3, .3);
  const aA = env(t, 13.0, T.yomgir2 - .05, .3, .3), aB = env(t, T.yomgir2 - .25, 23.95, .3, .3);
  const call = eout(P(t, T.hatto, T.qayn + .2));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 13.0, T.yomgir2), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="63,169,184" />
      <div style={{ ...abs(SL + 5, 780, SR - SL - 10), display: 'flex', justifyContent: 'space-between' }}>
        <Reason a={eout(P(t, T.yomon - .3, T.yomon + .1))} label="ob-havo"><Cloud s={190} t={t} /></Reason>
        <Reason a={eout(P(t, T.tirband - .3, T.tirband + .1))} label="tirbandlik"><Jam s={190} t={t} /></Reason>
        <Reason a={eout(P(t, T.katta - .3, T.katta + .1))} label="tadbirlar"><Stage s={190} t={t} /></Reason>
      </div>
      <Pill s="eng ko‘p uchraydigan sabablar" x={CX} y={1250} a={eout(P(t, T.sabab3, T.sabab3 + .3))} size={30} dark col={TEAL} />
      <Src s={KB_SURGE} y={1370} a={eout(P(t, T.kopincha, T.kopincha + .4))} />
      <Head t={t} t0={13.0} t1={T.yomgir2} y={490} lines={[['ko‘pincha'], ['3 sabab', 'y']]} size={84} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.yomgir2, 23.95), 1, 1.04)}>
      <Glow x={CX} y={1050} r={520} a={.85} col="247,198,75" />
      <div style={{ position: 'absolute', left: 380, top: 640 }}><Cloud s={300} t={t} /></div>
      <div style={{ position: 'absolute', left: 130, top: 920 }}><Person s={330} scarf col="#d2a585" /></div>
      <div style={{ position: 'absolute', left: 420, top: 960, opacity: call, padding: '20px 28px', borderRadius: '28px 28px 28px 6px', background: WH, color: '#111', fontFamily: SANS, fontWeight: 800, fontSize: 40, whiteSpace: 'nowrap', scale: String(lerp(.6, 1, eback(call))) }}>«Taksi chaqir!»</div>
      <Pill s="bozor — 2 qadam" x={650} y={1240} a={eout(P(t, T.bozor - .2, T.bozor + .2))} size={32} col={GRN} />
      <Head t={t} t0={T.yomgir2 - .25} t1={T.hatto - .1} y={490} lines={[['yomg‘irda hamma'], ['taksi chaqiradi', 'y']]} size={70} />
      <Head t={t} t0={T.hatto - .1} t1={23.95} y={490} lines={[['hatto'], ['qaynona ham', 'y']]} size={80} />
    </Layer>
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 23.8, 34.05, .3, .2);
  const zone = eout(P(t, T.binafsha - .3, T.binafsha + .3));
  const showOrder = eout(P(t, T.buyurtmada - .4, T.buyurtmada));
  const plus = eout(P(t, T.plyus - .1, T.plyus + .3));
  const pas = eio(P(t, T.yolovchi - .4, T.yolovchi + .3));
  const pw = 360;
  const px = lerp(CX - pw / 2, 110, pas);
  return <Layer a={a} z={logZ(P(t, 23.8, 34.05), 1, 1.03)}>
    <Glow x={CX} y={1020} r={560} a={.9} col={PURRGB} />
    <div style={{ position: 'absolute', left: px, top: 640, scale: String(lerp(1, .88, pas)), transformOrigin: '0 0' }}>
      <Phone w={pw} id="p4">
        <div style={{ position: 'absolute', inset: 0, background: '#121722' }}>
          <div style={{ position: 'absolute', left: -60, top: 60 }}>
            <MapView w={480} t={t} zone={zone} id="m4">
              <MapAt x={250} y={210}><TopCar s={30} rot={20} /></MapAt>
              <MapAt x={520} y={420}><TopCar s={30} rot={-70} /></MapAt>
              <MapAt x={380} y={330}><TopCar s={36} col="#FFE09A" rot={0} /></MapAt>
            </MapView>
          </div>
          <div style={{ position: 'absolute', left: 12, right: 12, top: 140, opacity: zone * (1 - showOrder), padding: '10px 14px', borderRadius: 14, background: 'rgba(14,16,22,.9)', border: `2px solid ${PUR}`, fontFamily: SANS, fontWeight: 800, fontSize: 20, color: WH }}>Yuqori talab zonasi</div>
          <div style={{ position: 'absolute', left: 12, right: 12, bottom: 30, opacity: showOrder, translate: `0 ${(1 - showOrder) * 200}px` }}>
            <OrderCard w={pw * .92 - 24} t={t} plus={plus} />
          </div>
        </div>
      </Phone>
    </div>
    {pas > 0 && <div style={{ position: 'absolute', left: lerp(1000, 560, pas), top: 700 }}>
      <Phone w={320} id="p4b">
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#e9eef5,#cfd8e4)', padding: '90px 16px 0' }}>
          <div style={{ fontFamily: MONO, fontSize: 18, color: '#5a6170' }}>Yo‘lovchi ilovasi</div>
          <div style={{ marginTop: 18, fontFamily: SANS, fontWeight: 800, fontSize: 22, color: '#111' }}>Chorsu → Sergeli</div>
          <div style={{ marginTop: 22, padding: 16, borderRadius: 18, background: '#fff', boxShadow: '0 6px 20px rgba(0,0,0,.15)' }}>
            <div style={{ fontFamily: MONO, fontSize: 17, color: '#5a6170' }}>Narx</div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: '#111', lineHeight: 1.1 }}>31 000 <span style={{ fontSize: 20 }}>so‘m</span></div>
            <div style={{ marginTop: 8, display: 'inline-block', padding: '4px 10px', borderRadius: 10, background: `rgba(${PURRGB},.18)`, fontFamily: SANS, fontWeight: 800, fontSize: 17, color: '#5b33c9' }}>yuqori talab</div>
          </div>
          <div style={{ marginTop: 22, padding: '16px 0', borderRadius: 16, background: '#111', color: Y, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 22 }}>Chaqirish</div>
        </div>
      </Phone>
    </div>}
    <Pill s="binafsha zona" x={790} y={720} a={zone * (1 - pas) * (1 - showOrder)} size={30} col={PUR} />
    <Pill s="misol" x={830} y={1020} a={showOrder * (1 - pas)} size={20} dark col={GR} />
    <Src s={KB_SURGE} y={1395} a={eout(P(t, T.binafsha, T.binafsha + .4))} />
    <Head t={t} t0={23.8} t1={T.binafsha - .1} y={490} lines={[['Yandex Pro'], ['xaritasida', 'y']]} size={76} />
    <Head t={t} t0={T.binafsha - .1} t1={T.buyurtmada - .1} y={490} lines={[['binafsha zona —'], ['yuqori talab', 'y']]} size={72} />
    <Head t={t} t0={T.buyurtmada - .1} t1={T.yolovchi - .2} y={490} lines={[['«+5 000» —'], ['narxga qo‘shilgan', 'y']]} size={70} />
    <Head t={t} t0={T.yolovchi - .2} t1={34.05} y={490} lines={[['yo‘lovchi ham'], ['narxni ko‘radi', 'g']]} size={72} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 33.9, 35.6, .12, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} col={PURRGB} />
    <Head t={t} t0={33.9} t1={35.6} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 35.4, 44.05, .3, .3);
  const enter = eio(P(t, T.binafsha2 - .2, T.binafsha2 + 1.2));
  const ph2 = eio(P(t, T.ikki - .2, T.ikki + .6));
  const sx = lerp(lerp(760, 590, enter), 560, ph2), sy = lerp(lerp(600, 470, enter), 330, ph2);
  const ax = lerp(320, 200, ph2), ay = lerp(250, 330, ph2);
  const line1 = eout(P(t, T.buyurtma - .1, T.yaqin + .1)) * (1 - ph2);
  const ring = eout(P(t, T.bir2 - .3, T.bir2 + .2));
  const win = eout(P(t, T.prior - .1, T.prior + .3));
  const lineW = win;
  const mw = SR - SL;
  const k = mw / MW;
  return <Layer a={a} z={logZ(P(t, 35.4, 44.05), 1, 1.03)}>
    <Glow x={CX} y={1000} r={560} a={.9} col={win > .5 ? '61,220,132' : PURRGB} />
    <div style={{ position: 'absolute', left: SL, top: 640 }}>
      <MapView w={mw} t={t} zone={1} id="m6">
        <svg width={MW} height={MH} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {ring > 0 && <circle cx="380" cy="330" r={180} fill="none" stroke={WH} strokeOpacity={.6 * ring} strokeWidth="4" strokeDasharray="12 10" />}
          {line1 > 0 && <line x1="380" y1="330" x2={ax} y2={ay} stroke={GRN} strokeWidth="8" strokeLinecap="round" opacity={line1} strokeDasharray="16 10" />}
          {lineW > 0 && <line x1="380" y1="330" x2={sx} y2={sy} stroke={GRN} strokeWidth="9" strokeLinecap="round" opacity={lineW} />}
        </svg>
        <MapAt x={140} y={110}><TopCar s={34} rot={90} /></MapAt>
        <MapAt x={660} y={140}><TopCar s={34} rot={180} /></MapAt>
        <MapAt x={ax} y={ay} a={1 - .55 * win}><div style={{ borderRadius: 20, boxShadow: line1 > .3 ? `0 0 0 8px rgba(61,220,132,${.5 * line1})` : 'none' }}><TopCar s={42} rot={lerp(20, 90, ph2)} /></div></MapAt>
        <MapAt x={sx} y={sy}><div style={{ borderRadius: 20, boxShadow: win > .3 ? `0 0 0 8px rgba(61,220,132,${.6 * win})` : 'none' }}><TopCar s={42} col="#FFE09A" rot={lerp(-50, -90, ph2)} /></div></MapAt>
        <MapAt x={sx} y={sy - 72}><div style={{ padding: '4px 14px', borderRadius: 14, background: Y, color: '#111', fontFamily: SANS, fontWeight: 800, fontSize: 26 }}>SIZ</div></MapAt>
        <MapAt x={380} y={330}><Pin s={64} /></MapAt>
        <MapAt x={sx} y={sy + 82} a={win}><div style={{ padding: '4px 14px', borderRadius: 14, background: GRN, color: '#06210f', fontFamily: SANS, fontWeight: 800, fontSize: 26, whiteSpace: 'nowrap' }}>prioritet ↑</div></MapAt>
      </MapView>
    </div>
    <Pill s="kirishning o‘zi — yetmaydi" x={CX} y={1250} a={env(t, T.yetmaydi - .2, T.buyurtma, .2, .2)} size={32} dark col={RED} />
    <Pill s="eng yaqin mos mashina" x={CX} y={1250} a={env(t, T.yaqin - .2, T.ikki, .2, .2)} size={32} dark col={GRN} />
    <Pill s="masofa teng" x={CX} y={1250} a={env(t, T.bir2 - .2, T.prior, .2, .2)} size={32} dark col={WH} />
    <Pill s="prioriteti yuqorisi oladi" x={CX} y={1250} a={eout(P(t, T.prior, T.prior + .3))} size={32} col={GRN} />
    <Src s={KB_RIDE} y={1390} a={eout(P(t, T.buyurtma, T.buyurtma + .4))} />
    <Head t={t} t0={35.4} t1={T.buyurtma - .1} y={490} lines={[['zonaga kirishning'], ['o‘zi yetmaydi', 'r']]} size={70} />
    <Head t={t} t0={T.buyurtma - .1} t1={T.ikki - .1} y={490} lines={[['buyurtma —'], ['eng yaqin mashinaga', 'y']]} size={66} />
    <Head t={t} t0={T.ikki - .1} t1={44.05} y={490} lines={[['masofa teng bo‘lsa —'], ['prioritet hal qiladi', 'g']]} size={64} />
  </Layer>;
};

const FLOCK: [number, number, number, number][] = [[-40, 120, 300, 230], [800, 80, 470, 210], [-40, 520, 260, 400], [800, 600, 520, 430], [380, -60, 360, 200], [380, 700, 400, 470], [-40, 330, 210, 320], [800, 330, 560, 300], [100, -60, 290, 280], [660, -60, 470, 300], [100, 700, 320, 420], [660, 700, 470, 390]];
const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 43.9, 53.45, .3, .3);
  const aA = env(t, 43.9, T.shuning, .3, .3), aB = env(t, T.shuning - .2, 53.45, .3, .3);
  const fade = 1 - .85 * eio(P(t, T.tugaydi - .4, T.tugaydi + .5));
  const mw = SR - SL;
  const eyeA = eout(P(t, T.xarita - .2, T.xarita + .3));
  const near = eout(P(t, T.yaqinroq - .2, T.yaqinroq + .3));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 43.9, T.shuning), 1, 1.04)}>
      <Glow x={CX} y={1000} r={560} a={.9} col={fade < .5 ? '63,169,184' : PURRGB} />
      <div style={{ position: 'absolute', left: SL, top: 660 }}>
        <MapView w={mw} t={t} zone={fade} id="m7">
          {FLOCK.map(([x0, y0, x1, y1], i) => { const p = eio(P(t, T.yetib - .6 + i * .12, T.yetib + .6 + i * .12));
            const rot = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI + 90;
            return <MapAt key={i} x={lerp(x0, x1, p)} y={lerp(y0, y1, p)}><TopCar s={32} rot={rot} col={i % 4 === 0 ? '#FFE09A' : '#d8dde6'} /></MapAt>; })}
          <MapAt x={380} y={330}><Pin s={56} /></MapAt>
        </MapView>
      </div>
      <Pill s="bo‘sh mashina ko‘p" x={CX} y={1250} a={env(t, T.kopay - .2, T.tugaydi, .2, .2)} size={32} dark col={TEAL} />
      <Pill s="yuqori talab — tugadi" x={CX} y={1250} a={eout(P(t, T.tugaydi, T.tugaydi + .3))} size={32} dark col={GR} />
      <Head t={t} t0={43.9} t1={T.tugaydi - .1} y={490} lines={[['zonaga hamma'], ['yetib kelsa', 'y']]} size={76} />
      <Head t={t} t0={T.tugaydi - .1} t1={T.shuning} y={490} lines={[['bo‘sh mashina ko‘p —'], ['talab tugaydi', 'y']]} size={68} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.shuning, 53.45), 1, 1.03)}>
      <Glow x={CX} y={1000} r={540} a={.9} col={eyeA > .5 ? '61,220,132' : '63,169,184'} />
      <div style={{ position: 'absolute', left: 640, top: 780, opacity: eout(P(t, T.shuning - .2, T.shuning + .3)) * (1 - eyeA) }}><Cloud s={220} t={t} /></div>
      <div style={{ position: 'absolute', left: CX - 280, top: 680 }}>
        <Phone w={340} id="p7">
          <div style={{ position: 'absolute', inset: 0, background: '#121722' }}>
            <div style={{ position: 'absolute', left: -80, top: 80 }}>
              <MapView w={480} t={t} zone={.5 + .5 * eyeA} id="m7b" zr={.7}>
                <MapAt x={lerp(640, 470, near)} y={lerp(560, 470, near)}><TopCar s={38} col="#FFE09A" rot={-45} /></MapAt>
              </MapView>
            </div>
          </div>
        </Phone>
      </div>
      <div style={{ position: 'absolute', left: 630, top: 840, opacity: eyeA, scale: String(lerp(.5, 1, eback(eyeA))) }}><Eye s={220} /></div>
      <Pill s="oldindan" x={740} y={1020} a={eout(P(t, T.kuzat - .3, T.kuzat))} size={32} col={GRN} />
      <Pill s="zonaga yaqinroq turing" x={CX} y={1300} a={near} size={34} col={Y} />
      <Pill s="maslahat" x={830} y={700} a={eout(P(t, T.shuning, T.shuning + .3))} size={20} dark col={GR} />
      <Head t={t} t0={T.shuning - .2} t1={T.xarita - .1} y={490} lines={[['yomg‘irni'], ['kutmang', 'r']]} size={84} />
      <Head t={t} t0={T.xarita - .1} t1={53.45} y={490} lines={[['xaritani oldindan'], ['kuzating', 'g']]} size={74} />
    </Layer>
  </Layer>;
};

const Perk: React.FC<{ t: number; t0: number; t1: number; children: React.ReactNode }> = ({ t, t0, t1, children }) => {
  const a = env(t, t0, t1, .3, .25); if (a <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, opacity: a, translate: `${(1 - eout(P(t, t0, t0 + .4))) * 120}px 0` }}>{children}</div>;
};
const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 53.3, 61.25, .3, .3);
  const n4 = eout(P(t, T.p4 - .1, T.p4 + .3));
  const sec = Math.max(0, 5 - Math.floor(P(t, T.sek5, T.sek5 + 1.0) * 5));
  const pop = eback(P(t, T.kecha - .2, T.kecha + .3));
  return <Layer a={a}>
    <Glow x={CX} y={1000} r={520} a={.9} col={n4 > .5 && t < T.yordam ? '61,220,132' : '63,169,184'} />
        <Perk t={t} t0={53.3} t1={T.yordam - .1}>
      <Card x={SL + 70} y={760} w={SR - SL - 140} style={{ background: 'linear-gradient(180deg,#f7f9fa,#dfe6e8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px 30px' }}>
          <Shield s={100} />
          <div><div style={{ fontFamily: MONO, fontSize: 20, color: '#5A6169' }}>yo‘lovchi sug‘urtasi</div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 74, lineHeight: 1, color: '#111' }}>OSGOP</div></div>
          <div style={{ marginLeft: 'auto', padding: '8px 16px', borderRadius: 14, background: GRN, color: '#06210f', fontFamily: SANS, fontWeight: 800, fontSize: 26, opacity: eout(P(t, T.bepul - .2, T.bepul + .2)) }}>bepul</div>
        </div>
      </Card>
      <div style={{ ...abs(SL, 1030, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 53.5, 53.9)) * (1 - n4), scale: String(lerp(.8, 1, eback(P(t, 53.5, 54.1)))) }}><Lockup h={130} /></div>
      <Num v="+4" y={990} a={n4} size={170} col={GRN} />
      <div style={{ ...abs(SL, 1195, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH, opacity: n4 }}>PRIORITET</div>
      <Src s="+4 — Zero Taxi ma’lumoti; joriy qiymat Yandex Pro ilovasida" y={1300} a={n4} />
      <Head t={t} t0={53.3} t1={T.p4 - .15} y={490} lines={[['osgop polisi —'], ['bepul', 'g']]} size={76} />
      <Head t={t} t0={T.p4 - .15} t1={T.yordam - .1} y={490} lines={[['+4', 'g'], ['prioritet']]} size={80} from="slam" />
    </Perk>
    <Perk t={t} t0={T.yordam - .1} t1={T.pulni - .1}>
      <div style={{ position: 'absolute', left: CX, top: 1010, translate: '-50% -50%', width: 300, height: 300, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)', scale: String(lerp(.85, 1, pop)) }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 120, lineHeight: 1, color: Y }}>24/7</div><div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>yordam</div></div>
      </div>
      <Src s="Zero Taxi ma’lumoti" y={1230} a={1} />
      <Head t={t} t0={T.yordam - .1} t1={T.pulni - .1} y={490} lines={[['yordam'], ['kecha-kunduz', 'y']]} size={76} />
    </Perk>
    <Perk t={t} t0={T.pulni - .1} t1={61.25}>
      <div style={{ position: 'absolute', left: CX, top: 1010, translate: '-50% -50%', width: 300, height: 300, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)' }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 150, lineHeight: 1, color: Y }}>{sec}</div><div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>soniya</div></div>
      </div>
      <Pill s="0% komissiya" x={CX} y={1240} a={eout(P(t, T.yech - .2, T.yech + .1))} size={32} col={GRN} />
      <Src s="Zero Taxi ma’lumoti · «Zero Taxi PAY» bot" y={1320} a={1} />
      <Head t={t} t0={T.pulni - .1} t1={61.25} y={490} lines={[['pul yechish'], ['5 soniyada', 'y']]} size={76} />
    </Perk>
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 61.1, END + 1, .3, .1);
  return <Layer a={a}>
    <ZtEnd t={t} t0={T.ulan} perks={['OSGOP bepul · +4 prioritet', '24/7 yordam', '5 soniyada yechish · 0% komissiya', '+10% balansga bonus']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.oshib, 8, 7], [T.yuqori, 10, 6], [T.oshadi, 8, 7], [T.disp, 8, 7], [T.endi, 20, 5], [T.yetmaydi, 10, 6], [T.prior, 8, 6], [T.tugaydi, 6, 7], [T.p4, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () =>
  <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1100} r={600} a={1} col={PURRGB} />
    <div style={{ position: 'absolute', left: SL + 30, top: 800 }}>
      <MapView w={SR - SL - 60} t={0} zone={1} id="mc">
        <MapAt x={250} y={210}><TopCar s={36} rot={20} /></MapAt>
        <MapAt x={600} y={200}><TopCar s={36} rot={-70} /></MapAt>
        <MapAt x={460} y={300}><TopCar s={44} col="#FFE09A" rot={-90} /></MapAt>
        <MapAt x={340} y={330}><Pin s={70} /></MapAt>
      </MapView>
    </div>
    <div style={{ position: 'absolute', left: CX + 170, top: 1330, translate: '-50% -50%', padding: '10px 22px', borderRadius: 18, background: `rgba(${PURRGB},.3)`, border: `3px solid ${PUR}`, fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: WH }}>+5 000</div>
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 32, color: GR }}>yandex go · yuqori talab · haydovchi</div>
    <div style={{ ...abs(SL, 500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 118, lineHeight: 1.04, ...yel }}>NARX NEGA<br />OSHADI?</div>
    <div style={{ ...abs(SL, 1470, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.1, color: GRN }}>BINAFSHA ZONA —<br />QANDAY USHLASH</div>
  </AbsoluteFill>;
