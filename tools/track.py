"""Synth an upbeat afro/house promo bed. usage: track.py OUT.wav DUR DROP OUTRO"""
import sys, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile
OUT = sys.argv[1]; D = float(sys.argv[2]); DROP = float(sys.argv[3]); OUTRO = float(sys.argv[4])
SR = 44100; N = int(SR * D); t = np.arange(N) / SR
rng = np.random.default_rng(7)
BPM = 118; BEAT = 60 / BPM; BAR = 4 * BEAT
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, a, b, o=2): return sosfilt(butter(o, [a, b], 'band', fs=SR, output='sos'), x)
def mid(n): return 440 * 2 ** ((n - 69) / 12)
L = np.zeros(N); Rr = np.zeros(N)
def put(sig, at, g=1, pan=0.0):
    i = int(at * SR)
    if i >= N or i + len(sig) <= 0: return
    j = min(N, i + len(sig)); s = sig[:j - i] * g
    L[i:j] += s * (1 - max(pan, 0)); Rr[i:j] += s * (1 + min(pan, 0))
def saw(f, n, ph=0.0): x = (np.arange(n) / SR * f + ph) % 1; return 2 * x - 1
def adsr(n, a=.005, d=.1, s=.6, r=.1):
    e = np.ones(n) * s; A = int(a * SR); Dd = int(d * SR); Rl = int(r * SR)
    e[:A] = np.linspace(0, 1, A); e[A:A + Dd] = np.linspace(1, s, len(e[A:A + Dd]))
    if Rl < n: e[-Rl:] *= np.linspace(1, 0, Rl)
    return e
def reverb(x, secs=1.8, mix=.22):
    Lr = int(SR * secs); ir = rng.standard_normal(Lr) * np.exp(-np.arange(Lr) / (SR * secs / 6)); ir = lp(ir, 5000); ir /= np.sqrt((ir ** 2).sum())
    return x * (1 - mix) + fftconvolve(x, ir)[:len(x)] * mix

beats = np.arange(0, D, BEAT)
drop_on = lambda x: x >= DROP - 1e-6
# ---------- kick ----------
kn = int(.38 * SR); kt = np.arange(kn) / SR
kick = np.sin(2 * np.pi * np.cumsum(45 + 110 * np.exp(-kt * 28)) / SR) * np.exp(-kt * 7.5)
kick += .3 * hp(rng.standard_normal(kn), 3000) * np.exp(-kt * 180)
kick = np.tanh(kick * 1.6)
kicks = [b for b in beats if drop_on(b)]
for b in kicks: put(kick, b, .95)
# intro: soft kick on 1 & 3 from bar 1
for b in beats:
    if b < DROP - BEAT * 2 and b >= BAR and int(round(b / BEAT)) % 2 == 0: put(lp(kick, 900), b, .45)
# ---------- sidechain env ----------
sc = np.ones(N)
for b in kicks:
    i = int(b * SR); n = min(N - i, int(.3 * SR)); sc[i:i + n] = np.minimum(sc[i:i + n], 1 - .7 * np.exp(-np.arange(n) / SR / .09))
# ---------- clap ----------
cn = int(.35 * SR); ct = np.arange(cn) / SR
clap = bp(rng.standard_normal(cn), 900, 3500) * (np.exp(-ct * 22) + .6 * np.exp(-np.maximum(ct - .012, 0) * 30) * (ct > .012))
clap = reverb(clap, 1.0, .3)
for b in beats:
    k = int(round(b / BEAT))
    if drop_on(b) and k % 2 == 1: put(clap, b, .42, -.1)
# ---------- hats / shaker ----------
hn = int(.06 * SR); ht = np.arange(hn) / SR
hat = hp(rng.standard_normal(hn), 7000) * np.exp(-ht * 70)
sh = hp(rng.standard_normal(int(.09 * SR)), 5000) * np.exp(-np.arange(int(.09 * SR)) / SR * 40)
for i, x in enumerate(np.arange(0, D, BEAT / 4)):
    if x < BAR: continue
    if i % 4 == 2: put(hat, x, .28 if drop_on(x) else .12, .25)
    elif drop_on(x): put(sh, x, .07 + .05 * (i % 2), -.3)
