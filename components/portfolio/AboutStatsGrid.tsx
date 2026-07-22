'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Box, Code2, Globe2, Infinity, Layers } from 'lucide-react';
import { useEffect, useRef } from 'react';

const stats = [
  { value: 3, suffix: '', label: 'AI Products', detail: 'shipped end-to-end', Icon: Box },
  { value: 10, suffix: '+', label: 'Projects', detail: 'built and shipped', Icon: Layers },
  { value: 92, suffix: '', label: 'Google PageSpeed', detail: 'on a live site', Icon: Globe2 },
  { value: null, suffix: '', label: 'Always Learning', detail: 'exploring. building. shipping.', Icon: Code2 },
] as const;

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function AboutStatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ value, suffix, label, detail, Icon }, index) => (
        <motion.article
          key={label}
          className="group relative min-h-[210px] overflow-hidden rounded-lg bg-gradient-to-br from-gold-300/35 via-gold-300/10 to-transparent p-px"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-forest-950/70 p-7 backdrop-blur-xl transition-colors duration-500 group-hover:bg-forest-900/82">
            <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:repeating-radial-gradient(ellipse_at_100%_100%,transparent_0,transparent_12px,rgba(224,196,114,0.2)_13px,transparent_14px)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(224,196,114,0.16),transparent_34%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
            <motion.div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/18 bg-gold-300/10 text-gold-300 shadow-[0_0_32px_rgba(224,196,114,0.12)]" whileHover={{ y: -5, scale: 1.06 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
              {value === null ? <Infinity size={24} /> : <Icon size={21} />}
            </motion.div>
            <div className="relative">
              <div className="font-serif text-5xl leading-none text-gold-300 md:text-6xl">
                {value === null ? '∞' : <Counter value={value} suffix={suffix} />}
              </div>
              <p className="mt-5 font-sans text-[0.72rem] uppercase tracking-[0.24em] text-lotus-cream/85">{label}</p>
              <p className="mt-4 font-sans text-sm leading-6 text-lotus-cream/42">{detail}</p>
              <span className="mt-7 block h-px w-14 bg-gold-300/65" />
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}