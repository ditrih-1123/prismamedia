"use client";

import { topicSections } from "@/lib/news";

const headlines = topicSections.flatMap((s) =>
  s.items.map((item) => ({
    title: item.title,
    category: s.label,
    dateline: item.dateline,
    publishedAt: item.publishedAt,
  }))
);

function TickerContent() {
  const duplicated = [...headlines, ...headlines];
  return (
    <div className="flex shrink-0 animate-ticker gap-10" aria-hidden="true">
      {duplicated.map((h, i) => (
        <span key={`${h.title}-${i}`} className="flex shrink-0 items-center gap-3 whitespace-nowrap">
          <span className="rounded bg-white/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/80">
            {h.category}
          </span>
          <span className="text-sm font-medium text-white">{h.title}</span>
          <span className="text-[10px] uppercase tracking-wider text-white/50">{h.dateline}</span>
          <span className="text-[10px] text-white/40">{h.publishedAt}</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export function NewsTicker() {
  return (
    <section
      className="relative overflow-hidden border-y border-zinc-200/80 bg-zinc-900 py-2.5 dark:border-zinc-700"
      aria-label="Breaking news ticker"
    >
      <div className="absolute left-0 top-0 z-10 h-full w-16 shrink-0 bg-gradient-to-r from-zinc-900 to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-16 shrink-0 bg-gradient-to-l from-zinc-900 to-transparent" />
      <div className="flex w-full overflow-hidden">
        <div className="flex shrink-0 items-center gap-2 border-r border-white/10 pr-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            Live
          </span>
        </div>
        <div className="min-w-0 flex-1 py-0.5">
          <TickerContent />
        </div>
      </div>
    </section>
  );
}
