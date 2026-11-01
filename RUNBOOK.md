# SANOQBOZ — daily production runbook

One run = **3 vertical reels (~60 s each, Uzbek Latin)** for ONE Tashkent day, published at **08:00, 13:00, 20:00 Asia/Tashkent** to Instagram (Reel), YouTube (Short) and TikTok. No Facebook.
Owner talks Russian. Channel: @sanoqboz, slogan «Raqamlar gapiradi». Animated infographics + a few real stock clips.

## 0. Setup (fresh container)
```bash
# needs: add_repo owner=ituraev97 repo=sanoqboz_media access=push
git clone --depth 1 https://github.com/ituraev97/sanoqboz_media /home/claude/sanoqboz_media
cd /home/claude/sanoqboz_media/pipeline && npm i
```
Chromium/Playwright + ffmpeg are preinstalled (render.js/shot.js use /opt/pw-browsers/... if present).
Network allowlist (owner set it): storage.googleapis.com, api.elevenlabs.io, videos.pexels.com, www.pexels.com.

## 1. What to make
- Target date = tomorrow (Asia/Tashkent), or today if the run starts before 05:00 Tashkent and today's daily slots are empty. Metricool `getScheduledPosts` blogId **7755543** (brand "Sanoqboz", tz Asia/Tashkent) for that date: count ONLY daily posts in the 08:00 / 13:00 / 20:00 slots (instagram+youtube+tiktok). Instagram-only trial posts of old videos at other times (10:30, 15:30, 22:15…) do NOT count. All 3 slots taken → stop and report; some taken → make only the missing ones. A slot less than 30 min away → use the nearest time 30+ min ahead.
- Take the first `todo` row of each rubric in `backlog.md`: 08:00 **Pul hisobi**, 13:00 **Agar…**, 20:00 **Qanday ishlaydi / Ehtiyot bo‘ling**. Episode folder `episodes/NNN-slug/` (NNN = next number).

## 2. Facts (decide everything)
- Every number in the script must come from a page you opened (stat.uz, gov.uz, kun.uz, gazeta.uz, spot.uz, official reports; Wikipedia only as a map). Write `sources.md` (claim → URL).
- Prefer current Uzbek data (prices in so‘m, Tashkent context). If a figure is an estimate or your own calculation, say “taxminan” and show the calculation on screen in a chip.
- No politics, no criticism of officials, no religion debates, no real private people. Named public people: only facts they stated themselves or reliable press reported. “Agar…” episodes are clearly fantasy built on real numbers.
- Safety/scam episodes: explain how to protect yourself, never a step-by-step of the scam.

## 3. Script → `script.txt` (plain, for alignment) + `prompt.txt` (same text with ElevenLabs v4 tags)
- 140–165 words → 55–65 s after speed 1.06. Uzbek Latin with correct o‘ g‘ (U+2018) and ’.
- Numbers written as words (ElevenLabs reads them right). Short sentences. Hook question in the first sentence (no intro). One light, kind joke about everyday life (ona, xotin, qaynona, Damas, to‘y, osh…). Pause «...» before the twist. End: question for comments + «Obuna bo‘ling.» Ideally the last phrase loops into the first.
- Tags allowed: [curious] [serious] [warm] [intrigued] [dramatic] [softly] [whispers].

## 4. Voice (ElevenLabs connector, owner plan Creator)
- `creative_generate_speech`: model `eleven_v4`, voice **mirzaev `RaNVfTYq3HYeFPLng6XN`**, **generations_count 1** (owner rule), flow_id `xzPQiLWcQ1A1HZLw9uNR` (or create one). Poll `creative_get_flow_run_status`; download `content_url` → `EP/raw.mp3` with curl. Never re-run a generation to “retry” (costs credits) unless it failed.
- ≈1 000 credits per reel.

## 5. Timing + scenes
```bash
P=/home/claude/sanoqboz_media/pipeline; EP=/home/claude/sanoqboz_media/episodes/NNN-slug
# meta.json first: {"title":..,"speed":1.06,"pause_at":null,"num_words":[...words to highlight blue...],"whoosh":[],"ding":[],"boom":[]}
python3 $P/prep.py $EP        # prints DURATION and caption timeline (use these times for scenes)
```
- If you want the 0.5 s silence before the twist: set `pause_at` (nar_f time a little before the twist word, inside a pause), rerun prep.py.
- Write `episode.js` copying `episodes/001-aktrisalar/episode.js`: defines `HDR_SUB`, `CH` (chapters, first at -1, last = [DURATION,'']), `CL` (stock clips), `S` (scenes {t0,t1,d(t),heads}), `CHIPS` (source/calculation chips). Helpers available in pipeline/template.js + base.part: txt, mono, card8, bigNum, profile, person, cash, pairBars, gasMeter, receipt, hbar, days30, clock, heater, meter, house, uzMap(+mp8 lon/lat→xy), bubble, stamp, chip, drop, flame, bulb, kazan, rice, hourglass, infinity, snowI, damas, taxiCar, metroCar, bars, calendar, nonBread…
- First scene `t0:-1` and head `t:-1` → the first frame is already full (hook visible without sound).
- Headlines ≤ 2 lines, big numbers; every number on screen = what the voice says.

