const steps = [
  { step: "01", title: "Set up your gear", desc: "Tell us your grinder and dripper once." },
  { step: "02", title: "Scan a bag", desc: "Photo or upload — we read the roast, process, and origin." },
  { step: "03", title: "Follow the timer", desc: "Pour-by-pour guidance with a live progress ring." },
];

export function Steps() {
  return (
    <section id="how-it-works" className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-semibold text-heading sm:text-3xl">
          Three steps to a better cup
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-card border border-border-strong bg-surface-strong p-7"
            >
              <span className="font-mono text-sm text-accent">Step {s.step}</span>
              <h3 className="mt-3 mb-2 text-lg font-medium text-heading">{s.title}</h3>
              <p className="text-sm leading-relaxed text-body">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
