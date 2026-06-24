'use client';

import { useEffect, useRef } from 'react';

/* Small lotus glyph used for the CTA corner-bloom effect */
function CornerLotus({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  return (
    <span className={`corner-lotus ${pos}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M12 3c0 0-4 4-4 8s4 7 4 7 4-3 4-7-4-8-4-8z" fill="rgba(248,231,180,0.9)" stroke="#E9C46A" strokeWidth="0.8" />
        <path d="M12 7c0 0-7 0-9 5 0 0 5 4 9 1M12 7c0 0 7 0 9 5 0 0-5 4-9 1" fill="rgba(233,196,106,0.55)" stroke="#E9C46A" strokeWidth="0.6" />
      </svg>
    </span>
  );
}

const socials = [
  { label: 'Email', href: 'mailto:kashvipcm@gmail.com',
    path: 'M3 5h18v14H3z M3 6l9 7 9-7' },
  { label: 'GitHub', href: 'https://github.com/kashvi-techie',
    path: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.4 4.7-4.6 4.9.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kashvi-pundir-3502183b1',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z' },
];

/* Wireframe lotus petals: outer ring (8) + inner ring (8). Order must match the
   geometry computed in the magnet effect. Each petal points "north" then rotates. */
const PETALS: { angle: number; len: number; w: number }[] = [
  ...Array.from({ length: 8 }, (_, i) => ({ angle: i * 45, len: 150, w: 30 })),
  ...Array.from({ length: 8 }, (_, i) => ({ angle: i * 45 + 22.5, len: 96, w: 20 })),
];

function petalPath(L: number, w: number): string {
  const cx = 200;
  const cy = 200;
  return `M${cx} ${cy} C ${cx - w} ${cy - L * 0.45}, ${cx - w * 0.5} ${cy - L * 0.9}, ${cx} ${cy - L} C ${cx + w * 0.5} ${cy - L * 0.9}, ${cx + w} ${cy - L * 0.45}, ${cx} ${cy} Z`;
}

export default function Hero() {
  const nameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const lotusRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lotusBgRef = useRef<HTMLDivElement>(null);
  const lotusSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const POWER3 = 'cubic-bezier(0.16, 1, 0.3, 1)'; // ~ power3.out
    const STAGGER = 80;
    const BASE = 150;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Left text (name, sub, cta, social): staggered slide-up + fade
    const leftEls = [nameRef.current, subRef.current, ctaRef.current, socialRef.current];
    leftEls.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      timers.push(
        setTimeout(() => {
          el.style.transition = `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, reduce ? 0 : BASE + i * STAGGER),
      );
    });

    // Headline: per-line clip-mask reveal — lines slide up from 110% → 0
    const lines = headlineRef.current
      ? Array.from(headlineRef.current.querySelectorAll<HTMLElement>('.line-inner'))
      : [];
    lines.forEach((el, i) => {
      el.style.transform = 'translateY(110%)';
      timers.push(
        setTimeout(() => {
          el.style.transition = `transform 0.9s ${POWER3}`;
          el.style.transform = 'translateY(0)';
        }, reduce ? 0 : BASE + 60 + i * 110),
      );
    });

    // Background wireframe lotus: scale 0.8 → 1 + slight rotate, power3.out
    const lotusBg = lotusBgRef.current;
    if (lotusBg) {
      lotusBg.style.opacity = '0';
      lotusBg.style.transform = 'scale(0.8) rotate(-6deg)';
      timers.push(
        setTimeout(() => {
          lotusBg.style.transition = `opacity 1.6s ${POWER3}, transform 1.8s ${POWER3}`;
          lotusBg.style.opacity = '1';
          lotusBg.style.transform = 'scale(1) rotate(0deg)';
        }, reduce ? 0 : BASE),
      );
    }

    // Right canvas: gentle scale-in 0.95 → 1
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.opacity = '0';
      canvas.style.transform = 'scale(0.95)';
      timers.push(
        setTimeout(() => {
          canvas.style.transition = `opacity 0.9s ${EASE}, transform 0.9s ${EASE}`;
          canvas.style.opacity = '1';
          canvas.style.transform = 'scale(1)';
        }, reduce ? 0 : BASE + STAGGER),
      );
    }

    // ── Pointer interactions: portrait tilt + lotus petal magnet ──
    const section = sectionRef.current;
    const tilt = tiltRef.current;
    const svg = lotusSvgRef.current;
    const petals = svg ? Array.from(svg.querySelectorAll<SVGGElement>('.magnet-petal')) : [];
    const petalGeom = PETALS.map((p) => {
      const a = (p.angle * Math.PI) / 180;
      return { tx: 200 + p.len * Math.sin(a), ty: 200 - p.len * Math.cos(a) };
    });
    const petalCur = petals.map(() => ({ x: 0, y: 0 }));
    const petalTarget = petals.map(() => ({ x: 0, y: 0 }));
    let mx = -1;
    let my = -1;
    let tiltX = 0;
    let tiltY = 0;
    let tiltTX = 0;
    let tiltTY = 0;
    let raf = 0;
    let running = true;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const updateTargets = () => {
      if (tilt && mx >= 0) {
        const r = tilt.getBoundingClientRect();
        const dx = (mx - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (my - (r.top + r.height / 2)) / window.innerHeight;
        tiltTY = Math.max(-8, Math.min(8, dx * 22));
        tiltTX = Math.max(-8, Math.min(8, -dy * 22));
      } else {
        tiltTX = 0;
        tiltTY = 0;
      }
      if (svg && petals.length) {
        const r = svg.getBoundingClientRect();
        const scale = r.width / 400;
        if (mx >= 0 && scale > 0) {
          const px = (mx - r.left) / scale;
          const py = (my - r.top) / scale;
          const INFLUENCE = 230;
          const MAXPULL = 16;
          for (let i = 0; i < petals.length; i += 1) {
            const vx = px - petalGeom[i].tx;
            const vy = py - petalGeom[i].ty;
            const d = Math.hypot(vx, vy) || 1;
            const pull = Math.max(0, Math.min(MAXPULL, MAXPULL * (1 - d / INFLUENCE)));
            petalTarget[i].x = (vx / d) * pull;
            petalTarget[i].y = (vy / d) * pull;
          }
        } else {
          for (let i = 0; i < petals.length; i += 1) {
            petalTarget[i].x = 0;
            petalTarget[i].y = 0;
          }
        }
      }
    };

    const tick = () => {
      if (!running) return;
      tiltX = lerp(tiltX, tiltTX, 0.1);
      tiltY = lerp(tiltY, tiltTY, 0.1);
      if (tilt) {
        tilt.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }
      for (let i = 0; i < petals.length; i += 1) {
        petalCur[i].x = lerp(petalCur[i].x, petalTarget[i].x, 0.12);
        petalCur[i].y = lerp(petalCur[i].y, petalTarget[i].y, 0.12);
        petals[i].setAttribute(
          'transform',
          `translate(${petalCur[i].x.toFixed(2)} ${petalCur[i].y.toFixed(2)})`,
        );
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      updateTargets();
    };
    const onLeave = () => {
      mx = -1;
      my = -1;
      updateTargets();
    };

    const finePointer =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches;

    if (section && finePointer && !reduce) {
      section.addEventListener('mousemove', onMove);
      section.addEventListener('mouseleave', onLeave);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      timers.forEach((t) => clearTimeout(t));
      cancelAnimationFrame(raf);
      if (section) {
        section.removeEventListener('mousemove', onMove);
        section.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #0E1B15 0%, #15291F 45%, #123424 70%, #173026 100%)',
      }}
    >
      {/* Deep atmospheric layers — brighter */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 70% at 72% 45%, rgba(31, 122, 132, 0.28) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 45% at 50% 100%, rgba(233, 196, 106, 0.10) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 40% 55% at 8% 50%, rgba(233, 196, 106, 0.08) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '47%', width: '1px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(233, 196, 106, 0.16) 25%, rgba(233, 196, 106, 0.1) 75%, transparent 100%)',
        }} className="hide-mobile" />
      </div>

      {/* Wireframe vector lotus — background; petals magnet toward the cursor */}
      <div
        aria-hidden="true"
        className="hide-mobile"
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          paddingLeft: '14%', overflow: 'hidden',
        }}
      >
        <div ref={lotusBgRef} style={{ width: 'min(720px, 60vw)', maxWidth: '92vw', willChange: 'transform, opacity' }}>
          <svg ref={lotusSvgRef} viewBox="0 0 400 400" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {PETALS.map((p, i) => (
              <g className="magnet-petal" key={i}>
                <g transform={`rotate(${p.angle} 200 200)`}>
                  <path d={petalPath(p.len, p.w)} fill="rgba(233, 196, 106, 0.03)" stroke="rgba(233, 196, 106, 0.4)" strokeWidth="1" />
                </g>
              </g>
            ))}
            <circle cx="200" cy="200" r="13" fill="none" stroke="rgba(233, 196, 106, 0.55)" strokeWidth="1" />
            <circle cx="200" cy="200" r="4.5" fill="rgba(233, 196, 106, 0.5)" />
          </svg>
        </div>
      </div>

      {/* ─── Main grid ─── */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          maxWidth: '1400px', margin: '0 auto',
          padding: 'clamp(4.5rem, 7vh, 6rem) clamp(1.25rem,4vw,2rem) clamp(2.5rem, 5vh, 4rem)',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
        }}
        className="hero-grid"
      >
        {/* ── Left: Text ── */}
        <div style={{ maxWidth: '580px' }}>
          <div ref={nameRef}>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.68rem',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#E9C46A', marginBottom: '0.5rem',
            }}>
              Hi, I&apos;m
            </p>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', fontWeight: 600,
              color: '#E9C46A', letterSpacing: '0.22em',
              textTransform: 'uppercase', marginBottom: '1.5rem',
            }}>
              Kashvi Pundir
            </h2>
          </div>

          <div ref={headlineRef}>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 5.2vw, 5rem)', fontWeight: 400,
              lineHeight: 1.06, color: '#FBF7F0',
              marginBottom: '1.5rem', letterSpacing: '-0.01em',
            }}>
              <span className="line-mask"><span className="line-inner">I design digital</span></span>
              <span className="line-mask"><span className="line-inner gold-gradient-text" style={{ fontStyle: 'italic' }}>experiences</span></span>
              <span className="line-mask"><span className="line-inner">that are thoughtful, intelligent &amp; timeless.</span></span>
            </h1>
          </div>

          <p ref={subRef as React.RefObject<HTMLParagraphElement>} style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
            lineHeight: 1.75, color: 'rgba(251, 247, 240, 0.62)',
            marginBottom: '2.25rem', maxWidth: '400px', fontWeight: 300,
          }}>
            UI Engineer &amp; Product Designer building AI-native products with
            clean code and meaningful design.
          </p>

          {/* CTAs with corner-lotus bloom */}
          <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="cta-lux sheen"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.9rem 2rem',
                background: 'rgba(233, 196, 106, 0.14)',
                border: '1px solid rgba(233, 196, 106, 0.55)',
                borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
                letterSpacing: '0.08em', color: '#F8E7B4',
                textDecoration: 'none', cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#6366f1';
                el.style.borderColor = '#6366f1';
                el.style.color = '#ffffff';
                el.style.transform = 'scale(1.05)';
                el.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.35)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(233, 196, 106, 0.14)';
                el.style.borderColor = 'rgba(233, 196, 106, 0.55)';
                el.style.color = '#F8E7B4';
                el.style.transform = 'scale(1)';
                el.style.boxShadow = 'none';
              }}
            >
              <CornerLotus pos="tl" /><CornerLotus pos="tr" />
              <CornerLotus pos="bl" /><CornerLotus pos="br" />
              Explore My Work ↗
            </a>

            <a
              href="https://drive.google.com/file/d/1_m6QBtwk-sG62psjpfqGgzv0XeZ_ISb1/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-lux"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.9rem 1.6rem',
                background: 'transparent',
                border: '1px solid rgba(251, 247, 240, 0.2)',
                borderRadius: '9999px',
                fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
                letterSpacing: '0.08em', color: 'rgba(251, 247, 240, 0.6)',
                textDecoration: 'none', cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#6366f1';
                el.style.color = '#ffffff';
                el.style.borderColor = '#6366f1';
                el.style.transform = 'scale(1.05)';
                el.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.35)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'transparent';
                el.style.color = 'rgba(251, 247, 240, 0.6)';
                el.style.borderColor = 'rgba(251, 247, 240, 0.2)';
                el.style.transform = 'scale(1)';
                el.style.boxShadow = 'none';
              }}
            >
              <CornerLotus pos="tl" /><CornerLotus pos="tr" />
              <CornerLotus pos="bl" /><CornerLotus pos="br" />
              View Resume ↓
            </a>
          </div>

          {/* Social links below the CTAs */}
          <div ref={socialRef} style={{
            display: 'flex', alignItems: 'center', gap: '1.5rem',
            marginTop: '2rem', flexWrap: 'wrap',
          }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
                  letterSpacing: '0.08em', color: 'rgba(251, 247, 240, 0.5)',
                  textDecoration: 'none', transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#E9C46A'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(251, 247, 240, 0.5)'; }}
              >
                <svg viewBox="0 0 24 24" fill={s.label === 'Email' ? 'none' : 'currentColor'} stroke="currentColor" strokeWidth={s.label === 'Email' ? 1.4 : 0} style={{ width: '15px', height: '15px' }}>
                  <path d={s.path} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Portrait + lotus companion + availability banner ── */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hero-right">
          <div ref={canvasRef} style={{ width: 'min(360px, 80vw, 40vh)', willChange: 'transform, opacity' }}>
            <div ref={tiltRef} style={{ position: 'relative', transition: 'transform 0.25s ease-out', transformStyle: 'preserve-3d', willChange: 'transform' }}>

            {/* Lotus companion image — beside the portrait, rising from the banner */}
            <div
              ref={lotusRef}
              className="hide-mobile"
              style={{
                position: 'absolute',
                left: '-12%',
                bottom: '-1rem',
                width: '150px',
                zIndex: 0,
              }}
            >
              <div style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                aspectRatio: '3/4.6',
                border: '1px solid rgba(233, 196, 106, 0.25)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
              }}>
                <img
                  src="/images/lotus/lotus-bud.jpg"
                  alt="Lotus"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'saturate(1.05) brightness(0.92)' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(14,27,21,0.85) 0%, transparent 55%)',
                }} />
              </div>
            </div>

            {/* Portrait frame */}
            <div
              ref={portraitRef}
              style={{ position: 'relative', width: '100%', zIndex: 2 }}
            >
              <div style={{
                position: 'absolute', inset: '-2px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(233, 196, 106, 0.4) 0%, rgba(233, 196, 106, 0.08) 50%, rgba(31, 122, 132, 0.22) 100%)',
                zIndex: 0,
              }} />

              <div style={{
                position: 'relative', zIndex: 1, borderRadius: '14px',
                overflow: 'hidden', border: '1px solid rgba(233, 196, 106, 0.3)',
                aspectRatio: '3/4', background: '#13261D',
                boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 50px rgba(233,196,106,0.06)',
              }}>
                {/* Soft lotus glow behind */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 0,
                  background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(31,122,132,0.25) 0%, transparent 70%)',
                }} />

                {/* Actual portrait — clean & bright */}
                <img
                  src="/images/image%20copy.png"
                  alt="Kashvi Pundir"
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center top', zIndex: 2,
                    filter: 'brightness(1.06) contrast(1.04) saturate(1.06)',
                  }}
                />

                {/* Subtle bottom gradient for legibility */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 3,
                  background: 'linear-gradient(to bottom, transparent 55%, rgba(14, 27, 21, 0.65) 100%)',
                }} />

                {/* Corner ornament */}
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 4, width: '28px', height: '28px', opacity: 0.6 }}>
                  <svg viewBox="0 0 28 28" fill="none">
                    <path d="M14 2 L14 26 M2 14 L26 14" stroke="#E9C46A" strokeWidth="0.5" />
                    <circle cx="14" cy="14" r="5" stroke="#E9C46A" strokeWidth="0.5" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Availability banner — kept quite lower, centered under the cluster */}
            <div
              ref={cardRef}
              style={{
                position: 'relative',
                margin: '-2.75rem auto 0',
                width: 'min(300px, 100%)',
                zIndex: 5,
                background: 'rgba(14, 27, 21, 0.82)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(233, 196, 106, 0.3)',
                borderRadius: '14px',
                padding: '1rem 1.3rem',
                textAlign: 'center',
                boxShadow: '0 18px 50px rgba(0,0,0,0.45)',
              }}
            >
              <svg viewBox="0 0 32 32" fill="none" style={{ width: '22px', height: '22px', margin: '0 auto 0.45rem' }}>
                <path d="M16 3c0 0-7 5-7 11s7 10 7 10 7-4 7-10S16 3 16 3z" stroke="#E9C46A" strokeWidth="1" fill="rgba(233,196,106,0.1)" />
                <path d="M9 16c-4 0-6 4-6 4s4 3 7 1M23 16c4 0 6 4 6 4s-4 3-7 1" stroke="#E9C46A" strokeWidth="0.8" fill="none" />
              </svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(233, 196, 106, 0.75)', marginBottom: '0.4rem' }}>
                Available for
              </p>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 500, color: '#FBF7F0', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Internships &amp; Freelance
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', lineHeight: 1.5, color: 'rgba(251, 247, 240, 0.5)', fontWeight: 300 }}>
                Let&apos;s build something meaningful together.
              </p>
              <div style={{ marginTop: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'softPulse 2s ease-in-out infinite', display: 'block' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: 'rgba(251, 247, 240, 0.42)', letterSpacing: '0.06em' }}>
                  Open to opportunities
                </span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to top, #0E1B15 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />

      {/* Scroll indicator */}
      <div className="hide-mobile" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.4 }}>
        <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, transparent, #E9C46A)', animation: 'softPulse 2.5s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E9C46A' }}>Scroll</span>
      </div>

      <style jsx>{`
        .line-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
        }
        .line-inner {
          display: block;
          transform: translateY(110%);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .line-inner { transform: none !important; }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
