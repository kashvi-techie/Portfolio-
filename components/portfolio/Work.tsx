'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import SorteddMeshGrid from '@/components/portfolio/SorteddMeshGrid';
import JissiAudioWave from '@/components/portfolio/JissiAudioWave';

const projects = [
  {
    number: '01',
    title: 'Sortedd',
    subtitle: 'Luxury Concierge Platform',
    description: 'Performance optimization and migration for a luxury concierge platform. Improved PageSpeed from 65 to 92 and reduced bundle size by 30%.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    metrics: ['Lighthouse 92', 'Next.js 15', '-30% bundle'],
    href: 'https://www.sortedd.in/',
    visual: 'mesh',
  },
  {
    number: '02',
    title: 'OmniPost AI',
    subtitle: 'AI Content Dashboard',
    description: 'AI-powered content distribution platform with real-time monitoring, semantic retrieval pipelines, and a glassmorphic reactive interface.',
    tags: ['Next.js', 'Gemini API', 'VectorShift'],
    metrics: ['Gemini API', 'Realtime', 'Automation'],
    href: 'https://omni-post-ai-beryl.vercel.app/',
    visual: 'orb',
  },
  {
    number: '03',
    title: 'LuxeGen',
    subtitle: 'AI Design-to-Code Workspace',
    description: 'AI-native workspace that turns prompts into production-ready UI with visual feedback and dynamic rendering flows.',
    tags: ['TypeScript', 'Gemini API', 'Vercel'],
    metrics: ['Prompt to UI', 'Edge ready', 'Fast preview'],
    href: 'https://ai-image-to-saa-s-product-generator.vercel.app/',
    visual: 'lotus',
  },
  {
    number: '04',
    title: 'Pslyther',
    subtitle: 'AI Productivity Companion',
    description: 'Animated AI companion that reacts to user activity, follows cursor movement, and makes focus sessions more engaging.',
    tags: ['TypeScript', 'Framer Motion', 'Vercel'],
    metrics: ['60fps motion', 'Companion UI', 'Focus'],
    href: 'https://pslytherr.vercel.app/',
    visual: 'calm',
  },
  {
    number: '05',
    title: 'JISSI',
    subtitle: 'AI Voice Assistant (Mobile)',
    description: 'Cross-platform voice assistant built with Expo and React Native, including speech-to-text input, an LLM core, and text-to-speech output.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Gemini'],
    metrics: ['Voice I/O', 'LLM core', 'Mobile'],
    href: 'https://github.com/kashvi-techie/Jissi',
    visual: 'wave',
  },
] as const;

type Project = (typeof projects)[number];

export default function Work() {
  const [projectFilter, setProjectFilter] = useState('all');

  useEffect(() => {
    const handleFilter = (event: Event) => {
      const query = (event as CustomEvent<{ query?: string }>).detail?.query?.toLowerCase() || 'all';
      setProjectFilter(query);
    };
    window.addEventListener('portfolio:project-filter', handleFilter);
    return () => window.removeEventListener('portfolio:project-filter', handleFilter);
  }, []);

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter((project) => `${project.title} ${project.subtitle} ${project.description} ${project.tags.join(' ')} ${project.metrics.join(' ')}`.toLowerCase().includes(projectFilter));

  return (
    <section id="work" className="relative overflow-hidden bg-[linear-gradient(180deg,#0b1612_0%,#102019_100%)] px-6 py-24 md:px-10 lg:px-14">
      <div className="pointer-events-none absolute right-0 top-0 h-[34rem] w-[48rem] bg-[radial-gradient(circle_at_62%_45%,rgba(224,196,114,0.1),transparent_52%)]" />
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}>
            <p className="mb-5 flex items-center gap-4 font-sans text-[0.68rem] uppercase tracking-[0.28em] text-gold-300"><span className="h-px w-14 bg-gold-300/55" /> Featured Work</p>
            <h2 className="max-w-[560px] font-serif text-[clamp(2.5rem,5vw,4.8rem)] font-normal leading-[1.08] text-lotus-cream">Crafting products that create <span className="italic text-gold-300">impact.</span></h2>
          </motion.div>
          <motion.p className="max-w-[430px] font-sans text-sm leading-7 text-lotus-cream/50 lg:justify-self-end" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.75, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}>
            A selection of recent work where design, technology, and AI-native product systems come together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} className={index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, className }: { project: Project; index: number; className: string }) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(circle at ${x}% ${y}%, rgba(224,196,114,0.2), transparent 34%)`;

  return (
    <motion.article
      className={`group relative min-h-[360px] overflow-hidden rounded-lg border border-gold-300/15 bg-neutral-950/40 p-6 shadow-[inset_0_0_0_1px_rgba(248,243,235,0.035)] backdrop-blur-xl ${className}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width) * 100);
        y.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glow }} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_90%_12%,rgba(31,122,132,0.16),transparent_34%)]" />
      {project.visual === 'mesh' && <SorteddMeshGrid />}
      {project.visual === 'wave' && <JissiAudioWave active={hovered} />}
      {project.visual === 'orb' && <div className="absolute right-10 top-16 h-32 w-32 rounded-full border border-gold-300/15 bg-[radial-gradient(circle,rgba(224,196,114,0.34),rgba(31,122,132,0.08)_42%,transparent_70%)] blur-[0.2px]" />}
      {project.visual === 'lotus' && <LotusMark />}
      {project.visual === 'calm' && <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(100deg,transparent,rgba(224,196,114,0.08))]" />}

      <div className="relative z-10 flex h-full min-h-[312px] flex-col justify-between">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-4 font-serif text-sm tracking-[0.16em] text-gold-300/70">{project.number}<span className="h-px w-10 bg-gold-300/30" /></p>
            <h3 className="mt-10 font-serif text-3xl font-normal text-lotus-cream md:text-4xl">{project.title}</h3>
            <p className="mt-3 font-sans text-[0.67rem] uppercase tracking-[0.2em] text-gold-300/80">{project.subtitle}</p>
          </div>
          <motion.a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-300/25 text-gold-300 transition-colors group-hover:border-gold-300/60 group-hover:bg-gold-300/10" animate={{ rotate: hovered ? 45 : 0 }} transition={{ type: 'spring', stiffness: 220, damping: 16 }} onClick={(event) => event.stopPropagation()}>
            <ArrowUpRight size={18} />
          </motion.a>
        </div>

        <div className="relative z-10 max-w-[560px]">
          <p className="font-sans text-sm leading-7 text-lotus-cream/52">{project.description}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-gold-300/14 bg-gold-300/7 px-3 py-1.5 font-sans text-[0.64rem] tracking-[0.06em] text-lotus-cream/58">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function LotusMark() {
  return (
    <svg viewBox="0 0 120 120" className="pointer-events-none absolute right-8 top-8 h-28 w-28 text-gold-300/28" fill="none">
      <path d="M60 18c0 0-22 18-22 40s22 34 22 34 22-12 22-34S60 18 60 18z" stroke="currentColor" />
      <path d="M38 58c-26 0-34 20-34 20s24 18 42 6M82 58c26 0 34 20 34 20s-24 18-42 6" stroke="currentColor" />
    </svg>
  );
}