"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import {
  useRevealVisible,
  revealClassName,
  REVEAL_STEP_MS,
} from "@/lib/useReveal";
import { useCountUp } from "@/lib/useCountUp";
import type { Stat } from "@/lib/data";

const delays = [undefined, 1, 2, 3] as const;

function StatItem({ stat, delay }: { stat: Stat; delay?: 1 | 2 | 3 | 4 }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRevealVisible(ref);
  // Start counting as the tile starts appearing, not before it.
  const value = useCountUp(stat.value, visible, {
    delayMs: (delay ?? 0) * REVEAL_STEP_MS,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "px-6 py-10 md:px-9 md:py-12",
        delay && "border-l border-fog",
        revealClassName(visible, delay),
      )}
    >
      {/* tabular-nums keeps the figure from jittering as digits tick over. */}
      <div className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-light leading-none tabular-nums text-terracotta">
        {value.toLocaleString("en-US")}
        {stat.suffix}
      </div>
      <div className="mt-4 text-[0.78rem] uppercase tracking-[0.2em] text-ash">
        {stat.label}
      </div>
    </div>
  );
}

export default function Stats({ items }: { items: Stat[] }) {
  return (
    <div className="bg-stone px-6 py-20 md:px-15">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {items.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} delay={delays[i]} />
        ))}
      </div>
    </div>
  );
}
