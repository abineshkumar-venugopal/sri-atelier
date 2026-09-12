"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/data";

/** Vertical room each step gets inside the SVG's own coordinate space. */
const STEP_UNITS = 260;
/** How far the curve leans off the spine, as a percentage of width. 50 is
 *  dead straight; raise it for a more pronounced weave. */
const BOW = 64;

type Segment =
  | { kind: "line"; y0: number; y1: number }
  | { kind: "cubic"; y0: number; y1: number; c1y: number; c2y: number; bow: number };

/**
 * The connector, as data rather than only a `d` string, so the pointer's
 * position can be solved directly instead of measured off the rendered SVG.
 * Nodes sit on the spine; the line leans to alternating sides between them.
 */
function buildSegments(count: number) {
  const height = count * STEP_UNITS;
  const nodeY = (i: number) => (i + 0.5) * STEP_UNITS;
  const segments: Segment[] = [{ kind: "line", y0: 0, y1: nodeY(0) }];

  for (let i = 0; i < count - 1; i++) {
    const y0 = nodeY(i);
    const y1 = nodeY(i + 1);
    segments.push({
      kind: "cubic",
      y0,
      y1,
      c1y: y0 + (y1 - y0) * 0.35,
      c2y: y0 + (y1 - y0) * 0.65,
      bow: i % 2 === 0 ? BOW : 100 - BOW,
    });
  }

  segments.push({ kind: "line", y0: nodeY(count - 1), y1: height });
  return { segments, height };
}

function toPathData(segments: Segment[]) {
  let d = `M 50 ${segments[0].y0}`;
  for (const segment of segments) {
    d +=
      segment.kind === "line"
        ? ` L 50 ${segment.y1}`
        : ` C ${segment.bow} ${segment.c1y}, ${segment.bow} ${segment.c2y}, 50 ${segment.y1}`;
  }
  return d;
}

const cubic = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};

/**
 * Point on the connector at `progress` (0-1), in viewBox units.
 *
 * Parameterised by vertical position, which is monotonic along the whole
 * path, so the marker descends at a steady rate. Within a curved segment the
 * matching t is found by bisection — y is monotonic there too, and the
 * steps put it far inside a pixel.
 */
export function pointAt(segments: Segment[], height: number, progress: number) {
  const targetY = Math.min(height, Math.max(0, progress * height));
  const segment =
    segments.find((s) => targetY >= s.y0 && targetY <= s.y1) ??
    segments[segments.length - 1];

  if (segment.kind === "line") return { x: 50, y: targetY };

  let low = 0;
  let high = 1;
  for (let i = 0; i < 28; i++) {
    const mid = (low + high) / 2;
    if (cubic(segment.y0, segment.c1y, segment.c2y, segment.y1, mid) < targetY) {
      low = mid;
    } else {
      high = mid;
    }
  }
  const t = (low + high) / 2;
  return { x: cubic(50, segment.bow, segment.bow, 50, t), y: targetY };
}

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pointerRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { segments, height } = buildSegments(steps.length);
  const d = toPathData(segments);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;

      const startLine = viewport * 0.8;
      const endLine = viewport * 0.4;
      const distance = rect.height + (startLine - endLine);
      const progress = Math.min(1, Math.max(0, (startLine - rect.top) / distance));

      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = String(1 - progress);
      }

      // viewBox x spans 0-100 and y spans 0-height, and the svg stretches to
      // the container, so these convert straight to percentage offsets.
      const point = pointAt(segments, height, progress);
      if (pointerRef.current) {
        pointerRef.current.style.left = `${point.x}%`;
        pointerRef.current.style.top = `${(point.y / height) * 100}%`;
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
    // segments/height are derived from steps.length, so that alone gates this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

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
        className="absolute top-0 left-1/2 z-[2] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass shadow-[0_0_0_5px_var(--color-mist),0_0_0_6px_var(--color-brass)]"
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
