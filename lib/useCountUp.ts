"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Counts from zero up to `target` once `active` turns true — pair it with
 * useRevealVisible so the numbers run as they scroll into view, not silently
 * off screen. Decelerates so it settles rather than stopping dead.
 *
 * Pass `delayMs` matching the element's reveal stagger. Without it the count
 * starts while the element is still fading in, and a small target can be over
 * before anyone can read it: a nine on a 450ms stagger already showed five by
 * the time it appeared and had finished before the fade did.
 *
 * Reduced-motion visitors get the final figure with no animation at all.
 */
export function useCountUp(
  target: number,
  active: boolean,
  { durationMs = 1800, delayMs = 0 }: { durationMs?: number; delayMs?: number } = {}
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt - delayMs;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / durationMs);
      // easeOutQuad rather than cubic: cubic front-loads so hard that a
      // single-digit target spends most of its run already on the final value.
      const eased = 1 - Math.pow(1 - progress, 2);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, durationMs, delayMs, prefersReducedMotion]);

  return prefersReducedMotion ? target : value;
}
