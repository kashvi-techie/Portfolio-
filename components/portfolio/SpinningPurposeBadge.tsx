'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function SpinningPurposeBadge() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });
  const tx = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const ty = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  return (
    <motion.div
      className="group relative flex h-32 w-32 items-center justify-center rounded-full border border-gold-300/35 bg-forest-950/55 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      style={{ x: tx, y: ty }}
      whileHover={{ scale: 1.08 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="absolute inset-0 rounded-full bg-gold-300/10 blur-xl opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-80" />
      <motion.svg className="absolute inset-2" viewBox="0 0 100 100" animate={{ rotate: 360 }} transition={{ duration: 18, ease: 'linear', repeat: Infinity }}>
        <defs>
          <path id="purpose-path" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-gold-300 font-sans text-[7px] uppercase tracking-[0.22em]">
          <textPath href="#purpose-path">Designing with purpose - AI native - </textPath>
        </text>
      </motion.svg>
      <svg viewBox="0 0 48 48" className="relative h-12 w-12 text-gold-300" fill="none">
        <path d="M24 6c0 0-10 8-10 18s10 15 10 15 10-6 10-15S24 6 24 6z" stroke="currentColor" strokeWidth="1.3" fill="rgba(224,196,114,0.08)" />
        <path d="M14 24c-7 0-10 6-10 6s7 5 13 2M34 24c7 0 10 6 10 6s-7 5-13 2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </motion.div>
  );
}