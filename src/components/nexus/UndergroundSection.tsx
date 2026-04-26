import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import undergroundImg from "@/assets/underground-turbines.jpg";
import { SectionLabel } from "./SectionLabel";
import { DataPanel } from "./DataPanel";

export function UndergroundSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1.0]);
  const turbineSpeed = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const [activated, setActivated] = useState(false);

  return (
    <section
      ref={ref}
      id="underground"
      className="relative h-[200vh] w-full bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <img
            src={undergroundImg}
            alt="Underground turbine hall"
            className="h-full w-full object-cover"
            width={1920}
            height={1280}
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/85" />
        <div className="grain vignette absolute inset-0" />

        {/* Spinning gear overlays — purely SVG, drives the "scroll-activated" feel */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <motion.div style={{ rotate: turbineSpeed }} className="opacity-30">
            <Gear size={520} teeth={36} />
          </motion.div>
        </div>
        <div className="pointer-events-none absolute -right-24 top-20 opacity-40">
          <motion.div style={{ rotate: turbineSpeed }} className="">
            <Gear size={260} teeth={20} />
          </motion.div>
        </div>
        <div className="pointer-events-none absolute -left-16 bottom-10 opacity-30">
          <motion.div style={{ rotate: useTransform(turbineSpeed, (v) => -v) }}>
            <Gear size={200} teeth={16} />
          </motion.div>
        </div>

        {/* Header */}
        <div className="absolute left-6 top-24 max-w-xl sm:left-12 lg:left-20">
          <SectionLabel index="04" eyebrow="Generation Layer" title="Turbine Hall" />
          <h2 className="font-display mt-5 text-balance text-[clamp(1.8rem,4.6vw,3.6rem)] font-semibold leading-[1.02] text-foreground">
            Beneath the city, <span className="text-amber-glow">cores spin.</span>
          </h2>
          <p className="text-pretty mt-4 max-w-[46ch] font-mono text-xs leading-relaxed text-muted-foreground">
            Mechanical generators convert thermal differential into the amber pulse that climbs to
            the surface. Engage a core to read its telemetry.
          </p>

          <button
            data-cursor="hover"
            onClick={() => setActivated((v) => !v)}
            className="group mt-8 inline-flex items-center gap-3 border border-accent/60 bg-accent/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-all hover:bg-accent hover:text-background"
          >
            <span
              className={`h-2 w-2 rounded-full ${activated ? "bg-accent" : "bg-muted-foreground"} transition-colors group-hover:bg-background`}
            />
            {activated ? "Core Engaged" : "Engage Core"}
          </button>
        </div>

        {/* Floating telemetry */}
        <motion.div
          initial={false}
          animate={{ opacity: activated ? 1 : 0.4, y: activated ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          className="absolute right-6 bottom-10 sm:right-12 lg:right-20"
        >
          <DataPanel
            label="Turbine Core 03"
            status={activated ? "GENERATING" : "STANDBY"}
            rows={[
              { k: "RPM", v: activated ? "11,240" : "0" },
              { k: "Output", v: activated ? "1.42 GW" : "—" },
              { k: "Coolant Δ", v: "147 K" },
              { k: "Cycle Eff.", v: "63.8%" },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
}

function Gear({ size, teeth }: { size: number; teeth: number }) {
  const r = size / 2;
  const inner = r * 0.78;
  const toothH = r * 0.14;
  const toothW = (Math.PI * 2 * inner) / teeth / 2.4;
  const items = Array.from({ length: teeth });
  return (
    <svg width={size} height={size} viewBox={`-${r} -${r} ${size} ${size}`}>
      {items.map((_, i) => {
        const a = (i / teeth) * 360;
        return (
          <rect
            key={i}
            x={-toothW / 2}
            y={-r}
            width={toothW}
            height={toothH}
            fill="rgba(229,229,229,0.6)"
            transform={`rotate(${a})`}
          />
        );
      })}
      <circle r={inner} fill="none" stroke="rgba(229,229,229,0.6)" strokeWidth="2" />
      <circle r={inner * 0.55} fill="none" stroke="rgba(255,191,0,0.6)" strokeWidth="1.2" />
      <circle r={inner * 0.18} fill="rgba(255,191,0,0.85)" />
    </svg>
  );
}
