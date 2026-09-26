"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import ProjectHoverDetails from "@/components/ProjectHoverDetails";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  delay,
}: {
  project: Project;
  delay?: 1 | 2 | 3 | 4;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const visible = useRevealVisible(ref);
  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block aspect-[3/4] overflow-hidden",
        revealClassName(visible, delay)
      )}
    >
      <Image
        src={project.thumb}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-800 ease-forma group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <ProjectHoverDetails project={project} />
    </Link>
  );
}
