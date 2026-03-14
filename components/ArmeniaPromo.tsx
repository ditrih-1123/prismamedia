import Image from "next/image";

const ARMENIA_IMAGE = "/images/Armenia.png";

export function ArmeniaPromo() {
  return (
    <section
      aria-label="Armenia special project"
      className="relative flex flex-col overflow-hidden rounded-2xl bg-zinc-200/80 text-zinc-900 shadow-lg lg:flex-row lg:items-stretch"
    >
      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 py-6 sm:px-8 sm:py-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
          Special project
        </span>
        <h2 className="mt-2 font-sans text-xl font-bold leading-tight tracking-tight sm:text-2xl">
          What's next for Armenia?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">
          Analysis, security and regional coverage — follow our in-depth reporting.
        </p>
        <a
          href="#armenia"
          className="mt-5 inline-flex w-fit items-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-200"
        >
          Read the coverage
        </a>
      </div>
      <div className="relative z-10 flex shrink-0 items-end lg:w-72">
        <div className="relative h-40 w-full min-h-[10rem] sm:h-48 lg:h-52 lg:min-h-[13rem]">
          <Image
            src={ARMENIA_IMAGE}
            alt="Armenia special project"
            fill
            className="object-contain object-bottom drop-shadow-xl"
            sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
