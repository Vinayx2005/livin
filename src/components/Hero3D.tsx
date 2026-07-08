import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Cinematic sequence:
 *  0.0 - 1.6s : lid lifts + tilts, opacity fades slightly
 *  1.6 - 3.0s : bottle rises out of the box
 *  3.0 - 4.2s : bottle slides beside the box; spray puffs emit repeatedly
 *  4.2s+       : idle float + periodic spray
 */
function useClock() {
  const t = useRef(0);
  useFrame((_, dt) => {
    t.current += dt;
  });
  return t;
}

function easeOutExpo(x: number) {
  return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function GiftBoxBase() {
  return (
    <group position={[0, -0.9, 0]}>
      {/* box body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.9, 1.6]} />
        <meshPhysicalMaterial
          color="#0a1733"
          roughness={0.55}
          clearcoat={0.4}
          clearcoatRoughness={0.6}
        />
      </mesh>
      {/* gold trim top */}
      <mesh position={[0, 0.46, 0]}>
        <boxGeometry args={[2.22, 0.04, 1.62]} />
        <meshStandardMaterial color="#c9a24c" metalness={1} roughness={0.25} />
      </mesh>
      {/* gold ribbon horizontal */}
      <mesh position={[0, 0.001, 0]}>
        <boxGeometry args={[2.24, 0.95, 0.14]} />
        <meshStandardMaterial color="#c9a24c" metalness={1} roughness={0.3} />
      </mesh>
      {/* gold ribbon vertical */}
      <mesh position={[0, 0.001, 0]}>
        <boxGeometry args={[0.14, 0.95, 1.64]} />
        <meshStandardMaterial color="#c9a24c" metalness={1} roughness={0.3} />
      </mesh>
      {/* satin lining rim */}
      <mesh position={[0, 0.44, 0]}>
        <boxGeometry args={[2, 0.02, 1.4]} />
        <meshStandardMaterial color="#e8c98a" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function GiftBoxLid({ progress }: { progress: number }) {
  const p = easeOutExpo(clamp01(progress));
  const lift = p * 3.2;
  const tilt = p * 0.55;
  const opacity = 1 - p * 0.15;
  return (
    <group
      position={[-1.2 * p, -0.4 + lift, -0.3 * p]}
      rotation={[-tilt, tilt * 0.6, tilt * 0.4]}
    >
      <mesh castShadow>
        <boxGeometry args={[2.3, 0.35, 1.7]} />
        <meshPhysicalMaterial
          color="#0a1733"
          roughness={0.5}
          clearcoat={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>
      {/* gold crest */}
      <mesh position={[0, 0.19, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.5]} />
        <meshStandardMaterial color="#c9a24c" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.19, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.03, 32]} />
        <meshStandardMaterial color="#e8c98a" metalness={1} roughness={0.15} />
      </mesh>
    </group>
  );
}

function PerfumeBottle({
  riseProgress,
  slideProgress,
}: {
  riseProgress: number;
  slideProgress: number;
}) {
  const rise = easeOutExpo(clamp01(riseProgress));
  const slide = easeOutExpo(clamp01(slideProgress));
  const y = -0.6 + rise * 1.5;
  const x = slide * 1.7;

  return (
    <group position={[x, y, 0]}>
      {/* Bottle body - crystal glass */}
      <mesh castShadow>
        <boxGeometry args={[0.85, 1.15, 0.5]} />
        <meshPhysicalMaterial
          color="#1a2450"
          transmission={0.55}
          thickness={0.8}
          roughness={0.05}
          ior={1.5}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          attenuationColor="#5a3a12"
          attenuationDistance={0.6}
          transparent
          opacity={0.95}
        />
      </mesh>
      {/* liquid tint inner */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.78, 0.9, 0.44]} />
        <meshPhysicalMaterial
          color="#7a4a1c"
          transmission={0.3}
          thickness={0.4}
          roughness={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>
      {/* collar */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.14, 32]} />
        <meshStandardMaterial color="#c9a24c" metalness={1} roughness={0.2} />
      </mesh>
      {/* cap - onion dome */}
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.24, 0.2, 0.18, 32]} />
        <meshStandardMaterial color="#c9a24c" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#e8c98a" metalness={1} roughness={0.15} />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <coneGeometry args={[0.06, 0.18, 16]} />
        <meshStandardMaterial color="#c9a24c" metalness={1} roughness={0.2} />
      </mesh>
      {/* label */}
      <mesh position={[0, 0, 0.256]}>
        <planeGeometry args={[0.5, 0.6]} />
        <meshStandardMaterial
          color="#0a1733"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
    </group>
  );
}

const PARTICLE_COUNT = 60;

function SprayMist({ active, cycle }: { active: boolean; cycle: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        angle: Math.random() * Math.PI * 2,
        radiusVel: 0.4 + Math.random() * 0.8,
        upVel: 0.3 + Math.random() * 0.6,
        life: Math.random(),
        scale: 0.04 + Math.random() * 0.06,
      })),
    [],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const s = seeds[i];
      if (active) {
        s.life += dt * 0.9;
        if (s.life > 1.4) s.life -= 1.4;
      }
      const t = s.life;
      const r = t * s.radiusVel;
      const opacity = Math.max(0, 1 - t / 1.2);
      dummy.position.set(
        1.7 + Math.cos(s.angle + cycle) * r,
        1.4 + t * s.upVel,
        Math.sin(s.angle + cycle) * r * 0.6,
      );
      const scale = s.scale * (1 + t * 1.2) * (active ? 1 : 0);
      dummy.scale.setScalar(scale * opacity);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#f4ecd8"
        transparent
        opacity={0.35}
        emissive="#c9a24c"
        emissiveIntensity={0.15}
      />
    </instancedMesh>
  );
}

function Scene() {
  const t = useClock();
  const [sprayCycle, setSprayCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSprayCycle((c) => c + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const [state, setState] = useState({ lid: 0, rise: 0, slide: 0, spray: false });

  useFrame(() => {
    const time = t.current;
    const lid = clamp01((time - 0.4) / 1.6);
    const rise = clamp01((time - 1.6) / 1.4);
    const slide = clamp01((time - 3.0) / 1.2);
    const spray = time > 4.0;
    setState((prev) =>
      prev.lid !== lid || prev.rise !== rise || prev.slide !== slide || prev.spray !== spray
        ? { lid, rise, slide, spray }
        : prev,
    );
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.3}
        color="#f4ecd8"
        castShadow
      />
      <pointLight position={[-3, 2, 3]} intensity={1.2} color="#c9a24c" />
      <pointLight position={[0, -2, 2]} intensity={0.4} color="#c9a24c" />

      <Environment preset="night" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <group rotation={[0, -0.25, 0]}>
          <GiftBoxBase />
          <GiftBoxLid progress={state.lid} />
          <PerfumeBottle
            riseProgress={state.rise}
            slideProgress={state.slide}
          />
          <SprayMist active={state.spray} cycle={sprayCycle} />
        </group>
      </Float>

      {/* soft floor reflection catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial
          color="#0a1733"
          metalness={0.9}
          roughness={0.35}
        />
      </mesh>
    </>
  );
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="absolute inset-0 bg-navy-deep" aria-hidden />;
  }
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.6, 5.6], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
