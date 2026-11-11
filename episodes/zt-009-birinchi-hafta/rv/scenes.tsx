import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, YL, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone, Car } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Card, Src, Background, Reel, ZtEnd } from '../kit';
import { END, T } from './ep';

const SRC_JOB = 'manba: taxi.yandex.uz — «haydovchi bo‘lib ishlash» sahifasi';
const SRC_FOTO = 'manba: Yandex Pro bilimlar bazasi — «fotokontrol», 19.11.2025';
const SRC_NO = 'manba: Yandex Pro bilimlar bazasi — «buyurtmalar kelmayapti»';
const SRC_ZT = 'Zero Taxi ma’lumoti';
const TAXI: [string, string] = ['#FFE09A', '#E0A82E'];
const PUR = '#9B5CFF';

/* ---------- small art ---------- */
const Check: React.FC<{ s: number; col?: string }> = ({ s, col = GRN }) =>
  <svg width={s} height={s} viewBox="0 0 64 64" style={{ display: 'block' }}><path d="M12 34l14 14 26-30" stroke={col} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Cross: React.FC<{ s: number; col?: string }> = ({ s, col = RED }) =>
  <svg width={s} height={s} viewBox="0 0 64 64" style={{ display: 'block' }}><path d="M14 14l36 36M50 14 14 50" stroke={col} strokeWidth="9" strokeLinecap="round" /></svg>;

const Person: React.FC<{ s: number; col?: string; scarf?: boolean; cap?: boolean; body?: string }> = ({ s, col = '#c49a7a', scarf, cap, body }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 100 120" style={{ display: 'block', overflow: 'visible' }}>
    {scarf && <path d="M22 34c0-22 56-22 56 0v14c-6-8-14-12-28-12s-22 4-28 12z" fill="#8a3b5a" />}
    <circle cx="50" cy="34" r="20" fill={col} />
    <path d="M10 120c2-34 18-50 40-50s38 16 40 50z" fill={body ?? (scarf ? '#6b3a50' : '#3a4a5c')} />
    {!scarf && !cap && <path d="M30 28c4-14 36-14 40 0" stroke="#2a2018" strokeWidth="10" fill="none" strokeLinecap="round" />}
    {cap && <path d="M28 26c0-16 44-16 44 0z M64 24 L84 26" stroke={TEAL} fill={TEAL} strokeWidth="6" strokeLinecap="round" />}
    {scarf && <path d="M28 30c2-14 42-14 44 0" stroke="#8a3b5a" strokeWidth="9" fill="none" strokeLinecap="round" />}
  </svg>;

const Bubble: React.FC<{ x: number; y: number; a: number; s: string; size?: number; col?: string; tail?: 'left' | 'right' }> = ({ x, y, a, s, size = 40, col = '#fff', tail = 'left' }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: clamp(a), scale: String(lerp(.6, 1, eback(clamp(a)))), padding: '16px 26px', borderRadius: tail === 'left' ? '30px 30px 30px 6px' : '30px 30px 6px 30px', background: col, color: '#111', fontFamily: SANS, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,.5)' }}>{s}</div>;

/* top view of a sedan with 4 doors; n = how many door numbers shown (0..4) */
const CarTop: React.FC<{ w: number; n: number }> = ({ w, n }) => {
  const doors: [number, number, string][] = [[150, 52, '1'], [255, 52, '2'], [150, 208, '3'], [255, 208, '4']];
  return <svg width={w} height={w * .52} viewBox="0 0 500 260" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="ctB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={TAXI[0]} /><stop offset=".5" stopColor={TAXI[1]} /><stop offset="1" stopColor="#b9862a" /></linearGradient></defs>
    <rect x="20" y="30" width="460" height="200" rx="80" fill="url(#ctB)" stroke="#2a2f3a" strokeWidth="4" />
    <path d="M140 52 Q120 130 140 208 L180 208 Q165 130 180 52 Z" fill="#22303f" />
    <path d="M360 60 Q385 130 360 200 L330 200 Q345 130 330 60 Z" fill="#22303f" />
    <rect x="185" y="62" width="140" height="136" rx="20" fill="#e9c062" opacity=".8" />
    <line x1="205" y1="30" x2="205" y2="62" stroke="#5a4313" strokeWidth="4" /><line x1="305" y1="30" x2="305" y2="62" stroke="#5a4313" strokeWidth="4" />
    <line x1="205" y1="198" x2="205" y2="230" stroke="#5a4313" strokeWidth="4" /><line x1="305" y1="198" x2="305" y2="230" stroke="#5a4313" strokeWidth="4" />
    <rect x="455" y="60" width="18" height="34" rx="6" fill="#fff6d0" /><rect x="455" y="166" width="18" height="34" rx="6" fill="#fff6d0" />
    <rect x="26" y="60" width="14" height="30" rx="5" fill="#ff4f4f" /><rect x="26" y="170" width="14" height="30" rx="5" fill="#ff4f4f" />
    {doors.map(([x, y, s], i) => { const k = clamp(n - i); return k <= 0 ? null :
      <g key={s} opacity={k} transform={`translate(${x + 52} ${y < 100 ? y - 30 : y + 30})`}>
        <circle r="34" fill={GRN} stroke="#06210f" strokeWidth="4" /><text x="0" y="13" textAnchor="middle" fontFamily="Osw" fontWeight="700" fontSize="40" fill="#06210f">{s}</text>
      </g>; })}
  </svg>;
};

/* simple city map with purple demand zones; car moves toward zone (p 0..1) */
const MapView: React.FC<{ w: number; h: number; zones: number; p: number }> = ({ w, h, zones, p }) => {
  const cx = lerp(110, 520, eio(p)), cy = lerp(560, 230, eio(p));
  return <svg width={w} height={h} viewBox="0 0 700 700" style={{ display: 'block', borderRadius: 30 }}>
    <defs><filter id="mzB" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22" /></filter></defs>
    <rect width="700" height="700" fill="#141922" />
    {[90, 230, 380, 520, 640].map(y => <rect key={`h${y}`} x="0" y={y} width="700" height="22" fill="#232b38" />)}
    {[70, 210, 350, 480, 620].map(x => <rect key={`v${x}`} x={x} y="0" width="22" height="700" fill="#232b38" />)}
    <path d="M0 470 C200 420 400 520 700 300" stroke="#2c6f7a" strokeWidth="26" fill="none" opacity=".6" />
    <g opacity={zones}>
      <ellipse cx="520" cy="210" rx="150" ry="110" fill={PUR} opacity=".55" filter="url(#mzB)" />
      <ellipse cx="200" cy="140" rx="90" ry="70" fill={PUR} opacity=".35" filter="url(#mzB)" />
      <ellipse cx="560" cy="560" rx="80" ry="60" fill={PUR} opacity=".3" filter="url(#mzB)" />
    </g>
    <path d={`M110 560 L110 380 L380 380 L380 230 L520 230`} stroke={Y} strokeWidth="8" strokeDasharray="18 14" fill="none" opacity={zones * .9} />
    <g transform={`translate(${cx} ${cy})`}>
      <circle r="30" fill={Y} stroke="#111" strokeWidth="5" />
      <path d="M-12 6 L0 -16 L12 6 L0 0 Z" fill="#111" />
    </g>
  </svg>;
};

const Ring: React.FC<{ s: number; p: number; col?: string; children?: React.ReactNode }> = ({ s, p, col = TEAL, children }) =>
  <div style={{ position: 'relative', width: s, height: s }}>
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, rotate: '-90deg' }}>
      <circle cx="50" cy="50" r="44" stroke="#1f2531" strokeWidth="8" fill="rgba(14,16,22,.9)" />
      <circle cx="50" cy="50" r="44" stroke={col} strokeWidth="8" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - clamp(p)} />
    </svg>
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>{children}</div>
  </div>;

