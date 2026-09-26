"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CarouselArrow from "@/components/ui/carousel-arrow";
import ProjectHoverDetails from "@/components/ProjectHoverDetails";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Project } from "@/lib/data";

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
            className="group relative h-[52vh] min-h-85 basis-4/5 overflow-hidden pl-0.5 md:basis-[38vw]"
          >
            <Image
              src={project.thumb}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-800 ease-forma group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 80vw, 38vw"
            />
            <ProjectHoverDetails project={project} size="lg" />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Centred on each edge, revealed by hovering the track. */}
      <CarouselArrow
        direction="prev"
        label="Previous project"
        onClick={() => nudge(-1)}
      />
      <CarouselArrow
        direction="next"
        label="Next project"
        onClick={() => nudge(1)}
      />
    </CarouselRoot>
  );
}
