 "use client";

import { useState } from "react";
import Image from "next/image";

type Story = {
  id: string;
  country: string;
  title: string;
  dek: string;
  imageUrl: string;
  imageAlt: string;
  dateline: string;
};

const stories: Story[] = [
  {
    id: "hungary",
    country: "Hungary",
    title: "Power, Brussels And The Battle Over Hungary’s Political Future",
    dek: "Inside the tug-of-war between Budapest and Brussels that is reshaping Eastern Europe’s balance of power.",
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Hungarian Parliament Building at dusk by the river.",
    dateline: "Budapest",
  },
  {
    id: "georgia",
    country: "Georgia",
    title: "Georgia’s Street Protests And The Fight To Stay On A European Path",
    dek: "As crowds fill Tbilisi’s avenues, the country’s leaders are forced to choose between Moscow and Brussels.",
    imageUrl:
      "https://images.unsplash.com/photo-1528744598421-b7b93e12df0b?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Crowd of people protesting in a city street.",
    dateline: "Tbilisi",
  },
  {
    id: "czech",
    country: "Czech Republic",
    title: "Prague’s Power Brokers And The New Politics Of Central Europe",
    dek: "How the Czech Republic is navigating populism, prosperity and pressure from both East and West.",
    imageUrl:
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Skyline of Prague with historic buildings and river.",
    dateline: "Prague",
  },
  {
    id: "armenia",
    country: "Armenia",
    title: "After The Conflict: Armenia’s Leaders Face A Strategic Crossroads",
    dek: "With security guarantees in flux, Yerevan looks for new partners while managing domestic unrest.",
    imageUrl:
      "https://images.unsplash.com/photo-1599057654796-8265a44de891?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Government building and square in Yerevan, Armenia.",
    dateline: "Yerevan",
  },
  {
    id: "slovakia",
    country: "Slovakia",
    title: "Slovakia’s Polarized Politics And The High Stakes For The Eurozone",
    dek: "A deeply divided electorate is testing the country’s institutions—and Europe’s unity on Russia.",
    imageUrl:
      "https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Bratislava old town with castle at sunset.",
    dateline: "Bratislava",
  },
  {
    id: "moldova",
    country: "Moldova",
    title: "Moldova’s Quiet Revolution: Reformers, Oligarchs And The EU Dream",
    dek: "Chisinau’s pro‑European government races against time to lock in reforms and fend off Russian influence.",
    imageUrl:
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Cityscape with government buildings and national flag.",
    dateline: "Chisinau",
  },
];

export function PoliticsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stories[activeIndex];

  const goTo = (index: number) => {
    if (index < 0) {
      setActiveIndex(stories.length - 1);
    } else if (index >= stories.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  return (
    <section
      aria-label="Politics spotlight slider"
      className="mt-8 grid gap-8 border-b border-zinc-200 pb-10 lg:grid-cols-12"
      onKeyDown={handleKeyDown}
    >
      <div className="lg:col-span-7">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-zinc-200">
          <Image
            src={active.imageUrl}
            alt={active.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-white">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-200/80">
                PrismaMedia Politics • {active.country}
              </p>
              <h2 className="mt-2 max-w-xl font-sans text-xl font-bold leading-tight sm:text-2xl">
                {active.title}
              </h2>
              <p className="mt-2 max-w-lg text-sm text-zinc-100/90">
                {active.dek}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between lg:col-span-5">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Politics • Europe
          </p>
          <h3 className="mt-3 font-sans text-lg font-bold leading-tight">
            Power, money and influence from Budapest to Tbilisi.
          </h3>
        </header>

        <div
          className="mt-4 flex items-center justify-between gap-4"
          aria-label="Slider controls"
        >
          <div className="flex gap-1" aria-hidden="true">
            {stories.map((story, index) => (
              <span
                key={story.id}
                className={`h-[3px] w-6 rounded-full transition-colors ${
                  index === activeIndex ? "bg-zinc-900" : "bg-zinc-300"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white text-xs font-semibold text-zinc-800 hover:bg-zinc-100"
              aria-label="Previous story"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white text-xs font-semibold text-zinc-800 hover:bg-zinc-100"
              aria-label="Next story"
            >
              →
            </button>
          </div>
        </div>

        <ul
          className="mt-4 space-y-2"
          aria-label="Select story by country"
          role="listbox"
        >
          {stories.map((story, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={story.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => goTo(index)}
                  className={`flex w-full items-start justify-between rounded-sm px-2 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-zinc-900 text-zinc-50"
                      : "text-zinc-800 hover:bg-zinc-100"
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      {story.country}
                    </span>
                    <p className="mt-1 font-sans font-bold line-clamp-2">
                      {story.title}
                    </p>
                  </div>
                  <span className="ml-3 shrink-0 text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                    {story.dateline}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-3 text-xs text-zinc-500">
          Photography via Unsplash. Headlines are illustrative only.
        </p>
      </div>
    </section>
  );
}

