import { motion } from "framer-motion";
import { LUXURY_SPRING } from "./motionLuxury.js";
import { SliderFlutterLeaves } from "./SliderFlutterLeaves.jsx";

export const PROJECT_SLIDES = [
  {
    id: "sortedd",
    title: "Sortedd",
    previewImage: "/sortedd-project.png",
    context: "Luxury concierge · live",
    description:
      "Rebuilt key UX flows with premium visual restraint and production-safe frontend architecture.",
    details: [
      "Designed for luxury-brand trust and editorial polish.",
      "Performance jump: PageSpeed improved from 65 to 92.",
    ],
    tags: ["Next.js 15", "Tailwind v4", "Premium UX"],
    metrics: ["65 → 92 PageSpeed", "−30% bundle"],
    liveHref: "https://www.sortedd.in/",
  },
  {
    id: "luxegen",
    title: "LuxeGen",
    previewImage: "/luxegen-project.png",
    context: "AI design-to-code · live",
    description:
      "Built a resilient pipeline that converts unstable LLM responses into render-safe React components.",
    details: [
      "Before: raw LLM fragments often broke JSX trees.",
      "After: sanitized, stream-safe output reliably renders in preview.",
    ],
    tags: ["Gemini API", "Regex Sanitizer", "Stream Guard"],
    metrics: ["Zero-crash previews", "429-aware backoff"],
    liveHref: "https://ai-image-to-saa-s-product-generator-py8tkvdoe.vercel.app/",
  },
];

export function ProjectLiveSlider({
  reduceMotion,
  slides = PROJECT_SLIDES,
  projectGlass,
  projectMetricClass,
}) {
  return (
    <div className="relative w-full max-w-full overflow-x-clip overflow-y-visible py-4 sm:py-6 md:py-8">
      <SliderFlutterLeaves reduceMotion={reduceMotion} flutterNonce={0} />

      <motion.article
        id="project-live-slider"
        className={`relative z-10 ${projectGlass}`}
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={reduceMotion ? { duration: 0 } : LUXURY_SPRING}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-16 sm:gap-20">
          {slides.map((slide, index) => (
            <motion.section
              key={slide.id}
              id={`project-${slide.id}`}
              className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
              aria-labelledby={`project-title-${slide.id}`}
              initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 64 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { ...LUXURY_SPRING, delay: 0.3 + index * 0.2 }
              }
            >
              <motion.div
                className="order-1 w-full overflow-hidden rounded-[1.2rem] border border-white/25 bg-slate-950 shadow-[0_40px_80px_-24px_rgba(15,23,42,0.4)] md:w-[52%]"
                whileHover={reduceMotion ? undefined : { scale: 1.07 }}
                transition={reduceMotion ? { duration: 0 } : LUXURY_SPRING}
              >
                <div className="relative aspect-[16/10] w-full min-h-[220px] sm:min-h-[280px] md:aspect-[16/9] md:min-h-[320px]">
                  <img
                    src={slide.previewImage}
                    alt={`${slide.title} project preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-slate-950/45 to-transparent" />
                </div>
              </motion.div>

              <div className="order-2 flex w-full flex-col justify-center gap-3 text-left md:w-[44%] md:gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800/90">
                  {slide.context}
                </p>
                <h3
                  id={`project-title-${slide.id}`}
                  className="font-editorial text-3xl font-bold tracking-[-0.02em] text-slate-900 sm:text-4xl"
                >
                  {slide.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
                  {slide.description}
                </p>

                <div className="flex flex-wrap justify-start gap-2">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-300/80 bg-slate-100/70 px-3 py-1 text-[0.68rem] font-semibold tracking-wide text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <ul className="ml-4 list-disc space-y-1 text-sm text-slate-600">
                  {slide.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap justify-start gap-2 sm:gap-3">
                  {slide.metrics.map((m) => (
                    <span key={m} className={projectMetricClass}>
                      {m}
                    </span>
                  ))}
                </div>

                <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-start">
                  <motion.a
                    href={slide.liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl border border-teal-400/40 bg-linear-to-r from-teal-600 to-teal-700 px-5 text-sm font-bold text-white shadow-lg shadow-teal-900/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:w-auto sm:min-w-[11rem] sm:px-8 sm:text-base"
                  >
                    Open live site
                  </motion.a>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </motion.article>
    </div>
  );
}
