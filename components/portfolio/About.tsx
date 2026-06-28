'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '3', label: 'AI products\nshipped end-to-end' },
  { value: '10+', label: 'Projects\nbuilt & shipped' },
  { value: '92', label: 'Google PageSpeed\non a live site' },
];

// Split a stat value into its leading numeric target and the surrounding
// prefix/suffix so the counter ticker can preserve "+", "%", etc.
function parseStatValue(value: string): {
  prefix: string;
  target: number;
  suffix: string;
} {
  const match = value.match(/(\d[\d,]*\.?\d*)/);
  if (!match) {
    return { prefix: '', target: 0, suffix: value };
  }
  const numericText = match[1];
  const start = match.index ?? 0;
  return {
    prefix: value.slice(0, start),
    target: parseFloat(numericText.replace(/,/g, '')),
    suffix: value.slice(start + numericText.length),
  };
}

const parsedStats = stats.map((s) => parseStatValue(s.value));

// Approximate GSAP power3.out for JS-driven interpolation.
const power3Out = (t: number): number => 1 - Math.pow(1 - t, 3);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainBlockRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafIds = useRef<number[]>([]);
  const startedCounters = useRef<Set<number>>(new Set());

  // Displayed (animating) counter values, initialised to the target so that
  // reduced-motion / no-JS users still see the final state.
  const [counts, setCounts] = useState<number[]>(() =>
    parsedStats.map((p) => p.target)
  );

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal trigger for the existing reveal/reveal-left/reveal-3d blocks.
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

    const items = sectionRef.current?.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-3d'
    );
    items?.forEach((el) => observer.observe(el));

    // whileInView trigger for the main text block (fade up y:30 -> 0).
    let mainObserver: IntersectionObserver | null = null;
    if (mainBlockRef.current) {
      mainObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('about-in-view');
              mainObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      mainObserver.observe(mainBlockRef.current);
    }

    if (reduceMotion) {
      // Show final state, skip counters & illumination scaling.
      setCounts(parsedStats.map((p) => p.target));
      statRefs.current.forEach((el) => el?.classList.add('metric-illuminated'));
      mainBlockRef.current?.classList.add('about-in-view');
      return () => {
        observer.disconnect();
        mainObserver?.disconnect();
      };
    }

    // Start hidden so the ticker is visible from 0.
    setCounts(parsedStats.map(() => 0));

    const runCounter = (index: number) => {
      if (startedCounters.current.has(index)) return;
      startedCounters.current.add(index);

      const target = parsedStats[index].target;
      const duration = 1200; // ~1.2s
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = power3Out(progress);
        const current = target * eased;
        setCounts((prev) => {
          const next = [...prev];
          next[index] = current;
          return next;
        });
        if (progress < 1) {
          rafIds.current[index] = requestAnimationFrame(tick);
        }
      };

      rafIds.current[index] = requestAnimationFrame(tick);
    };

    // Counter + highlight-illumination trigger per metric.
    const metricObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute('data-metric-index');
          if (idxAttr === null) return;
          const idx = parseInt(idxAttr, 10);
          if (entry.isIntersecting) {
            entry.target.classList.add('metric-illuminated');
            runCounter(idx);
            metricObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    statRefs.current.forEach((el) => el && metricObserver.observe(el));

    const localRafIds = rafIds.current;
    return () => {
      observer.disconnect();
      mainObserver?.disconnect();
      metricObserver.disconnect();
      localRafIds.forEach((id) => id && cancelAnimationFrame(id));
    };
  }, []);

  // Format an animating count back into "<prefix><number><suffix>".
  const formatCount = (raw: number, index: number): string => {
    const { prefix, target, suffix } = parsedStats[index];
    const hasDecimals = !Number.isInteger(target);
    const display = hasDecimals
      ? raw.toFixed(1)
      : Math.round(raw).toString();
    return `${prefix}${display}${suffix}`;
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#13261D',
        padding: '7rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture / drifting ambient blob (teal) */}
      <div
        className="ambient-blob blob-a"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(31, 122, 132, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Drifting ambient blob (gold) */}
      <div
        className="ambient-blob blob-b"
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-8%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(233, 196, 106, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Drifting ambient blob (soft gold, centred) */}
      <div
        className="ambient-blob blob-c"
        style={{
          position: 'absolute',
          top: '35%',
          left: '45%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(242, 213, 138, 0.05) 0%, transparent 70%)',
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
            <div style={{ width: '1px', height: '40px', background: '#E3BC5E' }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.58rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#E3BC5E',
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
              stroke="#E3BC5E"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* Grid layout */}
        <div
          ref={mainBlockRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '2px',
          }}
          className="about-grid about-main-block"
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
                color: '#FBF7F0',
              }}
            >
              I blend design thinking with engineering excellence to build products that create{' '}
              <span style={{ color: '#E3BC5E', fontStyle: 'italic' }}>real impact.</span>
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
                color: 'rgba(251, 247, 240, 0.55)',
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
                color: '#E3BC5E',
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
              ref={(el) => {
                statRefs.current[i] = el;
              }}
              data-metric-index={i}
              className="glass-card glass-card-hover reveal-3d metric-card"
              style={{
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transitionDelay: `${0.15 + i * 0.1}s`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Highlight illumination — radial gold glow that expands & fades in */}
              <div className="metric-glow" aria-hidden="true" />

              {/* Lotus icon */}
              <svg
                viewBox="0 0 24 24"
                style={{ width: '22px', opacity: 0.5, position: 'relative', zIndex: 1 }}
              >
                <path
                  d="M12 3c0 0-5 4-5 9s5 8 5 8 5-3 5-8S12 3 12 3z"
                  stroke="#E3BC5E"
                  strokeWidth="1"
                  fill="rgba(227, 188, 94, 0.08)"
                />
                <path
                  d="M7 10c-3 0-5 3-5 3s2 3 5 2M17 10c3 0 5 3 5 3s-2 3-5 2"
                  stroke="#E3BC5E"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>

              <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                    fontWeight: 400,
                    color: '#E3BC5E',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  {formatCount(counts[i], i)}
                </div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem',
                    color: 'rgba(251, 247, 240, 0.45)',
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
        /* Main text block: fade up y:30 -> 0 over ~0.8s, power3.out */
        .about-main-block {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .about-main-block.about-in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* Highlight illumination behind each metric */
        .metric-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(242, 213, 138, 0.22) 0%,
            rgba(233, 196, 106, 0.1) 40%,
            transparent 72%
          );
          transform: translate(-50%, -50%) scale(0.6);
          opacity: 0;
          pointer-events: none;
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .metric-card.metric-illuminated .metric-glow {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }

        /* Continuous organic drift of ambient background blobs */
        .ambient-blob {
          will-change: transform;
        }
        .blob-a {
          animation: drift-a 19s ease-in-out infinite;
        }
        .blob-b {
          animation: drift-b 24s ease-in-out infinite;
          animation-delay: -6s;
        }
        .blob-c {
          animation: drift-c 31s ease-in-out infinite;
          animation-delay: -11s;
        }

        @keyframes drift-a {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(-28px, 22px) scale(1.06);
          }
          66% {
            transform: translate(18px, 36px) scale(0.97);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes drift-b {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(34px, -20px) scale(1.05);
          }
          66% {
            transform: translate(-22px, -32px) scale(0.96);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes drift-c {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(26px, -26px) scale(1.08);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

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

        @media (prefers-reduced-motion: reduce) {
          .about-main-block {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .metric-glow {
            transition: none;
          }
          .ambient-blob {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
