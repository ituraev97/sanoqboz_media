import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, YL, WH, GR, BLUE, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Car } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, flight, fmt, Road, Background, Reel, ZtEnd } from '../kit';
import { END, T } from './ep';

/* ---------- art ---------- */
const TAXI: [string, string] = ['#FFE09A', '#E0A82E'];
const OrderPin: React.FC<{ x: number; y: number; a: number; s?: number }> = ({ x, y, a, s = 1 }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: clamp(a * 1.5), scale: String(s * lerp(.5, 1, eback(clamp(a)))) }}>
    <div style={{ width: 104, height: 104, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${YL}, ${Y} 60%, #d9a52c)`, display: 'grid', placeItems: 'center', boxShadow: '0 0 0 8px rgba(247,198,75,.18), 0 12px 30px rgba(0,0,0,.6)' }}>
      <svg width="58" height="58" viewBox="0 0 64 64"><path d="M32 58s18-18 18-32a18 18 0 0 0-36 0c0 14 18 32 18 32z" fill="#111" /><circle cx="32" cy="26" r="7" fill={Y} /></svg>
    </div>
  </div>;
const Shield: React.FC<{ s: number; col?: string }> = ({ s, col = TEAL }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M32 4 9 13v17c0 15 10 24 23 30 13-6 23-15 23-30V13z" fill={col} /><path d="M21 32l8 8 15-16" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const PolicyCard: React.FC<{ x: number; y: number; a: number; w?: number }> = ({ x, y, a, w = 600 }) =>
  <Card x={x} y={y} w={w} a={a} style={{ background: 'linear-gradient(180deg,#f7f9fa,#dfe6e8)', scale: String(lerp(.85, 1, eback(clamp(a)))) }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 26, padding: '30px 36px' }}>
      <Shield s={120} />
      <div><div style={{ fontFamily: MONO, fontSize: 22, color: '#5A6169' }}>sug‘urta polisi</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 84, lineHeight: 1, color: '#111' }}>OSGOP</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 26, color: '#2C8290', marginTop: 6 }}>yo‘lovchi sug‘urtasi</div></div>
    </div>
  </Card>;
const Plov: React.FC<{ w: number }> = ({ w }) =>
  <svg width={w} height={w * .6} viewBox="0 0 400 240">
    <defs><radialGradient id="plR" cx=".5" cy=".3" r=".7"><stop offset="0" stopColor="#fff3cf" /><stop offset="1" stopColor="#e2b765" /></radialGradient></defs>
    <ellipse cx="200" cy="190" rx="190" ry="44" fill="#d9e2ea" /><ellipse cx="200" cy="182" rx="160" ry="32" fill="#2C8290" opacity=".35" />
    <path d="M60 180 C80 70 320 70 340 180 Z" fill="url(#plR)" />
    {Array.from({ length: 28 }, (_, i) => <rect key={i} x={95 + (i * 37) % 210} y={110 + (i * 23) % 60} width="16" height="5" rx="2" fill="#f07a2b" transform={`rotate(${(i * 47) % 180} ${103 + (i * 37) % 210} ${112 + (i * 23) % 60})`} />)}
    <ellipse cx="200" cy="96" rx="34" ry="16" fill="#b7703a" />
  </svg>;
