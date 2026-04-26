import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import circuitImg from "@/assets/circuit-level.jpg";
import { SectionLabel } from "./SectionLabel";
import { DataPanel } from "./DataPanel";

export function CircuitSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.4]);
  const blur = useTransform(scrollYProgress, [0, 0.4, 1], [6, 0, 0]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section
      ref={ref}
      id="circuit"
      className="relative h-[200vh] w-full bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: bgScale, filter: blurFilter }}>
          <img
            src={circuitImg}
            alt="Macro circuit board"
            className="h-full w-full object-cover"
            width={1920}
            height={1280}
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-transparent to-background/40" />
        <div className="grain vignette absolute inset-0" />

        {/* Animated pulses traveling along synthetic traces */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {[15, 35, 55, 75].map((y, i) => (
            <g key={i}>
              <line
                x1="0" y1={y} x2="100" y2={y}
                stroke="rgba(255,191,0,0.18)"
                strokeWidth="0.15"
                vectorEffect="non-scaling-stroke"
              />
              <circle r="0.6" fill="#ffbf00">
                <animateMotion
                  dur={`${3 + i}s`}
                  repeatCount="indefinite"
                  path={`M 0 ${y} L 100 ${y}`}
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* Header */}
        <div className="absolute left-6 top-24 max-w-xl sm:left-12 lg:left-20">
          <SectionLabel index="05" eyebrow="Silicon Layer" title="Pulse" />
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-5 text-balance text-[clamp(1.8rem,4.6vw,3.6rem)] font-semibold leading-[1.02] text-foreground"
          >
            One particle. <span className="text-amber-glow">Every scale.</span>
          </motion.h2>
          <p className="text-pretty mt-4 max-w-[46ch] font-mono text-xs leading-relaxed text-muted-foreground">
            The same amber pulse that began as a downlink in low-earth orbit now races between
            transistors. The system is one continuous circuit.
          </p>
        </div>

        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block lg:right-20">
          <DataPanel
            label="Logic Gate · A4"
            status="PROCESSING"
            rows={[
              { k: "Clock", v: "5.8 GHz" },
              { k: "TDP", v: "127 W" },
              { k: "Cache Hit", v: "99.4%" },
              { k: "Pulse Origin", v: "ORBIT-11" },
            ]}
          />
        </div>

        {/* Closing footer */}
        <div className="absolute bottom-8 left-6 right-6 flex flex-wrap items-end justify-between gap-4 border-t border-border/60 pt-5 sm:left-12 sm:right-12 lg:left-20 lg:right-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Global Tech Infrastructure Nexus · v1.0
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            End of transmission ▮
          </div>
        </div>
      </div>
    </section>
  );
}
