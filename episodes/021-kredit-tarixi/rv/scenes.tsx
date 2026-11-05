import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, YL, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, rnd, clamp } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, flight, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* generic bank building (columns, no logo) */
const Bank: React.FC<{ w: number; id: string; label?: string }> = ({ w, id, label = 'BANK' }) => (
  <svg width={w} height={w * .82} viewBox="0 0 300 246" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`bk${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9edf5" /><stop offset="1" stopColor="#9aa3b5" /></linearGradient></defs>
    <path d="M10 80 L 150 10 L 290 80 Z" fill={`url(#bk${id})`} stroke="#4a5266" strokeWidth="4" />
    <rect x="22" y="80" width="256" height="18" fill="#c7cedb" stroke="#4a5266" strokeWidth="3" />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={38 + i * 50} y={102} width={24} height={110} rx="4" fill={`url(#bk${id})`} stroke="#4a5266" strokeWidth="3" />)}
    <rect x="12" y="214" width="276" height="24" rx="4" fill="#c7cedb" stroke="#4a5266" strokeWidth="3" />
    <text x="150" y="66" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight={700} fontSize="26" fill="#2a3040">{label}</text>
  </svg>
);
/* score gauge 1..500, five bands */
const BANDS: [string, string][] = [['#EC3A2C', 'yomon'], ['#F2843A', 'qoniqarli'], ['#FFCF3A', 'o‘rtacha'], ['#9BE37A', 'yaxshi'], ['#3DDC84', 'a’lo']];
const Score: React.FC<{ w: number; v: number; hi: number }> = ({ w, v, hi }) => {
  const a0 = -200, a1 = 20, ang = (x: number) => (a0 + (a1 - a0) * x) * Math.PI / 180;
  const arc = (x0: number, x1: number, r: number) => { const p = (x: number) => [150 + r * Math.cos(ang(x)), 150 + r * Math.sin(ang(x))]; const [sx, sy] = p(x0), [ex, ey] = p(x1); return `M${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`; };
  const na = ang(clamp(v / 500));
  return <svg width={w} height={w * .78} viewBox="0 0 300 234" style={{ display: 'block', overflow: 'visible' }}>
    {BANDS.map(([c], i) => <path key={i} d={arc(i / 5 + .006, (i + 1) / 5 - .006, 118)} stroke={c} strokeWidth={hi === i ? 40 : 28} fill="none" opacity={hi < 0 || hi === i ? 1 : .35} />)}
    <line x1="150" y1="150" x2={150 + 96 * Math.cos(na)} y2={150 + 96 * Math.sin(na)} stroke="#F3F5F8" strokeWidth="7" strokeLinecap="round" />
    <circle cx="150" cy="150" r="14" fill="#F3F5F8" />
    <text x={150 + 140 * Math.cos(ang(0))} y={150 + 140 * Math.sin(ang(0)) + 26} textAnchor="middle" fontFamily="JBM, monospace" fontSize="18" fill="#7F8792">1</text>
    <text x={150 + 140 * Math.cos(ang(1))} y={150 + 140 * Math.sin(ang(1)) + 26} textAnchor="middle" fontFamily="JBM, monospace" fontSize="18" fill="#7F8792">500</text>
  </svg>;
};
/* generic document card */
const Doc: React.FC<{ title: string; sub: string; col: string; w?: number }> = ({ title, sub, col, w = 300 }) =>
  <div style={{ width: w, borderRadius: 18, background: 'linear-gradient(180deg,#f3f5f8,#cfd5e1)', padding: '18px 20px', boxShadow: '0 16px 40px rgba(0,0,0,.6)', borderTop: `10px solid ${col}` }}>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: '#141822' }}>{title}</div>
    <div style={{ fontFamily: MONO, fontSize: 18, color: '#4a5266', marginTop: 4 }}>{sub}</div>
    {[0, 1].map((i) => <div key={i} style={{ height: 8, borderRadius: 4, background: '#aab2c2', marginTop: 10, width: `${86 - i * 24}%` }} />)}
  </div>;
