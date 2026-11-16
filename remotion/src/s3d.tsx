/* s3d.tsx — sanoqboz 3D studio kit (three.js through @remotion/three).
   Look modelled on the owner's reference (2026-11-17): light-grey studio, vertical light tubes, glossy floor with a
   reflection, one hero car in the middle, x-ray mode with highlighted parts, small dot callouts, big 1-2 word captions.
   Everything is a pure function of t (no useFrame, no clocks). Cars are generic (no real brand design), number plates
   are Uzbek-format and fictional. Render with GL=swangle on CPU-only machines. */
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { W, H, HEAD, SANS, Y, WH, clamp } from './lib';

export type V3 = [number, number, number];
export type Cam = { pos: V3; look: V3; fov: number };
export const mixCam = (a: Cam, b: Cam, x: number): Cam => ({
  pos: a.pos.map((v, i) => v + (b.pos[i] - v) * x) as V3, look: a.look.map((v, i) => v + (b.look[i] - v) * x) as V3, fov: a.fov + (b.fov - a.fov) * x });
export const orbit = (r: number, ang: number, h: number, look: V3, fov = 32): Cam => ({ pos: [look[0] + Math.sin(ang) * r, h, look[2] + Math.cos(ang) * r], look, fov });

/* camera driven from t */
/* camera positions in shots are written close to the car; DIST pushes every camera back along its view line (9:16 is narrow) */
export const DIST = 1.7;
const far = (c: Cam): V3 => c.pos.map((v, i) => c.look[i] + (v - c.look[i]) * DIST) as V3;
export const Rig: React.FC<{ cam: Cam }> = ({ cam }) => {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  camera.position.set(...far(cam)); camera.fov = cam.fov; camera.near = .05; camera.far = 300; camera.aspect = W / H;
  camera.updateProjectionMatrix(); camera.lookAt(...cam.look); camera.updateMatrixWorld();
  return null;
};
const PROJ = new THREE.PerspectiveCamera(30, W / H, .05, 300);
/* screen position (px) of a world point, for 2D callouts */
export const project = (cam: Cam, p: V3): [number, number] => {
  PROJ.position.set(...far(cam)); PROJ.fov = cam.fov; PROJ.updateProjectionMatrix(); PROJ.lookAt(...cam.look); PROJ.updateMatrixWorld();
  const v = new THREE.Vector3(...p).project(PROJ); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H];
};

/* environment + tone mapping (studio reflections on the paint) */
export const Env: React.FC<{ k?: number; exp?: number }> = ({ k = 1, exp = 1 }) => {
  const gl = useThree((s) => s.gl), scene = useThree((s) => s.scene);
  const tex = useMemo(() => { const pm = new THREE.PMREMGenerator(gl); const t = pm.fromScene(new RoomEnvironment(), .04).texture; pm.dispose(); return t; }, [gl]);
  scene.environment = tex; scene.environmentIntensity = k; gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = exp;
  return null;
};

/* ---------- textures ---------- */
const canvasTex = (w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) => {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h; draw(cv.getContext('2d')!);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
};
const radial = (inner: string, outer: string) => canvasTex(256, 256, (c) => { const g = c.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, inner); g.addColorStop(1, outer); c.fillStyle = g; c.fillRect(0, 0, 256, 256); });
/* Uzbek plate 520x112 mm: region code | letter 3 digits 2 letters | flag + UZ (fictional numbers only) */
export const plateTex = (region: string, main: string) => canvasTex(1040, 224, (c) => {
  const r = 22; c.fillStyle = '#111'; c.beginPath(); c.roundRect(0, 0, 1040, 224, r); c.fill();
  c.fillStyle = '#f7f7f4'; c.beginPath(); c.roundRect(8, 8, 1024, 208, r - 6); c.fill();
  c.fillStyle = '#111'; c.fillRect(196, 8, 7, 208);
  c.font = 'bold 150px "DejaVu Sans Condensed", "Liberation Sans Narrow", Arial, sans-serif'; c.textBaseline = 'middle'; c.textAlign = 'center';
  c.fillText(region, 102, 120); c.fillText(main, 560, 120);
  const fx = 900, fy = 40, fw = 104, fh = 64; // flag: blue / red line / white / red line / green
  c.fillStyle = '#1EB5E6'; c.fillRect(fx, fy, fw, fh / 3); c.fillStyle = '#fff'; c.fillRect(fx, fy + fh / 3, fw, fh / 3); c.fillStyle = '#1EB53A'; c.fillRect(fx, fy + 2 * fh / 3, fw, fh / 3);
  c.fillStyle = '#CE1126'; c.fillRect(fx, fy + fh / 3 - 2, fw, 4); c.fillRect(fx, fy + 2 * fh / 3 - 2, fw, 4);
  c.strokeStyle = '#999'; c.lineWidth = 2; c.strokeRect(fx, fy, fw, fh);
  c.fillStyle = '#111'; c.font = 'bold 62px "DejaVu Sans", Arial, sans-serif'; c.fillText('UZ', fx + fw / 2, 162);
});

