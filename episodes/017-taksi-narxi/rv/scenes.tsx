import React from 'react';
import { AbsoluteFill } from 'remotion';
import { W, H, CX, SL, SR, Y, YL, WH, GR, BLUE, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, rnd, clamp } from '../lib';
import { Lockup, Phone, Car } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, flashAt, Road, Avatar, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

const ORG = '#FF8A1F';
const TAXI: [string, string] = ['#FFE27A', '#E8A800'];

/* ---------- art ---------- */
const Taxi: React.FC<{ w: number; id: string; wheel?: number }> = ({ w, id, wheel = 0 }) => (
  <div style={{ position: 'relative', width: w, height: w * .4 }}>
    <div style={{ position: 'absolute', left: w * .36, top: -w * .055, width: w * .2, height: w * .07, borderRadius: 6, background: '#1A1306', border: `3px solid ${Y}`, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: w * .045, color: Y }}>TAKSI</div>
    <Car w={w} id={id} col={TAXI} wheel={wheel} />
  </div>
);
const R1 = rnd(11); const DROPS = Array.from({ length: 70 }, () => ({ x: R1() * W, y: R1() * H, sp: 900 + R1() * 600, l: 30 + R1() * 40 }));
const Rain: React.FC<{ t: number; a: number }> = ({ t, a }) => a <= 0 ? null : (
  <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, opacity: a }}>
    {DROPS.map((d, i) => { const y = ((d.y + t * d.sp) % (H + 100)) - 50; return <line key={i} x1={d.x} y1={y} x2={d.x - 8} y2={y + d.l} stroke={ICE} strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" />; })}
  </svg>
);
const R2 = rnd(5); const PEOPLE = Array.from({ length: 36 }, () => ({ x: R2(), y: R2(), d: R2() }));
const CARS = Array.from({ length: 16 }, () => ({ x: R2(), y: R2(), d: R2(), fx: R2(), fy: R2() }));

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 5.7, .2, .3);
  const pr = eout(P(t, T.qimmat - .2, T.qimmat + .4));
  return <Layer a={a} z={logZ(P(t, -1, 5.7), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.9} />
    <Rain t={t} a={eout(P(t, -1, T.yomgir + .3))} />
    <Road t={t} y={1120} speed={200} />
    <div style={{ ...abs(CX - 230, 1110) }}><Taxi w={460} id="h1" wheel={t * 200} /></div>
    <Card x={CX - 210} y={720} w={420} style={{ scale: String(lerp(.9, 1, eback(P(t, -.6, .2)))) }}>
      <div style={{ padding: '20px 26px', textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>safar narxi</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 70, color: pr > .5 ? RED : WH, whiteSpace: 'nowrap' }}>{pr > .5 ? 'qimmat!' : '?? so‘m'}</div>
        <div style={{ height: 14, borderRadius: 7, marginTop: 8, background: `linear-gradient(90deg, ${GRN}, ${Y}, ${ORG}, ${RED})`, opacity: .9 }} />
      </div>
    </Card>
    <Pill s="talab yuqori" x={CX + 170} y={700} a={eout(P(t, T.qimmat, T.qimmat + .3))} size={28} col={RED} />
    <Head t={t} t0={-1} t1={5.7} y={490} lines={[['yomg‘ir yog‘sa —'], ['taksi qimmat. nega?', 'y']]} size={64} />
  </Layer>;
};

const ROWS: [string, string, keyof typeof T, string][] = [
  ['1 · minimal narx', '4 600 gacha', 'n4600', Y], ['2 · har km', '1 050 gacha', 'n1050', Y], ['3 · har daqiqa', '500 gacha', 'n500', Y],
  ['kutish · 2 daqiqa', 'bepul', 'bepul', GRN], ['keyin · har daqiqa', '650 gacha', 'n650', ORG],
];
const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 5.6, 26.4, .3, .3);
  const jam = P(t, T.tirband - .3, T.tirband + .2);
  const kmv = Math.min(t, T.tirband) - 9, km = Math.max(0, kmv * .32);
  const mins = Math.max(0, (t - 9) * 1.2);
  const hilite = (k: keyof typeof T, nxt: number) => env(t, T[k] - .2, nxt, .2, .3);
  return <Layer a={a} z={logZ(P(t, 5.6, 26.4), 1, 1.03)}>
    <Glow x={CX} y={950} r={540} a={.8} />
    <Card x={SL + 20} y={680} w={SR - SL - 40} style={{ scale: String(lerp(.92, 1, eback(P(t, 5.6, 6.2)))) }}>
      <div style={{ padding: '18px 28px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 21, color: GR }}><span>«Start» · Toshkent</span><span>so‘m</span></div>
        {ROWS.map(([k, v, tk, c], i) => { const on = eout(P(t, T[tk] - .3, T[tk] + .1)); const hl = hilite(tk, i < 4 ? T[ROWS[i + 1][2]] - .2 : 26.4);
          return <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 12px', marginTop: 4, borderRadius: 12, borderTop: i === 3 ? '2px dashed rgba(255,255,255,.15)' : 'none', background: hl > 0 ? `rgba(255,207,58,${.1 * hl})` : 'transparent', opacity: .25 + .75 * on, translate: `${(1 - on) * 30}px 0` }}>
            <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, color: WH }}>{k}</span>
            <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 42, color: on > .5 ? c : GR }}>{on > .5 ? v : '—'}</span></div>; })}
      </div>
    </Card>
    <div style={{ ...abs(SL + 20, 1170, SR - SL - 40), display: 'flex', gap: 20, opacity: eout(P(t, T.km - .3, T.km + .2)) }}>
      {[['km', km.toFixed(1).replace('.', ','), jam > .5 ? GR : Y], ['daqiqa', `${Math.floor(mins)}:${String(Math.floor((mins % 1) * 60)).padStart(2, '0')}`, Y]].map(([k, v, c], i) =>
        <Card key={i} x={0} y={0} w={410} style={{ position: 'relative' }}>
          <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: MONO, fontSize: 22, color: GR }}>{k}</span>
            <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 54, color: c }}>{v}</span>
          </div>
        </Card>)}
    </div>
    <Pill s="tirbandlik — km to‘xtadi" x={CX - 220} y={1310} a={eout(P(t, T.tirband, T.tirband + .3))} size={24} col={RED} dark />
    <Pill s="daqiqa — ketyapti" x={CX + 220} y={1310} a={eout(P(t, T.hisob - .1, T.hisob + .2))} size={24} col={Y} dark />
    <Src s="Yandex Go · Toshkent · «Start» tarifi · 4.11.2026 · narxlar «gacha»" y={1370} a={eout(P(t, T.n4600, T.n4600 + .4))} />
    <Head t={t} t0={5.6} t1={T.birinchi - .1} y={490} lines={[['narx ='], ['3 qism', 'y']]} size={80} from="slam" />
    <Head t={t} t0={T.birinchi - .1} t1={T.ikkinchi - .1} y={490} lines={[['1'], ['minimal narx', 'y']]} size={64} />
    <Head t={t} t0={T.ikkinchi - .1} t1={T.uchinchi - .1} y={490} lines={[['2'], ['kilometr', 'y']]} size={64} />
    <Head t={t} t0={T.uchinchi - .1} t1={T.shuning - .1} y={490} lines={[['3'], ['daqiqa', 'y']]} size={64} />
    <Head t={t} t0={T.shuning - .1} t1={T.ikki - .1} y={490} lines={[['tirbandlikda ham'], ['hisob ketadi', 'r']]} size={60} />
    <Head t={t} t0={T.ikki - .1} t1={26.4} y={490} lines={[['kutish:'], ['2 daqiqa bepul', 'g']]} size={62} />
  </Layer>;
};

