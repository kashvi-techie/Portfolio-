'use client';

import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    icon: '◎',
    title: 'Discover',
    desc: 'Research, user insight & problem mapping',
  },
  {
    number: '02',
    icon: '◈',
    title: 'Design',
    desc: 'Wireframes, systems & interactive prototypes',
  },
  {
    number: '03',
    icon: '</>',
    title: 'Engineer',
    desc: 'Scalable, performant & clean code architecture',
  },
  {
    number: '04',
    icon: '◉',
    title: 'Launch',
    desc: 'Deploy, monitor & optimize continuously',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
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
        background: '#13241C',
        padding: '7rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative peacock feather element */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '-5%',
          width: '300px',
          height: '100%',
          background:
            'radial-gradient(ellipse 40% 80% at 100% 50%, rgba(27, 107, 115, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
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
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>
              My Process
            </p>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 400,
                color: '#F8F3EB',
                lineHeight: 1.2,
              }}
            >
              A thoughtful process that ensures clarity, quality &amp; impact.
            </h2>
          </div>

          {/* Connecting line */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              paddingBottom: '0.5rem',
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '50%',
                      right: '-50%',
                      height: '1px',
                      background:
                        'linear-gradient(to right, rgba(196, 154, 60, 0.4), rgba(196, 154, 60, 0.15))',
                    }}
                  />
                )}

                {/* Icon circle */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(196, 154, 60, 0.35)',
                    background: 'rgba(196, 154, 60, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: '#C49A3C',
                    position: 'relative',
                    zIndex: 1,
                    marginBottom: '1rem',
                  }}
                >
                  {step.icon}
                </div>

                {/* Step number */}
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(196, 154, 60, 0.5)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {step.number}
                </span>
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#F8F3EB',
                    marginBottom: '0.4rem',
                  }}
                >
                  {step.title}
                </span>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.65rem',
                    lineHeight: 1.55,
                    color: 'rgba(248, 243, 235, 0.4)',
                    textAlign: 'center',
                    maxWidth: '100px',
                    fontWeight: 300,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .process-header {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
