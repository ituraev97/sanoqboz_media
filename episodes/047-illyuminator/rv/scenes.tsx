import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { W, H, FPS, Y, RED, GRN, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env } from '../lib';
import { ShareEnd } from '../kit';
import { Logo } from '../Art';
import { Studio, Rig, Shadow, Cam, V3, mixCam, project, TopPill, Callout, BigNum, BG, useGlb } from '../s3d';
import { CAPS } from './caps';
import { END, CH, T } from './ep';

const INK = '#1c1e23', BLUE = '#2F8CFF';
/* "de Havilland DH 106 Comet 4" — helijah (Sketchfab, CC BY 4.0). Textured, no airline titles. Source nose at -x → turned to +x.
   The 1952 Comet 1 had squarish windows; the Comet 4 model already has the round/oval ones. Square-window panel = schematic. */
const PF = 'plane_05ba73f3f2bb4050988e087f53e98dc9.glb';
const PL = 10;
const FY = .95;   // fuselage axis height above the gear (model units)
const FR = .42;   // fuselage radius
const FLY = 1.5;  // flight altitude offset in the studio
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const SUB = T.oyna - .15;            // sub-cut inside chapter 2 (plane → window panel)
const CUTS = [...CH.slice(1).map((c) => c[0]), SUB].sort((a, b) => a - b);
const C = (i: number) => CH[i][0];

const ClipOn: React.FC = () => { const gl = useThree((s) => s.gl); gl.localClippingEnabled = true; return null; };

const usePlane = () => {
  const src = useGlb(PF);
  return useMemo(() => {
    if (!src) return null;
    const o = src.clone(true); o.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(o), s = b.getSize(new THREE.Vector3()), c = b.getCenter(new THREE.Vector3());
    const k = PL / Math.max(s.x, s.z); o.scale.setScalar(k); o.position.set(-c.x * k, -b.min.y * k, -c.z * k);
    const g = new THREE.Group(); g.add(o); g.rotation.y = Math.PI; return g;
  }, [src]);
};
/* the plane. breathe = radial swelling of the cabin (exaggerated), cut = split the fuselage at x=cutX into two pieces moved by d */
const Plane: React.FC<{ x?: number; y?: number; pitch?: number; roll?: number; yaw?: number; breathe?: number; split?: { at: number; d: number } }> = ({ x = 0, y = 0, pitch = 0, roll = 0, yaw = 0, breathe = 0, split }) => {
  const base = usePlane();
  const inst = useMemo(() => (base ? base.clone(true) : null), [base]);
  const halves = useMemo(() => {
    if (!base) return null;
    return [1, -1].map((sg) => { const pl = new THREE.Plane(new THREE.Vector3(sg, 0, 0), 0); const g = base.clone(true);
      g.traverse((m: any) => { if (m.isMesh) { const mm = (m.material as THREE.Material).clone(); mm.clippingPlanes = [pl]; mm.side = THREE.DoubleSide; m.material = mm; } });
      return { g, pl, sg }; });
  }, [base]);
  if (!inst || !halves) return null;
  if (split) return <group position={[x, y, 0]}>{halves.map(({ g, pl, sg }) => {
    const dx = sg * split.d * .9, dy = -split.d * (sg > 0 ? .25 : .45); pl.constant = -sg * (split.at + dx + x);
    return <group key={sg} position={[dx, dy, 0]} rotation={[0, 0, -sg * split.d * .12]}><primitive object={g} /></group>; })}</group>;
  return <group position={[x, y, 0]} rotation={[roll, yaw, pitch]}>
    <group position={[0, FY, 0]} scale={[1, 1 + breathe, 1 + breathe]}><group position={[0, -FY, 0]}><primitive object={inst} /></group></group>
  </group>;
};

