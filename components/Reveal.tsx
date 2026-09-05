"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useRevealVisible, revealClassName } from "@/lib/useReveal";

export default function Reveal({
  as,
  delay,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: 1 | 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}) {
  const Tag = (as ?? "div") as ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const visible = useRevealVisible(ref);
  return (
    <Tag ref={ref} className={`${revealClassName(visible, delay)} ${className}`}>
      {children}
    </Tag>
  );
}
