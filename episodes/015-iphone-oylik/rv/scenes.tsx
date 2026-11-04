import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, YL, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup, Phone } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- art ---------- */
const Screen: React.FC<{ price: string; sub?: string; col?: string }> = ({ price, sub = '256 GB', col = Y }) => (
  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#1a2030,#0a0d14)', fontFamily: SANS, color: WH, textAlign: 'center' }}>
    <div style={{ position: 'absolute', top: '16%', left: '22%', width: '56%', height: '40%', borderRadius: 26, background: 'linear-gradient(160deg,#c9d2e3,#6d7689 60%,#3c4352)', boxShadow: 'inset 0 0 0 3px rgba(255,255,255,.25)' }}>
      <div style={{ position: 'absolute', left: '10%', top: '6%', width: '38%', height: '30%', borderRadius: 18, background: '#2a2f3a' }}>
        <div style={{ position: 'absolute', left: '14%', top: '12%', width: '34%', height: '34%', borderRadius: '50%', background: '#0c0e13', boxShadow: '0 0 0 3px #4a5160' }} />
        <div style={{ position: 'absolute', left: '14%', top: '54%', width: '34%', height: '34%', borderRadius: '50%', background: '#0c0e13', boxShadow: '0 0 0 3px #4a5160' }} />
      </div>
    </div>
    <div style={{ position: 'absolute', top: '61%', width: '100%', fontWeight: 800, fontSize: '1.5em' }}>Telefon 17</div>
    <div style={{ position: 'absolute', top: '69%', width: '100%', fontFamily: MONO, fontSize: '0.9em', color: GR }}>{sub}</div>
    <div style={{ position: 'absolute', top: '78%', width: '100%', fontFamily: HEAD, fontWeight: 700, fontSize: '1.9em', color: col, whiteSpace: 'nowrap' }}>{price}</div>
  </div>
);

/* months as rows of 22 work-day cells; f = months filled */
const MonthBar: React.FC<{ t: number; t0: number; f: number; rows: number; y: number; col?: string; dur?: number }> = ({ t, t0, f, rows, y, col = Y, dur = 1.2 }) => {
  const k = eio(P(t, t0, t0 + dur)), n = f * 22 * k;
  return <div style={{ ...abs(SL, y, SR - SL), opacity: eout(P(t, t0 - .3, t0)) }}>
    {Array.from({ length: rows }, (_, r) => <div key={r} style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: MONO, fontSize: 19, color: GR, marginBottom: 6 }}>{`${r + 1}-oy · 22 ish kuni`}</div>
      <div style={{ display: 'flex', gap: 6 }}>{Array.from({ length: 22 }, (_, i) => { const idx = r * 22 + i; const on = clamp(n - idx);
        return <div key={i} style={{ width: 33, height: 40, borderRadius: 7, background: on > 0 ? col : '#1d2230', opacity: on > 0 ? .35 + .65 * on : 1, border: '1px solid rgba(255,255,255,.08)', boxShadow: on >= 1 ? `0 0 12px ${col}55` : 'none' }} />; })}</div>
    </div>)}
  </div>;
};

const Row: React.FC<{ y: number; a: number; k: string; v: string; col?: string; x?: number; w?: number }> = ({ y, a, k, v, col = WH, x = 330, w = 600 }) =>
  <Card x={x} y={y} w={w} a={a} style={{ translate: `${(1 - eout(a)) * 60}px 0` }}>
    <div style={{ padding: '18px 26px' }}>
      <div style={{ fontFamily: MONO, fontSize: 20, color: GR }}>{k}</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: col, lineHeight: 1.1, whiteSpace: 'nowrap' }}>{v}</div>
    </div>
  </Card>;

