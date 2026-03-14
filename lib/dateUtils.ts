/**
 * Formats a display date string to PrismaMedia Main Stories style:
 * "MAR 13, 2025 • 16:29" (uppercase month, bullet separator).
 * Input is expected as "Mar 13, 2025 · 16:29".
 */
export function formatMainStoriesDate(publishedAt: string): string {
  return publishedAt
    .replace(/\s·\s/, " • ")
    .replace(/^([A-Za-z]+)/, (_, month) => month.toUpperCase());
}
