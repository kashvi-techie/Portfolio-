import { CursorGlow } from "@/components/effects/CursorGlow";
import { Particles } from "@/components/effects/Particles";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Systems } from "@/components/sections/Systems";
import { Tools } from "@/components/sections/Tools";

export default function Home() {
  return (
    <>
      <Particles />
      <CursorGlow />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Stats />
        <Projects />
        <Systems />
        <Experience />
        <CtaBanner />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