const Country: React.FC<{ t: number; t0: number; t1: number; name: string; id: string; price: number; cur: string; wage: number; tP: number; tW: number; tR: number; f: number; rows: number; res: string; resCol: 'g' | 'y' | 'r'; src: string; wageLbl?: string }> =
  ({ t, t0, t1, name, id, price, cur, wage, tP, tW, tR, f, rows, res, resCol, src, wageLbl = 'o‘rtacha oylik' }) => {
    const a = env(t, t0, t1, .3, .3);
    const pv = price * eio(P(t, tP - .1, tP + .9)), wv = wage * eio(P(t, tW - .1, tW + .7));
    const col = resCol === 'g' ? GRN : resCol === 'r' ? RED : Y;
    return <Layer a={a} z={logZ(P(t, t0, t1), 1, 1.03)}>
      <Glow x={220} y={900} r={380} a={.8} />
      <div style={{ ...abs(90, 690 + (1 - eout(P(t, t0, t0 + .5))) * 120), fontSize: 15 }}><Phone w={210} glow={.5} id={id}><Screen price={`${fmt(pv)} ${cur}`} /></Phone></div>
      <Row y={700} a={eout(P(t, tP - .3, tP + .1))} k="telefon narxi" v={`${fmt(pv)} ${cur}`} col={Y} />
      <Row y={890} a={eout(P(t, tW - .3, tW + .1))} k={wageLbl} v={`${fmt(wv)} ${cur}`} />
      <MonthBar t={t} t0={tR} f={f} rows={rows} y={1130} col={col} />
      <Src s={src} y={1130 + rows * 76 + 14} a={eout(P(t, tW, tW + .4))} />
      <Head t={t} t0={t0} t1={tR - .1} y={490} lines={[[name, 'y']]} size={96} from="slam" />
      <Head t={t} t0={tR - .1} t1={t1} y={490} lines={[[name], [res, resCol]]} size={62} />
    </Layer>;
  };

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 6.4, .2, .3);
  const k = eout(P(t, -1, .4));
  return <Layer a={a} z={logZ(P(t, 0, 6.4), 1, 1.06)}>
    <Glow x={CX} y={980} r={520} a={.9} />
    <div style={{ ...abs(CX - 150, 700 + (1 - k) * 80), fontSize: 21, rotate: `${Math.sin(t * 1.4) * 2}deg` }}><Phone w={300} glow={.8} id="h1"><Screen price="? oylik" col={Y} /></Phone></div>
    <Pill s="Koreya" x={CX - 290} y={1360} a={eout(P(t, T.koreya - .1, T.koreya + .25))} size={30} dark />
    <Pill s="Rossiya" x={CX} y={1360} a={eout(P(t, T.rossiya - .1, T.rossiya + .25))} size={30} dark />
    <Pill s="O‘zbekiston" x={CX + 290} y={1360} a={eout(P(t, T.uzb - .1, T.uzb + .25))} size={30} />
    <Head t={t} t0={-1} t1={6.4} y={490} lines={[['iPhone uchun'], ['necha oy ishlash kerak?', 'y']]} size={58} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 6.3, 10.3, .3, .3);
  const k1 = eout(P(t, T.formula - .1, T.formula + .3)), k2 = eout(P(t, T.oylikka - .3, T.oylikka + .1)), k3 = eout(P(t, T.oylikka + .4, T.oylikka + .7));
  const L = (s: string, k: number, c: string, y: number, sz = 72) => <div style={{ ...abs(SL, y + (1 - k) * 30, SR - SL), textAlign: 'center', opacity: k, fontFamily: HEAD, fontWeight: 700, fontSize: sz, color: c, textTransform: 'uppercase' }}>{s}</div>;
  return <Layer a={a} z={logZ(P(t, 6.3, 10.3), 1, 1.04)}>
    <Glow x={CX} y={980} r={480} a={.8} col="91,140,255" />
    <Card x={SL + 40} y={700} w={SR - SL - 80} style={{ height: 600 }}>{null}</Card>
    {L('telefon narxi', k1, Y, 760)}
    {L('÷', k2, GR, 880, 90)}
    {L('o‘rtacha oylik', k2, WH, 1000)}
    <div style={{ ...abs(SL + 120, 1120, SR - SL - 240), height: 4, borderRadius: 2, background: GR, opacity: k3 }} />
    {L('= necha oy', k3, GRN, 1160)}
    <Head t={t} t0={6.3} t1={10.3} y={490} lines={[['formula'], ['oddiy', 'y']]} size={66} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => <Country t={t} t0={10.2} t1={19.1} name="Koreya" id="kr" price={1450000} cur="von" wage={4093000} tP={T.n1450} tW={T.n4m} tR={T.demak} f={.354} rows={1} res="≈ 8 ish kuni" resCol="g" src="apple.com/kr · 4.11.2026 · oylik: Mehnat vazirligi, avg 2026" />;
