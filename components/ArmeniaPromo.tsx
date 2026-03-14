import Image from "next/image";

const ARMENIA_IMAGE = "/images/Armenia.png";

export function ArmeniaPromo() {
  return (
    <section
      aria-label="Armenia special project"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-lg"
    >
      <div className="relative flex flex-col px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="relative z-10 flex flex-1 flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400/90">
            Special project
          </span>
          <h2 className="mt-2 font-sans text-xl font-bold leading-tight tracking-tight sm:text-2xl">
            What's next for Armenia?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
            Analysis, security and regional coverage — follow our in-depth reporting.
          </p>
          <a
            href="#armenia"
            className="mt-5 inline-flex w-fit items-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          >
            Read the coverage
          </a>
        </div>
        <div className="relative z-10 mt-6 flex shrink-0 justify-center lg:mt-0 lg:w-72">
          <div className="relative h-40 w-56 sm:h-48 sm:w-64 lg:h-52 lg:w-72">
            <Image
              src={ARMENIA_IMAGE}
              alt="Armenia special project"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"
              priority={false}
            />
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)`,
        }}
      />
    </section>
  );
}