const Sub: React.FC<{ t: number; t0: number; t1: number; z?: [number, number]; children: React.ReactNode }> = ({ t, t0, t1, children, z = [1, 1.04] }) => {
  const a = env(t, t0, t1, .3, .3); if (a <= 0) return null;
  return <Layer a={a} z={logZ(P(t, t0, t1), z[0], z[1])}>{children}</Layer>;
};

/* ---------- scenes ---------- */
const STEPS: [string, number][] = [['ariza', 2.2], ['hujjat', 2.7], ['foto', 3.2], ['pul', 3.7]];
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 4.85, .2, .3);
  const drive = eio(P(t, 2.0, 4.4));
  return <Layer a={a} z={logZ(P(t, 0, 4.85), 1, 1.05)}>
    <Glow x={CX} y={1020} r={540} a={.9} col="63,169,184" />
    <div style={{ ...abs(SL, 810, SR - SL), display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
      {STEPS.map(([s, t0], i) => { const k = eout(P(t, t0 - .2, t0 + .2)); const last = i === 3;
        return <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 170, height: 170, borderRadius: '50%', display: 'grid', placeItems: 'center', background: last ? `radial-gradient(circle at 35% 30%, ${YL}, ${Y} 60%, #c9962a)` : 'rgba(14,16,22,.92)', border: `5px solid ${k > .5 ? (last ? Y : TEAL) : '#2c3342'}`, scale: String(lerp(.85, 1, eback(k))), fontFamily: HEAD, fontWeight: 700, fontSize: last ? 46 : 80, color: last ? '#3a2a08' : (k > .5 ? WH : GR) }}>{last ? 'so‘m' : i + 1}</div>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: k > .5 ? WH : GR }}>{s}</span>
        </div>; })}
    </div>
    <div style={{ position: 'absolute', left: SL + 30, top: 1250, width: SR - SL - 60, height: 14, borderRadius: 7, background: '#1d232e' }}>
      <div style={{ width: `${drive * 100}%`, height: '100%', borderRadius: 7, background: `linear-gradient(90deg, ${TEAL}, ${Y})` }} />
    </div>
    <div style={{ position: 'absolute', left: lerp(SL - 10, SR - 300, drive), top: 1135 }}><Car w={300} id="c1" col={TAXI} wheel={drive * 900} lights={.6} /></div>
    <Head t={t} t0={-1} t1={T.ulan - .1} y={490} lines={[['taksida birinchi'], ['hafta qanday?', 'y']]} size={76} />
    <Head t={t} t0={T.ulan - .1} t1={4.85} y={490} lines={[['ulanishdan —'], ['birinchi pulgacha', 'y']]} size={76} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 4.7, 13.05, .3, .3);
  const send = eout(P(t, T.ariza + .2, T.ariza + .6));
  const call = eout(P(t, T.park - .2, T.park + .3));
  const ok = eback(P(t, T.royx, T.royx + .4));
  const typed = Math.round(clamp((t - T.raqam + .2) / 1.0) * 9);
  const digits = '90 123 45 67'.replace(/\d/g, (d, i) => (i < typed + Math.floor(i / 3) ? d : '·'));
  const enter = eout(P(t, T.kir - .1, T.kir + .3));
  return <Layer a={a}>
    <Sub t={t} t0={4.7} t1={9.35}>
      <Glow x={CX} y={1000} r={540} a={.85} col="63,169,184" />
      <Card x={SL + 70} y={720} w={SR - SL - 140}>
        <div style={{ padding: '30px 36px' }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>ariza · misol</div>
          {[['Ism', 'Aziz'], ['Telefon', '+998 90 ··· ·· ··']].map(([l, v]) =>
            <div key={l} style={{ marginTop: 18, padding: '14px 20px', borderRadius: 14, background: '#0e1118', border: '2px solid #2c3342' }}>
              <div style={{ fontFamily: MONO, fontSize: 18, color: GR }}>{l}</div>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34, color: WH }}>{v}</div>
            </div>)}
          <div style={{ marginTop: 22, height: 70, borderRadius: 16, background: send > .5 ? GRN : Y, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 30, color: '#111', scale: String(1 - .05 * Math.sin(send * Math.PI)) }}>{send > .5 ? 'Yuborildi ✓' : 'Yuborish'}</div>
        </div>
      </Card>
      <Pill s="park siz bilan bog‘lanadi" x={CX} y={1250} a={call} size={32} col={TEAL} />
      <div style={{ position: 'absolute', left: CX - 230, top: 1300, width: 460, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: clamp(ok), scale: String(lerp(.6, 1, ok)) }}>
        <Check s={56} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: GRN }}>ro‘yxatdan o‘tdingiz</span>
      </div>
      <Src s={SRC_JOB} y={1385} a={eout(P(t, T.ariza, T.ariza + .4))} />
      <Head t={t} t0={4.7} t1={9.35} y={490} lines={[['1-qadam:'], ['ariza → park', 'y']]} size={80} />
    </Sub>
    <Sub t={t} t0={9.2} t1={13.05}>
      <Glow x={CX} y={1000} r={540} a={.85} col="247,198,75" />
      <div style={{ ...abs(CX - 165, 690) }}>
        <Phone w={330} id="p2" glow={.5}>
          <div style={{ position: 'absolute', inset: 0, background: '#0d1016', padding: '70px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: WH }}>Yandex Pro</div>
            <div style={{ fontFamily: MONO, fontSize: 16, color: GR, marginTop: 6 }}>kirish · misol</div>
            <div style={{ marginTop: 60, width: '100%', padding: '16px 16px', borderRadius: 14, background: '#151a23', border: `2px solid ${typed > 0 ? Y : '#2c3342'}` }}>
              <div style={{ fontFamily: MONO, fontSize: 15, color: GR }}>telefon raqam</div>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH, whiteSpace: 'nowrap' }}>+998 {digits}</div>
            </div>
            <div style={{ marginTop: 26, width: '100%', height: 62, borderRadius: 16, background: enter > .5 ? GRN : Y, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: '#111' }}>{enter > .5 ? 'Kirildi ✓' : 'Kirish'}</div>
          </div>
        </Phone>
      </div>
      <Pill s="telefon raqamingiz bilan" x={CX} y={1390 - 20} a={eout(P(t, T.raqam - .2, T.raqam + .2))} size={28} dark col={Y} />
      <Head t={t} t0={9.2} t1={13.05} y={490} lines={[['yandex pro’ni'], ['o‘rnatasiz', 'y']]} size={80} />
    </Sub>
  </Layer>;
};

