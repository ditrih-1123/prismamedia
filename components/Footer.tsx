export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ];

  const regions = [
    { label: "Czech Republic", href: "#czech-republic" },
    { label: "Slovakia", href: "#slovakia" },
    { label: "Hungary", href: "#hungary" },
    { label: "Moldova", href: "#moldova" },
    { label: "Georgia", href: "#georgia" },
    { label: "Armenia", href: "#armenia" },
  ];

  return (
    <footer
      role="contentinfo"
      className="border-t border-zinc-200 mt-auto"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-sans text-xl font-bold tracking-tight text-zinc-900">
              Prisma<span className="font-normal">Media</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-zinc-500">
              Political and policy coverage from Central and Eastern Europe.
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <nav aria-label="Footer regions">
<h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
              Regions
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {regions.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-zinc-600 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Footer legal and info">
<h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
              Legal
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-zinc-600 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-zinc-100">
          <p className="text-xs text-zinc-500">
            © {currentYear} PrismaMedia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
