"use client";

import { PeacockFeather } from "@/components/decor/PeacockFeather";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SITE } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { init, send } from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
const EMAILJS_CONFIGURED =
  ![EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY].some((value) =>
    value.startsWith("YOUR_")
  );

init(EMAILJS_PUBLIC_KEY);

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");

    if (!EMAILJS_CONFIGURED) {
      console.error("EmailJS environment variables are not configured.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      message,
      reply_to: email,
    })
      .then(() => {
        form.reset();
        setStatus("sent");
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setStatus("error");
      });
  };

  return (
    <section id="contact" className="section-pad scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <PeacockFeather className="pointer-events-none absolute -right-4 top-0 hidden h-80 w-24 lg:block" />

          <ScrollReveal>
            <p className="eyebrow">Contact</p>
            <h2 className="font-editorial mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight text-[#f5f0e6]">
              Let&apos;s create something extraordinary together.
            </h2>
            <p className="font-script mt-8 text-4xl text-gold sm:text-5xl">
              {SITE.name}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#9ca3af] transition-colors hover:text-[#e8d48b]"
              >
                <Github className="h-4 w-4 text-[#c9a227]" /> GitHub
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#9ca3af] transition-colors hover:text-[#e8d48b]"
              >
                <Linkedin className="h-4 w-4 text-[#c9a227]" /> LinkedIn
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-sm text-[#9ca3af] transition-colors hover:text-[#e8d48b]"
              >
                <Mail className="h-4 w-4 text-[#c9a227]" /> Email
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <motion.form
              onSubmit={handleSubmit}
              className="glass-card glow-border space-y-5 rounded-2xl p-6 sm:p-8"
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5f0e6] outline-none transition focus:border-[#c9a227]/50 focus:ring-1 focus:ring-[#c9a227]/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5f0e6] outline-none transition focus:border-[#c9a227]/50 focus:ring-1 focus:ring-[#c9a227]/30"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#f5f0e6] outline-none transition focus:border-[#c9a227]/50 focus:ring-1 focus:ring-[#c9a227]/30"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending" || !EMAILJS_CONFIGURED}
                className="btn-gold w-full rounded-full py-3.5 text-sm font-semibold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "idle" && (EMAILJS_CONFIGURED ? "Send Message" : "EmailJS not configured")}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message sent!"}
                {status === "error" && "Retry"}
              </button>
              {status === "sent" && (
                <p className="mt-3 text-sm text-[#9cd5ff]">Thanks! Your message was sent successfully.</p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm text-[#f59e0b]">
                  EmailJS is not configured. Copy <code>.env.local.example</code> to{' '}
                  <code>.env.local</code> and set your EmailJS IDs.
                </p>
              )}
              {!EMAILJS_CONFIGURED && status === "idle" && (
                <p className="mt-3 text-sm text-[#f59e0b]">
                  EmailJS is not configured. Copy <code>.env.local.example</code> to{' '}
                  <code>.env.local</code> and set your EmailJS IDs.
                </p>
              )}
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
