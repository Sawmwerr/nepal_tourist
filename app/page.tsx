import Navbar from "@/components/Navbar";
import HeroAccordion from "@/components/HeroAccordion";
import MarqueeStrip from "@/components/MarqueeStrip";
import StatsSection from "@/components/StatsSection";
import DestinationsTeaser from "@/components/DestinationsTeaser";
import NepalMap from "@/components/NepalMap";
import VideoTeaser from "@/components/VideoTeaser";
import TestimonialsSection from "@/components/TestimonialsSection";
import CreatorProfile from "@/components/CreatorProfile";
import QuoteBlock from "@/components/QuoteBlock";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroAccordion />
        <MarqueeStrip />
        <StatsSection />
        <DestinationsTeaser />
        <NepalMap />
        <VideoTeaser />
        <TestimonialsSection />
        <CreatorProfile />
        <QuoteBlock />
      </main>
      <Footer />
    </>
  );
}
