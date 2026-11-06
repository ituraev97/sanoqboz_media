import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone, Gauge } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Card, Src, Background, Reel, ZtEnd, fmt } from '../kit';
import { END, T } from './ep';

const KB = 'manba: Yandex Pro bilimlar bazasi (O‘zbekiston) — «Бонусы»';
const MISOL = 'misol · shartlar har bir haydovchida har xil · joriy maqsad — Yandex Pro ilovasida';

/* ---------- art ---------- */
/* goal offer card (generic UI, no real app design) */
const OfferCard: React.FC<{ w: number; n: number; of: number; sum: string; t: number; t0: number; rows?: [string, string, number][] }> = ({ w, n, of, sum, t, t0, rows }) => {
  const a = eout(P(t, t0, t0 + .35));
  return <div style={{ width: w, opacity: a, translate: `0 ${(1 - a) * 40}px`, borderRadius: 26, background: 'linear-gradient(180deg,#1f2533,#121620)', border: `2px solid ${TEAL}`, boxShadow: `0 0 40px rgba(63,169,184,.35), 0 20px 40px rgba(0,0,0,.6)`, padding: '22px 22px 24px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: TEAL, display: 'grid', placeItems: 'center' }}>
        <svg width="28" height="28" viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="none" stroke="#fff" strokeWidth="7" /><circle cx="32" cy="32" r="11" fill="none" stroke="#fff" strokeWidth="7" /><circle cx="32" cy="32" r="3" fill="#fff" /></svg>
      </div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: w * .072, color: WH }}>Maqsad</div>
      <div style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: w * .045, color: GR }}>bugun</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 16 }}>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: w * .13, color: WH, lineHeight: 1, whiteSpace: 'nowrap' }}>{of} ta</div>
      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: w * .05, color: GR, whiteSpace: 'nowrap' }}>buyurtma</div>
      <div style={{ marginLeft: 'auto', fontFamily: HEAD, fontWeight: 700, fontSize: w * .11, color: Y, lineHeight: 1, whiteSpace: 'nowrap' }}>+{sum}</div>
    </div>
    <div style={{ marginTop: 16, height: 16, borderRadius: 8, background: '#2a3040', overflow: 'hidden' }}>
      <div style={{ width: `${clamp(n / of) * 100}%`, height: '100%', borderRadius: 8, background: n >= of ? GRN : `linear-gradient(90deg, ${TEAL}, ${Y})` }} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: MONO, fontSize: w * .045, color: n >= of ? GRN : GR }}>
      <span>{Math.floor(n)} / {of}</span><span>so‘m</span>
    </div>
    {rows && <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {rows.map(([k, v, h], i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 14, background: h > 0 ? `rgba(247,198,75,${.16 * h})` : 'rgba(255,255,255,.04)', border: `2px solid rgba(247,198,75,${h})`, fontFamily: SANS, fontWeight: 700, fontSize: w * .05 }}>
        <span style={{ color: GR }}>{k}</span><span style={{ marginLeft: 'auto', color: WH }}>{v}</span>
      </div>)}
    </div>}
  </div>;
};

/* ring counter (trips inside a timer) */
const Ring: React.FC<{ s: number; p: number; time: number; label: string; done?: number }> = ({ s, p, time, label, done = 0 }) =>
  <svg width={s} height={s} viewBox="0 0 200 200" style={{ display: 'block', overflow: 'visible' }}>
    <circle cx="100" cy="100" r="92" fill="rgba(14,16,22,.92)" stroke="#2a3040" strokeWidth="6" />
    <circle cx="100" cy="100" r="92" fill="none" stroke={GR} strokeWidth="6" strokeDasharray={`${578 * time} 578`} transform="rotate(-90 100 100)" opacity=".7" />
    <circle cx="100" cy="100" r="76" fill="none" stroke="#1d2230" strokeWidth="16" />
    <circle cx="100" cy="100" r="76" fill="none" stroke={done > .5 ? GRN : TEAL} strokeWidth="16" strokeLinecap="round" strokeDasharray={`${477.5 * p} 478`} transform="rotate(-90 100 100)" />
    <text x="100" y="112" textAnchor="middle" fontFamily="Osw" fontWeight="700" fontSize="58" fill={done > .5 ? GRN : WH}>{label}</text>
    <text x="100" y="140" textAnchor="middle" fontFamily="JBM" fontSize="13" fill={GR}>safar</text>
  </svg>;

