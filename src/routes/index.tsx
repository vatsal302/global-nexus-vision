import { createFileRoute } from "@tanstack/react-router";
import { NavChrome } from "@/components/nexus/NavChrome";
import { CustomCursor } from "@/components/nexus/CustomCursor";
import { SpaceSection } from "@/components/nexus/SpaceSection";
import { NetworkSection } from "@/components/nexus/NetworkSection";
import { CitySection } from "@/components/nexus/CitySection";
import { UndergroundSection } from "@/components/nexus/UndergroundSection";
import { CircuitSection } from "@/components/nexus/CircuitSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Global Tech Infrastructure Nexus — Satellite to Silicon" },
      {
        name: "description",
        content:
          "A cinematic, scroll-driven view of global infrastructure — from orbiting satellites and sub-sea cables to underground turbines and silicon pulses.",
      },
      { property: "og:title", content: "Global Tech Infrastructure Nexus" },
      {
        property: "og:description",
        content:
          "Cinematic scroll-driven journey from orbit to circuit — visualize the live, interdependent global infrastructure system.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main
      id="main"
      className="snap-page relative bg-background text-foreground"
    >
      <a href="#space" className="skip-link">Skip to content</a>
      <CustomCursor />
      <NavChrome />
      <SpaceSection />
      <NetworkSection />
      <CitySection />
      <UndergroundSection />
      <CircuitSection />
    </main>
  );
}
