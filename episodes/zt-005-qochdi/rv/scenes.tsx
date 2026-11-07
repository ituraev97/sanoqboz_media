import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone, Car } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Card, Src, Background, Reel, ZtEnd } from '../kit';
import { END, T } from './ep';

const KB_RU = 'manba: Yandex Pro bilimlar bazasi — «Что делать, если пассажир не заплатил»';
const KB_PAY = 'manba: Yandex Pro bilimlar bazasi (O‘zbekiston) — «Как выбрать способ оплаты заказа»';
const KB_TAS = 'manba: Yandex Pro bilimlar bazasi (Toshkent) — «Как пассажир оплачивает поездку»';

/* ---------- art ---------- */
/* running person, side view; ph = run phase */
const Runner: React.FC<{ s: number; ph: number; col?: string }> = ({ s, ph, col = '#c49a7a' }) => {
  const a = Math.sin(ph), b = Math.sin(ph + Math.PI);
  const leg = (sw: number) => `M50 74 L${50 + sw * 22} 98 L${50 + sw * 30} 118`;
  const arm = (sw: number) => `M50 44 L${50 + sw * 20} 60 L${50 + sw * 30} 52`;
  return <svg width={s} height={s * 1.25} viewBox="0 0 100 125" style={{ display: 'block', overflow: 'visible' }}>
    <path d={arm(b)} stroke="#3a4256" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={leg(b)} stroke="#2a3040" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M44 40 Q56 38 58 46 L54 76 L44 76 Z" fill="#4a5264" transform="rotate(10 50 58)" />
    <path d={leg(a)} stroke="#3a4256" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={arm(a)} stroke="#4a5264" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="58" cy="26" r="13" fill={col} />
    <path d="M47 22c3-10 20-11 24-2" stroke="#2a2018" strokeWidth="7" fill="none" strokeLinecap="round" />
  </svg>;
};

