"use client";

import { NAV_LINKS, SITE } from "@/lib/data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-500 sm:px-6 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <nav
          className={`glass-nav mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-3 sm:px-6 ${
            scrolled ? "scale-[0.98]" : ""
          }`}
          aria-label="Primary"
        >
          <Link
            href="#top"
            className="font-script text-2xl text-gold transition-colors hover:text-gold-light sm:text-[1.65rem]"
          >
            {SITE.name.split(" ")[0]}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative inline-flex min-h-10 items-center px-4 text-sm font-medium text-cream/80 transition-colors hover:text-gold-light"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button href="#contact" variant="gold">
              Let&apos;s Talk
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gold/20 text-gold-light md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden>
              <path
                d="M0 1h20M0 7h20M0 13h20"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-dvh w-[min(20rem,88vw)] flex-col gap-6 border-l border-gold/15 bg-[#0a0612]/98 p-6 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", damping: 32, stiffness: 320 }}
            >
              <ul className="mt-16 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block rounded-lg px-4 py-3 text-lg font-medium text-cream hover:bg-gold/10"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button href="#contact" variant="gold" className="w-full justify-center">
                Let&apos;s Talk
              </Button>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
