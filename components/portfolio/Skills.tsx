'use client';

import { useEffect, useRef, useState } from 'react';

const skillGroups = [
  {
    category: 'Frontend Engineering',
    pov: 'Front',
    color: 'rgba(233, 196, 106, 0.08)',
    skills: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'CSS Architecture'],
    summary: 'Building pixel-perfect, performance-optimized interfaces that bridge the gap between design vision and production reality.',
  },
  {
    category: 'AI Systems',
    pov: 'Left',
    color: 'rgba(31, 122, 132, 0.12)',
    skills: ['Gemini 1.5 API', 'VectorShift', 'LLM Integration', 'AI Stream Architecture', 'Cursor', 'V0.dev'],
    summary: 'Integrating intelligent AI pipelines that enhance user experiences — from semantic retrieval to real-time streaming.',
  },
  {
    category: 'Design Systems',
    pov: 'Right',
    color: 'rgba(243, 216, 216, 0.07)',
    skills: ['Figma', 'Design Tokens', 'Component Architecture', 'Information Architecture', 'Prototyping'],
    summary: 'Crafting cohesive design languages that scale — from atomic components to full product systems.',
  },
  {
    category: 'Product Architecture',
    pov: 'Back',
    color: 'rgba(233, 196, 106, 0.07)',
    skills: ['Vercel Production', 'Edge Functions', 'REST APIs', 'Performance Optimization', 'Core Web Vitals'],
    summary: 'Architecting resilient, scalable production systems built to perform and adapt as products grow.',
  },
];

const icons: Record<number, JSX.Element> = {
  0: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E9C46A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  1: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E9C46A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="9" opacity="0.4" />
    </svg>
  ),
  2: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E9C46A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  3: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E9C46A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

/* Layered petal rings for the CSS 3D lotus bloom (outer flat → inner upright). */
const LOTUS_RINGS: {
  count: number; len: number; w: number; tilt: number; z: number; offset: number; opacity: number;
}[] = [
  { count: 10, len: 132, w: 52, tilt: 72, z: 0, offset: 0, opacity: 0.8 },
  { count: 8, len: 108, w: 46, tilt: 56, z: 18, offset: 18, opacity: 0.92 },
  { count: 6, len: 84, w: 40, tilt: 38, z: 36, offset: 30, opacity: 1 },
];

/* Distinct 3D camera angle (point of view) per capability — the object is orbited
   to a new viewpoint on each scroll step, rather than spun flat in 2D. */
