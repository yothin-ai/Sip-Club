# CLAUDE.md — Sip-Club (Coffee Drip Assistant)

Read this before working in this repo.

## What this is
Coffee drip brewing assistant: scan a bag of beans → AI infers roast/process/origin → calculate a personalized recipe (ratio, temp, grinder setting converted to the user's own grinder, pour-by-pour timeline) → live timer guide → taste feedback that refines the next recipe.
Target users: people who already own specialty gear (hand grinder + dripper), not total beginners.

## Always start here
1. `design_handoff_coffee_drip/README.md` — full spec (screens, interactions, state, design tokens, project layout)
2. `design_handoff_coffee_drip/PROMPTS.md` — staged build prompts, one stage at a time
3. `design_handoff_coffee_drip/coffee_app_base_data.json` — seed data (gear/grind conversion/recipes/feedback)

## Stack (decided — confirm with user before changing)
- **App:** Expo (React Native) + Expo Router + TypeScript + NativeWind — ships iOS/Android/Web from one codebase
- **Landing:** Next.js + TypeScript + Tailwind
- **Shared:** /packages/core (types + data + recipe calculation helpers)
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions)
- **AI:** Claude vision API, called only from a Supabase Edge Function
- **Language:** TypeScript everywhere

## Rules of the road
- Work through `PROMPTS.md` stages in order — don't skip ahead to backend/AI wiring before the UI stages are real.
- Keep design tokens (colors/fonts/radius/spacing) in one shared place (theme config), referenced by both apps — never hardcode hex values per screen.
- Bag analysis must be mocked client-side until the real Edge Function exists — never fake a result as if it came from the real API.
- Never put the Claude API key client-side — Supabase Edge Function secret only.
- Auth starts anonymous/guest by default; sign-up is an optional upgrade, never a gate.
- Feedback is chip-select only (from the fixed taxonomy) — no free-text field; "perfect" is mutually exclusive with all other tags.

## Copywriting
Plain, casual Thai/English copy aimed at people who already brew at home — avoid jargon-y internal field names leaking into UI text. Error/empty states should say what happened and what to do next, not show a stack trace.
