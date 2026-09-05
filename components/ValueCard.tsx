"use client";

import { useRef } from "react";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";
import type { Value } from "@/lib/data";

export default function ValueCard({
  value,
  delay,
}: {
  value: Value;
  delay?: 1 | 2 | 3 | 4;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRevealVisible(ref);
  return (
    <div ref={ref} className={`value-card ${revealClassName(visible, delay)}`}>
      <div className="value-num">{value.num}</div>
      <div className="value-name">{value.name}</div>
      <div className="value-desc">{value.description}</div>
    </div>
  );
}
