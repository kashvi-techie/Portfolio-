'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, PerspectiveCamera, Sparkles } from '@react-three/drei';
import { memo, MutableRefObject, useMemo, useRef } from 'react';
import * as THREE from 'three';

type InteractiveLotus3DProps = {
  progressRef: MutableRefObject<number>;
  activeIndex: number;
  label: string;
};

type LotusView = {
  rotation: [number, number, number];
  scale: number;
};

type PetalColor = '#e9c46a' | '#f8e7b4' | '#1f7a84';

type PetalConfig = {
  angle: number;
  radius: number;
  width: number;
  height: number;
  tilt: number;
  phase: number;
  opacity: number;
  color: PetalColor;
};

const LOTUS_VIEWS: LotusView[] = [
  { rotation: [-0.32, 0, 0.03], scale: 0.94 },
  { rotation: [0.12, Math.PI * 0.55, -0.12], scale: 1.04 },
  { rotation: [-0.18, Math.PI * 1.08, 0.16], scale: 0.98 },
  { rotation: [0.2, Math.PI * 1.62, -0.08], scale: 1.08 },
];

const GOLD = '#e9c46a';
const CREAM = '#f8e7b4';
const PEACOCK = '#1f7a84';

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

function interpolateView(progress: number): LotusView {
  const scaled = clamp01(progress) * (LOTUS_VIEWS.length - 1);
  const index = Math.min(Math.floor(scaled), LOTUS_VIEWS.length - 2);
  const local = scaled - index;
  const eased = local * local * (3 - 2 * local);
  const from = LOTUS_VIEWS[index];
  const to = LOTUS_VIEWS[index + 1];

  return {
    rotation: [
      lerp(from.rotation[0], to.rotation[0], eased),
      lerp(from.rotation[1], to.rotation[1], eased),
      lerp(from.rotation[2], to.rotation[2], eased),
    ],
    scale: lerp(from.scale, to.scale, eased),
  };
}

function createPetalGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.62);
  shape.bezierCurveTo(-0.46, -0.22, -0.32, 0.48, 0, 0.72);
  shape.bezierCurveTo(0.32, 0.48, 0.46, -0.22, 0, -0.62);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.035,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.015,
    bevelSegments: 2,
    curveSegments: 22,
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

function createPetals(): PetalConfig[] {
  const rings: Array<Omit<PetalConfig, 'angle' | 'phase'> & { count: number }> = [
    { count: 12, radius: 0.95, width: 0.5, height: 1.28, tilt: 0.22, opacity: 0.56, color: GOLD },
    { count: 10, radius: 0.56, width: 0.42, height: 1.02, tilt: -0.02, opacity: 0.66, color: CREAM },
    { count: 8, radius: 0.26, width: 0.32, height: 0.74, tilt: -0.18, opacity: 0.76, color: PEACOCK },
  ];

  return rings.flatMap((ring, ringIndex) =>
    Array.from({ length: ring.count }, (_, index) => {
      const offset = ringIndex % 2 === 0 ? 0 : Math.PI / ring.count;
      const angle = (index / ring.count) * Math.PI * 2 + offset;
      return {
        angle,
        radius: ring.radius,
        width: ring.width,
        height: ring.height,
        tilt: ring.tilt,
        opacity: ring.opacity,
        color: ring.color,
        phase: index * 0.34 + ringIndex * 0.9,
      };
    }),
  );
}

