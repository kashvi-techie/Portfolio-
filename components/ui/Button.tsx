"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "gold" | "outline";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: boolean;
  className?: string;
}

export function Button({
  href,
  children,
  variant = "gold",
  external,
  icon,
  className = "",
}: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a227]";
  const styles =
    variant === "gold"
      ? `${base} btn-gold ${className}`
      : `${base} btn-outline-gold ${className}`;

  const content = (
    <>
      {children}
      {icon ? <ArrowUpRight className="h-4 w-4" aria-hidden /> : null}
    </>
  );

  const motionProps = reduceMotion
    ? {}
    : { whileHover: { y: -2 }, whileTap: { scale: 0.98 } };

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps} className="inline-flex">
      <Link href={href} className={styles}>
        {content}
      </Link>
    </motion.div>
  );
}
