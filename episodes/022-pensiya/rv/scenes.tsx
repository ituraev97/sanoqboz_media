import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art ---------- */
/* generic desk calculator with a display */
const Calc: React.FC<{ w: number; disp: string; col?: string; id: string; press?: number }> = ({ w, disp, col = '#9BE37A', id, press = -1 }) => (
  <div style={{ position: 'relative', width: w, height: w * 1.32 }}>
    <svg width={w} height={w * 1.32} viewBox="0 0 300 396" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <defs>
        <linearGradient id={`cb${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4a5162" /><stop offset=".5" stopColor="#262a35" /><stop offset="1" stopColor="#3a404e" /></linearGradient>
        <linearGradient id={`cd${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a2a1e" /><stop offset="1" stopColor="#0c1610" /></linearGradient>
      </defs>
      <rect x="0" y="0" width="300" height="396" rx="30" fill={`url(#cb${id})`} stroke="#5a6274" strokeWidth="3" />
      <rect x="22" y="24" width="256" height="84" rx="12" fill={`url(#cd${id})`} stroke="#0a0c10" strokeWidth="3" />
      {Array.from({ length: 16 }, (_, i) => {
        const cx = 22 + (i % 4) * 66, cy = 128 + Math.floor(i / 4) * 64; const op = i % 4 === 3;
        return <rect key={i} x={cx} y={cy + (press === i ? 4 : 0)} width="58" height="52" rx="10" fill={op ? (i === 15 ? '#EC3A2C' : '#FFCF3A') : '#d8dde7'} stroke="#11141b" strokeWidth="2" opacity={press === i ? .75 : 1} />;
      })}
    </svg>
    <div style={{ position: 'absolute', left: w * .09, top: w * .1, width: w * .82, height: w * .26, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: w * .03, fontFamily: HEAD, fontWeight: 700, fontSize: w * .15, color: col, textShadow: `0 0 14px ${col}88`, whiteSpace: 'nowrap', boxSizing: 'border-box' }}>{disp}</div>
  </div>
);
/* generic envelope */
const Envelope: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * .66} viewBox="0 0 300 198" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="envG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#efe3c8" /><stop offset="1" stopColor="#c9b78f" /></linearGradient></defs>
    <rect x="40" y="-30" width="220" height="110" rx="6" fill="#6fbf73" stroke="#2f6b3a" strokeWidth="3" />
    <text x="150" y="40" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight={700} fontSize="40" fill="#1f4a28">so‘m</text>
    <rect x="0" y="20" width="300" height="178" rx="12" fill="url(#envG)" stroke="#7a6a48" strokeWidth="3" />
    <path d="M0 26 L150 120 L300 26" fill="none" stroke="#7a6a48" strokeWidth="3" />
  </svg>
);
/* generic gift box */
const Gift: React.FC<{ w: number; open: number }> = ({ w, open }) => (
  <svg width={w} height={w} viewBox="0 0 240 240" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="gfG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff6a5c" /><stop offset="1" stopColor="#b8241a" /></linearGradient></defs>
    <rect x="30" y="110" width="180" height="120" rx="10" fill="url(#gfG)" />
    <rect x="108" y="110" width="24" height="120" fill="#FFCF3A" />
    <g transform={`translate(0 ${-open * 40}) rotate(${-open * 12} 30 110)`}>
      <rect x="20" y="80" width="200" height="36" rx="8" fill="#e8463a" />
      <rect x="108" y="80" width="24" height="36" fill="#FFCF3A" />
      <path d="M120 80 C 90 40 60 60 80 80 Z M120 80 C 150 40 180 60 160 80 Z" fill="#FFCF3A" />
    </g>
  </svg>
);
/* simple person icon (generic, no face) */
const Person: React.FC<{ w: number; col: string; skirt?: boolean }> = ({ w, col, skirt }) => (
  <svg width={w} height={w * 1.3} viewBox="0 0 100 130" style={{ display: 'block' }}>
    <circle cx="50" cy="26" r="20" fill={col} />
    {skirt ? <path d="M50 50 L 82 120 L 18 120 Z" fill={col} /> : <rect x="24" y="50" width="52" height="70" rx="20" fill={col} />}
  </svg>
);
const Chip: React.FC<{ s: string; y: number; a: number }> = ({ s, y, a }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: CX, top: y, translate: '-50% 0', opacity: a, padding: '10px 22px', borderRadius: 14, background: 'rgba(14,16,22,.94)', border: '1.5px solid rgba(255,255,255,.14)', fontFamily: MONO, fontSize: 24, color: WH, whiteSpace: 'nowrap' }}>{s}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 4.35, .2, .3);
  const disp = t < T.pensiya - .1 ? '4 000 000' : t < T.hisob ? '?' : '55 % · ...';
  return <Layer a={a} z={logZ(P(t, -1, 4.35), 1, 1.06)}>
    <Glow x={CX} y={1000} r={520} a={.9} />
    <div style={{ ...abs(CX - 210, 690) }}><Calc w={420} disp={disp} col={t < T.pensiya - .1 ? '#9BE37A' : Y} id="c1" press={t > T.hisob ? 15 : -1} /></div>
    <Pill s="oylik" x={CX - 150} y={1290} a={eout(P(t, T.mln4 - .2, T.mln4 + .2))} size={30} col={GRN} dark />
    <div style={{ ...abs(CX - 30, 1262), fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: GR, opacity: eout(P(t, T.pensiya - .3, T.pensiya)) }}>→</div>
    <Pill s="pensiya ?" x={CX + 150} y={1290} a={eout(P(t, T.pensiya - .2, T.pensiya + .2))} size={30} />
    <Head t={t} t0={-1} t1={T.hisob - .1} y={490} lines={[['oylik 4 mln'], ['pensiya qancha?', 'y']]} size={68} />
    <Head t={t} t0={T.hisob - .1} t1={4.35} y={490} lines={[['hisoblaymiz'], ['3 qadamda', 'y']]} size={76} from="slam" />
  </Layer>;
};

