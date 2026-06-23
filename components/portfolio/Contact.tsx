'use client';

import { useEffect, useRef } from 'react';

export default function Contact() {
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
    <footer
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#0E1B15',
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
            className="reveal"
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              transitionDelay: '0.3s',
            }}
          >
            <a
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
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(227, 188, 94, 0.22)';
                el.style.borderColor = 'rgba(227, 188, 94, 0.7)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(227, 188, 94, 0.12)';
                el.style.borderColor = 'rgba(227, 188, 94, 0.4)';
                el.style.transform = 'translateY(0)';
              }}
            >
              Say Hello ✦
            </a>

            <a
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
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
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
    </footer>
  );
}