/* ---------- studio ---------- */
const TUBES: [number, number, number][] = [[-7, -16, 7], [-3.4, -19, 8], [-.6, -15, 6], [3.0, -18, 7.5], [6.2, -15.5, 6.5], [10, -19, 8], [-11, -18, 8], [13.5, -16, 7]];
export const Tubes: React.FC = () => <>{TUBES.map(([x, z, h], i) => (
  <mesh key={i} position={[x, 3.2 + h / 2, z]}><boxGeometry args={[.26, h, .26]} /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>))}</>;
export const Floor: React.FC<{ op?: number }> = ({ op = .92 }) => {
  const alpha = useMemo(() => radial('#ffffff', '#000000'), []);
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} renderOrder={1}>
    <circleGeometry args={[26, 64]} />
    <meshStandardMaterial color="#26292e" roughness={.3} metalness={.3} transparent opacity={op} alphaMap={alpha} depthWrite={false} />
  </mesh>;
};
export const Shadow: React.FC<{ x?: number; z?: number; rot?: number; len?: number; a?: number }> = ({ x = 0, z = 0, rot = 0, len = 5.6, a = .75 }) => {
  const tex = useMemo(() => radial('rgba(0,0,0,1)', 'rgba(0,0,0,0)'), []);
  return <mesh rotation={[-Math.PI / 2, 0, rot]} position={[x, .004, z]} renderOrder={2}><planeGeometry args={[len, 2.7]} /><meshBasicMaterial map={tex} transparent opacity={a} depthWrite={false} /></mesh>;
};
/* the whole set: real objects + a mirrored copy under a semi-transparent floor = glossy reflection */
export const Studio: React.FC<{ children: (mirror: boolean) => React.ReactNode; exp?: number }> = ({ children, exp = 1 }) => <>
  <Env exp={exp} />
  <ambientLight intensity={.25} />
  <directionalLight position={[3, 8, 5]} intensity={1.3} />
  <directionalLight position={[-6, 4, -3]} intensity={.5} color="#cfe0ff" />
  <Tubes />
  <group scale={[1, -1, 1]}>{children(true)}</group>
  <Floor />
  {children(false)}
</>;

