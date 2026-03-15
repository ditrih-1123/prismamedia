'use client';

/** Oil prices (USD per barrel). Replace with API when needed. */
const OIL_PRICES = [
  { label: "Brent", value: 82.4, unit: "USD/bbl" },
  { label: "WTI", value: 78.1, unit: "USD/bbl" },
] as const;

/** EU direction approval (approve / disapprove) — only countries covered on the site. */
const EU_APPROVAL_BY_COUNTRY = [
  { country: "Czech Republic", approve: 45, disapprove: 38 },
  { country: "Slovakia", approve: 38, disapprove: 44 },
  { country: "Hungary", approve: 35, disapprove: 52 },
  { country: "Moldova", approve: 58, disapprove: 28 },
  { country: "Georgia", approve: 62, disapprove: 24 },
  { country: "Armenia", approve: 41, disapprove: 36 },
] as const;

export function LatestDigest() {
  return (
    <div className="min-w-0 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-4 dark:border-zinc-600 dark:bg-zinc-800/60 sm:px-4 sm:py-5">
      <header className="mb-4 space-y-0.5">
        <h3 className="font-sans text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Latest digest
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Oil prices, EU direction approval by country.
        </p>
      </header>

      {/* Oil prices */}
      <section className="mb-5" aria-label="Oil prices">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Oil (per barrel)
        </h4>
        <ul className="flex flex-wrap gap-3">
          {OIL_PRICES.map(({ label, value, unit }) => (
            <li
              key={label}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
            >
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{label}</span>
              <p className="font-sans text-sm font-bold text-zinc-900 dark:text-zinc-100">
                ${value.toFixed(1)}
                <span className="ml-1 font-normal text-zinc-500 dark:text-zinc-400">{unit}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* EU direction approval by country (site countries only) */}
      <section className="mb-5" aria-label="EU direction approval by country">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          EU direction approval (%)
        </h4>
        <ul className="space-y-3">
          {EU_APPROVAL_BY_COUNTRY.map(({ country, approve, disapprove }) => {
            const rest = 100 - approve - disapprove;
            return (
              <li key={country}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{country}</span>
                  <span className="tabular-nums">
                    <span className="text-emerald-700 dark:text-emerald-400">{approve}</span>
                    <span className="text-zinc-500 dark:text-zinc-400"> / </span>
                    <span className="text-red-600 dark:text-red-400">{disapprove}</span>
                  </span>
                </div>
                <div className="relative mt-1 h-2.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-600">
                  <div
                    className="absolute inset-y-0 left-0 rounded-l-full bg-emerald-500"
                    style={{ width: `${approve}%` }}
                  />
                  <div
                    className={`absolute inset-y-0 bg-red-400 ${rest > 0 ? "" : "rounded-r-full"}`}
                    style={{ left: `${approve}%`, width: `${disapprove}%` }}
                  />
                  {rest > 0 && (
                    <div
                      className="absolute inset-y-0 rounded-r-full bg-zinc-300 dark:bg-zinc-500"
                      style={{ left: `${approve + disapprove}%`, width: `${rest}%` }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-4 border-t border-zinc-200 pt-3 text-xs text-zinc-600 dark:border-zinc-600 dark:text-zinc-400">
        Oil: spot. EU approval: Eurobarometer, national polls, 2024–2025.
      </p>
    </div>
  );
}
