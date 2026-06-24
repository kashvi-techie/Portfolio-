'use client';

import { useEffect, useRef } from 'react';

// Linear interpolation helper
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

// Approximation of power3.out / cubic-bezier(0.16,1,0.3,1) for JS-side easing
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  // Refs for the scroll-driven finale
  const footerRef = useRef<HTMLElement | null>(null);
  const lotusRef = useRef<SVGSVGElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const sayHelloRef = useRef<HTMLAnchorElement>(null);
  const linkedInRef = useRef<HTMLAnchorElement>(null);
  // Smoothed progress kept across rAF frames
  const progressRef = useRef<number>(0);

  // Reveal-on-scroll observer (existing behaviour)
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

  // Scroll-end cinematic finale: one progress drives background, lotus bloom & CTA spread
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const el = footerRef.current;
    if (!el) return;

    // From dark green → deep charcoal velvet
    const FROM = { r: 0x0e, g: 0x1b, b: 0x15 }; // #0E1B15
    const TO = { r: 0x14, g: 0x10, b: 0x14 }; // #141014

    let rafId = 0;
    let needsFrame = false;

    const applyProgress = (p: number) => {
      const eased = easeOutCubic(p);

      // 1. Background interpolation
      const r = Math.round(lerp(FROM.r, TO.r, eased));
      const g = Math.round(lerp(FROM.g, TO.g, eased));
      const b = Math.round(lerp(FROM.b, TO.b, eased));
      el.style.background = `rgb(${r}, ${g}, ${b})`;

      // 2. Wireframe lotus bloom — scale up to ~2.5, fade up subtly
      const lotus = lotusRef.current;
      if (lotus) {
        const scale = lerp(1, 2.5, eased);
        lotus.style.transform = `translate(-50%, -50%) scale(${scale})`;
        lotus.style.opacity = String(lerp(0.06, 0.22, eased));
        // Outer petals open outward
        const open = eased;
        lotus.style.setProperty('--petal-open', String(open));
      }

      // 3. CTA links slide apart symmetrically.
      // Spread is exposed as a CSS var so hover lift can compose with it.
      const spread = lerp(0, 64, eased); // px each side
      if (sayHelloRef.current) {
        sayHelloRef.current.style.setProperty('--spread', `${-spread}px`);
      }
      if (linkedInRef.current) {
        linkedInRef.current.style.setProperty('--spread', `${spread}px`);
      }
      if (ctaRowRef.current) {
        ctaRowRef.current.style.gap = `${lerp(1, 2.4, eased)}rem`;
      }
    };

    if (reduceMotion) {
      // Calm final state — show the resolved finale without scroll animation
      progressRef.current = 1;
      applyProgress(1);
      return;
    }

    const computeTarget = (): number => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 when the footer top first enters the viewport bottom,
      // 1 once the footer top reaches the upper portion of the viewport (fills view).
      const start = vh; // footer top at viewport bottom
      const end = vh * 0.2; // footer top near the top => fully "filled"
      const raw = (start - rect.top) / (start - end);
      return Math.min(1, Math.max(0, raw));
    };

    const tick = () => {
      const target = computeTarget();
      // Smooth toward target for a fluid cinematic feel
      progressRef.current = lerp(progressRef.current, target, 0.12);
      if (Math.abs(progressRef.current - target) < 0.001) {
        progressRef.current = target;
      }
      applyProgress(progressRef.current);

      if (Math.abs(progressRef.current - target) > 0.0005) {
        rafId = requestAnimationFrame(tick);
      } else {
        needsFrame = false;
      }
    };

    const schedule = () => {
      if (!needsFrame) {
        needsFrame = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => schedule();
    const onResize = () => schedule();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Initialise on mount
    schedule();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={(node) => {
        sectionRef.current = node;
        footerRef.current = node;
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#0E1B15',
        transition: 'background 0.2s linear',
        willChange: 'background',
      }}
    >
      {/* Main contact hero area */}
      <div
        style={{
          position: 'relative',
          padding: '8rem 2rem 6rem',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Lotus pond background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          {/* Primary lotus pond — real lotus, more visible */}
          <img
            src="/images/lotus/lotus-open.jpg"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 55%',
              opacity: 0.38,
              filter: 'saturate(0.7) brightness(0.6)',
            }}
          />
          {/* Second lotus layer for depth */}
          <img
            src="/images/lotus/lotus-dark.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '60%',
              objectFit: 'cover',
              objectPosition: 'center center',
              opacity: 0.5,
              filter: 'saturate(1.05) brightness(1)',
              mixBlendMode: 'screen',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(31, 122, 132, 0.15) 0%, transparent 65%)',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, #0E1B15 0%, rgba(14, 27, 21, 0.25) 30%, rgba(14, 27, 21, 0.2) 65%, #0E1B15 100%)',
            }}
          />

          {/* Ripple rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '30%',
                transform: 'translateX(-50%)',
                width: `${80 + i * 60}px`,
                height: `${40 + i * 30}px`,
                borderRadius: '50%',
                border: '1px solid rgba(227, 188, 94, 0.08)',
                animation: `ripple ${3 + i * 1.5}s ease-out ${i * 1.5}s infinite`,
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>

        {/* Scroll-end wireframe vector lotus — blooms behind the CTA */}
        <svg
          ref={lotusRef}
          viewBox="0 0 200 200"
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'min(520px, 90vw)',
            height: 'min(520px, 90vw)',
            transform: 'translate(-50%, -50%) scale(1)',
            transformOrigin: 'center center',
            opacity: 0.06,
            zIndex: 1,
            pointerEvents: 'none',
            transition:
              'transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.45s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'transform, opacity',
            ['--petal-open' as string]: '0',
          }}
        >
          {/* Inner / core petals — stay put, define the heart of the bloom */}
          <g fill="none" stroke="#E9C46A" strokeWidth="0.6" strokeLinecap="round">
            <path d="M100 100 C 92 70, 92 50, 100 30 C 108 50, 108 70, 100 100 Z" />
            <path d="M100 100 C 116 74, 132 62, 150 56 C 142 78, 126 92, 100 100 Z" />
            <path d="M100 100 C 84 74, 68 62, 50 56 C 58 78, 74 92, 100 100 Z" />
            <path d="M100 100 C 120 84, 140 82, 160 86 C 146 102, 124 104, 100 100 Z" />
            <path d="M100 100 C 80 84, 60 82, 40 86 C 54 102, 76 104, 100 100 Z" />
          </g>
          {/* Outer petals — open / radiate outward as progress → 1 */}
          <g
            fill="none"
            stroke="#F2D58A"
            strokeWidth="0.5"
            strokeLinecap="round"
            className="lotus-outer"
          >
            <path className="petal-top" d="M100 100 C 90 60, 90 36, 100 14 C 110 36, 110 60, 100 100 Z" />
            <path className="petal-tr" d="M100 100 C 124 70, 150 54, 176 46 C 164 74, 140 94, 100 100 Z" />
            <path className="petal-tl" d="M100 100 C 76 70, 50 54, 24 46 C 36 74, 60 94, 100 100 Z" />
            <path className="petal-br" d="M100 100 C 126 88, 154 90, 182 96 C 162 116, 130 112, 100 100 Z" />
            <path className="petal-bl" d="M100 100 C 74 88, 46 90, 18 96 C 38 116, 70 112, 100 100 Z" />
          </g>
        </svg>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '700px' }}>
          {/* Lotus icon */}
          <div className="reveal" style={{ marginBottom: '2rem' }}>
            <svg
              viewBox="0 0 48 48"
              fill="none"
              style={{ width: '40px', height: '40px', margin: '0 auto', opacity: 0.5 }}
            >
              <path
                d="M24 6c0 0-10 8-10 18s10 16 10 16 10-6 10-16S24 6 24 6z"
                stroke="#E3BC5E"
                strokeWidth="1"
                fill="rgba(227, 188, 94, 0.06)"
              />
              <path
                d="M24 10c0 0-6 6-6 14s6 12 6 12 6-4 6-12-6-14-6-14z"
                stroke="#E3BC5E"
                strokeWidth="0.8"
                fill="rgba(227, 188, 94, 0.04)"
              />
              <path
                d="M14 24c-6 0-10 6-10 6s6 6 12 3"
                stroke="#E3BC5E"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M34 24c6 0 10 6 10 6s-6 6-12 3"
                stroke="#E3BC5E"
                strokeWidth="0.8"
                fill="none"
              />
            </svg>
          </div>

          <h2
            className="reveal"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 400,
              color: '#FBF7F0',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              transitionDelay: '0.1s',
            }}
          >
            Let&apos;s create something{' '}
            <em style={{ fontStyle: 'italic', color: '#E3BC5E' }}>meaningful</em>{' '}
            together.
          </h2>

          <p
            className="reveal"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: 'rgba(251, 247, 240, 0.45)',
              fontWeight: 300,
              marginBottom: '3rem',
              transitionDelay: '0.2s',
            }}
          >
            Available for freelance projects and full-time opportunities. Let&apos;s talk.
          </p>

          <div
            ref={ctaRowRef}
            className="reveal"
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              transitionDelay: '0.3s',
              willChange: 'gap',
            }}
          >
            <a
              ref={sayHelloRef}
              href="mailto:kashvipcm@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 2rem',
                background: 'rgba(227, 188, 94, 0.12)',
                border: '1px solid rgba(227, 188, 94, 0.4)',
                borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                color: '#F6E3AD',
                textDecoration: 'none',
                transform: 'translateX(var(--spread, 0px)) translateY(var(--lift, 0px))',
                ['--spread' as string]: '0px',
                ['--lift' as string]: '0px',
                transition:
                  'transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                willChange: 'transform',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(227, 188, 94, 0.22)';
                el.style.borderColor = 'rgba(227, 188, 94, 0.7)';
                el.style.setProperty('--lift', '-2px');
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(227, 188, 94, 0.12)';
                el.style.borderColor = 'rgba(227, 188, 94, 0.4)';
                el.style.setProperty('--lift', '0px');
              }}
            >
              Say Hello ✦
            </a>

            <a
              ref={linkedInRef}
              href="https://www.linkedin.com/in/kashvi-pundir-3502183b1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 1.75rem',
                background: 'transparent',
                border: '1px solid rgba(251, 247, 240, 0.15)',
                borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                color: 'rgba(251, 247, 240, 0.5)',
                textDecoration: 'none',
                transform: 'translateX(var(--spread, 0px))',
                ['--spread' as string]: '0px',
                transition:
                  'transform 0.45s cubic-bezier(0.16,1,0.3,1), border-color 0.4s cubic-bezier(0.23, 1, 0.32, 1), color 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                willChange: 'transform',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(227, 188, 94, 0.3)';
                el.style.color = '#E3BC5E';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(251, 247, 240, 0.15)';
                el.style.color = 'rgba(251, 247, 240, 0.5)';
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Lotus image strip */}
      <div
        style={{
          display: 'flex',
          gap: '1px',
          overflow: 'hidden',
          height: '200px',
          position: 'relative',
        }}
      >
        {[
          '/images/lotus/lotus-open.jpg',
          '/images/lotus/lotus-dark.jpg',
          '/images/lotus/lotus-bud.jpg',
          '/images/lotus/lotus-leaf.jpg',
          '/images/lotus/lotus-open.jpg',
        ].map((src, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              overflow: 'hidden',
              position: 'relative',
              transition: 'flex 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.flex = '2'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.flex = '1'; }}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'saturate(0.75) brightness(0.72)',
                transition: 'filter 0.6s ease, transform 0.6s ease',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.filter = 'saturate(1) brightness(0.95)';
                img.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.filter = 'saturate(0.75) brightness(0.72)';
                img.style.transform = 'scale(1)';
              }}
            />
            {/* Gold overlay at bottom */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(14,27,21,0.8) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />
          </div>
        ))}
        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '60px',
          background: 'linear-gradient(to bottom, #0E1B15, transparent)',
          pointerEvents: 'none', zIndex: 1,
        }} />
      </div>

      {/* Bottom footer bar */}
      <div
        style={{
          borderTop: '1px solid rgba(227, 188, 94, 0.1)',
          padding: '1.75rem 2rem',
          background: 'rgba(14, 27, 21, 0.8)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              color: 'rgba(251, 247, 240, 0.3)',
              letterSpacing: '0.05em',
            }}
          >
            © 2026 Kashvi Pundir. All rights reserved.
          </p>

          {/* Contact links */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {[
              { label: 'kashvipcm@gmail.com', href: 'mailto:kashvipcm@gmail.com', icon: 'M3 5h18v14H3z M3 6l9 7 9-7', fillIcon: false },
              { label: 'Greater Noida, India', href: 'https://maps.google.com/?q=Greater+Noida,+India', icon: 'M12 22s7-7.6 7-13a7 7 0 1 0-14 0c0 5.4 7 13 7 13z M12 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z', fillIcon: false },
              { label: 'GitHub', href: 'https://github.com/kashvi-techie', icon: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.4 4.7-4.6 4.9.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z', fillIcon: true },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kashvi-pundir-3502183b1', icon: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z', fillIcon: true },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  color: 'rgba(251, 247, 240, 0.38)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'color 0.3s ease',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#E3BC5E';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(251, 247, 240, 0.38)';
                }}
              >
                <svg viewBox="0 0 24 24" fill={link.fillIcon ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={link.fillIcon ? 0 : 1.4} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px', opacity: 0.8 }}>
                  <path d={link.icon} />
                </svg>
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA circle */}
          <a
            href="mailto:kashvipcm@gmail.com"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(227, 188, 94, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E3BC5E',
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.35s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(227, 188, 94, 0.12)';
              el.style.borderColor = '#E3BC5E';
              el.style.transform = 'rotate(45deg)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'transparent';
              el.style.borderColor = 'rgba(227, 188, 94, 0.35)';
              el.style.transform = 'rotate(0deg)';
            }}
          >
            ↗
          </a>
        </div>

        {/* Lotus divider */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', opacity: 0.2 }}>
          <svg viewBox="0 0 48 12" style={{ width: '48px' }}>
            <path
              d="M24 1c0 0-5 3-5 5s5 5 5 5 5-3 5-5-5-5-5-5z"
              stroke="#E3BC5E"
              strokeWidth="0.8"
              fill="none"
            />
            <line x1="0" y1="6" x2="16" y2="6" stroke="#E3BC5E" strokeWidth="0.5" />
            <line x1="32" y1="6" x2="48" y2="6" stroke="#E3BC5E" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        /* Outer petals of the finale lotus radiate outward as --petal-open → 1 */
        .lotus-outer path {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lotus-outer .petal-top {
          transform: translateY(calc(var(--petal-open, 0) * -14px));
        }
        .lotus-outer .petal-tr {
          transform: translate(
              calc(var(--petal-open, 0) * 12px),
              calc(var(--petal-open, 0) * -8px)
            )
            rotate(calc(var(--petal-open, 0) * 10deg));
        }
        .lotus-outer .petal-tl {
          transform: translate(
              calc(var(--petal-open, 0) * -12px),
              calc(var(--petal-open, 0) * -8px)
            )
            rotate(calc(var(--petal-open, 0) * -10deg));
        }
        .lotus-outer .petal-br {
          transform: translate(
              calc(var(--petal-open, 0) * 14px),
              calc(var(--petal-open, 0) * 6px)
            )
            rotate(calc(var(--petal-open, 0) * 12deg));
        }
        .lotus-outer .petal-bl {
          transform: translate(
              calc(var(--petal-open, 0) * -14px),
              calc(var(--petal-open, 0) * 6px)
            )
            rotate(calc(var(--petal-open, 0) * -12deg));
        }

        @media (prefers-reduced-motion: reduce) {
          .lotus-outer path {
            transition: none;
          }
        }
      `}</style>
    </footer>
  );
}
