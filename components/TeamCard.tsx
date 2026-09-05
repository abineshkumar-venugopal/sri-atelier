"use client";

import Image from "next/image";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";
import type { TeamMember } from "@/lib/data";

export default function TeamCard({
  member,
  delay,
}: {
  member: TeamMember;
  delay?: 1 | 2 | 3 | 4;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRevealVisible(ref);
  return (
    <div
      ref={ref}
      data-cursor="hover"
      className={cn("group", revealClassName(visible, delay))}
    >
      <div className="relative mb-4 aspect-[3/4] overflow-hidden">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top grayscale-20 transition-transform duration-600 ease-forma group-hover:scale-[1.04] group-hover:grayscale-0"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="font-display text-[1.1rem] font-normal">{member.name}</div>
      <div className="mt-1 text-[0.75rem] uppercase tracking-[0.12em] text-ash">
        {member.role}
      </div>
    </div>
  );
}
