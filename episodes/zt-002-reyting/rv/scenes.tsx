import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, YL, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, Background, Reel, ZtEnd } from '../kit';
import { END, T } from './ep';

/* ---------- art ---------- */
const STAR = 'M32 3l8.8 18.6 20.2 2.6-14.8 14 3.8 20.1L32 48.6 14 58.3l3.8-20.1L3 24.2l20.2-2.6z';
const Star: React.FC<{ s: number; fill?: number; col?: string; off?: string }> = ({ s, fill = 1, col = Y, off = '#2a3040' }) =>
  <svg width={s} height={s} viewBox="0 0 64 64" style={{ display: 'block' }}>
    <path d={STAR} fill={off} />
    {fill > 0 && <path d={STAR} fill={col} opacity={clamp(fill)} />}
  </svg>;
const r2 = (v: number, d = 2) => v.toFixed(d).replace('.', ',');
const Rating: React.FC<{ v: number; size: number; col?: string; d?: number }> = ({ v, size, col = WH, d = 2 }) =>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: size * .18 }}>
    <Star s={size * .8} />
    <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: size, lineHeight: 1, color: col }}>{r2(v, d)}</span>
  </div>;
const Avatar: React.FC<{ s: number }> = ({ s }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#2C8290" /><circle cx="32" cy="25" r="11" fill="#cfe9ee" /><path d="M12 54c3-11 11-16 20-16s17 5 20 16" fill="#cfe9ee" /></svg>;
/* passenger rating popup with n of 5 stars */
const RatePop: React.FC<{ x: number; y: number; a: number; n: number }> = ({ x, y, a, n }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: clamp(a * 1.5), scale: String(lerp(.6, 1, eback(clamp(a)))), padding: '18px 24px', borderRadius: 24, background: 'linear-gradient(180deg,#f7f9fa,#dfe6e8)', boxShadow: '0 20px 50px rgba(0,0,0,.6)' }}>
    <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, color: '#5A6169', textAlign: 'center', marginBottom: 10 }}>yo‘lovchi bahosi</div>
    <div style={{ display: 'flex', gap: 6 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} s={54} fill={i < n ? 1 : 0} off="#c3ccd2" />)}</div>
  </div>;
