"use client";

import { useEffect, useRef } from "react";

type GsapCallback = (
  gsap: typeof import("gsap").default,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger
) => void | (() => void);

export function useGSAP(callback: GsapCallback, deps: unknown[] = []) {
  const ctxRef = useRef<ReturnType<typeof import("gsap").default.context> | null>(
    null
  );

  useEffect(() => {
    let cleanup: void | (() => void);
    let mounted = true;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!mounted) return;

      if (prefersReduced) {
        cleanup = callback(gsap, ScrollTrigger);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      ctxRef.current = gsap.context(() => {
        cleanup = callback(gsap, ScrollTrigger);
      });

      ScrollTrigger.refresh();
    };

    init();

    return () => {
      mounted = false;
      if (typeof cleanup === "function") cleanup();
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
