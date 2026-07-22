'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const AboutLotusCard3D = dynamic(() => import('@/components/portfolio/AboutLotusCard3D'), {
  ssr: false,
  loading: () => <div className="min-h-[320px] rounded-lg border border-gold-300/20 bg-forest-950/45 backdrop-blur-xl" />,
});
const AboutStatsGrid = dynamic(() => import('@/components/portfolio/AboutStatsGrid'), { ssr: false });

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-forest-800 px-6 py-24 md:px-10 lg:px-14">
      <div className="pointer-events-none absolute -right-24 -top-32 h-[32rem] w-[32rem] rounded-full bg-peacock-700/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-[26rem] w-[26rem] rounded-full bg-gold-300/8 blur-3xl" />

      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-center gap-5">
          <div className="flex flex-col items-center gap-5 text-gold-300/70">
            <span className="h-14 w-px bg-gold-300/50" />
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M12 3c0 0-5 4-5 9s5 8 5 8 5-3 5-8S12 3 12 3zM7 11c-3 0-5 3-5 3s3 3 6 2M17 11c3 0 5 3 5 3s-3 3-6 2" stroke="currentColor" strokeWidth="1" /></svg>
            <span className="[writing-mode:vertical-rl] rotate-180 font-sans text-[0.65rem] uppercase tracking-[0.3em]">About Me</span>
          </div>
          <div className="h-px w-14 bg-gold-300/55" />
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.28em] text-gold-300">About Me</p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.9fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.8rem)] font-normal leading-[1.14] text-lotus-cream">
              I blend design thinking with engineering excellence to build products that create <span className="italic text-gold-300">real impact.</span>
            </h2>
          </motion.div>

          <motion.div className="border-l border-gold-300/18 pl-8" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}>
            <p className="font-sans text-base leading-8 text-lotus-cream/58">
              I am a Computer Science student and UI Engineer who loves turning ideas into meaningful, high-performance products.
            </p>
            <p className="mt-7 font-sans text-base leading-8 text-lotus-cream/58">
              My passion lives at the intersection of design, frontend engineering, and AI-native product thinking.
            </p>
            <a href="#experience" onClick={(event) => { event.preventDefault(); document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-8 inline-flex items-center gap-5 border-b border-gold-300/50 pb-3 font-sans text-sm text-gold-300 transition-colors hover:text-gold-300/80">
              Know more about me <span aria-hidden="true">-&gt;</span>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.8, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}>
            <AboutLotusCard3D />
          </motion.div>
        </div>

        <div className="mt-16">
          <AboutStatsGrid />
        </div>
      </div>
    </section>
  );
}