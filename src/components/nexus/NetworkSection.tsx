import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import networkImg from "@/assets/global-network.jpg";
import { SectionLabel } from "./SectionLabel";
import { DataPanel } from "./DataPanel";

interface Node {
  id: string;
  city: string;
  cx: number; // %
  cy: number; // %
  rows: { k: string; v: string }[];
}

const NODES: Node[] = [
  { id: "nyc", city: "New York", cx: 26, cy: 42, rows: [
    { k: "Cable", v: "MAREA" },
    { k: "Latency", v: "59.8 ms" },
    { k: "Capacity", v: "98.2%" },
    { k: "Last Check", v: "0.2s" },
  ]},
  { id: "lon", city: "London", cx: 49, cy: 35, rows: [
    { k: "Cable", v: "GRACE-HOPPER" },
    { k: "Latency", v: "12.1 ms" },
    { k: "Capacity", v: "94.7%" },
    { k: "Last Check", v: "0.1s" },
  ]},
  { id: "tyo", city: "Tokyo", cx: 84, cy: 44, rows: [
    { k: "Cable", v: "JUPITER" },
    { k: "Latency", v: "104.6 ms" },
    { k: "Capacity", v: "91.3%" },
    { k: "Last Check", v: "0.3s" },
  ]},
  { id: "sao", city: "São Paulo", cx: 36, cy: 72, rows: [
    { k: "Cable", v: "EllaLink" },
    { k: "Latency", v: "147.2 ms" },
    { k: "Capacity", v: "88.9%" },
    { k: "Last Check", v: "0.4s" },
  ]},
  { id: "syd", city: "Sydney", cx: 88, cy: 78, rows: [
    { k: "Cable", v: "INDIGO-WEST" },
    { k: "Latency", v: "162.4 ms" },
    { k: "Capacity", v: "86.0%" },
    { k: "Last Check", v: "0.5s" },
  ]},
];

export function NetworkSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const labelY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const [active, setActive] = useState<Node | null>(null);

  return (
    <section
      ref={ref}
      id="network"
      className="relative h-[180vh] w-full bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
          <img
            src={networkImg}
            alt="Global fiber-optic network"
            className="h-full w-full object-cover opacity-90"
            width={1920}
            height={1280}
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/20 to-background" />
        <div className="grain absolute inset-0" />

        {/* SVG node overlay */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {NODES.map((a) =>
            NODES.filter((b) => b.id !== a.id).slice(0, 2).map((b) => (
              <path
                key={`${a.id}-${b.id}`}
                d={`M ${a.cx} ${a.cy} Q ${(a.cx + b.cx) / 2} ${Math.min(a.cy, b.cy) - 12} ${b.cx} ${b.cy}`}
                stroke="rgba(255,191,0,0.35)"
                strokeWidth="0.12"
                fill="none"
                strokeDasharray="0.6 1.2"
                vectorEffect="non-scaling-stroke"
                className="animate-dash"
              />
            ))
          )}
          {NODES.map((n) => (
            <g key={n.id} style={{ cursor: "pointer" }}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r="2.4"
                fill="none"
                stroke="rgba(255,191,0,0.5)"
                strokeWidth="0.15"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r="0.6"
                fill="#ffbf00"
              />
            </g>
          ))}
        </svg>

        {/* Clickable nodes (HTML overlay so cursor + buttons work cleanly) */}
        {NODES.map((n) => (
          <button
            key={n.id}
            data-cursor="hover"
            onClick={() => setActive(n)}
            aria-label={n.city}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${n.cx}%`, top: `${n.cy}%` }}
          >
            <span className="block h-6 w-6 rounded-full transition-all group-hover:scale-150 group-hover:bg-accent/10" />
            <span className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80 opacity-60 transition-opacity group-hover:opacity-100">
              {n.city}
            </span>
          </button>
        ))}

        {/* Header copy */}
        <motion.div style={{ y: labelY }} className="absolute left-6 top-24 max-w-md sm:left-12 lg:left-20">
          <SectionLabel index="02" eyebrow="Global Mesh" title="Sub-sea Cables" />
          <h2 className="font-display mt-5 text-balance text-[clamp(1.8rem,4.4vw,3.5rem)] font-semibold leading-[1.02] text-foreground">
            Each sub-sea cable acts as a <span className="text-amber-glow">primary artery.</span>
          </h2>
          <p className="text-pretty mt-4 max-w-[44ch] font-mono text-xs leading-relaxed text-muted-foreground">
            Click a peering point to inspect live capacity, latency, and ingress telemetry.
          </p>
        </motion.div>

        {/* Floating panel for selected node */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-6 top-1/2 -translate-y-1/2 sm:right-12 lg:right-20"
            >
              <DataPanel
                label={`${active.city} Hub`}
                status="ONLINE"
                rows={active.rows}
              />
              <button
                data-cursor="hover"
                onClick={() => setActive(null)}
                className="mt-3 w-full max-w-[320px] border border-border bg-panel/70 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent"
              >
                Close ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
