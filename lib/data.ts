export const SITE = {
  name: "Kashvi Pundir",
  title: "AI-Native Product Designer & Engineer",
  email: "kashvipcm@gmail.com",
  github: "https://github.com/kashvi-techie",
  linkedin: "https://www.linkedin.com/in/kashvi-pundir-3502183b1",
  resume: "https://drive.google.com/file/d/1xA5oilQ8cKMq1D1ZkWESv2Hbu63ROQZF/view?usp=sharing",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Systems", href: "#systems" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const ABOUT_CARDS = [
  {
    title: "Ship-first Mindset",
    body: "Launch early, learn fast — shipping real products beats polishing decks.",
    icon: "rocket",
  },
  {
    title: "Performance Obsessed",
    body: "Lighthouse 92 PageSpeed — speed and clarity as product features, not afterthoughts.",
    icon: "gauge",
  },
  {
    title: "AI-Powered Workflow",
    body: "From prompt to UI with Cursor and Gemini — design intelligence wired into the build.",
    icon: "sparkles",
  },
] as const;

export const STATS = [
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: 92, suffix: "", label: "PageSpeed Score" },
  { value: 30, suffix: "%", label: "Smaller Bundle Size" },
  { value: 100, suffix: "%", label: "Design to Code Match" },
] as const;

export const PROJECTS = [
  {
    id: "omnipost",
    title: "OmniPost AI",
    tagline: "Multi-platform AI content engine",
    description:
      "Edge-native publishing pipeline with streaming AI generation, platform dispatch, and real-time metrics.",
    tags: ["Next.js 15", "Tailwind v4", "Framer Motion"],
    metrics: ["92 PageSpeed", "−30% bundle", "100% match"],
    liveHref: "https://omni-post-ai-beryl.vercel.app/",
    featured: true,
    accent: "from-violet-600/40 to-fuchsia-900/30",
  },
  {
    id: "luxegen",
    title: "LuxeGen",
    tagline: "AI design-to-code · live",
    description:
      "Resilient pipeline converting unstable LLM output into render-safe React components.",
    tags: ["Gemini API", "Regex Sanitizer", "Stream Guard"],
    metrics: ["Zero-crash previews", "429-aware backoff"],
    liveHref:
      "https://ai-image-to-saa-s-product-generator-py8tkvdoe.vercel.app/",
    featured: false,
    accent: "from-amber-600/30 to-violet-900/40",
  },
  {
    id: "sortedd",
    title: "Sortedd",
    tagline: "Luxury concierge · live",
    description:
      "Premium UX flows with production-safe frontend architecture and editorial polish.",
    tags: ["Next.js 15", "Tailwind v4", "Premium UX"],
    metrics: ["65 → 92 PageSpeed", "−30% bundle"],
    liveHref: "https://www.sortedd.in/",
    featured: false,
    accent: "from-teal-600/25 to-violet-900/35",
  },
] as const;

export const FEATURED_FEATURES = [
  "Edge Route Handlers with streaming responses",
  "AI content generation via Gemini 1.5 API",
  "Multi-platform dispatch (Twitter, LinkedIn)",
  "Real-time monitoring & metrics dashboard",
  "Custom regex sanitizers for stable JSX output",
] as const;

export const SYSTEM_NODES = [
  {
    id: "input",
    label: "User Input",
    sub: "Prompts · media · scheduling",
    row: 0,
    col: 0,
  },
  {
    id: "ai",
    label: "AI Processing Layer",
    sub: "Gemini 1.5 API · content gen",
    row: 0,
    col: 1,
  },
  {
    id: "edge",
    label: "Edge API Layer",
    sub: "Next.js Route Handlers",
    row: 0,
    col: 2,
  },
  {
    id: "dispatch",
    label: "Dispatch Engine",
    sub: "Twitter · LinkedIn · queues",
    row: 0,
    col: 3,
  },
  {
    id: "monitor",
    label: "Monitoring & Metrics",
    sub: "PageSpeed · bundle · uptime",
    row: 1,
    col: 0,
    span: 4,
  },
] as const;

export const EXPERIENCE = [
  {
    year: "2026",
    role: "Design & Dev Intern",
    company: "MythyaVerse",
    type: "INTERNSHIP",
    period: "Jan 12 – Apr 17, 2026",
    bullets: [
      "Wireframes, high-fidelity mockups, and interactive prototypes for web & mobile.",
      "User research and usability testing to validate core product flows.",
      "Collaborated with engineering to ensure design feasibility and consistency.",
    ],
  },
  {
    year: "2025",
    role: "Freelance Product Designer",
    company: "Independent",
    type: "CONTRACT",
    period: "2025",
    bullets: [
      "End-to-end design systems and Next.js implementations for startup clients.",
      "Shipped luxury concierge and AI-native SaaS interfaces to production.",
    ],
  },
] as const;

export const TOOLS = [
  { label: "Figma", logo: "https://cdn.simpleicons.org/figma/C9A227" },
  { label: "Next.js 15", logo: "https://cdn.simpleicons.org/nextdotjs/C9A227" },
  { label: "Tailwind v4", logo: "https://cdn.simpleicons.org/tailwindcss/C9A227" },
  { label: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/C9A227" },
  { label: "Framer Motion", logo: "https://cdn.simpleicons.org/framer/C9A227" },
  { label: "GSAP", logo: "https://cdn.simpleicons.org/greensock/C9A227" },
  { label: "Vercel", logo: "https://cdn.simpleicons.org/vercel/C9A227" },
  { label: "Gemini API", logo: "https://cdn.simpleicons.org/googlegemini/C9A227" },
] as const;
