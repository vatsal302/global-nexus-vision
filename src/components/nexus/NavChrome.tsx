import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "space", label: "Orbit" },
  { id: "network", label: "Mesh" },
  { id: "city", label: "City" },
  { id: "underground", label: "Core" },
  { id: "circuit", label: "Silicon" },
];

export function NavChrome() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState("space");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border/60 bg-background/40 px-6 py-3.5 backdrop-blur-md sm:px-12 lg:px-20">
        <a href="#space" data-cursor="hover" className="flex items-center gap-2.5">
          <span className="h-2 w-2 rotate-45 bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            Nexus<span className="text-muted-foreground">/Infra</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-cursor="hover"
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                active === s.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-foreground/50">0{i + 1}</span> · {s.label}
            </a>
          ))}
        </nav>
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
          Sys: <span className="text-accent">Online</span>
        </div>
      </header>

      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 top-[49px] z-50 h-px origin-left bg-accent"
        style={{ scaleX: progress, width: "100%" }}
      />

      {/* Bottom HUD */}
      <div className="pointer-events-none fixed bottom-4 left-6 z-40 hidden font-mono text-[10px] leading-tight tracking-[0.12em] text-muted-foreground sm:block">
        <div>60 FPS · 16ms FRAME · 1.2GB MEM</div>
        <div className="text-foreground/60">GPU · WEBGL2 · ACTIVE</div>
      </div>
      <div className="pointer-events-none fixed bottom-4 right-6 z-40 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
        Lat 40.7128° · Lon −74.0060°
      </div>
    </>
  );
}
