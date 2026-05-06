import { useId } from "react";
import { motion } from "framer-motion";
import { LUXURY_SPRING } from "./motionLuxury.js";

export const FEATHER_PATHS = [
  "M28 2C12 28 4 52 8 78c8-6 16-10 20-18 6 14 14 24 24 30C44 52 36 28 28 2z",
  "M30 4C18 32 10 58 14 86c10-8 18-18 22-30 4 12 12 22 22 28C48 56 38 28 30 4z",
  "M26 6C14 34 8 60 12 88c8-10 16-20 20-34 8 16 18 28 30 34C52 58 34 30 26 6z",
];

const PATHS = FEATHER_PATHS;

export function FeatherGlyph({ d, className, gradKey }) {
  const raw = useId();
  const gid = `pl-${gradKey}-${raw.replace(/:/g, "")}`;
  return (
    <svg
      className={className}
      viewBox="0 0 56 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="45%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill={`url(#${gid})`}
        fillOpacity={0.92}
      />
    </svg>
  );
}

/** Small peeking feathers behind About / Projects heading — behind blur layer */
export function SmallCardLeaves({ reduceMotion, variant = "about" }) {
  const isProjects = variant === "projects";
  const leaves = isProjects
    ? [
        {
          path: PATHS[0],
          className:
            "absolute -left-[4%] top-0 h-12 w-7 md:h-16 md:w-9 scale-x-[-1]",
          initialRotate: -14,
          endRotate: -4,
          delay: 0,
          gradKey: "sa",
        },
        {
          path: PATHS[2],
          className:
            "absolute right-[8%] -top-[8%] h-11 w-6 md:h-14 md:w-8 opacity-90",
          initialRotate: 16,
          endRotate: 5,
          delay: 0.06,
          gradKey: "sb",
        },
      ]
    : [
        {
          path: PATHS[1],
          className:
            "absolute -left-[5%] top-[18%] h-14 w-8 md:h-[4.25rem] md:w-10",
          initialRotate: -12,
          endRotate: -3,
          delay: 0,
          gradKey: "aa",
        },
        {
          path: PATHS[2],
          className:
            "absolute -right-[3%] bottom-[14%] h-12 w-7 md:h-16 md:w-9 scale-x-[-1]",
          initialRotate: 14,
          endRotate: 4,
          delay: 0.07,
          gradKey: "ab",
        },
      ];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
      aria-hidden
    >
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className={leaf.className}
          initial={
            reduceMotion
              ? { scale: 1, rotate: leaf.endRotate, opacity: 0.5 }
              : { scale: 0.55, rotate: leaf.initialRotate, opacity: 0.35 }
          }
          whileInView={
            reduceMotion
              ? {}
              : { scale: 1, rotate: leaf.endRotate, opacity: 0.62 }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { ...LUXURY_SPRING, delay: leaf.delay }
          }
        >
          <FeatherGlyph
            gradKey={`${variant}-${leaf.gradKey}`}
            d={leaf.path}
            className="h-full w-full drop-shadow-[0_2px_10px_rgba(20,184,166,0.28)]"
          />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Lightweight inline SVG feathers (no extra HTTP) — teal → gold.
 * Pop out from behind glass on scroll.
 */
export function CardLeafBackdrop({ reduceMotion, cardIndex = 0 }) {
  const flip = cardIndex % 2 === 1;

  const leaves = [
    {
      path: PATHS[0],
      className: `absolute -left-[8%] top-[6%] h-[7.5rem] w-[4.25rem] md:h-[9rem] md:w-[5rem] ${flip ? "scale-x-[-1]" : ""}`,
      initialRotate: flip ? 18 : -16,
      endRotate: flip ? 6 : -4,
      delay: 0,
      gradKey: "a",
    },
    {
      path: PATHS[1],
      className: `absolute -right-[4%] bottom-[10%] h-[6.5rem] w-14 md:h-[8rem] md:w-[4.5rem] ${flip ? "" : "scale-x-[-1]"}`,
      initialRotate: flip ? -22 : 20,
      endRotate: flip ? -8 : 7,
      delay: 0.05,
      gradKey: "b",
    },
    {
      path: PATHS[2],
      className: `absolute left-[18%] -bottom-[6%] h-[5.5rem] w-12 md:h-28 md:w-[3.75rem] ${flip ? "scale-x-[-1]" : ""}`,
      initialRotate: flip ? 12 : -10,
      endRotate: flip ? -3 : 4,
      delay: 0.1,
      gradKey: "c",
    },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
      aria-hidden
    >
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className={leaf.className}
          initial={
            reduceMotion
              ? { scale: 1, rotate: leaf.endRotate, opacity: 0.88 }
              : { scale: 0.5, rotate: leaf.initialRotate, opacity: 0.45 }
          }
          whileInView={
            reduceMotion
              ? {}
              : { scale: 1, rotate: leaf.endRotate, opacity: 0.9 }
          }
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { ...LUXURY_SPRING, delay: leaf.delay }
          }
        >
          <FeatherGlyph
            gradKey={`${cardIndex}-${leaf.gradKey}`}
            d={leaf.path}
            className="h-full w-full drop-shadow-[0_4px_12px_rgba(15,118,110,0.35)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
