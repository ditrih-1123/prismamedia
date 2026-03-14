import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const BLOGS = [
  {
    id: "blog-1",
    authorName: "Sarah Mitchell",
    authorRole: "Senior correspondent, EU affairs",
    imageUrl: "/images/Author-1.png",
    imageAlt: "Sarah Mitchell",
    date: "Mar 12, 2025",
    dateTime: "2025-03-12",
    title: "Why Eastern Europe’s Democracies Need Stronger Institutions",
    description: "How courts, media and civil society can help the region resist backsliding.",
  },
  {
    id: "blog-2",
    authorName: "James Kovac",
    authorRole: "Editor, Central Europe desk",
    imageUrl: "/images/Author-2.png",
    imageAlt: "James Kovac",
    date: "Mar 11, 2025",
    dateTime: "2025-03-11",
    title: "The EU Enlargement Puzzle: Risks and Opportunities",
    description: "A look at what’s at stake for the Union and the candidate countries.",
  },
  {
    id: "blog-3",
    authorName: "Thomas Weber",
    authorRole: "Foreign policy analyst",
    imageUrl: "/images/Author-3.png",
    imageAlt: "Thomas Weber",
    date: "Mar 10, 2025",
    dateTime: "2025-03-10",
    title: "Security in the Black Sea Region After the Conflict",
    description: "Military balance, NATO and the new reality for coastal states.",
  },
] as const;

export function BlogsSection() {
  return (
    <section
      id="blogs"
      aria-labelledby="topic-blogs"
      className="py-4 scroll-mt-24 sm:py-6"
    >
      <SectionHeader id="topic-blogs" title="Blogs" />
      <ul className="grid list-none grid-cols-1 gap-4 p-0 m-0 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {BLOGS.map((blog) => (
          <li key={blog.id}>
            <article
              className="flex h-full flex-col items-center rounded-xl bg-zinc-100 p-5 text-center transition hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 sm:p-6"
              aria-labelledby={`blog-title-${blog.id}`}
            >
              <div className="mb-4 sm:mb-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-zinc-200 ring-2 ring-zinc-300 dark:bg-zinc-600 dark:ring-zinc-500 sm:h-24 sm:w-24">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.imageAlt}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>
              <p className="mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {blog.authorName}
              </p>
              <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                {blog.authorRole}
              </p>
              <time
                dateTime={blog.dateTime}
                className="mb-1.5 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
              >
                {blog.date}
              </time>
              <h3
                id={`blog-title-${blog.id}`}
                className="font-sans text-base font-bold leading-snug text-zinc-900 dark:text-zinc-100 sm:text-lg"
              >
                {blog.title}
              </h3>
              <p className="mt-2 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
                {blog.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
