'use client';

import dynamic from 'next/dynamic';
import SectionSkeleton from '@/components/portfolio/SectionSkeleton';

const About = dynamic(() => import('@/components/portfolio/About'), {
  ssr: false,
  loading: () => <SectionSkeleton label="About" minHeight="920px" />,
});

const Work = dynamic(() => import('@/components/portfolio/Work'), {
  ssr: false,
  loading: () => <SectionSkeleton label="Selected work" minHeight="1100px" />,
});

const Process = dynamic(() => import('@/components/portfolio/Process'), {
  ssr: false,
  loading: () => <SectionSkeleton label="Process" minHeight="900px" />,
});

const Skills = dynamic(() => import('@/components/portfolio/Skills'), {
  ssr: false,
  loading: () => <SectionSkeleton label="Capabilities" minHeight="100svh" />,
});

const Experience = dynamic(() => import('@/components/portfolio/Experience'), {
  ssr: false,
  loading: () => <SectionSkeleton label="Experience" minHeight="900px" />,
});

const Contact = dynamic(() => import('@/components/portfolio/Contact'), {
  ssr: false,
  loading: () => <SectionSkeleton label="Contact" minHeight="900px" />,
});

export default function LazyPortfolioSections() {
  return (
    <>
      <About />
      <Work />
      <Process />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
