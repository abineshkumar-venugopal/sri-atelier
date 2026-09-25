"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Round outline control centred on one edge of a carousel.
 *
 * Revealed by hovering the track, so the parent must carry `group/carousel`.
 * Touch screens have no hover to reveal it with, so below md it simply stays
 * visible rather than being unreachable.
 */
export default function CarouselArrow({
  direction,
  label,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-paper/70 bg-ink/25 text-paper backdrop-blur-sm transition-all duration-400 ease-forma outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-paper hover:bg-paper hover:text-ink",
        "opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100",
        direction === "prev" ? "left-4 md:left-8" : "right-4 md:right-8",
        className
      )}
    >
      <Icon className="size-5" strokeWidth={1.25} />
    </button>
  );
}
