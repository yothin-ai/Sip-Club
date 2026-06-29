const columns = [
  {
    title: "Product",
    links: ["Features", "How it works", "Supported gear"],
  },
  {
    title: "Resources",
    links: ["Brew guide", "Grind charts", "FAQ"],
  },
  {
    title: "Company",
    links: ["About", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-footer-bg px-4 py-14 text-footer-text">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <span className="font-mono text-sm font-medium">sip•club</span>
            <p className="mt-3 max-w-[200px] text-xs text-footer-text-soft">
              Coffee drip brewing assistant for people who already own their gear.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link} className="text-xs text-footer-text-soft">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-footer-text-soft">
          © {new Date().getFullYear()} Sip Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
