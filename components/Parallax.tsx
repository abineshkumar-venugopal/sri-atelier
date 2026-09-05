"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface ParallaxProps {
  /** Still image. Also used as the video poster when `video` is set. */
  src: string;
  alt: string;
  mode: "scroll" | "center";
  factor: number;
  className: string;
  preload?: boolean;
  imgClassName?: string;
  /**
   * Optional background video. Supply WebM first — browsers pick the first
   * source they can play, and WebM/VP9 is markedly smaller than H.264 at the
   * same quality. MP4 is the fallback for Safari.
   *
   * `src` stays required: it is the poster, so the hero paints instantly and
   * still looks right if the video is slow, blocked, or missing.
   */
  video?: { webm?: string; mp4?: string };
}

export default function Parallax({
  src,
  alt,
  mode,
  factor,
  className,
  preload,
  imgClassName,
  video,
}: ParallaxProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Playback is started here rather than with the autoplay attribute so that
  // reduced-motion visitors simply keep the poster frame, and so a blocked
  // autoplay degrades to the poster instead of an empty box.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.muted = true; // required before any programmatic play()
    el.play().catch(() => {
      /* blocked by the browser — the poster stands in */
    });
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      {video ? (
        <video
          ref={videoRef}
          poster={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className={cn("size-full object-cover", imgClassName)}
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", imgClassName)}
          preload={preload}
          sizes="100vw"
        />
      )}
    </div>
  );
}
