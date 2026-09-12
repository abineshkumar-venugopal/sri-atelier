"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/data";

/**
 * Vertical timeline whose rail fills as the section scrolls past, with a
 * pointer riding the fill and each number lighting up once reached.
 *
 * Progress is written straight to a CSS custom property so scrolling never
 * re-renders. Only the active step index goes through React, and that changes
 * a handful of times across the whole section.
 */
export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Fill starts as the timeline's top passes three quarters down the
      // viewport and completes as its bottom clears the lower third.
      const startLine = viewport * 0.75;
      const endLine = viewport * 0.35;
      const distance = rect.height + (startLine - endLine);
      const travelled = startLine - rect.top;
      const progress = Math.min(1, Math.max(0, travelled / distance));

      el.style.setProperty("--progress", String(progress));

      // A step counts as reached once the fill passes its marker.
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
  }, [steps.length]);

  return (
    <div ref={containerRef} className="relative mt-16 [--progress:0]">
      {/* Rail: unfilled track, brass fill, then the pointer riding its end.
          left-6 on mobile keeps the rail beside the text; centred from md up. */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-6 h-full w-px bg-fog md:left-1/2"
      />
      <span
        aria-hidden="true"
        style={{ height: "calc(var(--progress) * 100%)" }}
        className="absolute top-0 left-6 w-px bg-brass md:left-1/2"
      />
      <span
        aria-hidden="true"
        style={{ top: "calc(var(--progress) * 100%)" }}
        className="absolute left-6 z-[2] flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brass text-paper shadow-[0_0_0_6px_var(--color-mist)] md:left-1/2"
      >
        <ChevronDownIcon className="size-4" />
      </span>

      {steps.map((step, i) => {
        const reached = i <= activeIndex;
        const onLeft = i % 2 === 0;

        return (
          <div
            key={step.num}
            data-cursor="hover"
            className="relative pb-14 last:pb-0 md:pb-20"
          >
            <span
              aria-hidden="true"
              data-reached={reached}
              className={cn(
                "absolute top-0 left-6 z-[1] flex size-12 -translate-x-1/2 items-center justify-center rounded-full border bg-mist font-display text-[1.05rem] font-light transition-all duration-500 ease-forma md:left-1/2",
                "border-fog text-ash",
                "data-[reached=true]:border-ink data-[reached=true]:bg-ink data-[reached=true]:text-paper"
              )}
            >
              {step.num}
            </span>

            <div
              className={cn(
                "pl-16 transition-opacity duration-700 ease-forma md:w-1/2 md:pl-0",
                onLeft ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16",
                reached ? "opacity-100" : "opacity-45"
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
