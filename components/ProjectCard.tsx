"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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
      className={`project-card ${revealClassName(visible, delay)}`}
    >
      <Image
        src={project.thumb}
        alt={project.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="project-card-hover">
        <div className="project-card-title">{project.name}</div>
      </div>
    </Link>
  );
}
