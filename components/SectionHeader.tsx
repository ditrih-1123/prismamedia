type SectionHeaderProps = {
  title: string;
  id?: string;
  className?: string;
};

export function SectionHeader({ title, id, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-4 border-b border-zinc-200 pb-3 sm:mb-6 ${className}`}>
      <h2
        id={id}
        className="font-sans text-xl font-bold uppercase tracking-tight text-zinc-900"
      >
        {title}
      </h2>
    </div>
  );
}
