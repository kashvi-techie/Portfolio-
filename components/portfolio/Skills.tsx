'use client';

import dynamic from 'next/dynamic';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const InteractiveLotus3D = dynamic(() => import('@/components/portfolio/InteractiveLotus3D'), {
  ssr: false,
  loading: () => <LotusFallback />,
});

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
    summary: 'Integrating intelligent AI pipelines that enhance user experiences - from semantic retrieval to real-time streaming.',
  },
  {
    category: 'Design Systems',
    pov: 'Right',
    color: 'rgba(243, 216, 216, 0.07)',
    skills: ['Figma', 'Design Tokens', 'Component Architecture', 'Information Architecture', 'Prototyping'],
    summary: 'Crafting cohesive design languages that scale - from atomic components to full product systems.',
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

function LotusFallback() {
  return (
    <div className="skills-lotus-fallback" aria-hidden="true">
      <div className="fallback-ring" />
      <div className="fallback-core" />
      <style jsx>{`
        .skills-lotus-fallback {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(233, 196, 106, 0.16) 0%, rgba(31, 122, 132, 0.06) 36%, transparent 68%);
        }
        .fallback-ring {
          position: absolute;
          inset: 14%;
          border: 1px solid rgba(233, 196, 106, 0.22);
          border-radius: 50%;
        }
        .fallback-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 18%;
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: rgba(233, 196, 106, 0.28);
          box-shadow: 0 0 50px rgba(233, 196, 106, 0.2);
        }
      `}</style>
    </div>
  );
}

function updateProgressRefs(
  progress: number,
  scrollProgressRef: MutableRefObject<number>,
  activeIndexRef: MutableRefObject<number>,
  setActiveIndex: (updater: (prev: number) => number) => void,
  setCardVisible: (visible: boolean) => void,
  setTagKey: (updater: (prev: number) => number) => void,
) {
  scrollProgressRef.current = progress;
  const raw = progress * skillGroups.length;
  const nextIndex = Math.min(Math.floor(raw), skillGroups.length - 1);
  activeIndexRef.current = nextIndex;

  setActiveIndex((previous) => {
    if (previous !== nextIndex) {
      setCardVisible(false);
      setTagKey((key) => key + 1);
      window.setTimeout(() => setCardVisible(true), 220);
    }
    return nextIndex;
  });
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entered, setEntered] = useState(false);
  const [cardVisible, setCardVisible] = useState(true);
  const [tagKey, setTagKey] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: reduceMotion ? false : 0.75,
      invalidateOnRefresh: true,
      onEnter: () => setEntered(true),
      onEnterBack: () => setEntered(true),
      onLeaveBack: () => setEntered(false),
      onUpdate: (self) => {
        updateProgressRefs(
          self.progress,
          scrollProgressRef,
          activeIndexRef,
          setActiveIndex,
          setCardVisible,
          setTagKey,
        );
      },
    });

    updateProgressRefs(
      trigger.progress,
      scrollProgressRef,
      activeIndexRef,
      setActiveIndex,
      setCardVisible,
      setTagKey,
    );

    return () => trigger.kill();
  }, []);

  const group = skillGroups[activeIndex];
  const totalScrollDist = skillGroups.length + 1;

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
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 78% 50%, rgba(31, 122, 132, 0.14) 0%, transparent 65%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 45% 55% at 18% 50%, rgba(233, 196, 106, 0.08) 0%, transparent 60%)' }} />
        </div>

        <div
          className="skills-lotus"
          style={{
            position: 'absolute',
            left: 'clamp(-9%, -2vw, 2%)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(280px, 35vw, 500px)',
            height: 'clamp(280px, 35vw, 500px)',
            pointerEvents: 'auto',
            zIndex: 1,
          }}
        >
          <InteractiveLotus3D progressRef={scrollProgressRef} activeIndex={activeIndex} label={group.pov} />
        </div>

        <div
          style={{
            position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto',
            padding: '0 clamp(1.25rem, 4vw, 2rem)', width: '100%',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'center',
          }}
          className="skills-inner-grid"
        >
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
              Scroll to explore each discipline - the 3D lotus turns and blooms as every capability rises into view.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', opacity: entered ? 1 : 0, transition: 'opacity 0.8s ease 0.25s' }}>
              {skillGroups.map((_, i) => (
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

                <div key={tagKey} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.skills.map((skill, j) => (
                    <span
                      key={skill}
                      className="skills-tag"
                      style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.05em',
                        padding: '0.3rem 0.8rem', background: 'rgba(233, 196, 106, 0.1)',
                        border: '1px solid rgba(233, 196, 106, 0.22)', borderRadius: '9999px',
                        color: 'rgba(251, 247, 240, 0.7)',
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
        @keyframes tagRise {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .skills-tag {
          opacity: 0;
          transform: translateY(8px);
          animation: tagRise 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (max-width: 768px) {
          .skills-inner-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .skills-lotus {
            opacity: 0.34;
            left: 50% !important;
            top: 28% !important;
            width: min(78vw, 320px) !important;
            height: min(78vw, 320px) !important;
            transform: translate(-50%, -50%) !important;
            pointer-events: none !important;
          }
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