const DocCard: React.FC<{ k: number; scan: number; label: string; i: number }> = ({ k, scan, label, i }) =>
  <div style={{ position: 'relative', width: 230, height: 300, borderRadius: 22, background: 'linear-gradient(180deg,#f3f6f8,#d8e0e4)', overflow: 'hidden', opacity: clamp(k), translate: `0 ${(1 - k) * 60}px`, rotate: `${(i - 1) * 4}deg`, boxShadow: '0 20px 50px rgba(0,0,0,.6)' }}>
    <div style={{ position: 'absolute', left: 22, top: 26, width: 80, height: 100, borderRadius: 10, background: '#b7c3cb' }} />
    {[40, 70, 100].map(y => <div key={y} style={{ position: 'absolute', left: 116, top: y, width: 90, height: 12, borderRadius: 6, background: '#c3ccd3' }} />)}
    {[150, 180, 210, 240].map(y => <div key={y} style={{ position: 'absolute', left: 22, top: y, width: 186, height: 12, borderRadius: 6, background: '#c3ccd3' }} />)}
    <div style={{ position: 'absolute', left: 0, top: lerp(-10, 300, scan), width: '100%', height: 8, background: TEAL, boxShadow: `0 0 24px ${TEAL}`, opacity: scan > 0 && scan < 1 ? 1 : 0 }} />
    <div style={{ position: 'absolute', right: 12, bottom: 12, opacity: scan >= 1 ? 1 : 0, background: '#06210f', borderRadius: '50%', padding: 6 }}><Check s={52} /></div>
    <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', padding: '6px 0', textAlign: 'center', fontFamily: MONO, fontSize: 16, color: '#3a4450', opacity: 0 }}>{label}</div>
  </div>;

