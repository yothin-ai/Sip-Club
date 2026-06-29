import Link from "next/link";
import { APP_HREF } from "./Navbar";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-20 text-center">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(167,139,250,.18), transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-pill border border-border px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-mono text-xs text-body-soft">for people who already brew</span>
      </div>

      <h1
        className="mx-auto max-w-3xl bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(110deg, #d9cdff, #a78bfa 55%, #7c5cfa)",
          fontSize: "clamp(40px, 6vw, 60px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
        }}
      >
        Scan your beans.
        <br />
        Brew the perfect cup.
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-body sm:text-lg">
        Sip Club reads the roast, process, and origin off your coffee bag, converts the
        recipe to your own grinder, and walks you through the pour with a live timer.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={APP_HREF}
          className="rounded-pill bg-gradient-to-br from-accent to-accent-deep px-7 py-3.5 text-sm font-semibold text-[#140d22]"
        >
          Start brewing free
        </Link>
        <a
          href="#how-it-works"
          className="rounded-pill border border-border px-7 py-3.5 text-sm font-medium text-body-soft"
        >
          See how it works
        </a>
      </div>

      <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
        Comandante · Timemore · Kingrinder · 1Zpresso · Fellow Ode · Baratza · DF64 · Mahlkonig
      </p>
    </section>
  );
}
