'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, KeyboardEvent, useMemo, useState } from 'react';

type CommandAction = 'navigate' | 'filter' | 'answer';

type CommandSuggestion = {
  command: string;
  label: string;
  detail: string;
  action: CommandAction;
  target?: string;
  query?: string;
  answer?: string;
};

const PROFILE_ANSWERS = [
  {
    keywords: ['where', 'based', 'location', 'city'],
    answer: 'Kashvi is building from India and works remotely with AI-native product teams.',
  },
  {
    keywords: ['gemini', 'ai', 'api'],
    answer: 'Kashvi builds AI-native products with the Gemini API, including OmniPost AI and LuxeGen.',
  },
  {
    keywords: ['omnipost', 'projects', 'work'],
    answer: 'OmniPost AI is an AI content distribution dashboard with semantic retrieval, Gemini API workflows, and real-time monitoring.',
  },
  {
    keywords: ['luxegen', 'design', 'code'],
    answer: 'LuxeGen is an AI design-to-code workspace that turns prompts into production-ready UI with dynamic rendering pipelines.',
  },
  {
    keywords: ['skills', 'stack', 'technology'],
    answer: 'Her core stack includes Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion, Vercel, and Gemini API integrations.',
  },
];

const COMMANDS: CommandSuggestion[] = [
  { command: '/projects', label: 'Jump to featured work', detail: 'Scroll to the projects grid', action: 'navigate', target: '#work' },
  { command: '/projects ai', label: 'Filter AI projects', detail: 'Show OmniPost AI, LuxeGen, JISSI', action: 'filter', target: '#work', query: 'ai' },
  { command: '/skills', label: 'Open capabilities', detail: 'Scroll to the 3D lotus skills section', action: 'navigate', target: '#skills' },
  { command: '/contact', label: 'Start a conversation', detail: 'Scroll to contact', action: 'navigate', target: '#contact' },
  { command: 'Where is Kashvi based?', label: 'Ask about Kashvi', detail: 'Client-side semantic answer', action: 'answer' },
];

function getLocalAnswer(input: string) {
  const normalized = input.toLowerCase();
  const best = PROFILE_ANSWERS.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
  return best?.answer ?? 'Try /projects, /projects ai, /skills, or ask about Kashvi\'s AI work, stack, or location.';
}

function getSuggestions(input: string) {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return COMMANDS.slice(0, 4);

  return COMMANDS.filter((item) => {
    const haystack = `${item.command} ${item.label} ${item.detail}`.toLowerCase();
    return haystack.includes(normalized) || normalized.includes(item.command);
  }).slice(0, 4);
}

function dispatchProjectFilter(query: string) {
  window.dispatchEvent(new CustomEvent('portfolio:project-filter', { detail: { query } }));
}

function navigateTo(target?: string) {
  if (!target) return;
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function AICommandPalette() {
  const [value, setValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState('Type /projects ai, /skills, or ask: Where is Kashvi based?');
  const suggestions = useMemo(() => getSuggestions(value), [value]);

  const runCommand = async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const exact = COMMANDS.find((item) => item.command.toLowerCase() === trimmed.toLowerCase());
    const command = exact ?? suggestions[0];

    if (trimmed.startsWith('/')) {
      if (command?.action === 'filter') {
        dispatchProjectFilter(command.query ?? 'ai');
        navigateTo(command.target);
        setResponse('Filtered featured work to AI-native projects. Use /projects to reset the view.');
        return;
      }

      if (command?.action === 'navigate') {
        if (trimmed === '/projects') dispatchProjectFilter('all');
        navigateTo(command.target);
        setResponse(command.detail);
        return;
      }
    }

    setIsThinking(true);
    setResponse('Thinking through Kashvi\'s portfolio context...');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = (await res.json()) as { answer?: string };
      setResponse(data.answer || getLocalAnswer(trimmed));
    } catch {
      setResponse(getLocalAnswer(trimmed));
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runCommand(value);
  };

  const handleSuggestion = (suggestion: CommandSuggestion) => {
    setValue(suggestion.command);
    void runCommand(suggestion.command);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' && suggestions[0]) {
      event.preventDefault();
      setValue(suggestions[0].command);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.32, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mt-7 w-full max-w-[470px] rounded-lg border border-gold-300/20 bg-forest-950/45 p-2.5 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl"
    >
      <div className="flex items-center gap-2 border-b border-gold-300/10 px-2 pb-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.85)]" />
        <p className="font-sans text-[0.58rem] uppercase tracking-[0.24em] text-gold-300/75">AI Command Palette</p>
        <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 font-sans text-[0.58rem] uppercase tracking-[0.12em] text-white/35">Gemini-ready</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-2 flex min-h-[48px] items-center gap-2 rounded-md border border-white/10 bg-white/[0.055] px-3 transition focus-within:border-gold-300/45 focus-within:bg-white/[0.075]">
        <span className="font-mono text-sm text-gold-300/80">/</span>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Try "/projects ai" or ask "Where is Kashvi based?"'
          className="h-11 min-w-0 flex-1 bg-transparent font-sans text-sm text-lotus-cream outline-none placeholder:text-lotus-cream/32"
          aria-label="Ask Kashvi portfolio command palette"
        />
        <button type="submit" className="shrink-0 rounded-full border border-gold-300/25 px-3 py-1.5 font-sans text-[0.65rem] uppercase tracking-[0.14em] text-gold-300/80 transition hover:border-gold-300/55 hover:bg-gold-300/10 hover:text-gold-300">
          Run
        </button>
      </form>

      <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.command}
            type="button"
            onClick={() => handleSuggestion(suggestion)}
            className="group rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-left transition hover:border-gold-300/25 hover:bg-gold-300/[0.07]"
          >
            <span className="block font-mono text-[0.72rem] text-gold-300/80">{suggestion.command}</span>
            <span className="mt-0.5 block truncate font-sans text-[0.68rem] text-lotus-cream/46 group-hover:text-lotus-cream/68">{suggestion.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={response}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="mt-2 rounded-md border border-peacock-600/25 bg-peacock-800/[0.12] px-3 py-2.5 font-sans text-[0.74rem] leading-5 text-lotus-cream/64"
          aria-live="polite"
        >
          {isThinking ? 'Thinking...' : response}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
