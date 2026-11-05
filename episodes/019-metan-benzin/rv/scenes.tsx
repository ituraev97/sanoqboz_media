import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, YL, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, rnd, clamp } from '../lib';
import { Car, Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, flight, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* generic fuel dispenser with a 2-line display; col = accent (yellow petrol / blue methane) */
const Pump: React.FC<{ w: number; col: string; top: string; bot: string; unit: string; id: string; label: string }> = ({ w, col, top, bot, unit, id, label }) => (
  <div style={{ position: 'relative', width: w, height: w * 1.9 }}>
    <svg width={w} height={w * 1.9} viewBox="0 0 200 380" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <defs>
        <linearGradient id={`pb${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3a404e" /><stop offset=".45" stopColor="#5b6273" /><stop offset="1" stopColor="#262a33" /></linearGradient>
        <linearGradient id={`ph${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col} /><stop offset="1" stopColor={col} stopOpacity=".55" /></linearGradient>
      </defs>
      <rect x="20" y="20" width="160" height="340" rx="18" fill={`url(#pb${id})`} stroke="#11141b" strokeWidth="4" />
      <rect x="20" y="20" width="160" height="46" rx="18" fill={`url(#ph${id})`} />
      <rect x="40" y="86" width="120" height="104" rx="10" fill="#0a0d12" stroke="#11141b" strokeWidth="3" />
      <rect x="54" y="214" width="92" height="56" rx="8" fill="#1a1e27" />
      <path d="M180 120 C 230 130 236 220 214 280 L 206 330" stroke="#14171e" strokeWidth="12" fill="none" strokeLinecap="round" />
      <rect x="194" y="318" width="26" height="44" rx="6" fill="#2a2f3b" stroke={col} strokeWidth="3" />
      <rect x="10" y="356" width="180" height="16" rx="6" fill="#1a1d24" />
    </svg>
    <div style={{ position: 'absolute', left: 0, top: w * .1 * 1.0, width: w, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: w * .12, color: '#0b0d12', lineHeight: 1 }}>{label}</div>
    <div style={{ position: 'absolute', left: w * .2, top: w * .45, width: w * .6, textAlign: 'right', paddingRight: w * .04, boxSizing: 'border-box' }}>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: w * .17, color: col, lineHeight: 1.1 }}>{top}</div>
      <div style={{ fontFamily: MONO, fontSize: w * .075, color: GR }}>{unit}</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: w * .12, color: WH, lineHeight: 1.1 }}>{bot}</div>
    </div>
  </div>
);
/* CNG cylinder, lying (horizontal) or standing */
const Cyl: React.FC<{ w: number; id: string; glow?: number }> = ({ w, id, glow = 0 }) => (
  <svg width={w} height={w * .42} viewBox="0 0 400 168" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`cy${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fc0ff" /><stop offset=".35" stopColor="#5B8CFF" /><stop offset="1" stopColor="#1f3a8a" /></linearGradient>
      <filter id={`cg${id}`} x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="18" /></filter>
    </defs>
    {glow > 0 && <rect x="20" y="20" width="360" height="128" rx="64" fill="#5B8CFF" opacity={glow * .5} filter={`url(#cg${id})`} />}
    <rect x="20" y="14" width="350" height="140" rx="70" fill={`url(#cy${id})`} stroke="#10224f" strokeWidth="4" />
    <rect x="60" y="34" width="250" height="14" rx="7" fill="#fff" opacity=".35" />
    <rect x="368" y="62" width="22" height="44" rx="6" fill="#c7cedb" stroke="#4a5160" strokeWidth="3" />
    <text x="190" y="108" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight={700} fontSize="40" fill="#fff" opacity=".9">CNG</text>
  </svg>
);
const Melon: React.FC<{ w: number; id: string }> = ({ w, id }) => (
  <svg width={w} height={w * .78} viewBox="0 0 100 78" style={{ display: 'block', overflow: 'visible' }}>
    <defs><radialGradient id={`ml${id}`} cx=".35" cy=".3" r=".75"><stop offset="0" stopColor="#ffe9a0" /><stop offset=".6" stopColor="#e6b84a" /><stop offset="1" stopColor="#9a6a1a" /></radialGradient></defs>
    <ellipse cx="50" cy="40" rx="48" ry="36" fill={`url(#ml${id})`} stroke="#6b4a12" strokeWidth="2.5" />
    {[-26, -10, 8, 24].map((dx, i) => <path key={i} d={`M${50 + dx} 6 C ${46 + dx * 1.3} 30 ${46 + dx * 1.3} 52 ${50 + dx} 74`} stroke="#b78a2a" strokeWidth="2" fill="none" opacity=".7" />)}
    <path d="M50 4 C 52 0 56 -2 58 -4" stroke="#3d6b22" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);
const Snow: React.FC<{ t: number; a: number }> = ({ t, a }) => {
  if (a <= 0) return null;
  const R = rnd(31); const fl = Array.from({ length: 46 }, () => ({ x: R() * W, y: R() * H, s: 3 + R() * 6, v: 40 + R() * 70, ph: R() * 6 }));
  return <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, opacity: a }}>
    {fl.map((f, i) => <circle key={i} cx={f.x + Math.sin(t * 1.3 + f.ph) * 18} cy={(f.y + t * f.v) % H} r={f.s} fill="#eaf4ff" opacity=".75" />)}
  </svg>;
};
/* comparison bar (vertical) */
const Bar: React.FC<{ x: number; base: number; h: number; w: number; col: string; label: string; val: string; a: number }> = ({ x, base, h, w, col, label, val, a }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: base - h, width: w, height: h + 70, opacity: a }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: -70, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: col, whiteSpace: 'nowrap' }}>{val}</div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: Math.max(h, 2), borderRadius: '16px 16px 4px 4px', background: `linear-gradient(180deg, ${col}, ${col}88)`, boxShadow: `0 0 40px ${col}55` }} />
    <div style={{ position: 'absolute', left: 0, right: 0, top: h + 14, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH }}>{label}</div>
  </div>;
