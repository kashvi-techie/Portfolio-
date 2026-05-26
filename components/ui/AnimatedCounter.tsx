"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setCount(value);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {count}
      {suffix}
    </motion.span>
  );
}
