"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlayIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/lib/data";

/**
 * Video testimonials, one per slide.
 *
 * Nothing autoplays: three muted videos competing in a carousel would burn
 * bandwidth and say nothing. Each slide shows its poster with a play control,
 * and starts with sound only when asked.
 */
export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [playing, setPlaying] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const pauseAll = useCallback(() => {
    videoRefs.current.forEach((video) => video?.pause());
    setPlaying(null);
  }, []);

  // Sliding away from a playing testimonial stops it, so audio never follows
  // the visitor to the next slide.
  useEffect(() => {
    if (!api) return;
    api.on("select", pauseAll);
    return () => {
      api.off("select", pauseAll);
    };
  }, [api, pauseAll]);

  const play = (index: number) => {
    videoRefs.current.forEach((video, i) => i !== index && video?.pause());
    const video = videoRefs.current[index];
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {
      /* blocked — the poster and play control stay put */
    });
    setPlaying(index);
  };

  return (
    <Carousel setApi={setApi} opts={{ align: "start" }}>
      <CarouselContent>
        {items.map((testimonial, i) => (
          <CarouselItem key={testimonial.author}>
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
              <div className="relative aspect-video overflow-hidden bg-ink">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  poster={testimonial.poster}
                  preload="none"
                  playsInline
                  controls={playing === i}
                  onPause={() => setPlaying((p) => (p === i ? null : p))}
                  onEnded={() => setPlaying(null)}
                  className="size-full object-cover"
                >
                  <source src={testimonial.video} type="video/mp4" />
                </video>

                {playing !== i && (
                  <button
                    type="button"
                    onClick={() => play(i)}
                    aria-label={`Play testimonial from ${testimonial.author}`}
                    className="group absolute inset-0 grid place-items-center bg-ink/25 transition-colors duration-300 hover:bg-ink/10"
                  >
                    <span className="flex size-16 items-center justify-center rounded-full border border-paper/70 text-paper transition-all duration-400 ease-forma group-hover:border-brass group-hover:bg-brass">
                      <PlayIcon className="size-5 translate-x-px" fill="currentColor" />
                    </span>
                  </button>
                )}
              </div>

              <div>
                <div className="mb-8 h-px w-10 bg-brass" />
                <blockquote className="mb-8 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-light italic leading-[1.5] text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p className="text-label uppercase tracking-[0.2em] text-brass">
                  {testimonial.author}
                </p>
                <p className="mt-1.5 text-[0.8rem] text-ash">{testimonial.project}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-12 flex items-center gap-3">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
