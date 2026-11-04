# sanoqboz reel style (owner's playbook, 2026-11-03) — read before writing scenes

Animated infographic explainer, 9:16 1080×1920, 30 fps, 55–70 s. One everyday question → the hidden mechanism
step by step → a twist in the middle → payoff → "do‘stingizga yuboring". Everything drawn in code (Remotion,
SVG/HTML). No stock footage, no AI video, no cuts — smooth transitions only. Owner checks small details.

## Brand (always)
- Logo = `pipeline/mark.svg` (corner brackets, 3×3 grid, last cell red + red ring), round in the HUD (kit `Logo`).
- Lockup = `pipeline/lockup.svg` (mark + SANOQBOZ + RAQAMLAR GAPIRADI): last frame (kit `ShareEnd`) and top of the cover.
- Font: **Oswald** 700/600 (headlines, captions, handle, chapter names); JetBrains Mono for small grey lines;
  Inter only for UI text inside phones/cards/pills.
- Colours (`src/lib.ts`): bg #05070A family, white #F3F5F8, grey #7F8792, **brand red #EC3A2C** (chapter name,
  progress bar, "no/wrong"), yellow #FFCF3A (headline accent line, numbers), green #3DDC84 ("yes/ok"),
  blue #5B8CFF (keyword boxes), ice #9BE3FF.
- HUD (kit `Hud`, automatic): mark + @sanoqboz + topic line; "BOB 03/09" + red chapter name; red segmented progress.

## Look
- Background (automatic): dark radial gradient, faint 96 px grid with "+" crosshairs, drifting dust, vignette.
- **One hero object per frame**, centred and big (phone, camera, car, gauge, card, coin…), clean vector with
  gradients and highlights, warm glow behind (`Glow`).
- Captions (automatic from caps.ts): word by word at y≈360, spoken words white, upcoming grey, keywords boxed blue.
- Headlines (`Head`): UPPERCASE Oswald at y 490, 1–2 lines (3 for the twist), one line yellow ('y'), red ('r') for
  "no", green ('g') for "yes". `from="slam"` on hits.
- Pills (`Pill`) for labels, `Num` for counting numbers, `Stamp` with screen shake (HITS) for verdicts,
  `Card` for tables/forms, `Src` grey mono source line under every statistic.
- Ending: `ShareEnd` (share sheet with Uzbek names → "Yuborildi ✓" → lockup).
- On-screen text in Uzbek Latin with o‘ g‘ (U+2018).

## Hard rules
- No real brand logos/app icons/car makes/product designs; brand NAMES only as plain text. Fictional number plates.
- Every number has a source (Src line). Illustrative numbers are labelled "misol". Can't confirm → cut it.
- Instagram safe zone: in scene coordinates keep text and key art inside x 70–930, y 470–1410. The kit draws the
  HUD at y 270–370 and captions at y 425 and shifts every scene down 45 px (so on screen scenes occupy 515–1455) —
  owner rule 2026-11-04: nothing above y≈260 (Instagram back/+ icons cover it on the phone). Never move the HUD up.
  Right x>930 for y 1000–1700 and bottom >1500 are covered by the app UI. First frame already shows the hook headline.
- Code rules: pure function of time; seeded `rnd` only; SVG blur only via `<filter><feGaussianBlur>`; SVG ids unique
  and without spaces (pass an `id` prop to art used twice); `Boolean(x) &&` in JSX; zooms in log space (`logZ`).
