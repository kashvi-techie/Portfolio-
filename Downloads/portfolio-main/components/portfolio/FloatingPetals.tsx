'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  reverse: boolean;
  opacity: number;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 18}s`,
      duration: `${18 + Math.random() * 14}s`,
      size: `${10 + Math.random() * 14}px`,
      reverse: i % 3 === 0,
      opacity: 0.25 + Math.random() * 0.35,
    }));
    setPetals(generated);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `${p.reverse ? 'floatPetalReverse' : 'floatPetal'} ${p.duration} ${p.delay} ease-in-out infinite`,
            opacity: p.opacity,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
            <ellipse
              cx="12"
              cy="12"
              rx="5"
              ry="10"
              fill="rgba(200, 169, 107, 0.5)"
              transform="rotate(-30 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="5"
              ry="10"
              fill="rgba(239, 212, 212, 0.35)"
              transform="rotate(30 12 12)"
            />
          </svg>
        </div>
      ))}

      {/* Mist layers */}
      <div
        className="mist-layer"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-10%',
          width: '120%',
          height: '25vh',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(16, 32, 25, 0.6) 0%, transparent 70%)',
          animationDelay: '0s',
        }}
      />
      <div
        className="mist-layer"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-10%',
          width: '120%',
          height: '15vh',
          background:
            'radial-gradient(ellipse 60% 50% at 30% 100%, rgba(15, 76, 92, 0.08) 0%, transparent 70%)',
          animationDelay: '4s',
        }}
      />
    </div>
  );
}
