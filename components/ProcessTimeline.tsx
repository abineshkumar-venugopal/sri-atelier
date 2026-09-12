"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/data";

/** Vertical room each step gets inside the SVG's own coordinate space. */
const STEP_UNITS = 260;
/** How far the curve bows off the spine, as a percentage of width. A gentle
 *  lean rather than a full swing — raise it for a more pronounced weave. */
const BOW = 64;

/**
 * Serpentine path weaving down the section: straight into the first node, then
 * a bow out to alternating sides between each pair of nodes. Nodes sit on the
 * centre line so the markers can be positioned without measuring the curve.
 */
function buildPath(count: number) {
  const height = count * STEP_UNITS;
  const nodeY = (i: number) => (i + 0.5) * STEP_UNITS;

  let d = `M 50 0 L 50 ${nodeY(0)}`;
  for (let i = 0; i < count - 1; i++) {
    const from = nodeY(i);
    const to = nodeY(i + 1);
    const bow = i % 2 === 0 ? BOW : 100 - BOW;
    d += ` C ${bow} ${from + (to - from) * 0.35}, ${bow} ${from + (to - from) * 0.65}, 50 ${to}`;
  }
  return `${d} L 50 ${height}`;
}

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pointerRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const height = steps.length * STEP_UNITS;
  const d = buildPath(steps.length);

  useEffect(() => {
    const el = containerRef.current;
    const path = pathRef.current;
    if (!el || !path) return;

    // Sample the curve once into percentage coordinates. Because the SVG
    // stretches with preserveAspectRatio="none", viewBox x/y map linearly onto
    // the container's width/height — so these percentages place a plain DOM
    // element on the curve without inheriting the SVG's distortion.
    const total = path.getTotalLength();
    const samples = Array.from({ length: 240 }, (_, i) => {
      const point = path.getPointAtLength((i / 239) * total);
      return { x: point.x, y: (point.y / height) * 100 };
    });

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;

      const startLine = viewport * 0.8;
      const endLine = viewport * 0.4;
      const distance = rect.height + (startLine - endLine);
      const progress = Math.min(1, Math.max(0, (startLine - rect.top) / distance));

      path.style.strokeDashoffset = String(1 - progress);

      const point = samples[Math.round(progress * (samples.length - 1))];
      if (pointerRef.current && point) {
        pointerRef.current.style.left = `${point.x}%`;
        pointerRef.current.style.top = `${point.y}%`;
      }

      const reached = Math.floor(progress * steps.length + 0.15) - 1;
      setActiveIndex((prev) => (prev === reached ? prev : reached));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [steps.length, height]);

  return (
    <div ref={containerRef} className="relative mt-16">
      <svg
        aria-hidden="true"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full"
      >
        {/* Dotted track, then the brass line drawn over it. pathLength=1 makes
            the dash maths a plain 0-1 fraction of the curve. */}
        <path
          d={d}
          fill="none"
          stroke="var(--color-fog)"
          strokeWidth={2}
          strokeDasharray="1 9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="var(--color-brass)"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
      </svg>

      {/* Rides the end of the drawn line. */}
      <span
        ref={pointerRef}
        aria-hidden="true"
        className="absolute z-[2] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass shadow-[0_0_0_5px_var(--color-mist),0_0_0_6px_var(--color-brass)]"
      />

      {steps.map((step, i) => {
        const reached = i <= activeIndex;
        const onLeft = i % 2 === 0;

        return (
          <div
            key={step.num}
            data-cursor="hover"
            className="relative flex h-56 items-center md:h-64"
          >
            <span
              aria-hidden="true"
              data-reached={reached}
              className="absolute top-1/2 left-1/2 z-[1] flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fog bg-mist font-display text-[1.05rem] font-light text-ash transition-all duration-500 ease-forma data-[reached=true]:border-ink data-[reached=true]:bg-ink data-[reached=true]:text-paper"
            >
              {step.num}
            </span>

            <div
              className={cn(
                "w-[calc(50%-3rem)] transition-all duration-700 ease-forma",
                onLeft ? "pr-4 text-right" : "ml-auto pl-4",
                reached
                  ? "translate-x-0 opacity-100"
                  : cn("opacity-0", onLeft ? "-translate-x-8" : "translate-x-8")
              )}
            >
              <h3 className="mb-2.5 font-display text-[1.35rem] font-normal">
                {step.name}
              </h3>
              <p className="text-[0.9rem] leading-[1.8] text-ash">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
