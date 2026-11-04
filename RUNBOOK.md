# SANOQBOZ — daily production runbook

One run = **3 vertical reels (~60 s each, Uzbek Latin)** for ONE Tashkent day, published at **08:00, 13:00, 20:00 Asia/Tashkent** to Instagram (Reel), YouTube (Short) and TikTok. No Facebook.
Owner talks Russian. Channel: @sanoqboz, slogan «Raqamlar gapiradi». Animated infographic explainers in the sanoqboz brand (Remotion, style in remotion/STYLE.md).

## 0. Setup (fresh container)
```bash
# needs: add_repo owner=ituraev97 repo=sanoqboz_media access=push
git clone --depth 1 https://github.com/ituraev97/sanoqboz_media /home/claude/sanoqboz_media
R=/home/claude/sanoqboz_media/remotion; P=/home/claude/sanoqboz_media/pipeline
bash $R/tools/setup.sh          # Remotion deps, Oswald/Inter/JBM fonts, brand mark+lockup, Kenney SFX
```
Chromium headless shell + ffmpeg are preinstalled. Network allowlist (owner set it): storage.googleapis.com, elevenlabsusercontent.com (ElevenLabs audio content_url), api.elevenlabs.io, videos.pexels.com, www.pexels.com.
**Style = `remotion/STYLE.md` (owner's playbook + sanoqboz brand). Read it fully before writing scenes.** Reference episode: `episodes/014-shtraf-kamera/` (script, meta.json, rv/ep.ts, rv/scenes.tsx, rv/sfx.json).

## 1. What to make
- Target date = tomorrow (Asia/Tashkent), or today if the run starts before 05:00 Tashkent and today's daily slots are empty. Metricool `getScheduledPosts` blogId **7755543** (brand "Sanoqboz", tz Asia/Tashkent) for that date: count ONLY daily posts in the 08:00 / 13:00 / 20:00 slots (instagram+youtube+tiktok). Instagram-only trial posts of old videos at other times (10:30, 15:30, 22:15…) do NOT count. All 3 slots taken → stop and report; some taken → make only the missing ones. A slot less than 30 min away → use the nearest time 30+ min ahead.
- Take the first `todo` row of each rubric in `backlog.md`: 08:00 **Pul hisobi**, 13:00 **Agar…**, 20:00 **Qanday ishlaydi / Ehtiyot bo‘ling**. Episode folder `episodes/NNN-slug/` (NNN = next number).

## 2. Facts (decide everything)
- Every number in the script must come from a page you opened (stat.uz, gov.uz, kun.uz, gazeta.uz, spot.uz, official reports; Wikipedia only as a map). Write `sources.md` (claim → URL).
- Prefer current Uzbek data (prices in so‘m, Tashkent context). If a figure is an estimate or your own calculation, say “taxminan” and show the calculation on screen in a chip.
- No politics, no criticism of officials, no religion debates, no real private people. Named public people: only facts they stated themselves or reliable press reported. “Agar…” episodes are clearly fantasy built on real numbers.
- Safety/scam episodes: explain how to protect yourself, never a step-by-step of the scam.

## 3. Script → `script.txt` (plain, for alignment) + `prompt.txt` (same text with ElevenLabs v4 tags)
- 140–165 words → 55–70 s after speed 1.06–1.12. Uzbek Latin with correct o‘ g‘ (U+2018) and ’.
- Numbers written as words (ElevenLabs reads them right). Short sentences. Hook question in the first sentence (no intro). One light, kind joke about everyday life (ona, xotin, qaynona, Damas, to‘y, osh…). Pause «...» before the twist. Structure: hook → mechanism step by step → twist around 55 % («Endi qiziq joyi...») → payoff → last line «Buni … do‘stingizga yuboring.» (the ending scene is the share sheet). Abbreviations spelled for TTS in prompt.txt only (BHM → be-ha-em, SMS → es-em-es).
- Tags allowed: [curious] [serious] [warm] [intrigued] [dramatic] [softly] [whispers].

## 4. Voice (ElevenLabs connector, owner plan Creator)
- `creative_generate_speech`: model `eleven_v4`, voice **mirzaev `RaNVfTYq3HYeFPLng6XN`**, **generations_count 1** (owner rule), flow_id `xzPQiLWcQ1A1HZLw9uNR` (or create one). Poll `creative_get_flow_run_status`; download `content_url` → `EP/raw.mp3` with curl. Never re-run a generation to “retry” (costs credits) unless it failed.
- ≈1 000 credits per reel.

## 5. Timing → captions
```bash
EP=/home/claude/sanoqboz_media/episodes/NNN-slug
# meta.json: {"title":..,"speed":1.08,"pause_at":null,"num_words":[],"caps":{"merge":[[["bir","ming","sakkiz","yuz"],"1 800"]],"kw":["kamera","jarima"]}}
python3 $P/prep.py $EP              # raw.mp3 -> nar_f.wav (silence trim + speed), words.json; prints DURATION
python3 $R/tools/mkcaps.py $EP      # -> EP/rv/caps.ts (≤4 words/line, numbers shown as digits via "merge", keywords boxed via "kw"); prints word times
```
- Pick `speed` 1.06–1.12 so the reel is 55–70 s. `merge` turns spelled-out numbers into digits on screen; every number on screen = what the voice says.

## 6. Scenes (Remotion, new style — NO stock clips, NO old canvas pipeline)
- `EP/rv/ep.ts`: `TOPIC` (lowercase Uzbek topic line for the HUD), `TINT` ([start,end] red background pulse around the twist, or null), `END` (= last word end + ~2 s), `CH` (7–9 chapters `[start, 'name']`, first at 0, short lowercase Uzbek names), `T` (word start times you need).
- `EP/rv/scenes.tsx`: one component per chapter + `HITS` (screen shakes) + `export const Video = () => <Reel scenes={[...]} hits={HITS} />` + `export const Cover`. Copy the structure of `episodes/014-shtraf-kamera/rv/scenes.tsx`. Primitives are in `remotion/src/kit.tsx` (Layer, Head, Pill, Glow, Stamp, Num, Card, Src, flight, fmt, flashAt, Road, SmsScreen, Avatar, **ShareEnd** for the standard ending); art in `remotion/src/Art.tsx` (Phone, Car, CarFront, Plate, CamPole, Gauge, Packet, Donut, Piyola, Logo, Lockup). Add new art for the topic in scenes.tsx (generic objects, no real logos/brands).
- One big hero object per frame; headline at y 490; everything inside x 70–930, y 470–1410; first frame already shows the hook headline (scene/headline start at t0 = -1). Source line (`Src`) under every statistic.
- The ending is always `ShareEnd` (share sheet → "Yuborildi ✓" → sanoqboz lockup).

## 7. Check, audio, render
**YUZ promo (owner rule 2026-11-04):** `render.sh` automatically appends `pipeline/assets/yuz_promo.mp4` (7 s, YUZ course ad with voice, -14 LUFS) after the ShareEnd ending of every reel. Do not remove or re-voice it; `NO_PROMO=1` only if the owner asks. Final length = reel + 7 s.
```bash
bash $R/tools/use.sh $EP                              # copies rv/* into the template, typechecks, bundles
bash $R/tools/stills.sh $EP/prev 0.3 2 4 ... (every ~2 s, 30+ stills)   # -> $EP/prev/sheet1.jpg, sheet2.jpg
```
Look at every sheet yourself (Read the jpg). Fix overlaps, cut-off text, empty frames, anything in the red zones, wrong numbers; re-run use.sh + stills. **At least 2 rounds.**
- Cover: `Cover` still — lockup on top (y≈300), grey mono kicker, huge yellow 2–4-word question (Oswald), hero art, green/red payoff line; all text within y 280–1640. Check `$EP/cover.jpg` after render.
- `EP/rv/sfx.json`: `{"twist":[t0,t1] (music drops out), "cues":[[time,"whoosh|boom|boomS|shutter|ping|tick|riser|ticks:N:step|ui:<kenney file>|casino:<file>|digital:<file>",gain,pan?]...]}` — whoosh on every chapter change, ticks under counters, ui:confirmation_* for "yes/ok", boom on the twist and big numbers (see episode 014).
```bash
python3 $R/tools/audio.py $EP && bash $R/tools/mix.sh $EP      # music.wav + sfx.wav -> mix.wav (-14 LUFS)
nohup bash $R/tools/render.sh $EP > $EP/render.log 2>&1 &      # ~25 min per reel on 2 cores -> EP/final.mp4, cover.jpg, final_sheet.jpg
```
Wait for "RENDER DONE" in render.log (Monitor / background until-loop; never sleep in the foreground). Renders one at a time — use the waiting time to write the next episode. QA: 62–77 s (reel 55–70 s + 7 s YUZ promo at the end), ≈ −14 LUFS, Read final_sheet.jpg.

## 8. Upload (public raw URLs for Metricool)
Branch = weekday of the Tashkent publish date: drop-mon … drop-sun. Orphan commit with only that day’s 3 files, force-push. **Commit/stash main changes (backlog, pipeline) first** — `git rm -rqf .` wipes uncommitted edits of tracked files:
```bash
cd /home/claude/sanoqboz_media && git checkout --orphan up && git rm -rqf . && cp $EP08/final.mp4 s08.mp4 && cp $EP13/final.mp4 s13.mp4 && cp $EP20/final.mp4 s20.mp4 && \
cp $EP08/cover.jpg c08.jpg && cp $EP13/cover.jpg c13.jpg && cp $EP20/cover.jpg c20.jpg && git add -f s08.mp4 s13.mp4 s20.mp4 c08.jpg c13.jpg c20.jpg && git -c user.name="sanoqboz bot" -c user.email="ituraev97@users.noreply.github.com" commit -qm "drop DATE" && \
git push -f origin up:drop-XXX && git checkout -q main && git branch -D up
```
URLs `https://raw.githubusercontent.com/ituraev97/sanoqboz_media/drop-XXX/s08.mp4` and `.../c08.jpg` → `curl -sI` must be 200.

## 9. Schedule in Metricool (blogId 7755543, timezone Asia/Tashkent)
One `createScheduledPost` per reel with providers instagram + youtube + tiktok (NOT facebook):
- `text`: Uzbek caption — line 1 = hook question; 2–3 short sentences; «Manbalar: …» (short site names); 4–5 hashtags (#sanoqboz + topic tags, Uzbek).
- `firstCommentText`: the comment question.
- `instagramData`: {"type":"REEL"} — the normal Reel on the main post.
- PLUS, owner rule (2026-11-02): every reel ALSO goes to Instagram as a Trial Reel (shown to non-followers). Second `createScheduledPost` per reel: providers [instagram] only, same media/text/firstCommentText, `instagramData` {"type":"TRIAL_REEL"}, time = slot + 1 h (09:00 / 14:00 / 21:00). So each day = 3 posts (IG Reel + YT Short + TikTok) + 3 IG Trial Reels.
- `youtubeData`: {"title": ≤60 chars Uzbek with the key query first, "type":"short","privacy":"public","category":"EDUCATION","madeForKids":false,"tags":[...]} 
- `tiktokData`: {"privacyOption":"PUBLIC_TO_EVERYONE","title": short}
- `media`: [raw mp4 URL]; `autoPublish`: true; `videoThumbnailUrl`: raw URL of cNN.jpg (the branded cover). If Metricool rejects the thumbnail, retry once with `videoCoverMilliseconds`: 1500 instead.
- Verify with getScheduledPosts.

## 10. Close the run
- Commit to main: episodes/NNN-*/ (script.txt, prompt.txt, meta.json, sources.md, words.json, rv/* — NOT mp3/mp4/wav/png/jpg, not prev/), backlog.md rows → `done YYYY-MM-DD`.
- Message the owner in Russian: 3 titles with times, one line each, anything that needs attention.
