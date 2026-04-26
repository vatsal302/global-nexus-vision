import { useEffect, useRef } from "react";

interface Props {
  density?: number;
  className?: string;
  speed?: number;
  color?: string;
}

/** Lightweight starfield / particle drift canvas (browser-only). */
export function ParticleField({
  density = 120,
  className = "",
  speed = 0.04,
  color = "rgba(255,255,255,0.7)",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; z: number; r: number };
    let pts: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 1 + 0.3,
        r: Math.random() * 1.4 + 0.2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.y += speed * p.z * 8;
        p.x += speed * p.z * 1.2;
        if (p.y > h) p.y = 0;
        if (p.x > w) p.x = 0;
        ctx.beginPath();
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${0.2 + p.z * 0.6})`);
        ctx.arc(p.x, p.y, p.r * p.z, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, speed, color]);

  return <canvas ref={ref} className={`pointer-events-none ${className}`} />;
}
