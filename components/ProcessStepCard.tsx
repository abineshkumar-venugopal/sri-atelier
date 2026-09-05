"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
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
      className={cn("group px-8 text-center", revealClassName(visible, delay))}
    >
      {/* Sits above the connector line drawn by the grid, hence the mist fill. */}
      <div className="relative z-[1] mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-fog bg-mist font-display text-[1.2rem] font-light transition-all duration-400 ease-forma group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
        {step.num}
      </div>
      <div className="mb-2.5 font-display text-[1.25rem] font-normal">
        {step.name}
      </div>
      <div className="text-[0.8rem] leading-[1.8] text-ash">
        {step.description}
      </div>
    </div>
  );
}
