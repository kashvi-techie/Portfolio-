'use client';

import { useEffect, useRef } from 'react';

const stats = [
  { value: '2+', label: 'Years of\nexperience building products' },
  { value: '10+', label: 'Projects\nshipped successfully' },
  { value: '100%', label: 'Commitment to\nquality & user satisfaction' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const items = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-3d');
    items?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#102019',
        padding: '7rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(15, 76, 92, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Section label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '3.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              opacity: 0.4,
            }}
          >
            <div style={{ width: '1px', height: '40px', background: '#C49A3C' }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.58rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C49A3C',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              About Me
            </span>
          </div>

          {/* Lotus divider */}
          <svg viewBox="0 0 24 24" style={{ width: '18px', opacity: 0.3 }}>
            <path
              d="M12 2c0 0-6 5-6 10s6 9 6 9 6-4 6-9S12 2 12 2z"
              stroke="#C49A3C"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* Grid layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '2px',
          }}
          className="about-grid"
        >
          {/* Quote block */}
          <div
            className="glass-card reveal-left"
            style={{
              padding: '2.5rem',
              gridColumn: 'span 1',
            }}
          >
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                fontWeight: 400,
                lineHeight: 1.4,
                color: '#F8F3EB',
              }}
            >
              I blend design thinking with engineering excellence to build products that create{' '}
              <span style={{ color: '#C49A3C', fontStyle: 'italic' }}>real impact.</span>
            </p>
          </div>

          {/* Bio block */}
          <div
            className="glass-card reveal"
            style={{
              padding: '2.5rem',
              transitionDelay: '0.1s',
            }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.825rem',
                lineHeight: 1.85,
                color: 'rgba(248, 243, 235, 0.55)',
                fontWeight: 300,
                marginBottom: '1.5rem',
              }}
            >
              I&apos;m a Computer Science student and UI Engineer who loves turning ideas into
              meaningful, high-performance products. My passion lies at the intersection of design,
              frontend engineering and AI.
            </p>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                color: '#C49A3C',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
              }}
            >
              Know more about me <span>↗</span>
            </a>
          </div>

          {/* Stats */}
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover reveal-3d"
              style={{
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transitionDelay: `${0.15 + i * 0.1}s`,
              }}
            >
              {/* Lotus icon */}
              <svg viewBox="0 0 24 24" style={{ width: '22px', opacity: 0.5 }}>
                <path
                  d="M12 3c0 0-5 4-5 9s5 8 5 8 5-3 5-8S12 3 12 3z"
                  stroke="#C49A3C"
                  strokeWidth="1"
                  fill="rgba(196, 154, 60, 0.08)"
                />
                <path
                  d="M7 10c-3 0-5 3-5 3s2 3 5 2M17 10c3 0 5 3 5 3s-2 3-5 2"
                  stroke="#C49A3C"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>

              <div style={{ marginTop: '1.5rem' }}>
                <div
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                    fontWeight: 400,
                    color: '#C49A3C',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  {stat.value}
                </div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem',
                    color: 'rgba(248, 243, 235, 0.45)',
                    lineHeight: 1.5,
                    fontWeight: 300,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
