import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topicSections } from "@/lib/news";
import { slugFromTitle } from "@/lib/articleUrl";
import { NewsArticleTemplate } from "@/components/NewsArticleTemplate";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = topicSections
    .flatMap((section) => section.items)
    .find((i) => slugFromTitle(i.title) === slug);

  if (!item) {
    return {
      title: "Article not found",
      description: "The requested article slug does not exist.",
    };
  }

  return {
    title: item.title,
    description: item.dek,
  };
}

export default async function ArticleBySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = topicSections.find((section) =>
    section.items.some((i) => slugFromTitle(i.title) === slug),
  );

  const item = match?.items.find(
    (i) => slugFromTitle(i.title) === slug,
  );

  if (!match || !item) return notFound();

  return <NewsArticleTemplate item={item} section={match} />;
}

