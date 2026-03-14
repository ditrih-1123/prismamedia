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
      className="mt-auto border-t border-zinc-200 dark:border-zinc-700"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-sans text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Prisma<span className="font-normal">Media</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
              News, polls, and in-depth reporting on politics and policy in Central and Eastern Europe.
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <nav aria-label="Footer regions">
<h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
              Regions
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {regions.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="rounded text-sm text-zinc-600 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Footer legal and info">
<h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
              Legal
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="rounded text-sm text-zinc-600 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-100 pt-6 dark:border-zinc-700">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {currentYear} PrismaMedia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
