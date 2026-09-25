"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Project } from "@/lib/data";

const arrowClass =
  "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-paper/70 bg-ink/25 text-paper opacity-100 backdrop-blur-sm transition-all duration-400 ease-forma outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-paper hover:bg-paper hover:text-ink md:opacity-0 md:group-hover/carousel:opacity-100";

/**
 * Autoplay advances a slide at a time with a pause between, which reads as a
 * jump. Auto-scroll glides the track continuously instead, so the work drifts
 * past rather than stepping. It needs loop so the run never reaches an end and
 * stalls.
 *
 * Hovering pauses the drift and brings the arrows in, so the track holds still
 * while a project is being looked at. Nothing moves on its own for visitors who
 * prefer reduced motion; the carousel stays draggable and the arrows stay put.
 */
export default function Carousel({ items }: { items: Project[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [api, setApi] = useState<CarouselApi>();

  // Memoised: a fresh plugins array on every render would re-initialise embla.
  const plugins = useMemo(
    () =>
      prefersReducedMotion
        ? []
        : [
            AutoScroll({
              speed: 0.7,
              startDelay: 0,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ],
    [prefersReducedMotion]
  );

  /**
   * Auto-scroll drives the track every frame, so a bare scrollPrev/scrollNext
   * is overwritten before it can be seen — which is why the arrows appeared to
   * do nothing. The plugin has to be interrupted first: reset, rather than
   * stop, because stopOnInteraction is false and the drift should resume.
   */
  const nudge = useCallback(
    (direction: -1 | 1) => {
      if (!api) return;
      api.plugins().autoScroll?.reset();
      if (direction === -1) api.scrollPrev();
      else api.scrollNext();
    },
    [api]
  );

  return (
    <CarouselRoot
      className="group/carousel relative"
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      plugins={plugins}
    >
      {/* 2px gutter: the track pulls back by half and each slide pads by half. */}
      <CarouselContent className="-ml-0.5">
        {items.map((project) => (
          <CarouselItem
            key={project.slug}
            data-cursor="hover"
            className="group relative h-[52vh] min-h-85 basis-4/5 overflow-hidden pl-0.5 md:basis-[38vw]"
          >
            <Image
              src={project.thumb}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-800 ease-forma group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 80vw, 38vw"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/72 from-0% to-transparent to-55% p-8 opacity-0 transition-opacity duration-500 ease-forma group-hover:opacity-100">
              <div className="translate-y-2 font-display text-2xl font-light text-paper transition-transform duration-400 ease-forma group-hover:translate-y-0">
                {project.name}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Centred on each edge. Shown on hover from md up; always visible on
          touch, where there is no hover to reveal them with. */}
      <button
        type="button"
        aria-label="Previous project"
        onClick={() => nudge(-1)}
        className={`${arrowClass} left-4 md:left-8`}
      >
        <ChevronLeftIcon className="size-5" strokeWidth={1.25} />
      </button>
      <button
        type="button"
        aria-label="Next project"
        onClick={() => nudge(1)}
        className={`${arrowClass} right-4 md:right-8`}
      >
        <ChevronRightIcon className="size-5" strokeWidth={1.25} />
      </button>
    </CarouselRoot>
  );
}
