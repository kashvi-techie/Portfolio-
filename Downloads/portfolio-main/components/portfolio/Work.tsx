'use client';

import { useEffect, useRef } from 'react';

const projects = [
  {
    number: '01',
    title: 'Sortedd',
    subtitle: 'Luxury Concierge Platform',
    description:
      'Performance optimization & migration for a luxury concierge platform. Improved PageSpeed from 65 to 92 and reduced bundle size by 30%.',
    image:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    href: 'https://www.sortedd.in/',
  },
  {
    number: '02',
    title: 'OmniPost AI',
    subtitle: 'AI Content Distribution Dashboard',
    description:
      'AI-powered content distribution platform with real-time monitoring, semantic retrieval pipelines, and a glassmorphic reactive interface.',
    image:
      'https://images.pexels.com/photos/5935791/pexels-photo-5935791.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Next.js', 'TypeScript', 'Gemini API', 'VectorShift'],
    href: 'https://omni-post-ai-beryl.vercel.app/',
  },
  {
    number: '03',
    title: 'LuxeGen',
    subtitle: 'AI Design-to-Code Workspace',
    description:
      'AI-native workspace that turns prompts into production-ready UI. Dynamic rendering pipelines with real-time visual feedback.',
    image:
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Next.js', 'TypeScript', 'Gemini API', 'Vercel'],
    href: 'https://ai-image-to-saa-s-product-generator-izfz4ehkq.vercel.app/',
  },
  {
    number: '04',
    title: 'Pslyther',
    subtitle: 'AI Productivity Companion',
    description:
      'AI-powered productivity companion with animated buddies that react to typing activity, follow cursor movements, and make focus sessions more engaging and less lonely.',
    image:
      'https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Vercel'],
    href: 'https://pslytherr-awrd0zxm0-kashvis-projects-25d3dcb0.vercel.app/',
  },
];

export default function Work() {
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
      { threshold: 0.08 }
    );

    const items = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    items?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #0E1B15 0%, #13261D 100%)',
        padding: '7rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(31, 122, 132, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div className="reveal-left">
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>
              Featured Work
            </p>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 400,
                color: '#FBF7F0',
                lineHeight: 1.15,
                maxWidth: '400px',
              }}
            >
              Crafting products that create impact.
            </h2>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="reveal-right"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              color: 'rgba(251, 247, 240, 0.5)',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#E3BC5E';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(251, 247, 240, 0.5)';
            }}
          >
            View all projects <span style={{ fontSize: '1rem' }}>→</span>
          </a>
        </div>

        {/* Project cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5px',
          }}
          className="work-grid"
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 700px) {
          .work-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Scroll reveal with 3D entrance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
          }, index * 130);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    // 3D tilt on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
    };
    const handleMouseLeaveMove = () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeaveMove);

    return () => {
      observer.disconnect();
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeaveMove);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: 0,
        transform: 'perspective(1000px) rotateX(14deg) translateY(40px)',
        transition: 'opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1), transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease, box-shadow 0.4s ease',
        background: 'rgba(19, 38, 29, 0.6)',
        border: '1px solid rgba(227, 188, 94, 0.1)',
        overflow: 'hidden',
        borderRadius: '8px',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(227, 188, 94, 0.3)';
        el.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(227, 188, 94, 0.06)';
        const img = el.querySelector('img') as HTMLImageElement;
        if (img) {
          img.style.transform = 'scale(1.04)';
          img.style.filter = 'brightness(0.45) saturate(0.4)';
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(227, 188, 94, 0.1)';
        el.style.boxShadow = 'none';
        const img = el.querySelector('img') as HTMLImageElement;
        if (img) {
          img.style.transform = 'scale(1)';
          img.style.filter = 'brightness(0.35) saturate(0.3)';
        }
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.35) saturate(0.3)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), filter 0.6s ease',
          }}
        />
        {/* Project number */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1.25rem',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '0.85rem',
            color: 'rgba(227, 188, 94, 0.7)',
            letterSpacing: '0.1em',
          }}
        >
          {project.number}
        </div>
        {/* Title overlay on image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.5rem 1.25rem 1rem',
            background: 'linear-gradient(to top, rgba(19, 38, 29, 0.9) 0%, transparent 100%)',
          }}
        >
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
              fontWeight: 400,
              color: '#FBF7F0',
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(227, 188, 94, 0.7)',
              marginTop: '0.25rem',
            }}
          >
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem' }}>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.78rem',
            lineHeight: 1.7,
            color: 'rgba(251, 247, 240, 0.45)',
            fontWeight: 300,
            marginBottom: '1.25rem',
          }}
        >
          {project.description}
        </p>

        {/* Tags + Link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.06em',
                  padding: '0.25rem 0.6rem',
                  background: 'rgba(227, 188, 94, 0.08)',
                  border: '1px solid rgba(227, 188, 94, 0.15)',
                  borderRadius: '100px',
                  color: 'rgba(251, 247, 240, 0.5)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid rgba(227, 188, 94, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E3BC5E',
              fontSize: '0.75rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(227, 188, 94, 0.15)';
              el.style.borderColor = '#E3BC5E';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = 'transparent';
              el.style.borderColor = 'rgba(227, 188, 94, 0.3)';
            }}
            onClick={(e) => e.stopPropagation()}
          >
            ↗
          </a>
        </div>
      </div>
    </div>
  );
}
