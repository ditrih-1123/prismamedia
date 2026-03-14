import type { NewsItem } from "@/lib/news";
import { formatMainStoriesDate } from "@/lib/dateUtils";
import Image from "next/image";

type FeaturedCardProps = {
  article: NewsItem;
  href?: string;
};

export function FeaturedCard({ article, href = "#" }: FeaturedCardProps) {
  const formattedDate = formatMainStoriesDate(article.publishedAt);

  return (
    <a
      href={href}
      className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900"
      aria-label={`Read: ${article.title}`}
    >
      <article className="overflow-hidden rounded-lg">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 66vw, 100vw"
            priority
          />
        </div>
        <div className="p-4 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            {article.category && (
              <>
                <span className="text-zinc-400 dark:text-zinc-500">{article.category}</span>
                <span className="mx-1.5">·</span>
              </>
            )}
            {article.dateline} · {formattedDate}
          </p>
          <h2 className="mt-3 font-sans text-lg font-bold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200 sm:text-xl">
            {article.title}
          </h2>
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {article.body ? (
              article.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))
            ) : (
              <p>{article.dek}</p>
            )}
          </div>
        </div>
      </article>
    </a>
  );
}
