import { motion } from "framer-motion";
import { LUXURY_SPRING, sectionFloatMotion } from "./motionLuxury.js";

const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:kashvipcm@gmail.com",
    text: "kashvipcm@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/kashvi67631",
    text: "github.com/kashvi67631",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kashvi-pundir-3502183b1",
    text: "linkedin.com/in/kashvi-pundir",
  },
];

export function ContactFooter({ reduceMotion }) {
  return (
    <footer
      id="contact"
      className="site-footer-contact relative z-10 isolate mt-6 overflow-hidden sm:mt-8"
      aria-labelledby="footer-contact-heading"
    >
      <div className="footer-contact-pattern pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/40 backdrop-blur-[3px]"
        aria-hidden
      />

      <motion.div
        className="footer-contact-inner relative z-[2] py-16 sm:py-24 md:py-32 lg:py-40 xl:py-44"
        {...sectionFloatMotion(reduceMotion, { amount: 0.2 })}
      >
        <div className="mx-auto grid max-w-[var(--content-max)] grid-cols-1 gap-10 sm:gap-12 md:gap-14 lg:grid-cols-2 lg:items-start lg:gap-x-16 xl:gap-x-20 lg:gap-y-10">
          <motion.h2
            id="footer-contact-heading"
            className="font-editorial text-[clamp(1.65rem,6vw,3.75rem)] font-bold leading-[1.08] text-white lg:pt-0"
            initial={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 64 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={reduceMotion ? { duration: 0 } : LUXURY_SPRING}
          >
            Let&apos;s work together.
          </motion.h2>

          <div className="lg:max-w-md">
            <p className="mb-8 text-[0.65rem] font-semibold uppercase tracking-[-0.05em] text-white/75 lg:mb-10">
              Contact
            </p>
            <ul className="flex flex-col gap-9">
              {CONTACT_LINKS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={
                    reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { ...LUXURY_SPRING, delay: 0.08 + i * 0.06 }
                  }
                >
                  <span className="mb-1.5 block text-base font-medium text-white/90">
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    className="footer-contact-link break-words text-[0.875rem] text-white sm:text-[0.9375rem]"
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      item.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