const Plov: React.FC<{ w: number }> = ({ w }) =>
  <svg width={w} height={w * .6} viewBox="0 0 400 240">
    <defs><radialGradient id="plR2" cx=".5" cy=".3" r=".7"><stop offset="0" stopColor="#fff3cf" /><stop offset="1" stopColor="#e2b765" /></radialGradient></defs>
    <ellipse cx="200" cy="190" rx="190" ry="44" fill="#d9e2ea" /><ellipse cx="200" cy="182" rx="160" ry="32" fill="#2C8290" opacity=".35" />
    <path d="M60 180 C80 70 320 70 340 180 Z" fill="url(#plR2)" />
    {Array.from({ length: 28 }, (_, i) => <rect key={i} x={95 + (i * 37) % 210} y={110 + (i * 23) % 60} width="16" height="5" rx="2" fill="#f07a2b" transform={`rotate(${(i * 47) % 180} ${103 + (i * 37) % 210} ${112 + (i * 23) % 60})`} />)}
  </svg>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.5, .2, .3);
  const drop = eio(P(t, T.qoydi + .3, T.qoydi + 1));
  const v = lerp(4.97, 4.94, drop);
  const pw = 330;
  return <Layer a={a} z={logZ(P(t, 0, 5.5), 1, 1.04)}>
    <Glow x={CX} y={1030} r={480} a={.8} col={drop > .5 ? '236,58,44' : '63,169,184'} />
    <div style={{ ...abs(CX - pw / 2 - 110, 700) }}>
      <Phone w={pw} id="p1">
        <div style={{ padding: '70px 20px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><Avatar s={120} /></div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, marginTop: 16 }}>Sardor A.</div>
          <div style={{ fontFamily: MONO, fontSize: 18, color: GR, marginTop: 4 }}>haydovchi · misol</div>
          <div style={{ marginTop: 30 }}><Rating v={v} size={70} col={drop > .5 ? Y : WH} /></div>
          <div style={{ marginTop: 14, fontFamily: SANS, fontWeight: 800, fontSize: 30, color: RED, opacity: drop }}>↓ 0,03</div>
        </div>
      </Phone>
    </div>
    <RatePop x={710} y={900} a={eout(P(t, T.bitta, T.qoydi + .1))} n={4} />
    <Pill s="kayfiyat ham ↓" x={700} y={1060} a={eout(P(t, T.tushdi - .1, T.tushdi + .25))} size={30} col={RED} />
    <Head t={t} t0={-1} t1={5.5} y={490} lines={[['reyting qanday'], ['hisoblanadi?', 'y']]} size={68} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.38, 13.9, .3, .3);
  const aA = env(t, 5.38, T.reyt + .1, .3, .3), aB = env(t, T.reyt - .2, 13.9, .3, .3);
  const fillN = 150 * eio(P(t, T.b150 - .1, T.b150 + 1.6));
  const cols = 15, cell = 52, gx = CX - cols * cell / 2 + 40, gy = 760;
  const hi = eout(P(t, T.har, T.har + .4));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 5.38, T.reyt), 1, 1.03)}>
      <Glow x={CX} y={1000} r={500} a={.8} />
      {Array.from({ length: 150 }, (_, i) => {
        const f = clamp(fillN - i); const c = i % cols, r = Math.floor(i / cols);
        const me = i === 149;
        return <div key={i} style={{ position: 'absolute', left: gx + c * cell, top: gy + r * cell, scale: String(me ? 1 + .6 * hi : lerp(.5, 1, eback(f))) }}><Star s={44} fill={f} col={me && hi > 0 ? GRN : Y} /></div>;
      })}
      <Num v={`${Math.round(fillN)} ta baho`} y={1300} a={clamp(fillN / 4)} size={70} />
      <Pill s="har safardan keyin — 1 baho" x={CX + 40} y={705} a={hi} size={28} col={GRN} />
      <Head t={t} t0={5.38} t1={T.reyt + .1} y={490} lines={[['oxirgi'], ['150 ta baho', 'y']]} size={70} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.reyt, 13.9), 1, 1.03)}>
      <Glow x={CX} y={980} r={500} a={.85} col="63,169,184" />
      <Card x={SL + 90} y={720} w={SR - SL - 180} style={{ scale: String(lerp(.88, 1, eback(P(t, T.reyt - .2, T.reyt + .4)))) }}>
        <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar s={150} />
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 44, color: WH, marginTop: 18 }}>Sardor A.</div>
          <div style={{ marginTop: 18, padding: '10px 28px', borderRadius: 22, border: `3px solid ${eout(P(t, T.ism, T.ism + .3)) > .5 ? Y : 'transparent'}` }}><Rating v={4.97} size={76} /></div>
          <div style={{ fontFamily: MONO, fontSize: 20, color: GR, marginTop: 14 }}>profil · misol</div>
        </div>
      </Card>
      <Pill s="ismingiz ostida" x={CX} y={1290} a={eout(P(t, T.ism, T.ism + .3))} size={30} col={Y} />
    </Layer>
    <Head t={t} t0={T.reyt - .2} t1={13.9} y={490} lines={[['reyting —'], ['profilingizda', 'y']]} size={68} />
    <Src s="manba: pro.yandex.com, Toshkent — «Рейтинг»" y={1395} a={eout(P(t, T.b150, T.b150 + .4))} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 13.81, 20.15, .3, .3);
  const fillN = 50 * eio(P(t, T.b50 - .1, T.avto + .6));
  const cols = 10, cell = 72, gx = CX - cols * cell / 2 + 8, gy = 740;
  const big = eout(P(t, T.start - .1, T.start + .3));
  return <Layer a={a} z={logZ(P(t, 13.81, 20.1), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.85} col={big > .5 ? '61,220,132' : '247,198,75'} />
    {Array.from({ length: 50 }, (_, i) => {
      const f = clamp(fillN - i); const c = i % cols, r = Math.floor(i / cols);
      return <div key={i} style={{ position: 'absolute', left: gx + c * cell, top: gy + r * cell - (1 - eout(f)) * 30 }}><Star s={60} fill={f} off="#3a4256" /></div>;
    })}
    <Pill s={`${Math.round(fillN)} × 5 — avtomatik`} x={CX} y={1150} a={clamp(fillN / 3)} size={32} col={Y} />
    <div style={{ position: 'absolute', left: CX, top: 1210, translate: '-50% 0', opacity: big, scale: String(lerp(.6, 1, eback(big))) }}><Rating v={5} size={130} col={GRN} d={1} /></div>
    <Src s="yangi haydovchiga 50 ta beshlik · pro.yandex.com, Toshkent" y={1395} a={eout(P(t, T.b50, T.b50 + .4))} />
    <Head t={t} t0={13.81} t1={T.start - .1} y={490} lines={[['yangi haydovchi'], ['noldan emas', 'g']]} size={66} />
    <Head t={t} t0={T.start - .1} t1={20.15} y={490} lines={[['start —'], ['5,0', 'g']]} size={76} from="slam" />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 20.05, 30.2, .3, .15);
  const bx = SL + 40, bw = SR - SL - 80, by = 960;
  const X = (v: number) => bx + (v - 4) * bw;
  const v = t < T.tushsa ? 4.9 : t < T.tusha ? lerp(4.9, 4.42, eio(P(t, T.tushsa - .3, T.tushsa + .7))) : lerp(4.42, 4.62, eio(P(t, T.tusha, T.tusha + .8)));
  const bad = v < 4.5;
  const aBar = 1 - eout(P(t, T.ekonom - .2, T.ekonom + .3));
  const aT = eout(P(t, T.ekonom - .1, T.ekonom + .4));
  const notif = env(t, T.tusha - .1, T.ekonom, .35, .3);
  const tiers: [string, number][] = [['Ekonom', 120], ['Komfort', 200], ['Komfort+', 280]];
  return <Layer a={a} z={logZ(P(t, 20.05, 30.1), 1, 1.03)}>
    <Glow x={X(v)} y={by} r={460} a={.8 * aBar} col={bad ? '236,58,44' : '61,220,132'} />
    <Layer a={aBar}>
      <div style={{ ...abs(bx, by, bw), height: 54, borderRadius: 27, overflow: 'hidden', display: 'flex', boxShadow: '0 10px 30px rgba(0,0,0,.5)' }}>
        <div style={{ width: '50%', background: 'linear-gradient(90deg,#7a1a14,#EC3A2C)' }} />
        <div style={{ width: '50%', background: 'linear-gradient(90deg,#1f8a52,#3DDC84)' }} />
      </div>
      <div style={{ ...abs(X(4.5) - 3, by - 20), width: 6, height: 94, background: WH, borderRadius: 3 }} />
      {[[4, '4,0'], [4.5, '4,5'], [5, '5,0']].map(([vv, s]) => <div key={s as string} style={{ position: 'absolute', left: X(vv as number), top: by + 90, translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: (vv === 4.5 ? 60 : 40), color: vv === 4.5 ? Y : GR }}>{s}</div>)}
      <div style={{ position: 'absolute', left: X(4.25), top: by + 190, translate: '-50% 0', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: RED, whiteSpace: 'nowrap' }}>buyurtma yopiq</div>
      <div style={{ position: 'absolute', left: X(4.75), top: by + 190, translate: '-50% 0', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: GRN, whiteSpace: 'nowrap' }}>buyurtma ochiq</div>
      <div style={{ position: 'absolute', left: X(v), top: by - 30, translate: '-50% -100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ padding: '8px 22px', borderRadius: 20, background: bad ? RED : WH, color: bad ? WH : '#111', fontFamily: HEAD, fontWeight: 700, fontSize: 52 }}>{r2(v)}</div>
        <svg width="40" height="24" viewBox="0 0 40 24"><path d="M0 0h40L20 24z" fill={bad ? RED : WH} /></svg>
      </div>
      <Stamp s="BUYURTMALAR YOPILADI" y={1300} t={t} t0={T.yopil} t1={T.tusha + .2} size={54} />
      <div style={{ ...abs(SL + 40, 690 - (1 - eout(P(t, T.tusha - .1, T.tusha + .4))) * 80, SR - SL - 80), opacity: notif, display: 'flex', alignItems: 'center', gap: 18, padding: '16px 24px', borderRadius: 24, background: 'rgba(236,240,244,.97)', boxShadow: '0 16px 40px rgba(0,0,0,.6)' }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: TEAL, display: 'grid', placeItems: 'center' }}>
          <svg width="34" height="34" viewBox="0 0 64 64"><path d="M32 6a18 18 0 0 0-18 18v12l-6 10h48l-6-10V24A18 18 0 0 0 32 6zM25 50a7 7 0 0 0 14 0z" fill="#fff" /></svg></div>
        <div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: '#111' }}>Yandex Pro</div>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 26, color: '#3a4048' }}>Reytingingiz tusha boshladi</div></div>
      </div>
    </Layer>
    <Layer a={aT}>
      <Glow x={CX} y={1000} r={500} a={.8} />
      {tiers.map(([n, h], i) => {
        const x = SL + 110 + i * 250; const g = eout(P(t, T.ekonom + i * .25, T.ekonom + .5 + i * .25));
        return <React.Fragment key={n}>
          <div style={{ position: 'absolute', left: x, top: 1260 - h * g, width: 170, height: h * g, borderRadius: '18px 18px 0 0', background: `linear-gradient(180deg, ${i === 0 ? TEAL : Y}, ${i === 0 ? '#1d5a63' : '#8a6a1d'})` }} />
          <div style={{ position: 'absolute', left: x + 85, top: 1280, translate: '-50% 0', fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, opacity: g, whiteSpace: 'nowrap' }}>{n}</div>
        </React.Fragment>;
      })}
      <div style={{ position: 'absolute', left: CX, top: 760, translate: '-50% 0', display: 'flex', alignItems: 'center', gap: 16, opacity: eout(P(t, T.baland - .3, T.baland + .2)) }}>
        <Star s={70} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: Y }}>TALAB ↑</span>
      </div>
      <Pill s="har tarifning o‘z talabi" x={CX} y={890} a={eout(P(t, T.baland, T.baland + .3))} size={28} dark col={WH} />
    </Layer>
    <Src s={aT > .5 ? 'talablar — «Стандарты качества» · pro.yandex.com, Toshkent' : '4,5–5 — buyurtmalar ochiq · pro.yandex.com, Toshkent'} y={1395} a={eout(P(t, 20.3, 20.7))} />
    <Head t={t} t0={20.05} t1={T.tusha - .1} y={490} lines={[['chegara —'], ['4,5', 'y']]} size={72} from="slam" />
    <Head t={t} t0={T.tusha - .1} t1={T.ekonom - .1} y={490} lines={[['ilova'], ['ogohlantiradi', 'y']]} size={70} />
    <Head t={t} t0={T.ekonom - .1} t1={30.2} y={490} lines={[['yuqori tarif —'], ['yuqori reyting', 'y']]} size={66} />
  </Layer>;
};

