import type { NewsItem } from "@/lib/news";
import { formatMainStoriesDate } from "@/lib/dateUtils";

type StandardCardProps = {
  article: NewsItem;
  href?: string;
};

export function StandardCard({ article, href = "#" }: StandardCardProps) {
  const formattedDate = formatMainStoriesDate(article.publishedAt);

  return (
    <a
      href={href}
      className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900"
      aria-label={`Read: ${article.title}`}
    >
      <article className="flex flex-1 flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          {article.category && (
            <>
              <span className="text-zinc-400 dark:text-zinc-500">{article.category}</span>
              <span className="mx-1.5">·</span>
            </>
          )}
          {article.dateline} · {formattedDate}
        </p>
        <h3 className="mt-2 font-sans text-sm font-bold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {article.dek}
        </p>
      </article>
    </a>
  );
}
