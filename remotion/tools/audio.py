import numpy as np, sys, subprocess, json, re
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile
EP = sys.argv[1]
SR = 44100; D = float(re.search(r'END = ([\d.]+)', open(f'{EP}/rv/ep.ts').read()).group(1)); N = int(SR * D)
CFG = json.load(open(f'{EP}/rv/sfx.json'))
rng = np.random.default_rng(3); t = np.arange(N) / SR
K = '/home/claude/soundcn/assets/'
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def mid(n): return 440 * 2 ** ((n - 69) / 12)
def reverb(x, secs=2.2, mix=.25):
    L = int(SR * secs); x = np.stack([x, x], 1) if x.ndim == 1 else x
    ir = rng.standard_normal((L, 2)) * np.exp(-np.arange(L) / (SR * secs / 6.5))[:, None]
    for c in range(2): ir[:, c] = lp(ir[:, c], 6000)
    ir /= np.sqrt((ir ** 2).sum(0)); out = np.zeros_like(x)
    for c in range(2): out[:, c] = fftconvolve(x[:, c], ir[:, c])[:len(x)]
    return x * (1 - mix) + out * mix
class Bus:
    def __init__(s): s.b = np.zeros((N, 2))
    def add(s, sig, at, g=1.0, pan=0.0):
        sig = np.asarray(sig, float)
        if sig.ndim == 1: sig = np.stack([sig * (1 - max(pan, 0)), sig * (1 + min(pan, 0))], 1)
        i = int(at * SR)
        if i >= N: return
        e = min(N, i + len(sig)); s.b[i:e] += sig[:e - i] * g
def smp(rel, g=1.0):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', K + rel, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True).stdout
    x = np.frombuffer(raw, dtype=np.float32).astype(float); return x / (np.abs(x).max() or 1) * g
def tt(L): return np.arange(int(L * SR)) / SR
def kick(L=.5): x = tt(L); return np.sin(2 * np.pi * (45 + 110 * np.exp(-x * 30)) * x) * np.exp(-x * 7)
def hat(L=.06): x = tt(L); return hp(rng.standard_normal(len(x)), 7000) * np.exp(-x * 80) * .5
def clap(L=.25): x = tt(L); return bp(rng.standard_normal(len(x)), 900, 4000) * np.exp(-x * 22) * .7
def pluck(f, L=.5): x = tt(L); s = sum(np.sin(2 * np.pi * f * k * x) / k ** 1.5 for k in (1, 2, 3, 4)); return lp(s, 3000) * np.exp(-x * 7) * .5
def boom(L=2.5): x = tt(L); return (np.sin(2 * np.pi * (32 + 60 * np.exp(-x * 8)) * x) * np.exp(-x * 2) + lp(rng.standard_normal(len(x)), 180) * np.exp(-x * 3) * 1.5) * .9
def whoosh(L=.7): x = tt(L); return bp(rng.standard_normal(len(x)), 400, 4000) * np.sin(np.pi * x / L) ** 2
def riser(L=2.0):
    x = tt(L); n = rng.standard_normal(len(x)); y = np.zeros(len(x)); ch = 30; cl = len(x) // ch
    for k in range(ch):
        f = 400 * 10 ** (k / ch); y[k * cl:(k + 1) * cl] = bp(n[k * cl:(k + 1) * cl], f * .8, min(f * 1.4, 18000))
    return y * (x / L) ** 2 * 1.2
def shimmer(L, f=1320): x = tt(L); s = sum(np.sin(2 * np.pi * f * r * x + k) for k, r in enumerate([1, 1.5, 2.01])); return s * .06 * np.sin(np.pi * x / L) ** 2
def tick(L=.04): x = tt(L); return np.sin(2 * np.pi * 2400 * x) * np.exp(-x * 160) * .6
def ping(f=1500, L=.35): x = tt(L); return np.sin(2 * np.pi * f * x) * np.exp(-x * 14) * .5
def shutter(): x = tt(.12); return hp(rng.standard_normal(len(x)), 2500) * (np.exp(-x * 60) + .6 * np.exp(-np.maximum(x - .06, 0) * 80) * (x > .06)) * .8

