import numpy as np, sys, subprocess
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile
SR = 44100; D = 68.3; N = int(SR * D)
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

TW0, TW1 = 38.6, 40.4
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
        if at > 47: mus.add(hat(), at + b / 4 * 3, .15, -.4)
    at += b; k += 1
mus.add(riser(1.6), 37.0, .35); mus.add(shimmer(5, mid(88)), 40.0, 1.0)
music = reverb(mus.b, 2.0, .22)

fx = Bus(); ui = lambda n: smp('kenney_interface-sounds/' + n)
fx.add(whoosh(.9), .0, .5)                                   # car passing
fx.add(shutter(), .79, .9); fx.add(ping(2200, .25), .8, .3)  # chirt
fx.add(whoosh(.6), 1.9, .35); fx.add(ui('confirmation_002.ogg'), 2.84, .6)   # sms
fx.add(ui('question_002.ogg'), 5.1, .45)
fx.add(whoosh(.7), 7.4, .35); fx.add(boom(1.8), 8.08, .5)
for i in range(14): fx.add(ping(1800 - i * 20, .2), 9.9 + i * .22, .12, (i % 2 - .5) * .4)   # waves out
for i in range(14): fx.add(ping(1300 + i * 30, .18), 11.1 + i * .17, .1, (i % 2 - .5) * .4)  # waves back
for i in range(16): fx.add(tick(), 15.6 + i * .07, .3)       # speed count
fx.add(whoosh(.6), 17.5, .35); fx.add(shutter(), 18.7, 1.0); fx.add(boom(1.2), 18.7, .3)
for i in range(9): fx.add(ui('tick_002.ogg'), 20.2 + i * .15, .35)   # letters read
fx.add(ui('maximize_003.ogg'), 22.3, .45)
for i in range(10): fx.add(tick(), 22.5 + i * .11, .25)
fx.add(ui('confirmation_004.ogg'), 23.62, .6)
fx.add(whoosh(.6), 24.5, .35); fx.add(ui('select_002.ogg'), 25.1, .4)
fx.add(smp('kenney_casino-audio/chip-lay-2.ogg'), 25.8, .5); fx.add(ui('error_004.ogg'), 26.1, .35)
fx.add(whoosh(.7), 26.9, .35)
for i in range(24): fx.add(ui('tick_001.ogg'), 28.7 + i * .055, .18, (i % 7 - 3) * .2)
fx.add(boom(1.6), 28.77, .45)
fx.add(whoosh(.6), 30.45, .35)
for i in range(12): fx.add(tick(), 33.6 + i * .08, .3)
fx.add(ui('error_002.ogg'), 35.5, .35)
for i in range(18): fx.add(tick(), 36.45 + i * .07, .3)
fx.add(boom(2.0), 36.45, .55)
fx.add(boom(3.0), 38.77, 1.0); fx.add(ui('glitch_004.ogg'), 38.8, .35)   # twist
fx.add(smp('kenney_casino-audio/card-slide-3.ogg'), 40.4, .5)
fx.add(ui('error_006.ogg'), 41.3, .45); fx.add(boom(1.2), 41.3, .35)
fx.add(ui('select_004.ogg'), 42.12, .4)
fx.add(whoosh(.6), 43.2, .35); fx.add(ui('confirmation_001.ogg'), 43.5, .5)
for i, x in enumerate([44.76, 45.13, 45.43, 45.87]): fx.add(ui('click_002.ogg'), x, .5, (i - 1.5) * .3)
fx.add(ui('select_001.ogg'), 46.4, .35)
fx.add(whoosh(.6), 47.1, .35); fx.add(shutter(), 49.1, .6); fx.add(ui('error_003.ogg'), 49.35, .4)
fx.add(ui('maximize_006.ogg'), 51.2, .4); fx.add(whoosh(.5), 53.0, .4); fx.add(ui('drop_002.ogg'), 53.45, .5)
fx.add(whoosh(.6), 54.6, .35)
for i in range(10): fx.add(tick(), 56.3 + i * .08, .25)
fx.add(ui('confirmation_003.ogg'), 58.16, .6); fx.add(boom(1.4), 58.16, .3)
for i in range(8): fx.add(tick(), 59.3 + i * .08, .25)
fx.add(ui('confirmation_002.ogg'), 60.2, .45)
fx.add(whoosh(.7), 61.1, .35); fx.add(boom(1.6), 62.95, .45); fx.add(ui('confirmation_004.ogg'), 62.95, .5)
fx.add(whoosh(.7), 64.2, .4); fx.add(ui('select_001.ogg'), 65.35, .5); fx.add(ui('confirmation_003.ogg'), 66.2, .6)
sfx = reverb(fx.b, 1.4, .12)
wavfile.write(sys.argv[1], SR, (np.clip(music, -1, 1) * .9).astype(np.float32))
wavfile.write(sys.argv[2], SR, (np.clip(sfx, -1, 1) * .9).astype(np.float32))
print('ok')
