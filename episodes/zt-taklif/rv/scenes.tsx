import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, TEAL, GRN, RED, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, Background, Reel, ZtEnd } from '../kit';

/* ---------- small art ---------- */
const Shield: React.FC<{ s: number; col?: string }> = ({ s, col = TEAL }) =>
  <svg width={s} height={s} viewBox="0 0 64 64"><path d="M32 4 9 13v17c0 15 10 24 23 30 13-6 23-15 23-30V13z" fill={col} /><path d="M21 32l8 8 15-16" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Ring: React.FC<{ x: number; y: number; r: number; p: number; col: string; w?: number; children?: React.ReactNode }> = ({ x, y, r, p, col, w = 22, children }) => {
  const C = 2 * Math.PI * r;
  return <div style={{ position: 'absolute', left: x - r - w, top: y - r - w, width: 2 * (r + w), height: 2 * (r + w) }}>
    <svg width={2 * (r + w)} height={2 * (r + w)} style={{ position: 'absolute' }}>
      <circle cx={r + w} cy={r + w} r={r} stroke="rgba(255,255,255,.1)" strokeWidth={w} fill="rgba(14,16,22,.9)" />
      <circle cx={r + w} cy={r + w} r={r} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform={`rotate(-90 ${r + w} ${r + w})`} style={{ filter: `drop-shadow(0 0 12px ${col})` }} />
    </svg>
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>{children}</div>
  </div>;
};
const Coin: React.FC<{ x: number; y: number; s: number; a: number; txt?: string }> = ({ x, y, s, a, txt = 'so‘m' }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', width: s, height: s, borderRadius: '50%', opacity: clamp(a * 1.5), background: `radial-gradient(circle at 35% 30%, #FFE09A, ${Y} 60%, #c9962a)`, boxShadow: '0 8px 24px rgba(0,0,0,.5), inset 0 -4px 0 rgba(0,0,0,.15)', display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: s * .28, color: '#3b2a06' }}>{txt}</div>;

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 4.3, .2, .25);
  const cut = eio(P(t, 1.8, 2.6));
  const v = lerp(200000, 170000, eout(P(t, 2.6, 3.4)));
  return <Layer a={a} z={logZ(P(t, 0, 4.3), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.9} col={t > 2.6 ? '236,58,44' : '247,198,75'} />
    <Card x={SL + 60} y={760} w={SR - SL - 120} a={eout(P(t, .3, .8))} style={{ scale: String(lerp(.85, 1, eback(P(t, .3, .9)))) }}>
      <div style={{ padding: '30px 36px' }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>Yandex bonusi · haftalik</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 110, lineHeight: 1.05, color: t > 2.6 ? RED : Y, marginTop: 8 }}>+{fmt(v)}</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 30, color: WH }}>so‘m sizga</div>
      </div>
    </Card>
    {/* slice flying to "park" */}
    {cut > 0 && <div style={{ position: 'absolute', left: lerp(CX + 150, CX + 250, cut), top: lerp(860, 1200, cut), translate: '-50% -50%', rotate: `${cut * 18}deg`, padding: '14px 26px', borderRadius: 18, background: RED, color: '#fff', fontFamily: HEAD, fontWeight: 700, fontSize: 60, opacity: 1 - .3 * cut, boxShadow: '0 12px 40px rgba(236,58,44,.5)' }}>−%</div>}
    <Pill s="parkka" x={CX + 250} y={1290} a={eout(P(t, 2.2, 2.6))} size={30} dark col={RED} />
    <Pill s="misol" x={CX - 250} y={1290} a={eout(P(t, 1, 1.3))} size={22} dark col={GR} />
    <Head t={t} t0={-1} t1={4.3} y={480} lines={[['bonusdan parkga'], ['foiz berib'], ['charchadingizmi?', 'y']]} size={64} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 4.15, 8.3, .1, .3);
  return <Layer a={a} z={logZ(P(t, 4.15, 8.3), 1, 1.05)}>
    <Glow x={CX} y={980} r={620} a={1} col="61,220,132" />
    <Num v="0%" y={760} a={eout(P(t, 4.15, 4.4))} size={330} col={GRN} />
    <div style={{ ...abs(SL, 1120, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 48, color: WH, opacity: eout(P(t, 4.8, 5.2)) }}>YANDEX BONUSLARIDAN</div>
    <Stamp s="DOIMIY" y={1260} t={t} t0={6.3} t1={8.3} col={GRN} size={66} />
    <Head t={t} t0={4.15} t1={8.3} y={480} lines={[['zero taxi’da'], ['hech narsa ushlamaymiz', 'g']]} size={62} from="slam" />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 8.2, 12.7, .3, .3);
  const fill = eio(P(t, 9.4, 11));
  const fly = eio(P(t, 11.1, 11.8));
  return <Layer a={a} z={logZ(P(t, 8.2, 12.6), 1, 1.04)}>
    <Glow x={CX} y={950} r={520} a={.85} />
    <Card x={SL + 40} y={690} w={SR - SL - 80} a={eout(P(t, 8.3, 8.8))} style={{ background: 'linear-gradient(180deg,#232323,#161616)' }}>
      <div style={{ padding: '30px 34px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 44, color: WH }}>40 ta buyurtma</div><div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 26, color: GR, marginTop: 4 }}>haftalik maqsad</div></div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: '#9DB4FF', fontStyle: 'italic' }}>+200 000</div>
        </div>
        <div style={{ marginTop: 26, height: 22, borderRadius: 11, background: '#3a3a3a', overflow: 'hidden' }}><div style={{ width: `${fill * 100}%`, height: '100%', background: `linear-gradient(90deg, ${TEAL}, ${GRN})` }} /></div>
        <div style={{ marginTop: 10, fontFamily: MONO, fontSize: 24, color: fill >= 1 ? GRN : GR }}>{Math.round(fill * 40)}/40</div>
      </div>
    </Card>
    {[0, 1, 2, 3, 4].map((i) => { const p = clamp(fly * 1.6 - i * .15); if (p <= 0 || p >= 1) return null;
      return <Coin key={i} x={lerp(CX + 200 - i * 30, CX, p)} y={lerp(780, 1170, p) - Math.sin(p * Math.PI) * 120} s={70} a={1} />; })}
    <div style={{ ...abs(SL, 1110, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, 11.5, 11.9)), scale: String(lerp(.7, 1, eback(P(t, 11.5, 12)))) }}>
      <div style={{ padding: '18px 40px', borderRadius: 26, background: 'rgba(14,16,22,.95)', border: `3px solid ${GRN}`, textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>sizga</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 80, color: GRN, lineHeight: 1 }}>200 000 so‘m</div>
      </div>
    </div>
    <Src s="misol: Yandex Pro ilovasidagi haftalik maqsad" y={1370} a={eout(P(t, 8.8, 9.2))} />
    <Head t={t} t0={8.2} t1={12.7} y={480} lines={[['yandex qancha bersa —'], ['hammasi sizniki', 'y']]} size={64} />
  </Layer>;
};

