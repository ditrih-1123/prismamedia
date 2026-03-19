import type { NewsItem } from "@/lib/news";

/**
 * Turns an article title into a stable URL slug.
 * Example: "Andrej Babis and the Czech Republic" → "andrej-babis-and-the-czech-republic"
 */
export function slugFromTitle(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function articleUrlFromSlug(slug: string) {
  return `/article/${slug}`;
}

export function articleUrlFromItem(item: Pick<NewsItem, "title">) {
  return articleUrlFromSlug(slugFromTitle(item.title));
}

