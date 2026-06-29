/**
 * NativeWind config. Color/radius/spacing values are duplicated numerically from
 * packages/core/src/tokens.ts (see design_handoff_coffee_drip/README.md section 5).
 * There's no clean way to import a TS module into this config at build time for both
 * the RN/Metro and Next.js toolchains, so keep this file's values in sync with
 * apps/landing/tailwind.config.ts and packages/core/src/tokens.ts by hand.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "#0a0712",
        "bg-alt": "#100b1a",
        surface: "rgba(167,139,250,0.04)",
        "surface-strong": "rgba(167,139,250,0.06)",
        border: "rgba(167,139,250,0.15)",
        "border-strong": "rgba(167,139,250,0.28)",
        accent: "#b9a3ff",
        "accent-2": "#a78bfa",
        "accent-deep": "#7c5cfa",
        heading: "#f5f3ff",
        body: "#9d94b0",
        "body-soft": "#c8bfdb",
        muted: "#7d738f",
        "footer-bg": "#c4acfb",
        "footer-text": "#1c1330",
        "footer-text-soft": "#42326a",
      },
      fontFamily: {
        sans: ["Anuphan_400Regular"],
        "sans-medium": ["Anuphan_500Medium"],
        "sans-semibold": ["Anuphan_600SemiBold"],
        mono: ["JetBrainsMono_400Regular"],
        "mono-medium": ["JetBrainsMono_500Medium"],
        "mono-semibold": ["JetBrainsMono_600SemiBold"],
      },
      borderRadius: {
        card: "22px",
        "card-sm": "20px",
        "cta-hero": "34px",
        pill: "999px",
        input: "15px",
        chip: "999px",
        "icon-badge": "18px",
        "icon-badge-sm": "15px",
      },
      spacing: {
        "card-padding": "26px",
        "grid-gap": "18px",
      },
    },
  },
  plugins: [],
};
