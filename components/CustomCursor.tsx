"use client";

import { useEffect, useRef } from "react";

/**
 * What the cursor grows over. Cards opt in with `data-cursor="hover"` rather
 * than being listed here by class name, so restyling a card can't silently
 * break the cursor.
 */
const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Position is written straight to the DOM every frame; routing it through
    // React state would re-render the tree 60 times a second.
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      frame = requestAnimationFrame(tick);
    };

    const setHovering = (hovering: boolean) => {
      dot.dataset.hovering = String(hovering);
      ring.dataset.hovering = String(hovering);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(HOVER_SELECTOR)) setHovering(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (related?.closest?.(HOVER_SELECTOR)) return;
      setHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    frame = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        data-hovering="false"
        className="pointer-events-none fixed z-[9999] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-[width,height,background-color] duration-300 ease-forma data-[hovering=true]:size-4 data-[hovering=true]:bg-brass"
      />
      <div
        ref={ringRef}
        data-hovering="false"
        className="pointer-events-none fixed z-[9998] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/30 transition-[width,height,border-color] duration-400 ease-forma data-[hovering=true]:size-14 data-[hovering=true]:border-brass"
      />
    </>
  );
}