const Person: React.FC<{ s: number; col?: string; scarf?: boolean }> = ({ s, col = '#c49a7a', scarf }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 100 120" style={{ display: 'block' }}>
    {scarf && <path d="M22 34c0-22 56-22 56 0v14c-6-8-14-12-28-12s-22 4-28 12z" fill="#8a3b5a" />}
    <circle cx="50" cy="34" r="20" fill={col} />
    <path d="M10 120c2-34 18-50 40-50s38 16 40 50z" fill={scarf ? '#6b3a50' : '#4a5264'} />
    {!scarf && <path d="M30 28c4-14 36-14 40 0" stroke="#2a2018" strokeWidth="10" fill="none" strokeLinecap="round" />}
    {scarf && <path d="M28 30c2-14 42-14 44 0" stroke="#8a3b5a" strokeWidth="9" fill="none" strokeLinecap="round" />}
  </svg>;

/* prohibition sign with a runner inside */
const NoChase: React.FC<{ s: number; t: number }> = ({ s, t }) =>
  <div style={{ position: 'relative', width: s, height: s }}>
    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(14,16,22,.92)', border: `${s * .07}px solid ${RED}`, boxShadow: '0 0 60px rgba(236,58,44,.4)' }} />
    <div style={{ position: 'absolute', left: s * .26, top: s * .16 }}><Runner s={s * .48} ph={t * 9} /></div>
    <div style={{ position: 'absolute', left: s * .06, top: s * .465, width: s * .88, height: s * .07, background: RED, rotate: '45deg', borderRadius: 6 }} />
  </div>;

const House: React.FC<{ w: number }> = ({ w }) =>
  <svg width={w} height={w * .9} viewBox="0 0 200 180" style={{ display: 'block' }}>
    <path d="M100 10 L190 84 L172 84 L172 176 L28 176 L28 84 L10 84 Z" fill="#232a38" stroke={TEAL} strokeWidth="5" strokeLinejoin="round" />
    <rect x="80" y="112" width="40" height="64" rx="4" fill="#3a4256" />
    <rect x="42" y="100" width="28" height="28" rx="3" fill={Y} opacity=".85" /><rect x="130" y="100" width="28" height="28" rx="3" fill={Y} opacity=".85" />
  </svg>;

const BankCard: React.FC<{ w: number; id: string }> = ({ w, id }) =>
  <svg width={w} height={w * .63} viewBox="0 0 320 202" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`bk${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4fc1cf" /><stop offset=".55" stopColor="#2C8290" /><stop offset="1" stopColor="#163f47" /></linearGradient></defs>
    <rect x="0" y="0" width="320" height="202" rx="20" fill={`url(#bk${id})`} />
    <path d="M0 140 C 90 110 200 180 320 120 L320 182 Q320 202 300 202 L20 202 Q0 202 0 182 Z" fill="#fff" opacity=".07" />
    <rect x="28" y="60" width="50" height="38" rx="7" fill="#e8c46a" /><path d="M28 79h50M53 60v38" stroke="#b8923a" strokeWidth="2" />
    <text x="28" y="146" fontFamily="JBM" fontSize="21" fill="#eaf6f8" letterSpacing="2">•••• •••• •••• 4821</text>
    <text x="28" y="40" fontFamily="Osw" fontWeight="700" fontSize="22" fill="#eaf6f8">KARTA</text>
    <circle cx="262" cy="170" r="16" fill={Y} opacity=".9" /><circle cx="284" cy="170" r="16" fill="#fff" opacity=".55" />
  </svg>;

const Bell: React.FC<{ s: number; col?: string }> = ({ s, col = Y }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M32 6c-11 0-18 8-18 19v12l-6 8h48l-6-8V25c0-11-7-19-18-19z" fill={col} /><circle cx="32" cy="52" r="6" fill={col} /></svg>;

const Check: React.FC<{ s: number; col?: string }> = ({ s, col = GRN }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M12 34l14 14 26-30" stroke={col} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Cross: React.FC<{ s: number; col?: string }> = ({ s, col = RED }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M14 14l36 36M50 14 14 50" stroke={col} strokeWidth="9" strokeLinecap="round" /></svg>;

/* order card (generic UI) */
const OrderCard: React.FC<{ w: number; pay: string; payCol: string; btn: number; tap: number }> = ({ w, pay, payCol, btn, tap }) =>
  <div style={{ width: w, borderRadius: 22, background: 'linear-gradient(180deg,#1f2533,#121620)', border: '1.5px solid rgba(255,255,255,.12)', padding: 18 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 19, color: GR }}><span>Buyurtma</span><span>23:14</span></div>
    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: SANS, fontWeight: 700, fontSize: 25, color: WH }}><div style={{ width: 14, height: 14, borderRadius: 7, background: TEAL }} />Chilonzor</div>
      <div style={{ marginLeft: 5, width: 2, height: 14, background: '#3a4256' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: SANS, fontWeight: 700, fontSize: 25, color: WH }}><div style={{ width: 14, height: 14, borderRadius: 3, background: Y }} />Yunusobod</div>
    </div>
    <div style={{ marginTop: 16, fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: WH, lineHeight: 1 }}>38 000 <span style={{ fontSize: 24, color: GR }}>so‘m</span></div>
    <div style={{ marginTop: 10, fontFamily: SANS, fontWeight: 800, fontSize: 23, color: payCol }}>{pay}</div>
    <div style={{ position: 'relative', marginTop: 16, padding: '18px 0', borderRadius: 14, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 24, color: btn > .5 ? '#0d1a1c' : WH, background: btn > .5 ? TEAL : 'rgba(255,255,255,.07)', border: `2px solid ${TEAL}`, boxShadow: btn > .5 ? '0 0 30px rgba(63,169,184,.6)' : 'none', overflow: 'hidden' }}>
      Qo‘llab-quvvatlash
      {tap > 0 && tap < 1 && <div style={{ position: 'absolute', left: '50%', top: '50%', width: 300 * tap, height: 300 * tap, translate: '-50% -50%', borderRadius: '50%', background: 'rgba(255,255,255,.35)', opacity: 1 - tap }} />}
    </div>
  </div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 4.3, .2, .3);
  const run = eio(P(t, T.tolamay - .3, 4.3));
  const rx = lerp(600, 720, run);
  return <Layer a={a} z={logZ(P(t, 0, 4.3), 1, 1.05)}>
    <Glow x={CX} y={1060} r={540} a={.9} col="236,58,44" />
    <div style={{ position: 'absolute', left: 50, top: 1010 }}><Car w={560} id="c1" lights={.6} /></div>
    <div style={{ position: 'absolute', left: rx, top: 930 }}>
      <Runner s={190} ph={t * 11} />
      {[0, 1, 2].map(i => <div key={i} style={{ position: 'absolute', left: -40 - i * 26, top: 70 + i * 34, width: 50 + i * 10, height: 6, borderRadius: 3, background: WH, opacity: .35 * run }} />)}
    </div>
    <Pill s="naqd · 38 000 so‘m" x={330} y={960} a={eout(P(t, T.tolamay, T.tolamay + .3))} size={28} dark col={Y} />
    <Pill s="misol" x={330} y={900} a={eout(P(t, T.tolamay + .2, T.tolamay + .5))} size={20} dark col={GR} />
    <div style={{ position: 'absolute', left: 500, top: 1330, translate: '-50% -50%', opacity: eout(P(t, T.endi0 - .2, T.endi0 + .2)), scale: String(lerp(.5, 1, eback(P(t, T.endi0 - .2, T.endi0 + .3)))), fontFamily: HEAD, fontWeight: 700, fontSize: 130, color: Y, textShadow: '0 0 40px rgba(247,198,75,.5)' }}>?</div>
    <Head t={t} t0={-1} t1={T.endi0 - .1} y={490} lines={[['yo‘lovchi to‘lamay'], ['qochdi!', 'r']]} size={74} />
    <Head t={t} t0={T.endi0 - .1} t1={4.3} y={490} lines={[['endi nima'], ['qilasiz?', 'y']]} size={80} from="slam" />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 4.15, 11.4, .3, .3);
  const aA = env(t, 4.15, T.avval, .3, .3), aB = env(t, T.avval - .2, 11.4, .3, .3);
  const blink = Math.floor(t * 2.5) % 2 === 0 ? 1 : .15;
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 4.15, T.avval), 1, 1.04)}>
      <Glow x={CX} y={980} r={520} a={.9} col="236,58,44" />
      <div style={{ position: 'absolute', left: CX - 230, top: 720, scale: String(lerp(.7, 1, eback(P(t, T.ortidan - .3, T.ortidan + .2)))), opacity: eout(P(t, T.ortidan - .3, T.ortidan)) }}><NoChase s={460} t={t} /></div>
      <Pill s="janjal ham — yo‘q" x={CX} y={1260} a={eout(P(t, T.janjal - .1, T.janjal + .2))} size={34} dark col={RED} />
      <Head t={t} t0={4.15} t1={T.ortidan - .1} y={490} lines={[['birinchi'], ['qoida', 'y']]} size={80} />
      <Head t={t} t0={T.ortidan - .1} t1={T.avval} y={490} lines={[['ortidan quvmang,'], ['janjal qilmang', 'r']]} size={70} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.avval, 11.4), 1, 1.04)}>
      <Glow x={CX} y={1000} r={520} a={.9} col="61,220,132" />
      <div style={{ position: 'absolute', left: CX - 300, top: 900 }}>
        <Car w={600} id="c2" lights={0} />
        {[[28, 128], [578, 128]].map(([x, y], i) => <div key={i} style={{ position: 'absolute', left: x, top: y * 1.2 - 40, width: 34, height: 34, borderRadius: 17, background: '#ffa62b', opacity: blink, boxShadow: `0 0 ${30 * blink}px #ffa62b` }} />)}
      </div>
      <Pill s="⚠ avariya chirog‘i" x={CX} y={1210} a={eout(P(t, T.toxta - .2, T.toxta + .2))} size={30} dark col="#ffa62b" />
      <Head t={t} t0={T.avval - .2} t1={T.pul1 - .1} y={490} lines={[['avval xavfsiz joyda'], ['to‘xtang', 'g']]} size={68} />
      <Head t={t} t0={T.pul1 - .1} t1={11.4} y={490} lines={[['pul sog‘liqdan'], ['qimmat emas', 'y']]} size={72} />
    </Layer>
  </Layer>;
};

