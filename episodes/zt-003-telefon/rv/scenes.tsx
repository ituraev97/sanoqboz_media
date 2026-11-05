import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Card, Src, Background, Reel, ZtEnd } from '../kit';
import { END, T } from './ep';

const KB = 'manba: Yandex Pro bilimlar bazasi — «Пассажир забыл вещи»';

/* ---------- art ---------- */
/* small lost phone lying flat (top view), glowing screen, optional vibration */
const LostPhone: React.FC<{ w: number; ring?: number; t?: number; rot?: number }> = ({ w, ring = 0, t = 0, rot = -14 }) => {
  const jig = ring > 0 ? Math.sin(t * 70) * 4 * ring : 0;
  return <div style={{ position: 'relative', width: w, height: w * 1.9, rotate: `${rot + jig * .6}deg`, translate: `${jig}px 0` }}>
    <div style={{ position: 'absolute', inset: 0, borderRadius: w * .16, background: 'linear-gradient(135deg,#5a6070,#1a1d24 60%,#4a505e)', boxShadow: `0 0 ${60 * (.4 + ring)}px rgba(247,198,75,${.35 + .4 * ring}), 0 14px 30px rgba(0,0,0,.6)` }} />
    <div style={{ position: 'absolute', inset: w * .05, borderRadius: w * .12, background: 'linear-gradient(180deg,#26405a,#0d1724)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: '30%', translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: w * .22, color: WH, opacity: .9 }}>14:20</div>
      {ring > 0 && <div style={{ position: 'absolute', left: '50%', bottom: '14%', translate: '-50% 0', width: w * .36, height: w * .36, borderRadius: '50%', background: GRN }} />}
    </div>
    {ring > 0 && [0, 1].map((i) => <div key={i} style={{ position: 'absolute', top: '30%', [i ? 'right' : 'left']: -w * .32, width: w * .2, height: w * .7, borderRadius: w, border: `${w * .04}px solid ${Y}`, borderLeftColor: i ? Y : 'transparent', borderRightColor: i ? 'transparent' : Y, borderTopColor: 'transparent', borderBottomColor: 'transparent', opacity: .5 + .5 * Math.sin(t * 20) }} />)}
  </div>;
};

/* car interior, top view. hl = highlight strengths for [rear seat, door pocket, floor mat] */
const CarTop: React.FC<{ w: number; hl?: [number, number, number]; phone?: number; t?: number }> = ({ w, hl = [0, 0, 0], phone = 1, t = 0 }) => {
  const h = w * 1.9;
  const ring = (k: number, x: number, y: number, rw: number, rh: number) => k <= 0 ? null :
    <rect x={x} y={y} width={rw} height={rh} rx="22" fill="none" stroke={Y} strokeWidth="9" opacity={k} strokeDasharray={k < 1 ? '30 14' : undefined} />;
  return <div style={{ position: 'relative', width: w, height: h }}>
    <svg width={w} height={h} viewBox="0 0 400 760" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="ctB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8b94a8" /><stop offset=".5" stopColor="#e8ecf4" /><stop offset="1" stopColor="#8b94a8" /></linearGradient>
        <linearGradient id="ctS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b4252" /><stop offset="1" stopColor="#262b36" /></linearGradient>
        <linearGradient id="ctG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fc4e8" /><stop offset="1" stopColor="#2a3a52" /></linearGradient>
      </defs>
      <ellipse cx="200" cy="740" rx="190" ry="20" fill="#000" opacity=".5" />
      <rect x="10" y="10" width="380" height="730" rx="120" fill="url(#ctB)" stroke="#2a2f3a" strokeWidth="4" />
      <path d="M60 170 Q200 120 340 170 L330 210 Q200 175 70 210 Z" fill="url(#ctG)" />
      <path d="M70 640 Q200 670 330 640 L325 610 Q200 635 75 610 Z" fill="url(#ctG)" opacity=".8" />
      <rect x="40" y="215" width="320" height="400" rx="40" fill="#151922" />
      {/* floor mats */}
      <rect x="70" y="330" width="110" height="70" rx="12" fill="#0b0d12" /><rect x="220" y="330" width="110" height="70" rx="12" fill="#0b0d12" />
      <rect x="70" y="455" width="110" height="60" rx="12" fill="#0b0d12" /><rect x="220" y="455" width="110" height="60" rx="12" fill="#0b0d12" />
      {/* front seats */}
      <rect x="70" y="235" width="110" height="90" rx="22" fill="url(#ctS)" /><rect x="220" y="235" width="110" height="90" rx="22" fill="url(#ctS)" />
      <rect x="85" y="300" width="80" height="22" rx="10" fill="#4a5264" /><rect x="235" y="300" width="80" height="22" rx="10" fill="#4a5264" />
      <circle cx="125" cy="262" r="30" fill="none" stroke="#5a6274" strokeWidth="8" />
      {/* rear bench */}
      <rect x="60" y="520" width="280" height="80" rx="24" fill="url(#ctS)" />
      <rect x="70" y="580" width="260" height="18" rx="9" fill="#4a5264" />
      {/* door pockets */}
      <rect x="44" y="440" width="18" height="90" rx="8" fill="#2c3240" /><rect x="338" y="440" width="18" height="90" rx="8" fill="#2c3240" />
      {ring(hl[0], 52, 510, 296, 100)}
      {ring(hl[1], 324, 425, 46, 120)}
      {ring(hl[2], 205, 445, 140, 82)}
    </svg>
    {phone > 0 && <div style={{ position: 'absolute', left: w * .62, top: h * .69, opacity: phone }}><LostPhone w={w * .11} t={t} rot={-24} /></div>}
  </div>;
};

const Bubble: React.FC<{ t: number; t0: number; me?: boolean; children: React.ReactNode; col?: string }> = ({ t, t0, me, children, col }) => {
  const a = eout(P(t, t0 - .15, t0 + .25)); if (a <= 0) return null;
  return <div style={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '86%', opacity: a, translate: `0 ${(1 - a) * 24}px`, padding: '12px 16px', borderRadius: 18, background: col ?? (me ? TEAL : '#232836'), color: WH, fontFamily: SANS, fontWeight: 700, fontSize: 21, lineHeight: 1.25 }}>{children}</div>;
};
const ChatHead: React.FC<{ s: string }> = ({ s }) =>
  <div style={{ padding: '62px 18px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
    <div style={{ width: 46, height: 46, borderRadius: '50%', background: TEAL, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 22, color: WH }}>?</div>
    <div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 22, color: WH }}>{s}</div><div style={{ fontFamily: MONO, fontSize: 14, color: GRN }}>onlayn</div></div>
  </div>;

const Person: React.FC<{ s: number; col?: string }> = ({ s, col = '#8a6d5a' }) =>
  <svg width={s} height={s * 1.2} viewBox="0 0 100 120"><circle cx="50" cy="32" r="22" fill={col} /><path d="M10 120c2-34 18-50 40-50s38 16 40 50z" fill="#4a5264" /><path d="M30 26c4-14 36-14 40 0" stroke="#2a2018" strokeWidth="10" fill="none" strokeLinecap="round" /></svg>;

/* incoming call screen (inside Phone) */
const CallScreen: React.FC<{ name: string; sub: string; t: number; ans: number; col?: string }> = ({ name, sub, t, ans, col = TEAL }) => {
  const pulse = 1 + .08 * Math.sin(t * 9) * (1 - ans);
  return <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#1b2a36,#0a0f16)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 110 }}>
    <div style={{ width: 120, height: 120, borderRadius: '50%', background: col, display: 'grid', placeItems: 'center', scale: String(pulse), boxShadow: `0 0 50px ${col}88` }}>
      <svg width="64" height="64" viewBox="0 0 64 64"><path d="M20 6c3 0 5 8 6 12 1 3-2 5-4 7 3 7 8 12 15 15 2-2 4-5 7-4 4 1 12 3 12 6 0 4-4 12-12 12C25 54 10 39 10 18 10 10 16 6 20 6z" fill="#fff" /></svg>
    </div>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, marginTop: 26, textAlign: 'center' }}>{name}</div>
    <div style={{ fontFamily: MONO, fontSize: 18, color: GR, marginTop: 6 }}>{ans > .5 ? '00:0' + Math.min(9, Math.floor(ans * 4)) : sub}</div>
    <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ width: 84, height: 84, borderRadius: '50%', background: RED, opacity: 1 - ans * .7 }} />
      <div style={{ width: 84, height: 84, borderRadius: '50%', background: GRN, scale: String(1 + .3 * ans), boxShadow: ans > 0 ? `0 0 ${40 * ans}px ${GRN}` : 'none' }} />
    </div>
  </div>;
};

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 4.95, .2, .3);
  const ph = eout(P(t, T.orqa, T.telefoni + .2));
  const gone = eio(P(t, 0, T.orqa + .4));
  return <Layer a={a} z={logZ(P(t, 0, 4.9), 1, 1.06)}>
    <Glow x={CX} y={1050} r={500} a={.8} col="63,169,184" />
    {/* rear bench side view */}
    <svg width={800} height={420} viewBox="0 0 800 420" style={{ position: 'absolute', left: CX - 400, top: 860 }}>
      <defs><linearGradient id="s1S" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b4252" /><stop offset="1" stopColor="#1e222c" /></linearGradient></defs>
      <rect x="40" y="0" width="720" height="250" rx="60" fill="url(#s1S)" />
      <rect x="60" y="20" width="220" height="210" rx="40" fill="#2f3542" /><rect x="290" y="20" width="220" height="210" rx="40" fill="#2f3542" /><rect x="520" y="20" width="220" height="210" rx="40" fill="#2f3542" />
      <rect x="20" y="240" width="760" height="130" rx="50" fill="url(#s1S)" />
      <rect x="40" y="250" width="720" height="30" rx="15" fill="#4a5264" opacity=".7" />
    </svg>
    <div style={{ position: 'absolute', left: 590, top: 1040 - (1 - ph) * 30, opacity: ph, scale: String(lerp(.6, 1, eback(ph))) }}><LostPhone w={130} t={t} rot={-70} /></div>
    {/* passenger leaving */}
    <div style={{ position: 'absolute', left: 140 - gone * 260, top: 720, opacity: 1 - gone }}><Person s={210} /></div>
    <Pill s="yo‘lovchi ketdi" x={300} y={820} a={env(t, T.ketdi - .2, T.telefoni, .3, .3)} size={28} dark col={GR} />
    <Pill s="telefon qoldi!" x={680} y={1340} a={eout(P(t, T.telefoni, T.telefoni + .3))} size={32} col={Y} />
    <Head t={t} t0={-1} t1={T.endi0 - .1} y={490} lines={[['yo‘lovchi'], ['telefonini unutdi', 'y']]} size={68} />
    <Head t={t} t0={T.endi0 - .1} t1={4.95} y={490} lines={[['endi nima'], ['qilasiz?', 'y']]} size={76} from="slam" />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 4.8, 14.9, .3, .3);
  const hl: [number, number, number] = [eout(P(t, T.orqa2 - .1, T.orqa2 + .3)), eout(P(t, T.eshik - .1, T.eshik + .3)), eout(P(t, T.gilam - .1, T.gilam + .3))];
  const timer = P(t, T.bir, T.bir + 2.4);
  const lab = (s: string, x: number, y: number, k: number) => <Pill s={s} x={x} y={y} a={k} size={26} dark col={Y} />;
  const cw = 340;
  return <Layer a={a} z={logZ(P(t, 4.8, 14.9), 1, 1.03)}>
    <Glow x={CX} y={1000} r={520} a={.8} col="63,169,184" />
    <div style={{ position: 'absolute', left: CX - cw / 2 - 90, top: 690 }}><CarTop w={cw} hl={hl} t={t} /></div>
    {lab('orqa o‘rindiq', 760, 1120, hl[0])}
    {lab('eshik cho‘ntagi', 760, 1000, hl[1])}
    {lab('gilamcha osti', 760, 1240, hl[2])}
    {/* one-minute timer */}
    <div style={{ position: 'absolute', left: 760, top: 790, translate: '-50% -50%', opacity: eout(P(t, T.bir - .2, T.bir + .2)), scale: String(lerp(.6, 1, eback(P(t, T.bir - .2, T.bir + .3)))) }}>
      <svg width="190" height="190" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="rgba(14,16,22,.92)" stroke="#2a3040" strokeWidth="8" />
        <circle cx="50" cy="50" r="42" fill="none" stroke={GRN} strokeWidth="8" strokeDasharray={`${263.9 * timer} 264`} transform="rotate(-90 50 50)" strokeLinecap="round" />
        <text x="50" y="50" textAnchor="middle" fontFamily="Osw" fontWeight="700" fontSize="30" fill={WH}>1</text>
        <text x="50" y="70" textAnchor="middle" fontFamily="JBM" fontSize="11" fill={GR}>daqiqa</text>
      </svg>
    </div>
    <Head t={t} t0={4.8} t1={T.orqa2 - .1} y={490} lines={[['1-qoida:'], ['salonga qarang', 'y']]} size={70} />
    <Head t={t} t0={T.orqa2 - .1} t1={T.bir - .1} y={490} lines={[['har safardan'], ['keyin', 'y']]} size={72} />
    <Head t={t} t0={T.bir - .1} t1={14.9} y={490} lines={[['bir daqiqa —'], ['narsa joyida', 'g']]} size={70} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 14.8, 25.4, .3, .3);
  const pw = 350;
  const reply = t >= T.ular - .2;
  const conn = eio(P(t, T.bogl - .2, T.bogl + .8));
  return <Layer a={a} z={logZ(P(t, 14.8, 25.4), 1, 1.03)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="63,169,184" />
    <div style={{ position: 'absolute', left: CX - pw / 2 - 60, top: 665, scale: String(lerp(.85, 1, eback(P(t, 14.8, 15.4)))) }}>
      <Phone w={pw} id="p3">
        <div style={{ position: 'absolute', inset: 0, background: '#0e1118' }}>
          <ChatHead s="Qo‘llab-quvvatlash" />
          <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Bubble t={t} t0={15.1} col="#2a3040"><span style={{ color: Y }}>Mashinada narsa qoldi</span></Bubble>
            <Bubble t={t} t0={T.nima + .2} me>Nima: qora telefon</Bubble>
            <Bubble t={t} t0={T.qaysi + .2} me>Buyurtma: Chilonzor → Yunusobod</Bubble>
            <Bubble t={t} t0={T.qachon + .2} me>Qachon: bugun, 14:20</Bubble>
            {reply && <Bubble t={t} t0={T.ular}>Rahmat! Yo‘lovchi bilan bog‘lanamiz va qaytarish yo‘lini aytamiz.</Bubble>}
          </div>
        </div>
      </Phone>
    </div>
    <Pill s="misol" x={820} y={720} a={eout(P(t, T.nima, T.nima + .3)) * (1 - conn)} size={20} dark col={GR} />
    {/* support -> passenger link */}
    <div style={{ position: 'absolute', left: 820, top: 820, translate: '-50% 0', opacity: conn, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <Person s={110} col="#c49a7a" />
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: WH }}>yo‘lovchi</div>
      <div style={{ width: 6, height: 140 * conn, background: `linear-gradient(180deg, ${GRN}, ${TEAL})`, borderRadius: 3 }} />
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 40, color: GRN }}>✓</div>
    </div>
    <Src s={KB} y={1395} a={eout(P(t, T.qollab, T.qollab + .4))} />
    <Head t={t} t0={14.8} t1={T.nima - .1} y={490} lines={[['ilova orqali'], ['yozing', 'y']]} size={74} />
    <Head t={t} t0={T.nima - .1} t1={T.ular - .1} y={490} lines={[['nima · qaysi buyurtma'], ['· qachon', 'y']]} size={60} />
    <Head t={t} t0={T.ular - .1} t1={25.4} y={490} lines={[['yo‘lovchi bilan'], ['bog‘lanadi', 'g']]} size={68} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 25.2, 35.95, .3, .2);
  const aA = env(t, 25.2, T.begona, .3, .3), aB = env(t, T.begona - .2, T.telefon, .3, .3), aC = env(t, T.telefon - .2, 35.95, .3, .2);
  const lock = eout(P(t, T.saqlang - .2, T.saqlang + .3));
  const ring = env(t, T.telefon, 35.9, .2, .2);
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 25.2, T.begona), 1, 1.04)}>
      <Glow x={CX} y={1010} r={500} a={.85} col="61,220,132" />
      {/* safe box */}
      <div style={{ position: 'absolute', left: CX - 230, top: 760, width: 460, height: 420, borderRadius: 40, background: 'linear-gradient(160deg,#3b4252,#1a1e27)', border: '4px solid #4a5264', boxShadow: '0 30px 60px rgba(0,0,0,.6)' }}>
        <div style={{ position: 'absolute', inset: 34, borderRadius: 26, background: '#0e1118', display: 'grid', placeItems: 'center' }}>
          <LostPhone w={110} t={t} rot={-8} />
        </div>
      </div>
      <div style={{ position: 'absolute', left: CX + 150, top: 700, opacity: lock, scale: String(lerp(1.6, 1, lock)) }}>
        <svg width="150" height="170" viewBox="0 0 64 72"><path d="M16 30V20a16 16 0 0 1 32 0v10" stroke={GRN} strokeWidth="8" fill="none" /><rect x="6" y="30" width="52" height="40" rx="8" fill={GRN} /><circle cx="32" cy="48" r="6" fill="#0e1118" /></svg>
      </div>
      <Head t={t} t0={25.2} t1={T.begona} y={490} lines={[['qaytguncha —'], ['ehtiyot saqlang', 'g']]} size={68} />
    </Layer>
    <Layer a={aB} z={logZ(P(t, T.begona, T.telefon), 1, 1.04)}>
      <Glow x={CX} y={1010} r={500} a={.85} col="236,58,44" />
      <div style={{ position: 'absolute', left: 170, top: 900 }}><Person s={260} col="#9a7a62" /></div>
      <div style={{ position: 'absolute', left: 440, top: 800, opacity: eout(P(t, T.men - .2, T.men + .2)), padding: '22px 28px', borderRadius: '28px 28px 28px 6px', background: WH, color: '#111', fontFamily: SANS, fontWeight: 800, fontSize: 34, maxWidth: 440 }}>«Men egasining akasiman»</div>
      <Stamp s="BERMANG" x={640} y={1180} t={t} t0={T.akas + .3} t1={T.telefon + .2} size={70} rot={-8} />
      <Head t={t} t0={T.begona - .2} t1={T.telefon} y={490} lines={[['begona odamga —'], ['bermang', 'r']]} size={70} />
    </Layer>
    <Layer a={aC} z={logZ(P(t, T.telefon, 35.9), 1, 1.05)}>
      <Glow x={CX} y={1010} r={520} a={.6 + .4 * ring} />
      <div style={{ position: 'absolute', left: CX - 170, top: 680 }}>
        <Phone w={340} id="p4">
          <CallScreen t={t} ans={0} name={t < T.xuddi ? 'Noma’lum raqam' : 'Qaynona'} sub="qo‘ng‘iroq qilmoqda…" col={t < T.xuddi ? TEAL : Y} />
        </Phone>
      </div>
      {[0, 1, 2].map((i) => { const k = ((t * 1.6 + i / 3) % 1); return <div key={i} style={{ position: 'absolute', left: CX - 170 * (1 + k * .5) - 10, top: 1027 - 347 * (1 + k * .5), width: 340 * (1 + k * .5) + 20, height: 694 * (1 + k * .5), borderRadius: 60, border: `4px solid ${Y}`, opacity: (1 - k) * .4 * ring, translate: `${170 * (1 + k * .5) * 0 }px 0` }} />; })}
      <Head t={t} t0={T.telefon - .2} t1={T.xuddi - .1} y={490} lines={[['telefon esa'], ['jiringlayveradi', 'y']]} size={68} />
      <Head t={t} t0={T.xuddi - .1} t1={35.95} y={490} lines={[['xuddi to‘y oldidan'], ['qaynonadek', 'y']]} size={66} />
    </Layer>
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 35.8, 50.25, .12, .3);
  const aA = env(t, 35.8, 37.55, .1, .3);
  const aB = env(t, 37.4, T.qayta, .3, .3);
  const aC = env(t, T.qayta - .1, T.ochish, .3, .3);
  const aD = env(t, T.ochish - .1, 50.25, .3, .3);
  const ans = eout(P(t, T.korang - .1, T.korang + .4));
  const opened = eout(P(t, T.topdim + .5, T.topdim + 1.1));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} col="63,169,184" />
      <Head t={t} t0={35.8} t1={37.55} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB} z={logZ(P(t, 37.4, T.qayta), 1, 1.04)}>
      <Glow x={CX} y={1010} r={520} a={.9} col={ans > .5 ? '61,220,132' : '63,169,184'} />
      <div style={{ position: 'absolute', left: CX - 160, top: 670 }}>
        <Phone w={320} id="p5"><CallScreen t={t} ans={ans} name="Qo‘llab-quvvatlash" sub="qo‘ng‘iroq qilmoqda…" /></Phone>
      </div>
      <Pill s="ALBATTA KO‘TARING ✓" x={CX} y={1385} a={ans} size={34} col={GRN} />
      <Head t={t} t0={37.4} t1={T.albatta - .1} y={490} lines={[['sizga o‘zi'], ['qo‘ng‘iroq qilishi mumkin', 'y']]} size={58} />
      <Head t={t} t0={T.albatta - .1} t1={T.qayta} y={490} lines={[['albatta'], ['ko‘taring', 'g']]} size={76} from="slam" />
    </Layer>
    <Layer a={aC} z={logZ(P(t, T.qayta, T.ochish), 1, 1.03)}>
      <Glow x={CX} y={1000} r={520} a={.9} col="236,58,44" />
      <Card x={SL + 70} y={700} w={SR - SL - 140}>
        <div style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[0, 1, 2].map((i) => { const k = eout(P(t, T.qayta + i * .35, T.qayta + .3 + i * .35));
            return <div key={i} style={{ opacity: k, translate: `${(1 - k) * 60}px 0`, display: 'flex', alignItems: 'center', gap: 18, fontFamily: SANS, fontWeight: 800, fontSize: 30, color: RED }}>
              <svg width="40" height="40" viewBox="0 0 64 64"><path d="M14 14l36 36M50 14 14 50" stroke={RED} strokeWidth="9" strokeLinecap="round" /></svg>
              <span>Javobsiz qo‘ng‘iroq</span><span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 22, color: GR }}>{['10:02', '12:40', '16:15'][i]}</span>
            </div>; })}
        </div>
      </Card>
      <div style={{ position: 'absolute', left: CX, top: 1090, translate: '-50% 0', opacity: eout(P(t, T.buyurt - .2, T.buyurt + .2)) }}>
        <svg width="150" height="170" viewBox="0 0 64 72"><path d="M16 30V20a16 16 0 0 1 32 0v10" stroke={RED} strokeWidth="8" fill="none" /><rect x="6" y="30" width="52" height="40" rx="8" fill={RED} /><circle cx="32" cy="48" r="6" fill="#0e1118" /></svg>
      </div>
      <Stamp s="BUYURTMALAR TO‘XTAYDI" y={1310} t={t} t0={T.toxtat} t1={T.ochish} size={52} />
      <Src s={KB} y={1395} a={eout(P(t, T.qayta, T.qayta + .4))} />
      <Head t={t} t0={T.qayta - .1} t1={T.ochish} y={490} lines={[['qayta-qayta'], ['javob bermasangiz', 'r']]} size={66} />
    </Layer>
    <Layer a={aD} z={logZ(P(t, T.ochish, 50.2), 1, 1.03)}>
      <Glow x={CX} y={1000} r={520} a={.9} col={opened > .5 ? '61,220,132' : '63,169,184'} />
      <div style={{ position: 'absolute', left: CX - 215, top: 665 }}>
        <Phone w={350} id="p5b">
          <div style={{ position: 'absolute', inset: 0, background: '#0e1118' }}>
            <ChatHead s="Qo‘llab-quvvatlash" />
            <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Bubble t={t} t0={T.yozib}>Narsani topdingizmi?</Bubble>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, opacity: eout(P(t, T.topdim - .3, T.topdim)) }}>
                <div style={{ flex: 1, padding: '14px 0', textAlign: 'center', borderRadius: 16, background: GRN, color: '#06210f', fontFamily: SANS, fontWeight: 800, fontSize: 24, scale: String(1 + .08 * eout(P(t, T.topdim + .3, T.topdim + .5))) }}>Topdim</div>
                <div style={{ flex: 1, padding: '14px 0', textAlign: 'center', borderRadius: 16, background: '#2a3040', color: WH, fontFamily: SANS, fontWeight: 800, fontSize: 24 }}>Topmadim</div>
              </div>
              <Bubble t={t} t0={T.topdim + .9} me>Topdim</Bubble>
            </div>
          </div>
        </Phone>
      </div>
      <div style={{ position: 'absolute', left: 820, top: 900, translate: '-50% 0', opacity: eout(P(t, T.ochish, T.ochish + .3)) }}>
        <svg width="130" height="150" viewBox="0 0 64 72"><path d={opened > .5 ? 'M16 30V20a16 16 0 0 1 31-5' : 'M16 30V20a16 16 0 0 1 32 0v10'} stroke={opened > .5 ? GRN : RED} strokeWidth="8" fill="none" /><rect x="6" y="30" width="52" height="40" rx="8" fill={opened > .5 ? GRN : RED} /><circle cx="32" cy="48" r="6" fill="#0e1118" /></svg>
      </div>
      <Src s={KB} y={1395} a={1} />
      <Head t={t} t0={T.ochish - .1} t1={50.25} y={490} lines={[['ochish uchun —'], ['topdingizmi, ayting', 'y']]} size={62} />
    </Layer>
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 50.12, 53.0, .3, .3);
  const fly = eio(P(t, T.park - .5, T.park + .4));
  return <Layer a={a} z={logZ(P(t, 50.12, 53), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="63,169,184" />
    {/* park building */}
    <svg width="500" height="452" viewBox="0 0 420 380" style={{ position: 'absolute', left: CX - 60, top: 760 }}>
      <rect x="20" y="90" width="380" height="270" rx="16" fill="#1e2430" stroke={TEAL} strokeWidth="5" />
      <rect x="60" y="40" width="300" height="70" rx="14" fill={TEAL} />
      <text x="210" y="88" textAnchor="middle" fontFamily="Osw" fontWeight="700" fontSize="44" fill="#fff">PARK</text>
      {[0, 1, 2].map((i) => <rect key={i} x={60 + i * 110} y="140" width="80" height="70" rx="8" fill="#9fc4e8" opacity=".5" />)}
      <rect x="160" y="250" width="100" height="110" rx="8" fill="#0e1118" />
    </svg>
    <div style={{ position: 'absolute', left: lerp(170, 680, fly), top: lerp(1000, 1080, fly) - Math.sin(fly * Math.PI) * 160, translate: '-50% -50%', scale: String(lerp(1, .55, fly)), opacity: 1 - eout(P(t, T.park + .3, T.park + .6)) }}>
      <div style={{ width: 150, height: 120, borderRadius: 18, background: 'linear-gradient(160deg,#c9a46a,#8a6a3a)', display: 'grid', placeItems: 'center' }}><LostPhone w={50} rot={0} /></div>
    </div>
    <Pill s="✓ topshirildi" x={710} y={1250} a={eout(P(t, T.park + .4, T.park + .7))} size={30} col={GRN} />
    <Src s={KB} y={1395} a={1} />
    <Head t={t} t0={50.12} t1={53} y={490} lines={[['saqlay olmasangiz —'], ['parkka topshiring', 'y']]} size={62} />
  </Layer>;
};

const Perk: React.FC<{ t: number; t0: number; t1: number; children: React.ReactNode }> = ({ t, t0, t1, children }) => {
  const a = env(t, t0, t1, .3, .25); if (a <= 0) return null;
  return <div style={{ position: 'absolute', inset: 0, opacity: a, translate: `${(1 - eout(P(t, t0, t0 + .4))) * 120}px 0` }}>{children}</div>;
};
const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 52.85, 64.1, .3, .3);
  const sec = Math.max(0, 5 - Math.floor(P(t, T.sek5, T.sek5 + 1.2) * 5));
  return <Layer a={a}>
    <Glow x={CX} y={1000} r={520} a={.9} col="63,169,184" />
    <div style={{ ...abs(SL, 690, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 52.85, 53.3)), scale: String(lerp(.8, 1, eback(P(t, 52.85, 53.4)))) }}><Lockup h={110} /></div>
    <Perk t={t} t0={52.85} t1={T.ustiga + .1}>
      <div style={{ ...abs(SL, 880, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 260, lineHeight: 1, ...yel }}>24/7</div>
      <Pill s="bunday paytda — darrov yordam" x={CX} y={1230} a={eout(P(t, T.s24 + 1.8, T.s24 + 2.1))} size={32} col={TEAL} />
      <Head t={t} t0={52.85} t1={T.ustiga + .1} y={490} lines={[['zero taxi’da'], ['doim aloqada', 'y']]} size={70} />
    </Perk>
    <Perk t={t} t0={T.ustiga} t1={T.balans}>
      <div style={{ position: 'absolute', left: CX, top: 1040, translate: '-50% -50%', width: 300, height: 300, borderRadius: '50%', border: `14px solid ${TEAL}`, display: 'grid', placeItems: 'center', background: 'rgba(14,16,22,.9)' }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 160, lineHeight: 1, color: Y }}>{sec}</div><div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>soniya</div></div>
      </div>
      <Pill s="0% komissiya" x={CX} y={1270} a={eout(P(t, T.komis, T.komis + .3))} size={32} col={GRN} />
      <Head t={t} t0={T.ustiga} t1={T.balans} y={490} lines={[['pul yechish'], ['5 soniyada', 'y']]} size={72} />
    </Perk>
    <Perk t={t} t0={T.balans} t1={64.1}>
      <div style={{ ...abs(SL, 860, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 220, lineHeight: 1, ...yel }}>+10%</div>
      <Card x={SL + 90} y={1110} w={SR - SL - 180}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, padding: '22px 0', fontFamily: HEAD, fontWeight: 700, fontSize: 50 }}>
          <span style={{ color: WH }}>100 000</span><span style={{ color: GR }}>→</span><span style={{ color: GRN }}>+10 000</span>
        </div>
      </Card>
      <Src s="balansni to‘ldirganda parkdan bonus · so‘mda" y={1290} a={1} />
      <Head t={t} t0={T.balans} t1={64.1} y={490} lines={[['balansga'], ['bonus', 'y']]} size={72} />
    </Perk>
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 63.9, END + 1, .3, .1);
  const aA = env(t, 63.9, T.ulan, .3, .3);
  const st = eout(P(t, T.nomi - .2, T.nomi + .4));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 63.9, T.ulan), 1, 1.05)}>
      <Glow x={CX} y={1000} r={540} a={.9} col="61,220,132" />
      <div style={{ position: 'absolute', left: CX, top: 1000, translate: '-50% -50%', scale: String(lerp(.5, 1, eback(eout(P(t, 63.9, 64.5))))) }}>
        <svg width="420" height="480" viewBox="0 0 100 114">
          <path d="M50 4 92 18v34c0 30-20 50-42 58C28 102 8 82 8 52V18z" fill="#17603a" stroke={GRN} strokeWidth="5" />
          <path d="M30 56l14 14 26-28" stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={st} />
        </svg>
      </div>
      <Head t={t} t0={63.9} t1={T.ulan} y={490} lines={[['halol haydovchi —'], ['halol nom', 'g']]} size={66} />
    </Layer>
    <ZtEnd t={t} t0={T.ulan} perks={['24/7 yordam', '5 soniyada yechish · 0% komissiya', '+10% balansga bonus', 'OSGOP bepul · +4 prioritet']} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.telefoni, 8, 7], [T.endi0, 10, 7], [T.akas + .3, 12, 6], [T.endi, 20, 5], [T.korang, 8, 7], [T.toxtat, 14, 6], [T.park + .4, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8]} hits={HITS} />;

export const Cover: React.FC = () => {
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1130} r={560} a={1} col="247,198,75" />
    <div style={{ position: 'absolute', left: CX - 110, top: 920 }}><LostPhone w={220} t={0.4} ring={1} rot={-12} /></div>
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={96} /></div>
    <div style={{ ...abs(SL, 430, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 32, color: GR }}>salon · qo‘llab-quvvatlash · park</div>
    <div style={{ ...abs(SL, 500, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.04, ...yel }}>TELEFON<br />QOLDI —<br />NIMA QILASIZ?</div>
    <div style={{ ...abs(SL, 1400, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 62, lineHeight: 1.1, color: GRN }}>3 QADAM —<br />HALOL YO‘L</div>
  </AbsoluteFill>;
};