const Wallet: React.FC<{ w: number; sum: string; k: number }> = ({ w, sum, k }) =>
  <div style={{ width: w, borderRadius: 24, padding: '18px 22px', background: 'linear-gradient(160deg,#20402c,#0f1a14)', border: `2px solid ${GRN}`, boxShadow: `0 0 ${40 * k}px rgba(61,220,132,.5)` }}>
    <div style={{ fontFamily: MONO, fontSize: 20, color: GR }}>balans</div>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: GRN, lineHeight: 1.1, opacity: k }}>+{sum}</div>
  </div>;

const Person: React.FC<{ s: number; col?: string; hair?: string; scarf?: boolean }> = ({ s, col = '#c49a7a', hair = '#2a2018', scarf }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 100 120">
    {scarf && <path d="M22 34c0-22 56-22 56 0v14c-6-8-14-12-28-12s-22 4-28 12z" fill="#8a3b5a" />}
    <circle cx="50" cy="34" r="20" fill={col} />
    <path d="M10 120c2-34 18-50 40-50s38 16 40 50z" fill={scarf ? '#6b3a50' : '#4a5264'} />
    {!scarf && <path d="M30 28c4-14 36-14 40 0" stroke={hair} strokeWidth="10" fill="none" strokeLinecap="round" />}
    {scarf && <path d="M28 30c2-14 42-14 44 0" stroke="#8a3b5a" strokeWidth="9" fill="none" strokeLinecap="round" />}
  </svg>;

const Stopwatch: React.FC<{ s: number; sec: number; ok: number }> = ({ s, sec, ok }) => {
  const ang = (sec / 60) * 360;
  const mm = Math.floor(sec / 60), ss = Math.floor(sec % 60);
  const col = ok > .5 ? GRN : Y;
  return <svg width={s} height={s * 1.12} viewBox="0 0 200 224" style={{ display: 'block', overflow: 'visible' }}>
    <rect x="86" y="0" width="28" height="20" rx="5" fill="#c7cedb" />
    <rect x="94" y="16" width="12" height="16" fill="#8b94a8" />
    <circle cx="100" cy="124" r="96" fill="#0e1118" stroke="#c7cedb" strokeWidth="7" />
    <circle cx="100" cy="124" r="80" fill="none" stroke={col} strokeWidth="10" strokeDasharray={`${502.6 * clamp(sec / 120)} 503`} transform="rotate(-90 100 124)" strokeLinecap="round" opacity=".9" />
    <line x1="100" y1="124" x2={100 + 62 * Math.sin(ang * Math.PI / 180)} y2={124 - 62 * Math.cos(ang * Math.PI / 180)} stroke={WH} strokeWidth="5" strokeLinecap="round" />
    <circle cx="100" cy="124" r="7" fill={col} />
    <text x="100" y="178" textAnchor="middle" fontFamily="JBM" fontWeight="700" fontSize="24" fill={col}>{`${mm}:${ss < 10 ? '0' : ''}${ss}`}</text>
  </svg>;
};

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 6.1, .2, .3);
  const pw = 400;
  return <Layer a={a} z={logZ(P(t, 0, 6), 1, 1.06)}>
    <Glow x={CX} y={1040} r={520} a={.9} col="63,169,184" />
    <div style={{ position: 'absolute', left: CX - pw / 2, top: 640 }}>
      <Phone w={pw} id="p1">
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#161b26,#0b0e14)', padding: '86px 16px 0' }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: GR, marginBottom: 12 }}>Takliflar</div>
          <OfferCard w={pw - 32} n={0} of={5} sum="32 000" t={t} t0={T.besh0 - .3} />
          <div style={{ marginTop: 14, height: 80, borderRadius: 18, background: 'rgba(255,255,255,.04)' }} />
          <div style={{ marginTop: 12, height: 80, borderRadius: 18, background: 'rgba(255,255,255,.04)' }} />
        </div>
      </Phone>
    </div>
    <Pill s="misol" x={820} y={720} a={eout(P(t, T.sum0, T.sum0 + .3))} size={22} dark col={GR} />
    <div style={{ position: 'absolute', left: 790, top: 1180, translate: '-50% -50%', opacity: eout(P(t, T.bu0 - .2, T.bu0 + .2)), scale: String(lerp(.5, 1, eback(P(t, T.bu0 - .2, T.bu0 + .3)))), fontFamily: HEAD, fontWeight: 700, fontSize: 220, color: Y, textShadow: '0 0 40px rgba(247,198,75,.5)' }}>?</div>
    <Head t={t} t0={-1} t1={T.bu0 - .1} y={490} lines={[['5 buyurtma —'], ['+32 000 so‘m', 'y']]} size={74} />
    <Head t={t} t0={T.bu0 - .1} t1={6.1} y={490} lines={[['bu nima va'], ['qanday olinadi?', 'y']]} size={72} from="slam" />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 6.0, 15.45, .3, .3);
  const trips = clamp(P(t, T.belgi, T.safarni + .3));
  const time = clamp(P(t, T.tizim, T.balans0));
  const done = trips >= 1 ? 1 : 0;
  const fly = eio(P(t, T.balans0 - .3, T.bonus0));
  const wk = eout(P(t, T.bonus0 - .1, T.bonus0 + .3));
  return <Layer a={a} z={logZ(P(t, 6, 15.4), 1, 1.03)}>
    <Glow x={CX} y={1000} r={520} a={.85} col={done ? '61,220,132' : '63,169,184'} />
    <div style={{ position: 'absolute', left: CX - 190, top: 700, scale: String(lerp(.8, 1, eback(P(t, 6.0, 6.6)))) }}>
      <Ring s={380} p={Math.floor(trips * 5) / 5} time={time} label={`${Math.floor(trips * 5)}/5`} done={done} />
    </div>
    <Pill s="⏱ belgilangan vaqt" x={CX} y={1120} a={eout(P(t, T.vaqtda - .2, T.vaqtda + .2)) * (1 - fly)} size={28} dark col={GR} />
    {/* bonus coin flies to wallet */}
    {fly > 0 && fly < 1 && <div style={{ position: 'absolute', left: lerp(CX, CX, fly), top: lerp(890, 1200, fly), translate: '-50% -50%', width: 90, height: 90, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff3c4, ${Y} 55%, #b8862a)`, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: '#3a2a06' }}>+</div>}
    <div style={{ position: 'absolute', left: CX - 210, top: 1150, opacity: eout(P(t, T.balans0 - .3, T.balans0 + .1)) }}><Wallet w={420} sum="bonus" k={wk} /></div>
    <Src s={KB} y={1395} a={eout(P(t, T.tizim, T.tizim + .4))} />
    <Head t={t} t0={6.0} t1={T.tizim - .1} y={490} lines={[['shaxsiy bonus —'], ['ya’ni maqsad', 'y']]} size={70} />
    <Head t={t} t0={T.tizim - .1} t1={T.balans0 - .1} y={490} lines={[['belgilangan vaqtda —'], ['kerakli safar', 'y']]} size={64} />
    <Head t={t} t0={T.balans0 - .1} t1={15.45} y={490} lines={[['balansga'], ['bonus tushadi', 'g']]} size={72} />
  </Layer>;
};

const STEPS: [number, number, number][] = [[5, 32000, T.s5], [10, 65000, T.s10], [15, 98000, T.s15], [20, 130000, T.s20]];
const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 15.35, 29.45, .3, .3);
  const bw = 180, gap = 16, x0 = CX - (bw * 4 + gap * 3) / 2, base = 1290;
  const ms = eout(P(t, T.misol - .2, T.misol + .2));
  return <Layer a={a} z={logZ(P(t, 15.35, 29.4), 1, 1.03)}>
    <Glow x={CX} y={1050} r={560} a={.85} col="247,198,75" />
    {STEPS.map(([n, sum, t0], i) => {
      const k = eout(P(t, i === 0 ? T.zina - .2 : t0 - .25, (i === 0 ? T.zina : t0) + .3));
      const lit = eout(P(t, t0 - .1, t0 + .3));
      const h = 150 + i * 120;
      return <div key={i} style={{ position: 'absolute', left: x0 + i * (bw + gap), top: base - h * k, width: bw, height: h * k, borderRadius: '18px 18px 6px 6px', background: lit > 0 ? `linear-gradient(180deg, rgba(247,198,75,${.25 + .55 * lit}), rgba(63,169,184,${.35 + .3 * lit}))` : 'linear-gradient(180deg,#2a3242,#1a1f2b)', border: `3px solid ${lit > .5 ? Y : '#3a4356'}`, boxShadow: lit > .5 ? '0 0 34px rgba(247,198,75,.35)' : 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 14, left: 0, right: 0, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, lineHeight: 1, color: WH, opacity: k }}>{n}</div>
        <div style={{ position: 'absolute', top: 82, left: 0, right: 0, textAlign: 'center', fontFamily: MONO, fontSize: 18, color: lit > .5 ? '#16110a' : GR, opacity: k }}>buyurtma</div>
      </div>;
    })}
    {STEPS.map(([, sum, t0], i) => {
      const lit = eout(P(t, t0 + .5, t0 + .85));
      const h = 150 + i * 120;
      return <div key={'s' + i} style={{ position: 'absolute', left: x0 + i * (bw + gap) + bw / 2, top: base - h - 58 - (1 - lit) * 20, translate: '-50% 0', opacity: lit, fontFamily: HEAD, fontWeight: 700, fontSize: 42, color: Y, whiteSpace: 'nowrap', textShadow: '0 4px 12px rgba(0,0,0,.9)' }}>+{fmt(sum)}</div>;
    })}
    <Pill s="misol" x={190} y={720} a={eout(P(t, T.masalan - .1, T.masalan + .2)) * (1 - ms)} size={22} dark col={GR} />
    <Stamp s="MISOL" x={300} y={800} t={t} t0={T.misol} t1={29.45} col={Y} size={60} rot={-8} />
    <Src s={MISOL} y={1340} a={eout(P(t, T.masalan, T.masalan + .4))} />
    <Head t={t} t0={15.35} t1={T.masalan - .1} y={490} lines={[['zinapoya'], ['kabi', 'y']]} size={80} />
    <Head t={t} t0={T.masalan - .1} t1={T.misol - .1} y={490} lines={[['har pog‘ona —'], ['kattaroq bonus', 'y']]} size={68} />
    <Head t={t} t0={T.misol - .1} t1={29.45} y={490} lines={[['bu faqat misol —'], ['shartlar har xil', 'y']]} size={64} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 29.35, 35.95, .3, .2);
  const aA = env(t, 29.35, T.busafar, .3, .3), aB = env(t, T.busafar - .2, 35.95, .3, .2);
  const cnt = Math.round(lerp(97, 100, P(t, T.yana + .6, T.yuz)));
  const n = 19;
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 29.35, T.busafar), 1, 1.04)}>
      <Glow x={CX} y={1010} r={500} a={.85} col="247,198,75" />
      <div style={{ position: 'absolute', left: 90, top: 980 }}><Person s={320} scarf col="#d2a585" /></div>
      <div style={{ position: 'absolute', left: 560, top: 980 }}><Person s={320} col="#b88a68" /></div>
      <div style={{ position: 'absolute', left: 600, top: 830, opacity: eout(P(t, T.yana - .2, T.yana + .2)), padding: '20px 26px', borderRadius: '28px 28px 6px 28px', background: WH, color: '#111', fontFamily: SANS, fontWeight: 800, fontSize: 34, whiteSpace: 'nowrap', translate: '-30% 0' }}>«Yana bitta buyurtma…»</div>
      <div style={{ position: 'absolute', left: 250, top: 860, translate: '-50% -50%', opacity: eout(P(t, T.yana + .5, T.yana + .8)), fontFamily: HEAD, fontWeight: 700, fontSize: 84, color: cnt >= 100 ? RED : Y, scale: String(1 + .15 * Math.exp(-Math.max(0, t - T.yuz) * 6) * (t >= T.yuz ? 1 : 0)) }}>×{cnt}</div>
      <Head t={t} t0={29.35} t1={T.busafar} y={490} lines={[['«yana bitta'], ['buyurtma»', 'y']]} size={76} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.busafar, 35.9), 1, 1.04)}>
      <Glow x={CX} y={1010} r={520} a={.9} col="61,220,132" />
      <div style={{ position: 'absolute', left: CX - 300, top: 800 }}>
        <OfferCard w={600} n={n} of={20} sum="130 000" t={t} t0={T.busafar - .2} />
      </div>
      <Pill s="1 ta qoldi!" x={CX} y={1200} a={eout(P(t, T.rost, T.rost + .3))} size={44} col={GRN} />
      <Pill s="misol" x={830} y={760} a={eout(P(t, T.busafar, T.busafar + .3))} size={22} dark col={GR} />
      <Head t={t} t0={T.busafar - .2} t1={35.95} y={490} lines={[['bu safar —'], ['rostdan bitta', 'g']]} size={74} />
    </Layer>
  </Layer>;
};