const LicCard: React.FC<{ k: number; title: string; sub: string; col: string }> = ({ k, title, sub, col }) =>
  <div style={{ width: 390, padding: '26px 26px 30px', borderRadius: 26, background: 'linear-gradient(160deg,#1f2733,#10141b)', border: `3px solid ${col}`, opacity: clamp(k), scale: String(lerp(.7, 1, eback(clamp(k)))), boxShadow: '0 24px 60px rgba(0,0,0,.6)' }}>
    <div style={{ height: 14, width: 120, borderRadius: 7, background: col }} />
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 50, color: WH, marginTop: 18, lineHeight: 1.05 }}>{title}</div>
    <div style={{ fontFamily: MONO, fontSize: 22, color: col, marginTop: 10 }}>{sub}</div>
    <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>{[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 12, borderRadius: 6, background: '#2c3342' }} />)}</div>
  </div>;

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 12.9, 21.95, .3, .3);
  return <Layer a={a}>
    <Sub t={t} t0={12.9} t1={15.95}>
      <Glow x={CX} y={1000} r={540} a={.85} col="63,169,184" />
      <div style={{ ...abs(SL, 760, SR - SL), display: 'flex', justifyContent: 'center', gap: 34 }}>
        {[0, 1, 2].map(i => <DocCard key={i} i={i} label="" k={eout(P(t, T.q2 + .05 + i * .2, T.q2 + .45 + i * .2))} scan={P(t, T.hujjat + i * .25, T.hujjat + .7 + i * .25)} />)}
      </div>
      <Pill s="ilovada tekshiriladi" x={CX} y={1170} a={eout(P(t, T.tekshir - .2, T.tekshir + .2))} size={32} col={GRN} />
      <Src s={SRC_JOB} y={1290} a={eout(P(t, T.ilova, T.ilova + .4))} />
      <Head t={t} t0={12.9} t1={15.95} y={490} lines={[['2-qadam:'], ['hujjat tekshiruvi', 'y']]} size={78} />
    </Sub>
    <Sub t={t} t0={15.8} t1={19.45}>
      <Glow x={CX} y={1000} r={540} a={.85} col="247,198,75" />
      <div style={{ ...abs(SL, 730, SR - SL), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34 }}>
        <div style={{ translate: '-90px 0' }}><LicCard k={eout(P(t, T.lits1 - .3, T.lits1 + .2))} title="LITSENZIYA" sub="haydovchi uchun" col={TEAL} /></div>
        <div style={{ translate: '90px 0' }}><LicCard k={eout(P(t, T.lits2 - .3, T.lits2 + .2))} title="LITSENZIYA KARTOCHKASI" sub="mashina uchun" col={Y} /></div>
      </div>
      <Src s={SRC_JOB} y={1385} a={eout(P(t, T.lits1, T.lits1 + .4))} />
      <Head t={t} t0={15.8} t1={19.45} y={490} lines={[['keyin —'], ['litsenziya', 'y']]} size={84} />
    </Sub>
    <Sub t={t} t0={19.3} t1={21.95}>
      <Glow x={CX} y={1000} r={540} a={.85} col="61,220,132" />
      <div style={{ ...abs(SL + 30, 800) }}><CarTop w={SR - SL - 60} n={lerp(0, 4, P(t, T.mash2 + .3, T.eshik + .3))} /></div>
      <Pill s="kamida 4 eshik — shart" x={CX} y={1270} a={eout(P(t, T.shart - .3, T.shart + .1))} size={34} col={GRN} />
      <Src s={SRC_JOB} y={1345} a={eout(P(t, T.mash2, T.mash2 + .4))} />
      <Head t={t} t0={19.3} t1={21.95} y={490} lines={[['mashina —'], ['kamida 4 eshik', 'g']]} size={80} />
    </Sub>
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 21.8, 29.75, .3, .3);
  const flash = t >= T.surat ? Math.exp(-(t - T.surat) * 6) : 0;
  const shot = t >= T.surat;
  const ring = eio(P(t, T.min - .3, T.keladi));
  const ok = eback(P(t, T.keladi - .1, T.keladi + .3));
  const right = eout(P(t, T.natija - .3, T.natija + .2));
  return <Layer a={a} z={logZ(P(t, 21.8, 29.75), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} col={ok > .5 ? '61,220,132' : '63,169,184'} />
    <div style={{ position: 'absolute', left: lerp(CX - 160, 110, right), top: 690 }}>
      <Phone w={320} id="p4" glow={.4}>
        <div style={{ position: 'absolute', inset: 0, background: '#1a2230' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '62%', background: 'linear-gradient(180deg,#38465c,#1a2230)' }} />
          <div style={{ position: 'absolute', left: 2, top: 250 }}><Car w={290} id="c4" col={TAXI} lights={0} /></div>
          {[[30, 200, '0 0'], [260, 200, '90deg'], [30, 400, '-90deg'], [260, 400, '180deg']].map(([x, y, r], i) =>
            <div key={i} style={{ position: 'absolute', left: x as number, top: y as number, width: 26, height: 26, borderLeft: `5px solid ${Y}`, borderTop: `5px solid ${Y}`, rotate: r as string }} />)}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', border: '6px solid #fff', background: shot ? GRN : 'rgba(255,255,255,.3)' }} />
          </div>
          <div style={{ position: 'absolute', left: 20, top: 70, fontFamily: MONO, fontSize: 16, color: '#cfd6e0' }}>fotokontrol · misol</div>
          <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: flash }} />
        </div>
      </Phone>
    </div>
    <Pill s="hech qayerga bormaysiz" x={CX} y={1385} a={env(t, T.hech - .2, T.natija - .1, .3, .3)} size={30} col={Y} />
    <div style={{ position: 'absolute', left: 520, top: 800, opacity: right, translate: `${(1 - right) * 80}px 0` }}>
      <Ring s={380} p={ring} col={ok > .5 ? GRN : TEAL}>
        <div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 100, lineHeight: 1, color: Y }}>5–15</div>
          <div style={{ fontFamily: MONO, fontSize: 26, color: GR, marginTop: 6 }}>daqiqa</div>
        </div>
      </Ring>
      <div style={{ position: 'absolute', left: 150, top: 400, opacity: clamp(ok), scale: String(lerp(.5, 1, ok)) }}><Check s={90} /></div>
    </div>
    <Src s={SRC_FOTO} y={1300 - 0} a={eout(P(t, T.foto, T.foto + .4)) * (1 - right) + right} />
    <Head t={t} t0={21.8} t1={T.natija - .15} y={490} lines={[['3-qadam:'], ['fotokontrol', 'y']]} size={84} />
    <Head t={t} t0={T.natija - .15} t1={29.75} y={490} lines={[['natija —'], ['5–15 daqiqada', 'g']]} size={84} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 29.6, 34.35, .3, .2);
  const say = eout(P(t, T.oglim - .4, T.oglim));
  const nb = (i: number) => eout(P(t, T.mahalla - .2 + i * .25, T.mahalla + .2 + i * .25));
  return <Layer a={a} z={logZ(P(t, 29.6, 34.35), 1, 1.05)}>
    <Glow x={CX} y={1000} r={540} a={.9} col="247,198,75" />
    <div style={{ position: 'absolute', left: CX - 190, top: 950 }}><Person s={380} scarf col="#d2a585" /></div>
    {[[90, 1150, '#c49a7a', '#4a5a3c'], [730, 1130, '#b88a6a', '#5c3a3a'], [90, 760, '#d8b090', '#3a4a6c'], [740, 740, '#c9a07c', '#6c5a3a']].map(([x, y, c, b], i) =>
      <div key={i} style={{ position: 'absolute', left: x as number, top: y as number, opacity: nb(i), scale: String(lerp(.6, 1, nb(i))) }}>
        <Person s={150} col={c as string} body={b as string} cap={i === 1} />
        <div style={{ position: 'absolute', left: 105, top: -20, fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: Y }}>!</div>
      </div>)}
    <Bubble x={CX} y={860} a={say} s="«O‘g‘lim taksichi bo‘ldi!»" size={40} />
    <Pill s="hazil" x={840} y={725} a={eout(P(t, 29.7, 30.0))} size={20} dark col={GR} />
    <Head t={t} t0={29.6} t1={34.35} y={490} lines={[['bu orada onangiz —'], ['butun mahallaga', 'y']]} size={72} />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 34.2, 35.95, .12, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} col="236,58,44" />
    <Head t={t} t0={34.2} t1={35.95} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const REASONS: [string, string, number][] = [['balans kam', 'park belgilagan limitdan past', T.balans], ['internet / GPS', 'aloqa uzilgan', T.internet], ['fotokontrol', 'hali o‘tmagan', T.foto2]];