const WAGE = [2.1, 2.3, 2.2, 2.6, 3.4, 3.8, 4.1, 4.4, 4.2, 3.6];
const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 4.2, 14.15, .3, .3);
  const grow = eio(P(t, 4.3, T.y10 + .4));
  const win = eio(P(t, T.ketma - .2, T.y5 + .5)); // window slides to best 5 (index 4..8)
  const wx = lerp(0, 4, win);
  const avg = eio(P(t, T.ortacha - .2, T.ortacha + .7));
  const bw = 66, gap = 14, x0 = CX - (10 * bw + 9 * gap) / 2, base = 1260, k = 90;
  const best = WAGE.slice(4, 9).reduce((s, v) => s + v, 0) / 5;
  return <Layer a={a} z={logZ(P(t, 4.2, 14.1), 1, 1.04)}>
    <Glow x={CX} y={1050} r={540} a={.85} col="91,140,255" />
    {WAGE.map((v, i) => {
      const inWin = t > T.eng - .2 && i >= Math.round(wx) && i < Math.round(wx) + 5;
      const h = v * k * clamp(grow * 1.6 - i * .06) ;
      const hh = inWin && avg > 0 ? lerp(h, best * k, avg) : h;
      return <React.Fragment key={i}>
        <div style={{ position: 'absolute', left: x0 + i * (bw + gap), top: base - hh, width: bw, height: hh, borderRadius: '10px 10px 0 0', background: inWin ? `linear-gradient(180deg, ${Y}, #c99a1c)` : 'linear-gradient(180deg,#5b6476,#2c3240)', opacity: inWin || t < T.eng ? 1 : lerp(1, .45, eout(P(t, T.eng, T.eng + .4))) }} />
        <div style={{ position: 'absolute', left: x0 + i * (bw + gap), top: base + 12, width: bw, textAlign: 'center', fontFamily: MONO, fontSize: 22, color: inWin ? Y : GR, opacity: grow }}>{i + 1}</div>
      </React.Fragment>;
    })}
    {t > T.eng - .2 && <div style={{ position: 'absolute', left: x0 + wx * (bw + gap) - 10, top: 830, width: 5 * bw + 4 * gap + 20, height: base - 830 + 56, border: `4px solid ${Y}`, borderRadius: 18, opacity: eout(P(t, T.eng - .2, T.eng + .2)), boxShadow: `0 0 30px rgba(255,207,58,.35)` }} />}
    <div style={{ position: 'absolute', left: x0 - 4, top: base - best * k - 2, width: (10 * bw + 9 * gap) + 8, height: 4, background: WH, opacity: avg, borderRadius: 2 }} />
    <Pill s="o‘rtacha oylik = ASOS" x={CX} y={base - best * k - 50} a={eout(P(t, T.ortacha + .3, T.ortacha + .7))} size={28} col={WH} />
    <div style={{ ...abs(SL, base + 50, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 22, color: GR, opacity: grow }}>oxirgi 10 yil ish (misol)</div>
    <Pill s="5 yilni o‘zingiz tanlaysiz ✓" x={CX} y={760} a={env(t, T.qaysi - .1, T.ortacha, .25, .3)} size={28} col={GRN} />
    <Src s="eng yaxshi ketma-ket 5 yil · kun.uz, 08.04.2026" y={1385} a={eout(P(t, T.olin, T.olin + .4))} />
    <Head t={t} t0={4.2} t1={T.osha - .1} y={490} lines={[['1 · oxirgi 10 yildan'], ['eng yaxshi 5 yil', 'y']]} size={60} />
    <Head t={t} t0={T.osha - .1} t1={14.15} y={490} lines={[['o‘rtacha oylik'], ['= asos', 'y']]} size={70} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 14.0, 19.8, .3, .3);
  const full = eio(P(t, 14.2, 15.0)), cut = eio(P(t, T.f55 - .1, T.f55 + .7));
  const n = eio(P(t, T.n2200 - .3, T.n2200 + .8));
  const bx = SL + 30, bwid = SR - SL - 60;
  return <Layer a={a} z={logZ(P(t, 14, 19.8), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <div style={{ ...abs(bx, 760, bwid), fontFamily: MONO, fontSize: 26, color: GR, display: 'flex', justifyContent: 'space-between', opacity: full }}><span>o‘rtacha oylik</span><span>4 000 000 so‘m</span></div>
    <div style={{ position: 'absolute', left: bx, top: 810, width: bwid, height: 110, borderRadius: 20, background: '#1d2230', overflow: 'hidden', opacity: full }}>
      <div style={{ width: `${full * 100}%`, height: '100%', background: 'linear-gradient(90deg,#5b6476,#3a4150)' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: `${cut * 55}%`, height: '100%', background: `linear-gradient(90deg, ${Y}, #f2a91c)` }} />
      <div style={{ position: 'absolute', left: `${55}%`, top: 0, width: 4, height: '100%', background: WH, opacity: cut }} />
    </div>
    <div style={{ position: 'absolute', left: bx + bwid * .55 / 2, top: 845, translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: '#1A1306', opacity: cut }}>55 %</div>
    <div style={{ position: 'absolute', left: bx + bwid * .775, top: 845, translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: GR, opacity: cut }}>45 %</div>
    <Num v={`${fmt(2200000 * n)} so‘m`} y={1010} a={eout(P(t, T.mln4b - .2, T.mln4b + .2))} size={104} />
    <Chip s="4 000 000 × 55 % = 2 200 000" y={1160} a={eout(P(t, T.n2200 + .3, T.n2200 + .7))} />
    <Src s="tayanch pensiya = o‘rtacha oylikning 55 % · kun.uz, 30.08.2026" y={1270} a={eout(P(t, T.f55, T.f55 + .4))} />
    <Head t={t} t0={14.0} t1={19.8} y={490} lines={[['2 · oylikning'], ['55 foizi', 'y']]} size={76} from="slam" />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 19.7, 30.7, .3, .3);
  const aM = eback(P(t, 19.8, 20.3)), aF = eback(P(t, 20.1, 20.6));
  const age = eout(P(t, T.yoshi - .1, T.yoshi + .3));
  const home = env(t, T.uydagi - .2, 30.7, .3, .3);
  const card = (x: number, ap: number, col: string, skirt: boolean, title: string, st: string, yo: string, ageT: number) => ap <= 0 ? null :
    <div style={{ position: 'absolute', left: x, top: 700, width: 360, scale: String(clamp(ap, 0, 1.2)), opacity: clamp(ap * 2) * (1 - home * .92) }}>
      <Card x={0} y={0} w={360}>
        <div style={{ padding: '24px 20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><Person w={90} col={col} skirt={skirt} /></div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 38, color: WH, marginTop: 6 }}>{title}</div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: Y, lineHeight: 1.05 }}>{st}</div>
          <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>staj</div>
          <div style={{ marginTop: 14, padding: '8px 0', borderRadius: 14, background: '#1d2230', fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: ICE, opacity: eout(P(t, ageT - .2, ageT + .2)) }}>{yo}</div>
        </div>
      </Card>
    </div>;
  return <Layer a={a} z={logZ(P(t, 19.7, 30.7), 1, 1.04)}>
    <Glow x={CX} y={1000} r={540} a={.85} col="155,227,255" />
    {card(SL + 20, aM, '#9fb8ff', false, 'ERKAK', '25 yil', '60 yosh', T.a60)}
    {card(SR - 380, aF, '#ffb3c1', true, 'AYOL', '20 yil', '55 yosh', T.a55)}
    <Pill s="pensiya yoshi" x={CX} y={1250} a={age * (1 - home)} size={28} col={ICE} dark />
    <Src s="kun.uz, 08.04.2026 · kun.uz, 30.08.2026" y={1320} a={eout(P(t, T.y20, T.y20 + .4)) * (1 - home)} />
    {home > 0 && <Card x={CX - 260} y={820} w={520} a={home}>
      <div style={{ padding: '26px 28px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>{['osh', 'kir', 'bolalar', 'mehmon'].map((s) => <div key={s} style={{ padding: '6px 16px', borderRadius: 20, background: '#2c3240', fontFamily: SANS, fontWeight: 700, fontSize: 24, color: '#FFD983' }}>{s}</div>)}</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 42, color: WH, marginTop: 12 }}>UYDAGI ISH</div>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>har kuni · 24/7</div>
      </div>
    </Card>}
    <Stamp s="STAJGA KIRMAYDI" y={1170} t={t} t0={T.kirmay} t1={30.7} col={RED} size={52} rot={-6} />
    <Head t={t} t0={19.7} t1={T.uydagi - .2} y={490} lines={[['3 · staj'], ['qancha kerak?', 'y']]} size={72} />
    <Head t={t} t0={T.uydagi - .2} t1={30.7} y={490} lines={[['uydagi ish'], ['afsuski…', 'r']]} size={72} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 30.6, 38.5, .3, .3);
  const extra = clamp(Math.floor(P(t, T.y30 - .1, T.f60) * 5 + .001) + (t > T.f1 ? 1 : 0), 0, 5);
  const pct = 55 + extra;
  const n = eio(P(t, T.n2400 - .3, T.n2400 + .8));
  return <Layer a={a} z={logZ(P(t, 30.6, 38.5), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="61,220,132" />
    <div style={{ position: 'absolute', left: SL + 40, top: 760, display: 'flex', alignItems: 'flex-end', gap: 10 }}>
      <div style={{ width: 300, height: 330, borderRadius: 18, background: `linear-gradient(180deg, ${Y}, #c99a1c)`, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: '#1A1306' }}>55 %</div>
      {[0, 1, 2, 3, 4].map((i) => { const on = extra > i; const ap = on ? 1 : 0;
        return <div key={i} style={{ width: 84, height: 330 + (i + 1) * 12, borderRadius: 14, background: on ? GRN : '#1d2230', border: on ? 'none' : '2px dashed #3a4150', display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: on ? '#06210f' : GR, opacity: lerp(.5, 1, ap) }}>
          <div style={{ textAlign: 'center', lineHeight: 1.1 }}>+1<br /><span style={{ fontFamily: MONO, fontSize: 16 }}>{26 + i}-yil</span></div></div>; })}
    </div>
    <Num v={`${pct} %`} y={1150} a={eout(P(t, T.y30 - .3, T.y30))} size={96} col={pct >= 60 ? GRN : Y} />
    <Num v={`≈ ${fmt(2400000 * n)} so‘m`} y={1260} a={eout(P(t, T.n2400 - .4, T.n2400 - .1))} size={64} col={WH} />
    <Pill s="har ortiqcha yil +1 %" x={CX} y={720} a={eout(P(t, T.f1 - .2, T.f1 + .2))} size={28} col={GRN} />
    <Src s="misol: erkak, 30 yil staj · 4 mln × 60 % · ustamalarsiz · kursiv.media" y={1350} a={eout(P(t, T.n2400, T.n2400 + .4))} />
    <Head t={t} t0={30.6} t1={38.5} y={490} lines={[['30 yil ishlagan'], ['erkak — 60 %', 'g']]} size={66} />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 38.4, 40.1, .15, .3);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={38.4} t1={40.1} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 40.0, 47.0, .3, .3);
  const grow = eio(P(t, T.mln10 - .3, T.mln10 + .6));
  const cap = eout(P(t, T.kopi - .2, T.kopi + .3)), chop = eio(P(t, T.n6048, T.olin2 + .3));
  const n = eio(P(t, T.n6048 - .2, T.n6048 + .9));
  const base = 1250, k = 52, bw = 260, bx = CX - 330;
  const h10 = 10 * k * grow, hc = 6.048 * k;
  return <Layer a={a} z={logZ(P(t, 40, 47), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="236,58,44" />
    <div style={{ position: 'absolute', left: bx, top: base - h10, width: bw, height: h10, borderRadius: '16px 16px 0 0', overflow: 'hidden', background: '#1d2230' }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: Math.min(h10, hc), background: `linear-gradient(180deg, ${Y}, #c99a1c)` }} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: Math.max(0, h10 - hc), background: `repeating-linear-gradient(45deg, rgba(236,58,44,${.25 + .45 * chop}) 0 14px, rgba(236,58,44,.08) 14px 28px)` }} />
    </div>
    <div style={{ position: 'absolute', left: bx, top: base + 10, width: bw, textAlign: 'center', fontFamily: MONO, fontSize: 22, color: GR, opacity: grow }}>oylik 10 mln</div>
    <div style={{ position: 'absolute', left: bx - 30, top: base - hc - 3, width: 720, height: 6, background: RED, opacity: cap, boxShadow: '0 0 20px rgba(236,58,44,.7)' }} />
    <div style={{ position: 'absolute', left: bx + bw + 30, top: base - hc - 74, fontFamily: MONO, fontSize: 24, color: RED, opacity: cap }}>SHIFT · ko‘pi bilan</div>
    <Num v={fmt(6048000 * n)} x={bx + bw + 30 + 170} y={base - hc + 24} a={eout(P(t, T.n6048 - .3, T.n6048))} size={68} />
    <div style={{ position: 'absolute', left: bx + bw / 2, top: base - h10 + 30, translate: '-50% 0', fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: WH, background: 'rgba(8,9,13,.85)', padding: '2px 12px', borderRadius: 10, whiteSpace: 'nowrap', opacity: chop }}>✕ 3 952 000</div>
    <div style={{ position: 'absolute', left: bx + bw + 40, top: base - hc + 120, width: 360, fontFamily: MONO, fontSize: 22, color: GR, opacity: chop }}>hisobga kirmaydi ↖</div>
    <Chip s="12 × 504 000 = 6 048 000 so‘m" y={1310} a={eout(P(t, T.n12, T.n12 + .4))} />
    <Src s="bazaviy miqdor 504 000 (1.07.2026 dan) · gov.uz · kun.uz" y={1385} a={eout(P(t, T.bazaviy, T.bazaviy + .4))} />
    <Head t={t} t0={40.0} t1={T.n12 - .2} y={490} lines={[['oylik 10 mln bo‘lsa ham'], ['hisobga 6 048 000', 'y']]} size={60} />
    <Head t={t} t0={T.n12 - .2} t1={47.0} y={490} lines={[['shift ='], ['12 bazaviy miqdor', 'y']]} size={66} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 46.9, 51.95, .3, .3);
  const off = eback(P(t, T.rasmiy - .2, T.rasmiy + .3)), env2 = eback(P(t, T.konvert - .2, T.konvert + .3));
  return <Layer a={a} z={logZ(P(t, 46.9, 51.9), 1, 1.04)}>
    <Glow x={CX} y={1000} r={520} a={.85} col="61,220,132" />
    {off > 0 && <div style={{ position: 'absolute', left: SL + 10, top: 720, scale: String(clamp(off, 0, 1.2)), opacity: clamp(off * 2) }}>
      <Card x={0} y={0} w={380}>
        <div style={{ padding: '22px 24px' }}>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: WH }}>Hisob-varaqa</div>
          <div style={{ fontFamily: MONO, fontSize: 18, color: GR, marginTop: 4 }}>rasmiy oylik · soliq ✓</div>
          {[0, 1, 2].map((i) => <div key={i} style={{ height: 8, borderRadius: 4, background: '#2c3240', marginTop: 12, width: `${90 - i * 20}%` }} />)}
          <div style={{ marginTop: 16, fontFamily: HEAD, fontWeight: 700, fontSize: 40, color: GRN }}>PENSIYADA ✓</div>
        </div>
      </Card>
    </div>}
    {env2 > 0 && <div style={{ position: 'absolute', left: SR - 360, top: 760, scale: String(clamp(env2, 0, 1.2)), opacity: clamp(env2 * 2) * (1 - .4 * eout(P(t, T.qogoz, T.qogoz + .4))), rotate: '6deg' }}><Envelope w={330} /></div>}
    <Pill s="qog‘ozda yo‘q" x={SR - 195} y={1050} a={eout(P(t, T.qogoz - .1, T.qogoz + .3))} size={28} col={RED} dark />
    <Stamp s="PENSIYADA YO‘Q" x={SR - 200} y={1150} t={t} t0={T.yoq - .15} t1={51.95} col={RED} size={46} rot={-8} />
    <Src s="«rasmiy hisoblangan ish haqi» · gov.uz (Pensiya jamg‘armasi), 24.08.2026" y={1300} a={eout(P(t, T.rasmiy, T.rasmiy + .4))} />
    <Head t={t} t0={46.9} t1={51.95} y={490} lines={[['hisobga faqat'], ['rasmiy oylik', 'g']]} size={72} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 51.8, END + 1, .3, .1);
  const aA = env(t, 51.8, T.shuning - .05, .3, .3), aB = env(t, T.shuning - .2, T.buni - .05, .3, .3);
  const n = eio(P(t, T.n983 - .3, T.n983 + .9));
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={980} r={520} a={.85} />
      <div style={{ ...abs(CX - 150, 680) }}><Calc w={300} disp="983 000" id="c9" /></div>
      <Num v={`${fmt(983000 * n)} so‘m`} y={1110} a={eout(P(t, T.n983 - .4, T.n983 - .1))} size={96} />
      <Src s="eng kam yoshga doir pensiya · 1.07.2026 dan · gov.uz" y={1240} a={eout(P(t, T.n983, T.n983 + .4))} />
      <Head t={t} t0={51.8} t1={T.shuning} y={490} lines={[['eng kam'], ['pensiya', 'y']]} size={80} />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={980} r={520} a={.85} col="61,220,132" />
      <div style={{ ...abs(CX - 160, 760) }}><Gift w={320} open={eout(P(t, T.sovga - .2, T.sovga + .4))} /></div>
      <Pill s="kelajakdagi o‘zingizga" x={CX} y={1160} a={eout(P(t, T.sovga - .1, T.sovga + .3))} size={32} col={GRN} />
      <Head t={t} t0={T.shuning - .2} t1={T.buni} y={490} lines={[['oylik rasmiy'], ['bo‘lsin', 'g']]} size={80} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['konvertchi do‘stga'], ['yuboring', 'y']]} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.f55, 10, 6], [T.n2200, 8, 7], [T.kirmay, 10, 6], [T.f60, 8, 7], [T.endi, 20, 5], [T.kopi, 10, 6], [T.yoq, 12, 6], [T.n983, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1130} r={580} a={1} />
    <div style={{ ...abs(CX + 40 - 210, 840) }}><Calc w={420} disp="2 400 000" id="cv" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>oylik 4 mln bo‘lsa</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 118, lineHeight: 1.02, ...yel }}>PENSIYA<br />QANCHA?</div>
    <div style={{ ...abs(SL, 1440, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.1, color: GRN }}>55 % + HAR YIL 1 %</div>
    <div style={{ ...abs(SL, 1530, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 46, lineHeight: 1.1, color: RED }}>KONVERT HISOBGA KIRMAYDI</div>
  </AbsoluteFill>;
};
