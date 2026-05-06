import { motion } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  sectionFloatMotion,
} from "./motionLuxury.js";
import { SmallCardLeaves } from "./PeacockLeafDecor.jsx";
import { ProjectLiveSlider } from "./ProjectLiveSlider.jsx";
import { TechStackMarquee } from "./TechStackMarquee.jsx";

const glassOuter =
  "glass-floating rounded-3xl px-4 py-6 sm:rounded-[2rem] sm:px-6 sm:py-7 lg:px-10 lg:py-9";

const projectGlass =
  "glass-floating project-card-glass rounded-3xl px-4 py-6 sm:rounded-[2rem] sm:px-6 sm:py-7 lg:px-10 lg:py-9";

const glassTile =
  "glass-floating rounded-xl px-3 py-3 sm:rounded-2xl sm:px-5 sm:py-5";

const sectionStack = "scroll-mt-28 md:scroll-mt-32";
const sectionPad =
  "py-16 sm:py-24 md:py-32 lg:py-40 xl:py-44 first:pt-12 sm:first:pt-16 md:first:pt-24 lg:first:pt-28";
const sectionEyebrow =
  "text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500";
const sectionTitle =
  "font-editorial text-2xl font-bold tracking-[-0.02em] text-slate-900 sm:text-3xl md:text-4xl";

const projectMetricClass =
  "rounded-xl border border-teal-500/40 bg-white/20 px-3 py-2.5 text-center font-editorial text-base font-semibold text-slate-900 shadow-[0_0_40px_-12px_rgba(20,184,166,0.35)] backdrop-blur-xl sm:rounded-2xl sm:px-4 sm:py-3 sm:text-lg md:text-xl";

const statIconWrap =
  "glass-floating flex h-12 w-12 items-center justify-center rounded-2xl text-teal-800";

function BentoStat({ icon, stat, label }) {
  return (
    <div
      className={`${glassOuter} flex h-full min-h-[158px] flex-col justify-between gap-4`}
    >
      <div className={statIconWrap}>{icon}</div>
      <p className="font-editorial text-3xl font-semibold text-slate-900 sm:text-4xl">
        {stat}
      </p>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
    </div>
  );
}

const PROCESS_STEPS = [
  {
    title: "Insight",
    body: "Identify the gap first: unstable AI output, unclear interface flow, or weak engineering handoff.",
  },
  {
    title: "Execution",
    body: "Build with Next.js 15, Tailwind v4, and custom regex sanitizers to stabilize stream rendering.",
  },
  {
    title: "Outcome",
    body: "Ship production-ready components with premium UX quality and reliable runtime behavior.",
  },
];

const EXPERIENCE_SUMMARY =
  "At MythyaVerse as a Design Intern from January 12, 2026 to April 17, 2026, contributed to the design and improvement of user interfaces across web and mobile platforms. Her responsibilities included creating wireframes, high-fidelity mock-ups, and interactive prototypes; conducting user research and usability testing; and collaborating with development teams to ensure design feasibility and consistency. Her work contributed to enhancing the overall user experience of core products.";

export function PortfolioSections({ reduceMotion }) {
  const float = sectionFloatMotion(reduceMotion, { amount: 0.15 });
  const floatWide = sectionFloatMotion(reduceMotion, { amount: 0.1 });

  return (
    <div className="portfolio-sections flex w-full min-w-0 max-w-full flex-col overflow-x-clip">
      <motion.section
        className={`${sectionStack} ${sectionPad}`}
        aria-labelledby="bento-heading"
        {...float}
      >
        <div className="lg:max-w-[92%]">
          <p id="bento-heading" className={sectionEyebrow}>
            Proof at a glance
          </p>
          <h2 className={`${sectionTitle} mt-3 max-w-[14ch]`}>
            Numbers that shipped
          </h2>
        </div>
        <motion.div
          className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-12 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:items-stretch lg:pl-[4%]"
          variants={staggerContainer(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.div variants={staggerItem(reduceMotion)} className="min-h-0">
            <BentoStat
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              }
              stat="92"
              label="PageSpeed"
            />
          </motion.div>
          <motion.div variants={staggerItem(reduceMotion)} className="min-h-0">
            <BentoStat
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              }
              stat="30%"
              label="Lighter bundle"
            />
          </motion.div>
          <motion.div variants={staggerItem(reduceMotion)} className="min-h-0">
            <BentoStat
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              stat="20%"
              label="Less handoff friction"
            />
          </motion.div>
          <motion.div variants={staggerItem(reduceMotion)} className="min-h-0">
            <BentoStat
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              }
              stat="5+"
              label="Products shipped"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        id="featured-projects"
        className={`${sectionStack} ${sectionPad}`}
        aria-labelledby="projects-heading"
        {...floatWide}
      >
        <div className="relative max-w-[min(100%,52rem)] overflow-visible py-3 lg:max-w-none">
          <SmallCardLeaves reduceMotion={reduceMotion} variant="projects" />
          <div className="relative z-10">
            <p className={sectionEyebrow}>02. Featured Work</p>
            <h2 id="projects-heading" className={`${sectionTitle} mt-3`}>
              Three deep dives
            </h2>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12">
          <ProjectLiveSlider
            reduceMotion={reduceMotion}
            projectGlass={projectGlass}
            projectMetricClass={projectMetricClass}
          />
        </div>
      </motion.section>

      <motion.section
        id="process-heading"
        className={`${sectionStack} ${sectionPad}`}
        aria-labelledby="process-title"
        {...float}
      >
        <p className={sectionEyebrow}>03. Process</p>
        <h2 id="process-title" className={`${sectionTitle} mt-3`}>
          Proof of work
        </h2>
        <motion.div
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
          variants={staggerContainer(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {PROCESS_STEPS.map((step) => (
            <motion.article
              key={step.title}
              variants={staggerItem(reduceMotion)}
              className={`${glassOuter} min-h-[180px]`}
            >
              <h3 className="font-editorial text-2xl font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {step.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        id="technical-toolkit"
        className={`${sectionStack} ${sectionPad}`}
        aria-labelledby="toolkit-heading"
        {...float}
      >
        <header>
          <p className={sectionEyebrow}>04. Tech Stack</p>
          <h2 id="toolkit-heading" className={`${sectionTitle} mt-3`}>
            Minimal stack. Maximum execution.
          </h2>
        </header>

        <motion.div
          className="mt-8"
          variants={staggerContainer(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.div variants={staggerItem(reduceMotion)}>
            <TechStackMarquee />
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        id="experience"
        className={`${sectionStack} ${sectionPad}`}
        aria-labelledby="experience-heading"
        {...float}
      >
        <p className={sectionEyebrow}>05. Experience</p>
        <h2 id="experience-heading" className={`${sectionTitle} mt-3`}>
          Professional experience
        </h2>
        <article className={`${glassOuter} mt-8`}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            <img
              src="/mythyaverse-logo.png"
              alt="MythyaVerse logo"
              className="h-11 w-11 rounded-md object-contain"
              loading="lazy"
              decoding="async"
            />
            <div className="min-w-0">
              <h3 className="font-editorial text-2xl font-bold text-slate-900">
                Design Intern · MythyaVerse
              </h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                January 12, 2026 - April 17, 2026
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {EXPERIENCE_SUMMARY}
              </p>
            </div>
          </div>
        </article>
      </motion.section>
    </div>
  );
}
