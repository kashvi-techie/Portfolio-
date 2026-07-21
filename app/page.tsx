import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import TechBanner from '@/components/portfolio/TechBanner';
import LazyPortfolioSections from '@/components/portfolio/LazyPortfolioSections';

export default function Home() {
  return (
    <main style={{ position: 'relative', backgroundColor: '#0E1B15' }}>
      <Navigation />
      <Hero />
      <TechBanner />
      <LazyPortfolioSections />
    </main>
  );
}
