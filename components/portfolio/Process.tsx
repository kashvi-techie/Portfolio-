'use client';

import { useEffect, useRef } from 'react';

/* Inline SVG icons (no emojis) */
const icons: Record<string, JSX.Element> = {
  discover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E9C46A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E9C46A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  engineer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E9C46A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E9C46A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
};

const steps = [
  { number: '01', key: 'discover', title: 'Discover', desc: 'Research, user insight & problem mapping' },
  { number: '02', key: 'design', title: 'Design', desc: 'Wireframes, systems & interactive prototypes' },
  { number: '03', key: 'engineer', title: 'Engineer', desc: 'Scalable, performant & clean code architecture' },
  { number: '04', key: 'launch', title: 'Launch', desc: 'Deploy, monitor & optimize continuously' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        background: '#173026',
        padding: '7rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute', top: 0, right: '-5%', width: '300px', height: '100%',
          background: 'radial-gradient(ellipse 40% 80% at 100% 50%, rgba(31, 122, 132, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '4rem',
            marginBottom: '5rem',
            alignItems: 'end',
          }}
          className="process-header"
        >
          <div className="reveal-left">
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>My Process</p>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 400, color: '#FBF7F0', lineHeight: 1.2,
              }}
            >
              A thoughtful process that ensures clarity, quality &amp; impact.
            </h2>
          </div>

          <div
            className="reveal process-steps"
            style={{ display: 'flex', alignItems: 'flex-start', gap: '0', paddingBottom: '0.5rem' }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
              >
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: 'absolute', top: '20px', left: '50%', right: '-50%', height: '1px',
                      background: 'linear-gradient(to right, rgba(233, 196, 106, 0.5), rgba(233, 196, 106, 0.18))',
                    }}
                    className="process-connector"
                  />
                )}

                {/* Icon circle (SVG, not emoji) */}
                <div
                  style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    border: '1px solid rgba(233, 196, 106, 0.4)',
                    background: 'rgba(233, 196, 106, 0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1, marginBottom: '1rem',
                  }}
                >
                  {icons[step.key]}
                </div>

                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(233, 196, 106, 0.6)', marginBottom: '0.4rem' }}>
                  {step.number}
                </span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 500, color: '#FBF7F0', marginBottom: '0.4rem' }}>
                  {step.title}
                </span>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', lineHeight: 1.55, color: 'rgba(251, 247, 240, 0.5)', textAlign: 'center', maxWidth: '110px', fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .process-header { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 560px) {
          .process-steps { flex-wrap: wrap !important; gap: 2rem 0 !important; }
          .process-steps > div { flex: 0 0 50% !important; }
          .process-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}
