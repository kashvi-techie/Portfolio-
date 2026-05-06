import { Fragment, useMemo, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { PortfolioSections } from "./PortfolioSections.jsx";
import { ContactFooter } from "./ContactFooter.jsx";
import { CursorFollower } from "./CursorFollower.jsx";
import { FeatherGlyph, FEATHER_PATHS } from "./PeacockLeafDecor.jsx";
import {
  LUXURY_SPRING,
  staggerContainer,
  staggerItem,
  sectionFloatMotion,
} from "./motionLuxury.js";

const PEACOCK_SRC = "/hero-peacock.png";
const PROFILE_SRC = "/hero-profile.png";

const WORD_STAGGER = 0.048;
const BLOCK_GAP = 0.1;

function AnimatedWords({
  text,
  className,
  as: Tag = "span",
  baseDelay = 0,
  wordStagger = WORD_STAGGER,
  reduceMotion,
  id,
}) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return (
    <Tag className={className} id={id}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 ? " " : null}
          <motion.span
            className="anim-word"
            initial={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
            }
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.42,
                    delay: baseDelay + i * wordStagger,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            {word}
          </motion.span>
        </Fragment>
      ))}
    </Tag>
  );
}

const HERO_SUB = "Design systems · production code · fast shipping.";
const ABOUT_BODY =
  "Designer who ships. Figma to live products — luxury UX to AI-native tools.";

