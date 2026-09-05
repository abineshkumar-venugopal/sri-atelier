"use client";

import { useEffect, useState, type RefObject } from "react";

export function useRevealVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  }, [ref]);

  return visible;
}

export function revealClassName(visible: boolean, delay?: 1 | 2 | 3 | 4) {
  const delayClass = delay ? ` reveal-delay-${delay}` : "";
  return `reveal${visible ? " is-visible" : ""}${delayClass}`;
}
