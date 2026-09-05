"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { cn } from "@/lib/utils";
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
      <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-ink/88 from-0% to-transparent to-60% p-7 opacity-0 transition-opacity duration-450 ease-forma group-hover:opacity-100">
        <div className="translate-y-2 text-micro uppercase tracking-[0.18em] text-brass transition-transform delay-50 duration-400 ease-forma group-hover:translate-y-0">
          {project.category}
        </div>
        <div className="translate-y-2 font-display text-[1.3rem] text-paper transition-transform duration-400 ease-forma group-hover:translate-y-0">
          {project.name}
        </div>
      </div>
    </Link>
  );
}