const Map: React.FC<{ t: number }> = ({ t }) => {
  const x0 = SL + 30, y0 = 700, w = SR - SL - 60, h = 440;
  const surge = t < T.hamma ? 0 : eio(P(t, T.hamma, T.chaqir + .3));
  const come = eio(P(t, T.haydov - .2, T.hudud + .8));
  const ppl = t < T.buyurtma ? 0 : Math.round(lerp(6, 10, eio(P(t, T.buyurtma, T.buyurtma + .5))) + surge * 26 - eio(P(t, T.yetarli, T.tushadi)) * 18);
  const free = Math.round(6 + come * 10);
  return <Card x={x0} y={y0} w={w} style={{ height: h, overflow: 'hidden', background: 'linear-gradient(180deg,#141925,#0b0e15)' }}>
    <svg width={w} height={h} style={{ position: 'absolute', left: 0, top: 0 }}>
      {Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} x1={i * 110 + 20} y1="0" x2={i * 110 + 20} y2={h} stroke="#2a3142" strokeWidth="10" />)}
      {Array.from({ length: 5 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 110 + 30} x2={w} y2={i * 110 + 30} stroke="#2a3142" strokeWidth="10" />)}
      <circle cx={w / 2} cy={h / 2} r="150" fill="none" stroke={Y} strokeOpacity=".35" strokeWidth="3" strokeDasharray="10 10" />
      {PEOPLE.slice(0, Math.max(0, ppl)).map((p, i) => { const x = w / 2 + (p.x - .5) * 280, y = h / 2 + (p.y - .5) * 260;
        return <g key={i}><circle cx={x} cy={y - 10} r="8" fill={Y} /><path d={`M${x - 11} ${y + 12} Q${x} ${y - 6} ${x + 11} ${y + 12} Z`} fill={Y} /></g>; })}
      {CARS.slice(0, free).map((c, i) => { const inner = i < 6; const sx = inner ? w / 2 + (c.x - .5) * 300 : (c.fx < .5 ? -40 : w + 40), sy = inner ? h / 2 + (c.y - .5) * 280 : c.fy * h;
        const tx = w / 2 + (c.x - .5) * 300, ty = h / 2 + (c.y - .5) * 280; const k = inner ? 1 : come;
        const x = lerp(sx, tx, k), y = lerp(sy, ty, k);
        return <g key={i}><rect x={x - 16} y={y - 10} width="32" height="20" rx="6" fill={GRN} /><rect x={x - 8} y={y - 16} width="16" height="8" rx="3" fill={GRN} /></g>; })}
    </svg>
    <div style={{ position: 'absolute', left: 20, bottom: 16, fontFamily: MONO, fontSize: 22, color: Y }}>● buyurtma: {Math.max(0, ppl)}</div>
    <div style={{ position: 'absolute', right: 20, bottom: 16, fontFamily: MONO, fontSize: 22, color: GRN }}>■ bo‘sh mashina: {free}</div>
  </Card>;
};
const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.3, 43.3, .15, .3);
  const aA = env(t, 26.3, T.ilova - .05, .1, .3), aB = env(t, T.ilova - .2, 43.3, .3, .3);
  const up = eio(P(t, T.koef - .2, T.oshadi + .3)), down = eio(P(t, T.yetarli, T.tushadi + .2));
  const k = 1 + .8 * up - .8 * down;
  const col = k > 1.5 ? RED : k > 1.15 ? ORG : GRN;
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={900} r={560} a={1} col="236,58,44" />
      <Head t={t} t0={26.3} t1={T.ilova - .05} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
    </Layer>
    <Layer a={aB}>
      <Glow x={CX} y={950} r={540} a={.8} col={k > 1.5 ? '236,58,44' : '61,220,132'} />
      <Map t={t} />
      <Card x={CX - 230} y={1180} w={460} a={eout(P(t, T.koef - .3, T.koef + .1))}>
        <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: MONO, fontSize: 22, color: GR }}>koeffitsiyent</span>
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: col }}>×{k.toFixed(1).replace('.', ',')}</span>
        </div>
      </Card>
      <Src s="misol · narx mexanizmi: Yandex Go izohi (uzdaily.uz, spot.uz)" y={1340} a={eout(P(t, T.koef, T.koef + .4))} />
      <Head t={t} t0={T.ilova - .2} t1={T.hamma - .1} y={490} lines={[['buyurtmalar'], ['vs bo‘sh mashinalar', 'y']]} size={58} />
      <Head t={t} t0={T.hamma - .1} t1={T.yuqori - .1} y={490} lines={[['hamma chaqirdi —'], ['narx oshdi', 'r']]} size={60} from="slam" />
      <Head t={t} t0={T.yuqori - .1} t1={T.mashinalar - .1} y={490} lines={[['yuqori narx'], ['haydovchini chaqiradi', 'y']]} size={56} />
      <Head t={t} t0={T.mashinalar - .1} t1={43.3} y={490} lines={[['mashina yetarli —'], ['narx tushadi', 'g']]} size={58} />
    </Layer>
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 43.2, 47.9, .3, .3);
  const m = t < T.tort - .1 ? 3 * eio(P(t, T.uch3 - .4, T.uch3 + .2)) : 4;
  return <Layer a={a} z={logZ(P(t, 43.2, 47.9), 1, 1.05)}>
    <Glow x={CX} y={950} r={520} a={.9} col="236,58,44" />
    <Rain t={t} a={1} />
    <Num v={`×${Math.max(1, Math.round(m))}`} y={720} a={eout(P(t, T.uch3 - .4, T.uch3))} size={260} col={t > T.tort - .1 ? RED : ORG} />
    <div style={{ ...abs(CX - 210, 1060) }}><Taxi w={420} id="r4" wheel={t * 100} /></div>
    <Stamp s="ba’zan ×4" y={1300} t={t} t0={T.tort} t1={47.9} col={RED} size={56} />
    <Src s="anhor.uz · 14.10.2024 · yomg‘irli kun, Toshkent" y={1385} a={eout(P(t, T.uch3, T.uch3 + .4))} />
    <Head t={t} t0={43.2} t1={47.9} y={490} lines={[['yomg‘irda'], ['3–4 barobar', 'r']]} size={70} />
  </Layer>;
};