/* ---------- cars ---------- */
type Kind = 'new' | 'old';
type Spec = { body: THREE.Shape; cabin: THREE.Shape; roof: THREE.Shape; bw: number; cw: number; front: number; rear: number; wx: [number, number]; wz: number; wr: number };
const shape = (f: (s: THREE.Shape) => void) => { const s = new THREE.Shape(); f(s); return s; };
const SPECS: Record<Kind, Spec> = {
  new: {
    body: shape((s) => { s.moveTo(-2.28, .40); s.lineTo(2.18, .40); s.quadraticCurveTo(2.40, .40, 2.40, .62); s.lineTo(2.36, .78); s.quadraticCurveTo(2.30, .92, 2.02, .95);
      s.lineTo(.95, 1.04); s.lineTo(-1.55, 1.06); s.lineTo(-2.18, 1.03); s.quadraticCurveTo(-2.37, 1.0, -2.37, .84); s.lineTo(-2.36, .56); s.quadraticCurveTo(-2.35, .40, -2.28, .40); }),
    cabin: shape((s) => { s.moveTo(1.02, 1.0); s.lineTo(.14, 1.43); s.quadraticCurveTo(-.12, 1.48, -.42, 1.48); s.lineTo(-.95, 1.47); s.quadraticCurveTo(-1.22, 1.45, -1.38, 1.36); s.lineTo(-1.78, 1.02); s.lineTo(1.02, 1.0); }),
    roof: shape((s) => { s.moveTo(.1, 1.445); s.quadraticCurveTo(-.12, 1.49, -.42, 1.495); s.lineTo(-.95, 1.485); s.quadraticCurveTo(-1.15, 1.47, -1.26, 1.43); s.lineTo(.1, 1.445); }),
    bw: 1.62, cw: 1.28, front: 2.40, rear: -2.37, wx: [1.45, -1.45], wz: .84, wr: .36 },
  old: {
    body: shape((s) => { s.moveTo(-2.75, .42); s.lineTo(2.62, .42); s.quadraticCurveTo(2.78, .42, 2.78, .6); s.lineTo(2.76, .86); s.lineTo(2.55, .93); s.lineTo(.85, .97);
      s.lineTo(-1.7, .97); s.lineTo(-2.55, 1.13); s.lineTo(-2.85, 1.16); s.lineTo(-2.82, .95); s.lineTo(-2.85, .6); s.quadraticCurveTo(-2.85, .42, -2.75, .42); }),
    cabin: shape((s) => { s.moveTo(.85, .95); s.lineTo(.3, 1.38); s.lineTo(-1.05, 1.39); s.lineTo(-1.7, .95); s.lineTo(.85, .95); }),
    roof: shape((s) => { s.moveTo(.27, 1.375); s.lineTo(-1.02, 1.385); s.lineTo(-1.1, 1.36); s.lineTo(.3, 1.36); }),
    bw: 1.72, cw: 1.4, front: 2.78, rear: -2.85, wx: [1.62, -1.62], wz: .86, wr: .37 },
};
const extrude = (s: THREE.Shape, depth: number, bevel: number) => {
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * .85, bevelSegments: 4, curveSegments: 14, steps: 1 });
  g.translate(0, 0, -depth / 2); g.computeVertexNormals(); return g;
};
/* crumple: 'front' squeezes the nose (new car, energy absorbed in front of the cabin); 'cabin' = rigid nose pushed into the cabin (old car) */
export type Crush = { c: number; mode: 'front' | 'cabin' };
const dx = (x: number, k: Kind, cr: Crush) => {
  const S = SPECS[k]; if (cr.c <= 0) return x;
  if (cr.mode === 'front') { const xs = S.front - 1.15; return x <= xs ? x : xs + (x - xs) * (1 - cr.c / 1.2); }
  const a = -1.25, b = .9; if (x <= a) return x; if (x >= b) return x - cr.c; return a + (x - a) * (1 - cr.c / (b - a));
};
const deform = (base: ArrayLike<number>, out: Float32Array, k: Kind, cr: Crush) => {
  const S = SPECS[k];
  for (let i = 0; i < out.length; i += 3) {
    const x = base[i], y = base[i + 1], z = base[i + 2]; let nx = x, ny = y, nz = z;
    if (cr.c > 0) {
      nx = dx(x, k, cr);
      if (cr.mode === 'front') { const xs = S.front - 1.15; if (x > xs) { const u = (x - xs) / 1.15; ny = y + Math.sin(u * Math.PI * 4) * cr.c * .07 + (y > .85 ? Math.sin(u * Math.PI) * cr.c * .16 : 0); nz = z * (1 + .06 * cr.c * u) + Math.sin(u * 9 + y * 6) * .02 * cr.c; } }
      else { const a = -1.25, b = .9; if (x > a && x < b) { const u = (x - a) / (b - a); ny = y - (y > 1.0 ? Math.sin(u * Math.PI) * cr.c * .28 : 0) + Math.sin(u * Math.PI * 3) * .05 * cr.c; nz = z * (1 + .05 * cr.c * Math.sin(u * Math.PI)); } }
    }
    out[i] = nx; out[i + 1] = ny; out[i + 2] = nz;
  }
};
const useDeformable = (g: THREE.BufferGeometry) => useMemo(() => ({ g, base: Float32Array.from(g.attributes.position.array as Float32Array) }), [g]);
const applyDeform = (d: { g: THREE.BufferGeometry; base: Float32Array }, k: Kind, cr: Crush) => {
  const pos = d.g.attributes.position as THREE.BufferAttribute; deform(d.base, pos.array as Float32Array, k, cr); pos.needsUpdate = true;
  if (d.g.index || d.g.attributes.normal) d.g.computeVertexNormals(); d.g.computeBoundingSphere();
};

