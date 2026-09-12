"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, type MotionValue } from "framer-motion";
import type * as THREE from "three";
import { useInView } from "@/lib/use-in-view";
import { useShouldRender3D } from "@/lib/use-should-render-3d";
import { GradientMeshFallback } from "@/components/ui/GradientMeshFallback";

const ACCENT = "#00e5c0";
const ACCENT_SECONDARY = "#7c5cff";

type Variant = "octahedron" | "torus";

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

function LowPolyShape({ progress, variant }: { progress: MotionValue<number>; variant: Variant }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const p = progress.get();
    mesh.rotation.x = p * Math.PI * 2;
    mesh.rotation.y = p * Math.PI * 1.4 + state.clock.getElapsedTime() * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      {variant === "octahedron" ? (
        <octahedronGeometry args={[1, 0]} />
      ) : (
        <torusGeometry args={[0.75, 0.26, 8, 16]} />
      )}
      <meshStandardMaterial
        color={variant === "octahedron" ? ACCENT : ACCENT_SECONDARY}
        roughness={0.25}
        metalness={0.5}
      />
    </mesh>
  );
}

interface ScrollAccentProps {
  className?: string;
  variant?: Variant;
}

export default function ScrollAccent({ className, variant = "octahedron" }: ScrollAccentProps) {
  const shouldRender3D = useShouldRender3D();
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  if (!shouldRender3D) {
    return (
      <div ref={ref} className={className}>
        <GradientMeshFallback className="h-full w-full" />
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        className="h-full w-full"
      >
        <DemandLoop active={inView} />
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 3]} intensity={12} color={ACCENT} />
        <pointLight position={[-2, -1, -2]} intensity={8} color={ACCENT_SECONDARY} />
        <LowPolyShape progress={scrollYProgress} variant={variant} />
      </Canvas>
    </div>
  );
}
