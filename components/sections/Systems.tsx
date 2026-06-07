"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SYSTEM_NODES } from "@/lib/data";
import { useGSAP } from "@/hooks/useGSAP";
import { useRef } from "react";

export function Systems() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    const nodes = diagramRef.current?.querySelectorAll("[data-node]");
    if (!nodes?.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(nodes, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      nodes,
      { opacity: 0, scale: 0.92, y: 16 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 80%",
        },
      }
    );

    const arrows = diagramRef.current?.querySelectorAll("[data-arrow]");
    if (arrows?.length) {
      gsap.fromTo(
        arrows,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: diagramRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  const topNodes = SYSTEM_NODES.filter((n) => n.row === 0);
  const bottom = SYSTEM_NODES.find((n) => n.row === 1)!;

  return (
    <section id="systems" className="section-pad scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="eyebrow">Engineering systems</p>
          <h2 className="font-editorial mt-4 max-w-2xl text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-cream">
            AI-native architecture that scales.
          </h2>
        </ScrollReveal>

        <div
          ref={diagramRef}
          className="glass-card glow-border mt-12 overflow-hidden rounded-3xl p-6 sm:p-10"
        >
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
            {topNodes.map((node, i) => (
              <div key={node.id} className="relative">
                {i < topNodes.length - 1 ? (
                  <div
                    data-arrow
                    className="absolute -right-2 top-1/2 z-10 hidden h-px w-4 origin-left bg-gradient-to-r from-gold/60 to-violet-500/40 lg:block"
                    style={{ width: "calc(100% + 1rem)", left: "100%" }}
                    aria-hidden
                  />
                ) : null}
                <div
                  data-node
                  className="rounded-xl border border-violet-500/25 bg-violet-950/30 px-4 py-5 text-center transition-colors hover:border-gold/35"
                >
                  <p className="text-sm font-semibold text-cream">{node.label}</p>
                  <p className="mt-1 text-[0.7rem] text-muted">{node.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center lg:mt-8" aria-hidden>
            <svg width="24" height="32" viewBox="0 0 24 32" className="text-gold/50">
              <path
                d="M12 0 L12 24 M6 18 L12 24 L18 18"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          <div
            data-node
            className="mt-4 rounded-xl border border-gold/20 bg-gold/5 px-6 py-5 text-center lg:mt-6"
          >
            <p className="text-sm font-semibold text-gold-light">{bottom.label}</p>
            <p className="mt-1 text-[0.7rem] text-muted">{bottom.sub}</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:hidden">
            {SYSTEM_NODES.map((node) => (
              <div
                key={node.id}
                data-node
                className="rounded-xl border border-violet-500/25 bg-violet-950/30 px-4 py-4"
              >
                <p className="text-sm font-semibold text-cream">{node.label}</p>
                <p className="mt-1 text-xs text-muted">{node.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
