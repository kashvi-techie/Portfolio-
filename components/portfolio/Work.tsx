'use client';

import { useEffect, useRef, useState } from 'react';

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
    metrics: ['Lighthouse 92', 'Next.js 15', '-30% bundle'],
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
    metrics: ['Lighthouse 95', 'Gemini API', 'Realtime'],
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
    metrics: ['Lighthouse 90', 'Prompt → UI', 'Vercel Edge'],
    href: 'https://ai-image-to-saa-s-product-generator.vercel.app/',
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
    metrics: ['Lighthouse 93', '60fps motion', 'Vercel'],
    href: 'https://pslytherr.vercel.app/',
  },
  {
    number: '05',
    title: 'JISSI',
    subtitle: 'AI Voice Assistant (Mobile)',
    description:
      'Cross-platform AI voice assistant built with Expo & React Native. Speech-to-text input, an LLM reasoning core, and text-to-speech output — architected with a swappable AI-provider layer.',
    image:
      'https://images.pexels.com/photos/8294606/pexels-photo-8294606.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React Native', 'Expo', 'TypeScript', 'Gemini'],
    metrics: ['Voice I/O', 'LLM core', 'Cross-platform'],
    href: 'https://github.com/kashvi-techie/Jissi',
  },
];

type Project = (typeof projects)[number];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  // ---- Shared glassmorphic pointer-tracking preview capsule ----
  const capsuleRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState('all');

  useEffect(() => {
    const handleFilter = (event: Event) => {
      const query = (event as CustomEvent<{ query?: string }>).detail?.query?.toLowerCase() || 'all';
      setProjectFilter(query);
    };

    window.addEventListener('portfolio:project-filter', handleFilter);
    return () => window.removeEventListener('portfolio:project-filter', handleFilter);
  }, []);

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter((project) => {
        const haystack = `${project.title} ${project.subtitle} ${project.description} ${project.tags.join(' ')} ${project.metrics.join(' ')}`.toLowerCase();
        return haystack.includes(projectFilter);
      });

  // Pointer spring state lives in refs so the single rAF loop can read/write
  // without triggering React re-renders.
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const rafId = useRef<number | null>(null);

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

  // Single rAF loop: lerp the capsule toward the pointer for a smooth lag.
  useEffect(() => {
    const tick = () => {
      const cur = currentPos.current;
      const tgt = targetPos.current;
      cur.x += (tgt.x - cur.x) * 0.15;
      cur.y += (tgt.y - cur.y) * 0.15;

      const el = capsuleRef.current;
      if (el) {
        // Offset so the capsule floats up-right of the cursor.
        el.style.transform = `translate3d(${cur.x + 18}px, ${cur.y - 18}px, 0) scale(${
          visible.current ? 1 : 0.85
        })`;
        el.style.opacity = visible.current ? '1' : '0';
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleProjectEnter = (project: Project, e: { clientX: number; clientY: number }) => {
    // Snap the spring origin to the cursor on first enter so it doesn't fly in
    // from a stale position.
    if (!visible.current) {
      currentPos.current = { x: e.clientX, y: e.clientY };
    }
    targetPos.current = { x: e.clientX, y: e.clientY };
    visible.current = true;
    setActiveProject(project);
  };

  const handleProjectMove = (e: { clientX: number; clientY: number }) => {
    targetPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleProjectLeave = () => {
    visible.current = false;
  };

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
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onPointerEnterProject={handleProjectEnter}
              onPointerMoveProject={handleProjectMove}
              onPointerLeaveProject={handleProjectLeave}
            />
          ))}
        </div>
      </div>

      {/* Glassmorphic pointer-tracking preview capsule (single, repositioned) */}
      <div
        ref={capsuleRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
          transition: 'opacity 0.35s ease',
          padding: '0.7rem 0.85rem',
          minWidth: '180px',
          borderRadius: '14px',
          background: 'rgba(14, 27, 21, 0.55)',
          backdropFilter: 'blur(14px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
          border: '1px solid rgba(233, 196, 106, 0.35)',
          boxShadow:
            '0 18px 50px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(248, 231, 180, 0.06)',
        }}
      >
        <div
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1rem',
            color: '#F8E7B4',
            lineHeight: 1.1,
            marginBottom: '0.5rem',
          }}
        >
          {activeProject?.title ?? ''}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {activeProject?.metrics.map((m) => (
            <span
              key={m}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.05em',
                padding: '0.2rem 0.55rem',
                borderRadius: '100px',
                color: '#FBF7F0',
                background: 'rgba(233, 196, 106, 0.12)',
                border: '1px solid rgba(233, 196, 106, 0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              {m}
            </span>
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
  onPointerEnterProject,
  onPointerMoveProject,
  onPointerLeaveProject,
}: {
  project: Project;
  index: number;
  onPointerEnterProject: (project: Project, e: { clientX: number; clientY: number }) => void;
  onPointerMoveProject: (e: { clientX: number; clientY: number }) => void;
  onPointerLeaveProject: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textsRef = useRef<HTMLElement[]>([]);

  // Register a text node for the cascade (left→right stagger on reveal).
  const registerText = (el: HTMLElement | null) => {
    if (el && !textsRef.current.includes(el)) {
      textsRef.current.push(el);
    }
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const POWER3 = 'cubic-bezier(0.16, 1, 0.3, 1)';

    // Initialise reveal start states.
    const img = imgRef.current;
    if (img) {
      img.style.transform = 'scale(1.1)';
      img.style.transition = `transform 0.9s ${POWER3}, filter 0.6s ease`;
    }
    textsRef.current.forEach((t) => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-24px)';
      t.style.transition = `opacity 0.7s ${POWER3}, transform 0.7s ${POWER3}`;
    });

    // Per-item reveal: image scales 1.1 -> 1, text cascades in.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';

            if (imgRef.current) {
              imgRef.current.style.transform = 'scale(1)';
            }
            textsRef.current.forEach((t, ti) => {
              window.setTimeout(() => {
                t.style.opacity = '1';
                t.style.transform = 'translateX(0)';
              }, ti * 80);
            });
          }, index * 130);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);

    // 3D tilt on mouse move (preserved from original).
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
        onPointerEnterProject(project, e);
      }}
      onMouseMove={(e) => onPointerMoveProject(e)}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(227, 188, 94, 0.1)';
        el.style.boxShadow = 'none';
        const img = el.querySelector('img') as HTMLImageElement;
        if (img) {
          img.style.transform = 'scale(1)';
          img.style.filter = 'brightness(0.35) saturate(0.3)';
        }
        onPointerLeaveProject();
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          ref={imgRef}
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
          ref={registerText}
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
            ref={registerText}
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
            ref={registerText}
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
          ref={registerText}
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
          ref={registerText}
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
