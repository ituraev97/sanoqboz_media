import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CX, SL, SR, Y, WH, GR, GRN, RED, ICE, BLUE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp, rnd } from '../lib';
import { Lockup } from '../Art';
import { abs, Layer, logZ, yel, Head, Pill, Glow, Stamp, Num, Card, Src, fmt, ShareEnd, Background, Reel } from '../kit';
import { END, T } from './ep';

/* ---------- topic art (generic, no real logos) ---------- */
const Screen: React.FC<{ w: number; t: number; id: string; ai?: number }> = ({ w, t, id, ai = 1 }) => (
  <svg width={w} height={w * .7} viewBox="0 0 300 210" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id={`sc${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a3550" /><stop offset="1" stopColor="#11151f" /></linearGradient></defs>
    <rect x="0" y="0" width="300" height="180" rx="14" fill="#1d2230" stroke="#4a5266" strokeWidth="4" />
    <rect x="10" y="10" width="280" height="160" rx="8" fill={`url(#sc${id})`} />
    <path d="M130 64 L130 116 L176 90 Z" fill="#F3F5F8" opacity=".9" />
    <rect x="20" y="150" width="260" height="6" rx="3" fill="#3a4458" /><rect x="20" y="150" width={260 * ((t * .2) % 1)} height="6" rx="3" fill="#EC3A2C" />
    <rect x="120" y="180" width="60" height="16" fill="#4a5266" /><rect x="90" y="196" width="120" height="10" rx="5" fill="#4a5266" />
    {ai > 0 && <g opacity={ai}><rect x="222" y="18" width="58" height="34" rx="10" fill="#FFCF3A" /><text x="251" y="43" textAnchor="middle" fontFamily="Osw, sans-serif" fontWeight="700" fontSize="24" fill="#1A1306">AI</text></g>}
  </svg>
);
const Thumb: React.FC<{ w: number }> = ({ w }) => (
  <div style={{ width: w, height: w * .56, borderRadius: 10, background: 'linear-gradient(135deg,#3a4458,#1d2230)', border: '2px solid rgba(255,255,255,.15)', display: 'grid', placeItems: 'center', position: 'relative' }}>
    <div style={{ width: 0, height: 0, borderLeft: `${w * .14}px solid #F3F5F8`, borderTop: `${w * .09}px solid transparent`, borderBottom: `${w * .09}px solid transparent`, opacity: .8 }} />
    <div style={{ position: 'absolute', right: 6, top: 6, padding: '1px 6px', borderRadius: 6, background: Y, fontFamily: HEAD, fontWeight: 700, fontSize: w * .1, color: '#1A1306' }}>AI</div>
  </div>
);
const Bulb: React.FC<{ w: number; on: number }> = ({ w, on }) => (
  <svg width={w} height={w * 1.3} viewBox="0 0 100 130" style={{ display: 'block', overflow: 'visible' }}>
    {on > 0 && <circle cx="50" cy="45" r={48 + 6 * on} fill="#FFCF3A" opacity={.18 * on} />}
    <path d="M50 5 Q88 5 88 45 Q88 66 70 80 L70 96 L30 96 L30 80 Q12 66 12 45 Q12 5 50 5 Z" fill={on > .5 ? '#FFCF3A' : '#3a4458'} stroke="#F3F5F8" strokeWidth="3" />
    <rect x="32" y="98" width="36" height="8" rx="3" fill="#9aa3b2" /><rect x="34" y="108" width="32" height="8" rx="3" fill="#9aa3b2" /><rect x="40" y="118" width="20" height="8" rx="4" fill="#7d8698" />
  </svg>
);
const Row: React.FC<{ a: number; l: string; sub: string; v: string; col?: string }> = ({ a, l, sub, v, col = WH }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: a, padding: '16px 0', borderBottom: '1.5px dashed rgba(255,255,255,.15)' }}>
    <div><div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: WH }}>{l}</div><div style={{ fontFamily: MONO, fontSize: 20, color: GR, marginTop: 4 }}>{sub}</div></div>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: col }}>{v}</div>
  </div>
);