const Row: React.FC<{ k: string; v: string; h: number; ok: number }> = ({ k, v, h, ok }) =>
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', borderRadius: 18, background: h > 0 ? `rgba(63,169,184,${.18 * h})` : 'rgba(255,255,255,.04)', border: `2px solid rgba(63,169,184,${.25 + .75 * h})`, fontFamily: SANS, fontWeight: 800, fontSize: 34 }}>
    <span style={{ color: TEAL, width: 170 }}>{k}</span><span style={{ color: WH, opacity: clamp(h * 3) }}>{v}</span>
    <span style={{ marginLeft: 'auto', opacity: ok }}><Check s={40} /></span>
  </div>;
const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 11.25, 21.8, .3, .3);
  const aA = env(t, 11.25, T.qayer, .3, .3), aB = env(t, T.qayer - .2, 21.8, .3, .3);
  const btn = t > T.qollab ? 1 : 0;
  const tap = P(t, T.qollab, T.qollab + .6);
  const pw = 340;
  const ok = eout(P(t, T.aniq - .1, T.aniq + .2));
  const day = eout(P(t, T.kech - .2, T.kech + .3));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 11.25, T.qayer), 1, 1.04)}>
      <Glow x={CX} y={1040} r={520} a={.85} col="63,169,184" />
      <div style={{ position: 'absolute', left: CX - pw / 2, top: 650 }}>
        <Phone w={pw} id="p3">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#161b26,#0b0e14)', padding: '80px 14px 0' }}>
            <div style={{ fontFamily: MONO, fontSize: 19, color: GR, marginBottom: 14 }}>Tarix › bugun</div>
            <div style={{ scale: String(lerp(.96, 1.02, eout(P(t, T.kart - .2, T.kart + .3)))), opacity: eout(P(t, T.buyurtma1 - .3, T.buyurtma1 + .1)) }}>
              <OrderCard w={pw - 28} pay="naqd · to‘lanmadi" payCol={RED} btn={btn} tap={tap} />
            </div>
          </div>
        </Phone>
      </div>
      <Pill s="buyurtma kartochkasi" x={790} y={880} a={eout(P(t, T.kart - .2, T.kart + .2))} size={24} dark col={TEAL} />
      <Src s={KB_RU} y={1395} a={eout(P(t, T.kart, T.kart + .4))} />
      <Head t={t} t0={11.25} t1={T.kart - .1} y={490} lines={[['ilovada shu'], ['buyurtmani oching', 'y']]} size={68} />
      <Head t={t} t0={T.kart - .1} t1={T.qayer} y={490} lines={[['kartochkadan —'], ['yordamga yozing', 'y']]} size={68} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.qayer, 21.8), 1, 1.03)}>
      <Glow x={CX} y={1000} r={520} a={.85} col="63,169,184" />
      <Card x={SL + 30} y={700} w={SR - SL - 60}>
        <div style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>Qo‘llab-quvvatlashga xabar</div>
          <Row k="Qayerda" v="Yunusobod" h={eout(P(t, T.qayer - .1, T.qayer + .25))} ok={ok} />
          <Row k="Qachon" v="23:14" h={eout(P(t, T.qachon - .1, T.qachon + .25))} ok={ok} />
          <Row k="Qancha" v="38 000 so‘m" h={eout(P(t, T.qancha - .1, T.qancha + .25))} ok={ok} />
        </div>
      </Card>
      <div style={{ position: 'absolute', left: CX, top: 1250, translate: '-50% -50%', opacity: day, scale: String(lerp(.7, 1, eback(P(t, T.kech - .2, T.kech + .35)))), display: 'flex', alignItems: 'center', gap: 18, padding: '16px 30px', borderRadius: 22, background: 'rgba(14,16,22,.94)', border: `3px solid ${Y}` }}>
        <svg width="54" height="54" viewBox="0 0 64 64"><rect x="6" y="12" width="52" height="46" rx="8" fill="none" stroke={Y} strokeWidth="6" /><path d="M6 26h52M20 6v12M44 6v12" stroke={Y} strokeWidth="6" strokeLinecap="round" /></svg>
        <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: Y }}>O‘SHA KUNI</span>
      </div>
      <Pill s="misol" x={830} y={690} a={eout(P(t, T.qayer, T.qayer + .3))} size={20} dark col={GR} />
      <Head t={t} t0={T.qayer - .2} t1={T.kech - .1} y={490} lines={[['qayerda, qachon, qancha'], ['aniq yozing', 'y']]} size={60} />
      <Head t={t} t0={T.kech - .1} t1={21.8} y={490} lines={[['kechiktirmang —'], ['o‘sha kuni', 'y']]} size={72} />
    </Layer>
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 21.7, 27.35, .3, .2);
  const hk = eout(P(t, T.lekin1 - .2, T.lekin1 + .4));
  return <Layer a={a} z={logZ(P(t, 21.7, 27.3), 1, 1.04)}>
    <Glow x={CX} y={1040} r={520} a={.85} col="247,198,75" />
    <div style={{ position: 'absolute', left: 520, top: 900, opacity: hk, scale: String(lerp(.7, 1, eback(hk))) }}><House w={360} /></div>
    <div style={{ position: 'absolute', left: 90, top: 940 }}><Person s={380} scarf col="#d2a585" /></div>
    <div style={{ position: 'absolute', left: 300, top: 790, opacity: eout(P(t, T.pulni - .2, T.pulni + .2)) * (1 - hk * .25), padding: '20px 26px', borderRadius: '28px 28px 28px 6px', background: WH, color: '#111', fontFamily: SANS, fontWeight: 800, fontSize: 36, whiteSpace: 'nowrap' }}>«Pulni keyin beraman»</div>
    <Pill s="lekin qochmaydi 🙂" x={700} y={1290} a={eout(P(t, T.qochm - .2, T.qochm + .2))} size={30} col={GRN} />
    <Head t={t} t0={21.7} t1={T.lekin1 - .1} y={490} lines={[['qaynona ham'], ['«keyin beraman»', 'y']]} size={70} />
    <Head t={t} t0={T.lekin1 - .1} t1={27.35} y={490} lines={[['hech bo‘lmasa'], ['uyda o‘tiradi', 'g']]} size={72} />
  </Layer>;
};

