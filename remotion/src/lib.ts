export const W = 1080, H = 1920, FPS = 30;
export const CX = 500, SL = 70, SR = 930, ST = 470, SB = 1410, CY = (ST + SB) / 2;
export const Y = '#F7C64B', YL = '#FFE09A', WH = '#F3F5F8', GR = '#7F8792', BLUE = '#3FA9B8', TEAL = '#3FA9B8', TEALD = '#2C8290', GRN = '#3DDC84', RED = '#EC3A2C', ICE = '#9BE3FF', LIME = '#C6F432';
export const HEAD = 'Osw, sans-serif', SANS = 'Int, sans-serif', MONO = 'JBM, monospace';
export const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const P = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const eio = (x: number) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const eout = (x: number) => 1 - Math.pow(1 - x, 3);
export const eback = (x: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
export const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
export const env = (t: number, a: number, b: number, fi = .35, fo = .35) => Math.min(eout(P(t, a, a + fi)), 1 - eio(P(t, b - fo, b)));
export function rnd(seed: number) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
export const shake = (t: number, t0: number, amp = 14, decay = 7) => t < t0 ? [0, 0] : [Math.sin((t - t0) * 91) * amp * Math.exp(-(t - t0) * decay), Math.cos((t - t0) * 73) * amp * Math.exp(-(t - t0) * decay)];