const Wheel: React.FC<{ r: number; spin: number; old?: boolean; xr: number }> = ({ r, spin, old, xr }) => {
  const tire = useMemo(() => { const pts = [[r * .62, -.12], [r * .93, -.125], [r, -.08], [r, .08], [r * .93, .125], [r * .62, .12]].map(([a, b]) => new THREE.Vector2(a, b)); const g = new THREE.LatheGeometry(pts, 40); g.rotateX(Math.PI / 2); return g; }, [r]);
  const op = 1 - xr * .75;
  return <group rotation={[0, 0, -spin]}>
    <mesh geometry={tire}><meshStandardMaterial color="#141516" roughness={.85} transparent={xr > 0} opacity={op} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r * .64, r * .64, .2, 32]} /><meshStandardMaterial color={old ? '#e8e8e2' : '#9ea3aa'} metalness={1} roughness={.22} transparent={xr > 0} opacity={op} /></mesh>
    {!old && Array.from({ length: 5 }, (_, i) => <mesh key={i} rotation={[0, 0, i * Math.PI * 2 / 5]} position={[0, 0, .105]}><boxGeometry args={[.05, r * 1.18, .03]} /><meshStandardMaterial color="#2a2c30" metalness={.8} roughness={.3} transparent={xr > 0} opacity={op} /></mesh>)}
    {old && <mesh position={[0, 0, .115]}><torusGeometry args={[r * .8, r * .07, 8, 36]} /><meshStandardMaterial color="#f4f4f0" roughness={.5} transparent={xr > 0} opacity={op} /></mesh>}
    <mesh position={[0, 0, .11]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[r * .16, r * .16, .03, 20]} /><meshStandardMaterial color="#d8dade" metalness={1} roughness={.2} /></mesh>
  </group>;
};

export type CarProps = { kind?: Kind; paint?: string; roofPaint?: string; x?: number; z?: number; ry?: number; spin?: number; crush?: Crush; xray?: number;
  plate?: [string, string]; zone?: number; capsule?: number; dummy?: number; intr?: number; mirror?: boolean; lift?: number };
