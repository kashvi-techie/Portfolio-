import { motion } from "framer-motion";
import { FeatherGlyph, FEATHER_PATHS } from "./PeacockLeafDecor.jsx";

/** Organic flutter behind project slider — replays when `flutterNonce` changes */
export function SliderFlutterLeaves({ reduceMotion, flutterNonce }) {
  const leaves = [
    {
      path: FEATHER_PATHS[0],
      className:
        "absolute -left-[6%] top-[10%] h-[6.5rem] w-[3.75rem] md:h-[8.5rem] md:w-[4.75rem]",
      endRotate: -5,
      gradKey: "sf0",
    },
    {
      path: FEATHER_PATHS[1],
      className:
        "absolute -right-[3%] bottom-[16%] h-[5.5rem] w-12 scale-x-[-1] md:h-28 md:w-[4rem]",
      endRotate: 8,
      gradKey: "sf1",
    },
    {
      path: FEATHER_PATHS[2],
      className:
        "absolute left-[12%] -bottom-[4%] h-16 w-10 md:h-[7rem] md:w-[3.75rem]",
      endRotate: -3,
      gradKey: "sf2",
    },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
      aria-hidden
    >
      {leaves.map((leaf, i) => (
        <motion.div
          key={`${flutterNonce}-${i}`}
          className={leaf.className}
          initial={
            reduceMotion
              ? { opacity: 0.85, rotate: leaf.endRotate, y: 0 }
              : { opacity: 0.72, rotate: leaf.endRotate - 14, y: 10 }
          }
          animate={
            reduceMotion
              ? { opacity: 0.85, rotate: leaf.endRotate, y: 0 }
              : {
                  opacity: [0.72, 0.94, 0.88, 0.85],
                  rotate: [
                    leaf.endRotate - 14,
                    leaf.endRotate + 12,
                    leaf.endRotate - 5,
                    leaf.endRotate,
                  ],
                  y: [10, -10, 5, 0],
                  transition: {
                    duration: 0.78,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.38, 0.72, 1],
                  },
                }
          }
        >
          <FeatherGlyph
            gradKey={`${flutterNonce}-${leaf.gradKey}`}
            d={leaf.path}
            className="h-full w-full drop-shadow-[0_4px_14px_rgba(20,184,166,0.38)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
