'use client';

import { useEffect, useRef } from 'react';

const experiences = [
  {
    role: 'Design & Dev Intern',
    company: '@ Mythaverse',
    period: 'Jan 2026 – Apr 2026',
    type: 'Internship',
    highlights: [
      'Shipped production-grade SaaS interfaces, reducing developer handoff time by 20%',
      'Engineered end-to-end AI streaming system for incremental UI loading',
    ],
  },
  {
    role: 'Freelance Product Designer & Developer',
    company: 'Independent',
    period: 'Jan 2026 – Present',
    type: 'Remote',
    highlights: [
      'Crafted end-to-end design systems and production-ready Next.js implementations',
      'Conceptualized and shipped high-end consumer luxury interfaces and AI-native SaaS products',
    ],
  },
];

export default function Experience() {
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
      id="experience"
      ref={sectionRef}
      style={{
        background: '#0B1612',
        padding: '7rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background lotus image */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '45%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <img
          src="https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.12,
            filter: 'saturate(0.2) brightness(0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, #0B1612 0%, rgba(11, 22, 18, 0.4) 60%, transparent 100%)',
          }}
        />
      </div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'start',
          }}
          className="exp-grid"
        >
          {/* Left: Experience list */}
          <div>
            <p className="section-label reveal" style={{ marginBottom: '0.75rem' }}>
              Experience
            </p>
            <h2
              className="reveal"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 400,
                color: '#F8F3EB',
                lineHeight: 1.2,
                marginBottom: '3rem',
              }}
            >
              Building, learning, growing. Always next up.
            </h2>

            {/* Timeline */}
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div
                style={{
                  position: 'absolute',
                  left: '4px',
                  top: 0,
                  bottom: 0,
                  width: '1px',
                  background:
                    'linear-gradient(to bottom, rgba(196, 154, 60, 0.4), rgba(196, 154, 60, 0.1))',
                }}
              />

              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    paddingLeft: '2rem',
                    marginBottom: '2.5rem',
                    position: 'relative',
                    transitionDelay: `${i * 0.15}s`,
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '4px',
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      border: '1px solid #C49A3C',
                      background: 'rgba(196, 154, 60, 0.15)',
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      marginBottom: '0.5rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          color: '#F8F3EB',
                          lineHeight: 1.2,
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.72rem',
                          color: '#C49A3C',
                          marginTop: '0.15rem',
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.68rem',
                          color: 'rgba(248, 243, 235, 0.4)',
                        }}
                      >
                        {exp.period}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.62rem',
                          color: 'rgba(248, 243, 235, 0.3)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {exp.type}
                      </p>
                    </div>
                  </div>

                  <ul style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        style={{
                          display: 'flex',
                          gap: '0.6rem',
                          alignItems: 'flex-start',
                          marginBottom: '0.4rem',
                        }}
                      >
                        <span
                          style={{
                            color: 'rgba(196, 154, 60, 0.5)',
                            fontSize: '0.6rem',
                            marginTop: '0.3rem',
                            flexShrink: 0,
                          }}
                        >
                          ✦
                        </span>
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.75rem',
                            lineHeight: 1.65,
                            color: 'rgba(248, 243, 235, 0.45)',
                            fontWeight: 300,
                          }}
                        >
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div
              className="glass-card reveal"
              style={{ padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}
            >
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(196, 154, 60, 0.6)',
                  marginBottom: '0.75rem',
                }}
              >
                Education
              </p>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#F8F3EB',
                  marginBottom: '0.25rem',
                }}
              >
                B.Tech Computer Science & Engineering
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.72rem',
                  color: 'rgba(248, 243, 235, 0.4)',
                }}
              >
                GLA University — In Progress
              </p>
              <div
                style={{
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(196, 154, 60, 0.08)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem',
                    color: 'rgba(248, 243, 235, 0.4)',
                  }}
                >
                  Google AI Essentials — Certified via Coursera
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quote */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '4rem',
            }}
          >
            <div className="reveal-right" style={{ maxWidth: '420px' }}>
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '5rem',
                  lineHeight: 0.5,
                  color: 'rgba(196, 154, 60, 0.25)',
                  marginBottom: '1.5rem',
                  userSelect: 'none',
                }}
              >
                "
              </div>
              <blockquote
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
                  fontWeight: 400,
                  lineHeight: 1.55,
                  color: '#F8F3EB',
                  fontStyle: 'italic',
                  marginBottom: '2rem',
                }}
              >
                Great products are not just designed or built — they are thought through, end to end.
              </blockquote>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  color: '#C49A3C',
                  letterSpacing: '0.05em',
                }}
              >
                — Kashvi Pundir
              </p>

              {/* Lotus decoration */}
              <div style={{ marginTop: '2.5rem', opacity: 0.25 }}>
                <img
                  src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: '180px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    filter: 'saturate(0.2) brightness(0.6)',
                    border: '1px solid rgba(196, 154, 60, 0.15)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .exp-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