const Trophy: React.FC<{ s: number }> = ({ s }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M20 8h24v14a12 12 0 0 1-24 0z" fill={Y} /><path d="M20 12H10v4a10 10 0 0 0 10 10 M44 12h10v4a10 10 0 0 1-10 10" fill="none" stroke={Y} strokeWidth="5" /><rect x="29" y="33" width="6" height="11" fill={Y} /><rect x="21" y="44" width="22" height="10" rx="3" fill="#d9a52c" /></svg>;

/* two cars on a road; who = 0 neighbour, 1 you */
const TwoCars: React.FC<{ t: number; win: number; dimYou?: number; dimN?: number }> = ({ t, win, dimYou = 0, dimN = 0 }) => <>
  <Road t={t} y={1080} speed={0} />
  <div style={{ ...abs(90, 1118), opacity: 1 - .55 * dimN }}><Car w={360} id="cn" lights={win === 0 ? 1 : .3} /></div>
  <div style={{ ...abs(560, 1118), opacity: 1 - .55 * dimYou }}><Car w={360} id="cy" col={TAXI} lights={win === 1 ? 1 : .3} /></div>
</>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.9, .2, .3);
  const fp = P(t, T.qoshni - .2, T.ketdi);
  const [ox, oy] = flight(fp, [CX, 800], [270, 1060], 120);
  const got = t > T.ketdi - .05;
  return <Layer a={a} z={logZ(P(t, 0, 5.9), 1, 1.04)}>
    <Glow x={got ? 270 : CX} y={1050} r={480} a={.8} col={got ? '61,220,132' : '247,198,75'} />
    <TwoCars t={t} win={got ? 0 : -1} dimYou={eout(P(t, T.ketdi, T.ketdi + .4))} />
    <OrderPin x={ox} y={oy} a={eout(P(t, T.keldi - .3, T.keldi + .2))} s={got ? .8 : 1} />
    <Pill s="yangi buyurtma" x={CX} y={690} a={env(t, T.keldi, T.qoshni, .2, .25)} size={28} />
    <Pill s="qo‘shni ✓" x={270} y={1350} a={eout(P(t, T.ketdi, T.ketdi + .3))} size={30} col={GRN} />
    <Pill s="siz" x={740} y={1350} a={eout(P(t, .2, .6))} size={30} dark col={GR} />
    <Head t={t} t0={-1} t1={T.nega - .1} y={490} lines={[['buyurtma'], ['qo‘shniga ketdi', 'y']]} size={70} />
    <Head t={t} t0={T.nega - .1} t1={5.9} y={490} lines={[['nega'], ['aynan unga?', 'y']]} size={76} from="slam" />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.8, 15.55, .3, .3);
  const pin: [number, number] = [CX, 790];
  const ln = eout(P(t, T.masofa - .3, T.masofa + .5));
  const bd = eout(P(t, T.prio - .1, T.prio + .35));
  const fp = P(t, T.keladi - .3, T.keladi + .4);
  const [ox, oy] = flight(fp, pin, [270, 930], 40);
  const got = t > T.keladi + .35;
  const line = (x2: number, y2: number, col: string) => <line x1={pin[0]} y1={pin[1] + 40} x2={pin[0] + (x2 - pin[0]) * ln} y2={pin[1] + 40 + (y2 - pin[1] - 40) * ln} stroke={col} strokeWidth="5" strokeDasharray="14 12" strokeLinecap="round" />;
  const badge = (x: number, v: number, hi: boolean) => <div style={{ position: 'absolute', left: x, top: 1012, translate: '-50% 0', opacity: bd, scale: String(lerp(.6, 1, eback(bd))), display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px', borderRadius: 18, background: hi ? Y : 'rgba(14,16,22,.94)', border: hi ? 'none' : `2px solid ${GR}`, color: hi ? '#111' : WH, fontFamily: SANS, fontWeight: 800, fontSize: 26, whiteSpace: 'nowrap' }}>prioritet <span style={{ fontFamily: HEAD, fontSize: 36 }}>{v}</span></div>;
  return <Layer a={a} z={logZ(P(t, 5.8, 15.5), 1, 1.04)}>
    <Glow x={got ? 270 : CX} y={1000} r={500} a={.8} col={got ? '61,220,132' : '247,198,75'} />
    <TwoCars t={t} win={got ? 0 : -1} dimYou={eout(P(t, T.keladi + .3, T.keladi + .7))} />
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>{line(270, 1110, GR)}{line(740, 1110, GR)}</svg>
    <Pill s="450 m" x={330} y={950} a={ln * (1 - bd)} size={28} dark col={WH} />
    <Pill s="300 m" x={680} y={950} a={ln * (1 - bd)} size={28} dark col={WH} />
    {badge(270, 85, true)}{badge(740, 40, false)}
    <OrderPin x={ox} y={oy} a={eout(P(t, 5.8, 6.3))} s={got ? .8 : 1} />
    <div style={{ ...abs(CX - 80, 680, 160), textAlign: 'center', fontFamily: MONO, fontSize: 22, color: GR, opacity: eout(P(t, 5.9, 6.3)) * (1 - P(t, T.keladi - .3, T.keladi)) }}>yo‘lovchi</div>
    <Pill s="uzoqroq — baribir unga" x={CX} y={1350} a={eout(P(t, T.hatto, T.hatto + .3))} size={28} col={Y} />
    <Src s="misol raqamlar · manba: pro.yandex.com, Toshkent — «Как работает приоритет»" y={1395} a={eout(P(t, T.prio, T.prio + .4))} />
    <Head t={t} t0={5.8} t1={T.prio - .15} y={490} lines={[['faqat masofa'], ['hal qilmaydi', 'r']]} size={66} />
    <Head t={t} t0={T.prio - .15} t1={T.hatto - .1} y={490} lines={[['prioritet', 'y']]} size={110} from="slam" />
    <Head t={t} t0={T.hatto - .1} t1={15.55} y={490} lines={[['uzoqroq bo‘lsa'], ['ham — unga', 'y']]} size={64} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 15.48, 27.9, .3, .3);
  const v = t < T.oshadi ? 60 : t < T.tush1 ? lerp(60, 75, eout(P(t, T.oshadi, T.oshadi + .5))) : t < T.tush2 ? lerp(75, 62, eout(P(t, T.tush1, T.tush1 + .5))) : t < T.nol ? lerp(62, 40, eout(P(t, T.tush2, T.tush2 + .5))) : lerp(40, 0, eio(P(t, T.nol, T.nol + 1.2)));
  const col = v <= 0.5 ? RED : v < 50 ? Y : GRN;
  const rowsA = 1 - eout(P(t, T.nol - .2, T.nol + .3));
  const Row: React.FC<{ y: number; t0: number; ic: string; k: string; d: string; c: string }> = ({ y, t0, ic, k, d, c }) => {
    const ra = eout(P(t, t0 - .2, t0 + .2)) * rowsA; if (ra <= 0) return null;
    return <div style={{ ...abs(SL + 40, y, SR - SL - 80), opacity: ra, translate: `${(1 - ra) * 60}px 0`, display: 'flex', alignItems: 'center', gap: 20, padding: '16px 26px', borderRadius: 20, background: 'rgba(20,24,32,.92)', border: `2px solid ${c}55` }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: c, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 30, color: '#111' }}>{ic}</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: WH }}>{k}</div>
      <div style={{ marginLeft: 'auto', fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: c }}>{d}</div>
    </div>;
  };
  return <Layer a={a} z={logZ(P(t, 15.48, 27.8), 1, 1.03)}>
    <Glow x={CX} y={830} r={480} a={.85} col={v <= .5 ? '236,58,44' : '63,169,184'} />
    <Card x={SL + 40} y={660} w={SR - SL - 80} a={eout(P(t, 15.48, 16))} style={{ scale: String(lerp(.9, 1, eback(P(t, 15.48, 16.1)))) }}>
      <div style={{ padding: '26px 34px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH }}>PRIORITET</div>
          <div style={{ marginLeft: 'auto', fontFamily: HEAD, fontWeight: 700, fontSize: 92, lineHeight: 1, color: col }}>{Math.round(v)}</div>
          <div style={{ fontFamily: MONO, fontSize: 24, color: GR, marginLeft: 8 }}>/100</div>
        </div>
        <div style={{ marginTop: 18, height: 30, borderRadius: 15, background: '#1d2230', overflow: 'hidden' }}><div style={{ width: `${v}%`, height: '100%', borderRadius: 15, background: `linear-gradient(90deg, ${TEAL}, ${col})` }} /></div>
        <div style={{ marginTop: 10, fontFamily: MONO, fontSize: 20, color: GR }}>misol</div>
      </div>
    </Card>
    <Row y={960} t0={T.otkaz} ic="✓" k="o‘tkazmasangiz" d="ball ↑" c={GRN} />
    <Row y={1070} t0={T.otk2} ic="↷" k="o‘tkazib yuborsangiz" d="↓" c={Y} />
    <Row y={1180} t0={T.bekor} ic="✕" k="bekor qilsangiz" d="↓↓" c={RED} />
    <Stamp s="BUYURTMA YO‘Q" y={1100} t={t} t0={T.kelmay} t1={27.9} size={66} />
    <Src s="maks. 100 ball · 0 bo‘lsa buyurtmalar yopiladi · pro.yandex.com, Toshkent" y={1395} a={eout(P(t, T.nol, T.nol + .4))} />
    <Head t={t} t0={15.48} t1={T.nol - .1} y={490} lines={[['prioritet ='], ['ballar', 'y']]} size={70} />
    <Head t={t} t0={T.nol - .1} t1={27.9} y={490} lines={[['0 ball —'], ['buyurtma yo‘q', 'r']]} size={70} from="slam" />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 27.81, 34.4, .3, .15);
  const aA = env(t, 27.81, T.qayn - .05, .3, .3), aB = env(t, T.qayn - .25, 34.4, .3, .15);
  const pr = eout(P(t, T.rad - .1, T.rad + .25));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 27.81, T.qayn), 1, 1.04)}>
      <Glow x={CX} y={930} r={480} a={.8} col="61,220,132" />
      <Card x={SL + 70} y={700} w={SR - SL - 140} style={{ scale: String(lerp(.88, 1, eback(P(t, 27.81, 28.4)))) }}>
        <div style={{ padding: '30px 34px' }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>yangi buyurtma · 2 daq</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 38, color: WH, marginTop: 8 }}>Chilonzor → Yunusobod</div>
          <div style={{ marginTop: 28, height: 84, borderRadius: 20, background: GRN, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 34, color: '#06210f', scale: String(1 - .06 * Math.sin(pr * Math.PI)), boxShadow: `0 0 0 ${8 * pr}px rgba(61,220,132,.25)` }}>Qabul qilish</div>
          <div style={{ marginTop: 16, height: 70, borderRadius: 20, background: '#1d2230', display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 28, color: GR, textDecoration: pr > .5 ? 'line-through' : 'none' }}>O‘tkazib yuborish</div>
        </div>
      </Card>
      <Pill s="misol" x={CX} y={1250} a={eout(P(t, 28, 28.4))} size={24} dark col={GR} />
      <Head t={t} t0={27.81} t1={T.qayn - .05} y={490} lines={[['gap omadda'], ['emas', 'y']]} size={72} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.qayn, 34.4), 1, 1.05)}>
      <Glow x={CX} y={980} r={500} a={.9} />
      <div style={{ ...abs(CX - 260, 820 + (1 - eout(P(t, T.qayn - .2, T.qayn + .4))) * 120) }}><Plov w={520} /></div>
      {[0, 1, 2].map((i) => <svg key={i} width="60" height="120" style={{ position: 'absolute', left: CX - 90 + i * 60, top: 700 - ((t * 40 + i * 30) % 60), opacity: .35 }}><path d="M30 110 C10 80 50 60 30 30 C20 15 35 5 30 0" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" /></svg>)}
      <Pill s="rad etilmaydi ✓" x={CX} y={1250} a={eout(P(t, T.osh, T.osh + .3))} size={32} col={GRN} />
      <Head t={t} t0={T.qayn - .25} t1={34.4} y={490} lines={[['qaynonaning'], ['oshidek', 'y']]} size={72} />
    </Layer>
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 34.33, 45.1, .12, .3);
  const aA = env(t, 34.33, 35.95, .1, .3), aB = env(t, 35.8, 45.1, .3, .3);
  const n4 = eout(P(t, T.p4 - .1, T.p4 + .3));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} col="63,169,184" />
      <Head t={t} t0={34.33} t1={35.95} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, 35.8, 45.1), 1, 1.04)}>
      <Glow x={CX} y={950} r={520} a={.9} col={t > T.p4 ? '61,220,132' : '63,169,184'} />
      <div style={{ position: 'absolute', left: CX, top: 880, translate: '-50% -50%', opacity: eout(P(t, 35.8, 36.3)) * (1 - eout(P(t, T.osgop - .3, T.osgop))), scale: String(lerp(.6, 1, eback(P(t, 35.8, 36.4)))) }}><Shield s={300} /></div>
      <PolicyCard x={SL + 60} y={680} w={SR - SL - 120} a={eout(P(t, T.osgop - .2, T.osgop + .3))} />
      <Num v="+4" y={930} a={n4} size={230} col={GRN} />
      <div style={{ ...abs(SL, 1160, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: WH, opacity: n4 }}>PRIORITET</div>
      <Pill s="har kuni" x={CX - 170} y={1290} a={eout(P(t, T.harkun, T.harkun + .3))} size={30} col={TEAL} />
      <Pill s="har buyurtmada" x={CX + 150} y={1290} a={eout(P(t, T.harbuy, T.harbuy + .3))} size={30} col={TEAL} />
      <Src s="+4 — Zero Taxi ma’lumoti; joriy qiymat Yandex Pro ilovasida" y={1370} a={n4} />
      <Head t={t} t0={35.8} t1={T.osgop - .1} y={490} lines={[['prioritet —'], ['bepul', 'g']]} size={72} />
      <Head t={t} t0={T.osgop - .1} t1={T.p4 - .15} y={490} lines={[['osgop', 'y'], ['polisi']]} size={72} />
      <Head t={t} t0={T.p4 - .15} t1={45.1} y={490} lines={[['+4', 'g'], ['prioritet']]} size={72} from="slam" />
    </Layer>
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 45.04, 50.9, .3, .3);
  return <Layer a={a} z={logZ(P(t, 45.04, 50.8), 1, 1.04)}>
    <Glow x={CX} y={950} r={520} a={.9} col="63,169,184" />
    <div style={{ ...abs(SL, 690, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 45.04, 45.5)), scale: String(lerp(.8, 1, eback(P(t, 45.04, 45.6)))) }}><Lockup h={130} /></div>
    <PolicyCard x={SL + 80} y={880} w={SR - SL - 160} a={eout(P(t, T.polisini - .2, T.polisini + .3))} />
    <Stamp s="BEPUL" x={CX + 250} y={900} t={t} t0={T.bepul2} t1={50.9} col={GRN} size={64} rot={8} />
    <Pill s="0 so‘m to‘lov" x={CX - 180} y={1260} a={eout(P(t, T.tolamay, T.tolamay + .3))} size={32} col={GRN} />
    <Pill s="navbat yo‘q" x={CX + 200} y={1260} a={eout(P(t, T.navbat, T.navbat + .3))} size={32} col={GRN} />
    <Head t={t} t0={45.04} t1={50.9} y={490} lines={[['zero taxi’da'], ['bepul', 'g']]} size={72} />
  </Layer>;
};

