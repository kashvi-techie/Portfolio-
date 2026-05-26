"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";

export function CtaBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-pad pt-0">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="glass-card glow-border relative overflow-hidden rounded-3xl px-8 py-12 sm:px-12 sm:py-16">
            <div className="relative z-10 max-w-xl">
              <h2 className="font-editorial text-2xl font-semibold text-[#f5f0e6] sm:text-3xl">
                Open to exciting opportunities in AI-native product teams.
              </h2>
              <p className="mt-4 text-sm text-[#9ca3af]">
                Let&apos;s build design systems, ship fast, and craft experiences
                worthy of the best startups.
              </p>
              <div className="mt-8">
                <Button href="#contact" variant="gold" icon>
                  Let&apos;s Build Together
                </Button>
              </div>
            </div>

            <motion.div
              className="pointer-events-none absolute -right-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full opacity-60 sm:h-64 sm:w-64"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,162,39,0.35) 0%, rgba(91,33,182,0.2) 45%, transparent 70%)",
              }}
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
