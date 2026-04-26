interface Props {
  index: string;
  eyebrow: string;
  title: string;
  className?: string;
}

export function SectionLabel({ index, eyebrow, title, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground ${className}`}>
      <span className="text-accent">{index}</span>
      <span className="h-px w-10 bg-border" />
      <span>{eyebrow}</span>
      <span className="hidden text-foreground/60 sm:inline">— {title}</span>
    </div>
  );
}
