/** Snappy, high-damping spring — reads “luxury” not soft fade */
export const LUXURY_SPRING = {
  type: "spring",
  damping: 40,
  stiffness: 300,
  mass: 1,
};

export function staggerContainer(reduceMotion) {
  return {
    hidden: {},
    show: reduceMotion
      ? { transition: { staggerChildren: 0, delayChildren: 0 } }
      : {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
  };
}

export function staggerItem(reduceMotion) {
  return {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : LUXURY_SPRING,
    },
  };
}

/** Scroll-triggered float-up for sections (premium staggered feel) */
export function sectionFloatMotion(reduceMotion, options = {}) {
  const { amount = 0.12, margin = "0px 0px -48px 0px" } = options;
  return {
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount, margin },
    transition: reduceMotion ? { duration: 0 } : LUXURY_SPRING,
  };
}
