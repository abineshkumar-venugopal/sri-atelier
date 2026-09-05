"use client";

import { useRef } from "react";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";
import type { Service } from "@/lib/data";

const icons: Record<Service["icon"], React.ReactNode> = {
  interior: (
    <>
      <rect x="8" y="14" width="28" height="22" />
      <path d="M15 14v-4h14v4" />
      <path d="M15 22h14M15 28h8" />
    </>
  ),
  exterior: (
    <>
      <path d="M4 36h36M8 36V22l14-14 14 14v14" />
      <rect x="17" y="26" width="10" height="10" />
    </>
  ),
  construction: (
    <>
      <rect x="6" y="18" width="32" height="20" />
      <path d="M2 18l20-12 20 12" />
      <path d="M17 38v-12h10v12" />
    </>
  ),
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
  return (
    <div ref={ref} className={`service-card ${revealClassName(visible, delay)}`}>
      <svg
        className="service-icon"
        viewBox="0 0 44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {icons[service.icon]}
      </svg>
      <div className="service-name">{service.name}</div>
      <div className="service-desc">{service.description}</div>
    </div>
  );
}
