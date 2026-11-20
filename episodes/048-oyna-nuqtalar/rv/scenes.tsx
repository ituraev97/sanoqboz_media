import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { W, H, FPS, Y, RED, GRN, HEAD, SANS, MONO, P, eio, eout, eback, lerp, env, clamp } from '../lib';
import { ShareEnd } from '../kit';
import { Logo } from '../Art';
import { Studio, Rig, GlbCar, Shadow, Cam, V3, mixCam, project, TopPill, Callout, BigNum, BG, PaintMap } from '../s3d';
import { CAPS } from './caps';
import { END, CH, T } from './ep';

const INK = '#1c1e23', F = 'toyama_sedan.glb', UV = '#8b5cff', BLU = '#2F8CFF';
/* 3D: "Generic Toyama XR Sedan" by mk2design (Sketchfab, CC BY). Repainted pearl white; its baked ground-shadow plane is hidden. */
const CC = { clearcoat: 1, clearcoatRoughness: .05 };
const PAINT: PaintMap = [
  [/^Body_Paint/i, '#e9eaec', .45, .25, CC], [/^Shadow/i, '#000000', 0, 1, { visible: false }],
];
const ease = (t: number, a: number, b: number) => eio(P(t, a, b));
const CUTS = [2.6, 5.3, 10.15, 17.2, 22.8, 27.5, 32.25, 35.45, 38.7, 42.9];

/* ---------- windshield (standalone part): trapezoid, frit band + halftone dots + dotted patch behind the mirror ---------- */
const WB = 3.0, WT = 2.3, WHh = 1.5, PX = 500, BAND = .16, ZONE = .24, SP = .05, TILT = -.5, WY = .3;
const hw = (y: number) => lerp(WB / 2, WT / 2, y / WHh);
const COSA = Math.cos(Math.atan(((WB - WT) / 2) / WHh));
const dEdge = (x: number, y: number) => Math.min(y, WHh - y, (hw(y) - Math.abs(x)) * COSA);
const dMirror = (x: number, y: number) => Math.max(Math.abs(x) - .2, (WHh - .42) - y);
const trap = (c: CanvasRenderingContext2D, ins: number) => { const k = (xx: number, yy: number) => [(xx + WB / 2) * PX, (WHh - yy) * PX] as const;
  const s = ins / COSA; c.beginPath(); c.moveTo(...k(-(hw(ins) - s), ins)); c.lineTo(...k(hw(ins) - s, ins)); c.lineTo(...k(hw(WHh - ins) - s, WHh - ins)); c.lineTo(...k(-(hw(WHh - ins) - s), WHh - ins)); c.closePath(); };
/* black frit shapes only (transparent elsewhere) */
const fritCanvas = (dots: boolean) => { const cv = document.createElement('canvas'); cv.width = WB * PX; cv.height = WHh * PX; const c = cv.getContext('2d')!;
  c.fillStyle = '#0b0b0c'; trap(c, 0); c.fill(); c.globalCompositeOperation = 'destination-out'; trap(c, BAND); c.fill(); c.globalCompositeOperation = 'source-over';
  c.beginPath(); c.roundRect((WB / 2 - .2) * PX, 0, .4 * PX, .42 * PX, 18); c.fill();
  if (dots) for (let j = 0, y = 0; y < WHh; j++, y += SP * .87) for (let x = -WB / 2 + (j % 2 ? SP / 2 : 0); x < WB / 2; x += SP) {
    const de = dEdge(x, y); if (de < 0) continue; const d = Math.min(de - BAND, dMirror(x, y)); if (d <= 0 || d > ZONE) continue;
    const r = SP * .52 * Math.pow(1 - d / ZONE, .8); if (r < .003) continue; c.beginPath(); c.arc((x + WB / 2) * PX, (WHh - y) * PX, r * PX, 0, Math.PI * 2); c.fill(); }
  return cv; };
