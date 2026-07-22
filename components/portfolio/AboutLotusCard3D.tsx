'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import * as THREE from 'three';

function LotusWireform() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.55) * 0.18 + pointer.x * 0.16;
    group.current.rotation.x = Math.cos(t * 0.45) * 0.1 - pointer.y * 0.12;
    group.current.position.y = Math.sin(t * 0.9) * 0.08;
  });

  return (
    <group ref={group} rotation={[0.55, 0, 0]}>
      {Array.from({ length: 10 }).map((_, index) => {
        const angle = (index / 10) * Math.PI * 2;
        const scale = index % 2 === 0 ? 1.02 : 0.72;
        return (
          <mesh key={index} position={[Math.sin(angle) * 0.42, 0, Math.cos(angle) * 0.42]} rotation={[1.2, angle, 0]} scale={[0.42 * scale, 1.05 * scale, 0.18]}>
            <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.9]} />
            <meshBasicMaterial color="#e0c472" transparent opacity={0.045} wireframe />
            <Edges color="#e0c472" threshold={12} />
          </mesh>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusKnotGeometry args={[0.42, 0.025, 120, 10, 2, 5]} />
        <meshBasicMaterial color="#f8e7b4" transparent opacity={0.72} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.02, 0.006, 10, 96]} />
        <meshBasicMaterial color="#e0c472" transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

export default function AboutLotusCard3D() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const smoothY = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);

  return (
    <motion.div
      className="relative min-h-[320px] overflow-hidden rounded-lg border border-gold-300/25 bg-neutral-950/35 shadow-[0_28px_90px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(248,243,235,0.04)] backdrop-blur-xl"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(224,196,114,0.15),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-10 border border-gold-300/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-300/20" />
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.15, 4.2], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={0.75} />
        <pointLight position={[2, 2, 3]} intensity={1.2} color="#e0c472" />
        <LotusWireform />
      </Canvas>
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <div>
          <p className="font-sans text-[0.58rem] uppercase tracking-[0.28em] text-gold-300/70">Creative logic</p>
          <p className="mt-2 max-w-[190px] font-sans text-xs leading-6 text-lotus-cream/45">Interactive systems, AI interfaces, and motion with restraint.</p>
        </div>
        <span className="h-10 w-px bg-gradient-to-b from-transparent via-gold-300/45 to-transparent" />
      </div>
    </motion.div>
  );
}