'use client';

import { useEffect, useRef, useState } from 'react';

const skillGroups = [
  {
    category: 'Frontend Engineering',
    icon: '</>',
    color: 'rgba(196, 154, 60, 0.08)',
    skills: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'CSS Architecture'],
    summary: 'Building pixel-perfect, performance-optimized interfaces that bridge the gap between design vision and production reality.',
  },
  {
    category: 'AI Systems',
    icon: '✦',
    color: 'rgba(27, 107, 115, 0.1)',
    skills: ['Gemini 1.5 API', 'VectorShift', 'LLM Integration', 'AI Stream Architecture', 'Cursor', 'V0.dev'],
    summary: 'Integrating intelligent AI pipelines that enhance user experiences — from semantic retrieval to real-time streaming.',
  },
  {
    category: 'Design Systems',
    icon: '◈',
    color: 'rgba(239, 212, 212, 0.06)',
    skills: ['Figma', 'Design Tokens', 'Component Architecture', 'Information Architecture', 'Prototyping'],
    summary: 'Crafting cohesive design languages that scale — from atomic components to full product systems.',
  },
  {
    category: 'Product Architecture',
    icon: '◉',
    color: 'rgba(196, 154, 60, 0.06)',
    skills: ['Vercel Production', 'Edge Functions', 'REST APIs', 'Performance Optimization', 'Core Web Vitals'],
    summary: 'Architecting resilient, scalable production systems built to perform and adapt as products grow.',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entered, setEntered] = useState(false);
  const [cardVisible, setCardVisible] = useState(true);

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
      const progress = Math.max(0, Math.min(1, scrolledIn / totalScrollable));

      // Each card occupies equal portion: 0→0.25, 0.25→0.5, 0.5→0.75, 0.75→1.0
      const raw = progress * skillGroups.length;
      const newIndex = Math.min(Math.floor(raw), skillGroups.length - 1);

      setActiveIndex((prev) => {
        if (prev !== newIndex) {
          setCardVisible(false);
          setTimeout(() => setCardVisible(true), 220);
        }
        return newIndex;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
        background: 'linear-gradient(180deg, #102019 0%, #0B1612 100%)',
      }}
    >
      {/* Sticky viewport */}
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
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(15, 76, 92, 0.1) 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 40% 50% at 20% 50%, rgba(196, 154, 60, 0.04) 0%, transparent 60%)',
          }} />
        </div>

        {/* Lotus decoration — large, partially cropped right side */}
        <div
          style={{
            position: 'absolute',
            right: '-8%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '45vmin',
            height: '45vmin',
            opacity: 0.07,
            pointerEvents: 'none',
            transition: 'opacity 1s ease',
          }}
        >
          <svg viewBox="0 0 300 300" fill="none" style={{ width: '100%', height: '100%' }}>
            {/* Large lotus */}
            <path d="M150 20c0 0-60 45-60 100s60 120 60 120 60-65 60-120S150 20 150 20z" stroke="#C49A3C" strokeWidth="1.5" fill="rgba(196,154,60,0.04)" />
            <path d="M150 50c0 0-40 32-40 75s40 95 40 95 40-52 40-95S150 50 150 50z" stroke="#C49A3C" strokeWidth="1" fill="rgba(196,154,60,0.03)" />
            <path d="M150 80c0 0-22 20-22 50s22 65 22 65 22-35 22-65S150 80 150 80z" stroke="#C49A3C" strokeWidth="0.8" fill="rgba(196,154,60,0.04)" />
            {/* Side petals */}
            <path d="M70 140c-35 0-60 35-60 35s35 28 60 15" stroke="#C49A3C" strokeWidth="1.2" fill="rgba(196,154,60,0.03)" />
            <path d="M230 140c35 0 60 35 60 35s-35 28-60 15" stroke="#C49A3C" strokeWidth="1.2" fill="rgba(196,154,60,0.03)" />
            <path d="M90 100c-20-25-55-20-55-20s5 35 30 35" stroke="#C49A3C" strokeWidth="1" fill="rgba(196,154,60,0.02)" />
            <path d="M210 100c20-25 55-20 55-20s-5 35-30 35" stroke="#C49A3C" strokeWidth="1" fill="rgba(196,154,60,0.02)" />
            {/* Water ripples */}
            <ellipse cx="150" cy="240" rx="70" ry="20" stroke="#C49A3C" strokeWidth="0.6" fill="none" opacity="0.5" />
            <ellipse cx="150" cy="248" rx="95" ry="26" stroke="#C49A3C" strokeWidth="0.4" fill="none" opacity="0.3" />
            <ellipse cx="150" cy="258" rx="120" ry="32" stroke="#C49A3C" strokeWidth="0.3" fill="none" opacity="0.2" />
            {/* Stem */}
            <line x1="150" y1="240" x2="150" y2="290" stroke="#C49A3C" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Lotus photo — soft, on the left edge */}
        <div style={{
          position: 'absolute',
          left: '-4%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '28vw',
          height: '70vh',
          overflow: 'hidden',
          opacity: 0.08,
          pointerEvents: 'none',
          borderRadius: '0 50% 50% 0',
        }}>
          <img
            src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.2) brightness(0.5)' }}
          />
        </div>

        {/* Main content grid */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
          className="skills-inner-grid"
        >
          {/* Left: fixed heading + dots */}
          <div>
            <p
              className="section-label"
              style={{
                marginBottom: '0.75rem',
                opacity: entered ? 1 : 0,
                transform: entered ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              Capabilities
            </p>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                fontWeight: 400,
                color: '#F8F3EB',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                opacity: entered ? 1 : 0,
                transform: entered ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
              }}
            >
              Crafted expertise,{' '}
              <em style={{ fontStyle: 'italic', color: '#C49A3C' }}>intentional mastery.</em>
            </h2>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              color: 'rgba(248, 243, 235, 0.4)',
              fontWeight: 300,
              maxWidth: '340px',
              marginBottom: '3rem',
              opacity: entered ? 1 : 0,
              transition: 'opacity 0.8s ease 0.2s',
            }}>
              Scroll to explore each discipline — from pixel-perfect engineering to intelligent AI integration.
            </p>

            {/* Progress dots */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              opacity: entered ? 1 : 0,
              transition: 'opacity 0.8s ease 0.25s',
            }}>
              {skillGroups.map((g, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{
                    width: i === activeIndex ? '28px' : '8px',
                    height: '3px',
                    borderRadius: '2px',
                    background: i === activeIndex ? '#C49A3C' : 'rgba(196, 154, 60, 0.25)',
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                  }} />
                </div>
              ))}
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                color: 'rgba(196, 154, 60, 0.5)',
                marginLeft: '0.5rem',
              }}>
                {String(activeIndex + 1).padStart(2, '0')} / {String(skillGroups.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right: animated skill card */}
          <div style={{ perspective: '1200px' }}>
            <div
              style={{
                opacity: cardVisible ? 1 : 0,
                transform: cardVisible
                  ? 'perspective(1000px) rotateX(0deg) translateY(0)'
                  : 'perspective(1000px) rotateX(8deg) translateY(30px)',
                transition: 'opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1), transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
                background: `rgba(13, 28, 20, 0.7)`,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(196, 154, 60, 0.15)',
                borderRadius: '12px',
                padding: 'clamp(2rem, 3vw, 3rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Card background accent */}
              <div style={{
                position: 'absolute', inset: 0,
                background: group.color,
                pointerEvents: 'none',
              }} />

              {/* Card content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon + number */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '50px', height: '50px',
                    borderRadius: '10px',
                    border: '1px solid rgba(196, 154, 60, 0.2)',
                    background: 'rgba(196, 154, 60, 0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', color: '#C49A3C',
                  }}>
                    {group.icon}
                  </div>
                  <span style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '3rem',
                    fontWeight: 300,
                    color: 'rgba(196, 154, 60, 0.12)',
                    lineHeight: 1,
                  }}>
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Category heading */}
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  color: '#F8F3EB',
                  marginBottom: '0.75rem',
                  lineHeight: 1.2,
                }}>
                  {group.category}
                </h3>

                {/* Summary */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.82rem',
                  lineHeight: 1.75,
                  color: 'rgba(248, 243, 235, 0.5)',
                  fontWeight: 300,
                  marginBottom: '1.75rem',
                }}>
                  {group.summary}
                </p>

                {/* Gold divider */}
                <div style={{ width: '40px', height: '1px', background: 'rgba(196, 154, 60, 0.4)', marginBottom: '1.5rem' }} />

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.7rem',
                        letterSpacing: '0.05em',
                        padding: '0.3rem 0.75rem',
                        background: 'rgba(196, 154, 60, 0.08)',
                        border: '1px solid rgba(196, 154, 60, 0.18)',
                        borderRadius: '9999px',
                        color: 'rgba(248, 243, 235, 0.6)',
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

        {/* Scroll hint — fade out once entered */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          opacity: entered && activeIndex > 0 ? 0 : 0.35,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}>
          <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, transparent, #C49A3C)', animation: 'softPulse 2.5s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C49A3C' }}>Keep scrolling</span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .skills-inner-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
