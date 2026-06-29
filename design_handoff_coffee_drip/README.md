# Handoff: Coffee Drip Assistant (Sip-Club)

> Reference doc for developers / AI coding agents (Claude Code, Devin, etc.) before starting work on this repo.

## 1. Overview

Coffee drip brewing assistant app: scan a bag of beans → AI analyzes roast level / processing method / origin → calculates a personalized recipe (ratio, water temperature, grinder setting converted to the user's own grinder, pour-by-pour schedule) → live brew timer guide → collect taste feedback to refine the recipe next time.

**Target users:** specialty coffee drinkers who already own gear (hand grinder + dripper), not total beginners.

**Two parts:**
1. **Landing page** — marketing page (dark SaaS style)
2. **App** — the real flow, 5 screens (onboarding → photo → recipe → timer → feedback)

## 2. About the Design Files

The files in this folder are **HTML design references** — interactive prototypes showing the intended look + behavior, not production code to use as-is.

The job is to **rebuild these screens natively** on the real stack (see section 3), matching colors, spacing, radius, and layout closely. The state/logic embedded in the HTML files is a behavioral reference only.

Design reference files:
- `Coffee Drip - Landing.dc.html` — marketing page
- `Coffee Drip - App.dc.html` — the 5-screen app flow (state machine + interactions)
- `coffee_app_base_data.json` — seed data (grinders, drippers, sample recipe, feedback taxonomy)

## 3. Tech Stack (chosen, do not change without discussion)

- **App (5 screens):** Expo (React Native) + Expo Router + TypeScript + NativeWind — ships iOS / Android / Web from one codebase
- **Landing:** Next.js + TypeScript + Tailwind
- **Shared:** `/packages/core` (types + data + recipe calculation helpers)
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions)
- **AI bag analysis:** Claude vision API, called only from a Supabase Edge Function (never from client)
- **Language:** TypeScript everywhere

### Project layout
```
/apps
  /mobile        — Expo (iOS/Android/Web) — the 5-screen app
  /landing       — Next.js — marketing page
/packages
  /core          — types + data (coffee_app_base_data.json → typed) + recipe helpers
/supabase
  /functions     — analyze-bag (calls Claude vision)
```
(pnpm workspaces monorepo)

## 4. Fidelity

High-fidelity: colors, spacing, and interaction should closely match the HTML reference (pixel-accurate where reasonable), reimplemented natively per screen.

## 5. Design Tokens

### Colors (dark SaaS, purple accent)
| Token | Value | Use |
|---|---|---|
| `bg` | `#0a0712` | base background |
| `bg-alt` | `#100b1a` | timer ring / device background |
| `surface` | `rgba(167,139,250,0.04)` | glass card fill |
| `surface-strong` | `rgba(167,139,250,0.06)` | input / pill fill |
| `border` | `rgba(167,139,250,0.15)` | card border |
| `border-strong` | `rgba(167,139,250,0.28)` | active/emphasis border |
| `accent` | `#b9a3ff` | primary accent (icons, labels) |
| `accent-2` | `#a78bfa` | secondary accent |
| `accent-deep` | `#7c5cfa` | gradient end for primary buttons |
| `heading` | `#f5f3ff` | heading text |
| `body` | `#9d94b0` | body text |
| `body-soft` | `#c8bfdb` | emphasized body text |
| `muted` | `#7d738f` | hints |
| `footer-bg` | `#c4acfb` | footer background (light, intentional contrast) |
| `footer-text` | `#1c1330` / `#42326a` | footer text |

Primary button gradient: `linear-gradient(135deg, #b9a3ff, #7c5cfa)` with text color `#140d22`.
Headline accent gradient: `linear-gradient(110deg, #d9cdff, #a78bfa 55%, #7c5cfa)` (background-clip: text).
Background glow: `radial-gradient(ellipse, rgba(167,139,250,.18), transparent 65%)` + `blur(40px)`.

### Typography
- Primary font: `Anuphan` (Google Fonts, Thai + Latin), weights 300–700
- Numeric / mono labels (grind settings, time, units): `JetBrains Mono`, weights 400–600
- Big headings: 40–60px / weight 600 / letter-spacing -0.02em
- Screen headings: 26px / 600
- Body: 14–18px / 400 / line-height 1.5–1.6

### Radius
Cards: 20–22px · CTA hero card: 34px · pill buttons: 999px · inputs: 15px · chips: 999px · icon badges: 15–18px

### Spacing
Card padding: 22–30px · grid gap: 18–20px · section padding: 50–96px

## 6. Screens / Views