function LotusMesh({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const rootRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const petalRefs = useRef<THREE.Group[]>([]);
  const smoothed = useRef({ x: -0.32, y: 0, z: 0.03, scale: 0.94 });
  const petalGeometry = useMemo(createPetalGeometry, []);
  const petals = useMemo(createPetals, []);
  const materials = useMemo(
    () => ({
      [GOLD]: new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.42, metalness: 0.18, transparent: true, opacity: 0.58, side: THREE.DoubleSide }),
      [CREAM]: new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.38, metalness: 0.12, transparent: true, opacity: 0.62, side: THREE.DoubleSide }),
      [PEACOCK]: new THREE.MeshStandardMaterial({ color: PEACOCK, roughness: 0.5, metalness: 0.08, transparent: true, opacity: 0.55, side: THREE.DoubleSide }),
    }),
    [],
  );

  useFrame((state) => {
    const progress = clamp01(progressRef.current);
    const target = interpolateView(progress);
    const pointerX = state.pointer.x * 0.08;
    const pointerY = state.pointer.y * 0.06;

    smoothed.current.x = lerp(smoothed.current.x, target.rotation[0] + pointerY, 0.08);
    smoothed.current.y = lerp(smoothed.current.y, target.rotation[1] + pointerX, 0.08);
    smoothed.current.z = lerp(smoothed.current.z, target.rotation[2], 0.08);
    smoothed.current.scale = lerp(smoothed.current.scale, target.scale, 0.08);

    if (rootRef.current) {
      rootRef.current.rotation.set(smoothed.current.x, smoothed.current.y, smoothed.current.z);
      rootRef.current.scale.setScalar(smoothed.current.scale);
    }

    const bloom = 0.52 + Math.sin(progress * Math.PI * 3) * 0.11;
    petalRefs.current.forEach((petal, index) => {
      const config = petals[index];
      if (!petal || !config) return;
      const wave = Math.sin(progress * Math.PI * 2 + config.phase) * 0.12;
      petal.rotation.x = config.tilt + bloom + wave;
      petal.scale.set(config.width, config.height * (1 + wave * 0.12), 1);
    });

    if (coreRef.current) {
      const pulse = 1 + Math.sin(progress * Math.PI * 4) * 0.08;
      coreRef.current.scale.setScalar(pulse);
      coreRef.current.rotation.z += 0.004;
    }
  });

  return (
    <group ref={rootRef} dispose={null}>
      <group rotation={[0, 0, 0]}>
        {petals.map((petal, index) => (
          <group
            key={`${petal.radius}-${index}`}
            ref={(node) => {
              if (node) petalRefs.current[index] = node;
            }}
            position={[Math.cos(petal.angle) * petal.radius, Math.sin(petal.angle) * petal.radius, 0]}
            rotation={[petal.tilt, 0, petal.angle - Math.PI / 2]}
          >
            <mesh geometry={petalGeometry} material={materials[petal.color]}>
              <Edges color="rgba(248, 231, 180, 0.5)" threshold={22} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh ref={coreRef} position={[0, 0, 0.06]}>
        <sphereGeometry args={[0.18, 24, 16]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.18} roughness={0.35} metalness={0.22} />
        <Edges color="rgba(251, 247, 240, 0.55)" threshold={18} />
      </mesh>

      <mesh rotation={[0, 0, 0]} position={[0, 0, -0.08]}>
        <torusGeometry args={[1.24, 0.006, 8, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function Scene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={38} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.45} color="#f8e7b4" />
      <pointLight position={[-2, -1.4, 2.5]} intensity={2.1} color="#1f7a84" />
      <Sparkles count={28} scale={[3.4, 3.4, 1]} size={1.4} speed={0.18} opacity={0.32} color={GOLD} />
      <LotusMesh progressRef={progressRef} />
    </>
  );
}

function InteractiveLotus3D({ progressRef, activeIndex, label }: InteractiveLotus3DProps) {
  return (
    <div className="interactive-lotus-shell" aria-label={`Interactive 3D lotus, ${label} view`}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Scene progressRef={progressRef} />
      </Canvas>
      <div className="interactive-lotus-view-label">{label} view</div>
      <div className="interactive-lotus-step">{String(activeIndex + 1).padStart(2, '0')}</div>

      <style jsx>{`
        .interactive-lotus-shell {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: visible;
          filter: drop-shadow(0 24px 80px rgba(0, 0, 0, 0.34));
        }
        .interactive-lotus-view-label,
        .interactive-lotus-step {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-family: Inter, sans-serif;
          pointer-events: none;
          text-transform: uppercase;
        }
        .interactive-lotus-view-label {
          bottom: 4%;
          font-size: 0.55rem;
          letter-spacing: 0.3em;
          color: rgba(233, 196, 106, 0.58);
        }
        .interactive-lotus-step {
          top: 8%;
          font-size: 0.64rem;
          letter-spacing: 0.24em;
          color: rgba(251, 247, 240, 0.36);
        }
      `}</style>
    </div>
  );
}

export default memo(InteractiveLotus3D);
