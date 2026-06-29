import { grinders, drippers } from "@sip-club/core";

export function GearStrip() {
  const gear = [...grinders.map((g) => g.name), ...drippers.map((d) => d.name)];

  return (
    <section id="gear" className="px-4 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-6 text-xl font-medium text-heading">Works with your gear</h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {gear.map((name) => (
            <span
              key={name}
              className="rounded-pill border border-border px-4 py-2 text-xs text-body-soft"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mt-5 font-mono text-xs text-muted">
          don&apos;t see yours? calibrate any gear manually in seconds
        </p>
      </div>
    </section>
  );
}
