'use client';

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

function TechnologyItem({ tech }: { tech: (typeof technologies)[number] }) {
  return (
    <li className="tech-item">
      <img src={tech.logo} alt="" width={20} height={20} loading="lazy" decoding="async" />
      <span>{tech.name}</span>
    </li>
  );
}

export default function TechBanner() {
  return (
    <section className="tech-banner" aria-label="Technologies I work with">
      <div className="tech-label" aria-hidden="true">
        <div />
        <span>Technologies I work with</span>
      </div>

      <div className="tech-marquee" role="list" style={{ '--tech-count': technologies.length } as React.CSSProperties}>
        <ul className="tech-track" aria-label="Technologies">
          {technologies.map((tech) => (
            <TechnologyItem key={tech.name} tech={tech} />
          ))}
        </ul>
        <ul className="tech-track" aria-hidden="true">
          {technologies.map((tech) => (
            <TechnologyItem key={`${tech.name}-duplicate`} tech={tech} />
          ))}
        </ul>
      </div>

      <style jsx>{`
        .tech-banner {
          --banner-bg: rgba(19, 38, 29, 0.7);
          --item-width: clamp(156px, 14vw, 212px);
          --track-duration: 26s;
          position: relative;
          z-index: 10;
          min-height: 76px;
          padding: 1.25rem 0;
          overflow: hidden;
          background: var(--banner-bg);
          border-top: 1px solid rgba(233, 196, 106, 0.12);
          border-bottom: 1px solid rgba(233, 196, 106, 0.12);
          contain: layout paint;
        }
        .tech-banner::before,
        .tech-banner::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 20;
          width: clamp(56px, 8vw, 120px);
          pointer-events: none;
        }
        .tech-banner::before {
          left: 0;
          background: linear-gradient(to right, rgba(19, 38, 29, 0.95), transparent);
        }
        .tech-banner::after {
          right: 0;
          background: linear-gradient(to left, rgba(19, 38, 29, 0.95), transparent);
        }
        .tech-label {
          position: absolute;
          left: 2rem;
          top: 50%;
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-right: 1.5rem;
          transform: translateY(-50%);
          background: rgba(19, 38, 29, 0.97);
        }
        .tech-label div {
          width: 1px;
          height: 24px;
          background: rgba(233, 196, 106, 0.4);
        }
        .tech-label span {
          font-family: Inter, sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(233, 196, 106, 0.75);
          white-space: nowrap;
        }
        .tech-marquee {
          display: flex;
          width: max-content;
          padding-left: 240px;
          will-change: transform;
          animation: techMarquee var(--track-duration) linear infinite;
        }
        .tech-marquee:hover {
          animation-play-state: paused;
        }
        .tech-track {
          display: flex;
          align-items: center;
          min-width: calc(var(--tech-count) * var(--item-width));
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .tech-item {
          display: flex;
          flex: 0 0 var(--item-width);
          align-items: center;
          gap: 0.7rem;
          min-height: 34px;
          padding: 0 1.75rem;
          border-right: 1px solid rgba(233, 196, 106, 0.12);
        }
        .tech-item img {
          display: block;
          width: 20px;
          height: 20px;
          flex: 0 0 20px;
          object-fit: contain;
          opacity: 0.85;
          filter: drop-shadow(0 0 4px rgba(233, 196, 106, 0.25));
        }
        .tech-item span {
          font-family: Inter, sans-serif;
          font-size: 0.82rem;
          line-height: 1;
          letter-spacing: 0.05em;
          color: rgba(251, 247, 240, 0.72);
          white-space: nowrap;
        }
        @keyframes techMarquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(calc(var(--tech-count) * var(--item-width) * -1), 0, 0); }
        }
        @media (max-width: 640px) {
          .tech-banner { min-height: 68px; padding: 1rem 0; }
          .tech-label { display: none; }
          .tech-marquee { padding-left: 0; }
          .tech-item { padding: 0 1.25rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-marquee {
            width: 100%;
            overflow-x: auto;
            animation: none;
          }
          .tech-track[aria-hidden='true'] { display: none; }
        }
      `}</style>
    </section>
  );
}
