import Link from "next/link";
import { APP_HREF } from "./Navbar";

export function FinalCta() {
  return (
    <section className="px-4 py-20">
      <div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-cta-hero border border-border-strong p-12 text-center sm:p-16"
        style={{ background: "rgba(167,139,250,0.04)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(ellipse, rgba(167,139,250,.18), transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <h2 className="mx-auto max-w-xl text-2xl font-semibold text-heading sm:text-3xl">
          Your next bag deserves a real recipe.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-body sm:text-base">
          Free to start, no account needed. Scan your first bag in under a minute.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={APP_HREF}
            className="rounded-pill bg-gradient-to-br from-accent to-accent-deep px-7 py-3.5 text-sm font-semibold text-[#140d22]"
          >
            Start brewing free
          </Link>
          <a
            href="#gear"
            className="rounded-pill border border-border px-7 py-3.5 text-sm font-medium text-body-soft"
          >
            Check my gear
          </a>
        </div>
      </div>
    </section>
  );
}
