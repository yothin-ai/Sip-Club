const features = [
  {
    title: "AI bag scan",
    desc: "Snap a photo of your bag — we read roast level, processing method, and origin automatically.",
    mockLabel: "Medium · Washed · Ethiopia",
  },
  {
    title: "Grind conversion",
    desc: "Recipes are converted live to your exact grinder's click/dial scale, no guessing.",
    mockLabel: "24 clicks · Comandante C40",
  },
  {
    title: "Timer guide",
    desc: "A live pour-by-pour timer with a progress ring keeps every brew consistent.",
    mockLabel: "1:30 / 2:45",
  },
];

export function FeaturesA() {
  return (
    <section id="features" className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-semibold text-heading sm:text-3xl">
          Everything you need to dial in a bag
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-card border border-border bg-surface p-7"
            >
              <div className="mb-5 rounded-card-sm border border-border-strong bg-bg-alt p-4">
                <span className="font-mono text-xs text-accent">{f.mockLabel}</span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-heading">{f.title}</h3>
              <p className="text-sm leading-relaxed text-body">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