const Cond: React.FC<{ t: number; t0: number; ico: React.ReactNode; s: string; col: string }> = ({ t, t0, ico, s, col }) => {
  const k = eout(P(t, t0 - .2, t0 + .25));
  return <div style={{ opacity: k, translate: `${(1 - k) * 60}px 0`, display: 'flex', alignItems: 'center', gap: 18, fontFamily: SANS, fontWeight: 800, fontSize: 32, color: col }}>
    <div style={{ width: 54, height: 54, borderRadius: 14, background: 'rgba(255,255,255,.06)', display: 'grid', placeItems: 'center' }}>{ico}</div><span>{s}</span>
  </div>;
};
const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 35.8, 50.0, .12, .3);
  const aA = env(t, 35.8, 37.6, .1, .3);
  const aB = env(t, 37.5, T.faol - .1, .3, .3);
  const aC = env(t, T.faol - .3, 50.0, .3, .3);
  const sec = t < T.vaqt ? 0 : Math.min(150, (t - T.vaqt) * 70);
  const ok = sec >= 120 ? 1 : 0;
  const gv = lerp(.15, .62, eio(P(t, T.faol, T.faol + 1.2)));
  const bad = eout(P(t, T.tez - .1, T.tez + .3));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} col="63,169,184" />
      <Head t={t} t0={35.8} t1={37.6} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, 37.5, T.faol), 1, 1.04)}>
      <Glow x={CX} y={1010} r={520} a={.9} col={ok ? '61,220,132' : '236,58,44'} />
      <div style={{ position: 'absolute', left: CX - 170, top: 700, scale: String(lerp(.8, 1, eback(P(t, T.safar2 - .3, T.safar2 + .3)))), opacity: eout(P(t, T.safar2 - .3, T.safar2)) }}><Stopwatch s={340} sec={sec} ok={ok} /></div>
      <Pill s="2 daqiqadan uzun" x={CX} y={1140} a={eout(P(t, T.uzun - .2, T.uzun + .2))} size={34} col={ok ? GRN : Y} />
      <Pill s="yo‘lovchi o‘tirib, safar boshlangandan" x={CX} y={1225} a={eout(P(t, T.vaqt - .1, T.vaqt + .3))} size={26} dark col={TEAL} />
      <Src s={KB} y={1395} a={eout(P(t, T.har, T.har + .4))} />
      <Head t={t} t0={37.5} t1={T.safar2 - .1} y={490} lines={[['har qanday safar'], ['hisoblanmaydi', 'r']]} size={68} />
      <Head t={t} t0={T.safar2 - .1} t1={T.faol} y={490} lines={[['safar —'], ['2 daqiqadan uzun', 'y']]} size={68} />
    </Layer>
    <Layer a={aC} z={logZ(P(t, T.faol, 50), 1, 1.03)}>
      <Glow x={CX} y={1000} r={520} a={.9} col={bad > .5 ? '236,58,44' : '63,169,184'} />
      <div style={{ position: 'absolute', left: CX - 150, top: 650, opacity: 1 - bad * .65 }}><Gauge w={300} v={gv} red={.45} label="faollik" /></div>
      <Card x={SL + 60} y={990} w={SR - SL - 120}>
        <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Cond t={t} t0={T.faol} col={GRN} s="Faollik — kerakli darajada" ico={<svg width="34" height="34" viewBox="0 0 64 64"><path d="M12 34l14 14 26-30" stroke={GRN} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
          <Cond t={t} t0={T.tez} col={RED} s="Tez-tez bekor qilish" ico={<svg width="30" height="30" viewBox="0 0 64 64"><path d="M14 14l36 36M50 14 14 50" stroke={RED} strokeWidth="9" strokeLinecap="round" /></svg>} />
        </div>
      </Card>
      <Stamp s="BONUS YO‘Q" y={1280} t={t} t0={T.bonusY} t1={50.0} size={64} />
      <Src s={KB} y={1395} a={1} />
      <Head t={t} t0={T.faol - .3} t1={T.tez - .1} y={490} lines={[['faollik ham —'], ['kerakli darajada', 'y']]} size={66} />
      <Head t={t} t0={T.tez - .1} t1={50.0} y={490} lines={[['tez-tez bekor qilsangiz —'], ['bonus berilmaydi', 'r']]} size={58} />
    </Layer>
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 49.9, 55.8, .3, .3);
  const h = (t0: number, t1: number) => env(t, t0 - .15, t1, .2, .2);
  return <Layer a={a} z={logZ(P(t, 49.9, 55.8), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="63,169,184" />
    <div style={{ position: 'absolute', left: CX - 300, top: 700 }}>
      <OfferCard w={600} n={2} of={5} sum="32 000" t={t} t0={49.95} rows={[
        ['Nechta safar', '5 ta', h(T.nechta, T.qancha)],
        ['Qancha vaqt', 'bugun, 23:59 gacha', h(T.qancha, T.qanday)],
        ['Qanday shart', 'faollik · 2+ daqiqa', h(T.qanday, 55.8)],
      ]} />
    </div>
    <Pill s="misol" x={830} y={690} a={eout(P(t, 50.2, 50.5))} size={22} dark col={GR} />
    <Head t={t} t0={49.9} t1={55.8} y={490} lines={[['maqsadni oldindan'], ['o‘qing', 'y']]} size={70} />
  </Layer>;
};

const Perk: React.FC<{ t: number; t0: number; t1: number; children: React.ReactNode }> = ({ t, t0, t1, children }) => {
  const a = env(t, t0, t1, .3, .25); if (a <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, opacity: a, translate: `${(1 - eout(P(t, t0, t0 + .4))) * 120}px 0` }}>{children}</div>;
};
const Trophy: React.FC<{ w: number }> = ({ w }) =>
  <svg width={w} height={w * 1.05} viewBox="0 0 200 210">
    <defs><linearGradient id="trG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff1b8" /><stop offset=".5" stopColor={Y} /><stop offset="1" stopColor="#a87a1f" /></linearGradient></defs>
    <path d="M44 30h112v40c0 40-26 66-56 66S44 110 44 70z" fill="url(#trG)" />
    <path d="M44 44H16c0 30 14 46 34 50M156 44h28c0 30-14 46-34 50" stroke={Y} strokeWidth="10" fill="none" />
    <rect x="88" y="134" width="24" height="34" fill="#c99a2e" /><rect x="58" y="166" width="84" height="28" rx="6" fill="url(#trG)" />
    <text x="100" y="92" textAnchor="middle" fontFamily="Osw" fontWeight="700" fontSize="44" fill="#5a3f08">1</text>
  </svg>;
