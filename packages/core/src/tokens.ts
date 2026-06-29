/**
 * Design tokens — single source of truth for values described in
 * design_handoff_coffee_drip/README.md section 5.
 *
 * NativeWind (apps/mobile/tailwind.config.js) and Tailwind (apps/landing/tailwind.config.ts)
 * each duplicate these same values in their own config files (no clean way to share a JS
 * object directly between an RN/Metro toolchain and a Next.js/webpack toolchain at config
 * time), so if you change a value here, mirror it in both configs.
 */

export const colors = {
  bg: "#0a0712",
  bgAlt: "#100b1a",
  surface: "rgba(167,139,250,0.04)",
  surfaceStrong: "rgba(167,139,250,0.06)",
  border: "rgba(167,139,250,0.15)",
  borderStrong: "rgba(167,139,250,0.28)",
  accent: "#b9a3ff",
  accent2: "#a78bfa",
  accentDeep: "#7c5cfa",
  heading: "#f5f3ff",
  body: "#9d94b0",
  bodySoft: "#c8bfdb",
  muted: "#7d738f",
  footerBg: "#c4acfb",
  footerText: "#1c1330",
  footerTextSoft: "#42326a",
} as const;

export const gradients = {
  primaryButton: "linear-gradient(135deg, #b9a3ff, #7c5cfa)",
  primaryButtonText: "#140d22",
  headlineAccent: "linear-gradient(110deg, #d9cdff, #a78bfa 55%, #7c5cfa)",
  bgGlow: "radial-gradient(ellipse, rgba(167,139,250,.18), transparent 65%)",
} as const;

export const fonts = {
  primary: "Anuphan",
  mono: "JetBrains Mono",
} as const;

export const fontSizes = {
  heroMin: 40,
  heroMax: 60,
  screenHeading: 26,
  bodyMin: 14,
  bodyMax: 18,
} as const;

export const radius = {
  card: 22,
  cardSm: 20,
  ctaHero: 34,
  pill: 999,
  input: 15,
  chip: 999,
  iconBadge: 18,
  iconBadgeSm: 15,
} as const;

export const spacing = {
  cardPaddingMin: 22,
  cardPaddingMax: 30,
  gridGap: 18,
  gridGapMax: 20,
  sectionPaddingMin: 50,
  sectionPaddingMax: 96,
} as const;

export type ColorToken = keyof typeof colors;