/* weighted ratings: stream of ratings, newest on the right is tallest */
const R = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5];
const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 30.09, 40.35, .12, .3);
  const aA = env(t, 30.09, 31.75, .1, .3), aB = env(t, 31.6, 40.35, .3, .3);
  const s = t < T.keyingi ? eio(P(t, T.yomon - .2, T.yomon + .4)) : 1 + 4 * eio(P(t, T.keyingi, T.yuvib + .4));
  const wg = eio(P(t, T.yangi2, T.ogir + .3));
  const v = t < T.yomon ? 4.97 : t < T.keyingi ? lerp(4.97, 4.93, eio(P(t, T.yomon, T.yomon + .5))) : lerp(4.93, 4.96, eio(P(t, T.keyingi, T.yuvib + .4)));
  const n = 10, x0 = SL + 50, dx = (SR - SL - 100) / n, base = 1250;
  const vis: React.ReactNode[] = [];
  for (let k = Math.floor(s) - 1; k <= Math.floor(s) + n; k++) {
    if (k < 0 || k >= R.length) continue;
    const slot = k - s; const op = clamp(slot + 1) * clamp(n - slot);
    if (op <= 0) continue;
    const h = lerp(170, lerp(50, 290, clamp(slot / (n - 1))), wg);
    const four = R[k] === 4;
    vis.push(<div key={k} style={{ position: 'absolute', left: x0 + slot * dx + 8, top: base - h, width: dx - 16, height: h, opacity: op, borderRadius: '14px 14px 4px 4px', background: four ? `linear-gradient(180deg, ${RED}, #6a1712)` : `linear-gradient(180deg, ${GRN}, #17603a)` }}>
      <div style={{ position: 'absolute', left: '50%', top: -50, translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: four ? RED : WH }}>{R[k]}</div>
    </div>);
  }
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} col="63,169,184" />
      <Head t={t} t0={30.09} t1={31.75} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, 31.6, 40.3), 1, 1.03)}>
      <Glow x={CX} y={1050} r={520} a={.85} col={t > T.yomon && t < T.keyingi + 1 ? '236,58,44' : '61,220,132'} />
      <div style={{ position: 'absolute', left: CX, top: 690, translate: '-50% 0', opacity: eout(P(t, 31.7, 32.1)) }}><Rating v={v} size={86} col={t > T.yomon + .3 && t < T.yuvib ? Y : GRN} /></div>
      {vis}
      <div style={{ ...abs(SL + 50, base + 14, SR - SL - 100), height: 4, background: 'rgba(255,255,255,.25)' }} />
      <div style={{ ...abs(SL + 50, base + 30, SR - SL - 100), display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 24, color: GR, opacity: wg }}><span>← eski baholar</span><span>yangi →</span></div>
      <Stamp s="HUKM EMAS" y={880} t={t} t0={T.hukm} t1={T.keyingi + .3} col={GRN} size={60} rot={-5} />
      <Pill s="misol" x={CX + 300} y={740} a={eout(P(t, 31.8, 32.2))} size={22} dark col={GR} />
      <Src s="yangi baholar ko‘proq ta’sir qiladi · pro.yandex.com, Toshkent" y={1395} a={eout(P(t, T.yangi2, T.yangi2 + .4))} />
      <Head t={t} t0={31.6} t1={T.yangi2 - .1} y={490} lines={[['oddiy o‘rtacha'], ['emas', 'r']]} size={70} />
      <Head t={t} t0={T.yangi2 - .1} t1={T.keyingi - .1} y={490} lines={[['yangi baho —'], ['og‘irroq', 'y']]} size={72} from="slam" />
      <Head t={t} t0={T.keyingi - .1} t1={40.35} y={490} lines={[['yaxshi safarlar'], ['yuvib ketadi', 'g']]} size={66} />
    </Layer>
  </Layer>;
};

