"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  useRevealVisible,
  revealClassName,
  type RevealDirection,
} from "@/lib/useReveal";

export default function Reveal({
  as,
  delay,
  direction,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: 1 | 2 | 3 | 4;
  direction?: RevealDirection;
  className?: string;
  children: ReactNode;
}) {
  const Tag = (as ?? "div") as ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const visible = useRevealVisible(ref);
  return (
    <Tag
      ref={ref}
      className={cn(revealClassName(visible, delay, direction), className)}
    >
      {children}
    </Tag>
  );
}