const S4: React.FC<{ t: number }> = ({ t }) => <Country t={t} t0={19.0} t1={25.4} name="Rossiya" id="ru" price={58390} cur="rubl" wage={103014} tP={T.n58} tW={T.n103} tR={T.yarim - .3} f={.567} rows={1} res="yarim oydan ko‘p" resCol="y" src="hi-tech.mail.ru · iyun 2026 · oylik: Rosstat, avg 2026" />;
const S5: React.FC<{ t: number }> = ({ t }) => <Country t={t} t0={25.3} t1={32.8} name="O‘zbekiston" id="uz" price={12000000} cur="so‘m" wage={7274100} tP={T.n12} tW={T.n72} tR={T.bir5 - .3} f={1.65} rows={2} res="1,6 oylik" resCol="r" src="narx: Malika bozori, taxminan · oylik: Statistika qo‘mitasi, 2026 yil 9 oy" />;

/* bars of salaries (misol) */
const VALS = [5, 6, 4, 7, 8, 5, 6, 9, 4];
const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 32.7, 41.7, .15, .3);
  const aA = env(t, 32.7, T.ort4 - .05, .1, .3), aB = env(t, T.ort4 - .2, 41.7, .3, .3);
  const base = 1330, sc = 7, bw = 64, gap = 22, x0 = SL + 20;
  const dir = eio(P(t, T.n100 - .2, T.n100 + .9));
  const vals = [...VALS, 100 * dir];
  const avg = (VALS.reduce((s, v) => s + v, 0) + 100 * dir) / (VALS.length + (dir > 0 ? 1 : 0) * 1) ;
  const avgShown = dir > 0 ? (54 + 100 * dir) / 10 : 6;
  const sum = eout(P(t, T.qosh - .3, T.qosh + .3));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} col="236,58,44" />
      <Head t={t} t0={32.7} t1={T.ort4 - .05} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={1000} r={540} a={.8} col={dir > .5 ? '236,58,44' : '246,185,59'} />
      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
        {vals.map((v, i) => { const h = Math.max(4, v * sc * Math.min(1, eout(P(t, T.ort4 + i * .08, T.ort4 + .4 + i * .08)) + (i === 9 ? 1 : 0))); const x = x0 + i * (bw + gap); const isD = i === 9;
          if (isD && dir <= 0) return null;
          return <g key={i}><rect x={x} y={base - h} width={bw} height={h} rx="8" fill={isD ? RED : Y} opacity={isD ? 1 : .9} />
            <text x={x + bw / 2} y={base + 34} textAnchor="middle" fontFamily="JBM, monospace" fontSize="20" fill={GR}>{isD ? 'dir.' : `${Math.round(v)}`}</text></g>; })}
        <line x1={SL} x2={SR} y1={base - avgShown * sc} y2={base - avgShown * sc} stroke={GRN} strokeWidth="5" strokeDasharray="16 10" opacity={sum} />
      </svg>
      <Pill s={`o‘rtacha: ${avgShown.toFixed(1).replace('.', ',')} mln`} x={CX - 120} y={base - avgShown * sc - 40} a={sum} size={28} col={GRN} dark />
      <Pill s="direktor: 100 mln" x={CX + 200} y={720} a={eout(P(t, T.n100 - .1, T.n100 + .3))} size={28} col={RED} />
      <Src s="misol · oylik, mln so‘m · 10 kishi" y={1395} a={eout(P(t, T.ort4, T.ort4 + .4))} />
      <Head t={t} t0={T.ort4 - .2} t1={T.direktor - .2} y={490} lines={[['o‘rtacha ='], ['jami ÷ odamlar', 'y']]} size={60} />
      <Head t={t} t0={T.direktor - .2} t1={41.7} y={490} lines={[['bitta direktor —'], ['o‘rtacha ko‘tarildi', 'r']]} size={56} />
      {void avg}
    </Layer>
  </Layer>;
};