function buildSchedule(reduceMotion) {
  if (reduceMotion) {
    return {
      portfolio: 0,
      about: 0,
      resumeNav: 0,
      linkedinNav: 0,
      heroTitle: 0,
      heroSub: 0,
      heroButtons: 0,
      aboutBody: 0,
    };
  }

  let t = 0.14;
  const out = {};

  const run = (key, str, stagger = WORD_STAGGER, gap = BLOCK_GAP) => {
    const n = str.trim().split(/\s+/).filter(Boolean).length;
    out[key] = t;
    t += n * stagger + gap;
  };

  run("portfolio", "Portfolio");
  run("about", "About");
  run("resumeNav", "Resume");
  run("linkedinNav", "LinkedIn");

  t += 0.08;
  run("heroTitle", "AI-Native Product Engineer & Designer");
  run("heroSub", HERO_SUB, 0.04);

  out.heroButtons = t + 0.06;
  t = out.heroButtons + 0.42;

  t += 0.12;
  run("aboutBody", ABOUT_BODY, 0.032);

  return out;
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const schedule = useMemo(
    () => buildSchedule(reduceMotion),
    [reduceMotion]
  );

  const { scrollYProgress } = useScroll();
  const yPeacock = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 120]
  );

  const heroFloat = useMemo(
    () => sectionFloatMotion(reduceMotion, { amount: 0.25 }),
    [reduceMotion]
  );
  const aboutFloat = useMemo(
    () => sectionFloatMotion(reduceMotion, { amount: 0.18 }),
    [reduceMotion]
  );

  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [navOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const closeIfDesktop = () => {
      if (mq.matches) setNavOpen(false);
    };
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  return (
    <>
      <div className="peacock-fixed-layer" aria-hidden="true">
        <div className="peacock-fixed-inner">
          <motion.div
            className="flex h-full w-full items-end justify-end"
            style={{ y: yPeacock }}
          >
            <img
              className="peacock-fixed-img"
              src={PEACOCK_SRC}
              alt=""
              width={500}
              height={700}
              decoding="async"
            />
          </motion.div>
        </div>
      </div>

      <div className="page">
      <nav className="site-nav" aria-label="Primary">
        <div className="site-nav__bar">
          <a className="nav-brand" href="#top">
            <AnimatedWords
              text="Portfolio"
              as="span"
              baseDelay={schedule.portfolio}
              reduceMotion={reduceMotion}
            />
          </a>
          <button
            type="button"
            className="nav-hamburger md:hidden"
            aria-expanded={navOpen}
            aria-controls="nav-mobile-drawer"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span className="nav-hamburger__bars" aria-hidden>
              <span className="nav-hamburger__line" />
              <span className="nav-hamburger__line" />
              <span className="nav-hamburger__line" />
            </span>
          </button>
          <ul className="nav-links nav-links--desktop">
            <li>
              <a href="#about-heading">
                <AnimatedWords
                  text="About"
                  as="span"
                  baseDelay={schedule.about}
                  reduceMotion={reduceMotion}
                />
              </a>
            </li>
            <li>
              <a href="#featured-projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <AnimatedWords
                  text="Resume"
                  as="span"
                  baseDelay={schedule.resumeNav}
                  reduceMotion={reduceMotion}
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/kashvi-pundir-3502183b1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AnimatedWords
                  text="LinkedIn"
                  as="span"
                  baseDelay={schedule.linkedinNav}
                  reduceMotion={reduceMotion}
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <AnimatePresence>
        {navOpen ? (
          <>
            <motion.div
              key="nav-backdrop"
              className="nav-mobile-backdrop md:hidden"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.2 }
              }
              onClick={() => setNavOpen(false)}
            />
            <motion.aside
              key="nav-panel"
              id="nav-mobile-drawer"
              className="nav-mobile-panel md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                reduceMotion ? { duration: 0 } : LUXURY_SPRING
              }
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Menu
                </span>
                <button
                  type="button"
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200/90 bg-white/80 text-lg font-light leading-none text-slate-700"
                  aria-label="Close menu"
                  onClick={() => setNavOpen(false)}
                >
                  ×
                </button>
              </div>
              <ul className="nav-mobile-panel__list">
                <li>
                  <a
                    href="#about-heading"
                    onClick={() => setNavOpen(false)}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#featured-projects"
                    onClick={() => setNavOpen(false)}
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={() => setNavOpen(false)}>
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setNavOpen(false)}
                  >
                    Resume
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/kashvi-pundir-3502183b1"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setNavOpen(false)}
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <main
        id="main-content"
        className="flex min-w-0 flex-col gap-12 sm:gap-16 md:gap-24 lg:gap-28 xl:gap-36"
      >
        <motion.header className="hero" id="top" {...heroFloat}>
          <div className="hero-inner">
            <div className="hero-copy">
              <AnimatedWords
                text="AI-Native Product Engineer & Designer"
                as="h1"
                className="hero-title"
                baseDelay={schedule.heroTitle}
                reduceMotion={reduceMotion}
              />
              <AnimatedWords
                text={HERO_SUB}
                as="p"
                className="hero-sub"
                baseDelay={schedule.heroSub}
                wordStagger={0.04}
                reduceMotion={reduceMotion}
              />
              <motion.div
                className="hero-actions"
                initial={
                  reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                }
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.45,
                        delay: schedule.heroButtons,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              >
                <a
                  className="btn-glass"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
                <a
                  className="btn-glass"
                  href="https://www.linkedin.com/in/kashvi-pundir-3502183b1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </motion.div>
            </div>

            <motion.div
              className="hero-visual"
              initial={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      delay: Math.max(0, schedule.heroTitle - 0.05),
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              <div className="profile-ring">
                <img
                  className="profile-img"
                  src={PROFILE_SRC}
                  alt="Kashvi Pundir — product designer and engineer"
                  width={200}
                  height={200}
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.section
          className="about-section overflow-x-clip"
          aria-labelledby="about-heading"
          {...aboutFloat}
        >
          <div className="relative mx-auto max-w-5xl px-4 py-2 sm:px-6 md:py-3 lg:px-8">
            <div
              className="relative overflow-visible rounded-[40px] border-[0.5px] border-white/20 bg-white/[0.07] p-12 shadow-[0_32px_80px_-28px_rgba(15,23,42,0.35)] backdrop-blur-2xl sm:p-14"
            >
              <div
                className="pointer-events-none absolute -right-4 -top-8 z-20 h-40 w-[5.5rem] sm:-right-6 sm:-top-12 sm:h-48 sm:w-28 md:h-52 md:w-32"
                aria-hidden
              >
                <FeatherGlyph
                  d={FEATHER_PATHS[1]}
                  className="h-full w-full drop-shadow-[0_8px_28px_rgba(15,118,110,0.45)]"
                  gradKey="about-hook"
                />
              </div>

              <motion.h2
                id="about-heading"
                className="relative z-10 mb-8 max-w-[22ch] font-sans text-2xl font-bold uppercase leading-none tracking-[0.28em] text-slate-900 underline decoration-slate-900/75 decoration-2 underline-offset-[14px] [font-stretch:95%] sm:mb-10 sm:text-3xl sm:tracking-[0.26em]"
                initial={
                  reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={
                  reduceMotion ? { duration: 0 } : LUXURY_SPRING
                }
              >
                About Me
              </motion.h2>

              <AnimatedWords
                text={ABOUT_BODY}
                as="p"
                className="relative z-10 mb-0 max-w-2xl text-left text-base font-medium leading-[1.85] tracking-[-0.01em] text-slate-600 sm:text-lg"
                baseDelay={schedule.aboutBody}
                wordStagger={0.032}
                reduceMotion={reduceMotion}
              />

              <motion.div
                className="relative z-10 mt-10 flex flex-col gap-6 md:mt-12 md:flex-row md:items-stretch"
                variants={staggerContainer(reduceMotion)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-24px" }}
              >
                <motion.article
                  variants={staggerItem(reduceMotion)}
                  className="flex flex-1 flex-col justify-between gap-4 rounded-[15px] bg-[#3E8DA8] p-6 text-white shadow-lg shadow-slate-900/15"
                >
                  <p className="text-base font-bold leading-tight text-white">
                    Ship-First Mindset
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-white/90">
                    Launch early, learn fast — shipping real products beats
                    polishing decks.
                  </p>
                </motion.article>
                <motion.article
                  variants={staggerItem(reduceMotion)}
                  className="flex flex-1 flex-col justify-between gap-4 rounded-[15px] bg-[#3E8DA8] p-6 text-white shadow-lg shadow-slate-900/15"
                >
                  <p className="text-base font-bold leading-tight text-white">
                    Performance Obsessed
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-white/90">
                    Lighthouse{" "}
                    <span className="font-bold text-white">92</span> PageSpeed —
                    speed and clarity as product features, not afterthoughts.
                  </p>
                </motion.article>
                <motion.article
                  variants={staggerItem(reduceMotion)}
                  className="flex flex-1 flex-col justify-between gap-4 rounded-[15px] bg-[#3E8DA8] p-6 text-white shadow-lg shadow-slate-900/15"
                >
                  <p className="text-base font-bold leading-tight text-white">
                    AI-Powered Workflow
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-white/90">
                    From prompt to UI with{" "}
                    <span className="font-semibold text-white">Cursor</span> and
                    the{" "}
                    <span className="font-semibold text-white">Gemini API</span>{" "}
                    — design intelligence wired into the build.
                  </p>
                </motion.article>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <PortfolioSections reduceMotion={reduceMotion} />
      </main>
      </div>

      <ContactFooter reduceMotion={reduceMotion} />
    </>
  );
}
