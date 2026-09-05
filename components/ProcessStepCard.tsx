"use client";

import { useRef } from "react";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";
import type { ProcessStep } from "@/lib/data";

export default function ProcessStepCard({
  step,
  delay,
}: {
  step: ProcessStep;
  delay?: 1 | 2 | 3 | 4;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRevealVisible(ref);
  return (
    <div
      ref={ref}
      data-cursor="hover"
      className={`process-step ${revealClassName(visible, delay)}`}
    >
      <div className="process-num">{step.num}</div>
      <div className="process-step-name">{step.name}</div>
      <div className="process-step-desc">{step.description}</div>
    </div>
  );
}