export const Car: React.FC<CarProps> = ({ kind = 'new', paint = '#c9ccd1', roofPaint, x = 0, z = 0, ry = 0, spin = 0, crush = { c: 0, mode: 'front' }, xray = 0, plate = ['01', 'A 777 AA'], zone = 0, capsule = 0, dummy = 0, intr = 0, mirror = false, lift = 0 }) => {
  const S = SPECS[kind];
  const body = useDeformable(useMemo(() => extrude(S.body, S.bw, .12), [kind]));
  const cabin = useDeformable(useMemo(() => extrude(S.cabin, S.cw, .07), [kind]));
  const roof = useDeformable(useMemo(() => extrude(S.roof, S.cw + .02, .02), [kind]));
  const edges = useDeformable(useMemo(() => new THREE.EdgesGeometry(extrude(S.body, S.bw, .12), 28), [kind]));
  const cedges = useDeformable(useMemo(() => new THREE.EdgesGeometry(extrude(S.cabin, S.cw, .07), 28), [kind]));
  const ptex = useMemo(() => plateTex(plate[0], plate[1]), [plate[0], plate[1]]);
  for (const d of [body, cabin, roof]) applyDeform(d, kind, crush);
  for (const d of [edges, cedges]) { const pos = d.g.attributes.position as THREE.BufferAttribute; deform(d.base, pos.array as Float32Array, kind, crush); pos.needsUpdate = true; }
  const xr = clamp(xray), solid = 1 - xr, hw = S.bw / 2 + .12;
  const paintMat = <meshPhysicalMaterial color={paint} metalness={.55} roughness={.28} clearcoat={1} clearcoatRoughness={.06} transparent={xr > 0} opacity={lerpN(1, .14, xr)} depthWrite={xr < .5} side={xr > 0 ? THREE.DoubleSide : THREE.FrontSide} />;
  const fx = dx(S.front - .02, kind, crush), rx = S.rear;
  return <group position={[x, lift, z]} rotation={[0, ry, 0]}>
    <mesh geometry={body.g} renderOrder={xr > 0 ? 5 : 0}>{paintMat}</mesh>
    <mesh geometry={cabin.g} renderOrder={xr > 0 ? 5 : 0}><meshPhysicalMaterial color="#0d0f13" metalness={.3} roughness={.05} clearcoat={1} transparent opacity={lerpN(.97, .06, xr)} depthWrite={xr < .5} /></mesh>
    <mesh geometry={roof.g}><meshPhysicalMaterial color={roofPaint ?? paint} metalness={.55} roughness={.28} clearcoat={1} transparent={xr > 0} opacity={lerpN(1, .08, xr)} depthWrite={xr < .5} /></mesh>
    {xr > 0 && <lineSegments geometry={edges.g}><lineBasicMaterial color="#e6f0ff" transparent opacity={.85 * xr} /></lineSegments>}
    {xr > 0 && <lineSegments geometry={cedges.g}><lineBasicMaterial color="#d9e8ff" transparent opacity={.45 * xr} /></lineSegments>}
    {/* arches, lights, grille, plates, mirrors */}
    {S.wx.map((wx, i) => [1, -1].map((sd) => <mesh key={`${i}${sd}`} position={[dx(wx, kind, crush), S.wr, sd * (hw + .004)]} rotation={[0, sd < 0 ? Math.PI : 0, 0]}><circleGeometry args={[S.wr + .085, 32, 0, Math.PI]} /><meshBasicMaterial color="#0b0c0e" transparent opacity={solid} /></mesh>))}
    {[1, -1].map((sd) => <mesh key={`h${sd}`} position={[fx - .03, kind === 'new' ? .84 : .78, sd * (kind === 'new' ? .6 : .66)]}><boxGeometry args={[.08, kind === 'new' ? .07 : .16, kind === 'new' ? .4 : .16]} /><meshBasicMaterial color="#f4f8ff" toneMapped={false} transparent opacity={lerpN(1, .3, xr)} /></mesh>)}
    {[1, -1].map((sd) => <mesh key={`t${sd}`} position={[rx + .01, kind === 'new' ? .9 : 1.0, sd * .62]}><boxGeometry args={[.06, kind === 'new' ? .08 : .14, kind === 'new' ? .36 : .14]} /><meshBasicMaterial color="#ff2a2a" toneMapped={false} transparent opacity={lerpN(1, .3, xr)} /></mesh>)}
    <mesh position={[fx + .005, .62, 0]}><boxGeometry args={[.05, kind === 'new' ? .16 : .12, kind === 'new' ? .9 : 1.3]} /><meshStandardMaterial color={kind === 'new' ? '#0c0d10' : '#d9dbdf'} metalness={kind === 'new' ? .4 : 1} roughness={.2} transparent={xr > 0} opacity={solid} /></mesh>
    {kind === 'old' && [fx + .03, rx - .03].map((bx, i) => <mesh key={`b${i}`} position={[bx, .5, 0]}><boxGeometry args={[.1, .12, S.bw + .3]} /><meshStandardMaterial color="#e6e8ec" metalness={1} roughness={.15} transparent={xr > 0} opacity={solid} /></mesh>)}
    <mesh position={[fx + .06, kind === 'new' ? .5 : .62, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[.52, .112]} /><meshBasicMaterial map={ptex} toneMapped={false} transparent opacity={lerpN(1, .25, xr)} side={mirror ? THREE.DoubleSide : THREE.FrontSide} /></mesh>
    <mesh position={[rx - .02, .62, 0]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[.52, .112]} /><meshBasicMaterial map={ptex} toneMapped={false} transparent opacity={lerpN(1, .25, xr)} side={mirror ? THREE.DoubleSide : THREE.FrontSide} /></mesh>
    {kind === 'new' && [1, -1].map((sd) => <group key={`d${sd}`}>
      <mesh position={[dx(-.15, kind, crush), .4 + .05, sd * (hw - .03)]}><boxGeometry args={[3.0, .1, .06]} /><meshStandardMaterial color="#121316" roughness={.5} transparent={xr > 0} opacity={solid} /></mesh>
      {[.86, -.42, -1.6].map((sx) => <mesh key={sx} position={[dx(sx, kind, crush), .74, sd * (hw + .002)]}><boxGeometry args={[.012, .56, .004]} /><meshBasicMaterial color="#3a0b08" transparent opacity={solid} /></mesh>)}
      {[.45, -.85].map((sx) => <mesh key={`h${sx}`} position={[dx(sx, kind, crush), .93, sd * (hw + .01)]}><boxGeometry args={[.16, .03, .02]} /><meshStandardMaterial color="#d6d8dc" metalness={1} roughness={.2} transparent={xr > 0} opacity={solid} /></mesh>)}
    </group>)}
    {kind === 'new' && [1, -1].map((sd) => <mesh key={`m${sd}`} position={[dx(.88, kind, crush), 1.07, sd * (hw + .05)]}><boxGeometry args={[.16, .1, .12]} />{paintMat}</mesh>)}
    {/* wheels */}
    {S.wx.map((wx, i) => [1, -1].map((sd) => <group key={`w${i}${sd}`} position={[dx(wx, kind, crush), S.wr, sd * S.wz]} rotation={[0, sd < 0 ? Math.PI : 0, 0]}><Wheel r={S.wr} spin={sd < 0 ? -spin : spin} old={kind === 'old'} xr={xr} /></group>))}
    {/* x-ray internals */}
    {xr > .01 && <Internals kind={kind} crush={crush} a={xr} dummy={dummy} />}
    {zone > .01 && <Zone kind={kind} crush={crush} a={zone} />}
    {capsule > .01 && <Capsule kind={kind} crush={crush} a={capsule} />}
    {intr > .01 && <Intrusion kind={kind} a={intr} crush={crush} />}
  </group>;
};
const lerpN = (a: number, b: number, x: number) => a + (b - a) * x;

/* seats + crash-test dummy, visible in x-ray */
const Internals: React.FC<{ kind: Kind; crush: Crush; a: number; dummy: number }> = ({ kind, crush, a, dummy }) => {
  const sx = dx(-.35, kind, crush), lean = crush.mode === 'cabin' ? crush.c * .5 : 0;
  const m = (c: string, o = 1) => <meshStandardMaterial color={c} roughness={.6} transparent opacity={a * o} />;
  return <group>
    {[.42, -.42].map((sz) => <group key={sz} position={[sx, 0, sz]}>
      <mesh position={[0, .62, 0]}><boxGeometry args={[.55, .12, .5]} />{m('#3b4250', .7)}</mesh>
      <mesh position={[-.3, .98, 0]} rotation={[0, 0, .18]}><boxGeometry args={[.12, .7, .5]} />{m('#3b4250', .7)}</mesh>
    </group>)}
    {dummy > 0 && <group position={[sx, 0, .42]} rotation={[0, 0, -lean]}>
      <mesh position={[-.1, .95, 0]}><capsuleGeometry args={[.14, .38, 6, 14]} />{m('#f2c94c', dummy)}</mesh>
      <mesh position={[-.06, 1.34, 0]}><sphereGeometry args={[.11, 20, 16]} />{m('#f2c94c', dummy)}</mesh>
      <mesh position={[.25, .72, 0]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[.07, .38, 6, 10]} />{m('#f2c94c', dummy)}</mesh>
      <mesh position={[.48, .5, 0]}><capsuleGeometry args={[.06, .28, 6, 10]} />{m('#f2c94c', dummy)}</mesh>
      <mesh position={[.42, 1.05, 0]} rotation={[0, 0, -1.1]}><capsuleGeometry args={[.05, .36, 6, 10]} />{m('#f2c94c', dummy)}</mesh>
    </group>}
    <mesh position={[dx(.7, kind, crush), .9, .42]} rotation={[0, Math.PI / 2, .5]}><torusGeometry args={[.17, .025, 8, 28]} />{m('#9aa3b2')}</mesh>
  </group>;
};
/* crumple zone volume with accordion ribs */
const Zone: React.FC<{ kind: Kind; crush: Crush; a: number }> = ({ kind, crush, a }) => {
  const S = SPECS[kind], x0 = S.front - 1.15, x1 = dx(S.front - .02, kind, crush), len = x1 - x0, n = 7;
  return <group>
    <mesh position={[(x0 + x1) / 2, .68, 0]}><boxGeometry args={[len, .52, S.bw + .1]} /><meshBasicMaterial color="#FFB020" transparent opacity={.22 * a} depthWrite={false} toneMapped={false} /></mesh>
    {Array.from({ length: n }, (_, i) => <mesh key={i} position={[x0 + len * (i + .5) / n, .68, 0]} rotation={[0, 0, i % 2 ? .35 : -.35]}><boxGeometry args={[.02, .56, S.bw + .12]} /><meshBasicMaterial color="#FFCF3A" transparent opacity={.75 * a} toneMapped={false} /></mesh>)}
  </group>;
};
const Capsule: React.FC<{ kind: Kind; crush: Crush; a: number }> = ({ kind, crush, a }) => {
  const x0 = dx(-1.5, kind, crush), x1 = dx(.95, kind, crush);
  return <group position={[(x0 + x1) / 2, .95, 0]}>
    <mesh><boxGeometry args={[x1 - x0, .95, 1.62]} /><meshBasicMaterial color="#3D8BFF" transparent opacity={.2 * a} depthWrite={false} toneMapped={false} /></mesh>
    <lineSegments><edgesGeometry args={[new THREE.BoxGeometry(x1 - x0, .95, 1.62)]} /><lineBasicMaterial color="#6FB1FF" transparent opacity={.95 * a} toneMapped={false} /></lineSegments>
  </group>;
};
/* red wedge: how far the front pushed into the driver's footwell */
const Intrusion: React.FC<{ kind: Kind; a: number; crush: Crush }> = ({ kind, a, crush }) => {
  const len = kind === 'old' ? .62 : .07, x1 = dx(.9, kind, crush) + .02;
  return <mesh position={[x1 - len / 2, .55, .42]}><boxGeometry args={[len, .42, .5]} /><meshBasicMaterial color={kind === 'old' ? '#FF3B30' : '#3DDC84'} transparent opacity={.75 * a} toneMapped={false} depthWrite={false} /></mesh>;
};

/* concrete crash barrier */
export const Barrier: React.FC<{ x: number; a?: number }> = ({ x, a = 1 }) => <group position={[x, 0, 0]}>
  <mesh position={[.35, .8, 0]}><boxGeometry args={[.7, 1.6, 3.2]} /><meshStandardMaterial color="#8d9096" roughness={.9} transparent={a < 1} opacity={a} /></mesh>
  {[-1, 0, 1].map((k) => <mesh key={k} position={[-.002, .8 + k * .45, 0]}><boxGeometry args={[.01, .14, 3.2]} /><meshBasicMaterial color="#FFCF3A" transparent opacity={a} /></mesh>)}
</group>;

/* ---------- 2D overlay pieces in the reference style ---------- */
export const TopPill: React.FC<{ s: string; a: number; y?: number }> = ({ s, a, y = 350 }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: W / 2, top: y, translate: '-50% -50%', opacity: a, padding: '14px 30px', borderRadius: 40, background: 'rgba(20,22,26,.42)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', fontFamily: SANS, fontWeight: 800, fontSize: 32, letterSpacing: 1.5, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{s}</div>;
/* dot callout at a projected 3D point, label above with a thin leader */
export const Callout: React.FC<{ at: [number, number]; s: string; a: number; col?: string; up?: number; side?: number }> = ({ at, s, a, col = Y, up = 120, side = 0 }) => a <= 0 ? null : <>
  <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0, opacity: a }}>
    <line x1={at[0]} y1={at[1]} x2={at[0] + side} y2={at[1] - up * a} stroke="rgba(255,255,255,.75)" strokeWidth={2} />
    <circle cx={at[0]} cy={at[1]} r={7} fill={col} stroke="#fff" strokeWidth={2} />
  </svg>
  <div style={{ position: 'absolute', left: at[0] + side, top: at[1] - up * a, translate: '-50% -100%', opacity: a, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 30, background: 'rgba(16,18,22,.62)', border: '1px solid rgba(255,255,255,.14)', color: '#fff', fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
    <span style={{ width: 12, height: 12, borderRadius: 6, background: col, boxShadow: `0 0 12px ${col}` }} />{s}
  </div>
</>;
export const BigNum: React.FC<{ v: string; sub?: string; x?: number; y: number; a: number; col?: string; size?: number }> = ({ v, sub, x = W / 2, y, a, col = Y, size = 170 }) => a <= 0 ? null :
  <div style={{ position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: a, scale: String(.85 + .15 * a), textAlign: 'center' }}>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: size, lineHeight: 1, color: col, textShadow: '0 6px 30px rgba(0,0,0,.55)' }}>{v}</div>
    {sub && <div style={{ marginTop: 8, fontFamily: SANS, fontWeight: 800, fontSize: 30, color: WH, letterSpacing: 1, textTransform: 'uppercase', textShadow: '0 3px 12px rgba(0,0,0,.8)' }}>{sub}</div>}
  </div>;

