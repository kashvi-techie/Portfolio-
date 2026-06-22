'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headlineRef.current, subRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 1.1s cubic-bezier(0.23, 1, 0.32, 1), transform 1.1s cubic-bezier(0.23, 1, 0.32, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 250 + i * 200);
    });

    const portrait = portraitRef.current;
    if (portrait) {
      portrait.style.opacity = '0';
      portrait.style.transform = 'translateX(30px) scale(0.97)';
      setTimeout(() => {
        portrait.style.transition = 'opacity 1.4s cubic-bezier(0.23, 1, 0.32, 1), transform 1.4s cubic-bezier(0.23, 1, 0.32, 1)';
        portrait.style.opacity = '1';
        portrait.style.transform = 'translateX(0) scale(1)';
      }, 400);
    }

    const card = cardRef.current;
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1), transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 900);
    }
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #0B1612 0%, #102019 45%, #0F2418 70%, #13241C 100%)',
      }}
    >
      {/* Deep atmospheric layers */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Radial glow center-right */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 70% at 72% 50%, rgba(15, 76, 92, 0.18) 0%, transparent 65%)',
        }} />
        {/* Bottom lotus pond glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(196, 154, 60, 0.05) 0%, transparent 70%)',
        }} />
        {/* Left subtle gold warmth */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 35% 50% at 10% 55%, rgba(196, 154, 60, 0.04) 0%, transparent 60%)',
        }} />
        {/* Vertical divider line */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '47%', width: '1px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(196, 154, 60, 0.1) 25%, rgba(196, 154, 60, 0.07) 75%, transparent 100%)',
        }} />
      </div>

      {/* ─── Main grid ─── */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          maxWidth: '1400px', margin: '0 auto',
          padding: 'clamp(5rem,8vw,8rem) 2rem clamp(4rem,6vw,6rem)',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '3rem',
        }}
        className="hero-grid"
      >
        {/* ── Left: Text ── */}
        <div style={{ maxWidth: '580px' }}>

          <div ref={subRef as React.RefObject<HTMLParagraphElement>}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C49A3C',
              marginBottom: '0.5rem',
            }}>
              Hi, I&apos;m
            </p>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
              fontWeight: 600,
              color: '#C49A3C',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Kashvi Pundir
            </h2>
          </div>

          <div ref={headlineRef}>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.6rem, 5.2vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1.06,
              color: '#F8F3EB',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em',
            }}>
              I design digital{' '}
              <em style={{ fontStyle: 'italic', color: '#C49A3C', display: 'block' }}>
                experiences
              </em>
              that are thoughtful, intelligent &amp; timeless.
            </h1>
          </div>

          <p ref={subRef as React.RefObject<HTMLParagraphElement>} style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            lineHeight: 1.75,
            color: 'rgba(248, 243, 235, 0.5)',
            marginBottom: '2.5rem',
            maxWidth: '380px',
            fontWeight: 300,
          }}>
            UI Engineer &amp; Product Designer building AI-native products with
            clean code and meaningful design.
          </p>

          <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.85rem 2rem',
                background: 'rgba(196, 154, 60, 0.12)',
                border: '1px solid rgba(196, 154, 60, 0.5)',
                borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                color: '#E0C472',
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(196, 154, 60, 0.22)';
                el.style.borderColor = 'rgba(196, 154, 60, 0.8)';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 8px 30px rgba(196, 154, 60, 0.15)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(196, 154, 60, 0.12)';
                el.style.borderColor = 'rgba(196, 154, 60, 0.5)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              Explore My Work ↗
            </a>

            <a
              href="https://drive.google.com/file/d/1_m6QBtwk-sG62psjpfqGgzv0XeZ_ISb1/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 1.5rem',
                background: 'transparent',
                border: '1px solid rgba(248, 243, 235, 0.15)',
                borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                color: 'rgba(248, 243, 235, 0.45)',
                textDecoration: 'none',
                transition: 'all 0.35s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#C49A3C';
                el.style.borderColor = 'rgba(196, 154, 60, 0.4)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = 'rgba(248, 243, 235, 0.45)';
                el.style.borderColor = 'rgba(248, 243, 235, 0.15)';
              }}
            >
              View Resume ↓
            </a>
          </div>
        </div>

        {/* ── Right: Portrait + Availability card ── */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

          {/* Portrait frame */}
          <div
            ref={portraitRef}
            style={{
              position: 'relative',
              width: 'min(380px, 100%)',
              flexShrink: 0,
            }}
          >
            {/* Outer glow ring */}
            <div style={{
              position: 'absolute', inset: '-2px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(196, 154, 60, 0.25) 0%, rgba(196, 154, 60, 0.05) 50%, rgba(27, 107, 115, 0.15) 100%)',
              zIndex: 0,
            }} />

            {/* Portrait container */}
            <div style={{
              position: 'relative', zIndex: 1,
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid rgba(196, 154, 60, 0.2)',
              aspectRatio: '3/4',
              background: '#102019',
            }}>
              {/* Lotus background behind portrait */}
              <img
                src="https://images.pexels.com/photos/1477320/pexels-photo-1477320.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                  opacity: 0.25,
                  filter: 'saturate(0.3) brightness(0.5)',
                }}
              />

              {/* Atmospheric overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(15, 76, 92, 0.25) 0%, rgba(11, 22, 18, 0.1) 40%, rgba(11, 22, 18, 0.55) 100%)',
                zIndex: 1,
              }} />

              {/* Actual portrait */}
              <img
                src="/images/image%20copy.png"
                alt="Kashvi Pundir"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  zIndex: 2,
                  mixBlendMode: 'luminosity',
                  filter: 'brightness(0.85) contrast(1.05)',
                }}
              />

              {/* Gold tint overlay */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 3,
                background: 'linear-gradient(to bottom, rgba(196, 154, 60, 0.06) 0%, transparent 40%, rgba(11, 22, 18, 0.6) 100%)',
              }} />

              {/* Decorative corner ornament */}
              <div style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 4,
                width: '28px', height: '28px', opacity: 0.5,
              }}>
                <svg viewBox="0 0 28 28" fill="none">
                  <path d="M14 2 L14 26 M2 14 L26 14" stroke="#C49A3C" strokeWidth="0.5" />
                  <circle cx="14" cy="14" r="5" stroke="#C49A3C" strokeWidth="0.5" fill="none" />
                </svg>
              </div>
            </div>

            {/* Availability card - overlapping bottom-right */}
            <div
              ref={cardRef}
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1.5rem',
                width: '200px',
                zIndex: 10,
                background: 'rgba(13, 28, 20, 0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(196, 154, 60, 0.2)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}
            >
              <svg viewBox="0 0 32 32" fill="none" style={{ width: '24px', height: '24px', marginBottom: '0.75rem' }}>
                <path d="M16 3c0 0-7 5-7 11s7 10 7 10 7-4 7-10S16 3 16 3z" stroke="#C49A3C" strokeWidth="1" fill="rgba(196,154,60,0.07)" />
                <path d="M9 16c-4 0-6 4-6 4s4 3 7 1M23 16c4 0 6 4 6 4s-4 3-7 1" stroke="#C49A3C" strokeWidth="0.8" fill="none" />
              </svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(196, 154, 60, 0.65)', marginBottom: '0.35rem' }}>
                Available for
              </p>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 500, color: '#F8F3EB', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Freelance &amp; Full-time
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', lineHeight: 1.5, color: 'rgba(248, 243, 235, 0.4)', fontWeight: 300 }}>
                Let&apos;s build something meaningful together.
              </p>
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'softPulse 2s ease-in-out infinite', display: 'block' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: 'rgba(248, 243, 235, 0.35)', letterSpacing: '0.06em' }}>
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to top, #0B1612 0%, transparent 100%)', zIndex: 5 }} />

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.35 }}>
        <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, transparent, #C49A3C)', animation: 'softPulse 2.5s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C49A3C' }}>Scroll</span>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
