import type { TopicSection } from "@/lib/news";
import Image from "next/image";
import { formatMainStoriesDate } from "@/lib/dateUtils";
import { NewsBlockCard } from "@/components/NewsBlockCard";
import { SectionHeader } from "@/components/SectionHeader";
import { articleUrlFromItem } from "@/lib/articleUrl";

const linkClass =
  "group flex rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900";
const imageClass = "object-cover transition duration-300 group-hover:scale-[1.02]";

type TopicNewsGridProps = { section: TopicSection };

function ArticleLink({
  href,
  ariaLabel,
  children,
  className = "",
}: {
  href: string;
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`${linkClass} ${className}`} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

// —— Czech Republic: list, first item featured (horizontal large), rest horizontal cards
function CzechRepublicLayout({ section }: TopicNewsGridProps) {
  return (
    <ul className="list-none space-y-4 p-0 m-0 sm:space-y-6">
      {section.items.map((item, i) => (
        <li key={item.id} className={i === 0 ? "border-b border-zinc-200 pb-4 dark:border-zinc-700 sm:pb-6" : undefined}>
          <NewsBlockCard
            article={item}
            href={articleUrlFromItem(item)}
            featured={i === 0}
          />
        </li>
      ))}
    </ul>
  );
}

// —— Slovakia: 2-column grid, vertical cards (image on top → date → title → dek)
function SlovakiaLayout({ section }: TopicNewsGridProps) {
  return (
    <ul className="grid list-none grid-cols-1 gap-4 p-0 m-0 sm:grid-cols-2 sm:gap-6">
      {section.items.map((item) => (
        <li key={item.id}>
          <ArticleLink href={articleUrlFromItem(item)} ariaLabel={`Read: ${item.title}`}>
            <article className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className={imageClass}
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{formatMainStoriesDate(item.publishedAt)}</p>
              <h3 className="mt-1 font-sans text-lg font-bold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.dek}</p>
            </article>
          </ArticleLink>
        </li>
      ))}
    </ul>
  );
}

// —— Hungary: single column, compact rows — small thumb left, date + title + short dek right
function HungaryLayout({ section }: TopicNewsGridProps) {
  return (
    <ul className="list-none space-y-4 p-0 m-0 sm:space-y-6">
      {section.items.map((item) => (
        <li key={item.id}>
          <ArticleLink href={articleUrlFromItem(item)} ariaLabel={`Read: ${item.title}`} className="flex gap-4">
            <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-800 sm:h-28 sm:w-36">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                className={imageClass}
                sizes="144px"
              />
            </div>
            <div className="min-w-0 flex-1 py-0.5">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">{formatMainStoriesDate(item.publishedAt)}</p>
              <h3 className="mt-1 font-sans text-base font-bold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200 sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{item.dek}</p>
            </div>
          </ArticleLink>
        </li>
      ))}
    </ul>
  );
}

// —— Moldova: 4-column tiles — date, image, title, dek per cell
function MoldovaLayout({ section }: TopicNewsGridProps) {
  return (
    <ul className="grid list-none grid-cols-1 gap-4 p-0 m-0 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
      {section.items.map((item) => (
        <li key={item.id}>
          <NewsBlockCard article={item} href={articleUrlFromItem(item)} imageBetween />
        </li>
      ))}
    </ul>
  );
}

// —— Georgia: bento — first item wide low photo; right column square thumbs; aligned spacing
function GeorgiaLayout({ section }: TopicNewsGridProps) {
  const [lead, ...rest] = section.items;
  if (!lead) return null;
  const spaceBlock = "mt-4";
  return (
    <div className="grid grid-cols-1 gap-4 p-0 m-0 sm:gap-6 lg:grid-cols-3 lg:items-stretch">
      <div className="lg:col-span-2">
        <ArticleLink href={articleUrlFromItem(lead)} ariaLabel={`Read: ${lead.title}`} className="h-full">
          <article className="flex h-full flex-col">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={lead.imageUrl}
                alt={lead.imageAlt}
                fill
                className={imageClass}
                sizes="(min-width: 1024px) 75vw, (min-width: 640px) 100vw, 100vw"
              />
            </div>
            <p className={`${spaceBlock} text-sm text-zinc-500 dark:text-zinc-400`}>{formatMainStoriesDate(lead.publishedAt)}</p>
            <h3 className={`${spaceBlock} font-sans text-xl font-bold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200 sm:text-2xl`}>
              {lead.title}
            </h3>
            <p className={`${spaceBlock} text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:line-clamp-3`}>{lead.dek}</p>
          </article>
        </ArticleLink>
      </div>
      <ul className="grid list-none grid-cols-1 grid-rows-3 gap-4 p-0 m-0 sm:grid-cols-3 sm:grid-rows-1 sm:gap-6 sm:items-stretch lg:h-full lg:grid-cols-1 lg:grid-rows-3">
        {rest.map((item) => (
          <li key={item.id} className="flex h-full min-h-0">
            <ArticleLink href={articleUrlFromItem(item)} ariaLabel={`Read: ${item.title}`} className="flex h-full min-h-0 w-full">
              <article className="flex h-full w-full flex-row items-start gap-4 text-left">
                <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-800 sm:h-24 sm:w-24">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    className={imageClass}
                    sizes="96px"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-start pt-0.5">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatMainStoriesDate(item.publishedAt)}</p>
                  <h3 className="mt-2 font-sans text-sm font-bold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200 sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{item.dek}</p>
                </div>
              </article>
            </ArticleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

// —— Armenia: same widget style as Moldova — 4-column tiles (date, image, title, dek per cell)
function ArmeniaLayout({ section }: TopicNewsGridProps) {
  return (
    <ul className="grid list-none grid-cols-1 gap-4 p-0 m-0 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
      {section.items.map((item) => (
        <li key={item.id}>
          <NewsBlockCard article={item} href={articleUrlFromItem(item)} imageBetween />
        </li>
      ))}
    </ul>
  );
}

const SECTION_LAYOUTS: Record<string, (props: TopicNewsGridProps) => React.ReactNode> = {
  "czech-republic": CzechRepublicLayout,
  slovakia: SlovakiaLayout,
  hungary: HungaryLayout,
  moldova: MoldovaLayout,
  georgia: GeorgiaLayout,
  armenia: ArmeniaLayout,
};

export function TopicNewsGrid({ section }: TopicNewsGridProps) {
  const Layout = SECTION_LAYOUTS[section.id] ?? CzechRepublicLayout;

  return (
    <section
      id={section.id}
      aria-labelledby={`topic-${section.id}`}
      className="py-4 scroll-mt-24 sm:py-6"
    >
      <SectionHeader title={section.label} />
      <Layout section={section} />
    </section>
  );
}
