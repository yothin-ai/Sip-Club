# PROMPTS — Coffee Drip Assistant (Sip-Club)

Staged build prompts for AI coding agents. Always read `README.md` fully before starting any stage.

## Stage 0 — Load context
Read `design_handoff_coffee_drip/README.md` end to end before writing any code. If unsure about something, summarize your assumption (target users, 5 screens, design tokens, mocked AI analysis until stage 5) rather than guessing silently.

## Stage 1 — Scaffold monorepo (no UI yet)
Scaffold a pnpm workspaces monorepo per `README.md` section 3:
- `/apps/mobile` — Expo + Expo Router + TypeScript + NativeWind
- `/apps/landing` — Next.js + TypeScript + Tailwind
- `/packages/core` — types + data + recipe calculation helpers
- `/supabase/functions`
Wire design tokens (colors/radius/spacing from README section 5) into NativeWind and Tailwind theme config so both apps share them. Don't build screens yet — just confirm both apps boot and lint cleanly.

## Stage 2 — Typed core
Port `coffee_app_base_data.json` into TypeScript in `packages/core`:
- Types per entity: `Grinder`, `Dripper`, `Recipe`, `Pour`, `FeedbackTag`, `Adjustment`
- Export the data as typed constants
- Write `getAdjustmentText(selectedTagIds: string[])` that returns the combined adjustment text from `adjustments`, with the `perfect` tag exclusive/special-cased
Both apps should import data/types from core, never duplicate them.

## Stage 3 — App screens (port one at a time, verify each before moving on)

### 3.1 Onboarding (Screen 0)
Build the onboarding screen per README section 6.B: heading + subtext, grinder dropdown, dripper dropdown (custom selects backed by core data), dashed "no gear yet? calibrate later" card, primary gradient button to advance. Match design tokens for color/spacing/radius.

### 3.2 Photo scan (Screen 1)
Build the dropzone/upload screen: dashed glass dropzone with icon + hint text, scan/analyze button. On press, mock the analysis (~1.5s delay) and show the 3 result chips (roast/process/origin) with confidence badges, matching README. Flag clearly in code (comment + TODO) that this must call the real `analyze-bag` Edge Function in stage 5.

### 3.3 Recipe (Screen 2)
Build the recipe screen: 3 stat cards (ratio/temp/time), grind-setting + dose/water card, vertical pour-by-pour timeline from `recipe.pours`, "Start brew" button. Pull all values from core.

### 3.4 Timer (Screen 3)
Build the live timer: circular progress ring (elapsed/total) with pulse while running, mm:ss/total display, current-step card (highlighted) + next-step card (dimmed), pause/resume + finish-brew buttons. Tick every 1s; derive current/next step from elapsed time vs. each pour's `t_sec`.

### 3.5 Feedback (Screen 4)
Build the feedback screen: multi-select taste chips from `feedback_taxonomy` (`perfect` is exclusive), adjustment-text card driven by `getAdjustmentText()`, save button, "brew again" link that resets state back to screen 1. No free-text field.

### 3.6 Navigation
Wire all 5 screens with Expo Router as a state machine. Primary button advances, back button goes back, progress dots reflect current screen. Share onboarding/analysis/recipe/feedback state across screens via Context or Zustand.

## Stage 4 — Landing page
Build the Next.js landing page per README section 6.A: sticky pill navbar, hero with gradient headline, features A (3 cards with visual mockups), features B (4 small cards), 3-step section, gear strip, final CTA, footer. All CTAs link to the app's onboarding route. Pull gear lists from core, not hardcoded.

## Stage 5 — Real backend + AI (replace mocks)
Set up Supabase: Postgres tables (`user_gear`, `brew_history`, `recipes`), anonymous/guest auth (label any sign-up gate clearly as optional), Storage for bag photos.
Create Edge Function `analyze-bag`: receive image → call Claude vision API → return `{roast, process, origin, confidence}`. Store `ANTHROPIC_API_KEY` as a server-side secret only — never expose it client-side. Replace the stage-3.2 mock with a real call to this function.

## Stage 6 — Polish
- Persist brew + feedback to `brew_history`
- Pre-fill next brew's recipe with the latest saved adjustment for that bag
- End-to-end smoke test on web (Expo Web) and mobile
- Accessibility pass: contrast, font scaling, tap targets ≥44px

---

### Operating notes
- Always re-read `README.md` before each stage.
- Keep scope to the current stage only — don't jump ahead.
- If a design detail isn't in the README, state your assumption and proceed with the smallest reasonable choice rather than blocking.
- Mocked analysis in stage 1–4 must be replaced by the real API in stage 5, not left as a permanent fallback.
