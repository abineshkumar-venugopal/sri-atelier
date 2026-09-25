"use client";

import { useMemo } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Project } from "@/lib/data";

/**
 * Autoplay advances a slide at a time with a pause between, which reads as a
 * jump. Auto-scroll glides the track continuously instead, so the work drifts
 * past rather than stepping. It needs loop so the run never reaches an end and
 * stalls; that also means the arrows are never disabled.
 *
 * Dragging or using the arrows does not stop it, but hovering does — so it
 * holds still while a project is being looked at. Nothing moves on its own for
 * visitors who prefer reduced motion; the carousel stays draggable for them.
 */
export default function Carousel({ items }: { items: Project[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();

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

  return (
    <CarouselRoot
      className="relative"
      opts={{ align: "start", loop: true, dragFree: true }}
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

      {/* Centred on each edge of the track rather than in a row beneath it.
          The light variant keeps them legible over any photograph, where the
          bordered one relied on ink against an unknown image. */}
      <CarouselPrevious
        variant="light"
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 md:left-8"
      />
      <CarouselNext
        variant="light"
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 md:right-8"
      />
    </CarouselRoot>
  );
}
