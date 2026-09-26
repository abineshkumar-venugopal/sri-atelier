"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
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
    <div
      ref={ref}
      className={cn(
        "border-l border-fog px-9 py-12 first:border-l-0",
        revealClassName(visible, delay)
      )}
    >
      <div className="mb-5 font-display text-5xl font-light leading-none text-ink/12">
        {value.num}
      </div>
      <div className="mb-3 font-display text-[1.3rem] font-light text-ink">
        {value.name}
      </div>
      <div className="text-[0.9rem] leading-[1.8] text-ash">
        {value.description}
      </div>
    </div>
  );
}
