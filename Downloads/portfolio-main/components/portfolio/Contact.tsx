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
        background: '#0B1612',
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
          {/* Primary lotus pond — more visible */}
          <img
            src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 60%',
              opacity: 0.32,
              filter: 'saturate(0.4) brightness(0.45)',
            }}
          />
          {/* Second lotus layer for depth */}
          <img
            src="https://images.pexels.com/photos/1477320/pexels-photo-1477320.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '55%',
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: 0.18,
              filter: 'saturate(0.3) brightness(0.5)',
              mixBlendMode: 'screen',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(15, 76, 92, 0.15) 0%, transparent 65%)',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, #0B1612 0%, rgba(11, 22, 18, 0.25) 30%, rgba(11, 22, 18, 0.2) 65%, #0B1612 100%)',
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
                border: '1px solid rgba(196, 154, 60, 0.08)',
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
                stroke="#C49A3C"
                strokeWidth="1"
                fill="rgba(196, 154, 60, 0.06)"
              />
              <path
                d="M24 10c0 0-6 6-6 14s6 12 6 12 6-4 6-12-6-14-6-14z"
                stroke="#C49A3C"
                strokeWidth="0.8"
                fill="rgba(196, 154, 60, 0.04)"
              />
              <path
                d="M14 24c-6 0-10 6-10 6s6 6 12 3"
                stroke="#C49A3C"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M34 24c6 0 10 6 10 6s-6 6-12 3"
                stroke="#C49A3C"
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
              color: '#F8F3EB',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              transitionDelay: '0.1s',
            }}
          >
            Let&apos;s create something{' '}
            <em style={{ fontStyle: 'italic', color: '#C49A3C' }}>meaningful</em>{' '}
            together.
          </h2>

          <p
            className="reveal"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: 'rgba(248, 243, 235, 0.45)',
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
                background: 'rgba(196, 154, 60, 0.12)',
                border: '1px solid rgba(196, 154, 60, 0.4)',
                borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                color: '#E0C472',
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(196, 154, 60, 0.22)';
                el.style.borderColor = 'rgba(196, 154, 60, 0.7)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(196, 154, 60, 0.12)';
                el.style.borderColor = 'rgba(196, 154, 60, 0.4)';
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
                border: '1px solid rgba(248, 243, 235, 0.15)',
                borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                color: 'rgba(248, 243, 235, 0.5)',
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(196, 154, 60, 0.3)';
                el.style.color = '#C49A3C';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(248, 243, 235, 0.15)';
                el.style.color = 'rgba(248, 243, 235, 0.5)';
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
          'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/1477320/pexels-photo-1477320.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg?auto=compress&cs=tinysrgb&w=400',
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
                filter: 'saturate(0.25) brightness(0.45)',
                transition: 'filter 0.6s ease, transform 0.6s ease',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.filter = 'saturate(0.5) brightness(0.55)';
                img.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.filter = 'saturate(0.25) brightness(0.45)';
                img.style.transform = 'scale(1)';
              }}
            />
            {/* Gold overlay at bottom */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(11,22,18,0.8) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />
          </div>
        ))}
        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '60px',
          background: 'linear-gradient(to bottom, #0B1612, transparent)',
          pointerEvents: 'none', zIndex: 1,
        }} />
      </div>

      {/* Bottom footer bar */}
      <div
        style={{
          borderTop: '1px solid rgba(196, 154, 60, 0.1)',
          padding: '1.75rem 2rem',
          background: 'rgba(11, 22, 18, 0.8)',
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
              color: 'rgba(248, 243, 235, 0.3)',
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
              { label: 'kashvipcm@gmail.com', href: 'mailto:kashvipcm@gmail.com', icon: '✉' },
              { label: 'Greater Noida, India', href: '#', icon: '◎' },
              { label: 'GitHub', href: 'https://github.com/kashvi-techie', icon: '⬡' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kashvi-pundir-3502183b1', icon: '◈' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  color: 'rgba(248, 243, 235, 0.38)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'color 0.3s ease',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#C49A3C';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(248, 243, 235, 0.38)';
                }}
              >
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{link.icon}</span>
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
              border: '1px solid rgba(196, 154, 60, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C49A3C',
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.35s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(196, 154, 60, 0.12)';
              el.style.borderColor = '#C49A3C';
              el.style.transform = 'rotate(45deg)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'transparent';
              el.style.borderColor = 'rgba(196, 154, 60, 0.35)';
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
              stroke="#C49A3C"
              strokeWidth="0.8"
              fill="none"
            />
            <line x1="0" y1="6" x2="16" y2="6" stroke="#C49A3C" strokeWidth="0.5" />
            <line x1="32" y1="6" x2="48" y2="6" stroke="#C49A3C" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
