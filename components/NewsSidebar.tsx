import { topicSections } from "@/lib/news";
import { formatMainStoriesDate } from "@/lib/dateUtils";
import { SectionHeader } from "@/components/SectionHeader";
import { LatestDigest } from "@/components/LatestDigest";
import { TrustInPrimeMinisters } from "@/components/TrustInPrimeMinisters";
import { articleUrlFromItem } from "@/lib/articleUrl";

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

/** Limit so Latest block height aligns with the Hungary news block in the main column */
const SIDEBAR_ITEMS_LIMIT = 14;
const limitedItems = sidebarItems.slice(0, SIDEBAR_ITEMS_LIMIT);
const firstHalfCount = Math.ceil(limitedItems.length / 2);

export function NewsSidebar() {
  return (
    <aside
      aria-label="Latest headlines"
      className="w-full shrink-0 border-t border-zinc-200 pt-6 dark:border-zinc-700 lg:border-t-0 lg:pt-0 lg:sticky lg:top-24"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Latest" />
      </div>
      <ul className="space-y-4 px-4 py-3 sm:space-y-5 sm:px-6 lg:space-y-6 lg:px-8">
        {limitedItems.slice(0, firstHalfCount).map((item) => (
          <li key={item.id}>
            <a
              href={articleUrlFromItem(item)}
              className="group block min-h-[2.75rem] rounded-lg py-2 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900 sm:min-h-0 sm:py-1.5 lg:py-1"
              aria-label={`Read: ${item.title}`}
            >
              <article>
                <p className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                  {item.isHighlight && (
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-700 dark:bg-zinc-600 dark:text-zinc-200">
                      Important
                    </span>
                  )}
                  {formatMainStoriesDate(item.publishedAt)}
                </p>
                <h3
                  className={`mt-1.5 line-clamp-2 font-sans text-sm leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200 sm:mt-2 ${
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
        {limitedItems.slice(firstHalfCount).map((item) => (
          <li key={item.id}>
            <a
              href={articleUrlFromItem(item)}
              className="group block min-h-[2.75rem] rounded-lg py-2 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900 sm:min-h-0 sm:py-1.5 lg:py-1"
              aria-label={`Read: ${item.title}`}
            >
              <article>
                <p className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                  {item.isHighlight && (
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-700 dark:bg-zinc-600 dark:text-zinc-200">
                      Important
                    </span>
                  )}
                  {formatMainStoriesDate(item.publishedAt)}
                </p>
                <h3
                  className={`mt-1.5 line-clamp-2 font-sans text-sm leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200 sm:mt-2 ${
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
      <div className="px-4 pt-2 pb-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
        >
          View all news
        </a>
      </div>
      <div className="px-4 pt-2 pb-4 sm:px-6 lg:px-8">
        <LatestDigest />
      </div>
    </aside>
  );
}