const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 35.8, 46.15, .3, .3);
  const on = eout(P(t, T.sariq, T.sariq + .4));
  const none = eout(P(t, T.kelmaydi - .2, T.kelmaydi + .2));
  const pulse = (t * 1.2) % 1;
  return <Layer a={a}>
    <Sub t={t} t0={35.8} t1={40.35}>
      <Glow x={CX} y={1000} r={540} a={.9} col={none > .5 ? '236,58,44' : '247,198,75'} />
      <div style={{ ...abs(CX - 160, 690) }}>
        <Phone w={320} id="p7" glow={.4}>
          <div style={{ position: 'absolute', inset: 0, background: '#141922' }}>
            <svg width="100%" height="100%" viewBox="0 0 300 600" style={{ position: 'absolute', inset: 0 }}>
              {[80, 200, 320, 440].map(y => <rect key={y} x="0" y={y} width="300" height="14" fill="#232b38" />)}
              {[60, 160, 250].map(x => <rect key={x} x={x} y="0" width="14" height="600" fill="#232b38" />)}
              {on > .5 && <circle cx="150" cy="300" r={20 + pulse * 120} fill="none" stroke={Y} strokeWidth="4" opacity={(1 - pulse) * (1 - none * .7)} />}
              <circle cx="150" cy="300" r="18" fill={Y} stroke="#111" strokeWidth="4" />
            </svg>
            <div style={{ position: 'absolute', left: 16, top: 62, padding: '6px 14px', borderRadius: 14, background: on > .5 ? Y : '#2a303c', fontFamily: SANS, fontWeight: 800, fontSize: 18, color: on > .5 ? '#111' : GR }}>{on > .5 ? '● liniyada' : 'oflayn'}</div>
            <div style={{ position: 'absolute', left: 16, right: 16, bottom: 26, padding: '16px 0', borderRadius: 16, background: 'rgba(14,16,22,.94)', border: `2px solid ${none > .5 ? RED : '#2c3342'}`, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 22, color: none > .5 ? RED : GR }}>{none > .5 ? 'buyurtma yo‘q' : 'buyurtma kutilmoqda…'}</div>
          </div>
        </Phone>
      </div>
      <div style={{ position: 'absolute', left: 700, top: 820, opacity: none, scale: String(lerp(1.5, 1, none)) }}><Cross s={150} /></div>
      <Head t={t} t0={35.8} t1={T.buyurtma - .15} y={490} lines={[['liniyaga'], ['chiqdingiz...', 'y']]} size={84} />
      <Head t={t} t0={T.buyurtma - .15} t1={40.35} y={490} lines={[['buyurtma esa —'], ['kelmaydi', 'r']]} size={84} from="slam" />
    </Sub>
    <Sub t={t} t0={40.2} t1={46.15}>
      <Glow x={CX} y={1000} r={540} a={.9} col="236,58,44" />
      <div style={{ ...abs(SL + 40, 720, SR - SL - 80), display: 'flex', flexDirection: 'column', gap: 26 }}>
        {REASONS.map(([s, sub, t0], i) => { const k = eout(P(t, t0 - .3, t0 + .2));
          return <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '22px 28px', borderRadius: 24, background: 'rgba(14,16,22,.94)', border: `3px solid ${k > .5 ? RED : '#2c3342'}`, opacity: lerp(.15, 1, k), translate: `${(1 - k) * 60}px 0` }}>
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: RED, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: '#fff', flexShrink: 0 }}>{i + 1}</div>
            <div><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: WH, lineHeight: 1.05 }}>{s}</div>
              <div style={{ fontFamily: MONO, fontSize: 22, color: GR, marginTop: 4 }}>{sub}</div></div>
          </div>; })}
      </div>
      <Src s={SRC_NO} y={1330} a={eout(P(t, T.balans, T.balans + .4))} />
      <Head t={t} t0={40.2} t1={46.15} y={490} lines={[['sabab ko‘pincha —'], ['oddiy', 'y']]} size={80} />
    </Sub>
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 46.0, 53.45, .3, .3);
  const press = eout(P(t, T.diag + .2, T.diag + .5));
  const rows: [string, boolean][] = [['Balans', true], ['Internet', true], ['GPS', false], ['Fotokontrol', true]];
  const zones = eout(P(t, T.binafsha - .3, T.binafsha + .3));
  const go = P(t, T.binafsha + .2, T.yuqori + .3);
  return <Layer a={a}>
    <Sub t={t} t0={46.0} t1={49.2}>
      <Glow x={CX} y={1000} r={540} a={.9} col="63,169,184" />
      <div style={{ ...abs(CX - 160, 690) }}>
        <Phone w={320} id="p8" glow={.4}>
          <div style={{ position: 'absolute', inset: 0, background: '#0d1016', padding: '64px 20px' }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH }}>Profil</div>
            <div style={{ marginTop: 18, height: 66, borderRadius: 16, background: press > .5 ? TEAL : '#1d2430', border: `2px solid ${TEAL}`, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 24, color: WH, scale: String(1 - .06 * Math.sin(press * Math.PI)) }}>Diagnostika</div>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {rows.map(([s, good], i) => { const k = eout(P(t, T.sabab2 - .6 + i * .2, T.sabab2 - .3 + i * .2));
                return <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12, background: good ? '#141a22' : 'rgba(236,58,44,.18)', border: `2px solid ${good ? '#2c3342' : RED}`, opacity: k }}>
                  <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 22, color: WH }}>{s}</span>
                  {good ? <Check s={30} /> : <Cross s={30} />}
                </div>; })}
            </div>
            <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 14, color: GR }}>misol</div>
          </div>
        </Phone>
      </div>
      <Pill s="sababni ko‘rsatadi" x={790} y={1180} a={eout(P(t, T.sabab2 - .2, T.sabab2 + .2))} size={28} col={GRN} />
      <Src s={SRC_NO} y={1395} a={eout(P(t, T.diag, T.diag + .4))} />
      <Head t={t} t0={46.0} t1={49.2} y={490} lines={[['profil →'], ['«diagnostika»', 'y']]} size={84} />
    </Sub>
    <Sub t={t} t0={49.05} t1={53.45}>
      <Glow x={CX} y={1000} r={540} a={.9} col="155,92,255" />
      <div style={{ ...abs(CX - 330, 690) }}><MapView w={660} h={560} zones={zones} p={go} /></div>
      <Pill s="binafsha zona = talab yuqori" x={CX} y={1310} a={eout(P(t, T.talab - .3, T.talab + .1))} size={32} col={PUR} />
      <Src s={SRC_NO} y={1385} a={eout(P(t, T.xarita, T.xarita + .4))} />
      <Head t={t} t0={49.05} t1={T.binafsha - .1} y={490} lines={[['buyurtma kam?'], ['xaritaga qarang', 'y']]} size={80} />
      <Head t={t} t0={T.binafsha - .1} t1={53.45} y={490} lines={[['binafsha zona —'], ['talab yuqori', 'g']]} size={80} />
    </Sub>
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 53.3, 63.6, .3, .3);
  const sec = clamp((t - T.pulingiz) / 1.1);
  const done = eback(P(t, T.besh, T.besh + .35));
  const p10 = eback(P(t, T.p10 - .2, T.p10 + .3));
  const pop = eback(P(t, T.kecha - .2, T.kecha + .3));
  return <Layer a={a}>
    <Sub t={t} t0={53.3} t1={58.75}>
      <Glow x={CX} y={1000} r={520} a={.9} col="63,169,184" />
      <Card x={SL + 30} y={740} w={SR - SL - 60}>
        <div style={{ padding: '26px 34px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 24, color: GR }}><span>Zero Taxi PAY · pul yechish</span><span>misol</span></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 74, color: WH }}>{done > .5 ? 'kartada ✓' : 'yuborilmoqda'}</div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 110, ...yel }}>≈{Math.max(1, Math.round(sec * 5))} s</div>
          </div>
          <div style={{ marginTop: 14, height: 18, borderRadius: 9, background: '#1a1f29', overflow: 'hidden' }}><div style={{ width: `${sec * 100}%`, height: '100%', background: done > .5 ? GRN : `linear-gradient(90deg, ${TEAL}, ${Y})` }} /></div>
        </div>
      </Card>
      <div style={{ ...abs(SL, 1070, SR - SL), display: 'flex', justifyContent: 'center', gap: 26 }}>
        {[['limitsiz', T.limit], ['0% komissiya', T.komis]].map(([s, t0]) => { const k = eback(P(t, (t0 as number) - .2, (t0 as number) + .25));
          return <div key={s as string} style={{ padding: '14px 32px', borderRadius: 30, background: GRN, color: '#06210f', fontFamily: SANS, fontWeight: 800, fontSize: 40, opacity: clamp(k), scale: String(lerp(.6, 1, k)) }}>{s as string}</div>; })}
      </div>
      <div style={{ ...abs(SL, 1170, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 53.5, 53.9)) }}><Lockup h={100} /></div>
      <Src s={SRC_ZT} y={1340} a={eout(P(t, T.besh, T.besh + .3))} />
      <Head t={t} t0={53.3} t1={58.75} y={490} lines={[['birinchi pul —'], ['≈5 soniyada', 'y']]} size={80} />
    </Sub>
    <Sub t={t} t0={58.6} t1={61.55}>
      <Glow x={CX} y={1000} r={520} a={.9} col="247,198,75" />
      <div style={{ ...abs(SL, 760, SR - SL), textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>balansni to‘ldirsangiz · misol</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: WH, marginTop: 10 }}>100 000</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 150, lineHeight: 1, ...yel, opacity: clamp(p10), scale: String(lerp(.5, 1, p10)) }}>+10 000</div>
        <div style={{ fontFamily: MONO, fontSize: 26, color: GRN, marginTop: 16, opacity: clamp(p10) }}>park bonusi · +10%</div>
      </div>
      <Src s={SRC_ZT} y={1290} a={eout(P(t, T.p10, T.p10 + .3))} />
      <Head t={t} t0={58.6} t1={61.55} y={490} lines={[['balansga —'], ['+10% bonus', 'y']]} size={84} />
    </Sub>
    <Sub t={t} t0={61.4} t1={63.6}>
      <Glow x={CX} y={1000} r={520} a={.9} col="63,169,184" />
      <div style={{ position: 'absolute', left: CX, top: 960, translate: '-50% -50%', scale: String(lerp(.85, 1, pop)) }}>
        <Ring s={340} p={1}><div><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 124, lineHeight: 1, color: Y }}>24/7</div><div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>yordam</div></div></Ring>
      </div>
      <Src s={SRC_ZT} y={1200} a={1} />
      <Head t={t} t0={61.4} t1={63.6} y={490} lines={[['yordam —'], ['kecha-kunduz', 'y']]} size={84} />
    </Sub>
  </Layer>;
};

