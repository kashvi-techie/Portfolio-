export const LUXURY_SPRING = {
  type: "spring" as const,
  damping: 40,
  stiffness: 300,
  mass: 1,
};

export function staggerContainer(reduceMotion: boolean | null) {
  return {
    hidden: {},
    show: reduceMotion
      ? { transition: { staggerChildren: 0, delayChildren: 0 } }
      : {
          transition: { staggerChildren: 0.1, delayChildren: 0.08 },
        },
  };
}

export function staggerItem(reduceMotion: boolean | null) {
  return {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : LUXURY_SPRING,
    },
  };
}

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