/* 3D arrow from p along dir (unit), length len */
const Arrow: React.FC<{ p: V3; dir?: V3; len: number; col: string; a: number; w?: number }> = ({ p, dir = [0, -1, 0], len, col, a, w = .05 }) => {
  if (a <= 0 || len <= .01) return null;
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...dir).normalize());
  const head = Math.min(.25, len * .45);
  return <group position={p} quaternion={q}>
    <mesh position={[0, (len - head) / 2, 0]}><cylinderGeometry args={[w, w, len - head, 16]} /><meshStandardMaterial color={col} emissive={col} emissiveIntensity={.4} transparent opacity={a} /></mesh>
    <mesh position={[0, len - head / 2, 0]}><coneGeometry args={[w * 2.6, head, 20]} /><meshStandardMaterial color={col} emissive={col} emissiveIntensity={.4} transparent opacity={a} /></mesh>
  </group>;
};
/* ring of arrows around the fuselage section at x (cabin pressure pushing out) */
const PressRing: React.FC<{ x: number; y: number; r: number; len: number; a: number; out?: boolean }> = ({ x, y, r, len, a, out = true }) => a <= 0 ? null : <>
  {Array.from({ length: 10 }, (_, i) => { const ang = i / 10 * Math.PI * 2; const d: V3 = [0, Math.cos(ang), Math.sin(ang)];
    const p: V3 = out ? [x, y + d[1] * r, d[2] * r] : [x, y + d[1] * (r + len), d[2] * (r + len)];
    return <Arrow key={i} p={p} dir={out ? d : [0, -d[1], -d[2]]} len={len} col={out ? BLUE : '#7a8796'} a={a} w={.035} />; })}
</>;

