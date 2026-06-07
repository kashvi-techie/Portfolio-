"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Stats() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-pad border-y border-gold/10 bg-black/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="eyebrow text-center">Impact at a glance</p>
        </ScrollReveal>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
          variants={staggerContainer(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem(reduceMotion)}
              className="glass-card glow-border rounded-2xl px-5 py-8 text-center sm:px-6"
            >
              <p className="font-editorial text-4xl font-semibold text-gold-gradient sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