const P1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 12.6, 16.1, .3, .3);
  const p = P(t, 13.2, 14.3); const sec = Math.max(0, 5 - Math.floor(p * 5));
  return <Layer a={a} z={logZ(P(t, 12.6, 16), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.9} col="63,169,184" />
    <Ring x={CX} y={930} r={190} p={1 - p} col={p >= 1 ? GRN : TEAL}>
      <div><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 170, lineHeight: 1, color: p >= 1 ? GRN : Y }}>{sec}</div><div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>soniya</div></div>
    </Ring>
    <Pill s="bepul" x={CX - 230} y={1260} a={eout(P(t, 14.3, 14.6))} size={34} col={GRN} />
    <Pill s="5 soniya" x={CX} y={1260} a={eout(P(t, 14.5, 14.8))} size={34} col={GRN} />
    <Pill s="24/7" x={CX + 215} y={1260} a={eout(P(t, 14.7, 15))} size={34} col={GRN} />
    <Head t={t} t0={12.6} t1={16.1} y={480} lines={[['pul yechish'], ['bepul, 5 soniyada', 'y']]} size={66} />
  </Layer>;
};

const P2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 16, 19.9, .3, .3);
  const row = (y: number, t0: number, l: string, r: string) => {
    const k = eout(P(t, t0, t0 + .35));
    return <Card x={SL + 40} y={y} w={SR - SL - 80} a={k} style={{ translate: `${(1 - k) * -80}px 0` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '24px 30px' }}>
        <Coin x={0} y={0} s={0} a={0} />
        <div style={{ width: 76, height: 76, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #FFE09A, ${Y} 60%, #c9962a)`, flex: 'none' }} />
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34, color: WH, flex: 1, lineHeight: 1.15 }}>{l}</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 58, color: Y }}>{r}</div>
      </div>
    </Card>;
  };
  return <Layer a={a} z={logZ(P(t, 16, 19.8), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.9} />
    {row(720, 16.5, 'Ulanishda', '+10 000')}
    {row(900, 17.5, '2 kunda 10 ta buyurtma', '+20 000')}
    <div style={{ ...abs(SL, 1110, SR - SL), textAlign: 'center', opacity: eout(P(t, 18.4, 18.8)), scale: String(lerp(.7, 1, eback(P(t, 18.4, 18.9)))) }}>
      <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>jami</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 110, lineHeight: 1, color: GRN, textShadow: '0 0 30px rgba(61,220,132,.5)' }}>30 000 so‘m</div>
    </div>
    <Head t={t} t0={16} t1={19.9} y={480} lines={[['yangi haydovchiga'], ['bonus', 'y']]} size={68} />
  </Layer>;
};

