import Image from "next/image";

const HUNGARY_IMAGE = "/images/Hungary.png";

export function HungaryElectionsPromo() {
  return (
    <section
      aria-label="Hungary elections special project"
      className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200/80 lg:flex-row lg:items-stretch"
    >
      <div className="flex flex-1 flex-col justify-center px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5">
        <h2 className="font-sans text-base font-bold leading-tight tracking-tight text-zinc-900 sm:text-lg">
          Who will win the elections in Hungary?
        </h2>
        <p className="mt-1.5 text-sm leading-snug text-zinc-600">
          Follow our special project for analysis, polls and live coverage.
        </p>
        <a
          href="#hungary"
          className="mt-4 inline-flex w-fit rounded-full border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          Go to special project
        </a>
      </div>
      <div className="relative flex shrink-0 items-end lg:w-[22rem]">
        <div className="relative h-44 w-full min-h-[11rem] sm:h-52 lg:h-60 lg:min-h-[15rem] lg:w-[20rem] lg:min-w-[20rem]">
          <Image
            src={HUNGARY_IMAGE}
            alt="Hungary elections"
            fill
            className="object-contain object-bottom"
            sizes="(min-width: 1024px) 320px, 100vw"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
