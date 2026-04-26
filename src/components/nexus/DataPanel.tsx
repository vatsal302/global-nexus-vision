import { motion } from "framer-motion";

interface Props {
  label: string;
  status?: string;
  rows: { k: string; v: string }[];
  className?: string;
}

export function DataPanel({ label, status = "ONLINE", rows, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full max-w-[320px] border border-border/80 bg-panel/70 p-5 backdrop-blur-md ${className}`}
    >
      <div className="absolute -left-px top-0 h-8 w-px bg-accent" />
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>{label}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
          {status}
        </span>
      </div>
      <div className="space-y-1.5 font-mono text-[11px] tabular-nums">
        {rows.map((r) => (
          <div
            key={r.k}
            className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5 last:border-0"
          >
            <span className="text-muted-foreground">{r.k}</span>
            <span className="text-foreground">{r.v}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
