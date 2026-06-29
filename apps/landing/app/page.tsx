import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturesA } from "@/components/FeaturesA";
import { FeaturesB } from "@/components/FeaturesB";
import { Steps } from "@/components/Steps";
import { GearStrip } from "@/components/GearStrip";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturesA />
        <FeaturesB />
        <Steps />
        <GearStrip />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