const P3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 19.8, 23.3, .3, .3);
  const p = eio(P(t, 20.2, 21.3));
  return <Layer a={a} z={logZ(P(t, 19.8, 23.2), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.9} col={p >= 1 ? '61,220,132' : '63,169,184'} />
    <Ring x={CX} y={920} r={180} p={p} col={p >= 1 ? GRN : TEAL}>
      <div><Shield s={130} col={p >= 1 ? GRN : TEAL} /><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: WH }}>{Math.round(p * 30)}/30</div></div>
    </Ring>
    <Stamp s="3 OY BEPUL" y={1230} t={t} t0={21.4} t1={23.3} col={GRN} size={60} />
    <Head t={t} t0={19.8} t1={23.3} y={480} lines={[['30 ta buyurtma —'], ['osgop bepul', 'g']]} size={66} />
  </Layer>;
};

const P4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 23.2, 26.7, .3, .3);
  const p = eio(P(t, 23.6, 24.8));
  const off = eout(P(t, 25, 25.3));
  return <Layer a={a} z={logZ(P(t, 23.2, 26.6), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.9} col="63,169,184" />
    <Ring x={CX} y={900} r={170} p={p * .25} col={Y}>
      <div><div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 130, lineHeight: 1, color: Y }}>{Math.round(p * 15)}</div><div style={{ fontFamily: MONO, fontSize: 26, color: GR }}>daqiqa</div></div>
    </Ring>
    <div style={{ ...abs(SL, 1170, SR - SL), display: 'flex', justifyContent: 'center', opacity: off, scale: String(lerp(.7, 1, eback(off))) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '16px 30px', borderRadius: 22, background: 'rgba(14,16,22,.95)', border: `2px solid ${RED}` }}>
        <svg width="56" height="56" viewBox="0 0 64 64"><path d="M10 56V14l22-8 22 8v42z M22 22h6 M36 22h6 M22 34h6 M36 34h6 M28 56V44h8v12" fill="none" stroke={WH} strokeWidth="4" strokeLinejoin="round" /><path d="M6 6l52 52" stroke={RED} strokeWidth="6" strokeLinecap="round" /></svg>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34, color: WH }}>ofisga borish shart emas</div>
      </div>
    </div>
    <Head t={t} t0={23.2} t1={26.7} y={480} lines={[['ulanish'], ['15 daqiqa', 'y']]} size={72} />
  </Layer>;
};

