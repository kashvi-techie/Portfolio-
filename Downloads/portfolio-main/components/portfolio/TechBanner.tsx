'use client';

const technologies = [
  { name: 'Next.js', icon: 'N' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'React', icon: '⚛' },
  { name: 'Tailwind CSS', icon: '~' },
  { name: 'Node.js', icon: '⬡' },
  { name: 'Figma', icon: '▣' },
  { name: 'Vercel', icon: '▲' },
  { name: 'GSAP', icon: '◈' },
  { name: 'Framer Motion', icon: '◉' },
  { name: 'Gemini API', icon: '✦' },
];

export default function TechBanner() {
  const doubled = [...technologies, ...technologies];

  return (
    <section
      style={{
        background: 'rgba(16, 32, 25, 0.6)',
        borderTop: '1px solid rgba(196, 154, 60, 0.08)',
        borderBottom: '1px solid rgba(196, 154, 60, 0.08)',
        padding: '1.25rem 0',
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
          background: 'rgba(16, 32, 25, 0.95)',
          paddingRight: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'rgba(196, 154, 60, 0.3)',
          }}
        />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.58rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(196, 154, 60, 0.6)',
            whiteSpace: 'nowrap',
          }}
        >
          Technologies I work with
        </span>
      </div>

      {/* Ticker */}
      <div
        style={{
          paddingLeft: '240px',
          overflow: 'hidden',
        }}
      >
        <div
          className="ticker-track"
          style={{
            display: 'flex',
            gap: '0',
            width: 'max-content',
          }}
        >
          {doubled.map((tech, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0 2rem',
                borderRight: '1px solid rgba(196, 154, 60, 0.1)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(196, 154, 60, 0.6)',
                  fontWeight: 500,
                  minWidth: '20px',
                  textAlign: 'center',
                }}
              >
                {tech.icon}
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(248, 243, 235, 0.6)',
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
          background: 'linear-gradient(to left, rgba(16, 32, 25, 0.8), transparent)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
