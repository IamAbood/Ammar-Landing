"use client";

import { useEffect, useState } from "react";

function evaluate(): boolean {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const narrow = window.innerWidth < 480;
  return !reducedMotion && cores > 4 && !narrow;
}

/**
 * Gates 3D rendering behind reduced-motion, low-core-count and narrow-viewport
 * checks. Returns `null` until evaluated on the client (render a skeleton then),
 * then `true`/`false`.
 */
export function useShouldRender3D(): boolean | null {
  const [should, setShould] = useState<boolean | null>(null);

  useEffect(() => {
    setShould(evaluate());

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => setShould(evaluate());

    motionQuery.addEventListener("change", handle);
    window.addEventListener("resize", handle);
    return () => {
      motionQuery.removeEventListener("change", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return should;
}