/* hooded figure silhouette (generic, no face) */
const Hood: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * 1.1} viewBox="0 0 200 220" style={{ display: 'block', overflow: 'visible' }}>
    <path d="M100 10 C 50 10 30 60 34 100 C 36 120 30 140 20 150 L 180 150 C 170 140 164 120 166 100 C 170 60 150 10 100 10 Z" fill="#2a2f3b" stroke="#EC3A2C" strokeWidth="3" />
    <ellipse cx="100" cy="98" rx="40" ry="46" fill="#07080c" />
    <rect x="72" y="88" width="56" height="12" rx="6" fill="#EC3A2C" opacity=".85" />
    <path d="M10 220 C 20 160 60 146 100 146 C 140 146 180 160 190 220 Z" fill="#2a2f3b" stroke="#EC3A2C" strokeWidth="3" />
  </svg>
);
const Lock: React.FC<{ w: number; t: number }> = ({ w, t }) => (
  <svg width={w} height={w * 1.2} viewBox="0 0 200 240" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="lkG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d6f3ff" /><stop offset="1" stopColor="#5aa7d6" /></linearGradient></defs>
    <path d="M50 110 L 50 70 C 50 20 150 20 150 70 L 150 110" stroke="#c7cedb" strokeWidth="22" fill="none" />
    <rect x="20" y="104" width="160" height="126" rx="22" fill="url(#lkG)" stroke="#2c5f86" strokeWidth="4" />
    <circle cx="100" cy="158" r="16" fill="#0b2a40" /><rect x="94" y="164" width="12" height="34" rx="4" fill="#0b2a40" />
    {[0, 1, 2, 3, 4, 5].map((i) => { const a = i / 6 * Math.PI * 2 + t * .4; return <text key={i} x={100 + 125 * Math.cos(a)} y={140 + 125 * Math.sin(a)} textAnchor="middle" fontSize="34" fill="#9BE3FF" opacity=".8">❄</text>; })}
  </svg>
);
const Chip: React.FC<{ s: string; y: number; a: number }> = ({ s, y, a }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: CX, top: y, translate: '-50% 0', opacity: a, padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 24, color: WH, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.9, .2, .3);
  const ha = env(t, T.ha - .1, T.yoq - .05, .15, .15), yq = env(t, T.yoq - .1, 5.9, .15, .3);
  return <Layer a={a} z={logZ(P(t, -1, 5.9), 1, 1.06)}>
    <Glow x={CX} y={980} r={520} a={.9} />
    <div style={{ ...abs(CX - 200, 720) }}><Bank w={400} id="b1" /></div>
    <Stamp s="HA ✓" y={1150} t={t} t0={T.ha} t1={T.yoq - .05} col={GRN} size={72} rot={-5} />
    <Stamp s="YO‘Q ✕" y={1150} t={t} t0={T.yoq} t1={5.9} col={RED} size={72} rot={5} />
    <Pill s="sizni birinchi marta ko‘ryapti" x={CX} y={1300} a={eout(P(t, T.korya - .2, T.korya + .3)) * (1 - ha * 0) } size={26} dark />
    <Head t={t} t0={-1} t1={T.qanday - .1} y={490} lines={[['bank darhol'], ['«ha» yoki «yo‘q»', 'y']]} size={66} />
    <Head t={t} t0={T.qanday - .1} t1={5.9} y={490} lines={[['qanday'], ['biladi?', 'y']]} size={80} from="slam" />
    {yq < 0 && <div />}
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.8, 14.8, .3, .3);
  const items: [number, string, string, string][] = [[T.kredit, 'kredit', 'shartnoma · summa', BLUE], [T.ariza, 'ariza', 'qabul / rad', Y], [T.kechik, 'kechikkan to‘lov', '−3 kun', RED]];
  const fly = P(t, T.bank2 - .2, T.byuro + .4);
  return <Layer a={a} z={logZ(P(t, 5.8, 14.8), 1, 1.04)}>
    <Glow x={CX} y={980} r={540} a={.85} col="91,140,255" />
    <div style={{ ...abs(SL + 10, 1020) }}><Bank w={230} id="b2" /></div>
    <Card x={SR - 330} y={1020} w={320} a={eout(P(t, T.bank2 - .3, T.bank2 + .2))}>
      <div style={{ padding: '22px 22px', textAlign: 'center' }}>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 36, color: WH, lineHeight: 1.05 }}>KREDIT<br />BYUROSI</div>
        <div style={{ fontFamily: MONO, fontSize: 20, color: GR, marginTop: 8 }}>sizning tarixingiz</div>
        <div style={{ height: 10, borderRadius: 5, background: '#1d2230', marginTop: 14 }}><div style={{ height: '100%', width: `${eio(fly) * 100}%`, borderRadius: 5, background: BLUE }} /></div>
      </div>
    </Card>
    {items.map(([t0, ti, sub, col], i) => {
      const ap = eback(P(t, t0 - .2, t0 + .3)); if (ap <= 0) return null;
      const p = clamp(fly * 1.4 - i * .2);
      const [x, y] = flight(p, [CX, 800 + i * 110], [SR - 170, 1100], 120);
      return <div key={i} style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', scale: String(lerp(ap, .35, eio(p))), opacity: 1 - P(p, .85, 1), rotate: `${(i - 1) * 3}deg` }}><Doc title={ti} sub={sub} col={col} w={330} /></div>;
    })}
    <Pill s="keyingi ish kuni" x={CX} y={1330} a={eout(P(t, T.keyingi - .1, T.keyingi + .3))} size={30} />
    <Src s="«Kredit axboroti almashinuvi to‘g‘risida»gi qonun · depozit.uz" y={1390} a={eout(P(t, T.qonun, T.qonun + .4))} />
    <Head t={t} t0={5.8} t1={T.bank2 - .1} y={490} lines={[['hammasi'], ['yoziladi', 'y']]} size={76} from="slam" />
    <Head t={t} t0={T.bank2 - .1} t1={14.8} y={490} lines={[['bank —'], ['byuroga yuboradi', 'y']]} size={60} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 14.7, 23.1, .3, .3);
  const sweep = eio(P(t, T.n500 - .1, T.n500 + 1));
  const v = t < T.n400 - .2 ? 500 * sweep : t < T.n100 - .2 ? lerp(500, 450, eio(P(t, T.n400 - .2, T.n400 + .4))) : t < T.bank3 ? lerp(450, 60, eio(P(t, T.n100 - .2, T.n100 + .5))) : lerp(60, 260, eio(P(t, T.bank3, T.qaror + .3)));
  const hi = t < T.n400 - .2 ? -1 : t < T.n100 - .2 ? 4 : t < T.bank3 ? 0 : -1;
  const lab = hi === 4 ? '401–500 · A’LO' : hi === 0 ? '1–100 · YOMON' : '';
  return <Layer a={a} z={logZ(P(t, 14.7, 23.1), 1, 1.04)}>
    <Glow x={CX} y={930} r={520} a={.85} col={hi === 0 ? '236,58,44' : hi === 4 ? '61,220,132' : '246,185,59'} />
    <div style={{ ...abs(CX - 260, 660) }}><Score w={520} v={v} hi={hi} /></div>
    <Num v={fmt(v)} y={880} a={eout(P(t, T.n500 - .3, T.n500))} size={110} col={hi === 0 ? RED : hi === 4 ? GRN : Y} />
    <Pill s={lab || 'ball'} x={CX} y={1120} a={eout(P(t, T.n500, T.n500 + .3))} size={34} col={hi === 0 ? RED : hi === 4 ? GRN : Y} />
    <Stamp s="QAROR" y={1240} t={t} t0={T.qaror} t1={23.1} col={WH} size={54} rot={-5} />
    <Src s="KATM shkalasi 1–500 · kursiv.media, 19.08.2025" y={1350} a={eout(P(t, T.n500 + .3, T.n500 + .7))} />
    <Head t={t} t0={14.7} t1={23.1} y={490} lines={[['1 dan 500 gacha'], ['ball', 'y']]} size={72} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 23.0, 31.3, .3, .3);
  const yrs = eio(P(t, T.y5 - .2, T.saqlan + .6));
  return <Layer a={a} z={logZ(P(t, 23, 31.2), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.85} />
    <Card x={SL + 20} y={700} w={SR - SL - 40} a={eout(P(t, T.hamma - .3, T.hamma + .2))}>
      <div style={{ padding: '26px 30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 22, color: GR }}><span>qarz yopildi ✓</span><span>tarix yangilanadi</span></div>
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ flex: 1, height: 64, borderRadius: 12, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 32, background: yrs * 5 > i + .5 ? Y : '#1d2230', color: yrs * 5 > i + .5 ? '#1A1306' : GR }}>{i + 1}</div>)}</div>
        <div style={{ textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: Y, marginTop: 16 }}>5 YIL SAQLANADI</div>
      </div>
    </Card>
    <Pill s="qaynonaning xotirasi" x={CX - 180} y={1090} a={env(t, T.qaynona, T.hamma, .2, .3)} size={28} dark col={GR} />
    <Pill s="kredit tarixi" x={CX + 200} y={1090} a={env(t, T.qaynona + .3, T.hamma, .2, .3)} size={28} />
    <div style={{ ...abs(CX - 30, 1060), fontFamily: HEAD, fontWeight: 700, fontSize: 60, color: Y, opacity: env(t, T.qaynona + .2, T.hamma, .2, .3) }}>&lt;</div>
    <Stamp s="UNUTMAYDI" y={1180} t={t} t0={T.unutmay} t1={31.3} col={RED} size={60} rot={-6} />
    <Src s="majburiyatlar yopilgach 5 yil · qonun · depozit.uz" y={1320} a={eout(P(t, T.saqlan, T.saqlan + .4))} />
    <Head t={t} t0={23.0} t1={T.hamma - .1} y={490} lines={[['qaynona xotirasidan'], ['ham kuchli', 'y']]} size={62} />
    <Head t={t} t0={T.hamma - .1} t1={31.3} y={490} lines={[['qarz yopilgach'], ['yana 5 yil', 'y']]} size={66} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 31.1, 32.85, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={31.1} t1={32.85} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 32.7, 39.2, .3, .3);
  const d = eout(P(t, T.nom - .2, T.nom + .4)), grab = eio(P(t, T.qarz - .1, T.qarz + .5));
  const sh = eback(P(t, T.ikki - .2, T.ikki + .4));
  return <Layer a={a} z={logZ(P(t, 32.7, 39.2), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.85} col="236,58,44" />
    <div style={{ ...abs(CX - 330, 720), opacity: eout(P(t, T.firib - .3, T.firib + .2)) }}><Hood w={260} /></div>
    <div style={{ position: 'absolute', left: lerp(CX + 190, CX - 90, grab), top: lerp(800, 900, grab), translate: '-50% 0', opacity: d, rotate: `${lerp(4, -8, grab)}deg` }}><Doc title="KREDIT SHARTNOMASI" sub="qarzdor: SIZ" col={RED} w={340} /></div>
    <Pill s="sizning nomingizga" x={CX + 190} y={1110} a={env(t, T.nom, T.ikki - .1, .2, .3)} size={28} col={RED} dark />
    {sh > 0 && [0, 1].map((i) => <div key={i} style={{ position: 'absolute', left: CX + (i ? 160 : -160), top: 1230, translate: '-50% -50%', scale: String(clamp(sh)), width: 220, padding: '16px 0', borderRadius: 22, background: i ? 'rgba(91,140,255,.95)' : 'rgba(155,227,255,.95)', textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: '#0b0d12' }}>{i ? '2 · TAQIQ' : '1 · MUZLATISH'}</div>)}
    <Head t={t} t0={32.7} t1={T.ikki - .1} y={490} lines={[['firibgar'], ['sizning nomingizga', 'r']]} size={62} />
    <Head t={t} t0={T.ikki - .1} t1={39.2} y={490} lines={[['ikki'], ['himoya', 'g']]} size={80} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 39.1, 46.45, .3, .3);
  const fr = eback(P(t, T.muzlat - .2, T.muzlat + .4));
  const pr = eio(P(t, T.n13 - .4, T.n13 + .5));
  return <Layer a={a} z={logZ(P(t, 39.1, 46.4), 1, 1.04)}>
    <Glow x={CX} y={920} r={520} a={.9} col="155,227,255" />
    <div style={{ ...abs(CX - 120, 650), scale: String(lerp(.6, 1, clamp(fr))), opacity: clamp(fr * 2) }}><Lock w={240} t={t} /></div>
    <Pill s="banklar ko‘ra olmaydi" x={CX} y={980} a={eout(P(t, T.banklar - .1, T.banklar + .3))} size={30} col={ICE} dark />
    <Stamp s="YANGI KREDIT ✕" y={1080} t={t} t0={T.berilmay} t1={T.narxi} col={RED} size={50} rot={-5} />
    <Num v={`≈ ${fmt(13200 * pr)} so‘m`} y={1050} a={eout(P(t, T.narxi - .1, T.narxi + .2))} size={80} col={Y} />
    <Chip s="BHM 440 000 × 0,03 = 13 200 so‘m" y={1170} a={eout(P(t, T.n13, T.n13 + .4))} />
    <Src s="Freeze xizmati · my.gov.uz · kun.uz, 26.06.2025" y={1260} a={eout(P(t, T.narxi, T.narxi + .4))} />
    <Head t={t} t0={39.1} t1={46.45} y={490} lines={[['1 ·'], ['muzlatish', 'y']]} size={76} from="slam" />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 46.3, 49.8, .3, .3);
  return <Layer a={a} z={logZ(P(t, 46.3, 49.8), 1, 1.05)}>
    <Glow x={CX} y={940} r={520} a={.85} col="91,140,255" />
    <div style={{ position: 'absolute', left: CX, top: 700, translate: '-50% 0', scale: String(lerp(.85, 1, eback(P(t, 46.3, 46.9)))) }}><Doc title="Kredit olish" sub="nomingizga · yangi shartnoma" col={BLUE} w={460} /></div>
    <Stamp s="TAQIQ" y={860} t={t} t0={T.taqiq} t1={49.8} col={RED} size={80} rot={-10} />
    <Pill s="nomingizga shartnoma tuzilmaydi" x={CX} y={1080} a={eout(P(t, T.taqiq + .2, T.taqiq + .5))} size={26} dark />
    <Src s="6.06.2025 dan · kun.uz" y={1170} a={eout(P(t, T.taqiq, T.taqiq + .4))} />
    <Head t={t} t0={46.3} t1={49.8} y={490} lines={[['2 · kreditga'], ['taqiq', 'y']]} size={76} from="slam" />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 49.6, END + 1, .3, .1);
  const aA = env(t, 49.6, T.y2025 - .05, .3, .3), aB = env(t, T.y2025 - .2, T.buni - .05, .3, .3);
  const n = eio(P(t, T.n950 - .3, T.n950 + .9));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={940} r={520} a={.85} col="61,220,132" />
      <div style={{ ...abs(SL + 10, 640) }}>
        <Phone w={290} id="p9">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#151b2a,#090c13)', padding: '70px 22px 0' }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: WH }}>my.gov.uz</div>
            <div style={{ fontFamily: MONO, fontSize: 15, color: GR, marginTop: 6 }}>Iqtisodiyot va biznes</div>
            <div style={{ marginTop: 18, padding: '16px 14px', borderRadius: 14, background: '#1d2230', fontFamily: SANS, fontWeight: 700, fontSize: 19, color: WH }}>Kredit tarixini olish</div>
            <div style={{ marginTop: 16, padding: '12px 0', borderRadius: 14, background: t > T.bepul ? GRN : BLUE, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 20, color: '#0b0d12' }}>{t > T.bepul ? '1-marta bepul ✓' : 'Ariza berish'}</div>
          </div>
        </Phone>
      </div>
      <Card x={CX + 20} y={720} w={410} a={eout(P(t, T.xato - .2, T.xato + .3))}>
        <div style={{ padding: '22px 24px' }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>xato yozuv</div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: GRN }}>TUZATILADI ✓</div>
        </div>
      </Card>
      <Card x={CX + 20} y={900} w={410} a={eout(P(t, T.rost - .2, T.rost + .3))}>
        <div style={{ padding: '22px 24px' }}>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>rost yozuv</div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: RED }}>O‘CHMAYDI ✕</div>
        </div>
      </Card>
      <Src s="kursiv.media · depozit.uz" y={1290} a={eout(P(t, T.bepul, T.bepul + .4))} />
      <Head t={t} t0={49.6} t1={T.y2025} y={490} lines={[['o‘zingiz'], ['tekshiring', 'g']]} size={76} />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={940} r={520} a={.85} />
      <Num v={fmt(950000 * n)} y={720} a={eout(P(t, T.n950 - .5, T.n950 - .2))} size={140} />
      <div style={{ ...abs(SL, 890, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 28, color: GR, opacity: eout(P(t, T.n950, T.n950 + .4)) }}>kishi o‘z tarixini tekshirgan</div>
      <Src s="2025-yil I yarmi · KATM · kursiv.media" y={980} a={eout(P(t, T.n950, T.n950 + .4))} />
      <Head t={t} t0={T.y2025 - .2} t1={T.buni} y={490} lines={[['2025-yil'], ['yarim yilda', 'y']]} size={70} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['nasiyachi do‘stga'], ['yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.yoq, 10, 6], [T.byuro, 8, 7], [T.alo, 8, 7], [T.yomon, 12, 6], [T.unutmay, 10, 6], [T.endi, 20, 5], [T.firib, 10, 6], [T.muzlat, 10, 6], [T.taqiq, 12, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1130} r={580} a={1} />
    <div style={{ ...abs(CX - 240 + 40, 900) }}><Score w={480} v={430} hi={4} /></div>
    <div style={{ position: 'absolute', left: CX + 40, top: 1270, translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: 110, color: GRN, textShadow: '0 0 40px rgba(61,220,132,.5)' }}>430</div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>1 dan 500 gacha ball</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>BANK SIZNI<br />QANDAY BILADI?</div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.1, color: ICE }}>FIRIBGARDAN 2 HIMOYA</div>
  </AbsoluteFill>;
};
