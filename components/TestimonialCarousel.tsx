"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { PlayIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CarouselArrow from "@/components/ui/carousel-arrow";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Testimonial } from "@/lib/data";

/**
 * Video testimonials, one per slide.
 *
 * Nothing autoplays: three muted videos competing in a carousel would burn
 * bandwidth and say nothing. Each slide shows its poster with a play control,
 * and starts with sound only when asked.
 *
 * Unlike the projects carousel, this one advances a whole testimonial at a
 * time rather than drifting, holding each one long enough to be read. It
 * It yields to the video rather than to the pointer: starting a video stops it
 * until that video is paused or finishes, so a testimonial is never cut off
 * mid-sentence.
 */
export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [api, setApi] = useState<CarouselApi>();

  // Memoised: a fresh plugins array on every render would re-initialise embla.
  const plugins = useMemo(
    () =>
      prefersReducedMotion
        ? []
        : [
            Autoplay({
              delay: 3500,
              stopOnInteraction: false,
              // Deliberately NOT stopOnMouseEnter. This block spans the full
              // width and the height of the video and quote together, so a
              // cursor resting anywhere over it would hold the carousel still
              // for as long as someone was looking at it — which reads as it
              // simply not advancing. A playing video still stops it, which is
              // the interruption actually worth avoiding.
            }),
          ],
    [prefersReducedMotion]
  );
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

  // A playing video outranks the timer: hold the carousel until it is done.
  const holdAdvancing = () => api?.plugins().autoplay?.stop();
  const resumeAdvancing = () => api?.plugins().autoplay?.play();

  const play = (index: number) => {
    videoRefs.current.forEach((video, i) => i !== index && video?.pause());
    const video = videoRefs.current[index];
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {
      /* blocked — the poster and play control stay put */
    });
    holdAdvancing();
    setPlaying(index);
  };

  const step = (direction: -1 | 1) => {
    if (!api) return;
    // One testimonial per press; pause whatever is playing before moving.
    pauseAll();
    // Reset rather than stop, so a press postpones the next advance instead
    // of cancelling it.
    api.plugins().autoplay?.reset();
    if (direction === -1) api.scrollPrev();
    else api.scrollNext();
  };

  return (
    <Carousel
      className="group/carousel relative"
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      plugins={plugins}
    >
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
                  onPause={() => {
                    setPlaying((p) => (p === i ? null : p));
                    resumeAdvancing();
                  }}
                  onEnded={() => {
                    setPlaying(null);
                    resumeAdvancing();
                  }}
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

      {/* Centred on each edge, revealed by hovering the track. */}
      {/* Pushed out into the section gutter from md up, so they sit clear of
          the still and the quote instead of over them. Below that there is no
          gutter to move into, so they stay inset. */}
      <CarouselArrow
        direction="prev"
        label="Previous testimonial"
        onClick={() => step(-1)}
        className="md:-left-12"
      />
      <CarouselArrow
        direction="next"
        label="Next testimonial"
        onClick={() => step(1)}
        className="md:-right-12"
      />
    </Carousel>
  );
}