const P5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 26.6, 30.1, .3, .3);
  const b = (y: number, t0: number, lang: string, txt: string, right: boolean) => {
    const k = eout(P(t, t0, t0 + .35)); if (k <= 0) return null;
    return <div style={{ position: 'absolute', top: y, [right ? 'right' : 'left']: right ? 1080 - SR + 30 : SL + 30, maxWidth: 640, opacity: k, translate: `0 ${(1 - k) * 30}px`, scale: String(lerp(.85, 1, eback(k))), padding: '22px 30px', borderRadius: right ? '30px 30px 8px 30px' : '30px 30px 30px 8px', background: right ? TEAL : '#262b33' } as React.CSSProperties}>
      <div style={{ fontFamily: MONO, fontSize: 20, color: right ? '#0b2a2e' : GR }}>{lang}</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: right ? '#06191b' : WH }}>{txt}</div>
    </div>;
  };
  return <Layer a={a} z={logZ(P(t, 26.6, 30), 1, 1.04)}>
    <Glow x={CX} y={960} r={520} a={.9} col="63,169,184" />
    {b(700, 27, 'o‘zbekcha', 'Assalomu alaykum, yordam kerak', false)}
    {b(860, 27.8, 'o‘zbekcha', 'Albatta, hozir yordam beramiz', true)}
    {b(1020, 28.2, 'русский', 'Здравствуйте, вопрос по выводу', false)}
    {b(1180, 28.6, 'русский', 'Сейчас поможем', true)}
    <Head t={t} t0={26.6} t1={30.1} y={480} lines={[['yordam 24/7'], ['o‘zbek va rus tilida', 'y']]} size={62} />
  </Layer>;
};

const End: React.FC<{ t: number }> = ({ t }) => <ZtEnd t={t} t0={30.2}
  perks={['Yandex bonusidan 0% — doimiy', 'Pul yechish bepul · 5 soniya', '+30 000 so‘m bonus', 'Ulanish 15 daqiqa · OSGOP bepul']} />;

const HITS: [number, number, number][] = [[2.6, 8, 7], [4.15, 16, 5], [6.3, 8, 7], [11.6, 6, 7], [21.4, 8, 7]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, P1, P2, P3, P4, P5, End]} hits={HITS} />;

export const Cover: React.FC = () =>
  <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={1} />
    <Glow x={CX} y={1050} r={620} a={1} col="61,220,132" />
    <div style={{ ...abs(SL, 290, SR - SL), display: 'flex', justifyContent: 'center' }}><Lockup h={100} /></div>
    <div style={{ ...abs(SL, 450, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 32, color: GR }}>Yandex bonuslari · pul yechish · OSGOP</div>
    <div style={{ ...abs(SL, 520, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 100, lineHeight: 1.04, ...yel }}>BONUSDAN PARKGA<br />FOIZ BERMANG</div>
    <div style={{ position: 'absolute', left: CX, top: 820, translate: '-50% 0', fontFamily: HEAD, fontWeight: 800, fontSize: 380, lineHeight: 1, color: GRN, textShadow: '0 0 60px rgba(61,220,132,.5)' }}>0%</div>
    <div style={{ ...abs(SL, 1260, SR - SL), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 64, lineHeight: 1.1, color: WH }}>HAMMASI SIZNIKI</div>
  </AbsoluteFill>;
