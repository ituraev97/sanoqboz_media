import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/fonts';
import { W, H, FPS, CX, SL, SR, Y, YL, WH, GR, BLUE, TEAL, GRN, RED, ICE, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, rnd, clamp, shake } from './lib';
import { Logo, Lockup, Phone } from './Art';
import { CAPS } from './ep/caps';
import { END, CH, TOPIC, TINT } from './ep/ep';

loadFont({ family: 'Osw', url: staticFile('oswald-latin-700-normal.woff2'), weight: '700' });
loadFont({ family: 'Osw', url: staticFile('oswald-latin-600-normal.woff2'), weight: '600' });
loadFont({ family: 'Int', url: staticFile('inter-latin-800-normal.woff2'), weight: '800' });
loadFont({ family: 'Int', url: staticFile('inter-latin-700-normal.woff2'), weight: '700' });
loadFont({ family: 'Int', url: staticFile('inter-latin-500-normal.woff2'), weight: '500' });
loadFont({ family: 'JBM', url: staticFile('jetbrains-mono-latin-500-normal.woff2'), weight: '500' });
loadFont({ family: 'JBM', url: staticFile('jetbrains-mono-latin-700-normal.woff2'), weight: '700' });

/* ---------- primitives ---------- */
export const abs = (x: number, y: number, w?: number): React.CSSProperties => ({ position: 'absolute', left: x, top: y, width: w });
export const Layer: React.FC<{ a: number; children: React.ReactNode; z?: number; origin?: [number, number] }> = ({ a, children, z = 1, origin = [CX, 940] }) =>
  a <= 0.001 ? null : <div style={{ position: 'absolute', inset: 0, opacity: a, scale: String(z), transformOrigin: `${origin[0]}px ${origin[1]}px` }}>{children}</div>;
export const logZ = (p: number, a: number, b: number) => a * Math.pow(b / a, p);
export const yel: React.CSSProperties = { color: Y, textShadow: '0 0 30px rgba(246,185,59,.45), 0 4px 10px rgba(0,0,0,.8)' };
export const Head: React.FC<{ t: number; t0: number; t1: number; y: number; lines: [string, ('w' | 'y' | 'r' | 'g')?][]; size?: number; from?: 'up' | 'slam' }> = ({ t, t0, t1, y, lines, size = 76, from = 'up' }) => {
  const a = env(t, t0, t1, .22, .3); if (a <= 0) return null;
  const k = eout(P(t, t0, t0 + .45));
  const sc = from === 'slam' ? lerp(1.7, 1, eout(P(t, t0, t0 + .2))) : 1;
  return <div style={{ ...abs(SL, y + (from === 'up' ? (1 - k) * 40 : 0), SR - SL), textAlign: 'center', opacity: a, scale: String(sc) }}>
    {lines.map(([s, c = 'w'], i) => <div key={i} style={{ fontFamily: HEAD, fontWeight: 700, fontSize: size * 1.12, lineHeight: 1.04, letterSpacing: 0, textTransform: 'uppercase', ...(c === 'y' ? yel : c === 'r' ? { color: RED, textShadow: '0 0 26px rgba(255,90,95,.5)' } : c === 'g' ? { color: GRN, textShadow: '0 0 26px rgba(61,220,132,.5)' } : { color: WH, textShadow: '0 4px 16px rgba(0,0,0,.9)' }) }}>{s}</div>)}
  </div>;
};
export const Pill: React.FC<{ s: string; x: number; y: number; a: number; dark?: boolean; size?: number; col?: string }> = ({ s, x, y, a, dark, size = 26, col = Y }) =>
  a <= 0 ? null : <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: clamp(a), scale: String(lerp(.7, 1, eback(clamp(a)))), padding: '9px 22px', borderRadius: 30, background: dark ? 'rgba(14,16,22,.94)' : col, border: dark ? `2px solid ${col}` : 'none', color: dark ? col : '#1A1306', fontFamily: SANS, fontWeight: 800, fontSize: size, whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,.5)' }}>{s}</div>;
