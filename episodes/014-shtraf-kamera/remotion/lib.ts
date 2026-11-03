export const W = 1080, H = 1920, FPS = 30, END = 68.3;
export const CX = 500, SL = 70, SR = 930, ST = 470, SB = 1410, CY = (ST + SB) / 2;
export const Y = '#FFCF3A', YL = '#FFD983', WH = '#F3F5F8', GR = '#7F8792', BLUE = '#5B8CFF', GRN = '#3DDC84', RED = '#EC3A2C', ICE = '#9BE3FF', LIME = '#C6F432';
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

export const CH: [number, string][] = [[0, 'savol'], [7.45, 'radar'], [17.55, 'kamera'], [24.6, 'tarmoq'], [30.55, 'jarima'], [38.65, 'burilish'], [47.2, 'ballar'], [54.65, 'chegirma'], [61.2, 'xulosa']];
export const T = {
  chirt: .79, tel: 2.07, jarima: 2.84, bu: 4.01, soniya: 4.35, keling: 6.13,
  radar: 8.08, yubor: 9.87, qaytib: 11.07, tez: 13.02, ozgar: 14.84, tezlik: 15.70, hisob: 16.70,
  kamera: 18.33, surat: 18.70, dastur: 19.75, harf: 20.63, baza: 22.40, kim: 23.62,
  charch: 25.09, choy: 25.77, uzb: 27.05, nuqta: 28.27, n1831: 28.77, bitta: 30.07,
  yigirma: 30.69, bhm1: 32.83, n440: 33.64, qirq: 35.47, bhm9: 36.45, mln: 37.48,
  endi: 38.77, qogoz: 40.45, kelmay: 41.31, mart: 42.12, sms: 43.43, d6: 44.76, d0: 45.13, d7: 45.43, d9: 45.87, raq: 46.37,
  aprel: 47.35, ball: 49.32, ishonch: 51.23, boshqa: 52.10, osh: 53.35,
  foyd: 55.19, n15: 56.33, yarm: 58.16, n30: 59.29, n70: 60.15,
  lekin: 61.34, arzon: 61.94, oshirma: 62.95, buni: 64.31, dost: 65.33, yub: 65.88,
};