/* ---------- real glTF models (public/models/*.glb) ---------- */
import { delayRender, continueRender, staticFile } from 'remotion';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const GLB: Record<string, Promise<THREE.Group>> = {};
const loadGlb = (f: string) => (GLB[f] ??= new GLTFLoader().loadAsync(staticFile(`models/${f}`)).then((g) => g.scene));
export const useGlb = (f: string) => {
  const [g, setG] = React.useState<THREE.Group | null>(null);
  const [h] = React.useState(() => delayRender(`glb ${f}`));
  React.useEffect(() => { loadGlb(f).then((s) => setG(s)).catch((e) => { console.error('glb', f, e); continueRender(h); }); }, [f, h]);
  const advance = useThree((s) => s.advance);
  React.useEffect(() => { if (g) { const id = requestAnimationFrame(() => { advance(performance.now()); requestAnimationFrame(() => { advance(performance.now()); continueRender(h); }); }); return () => cancelAnimationFrame(id); } }, [g, h, advance]);
  return g;
};
/* CarConcept (Khronos glTF sample, CC BY 4.0, Eric Chadwick / Darmstadt Graphics Group). Fit to length L along +x. */
export const GlbCar: React.FC<{ file?: string; L?: number; x?: number; z?: number; ry?: number; yaw?: number; xray?: number; plate?: [string, string] }> = ({ file = 'carconcept.glb', L = 4.6, x = 0, z = 0, ry = 0, yaw = 0, xray = 0, plate = ['01', 'A 777 AA'] }) => {
  const src = useGlb(file);
  const obj = useMemo(() => {
    if (!src) return null;
    const o = src.clone(true); o.updateMatrixWorld(true); const box = new THREE.Box3().setFromObject(o); const sz = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    const k = L / Math.max(sz.x, sz.z); o.position.set(-c.x * k, -box.min.y * k, -c.z * k); o.scale.setScalar(k);
    const wrap = new THREE.Group(); wrap.add(o);
    const ptex = plateTex(plate[0], plate[1]);
    o.traverse((m: any) => { if (m.isMesh) { m.material = m.material.clone(); if (/plate/i.test(m.name)) { m.material.map = ptex; m.material.color = new THREE.Color('#fff'); } } });
    return wrap;
  }, [src, L, plate[0], plate[1]]);
  if (!obj) return null;
  obj.traverse((m: any) => { if (m.isMesh) { const body = /^Body|Paint|Glass/i.test(m.name) || /Paint|Glass/i.test(m.material.name ?? ''); const op = body ? 1 - xray * .88 : 1;
    m.material.transparent = op < 1 || m.material.transparent; m.material.opacity = op; m.material.depthWrite = op > .5; } });
  return <group position={[x, 0, z]} rotation={[0, ry, 0]}><primitive object={obj} rotation={[0, yaw, 0]} /></group>;
};
