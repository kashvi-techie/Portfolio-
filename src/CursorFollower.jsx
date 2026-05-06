import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const SELECTOR =
  'a, button, input[type="submit"], [role="button"], .btn-glass, .site-nav a';

export function CursorFollower({ reduceMotion }) {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cx = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.35 });
  const cy = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (reduceMotion) return;
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    setEnabled(true);

    const move = (e) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
      const t = e.target;
      setHovering(
        typeof t.closest === "function" && !!t.closest(SELECTOR)
      );
    };

    const leave = () => setHovering(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [reduceMotion, cx, cy]);

  if (reduceMotion || !enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[9998] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-white/35 bg-white/20 shadow-[0_8px_32px_rgba(15,23,42,0.12)] backdrop-blur-md"
      style={{ left: cx, top: cy }}
      animate={{ scale: hovering ? 2.15 : 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.4 }}
    />
  );
}