### Layout (Instagram/TikTok/Shorts safe — owner checked on phone)
- Header (logo, @sanoqboz, chapter, progress) is at y 240–345 — never draw above y≈400 in scenes.
- Captions y≈450, headline HY=620, scene drawing area = scene coords x 60–1020, y 760–1340 (rendered scaled .78 → screen x 156–924, y 890–1350). Keep everything inside; nothing important below screen y 1450 or right of x 930 (buttons).

## 6. Stock clips (optional, 1–3 per reel, only where they help: hook, emotional moment)
- Find a Pexels video page via WebSearch (allowed_domains pexels.com), WebFetch the page asking for the `videos.pexels.com/video-files/...mp4` URL from the “Edit in Canva” link; download with curl. Prefer vertical (1440×2560). Pexels license: free, no attribution needed (we still show “VIDEO: PEXELS”).
- `bash $P/clip.sh NAME src.mp4 START DUR full [cropX]` (or `card`), then add to `CL`: {k:'NAME',t0,t1,n:<frames>,full:1, ov:t=>{...overlay...}}. Never YouTube/TV/news footage.

## 7. Build, check, render
```bash
python3 $P/build.py $EP
node $P/shot.js $EP/shots 0.5 3 ... (every 3–4 s)  && python3 $P/sheet.py $EP/shots $EP/sheet.jpg 8
```
Look at sheet.jpg yourself: no overlaps, nothing in unsafe zones, numbers match voice. Fix, rebuild.
Set whoosh (chapter starts), ding (big numbers), boom (stamps) in meta.json, then:
```bash
python3 $P/mix.py $EP <DURATION> && bash $P/render_all.sh $EP <DURATION>   # ~5 min, writes EP/final.mp4
```
QA: 50–70 s, loudnorm −14 LUFS done by render_all; spot-check 3 frames of final.mp4.

## 8. Upload (public raw URLs for Metricool)
Branch = weekday of the Tashkent publish date: drop-mon … drop-sun. Orphan commit with only that day’s 3 files, force-push. **Commit/stash main changes (backlog, pipeline) first** — `git rm -rqf .` wipes uncommitted edits of tracked files:
```bash
cd /home/claude/sanoqboz_media && git checkout --orphan up && git rm -rqf . && cp $EP08/final.mp4 s08.mp4 && cp $EP13/final.mp4 s13.mp4 && cp $EP20/final.mp4 s20.mp4 && \
git add s08.mp4 s13.mp4 s20.mp4 && git -c user.name="sanoqboz bot" -c user.email="ituraev97@users.noreply.github.com" commit -qm "drop DATE" && \
git push -f origin up:drop-XXX && git checkout -q main && git branch -D up
```
URL `https://raw.githubusercontent.com/ituraev97/sanoqboz_media/drop-XXX/s08.mp4` → `curl -sI` must be 200.

## 9. Schedule in Metricool (blogId 7755543, timezone Asia/Tashkent)
One `createScheduledPost` per reel with providers instagram + youtube + tiktok (NOT facebook):
- `text`: Uzbek caption — line 1 = hook question; 2–3 short sentences; «Manbalar: …» (short site names); 4–5 hashtags (#sanoqboz + topic tags, Uzbek).
- `firstCommentText`: the comment question.
- `instagramData`: {"type":"REEL"} — the normal Reel on the main post.
- PLUS, owner rule (2026-11-02): every reel ALSO goes to Instagram as a Trial Reel (shown to non-followers). Second `createScheduledPost` per reel: providers [instagram] only, same media/text/firstCommentText, `instagramData` {"type":"TRIAL_REEL"}, time = slot + 1 h (09:00 / 14:00 / 21:00). So each day = 3 posts (IG Reel + YT Short + TikTok) + 3 IG Trial Reels.
- `youtubeData`: {"title": ≤60 chars Uzbek with the key query first, "type":"short","privacy":"public","category":"EDUCATION","madeForKids":false,"tags":[...]} 
- `tiktokData`: {"privacyOption":"PUBLIC_TO_EVERYONE","title": short}
- `media`: [raw URL]; `autoPublish`: true; `videoCoverMilliseconds`: a frame with the big headline (e.g. 1500).
- Verify with getScheduledPosts.

## 10. Close the run
- Commit to main: episodes/NNN-*/ (script.txt, prompt.txt, episode.js, meta.json, sources.md — NOT mp3/mp4/wav), backlog.md rows → `done YYYY-MM-DD`.
- Message the owner in Russian: 3 titles with times, one line each, anything that needs attention.
