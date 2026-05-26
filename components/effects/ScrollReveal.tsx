"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (gsap, ScrollTrigger) => {
      if (!ref.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    [delay]
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
