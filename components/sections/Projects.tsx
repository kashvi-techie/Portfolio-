"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { Tag } from "@/components/ui/Tag";
import { PROJECTS } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  const reduceMotion = useReducedMotion();
  const grid = PROJECTS.filter((p) => !p.featured);
  const featured = PROJECTS.find((p) => p.featured)!;

  return (
    <section id="work" className="section-pad scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="font-editorial mt-4 max-w-2xl text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-[#f5f0e6]">
            Products that solve real problems with elegant systems.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {grid.map((project, i) => (
            <motion.article
              key={project.id}
              className="glass-card glow-border group flex flex-col overflow-hidden rounded-2xl"
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <div className="overflow-hidden p-3 pb-0">
                <ProjectPreview title={project.title} accent={project.accent} image={project.image} />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#c9a227]/80">
                  {project.tagline}
                </p>
                <h3 className="font-editorial mt-2 text-2xl font-semibold text-[#f5f0e6]">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9ca3af]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <a
                  href={project.liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#e8d48b] transition-colors hover:text-[#c9a227]"
                >
                  View project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <ScrollReveal className="mt-16">
          <article className="glass-card glow-border overflow-hidden rounded-3xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="p-6 sm:p-10 lg:pr-0">
                <span className="inline-flex rounded-full border border-[#c9a227]/30 bg-[#c9a227]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#e8d48b]">
                  Live project
                </span>
                <h3 className="font-editorial mt-4 text-3xl font-semibold text-[#f5f0e6] sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#9ca3af] sm:text-base">
                  {featured.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {[
                    "Edge Route Handlers with streaming responses",
                    "AI content generation via Gemini 1.5 API",
                    "Multi-platform dispatch (Twitter, LinkedIn)",
                    "Real-time monitoring & metrics dashboard",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[#9ca3af]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a227]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {featured.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-xl border border-[#c9a227]/20 bg-[#c9a227]/5 px-4 py-2 font-editorial text-sm font-semibold text-[#e8d48b]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href={featured.liveHref} variant="gold" external icon>
                    View Live
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[280px] p-4 sm:p-6 lg:pl-0">
                <div className="absolute inset-4 rounded-3xl bg-violet-600/20 blur-3xl" />
                <ProjectPreview
                  title={featured.title}
                  accent={featured.accent}
                  image={featured.image}
                  variant="dashboard"
                />
              </div>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