export const Glow: React.FC<{ x: number; y: number; r: number; a: number; col?: string }> = ({ x, y, r, a, col = '247,198,75' }) =>
  a <= 0 ? null : <div style={{ position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', opacity: a, background: `radial-gradient(circle, rgba(${col},.32) 0%, rgba(${col},0) 70%)` }} />;
export const Stamp: React.FC<{ s: string; x?: number; y: number; t: number; t0: number; t1: number; col?: string; size?: number; rot?: number }> = ({ s, x = CX, y, t, t0, t1, col = RED, size = 54, rot = -6 }) => {
  const a = env(t, t0, t1, .1, .25); if (a <= 0) return null;
  return <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', rotate: `${rot}deg`, scale: String(lerp(2, 1, eout(P(t, t0, t0 + .18)))), opacity: a, border: `5px solid ${col}`, borderRadius: 14, padding: '4px 26px', fontFamily: HEAD, fontWeight: 800, fontSize: size, color: col, whiteSpace: 'nowrap', background: 'rgba(8,9,13,.8)' }}>{s}</div>;
};
export const Num: React.FC<{ v: string; x?: number; y: number; a: number; size?: number; col?: string }> = ({ v, x = CX, y, a, size = 150, col = Y }) =>
  a <= 0 ? null : <div style={{ position: 'absolute', left: x, top: y, translate: '-50% 0', opacity: a, fontFamily: HEAD, fontWeight: 800, fontSize: size, lineHeight: 1, color: col, textShadow: `0 0 40px ${col}66, 0 6px 14px rgba(0,0,0,.8)`, whiteSpace: 'nowrap' }}>{v}</div>;
export const Card: React.FC<{ x: number; y: number; w: number; children: React.ReactNode; a?: number; style?: React.CSSProperties }> = ({ x, y, w, children, a = 1, style }) =>
  a <= 0 ? null : <div style={{ ...abs(x, y, w), opacity: a, borderRadius: 26, background: 'linear-gradient(180deg, rgba(30,34,46,.96), rgba(14,16,22,.96))', border: '1.5px solid rgba(255,255,255,.12)', boxShadow: '0 24px 60px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.08)', ...style }}>{children}</div>;
export const Src: React.FC<{ s: string; y: number; a: number }> = ({ s, y, a }) => a <= 0 ? null :
  <div style={{ ...abs(SL, y, SR - SL), textAlign: 'center', fontFamily: MONO, fontSize: 21, color: GR, opacity: a }}>{s}</div>;
export const flight = (p: number, a: [number, number], b: [number, number], lift = 220): [number, number] => {
  const e = eio(clamp(p)); const mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - lift;
  return [(1 - e) * (1 - e) * a[0] + 2 * (1 - e) * e * mx + e * e * b[0], (1 - e) * (1 - e) * a[1] + 2 * (1 - e) * e * my + e * e * b[1]];
};
export const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
export const flashAt = (t: number, t0: number) => t < t0 - .02 ? 0 : Math.exp(-(t - t0) * 7);

/* road band */
export const Road: React.FC<{ t: number; y: number; speed?: number }> = ({ t, y, speed = 900 }) => (
  <svg width={W} height={240} style={{ position: 'absolute', left: 0, top: y }}>
    <defs><linearGradient id="rdG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1c2029" /><stop offset="1" stopColor="#0d0f14" /></linearGradient></defs>
    <rect x="0" y="20" width={W} height="200" fill="url(#rdG)" />
    <rect x="0" y="18" width={W} height="4" fill="#c7cedb" opacity=".5" /><rect x="0" y="218" width={W} height="4" fill="#c7cedb" opacity=".5" />
    {Array.from({ length: 10 }, (_, i) => { const x = ((i * 150 - t * speed) % 1500 + 1500) % 1500 - 200; return <rect key={i} x={x} y="116" width="80" height="8" rx="4" fill={Y} opacity=".7" />; })}
  </svg>
);
export const SmsScreen: React.FC<{ t: number; t0: number; from: string; title: string; body: string; sum?: string }> = ({ t, t0, from, title, body, sum }) => {
  const k = eout(P(t, t0, t0 + .35));
  return <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#151b2a,#090c13)', fontFamily: SANS, color: WH }}>
    <div style={{ position: 'absolute', top: 58, width: '100%', textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 58 }}>08:42</div>
    <div style={{ position: 'absolute', top: 128, width: '100%', textAlign: 'center', fontFamily: MONO, fontSize: 15, color: GR }}>seshanba</div>
    {k > 0 && <div style={{ position: 'absolute', left: 14, right: 14, top: 190 + (1 - k) * -90, opacity: k, borderRadius: 20, padding: '14px 16px', background: 'rgba(40,46,62,.96)', border: '1px solid rgba(255,255,255,.14)', boxShadow: '0 10px 30px rgba(0,0,0,.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 17, color: GR }}><div style={{ width: 26, height: 26, borderRadius: 6, background: GRN, display: 'grid', placeItems: 'center', color: '#06210f', fontWeight: 800, fontSize: 13 }}>✉</div>SMS · {from}</div>
      <div style={{ marginTop: 10, fontWeight: 800, fontSize: 25, color: RED, lineHeight: 1.15 }}>{title}</div>
      <div style={{ marginTop: 6, fontWeight: 500, fontSize: 19, color: '#c9cfdb', lineHeight: 1.3 }}>{body}</div>
      {Boolean(sum) && <div style={{ marginTop: 10, fontFamily: HEAD, fontWeight: 800, fontSize: 26, color: WH, whiteSpace: 'nowrap' }}>{sum}</div>}
    </div>}
  </div>;
};


export const Avatar: React.FC<{ n: string; c: string; sel: number; dim?: number; w?: number }> = ({ n, c, sel, dim = 0, w = 150 }) => (
  <div style={{ textAlign: 'center', width: w, opacity: 1 - .55 * dim }}>
    <div style={{ width: 96, height: 96, margin: '0 auto', borderRadius: '50%', background: c, display: 'grid', placeItems: 'center', fontFamily: HEAD, fontWeight: 800, fontSize: 40, color: '#111', boxShadow: sel ? `0 0 0 ${5 * sel}px ${Y}` : 'none', scale: String(1 + .1 * sel) }}>{n[0]}</div>
    <div style={{ marginTop: 10, fontFamily: SANS, fontWeight: 700, fontSize: 24, color: WH }}>{n}</div>
  </div>
);

/* standard ending: share sheet + lockup. t0 = word "Buni…", sentAt = last word end */
export const ShareEnd: React.FC<{ t: number; t0: number; pick: number; sentAt: number; lines?: [string, ('w' | 'y' | 'r' | 'g')?][] }> = ({ t, t0, pick, sentAt, lines = [['do‘stga'], ['yuboring', 'y']] }) => {
  const aB = eout(P(t, t0 - .2, t0 + .3)); if (aB <= 0) return null;
  const sel = eout(P(t, pick, pick + .3)), sent = t > sentAt + .25;
  return <Layer a={aB}>
    <Head t={t} t0={t0 - .1} t1={END + 1} y={490} lines={lines} size={66} />
    <Card x={SL + 20} y={800 + (1 - eout(P(t, t0 - .1, t0 + .5))) * 200} w={SR - SL - 40}>
      <div style={{ padding: '26px 30px' }}>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, textAlign: 'center' }}>Ulashish</div>
        <div style={{ marginTop: 18, height: 56, borderRadius: 14, background: '#1d2230', fontFamily: SANS, fontSize: 24, color: GR, display: 'flex', alignItems: 'center', paddingLeft: 20 }}>Qidirish</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26 }}>
          <Avatar n="Aziz" c="#9fb8ff" sel={0} /><Avatar n="Sardor" c={Y} sel={sel} /><Avatar n="Malika" c="#8be0b4" sel={0} /><Avatar n="Dilnoza" c="#ffb3c1" sel={0} />
        </div>
        <div style={{ marginTop: 28, height: 70, borderRadius: 18, background: sent ? GRN : BLUE, display: 'grid', placeItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 30, color: sent ? '#06210f' : '#fff' }}>{sent ? 'Yuborildi ✓' : 'Yuborish'}</div>
      </div>
    </Card>
    <div style={{ ...abs(SL, 1330, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, sentAt + .3, sentAt + .7)) }}><Lockup h={84} /></div>
  </Layer>;
};
/* ---------- HUD / captions / background ---------- */
export const Hud: React.FC<{ t: number }> = ({ t }) => {
  let ci = 0; CH.forEach(([s], i) => { if (t >= s) ci = i; });
  const y = 225, n = CH.length, gap = 8, sw = (SR - SL - gap * (n - 1)) / n;
  const ca = eout(P(t, CH[ci][0], CH[ci][0] + .35));
  return <>
    <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: 470, background: 'linear-gradient(180deg, rgba(7,8,11,.96) 0%, rgba(7,8,11,.7) 72%, rgba(7,8,11,0) 100%)' }} />
    <div style={{ ...abs(SL, y - 32) }}><Logo size={60} /></div>
    <div style={{ position: 'absolute', left: SL + 80, top: y - 40, fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: WH }}>ZERO TAXI</div>
    <div style={{ position: 'absolute', left: SL + 80, top: y + 6, fontFamily: MONO, fontWeight: 500, fontSize: 20, color: GR }}>{TOPIC}</div>
    <div style={{ position: 'absolute', left: SR - 260, top: y - 30, width: 260, textAlign: 'right', fontFamily: MONO, fontSize: 20, color: GR }}>{`BOB ${String(ci + 1).padStart(2, '0')}/${String(n).padStart(2, '0')}`}</div>
    <div style={{ position: 'absolute', left: SR - 260, top: y - 2 + (1 - ca) * 10, width: 260, textAlign: 'right', fontFamily: HEAD, fontWeight: 700, fontSize: 32, color: TEAL, opacity: ca, textTransform: 'uppercase' }}>{CH[ci][1]}</div>
    {CH.map(([s], i) => { const en = i < n - 1 ? CH[i + 1][0] : END - .5; const p = clamp((t - s) / (en - s));
      return <div key={i} style={{ position: 'absolute', left: SL + i * (sw + gap), top: y + 58, width: sw, height: 5, borderRadius: 3, background: 'rgba(244,246,251,.12)' }}><div style={{ width: `${p * 100}%`, height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${TEAL}, ${Y})` }} /></div>; })}
  </>;
};
export const Captions: React.FC<{ t: number }> = ({ t }) => {
  let cur: typeof CAPS[number] | null = null; for (const p of CAPS) if (t >= p[0].s - .06) cur = p;
  if (!cur) return null; const last = cur[cur.length - 1]; if (t > last.e + .7) return null;
  const pa = eout(P(t, cur[0].s - .06, cur[0].s + .1));
  const len = cur.map((o) => o.w).join(' ').length; const fs = Math.min(54, Math.floor(880 / (len * .5)));
  return <div style={{ position: 'absolute', left: SL - 20, top: 360, width: SR - SL + 40, display: 'flex', justifyContent: 'center', gap: 14, opacity: pa, fontFamily: HEAD, fontWeight: 600, fontSize: fs, whiteSpace: 'nowrap' }}>
    {cur.map((o, i) => { const spoken = t >= o.s - .03; const kw = Boolean(o.k) && spoken;
      return <span key={i} style={{ position: 'relative', color: spoken ? WH : 'rgba(244,246,251,.26)', textShadow: '0 3px 14px rgba(0,0,0,.95)', padding: kw ? '0 8px' : 0, outline: kw ? `2px solid ${BLUE}` : 'none', outlineOffset: 2, borderRadius: 4, background: kw ? 'rgba(63,169,184,.16)' : 'transparent' }}>{o.w}</span>; })}
  </div>;
};
export const R0 = rnd(3); const DUST = Array.from({ length: 40 }, () => ({ x: R0() * W, y: R0() * H, r: .8 + R0() * 1.6, sp: 4 + R0() * 10, ph: R0() * 6.28 }));
export const Background: React.FC<{ t: number }> = ({ t }) => {
  const red = TINT ? env(t, TINT[0], TINT[1], .2, .6) : 0;
  return <>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 48%, #1a1e2a 0%, #0c0e14 55%, #06070a 100%)' }} />
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, #3a1418 0%, rgba(6,7,10,0) 70%)', opacity: red }} />
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
      {Array.from({ length: 12 }, (_, i) => <line key={`v${i}`} x1={i * 96 + 12} y1="0" x2={i * 96 + 12} y2={H} stroke="#fff" strokeOpacity=".035" />)}
      {Array.from({ length: 21 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 96} x2={W} y2={i * 96} stroke="#fff" strokeOpacity=".035" />)}
      {Array.from({ length: 12 * 21 }, (_, i) => { const x = (i % 12) * 96 + 12, y = Math.floor(i / 12) * 96; return (i * 7) % 5 === 0 ? <path key={i} d={`M${x - 7} ${y} H ${x + 7} M ${x} ${y - 7} V ${y + 7}`} stroke="#fff" strokeOpacity=".16" strokeWidth="1.5" /> : null; })}
      {DUST.map((d, i) => <circle key={i} cx={d.x + Math.sin(t * .4 + d.ph) * 10} cy={((d.y - t * d.sp) % H + H) % H} r={d.r} fill={YL} opacity={.12 + .08 * Math.sin(t + d.ph)} />)}
    </svg>
  </>;
};

/* the whole reel: background, shaken scenes, vignette, HUD, captions, fade-out */
export const Reel: React.FC<{ scenes: React.FC<{ t: number }>[]; hits: [number, number, number][] }> = ({ scenes, hits }) => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  let sx = 0, sy = 0; for (const [h, amp, dec] of hits) { const [x, y] = shake(t, h, amp, dec); sx += x; sy += y; }
  return (
    <AbsoluteFill style={{ backgroundColor: '#06070a', overflow: 'hidden' }}>
      <Background t={t} />
      <div style={{ position: 'absolute', inset: 0, translate: `${sx}px ${sy}px` }}>{scenes.map((S, i) => <S key={i} t={t} />)}</div>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 46%, rgba(0,0,0,0) 58%, rgba(0,0,0,.55) 100%)' }} />
      <Hud t={t} /><Captions t={t} />
      <AbsoluteFill style={{ backgroundColor: '#000', opacity: P(t, END - .5, END) }} />
    </AbsoluteFill>
  );
};

/* Zero Taxi ending: logo + perks + big Telegram contact. t0 = CTA start */
export const ZtEnd: React.FC<{ t: number; t0: number; perks: string[]; lines?: [string, ('w' | 'y' | 'r' | 'g')?][] }> = ({ t, t0, perks, lines = [['Zero Taxi’ga'], ['ulaning', 'y']] }) => {
  const aB = eout(P(t, t0 - .2, t0 + .3)); if (aB <= 0) return null;
  const k = eout(P(t, t0 - .1, t0 + .6));
  return <Layer a={aB}>
    <Head t={t} t0={t0 - .1} t1={END + 1} y={490} lines={lines} size={66} />
    <Glow x={CX} y={1000} r={560} a={.9} col="63,169,184" />
    <div style={{ ...abs(SL, 690 + (1 - k) * 60, SR - SL), display: 'flex', justifyContent: 'center', opacity: k }}><Lockup h={150} /></div>
    <div style={{ ...abs(SL, 900, SR - SL), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {perks.map((s, i) => { const a = eout(P(t, t0 + .3 + i * .18, t0 + .6 + i * .18));
        return <div key={i} style={{ opacity: a, translate: `${(1 - a) * 40}px 0`, padding: '10px 26px', borderRadius: 30, background: 'rgba(14,16,22,.92)', border: `2px solid ${TEAL}`, fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, whiteSpace: 'nowrap' }}>{s}</div>; })}
    </div>
    <div style={{ ...abs(SL, 1250, SR - SL), display: 'flex', justifyContent: 'center', opacity: eout(P(t, t0 + 1, t0 + 1.4)), scale: String(lerp(.8, 1, eback(P(t, t0 + 1, t0 + 1.5)))) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 34px', borderRadius: 24, background: Y, color: '#111', fontFamily: SANS, fontWeight: 800, fontSize: 44, boxShadow: '0 14px 40px rgba(247,198,75,.35)' }}>
        <svg width="48" height="48" viewBox="0 0 64 64"><path d="M6 30 56 10c3-1 5 1 4 5l-9 40c-1 3-3 4-6 2L32 47l-7 7c-1 1-2 1-3 0l1-12 24-22-30 18L5 35c-3-1-3-4 1-5z" fill="#111" /></svg>
        t.me/zerotaxiplus_mp
      </div>
    </div>
  </Layer>;
};
