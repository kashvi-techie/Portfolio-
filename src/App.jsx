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
import {
  LUXURY_SPRING,
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

const HERO_SUB =
  "Building resilient design-to-code systems and premium digital experiences.";
const HERO_STACK = ["Next.js 15", "Tailwind v4", "Figma", "AI Tools", "UI UX"];
const ABOUT_BODY =
  "Designer who ships. Figma to live products — luxury UX to AI-native tools.";
const ABOUT_CARDS = [
  {
    title: "Ship-First Mindset",
    body: "Launch early, learn fast — shipping real products beats polishing decks.",
  },
  {
    title: "Performance Obsessed",
    body: "Lighthouse 92 PageSpeed — speed and clarity as product features, not afterthoughts.",
  },
  {
    title: "AI-Powered Workflow",
    body: "From prompt to UI with Cursor and the Gemini API — design intelligence wired into the build.",
  },
];

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
  run("heroTitle", "Kashvi Pundir — AI-Native Product Designer & Engineer.");
  run("heroSub", HERO_SUB, 0.04);

  out.heroButtons = t + 0.06;
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
                text="Kashvi Pundir — AI-Native Product Designer & Engineer."
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
                className="mb-5 flex flex-wrap gap-2 sm:mb-6 sm:gap-3"
                initial={
                  reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                }
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.4,
                        delay: Math.max(0, schedule.heroSub + 0.12),
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              >
                {HERO_STACK.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/45 bg-white/55 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-700 backdrop-blur-md"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
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
          id="about-heading"
          className="about-section"
          aria-labelledby="about-title"
          {...aboutFloat}
        >
          <div className="about-panel glass-floating rounded-[2rem] border border-white/20 p-6 sm:p-8 md:p-10">
            <h2
              id="about-title"
              className="about-heading font-sans text-4xl font-bold uppercase tracking-[0.2em] text-slate-900 sm:text-5xl"
            >
              About Me
            </h2>
            <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
              {ABOUT_BODY}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {ABOUT_CARDS.map((card) => (
                <article key={card.title} className="about-card">
                  <h3 className="text-2xl font-bold tracking-[-0.02em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base font-medium leading-relaxed text-white/95">
                    {card.body}
                  </p>
                </article>
              ))}
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
