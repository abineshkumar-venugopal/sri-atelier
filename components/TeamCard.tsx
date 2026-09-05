"use client";

import Image from "next/image";
import { useRef } from "react";
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
      className={`team-card ${revealClassName(visible, delay)}`}
    >
      <div className="team-photo">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="team-name">{member.name}</div>
      <div className="team-role">{member.role}</div>
    </div>
  );
}
