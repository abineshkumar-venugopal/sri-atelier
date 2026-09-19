"use client";

import { useEffect, useState, type RefObject } from "react";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

import { cn } from "@/lib/utils";

export function useRevealVisible(ref: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, prefersReducedMotion]);

  // Nothing animates in for visitors who would rather it did not — the
  // content is simply already there.
  return prefersReducedMotion || visible;
}

/** One step of the reveal stagger. Anything timed to a reveal reads this. */
export const REVEAL_STEP_MS = 150;

/** Staggers a group of revealing elements; each step is REVEAL_STEP_MS. */
const DELAY_CLASSNAMES = {
  1: "delay-150",
  2: "delay-300",
  3: "delay-450",
  4: "delay-600",
} as const;

/**
 * Fade-and-rise on scroll. Pair with `useRevealVisible` so the element
 * animates once, the first time it enters the viewport.
 */
export function revealClassName(visible: boolean, delay?: 1 | 2 | 3 | 4) {
  return cn(
    "transition-[opacity,transform] duration-800 ease-forma",
    visible ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0",
    delay && DELAY_CLASSNAMES[delay]
  );
}
