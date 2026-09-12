"use client";

import { useRef } from "react";
import {
  Building2Icon,
  BoxIcon,
  HardHatIcon,
  LayoutGridIcon,
  SofaIcon,
  TreesIcon,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";
import type { Service, ServiceIcon } from "@/lib/data";

const icons: Record<ServiceIcon, LucideIcon> = {
  architecture: Building2Icon,
  interior: SofaIcon,
  landscape: TreesIcon,
  construction: HardHatIcon,
  planning: LayoutGridIcon,
  visualisation: BoxIcon,
};

export default function ServiceCard({
  service,
  delay,
}: {
  service: Service;
  delay?: 1 | 2 | 3 | 4;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRevealVisible(ref);
  const Icon = icons[service.icon];

  return (
    <div
      ref={ref}
      data-cursor="hover"
      className={cn(
        // bg-ink over the grid's hairline background is what draws the rules
        // between tiles; the brass bar wipes in along the bottom on hover.
        "group relative overflow-hidden bg-ink px-8 py-10 transition-colors duration-500 ease-forma hover:bg-white/[0.03] md:px-10 md:py-12",
        "before:absolute before:inset-x-0 before:bottom-0 before:h-px before:origin-left before:scale-x-0 before:bg-brass before:transition-transform before:duration-500 before:ease-forma hover:before:scale-x-100",
        revealClassName(visible, delay)
      )}
    >
      <div className="mb-8 text-micro tracking-[0.2em] text-white/25">
        {service.num}
      </div>

      <Icon
        aria-hidden="true"
        strokeWidth={1}
        className="mb-8 size-9 text-brass transition-transform duration-500 ease-forma group-hover:-translate-y-0.5"
      />

      <h3 className="mb-5 text-[0.95rem] uppercase tracking-[0.16em] text-paper">
        {service.name}
      </h3>

      <p className="text-[0.85rem] leading-[1.9] text-fog">
        {service.description}
      </p>
    </div>
  );
}
