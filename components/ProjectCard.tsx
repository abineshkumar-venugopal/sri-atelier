"use client";

import Link from "next/link";
import { useRef } from "react";

import OrientationImage from "@/components/OrientationImage";
import { cn } from "@/lib/utils";
import ProjectHoverDetails from "@/components/ProjectHoverDetails";
import {
  useRevealVisible,
  revealClassName,
  type RevealDirection,
} from "@/lib/useReveal";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  delay,
  direction,
  animateImageOnReveal = false,
}: {
  project: Project;
  delay?: 1 | 2 | 3 | 4;
  direction?: RevealDirection;
  animateImageOnReveal?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const visible = useRevealVisible(ref);
  return (
    <Link
      ref={ref}
      data-image-revealed={animateImageOnReveal ? visible : undefined}
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block aspect-video overflow-hidden bg-stone",
        animateImageOnReveal && "home-image-card",
        revealClassName(visible, delay, direction)
      )}
    >
      <OrientationImage
        src={project.thumb}
        alt={project.name}
        fill
        className={cn(
          "transition-transform duration-800 ease-forma group-hover:scale-105",
          animateImageOnReveal && "home-image-entrance"
        )}
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <ProjectHoverDetails project={project} />
    </Link>
  );
}