/* ---------- window panel (schematic skin section, 2.4 × 3.0) ---------- */
const PW = 2.4, PH = 3.0, TX = 512, TY = 640;
const HOLE = { w: 220, h: 290, x: 256, y: 320 };
const tex = (draw: (c: CanvasRenderingContext2D) => void) => { const cv = document.createElement('canvas'); cv.width = TX; cv.height = TY; draw(cv.getContext('2d')!);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
const holePath = (c: CanvasRenderingContext2D, sq: boolean, grow = 0) => {
  const w = HOLE.w + grow * 2, h = HOLE.h + grow * 2, x = HOLE.x - w / 2, y = HOLE.y - h / 2; c.beginPath();
  if (sq) c.roundRect(x, y, w, h, 14 + grow * .3); else c.ellipse(HOLE.x, HOLE.y, w / 2, h / 2, 0, 0, Math.PI * 2);
};
const baseTex = (sq: boolean) => tex((c) => {
  const g = c.createLinearGradient(0, 0, TX, TY); g.addColorStop(0, '#e3e7ec'); g.addColorStop(.5, '#c9cfd6'); g.addColorStop(1, '#d9dde2'); c.fillStyle = g; c.fillRect(0, 0, TX, TY);
  c.strokeStyle = 'rgba(70,80,92,.35)'; c.lineWidth = 3; [70, 570].forEach((yy) => { c.beginPath(); c.moveTo(0, yy); c.lineTo(TX, yy); c.stroke(); }); [40, 472].forEach((xx) => { c.beginPath(); c.moveTo(xx, 0); c.lineTo(xx, TY); c.stroke(); });
  c.fillStyle = 'rgba(60,68,80,.55)'; for (let i = 0; i < 14; i++) { [62, 578].forEach((yy) => { c.beginPath(); c.arc(20 + i * 36, yy, 4, 0, 7); c.fill(); }); }
  for (let i = 0; i < 17; i++) { [32, 480].forEach((xx) => { c.beginPath(); c.arc(xx, 30 + i * 36, 4, 0, 7); c.fill(); }); }
  holePath(c, sq, 26); c.fillStyle = '#9aa3ad'; c.fill(); // window frame
  c.save(); holePath(c, sq, 26); c.clip(); for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; const rx = (HOLE.w / 2 + 13), ry = (HOLE.h / 2 + 13);
    const px = sq ? HOLE.x + Math.max(-1, Math.min(1, Math.cos(a) * 1.5)) * rx : HOLE.x + Math.cos(a) * rx, py = sq ? HOLE.y + Math.max(-1, Math.min(1, Math.sin(a) * 1.5)) * ry : HOLE.y + Math.sin(a) * ry;
    c.fillStyle = 'rgba(50,58,68,.6)'; c.beginPath(); c.arc(px, py, 3.5, 0, 7); c.fill(); } c.restore();
  holePath(c, sq); const s = c.createLinearGradient(0, HOLE.y - HOLE.h / 2, 0, HOLE.y + HOLE.h / 2); s.addColorStop(0, '#5aa7ee'); s.addColorStop(.6, '#a9d4f7'); s.addColorStop(1, '#eaf4fc'); c.fillStyle = s; c.fill();
  c.save(); holePath(c, sq); c.clip(); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.ellipse(HOLE.x + 30, HOLE.y + 60, 70, 18, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(HOLE.x - 40, HOLE.y + 80, 50, 12, 0, 0, 7); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 10; c.beginPath(); c.moveTo(HOLE.x - 120, HOLE.y - 40); c.lineTo(HOLE.x + 20, HOLE.y - 180); c.stroke(); c.restore();
  holePath(c, sq); c.strokeStyle = '#59626d'; c.lineWidth = 6; c.stroke();
});
/* stress map: square = hot spots at the 4 corners; round = a soft even ring */
const heatTex = (sq: boolean) => tex((c) => {
  if (sq) {
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => { const px = HOLE.x + sx * HOLE.w / 2, py = HOLE.y + sy * HOLE.h / 2;
      const g = c.createRadialGradient(px, py, 0, px, py, 150); g.addColorStop(0, 'rgba(236,40,30,1)'); g.addColorStop(.25, 'rgba(245,110,30,.9)'); g.addColorStop(.55, 'rgba(255,205,50,.55)'); g.addColorStop(1, 'rgba(255,220,60,0)');
      c.fillStyle = g; c.fillRect(0, 0, TX, TY); });
  } else {
    c.save(); c.filter = 'blur(18px)'; holePath(c, false, 34); c.strokeStyle = 'rgba(255,205,50,.75)'; c.lineWidth = 46; c.stroke(); c.restore();
  }
  c.globalCompositeOperation = 'destination-out'; holePath(c, sq); c.fill();
});
/* fatigue crack from the top-right corner, in texture px */
const CRACK: [number, number][] = [[HOLE.x + HOLE.w / 2 - 4, HOLE.y - HOLE.h / 2 + 4], [400, 150], [418, 126], [445, 104], [462, 76], [490, 52], [512, 30]];
const px2w = ([x, y]: [number, number]): [number, number] => [(x / TX - .5) * PW, (.5 - y / TY) * PH];
const Panel: React.FC<{ sq: boolean; heat: number; crack?: number; y?: number; ry?: number; a?: number }> = ({ sq, heat, crack = 0, y = 1.9, ry = 0, a = 1 }) => {
  const bt = useMemo(() => baseTex(sq), [sq]); const ht = useMemo(() => heatTex(sq), [sq]);
  if (a <= 0) return null;
  const segs: React.ReactNode[] = []; const n = CRACK.length - 1;
  for (let i = 0; i < n; i++) { const f = Math.max(0, Math.min(1, crack * n - i)); if (f <= 0) break; const A = px2w(CRACK[i]), B0 = px2w(CRACK[i + 1]); const B = [lerp(A[0], B0[0], f), lerp(A[1], B0[1], f)];
    const len = Math.hypot(B[0] - A[0], B[1] - A[1]); const ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
    segs.push(<mesh key={i} position={[(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, .012]} rotation={[0, 0, ang]}><boxGeometry args={[len + .02, .035, .01]} /><meshBasicMaterial color="#14161a" /></mesh>); }
  return <group position={[0, y, 0]} rotation={[0, ry, 0]}>
    <mesh position={[0, 0, -.04]}><boxGeometry args={[PW, PH, .07]} /><meshStandardMaterial color="#8d959f" metalness={.4} roughness={.5} /></mesh>
    <mesh><planeGeometry args={[PW, PH]} /><meshStandardMaterial map={bt} metalness={.25} roughness={.45} /></mesh>
    {heat > 0 && <mesh position={[0, 0, .006]}><planeGeometry args={[PW, PH]} /><meshBasicMaterial map={ht} transparent opacity={heat} toneMapped={false} depthWrite={false} /></mesh>}
    {segs}
  </group>;
};
const panelCam = (k: number, zoom = 0): Cam => ({ pos: [lerp(1.3, .55, k), lerp(1.75, 1.95, k), lerp(8.3, 7.9, k) - zoom], look: [0, 1.62, 0], fov: 32 });

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[] };