const Opt: React.FC<{ s: string; sel: number; ico: React.ReactNode; lock: number }> = ({ s, sel, ico, lock }) =>
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, padding: '44px 10px', borderRadius: 22, background: sel > .5 ? 'rgba(63,169,184,.22)' : 'rgba(255,255,255,.04)', border: `3px solid ${sel > .5 ? TEAL : '#3a4356'}`, boxShadow: sel > .5 ? '0 0 34px rgba(63,169,184,.45)' : 'none', opacity: 1 - lock * .45 }}>
    {ico}
    <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 60, color: sel > .5 ? WH : GR }}>{s}</span>
    <div style={{ width: 34, height: 34, borderRadius: 17, border: `4px solid ${sel > .5 ? TEAL : '#4a5264'}`, display: 'grid', placeItems: 'center' }}>{sel > .5 && <div style={{ width: 16, height: 16, borderRadius: 8, background: TEAL }} />}</div>
  </div>;
const Cash: React.FC<{ s: number }> = ({ s }) =>
  <svg width={s} height={s * .6} viewBox="0 0 100 60"><rect x="4" y="6" width="92" height="48" rx="8" fill="#2f6b45" stroke={GRN} strokeWidth="3" /><circle cx="50" cy="30" r="12" fill="none" stroke={GRN} strokeWidth="3" /><text x="50" y="36" textAnchor="middle" fontFamily="Osw" fontWeight="700" fontSize="16" fill={GRN}>so‘m</text></svg>;
