"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ABOUT_CARDS } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { Gauge, Rocket, Sparkles } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const ICONS = { rocket: Rocket, gauge: Gauge, sparkles: Sparkles };

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="section-pad scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="eyebrow">About</p>
          <h2 className="font-editorial mt-4 max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight text-cream">
            I design, build and ship AI-native products.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            Designer who ships. Figma to live products — luxury UX to AI-native
            tools. I obsess over design systems, edge performance, and workflows
            where AI accelerates craft without sacrificing quality.
          </p>
        </ScrollReveal>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5"
          variants={staggerContainer(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {ABOUT_CARDS.map((card) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS];
            return (
              <motion.article
                key={card.title}
                variants={staggerItem(reduceMotion)}
                className="glass-card glow-border group rounded-2xl p-6 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_48px_-12px_rgba(201,162,39,0.2)]"
              >
                <div className="mb-4 inline-flex rounded-xl border border-violet-500/20 bg-violet-950/40 p-3 text-gold">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-editorial text-xl font-semibold text-cream">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
