import Image from "next/image";

const PARTIES = [
  { name: "Democratic Coalition", value: 4, color: "bg-blue-500", logo: "democratic-coalition" },
  { name: "Fidesz–KDNP", value: 39, color: "bg-orange-400", logo: "fidesz-kdnp" },
  { name: "Our Homeland", value: 7, color: "bg-emerald-500", logo: "our-homeland" },
  { name: "Tisza", value: 49, color: "bg-teal-500", logo: "tisza" },
  { name: "Two-Tailed Dog Party", value: 3, color: "bg-purple-500", logo: "two-tailed-dog-party" },
] as const;

const logoPath = (slug: string) => `/images/parties/${slug}.png`;

export function HungaryPollsChart() {
  const parties = [...PARTIES].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section
      aria-label="Hungary April 2026 election polls"
      className="bg-white dark:bg-zinc-900"
    >
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-zinc-100 px-4 py-5 dark:border-zinc-700 sm:px-6 sm:py-6">
          <header className="space-y-1 pb-5 sm:pb-6">
            <h2 className="font-sans text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Hungary opinion polls – April 2026 election
            </h2>
            <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
              Party preferences based on the average of the latest nationwide
              surveys (among likely voters).
            </p>
          </header>
          <div className="space-y-4">
            {parties.map((party) => (
              <div key={party.name} className="flex items-center gap-3">
                <div className="flex w-36 shrink-0 items-center gap-2 sm:w-44">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-700 dark:ring-zinc-600">
                    <Image
                      src={logoPath(party.logo)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{party.name}</span>
                </div>
                <div className="relative flex-1">
                  <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-700" />
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full ${party.color}`}
                    style={{ width: `${party.value}%` }}
                  />
                </div>
                <div className="w-12 shrink-0 text-right text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {party.value}%
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 hidden border-t border-zinc-100 pt-4 text-[11px] text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 sm:block">
            <p>
              Source: Zavecz Research, Publicus, Reuters summaries,
              February–March 2026. Values are rounded percentages among likely
              voters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

