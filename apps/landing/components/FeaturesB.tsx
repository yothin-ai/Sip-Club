const features = [
  { title: "Taste feedback loop", desc: "Tell us too sour, too bitter, or perfect — we adjust the next brew." },
  { title: "Calibrate any grinder", desc: "Hand or electric, click-scale or dial — works with what you own." },
  { title: "No signup required", desc: "Start brewing as a guest. Create an account only if you want history." },
  { title: "Save favorite recipes", desc: "Lock in the recipe that worked and reuse it for the same bag." },
];

export function FeaturesB() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-card-sm border border-border bg-surface p-5"
          >
            <h3 className="mb-1.5 text-sm font-medium text-heading">{f.title}</h3>
            <p className="text-xs leading-relaxed text-body">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