const S10: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 63.3, END + 1, .3, .1);
  return <Layer a={a}>
    <ZtEnd t={t} t0={T.ulaning} perks={['5 soniyada yechish · 0% komissiya', '+10% balansga bonus', 'OSGOP bepul · +4 prioritet', '24/7 yordam']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.kelmaydi, 10, 6], [T.endi, 20, 5], [T.besh, 8, 7], [T.p10, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9, S10]} hits={HITS} />;

export const Cover: React.FC = () =>
  <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1150} r={600} a={1} col="63,169,184" />
    <div style={{ ...abs(SL, 900, SR - SL), display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
      {['ariza', 'hujjat', 'foto', 'pul'].map((s, i) => { const last = i === 3;
        return <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 160, height: 160, borderRadius: '50%', display: 'grid', placeItems: 'center', background: last ? `radial-gradient(circle at 35% 30%, ${YL}, ${Y} 60%, #c9962a)` : 'rgba(14,16,22,.92)', border: `5px solid ${last ? Y : TEAL}`, fontFamily: HEAD, fontWeight: 700, fontSize: last ? 44 : 76, color: last ? '#3a2a08' : WH }}>{last ? 'so‘m' : i + 1}</div>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 38, color: WH }}>{s}</span>
        </div>; })}
    </div>
    <div style={{ position: 'absolute', left: SL + 30, top: 1270, width: SR - SL - 60, height: 14, borderRadius: 7, background: `linear-gradient(90deg, ${TEAL}, ${Y})` }} />
    <div style={{ position: 'absolute', left: 380, top: 1155 }}><Car w={300} id="cc" col={TAXI} lights={.6} /></div>
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 32, color: GR }}>yandex go · yangi haydovchi</div>
    <div style={{ ...abs(SL, 500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 124, lineHeight: 1.04, ...yel }}>BIRINCHI<br />HAFTA QANDAY?</div>
    <div style={{ ...abs(SL, 1480, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.1, color: GRN }}>3 QADAM —<br />VA BIRINCHI PUL</div>
  </AbsoluteFill>;
