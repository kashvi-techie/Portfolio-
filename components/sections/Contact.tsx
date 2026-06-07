"use client";

import { PeacockFeather } from "@/components/decor/PeacockFeather";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SITE } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { send } from "@emailjs/browser";

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [isConfigured, setIsConfigured] = useState(true);

  // Hook to check credentials on client-side mounting
  useEffect(() => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS Keys are missing in client environment context.");
      setIsConfigured(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Live runtime environment capturing
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

    // Debug logging to look inside your console log
    console.log("Captured Credentials:", { serviceId, templateId, publicKey });

    if (!serviceId || !templateId || !publicKey) {
      console.error("Submission blocked: Environment variables are undefined.");
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");

    setStatus("sending");

    send(
      serviceId,
      templateId,
      {
        from_name: name,
        from_email: email,
        message: message,
        reply_to: email,
      },
      publicKey
    )
    .then((res) => {
      console.log("EmailJS Success Response:", res);
      form.reset();
      setStatus("sent");
    })
    .catch((error) => {
      console.error("EmailJS network error details:", error);
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
            <h2 className="font-editorial mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight text-cream">
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
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold-light"
              >
                <Github className="h-4 w-4 text-gold" /> GitHub
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold-light"
              >
                <Linkedin className="h-4 w-4 text-gold" /> LinkedIn
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold-light"
              >
                <Mail className="h-4 w-4 text-gold" /> Email
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
                <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-cream outline-none transition focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-cream outline-none transition focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-cream outline-none transition focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  rows={4}
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-gold w-full rounded-full py-3.5 text-sm font-semibold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message sent!"}
                {status === "error" && "Retry"}
              </button>
              {status === "sent" && (
                <p className="mt-3 text-sm text-[#9cd5ff]">Thanks! Your message was sent successfully.</p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm text-[#f59e0b]">
                  Something went wrong. Please check your console logs or verify your <code>.env.local</code> setup.
                </p>
              )}
              {!isConfigured && (
                <p className="mt-3 text-xs text-[#ff6b6b]">
                  Warning: Environment keys detected as empty in your current terminal session.
                </p>
              )}
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
