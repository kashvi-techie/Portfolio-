'use client';

import dynamic from 'next/dynamic';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AICommandPalette = dynamic(() => import('@/components/portfolio/AICommandPalette'), {
  ssr: false,
  loading: () => <div className="mt-7 h-[192px] w-full max-w-[470px] rounded-lg border border-gold-300/15 bg-forest-950/35 backdrop-blur-xl" />,
});
const SpinningPurposeBadge = dynamic(() => import('@/components/portfolio/SpinningPurposeBadge'), { ssr: false });

function LotusLayer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 140" className={className} fill="none" aria-hidden="true">
      <path d="M89 22c0 0-28 23-28 52s28 44 28 44 28-16 28-44-28-52-28-52z" fill="#efd4d4" stroke="#e0c472" strokeWidth="1" opacity="0.85" />
      <path d="M63 73c-35-6-54 22-54 22s34 19 61 5M116 73c35-6 54 22 54 22s-34 19-61 5" fill="#e8c0c0" stroke="#e0c472" strokeWidth="1" opacity="0.75" />
      <path d="M90 54c-15 9-23 22-22 42M90 54c15 9 23 22 22 42" stroke="#f8e7b4" strokeOpacity="0.5" />
    </svg>
  );
}

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.4 });
  const archX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const archY = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const imageX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const imageY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const lotusX = useTransform(sx, [-0.5, 0.5], [32, -32]);
  const lotusY = useTransform(sy, [-0.5, 0.5], [18, -18]);
  const badgeX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const badgeY = useTransform(sy, [-0.5, 0.5], [-16, 16]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(145deg,#0b1612_0%,#102019_48%,#13241c_100%)] px-6 pt-24 md:px-10 lg:px-14"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_38%,rgba(31,122,132,0.22),transparent_40%),radial-gradient(circle_at_18%_88%,rgba(224,196,114,0.09),transparent_36%)]" />
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="relative z-10 max-w-[610px]">
          <p className="font-sans text-[0.68rem] uppercase tracking-[0.3em] text-gold-300">Hi, I am</p>
          <h2 className="mt-4 font-serif text-xl font-semibold uppercase tracking-[0.22em] text-gold-300">Kashvi Pundir</h2>
          <h1 className="mt-7 font-serif text-[clamp(3rem,6.4vw,6.25rem)] font-normal leading-[0.98] text-lotus-cream">
            I design digital <span className="italic text-gold-300">experiences</span> that are thoughtful, intelligent and timeless.
          </h1>
          <p className="mt-7 max-w-[430px] font-sans text-sm leading-7 text-lotus-cream/60">
            UI Engineer and Product Designer building AI-native products with clean code, meaningful design, and a focus on real impact.
          </p>
          <AICommandPalette />
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href="#work" onClick={(event) => { event.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 rounded-sm border border-gold-300/65 bg-gold-300 px-6 py-3 font-sans text-[0.72rem] uppercase tracking-[0.12em] text-forest-950 transition-transform hover:-translate-y-0.5">
              Explore My Work <ArrowUpRight size={15} />
            </a>
            <a href="https://docs.google.com/document/d/1xA5oilQ8cKMq1D1ZkWESv2Hbu63ROQZF/edit?usp=sharing&ouid=115142903580697304861&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm border border-lotus-cream/18 bg-forest-950/20 px-6 py-3 font-sans text-[0.72rem] uppercase tracking-[0.12em] text-lotus-cream/70 backdrop-blur-md transition-colors hover:border-gold-300/55 hover:text-gold-300">
              View Resume <ArrowDown size={15} />
            </a>
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto h-[min(70svh,720px)] min-h-[520px] w-full max-w-[680px]">
          <motion.div style={{ x: archX, y: archY }} className="absolute left-[12%] top-[4%] h-[84%] w-[72%] rounded-t-full border border-gold-300/35" />
          <motion.div style={{ x: imageX, y: imageY }} className="absolute left-[18%] top-[9%] h-[78%] w-[62%] overflow-hidden rounded-t-full border border-gold-300/45 bg-forest-950 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <img src="/images/hero-photo.png" alt="Kashvi Pundir" width={899} height={1599} className="h-full w-full object-cover object-center brightness-105 contrast-105 saturate-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-transparent" />
          </motion.div>
          <motion.div style={{ x: lotusX, y: lotusY }} className="absolute bottom-[7%] right-[3%] w-[42%] drop-shadow-[0_18px_32px_rgba(232,192,192,0.18)]">
            <LotusLayer className="h-auto w-full" />
          </motion.div>
          <motion.div style={{ x: badgeX, y: badgeY }} className="absolute left-[5%] top-[36%] hidden md:block">
            <SpinningPurposeBadge />
          </motion.div>
          <motion.div animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.18, 1] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[14%] top-[22%] h-2 w-2 rounded-full bg-gold-300 shadow-[0_0_26px_rgba(224,196,114,0.9)]" />
          <motion.div animate={{ opacity: [0.25, 0.85, 0.25], scale: [1, 1.24, 1] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="absolute left-[17%] top-[43%] h-1.5 w-1.5 rounded-full bg-gold-300 shadow-[0_0_22px_rgba(224,196,114,0.85)]" />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-forest-950 to-transparent" />
    </section>
  );
}