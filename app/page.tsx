import Navbar from "@/components/Navbar";
import HeroAccordion from "@/components/HeroAccordion";
import MarqueeStrip from "@/components/MarqueeStrip";
import StatsSection from "@/components/StatsSection";
import DestinationsTeaser from "@/components/DestinationsTeaser";
import NepalMapClient from "@/components/NepalMapClient";
import MountainsTeaser from "@/components/MountainsTeaser";
import VideoTeaser from "@/components/VideoTeaser";
import TestimonialsSection from "@/components/TestimonialsSection";
import PlanTeaser from "@/components/PlanTeaser";
import CommunityTeaser from "@/components/CommunityTeaser";
import CreatorProfile from "@/components/CreatorProfile";
import QuoteBlock from "@/components/QuoteBlock";
import Footer from "@/components/Footer";
import { ScrollStoryProvider } from "@/components/ScrollStoryContext";
import SectionWatermark from "@/components/SectionWatermark";

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
      // @ts-ignore — fetchPriority is valid HTML5
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
