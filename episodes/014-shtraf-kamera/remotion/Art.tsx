import React from 'react';
import { clamp, lerp } from './lib';

/* own channel logo */
export const Logo: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
    <defs><linearGradient id="lgA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE08A" /><stop offset="1" stopColor="#E59A1A" /></linearGradient></defs>
    <circle cx="50" cy="50" r="50" fill="url(#lgA)" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="#1A1306" strokeWidth="3" opacity=".35" />
    <text x="50" y="66" textAnchor="middle" fontFamily="Unb, sans-serif" fontWeight={800} fontSize="44" fill="#1A1306">S</text>
  </svg>
);

/* generic smartphone */
export const Phone: React.FC<{ w: number; children?: React.ReactNode; glow?: number; id?: string }> = ({ w, children, glow = 0, id = 'a' }) => {
  const h = w * 2.04;
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <svg width={w} height={h} viewBox="0 0 400 816" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <linearGradient id={`phF${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5a6070" /><stop offset=".3" stopColor="#2a2e38" /><stop offset=".7" stopColor="#1a1d24" /><stop offset="1" stopColor="#4a505e" /></linearGradient>
          <linearGradient id={`phS${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#11141b" /><stop offset="1" stopColor="#07080c" /></linearGradient>
          <filter id={`phG${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30" /></filter>
        </defs>
        {glow > 0 && <rect x="20" y="40" width="360" height="736" rx="60" fill="#F6B93B" opacity={glow * .35} filter={`url(#phG${id})`} />}
        <rect x="0" y="0" width="400" height="816" rx="64" fill={`url(#phF${id})`} />
        <rect x="6" y="6" width="388" height="804" rx="58" fill="#0b0d12" />
        <rect x="16" y="16" width="368" height="784" rx="50" fill={`url(#phS${id})`} />
        <rect x="150" y="34" width="100" height="28" rx="14" fill="#000" />
        <rect x="-4" y="190" width="5" height="70" rx="2" fill="#3a3f4b" /><rect x="399" y="230" width="5" height="110" rx="2" fill="#3a3f4b" />
      </svg>
      <div style={{ position: 'absolute', left: w * .04, top: w * .04, width: w * .92, height: h - w * .08, borderRadius: w * .125, overflow: 'hidden' }}>{children}</div>
    </div>
  );
};

/* generic sedan, side view (no brand). wheel = rotation angle in deg */
export const Car: React.FC<{ w: number; wheel?: number; col?: [string, string]; id: string; lights?: number }> = ({ w, wheel = 0, col = ['#e8ecf4', '#8b94a8'], id, lights = 1 }) => (
  <svg width={w} height={w * .4} viewBox="0 0 500 200" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`cb${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col[0]} /><stop offset=".55" stopColor={col[1]} /><stop offset="1" stopColor="#3a4150" /></linearGradient>
      <linearGradient id={`cg${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9fc4e8" /><stop offset=".5" stopColor="#2a3a52" /><stop offset="1" stopColor="#1a2333" /></linearGradient>
      <radialGradient id={`cw${id}`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#c9ced8" /><stop offset=".55" stopColor="#6b7282" /><stop offset=".62" stopColor="#15171c" /><stop offset="1" stopColor="#0a0b0e" /></radialGradient>
      <filter id={`cl${id}`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="10" /></filter>
    </defs>
    <ellipse cx="250" cy="188" rx="230" ry="12" fill="#000" opacity=".55" />
    <path d="M20 140 C 18 112 30 100 62 96 L 140 88 C 170 56 205 40 260 40 L 320 40 C 360 40 385 60 410 88 L 460 96 C 482 100 490 116 488 140 L 484 156 L 24 156 Z" fill={`url(#cb${id})`} stroke="#2a2f3a" strokeWidth="3" />
    <path d="M152 90 C 178 62 210 52 258 52 L 262 52 L 262 92 Z" fill={`url(#cg${id})`} />
    <path d="M276 52 L 318 52 C 350 52 372 66 392 92 L 276 92 Z" fill={`url(#cg${id})`} />
    <path d="M60 104 L 470 104" stroke="#fff" strokeOpacity=".45" strokeWidth="3" />
    <rect x="300" y="112" width="34" height="6" rx="3" fill="#2a2f3a" opacity=".6" /><rect x="190" y="112" width="34" height="6" rx="3" fill="#2a2f3a" opacity=".6" />
    {/* lights */}
    <rect x="462" y="108" width="24" height="14" rx="5" fill="#fff6d0" />
    {lights > 0 && <ellipse cx="500" cy="118" rx="40" ry="18" fill="#ffe9a0" opacity={.5 * lights} filter={`url(#cl${id})`} />}
    <rect x="16" y="110" width="16" height="16" rx="4" fill="#ff4f4f" />
    {[120, 390].map((x) => <g key={x} transform={`translate(${x} 156)`}>
      <circle r="40" fill="#0b0c10" />
      <circle r="32" fill={`url(#cw${id})`} />
      <g transform={`rotate(${wheel})`}>{[0, 72, 144, 216, 288].map((a) => <rect key={a} x="-3" y="-28" width="6" height="22" rx="2" fill="#2a2e38" transform={`rotate(${a})`} />)}</g>
      <circle r="7" fill="#9aa1af" />
    </g>)}
  </svg>
);

/* front of car with plate (for camera snapshot) */
export const CarFront: React.FC<{ w: number; plate: React.ReactNode }> = ({ w, plate }) => (
  <div style={{ position: 'relative', width: w, height: w * .62 }}>
    <svg width={w} height={w * .62} viewBox="0 0 500 310" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="cfB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6eaf2" /><stop offset=".6" stopColor="#8d96a9" /><stop offset="1" stopColor="#434a58" /></linearGradient>
        <linearGradient id="cfG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fc4e8" /><stop offset="1" stopColor="#1c2638" /></linearGradient>
      </defs>
      <path d="M110 40 L 390 40 C 410 40 420 52 428 72 L 446 130 L 54 130 L 72 72 C 80 52 90 40 110 40 Z" fill="url(#cfG)" stroke="#2a2f3a" strokeWidth="4" />
      <path d="M30 140 C 30 126 40 120 60 118 L 440 118 C 460 120 470 126 470 140 L 474 262 C 474 276 466 282 452 282 L 48 282 C 34 282 26 276 26 262 Z" fill="url(#cfB)" stroke="#2a2f3a" strokeWidth="4" />
      <rect x="50" y="150" width="90" height="34" rx="12" fill="#fff6d0" /><rect x="360" y="150" width="90" height="34" rx="12" fill="#fff6d0" />
      <rect x="170" y="156" width="160" height="40" rx="10" fill="#1d222c" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={180 + i * 38} y="164" width="26" height="24" rx="4" fill="#2c323e" />)}
      <rect x="20" y="282" width="70" height="26" rx="8" fill="#0b0c10" /><rect x="410" y="282" width="70" height="26" rx="8" fill="#0b0c10" />
    </svg>
    <div style={{ position: 'absolute', left: '50%', top: w * .62 * .74, translate: '-50% -50%' }}>{plate}</div>
  </div>
);

/* Uzbek-style number plate (fictional number) */
export const Plate: React.FC<{ s: number; chars: string; shown?: number; box?: number }> = ({ s, chars, shown = 99, box = -1 }) => {
  const reg = chars.slice(0, 2), rest = chars.slice(2);
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: s, borderRadius: s * .14, background: '#f7f8fb', border: `${s * .06}px solid #111`, fontFamily: 'JBM, monospace', fontWeight: 700, color: '#111', boxShadow: '0 8px 22px rgba(0,0,0,.6)' }}>
      <div style={{ padding: `0 ${s * .22}px`, fontSize: s * .62, borderRight: `${s * .05}px solid #111`, height: '100%', display: 'flex', alignItems: 'center' }}>
        {reg.split('').map((c, i) => <span key={i} style={{ opacity: i < shown ? 1 : .15, outline: i === box ? '3px solid #5B8CFF' : 'none', borderRadius: 4 }}>{c}</span>)}
      </div>
      <div style={{ padding: `0 ${s * .22}px`, fontSize: s * .62, letterSpacing: s * .04, display: 'flex', alignItems: 'center', gap: s * .05 }}>
        {rest.split('').map((c, i) => <span key={i} style={{ opacity: i + 2 < shown ? 1 : .15, outline: i + 2 === box ? '3px solid #5B8CFF' : 'none', borderRadius: 4, minWidth: c === ' ' ? s * .14 : undefined }}>{c}</span>)}
      </div>
      <div style={{ padding: `0 ${s * .12}px`, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderLeft: `${s * .04}px solid #111` }}>
        <div style={{ width: s * .34, height: s * .22, borderRadius: 2, background: 'linear-gradient(180deg,#1eb5e6 0 33%,#fff 33% 66%,#1fa64a 66%)' }} />
        <div style={{ fontSize: s * .2, fontFamily: 'Int, sans-serif', fontWeight: 800, marginTop: 2 }}>UZ</div>
      </div>
    </div>
  );
};

/* speed camera on a pole (generic) */
export const CamPole: React.FC<{ h: number; flash?: number; id: string }> = ({ h, flash = 0, id }) => (
  <svg width={h * .45} height={h} viewBox="0 0 180 400" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={`pl${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#5a6070" /><stop offset=".5" stopColor="#b8bfcc" /><stop offset="1" stopColor="#4a505e" /></linearGradient>
      <linearGradient id={`bx${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2f4f8" /><stop offset="1" stopColor="#9aa3b5" /></linearGradient>
      <filter id={`fl${id}`} x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
    <rect x="80" y="60" width="18" height="340" fill={`url(#pl${id})`} />
    <rect x="60" y="390" width="58" height="10" rx="3" fill="#3a3f4b" />
    <rect x="10" y="14" width="160" height="78" rx="12" fill={`url(#bx${id})`} stroke="#3a3f4b" strokeWidth="3" />
    <path d="M6 14 L 174 14 L 164 2 L 16 2 Z" fill="#2a2f3a" />
    <circle cx="56" cy="53" r="24" fill="#0b0d12" stroke="#3a3f4b" strokeWidth="4" />
    <circle cx="56" cy="53" r="12" fill="#1d3a5a" /><circle cx="51" cy="48" r="4" fill="#9fc4e8" />
    <rect x="96" y="34" width="56" height="38" rx="6" fill="#1b2130" />
    {[0, 1, 2].map((i) => <rect key={i} x={102 + i * 17} y="40" width="12" height="26" rx="3" fill={flash > 0 ? '#fffbe8' : '#4a5263'} />)}
    {flash > 0 && <circle cx="124" cy="53" r="60" fill="#fffbe8" opacity={flash} filter={`url(#fl${id})`} />}
  </svg>
);

/* speedometer gauge: v 0..1 of 0..160 */
export const Gauge: React.FC<{ w: number; v: number; red?: number; label?: string }> = ({ w, v, red = .5, label = 'km/soat' }) => {
  const a0 = -210, a1 = 30, ang = (x: number) => (a0 + (a1 - a0) * x) * Math.PI / 180;
  const arc = (x0: number, x1: number, r: number) => { const p = (x: number) => [150 + r * Math.cos(ang(x)), 150 + r * Math.sin(ang(x))]; const [sx, sy] = p(x0), [ex, ey] = p(x1); return `M${sx} ${sy} A ${r} ${r} 0 ${(x1 - x0) * 240 > 180 ? 1 : 0} 1 ${ex} ${ey}`; };
  const na = ang(clamp(v));
  return (
    <svg width={w} height={w} viewBox="0 0 300 300" style={{ display: 'block', overflow: 'visible' }}>
      <defs><radialGradient id="gzB" cx=".5" cy=".45" r=".6"><stop offset="0" stopColor="#1b2130" /><stop offset="1" stopColor="#080a0f" /></radialGradient></defs>
      <circle cx="150" cy="150" r="146" fill="url(#gzB)" stroke="#c7cedb" strokeWidth="5" />
      <path d={arc(0, red, 118)} stroke="#3DDC84" strokeWidth="14" fill="none" strokeLinecap="round" opacity=".85" />
      <path d={arc(red, .75, 118)} stroke="#F6B93B" strokeWidth="14" fill="none" opacity=".9" />
      <path d={arc(.75, 1, 118)} stroke="#FF5A5F" strokeWidth="14" fill="none" strokeLinecap="round" opacity=".9" />
      {Array.from({ length: 9 }, (_, i) => { const x = i / 8, an = ang(x); return <g key={i}>
        <line x1={150 + 98 * Math.cos(an)} y1={150 + 98 * Math.sin(an)} x2={150 + 108 * Math.cos(an)} y2={150 + 108 * Math.sin(an)} stroke="#c7cedb" strokeWidth="4" />
        <text x={150 + 78 * Math.cos(an)} y={156 + 78 * Math.sin(an)} textAnchor="middle" fontFamily="JBM, monospace" fontSize="15" fill="#8A93A6">{i * 20}</text></g>; })}
      <line x1="150" y1="150" x2={150 + 104 * Math.cos(na)} y2={150 + 104 * Math.sin(na)} stroke="#F4F6FB" strokeWidth="7" strokeLinecap="round" />
      <circle cx="150" cy="150" r="14" fill="#F6B93B" />
      <text x="150" y="228" textAnchor="middle" fontFamily="JBM, monospace" fontSize="17" fill="#8A93A6">{label}</text>
    </svg>
  );
};

/* envelope / letter */
export const Packet: React.FC<{ w: number; glow?: number; paper?: boolean }> = ({ w, glow = 1, paper }) => (
  <svg width={w} height={w * .7} viewBox="0 0 140 98" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id={paper ? 'pkP' : 'pkG'} x1="0" y1="0" x2="0" y2="1">{paper ? <><stop offset="0" stopColor="#f6f2e8" /><stop offset="1" stopColor="#cfc6b0" /></> : <><stop offset="0" stopColor="#FFE9A8" /><stop offset="1" stopColor="#F2A322" /></>}</linearGradient>
    </defs>
    <rect x="4" y="4" width="132" height="90" rx="10" fill={`url(#${paper ? 'pkP' : 'pkG'})`} stroke="#6b5a3a" strokeWidth="2" />
    <path d="M6 10 L 70 56 L 134 10" stroke="#6b5a3a" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
    {paper && <rect x="94" y="14" width="28" height="22" rx="2" fill="#d06a4a" opacity=".8" />}
  </svg>
);

/* donut gauge */
export const Donut: React.FC<{ w: number; p: number; col?: string; id?: string }> = ({ w, p, col = '#F6B93B', id = 'd' }) => {
  const r = 120, c = 2 * Math.PI * r;
  if (p < .01) return <svg width={w} height={w} viewBox="0 0 300 300" style={{ display: 'block' }}><circle cx="150" cy="150" r={r} fill="none" stroke="#1d2230" strokeWidth="34" /></svg>;
  return (
    <svg width={w} height={w} viewBox="0 0 300 300" style={{ display: 'block' }}>
      <defs><filter id={`dnB${id}`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10" /></filter></defs>
      <circle cx="150" cy="150" r={r} fill="none" stroke="#1d2230" strokeWidth="34" />
      <circle cx="150" cy="150" r={r} fill="none" stroke={col} strokeWidth="34" strokeDasharray={`${c * p} ${c}`} transform="rotate(-90 150 150)" opacity=".5" filter={`url(#dnB${id})`} />
      <circle cx="150" cy="150" r={r} fill="none" stroke={col} strokeWidth="34" strokeLinecap="round" strokeDasharray={`${c * p} ${c}`} transform="rotate(-90 150 150)" />
    </svg>
  );
};

/* tea bowl (piyola) */
export const Piyola: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * .7} viewBox="0 0 200 140" style={{ display: 'block', overflow: 'visible' }}>
    <defs><linearGradient id="pyG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c9d4ea" /><stop offset=".5" stopColor="#ffffff" /><stop offset="1" stopColor="#b7c2d8" /></linearGradient></defs>
    {[0, 1, 2].map((i) => <path key={i} d={`M${80 + i * 20} 30 C ${70 + i * 20} 14 ${92 + i * 20} 8 ${84 + i * 20} -8`} stroke="#fff" strokeOpacity=".35" strokeWidth="4" fill="none" strokeLinecap="round" />)}
    <path d="M20 40 L 180 40 C 176 96 140 124 100 124 C 60 124 24 96 20 40 Z" fill="url(#pyG)" stroke="#5a6272" strokeWidth="3" />
    <ellipse cx="100" cy="40" rx="80" ry="12" fill="#b0672a" stroke="#5a6272" strokeWidth="3" />
    <path d="M40 70 C 70 84 130 84 160 70" stroke="#2a5fb0" strokeWidth="6" fill="none" />
    <rect x="76" y="122" width="48" height="10" rx="4" fill="#9aa3b5" />
  </svg>
);
export { lerp };
