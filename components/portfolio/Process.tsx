'use client';

import { useEffect, useRef, useState } from 'react';

/* Inline SVG icons (no emojis) */
const icons: Record<string, JSX.Element> = {
  discover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  engineer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
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

/* GSAP power3.out approximation */
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGLineElement>(null);

  // Smoothed scroll progress (0 -> 1) through the timeline, used for line draw.
  const [progress, setProgress] = useState<number>(0);
  // How many steps are "fully active" (0..4).
  const [activeCount, setActiveCount] = useState<number>(0);

  /* Reveal-on-enter (kept from original) */
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

  /* Scroll-driven timeline progress via rAF + lerp smoothing */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let target = 0; // raw computed progress
    let current = 0; // smoothed progress
    let running = true;

    const computeTarget = (): number => {
      const el = timelineRef.current;
      if (!el) return target;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Map so the line starts drawing as the timeline enters the lower-middle
      // of the viewport and completes as it scrolls past the middle.
      const start = vh * 0.85;
      const end = vh * 0.25;
      const raw = (start - rect.top) / (start - end + rect.height);
      return clamp01(raw);
    };

    const tick = () => {
      if (!running) return;
      // Smooth toward target (instant if reduced motion).
      current = reduceMotion ? target : lerp(current, target, 0.12);
      if (Math.abs(current - target) < 0.0005) current = target;

      setProgress(current);
      // A step is fully active once progress crosses (index + 1) / steps.length,
      // offset slightly so node 01 lights up early.
      let count = 0;
      for (let i = 0; i < steps.length; i++) {
        if (current >= (i + 0.55) / steps.length) count = i + 1;
      }
      setActiveCount(count);

      rafId = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = computeTarget();
    };

    target = computeTarget();
    current = target;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
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
            gridTemplateColumns: '1fr 1.6fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="process-header"
        >
          <div className="reveal-left process-intro">
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

          {/* Vertical timeline */}
          <div
            className="reveal process-timeline"
            ref={timelineRef}
            style={{ position: 'relative' }}
          >
            {/* SVG connector line in the left gutter, drawing itself on scroll */}
            <svg
              className="timeline-track"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '20px',
                top: '20px',
                bottom: '20px',
                width: '2px',
                height: 'auto',
                overflow: 'visible',
              }}
            >
              {/* Base (dim) rail */}
              <line
                x1="1" y1="0" x2="1" y2="100"
                stroke="rgba(233, 196, 106, 0.18)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Gold progress that fills top -> bottom (pathLength=1 trick) */}
              <line
                ref={pathRef}
                x1="1" y1="0" x2="1" y2="100"
                stroke="#E9C46A"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - progress}
                style={{ filter: 'drop-shadow(0 0 4px rgba(233, 196, 106, 0.35))' }}
              />
            </svg>

            {steps.map((step, i) => {
              const isActive = i < activeCount;
              return (
                <div
                  key={i}
                  className="timeline-step"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.4rem',
                    paddingBottom: i < steps.length - 1 ? '2.75rem' : '0',
                  }}
                >
                  {/* Node: icon circle on the line */}
                  <div
                    className="timeline-node"
                    style={{
                      flex: '0 0 auto',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 1,
                      border: isActive ? '1px solid #E9C46A' : '1px solid rgba(233, 196, 106, 0.4)',
                      background: isActive ? '#E9C46A' : 'rgba(23, 48, 38, 1)',
                      color: isActive ? '#173026' : '#E9C46A',
                      boxShadow: isActive ? '0 0 0 6px rgba(233, 196, 106, 0.12)' : '0 0 0 6px rgba(23, 48, 38, 1)',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      transition: `transform 0.4s ${EASE}, background 0.4s ${EASE}, color 0.4s ${EASE}, border-color 0.4s ${EASE}, box-shadow 0.4s ${EASE}`,
                    }}
                  >
                    {icons[step.key]}
                  </div>

                  {/* Definition / description container */}
                  <div
                    className="timeline-def"
                    style={{
                      flex: 1,
                      transformOrigin: 'left center',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0.96)',
                      paddingLeft: isActive ? '0.4rem' : '0',
                      opacity: isActive ? 1 : 0.5,
                      transition: `transform 0.4s ${EASE}, padding-left 0.4s ${EASE}, opacity 0.4s ${EASE}`,
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.6rem',
                        letterSpacing: '0.18em',
                        color: isActive ? 'rgba(242, 213, 138, 0.9)' : 'rgba(233, 196, 106, 0.55)',
                        marginBottom: '0.35rem',
                        transition: `color 0.4s ${EASE}`,
                      }}
                    >
                      {step.number}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        color: '#FBF7F0',
                        lineHeight: 1.15,
                        marginBottom: '0.35rem',
                      }}
                    >
                      {step.title}
                    </span>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.78rem',
                        lineHeight: 1.6,
                        color: 'rgba(251, 247, 240, 0.55)',
                        fontWeight: 300,
                        maxWidth: '360px',
                        margin: 0,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-track {
          z-index: 0;
        }
        @media (max-width: 900px) {
          .process-header {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .timeline-node,
          .timeline-def {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
