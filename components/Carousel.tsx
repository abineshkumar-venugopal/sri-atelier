"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Project } from "@/lib/data";

export default function Carousel({ items }: { items: Project[] }) {
  return (
    <CarouselRoot
      opts={{ align: "start" }}
      plugins={[Autoplay({ delay: 4500, stopOnInteraction: false })]}
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

      <div className="flex items-center gap-3 px-6 pt-8 md:px-15">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </CarouselRoot>
  );
}