### A. Landing Page
1. **Navbar** — pill, sticky top, logo, nav links, primary CTA button
2. **Hero** — trust pill badge, two-line gradient headline, subtext, primary + secondary CTA, gear logo strip
3. **Features A (3 cards)** — AI bag scan, grind conversion, timer guide — each with a small visual mockup
4. **Features B (4 small cards)** — taste feedback loop, calibrate any grinder, no signup required, save favorite recipes
5. **3-step section** (styled like pricing cards) — Step 01 setup gear, Step 02 scan bag, Step 03 follow timer guide
6. **Gear strip** — pill list of all supported grinders/drippers + "calibrate any gear" note
7. **Final CTA** — big rounded card, glow background, primary + secondary CTA
8. **Footer** — light purple background, logo, link columns (Product / Resources / Company), copyright

All CTAs link to the app onboarding screen.

### B. App — 5 screens
Phone-frame layout (412×844) with header: back button (hidden on screen 0), screen label (mono), 5 progress dots (active dot is wider with gradient).

**Screen 0 — Onboarding**
- Heading + subtext
- Grinder dropdown (custom select, list from `grinders`)
- Dripper dropdown (list from `drippers`)
- Dashed "don't have gear yet? calibrate later" card
- Primary button → next

**Screen 1 — Photo scan**
- Dashed glass dropzone + upload icon + hint text
- "Scan / Upload" button → triggers analysis (mocked client-side per `analyzed` boolean)
- After analysis: bag mockup with bounding box overlay + 3 result chips (Roast level, Processing, Origin) each with a confidence % badge
- Primary button → next (recipe)
- **Important:** analysis must be mocked client-side for now — flagged for real API wiring later (see backend section)

**Screen 2 — Recipe**
- Heading + one-line summary ("Ethiopia · Washed · Medium roast for {dripper}")
- 3 stat cards: ratio, water temp, total time
- Grind setting card: grinder name + computed setting (e.g. "24 clicks") + dose/water (e.g. "15g / 250g")
- Pour-by-pour vertical timeline (dot + connecting line) built from `recipe.pours`
- Primary button "Start brew" → starts timer, goes to screen 3

**Screen 3 — Timer guide**
- Large circular progress ring (conic-gradient by elapsed/total), pulses while running
- Center: mm:ss / total, target water amount chip
- "Current step" card (highlighted) with time, label, description
- "Next step" card (dimmed)
- Run/pause toggle button + "finish brew" button → goes to feedback
- Timer ticks every 1s; current/next step derived from elapsed time vs. pour thresholds

**Screen 4 — Feedback**
- Heading + subtext
- Multi-select taste chips from `feedback_taxonomy` ("perfect" is exclusive — selecting it clears other chips and vice versa)
- "Recipe adjustment" card showing text mapped from selected chips via `adjustments`
- "Save feedback" button + "brew again" link (back to screen 1, state reset)
- No free-text field — chips only

## 7. Interactions & Behavior
- Screen navigation is a simple `screen: 0..4` state machine; back button decrements, primary buttons advance; dots reflect progress.
- Dropdowns: toggle open/close, only one open at a time, selecting closes and selects.
- Bag analysis is mocked client-side until the real Edge Function is wired (section 3 backend).
- Timer: 1-second interval; ring fills by elapsed/total; pulses while running; current/next step computed from pour time thresholds; resets on "brew again".
- Feedback chips: multi-select; "perfect" is mutually exclusive with all others; adjustment text recomputed from current selection.

## 8. State (per screen, client-side)
```
screen: 0|1|2|3|4
grinder: string, dripper: string
grinderOpen / dripperOpen: boolean
analyzed: boolean            // production: analysisResult | null
elapsed: number (seconds), running: boolean   // timer
feedback: string[]           // selected taxonomy ids
saved: boolean
```
Production additions: `currentBag/analysisResult`, `recipe` (derived from analysis + gear), `brewHistory[]`.

## 9. Data Model
See `coffee_app_base_data.json` — `grinders`, `drippers`, `sample_recipe` (with `pours[]`), `analysis_fields`, `feedback_taxonomy`, and `adjustments` (feedback id → recipe adjustment text). Port this 1:1 into typed constants in `packages/core`.

## 10. Assets
- Fonts: Anuphan + JetBrains Mono (Google Fonts) — use `expo-google-fonts` in the app, `next/font` in landing
- Icons: simple CSS shapes in the reference (dot/square/diamond/ring) — fine to keep as custom shapes, or swap for an icon set (e.g. lucide) team-wide
- Bag/visual mockups: CSS-only placeholders in the reference — fine to keep as styled placeholders, real photos come from the camera/upload at runtime

## 11. Files in this folder
- `Coffee Drip - Landing.dc.html` — landing reference (logic embedded)
- `Coffee Drip - App.dc.html` — app reference (logic embedded)
- `coffee_app_base_data.json` — seed data
- `README.md` — this file
- `PROMPTS.md` — staged build prompts for AI coding agents
