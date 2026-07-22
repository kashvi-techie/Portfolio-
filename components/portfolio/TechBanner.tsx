'use client';

import { motion } from 'framer-motion';

const technologies = [
  { name: 'Next.js', logo: '/logos/nextjs.svg' },
  { name: 'TypeScript', logo: '/logos/typescript.svg' },
  { name: 'React', logo: '/logos/react.svg' },
  { name: 'Tailwind CSS', logo: '/logos/tailwind.svg' },
  { name: 'Node.js', logo: '/logos/nodejs.svg' },
  { name: 'Figma', logo: '/logos/figma.svg' },
  { name: 'Vercel', logo: '/logos/vercel.svg' },
  { name: 'GSAP', logo: '/logos/greensock.svg' },
  { name: 'Framer Motion', logo: '/logos/framer.svg' },
  { name: 'Gemini API', logo: '/logos/gemini.svg' },
] as const;

const marqueeItems = [...technologies, ...technologies, ...technologies];

type Technology = (typeof technologies)[number];

function TechnologyPill({ tech }: { tech: Technology }) {
  return (
    <li className="flex shrink-0 items-center gap-x-3 rounded-full border border-gold-300/15 bg-forest-950/35 px-5 py-2.5 shadow-[inset_0_0_0_1px_rgba(248,243,235,0.035)] backdrop-blur-md">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-300/10 shadow-[0_0_24px_rgba(233,196,106,0.12)]">
        <img src={tech.logo} alt="" width={20} height={20} loading="lazy" decoding="async" className="h-5 w-5 object-contain drop-shadow-[0_0_5px_rgba(233,196,106,0.35)]" />
      </span>
      <span className="whitespace-nowrap font-sans text-[0.82rem] tracking-[0.06em] text-lotus-cream/75">{tech.name}</span>
    </li>
  );
}

export default function TechBanner() {
  return (
    <section className="relative z-10 overflow-hidden border-y border-gold-300/10 bg-forest-900/70 py-5" aria-label="Technologies I work with">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden items-center bg-gradient-to-r from-forest-900 via-forest-900/95 to-transparent pr-12 md:flex">
        <div className="ml-8 flex items-center gap-3">
          <span className="h-7 w-px bg-gold-300/45" />
          <span className="whitespace-nowrap font-sans text-[0.58rem] uppercase tracking-[0.26em] text-gold-300/75">Technologies I work with</span>
        </div>
      </div>

      <div
        className="overflow-hidden pl-0 md:pl-64"
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 9%, #000 91%, transparent 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, #000 9%, #000 91%, transparent 100%)',
        }}
      >
        <motion.ul
          className="flex w-max items-center gap-x-6"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        >
          {marqueeItems.map((tech, index) => (
            <TechnologyPill key={`${tech.name}-${index}`} tech={tech} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
