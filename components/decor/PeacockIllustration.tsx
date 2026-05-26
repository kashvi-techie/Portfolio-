"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function PeacockIllustration() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 80]);

  const body = (
    <svg
      viewBox="0 0 400 520"
      className="h-auto w-full max-w-[min(52vw,480px)] opacity-[0.72]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="peacockGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8d48b" />
          <stop offset="50%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#6b4f1a" />
        </linearGradient>
        <linearGradient id="featherViolet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1a0a2e" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Tail feathers */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <ellipse
          key={i}
          cx={280 - i * 8}
          cy={120 + i * 55}
          rx={28 + i * 4}
          ry={90 - i * 6}
          fill="url(#featherViolet)"
          stroke="url(#peacockGold)"
          strokeWidth="0.6"
          opacity={0.85 - i * 0.08}
          transform={`rotate(${-15 + i * 8} ${280 - i * 8} ${120 + i * 55})`}
        />
      ))}
      {/* Eye spots on feathers */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={`eye-${i}`}
          cx={250 - i * 12}
          cy={180 + i * 48}
          r={8 + (i % 2) * 2}
          fill="#0a0612"
          stroke="url(#peacockGold)"
          strokeWidth="1.2"
          filter="url(#glow)"
        />
      ))}
      {/* Body */}
      <path
        d="M180 380 C160 320 170 260 200 220 C210 200 240 190 260 210 C280 230 290 280 280 340 C275 380 240 420 200 430 C185 432 175 410 180 380 Z"
        fill="url(#featherViolet)"
        stroke="url(#peacockGold)"
        strokeWidth="1"
      />
      {/* Neck & head */}
      <ellipse cx="230" cy="200" rx="32" ry="38" fill="#1a0a2e" stroke="url(#peacockGold)" strokeWidth="0.8" />
      <circle cx="245" cy="188" r="5" fill="#c9a227" />
      <path d="M255 175 L275 165 L260 195 Z" fill="url(#peacockGold)" opacity="0.9" />
      {/* Crest */}
      <path
        d="M220 165 Q215 140 230 130 Q245 125 250 150"
        stroke="url(#peacockGold)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );

  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[min(55%,520px)] lg:block">
        {body}
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute right-[-4%] top-[8%] hidden h-[85vh] w-[min(55%,520px)] items-start justify-end lg:flex"
      style={{ y }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {body}
      </motion.div>
    </motion.div>
  );
}
