import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import cityImg from "@/assets/city-grid.jpg";
import { SectionLabel } from "./SectionLabel";
import { DataPanel } from "./DataPanel";

export function CitySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.3, 0.8]);

  return (
    <section
      ref={ref}
      id="city"
      className="relative h-[180vh] w-full bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
          <img
            src={cityImg}
            alt="Futuristic city grid"
            className="h-full w-full object-cover"
            width={1920}
            height={1280}
            loading="lazy"
          />
        </motion.div>

        {/* Atmospheric fog */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/70"
          style={{ opacity: fogOpacity }}
        />
        <div className="grain absolute inset-0 vignette" />

        {/* Animated energy SVG flowing through verticals */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {[20, 38, 50, 62, 80].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="0"
              x2={x}
              y2="100"
              stroke="rgba(255,191,0,0.25)"
              strokeWidth="0.15"
              strokeDasharray="1 5"
              vectorEffect="non-scaling-stroke"
              className="animate-dash"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>

        {/* Header */}
        <div className="absolute left-6 top-24 max-w-lg sm:left-12 lg:left-20">
          <SectionLabel index="03" eyebrow="Urban Distribution" title="Energy Grid" />
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-5 text-balance text-[clamp(1.8rem,4.6vw,3.6rem)] font-semibold leading-[1.02] text-foreground"
          >
            Energy descends from grid to <span className="text-amber-glow">street.</span>
          </motion.h2>
          <p className="text-pretty mt-4 max-w-[46ch] font-mono text-xs leading-relaxed text-muted-foreground">
            Distribution substations balance load across districts in real time. Roads, towers and
            interchanges become illuminated conduits.
          </p>
        </div>

        {/* Bottom panels */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 sm:bottom-10 sm:left-12 sm:right-12 lg:bottom-16 lg:left-20 lg:right-20">
          <DataPanel
            label="District 07"
            rows={[
              { k: "Load", v: "847 MW" },
              { k: "Phase Balance", v: "0.998" },
              { k: "Demand Δ", v: "+2.4%" },
              { k: "Substations", v: "14 / 14" },
            ]}
          />
          <DataPanel
            label="Mobility Layer"
            status="STREAMING"
            rows={[
              { k: "AVs Routed", v: "182,470" },
              { k: "Mean Speed", v: "47 km/h" },
              { k: "Signal Sync", v: "0.42 ms" },
              { k: "Throughput", v: "94.1%" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
