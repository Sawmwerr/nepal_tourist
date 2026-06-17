import Navbar from "@/components/layout/Navbar";
import HeroAccordion from "@/features/home/components/HeroAccordion";
import MarqueeStrip from "@/features/home/components/MarqueeStrip";
import StatsSection from "@/features/home/components/StatsSection";
import DestinationsTeaser from "@/features/home/components/DestinationsTeaser";
import NepalMapClient from "@/features/destinations/components/NepalMapClient";
import MountainsTeaser from "@/features/home/components/MountainsTeaser";
import VideoTeaser from "@/features/home/components/VideoTeaser";
import TestimonialsSection from "@/features/home/components/TestimonialsSection";
import PlanTeaser from "@/features/home/components/PlanTeaser";
import CommunityTeaser from "@/features/home/components/CommunityTeaser";
import CreatorProfile from "@/features/home/components/CreatorProfile";
import QuoteBlock from "@/components/ui/QuoteBlock";
import Footer from "@/components/layout/Footer";
import { ScrollStoryProvider } from "@/components/providers/ScrollStoryContext";
import SectionWatermark from "@/components/ui/SectionWatermark";

const SECTION_STYLE: React.CSSProperties = {
  scrollMarginTop: "80px",
  position: "relative",
  zIndex: 1,
};

export default function Home() {
  return (
    <>
    {/*
      Standard href preload for the hero LCP image.
      Lighthouse's Lantern model recognises this (unlike Next.js's imageSrcSet
      format) so it correctly places the image on the critical path and
      reduces lcpLoadDelay from ~700 ms to near-zero.
    */}
    <link
      rel="preload"
      as="image"
      href="/_next/image?url=%2Fposters%2Fhimilaya.jpg&w=750&q=75"
      fetchPriority="high"
    />
    <ScrollStoryProvider>
      <Navbar />
      <main>
        <HeroAccordion />
        <MarqueeStrip />

        {/* ── Beat 1: Destinations ── */}
        <section id="destinations" style={SECTION_STYLE}>
          <DestinationsTeaser />
          <NepalMapClient />
        </section>

        {/* ── Beat 2: Mountains & Treks ── */}
        <section id="mountains" style={SECTION_STYLE}>
          <StatsSection />
          <MountainsTeaser />
        </section>

        {/* ── Beat 3: Experiences ── */}
        <section id="experiences" style={SECTION_STYLE}>
          <VideoTeaser />
          <TestimonialsSection />
        </section>

        {/* ── Beat 4: Plan a Trip ── */}
        <section id="plan" style={SECTION_STYLE}>
          <PlanTeaser />
        </section>

        {/* ── Beat 5: Community ── */}
        <section id="community" style={SECTION_STYLE}>
          <CommunityTeaser />
        </section>

        <CreatorProfile />
        <QuoteBlock />
      </main>
      <Footer />
      <SectionWatermark />
    </ScrollStoryProvider>
    </>
  );
}