const Perk: React.FC<{ t: number; t0: number; t1: number; children: React.ReactNode }> = ({ t, t0, t1, children }) => {
  const a = env(t, t0, t1, .3, .25); if (a <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, opacity: a, translate: `${(1 - eout(P(t, t0, t0 + .4))) * 120}px 0` }}>{children}</div>;
};
const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 50.8, 62.2, .3, .3);
  const big = (s: string, c = Y, size = 200, y = 820) => <div style={{ ...abs(SL, y, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: size, lineHeight: 1, color: c, textShadow: `0 0 40px ${c}66` }}>{s}</div>;
  const mln = 1000000 * eio(P(t, T.turnir, T.mln + .5));
  const sec = Math.max(0, 5 - Math.floor(P(t, T.sek5, T.sek5 + 1.2) * 5));
  return <Layer a={a}>
    <Glow x={CX} y={980} r={520} a={.9} />
    <Perk t={t} t0={50.8} t1={T.balans}>
      <div style={{ ...abs(CX - 90, 680) }}><Trophy s={180} /></div>
      <Num v={fmt(mln)} y={900} a={1} size={150} />
      <div style={{ ...abs(SL, 1070, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: WH }}>SO‘M SOVRIN · HAR OY</div>
      <Pill s="park turniri" x={CX} y={1210} a={1} size={30} col={TEAL} />
      <Head t={t} t0={50.8} t1={T.balans} y={490} lines={[['bu hali'], ['hammasi emas', 'y']]} size={68} />
    </Perk>
    <Perk t={t} t0={T.balans} t1={T.yech}>
      {big('+10%', Y, 260, 700)}
      <Card x={SL + 90} y={1010} w={SR - SL - 180}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, padding: '24px 0', fontFamily: HEAD, fontWeight: 700, fontSize: 52 }}>
          <span style={{ color: WH }}>100 000</span><span style={{ color: GR }}>→</span><span style={{ color: GRN }}>+10 000</span>
        </div>
      </Card>
      <Src s="balansni to‘ldirganda parkdan bonus · so‘mda" y={1200} a={1} />
      <Head t={t} t0={T.balans} t1={T.yech} y={490} lines={[['balansga'], ['bonus', 'y']]} size={72} />
    </Perk>
    <Perk t={t} t0={T.yech} t1={59.9}>
      <div style={{ position: 'absolute', left: CX, top: 900, translate: '-50% -50%', width: 330, height: 330, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)' }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 170, lineHeight: 1, color: Y }}>{sec}</div><div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>soniya</div></div>
      </div>
      <Pill s="limitsiz" x={CX - 160} y={1170} a={eout(P(t, T.sek5 + .3, T.sek5 + .6))} size={32} col={GRN} />
      <Pill s="0% komissiya" x={CX + 160} y={1170} a={eout(P(t, T.komis, T.komis + .3))} size={32} col={GRN} />
      <Head t={t} t0={T.yech} t1={59.9} y={490} lines={[['pul yechish'], ['5 soniyada', 'y']]} size={72} />
    </Perk>
    <Perk t={t} t0={59.9} t1={62.2}>
      {big('24/7', Y, 280, 730)}
      <div style={{ ...abs(SL, 1040, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: WH }}>SIZ BILANMIZ</div>
      <Head t={t} t0={59.9} t1={62.2} y={490} lines={[['yolg‘iz'], ['qolmaysiz', 'y']]} size={72} />
    </Perk>
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 62.11, END + 1, .3, .1);
  const aA = env(t, 62.11, T.ulan, .3, .3);
  const fp = P(t, T.keyingi + .6, T.sizga - .2);
  const [ox, oy] = flight(fp, [CX, 800], [740, 1060], 120);
  const got = t > T.sizga - .25;
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={got ? 740 : CX} y={1050} r={480} a={.85} col={got ? '61,220,132' : '247,198,75'} />
      <TwoCars t={t} win={got ? 1 : -1} dimN={eout(P(t, T.sizga, T.sizga + .4))} />
      <OrderPin x={ox} y={oy} a={eout(P(t, T.keyingi, T.keyingi + .4))} s={got ? .8 : 1} />
      <Pill s="qo‘shni" x={270} y={1350} a={1} size={30} dark col={GR} />
      <Pill s="siz ✓" x={740} y={1350} a={eout(P(t, T.sizga, T.sizga + .3))} size={30} col={GRN} />
      <Head t={t} t0={62.11} t1={T.ulan} y={490} lines={[['keyingi buyurtma'], ['sizga', 'g']]} size={70} />
    </Layer>
    <ZtEnd t={t} t0={T.ulan} perks={['OSGOP bepul · +4 prioritet', 'Har oy 1 000 000 so‘m turnir', '+10% · 5 soniyada yechish', '24/7 yordam']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.ketdi, 8, 7], [T.prio, 10, 6], [T.tush2, 8, 7], [T.kelmay, 12, 6], [T.endi, 20, 5], [T.p4, 14, 6], [T.bepul2, 10, 6], [T.mln + .5, 10, 6], [T.sizga, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={270} y={1250} r={520} a={1} col="61,220,132" />
    <Road t={0} y={1180} speed={0} />
    <div style={{ ...abs(90, 1218) }}><Car w={360} id="kn" /></div>
    <div style={{ ...abs(560, 1218) }}><Car w={360} id="ky" col={TAXI} lights={.3} /></div>
    <OrderPin x={270} y={1130} a={1} s={.9} />
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>prioritet · osgop · +4</div>
    <div style={{ ...abs(SL, 490, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.04, ...yel }}>NEGA BUYURTMA<br />QO‘SHNIGA<br />KETADI?</div>
    <div style={{ ...abs(SL, 1490, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 62, lineHeight: 1.1, color: GRN }}>+4 PRIORITET —<br />BEPUL</div>
  </AbsoluteFill>;
};
