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
];

export default function TechBanner() {
  const doubled = [...technologies, ...technologies];

  return (
    <section
      style={{
        background: 'rgba(19, 38, 29, 0.7)',
        borderTop: '1px solid rgba(233, 196, 106, 0.12)',
        borderBottom: '1px solid rgba(233, 196, 106, 0.12)',
        padding: '1.4rem 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Label */}
      <div
        style={{
          position: 'absolute',
          left: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          background: 'rgba(19, 38, 29, 0.97)',
          paddingRight: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
        className="tech-label"
      >
        <div style={{ width: '1px', height: '24px', background: 'rgba(233, 196, 106, 0.4)' }} />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.58rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(233, 196, 106, 0.75)',
            whiteSpace: 'nowrap',
          }}
        >
          Technologies I work with
        </span>
      </div>

      {/* Ticker */}
      <div style={{ paddingLeft: '240px', overflow: 'hidden' }} className="tech-ticker-wrap">
        <div
          className="ticker-track"
          style={{ display: 'flex', gap: '0', width: 'max-content' }}
        >
          {doubled.map((tech, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0 2rem',
                borderRight: '1px solid rgba(233, 196, 106, 0.12)',
                flexShrink: 0,
              }}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                width={20}
                height={20}
                style={{
                  width: '20px',
                  height: '20px',
                  objectFit: 'contain',
                  opacity: 0.85,
                  filter: 'drop-shadow(0 0 4px rgba(233,196,106,0.25))',
                }}
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.82rem',
                  color: 'rgba(251, 247, 240, 0.72)',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right fade */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '80px',
          background: 'linear-gradient(to left, rgba(19, 38, 29, 0.9), transparent)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      <style jsx>{`
        @media (max-width: 640px) {
          .tech-ticker-wrap { padding-left: 1.5rem !important; }
          .tech-label { display: none !important; }
        }
      `}</style>
    </section>
  );
}
