"use client";

import { SITE } from "@/lib/data";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#c9a227]/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <p className="text-xs text-[#9ca3af]">
          © {year} {SITE.name}. Crafted with Next.js 15 & AI-native workflows.
        </p>

        <div className="flex items-center gap-5">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9ca3af] transition-colors hover:text-[#e8d48b]"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9ca3af] transition-colors hover:text-[#e8d48b]"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-[#9ca3af] transition-colors hover:text-[#e8d48b]"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="#top"
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a227]/25 text-[#c9a227] transition-colors hover:bg-[#c9a227]/10"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
