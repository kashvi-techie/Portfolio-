"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { TOOLS } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Tools() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="eyebrow">Tools & ecosystem</p>
          <h2 className="font-editorial mt-4 text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-[#f5f0e6]">
            The tools I craft with.
          </h2>
        </ScrollReveal>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          variants={staggerContainer(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {TOOLS.map((tool) => (
            <motion.div
              key={tool.label}
              variants={staggerItem(reduceMotion)}
              className="glass-card glow-border group flex flex-col items-center justify-center gap-3 rounded-2xl px-4 py-8 transition-all duration-300 hover:border-[#c9a227]/35 hover:shadow-[0_0_32px_-8px_rgba(201,162,39,0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c9a227]/15 bg-black/40">
                <img
                  src={tool.logo}
                  alt={tool.label}
                  width={24}
                  height={24}
                  className="opacity-80 transition-opacity group-hover:opacity-100"
                  onError={(e) => {
                    // hide broken images gracefully
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.opacity = "0.15";
                  }}
                />
              </div>
              <span className="text-center text-xs font-semibold text-[#e8d48b]/90">
                {tool.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