const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 55.7, 66.25, .3, .3);
  const sec = Math.max(0, 5 - Math.floor(P(t, T.sek5, T.sek5 + 1.0) * 5));
  return <Layer a={a}>
    <Glow x={CX} y={1000} r={520} a={.9} col="63,169,184" />
    <div style={{ ...abs(SL, 680, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 55.7, 56.1)), scale: String(lerp(.8, 1, eback(P(t, 55.7, 56.3)))) }}><Lockup h={100} /></div>
    <Perk t={t} t0={55.7} t1={T.balans}>
      <div style={{ position: 'absolute', left: CX - 120, top: 830, opacity: eout(P(t, 56.0, 56.4)), scale: String(lerp(.6, 1, eback(P(t, 56.0, 56.6)))) }}><Trophy w={240} /></div>
      <div style={{ ...abs(SL, 1110, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 120, lineHeight: 1, ...yel, opacity: eout(P(t, T.mln - .1, T.mln + .2)) }}>1 000 000</div>
      <Pill s="so‘m · har oy · park turniri" x={CX} y={1275} a={eout(P(t, T.mln + .2, T.mln + .5))} size={30} col={TEAL} />
      <Src s="Zero Taxi ma’lumoti · Yandex bonuslari ustiga" y={1345} a={eout(P(t, T.mln, T.mln + .4))} />
      <Head t={t} t0={55.7} t1={T.balans} y={490} lines={[['yandex bonuslari'], ['ustiga — turnir', 'y']]} size={66} />
    </Perk>
    <Perk t={t} t0={T.balans} t1={T.pul}>
      <div style={{ ...abs(SL, 840, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 220, lineHeight: 1, ...yel }}>+10%</div>
      <Card x={SL + 90} y={1100} w={SR - SL - 180}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, padding: '22px 0', fontFamily: HEAD, fontWeight: 700, fontSize: 50 }}>
          <span style={{ color: WH }}>100 000</span><span style={{ color: GR }}>→</span><span style={{ color: GRN }}>+10 000</span>
        </div>
      </Card>
      <Src s="balansni to‘ldirganda parkdan bonus · so‘mda" y={1280} a={1} />
      <Head t={t} t0={T.balans} t1={T.pul} y={490} lines={[['balansga'], ['+10% bonus', 'y']]} size={72} />
    </Perk>
    <Perk t={t} t0={T.pul} t1={66.25}>
      <div style={{ position: 'absolute', left: CX, top: 1030, translate: '-50% -50%', width: 300, height: 300, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)' }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 160, lineHeight: 1, color: Y }}>{sec}</div><div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>soniya</div></div>
      </div>
      <Pill s="0% komissiya" x={CX} y={1260} a={eout(P(t, T.komis, T.komis + .3))} size={32} col={GRN} />
      <Head t={t} t0={T.pul} t1={66.25} y={490} lines={[['pul yechish'], ['5 soniyada', 'y']]} size={72} />
    </Perk>
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 66.1, END + 1, .3, .1);
  return <Layer a={a}>
    <ZtEnd t={t} t0={66.2} perks={['Har oy turnir · 1 000 000 so‘m', '+10% balansga bonus', '5 soniyada yechish · 0% komissiya', '24/7 yordam']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.sum0, 8, 7], [T.bu0, 10, 7], [T.s20, 8, 7], [T.yuz, 10, 6], [T.endi, 20, 5], [T.hisob, 8, 6], [T.bonusY, 14, 6], [T.mln, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  const bw = 150, gap = 14, x0 = CX - (bw * 4 + gap * 3) / 2, base = 1360;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1150} r={560} a={1} col="247,198,75" />
    {STEPS.map(([n, sum], i) => { const h = 110 + i * 95;
      return <div key={i}>
        <div style={{ position: 'absolute', left: x0 + i * (bw + gap), top: base - h, width: bw, height: h, borderRadius: '16px 16px 6px 6px', background: `linear-gradient(180deg, rgba(247,198,75,${.35 + i * .15}), rgba(63,169,184,.5))`, border: `3px solid ${Y}` }}>
          <div style={{ textAlign: 'center', marginTop: 10, fontFamily: HEAD, fontWeight: 700, fontSize: 54, color: WH, lineHeight: 1 }}>{n}</div>
        </div>
        <div style={{ position: 'absolute', left: x0 + i * (bw + gap) + bw / 2, top: base - h - 50, translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: Y, whiteSpace: 'nowrap' }}>+{fmt(sum)}</div>
      </div>; })}
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 32, color: GR }}>yandex pro · maqsadlar · bonus</div>
    <div style={{ ...abs(SL, 500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 116, lineHeight: 1.04, ...yel }}>5 BUYURTMA —<br />+32 000?</div>
    <div style={{ ...abs(SL, 1410, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 24, color: GR }}>misol · shartlar har xil</div>
    <div style={{ ...abs(SL, 1460, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 62, lineHeight: 1.1, color: GRN }}>SHARTINI BILING —<br />BONUSNI OLING</div>
  </AbsoluteFill>;
};
