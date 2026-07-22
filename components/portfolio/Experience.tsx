'use client';

import { useEffect, useRef, useState } from 'react';

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

type ExperienceItem = (typeof experiences)[number];

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [entered, setEntered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  // Respect prefers-reduced-motion: show the final expanded state immediately.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Measure the accordion content height (scrollHeight technique) so we can
  // animate from 0 -> measured height -> auto.
  useEffect(() => {
    const measure = () => {
      if (listRef.current) setMaxHeight(listRef.current.scrollHeight);
    };
    measure();
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Staggered entrance: reveal this card once the section scrolls into view.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEntered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = entered || reduceMotion;
  const delay = reduceMotion ? 0 : index * 0.12;
  // Snappy springy easing approximating stiffness ~100 / damping ~15 (slight overshoot).
  const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

  return (
    <div
      ref={cardRef}
      className="exp-card"
      style={{
        paddingLeft: '2rem',
        marginBottom: '2.5rem',
        position: 'relative',
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(24px)',
        transition: reduceMotion
          ? 'none'
          : `opacity 0.6s ${spring} ${delay}s, transform 0.6s ${spring} ${delay}s, box-shadow 0.3s ease`,
        borderRadius: '8px',
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
          border: '1px solid #E3BC5E',
          background: 'rgba(227, 188, 94, 0.15)',
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
              color: '#FBF7F0',
              lineHeight: 1.2,
            }}
          >
            {exp.role}
          </h3>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.72rem',
              color: '#E3BC5E',
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
              color: 'rgba(251, 247, 240, 0.4)',
            }}
          >
            {exp.period}
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.62rem',
              color: 'rgba(251, 247, 240, 0.3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {exp.type}
          </p>
        </div>
      </div>

      {/* Accordion wrapper: animates height 0 -> measured + opacity/flip-out */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: reduceMotion ? 'none' : active ? `${maxHeight}px` : 0,
          opacity: active ? 1 : 0,
          transform: active ? 'scaleY(1) rotateX(0deg)' : 'scaleY(0.92) rotateX(-12deg)',
          transformOrigin: 'top',
          transition: reduceMotion
            ? 'none'
            : `max-height 0.6s ${spring} ${delay + 0.1}s, opacity 0.5s ${spring} ${delay + 0.1}s, transform 0.6s ${spring} ${delay + 0.1}s`,
        }}
      >
        <ul ref={listRef} style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
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
                  color: 'rgba(227, 188, 94, 0.5)',
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
                  color: 'rgba(251, 247, 240, 0.45)',
                  fontWeight: 300,
                }}
              >
                {h}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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
        background: '#0E1B15',
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
          src="/images/lotus/lotus-open.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.2,
            filter: 'saturate(0.6) brightness(0.7)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, #0E1B15 0%, rgba(14, 27, 21, 0.4) 60%, transparent 100%)',
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
                color: '#FBF7F0',
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
                    'linear-gradient(to bottom, rgba(227, 188, 94, 0.4), rgba(227, 188, 94, 0.1))',
                }}
              />

              {experiences.map((exp, i) => (
                <ExperienceCard key={i} exp={exp} index={i} />
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
                  color: 'rgba(227, 188, 94, 0.6)',
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
                  color: '#FBF7F0',
                  marginBottom: '0.25rem',
                }}
              >
                B.Tech Computer Science & Engineering
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.72rem',
                  color: 'rgba(251, 247, 240, 0.4)',
                }}
              >
                GLA University — In Progress
              </p>
              <div
                style={{
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(227, 188, 94, 0.08)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem',
                    color: 'rgba(251, 247, 240, 0.4)',
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
                  color: 'rgba(227, 188, 94, 0.25)',
                  marginBottom: '1.5rem',
                  userSelect: 'none',
                }}
              >
                &quot;
              </div>
              <blockquote
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
                  fontWeight: 400,
                  lineHeight: 1.55,
                  color: '#FBF7F0',
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
                  color: '#E3BC5E',
                  letterSpacing: '0.05em',
                }}
              >
                — Kashvi Pundir
              </p>

              {/* Lotus decoration */}
              <div style={{ marginTop: '2.5rem', opacity: 0.6 }}>
                <img
                  src="/images/lotus/lotus-dark.jpg"
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: '200px',
                    height: '130px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    filter: 'saturate(1) brightness(0.95)',
                    border: '1px solid rgba(233, 196, 106, 0.25)',
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

        /* Neon drop-shadow accent: blooms a gold/teal glow on hover */
        .exp-card {
          will-change: transform, opacity, box-shadow;
        }
        .exp-card:hover {
          box-shadow: 0 0 0 1px rgba(233, 196, 106, 0.35),
            0 8px 28px -6px rgba(233, 196, 106, 0.35),
            0 0 22px rgba(45, 168, 142, 0.18);
        }
        /* Subtly tint the neighbour's margin when the previous card is hovered */
        .exp-card:hover + .exp-card {
          box-shadow: 0 -10px 24px -14px rgba(233, 196, 106, 0.4);
        }

        @media (prefers-reduced-motion: reduce) {
          .exp-card,
          .exp-card:hover,
          .exp-card:hover + .exp-card {
            transition: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </section>
  );
}
