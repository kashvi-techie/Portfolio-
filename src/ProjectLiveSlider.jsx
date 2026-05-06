import { motion } from "framer-motion";
import { LUXURY_SPRING } from "./motionLuxury.js";
import { SliderFlutterLeaves } from "./SliderFlutterLeaves.jsx";

export const PROJECT_SLIDES = [
  {
    id: "sortedd",
    title: "Sortedd",
    previewUrl: "https://www.sortedd.in/",
    context: "Luxury concierge · live",
    description:
      "Refined the product experience and frontend structure for a premium concierge platform, with smoother user flow and production-ready UI delivery.",
    tags: ["React", "TypeScript", "REST APIs", "Tailwind CSS", "Next.js"],
    metrics: ["92 PageSpeed", "−30% bundle"],
    githubHref: "https://github.com/kashvi67631",
    liveHref: "https://www.sortedd.in/",
  },
  {
    id: "luxegen",
    title: "LuxeGen",
    previewUrl: "https://ai-image-to-saa-s-product-generator.vercel.app/",
    context: "AI design-to-code · live",
    description:
      "Built an AI-native design-to-code workflow with resilient rendering, safer generated output handling, and fast iteration from prompt to ship.",
    tags: ["React", "Gemini API", "Code Sanitizer", "Vercel", "Tailwind CSS"],
    metrics: ["Zero-crash previews", "429-aware backoff"],
    githubHref: "https://github.com/kashvi67631",
    liveHref: "https://ai-image-to-saa-s-product-generator.vercel.app/",
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
                  <iframe
                    title={`Live preview — ${slide.title}`}
                    src={slide.previewUrl}
                    className="h-full w-full border-0 bg-white"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
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
                  <motion.a
                    href={slide.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl border border-white/20 bg-white/15 px-5 text-sm font-bold text-slate-900 shadow-md backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:w-auto sm:min-w-[11rem] sm:px-8 sm:text-base"
                  >
                    GitHub
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
