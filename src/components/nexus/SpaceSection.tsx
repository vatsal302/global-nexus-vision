import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import earthImg from "@/assets/space-earth.jpg";
import { ParticleField } from "./ParticleField";
import { DataPanel } from "./DataPanel";
import { SectionLabel } from "./SectionLabel";

export function SpaceSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const earthScale = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
  const earthY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const earthRot = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 0.85]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="space"
      className="relative h-[200vh] w-full bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Starfield */}
        <ParticleField className="absolute inset-0 h-full w-full" density={180} speed={0.02} />

        {/* Earth */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: earthScale, y: earthY, rotate: earthRot }}
        >
          <img
            src={earthImg}
            alt="Earth from orbit"
            className="h-full w-full object-cover"
            width={1920}
            height={1280}
          />
        </motion.div>

        {/* Vignette + grain */}
        <div className="grain absolute inset-0 vignette" />

        {/* Satellites + signal beams */}
        <SatellitesOverlay />

        {/* Darken on exit */}
        <motion.div
          className="absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity }}
        />

        {/* Hero copy */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="absolute inset-0 flex items-end px-6 pb-24 sm:items-center sm:px-12 lg:px-20"
        >
          <div className="max-w-3xl">
            <SectionLabel index="01" eyebrow="Systems Overview" title="Orbit" />
            <h1 className="font-display mt-6 text-balance text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-[0.95] tracking-tight text-foreground">
              See the full stack of global infrastructure,{" "}
              <span className="text-amber-glow italic">from satellite to silicon.</span>
            </h1>
            <p className="text-pretty mt-6 max-w-[42ch] font-mono text-sm leading-relaxed text-muted-foreground">
              Go beyond static layers. A continuous, interdependent view of the systems that move
              data, energy, and intent across the planet.
            </p>
            <div
              data-cursor="hover"
              className="mt-10 inline-flex items-center gap-3 border border-border bg-panel/40 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              Scroll to descend
              <span className="inline-block h-3 w-px bg-current" />
              <ChevronDown />
            </div>
          </div>
        </motion.div>

        {/* Floating telemetry */}
        <div className="pointer-events-none absolute right-6 top-24 hidden lg:block">
          <DataPanel
            label="ISS-Tier Constellation"
            status="LIVE"
            rows={[
              { k: "Active Sats", v: "11,842" },
              { k: "Avg. Altitude", v: "548 km" },
              { k: "Downlink", v: "12.4 Tbps" },
              { k: "Coverage", v: "98.2%" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="animate-pulse-soft">
      <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function SatellitesOverlay() {
  // Three orbiting satellites with downlink beams
  const sats = [
    { top: "22%", left: "18%", delay: 0 },
    { top: "44%", left: "72%", delay: 1.2 },
    { top: "68%", left: "32%", delay: 2.1 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {sats.map((s, i) => (
        <div key={i} className="absolute" style={{ top: s.top, left: s.left }}>
          <div className="relative">
            {/* Beam */}
            <div
              className="absolute left-1/2 top-2 h-40 w-px origin-top -translate-x-1/2 animate-beam bg-gradient-to-b from-accent to-transparent"
              style={{ animationDelay: `${s.delay}s` }}
            />
            {/* Sat body */}
            <div className="relative grid place-items-center">
              <div className="h-2 w-2 rotate-45 bg-foreground" />
              <div className="absolute h-px w-6 bg-foreground/70" />
              <div className="absolute -inset-3 rounded-full border border-accent/30 animate-pulse-soft" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