/* ---------- scenes ---------- */
const S1: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, -1, 3.35, .2, .3);
  const q = eback(P(t, T.qancha - .3, T.qancha + .3));
  return <Layer a={a} z={logZ(P(t, -1, 3.35), 1, 1.05)}>
    <Glow x={CX} y={1000} r={520} a={.9} />
    <div style={{ ...abs(CX - 260, 760) }}><Screen w={520} t={t} id="a" /></div>
    <div style={{ ...abs(CX + 150, 1080), scale: String(clamp(q, 0, 1.2)), opacity: clamp(q), fontFamily: HEAD, fontWeight: 700, fontSize: 150, ...yel }}>?</div>
    <Pill s="matn · ovoz · video" x={CX} y={1260} a={eout(P(t, T.video - .2, T.video + .2))} size={30} col={Y} />
    <Head t={t} t0={-1} t1={3.35} y={490} lines={[['ai bilan 1 video'], ['qancha turadi?', 'y']]} size={84} />
  </Layer>;
};

const S2: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 3.3, 9.35, .3, .3);
  const c = eout(P(t, T.matn - .3, T.matn + .2));
  return <Layer a={a} z={logZ(P(t, 3.3, 9.35), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.8} col="91,140,255" />
    <Card x={SL + 30} y={740 + (1 - c) * 60} w={SR - SL - 60} a={c} style={{ padding: '18px 34px' }}>
      <div style={{ fontFamily: MONO, fontSize: 22, color: GR, textAlign: 'center' }}>— oylik obunalar —</div>
      <Row a={eout(P(t, T.chatbot - .2, T.chatbot + .3))} l="✍️ matn: chatbot" sub="ChatGPT Plus · AQSh narxi" v={eout(P(t, T.d20 - .2, T.d20)) > 0 ? '$20' : ''} />
      <Row a={eout(P(t, T.ovoz - .2, T.ovoz + .3))} l="🎙 ovoz: ElevenLabs" sub="Creator · 121 000 kredit" v={eout(P(t, T.d22 - .2, T.d22)) > 0 ? '$22' : ''} />
    </Card>
    <Src s="narxlar: lenz.io, eesel.ai · 2026" y={1270} a={eout(P(t, T.d20, T.d20 + .4))} />
    <Head t={t} t0={3.3} t1={9.35} y={490} lines={[['obunalar'], ['oyiga', 'y']]} size={96} />
  </Layer>;
};

const S3: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 9.3, 16.45, .3, .3);
  const tot = eout(P(t, T.d42 - .3, T.d42 + .2)), som = eio(P(t, T.s500 - .5, T.s500 + .4));
  const div = eout(P(t, T.v30 - .3, T.v30 + .2)), one = eio(P(t, T.s17 - .4, T.s17 + .4));
  return <Layer a={a} z={logZ(P(t, 9.3, 16.45), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="61,220,132" />
    <Num v="$42" y={760} a={tot} size={110} col={WH} />
    <Num v={`≈ ${fmt(500000 * som)} so‘m`} y={885} a={eout(P(t, T.s500 - .5, T.s500 - .2))} size={70} />
    <Pill s="÷ 30 ta video" x={CX} y={1010} a={div} size={34} col={ICE} dark />
    <Card x={SL + 90} y={1070} w={SR - SL - 180} a={eout(P(t, T.s17 - .45, T.s17 - .2))} style={{ padding: 20, textAlign: 'center', border: `2px solid ${GRN}` }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: GR }}>bitta video · taxminan</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 84, color: GRN }}><span style={{ display: 'inline-block', scale: String(lerp(.8, 1, eback(one))) }}>≈ 17 000 so‘m</span></div>
    </Card>
    <Src s="1 $ = 11 974 so‘m (MB, 11.11.2026) · hisob · montaj va vaqt hisobga olinmagan" y={1330} a={eout(P(t, T.s500, T.s500 + .4))} />
    <Head t={t} t0={9.3} t1={16.45} y={490} lines={[['jami'], ['oyiga qancha?', 'y']]} size={96} />
  </Layer>;
};