const LOTUS_POVS: { rx: number; ry: number }[] = [
  { rx: 14, ry: 0 },    // Front
  { rx: 22, ry: -55 },  // Left
  { rx: 4, ry: 55 },    // Right
  { rx: 46, ry: 16 },   // Back / top-down
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const lotus3dRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entered, setEntered] = useState(false);
  const [cardVisible, setCardVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  // re-mount key for the tag stagger so it cleanly replays on each lock
  const [tagKey, setTagKey] = useState(0);

  // Latest scroll-derived values shared with the rAF lerp loop (no re-render).
  const activeIndexRef = useRef(0);
  const fractionRef = useRef(0); // within-item progress 0..1 for sub-rotation

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrolledIn = -rect.top;
      const totalScrollable = section.offsetHeight - window.innerHeight;

      if (scrolledIn < 0) { setEntered(false); return; }
      if (scrolledIn > totalScrollable) return;

      setEntered(true);
      const p = Math.max(0, Math.min(1, scrolledIn / totalScrollable));
      setProgress(p);

      const raw = p * skillGroups.length;
      const newIndex = Math.min(Math.floor(raw), skillGroups.length - 1);
      activeIndexRef.current = newIndex;
      // fractional progress within the current item (0..1) for a tiny live drift
      fractionRef.current = Math.min(1, Math.max(0, raw - newIndex));

      setActiveIndex((prev) => {
        if (prev !== newIndex) {
          setCardVisible(false);
          setTagKey((k) => k + 1); // replay tag stagger on each lock
          setTimeout(() => setCardVisible(true), 220);
        }
        return newIndex;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── rAF lerp: orbit the 3D lotus camera to a distinct POV per capability ──
  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let rx = LOTUS_POVS[0].rx;
    let ry = LOTUS_POVS[0].ry;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const pov = LOTUS_POVS[activeIndexRef.current] ?? LOTUS_POVS[0];
      const frac = reduce ? 0 : fractionRef.current;
      const targetRx = pov.rx;
      // small live drift within an item so the object feels alive between locks
      const targetRy = pov.ry + frac * 8;
      rx = reduce ? targetRx : lerp(rx, targetRx, 0.07);
      ry = reduce ? targetRy : lerp(ry, targetRy, 0.07);

      const el = lotus3dRef.current;
      if (el) el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const group = skillGroups[activeIndex];
  const totalScrollDist = skillGroups.length + 1; // sections of 100vh

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${totalScrollDist * 100}vh`,
        background: 'linear-gradient(180deg, #13261D 0%, #0E1B15 100%)',
      }}
    >
      {/* Sticky viewport — stays fixed while text/cards change */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Ambient background glow */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 78% 50%, rgba(31, 122, 132, 0.14) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 45% 55% at 18% 50%, rgba(233, 196, 106, 0.08) 0%, transparent 60%)' }} />
        </div>

        {/* ─── Rotating lotus pinned at the LEFT — POV turns on each scroll ─── */}
        <div
          className="skills-lotus"
          style={{
            position: 'absolute',
            left: 'clamp(-8%, -2vw, 2%)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(260px, 34vw, 460px)',
            height: 'clamp(260px, 34vw, 460px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {/* soft halo */}
          <div style={{
            position: 'absolute', inset: '8%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233,196,106,0.16) 0%, transparent 65%)',
          }} />
          {/* CSS 3D lotus bloom — the camera orbits to a new POV on each scroll */}
          <div className="lotus-stage">
            <div ref={lotus3dRef} className="lotus-3d">
              {LOTUS_RINGS.map((ring, r) => (
                <div className="lotus-ring" key={r} style={{ transform: `translateZ(${ring.z}px)` }}>
                  {Array.from({ length: ring.count }).map((_, i) => {
                    const angle = ring.offset + i * (360 / ring.count);
                    return (
                      <span
                        key={i}
                        className="lotus-petal"
                        style={{
                          width: `${ring.w}px`, height: `${ring.len}px`,
                          marginLeft: `${-ring.w / 2}px`, marginTop: `${-ring.len}px`,
                          opacity: ring.opacity,
                          transform: `rotateZ(${angle}deg) rotateX(${-ring.tilt}deg)`,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
              <span className="lotus-core" />
            </div>
          </div>
          {/* POV label */}
          <div style={{
            position: 'absolute', bottom: '6%', left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'rgba(233, 196, 106, 0.55)', zIndex: 3,
          }}>
            {group.pov} view
          </div>
        </div>

        {/* Main content grid */}
        <div
          style={{
            position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto',
            padding: '0 clamp(1.25rem, 4vw, 2rem)', width: '100%',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'center',
          }}
          className="skills-inner-grid"
        >
          {/* Left: heading + dots (sits over the rotating lotus) */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p
              className="section-label"
              style={{
                marginBottom: '0.75rem', opacity: entered ? 1 : 0,
                transform: entered ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              Capabilities
            </p>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 400,
                color: '#FBF7F0', lineHeight: 1.15, marginBottom: '1.5rem',
                opacity: entered ? 1 : 0,
                transform: entered ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
                textShadow: '0 2px 30px rgba(14,27,21,0.8)',
              }}
            >
              Crafted expertise,{' '}
              <em className="gold-gradient-text" style={{ fontStyle: 'italic' }}>intentional mastery.</em>
            </h2>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', lineHeight: 1.7,
              color: 'rgba(251, 247, 240, 0.55)', fontWeight: 300, maxWidth: '340px',
              marginBottom: '2.5rem', opacity: entered ? 1 : 0, transition: 'opacity 0.8s ease 0.2s',
            }}>
              Scroll to explore each discipline — the lotus turns as every capability rises into view.
            </p>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', opacity: entered ? 1 : 0, transition: 'opacity 0.8s ease 0.25s' }}>
              {skillGroups.map((g, i) => (
                <div key={i} style={{
                  width: i === activeIndex ? '28px' : '8px', height: '3px', borderRadius: '2px',
                  background: i === activeIndex ? '#E9C46A' : 'rgba(233, 196, 106, 0.28)',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                }} />
              ))}
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'rgba(233, 196, 106, 0.6)', marginLeft: '0.5rem' }}>
                {String(activeIndex + 1).padStart(2, '0')} / {String(skillGroups.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right: animated skill card — one by one */}
          <div style={{ perspective: '1200px' }}>
            <div
              style={{
                opacity: cardVisible ? 1 : 0,
                transform: cardVisible
                  ? 'perspective(1000px) rotateX(0deg) translateY(0)'
                  : 'perspective(1000px) rotateX(8deg) translateY(30px)',
                transition: 'opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1), transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
                background: 'rgba(16, 33, 25, 0.72)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(233, 196, 106, 0.2)',
                borderRadius: '14px', padding: 'clamp(2rem, 3vw, 3rem)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: group.color, pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '12px',
                    border: '1px solid rgba(233, 196, 106, 0.28)', background: 'rgba(233, 196, 106, 0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {icons[activeIndex]}
                  </div>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 300, color: 'rgba(233, 196, 106, 0.16)', lineHeight: 1 }}>
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 400, color: '#FBF7F0', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                  {group.category}
                </h3>

                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.84rem', lineHeight: 1.75, color: 'rgba(251, 247, 240, 0.6)', fontWeight: 300, marginBottom: '1.75rem' }}>
                  {group.summary}
                </p>

                <div style={{ width: '40px', height: '1px', background: 'rgba(233, 196, 106, 0.45)', marginBottom: '1.5rem' }} />

                {/* keyed to tagKey so the stagger-fade cleanly replays on each lock */}
                <div key={tagKey} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="skills-tag"
                      style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.05em',
                        padding: '0.3rem 0.8rem', background: 'rgba(233, 196, 106, 0.1)',
                        border: '1px solid rgba(233, 196, 106, 0.22)', borderRadius: '9999px',
                        color: 'rgba(251, 247, 240, 0.7)',
                        // stagger ~60ms each; eased re-entry (power3.out ≈ cubic-bezier below)
                        animationDelay: `${j * 0.06}s`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          opacity: entered && activeIndex > 0 ? 0 : 0.4, transition: 'opacity 0.5s ease', pointerEvents: 'none',
        }}>
          <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, transparent, #E9C46A)', animation: 'softPulse 2.5s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E9C46A' }}>Keep scrolling</span>
        </div>
      </div>

      <style jsx>{`
        /* Tag stagger-fade — replays whenever the keyed container re-mounts
           on each lotus lock. Approximates power3.out. */
        @keyframes tagRise {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .skills-tag {
          opacity: 0;
          transform: translateY(8px);
          animation: tagRise 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        /* ── CSS 3D lotus bloom ── */
        .lotus-stage {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 900px;
        }
        .lotus-3d {
          position: relative;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          transform: rotateX(14deg) rotateY(0deg);
          will-change: transform;
        }
        .lotus-ring {
          position: absolute;
          left: 0;
          top: 0;
          transform-style: preserve-3d;
        }
        .lotus-petal {
          position: absolute;
          left: 0;
          top: 0;
          transform-origin: 50% 100%;
          border-radius: 50% 50% 50% 50% / 80% 80% 22% 22%;
          background: linear-gradient(to top, rgba(233, 196, 106, 0.03), rgba(233, 196, 106, 0.18));
          border: 1px solid rgba(233, 196, 106, 0.5);
          box-shadow: inset 0 0 14px rgba(233, 196, 106, 0.1);
          backface-visibility: visible;
        }
        .lotus-core {
          position: absolute;
          left: 0;
          top: 0;
          width: 32px;
          height: 32px;
          margin-left: -16px;
          margin-top: -16px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(248, 231, 180, 0.65) 0%, rgba(233, 196, 106, 0.18) 65%, transparent 80%);
          transform: translateZ(46px);
          box-shadow: 0 0 20px rgba(233, 196, 106, 0.3);
        }
        @media (max-width: 768px) {
          .skills-inner-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .skills-lotus { opacity: 0.25; left: 50% !important; transform: translate(-50%, -50%) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skills-tag {
            opacity: 1;
            transform: none;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
