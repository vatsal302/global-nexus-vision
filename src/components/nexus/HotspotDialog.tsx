import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DataPanel } from "./DataPanel";

export interface HotspotData {
  id: string;
  title: string;
  status?: string;
  description: string;
  rows: { k: string; v: string }[];
}

interface Props {
  data: HotspotData | null;
  onClose: () => void;
}

/** Accessible modal-style detail panel for clickable hotspots. */
export function HotspotDialog({ data, onClose }: Props) {
  useEffect(() => {
    if (!data) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key={data.id}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`hs-${data.id}-title`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-background/70 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 30, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative m-4 w-full max-w-lg border border-border bg-panel/95 p-6 shadow-[0_20px_80px_-10px_rgba(255,191,0,0.25)] backdrop-blur-xl sm:p-8"
          >
            <div className="absolute -left-px top-0 h-12 w-px bg-accent" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {data.status ?? "DETAIL"}
                </div>
                <h3
                  id={`hs-${data.id}-title`}
                  className="font-display mt-2 text-2xl font-semibold text-foreground"
                >
                  {data.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                data-cursor="hover"
                aria-label="Close detail"
                className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Esc ✕
              </button>
            </div>
            <p className="text-pretty mt-4 max-w-[52ch] font-mono text-xs leading-relaxed text-muted-foreground">
              {data.description}
            </p>
            <div className="mt-6">
              <DataPanel label={data.title} status={data.status ?? "ONLINE"} rows={data.rows} className="!max-w-none" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
