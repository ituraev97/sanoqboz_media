# ZERO TAXI — daily reel runbook (branch `zerotaxi-reels`)

One run = **1 vertical reel (55–70 s, Uzbek Latin)** for the taxi park **Zero Taxi** (Yandex Go partner, Tashkent), delivered to the owner in the chat with a short Instagram caption. Owner talks Russian. Audience: Yandex Go drivers and people who want to become one. Goal: trust + driver sign-ups.
The method is the sanoqboz one (RUNBOOK.md §2–7 and remotion/STYLE.md) — read both fully — with the changes below. Reference episode for this brand: `episodes/zt-001-prioritet/` (script, prompt, meta.json, rv/ep.ts, rv/scenes.tsx, rv/sfx.json). Older style reference: `episodes/014-shtraf-kamera/`.

## 0. Setup
```bash
git clone --depth 1 -b zerotaxi-reels https://github.com/ituraev97/sanoqboz_media /home/claude/zt
R=/home/claude/zt/remotion; P=/home/claude/zt/pipeline
bash $R/tools/setup.sh      # deps, fonts, Zero Taxi brand pngs into public/, Kenney SFX
```
If `stills.sh`/`render.sh` can't find Chromium, check `ls /opt/pw-browsers` and fix the CH line (never download a browser).

## 1. Topic
`zt/topics.md`: row # = days since 2026-11-04 (Asia/Tashkent) + 1, with the `needs-data` rule from that file. Episode folder `episodes/zt-NNN-slug/` (NNN = next number).

## 2. Brand (already built into kit/Art/lib on this branch — do not revert)
- Logo: `zt_mark.png` in the HUD, `zt_logo.png` (Zero Taxi · Yandex Go Hamkor) as `Lockup`. HUD title “ZERO TAXI”.
- Colours from the zerotaxi site: teal `#3FA9B8` (TEAL: chapter names, progress gradient, keyword boxes), yellow `#F7C64B` (Y: headline accents, numbers), green = yes/ok, red = no/wrong.
- **Ending = `ZtEnd`** (kit): headline “Zero Taxi’ga ulaning”, lockup, 3–4 perk pills, big yellow Telegram button `t.me/zerotaxiplus_mp`. Never `ShareEnd`, never “do‘stingizga yuboring”, never sanoqboz.
- No Yandex logo or app icons; “Yandex” only as plain text. Fictional plates.

## 3. Park facts (the ONLY facts about Zero Taxi you may use)
- Free OSGOP policy from the park; OSGOP gives **+4 priority** (park's figure — Src line: “+4 — Zero Taxi ma’lumoti; joriy qiymat Yandex Pro ilovasida”).
- **+10%** from the park on balance top-ups (100 000 → +10 000).
- Withdrawals: about **5 seconds**, no limit, no commission (Telegram bot “Zero Taxi PAY”).
- Park tournament: **1 000 000 so‘m every month**, on top of Yandex bonuses.
- Support **24/7**. Contact: Telegram **t.me/zerotaxiplus_mp** (“havola profilda”).
- Cargo (yuk) tariff: 1-year ad permit — driver pays **650 000** (full price Tashkent 1 800 000, regions 1 500 000), car wrap free, branding **+18 priority**.
- The licence is NOT free. Do not mention “7 days 0%”. No park commission %, driver counts, car counts or years on the market are known — never invent them.
Everything about Yandex/market/rules: only from a page you opened (pro.yandex.com/uz-ru/tashkent knowledge base first, then gov.uz, lex.uz, kun.uz, gazeta.uz, spot.uz). Grey `Src` line under every such fact; illustrative numbers labelled “misol”. Can't confirm → cut it. Write `sources.md`.

## 4. Script
As RUNBOOK §3 (140–165 words, numbers as words, hook in sentence 1, «Endi qiziq joyi...» around 55 %, one kind everyday joke), except: tone = experienced driver-friend; the last 2–4 sentences are the park offer (pick perks that fit the topic) and the final line is “Zero Taxi'ga ulaning — havola profilda.” Tags: [curious] [serious] [warm] [intrigued] [dramatic] [softly] [whispers].

## 5. Voice
ElevenLabs connector `creative_generate_speech`: model `eleven_v4`, voice mirzaev `RaNVfTYq3HYeFPLng6XN`, **generations_count 1**. Poll `creative_get_flow_run_status` until done; curl `content_url` → `EP/raw.mp3`. Never re-run a generation unless it failed. **If the ElevenLabs connector is missing, stop and tell the owner — never use another voice.**
Then RUNBOOK §5 (prep.py with speed 1.06–1.12 → 55–70 s; mkcaps.py; replace straight `'` with `’` in rv/caps.ts).

## 6. Scenes, checks, audio, render
RUNBOOK §6–7 exactly (use.sh, stills.sh every ~2 s, read every sheet, at least 2 fix rounds, audio.py + mix.sh, render.sh in background, wait for RENDER DONE, QA 55–70 s and ≈ −14 LUFS, read final_sheet.jpg). Cover: Zero Taxi lockup on top, grey mono kicker, big yellow question, hero art, green payoff line.
No upload/Metricool/branches for this brand.

## 7. Deliver to the owner (in the chat)
1. Copy `final.mp4` → `ZeroTaxi_<slug>.mp4`, `cover.jpg` → `ZeroTaxi_<slug>_cover.jpg`; send both with SendUserFile (status proactive).
2. SendUserMessage in Russian: title; the **Instagram caption** in Uzbek Latin ready to paste (line 1 = hook question; 2–3 short sentences; “Zero Taxi’ga ulaning 👉 havola profilda”; 4–6 hashtags such as #zerotaxi #yandexgo #taksi #toshkent #haydovchi); then 1–3 lines of anything to check (facts you could not confirm, skipped topics).
3. Mark the topic `done YYYY-MM-DD` in zt/topics.md and commit episode text files (script.txt, prompt.txt, meta.json, sources.md, words.json, rv/*) to `zerotaxi-reels`. If push is not possible, skip it (topics are picked by date).
