'use client';

import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import TechBanner from '@/components/portfolio/TechBanner';
import About from '@/components/portfolio/About';
import Work from '@/components/portfolio/Work';
import Process from '@/components/portfolio/Process';
import Skills from '@/components/portfolio/Skills';
import Experience from '@/components/portfolio/Experience';
import Contact from '@/components/portfolio/Contact';

export default function Home() {
  return (
    <main style={{ position: 'relative', backgroundColor: '#0B1612' }}>
      <Navigation />
      <Hero />
      <TechBanner />
      <About />
      <Work />
      <Process />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
