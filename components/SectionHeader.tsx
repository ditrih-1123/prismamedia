type SectionHeaderProps = {
  title: string;
  id?: string;
  className?: string;
};

export function SectionHeader({ title, id, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-4 border-b border-zinc-200 pb-3 dark:border-zinc-700 sm:mb-6 ${className}`}>
      <h2
        id={id}
        className="flex items-center gap-3 font-sans text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100"
      >
        <span
          className="h-2 w-2 shrink-0 rounded-sm bg-amber-500 dark:bg-amber-400"
          aria-hidden
        />
        {title}
      </h2>
    </div>
  );
}
