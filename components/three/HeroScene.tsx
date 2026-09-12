"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "@/lib/use-in-view";
import { useShouldRender3D } from "@/lib/use-should-render-3d";
import { GradientMeshFallback } from "@/components/ui/GradientMeshFallback";

const ACCENT = "#00e5c0";
const ACCENT_SECONDARY = "#7c5cff";
const PARTICLE_COUNT = 220;

/** Drives a continuous render loop only while active, so `frameloop="demand"` stays idle offscreen. */
function DemandLoop({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const tick = () => {
      invalidate();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, invalidate]);

  return null;
}

function CentralObject({ pointer }: { pointer: RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.getElapsedTime();
    group.rotation.y = t * 0.15;
    group.rotation.x = Math.sin(t * 0.1) * 0.15;

    const targetX = pointer.current.y * 0.25;
    const targetY = pointer.current.x * 0.25;
    group.rotation.x += (targetX - group.rotation.x) * 0.02;
    group.rotation.y += (targetY - group.rotation.y) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.4, 6]} />
        <MeshDistortMaterial
          color={ACCENT}
          emissive={ACCENT_SECONDARY}
          emissiveIntensity={0.15}
          roughness={0.15}
          metalness={0.6}
          distort={0.35}
          speed={1.4}
        />
      </mesh>
      <mesh scale={1.02}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color={ACCENT_SECONDARY} wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => {
      const radius = 3.2 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      return {
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ),
        scale: 0.02 + Math.random() * 0.035,
        speed: 0.02 + Math.random() * 0.05,
      };
    });
  }, []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    particles.forEach((particle, i) => {
      dummy.position.copy(particle.position);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [particles, dummy]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={0.5} />
    </instancedMesh>
  );
}

function Scene({ active }: { active: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <>
      <DemandLoop active={active} />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={18} color={ACCENT} />
      <pointLight position={[-3, -2, -3]} intensity={14} color={ACCENT_SECONDARY} />
      <group scale={size.width < 768 ? 0.8 : 1}>
        <CentralObject pointer={pointer} />
        <ParticleField />
      </group>
    </>
  );
}

export default function HeroScene({ className }: { className?: string }) {
  const shouldRender3D = useShouldRender3D();
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const [everInView, setEverInView] = useState(false);

  useEffect(() => {
    if (inView) setEverInView(true);
  }, [inView]);

  if (shouldRender3D === false) {
    return <GradientMeshFallback className={className} />;
  }

  return (
    <div ref={ref} className={className}>
      {shouldRender3D === null || !everInView ? (
        <GradientMeshFallback className="h-full w-full" />
      ) : (
        <Canvas
          dpr={[1, 1.5]}
          frameloop="demand"
          camera={{ position: [0, 0, 6], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          className="h-full w-full"
        >
          <Scene active={inView} />
        </Canvas>
      )}
    </div>
  );
}