function shot(t: number): Shot {
  /* A hook: close along the round windows, pulling back */
  if (t < C(1)) {
    const k = ease(t, 0, C(1));
    return { cam: mixCam({ pos: [2.3, FY + .35, 2.6], look: [.6, FY + .1, 0], fov: 30 }, { pos: [4.6, FY + 1.0, 5.6], look: [.2, FY + .1, 0], fov: 32 }, k),
      world: (m) => <><Plane />{!m && <Shadow a={.35} len={9} />}</>,
      marks: [{ p: [1.1, FY + .12, FR], s: 'illyuminator', a: env(t, .4, C(1) + .2, .3, .2), col: Y, up: 170, side: 40 }] };
  }
  /* B 1952: the first jet airliner flies */
  if (t < SUB) {
    const k = ease(t, C(1), SUB); const ang = lerp(1.15, .85, k);
    return { cam: { pos: [Math.sin(ang) * 11.5, FLY + FY + 1.6, Math.cos(ang) * 11.5], look: [.4, FLY + FY - .1, 0], fov: 34 },
      world: () => <Plane y={FLY} pitch={.04} roll={.05} />,
      marks: [{ p: [3.4, FLY + FY + .35, 0], s: 'Komet', a: env(t, T.komet - .2, SUB, .3, .2), col: Y, up: 120, side: -60 }] };
  }
  /* B2 the Comet 1 windows were squarish (schematic panel) */
  if (t < C(2)) {
    const k = ease(t, SUB, C(2));
    return { cam: panelCam(k), world: () => <Panel sq heat={0} />, marks: [] };
  }
  /* C 1954: two Comets broke up in the air */
  if (t < C(3)) {
    const d = ease(t, T.parcha - .3, T.parcha + 1.2) * .9;
    return { cam: mixCam({ pos: [3.0, FLY + FY + 2.0, 12.5], look: [.3, FLY + FY - .3, 0], fov: 34 }, { pos: [2.0, FLY + FY + 1.6, 11.8], look: [.3, FLY + FY - .5, 0], fov: 34 }, ease(t, C(2), C(3))),
      world: (m) => m ? null : <Plane y={FLY} split={{ at: .9, d }} />, marks: [] };
  }
  /* D twist: the corner of the window */
  if (t < C(4)) {
    const z = ease(t, T.sabab - .2, T.burchagi + .4) * 2.2;
    const heat = ease(t, T.burchagi - .1, T.burchagi + .5) * .9;
    return { cam: { pos: [lerp(.6, .9, z / 2.2), lerp(1.8, 2.3, z / 2.2), 7.4 - z], look: [lerp(0, .5, z / 2.2), lerp(1.58, 2.15, z / 2.2), 0], fov: 32 },
      world: () => <Panel sq heat={heat} />,
      marks: [{ p: [HOLE.w / 2 / TX * PW, 1.9 + HOLE.h / 2 / TY * PH, .02], s: 'burchak', a: env(t, T.burchagi - .1, C(4) + .2, .3, .2), col: RED, up: 150, side: -120 }] };
  }
  /* E pressure: the cabin is pumped up and let down every flight — the fuselage "breathes" */
  if (t < C(5)) {
    const inA = ease(t, T.havo - .2, T.damla + .5), outA = ease(t, T.qonish - .1, T.chiq + .6);
    const cyc = t > T.fyuz ? (1 - Math.cos((t - T.fyuz) * Math.PI * 2 / 1.1)) / 2 : 0;
    const b = t < T.fyuz ? (inA - outA) : cyc; const breathe = b * .16;
    const ang = lerp(1.25, 1.05, ease(t, C(4), C(5)));
    return { cam: { pos: [Math.sin(ang) * 10.5, FLY + FY + 1.2, Math.cos(ang) * 10.5], look: [.9, FLY + FY + .45, 0], fov: 32 },
      world: (m) => <><Plane y={FLY} breathe={breathe} />{!m && <PressRing x={2.6} y={FLY + FY} r={FR * (1 + breathe) + .05} len={.18 + .3 * b} a={env(t, T.havo - .1, C(5) + .2, .3, .2) * (.35 + .65 * b)} out />}</>,
      marks: [] };
  }
  /* F stress collects in the sharp corner, metal tires, a crack grows */
  if (t < C(6)) {
    const heat = ease(t, T.kuch - .1, T.yigil + .4) * (.75 + .25 * Math.sin((t - T.kuch) * 9));
    const crack = ease(t, T.darz - .25, T.darz + 1.0);
    const k = ease(t, C(5), C(6));
    return { cam: { pos: [lerp(-.6, .4, k), lerp(1.75, 2.0, k), lerp(7.2, 6.4, k)], look: [lerp(0, .15, k), lerp(1.58, 1.7, k), 0], fov: 32 },
      world: () => <Panel sq heat={heat} crack={crack} />,
      marks: [{ p: [px2w(CRACK[3])[0], px2w(CRACK[3])[1] + 1.9, .02], s: 'darz', a: env(t, T.darz + .4, C(6) + .2, .3, .2), col: RED, up: 120, side: -200 }] };
  }
  /* G test: expected 10 000 flights, broke at about 3 000 */
  if (t < C(7)) {
    const ang = .5 + (t - C(6)) * .09;
    return { cam: { pos: [Math.sin(ang) * 8.4, 3.4, Math.cos(ang) * 8.4], look: [0, .4, 0], fov: 34 },
      world: (m) => <><Plane />{!m && <Shadow a={.35} len={9} />}</>, marks: [] };
  }
  /* H round window: the force flows around evenly */
  if (t < C(8)) {
    const heat = ease(t, T.kuch2 - .2, T.aylana + .4) * .85; const k = ease(t, C(7), C(8));
    return { cam: panelCam(k, -.9), world: () => <Panel sq={false} heat={heat} ry={lerp(-.15, .05, k)} />, marks: [] };
  }
  /* I joke: the window seat */
  if (t < C(9)) {
    const k = ease(t, C(8), C(9));
    return { cam: mixCam({ pos: [-1.2, FY + .5, 3.4], look: [.4, FY + .1, 0], fov: 30 }, { pos: [-.4, FY + .4, 3.0], look: [.8, FY + .1, 0], fov: 30 }, k),
      world: (m) => <><Plane />{!m && <Shadow a={.35} len={9} />}</>,
      marks: [{ p: [.9, FY + .12, FR], s: 'deraza yoni', a: env(t, T.deraza - .1, C(9) + .2, .3, .2), col: GRN, up: 190, side: -170 }] };
  }
  /* J share */
  const ang = .9 + (t - C(9)) * .25;
  return { cam: { pos: [Math.sin(ang) * 8.2, 3.0, Math.cos(ang) * 8.2], look: [0, .5, 0], fov: 32 }, world: (m) => <><Plane />{!m && <Shadow a={.35} len={9} />}</>, marks: [] };
}

