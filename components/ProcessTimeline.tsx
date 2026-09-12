"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

const pointOn = (segment: Segment, t: number) => ({
  x: segment.kind === "line" ? 50 : cubic(50, segment.bow, segment.bow, 50, t),
  y:
    segment.kind === "line"
      ? segment.y0 + (segment.y1 - segment.y0) * t
      : cubic(segment.y0, segment.c1y, segment.c2y, segment.y1, t),
});

/**
 * Flattens the connector into points carrying their running arc length.
 *
 * The drawn line is revealed by stroke-dashoffset, which measures arc length,
 * so the marker has to be placed the same way. Positioning it by vertical
 * position instead leaves it running ahead of the line's end through every
 * curve, where the path covers more distance than it descends.
 */
function buildLengthTable(segments: Segment[]) {
  let previous = pointOn(segments[0], 0);
  let length = 0;
  const table = [{ ...previous, length }];

  for (const segment of segments) {
    const steps = segment.kind === "line" ? 1 : 64;
    for (let i = 1; i <= steps; i++) {
      const point = pointOn(segment, i / steps);
      length += Math.hypot(point.x - previous.x, point.y - previous.y);
      table.push({ ...point, length });
      previous = point;
    }
  }
  return table;
}

type LengthTable = ReturnType<typeof buildLengthTable>;

/** Point at `fraction` (0-1) of the connector's arc length, in viewBox units. */
export function pointAtFraction(table: LengthTable, fraction: number) {
  const total = table[table.length - 1].length;
  const target = Math.min(1, Math.max(0, fraction)) * total;

  let low = 0;
  let high = table.length - 1;
  while (low < high - 1) {
    const mid = (low + high) >> 1;
    if (table[mid].length < target) low = mid;
    else high = mid;
  }

  const a = table[low];
  const b = table[high];
  const span = b.length - a.length;
  const k = span > 0 ? (target - a.length) / span : 0;
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
}

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pointerRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { segments, height } = useMemo(
    () => buildSegments(steps.length),
    [steps.length]
  );
  const table = useMemo(() => buildLengthTable(segments), [segments]);
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

      // Same fraction the dash uses, so the marker sits exactly on the end of
      // the drawn line. viewBox x spans 0-100 and y spans 0-height, and the svg
      // stretches to the container, so these convert to percentage offsets.
      const point = pointAtFraction(table, progress);
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
  }, [steps.length, table, height]);

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

      {/* Rides the end of the drawn line. The halo is translucent on purpose:
          an opaque ring in the section colour would paint over the line where
          it meets the dot, making the fill look like it stops short. */}
      <span
        ref={pointerRef}
        aria-hidden="true"
        className="absolute top-0 left-1/2 z-[2] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass ring-4 ring-brass/25"
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