const SORT = [4, 4, 5, 5, 6, 6, 7, 8, 9, 100];
const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 41.6, 52.1, .3, .3);
  const aA = env(t, 41.6, T.bizda2 - .05, .3, .3), aB = env(t, T.bizda2 - .2, 52.1, .3, .3);
  const base = 1300, sc = 34, bw = 64, gap = 22, x0 = SL + 20;
  const mid = eout(P(t, T.mediana - .1, T.mediana + .4));
  const l = eout(P(t, T.yarmi1 - .1, T.yarmi1 + .3)), r = eout(P(t, T.yarmi2 - .1, T.yarmi2 + .3));
  const wv = 4166300 * eio(P(t, T.n41 - .1, T.n41 + .9));
  return <Layer a={a}>
    <Layer a={aA} z={logZ(P(t, 41.6, 47), 1, 1.03)}>
      <Glow x={CX} y={1000} r={540} a={.8} col="61,220,132" />
      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
        {SORT.map((v, i) => { const isD = i === 9; const h = Math.min(v, 12) * sc * eout(P(t, 41.7 + i * .06, 42.1 + i * .06)); const x = x0 + i * (bw + gap);
          const side = i < 5 ? l : r; const hi = i === 4 || i === 5 ? mid : 0;
          return <g key={i}><rect x={x} y={base - h} width={bw} height={h} rx="8" fill={isD ? RED : i < 5 ? (l > 0 ? '#8fb0ff' : Y) : (r > 0 ? '#ffb070' : Y)} opacity={.55 + .45 * Math.max(side, hi, .5)} />
            {isD && h > 300 && <path d={`M${x - 4} ${base - 260} l 18 -14 l 18 14 l 18 -14 l 18 14`} stroke="#06070a" strokeWidth="8" fill="none" />}
            <text x={x + bw / 2} y={base + 34} textAnchor="middle" fontFamily="JBM, monospace" fontSize="20" fill={GR}>{isD ? '100' : v}</text></g>; })}
        <line x1={x0 + 5 * (bw + gap) - gap / 2} x2={x0 + 5 * (bw + gap) - gap / 2} y1={base + 10} y2={base - 380} stroke={GRN} strokeWidth="5" opacity={mid} />
      </svg>
      <Pill s="mediana" x={x0 + 5 * (bw + gap) - gap / 2} y={base - 410} a={mid} size={30} col={GRN} />
      <Pill s="← yarmi kam" x={CX - 230} y={760} a={l} size={28} col="#8fb0ff" dark />
      <Pill s="yarmi ko‘p →" x={CX + 230} y={760} a={r} size={28} col="#ffb070" dark />
      <Src s="misol · oylik, mln so‘m · o‘rtadagi odam" y={1385} a={mid} />
      <Head t={t} t0={41.6} t1={T.bizda2 - .05} y={490} lines={[['mediana —'], ['o‘rtadagi odam', 'g']]} size={60} />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={900} r={520} a={.85} col="236,58,44" />
      <Row x={SL + 30} w={SR - SL - 60} y={690} a={eout(P(t, T.n41 - .3, T.n41 + .1))} k="mediana oylik · O‘zbekiston" v={`${fmt(wv)} so‘m`} col={GRN} />
      <Row x={SL + 30} w={SR - SL - 60} y={880} a={eout(P(t, T.n41 + .5, T.n41 + .9))} k="telefon · taxminan" v="12 000 000 so‘m" col={Y} />
      <MonthBar t={t} t0={T.unda - .2} f={2.88} rows={3} y={1080} col={RED} dur={1.4} />
      <Src s="mediana: Statistika qo‘mitasi, 2026 yil 8 oy · 12 mln ÷ 4,17 mln = 2,9" y={1325} a={eout(P(t, T.uch, T.uch + .4))} />
      <Head t={t} t0={T.bizda2 - .2} t1={T.unda - .1} y={490} lines={[['bizda mediana'], ['4,1 mln so‘m', 'g']]} size={60} />
      <Head t={t} t0={T.unda - .1} t1={52.1} y={490} lines={[['iPhone ='], ['qariyb 3 oylik', 'r']]} size={66} from="slam" />
    </Layer>
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 52.0, 56.8, .3, .3);
  const wv = 12300800 * eio(P(t, T.tosh - .1, T.tosh + .9));
  return <Layer a={a} z={logZ(P(t, 52, 56.8), 1, 1.04)}>
    <Glow x={CX} y={900} r={520} a={.85} col="61,220,132" />
    <Row x={SL + 30} w={SR - SL - 60} y={700} a={eout(P(t, T.tosh - .2, T.tosh + .2))} k="o‘rtacha oylik · Toshkent shahri" v={`${fmt(wv)} so‘m`} col={GRN} />
    <Row x={SL + 30} w={SR - SL - 60} y={890} a={eout(P(t, T.tosh + .3, T.tosh + .7))} k="telefon · taxminan" v="12 000 000 so‘m" col={Y} />
    <MonthBar t={t} t0={T.bir1 - .5} f={.98} rows={1} y={1110} col={GRN} />
    <Src s="Statistika qo‘mitasi · 2026 yil 9 oy" y={1225} a={eout(P(t, T.n12b, T.n12b + .4))} />
    <Head t={t} t0={52.0} t1={T.bir1 - .6} y={490} lines={[['Toshkentda'], ['o‘rtacha 12 mln', 'y']]} size={62} />
    <Head t={t} t0={T.bir1 - .6} t1={56.8} y={490} lines={[['telefon ≈'], ['1 oylik', 'g']]} size={70} from="slam" />
  </Layer>;
};

