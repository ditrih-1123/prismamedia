import { topicSections } from "@/lib/news";
import type { NewsItem } from "@/lib/news";
import { FeaturedCard } from "@/components/FeaturedCard";
import { StandardCard } from "@/components/StandardCard";
import { SectionHeader } from "@/components/SectionHeader";

const mainStories: NewsItem[] = topicSections
  .flatMap((section) => section.items)
  .slice(0, 5);

export function MainNewsBlock() {
  if (mainStories.length === 0) return null;

  const [featured, ...rest] = mainStories;

  return (
    <section
      id="main-stories"
      aria-labelledby="main-stories-heading"
      className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
    >
      <SectionHeader id="main-stories-heading" title="Main Stories" />
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:items-start">
        <FeaturedCard
          article={featured}
          href={`#article-${featured.id}`}
        />
        {rest.length > 0 && (
          <ul className="list-none space-y-4 p-0 m-0 sm:space-y-6">
            {rest.map((article) => (
              <li key={article.id}>
                <StandardCard
                  article={article}
                  href={`#article-${article.id}`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
