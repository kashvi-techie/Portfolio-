'use client';

import { motion } from 'framer-motion';

export default function JissiAudioWave({ active = false }: { active?: boolean }) {
  const duration = active ? 1.05 : 1.8;
  return (
    <div className="pointer-events-none absolute right-6 top-1/2 hidden h-36 w-36 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300/12 bg-gold-300/5 md:flex">
      <svg viewBox="0 0 160 160" className="h-full w-full overflow-visible">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.circle
            key={i}
            cx="80"
            cy="80"
            r={24 + i * 17}
            fill="none"
            stroke="#e0c472"
            strokeWidth="1"
            strokeOpacity={0.32 - i * 0.045}
            animate={{ scale: [1, active ? 1.14 : 1.08, 1], opacity: [0.35, active ? 0.9 : 0.62, 0.35] }}
            transition={{ duration, delay: i * 0.14, repeat: Infinity, ease: 'easeInOut', type: active ? 'spring' : 'tween', stiffness: 200 }}
            style={{ originX: '80px', originY: '80px' }}
          />
        ))}
        <motion.path
          d="M40 80 C 48 68, 56 94, 64 80 S 80 68, 88 80 S 104 96, 112 80 S 128 70, 136 80"
          fill="none"
          stroke="#f8e7b4"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ pathLength: [0.25, 1, 0.25], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: active ? 0.9 : 1.55, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}