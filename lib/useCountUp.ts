"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Counts from zero up to `target` once `active` turns true — pair it with
 * useRevealVisible so the numbers run as they scroll into view, not silently
 * off screen. Decelerates so it settles rather than stopping dead.
 *
 * Reduced-motion visitors get the final figure with no animation at all.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1800) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, durationMs, prefersReducedMotion]);

  return prefersReducedMotion ? target : value;
}
