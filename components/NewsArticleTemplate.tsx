import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { NewsItem, TopicSection } from "@/lib/news";

function splitBody(body: string) {
  return body
    .split("\n\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildObjectiveParagraphs(item: NewsItem): string[] {
  if (item.body) return splitBody(item.body);

  const category = item.category ? ` ${item.category}` : "";

  // We avoid specific claims we don't have in `lib/news.ts` and instead
  // describe the political mechanics implied by the dek/category.
  return [
    `“${item.title}”${category} frames a political contest where policy choices and public trust move together. The debate focuses on what reforms or positions the government is able (and willing) to deliver, and how quickly supporters expect results.`,
    `In practice, these fights are rarely only about technical design. They also shape coalition stability, how opposition campaigns are received, and whether institutions are perceived as credible arbiters rather than instruments for power.`,
    `For readers, the key question is not only “what is proposed,” but “what capacity exists to implement it”—and whether the public believes the process is transparent and fair.`,
    `Over the coming weeks, attention should track coalition negotiations, parliamentary or administrative follow-through, and whether public concerns harden into long-term scepticism or fade once outcomes become concrete.`,
  ];
}

export function NewsArticleTemplate({
  item,
  section,
}: {
  item: NewsItem;
  section: TopicSection;
}) {
  const paragraphs = buildObjectiveParagraphs(item);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <article>
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
              {section.label} • News & analysis
            </p>
            <h1 className="mt-3 font-sans text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {item.title}
            </h1>
            <p className="mt-4 pb-4 text-lg font-normal leading-relaxed text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
              {item.dek}
            </p>
          </header>

          <figure className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 768px, 100vw"
                priority
              />
            </div>
            <figcaption className="px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {item.dek}
            </figcaption>
          </figure>

          <div className="mt-10 space-y-6 text-base leading-relaxed">
            <section aria-label="Main article text">
              {paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? "" : "mt-4"}>
                  {p}
                </p>
              ))}
            </section>

            <section aria-label="Key points">
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">
                Key points
              </h2>
              <div className="space-y-3 rounded-xl bg-zinc-50/60 p-5 dark:bg-zinc-800/50">
                <p className="text-zinc-700 dark:text-zinc-200">
                  The political stakes are set by coalition capacity and the
                  credibility of institutions.
                </p>
                <p className="text-zinc-700 dark:text-zinc-200">
                  Public responses can amplify implementation risks, especially
                  when outcomes take longer than campaign timelines.
                </p>
                <p className="text-zinc-700 dark:text-zinc-200">
                  Watch for how follow-through affects trust: voters respond to
                  process, not only proposals.
                </p>
              </div>
            </section>

            <section aria-label="What to watch next">
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">
                What to watch next
              </h2>
              <p className="mt-4 text-zinc-700 dark:text-zinc-200">
                Look at parliamentary dynamics and implementation signals: proposals
                become politically meaningful only when they survive negotiation
                and translate into measurable steps.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

