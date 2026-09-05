"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface ParallaxProps {
  src: string;
  alt: string;
  mode: "scroll" | "center";
  factor: number;
  className: string;
  preload?: boolean;
  imgClassName?: string;
}

export default function Parallax({
  src,
  alt,
  mode,
  factor,
  className,
  preload,
  imgClassName,
}: ParallaxProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (mode === "scroll") {
        el.style.transform = `translateY(${window.scrollY * factor}px)`;
      } else {
        const rect = el.parentElement?.getBoundingClientRect();
        if (rect) {
          const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * factor;
          el.style.transform = `translateY(${offset}px)`;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode, factor]);

  return (
    <div ref={wrapRef} className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${imgClassName ?? ""}`}
        preload={preload}
        sizes="100vw"
      />
    </div>
  );
}
