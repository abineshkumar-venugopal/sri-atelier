"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/data";

export default function Carousel({ items }: { items: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(items.length - 2, 0);

  const applyTransform = useCallback((i: number) => {
    const track = trackRef.current;
    const item = track?.querySelector<HTMLElement>(".carousel-item");
    const itemWidth = item ? item.offsetWidth + 2 : 0;
    if (track) {
      track.style.transform = `translateX(-${i * itemWidth}px)`;
    }
  }, []);

  const goTo = (i: number) => {
    const clamped = Math.min(Math.max(i, 0), maxIndex);
    setIndex(clamped);
    applyTransform(clamped);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = prev >= maxIndex ? 0 : prev + 1;
        applyTransform(next);
        return next;
      });
    }, 4500);
    return () => clearInterval(id);
  }, [maxIndex, applyTransform]);

  return (
    <>
      <div className="carousel-track-wrap">
        <div className="carousel-track" ref={trackRef}>
          {items.map((project) => (
            <div className="carousel-item" key={project.slug}>
              <Image
                src={project.thumb}
                alt={project.name}
                fill
                className="object-cover"
                sizes="38vw"
              />
              <div className="carousel-overlay">
                <div className="carousel-overlay-text">{project.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button
          className="carousel-btn"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous project"
        >
          ←
        </button>
        <button
          className="carousel-btn"
          onClick={() => goTo(index + 1)}
          disabled={index === maxIndex}
          aria-label="Next project"
        >
          →
        </button>
      </div>
    </>
  );
}
