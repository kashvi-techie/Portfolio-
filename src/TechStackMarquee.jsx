const STACK_ITEMS = [
  {
    label: "Next.js 15",
    logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
  },
  {
    label: "Tailwind v4",
    logo: "https://cdn.simpleicons.org/tailwindcss/FFFFFF",
  },
  {
    label: "TypeScript",
    logo: "https://cdn.simpleicons.org/typescript/FFFFFF",
  },
  {
    label: "Figma",
    logo: "https://cdn.simpleicons.org/figma/FFFFFF",
  },
  {
    label: "Gemini API",
    logo: "https://cdn.simpleicons.org/googlegemini/FFFFFF",
  },
  {
    label: "Framer Motion",
    logo: "https://cdn.simpleicons.org/framer/FFFFFF",
  },
  {
    label: "GSAP",
    logo: "https://cdn.simpleicons.org/greensock/FFFFFF",
  },
  {
    label: "Vercel",
    logo: "https://cdn.simpleicons.org/vercel/FFFFFF",
  },
  {
    label: "Cursor",
    logo: "https://cdn.simpleicons.org/cursor/FFFFFF",
  },
];

export function TechStackMarquee() {
  const loopItems = [...STACK_ITEMS, ...STACK_ITEMS];

  return (
    <div className="tech-marquee-shell" aria-label="Core tech stack">
      <ul className="tech-marquee-track">
        {loopItems.map(({ label, logo }, idx) => (
          <li key={`${label}-${idx}`} className="tech-stack-card">
            <span className="stack-logo-wrap" aria-hidden>
              <img
                src={logo}
                alt=""
                className="stack-logo"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="tech-stack-card__label">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