const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 27.2, 41.15, .12, .3);
  const aA = env(t, 27.2, 28.95, .1, .3);
  const aB = env(t, 28.8, 41.15, .3, .3);
  const sel = t < T.naqd ? -1 : t < T.karta ? 0 : 1;
  const used = t < T.kuniga ? 0 : t < T.kuniga + .35 ? 1 : t < T.kuniga + .7 ? 2 : 3;
  const lock = eout(P(t, T.lekin2, T.lekin2 + .3));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} col="63,169,184" />
      <Head t={t} t0={27.2} t1={28.95} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, 28.8, 41.15), 1, 1.03)}>
      <Glow x={CX} y={1000} r={540} a={.9} col={lock > .5 ? '236,58,44' : '63,169,184'} />
      <Card x={SL + 20} y={700} w={SR - SL - 40} a={eout(P(t, 28.9, 29.3))}>
        <div style={{ padding: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 22, color: GR, marginBottom: 18 }}><span>Keyingi buyurtma to‘lovi</span><span style={{ color: used ? Y : GR }}>{used}/3 bugun</span></div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Opt s="NAQD" sel={sel === 0 ? 1 : 0} lock={lock} ico={<Cash s={170} />} />
            <Opt s="KARTA" sel={sel === 1 ? 1 : 0} lock={lock} ico={<BankCard w={170} id="o1" />} />
          </div>
        </div>
      </Card>
      {lock > 0 && <div style={{ position: 'absolute', left: CX, top: 1000, translate: '-50% -50%', opacity: lock, scale: String(lerp(1.6, 1, lock)) }}>
        <svg width="120" height="120" viewBox="0 0 64 64"><rect x="10" y="28" width="44" height="32" rx="7" fill={RED} /><path d="M20 28v-8a12 12 0 0 1 24 0v8" stroke={RED} strokeWidth="7" fill="none" /><circle cx="32" cy="44" r="5" fill="#fff" /></svg>
      </div>}
      <Pill s="kuniga 3 martagacha" x={CX} y={1290} a={eout(P(t, T.kuniga - .1, T.kuniga + .2)) * (1 - lock)} size={36} col={Y} />
      <Pill s="narx oshgan zona — o‘zgarmaydi" x={CX} y={1290} a={lock} size={34} dark col={RED} />
      <Src s={KB_PAY} y={1395} a={eout(P(t, T.ilova2, T.ilova2 + .4))} />
      <Head t={t} t0={28.8} t1={T.ilova2 - .1} y={490} lines={[['qochishning'], ['oldini olsa bo‘ladi', 'g']]} size={70} />
      <Head t={t} t0={T.ilova2 - .1} t1={T.kuniga - .1} y={490} lines={[['keyingi buyurtma:'], ['naqd yoki karta', 'y']]} size={68} />
      <Head t={t} t0={T.kuniga - .1} t1={T.lekin2 - .1} y={490} lines={[['o‘zingiz tanlaysiz —'], ['kuniga 3 marta', 'y']]} size={66} />
      <Head t={t} t0={T.lekin2 - .1} t1={41.15} y={490} lines={[['narx oshgan zonada —'], ['o‘zgarmaydi', 'r']]} size={66} />
    </Layer>
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 41.05, 50.8, .3, .3);
  const aA = env(t, 41.05, T.pul3, .3, .3), aB = env(t, T.pul3 - .2, 50.8, .3, .3);
  const fill = eio(P(t, T.kun35 - .1, T.kun35 + 1.2));
  const night = eout(P(t, T.masalan, T.masalan + .3));
  const day = 1 - eout(P(t, T.masalan - .3, T.masalan));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 41.05, T.pul3), 1, 1.04)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="61,220,132" />
      <div style={{ position: 'absolute', left: CX - 260, top: 760, rotate: `${lerp(-14, -6, eout(P(t, 41.05, 41.8)))}deg`, scale: String(lerp(.7, 1, eback(P(t, 41.05, 41.7)))) }}><BankCard w={520} id="b6" /></div>
      <Pill s="yo‘lovchidan pul olmaysiz" x={CX} y={1170} a={eout(P(t, T.olmay - .2, T.olmay + .2))} size={34} dark col={GRN} />
      <Stamp s="QOCHADIGAN NARSA YO‘Q" y={1280} t={t} t0={T.yoq - .3} t1={T.pul3} col={GRN} size={50} rot={-5} />
      <Src s={KB_TAS} y={1395} a={eout(P(t, T.karta2, T.karta2 + .4))} />
      <Head t={t} t0={41.05} t1={T.pul3} y={490} lines={[['karta bilan'], ['to‘lansa', 'g']]} size={78} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.pul3, 50.8), 1, 1.03)}>
      <Glow x={CX} y={1000} r={540} a={.85} col={night > .5 ? '91,140,255' : '63,169,184'} />
      <Layer a={day}>
        <div style={{ ...abs(SL + 40, 760, SR - SL - 80), display: 'flex', gap: 14, justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map(d => { const lit = fill * 5 >= d - .5 ? 1 : 0; const zone = d >= 3;
            return <div key={d} style={{ width: 140, height: 170, borderRadius: 18, background: lit ? (zone ? 'rgba(61,220,132,.22)' : 'rgba(63,169,184,.18)') : 'rgba(255,255,255,.04)', border: `3px solid ${lit ? (zone ? GRN : TEAL) : '#3a4356'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 72, color: lit ? WH : GR, lineHeight: 1 }}>{d}</span>
              <span style={{ fontFamily: MONO, fontSize: 20, color: GR }}>kun</span>
            </div>; })}
        </div>
        <div style={{ ...abs(SL + 40 + 300, 950, 430), height: 8, borderRadius: 4, background: GRN, opacity: eout(P(t, T.kun35 + 1, T.kun35 + 1.3)) }} />
        <Pill s="3–5 kunda balansga" x={CX} y={1080} a={eout(P(t, T.kun35 + 1, T.kun35 + 1.3))} size={38} col={GRN} />
        <Head t={t} t0={T.pul3 - .2} t1={T.masalan - .1} y={490} lines={[['pul balansga'], ['3–5 kunda', 'y']]} size={76} />
      </Layer>
      <Layer a={night}>
        <div style={{ position: 'absolute', left: 690, top: 720 }}>
          <svg width="150" height="150" viewBox="0 0 64 64"><path d="M40 6a26 26 0 1 0 18 40A22 22 0 0 1 40 6z" fill="#cfd9ff" /></svg>
        </div>
        <div style={{ position: 'absolute', left: CX - 280, top: 900 }}><Car w={560} id="c6" lights={1} /></div>
        <Pill s="karta buyurtmasi ✓" x={CX} y={1200} a={eout(P(t, T.tanlang - 1.3, T.tanlang - 1))} size={36} col={TEAL} />
        <Pill s="misol" x={210} y={760} a={night} size={22} dark col={GR} />
        <Head t={t} t0={T.masalan - .1} t1={50.8} y={490} lines={[['kechki uzoq safar —'], ['karta tanlang', 'y']]} size={68} />
      </Layer>
      <Src s={KB_TAS} y={1395} a={1} />
    </Layer>
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 50.7, 57.95, .3, .3);
  const pw = 340;
  const low = eout(P(t, T.yetmasa - .2, T.yetmasa + .2));
  const ban = eout(P(t, T.ozgar2 - .3, T.ozgar2 + .2));
  const read = eout(P(t, T.oqing - .3, T.oqing));
  return <Layer a={a} z={logZ(P(t, 50.7, 57.95), 1, 1.03)}>
    <Glow x={CX} y={1040} r={520} a={.9} col={ban > .5 ? '247,198,75' : '63,169,184'} />
    <div style={{ position: 'absolute', left: CX - pw / 2, top: 650 }}>
      <Phone w={pw} id="p7">
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#161b26,#0b0e14)', padding: '200px 14px 0' }}>
          <div style={{ fontFamily: MONO, fontSize: 19, color: GR, marginBottom: 14 }}>Yangi buyurtma</div>
          <div style={{ borderRadius: 18, background: 'linear-gradient(180deg,#1f2533,#121620)', border: '1.5px solid rgba(255,255,255,.12)', padding: 16 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: WH }}>To‘lov usuli</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
              <BankCard w={58} id="p7c" />
              <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 23, color: ban > .5 ? GR : WH, textDecoration: ban > .5 ? 'line-through' : 'none' }}>Karta</span>
              {ban > .5 && <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 23, color: Y, whiteSpace: 'nowrap' }}>→ Naqd</span>}
            </div>
            <div style={{ marginTop: 12, fontFamily: MONO, fontSize: 19, color: RED, opacity: low }}>mablag‘ yetarli emas</div>
          </div>
          <div style={{ marginTop: 12, height: 90, borderRadius: 18, background: 'rgba(255,255,255,.04)' }} />
        </div>
        <div style={{ position: 'absolute', left: 8, right: 8, top: lerp(-160, 60, ban), borderRadius: 18, padding: '14px 12px', background: 'rgba(40,46,60,.97)', border: `2px solid ${read > .5 ? GRN : Y}`, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 10px 30px rgba(0,0,0,.6)' }}>
          <Bell s={40} col={read > .5 ? GRN : Y} />
          <div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 19, color: WH, whiteSpace: 'nowrap' }}>To‘lov usuli o‘zgardi</div><div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, color: Y }}>Endi: naqd pul</div></div>
          <div style={{ marginLeft: 'auto', opacity: read }}><Check s={30} /></div>
        </div>
      </Phone>
    </div>
    <div style={{ position: 'absolute', left: 750, top: 780, opacity: ban, scale: String(lerp(.5, 1, eback(ban))), rotate: `${Math.sin(t * 18) * 10 * Math.exp(-Math.max(0, t - T.ozgar2) * 2)}deg` }}><Bell s={120} /></div>
    <Src s={KB_TAS} y={1395} a={eout(P(t, T.kartada, T.kartada + .4))} />
    <Head t={t} t0={50.7} t1={T.naqdga - .1} y={490} lines={[['kartada pul'], ['yetmasa', 'r']]} size={78} />
    <Head t={t} t0={T.naqdga - .1} t1={T.shu - .1} y={490} lines={[['to‘lov naqdga o‘zgaradi —'], ['ilova xabar beradi', 'y']]} size={58} />
    <Head t={t} t0={T.shu - .1} t1={57.95} y={490} lines={[['xabarni albatta'], ['o‘qing', 'g']]} size={76} />
  </Layer>;
};

const Perk: React.FC<{ t: number; t0: number; t1: number; children: React.ReactNode }> = ({ t, t0, t1, children }) => {
  const a = env(t, t0, t1, .3, .25); if (a <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, opacity: a, translate: `${(1 - eout(P(t, t0, t0 + .4))) * 120}px 0` }}>{children}</div>;
};
const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 57.85, 66.05, .3, .3);
  const sec = Math.max(0, 5 - Math.floor(P(t, T.sek5, T.sek5 + 1.0) * 5));
  const pop = eback(P(t, T.kecha - .2, T.kecha + .3));
  return <Layer a={a}>
    <Glow x={CX} y={1000} r={520} a={.9} col="63,169,184" />
    <div style={{ ...abs(SL, 680, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 57.85, 58.25)), scale: String(lerp(.8, 1, eback(P(t, 57.85, 58.45)))) }}><Lockup h={100} /></div>
    <Perk t={t} t0={57.85} t1={T.balans}>
      <div style={{ position: 'absolute', left: CX, top: 1030, translate: '-50% -50%', width: 320, height: 320, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)', scale: String(lerp(.85, 1, pop)) }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 130, lineHeight: 1, color: Y }}>24/7</div><div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>yordam</div></div>
      </div>
      <Src s="Zero Taxi ma’lumoti" y={1260} a={eout(P(t, T.yordam, T.yordam + .4))} />
      <Head t={t} t0={57.85} t1={T.balans} y={490} lines={[['yordam'], ['kecha-kunduz', 'y']]} size={76} />
    </Perk>
    <Perk t={t} t0={T.balans} t1={T.pul}>
      <div style={{ ...abs(SL, 840, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 220, lineHeight: 1, ...yel }}>+10%</div>
      <Card x={SL + 90} y={1100} w={SR - SL - 180}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, padding: '22px 0', fontFamily: HEAD, fontWeight: 700, fontSize: 50 }}>
          <span style={{ color: WH }}>100 000</span><span style={{ color: GR }}>→</span><span style={{ color: GRN }}>+10 000</span>
        </div>
      </Card>
      <Src s="Zero Taxi ma’lumoti · balansni to‘ldirganda · so‘mda" y={1280} a={1} />
      <Head t={t} t0={T.balans} t1={T.pul} y={490} lines={[['balansga'], ['+10% bonus', 'y']]} size={72} />
    </Perk>
    <Perk t={t} t0={T.pul} t1={66.05}>
      <div style={{ position: 'absolute', left: CX, top: 1030, translate: '-50% -50%', width: 300, height: 300, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)' }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 160, lineHeight: 1, color: Y }}>{sec}</div><div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>soniya</div></div>
      </div>
      <Pill s="0% komissiya" x={CX} y={1260} a={eout(P(t, T.komis, T.komis + .3))} size={32} col={GRN} />
      <Src s="Zero Taxi ma’lumoti · «Zero Taxi PAY» bot" y={1330} a={eout(P(t, T.pul, T.pul + .4))} />
      <Head t={t} t0={T.pul} t1={66.05} y={490} lines={[['pul yechish'], ['5 soniyada', 'y']]} size={72} />
    </Perk>
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 65.9, END + 1, .3, .1);
  return <Layer a={a}>
    <ZtEnd t={t} t0={66.0} perks={['24/7 yordam', '+10% balansga bonus', '5 soniyada yechish · 0% komissiya', 'Har oy turnir · 1 000 000 so‘m']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.qoch0, 10, 7], [T.endi0, 8, 7], [T.ortidan, 10, 6], [T.kech, 6, 7], [T.endi, 20, 5], [T.lekin2, 10, 6], [T.yoq, 8, 6], [T.ozgar2, 8, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () =>
  <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1150} r={560} a={1} col="236,58,44" />
    <div style={{ position: 'absolute', left: 60, top: 1060 }}><Car w={560} id="cv" lights={.6} /></div>
    <div style={{ position: 'absolute', left: 640, top: 960 }}><Runner s={200} ph={.8} /></div>
    {[0, 1, 2].map(i => <div key={i} style={{ position: 'absolute', left: 600 - i * 26, top: 1040 + i * 34, width: 50 + i * 10, height: 6, borderRadius: 3, background: WH, opacity: .35 }} />)}
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 32, color: GR }}>yandex go · naqd to‘lov · haydovchi</div>
    <div style={{ ...abs(SL, 500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 124, lineHeight: 1.04, ...yel }}>TO‘LAMAY<br />QOCHDI?</div>
    <div style={{ ...abs(SL, 1460, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 62, lineHeight: 1.1, color: GRN }}>QUVMANG — YOZING.<br />KARTANI TANLANG</div>
  </AbsoluteFill>;
