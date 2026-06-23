'use client';

import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          padding: scrolled ? '0.75rem 2rem' : '1.5rem 2rem',
          background: scrolled ? 'rgba(14, 27, 21, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(227, 188, 94, 0.1)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, '#home')}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.5rem',
              fontWeight: 500,
              color: '#FBF7F0',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              textDecoration: 'none',
            }}
          >
            KP
            <span style={{
              display: 'inline-block',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#E3BC5E',
              marginBottom: '8px',
              animation: 'softPulse 3s ease-in-out infinite',
            }} />
          </a>

          {/* Hamburger — always visible */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: '1px solid rgba(227, 188, 94, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              padding: '0.55rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(227, 188, 94, 0.7)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(227, 188, 94, 0.3)';
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: '#E3BC5E',
                  transition: 'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
                  transformOrigin: 'center',
                  transform:
                    menuOpen && i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                    : menuOpen && i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                    : menuOpen && i === 1 ? 'scaleX(0) opacity(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          opacity: menuOpen ? 1 : 0,
          background: 'rgba(8, 17, 13, 0.97)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Decorative background lotus */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60vmin', height: '60vmin',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(227, 188, 94, 0.04) 0%, transparent 70%)',
          }} />
          <svg
            viewBox="0 0 200 200"
            fill="none"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', opacity: 0.04 }}
          >
            <path d="M100 10c0 0-40 30-40 70s40 80 40 80 40-40 40-80S100 10 100 10z" stroke="#E3BC5E" strokeWidth="1" />
            <path d="M100 30c0 0-25 22-25 50s25 60 25 60 25-32 25-60S100 30 100 30z" stroke="#E3BC5E" strokeWidth="1" />
            <path d="M50 80c-25 0-40 25-40 25s20 20 40 12M150 80c25 0 40 25 40 25s-20 20-40 12" stroke="#E3BC5E" strokeWidth="1" />
          </svg>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', position: 'relative', zIndex: 1 }}>
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 300,
                color: '#FBF7F0',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                lineHeight: 1.3,
                transition: 'color 0.3s ease, transform 0.3s ease, letter-spacing 0.4s ease',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${0.05 + i * 0.07}s`,
                display: 'block',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#E3BC5E';
                el.style.letterSpacing = '0.12em';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = '#FBF7F0';
                el.style.letterSpacing = '0.04em';
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Contact detail at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
            opacity: menuOpen ? 0.5 : 0,
            transition: 'opacity 0.5s ease 0.35s',
          }}
        >
          <a href="mailto:kashvipcm@gmail.com" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#E3BC5E', textDecoration: 'none', letterSpacing: '0.1em' }}>
            kashvipcm@gmail.com
          </a>
          <div style={{ width: '1px', height: '16px', background: 'rgba(227, 188, 94, 0.3)' }} />
          <a href="https://github.com/kashvi-techie" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(251, 247, 240, 0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#E3BC5E'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(251, 247, 240, 0.4)'; }}
          >
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/kashvi-pundir-3502183b1" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(251, 247, 240, 0.4)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#E3BC5E'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(251, 247, 240, 0.4)'; }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