const S4: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 16.4, 20.25, .3, .25);
  const b = eback(P(t, T.bu - .3, T.bu + .2));
  return <Layer a={a} z={logZ(P(t, 16.4, 20.25), 1, 1.04)}>
    <Glow x={CX} y={980} r={520} a={.85} />
    <div style={{ ...abs(SL + 60, 760), fontSize: 120 }}>🙎‍♀️</div>
    <Card x={SL + 230} y={760} w={420} a={eout(P(t, T.xotin - .2, T.xotin + .2))} style={{ padding: 22, borderRadius: '26px 26px 26px 4px' }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: WH }}>Bu yana nima puli? 🤨</div>
    </Card>
    <div style={{ ...abs(SR - 180, 990), fontSize: 120 }}>🙋‍♂️</div>
    <Card x={SL + 40} y={1000} w={500} a={clamp(b)} style={{ padding: 22, borderRadius: '26px 26px 4px 26px', border: `2px solid ${Y}`, scale: String(clamp(b, 0, 1.1)) }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 32, color: Y }}>«Bu xarajat emas, investitsiya!» 😎</div>
    </Card>
    <Head t={t} t0={16.4} t1={20.25} y={490} lines={[['xotiningiz'], ['so‘rasa', 'y']]} size={96} />
  </Layer>;
};

const S5: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 20.2, 21.4, .12, .25);
  return <Layer a={a}>
    <Glow x={CX} y={900} r={560} a={1} />
    <Head t={t} t0={20.2} t1={21.4} y={700} lines={[['endi'], ['qiziq'], ['joyi', 'y']]} size={130} from="slam" />
  </Layer>;
};

const S6: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 21.35, 31.45, .25, .3);
  const n = eio(P(t, T.arzon, T.hamma + .6));
  const rule = eout(P(t, T.youtube - .2, T.youtube + .3));
  const x = eout(P(t, T.reklama - .2, T.reklama + .2));
  const R = rnd(4);
  return <Layer a={a} z={logZ(P(t, 21.35, 31.45), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="236,58,44" />
    <div style={{ ...abs(SL + 10, 750, SR - SL - 20), display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, opacity: 1 - rule * .7 }}>
      {Array.from({ length: 20 }).map((_, i) => { const s = clamp(n * 20 - i); return <div key={i} style={{ opacity: s, scale: String(lerp(.5, 1, eback(s))), rotate: `${(R() - .5) * 6}deg` }}><Thumb w={150} /></div>; })}
    </div>
    <Card x={SL + 70} y={1060} w={SR - SL - 140} a={rule} style={{ padding: 22, textAlign: 'center', border: `2px solid ${RED}` }}>
      <div style={{ fontFamily: MONO, fontSize: 24, color: GR }}>YouTube · 15-iyul, 2025</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, marginTop: 6, opacity: eout(P(t, T.birxil - .2, T.birxil + .3)) }}>bir xil, ommaviy ishlab chiqarilgan</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 56, color: RED, marginTop: 4, opacity: x }}>reklama puli yo‘q ✗</div>
    </Card>
    <Src s="YouTube YPP «inauthentic content» yangilanishi · Search Engine Journal" y={1350} a={eout(P(t, T.kuch, T.kuch + .4))} />
    <Head t={t} t0={21.35} t1={T.youtube - .1} y={490} lines={[['arzon —'], ['hamma qilyapti', 'y']]} size={88} />
    <Head t={t} t0={T.youtube - .1} t1={31.45} y={490} lines={[['youtube qoidani'], ['kuchaytirdi', 'r']]} size={80} from="slam" />
  </Layer>;
};

const S7: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 31.4, 37.0, .3, .3);
  const ok = eout(P(t, T.sun - .2, T.sun + .3));
  const tg = eio(P(t, T.belgilash - .3, T.belgilash + .3));
  return <Layer a={a} z={logZ(P(t, 31.4, 37.0), 1, 1.03)}>
    <Glow x={CX} y={980} r={540} a={.85} col="61,220,132" />
    <div style={{ ...abs(CX - 200, 860), opacity: 1 - eout(P(t, T.lekin - .3, T.lekin + .1)) }}><Screen w={400} t={t} id="s7" /></div>
    <Pill s="AI ishlatish taqiqlanmagan ✓" x={CX} y={760} a={ok} size={36} col={GRN} />
    <Card x={SL + 40} y={860} w={SR - SL - 80} a={eout(P(t, T.lekin - .2, T.lekin + .3))} style={{ padding: '24px 30px' }}>
      <div style={{ fontFamily: MONO, fontSize: 22, color: GR }}>video yuklash · sozlamalar</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, width: 520 }}>Haqiqiydek ko‘rinadigan sun’iy (AI) kontent bor</div>
        <div style={{ width: 120, height: 64, borderRadius: 32, background: tg > .5 ? GRN : '#3a4458', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 6, left: lerp(6, 62, tg), width: 52, height: 52, borderRadius: 26, background: WH }} />
        </div>
      </div>
    </Card>
    <Stamp s="BELGILASH SHART" x={CX} y={1240} t={t} t0={T.belgilash} t1={37.0} col={Y} size={56} rot={-4} />
    <Src s="YouTube: realistik o‘zgartirilgan yoki sintetik kontentni oshkor qilish talab qilinadi" y={1340} a={eout(P(t, T.belgilash, T.belgilash + .4))} />
    <Head t={t} t0={31.4} t1={37.0} y={490} lines={[['ai — mumkin'], ['lekin belgilang', 'g']]} size={88} />
  </Layer>;
};