TW0, TW1 = CFG['twist']   # music drops out here
mus = Bus(); BPM = 112; b = 60 / BPM
prog = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
def pad(notes, a, e, g=.07, cut=1400):
    i0, i1 = int(a * SR), min(N, int(e * SR)); x = t[i0:i1] - a
    s = sum((2 * ((mid(n) * r * x) % 1) - 1) for n in notes for r in (1, 1.006))
    s = lp(s, cut, 4) * np.clip(x / .8, 0, 1) * np.clip((e - a - x) / .8, 0, 1); mus.add(s * g, a)
bar = 4 * b; k = 0; at = 0.0
while at < D - .5:
    if not (TW0 < at + bar / 2 < TW1): pad(prog[k % 4], at, min(at + bar, D) + .3, .06 if at < TW0 else .075)
    at += bar; k += 1
mask = lambda x: not (TW0 < x < TW1)
k = 0; at = 0.0
while at < D - .3:
    ch = prog[int(at // bar) % 4]
    if mask(at):
        x = tt(b * .9); mus.add(lp(np.sign(np.sin(2 * np.pi * mid(ch[0] - 24) * x)), 400) * np.exp(-x * 3) * .22, at)
        if at > 1.5: mus.add(pluck(mid(ch[(k * 2) % 3] + 12), .35), at + b / 2, .32, (k % 2 - .5) * .6)
    at += b; k += 1
at = 1.6; k = 0
while at < D - 1.4:
    if mask(at):
        if k % 2 == 0: mus.add(kick(), at, .55 if at < TW0 else .7)
        else: mus.add(clap(), at, .25 if at < TW0 else .32)
        mus.add(hat(), at + b / 2, .25, .4)
        if at > TW1 + 6: mus.add(hat(), at + b / 4 * 3, .15, -.4)
    at += b; k += 1
mus.add(riser(1.6), TW0 - 1.6, .35); mus.add(shimmer(5, mid(88)), TW1 - .4, 1.0)
music = reverb(mus.b, 2.0, .22)


# ---------- SFX from cues: [time, name, gain, pan?]
#  synth: whoosh boom boomS shutter ping tick riser shimmer | "ticks:N:step" counter | "ui:<file>" kenney interface
#  "casino:<file>" "digital:<file>" "impact:<file>" (file names without .ogg, see /home/claude/soundcn/assets/kenney_*)
fx = Bus()
LIB = {'ui': 'kenney_interface-sounds', 'casino': 'kenney_casino-audio', 'digital': 'kenney_digital-audio', 'impact': 'kenney_impact-sounds', 'scifi': 'kenney_sci-fi-sounds'}
SYN = {'whoosh': lambda: whoosh(.7), 'boom': lambda: boom(2.5), 'boomS': lambda: boom(1.4), 'shutter': shutter, 'ping': lambda: ping(1600, .3), 'tick': tick, 'riser': lambda: riser(1.5), 'shimmer': lambda: shimmer(2.5)}
for c in CFG['cues']:
    at, name, g = c[0], c[1], c[2]; pan = c[3] if len(c) > 3 else 0.0
    if name.startswith('ticks:'):
        _, n, st = name.split(':')
        for i in range(int(n)): fx.add(tick(), at + i * float(st), g)
    elif ':' in name:
        lib, f = name.split(':', 1); fx.add(smp(f'{LIB[lib]}/{f}.ogg'), at, g, pan)
    else: fx.add(SYN[name](), at, g, pan)
sfx = reverb(fx.b, 1.4, .12)
wavfile.write(f'{EP}/music.wav', SR, (np.clip(music, -1, 1) * .9).astype(np.float32))
wavfile.write(f'{EP}/sfx.wav', SR, (np.clip(sfx, -1, 1) * .9).astype(np.float32))
print('audio ok', D)
