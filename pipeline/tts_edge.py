"""tts_edge.py EP [voice] [rate] — free Microsoft Edge TTS (no ElevenLabs credits).
EP/script.txt -> EP/raw.mp3, EP/nar_f.wav (44.1k mono, edges trimmed) and EP/words.json [[word, start, end], ...]
from the service's own WordBoundary events (no alignment step needed). Default voice uz-UZ-SardorNeural, rate +12%."""
import asyncio, json, os, subprocess, sys
import edge_tts
EP = sys.argv[1]; VOICE = sys.argv[2] if len(sys.argv) > 2 else 'uz-UZ-SardorNeural'; RATE = sys.argv[3] if len(sys.argv) > 3 else '+12%'
text = open(f'{EP}/script.txt').read().strip()
async def main():
    c = edge_tts.Communicate(text, VOICE, rate=RATE, boundary='WordBoundary', proxy=os.environ.get('HTTPS_PROXY'))
    audio = bytearray(); wb = []
    async for ch in c.stream():
        if ch['type'] == 'audio': audio += ch['data']
        elif ch['type'] == 'WordBoundary': wb.append((ch['text'], ch['offset'] / 1e7, (ch['offset'] + ch['duration']) / 1e7))
    open(f'{EP}/raw.mp3', 'wb').write(audio); return wb
wb = asyncio.run(main())
# re-attach punctuation from the script so captions keep ?,.! and quotes
words = []; cur = 0
for w, s, e in wb:
    i = text.find(w, cur)
    if i < 0: words.append([w, round(s, 3), round(e, 3)]); continue
    j = i + len(w)
    while j < len(text) and not text[j].isspace(): j += 1
    k = i
    while k > cur and not text[k - 1].isspace(): k -= 1
    words.append([text[k:j], round(s, 3), round(e, 3)]); cur = j
# merge tokens that came from one script word (e.g. "edi-ku!" split in two)
out = []
for w in words:
    if out and w[0] == out[-1][0]: out[-1][2] = w[2]
    else: out.append(w)
# shorten pauses between words to at most GAP s (Edge leaves ~1.3 s between sentences)
import numpy as np
from scipy.io import wavfile
SR = 44100; GAP = float(os.environ.get('GAP', '0.42'))
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f'{EP}/raw.mp3', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, np.float32); segs = []; shift = 0.0; prev_e = 0.0; t0 = max(0.0, out[0][1] - 0.08)
cut_from = t0
for i, w in enumerate(out):
    gap = w[1] - prev_e if i else 0
    if i and gap > GAP:
        cut = gap - GAP; a = prev_e + GAP / 2; segs.append((cut_from, a)); cut_from = a + cut; shift += cut
    w[1] = round(w[1] - shift - t0, 3); w[2] = round(w[2] - shift - t0, 3); prev_e = w[2] + shift + t0
segs.append((cut_from, len(x) / SR))
y = np.concatenate([x[int(a * SR):int(b * SR)] * np.r_[np.linspace(0, 1, 220), np.ones(max(0, int(b * SR) - int(a * SR) - 440)), np.linspace(1, 0, 220)][:int(b * SR) - int(a * SR)] for a, b in segs])
y = np.concatenate([y, np.zeros(int(.3 * SR), np.float32)])
wavfile.write(f'{EP}/nar_f.wav', SR, (np.clip(y, -1, 1) * 32767).astype(np.int16))
json.dump(out, open(f'{EP}/words.json', 'w'), ensure_ascii=False)
d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f'{EP}/nar_f.wav'], capture_output=True, text=True).stdout)
print(f'{VOICE} {RATE}: {len(out)} words, {d:.2f} s'); print(' | '.join(f'{w} {s}' for w, s, e in out))
