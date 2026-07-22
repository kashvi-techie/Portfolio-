'use client';

import { isValidElement } from 'react';
import type { ReactNode } from 'react';

type Technology = {
  name: string;
  shortName: string;
  accent: string;
  icon: ReactNode;
};

function SafeTechGlyph({ label, accent }: { label: string; accent: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-5 w-5 shrink-0 overflow-visible">
      <circle cx="20" cy="20" r="17" fill="rgba(224,196,114,0.08)" stroke="rgba(224,196,114,0.28)" strokeWidth="1" />
      <circle cx="20" cy="20" r="9" fill={accent} opacity="0.16" />
      <text x="20" y="24" textAnchor="middle" className="fill-gold-300 font-sans text-[11px] font-medium tracking-normal">
        {label}
      </text>
    </svg>
  );
}

const technologies: Technology[] = [
  { name: 'Next.js', shortName: 'N', accent: '#ffffff', icon: <SafeTechGlyph label="N" accent="#ffffff" /> },
  { name: 'TypeScript', shortName: 'TS', accent: '#3178c6', icon: <SafeTechGlyph label="TS" accent="#3178c6" /> },
  { name: 'React', shortName: 'R', accent: '#61dafb', icon: <SafeTechGlyph label="R" accent="#61dafb" /> },
  { name: 'Tailwind CSS', shortName: 'TW', accent: '#38bdf8', icon: <SafeTechGlyph label="TW" accent="#38bdf8" /> },
  { name: 'Node.js', shortName: 'ND', accent: '#68a063', icon: <SafeTechGlyph label="ND" accent="#68a063" /> },
  { name: 'Figma', shortName: 'FG', accent: '#f24e1e', icon: <SafeTechGlyph label="FG" accent="#f24e1e" /> },
  { name: 'Vercel', shortName: 'V', accent: '#ffffff', icon: <SafeTechGlyph label="V" accent="#ffffff" /> },
  { name: 'GSAP', shortName: 'G', accent: '#88ce02', icon: <SafeTechGlyph label="G" accent="#88ce02" /> },
  { name: 'Framer Motion', shortName: 'FM', accent: '#bb86fc', icon: <SafeTechGlyph label="FM" accent="#bb86fc" /> },
  { name: 'Gemini API', shortName: 'AI', accent: '#8ab4f8', icon: <SafeTechGlyph label="AI" accent="#8ab4f8" /> },
];

function fallbackIcon(tech: Technology) {
  return <SafeTechGlyph label={tech.shortName} accent={tech.accent} />;
}

function TechnologyBadge({ tech }: { tech: Technology }) {
  const safeIcon = isValidElement(tech.icon) ? tech.icon : fallbackIcon(tech);

  return (
    <li className="flex min-h-11 shrink-0 items-center gap-3 rounded-full border border-gold-300/16 bg-forest-950/42 px-4 py-2 shadow-[inset_0_0_0_1px_rgba(248,243,235,0.035),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors duration-300 hover:border-gold-300/34 hover:bg-forest-900/70">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-300/8 text-gold-300">
        {safeIcon}
      </span>
      <span className="whitespace-nowrap font-sans text-[0.78rem] tracking-[0.06em] text-lotus-cream/76">
        {tech.name}
      </span>
    </li>
  );
}

export default function TechBanner() {
  return (
    <section className="relative w-full bg-forest-900 px-6 py-6 md:px-10 lg:px-14" aria-label="Technologies I work with">
      <div className="mx-auto max-w-[1400px]">
        <p className="mx-auto flex w-fit items-center gap-3 font-sans text-[0.62rem] uppercase tracking-[0.26em] text-gold-300/72">
          <span className="h-px w-10 bg-gold-300/45" />
          Technologies I work with
          <span className="h-px w-10 bg-gold-300/45" />
        </p>

        <ul className="relative mt-12 flex w-full flex-wrap justify-center gap-4 py-4" role="list">
          {technologies.map((tech) => (
            <TechnologyBadge key={tech.name} tech={tech} />
          ))}
        </ul>
      </div>
    </section>
  );
}
