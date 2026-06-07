"use client";

import { PeacockIllustration } from "@/components/decor/PeacockIllustration";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ProfileAvatar } from "@/components/ui/ProfileAvatar";

const SOCIAL = [
  { icon: Github, label: "GitHub", href: SITE.github, text: "github.com/kashvi67631" },
  { icon: Linkedin, label: "LinkedIn", href: SITE.linkedin, text: "linkedin.com/in/kashvi-pundir" },
  { icon: Mail, label: "Email", href: `mailto:${SITE.email}`, text: SITE.email },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-dvh overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <PeacockIllustration />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          className="eyebrow mb-6"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          AI-native product engineer
        </motion.p>

        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
          <div className="max-w-2xl">
            <motion.h1
              className="font-display text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-cream"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Design Systems.{" "}
              <span className="text-gold-gradient">AI Workflows.</span> Real
              Products.
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              Bridging the gap between high-fidelity design and production-ready
              code.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3 sm:gap-4"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button href="#work" variant="gold" icon>
                View My Work
              </Button>
              <Button href={SITE.resume} variant="outline" external>
                Download Resume
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto lg:mx-0"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="gold-ring relative h-44 w-44 overflow-hidden rounded-full sm:h-52 sm:w-52">
              <ProfileAvatar name={SITE.name} />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="glass-card glow-border mt-16 inline-flex flex-wrap items-center gap-6 rounded-2xl px-6 py-4 sm:gap-10"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          {SOCIAL.map(({ icon: Icon, label, href, text }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-gold-light"
            >
              <Icon className="h-4 w-4 text-gold" aria-hidden />
              <span className="hidden sm:inline">{text}</span>
              <span className="sm:hidden">{label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