const toTex = (cv: HTMLCanvasElement) => { const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const glassTex = (dots: boolean) => { const cv = document.createElement('canvas'); cv.width = WB * PX; cv.height = WHh * PX; const c = cv.getContext('2d')!;
  c.fillStyle = 'rgba(40,70,80,.26)'; trap(c, 0); c.fill(); c.drawImage(fritCanvas(dots), 0, 0); return toTex(cv); };
const heatTex = (dots: boolean) => { const src = fritCanvas(dots); const cv = document.createElement('canvas'); cv.width = src.width; cv.height = src.height; const c = cv.getContext('2d')!;
  c.filter = `blur(${dots ? 16 : 3}px)`; c.drawImage(src, 0, 0); if (dots) c.drawImage(src, 0, 0); c.filter = 'none'; c.globalCompositeOperation = 'source-in'; c.fillStyle = '#ff5a1f'; c.fillRect(0, 0, cv.width, cv.height); return toTex(cv); };
const bendZ = (x: number) => -.12 * Math.pow(x / (WB / 2), 2);
const wsGeo = () => { const g = new THREE.PlaneGeometry(WB, WHh, 60, 30); g.translate(0, WHh / 2, 0); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) p.setZ(i, bendZ(p.getX(i))); g.computeVertexNormals(); return g; };
/* world point of a windshield point (x across, y up the glass, z off the surface) */
const wsP = (x: number, y: number, z = 0): V3 => { const zz = bendZ(x) + z; return [x, WY + y * Math.cos(TILT) - zz * Math.sin(TILT), y * Math.sin(TILT) + zz * Math.cos(TILT)]; };

/* grid seen through the glass; it bends near the frit edge while 'warp' > 0 (lensing) */
const Grid: React.FC<{ warp: number; a: number }> = ({ warp, a }) => {
  const geo = useMemo(() => { const pts: number[] = []; const N = 80;
    for (let gx = -1.6; gx <= 1.6001; gx += .1) for (let i = 0; i < N; i++) pts.push(gx, i / N * WHh, 0, gx, (i + 1) / N * WHh, 0);
    for (let gy = 0; gy <= WHh + .001; gy += .1) for (let i = 0; i < N; i++) pts.push(-1.6 + i / N * 3.2, gy, 0, -1.6 + (i + 1) / N * 3.2, gy, 0);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); g.userData.base = Float32Array.from(pts); return g; }, []);
  const p = geo.attributes.position as THREE.BufferAttribute, b = geo.userData.base as Float32Array, arr = p.array as Float32Array;
  for (let i = 0; i < arr.length; i += 3) { const x = b[i], y = b[i + 1]; const de = Math.max(0, dEdge(x, y)); const k = warp * Math.exp(-Math.pow((de - BAND) / .14, 2));
    arr[i] = x + k * .12 * Math.sin(y * 31 + x * 7); arr[i + 1] = y + k * .1 * Math.sin(x * 29 + y * 5); arr[i + 2] = bendZ(x) - .05; }
  p.needsUpdate = true;
  return <lineSegments geometry={geo} renderOrder={1}><lineBasicMaterial color="#1c1e23" transparent opacity={.55 * a} /></lineSegments>;
};
const Windshield: React.FC<{ sharp?: number; heat?: number; heatSharp?: number; grid?: number; warp?: number; mirror?: number; cloth?: number; sun?: number }> = ({ sharp = 0, heat = 0, heatSharp = 0, grid = 0, warp = 0, mirror = 0, cloth = -1, sun = 0 }) => {
  const geo = useMemo(wsGeo, []);
  const gD = useMemo(() => glassTex(true), []), gS = useMemo(() => glassTex(false), []), hD = useMemo(() => heatTex(true), []), hS = useMemo(() => heatTex(false), []);
  return <group position={[0, WY, 0]} rotation={[TILT, 0, 0]}>
    <mesh geometry={geo} renderOrder={4}><meshPhysicalMaterial map={gD} transparent opacity={1 - sharp} roughness={.06} metalness={.1} clearcoat={1} side={THREE.DoubleSide} depthWrite={false} /></mesh>
    {sharp > 0 && <mesh geometry={geo} renderOrder={4}><meshPhysicalMaterial map={gS} transparent opacity={sharp} roughness={.06} metalness={.1} clearcoat={1} side={THREE.DoubleSide} depthWrite={false} /></mesh>}
    {heat > 0 && <mesh geometry={geo} position={[0, 0, .004]} renderOrder={6}><meshBasicMaterial map={hD} transparent opacity={heat * (1 - heatSharp)} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>}
    {heat > 0 && heatSharp > 0 && <mesh geometry={geo} position={[0, 0, .004]} renderOrder={6}><meshBasicMaterial map={hS} transparent opacity={heat * heatSharp} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>}
    {grid > 0 && <group position={[0, 0, -.02]}><Grid warp={warp} a={grid} /></group>}
    {mirror > 0 && <group position={[0, WHh - .36, -.16]}>
      <mesh position={[0, .1, .08]}><boxGeometry args={[.06, .16, .06]} /><meshStandardMaterial color="#202226" roughness={.5} transparent opacity={mirror} /></mesh>
      <mesh><boxGeometry args={[.62, .17, .07]} /><meshStandardMaterial color="#26282c" roughness={.4} transparent opacity={mirror} /></mesh>
      <mesh position={[0, 0, -.037]}><planeGeometry args={[.58, .14]} /><meshStandardMaterial color="#c9d3dc" metalness={1} roughness={.08} side={THREE.DoubleSide} transparent opacity={mirror} /></mesh>
    </group>}
    {cloth >= 0 && <mesh position={[lerp(-1.7, 1.7, cloth), .14 + .05 * Math.sin(cloth * 18), .07]} rotation={[0, 0, .25 * Math.sin(cloth * 9)]}><boxGeometry args={[.42, .3, .07]} /><meshStandardMaterial color="#5fb3e8" roughness={1} /></mesh>}
    {sun > 0 && <mesh position={[.7, WHh + 1.4, 1.6]}><sphereGeometry args={[.32, 32, 24]} /><meshBasicMaterial color="#ffd04a" toneMapped={false} transparent opacity={sun} /></mesh>}
    <mesh rotation={[0, 0, 0]} position={[0, -.03, -.02]}><boxGeometry args={[WB * .96, .02, .02]} /><meshBasicMaterial color="#000" transparent opacity={0} /></mesh>
  </group>;
};

