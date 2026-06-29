import Link from "next/link";

// TODO: /app is a placeholder for where the apps/mobile onboarding flow would be
// mounted/deep-linked from. This is a separate Expo app, not a route inside this
// Next.js project, so there's no real cross-app router wiring here yet.
const APP_HREF = "/app";

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <div className="flex items-center justify-between rounded-pill border border-border bg-bg-alt/80 px-5 py-3 backdrop-blur">
        <Link href="/" className="font-mono text-sm font-medium text-heading">
          sip•club
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-body hover:text-heading">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-body hover:text-heading">
            How it works
          </a>
          <a href="#gear" className="text-sm text-body hover:text-heading">
            Supported gear
          </a>
        </nav>
        <Link
          href={APP_HREF}
          className="rounded-pill bg-gradient-to-br from-accent to-accent-deep px-4 py-2 text-sm font-medium text-[#140d22]"
        >
          Open app
        </Link>
      </div>
    </header>
  );
}

export { APP_HREF };
