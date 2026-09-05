"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { cn } from "@/lib/utils";
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
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 from-0% via-ink/20 via-60% to-transparent p-8 opacity-0 transition-opacity duration-500 ease-forma group-hover:opacity-100">
        <div className="translate-y-2.5 font-display text-[1.4rem] font-light text-paper transition-transform duration-400 ease-forma group-hover:translate-y-0">
          {project.name}
        </div>
      </div>
    </Link>
  );
}
