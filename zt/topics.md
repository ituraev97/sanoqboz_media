# Zero Taxi — topic queue (one reel per day)
Day index = days since 2026-11-04 (Asia/Tashkent): 2026-11-04 → #1, 2026-11-05 → #2 …
If a row says `needs-data` and the data is still missing in ZT_RUNBOOK.md § Park facts, skip to the next row without `needs-data`, and say so in the message to the owner.
Topic of a run = row # = day index (by date, so it works even if nothing can be pushed). If that row is `needs-data`, take the next row after it that is not `needs-data` and not `done`. Mark the row `done YYYY-MM-DD` after delivery if push works. Index > 30 → tell the owner the queue is empty and stop.

| # | Hook (Uzbek) | What it explains | Status |
|---|---|---|---|
| 1 | Reyting qanday hisoblanadi? | what lowers/raises driver rating in Yandex Pro | done 2026-11-04 |
| 2 | Yo‘lovchi telefonini mashinada unutdi | step-by-step what to do with a lost item | done 2026-11-05 |
| 3 | Kunlik maqsadlar: 5 ta buyurtma — +32 000 | Yandex daily goals ladder (5→32 000, 10→65 000, 15→98 000, 20→130 000; vary per driver, label as example) | done 2026-11-06 |
| 4 | Yo‘lovchi to‘lamay qochdi | what to do when a cash passenger runs off | todo |
| 5 | Surge — nega narx oshadi? | demand coefficient, how to catch peak demand | todo |
| 6 | «Aka, shu yerda to‘xtating» | where stopping is forbidden, fine (official source) | todo |
| 7 | Buyurtmani o‘tkazib yuborish qancha turadi? | skip vs cancel vs priority points | todo |
| 8 | Haydovchining birinchi haftasi | from connecting to first money | todo |
| 9 | Akkaunt nega bloklanadi? | common block reasons and how to avoid | todo |
| 10 | Salon ifloslandi — kim to‘laydi? | same-day report, photo with tech passport, promo codes; Business/Elite receipt "may" be covered | todo |
| 11 | Selfi fotokontrol nima uchun kerak? | why and how to pass it first time | todo |
| 12 | Oluvchi telefonni ko‘tarmayapti | delivery order: call via app, chat, wait, photo proof, support | todo |
| 13 | Yetkazib berish tarifi qanday ishlaydi? | delivery tariff basics | todo |
| 14 | Osgop nima va nega kerak? | passenger insurance explained simply | todo |
| 15 | Kechki tirbandlik: ishlash kerakmi? | city bonuses at peak hours vs idle time | todo |
| 16 | Park turniri qanday o‘tadi? | leaderboard, 1 000 000 so‘m monthly prize | todo |
| 17 | Tarif qanday tanlanadi? | Ekonom / Komfort / Business car requirements (official list) | todo |
| 18 | Yo‘lovchi bilan janjal | how not to get a complaint | todo |
| 19 | Pulni yechish: necha soniyada? | withdrawal options, ours 5 seconds, no limit, no commission | todo |
| 20 | GAI to‘xtatdi | documents a taxi driver must carry (official source) | todo |
| 21 | Brending nima beradi? | car wrap and priority | needs-data (branding priority value for cars) |
| 22 | Yuk tarifi haydovchilari uchun | ad permit 650 000 instead of 1 800 000 (Tashkent) / 1 500 000 (regions), free wrap, +18 priority | todo |
| 23 | Balansni to‘ldirish: +10% | 100 000 → +10 000 from the park | todo |
| 24 | Avariya bo‘ldi — birinchi 10 daqiqa | what to do, insurance, where to report (official source) | todo |
| 25 | Shahardagi bonuslar | what city bonuses are and where to see them | todo |
| 26 | Nega park orqali ishlash kerak? | what a Yandex partner park does for a driver | todo |
| 27 | Bir kunda qancha topsa bo‘ladi? | honest shift math: revenue − fuel − commission | needs-data (park commission %, typical shift fuel cost) |
| 28 | Metan yoki benzin? | cost per 100 km (official/press prices) | todo |
| 29 | Komissiya qayerga ketadi? | what is deducted from an order | needs-data (park commission %) |
| 30 | Bir oyda bonusning o‘zi qancha? | goals + tournament + 10% combined, labelled "taxminan" | todo |
