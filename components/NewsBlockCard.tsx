import type { NewsItem } from "@/lib/news";
import { formatMainStoriesDate } from "@/lib/dateUtils";
import Image from "next/image";

type NewsBlockCardProps = {
  article: NewsItem;
  href?: string;
  /** When true, layout is: image → date → title → dek (for 4-column sections e.g. Moldova) */
  imageBetween?: boolean;
  /** When true, card is larger (e.g. first item in Czech Republic) */
  featured?: boolean;
};

export function NewsBlockCard({ article, href = "#", imageBetween = false, featured = false }: NewsBlockCardProps) {
  const formattedDate = formatMainStoriesDate(article.publishedAt);

  if (imageBetween) {
    return (
      <a
        href={href}
        className="group flex flex-col rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900"
        aria-label={`Read: ${article.title}`}
      >
        <article className="flex min-w-0 flex-1 flex-col">
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={article.imageUrl}
              alt={article.imageAlt}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {formattedDate}
          </p>
          <h3 className="mt-2 font-sans text-lg font-bold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200 sm:text-xl">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {article.dek}
          </p>
        </article>
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`group flex gap-6 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900 ${featured ? "sm:gap-8" : ""}`}
      aria-label={`Read: ${article.title}`}
    >
      <article className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-stretch">
        <div
          className={`relative w-full shrink-0 overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-800 ${
            featured ? "h-52 sm:h-52 sm:w-72 sm:min-w-[288px]" : "h-40 sm:h-36 sm:w-44 sm:min-w-[176px]"
          }`}
        >
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes={featured ? "(min-width: 640px) 288px, 100vw" : "(min-width: 640px) 176px, 100vw"}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {formattedDate}
          </p>
          <h3
            className={`mt-2 font-sans font-bold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200 ${
              featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
            }`}
          >
            {article.title}
          </h3>
          <p className={`mt-2 line-clamp-3 leading-relaxed text-zinc-600 dark:text-zinc-400 ${featured ? "text-base sm:line-clamp-4" : "text-sm"}`}>
            {article.dek}
          </p>
        </div>
      </article>
    </a>
  );
}