/* ---------- cross-section at the bottom edge: body flange, urethane bead, glass with frit underneath ---------- */
const SX0 = -2.1, SX1 = 2.4, SFE = -.2, SDE = .9, SD = 1.6; // glass x range, frit end, dots end, depth
const sectionTex = () => { const pw = 500, cv = document.createElement('canvas'); cv.width = (SX1 - SX0) * pw; cv.height = SD * pw; const c = cv.getContext('2d')!; c.fillStyle = '#0b0b0c';
  c.fillRect(0, 0, (SFE - SX0) * pw, cv.height); const sp = .09;
  for (let x = SFE + sp / 2; x < SDE; x += sp) for (let z = sp / 2; z < SD; z += sp) { const r = sp * .5 * Math.pow(1 - (x - SFE) / (SDE - SFE), .8); c.beginPath(); c.arc((x - SX0) * pw, z * pw, r * pw, 0, 7); c.fill(); }
  return toTex(cv); };
const Beam: React.FC<{ a: V3; b: V3; col: string; op: number; r?: number }> = ({ a, b, col, op, r = .018 }) => {
  const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b), len = va.distanceTo(vb); if (len < .01 || op <= 0) return null;
  const mid = va.clone().add(vb).multiplyScalar(.5), q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vb.clone().sub(va).normalize());
  return <mesh position={mid} quaternion={q} renderOrder={8}><cylinderGeometry args={[r, r, len, 8]} /><meshBasicMaterial color={col} toneMapped={false} transparent opacity={op} depthWrite={false} /></mesh>;
};
const Section: React.FC<{ t: number; gy: number; bead: number; squash: number; frit: number; rough: number; rays: number; burn: number }> = ({ t, gy, bead, squash, frit, rough, rays, burn }) => {
  const tex = useMemo(sectionTex, []);
  const bumps = useMemo(() => { const m = new THREE.InstancedMesh(new THREE.SphereGeometry(.022, 10, 8), new THREE.MeshStandardMaterial({ color: '#141416', roughness: .9 }), 140);
    let s = 7; const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; const o = new THREE.Object3D();
    for (let i = 0; i < 140; i++) { o.position.set(lerp(SX0 + .05, SFE - .05, r()), 0, lerp(-SD / 2 + .05, SD / 2 - .05, r())); o.scale.setScalar(.5 + r()); o.updateMatrix(); m.setMatrixAt(i, o.matrix); } return m; }, []);
  const beadCol = new THREE.Color('#2a2c30').lerp(new THREE.Color('#d8442b'), burn);
  const fy = gy - .015; // frit level (underside of the glass)
  const rx = [-1.85, -1.4, -.95, -.5, .05, .55, 1.1, 1.65, 2.15];
  return <group>
    {/* body flange (L profile) */}
    <mesh position={[-1.15, -.08, 0]}><boxGeometry args={[2.3, .16, SD]} /><meshStandardMaterial color="#8d99ab" metalness={.6} roughness={.35} /></mesh>
    <mesh position={[-2.22, -.55, 0]}><boxGeometry args={[.16, 1.0, SD]} /><meshStandardMaterial color="#8d99ab" metalness={.6} roughness={.35} /></mesh>
    {/* urethane bead, drawn on along z, then squashed by the glass */}
    {bead > 0 && <mesh position={[-1.1, .17 * squash, -SD / 2 + SD * bead / 2]} scale={[1, squash, 1]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.19, .19, SD * bead, 28]} /><meshStandardMaterial color={beadCol} roughness={.9} emissive={beadCol} emissiveIntensity={burn * .4} /></mesh>}
    {/* glass slab + frit underneath */}
    <mesh position={[(SX0 + SX1) / 2, gy + .06, 0]} renderOrder={5}><boxGeometry args={[SX1 - SX0, .12, SD]} /><meshPhysicalMaterial color="#a9dde0" transparent opacity={.32} roughness={.05} metalness={.1} clearcoat={1} depthWrite={false} /></mesh>
    <mesh position={[(SX0 + SX1) / 2, fy + .012, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={6}><planeGeometry args={[SX1 - SX0, SD]} /><meshStandardMaterial map={tex} transparent opacity={frit} alphaTest={.01} side={THREE.DoubleSide} depthWrite={false} roughness={.8} />
    </mesh>
    {frit > .3 && <primitive object={bumps} position={[0, fy, 0]} scale={[1 + rough * .5, 1 + rough * .5, 1 + rough * .5]} />}
    {/* sun rays (UV): stop on the frit, pass through clear glass */}
    {rays > 0 && rx.map((x, i) => { const p = clamp(rays * 1.6 - i * .07); const over = x < SFE; const yEnd = over ? (frit > .5 ? gy : -.0 + (x > -1.4 && x < -.8 ? .32 : 0)) : -.02;
      const a: V3 = [x + .9, 3.4, (i % 3 - 1) * .4], b: V3 = [x + .9 * (yEnd + 0) / 3.4, yEnd, (i % 3 - 1) * .4]; const e: V3 = [lerp(a[0], b[0], p), lerp(a[1], b[1], p), a[2]];
      return <group key={i}><Beam a={a} b={e} col={UV} op={.85} />{p > .98 && over && <mesh position={b}><sphereGeometry args={[.06, 12, 10]} /><meshBasicMaterial color={frit > .5 ? '#c6a8ff' : '#ff6a4a'} toneMapped={false} transparent opacity={.6 + .4 * Math.sin(t * 20 + i)} /></mesh>}</group>; })}
  </group>;
};
/* section anchor points (world) for callouts */
const SP_BEAD: V3 = [-1.1, .2, .8], SP_FRIT: V3 = [-1.6, .2, .8], SP_DOTS: V3 = [.4, .22, .8];

type Mark = { p: V3; s: string; a: number; col?: string; up?: number; side?: number };
type Shot = { cam: Cam; world: (m: boolean) => React.ReactNode; marks: Mark[]; blur?: number };

function shot(t: number): Shot {
  const car = (o: Partial<React.ComponentProps<typeof GlbCar>> = {}) => (m: boolean) => <><GlbCar file={F} paint={PAINT} {...o} />{!m && <Shadow a={.45} />}</>;
  const ws = (o: React.ComponentProps<typeof Windshield> = {}) => (m: boolean) => m ? null : <Windshield {...o} />;
  /* A1 hook on the car (0–2.6) */
  if (t < CUTS[0]) {
    const ang = lerp(.75, .95, ease(t, -.5, CUTS[0]));
    return { cam: mixCam({ pos: [Math.sin(ang) * 7.6, 2.1, Math.cos(ang) * 7.6], look: [.6, .8, 0], fov: 32 }, { pos: [Math.sin(ang) * 6.0 + .6, 2.0, Math.cos(ang) * 6.0], look: [.35, .85, 0], fov: 30 }, ease(t, .6, CUTS[0])),
      world: car(), marks: [{ p: [.15, 1.15, .35], s: 'qora nuqtalar', a: env(t, T.qora - .2, CUTS[0] + .2, .3, .2), col: Y, up: 150, side: 40 }] };
  }
  /* A2 macro on the corner dots (2.6–5.3) */
  if (t < CUTS[1]) {
    return { cam: mixCam({ pos: [-.95, .75, 1.25], look: [-1.0, .45, 0], fov: 30 }, { pos: [-.7, 1.0, 2.4], look: [-.8, .6, 0], fov: 30 }, ease(t, CUTS[0], CUTS[1])), world: ws(),
      marks: [{ p: wsP(-1.12, .3), s: 'nima uchun?', a: env(t, T.hamma - .2, CUTS[1] + .2, .3, .2), col: Y, up: 140, side: 60 }] };
  }
  /* B frit = baked ceramic enamel (5.3–10.15) */
  if (t < CUTS[2]) {
    const ang = lerp(-.25, .2, ease(t, CUTS[1], CUTS[2]));
    const kiln = env(t, T.pishirib - .1, T.keramik + .3, .35, .5);
    return { cam: { pos: [Math.sin(ang) * 5.2, 1.9, Math.cos(ang) * 5.2], look: [0, .85, 0], fov: 34 }, world: ws({ heat: kiln }),
      marks: [{ p: wsP(-.7, .08), s: 'frit', a: env(t, T.frit - .1, CUTS[2] + .2, .3, .2), col: Y, up: 170 },
        { p: wsP(.75, .1), s: 'keramik emal', a: env(t, T.keramik - .1, CUTS[2] + .2, .3, .2), col: '#ff8a3d', up: 260 }] };
  }
  /* C job 1: glue + rough surface (10.15–17.2) */
  if (t < CUTS[3]) {
    const gy = lerp(1.25, .22, eio(P(t, T.yopish - .1, T.yopish + .55)));
    const squash = lerp(1, .58, eio(P(t, T.yopish + .2, T.yopish + .55)));
    return { cam: mixCam({ pos: [.4, 1.1, 4.4], look: [-.6, .3, 0], fov: 32 }, { pos: [-.2, .7, 3.3], look: [-1.0, .25, 0], fov: 30 }, ease(t, T.gadir - .5, T.gadir + .6)),
      world: (m) => m ? null : <Section t={t} gy={gy} bead={ease(t, T.elim - .2, T.elim + .5)} squash={squash} frit={1} rough={env(t, T.gadir, CUTS[3], .3, .4)} rays={0} burn={0} />,
      marks: [{ p: SP_BEAD, s: 'elim', a: env(t, T.elim, T.gadir - .2, .3, .2), col: Y, up: 330 }, { p: [-.6, -.1, .8], s: 'kuzov', a: env(t, T.oyna, T.elim - .1, .3, .2), col: '#8d99ab', up: 0 },
        { p: SP_FRIT, s: 'g‘adir-budir', a: env(t, T.gadir, CUTS[3] + .2, .3, .2), col: Y, up: 360, side: 200 }, { p: SP_BEAD, s: 'mahkam', a: env(t, T.mahkam, CUTS[3] + .2, .3, .2), col: GRN, up: 150, side: 120 }] };
  }
  /* D job 2: UV vs glue (17.2–22.8) */
  if (t < CUTS[4]) {
    const frit = ease(t, T.tasma - .1, T.tasma + .4); const burn = env(t, T.yemiradi - .3, T.tasma + .4, .5, .4);
    return { cam: mixCam({ pos: [1.2, 1.7, 3.8], look: [-.4, .55, 0], fov: 32 }, { pos: [.8, 1.3, 3.4], look: [-.6, .45, 0], fov: 32 }, ease(t, CUTS[3], CUTS[4])),
      world: (m) => m ? null : <Section t={t} gy={.22} bead={1} squash={.58} frit={t < T.quyosh ? 1 : t < T.tasma ? 0 : frit} rough={0} rays={P(t, T.quyosh - .1, T.quyosh + 1.2)} burn={burn} />,
      marks: [{ p: SP_BEAD, s: 'yemiriladi', a: env(t, T.yemiradi, T.tasma, .25, .2), col: RED, up: 300 }, { p: SP_BEAD, s: 'himoyada', a: env(t, T.ultra, CUTS[4] + .2, .3, .2), col: GRN, up: 300 },
        { p: [1.2, 2.6, 0], s: 'ultrabinafsha', a: env(t, T.ultra - .2, CUTS[4] + .2, .3, .2), col: UV, up: 0 }] };
  }
  /* E twist: the band heats faster (22.8–27.5) */
  if (t < CUTS[5]) {
    const heat = .75 * ease(t, T.quyoshda, T.qiziydi + .3);
    return { cam: mixCam({ pos: [.4, 2.3, 4.6], look: [-.2, .8, 0], fov: 34 }, { pos: [-.3, 1.2, 2.6], look: [-.7, .45, 0], fov: 32 }, ease(t, T.endi, T.tezroq)), world: ws({ heat, sun: ease(t, T.quyoshda - .3, T.quyoshda + .3) }),
      marks: [{ p: wsP(-1.15, .1), s: 'issiq', a: env(t, T.tezroq - .1, CUTS[5] + .2, .3, .2), col: RED, up: 150, side: 40 }, { p: wsP(-.45, .62), s: 'salqin', a: env(t, T.tiniq, CUTS[5] + .2, .3, .2), col: BLU, up: 120, side: 40 }] };
  }
  /* F sharp border -> lensing (27.5–32.25) */
  if (t < CUTS[6]) {
    const warp = ease(t, T.qiyshiq - .2, T.qiyshiq + .5) * (1 + .25 * Math.sin(t * 7));
    return { cam: mixCam({ pos: [-.2, 1.5, 3.4], look: [-.4, .6, 0], fov: 32 }, { pos: [-.35, 1.2, 2.8], look: [-.5, .5, 0], fov: 30 }, ease(t, CUTS[5], CUTS[6])), world: ws({ sharp: 1, heat: .8, heatSharp: 1, grid: 1, warp }),
      marks: [{ p: wsP(-.2, .17), s: 'keskin chegara', a: env(t, T.keskin - .1, T.qiyshiq, .3, .2), col: RED, up: 230 }, { p: wsP(-.2, .2), s: 'linza effekti', a: env(t, T.linza - .2, CUTS[6] + .2, .3, .2), col: RED, up: 230 }] };
  }
  /* G dots shrink -> smooth heat, straight image (32.25–35.45) */
  if (t < CUTS[7]) {
    const fix = ease(t, T.nuqtalar, T.kichrayib + .5);
    return { cam: mixCam({ pos: [-.35, 1.2, 2.8], look: [-.5, .5, 0], fov: 30 }, { pos: [-.5, 1.5, 3.4], look: [-.6, .6, 0], fov: 32 }, ease(t, CUTS[6], CUTS[7])), world: ws({ sharp: 1 - fix, heat: .8, heatSharp: 1 - fix, grid: 1, warp: (1 - fix) * 1.1 }),
      marks: [{ p: wsP(-.2, .22), s: 'silliq', a: env(t, T.silliq - .1, CUTS[7] + .2, .3, .2), col: GRN, up: 230 }] };
  }
  /* H dotted patch behind the mirror = third sun visor (35.45–38.7), seen from the cabin */
  if (t < CUTS[8]) {
    return { cam: mixCam({ pos: [.6, .9, -3.4], look: [0, 1.15, -.6], fov: 32 }, { pos: [.35, .85, -2.9], look: [0, 1.2, -.6], fov: 30 }, ease(t, CUTS[7], CUTS[8])), world: ws({ mirror: 1, sun: 1 }),
      marks: [{ p: wsP(.12, WHh - .12, -.01), s: 'uchinchi soyabon', a: env(t, T.uchinchi - .2, CUTS[8] + .2, .3, .2), col: Y, up: 150, side: -40 }] };
  }
  /* I mother-in-law wipes; the dots stay (38.7–42.9) */
  if (t < CUTS[9]) {
    const cloth = t < T.artib - .2 ? -1 : P(t, T.artib - .2, T.ovora + .3);
    return { cam: mixCam({ pos: [.2, 2.0, 5.6], look: [0, .75, 0], fov: 34 }, { pos: [.1, 1.8, 5.2], look: [0, .7, 0], fov: 34 }, ease(t, CUTS[8], CUTS[9])), world: ws({ cloth: cloth > 0 ? (cloth * 2) % 1 : -1 }),
      marks: [{ p: wsP(.6, .12), s: 'o‘chmaydi', a: env(t, T.ovora - .1, CUTS[9] + .2, .3, .2), col: GRN, up: 220 }] };
  }
  /* J share */
  const ang = .7 + (t - CUTS[9]) * .25;
  return { cam: { pos: [Math.sin(ang) * 9, 2.4, Math.cos(ang) * 9], look: [0, .7, 0], fov: 32 }, world: car(), marks: [] };
}

const Caps: React.FC<{ t: number }> = ({ t }) => {
  let cur: typeof CAPS[number] | null = null; for (const l of CAPS) if (t >= l[0].s - .05) cur = l;
  if (!cur || t > cur[cur.length - 1].e + .45 || t > END - 2.2) return null;
  const a = eout(P(t, cur[0].s - .05, cur[0].s + .08)), txt = cur.map((o) => o.w).join(' ');
  const fs = Math.min(88, Math.floor(1700 / Math.max(8, txt.length)));
  return <div style={{ position: 'absolute', left: 40, width: W - 80, top: 1300, display: 'flex', justifyContent: 'center', gap: 18, opacity: a, scale: String(lerp(.86, 1, eback(P(t, cur[0].s - .05, cur[0].s + .18)))), fontFamily: SANS, fontWeight: 800, fontSize: fs, whiteSpace: 'nowrap' }}>
    {cur.map((o, i) => <span key={i} style={o.k ? { color: INK, background: Y, padding: '0 14px', borderRadius: 14 } : { color: INK }}>{o.w}</span>)}
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
  const s = t > CUTS[1] && t < CUTS[7] ? 'Manba: Hackaday, Motor1, Reader’s Digest, SlashGear · kesim — sxematik' : t > CUTS[7] && t < CUTS[8] ? 'Manba: Hackaday, Reader’s Digest' : '';
  return s ? <div style={{ position: 'absolute', left: 0, width: W, top: 1440, textAlign: 'center', fontFamily: MONO, fontSize: 20, color: 'rgba(28,30,35,.55)' }}>{s}</div> : null;
};
/* big chip: "bo‘yoq ✗" */
const Chip: React.FC<{ s: string; a: number; col: string; y: number }> = ({ s, a, col, y }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: W / 2, top: y, translate: '-50% -50%', opacity: a, scale: String(.8 + .2 * eback(a)), padding: '14px 34px', borderRadius: 24, background: col, color: '#fff', fontFamily: HEAD, fontWeight: 700, fontSize: 64, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap', boxShadow: '0 14px 40px rgba(0,0,0,.18)' }}>{s}</div>;

export const Frame: React.FC<{ t: number; cover?: boolean }> = ({ t, cover }) => {
  const sh = shot(t);
  const cut = CUTS.reduce((m, c) => Math.max(m, Math.exp(-Math.pow((t - c) / .09, 2))), 0);
  const blur = Math.max(cut * 18, (sh.blur ?? 0) * 10);
  const tint = env(t, T.endi - .1, T.qiziq + .9, .15, .5) * .22;
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <AbsoluteFill style={{ background: BG.light }} />
    <AbsoluteFill style={{ filter: blur > .3 ? `blur(${blur.toFixed(1)}px)` : undefined }}>
      <ThreeCanvas width={W} height={H} gl={{ antialias: true, preserveDrawingBuffer: true }}>
        <Rig cam={sh.cam} />
        <Studio theme="light">{(m) => sh.world(m)}</Studio>
      </ThreeCanvas>
      {!cover && sh.marks.map((k, i) => <Callout key={i} at={project(sh.cam, k.p)} s={k.s} a={k.a} col={k.col} up={k.up} side={k.side} ink="rgba(28,30,35,.55)" />)}
    </AbsoluteFill>
    {tint > 0 && <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(236,58,44,0) 30%, rgba(236,58,44,${tint * 3}) 100%)` }} />}
    {!cover && <>
      <Chip s="bo‘yoq ✗" a={env(t, T.boyoq - .05, T.frit - .1, .2, .2)} col={RED} y={640} />
      <BigNum subCol={INK} v="1" sub="elim" y={1100} a={env(t, T.birinchi - .1, T.oyna, .25, .2)} col={INK} size={200} />
      <BigNum subCol={INK} v="2" sub="quyosh" y={1100} a={env(t, T.ikkinchi - .1, T.quyosh, .25, .2)} col={Y} size={200} />
      <BigNum subCol={INK} v="3" sub="soyabon" y={1120} a={env(t, T.uchinchi - .1, CUTS[8], .25, .2)} col={Y} size={200} />
      <Brand t={t} /><Src t={t} /><Caps t={t} />
      {t > CUTS[9] - .3 && <ShareEnd t={t} t0={T.dost - 1.3} pick={T.dost + .1} sentAt={T.yub + .3} lines={[['mashinasi bor'], ['do‘stingizga', 'y'], ['yuboring']]} />}
    </>}
  </AbsoluteFill>;
};
export const Video: React.FC = () => { const f = useCurrentFrame(); return <Frame t={f / FPS} />; };
export const Cover: React.FC = () => <AbsoluteFill>
  <AbsoluteFill style={{ background: BG.light }} />
  <Frame t={4.2} cover />
  <div style={{ position: 'absolute', left: 70, top: 262, display: 'flex', alignItems: 'center', gap: 14 }}><Logo size={50} /><span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, color: INK }}>@sanoqboz</span></div>
  <div style={{ position: 'absolute', left: 60, width: W - 120, top: 330, textAlign: 'center', fontFamily: HEAD, fontWeight: 700, fontSize: 100, lineHeight: 1.12, color: INK, textTransform: 'uppercase' }}>
    Oynadagi<br /><span style={{ background: Y, padding: '0 22px', borderRadius: 18, display: 'inline-block', lineHeight: 1.05 }}>qora nuqtalar</span><br />nima uchun?
  </div>
</AbsoluteFill>;