const Calc: React.FC<{ t: number; k: number }> = ({ t, k }) => {
  const lines = ['12 000 000', '÷ 7 274 100', '= 1,65'];
  const n = Math.floor(P(t, T.kalk - .2, T.kalk + 1.0) * 3.99);
  return <div style={{ width: 420, height: 600, borderRadius: 44, background: 'linear-gradient(160deg,#3a4050,#171a22 60%,#2a2f3b)', boxShadow: '0 30px 70px rgba(0,0,0,.6), inset 0 2px 0 rgba(255,255,255,.12)', padding: 28, boxSizing: 'border-box', scale: String(lerp(.85, 1, eback(k))) }}>
    <div style={{ height: 180, borderRadius: 20, background: '#0b1a12', boxShadow: 'inset 0 0 0 3px #1f3b2a', padding: '14px 20px', boxSizing: 'border-box', textAlign: 'right', fontFamily: MONO, fontWeight: 700, color: '#9df5c0' }}>
      {lines.map((s, i) => <div key={i} style={{ fontFamily: i === 1 ? SANS : MONO, fontSize: i === 2 ? 44 : 30, opacity: i < n ? 1 : .08, color: i === 2 ? Y : '#9df5c0' }}>{s}</div>)}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 22 }}>
      {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', ',', '=', '+'].map((c, i) => <div key={i} style={{ height: 70, borderRadius: 16, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 30, background: c === '=' ? Y : '÷×−+'.includes(c) ? '#40475a' : '#262b37', color: c === '=' ? '#1A1306' : WH }}>{c}</div>)}
    </div>
  </div>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 56.7, END + 1, .3, .1);
  const aA = env(t, 56.7, T.buni - .05, .3, .3);
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={520} a={.85} />
      <div style={{ ...abs(CX - 210, 720) }}><Calc t={t} k={eout(P(t, 56.7, 57.3))} /></div>
      <Pill s="«yangi telefon ol!»" x={CX} y={680} a={env(t, T.onangiz, T.kalk, .2, .3)} size={30} col={ICE} dark />
      <Head t={t} t0={56.7} t1={T.buni} y={490} lines={[['avval'], ['kalkulyator', 'y']]} size={70} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.koreya, 6, 7], [T.kr, 10, 6], [T.demak, 8, 7], [T.ru, 10, 6], [T.bizda, 10, 6], [T.bir5, 10, 6], [T.endi, 20, 5], [T.n100, 14, 5], [T.mediana, 8, 7], [T.unda, 12, 6], [T.bir1, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1150} r={560} a={1} />
    <div style={{ ...abs(CX - 135 + 40, 820), fontSize: 19, rotate: '-6deg' }}><Phone w={270} glow={1} id="cv"><Screen price="? oylik" /></Phone></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>Koreya · Rossiya · O‘zbekiston</div>
    <div style={{ ...abs(SL, 455, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>IPHONE —<br />NECHA OYLIK?</div>
    <div style={{ ...abs(SL, 1440, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 62, lineHeight: 1.1, color: RED }}>BIZDA — QARIYB 3 OY<br /><span style={{ fontSize: 40, color: GR }}>(MEDIANA OYLIK BILAN)</span></div>
  </AbsoluteFill>;
};
