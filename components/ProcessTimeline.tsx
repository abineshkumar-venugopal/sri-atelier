"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/data";

/** How far the curve leans off the spine, as a fraction of width. */
const BOW = 0.14;
/** The lead in and out span half a row, so they lean proportionately less. */
const LEAD_BOW = BOW * 0.55;
/** Used until the container has been measured, so first paint is sensible. */
const FALLBACK = { width: 1000, rowHeight: 256 };

/** Every segment is a cubic — the connector has no straight runs. */
type Segment = {
  y0: number;
  y1: number;
  c1y: number;
  c2y: number;
  bow: number;
};

const segment = (y0: number, y1: number, bow: number): Segment => ({
  y0,
  y1,
  c1y: y0 + (y1 - y0) * 0.35,
  c2y: y0 + (y1 - y0) * 0.65,
  bow,
});

/**
 * The connector, built in the container's own pixel space.
 *
 * Everything here — the path, the dash maths and the marker — has to agree on
 * one coordinate space. The svg viewBox is set to the measured size so a user
 * unit is a CSS pixel. That keeps the geometry undistorted, and means the dash
 * lengths the browser computes and the table below are measuring the same
 * thing. Stretching the viewBox instead put the marker well off the line.
 *
 * The run into the first node and out of the last lean opposite their
 * neighbouring curve, so the weave carries through rather than starting and
 * ending on a straight.
 */
function buildSegments(count: number, width: number, height: number) {
  const spine = width / 2;
  const nodeY = (i: number) => ((i + 0.5) * height) / count;
  const amplitude = width * BOW;
  const leadAmplitude = width * LEAD_BOW;
  /** Inter-node curves alternate, starting to the right of the spine. */
  const side = (i: number) => (i % 2 === 0 ? 1 : -1);

  const segments: Segment[] = [
    segment(0, nodeY(0), spine - side(0) * leadAmplitude),
  ];

  for (let i = 0; i < count - 1; i++) {
    segments.push(
      segment(nodeY(i), nodeY(i + 1), spine + side(i) * amplitude)
    );
  }

  segments.push(
    segment(
      nodeY(count - 1),
      height,
      spine - side(count - 2) * leadAmplitude
    )
  );

  return segments;
}

function toPathData(segments: Segment[], spine: number) {
  let d = `M ${spine} ${segments[0].y0}`;
  for (const s of segments) {
    d += ` C ${s.bow} ${s.c1y}, ${s.bow} ${s.c2y}, ${spine} ${s.y1}`;
  }
  return d;
}

const cubic = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};

const pointOn = (s: Segment, spine: number, t: number) => ({
  x: cubic(spine, s.bow, s.bow, spine, t),
  y: cubic(s.y0, s.c1y, s.c2y, s.y1, t),
});

/**
 * Flattens the connector into points carrying their running arc length, and
 * records where each node falls along it as a 0-1 fraction.
 *
 * Those fractions are what make a step reveal itself at the moment the marker
 * reaches its number: both are measured against the same arc length, so there
 * is nothing to approximate.
 */
function buildLengthTable(segments: Segment[], spine: number, nodeCount: number) {
  let previous = pointOn(segments[0], spine, 0);
  let length = 0;
  const table = [{ ...previous, length }];
  const nodeLengths: number[] = [];

  segments.forEach((s, index) => {
    for (let i = 1; i <= 96; i++) {
      const point = pointOn(s, spine, i / 96);
      length += Math.hypot(point.x - previous.x, point.y - previous.y);
      table.push({ ...point, length });
      previous = point;
    }
    // A node sits at the end of each segment bar the final run-out.
    if (index < nodeCount) nodeLengths.push(length);
  });

  const total = length || 1;
  return { table, nodeFractions: nodeLengths.map((l) => l / total) };
}

type LengthTable = ReturnType<typeof buildLengthTable>["table"];

/** Point at `fraction` (0-1) of the connector arc length, in pixels. */
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
  const [size, setSize] = useState({
    width: FALLBACK.width,
    height: steps.length * FALLBACK.rowHeight,
  });

  const { table, nodeFractions, d } = useMemo(() => {
    const spine = size.width / 2;
    const segments = buildSegments(steps.length, size.width, size.height);
    const { table, nodeFractions } = buildLengthTable(
      segments,
      spine,
      steps.length
    );
    return { table, nodeFractions, d: toPathData(segments, spine) };
  }, [steps.length, size.width, size.height]);

  // Keep the viewBox matched to the rendered box, so one unit stays one pixel.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) =>
        Math.abs(prev.width - width) < 1 && Math.abs(prev.height - height) < 1
          ? prev
          : { width, height }
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      const progress = Math.min(
        1,
        Math.max(0, (startLine - rect.top) / distance)
      );

      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = String(1 - progress);
      }

      // Same fraction the dash uses, in the same units, so the marker lands on
      // the end of the drawn line.
      const point = pointAtFraction(table, progress);
      if (pointerRef.current) {
        pointerRef.current.style.left = `${point.x}px`;
        pointerRef.current.style.top = `${point.y}px`;
      }

      // A step turns on exactly as the marker passes its number.
      let reached = -1;
      for (let i = 0; i < nodeFractions.length; i++) {
        if (progress >= nodeFractions[i]) reached = i;
      }
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
  }, [table, nodeFractions]);

  return (
    <div ref={containerRef} className="relative mt-16">
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${size.width} ${size.height}`}
        className="pointer-events-none absolute inset-0 size-full"
      >
        {/* Dotted track, then the brass line drawn over it. pathLength=1 makes
            the dash a plain 0-1 fraction of the curve. */}
        <path
          d={d}
          fill="none"
          stroke="var(--color-fog)"
          strokeWidth={2}
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="var(--color-brass)"
          strokeWidth={2}
          strokeLinecap="round"
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
        className="absolute top-0 left-0 z-[2] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass ring-4 ring-brass/25"
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
