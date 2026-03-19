import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LatestDigest } from "@/components/LatestDigest";

export function ArticleBabishTemplate() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <article>
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
              Czech Republic • Opinion & analysis
            </p>
            <h1 className="mt-3 font-sans text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Andrej Babis and the Czech Republic
            </h1>
            <p className="mt-4 pb-4 text-lg font-normal leading-relaxed text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
              Why one political personality can keep pulling the country back to the
              same arguments: trust, institutions, and the question of who
              “deserves” power.
            </p>

            <div className="mt-4 flex items-center gap-4 rounded-xl bg-white px-4 py-3 dark:bg-white/95">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <Image
                  src="/images/Author-3.png"
                  alt="Thomas Weber"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-sans text-sm font-semibold text-zinc-900">
                  Thomas Weber
                </p>
                <p className="mt-0.5 text-sm text-zinc-600">
                  Foreign policy analyst
                </p>
              </div>
            </div>
          </header>

          <figure className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/Babish.png"
                alt="Andrej Babis in a Czech political context"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 768px, 100vw"
              />
            </div>
          </figure>

          <div className="mt-10 space-y-6 text-base leading-relaxed">
            <p>
              Czech politics has never been short on strong personalities, but
              Andrej Babis remains a special case: a figure who turned business
              logic into political messaging and then kept winning attention by
              staying at the center of every institutional storm.
            </p>

            <p>
              The debate around him is rarely just about policy. It is about
              character, systems, and the public’s tolerance for complexity.
              When support rises, it’s often because people feel the state is
              distant, slow, and captured by insiders. When opposition grows, it’s
              usually because people feel the same institutions are being bent by
              shortcuts.
            </p>

            <figure className="mt-8 overflow-hidden rounded-lg">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/2.jpg"
                  alt="Czech government and reforms"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 768px, 100vw"
                />
              </div>
              <figcaption className="px-2 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Coalition partners clash as public support slips and opposition
                gains ground.
              </figcaption>
            </figure>

            <h2 className="mt-10 text-2xl font-bold tracking-tight sm:text-3xl">
              Support for Europe’s direction
            </h2>

            <p className="text-zinc-600 dark:text-zinc-300">
              A quick snapshot of how voters across the site’s countries view the
              EU direction: approve vs. disapprove.
            </p>

            <LatestDigest />

            <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
              A politics of performance
            </h2>

            <p>
              Babis’s style—plain talk, quick decisions, and a promise to “get
              results”—is tailor-made for a public that’s tired of hearings and
              committees. In that sense, his appeal is not only ideological. It’s
              emotional: a desire to see someone act instead of explain.
            </p>

            <p>
              The problem is that performance can disguise trade-offs. Every
              shortcut demands a future repair, and every repaired system asks
              the same question: who pays, and who controls the bill?
            </p>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-700 dark:bg-zinc-800/50">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-200">
                Opinion
              </p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-200">
                Czech voters often treat politics like a customer service desk:
                “Fix it, and don’t waste my time.” But governments are not call
                centers. Institutions are slow by design—because they are built to
                withstand pressure, not to satisfy impatience.
              </p>
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
              The Czech trap: trust before governance
            </h2>

            <p>
              In the Czech Republic, trust is not a background condition. It is the
              main headline. Alliances form around shared distrust, and campaigns
              revolve around who is believed to be “clean” or “captured.” That
              makes every election a referendum on legitimacy, not just competence.
            </p>

            <p>
              And that’s why Babis keeps surfacing: he offers a story that people
              can quickly repeat—whether they’re defending him or rejecting him.
              When politics becomes a competition of narratives, the person with the
              sharpest narrative keeps winning the spotlight.
            </p>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-700 dark:bg-zinc-800/50">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-200">
                Opinion
              </p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-200">
                It’s tempting to frame the struggle as “progressives vs.
                traditionalists,” but the deeper conflict is about institutional
                faith. The country isn’t only deciding policies—it’s deciding
                whether rules are worth following even when outcomes disappoint.
              </p>
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
              What comes next
            </h2>

            <p>
              The most honest way to read Czech politics right now is to see how
              quickly emotional clarity replaces administrative detail. If the
              electorate rewards clarity, the pressure on leaders grows to offer
              simple answers to complicated questions.
            </p>

            <p>
              Still, the country’s institutions are not powerless. The longer the
              debate lasts, the more it forces public learning: what can be
              negotiated, what cannot, and where compromise ends. Over time, that
              could shift the conversation from personalities to performance
              measured in real outcomes.
            </p>

            {/* Author info about Andrej Babiš (moved to the end of the article). */}
            <div className="mt-8 flex items-center gap-4 border-t border-zinc-200 px-0 py-3 pt-6 dark:border-zinc-700">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <Image
                  src="/images/Babish.png"
                  alt="Andrej Babis"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-sans text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Andrej Babis
                </p>
                <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-300">
                  Prime Minister of the Czech Republic; ANO leader. Won the
                  elections in October 2024.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

