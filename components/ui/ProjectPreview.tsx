"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ProjectPreviewProps {
  title: string;
  accent: string;
  variant?: "dashboard" | "card";
}

export function ProjectPreview({
  title,
  accent,
  variant = "card",
}: ProjectPreviewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gold/15 bg-[#0a0612] ${accent}`}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/80 via-[#0a0612] to-black/90" />
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `radial-gradient(circle at 30% 20%, rgba(201,162,39,0.2), transparent 50%)`,
      }} />
      {variant === "dashboard" ? (
        <div className="relative flex h-full flex-col p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-gold/80" />
            <div className="h-2 w-2 rounded-full bg-violet-500/60" />
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-gold/70">
              Live preview
            </span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-3">
            <div className="col-span-2 rounded-lg border border-white/5 bg-white/[0.03] p-3">
              <div className="h-2 w-16 rounded bg-gold/30" />
              <div className="mt-3 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 rounded bg-violet-900/30" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-full min-h-[60px] rounded-lg border border-gold/10 bg-gold/5" />
              <div className="h-16 rounded-lg border border-white/5 bg-white/[0.02]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full flex-col justify-end p-5">
          <p className="font-editorial text-xl font-semibold text-cream/90 sm:text-2xl">
            {title}
          </p>
          <div className="mt-3 flex gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-gold/25" />
            <div className="h-1.5 w-12 rounded-full bg-violet-600/40" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
