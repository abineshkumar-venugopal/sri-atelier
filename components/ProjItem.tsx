"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";
import type { Project } from "@/lib/data";

export default function ProjItem({
  project,
  delay,
  hidden,
}: {
  project: Project;
  delay?: 1 | 2 | 3 | 4;
  hidden?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const visible = useRevealVisible(ref);
  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      className={`proj-item ${revealClassName(visible, delay)}`}
      style={{ display: hidden ? "none" : undefined }}
    >
      <Image
        src={project.thumb}
        alt={project.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="proj-hover">
        <div className="proj-hover-cat capitalize">{project.category}</div>
        <div className="proj-hover-name">{project.name}</div>
      </div>
    </Link>
  );
}