const S8: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, 36.95, T.buni + .1, .3, .3);
  const d = eout(P(t, T.dastur - .2, T.dastur + .2)), g = eout(P(t, T.goya - .2, T.goya + .3));
  return <Layer a={a} z={logZ(P(t, 36.95, 41.6), 1, 1.03)}>
    <Glow x={CX} y={960} r={540} a={.85} />
    <div style={{ ...abs(SL + 40, 780), opacity: d * (1 - g * .6) }}><Screen w={300} t={t} id="b" /></div>
    <div style={{ ...abs(SL + 120, 1010), fontFamily: SANS, fontWeight: 800, fontSize: 30, color: GR, opacity: d }}>dastur</div>
    <div style={{ ...abs(SR - 250, 740), scale: String(lerp(.8, 1.1, g)) }}><Bulb w={190} on={g} /></div>
    <div style={{ ...abs(SR - 225, 1010), fontFamily: SANS, fontWeight: 800, fontSize: 34, color: Y, opacity: g }}>g‘oya ✓</div>
    <Stamp s="DAROMAD KAFOLAT EMAS" x={CX} y={1200} t={t} t0={T.kafolat} t1={T.buni + .1} col={RED} size={50} rot={-4} />
    <Head t={t} t0={36.95} t1={T.buni + .1} y={490} lines={[['pulni'], ['g‘oya topadi', 'y']]} size={96} />
  </Layer>;
};

const S9: React.FC<{ t: number }> = ({ t }) => <ShareEnd t={t} t0={T.buni} pick={T.dost} sentAt={T.yub} lines={[['kanal ochmoqchi'], ['do‘stga yuboring', 'y']]} />;

const HITS: [number, number, number][] = [[T.d20, 8, 7], [T.d22, 8, 7], [T.d42, 10, 6], [T.s17, 10, 6], [T.invest, 6, 7], [T.endi, 20, 5], [T.youtube, 10, 6], [T.reklama, 12, 6], [T.belgilash, 10, 6], [T.kafolat, 10, 6]];

export const Video: React.FC = () => <Reel scenes={[S1, S2, S3, S4, S5, S6, S7, S8, S9]} hits={HITS} />;

export const Cover: React.FC = () => {
  const t = 1.0;
  return <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
    <Background t={t} />
    <Glow x={CX + 40} y={1040} r={600} a={1} />
    <div style={{ ...abs(CX + 40 - 290, 820) }}><Screen w={580} t={1.5} id="cv" /></div>
    <div style={{ ...abs(SL, 300, SR - SL + 60), display: 'flex', justifyContent: 'center' }}><Lockup h={70} /></div>
    <div style={{ ...abs(SL, 400, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 34, color: GR }}>internetda pul · ai</div>
    <div style={{ ...abs(SL, 450, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1.02, ...yel }}>AI VIDEO<br />QANCHA TURADI?</div>
    <div style={{ ...abs(SL, 1330, SR - SL + 60), textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58, lineHeight: 1.15, color: GRN }}>≈ 17 000 SO‘M / VIDEO<br /><span style={{ color: RED }}>LEKIN BIR SHART BOR</span></div>
    <div style={{ ...abs(SL, 1490, SR - SL + 60), textAlign: 'center', fontFamily: MONO, fontSize: 26, color: GR }}>obunalar narxi · MB kursi · 2026</div>
  </AbsoluteFill>;
};
