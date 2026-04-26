import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import earthImg from "@/assets/space-earth.jpg";
import { ParticleField } from "./ParticleField";
import { DataPanel } from "./DataPanel";
import { SectionLabel } from "./SectionLabel";
import { HotspotDialog, type HotspotData } from "./HotspotDialog";

const SAT_HOTSPOTS: (HotspotData & { top: string; left: string; delay: number })[] = [
  {
    id: "orbit-11",
    title: "ORBIT-11 · LEO Relay",
    status: "DOWNLINK",
    description:
      "Low-earth orbit relay satellite handling the primary amber-channel downlink to North-American ground stations. Maintains line-of-sight handoff every 94 seconds.",
    rows: [
      { k: "Altitude", v: "548 km" },
      { k: "Inclination", v: "53.0°" },
      { k: "Bandwidth", v: "4.2 Tbps" },
      { k: "Handoff", v: "94 s" },
    ],
    top: "22%",
    left: "18%",
    delay: 0,
  },
  {
    id: "geo-04",
    title: "GEO-04 · Geosync Backbone",
    status: "STABLE",
    description:
      "Geostationary backbone node bridging the Pacific corridor. Acts as the upstream parent for 312 LEO peers during the eclipse window.",
    rows: [
      { k: "Altitude", v: "35,786 km" },
      { k: "Footprint", v: "Pacific" },
      { k: "Peers", v: "312" },
      { k: "Uptime", v: "99.997%" },
    ],
    top: "44%",
    left: "72%",
    delay: 1.2,
  },
  {
    id: "meo-22",
    title: "MEO-22 · Mid-Orbit Mesh",
    status: "BURST",
    description:
      "Medium-orbit mesh node currently routing burst traffic from the South-Atlantic anomaly. Cross-links three constellation planes simultaneously.",
    rows: [
      { k: "Altitude", v: "8,062 km" },
      { k: "Cross-links", v: "3 planes" },
      { k: "Burst", v: "1.8 Tbps" },
      { k: "Latency", v: "41 ms" },
    ],
    top: "68%",
    left: "32%",
    delay: 2.1,
  },
];

export function SpaceSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const earthScale = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
  const earthY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const earthRot = useTransform(scrollYProgress, [0, 1], [0, 18]);
  // True 3D depth — rotateX gives the parallax stage actual perspective tilt
  const stageRotX = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const stageZ = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 0.85]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [active, setActive] = useState<HotspotData | null>(null);

  return (
    <section
      ref={ref}
      id="space"
      aria-label="Orbit — satellites and space layer"
      className="snap-section relative h-[200vh] w-full bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden perspective-stage">
        {/* 3D depth stage */}
        <motion.div
          className="absolute inset-0 preserve-3d"
          style={{ rotateX: stageRotX, z: stageZ }}
        >
          {/* Back layer — starfield */}
          <div className="absolute inset-0 depth-back">
            <ParticleField className="absolute inset-0 h-full w-full" density={180} speed={0.02} />
          </div>

          {/* Mid layer — Earth */}
          <motion.div
            className="absolute inset-0 depth-mid"
            style={{ scale: earthScale, y: earthY, rotate: earthRot }}
          >
            <img
              src={earthImg}
              alt="Earth from low orbit, terminator visible"
              className="h-full w-full object-cover"
              width={1920}
              height={1280}
            />
          </motion.div>

          {/* Foreground — satellites */}
          <div className="absolute inset-0 depth-fore">
            <SatellitesOverlay onSelect={setActive} />
          </div>
        </motion.div>

        {/* Vignette + grain (flat, on top) */}
        <div className="grain absolute inset-0 vignette pointer-events-none" />

        {/* Darken on exit */}
        <motion.div
          className="absolute inset-0 bg-background pointer-events-none"
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
            <a
              href="#network"
              data-cursor="hover"
              className="mt-10 inline-flex items-center gap-3 border border-border bg-panel/40 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
            >
              Scroll to descend
              <span className="inline-block h-3 w-px bg-current" />
              <ChevronDown />
            </a>
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

      <HotspotDialog data={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="animate-pulse-soft" aria-hidden="true">
      <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function SatellitesOverlay({ onSelect }: { onSelect: (h: HotspotData) => void }) {
  return (
    <div className="absolute inset-0">
      {SAT_HOTSPOTS.map((s) => (
        <button
          key={s.id}
          type="button"
          data-cursor="hover"
          onClick={() => onSelect(s)}
          aria-label={`Inspect satellite ${s.title}`}
          className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ top: s.top, left: s.left }}
        >
          <span className="relative block">
            {/* Beam */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-2 h-40 w-px origin-top -translate-x-1/2 animate-beam bg-gradient-to-b from-accent to-transparent"
              style={{ animationDelay: `${s.delay}s` }}
            />
            {/* Sat body */}
            <span className="relative grid place-items-center">
              <span className="block h-2 w-2 rotate-45 bg-foreground transition-transform group-hover:scale-150" />
              <span aria-hidden="true" className="absolute h-px w-6 bg-foreground/70" />
              <span aria-hidden="true" className="absolute -inset-3 rounded-full border border-accent/30 animate-pulse-soft" />
              <span aria-hidden="true" className="absolute -inset-5 scale-0 rounded-full border border-accent/60 transition-transform duration-300 group-hover:scale-100" />
            </span>
            {/* Label */}
            <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/70 opacity-0 transition-opacity group-hover:opacity-100">
              {s.id} ↗
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
