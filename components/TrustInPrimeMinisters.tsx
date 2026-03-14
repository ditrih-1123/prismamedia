import Image from "next/image";

/** Trust / distrust as share of respondents. Rest = don't know / no answer. */
const PM_DATA = [
  {
    name: "Andrej Babiš",
    country: "Czech Republic",
    imageUrl: "/images/Babish.png",
    trust: 38,
    distrust: 52,
  },
  {
    name: "Robert Fico",
    country: "Slovakia",
    imageUrl: "/images/Fico.png",
    trust: 32,
    distrust: 56,
  },
  {
    name: "Viktor Orbán",
    country: "Hungary",
    imageUrl: "/images/Orban.png",
    trust: 41,
    distrust: 53,
  },
  {
    name: "Oleksandr Muntianu",
    country: "Moldova",
    imageUrl: "/images/Muntianu.png",
    trust: 42,
    distrust: 44,
  },
  {
    name: "Irakli Kobakhidze",
    country: "Georgia",
    imageUrl: "/images/Kobahidze.png",
    trust: 28,
    distrust: 62,
  },
  {
    name: "Nikol Pashinyan",
    country: "Armenia",
    imageUrl: "/images/Pashynyan.png",
    trust: 16,
    distrust: 65,
  },
] as const;

export function TrustInPrimeMinisters() {
  return (
    <div className="min-w-0 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-4 sm:px-4 sm:py-5">
      <header className="mb-4 space-y-0.5">
        <h3 className="font-sans text-base font-bold tracking-tight text-zinc-900">
          Trust in prime ministers
        </h3>
        <p className="text-xs text-zinc-600">
          Share who trust vs. distrust (%), latest national polls.
        </p>
      </header>
      <div className="space-y-3.5">
        {PM_DATA.map((pm) => {
          const rest = 100 - pm.trust - pm.distrust;
          return (
            <div key={pm.country} className="flex gap-2.5">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-zinc-200 ring-1 ring-zinc-300">
                <Image
                  src={pm.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div className="min-w-0 flex-1 overflow-visible">
                <p className="text-sm font-semibold leading-tight text-zinc-900">
                  {pm.name}
                </p>
                <p className="text-xs text-zinc-600">{pm.country}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="relative h-2.5 min-w-[80px] flex-1 overflow-hidden rounded-full bg-zinc-200">
                    <div
                      className="absolute inset-y-0 left-0 rounded-l-full bg-emerald-500"
                      style={{ width: `${pm.trust}%` }}
                      title={`Trust ${pm.trust}%`}
                    />
                    <div
                      className={`absolute inset-y-0 bg-red-400 ${rest > 0 ? "" : "rounded-r-full"}`}
                      style={{ left: `${pm.trust}%`, width: `${pm.distrust}%` }}
                      title={`Distrust ${pm.distrust}%`}
                    />
                    {rest > 0 && (
                      <div
                        className="absolute inset-y-0 rounded-r-full bg-zinc-300"
                        style={{
                          left: `${pm.trust + pm.distrust}%`,
                          width: `${rest}%`,
                        }}
                        title={`DK/NA ${rest}%`}
                      />
                    )}
                  </div>
                  <div className="w-11 shrink-0 text-right text-xs font-medium">
                    <span className="text-emerald-700">{pm.trust}</span>
                    <span className="text-zinc-500">/</span>
                    <span className="text-red-600">{pm.distrust}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 border-t border-zinc-200 pt-3 text-xs text-zinc-600">
        Sources: Eurobarometer, national pollsters (Median, Focus, etc.), 2024–2025.
      </p>
    </div>
  );
}