const TIPS: [string, string, keyof typeof T][] = [['rang qizil — bir necha daqiqa kuting', '⏱', 'kuting'], ['soat boshidan biroz oldin yoki keyin', '🕐', 'oldin'], ['tariflarni solishtiring', '⇄', 'tarif']];
const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 47.8, 57.8, .3, .3);
  const c = t < T.sariq ? GRN : t < T.qizil ? ORG : RED;
  return <Layer a={a} z={logZ(P(t, 47.8, 57.8), 1, 1.03)}>
    <Glow x={CX} y={950} r={520} a={.85} col="61,220,132" />
    <div style={{ ...abs(SL + 20, 690), fontSize: 15 }}>
      <Phone w={230} glow={.4} id="p5">
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#141a26,#0a0d14)', fontFamily: SANS, color: WH }}>
          <div style={{ position: 'absolute', top: '14%', width: '100%', textAlign: 'center', fontWeight: 800, fontSize: '1.4em' }}>Talab</div>
          <div style={{ position: 'absolute', top: '26%', left: '12%', width: '76%', height: '12%', borderRadius: 16, background: c, boxShadow: `0 0 30px ${c}` }} />
          <div style={{ position: 'absolute', top: '44%', width: '100%', textAlign: 'center', fontFamily: MONO, fontSize: '1em', color: GR }}>{t < T.sariq ? 'odatiy' : t < T.qizil ? 'yuqori' : 'juda yuqori'}</div>
        </div>
      </Phone>
    </div>
    {TIPS.map(([s, ic, k], i) => { const on = eout(P(t, T[k] - .5, T[k] - .1));
      return <Card key={i} x={330} y={700 + i * 170} w={600} a={on} style={{ translate: `${(1 - on) * 50}px 0` }}>
        <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: GRN, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 36, color: '#06210f' }}>{i + 1}</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: WH, lineHeight: 1.2 }}>{s}</div>
        </div>
      </Card>; })}
    <Src s="Yandex Go maslahatlari · uzdaily.uz · 2024" y={1250} a={eout(P(t, T.kuting, T.kuting + .4))} />
    <Head t={t} t0={47.8} t1={57.8} y={490} lines={[['qanday'], ['tejash mumkin?', 'g']]} size={66} />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 57.7, END + 1, .3, .1);
  const aA = env(t, 57.7, T.buni - .05, .3, .3);
  return <Layer a={a}>
    <Layer a={aA}>
      <Glow x={CX} y={950} r={520} a={.85} />
      <div style={{ ...abs(CX - 75, 720) }}><Avatar n="Qaynona" c="#ffb3c1" sel={eout(P(t, T.qaynona, T.qaynona + .3))} /></div>
      <Pill s="to‘y · 18:00" x={CX} y={980} a={eout(P(t, T.toy - .1, T.toy + .3))} size={34} />
      <div style={{ ...abs(CX - 200, 1090) }}><Taxi w={400} id="e6" wheel={t * 200} /></div>
      <Stamp s="oldinroq chaqiring" y={1330} t={t} t0={T.oldinroq} t1={T.buni} col={GRN} size={48} />
      <Head t={t} t0={57.7} t1={T.buni} y={490} lines={[['to‘yga'], ['kechikmang', 'y']]} size={70} />
    </Layer>
    <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} />
  </Layer>;
};

const HITS: [number, number, number][] = [[T.qimmat, 10, 6], [T.uch, 10, 6], [T.n4600, 6, 7], [T.n1050, 6, 7], [T.n500, 6, 7], [T.tirband, 10, 6], [T.endi, 20, 5], [T.oshadi, 12, 6], [T.uch3, 14, 5], [T.tort, 12, 6], [T.oldinroq, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1150} r={560} a={1} col="236,58,44" />
    <Rain t={t} a={.8} />
    <Road t={0} y={1200} />
    <div style={{ ...abs(CX - 250 + 40, 1170) }}><Taxi w={500} id="cv" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>km · daqiqa · koeffitsiyent</div>
    <div style={{ ...abs(SL, 455, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>TAKSI NEGA<br />QIMMATLASHADI?</div>
    <div style={{ ...abs(SL, 820, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 170, color: RED, textShadow: '0 0 40px rgba(236,58,44,.5)' }}>×3</div>
    <div style={{ ...abs(SL, 1480, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 60, lineHeight: 1.1, color: GRN }}>3 TA YO‘L BILAN TEJANG</div>
  </AbsoluteFill>;
};