const Tip: React.FC<{ t: number; t0: number; y: number; ic: React.ReactNode; k: string; d: string }> = ({ t, t0, y, ic, k, d }) => {
  const ra = eout(P(t, t0 - .2, t0 + .25)); if (ra <= 0) return null;
  return <div style={{ ...abs(SL + 30, y, SR - SL - 60), opacity: ra, translate: `${(1 - ra) * 70}px 0`, display: 'flex', alignItems: 'center', gap: 22, padding: '16px 24px', borderRadius: 22, background: 'rgba(20,24,32,.94)', border: `2px solid ${TEAL}66` }}>
    <div style={{ width: 64, height: 64, flex: 'none', borderRadius: '50%', background: TEAL, display: 'grid', placeItems: 'center' }}>{ic}</div>
    <div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34, color: WH }}>{k}</div><div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, color: GR }}>{d}</div></div>
    <div style={{ marginLeft: 'auto', fontFamily: SANS, fontWeight: 800, fontSize: 40, color: GRN }}>✓</div>
  </div>;
};
const ic = (d: string) => <svg width="38" height="38" viewBox="0 0 64 64"><path d={d} fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 40.24, 51.75, .3, .3);
  const joke = env(t, T.kechagi - .1, T.salom - .05, .3, .3);
  return <Layer a={a} z={logZ(P(t, 40.24, 51.7), 1, 1.03)}>
    <Glow x={CX} y={980} r={520} a={.8} col="63,169,184" />
    <div style={{ position: 'absolute', left: CX, top: 900, translate: '-50% -50%', opacity: 1 - eout(P(t, T.ravon - .4, T.ravon)), scale: String(lerp(.6, 1, eback(P(t, 40.24, 40.8)))) }}><Star s={300} /></div>
    <Tip t={t} t0={T.ravon} y={700} ic={ic('M6 44c12 0 12-24 26-24s14 24 26 24')} k="Ravon haydang" d="keskin tormoz va start yo‘q" />
    <Tip t={t} t0={T.salon} y={830} ic={ic('M32 8v14M32 42v14M8 32h14M42 32h14M32 22l4 10-4 10-4-10z')} k="Salon toza" d="tutqichlar, gilamchalar" />
    <Tip t={t} t0={T.s34} y={960} ic={ic('M8 22h34a7 7 0 1 0-7-7M8 34h44a7 7 0 1 1-7 7M8 46h24')} k="Shamollating" d="har 3–4 buyurtmada" />
    <Tip t={t} t0={T.salom} y={1090} ic={ic('M24 46V14l26-6v32M24 46a6 6 0 1 1-6-6 6 6 0 0 1 6 6zM50 40a6 6 0 1 1-6-6 6 6 0 0 1 6 6z')} k="Salom + radio" d="qaysi radio yoqishini so‘rang" />
    <div style={{ position: 'absolute', left: CX, top: 1180, translate: '-50% 0', opacity: joke, scale: String(lerp(.7, 1, eback(P(t, T.kechagi - .1, T.kechagi + .4)))) }}>
      <div style={{ position: 'relative' }}>
        <Plov w={280} />
        {[0, 1, 2].map((i) => <svg key={i} width="40" height="80" style={{ position: 'absolute', left: 90 + i * 40, top: -60 - ((t * 40 + i * 25) % 30), opacity: .5 }}><path d="M20 76 C6 56 34 40 20 20 C13 10 23 4 20 0" stroke="#c9b37a" strokeWidth="5" fill="none" strokeLinecap="round" /></svg>)}
        <svg width="280" height="170" viewBox="0 0 280 170" style={{ position: 'absolute', left: 0, top: 0, opacity: eout(P(t, T.qoydirma - .1, T.qoydirma + .2)) }}><path d="M40 10 240 160M240 10 40 160" stroke={RED} strokeWidth="16" strokeLinecap="round" /></svg>
      </div>
    </div>
    <Src s="maslahatlar — pro.yandex.com, Toshkent" y={1395} a={env(t, T.ravon, T.kechagi, .4, .3)} />
    <Head t={t} t0={40.24} t1={T.ravon - .1} y={490} lines={[['xo‘sh, nima'], ['qilish kerak?', 'y']]} size={70} />
    <Head t={t} t0={T.ravon - .1} t1={T.kechagi - .1} y={490} lines={[['reytingni'], ['ko‘taring', 'g']]} size={72} />
    <Head t={t} t0={T.kechagi - .1} t1={T.salom - .1} y={490} lines={[['kechagi osh hidi —'], ['beshlik emas', 'r']]} size={60} />
    <Head t={t} t0={T.salom - .1} t1={51.75} y={490} lines={[['salom bering —'], ['so‘rang', 'y']]} size={68} />
  </Layer>;
};