const Caps: React.FC<{ t: number }> = ({ t }) => {
  let cur: typeof CAPS[number] | null = null; for (const l of CAPS) if (t >= l[0].s - .05) cur = l;
  if (!cur || t > cur[cur.length - 1].e + .45 || t > END - 2.2) return null;
  const ws = cur.filter((o) => o.w !== '—').map((o) => ({ ...o, w: o.w.replace(/\s?—$/, '') }));
  if (!ws.length) return null;
  const a = eout(P(t, cur[0].s - .05, cur[0].s + .08)), txt = ws.map((o) => o.w).join(' ');
  const fs = Math.min(88, Math.floor(1700 / Math.max(8, txt.length)));
  return <div style={{ position: 'absolute', left: 40, width: W - 80, top: 1300, display: 'flex', justifyContent: 'center', gap: 18, opacity: a, scale: String(lerp(.86, 1, eback(P(t, cur[0].s - .05, cur[0].s + .18)))), fontFamily: SANS, fontWeight: 800, fontSize: fs, whiteSpace: 'nowrap' }}>
    {ws.map((o, i) => <span key={i} style={o.k ? { color: INK, background: Y, padding: '0 14px', borderRadius: 14 } : { color: INK }}>{o.w}</span>)}
  </div>;
};
const Brand: React.FC<{ t: number }> = ({ t }) => {
  let ci = 0; CH.forEach(([s], i) => { if (t >= s) ci = i; });
  return <>
    <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
    {t < END - 4 && <TopPill s={CH[ci][1]} a={eout(P(t, CH[ci][0], CH[ci][0] + .3))} y={372} />}
  </>;
};
const Src: React.FC<{ t: number }> = ({ t }) => {
  const s = t < C(1) ? '3D: Comet 4 — helijah (Sketchfab, CC BY)'
    : t < C(4) && t > C(1) ? 'Manba: FAA «Lessons Learned», Smithsonian · oyna — sxema'
    : t > C(4) && t < C(7) ? 'Manba: FAA «Lessons Learned» · kuchlanish xaritasi sxematik'
    : t > C(7) && t < C(8) ? 'sxema: kuchlanish dumaloq oyna atrofida tekis' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};
