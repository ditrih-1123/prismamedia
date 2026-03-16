'use client';

import { Fragment } from "react";
import { Header } from "@/components/Header";
import { NewsTicker } from "@/components/NewsTicker";
import { TopicNewsGrid } from "@/components/TopicNewsGrid";
import { NewsSidebar } from "@/components/NewsSidebar";
import { topicSections } from "@/lib/news";
import { MainNewsBlock } from "@/components/MainNewsBlock";
import { Footer } from "@/components/Footer";
import { HungaryPollsChart } from "@/components/HungaryPollsChart";
import { HungaryElectionsPromo } from "@/components/HungaryElectionsPromo";
import { ArmeniaPromo } from "@/components/ArmeniaPromo";
import { BlogsSection } from "@/components/BlogsSection";
import {
  Balloon,
  GlobeHemisphereEast,
  ShieldCheck,
  ChartLine,
  Users,
} from "@phosphor-icons/react";

const contentPadding = "px-4 sm:px-6 lg:px-8";
const blockGap = "gap-4 sm:gap-6";
const blockSpaceY = "space-y-4 sm:space-y-6";
const sectionPadding = "py-4 sm:py-6";

const sidebarSections = topicSections.slice(0, 3);
const fullWidthSections = topicSections.slice(3);

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <Header />

      <NewsTicker />
      <section
        aria-label="Editorial categories"
        className="bg-white dark:bg-zinc-900"
      >
        <div className={`mx-auto flex max-w-6xl gap-3 overflow-x-auto ${sectionPadding} sm:gap-4 ${contentPadding}`}>
          {[
            { label: "Elections", Icon: Balloon },
            { label: "Europe & EU", Icon: GlobeHemisphereEast },
            { label: "Russia & Security", Icon: ShieldCheck },
            { label: "Economy", Icon: ChartLine },
            { label: "Society", Icon: Users },
          ].map((category) => (
            <button
              key={category.label}
              type="button"
              className="group flex min-w-[8.5rem] items-center justify-between rounded-2xl border border-zinc-200 px-3.5 py-2.5 text-sm font-medium text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 sm:min-w-[9rem] sm:px-4"
            >
              <span className="text-[13px] tracking-tight">
                {category.label}
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-base text-zinc-700 transition group-hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-700">
                <category.Icon size={18} weight="bold" />
              </span>
            </button>
          ))}
        </div>
      </section>
      <HungaryPollsChart />
      <MainNewsBlock />

      <main className={`mx-auto flex flex-1 max-w-6xl flex-col ${blockGap} ${sectionPadding} lg:flex-row lg:items-start ${contentPadding}`}>
        <div className={`flex-1 ${blockSpaceY}`}>
          {sidebarSections.map((section, index) => (
            <Fragment key={section.id}>
              <TopicNewsGrid section={section} />
              {index === 1 && <HungaryElectionsPromo />}
            </Fragment>
          ))}
        </div>
        <div className="lg:w-80 lg:shrink-0">
          <NewsSidebar />
        </div>
      </main>

      <div className={`mx-auto w-full max-w-6xl py-4 sm:py-6 ${contentPadding}`}>
        <div className={blockSpaceY}>
          {fullWidthSections.map((section, index) => (
            <Fragment key={section.id}>
              <TopicNewsGrid section={section} />
              {index === 0 && <BlogsSection />}
              {index === 1 && <ArmeniaPromo />}
            </Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
