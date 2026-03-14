import { topicSections } from "@/lib/news";
import { formatMainStoriesDate } from "@/lib/dateUtils";
import { SectionHeader } from "@/components/SectionHeader";
import { TrustInPrimeMinisters } from "@/components/TrustInPrimeMinisters";

type SidebarItem = {
  id: string;
  title: string;
  sectionLabel: string;
  dateline: string;
  publishedAt: string;
  isHighlight: boolean;
};

const rawItems = topicSections.flatMap((section) =>
  section.items.map((item) => ({
    id: item.id,
    title: item.title,
    sectionLabel: section.label,
    dateline: item.dateline,
    publishedAt: item.publishedAt,
  }))
);

/** Every 4th item (0, 4, 8, …) is "Important" so highlights are mixed in with the rest */
const sidebarItems: SidebarItem[] = rawItems.map((item, index) => ({
  ...item,
  isHighlight: index % 4 === 0,
}));

export function NewsSidebar() {
  return (
    <aside
      aria-label="Latest headlines"
      className="w-full shrink-0 border-t border-zinc-200 pt-6 lg:border-t-0 lg:pt-0 lg:sticky lg:top-24"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Latest" />
      </div>
      <ul className="space-y-4 px-4 py-3 sm:space-y-5 sm:px-6 lg:space-y-6 lg:px-8">
        {sidebarItems.slice(0, Math.ceil(sidebarItems.length / 2)).map((item) => (
          <li key={item.id}>
            <a
              href={`#article-${item.id}`}
              className="group block min-h-[2.75rem] rounded-lg py-2 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:min-h-0 sm:py-1.5 lg:py-1"
              aria-label={`Read: ${item.title}`}
            >
              <article>
                <p className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 sm:text-sm">
                  {item.isHighlight && (
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-700">
                      Important
                    </span>
                  )}
                  {formatMainStoriesDate(item.publishedAt)}
                </p>
                <h3
                  className={`mt-1.5 line-clamp-2 font-sans text-sm leading-snug text-zinc-900 group-hover:text-zinc-700 sm:mt-2 ${
                    item.isHighlight ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.title}
                </h3>
              </article>
            </a>
          </li>
        ))}
      </ul>
      <div className="px-4 py-2 sm:px-6 lg:px-8">
        <TrustInPrimeMinisters />
      </div>
      <ul className="space-y-4 px-4 py-3 sm:space-y-5 sm:px-6 lg:space-y-6 lg:px-8">
        {sidebarItems.slice(Math.ceil(sidebarItems.length / 2)).map((item) => (
          <li key={item.id}>
            <a
              href={`#article-${item.id}`}
              className="group block min-h-[2.75rem] rounded-lg py-2 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:min-h-0 sm:py-1.5 lg:py-1"
              aria-label={`Read: ${item.title}`}
            >
              <article>
                <p className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 sm:text-sm">
                  {item.isHighlight && (
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-700">
                      Important
                    </span>
                  )}
                  {formatMainStoriesDate(item.publishedAt)}
                </p>
                <h3
                  className={`mt-1.5 line-clamp-2 font-sans text-sm leading-snug text-zinc-900 group-hover:text-zinc-700 sm:mt-2 ${
                    item.isHighlight ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.title}
                </h3>
              </article>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
