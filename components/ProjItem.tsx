"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import ProjectHoverDetails from "@/components/ProjectHoverDetails";
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
      className={cn(
        "group relative block aspect-[4/3] overflow-hidden",
        revealClassName(visible, delay),
        // Filtered out: cn() resolves this against `block` above.
        hidden && "hidden"
      )}
    >
      <Image
        src={project.thumb}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-700 ease-forma group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <ProjectHoverDetails project={project} />
    </Link>
  );
}
