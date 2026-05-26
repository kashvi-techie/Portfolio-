"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { EXPERIENCE } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";

export function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="section-pad scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="eyebrow">Experience</p>
          <h2 className="font-editorial mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-[#f5f0e6]">
            My journey so far.
          </h2>
        </ScrollReveal>

        <div className="relative mt-14">
          <div
            className="absolute bottom-0 left-[4.5rem] top-0 w-px bg-gradient-to-b from-[#c9a227]/60 via-[#c9a227]/30 to-transparent sm:left-24"
            aria-hidden
          />

          <ul className="space-y-12">
            {EXPERIENCE.map((item, i) => (
              <motion.li
                key={`${item.year}-${item.company}`}
                className="relative grid gap-6 sm:grid-cols-[5rem_1fr]"
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                <div className="flex items-start sm:justify-end">
                  <span className="font-editorial text-2xl font-semibold text-gold sm:text-3xl">
                    {item.year}
                  </span>
                  <span
                    className="absolute left-[4.25rem] top-2 hidden h-3 w-3 rounded-full border-2 border-[#c9a227] bg-[#0a0612] shadow-[0_0_16px_rgba(201,162,39,0.6)] sm:left-[5.65rem] sm:block"
                    aria-hidden
                  />
                </div>

                <article className="glass-card glow-border rounded-2xl p-6 sm:ml-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-editorial text-xl font-semibold text-[#f5f0e6]">
                      {item.role} @ {item.company}
                    </h3>
                    <span className="rounded-full border border-violet-500/30 bg-violet-950/50 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-violet-300">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#9ca3af]">{item.period}</p>
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm leading-relaxed text-[#9ca3af]"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9a227]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