const Chip: React.FC<{ s: string; y: number; a: number }> = ({ s, y, a }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: CX, top: y, translate: '-50% 0', opacity: a, padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 24, color: WH, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.45, .2, .3);
  const lp = eout(P(t, T.benzinda - .2, T.benzinda + .3)), rp = eout(P(t, T.metanda - .2, T.metanda + .3));
  return <Layer a={a} z={logZ(P(t, -1, 5.4), 1, 1.06)}>
    <Glow x={CX} y={1000} r={520} a={.9} />
    <div style={{ ...abs(CX - 230, 980) }}><Car w={460} wheel={t * 120} id="c1" /></div>
    <div style={{ ...abs(CX - 380 - (1 - lp) * 80, 760), opacity: lp }}><Pump w={170} col={Y} label="AI-92" top="?" bot="" unit="litr" id="a1" /></div>
    <div style={{ ...abs(CX + 210 + (1 - rp) * 80, 760), opacity: rp }}><Pump w={170} col={BLUE} label="METAN" top="?" bot="" unit="kub" id="b1" /></div>
    <Pill s="benzin" x={CX - 295} y={1180} a={lp} size={30} />
    <Pill s="metan" x={CX + 295} y={1180} a={rp} size={30} col={BLUE} />
    <Pill s="1 yil = ?" x={CX} y={1300} a={eout(P(t, T.keling - .1, T.keling + .3))} size={34} dark />
    <Head t={t} t0={-1} t1={5.45} y={490} lines={[['cobalt 1 yilda'], ['qancha yeydi?', 'y']]} size={72} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.3, 17.5, .3, .3);
  const lit = 9 * eio(P(t, T.l9 - .1, T.ichadi + .2));
  const price = t > T.n12600 - .2;
  const sum = 113400 * eio(P(t, T.n113 - .5, T.n113 + .6));
  return <Layer a={a} z={logZ(P(t, 5.3, 17.5), 1, 1.05)}>
    <Glow x={CX - 120} y={920} r={500} a={.85} />
    <div style={{ ...abs(SL + 10, 640) }}><Pump w={260} col={Y} label="AI-92" top={lit.toFixed(1)} bot={price ? '12 600' : '—'} unit="litr / 100 km" id="a2" /></div>
    <Card x={CX + 30} y={680} w={400} a={eout(P(t, T.n100a - .2, T.n100a + .3))}>
      <div style={{ padding: '22px 26px' }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>Toshkent tirbandligi</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: WH, marginTop: 4 }}>100 km = <span style={{ color: Y }}>9 l</span></div>
        <div style={{ fontFamily: MONO, fontSize: 20, color: GR, marginTop: 6 }}>real sarf 9–10 l · taxminan</div>
      </div>
    </Card>
    <Card x={CX + 30} y={920} w={400} a={eout(P(t, T.ai92 - .2, T.ai92 + .3))}>
      <div style={{ padding: '22px 26px' }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>1 litr AI-92 · o‘rtacha</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: Y, marginTop: 4 }}>{fmt(12600 * eio(P(t, T.n12600 - .3, T.n12600 + .6)))} so‘m</div>
      </div>
    </Card>
    <Num v={`${fmt(sum)} so‘m`} x={CX + 230} y={1170} a={eout(P(t, T.demak, T.demak + .3))} size={70} />
    <Chip s="9 l × 12 600 = 113 400 so‘m" y={1275} a={eout(P(t, T.n113, T.n113 + .4))} />
    <Src s="AI-92 · avtoelon.uz, 28.10.2026 · sarf: kursiv.media" y={1350} a={eout(P(t, T.n12600, T.n12600 + .4))} />
    <Head t={t} t0={5.3} t1={T.demak - .1} y={490} lines={[['benzinda'], ['100 km', 'y']]} size={72} from="slam" />
    <Head t={t} t0={T.demak - .1} t1={17.5} y={490} lines={[['100 km —'], ['113 000 so‘m', 'y']]} size={68} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 17.4, 32.3, .3, .3);
  const aA = env(t, 17.4, T.yani - .05, .3, .3), aB = env(t, T.yani - .2, 32.3, .3, .3);
  const kub = 11 * eio(P(t, T.kub11 - .1, T.kub11 + .7));
  const sum = 63250 * eio(P(t, T.n63 - .5, T.n63 + .5));
  const gb = eio(P(t, T.yani - .1, T.ikki + .3));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 17.4, 26), 1, 1.05)}>
      <Glow x={CX} y={900} r={520} a={.85} col="91,140,255" />
      <div style={{ ...abs(SL + 10, 640) }}><Pump w={260} col={BLUE} label="METAN" top={kub.toFixed(1)} bot={t > T.n5750 - .2 ? '5 750' : '—'} unit="kub / 100 km" id="b3" /></div>
      <div style={{ ...abs(CX + 20, 720), rotate: '-4deg' }}><Cyl w={410} id="c3" glow={.6 + .2 * Math.sin(t * 3)} /></div>
      <Card x={CX + 30} y={940} w={400} a={eout(P(t, T.bir - .2, T.bir + .3))}>
        <div style={{ padding: '22px 26px' }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>1 kub metan</div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: ICE, marginTop: 4 }}>{fmt(5750 * eio(P(t, T.n5750 - .3, T.n5750 + .6)))} so‘m</div>
        </div>
      </Card>
      <Num v={`${fmt(sum)} so‘m`} x={CX + 230} y={1150} a={eout(P(t, T.n63 - .6, T.n63 - .2))} size={70} col={ICE} />
      <Chip s="11 kub × 5 750 = 63 250 so‘m" y={1260} a={eout(P(t, T.n63, T.n63 + .4))} />
      <Src s="metan narxi · spot.uz, 1.06.2026 · sarf: kursiv.media hisobi" y={1340} a={eout(P(t, T.n5750, T.n5750 + .4))} />
      <Head t={t} t0={17.4} t1={T.n63 - .6} y={490} lines={[['metanda'], ['100 km', 'y']]} size={72} from="slam" />
      <Head t={t} t0={T.n63 - .6} t1={T.yani} y={490} lines={[['100 km —'], ['63 000 so‘m', 'y']]} size={68} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.yani, 32.3), 1, 1.04)}>
      <Glow x={CX} y={1000} r={520} a={.85} col="61,220,132" />
      <Bar x={CX - 300} base={1230} h={480 * gb} w={220} col={Y} label="benzin" val="113 400" a={eout(P(t, T.yani - .2, T.yani + .2))} />
      <Bar x={CX + 80} base={1230} h={268 * gb} w={220} col={BLUE} label="metan" val="63 250" a={eout(P(t, T.yani - .2, T.yani + .2))} />
      <Stamp s="~2× ARZON" x={CX + 190} y={820} t={t} t0={T.arzon} t1={32.3} col={GRN} size={52} rot={-6} />
      <Pill s="1-iyundan metan +10%" x={CX} y={1345} a={eout(P(t, T.iyun - .1, T.iyun + .3))} size={28} col={RED} dark />
      <Head t={t} t0={T.yani - .2} t1={32.3} y={490} lines={[['so‘m / 100 km']]} size={64} />
    </Layer>
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 32.2, 45.6, .3, .3);
  const b1 = eio(P(t, T.n22 - .3, T.n22 + 1.6)), b2 = eio(P(t, T.n12 - .3, T.n12 + 1.4));
  const far = eout(P(t, T.farq - .1, T.farq + .5));
  const H1 = 450, H2 = 450 * 12.65 / 22.68;
  const odo = Math.round(20000 * eio(P(t, T.km20 - .2, T.km20 + 1)));
  return <Layer a={a} z={logZ(P(t, 32.2, 45.6), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} />
    <Card x={CX - 270} y={650} w={540} a={eout(P(t, T.yil - .2, T.yil + .3))} style={{ scale: String(lerp(.9, 1, eback(P(t, T.yil - .2, T.yil + .4)))) }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 14, padding: '14px 0', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: MONO, fontSize: 22, color: GR }}>yiliga</span>
        <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 58, color: WH, letterSpacing: 2 }}>{fmt(odo)}</span>
        <span style={{ fontFamily: MONO, fontSize: 22, color: GR }}>km · misol</span>
      </div>
    </Card>
    <Bar x={CX - 330} base={1330} h={H1 * b1} w={250} col={Y} label="benzin" val={fmt(22680000 * b1)} a={eout(P(t, T.benz - .2, T.benz + .2))} />
    <Bar x={CX + 80} base={1330} h={H2 * b2} w={250} col={BLUE} label="metan" val={fmt(12650000 * b2)} a={eout(P(t, T.met - .2, T.met + .2))} />
    {far > 0 && <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, opacity: far }}>
      <line x1={CX + 80} y1={1330 - H1} x2={CX + 330} y2={1330 - H1} stroke={GRN} strokeWidth="4" strokeDasharray="12 10" />
      <line x1={CX + 205} y1={1330 - H1 + 10} x2={CX + 205} y2={1330 - H2 - 80} stroke={GRN} strokeWidth="5" />
    </svg>}
    <Stamp s="≈ 10 MLN" x={CX + 205} y={1330 - (H1 + H2 + 80) / 2 - 10} t={t} t0={T.n10} t1={45.6} col={GRN} size={50} rot={-5} />
    <Src s="taxminan · servis va ballon narxi kirmagan" y={1415} a={eout(P(t, T.servis - .1, T.servis + .3))} />
    <Head t={t} t0={32.2} t1={T.farq - .1} y={490} lines={[['bir yil'], ['20 000 km', 'y']]} size={68} from="slam" />
    <Head t={t} t0={T.farq - .1} t1={45.6} y={490} lines={[['farq —'], ['qariyb 10 mln so‘m', 'g']]} size={62} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 45.5, 52.65, .15, .3);
  const aA = env(t, 45.5, T.qishda - .05, .1, .3), aB = env(t, T.qishda - .2, 52.65, .3, .3);
  const q = eout(P(t, T.navbat - .2, T.navbat + .8));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} />
      <Head t={t} t0={45.5} t1={T.qishda - .05} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={920} r={540} a={.85} col="155,227,255" />
      <Snow t={t} a={aB} />
      {/* station canopy */}
      <div style={{ ...abs(SL + 40, 690, SR - SL - 80), height: 70, borderRadius: 12, background: 'linear-gradient(180deg,#5B8CFF,#2c4fb8)', display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: WH, letterSpacing: 6 }}>METAN</div>
      <div style={{ ...abs(SL + 90, 760), width: 22, height: 300, background: '#3a404e' }} /><div style={{ ...abs(SR - 112, 760), width: 22, height: 300, background: '#3a404e' }} />
      <div style={{ ...abs(CX - 70, 820) }}><Pump w={140} col={BLUE} label="METAN" top="0.0" bot="—" unit="kub" id="b5" /></div>
      <Stamp s="GAZ CHEKLANGAN" y={900} t={t} t0={T.cheklan} t1={52.65} size={52} rot={-7} />
      {[0, 1, 2, 3].map((i) => <div key={i} style={{ ...abs(SR - 60 - i * 230 * q - 200, 1110), opacity: q }}><Car w={200} id={`q${i}`} col={['#c9d2e4', '#6c768a']} /></div>)}
      <Pill s="navbat" x={CX} y={1230} a={q} size={28} dark col={ICE} />
      <Pill s="baribir benzin" x={CX} y={1310} a={eout(P(t, T.benzin2 - .1, T.benzin2 + .3))} size={30} col={RED} />
      <Src s="qishda AGNKSga gaz cheklanishi · kursiv.media, 7.10.2026" y={1380} a={eout(P(t, T.cheklan, T.cheklan + .4))} />
      <Head t={t} t0={T.qishda - .2} t1={52.65} y={490} lines={[['qishda —'], ['gaz cheklovi', 'r']]} size={66} />
    </Layer>
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 52.5, 57.0, .3, .3);
  const cy = eout(P(t, T.yukxona - .2, T.yukxona + .4));
  const m1 = P(t, T.qovun - .1, T.qovun + .6), m2 = P(t, T.orqa - .3, T.orqa + .4);
  const p1 = flight(m1, [CX + 220, 1080], [CX - 230, 900], 200), p2 = flight(m2, [CX + 300, 1080], [CX - 120, 910], 180);
  return <Layer a={a} z={logZ(P(t, 52.5, 57), 1, 1.05)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    {/* car interior schematic: back seat (left) + trunk (right) */}
    <Card x={SL + 10} y={760} w={380}><div style={{ height: 300, padding: 20 }}>
      <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>orqa o‘rindiq</div>
      <div style={{ position: 'absolute', left: 30, right: 30, bottom: 30, height: 90, borderRadius: 18, background: 'linear-gradient(180deg,#4a5162,#2a2f3b)' }} />
    </div></Card>
    <Card x={CX + 20} y={760} w={410} style={{ border: `2px solid ${cy > .5 ? RED : 'rgba(255,255,255,.12)'}` }}><div style={{ height: 300, padding: 20 }}>
      <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>yukxona</div>
    </div></Card>
    <div style={{ ...abs(CX + 35, 860 + (1 - cy) * -260), opacity: cy }}><Cyl w={380} id="c6" /></div>
    {[[m1, p1, 'm1'], [m2, p2, 'm2']].map(([m, p, id]) => {
      const mm = m as number, pp = p as [number, number];
      return <div key={id as string} style={{ position: 'absolute', left: pp[0], top: pp[1], translate: '-50% -50%', opacity: mm > 0 ? 1 : 0, rotate: `${mm * 200}deg` }}><Melon w={130} id={id as string} /></div>;
    })}
    <Pill s="qaynonaning qovunlari" x={CX} y={1160} a={eout(P(t, T.qaynona - .1, T.qaynona + .3))} size={30} />
    <Head t={t} t0={52.5} t1={T.qaynona - .1} y={490} lines={[['ballon'], ['yukxonada', 'y']]} size={72} from="slam" />
    <Head t={t} t0={T.qaynona - .1} t1={57.0} y={490} lines={[['qovunlar —'], ['orqa o‘rindiqda', 'y']]} size={62} />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 56.9, 62.45, .3, .3);
  const r1 = eout(P(t, T.shunda + .4, T.shunda + .8)), r2 = eout(P(t, T.kam - .2, T.kam + .3));
  const Row: React.FC<{ y: number; aa: number; km: string; txt: string; col: string; mark: string }> = ({ y, aa, km, txt, col, mark }) =>
    <Card x={SL + 20} y={y} w={SR - SL - 40} a={aa} style={{ translate: `${(1 - aa) * 60}px 0` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '26px 30px' }}>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: col, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 44, color: '#0b0d12' }}>{mark}</div>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>{km}</div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 46, color: col, lineHeight: 1.1 }}>{txt}</div>
        </div>
      </div>
    </Card>;
  return <Layer a={a} z={logZ(P(t, 56.9, 62.4), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.85} col="61,220,132" />
    <Row y={720} aa={r1} km="ko‘p yursangiz" txt="METAN TEJAYDI" col={GRN} mark="✓" />
    <Row y={930} aa={r2} km="kam yursangiz" txt="FARQ KICHRAYADI" col={Y} mark="≈" />
    <Src s="har bir mashina va yo‘l har xil — o‘z km ingizni hisoblang" y={1170} a={eout(P(t, T.kichray, T.kichray + .4))} />
    <Head t={t} t0={56.9} t1={62.45} y={490} lines={[['hisob'], ['oddiy', 'y']]} size={80} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 62.3, END + 1, .3, .1);
  return <Layer a={a}>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['cobalt egasiga'], ['yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.n113, 10, 6], [T.n63, 8, 7], [T.arzon, 10, 6], [T.n10, 14, 6], [T.endi, 20, 5], [T.cheklan, 12, 6], [T.yukxona, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1150} r={580} a={1} />
    <div style={{ ...abs(SL - 10, 960) }}><Pump w={190} col={Y} label="AI-92" top="9.0" bot="12 600" unit="litr" id="cva" /></div>
    <div style={{ ...abs(SR - 150, 960) }}><Pump w={190} col={BLUE} label="METAN" top="11.0" bot="5 750" unit="kub" id="cvb" /></div>
    <div style={{ ...abs(CX - 210, 1260) }}><Car w={480} id="cv" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>Cobalt · 20 000 km · 1 yil</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 124, lineHeight: 1.02, ...yel }}>METANMI<br />BENZINMI?</div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, lineHeight: 1.1, color: GRN }}>FARQ — QARIYB<br />10 MLN SO‘M</div>
  </AbsoluteFill>;
};
