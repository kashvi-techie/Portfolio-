'use client';

import { motion } from 'framer-motion';

export default function SorteddMeshGrid() {
  return (
    <motion.svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-0"
      viewBox="0 0 520 320"
      preserveAspectRatio="none"
      whileInView={{ opacity: 0.42 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <defs>
        <linearGradient id="sortedd-grid" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e0c472" stopOpacity="0" />
          <stop offset="0.52" stopColor="#e0c472" stopOpacity="0.45" />
          <stop offset="1" stopColor="#e0c472" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={`curve-${i}`} d={`M${20 + i * 34} 300 C ${120 + i * 18} ${250 - i * 10}, ${250 + i * 8} ${230 - i * 18}, 500 ${64 + i * 22}`} fill="none" stroke="url(#sortedd-grid)" strokeWidth="0.8" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={`line-${i}`} d={`M${70 + i * 52} 40 L ${25 + i * 38} 315`} fill="none" stroke="#e0c472" strokeOpacity="0.1" strokeWidth="0.6" />
      ))}
    </motion.svg>
  );
}