const Perk: React.FC<{ t: number; t0: number; t1: number; children: React.ReactNode }> = ({ t, t0, t1, children }) => {
  const a = env(t, t0, t1, .3, .25); if (a <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, opacity: a, translate: `${(1 - eout(P(t, t0, t0 + .4))) * 120}px 0` }}>{children}</div>;
};
const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 51.66, 60.2, .3, .3);
  const sec = Math.max(0, 5 - Math.floor(P(t, T.sek5, T.sek5 + 1.2) * 5));
  return <Layer a={a}>
    <Glow x={CX} y={1000} r={520} a={.9} col="63,169,184" />
    <div style={{ ...abs(SL, 690, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 51.66, 52.1)), scale: String(lerp(.8, 1, eback(P(t, 51.66, 52.2)))) }}><Lockup h={110} /></div>
    <Perk t={t} t0={51.66} t1={T.pul}>
      <div style={{ ...abs(SL, 880, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 260, lineHeight: 1, ...yel }}>24/7</div>
      <Pill s="savol bo‘lsa — darrov yordam" x={CX} y={1230} a={eout(P(t, T.s24 + .3, T.s24 + .6))} size={32} col={TEAL} />
      <Head t={t} t0={51.66} t1={T.pul} y={490} lines={[['zero taxi’da'], ['yoningizdamiz', 'y']]} size={68} />
    </Perk>
    <Perk t={t} t0={T.pul} t1={T.balans}>
      <div style={{ position: 'absolute', left: CX, top: 1040, translate: '-50% -50%', width: 300, height: 300, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)' }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 160, lineHeight: 1, color: Y }}>{sec}</div><div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>soniya</div></div>
      </div>
      <Pill s="0% komissiya" x={CX} y={1270} a={eout(P(t, T.komis, T.komis + .3))} size={32} col={GRN} />
      <Head t={t} t0={T.pul} t1={T.balans} y={490} lines={[['pul yechish'], ['5 soniyada', 'y']]} size={72} />
    </Perk>
    <Perk t={t} t0={T.balans} t1={60.2}>
      <div style={{ ...abs(SL, 860, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 220, lineHeight: 1, ...yel }}>+10%</div>
      <Card x={SL + 90} y={1110} w={SR - SL - 180}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, padding: '22px 0', fontFamily: HEAD, fontWeight: 700, fontSize: 50 }}>
          <span style={{ color: WH }}>100 000</span><span style={{ color: GR }}>→</span><span style={{ color: GRN }}>+10 000</span>
        </div>
      </Card>
      <Src s="balansni to‘ldirganda parkdan bonus · so‘mda" y={1290} a={1} />
      <Head t={t} t0={T.balans} t1={60.2} y={490} lines={[['balansga'], ['bonus', 'y']]} size={72} />
    </Perk>
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 60.1, END + 1, .3, .1);
  const aA = env(t, 60.1, T.ulan, .3, .3);
  const st = eout(P(t, T.beshlik - .2, T.beshlik + .3));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 60.1, T.ulan), 1, 1.05)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="61,220,132" />
      <div style={{ position: 'absolute', left: CX, top: 1000, translate: '-50% -50%', scale: String(lerp(.5, 1, eback(eout(P(t, 60.1, 60.7))))) }}>
        <div style={{ position: 'relative', width: 480, height: 480 }}>
          <Star s={480} fill={.25 + .75 * st} />
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', paddingTop: 50, fontFamily: HEAD, fontWeight: 700, fontSize: 170, color: '#1A1306', opacity: st }}>5</div>
        </div>
      </div>
      <Head t={t} t0={60.1} t1={T.ulan} y={490} lines={[['har safar —'], ['yana bitta beshlik', 'y']]} size={62} />
    </Layer>
    <ZtEnd t={t} t0={T.ulan} perks={['24/7 yordam', '5 soniyada yechish · 0% komissiya', '+10% balansga bonus', 'OSGOP bepul · +4 prioritet']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.qoydi + .3, 8, 7], [T.b150 + 1.5, 8, 7], [T.start, 12, 6], [T.yopil, 12, 6], [T.endi, 20, 5], [T.yomon, 10, 7], [T.hukm, 10, 6], [T.beshlik, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1130} r={560} a={1} col="247,198,75" />
    <div style={{ position: 'absolute', left: CX, top: 1110, translate: '-50% -50%' }}>
      <div style={{ position: 'relative', width: 420, height: 420 }}>
        <Star s={420} />
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', paddingTop: 44, fontFamily: HEAD, fontWeight: 700, fontSize: 120, color: '#1A1306' }}>4,5</div>
      </div>
    </div>
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>150 baho · 4,5 · yangi og‘ir</div>
    <div style={{ ...abs(SL, 490, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 118, lineHeight: 1.04, ...yel }}>REYTING<br />QANDAY<br />HISOBLANADI?</div>
    <div style={{ ...abs(SL, 1400, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 62, lineHeight: 1.1, color: GRN }}>BITTA YOMON BAHO —<br />HUKM EMAS</div>
  </AbsoluteFill>;
};