# ---------- harmony ----------
prog = [[53, 56, 60, 63], [49, 53, 56, 60], [56, 60, 63, 67], [51, 55, 58, 62]]  # Fm7 Dbmaj7 Ab Eb
roots = [41, 37, 44, 39]
chord_bus = np.zeros(N); bass_bus = np.zeros(N); lead_bus = np.zeros(N)
nbar = int(np.ceil(D / BAR))
stab_pat = [0, 3, 6, 10, 12, 14]  # 16ths
for bi in range(nbar):
    t0 = bi * BAR; ch = prog[bi % 4]; r = roots[bi % 4]
    if t0 < DROP - .01:
        # intro pad
        n = int(BAR * SR) + int(.3 * SR); x = np.zeros(n)
        for m in ch:
            for d in (-.08, .08): x += saw(mid(m) * (1 + d / 100), n, rng.random())
        x = lp(x, 900 + 1800 * min(1, t0 / max(DROP, 1))) * adsr(n, .25, .3, .8, .3) * .05
        s = int(t0 * SR); e = min(N, s + n); chord_bus[s:e] += x[:e - s]
        continue
    for p in stab_pat:
        st = t0 + p * BEAT / 4
        if st >= t0 + BAR: continue
        n = int(.26 * SR); x = np.zeros(n)
        for m in ch + [ch[0] + 12]:
            for d in (-12, -5, 0, 5, 12): x += saw(mid(m) * (1 + d / 1200), n, rng.random())
        x = lp(x, 3200) * adsr(n, .004, .12, .25, .08) * .045
        s = int(st * SR)
        if s >= N: continue
        e = min(N, s + n); chord_bus[s:e] += x[:e - s]
    # bass: offbeat 8ths + root on 1
    for k in range(8):
        st = t0 + k * BEAT / 2
        if k % 2 == 0 and k != 0: continue
        n = int(BEAT / 2 * .9 * SR); f = mid(r if k != 7 else r + 7)
        x = np.sin(2 * np.pi * f * np.arange(n) / SR) * .6 + lp(saw(f, n), 500) * .35
        x *= adsr(n, .005, .08, .8, .05) * .5
        s = int(st * SR)
        if s >= N: continue
        e = min(N, s + n); bass_bus[s:e] += x[:e - s]
    # lead pluck arp (pentatonic F minor) every other bar after drop
    pent = [65, 68, 70, 72, 75, 77]
    for k in range(8):
        if (bi + k) % 3 == 2: continue
        st = t0 + k * BEAT / 2 + BEAT / 4
        n = int(.22 * SR); m = pent[(k * 2 + bi) % len(pent)] + (12 if t0 >= OUTRO else 0)
        x = (np.sin(2 * np.pi * mid(m) * np.arange(n) / SR) + .4 * np.sin(2 * np.pi * mid(m) * 2 * np.arange(n) / SR)) * np.exp(-np.arange(n) / SR * 14) * .09
        s = int(st * SR)
        if s >= N: continue
        e = min(N, s + n); lead_bus[s:e] += x[:e - s]
chord_bus = reverb(chord_bus, 1.6, .25) * sc
bass_bus = lp(bass_bus, 700) * sc
lead_bus = reverb(lead_bus, 2.0, .35)
# ---------- riser + impact ----------
rs, re_ = DROP - 2.2, DROP
n = int((re_ - rs) * SR); rt = np.arange(n) / SR / (re_ - rs)
noise = rng.standard_normal(n); riser = np.zeros(n)
for i in range(0, n, 2048):
    seg = noise[i:i + 2048]; f = 400 + 9000 * rt[i] ** 2
    riser[i:i + len(seg)] = bp(seg, f * .7, min(f * 1.3, 20000))
riser *= rt ** 2 * .35
riser += np.sin(2 * np.pi * np.cumsum(200 + 800 * rt ** 2) / SR) * rt ** 3 * .08
put(riser, rs, 1)
imp_n = int(1.6 * SR); it = np.arange(imp_n) / SR
impact = np.sin(2 * np.pi * np.cumsum(35 + 60 * np.exp(-it * 10)) / SR) * np.exp(-it * 2.6) * .9 + reverb(lp(rng.standard_normal(imp_n), 2500) * np.exp(-it * 8) * .3, 2.5, .5)
put(impact, DROP, .8)
# outro lift: second riser into ending
n2 = int(1.2 * SR); r2 = np.arange(n2) / SR / 1.2
put(hp(rng.standard_normal(n2), 2000) * r2 ** 2 * .18, OUTRO - 1.2, 1)
# ---------- mix ----------
L += chord_bus * .95 + bass_bus + lead_bus * .9; Rr += chord_bus * 1.05 + bass_bus + lead_bus * 1.1
mix = np.stack([L, Rr], 1)
fade = np.minimum(1, t / .4)[:, None] * np.minimum(1, (D - t) / 1.6)[:, None]
mix *= fade
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix /= np.abs(mix).max() * 1.05
wavfile.write(OUT, SR, (mix * 32767).astype(np.int16))
print('track ok', D)