const Strike: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, T.kutil - .1, C(7) - .05, .25, .2); if (a <= 0) return null;
  const s = eout(P(t, T.taxminan - .1, T.taxminan + .35)), b = eout(P(t, T.uch - .1, T.uch + .4)), bar = eout(P(t, T.uch, T.yoril + .3));
  return <div style={{ position: 'absolute', left: 0, width: W, top: 480, opacity: a, textAlign: 'center' }}>
    <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: INK, letterSpacing: 1 }}>KUTILGAN</div>
    <div style={{ position: 'relative', display: 'inline-block', fontFamily: HEAD, fontWeight: 700, fontSize: 120, color: INK, lineHeight: 1.05, opacity: lerp(1, .55, s) }}>10 000
      <div style={{ position: 'absolute', left: -10, top: '52%', height: 12, width: `${(s * 105).toFixed(1)}%`, background: RED, borderRadius: 6, rotate: '-4deg' }} /></div>
    <div style={{ opacity: b, scale: String(lerp(.6, 1, eback(P(t, T.uch - .1, T.uch + .35)))), marginTop: 6 }}>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 150, color: RED, lineHeight: 1 }}>≈3 000</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 30, color: INK, letterSpacing: 1 }}>PARVOZDA YORILDI</div>
    </div>
    <div style={{ margin: '26px auto 0', width: 700, height: 26, borderRadius: 13, background: 'rgba(28,30,35,.12)', overflow: 'hidden', opacity: b }}>
      <div style={{ width: `${(bar * 30).toFixed(1)}%`, height: '100%', background: RED, borderRadius: 13 }} /></div>
  </div>;
};
/* flight-cycle counter in the pressure chapter */
const Cycle: React.FC<{ t: number }> = ({ t }) => {
  const a = env(t, T.har - .1, C(5) - .05, .25, .2); if (a <= 0) return null;
  const inA = t > T.havo - .1 && t < T.qonish, outA = t >= T.qonish && t < T.fyuz;
  const n = t < T.fyuz ? 1 : 1 + Math.floor((t - T.fyuz) / 1.1 + .5);
  return <div style={{ position: 'absolute', left: 0, width: W, top: 500, opacity: a, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 96, color: INK, lineHeight: 1 }}>{n} <span style={{ fontSize: 44 }}>PARVOZ</span></div>
    <div style={{ display: 'flex', gap: 20, fontFamily: SANS, fontWeight: 800, fontSize: 32 }}>
      <span style={{ padding: '8px 22px', borderRadius: 26, background: inA ? BLUE : 'rgba(28,30,35,.08)', color: inA ? '#fff' : 'rgba(28,30,35,.5)' }}>↑ HAVO DAMLANADI</span>
      <span style={{ padding: '8px 22px', borderRadius: 26, background: outA ? '#7a8796' : 'rgba(28,30,35,.08)', color: outA ? '#fff' : 'rgba(28,30,35,.5)' }}>↓ CHIQARILADI</span>
    </div>
  </div>;
};

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t);
  const cut = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const blur = cut * 18;
  const red = env(t, T.parcha - .2, C(3), .3, .4) * .18;
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <AbsoluteFill style={{ background: BG.light }} />
    <AbsoluteFill style={{ filter: blur > .3 ? `blur(${blur.toFixed(1)}px)` : undefined }}>
      <ThreeCanvas width={W} height={H} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <ClipOn />
        <Rig cam={sh.cam} />
        <Studio theme="light">{(m) => sh.world(m)}</Studio>
      </ThreeCanvas>
      {!cover && sh.marks.map((k, i) => <Callout key={i} at={project(sh.cam, k.p)} s={k.s} a={k.a} col={k.col} up={k.up} side={k.side} ink="rgba(28,30,35,.55)" />)}
    </AbsoluteFill>
    {red > 0 && <AbsoluteFill style={{ background: `rgba(200,30,20,${red.toFixed(3)})` }} />}
    {!cover && <>
      <BigNum subCol={INK} v="1952" sub="birinchi reaktiv yo‘lovchi samolyoti" y={590} a={env(t, T.y1952 - .1, SUB - .05, .25, .2)} col={INK} size={150} />
      <BigNum subCol={INK} v="deyarli kvadrat" sub="Komet 1 oynasi (sxema)" y={540} a={env(t, SUB + .1, C(2) - .05, .25, .2)} col={INK} size={96} />
      <BigNum subCol={INK} v="1954" sub="2 ta Komet osmonda parchalandi" y={590} a={env(t, T.ikkita - .2, C(3) - .05, .25, .2)} col={RED} size={150} />
      <BigNum subCol={INK} v="kuch ✓" sub="tekis taqsimlanadi" y={530} size={96} a={env(t, T.tekis - .2, C(8) - .05, .25, .2)} col={GRN} />
      <Cycle t={t} /><Strike t={t} />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > C(9) - .3 && <ShareEnd t={t} t0={T.buni - .1} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['deraza yonini sevadigan'], ['do‘stingizga', 'y'], ['yuboring']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <Frame t={24.9} cover />
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 1260, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 100, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Nega oynasi<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>dumaloq?</span>
  </div>
</AbsoluteFill>;
